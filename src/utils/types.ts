import { Article, Comment, User } from "@prisma/client";

export type commentWithUser = Comment & { user: User };
export type singleArticleType = Article & { comments: commentWithUser[] };
