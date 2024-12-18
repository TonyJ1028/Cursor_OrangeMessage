import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
            avatar: any;
            bio: any;
            phone: any;
        };
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
