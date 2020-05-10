import { Container } from 'inversify';
import { RegisterControllers } from './register.controllers';
import {RegisterServices} from './register.services';
import {RegisterRoutes} from './register.routes';

export class RegisterDi {
    public static registerDi(container: Container, symbols: any) {
        container.bind<RegisterServices>(symbols.RegisterServices).to(RegisterServices).inSingletonScope();
        container.bind<RegisterRoutes>(symbols.RegisterRoutes).to(RegisterRoutes).inSingletonScope();
        container.bind<RegisterControllers>(symbols.RegisterControllers).to(RegisterControllers).inSingletonScope();
    }
}
