const mongoose=require('mongoose');
const postSchema=mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    website:{
        type: String,
        required: [true,"Please Enter Website Details."]
    },
    gender:{
        type: String,
        required: true
    },
    java:{
        type: Boolean,
        default:false,
    },
    css:{
        type: Boolean,
        default:false,
    },
    html:{
        type: Boolean,
        default:false,
    }
});
module.exports= mongoose.model("Post",postSchema)