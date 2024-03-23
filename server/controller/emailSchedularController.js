import sendMail from "../mail/mailSender.js"




export async function sendCronjobsMails(req,res){
try {
 await sendMail()
 res.json({message:"mail sent successfully"})
  
} catch (error) {
  res.status(500).json({message:"server error"})
}

}