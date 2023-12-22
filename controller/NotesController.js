import { NoteModel } from "../model/NoteModel.js"




export const createNote = async(req,res) => {
try {
    const userId=req.userId
    const {title,endTime,timeItWillTake}=req.body
    const noteCreated=await NoteModel.create({userId:userId,title:title,endTime:endTime,timeItWillTake:timeItWillTake})
    if(noteCreated){
res.status(200).send({successStatus:true,message:"note created sucessfully", noteData:noteCreated})
    }else{
        res.status(200).send({successStatus:false,message:"note created sucessfully", noteData:noteCreated})
    }
} catch (error) {
    console.log({where:"creating a note",error:error})
    res.status(500).send({successStatus:false,message:"internal server occured"})
}
}



export const updateNoteById = async (req,res) => {
try {
    const {id,notedata,styles}=req.body
    const note=await NoteModel.findOne({_id:id})
    if(note.userId.toString()===notedata.userId.toString()){
        const updatedNote=await NoteModel.findByIdAndUpdate(id,{userId:notedata.userId,content:notedata.content,styles:styles},{new:true})
        if(updatedNote){
            res.status(200).send({successStatus:true,message:"note updated sucessfully", noteData:updatedNote})
        }else{
            res.status(200).send({successStatus:false,message:"note could't be updated"})
        }
    }else{
        res.status(200).send({successStatus:false,message:"only the user who created can change the content"})
}
} catch (error) {
    console.log({where:"updating a note",error:error})
    res.status(500).send({successStatus:false,message:"internal server occured"})
}
}

export const getAllNotes =async (req,res) => {
try {
    const userId=req.userId
    const allNotes=await NoteModel.find({userId:userId}) .sort({ updatedAt: -1 })
    if(allNotes){
        res.status(200).send({successStatus:true,message:"note updated sucessfully", notes:allNotes})
    }else{
        res.status(200).send({successStatus:false,message:"couldn't get notes"})

    }
} catch (error) {
     console.log({where:"getting all note",error:error})
    res.status(500).send({successStatus:false,message:"internal server occured"})
}
}


export const getNoteById =async (req,res) => {
    try {
        const {id}=req.params
        const note=await NoteModel.findOne({_id:id})
        if(note){
            res.status(200).send({successStatus:true,message:"note retrived sucessfully", note:note})   
        }else{
            res.status(200).send({successStatus:false,message:"couldn't get note"})
        }
    } catch (error) {
            console.log({where:"getting a note by id",error:error})
    res.status(500).send({successStatus:false,message:"internal server occured"})
    }
}

export const deleteNoteById =async (req,res) => {
    try {
        const {id}=req.params
        const deleted=await NoteModel.deleteOne({_id:id})
        if(deleted){
            res.status(200).send({successStatus:true,message:"note deleted sucessfully"})
        }else{
            res.status(200).send({successStatus:false,message:"couldn't delete note"})
        }
    } catch (error) {
        console.log({where:"deleting a note by id",error:error})
    res.status(500).send({successStatus:false,message:"internal server occured"})
    }

}
export const completeNoteById =async (req,res) => {
    try {
        const {id}=req.params
        const completed=await NoteModel.updateOne({_id:id},{completed:true})
        if(completed){
            res.status(200).send({successStatus:true,message:"note marked completed sucessfully"})
        }else{
            res.status(200).send({successStatus:false,message:"couldn't mark note completed"})
        }
    } catch (error) {
        console.log({where:"marking a note completed by id",error:error})
    res.status(500).send({successStatus:false,message:"internal server occured"})
    }

}