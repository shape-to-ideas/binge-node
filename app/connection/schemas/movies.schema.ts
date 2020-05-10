import * as mongoose from 'mongoose';
import {injectable} from "inversify";

@injectable()
export class MoviesSchema {
    Schema = mongoose.Schema;
    moviesSchema: mongoose.Schema;
    moviesModel;
    public initMovieSchema() {
        this.moviesSchema = new this.Schema({
            popularity: Number,
            vote_count: Number,
            video: Boolean,
            poster_path: String,
            id: Number,
            adult: Boolean,
            backdrop_path: String,
            original_language: String,
            original_title: String,
            genre_ids: [Number],
            title: String,
            vote_average: Number,
            overview: String,
            release_date: String,
        });
        this.moviesModel = mongoose.model('Movies', this.moviesSchema);
    }
    
    public getModel() {
        return this.moviesModel
    }
}
