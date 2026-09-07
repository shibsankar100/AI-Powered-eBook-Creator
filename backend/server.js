require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const aiRoutes = require("./routes/aiRoutes");
const exportRoutes = require("./routes/exportRoutes");
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE",
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
        ],
    })
);
app.use(express.json());
connectDB();
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/books",
    bookRoutes
);

app.use(
    "/api/ai",
    aiRoutes
);

app.use(
    "/api/export",
    exportRoutes
); 
app.get("/", (req, res) => {
    res.json({
        message:
            "eBookCreator backend is running",
    });
});
const PORT =
    process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );

    console.log(
        `Uploads available at: http://localhost:${PORT}/uploads/`
    );
});