import * as mongoose from 'mongoose';
import {injectable} from "inversify";

@injectable()
export class CountersSchema {
  Schema = mongoose.Schema;
  countersSchema: mongoose.Schema;
  countersModel;
  
  public initCountersSchema() {
    this.countersSchema = new this.Schema({
        name: String,
        count: Number,
      }
    );
    this.countersModel = mongoose.model('Counters', this.countersSchema);
  }
  
  public getModel() {
    return this.countersModel
  }
}
