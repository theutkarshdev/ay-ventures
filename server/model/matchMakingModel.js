import { Schema, model } from "mongoose";

const matchMakingSchema = new Schema(
  {
    investorId: {
      type: Schema.Types.ObjectId,
      ref: "InvestorFirm",
    },
    emailQueue: [
      {
        startUpId: {
          type: Schema.Types.ObjectId,
          ref: "StartUp",
        },
        send: {
          primaryEmail: {
            type: Boolean,
            default: false,
          },
          followUpEmail: {
            type: Boolean,
            default: false,
          },
          timeline: [
            {
              type: Date,
            },
          ],
        },
        score: {
          type: Number,
          default: 0,
        },

        response: {
          type: Boolean,
          default: false,
        },
        remark: String,
      },
    ],
  },
  { timestamps: true }
);

const MatchMakingModel = model("matchMaking", matchMakingSchema);

export default MatchMakingModel;
