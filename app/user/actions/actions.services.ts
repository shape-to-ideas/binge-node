import {inject, injectable} from 'inversify';
import {Symbols} from '../../config/symbols';
import {sign, verify} from 'jsonwebtoken'
import {UsersSchema} from '../../connection/schemas';
import {MoviesSchema} from '../../connection/schemas';
import {ActionsFactory} from '.';
import {Config} from '../../shared';
import {includes, filter} from 'lodash';

@injectable()
export class ActionsServices {
  constructor(
    @inject(Symbols.UsersSchema) private userSchema: UsersSchema,
    @inject(Symbols.MoviesSchema) private movieSchema: MoviesSchema,
    @inject(Symbols.Config) private config: Config,
    @inject(Symbols.ActionsFactory) private actionsFactory: ActionsFactory
  ) {
  }
  
  public async addToLike(userData: any, movieId: string) {
    if (!userData) {
      throw new Error('Action Not Allowed');
    }
    const userModel = this.userSchema.getModel();
    const movieModel = this.movieSchema.getModel();
    const existingUser = await userModel.findOne({username: userData.username}).lean();
    const movieData = await movieModel.findOne({id: movieId});
    if (existingUser) {
      const likesData = existingUser.liked_movies ? existingUser.liked_movies : [];
      if (movieData) {
        if (!includes(likesData, movieId)) {
          likesData.push(movieId);
          await userModel.updateOne({username: existingUser.username}, {liked_movies: likesData});
          return {...this.actionsFactory.buildTokenResponse(existingUser), liked_movies: likesData};
        } else {
          throw new Error('Entry Already Exists');
        }
      } else {
        throw new Error('Invalid movie Id');
      }
    } else {
      throw new Error('Invalid username');
    }
  }

  public async unlikeMovie(userData: any, movieId: string) {
    if (!userData) {
      throw new Error('Action Not Allowed');
    }
    const userModel = this.userSchema.getModel();
    const existingUser = await userModel.findOne({username: userData.username}).lean();
    if (existingUser) {
      let likesData = existingUser.liked_movies ? existingUser.liked_movies : [];
      if (!includes(likesData, movieId)) {
        throw new Error('Unable to process');
      }
      likesData = filter(likesData, (movie_id) => movie_id !== movieId);
      await userModel.updateOne({username: existingUser.username}, {liked_movies: likesData});
      return {...this.actionsFactory.buildTokenResponse(existingUser), liked_movies: likesData};
    } else {
      throw new Error('Invalid username');
    }
  }
  
  public verifyToken(token: string) {
    return verify(token, this.config.secretKey)
  }
}
