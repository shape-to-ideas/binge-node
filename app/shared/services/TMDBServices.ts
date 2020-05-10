import { inject, injectable } from 'inversify';
import {Symbols} from "../../config/symbols";
import {Config} from '../../shared';
import axios from 'axios';

@injectable()
export class TMDBServices {
    constructor(
        @inject(Symbols.Config) private config: Config
    ){}
    public search(query: string, language?: string, page?: number, includeAdult?: boolean) {
        let apiString = `${this.config.tmdbEndpoint}search/movie?api_key=asdfa&query=${query}`;
        if (language) {
            apiString += `&language=${language}`;
        }
        if (page) {
            apiString += `&page=${page}`;
        }
        if (includeAdult) {
            apiString += `&include_adult=${includeAdult}`;
        }
        return axios.get(apiString);
    }
    public insertFiltered() {
    
    }
}
