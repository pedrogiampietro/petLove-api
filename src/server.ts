import express from 'express';
import cors from 'cors';

import authController from './controllers/AuthController';
import jobController from './controllers/JobController';
import animalController from './controllers/AnimalController';
import userController from './controllers/UserController';

const app = express();

app.use((_, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header(
		'Access-Control-Allow-Methods',
		'GET,HEAD,OPTIONS,POST,PUT,PATCH'
	);
	response.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	response.header('Access-Control-Expose-Headers', 'x-total-count');

	return next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/authenticate', authController);
app.use('/job', jobController);
app.use('/animal', animalController);
app.use('/user', userController);

app.get('/', (req, res) => {
	return res.json({ status: 'OK', data: new Date().toLocaleString() });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
