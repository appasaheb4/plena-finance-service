/* eslint-disable object-curly-spacing */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import formData from 'express-form-data';
import apiRoutes from './routes/index';
import {connect} from './drivers';

const app = express();
const port = 8080;

connect();
app.use(cors());
app.use(morgan('dev'));
app.use(cors({origin: '*'}));
app.disable('x-powered-by');
app.use(formData.parse());
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.set('trust proxy', true);
app.listen(port, () => {
  console.log('Server Initialization Complete', port);
});
