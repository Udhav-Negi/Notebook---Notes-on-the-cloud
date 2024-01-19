import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    name : {type : String, reqired : true},
    desc : {type : String, reqired : true},
    tag : {type : String, reqired : true},
    user : {type : String, required : true},
    date : {type : String, default : (new Date).toUTCString()}
})

const NotesModel = mongoose.model('notes', NotesSchema);
export default NotesModel