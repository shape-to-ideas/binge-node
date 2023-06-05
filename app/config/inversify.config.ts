import 'reflect-metadata';
import { Container } from 'inversify';
import { MovieDi } from '../movie';
import { ServicesDi } from '../shared/services';
import { RegisterDi } from '../user/register';
import { Symbols } from './symbols';
import { Bootstrap } from '../bootstrap';
import { ConnectionDi } from '../connection';
import { SchemaDi } from '../connection/schemas';
import { LoginDi } from '../user/login';
import { GenreDi } from '../genre';
import { ActionsDi } from '../user/actions';
const container = new Container();
// container.bind('Config').toConstantValue((key: string) => appSettings[key]);
// container.bind(Symbols.Config).toConstantValue(appSettings);

ConnectionDi.registerDi(container, Symbols);
MovieDi.registerDi(container, Symbols);
SchemaDi.registerDi(container, Symbols);
ServicesDi.registerDi(container, Symbols);
LoginDi.registerDi(container, Symbols);
RegisterDi.registerDi(container, Symbols);
GenreDi.registerDi(container, Symbols);
ActionsDi.registerDi(container, Symbols);

container.bind<Bootstrap>(Symbols.Bootstrap).to(Bootstrap).inSingletonScope();
export default container;
