import { injectable } from 'inversify';
import axios from 'axios';

@injectable()
export class TMDBServices {
	constructor() {}
	public search(
		query: string,
		language?: string,
		page?: number,
		includeAdult?: boolean,
	) {
		let apiString = `${process.env.TMDB_ENDPOINT}search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`;
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
	public getTopRatedMovies(options: { page: number }) {
		let params = '';
		if (options.page) {
			params += `&page=${options.page}`;
		}
		let apiString = `${process.env.TMDB_ENDPOINT}movie/top_rated?api_key=${process.env.TMDB_API_KEY}${params}`;
		return axios.get(apiString);
	}
}
