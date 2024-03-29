export interface BingeSymbols {
	Connection: symbol;
	MovieRoutes: symbol;
	MovieControllers: symbol;
	MoviesSchema: symbol;
	MovieServices: symbol;
	MovieFactory: symbol;

	UsersSchema: symbol;

	GenresSchema: symbol;
	GenreServices: symbol;
	GenreRoutes: symbol;
	GenreControllers: symbol;

	CountersSchema: symbol;
	CounterServices: symbol;

	Bootstrap: symbol;
	Schemas: symbol;
	TMDBServices: symbol;
	LoggerServices: symbol;
	LoginServices: symbol;
	LoginRoutes: symbol;
	LoginFactory: symbol;
	RegisterRoutes: symbol;
	LoginControllers: symbol;
	RegisterServices: symbol;
	RegisterControllers: symbol;
	ActionsControllers: symbol;
	ActionsServices: symbol;
	ActionsRoutes: symbol;
	ActionsFactory: symbol;
	Schedulers: symbol;
	ParamValidation: symbol;
}

export const Symbols: BingeSymbols = {
	Connection: Symbol('Connection'),
	MovieRoutes: Symbol('MovieRoutes'),
	MovieControllers: Symbol('MovieControllers'),
	MoviesSchema: Symbol('MoviesSchema'),
	MovieServices: Symbol('MovieServices'),
	MovieFactory: Symbol('MovieFactory'),

	UsersSchema: Symbol('UsersSchema'),

	GenresSchema: Symbol('GenresSchema'),
	GenreServices: Symbol('GenresServices'),
	GenreRoutes: Symbol('GenresRoutes'),
	GenreControllers: Symbol('GenresControllers'),

	CountersSchema: Symbol('CountersSchema'),
	CounterServices: Symbol('CounterServices'),

	Bootstrap: Symbol('Bootstrap'),
	Schemas: Symbol('Schemas'),
	TMDBServices: Symbol('TMDBServices'),
	LoggerServices: Symbol('LoggerServices'),
	LoginServices: Symbol('LoginServices'),
	LoginRoutes: Symbol('LoginRoutes'),
	LoginFactory: Symbol('LoginFactory'),
	RegisterRoutes: Symbol('RegisterRoutes'),
	LoginControllers: Symbol('LoginControllers'),
	RegisterServices: Symbol('RegisterServices'),
	RegisterControllers: Symbol('RegisterControllers'),
	ActionsControllers: Symbol('ActionsControllers'),
	ActionsServices: Symbol('ActionsServices'),
	ActionsRoutes: Symbol('ActionsRoutes'),
	ActionsFactory: Symbol('ActionsFactory'),
	Schedulers: Symbol('Schedulers'),
	ParamValidation: Symbol('ParamValidation'),
};
