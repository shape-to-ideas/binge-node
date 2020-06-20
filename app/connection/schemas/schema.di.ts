import {Container} from "inversify";
import {Schemas} from "./schemas";
import {MoviesSchema} from "./movies.schema";
import { UsersSchema } from './users.schema';
import { GenresSchema } from './genres.schema';
import {CountersSchema} from "./counters.schemas";

export class SchemaDi {
    public static registerDi(container: Container, symbols: any) {
        container.bind<MoviesSchema>(symbols.MoviesSchema).to(MoviesSchema).inSingletonScope();
        container.bind<UsersSchema>(symbols.UsersSchema).to(UsersSchema).inSingletonScope();
        container.bind<Schemas>(symbols.Schemas).to(Schemas).inSingletonScope();
        container.bind<GenresSchema>(symbols.GenresSchema).to(GenresSchema).inSingletonScope();
        container.bind<CountersSchema>(symbols.CountersSchema).to(CountersSchema).inSingletonScope();
    }
}
