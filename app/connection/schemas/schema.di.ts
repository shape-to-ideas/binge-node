import {Container} from "inversify";
import {Schemas} from "./schemas";
import {MoviesSchema} from "./movies.schema";
import { UsersSchema } from './users.schema';

export class SchemaDi {
    public static registerDi(container: Container, symbols: any) {
        container.bind<MoviesSchema>(symbols.MoviesSchema).to(MoviesSchema).inSingletonScope();
        container.bind<UsersSchema>(symbols.UsersSchema).to(UsersSchema).inSingletonScope();
        container.bind<Schemas>(symbols.Schemas).to(Schemas).inSingletonScope();
    }
}
