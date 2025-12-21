import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
  {
    itemQuantity: {
      type: Number,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  },
  { timestamps: true, collection: "orderItems" }
);
export default mongoose.model("OrderItem", orderItemSchema);
