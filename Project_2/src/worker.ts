import { Job, RedisOptions, Worker } from "bullmq";
import { sendEmail } from "./emailController";
import { emailQueue } from "./queue";

const connect_redis:RedisOptions={
    host: 'localhost',
    port:6379
}

const emailSendWorker=new Worker("emailQueue",async(job:Job)=>{
    try{
       const emailData=job.data;
       console.log(emailData);
      const respose= await sendEmail(emailData); 
    }
    catch(error){
        console.error(error);
    }
},{connection:connect_redis})


emailSendWorker.on("failed",async (job:Job|undefined,err:Error)=>{
    console.log("Job is failed after 3 retries ",job?.id);
    await emailQueue.add("emailJob",job?.data,  {
        attempts: 3, 
        backoff: {
          type: 'fixed',
          delay: 2000,
        },
      })
})