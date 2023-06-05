import { Container } from 'inversify';
import { ActionsServices } from './actions.services';
import { ActionsControllers } from './actions.controllers';
import { ActionsRoutes } from './actions.routes';
import { ActionsFactory } from './actions.factory';

export class ActionsDi {
	public static registerDi(container: Container, symbols: any) {
		container
			.bind<ActionsServices>(symbols.ActionsServices)
			.to(ActionsServices)
			.inSingletonScope();
		container
			.bind<ActionsRoutes>(symbols.ActionsRoutes)
			.to(ActionsRoutes)
			.inSingletonScope();
		container
			.bind<ActionsControllers>(symbols.ActionsControllers)
			.to(ActionsControllers)
			.inSingletonScope();
		container
			.bind<ActionsFactory>(symbols.ActionsFactory)
			.to(ActionsFactory)
			.inSingletonScope();
	}
}
