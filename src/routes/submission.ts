import axios from "axios";
import  express  from "express";

export const SubRouter = express.Router();


const solValidation = async(submittedCode: string, LangId: number, testcases: any ) => {

    const endpoint = 'https://ce.judge0.com/submissions/?base64_encoded=false&wait=false';
    const APIkey = "API"; //env

    const testResult = [];
    let solved: string ;

// included the callback logic as well.
    for (const testCase of testcases) {
        const data = {
            source_code : submittedCode,
            language_id : LangId,
            stdin: testCase.input,
            expected_output : testCase.expected_output
        }; 

        try {

            const response = await axios.post(endpoint, data, {
                headers : {
                    'Content-type': 'application/json',
                    'X-Auth-Token': APIkey
                }
            })
    
            const status : any = response.data; //better type ?

            if(status.id === 3) {
                testResult.push({
                    passed : "yes"
                })
               console.log("test passed")
            }else {
             solved = "failed";
             return solved;
            }

        } catch (error) {
            console.log(error);
            console.log("error occured");
        }

    }

    solved =  "Accepted";
    return solved; 

   
    // iterate through test cases
    // for each test case get the result
    // if all passed set a variable status to passed
    // if either fails set the variable to failed

}


SubRouter.post("/submit", async(req: any, res: any)=> {
    const submittedCode = req.body.code;
    const LangId = req.body.LangId;
    const testcases = req.body.testcases;

    try {
        
        const response = await solValidation(submittedCode, LangId, testcases);
        await axios.post("CALLBACK URL", response);
        console.log("submission sent to callback");

    } catch (error) {
        console.log(error);
        console.log("error");
    }
    
    
})