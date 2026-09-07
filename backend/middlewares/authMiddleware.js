const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;

        if (
            authHeader &&
            authHeader.startsWith("Bearer ")
        ) {
            token = authHeader.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                message: "Not authorized, no token",
            });
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log(
            "Decoded JWT:",
            decoded
        );
        const userId =
            decoded.id ||
            decoded._id ||
            decoded.userId;

        if (!userId) {
            return res.status(401).json({
                message:
                    "Invalid token: user ID missing",
            });
        }
        const user =
            await User.findById(userId).select(
                "-password"
            );

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }
        req.user = user;

        console.log(
            "Authenticated user:",
            req.user._id.toString()
        );

        next();

    } catch (error) {
        console.error(
            "Authentication error:",
            error
        );

        return res.status(401).json({
            message:
                "Not authorized, token failed",
        });
    }
};

module.exports = {
    protect,
};