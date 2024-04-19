import type ICategory from "./ICategory";

export interface IUserStore {
    id?: string;
    loggedIn?: boolean;
    name?: string;
    email?: string;
    profilePicture?: string;
    registerDone?: boolean;
    Categories: ICategory[];
}
