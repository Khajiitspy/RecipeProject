export interface IRegisterUser {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    ImageFile?: File | null;
}
