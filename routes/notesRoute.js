import express from "express"
import { isTokenValid } from "../middleware/cookieMiddleware.js"
import { completeNoteById, createNote, deleteNoteById, getAllNotes, getNoteById, updateNoteById } from "../controller/NotesController.js"


const router=express.Router()

router.get("/test",(_,res)=>res.send("works fine"))

router.post("/new",isTokenValid,createNote)
router.get("/allnotes",isTokenValid,getAllNotes)
router.put("/edit",isTokenValid,updateNoteById)
router.put("/completed/:id",isTokenValid,completeNoteById)
router.delete("/delete/:id",isTokenValid,deleteNoteById)
router.get("/:id",isTokenValid,getNoteById)


export const noteRouter=router