import axios from "axios";
import  express  from "express";

export const SubRouter = express.Router();


const solValidation = async(submittedCode: string, LangId: number, testcases: any ) => {

    const endpoint = 'https://ce.judge0.com/submissions/?base64_encoded=false&wait=false';
    const APIkey = "API"; //env

    //combined the test-cases

    //@ts-ignore
    const inputs = testcases.map(tc => tc.stdin).join('\n');
    //@ts-ignore
    const outputs = testcases.map(tc => tc.expectedOutput).join('\n');


    const data = {
            source_code : submittedCode,
            language_id : LangId,
            stdin: inputs,
            expected_output : outputs,
            callback_url : "callback" // callback url 
        }; 

        try {

            const response = await axios.post(endpoint, data, {
                headers : {
                    'Content-type': 'application/json',
                    'X-Auth-Token': APIkey
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


SubRouter.post("/submit", async(req: any, res: any)=> {
    const submittedCode = req.body.code;
    const LangId = req.body.LangId;
    const testcases = req.body.testcases;

    try {

        const response = await solValidation(submittedCode, LangId, testcases);
        console.log("response sent from the route ")

        return res.status(200).json({
            msg : "solved"
        });

    } catch (error) {
        console.log(error);
        console.log("error");
    }
    
    
})