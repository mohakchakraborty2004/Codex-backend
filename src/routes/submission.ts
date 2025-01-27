import axios from "axios";
import  express  from "express";

export const SubRouter = express.Router();


const solValidation = async(submittedCode: string, LangId: number, testcases: any, userId: string ) => {

    const endpoint = 'https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=false';
    const APIkey = "API"; //env

    //combined the test-cases

   
    const inputs = testcases.map((tc : any) => tc.stdin).join('\n');
    const outputs = testcases.map((tc: any) => tc.expectedOutput).join('\n');


    const data = {
            source_code : submittedCode,
            language_id : LangId,
            stdin: inputs,
            expected_output : outputs,
            callback_url : "callback" // callback url with our user id as a param in the callback.
        }; 

        try {

            const response = await axios.post(endpoint, data, {
                headers : {
                    'x-rapidapi-key': APIkey,
                    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                    'Content-Type': 'application/json'
                }
            })

            console.log("sent to callback");
            console.log(response.data);
            

        } catch (error) {
            console.log(error);
            console.log("error occured");
        }

}


//---------------------------------------route ---------------------------------------------

// get the userid from token, create a middleware for the same  
SubRouter.post("/submit", async(req: any, res: any)=> {
    const submittedCode = req.body.code;
    const LangId = req.body.LangId;
    const testcases = req.body.testcases;
    const userId = req.userId; //get from the token

    try {

        const response = await solValidation(submittedCode, LangId, testcases, userId);
        console.log("response sent from the route ")

        return res.status(200).json({
            msg : "solved",
            response
        });

    } catch (error) {
        console.log(error);
        console.log("error");
    }
    
    
})