import  {getInitialEmailsToSend}  from "../services/emailSchedularService.js";




export async function sendInitialMail(req,res){
try {
  const emails=await  getInitialEmailsToSend()
  res.json({emails})
  
} catch (error) {
  
}

}