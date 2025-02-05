import { apiResponse, catchAsync, httpStatus } from "../../utils";
import { ChatServices } from "./chat.service";

const createNewChat = catchAsync(async (req, res) => {
  const result = await ChatServices.createNewChat(req.body);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Chat created successfully!",
    data: result,
  });
});

const getAllChats = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const result = await ChatServices.getAllChats(_id);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Chat fetched successfully!",
    data: result,
  });
});

export const ChatControllers = {
  createNewChat,
  getAllChats,
};
