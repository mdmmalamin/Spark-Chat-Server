import { ApiError } from "../../errors";
import { httpStatus } from "../../utils";
import { Chat } from "../chat/chat.model";
import { TMessage } from "./message.interface";
import { Message } from "./message.model";

// Send a new message
const newMessage = async (payload: TMessage) => {
  // Store the message in message collection
  const newMessage = new Message(payload);
  const savedMessage = await newMessage.save();

  // update the lastMessage in chat collection
  const currentChat = await Chat.findOneAndUpdate(
    {
      _id: payload.chatId,
    },
    {
      lastMessage: savedMessage._id,
      $inc: { unreadMessageCount: 1 },
    }
  );

  return savedMessage;
};

// Get messages between two users
const getAllMessages = async (chatId: string) => {
  const allMessages = await Message.find({ chatId }).sort({ createdAt: 1 });

  return allMessages;
};

export const MessageServices = {
  newMessage,
  getAllMessages,
};
