import { Schema, model } from "mongoose";
import { TChat } from "./chat.interface";

const chatSchema = new Schema<TChat>(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    unreadMessageCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Chat = model<TChat>("Chat", chatSchema);
