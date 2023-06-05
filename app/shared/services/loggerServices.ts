import { injectable } from 'inversify';
import { createLogger, transports } from 'winston';
import { get } from 'lodash';

@injectable()
export class LoggerServices {
	constructor() {}

	public logger(fileName: string = 'applicationLogs/application-logs.log') {
		return createLogger({
			transports: [
				new transports.Console(),
				new transports.File({ filename: fileName }),
			], // @TODO error deletion scheduler
		});
	}

	public logErrorResponse(response: any, error: any) {
		this.logger().error(error.stack);
		response.send({
			status: get(error, 'status', 400),
			message: get(error, 'message', 'Internal Server error'),
		});
	}

	public logResponseSent(response, request, data) {
		this.logger().info({ status: 200, route: request.originalUrl });
		response.send(data);
	}

	public logError(error: any) {
		this.logger().error(error.stack);
	}

	public deleteLogFiles() {
		console.log('TO delete log files');
	}
}
