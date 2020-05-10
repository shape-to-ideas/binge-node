import { Container } from 'inversify';
import {TMDBServices} from './TMDBServices';
import {LoggerServices} from './loggerServices';

export class ServicesDi {
    public static registerDi(container: Container, symbols: any) {
        container.bind<TMDBServices>(symbols.TMDBServices).to(TMDBServices).inSingletonScope();
        container.bind<LoggerServices>(symbols.LoggerServices).to(LoggerServices).inSingletonScope();
    }
}
