import express from "express";
const router = express.Router();
import UserHandler from "../controllers/UserHandler.js";
import NotesHandler from "../controllers/NotesHandler.js";

router.get('/', UserHandler.default_Get);
router.post('/signup', UserHandler.signUp);
router.post('/login', UserHandler.logIn)


// These endpoints are for notes 
router.post('/addnotes/:id', NotesHandler.addNotes)
router.get('/getnotes/:id', NotesHandler.getNotes)

// This endpoint is to delete the note 
router.delete('/deletenote/:id', NotesHandler.deleteNote)

//This endpoint is to update the note 
router.put('/updatenote/:id', NotesHandler.updateNote)

export default router;