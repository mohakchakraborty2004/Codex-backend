// this route is complete and needs to be tested

import  express  from "express";
import prisma from "../db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;


router.post("/signup", async(req: any , res: any)=> {
    try {
        const {email ,password, username} = req.body; 

        const exstEmail = await prisma.user.findUnique({
            where : {
                email,
                username
            }
        });
    
        if(exstEmail){
         return res.json({
            msg : "email already exists"
         })
        };
    
        const response = await prisma.user.create({
            data : {
                username,
                email,
                password
            }
        })
    
        const id = response.id;
    
        
            //jwt logic here
            const token = jwt.sign({
                id
            }, "secret")
            // need to change it JWT_SECRET, but some error persists.

        

        res.status(200).json({
            msg : "user created successfully",
            token
        });
    } catch (error) {
        console.log(error);
        console.log("some error occured");
    }

   
})

router.post("/login", async(req: any, res: any) => {
//login logic
try {
    const email = req.body.email;

    const user =  await prisma.user.findUnique({
        where : {
           email
        }
    })

    const password = req.body.password;

    if(!user){
      return res.json({
        msg : "user not found"
      });
    }

    const userID = user.id;

    const token =  jwt.sign({
      userID
    }, "secret")

    if(user.password === password){
        return res.json({
            msg : "user loggedin successfully",
            token
        })
    }

} catch (error) {
    console.log(error);
    console.log("error while logging in");
}
})


 

export default router