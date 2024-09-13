export interface UserInterface {
    id: string;
    name: string;
    email: string;
    type: 'admin' | 'user';
}

export interface AuthResponse {
    user: UserInterface;
    access_token: string;
}