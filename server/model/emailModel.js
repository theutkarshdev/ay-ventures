import { Schema, model } from "mongoose";

const emailSchema = new Schema(
    {
        investorId:{
            type:Schema.Types.ObjectId,
            ref:"InvestorFirm",
        },
        startupId:{
            type:Schema.Types.ObjectId,
            ref:"StartUp",
        },
        emailId:{
            type:Schema.Types.ObjectId,
            ref:"matchMaking.emailQueue",
        },
        emailType:{
            type:String,
        },
        time:{
            type:Date,
            default:Date.now(),
        },
        response:{
            type:Boolean,
            default:false,
        }
    },{
        timestamps:true
    }

)
const EmailModel = model("email",emailSchema)
export default EmailModel;