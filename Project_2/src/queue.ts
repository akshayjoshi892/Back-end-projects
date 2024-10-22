import { JobsOptions, Queue, RedisOptions } from "bullmq";


const connect_redis:RedisOptions={
    host: 'localhost',
    port:6379
}

const job_options:JobsOptions={
    attempts:3,
    delay:1000,
    keepLogs:1,
    backoff:30000,
}


export const emailQueue=new Queue("emailQueue",{defaultJobOptions:job_options,connection:connect_redis});