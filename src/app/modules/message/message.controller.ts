import { apiResponse, catchAsync, httpStatus } from "../../utils";
import { MessageServices } from "./message.service";

const newMessage = catchAsync(async (req, res) => {
  const result = await MessageServices.newMessage(req.body);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Message sent successfully!",
    data: result,
  });
});

const getAllMessages = catchAsync(async (req, res) => {
  const { chatId } = req.params;
  const result = await MessageServices.getAllMessages(chatId);

  apiResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Messages retrieved successfully!",
    data: result,
  });
});

export const MessageControllers = {
  newMessage,
  getAllMessages,
};
