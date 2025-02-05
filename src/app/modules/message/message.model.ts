import { Schema, model } from "mongoose";
import { TMessage } from "./message.interface";

const messageSchema = new Schema<TMessage>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: false,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = model<TMessage>("Message", messageSchema);
