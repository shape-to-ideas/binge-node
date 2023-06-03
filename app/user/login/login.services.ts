import {inject, injectable} from 'inversify';
import {Symbols} from '../../config/symbols';
import {sign, verify} from 'jsonwebtoken'
import {UsersSchema} from '../../connection/schemas';
import {LoginFactory} from './'
import * as bcrypt from 'bcrypt';

@injectable()
export class LoginServices {
  constructor(
    @inject(Symbols.UsersSchema) private userSchema: UsersSchema,
    @inject(Symbols.LoginFactory) private loginFactory: LoginFactory
  ) {
  }
  
  public async loginUser(username: string, password: string) {
    const userModel = this.userSchema.getModel();
    const existingUser = await userModel.findOne({username}).lean();
    if (existingUser) {
      const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
      if (isPasswordValid) {
        const userData = this.loginFactory.buildTokenResponse(existingUser);
        return {token: sign(userData, process.env.SECRET_KEY), user: userData};
      } else {
        throw new Error('Invalid password');
      }
    } else {
      throw new Error('Invalid username');
    }
  }
  
  public verifyToken(token: string) {
    return verify(token, process.env.SECRET_KEY)
  }
}
