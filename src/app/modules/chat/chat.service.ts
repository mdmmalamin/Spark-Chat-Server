import { TChat } from "./chat.interface";
import { Chat } from "./chat.model";

const createNewChat = async (payload: TChat) => {
  const chat = new Chat(payload);
  const savedChat = (await chat.save()).populate("members");

  return savedChat;
};

const getAllChats = async (id: string) => {
  const allChats = await Chat.find({ members: { $in: id } })
    .populate("members")
    .populate("lastMessage")
    .sort({ updatedAt: -1 });

  return allChats;
};

export const ChatServices = {
  createNewChat,
  getAllChats,
};
