import {Container} from 'inversify';
import {Connection} from "./connection";
export class ConnectionDi {
    public static registerDi(container: Container, symbols: any) {
        container.bind<Connection>(symbols.Connection).to(Connection).inSingletonScope()
    }
    
    /*public static getSymbols() {
        return {
            MovieRoutes: Symbol('MovieRoutes')
        }
    }*/
}