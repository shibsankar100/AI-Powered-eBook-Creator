//models/Users.js
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema (
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
            select:false
        },
        avatar:{
            type:String,
            default:""
        },
        isPro:{
            type:Boolean,
            default:false,
        },
    },
    {timestamps:true}
);

// password hashing middleware
userSchema.pre("save",async function (next) {
    if(!this.isModified("password"))return next();
    const salt=await bcrypt.hash(this.password,salt);
    next(); 
});

//Method to compare password
userSchema.method.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

module.exports=mongoose.model("User",userSchema);