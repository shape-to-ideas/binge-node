export interface Config {
    apiPort: number;
    connectionString: string;
    tmdbApiKey: string;
    tmdbEndpoint: string;
    saltRounds: string;
    secretKey: string;
    topRatedApiPage: number;
  "schedulersToRun": {
    "topRatedMovies": boolean;
  }
}
