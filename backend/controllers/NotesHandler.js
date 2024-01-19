import NotesModel from '../models/NotesModel.js';
import NoteModel from '../models/NotesModel.js'
class NotesHandler {
    static addNotes = async (req, res)=>{
        try {
                const {id} = req.params;
                const {name , desc, tag} = req.body
                const note = new NoteModel({name : name, desc : desc, tag : tag, user : id});
                const result = await note.save();
                res.json({message : "note is added"})
        }
         catch (error) {
        }
    }

    static getNotes = async (req, res)=>{
        try {
            const {id} = req.params;
            const result = await NoteModel.find({user : id});
            res.send(result)
        } catch (error) {
            
        }
    }

    static deleteNote = async(req, res)=>{
        try {
            let {id} = req.params;
            let resp = await NoteModel.findByIdAndDelete(id);
            let deleted = false;
            if(resp != null)
            deleted = true;

            res.json({message : "delete note is running properly", deleted})
        } catch (error) {
            res.json({message : 'delete note is into the catch block in server'})
        }
    }

    static updateNote = async (req, res)=>{
        try {
            let {id} = req.params
            let {name, desc, tag} = req.body;
            let note = await NoteModel.findByIdAndUpdate(id, {$set : {name, desc, tag}}, {new : true});
            res.json({note})
        } catch (error) {
            res.json({message : "update note is into the catch block "})
        }
    }
}

export default NotesHandler;