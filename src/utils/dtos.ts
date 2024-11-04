export interface createArticleDto {
  title: string;
  description: string;
}
export interface updateArticleDto {
  title?: string;
  description?: string;
}
export interface RegisterUserDto {
  userName: string;
  email: string;
  password: string;
}
export interface LoginUserDto {
  email: string;
  password: string;
}
export interface UpdateUserDto {
  email?: string;
  password?: string;
  userName?: string;
}
export interface CreateCommentDto {
  text: string;
  articleId: number;
}
