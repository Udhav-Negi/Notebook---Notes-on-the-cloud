import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name : {type : String, required : true},
    age : {type : Number, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    gender : {type : String, required : true},
    profession : {type : String, required : true},
    token : {type :String, default : null}
})

const UserModel = mongoose.model('users', UserSchema);
export default UserModel