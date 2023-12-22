import { sendRemainderMail } from "../mail/sendRemainderMail.js";
import { NoteModel } from "../model/NoteModel.js"



export const checkNotesCompletion=async()=>{
    try {
        console.log("checking incomplete tasks for reminder");
        const AllIncompleteTasks=await NoteModel.find({completed:false}).populate("userId")
        if(AllIncompleteTasks.length>0){
            AllIncompleteTasks.forEach(async(element) => {
                const timeDiff=element.endTime -  new Date()  
                if(element.timeItWillTake*60>timeDiff/(1000*60)){
                    await sendRemainderMail(element.userId.email,element.title,element.userId.name)
                }
            });
        }else{
            console.log("no incomplete task");
        }
    } catch (error) {
        console.log(error);
    }
}