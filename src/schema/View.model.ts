import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { ViewGroup } from "../libs/enums/view.enum";

const viewSchema = new Schema(
  {
    viewGroup: {
      type: String,
      enum: ViewGroup,
      required: true,
    },
    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    viewRefId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  { timestamps: true }
);
export default mongoose.model<any>("View", viewSchema);
