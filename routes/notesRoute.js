import {Router} from "express"
import { isTokenValid } from "../middleware/cookieMiddleware.js"
import { createNote, deleteNoteById, getAllNotes, getNoteById, updateNoteById } from "../controller/NotesController.js"


const router=Router()

router.get("/test",(_,res)=>res.send("works fine"))

router.post("/new",isTokenValid,createNote)
router.get("/allnotes",isTokenValid,getAllNotes)
router.get("/:id",isTokenValid,getNoteById)
router.put("/edit",isTokenValid,updateNoteById)
router.delete("/delete/:id",isTokenValid,deleteNoteById)


export const noteRouter=router