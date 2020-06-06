import {Container} from 'inversify';
import {GenreRoutes} from "./genre.routes";
import {GenreServices} from "./genre.services";
import {GenreControllers} from "./genre.controllers";

export class GenreDi {
  public static registerDi(container: Container, symbols: any) {
    container.bind<GenreRoutes>(symbols.GenreRoutes).to(GenreRoutes).inSingletonScope();
    container.bind<GenreServices>(symbols.GenreServices).to(GenreServices).inSingletonScope();
    container.bind<GenreControllers>(symbols.GenreControllers).to(GenreControllers).inSingletonScope();
  }
}
