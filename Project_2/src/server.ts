import express,{Request,Response} from "express";

import { emailQueue } from "./queue";
const app=express();

const PORT=8080;
app.use(express.json())



app.post("/send-email",async (req:Request,res:Response)=>{
    const email_data=req.body;
    try{
        console.log(email_data);
        
        const job=await emailQueue.add("emailQueue",email_data,{removeOnComplete:true});
        console.log("job added to the queue:",job.id);
    }
    catch(error){
        console.log(error);
        
    }
})

app.listen(PORT,()=>console.log(`Server started at:${PORT}`));