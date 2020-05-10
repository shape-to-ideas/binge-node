import {injectable} from "inversify";
import {Movies} from './interfaces'

@injectable()
export class MovieFactory {
    constructor(){}
    
    public buildMovies(payload) {
        return {
            popularity: payload.popularity,
            voteCount: payload.vote_count,
            video: payload.video,
            poster: payload.poster_path,
            id: payload.id,
            adult: payload.adult,
            image: payload.backdrop_path,
            originalLanguage: payload.original_language,
            originalTitle: payload.original_title,
            genreIds: payload.genre_ids,
            title: payload.title,
            voteAverage: payload.vote_average,
            overview: payload.overview,
            releaseDate: payload.release_date,
        }
    }
}
