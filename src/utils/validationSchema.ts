import { z } from "zod";
// create article schema
export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be string",
    })
    .min(2, "title must be more than 2 character")
    .max(200, "title must be less than 200 character"),
  description: z
    .string({
      required_error: "description is required",
    })
    .min(10, "description must be more than 10 character"),
});
// register schema
export const registerSchema = z.object({
  userName: z
    .string({
      required_error: "userName is required",
      invalid_type_error: "userName should be string",
    })
    .min(2, "userName must be more than 2 character")
    .max(100, "userName must be less than 200 character"),
  email: z
    .string({
      required_error: "email is required",
    })
    .email("please input correct email"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});
// login schema
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email("please input correct email"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});
// create comment schema
export const createCommentSchema = z.object({
  text: z
    .string({
      required_error: "text is required",
      invalid_type_error: "text should be string",
    })
    .min(2, "text must be more than 2 character")
    .max(500, "text must be less than 200 character"),
  articleId: z.number({
    required_error: "articleId is required",
    invalid_type_error: "articleId should be number",
  }),
});
export const ARTICLES_PER_PAGE = 6;
const PRODUCTION_DOMAIN = "https://cloud-hosting-project-course.vercel.app";
const DEVELOPMENT_DOMAIN = "http://localhost:3000";

export const DOMAIN =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_DOMAIN
    : DEVELOPMENT_DOMAIN;
