import express from "express";
import prisma from "../db";

export const callbackRouter = express.Router();


callbackRouter.post("/callback/:userId/:contestId", async(req: any, res: any) => {
    const submission = req.body;
    const userId = req.params.userId;
    const contestId = req.params.contestId;

    try {
        const { token, status, memory, time, source_code } = submission 

        //logic to check all the testcases are passed or not. 
        //then update the data Base

    
        const response = await prisma.submissions.create({
            //@ts-ignore
            data : {
                id : token,
                userId : userId,
                contestId: contestId,
                executionTime : time,
                memoryUsed : memory,
                code : source_code,
            }
        })
    } catch (error) {
        
    }
})