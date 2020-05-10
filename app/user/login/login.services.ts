import { inject, injectable } from 'inversify';
import { Symbols } from '../../config/symbols';
import {sign, verify} from 'jsonwebtoken'
import { UsersSchema } from '../../connection/schemas';
import {LoginFactory} from './'
import * as bcrypt from 'bcrypt';
import {Config} from '../../shared';

@injectable()
export class LoginServices {
    constructor(
        @inject(Symbols.UsersSchema) private userSchema: UsersSchema,
        @inject(Symbols.Config) private config: Config,
        @inject(Symbols.LoginFactory) private loginFactory: LoginFactory
    ){}
    public async loginUser(username: string, password: string) {
        const userModel = this.userSchema.getModel();
        const existingUser = await userModel.findOne({username}).lean();
        if (existingUser) {
            const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
            if (isPasswordValid) {
                return sign(this.loginFactory.buildTokenResponse(existingUser), this.config.secretKey);
            } else {
                throw new Error('Invalid password');
            }
        } else {
            throw new Error('Invalid username');
        }
    }
    public verifyToken(token: string) {
        return verify(token, this.config.secretKey)
    }
}
