const e = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');


//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors(corsOptions))


//Routes
app.use(require('./routes/index'));
app.use('/api/clients',require('./routes/clients'));
app.use('/api/tables', require('./routes/tables'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/ordenes', require('./routes/ordenes'));
app.use('/api/reservaciones', require('./routes/reservaciones'));

//Starting server
app.listen(3000, () => {
    console.log(`Server on port ${app.get('port')}`);
});