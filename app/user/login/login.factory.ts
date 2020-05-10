import { injectable } from 'inversify';

@injectable()
export class LoginFactory {
    public buildTokenResponse(userData) {
        return {
            username: userData.username,
            email: userData.email,
            firstname: userData.firstname,
            lastname: userData.lastname,
        }
    }
}
