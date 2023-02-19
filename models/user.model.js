const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    gender:{type:String},
    name:{
        title:{type:String},
        first:{type:String},
        last:{type:String},
    },
    location: {
        steet:{
            number:{type:Number},
            name:{type:String}
        },
        city:{type:String},
        state:{type:String},
        country:{type:String},
        postcode:{type:String},
        coordinates:{
            latitude:{type:String},
            longitude:{type:String},
        },
        timezone:{
            offset:{type:String},
            description:{type:String},
        }


    },
    email:{type:String},
    login:{
        uuid:{type:String},
        username:{type:String},
        salt:{type:String},
        md5:{type:String},
        sha1:{type:String},
        sha256:{type:String}
    },
    dob:{
        date:{type:String},
        age:{type:Number},
    },
    registered:{
        date:{type:String},
        age:{type:Number},
    },
    phone:{type:String},
    cell:{type:String},
   
    picture:{
        large:{type:String},
        medium:{type:String},
        thumbnail:{type:String},
    },
    nat:{type:String}



})

const userModel = mongoose.model("User", userSchema)
module.exports = userModel