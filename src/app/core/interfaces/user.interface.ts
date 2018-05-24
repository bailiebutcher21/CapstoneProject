
export interface User {
    uid: string;
    name: string;
    email: string;
    provider: string;
    friends: Array<string>;
    wishList: Array<string>;
}
