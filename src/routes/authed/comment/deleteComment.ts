import { Request, Response } from "express";
import { AppDataSource } from "@database/DataSource";
import ResponseBuilder from "@services/responseBuilder";
import C from "@database/repo/CommonSchemas";
import log from "@services/logger";
import Comment from "@database/models/Comment";
import { COMMENT_RESPONSE_SCHEMA } from "@database/repo/CommentRepository";

const commentRepository = AppDataSource.getRepository(Comment);

export default async function deleteComment(req: Request, res: Response) {
  let commentID, userID;

  try {
    commentID = C.NUMBER.parse(req.params.id);
    userID = C.NUMBER.parse(req.headers["userID"]);
  } catch (e) {
    log.warn(e);
    return ResponseBuilder.BadRequest(res, e);
  }

  try {
    const existedComment = await commentRepository.findOne({
      where: {
        id: commentID,
      },
      relations: {
        user: true,
        post: {
          user: true,
        },
      },
    });

    log.info(existedComment);

    if (!existedComment)
      return ResponseBuilder.NotFound(res, "COMMENT_NOT_FOUND");
    if (
      existedComment.user.id != userID ||
      existedComment.post.user.id != userID
    )
      return ResponseBuilder.Forbidden(res, "NOT_OWN_COMMENT_OR_POST");

    await commentRepository.delete(commentID);

    return ResponseBuilder.Ok(
      res,
      COMMENT_RESPONSE_SCHEMA.parse(existedComment)
    );
  } catch (e) {
    log.error("error", e);
    return ResponseBuilder.InternalServerError(res);
  }
}
