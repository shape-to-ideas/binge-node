import 'dotenv/config';
import container from './config/inversify.config';
import * as express from 'express';
import * as http from 'http';

const cors = require('cors');
const cookieParser = require('cookie-parser');
import { Schedulers } from './shared';

import { Bootstrap } from './bootstrap';
import { Symbols } from './config/symbols';
import { Connection } from './connection';

const bootstrap = container.get<Bootstrap>(Symbols.Bootstrap);
const connection = container.get<Connection>(Symbols.Connection);
const schedulers = container.get<Schedulers>(Symbols.Schedulers);
// const {spawn} = require('child_process');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.options('*', cors());
app.use(cookieParser());

try {
	bootstrap.init(app);
} catch (error) {
	console.log('ApplicationError', error, {
		message: 'An error occurred while bootstrapping',
	});
}

try {
	connection
		.connectToDb()
		.on('error', console.error.bind(console, 'connection error:'));
	connection.connectToDb().once('open', function () {
		console.log(`Database connection successful`);
	});
} catch (err) {
	console.log('ApplicationError', err, {
		message: 'An error occurred connection to DB',
	});
}

app.get('/', (req, res) => {
	res.send('Welcome to binge API');
});

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
	console.log(`listening to ${process.env.PORT || 3000}`);
	schedulers.run();

	// @TODO python script
	/*let dataToSend;
  const python = spawn('python', ['index.py']);
  
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    console.log(`Response  ${dataToSend}`);
    // send data to browser
  });*/
});
