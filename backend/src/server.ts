import express from 'express';
import routes from './routes/'

import './data';

const app = express();

app.use(routes);

app.listen(3000, () => {
    console.log('🎉 Server started');
});