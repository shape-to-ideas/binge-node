import { injectable } from 'inversify';

@injectable()
export class ActionsFactory {
	public buildTokenResponse(userData) {
		return {
			username: userData.username,
			email: userData.email,
			firstname: userData.firstname,
			lastname: userData.lastname,
			liked_movies: userData.liked_movies,
		};
	}
}
