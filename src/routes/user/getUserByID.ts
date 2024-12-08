import {Request, Response} from "express";
import ResponseBuilder from "@services/responseBuilder";
import UserRepository from "@database/repo/UserRepository";
import MessageCodes from "@root/messageCodes";
import log from "@services/logger";
import NUMBER from "@database/DataSchema/NUMBER";

export default function (req: Request, res: Response) {
	const _userID = req.params.id;

	const parsed = NUMBER.safeParse(_userID);

	if (parsed.error) {
		return ResponseBuilder.BadRequest(res, parsed.error);
	}

	const userID = parsed.data;

	UserRepository.findOne({
		where: {id: userID},
	})
		.then((existedUser) => {
			if (!existedUser) return ResponseBuilder.NotFound(res, MessageCodes.USER_MAIL_EXISTED);

			return ResponseBuilder.Ok(res, existedUser);
		})
		.catch((err) => {
			log.error(err);
			ResponseBuilder.InternalServerError(res);
		})
}