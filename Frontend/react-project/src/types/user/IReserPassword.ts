export interface IResetPasswordRequest {
    password: string;
    confirmPassword: string;
    token: string;
    email: string;
}