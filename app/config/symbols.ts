export interface BingeSymbols {
    Connection: symbol;
    MovieRoutes: symbol;
    MovieControllers: symbol;
    MoviesSchema: symbol;
    MovieServices: symbol;
    MovieFactory: symbol;
    
    UsersSchema: symbol;
    
    Config: symbol;
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
}

export const Symbols: BingeSymbols = {
    Connection: Symbol('Connection'),
    MovieRoutes: Symbol('MovieRoutes'),
    MovieControllers: Symbol('MovieControllers'),
    MoviesSchema: Symbol('MoviesSchema'),
    MovieServices: Symbol('MovieServices'),
    MovieFactory: Symbol('MovieFactory'),
    
    UsersSchema: Symbol('UsersSchema'),
    
    Config: Symbol('Config'),
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
};
