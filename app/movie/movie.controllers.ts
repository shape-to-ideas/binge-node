import { inject, injectable } from 'inversify';
import { Symbols } from '../config/symbols';
import * as express from 'express';
import { MovieServices } from './movie.services';
import { Movies } from './interfaces';
import { LoggerServices } from '../shared';

@injectable()
export class MovieControllers {
	constructor(
		@inject(Symbols.MovieServices) private movieServices: MovieServices,
		@inject(Symbols.LoggerServices) private loggerService: LoggerServices,
	) {}

	getMovieById = async (req: express.Request, res: express.Response) => {
		try {
			let movieId = req.params.id;
			let movie = await this.movieServices.getMovieById(movieId);
			this.loggerService.logResponseSent(res, req, movie);
		} catch (err) {
			this.loggerService.logErrorResponse(res, err);
		}
	};

	getMultipleMovies = async (req: express.Request, res: express.Response) => {
		try {
			let movieIds = req.body.movieIds;
			let movie = await this.movieServices.getMovies(movieIds);
			this.loggerService.logResponseSent(res, req, movie);
		} catch (err) {
			this.loggerService.logErrorResponse(res, err);
		}
	};

	// Not using anymore
	insertMovie = async (req: express.Request, res: express.Response) => {
		try {
			let params = req.body;
			let movie = await this.movieServices.insertMovie(params);
			res.send(movie);
		} catch (err) {
			this.loggerService.logErrorResponse(res, err);
		}
	};

	searchByTitle = async (req: express.Request, res: express.Response) => {
		try {
			const keyword = req.params.title;
			const movie: Movies[] = await this.movieServices.searchByTitle(
				keyword,
			);
			this.loggerService.logResponseSent(res, req, movie);
		} catch (err) {
			this.loggerService.logErrorResponse(res, err);
		}
	};

	getMovieByGenre = async (req: express.Request, res: express.Response) => {
		try {
			const genreId = parseInt(req.params.genreId, 10);
			const page = req.query.page ? parseInt(req.query.page, 10) : 1;
			const pageSize = 50;
			const movie: Movies[] = await this.movieServices.getMovieByGenre(
				genreId,
				page,
				pageSize,
			);
			this.loggerService.logResponseSent(res, req, movie);
		} catch (err) {
			this.loggerService.logErrorResponse(res, err);
		}
	};

	getMovieByTitle = async (req: express.Request, res: express.Response) => {
		try {
			const movieTitles = req.body.movieTitles;
			const movie: Movies[] = await this.movieServices.getMoviesByTitle(
				movieTitles,
			);
			this.loggerService.logResponseSent(res, req, movie);
		} catch (err) {
			this.loggerService.logErrorResponse(res, err);
		}
	};
}
