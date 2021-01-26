import {injectable} from 'inversify';

@injectable()
export class ParamValidation {
  constructor() {
  }
  
  public validateParams(params: any) {
    console.log(params);
    return (req, res, next) => {
      console.log(req.body);
      
        next();
    }
  }
}
