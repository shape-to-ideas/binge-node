import { injectable } from 'inversify';
import { pick, isEmpty } from 'lodash'

@injectable()
export class ParamValidation {
  constructor() {
  }

  public validateParams(params: any) {
    return (req, res, next) => {
      for (let element in params) {
        /** check for required fields*/
        if (!this.checkRequired(params[element], req.body[element])) {
          res.status(400).send({
            status: 400,
            error: {
              type: 'FIELD_REQUIRED',
              field: element
            }
          })
          return;
        }
        /** check for field types*/
        if (!this.checkType(params[element], req.body[element])) {
          res.status(400).send({
            status: 400,
            error: {
              type: 'INVALID_TYPE',
              field: element
            }
          })
          return;
        }
        /*ś* check for field  pattern*/ 
        if (params[element].pattern && !this.checkPattern(params[element], req.body[element])) {
          res.status(400).send({
            status: 400,
            error: {
              type: 'INVALID_VALUE',
              field: element
            }
          })
          return;
        }
      }
      next();
    }
  }

  private checkRequired(element, param) {
    return !(element.required === true && !param)
  }

  private checkType(element, param) {
    return (element.type === 'any' || element.type === typeof param)
  }

  private checkPattern(element, param) {
    const substring = element.pattern.substr(1, element.pattern.length - 2);
    return new RegExp(substring).test(param);
  }
}
