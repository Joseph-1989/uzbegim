export const AUTH_TIMER = 24;
export const MORGAN_FORMAT = "dev"; //":method :url :response-time [:status] \n";

import mongoose from "mongoose";

export const shapeIntoMongooseObjectID = (target: any) => {
  return typeof target === "string"
    ? new mongoose.Types.ObjectId(target)
    : target;
};
