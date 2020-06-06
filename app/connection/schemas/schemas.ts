import {MoviesSchema} from "./movies.schema";
import {inject, injectable} from "inversify";
import {Symbols} from "../../config/symbols";
import { UsersSchema } from './users.schema';
import { GenresSchema } from './genres.schema';

@injectable()
export class Schemas {
    constructor(
        @inject(Symbols.MoviesSchema) private movies: MoviesSchema,
        @inject(Symbols.UsersSchema) private users: UsersSchema,
        @inject(Symbols.GenresSchema) private genres: GenresSchema
    ){}
    
    public init() {
        this.movies.initMovieSchema();
        this.users.initUsersSchema();
        this.genres.initGenresSchema();
    }
}
