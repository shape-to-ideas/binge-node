import * as mongoose from 'mongoose';
import {injectable} from "inversify";

@injectable()
export class UsersSchema {
    Schema = mongoose.Schema;
    usersSchema: mongoose.Schema;
    usersModel;
    public initUsersSchema() {
        this.usersSchema = new this.Schema({
                email: String,
                username: String,
                password: String,
                firstname: String,
                lastname: String,
            }
        );
        this.usersModel = mongoose.model('Users', this.usersSchema);
    }
    
    public getModel() {
        return this.usersModel
    }
}
