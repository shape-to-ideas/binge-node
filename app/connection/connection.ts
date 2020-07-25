import * as mongoose from 'mongoose';
import {inject, injectable} from "inversify";
import {Config} from "../shared/interfaces";
import {Symbols} from "../config/symbols";

@injectable()
export class Connection {
  constructor(
    @inject(Symbols.Config) private config: Config
  ) {
    console.log('Creating DatabaseService');
  }
  
  public connectToDb() {
    mongoose.connect(this.config.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return mongoose.connection;
  }
}
