import { Container } from 'inversify';
import { TMDBServices } from './TMDBServices';
import { LoggerServices } from './loggerServices';
import { Schedulers } from './schedulers';
import { CounterServices } from './counterServices';
import { ParamValidation } from './paramValidation';

export class ServicesDi {
	public static registerDi(container: Container, symbols: any) {
		container
			.bind<TMDBServices>(symbols.TMDBServices)
			.to(TMDBServices)
			.inSingletonScope();
		container
			.bind<LoggerServices>(symbols.LoggerServices)
			.to(LoggerServices)
			.inSingletonScope();
		container
			.bind<Schedulers>(symbols.Schedulers)
			.to(Schedulers)
			.inSingletonScope();
		container
			.bind<CounterServices>(symbols.CounterServices)
			.to(CounterServices)
			.inSingletonScope();
		container
			.bind<ParamValidation>(symbols.ParamValidation)
			.to(ParamValidation)
			.inSingletonScope();
	}
}
