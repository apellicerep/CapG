//Load Modules
const express = require('express');
const morgan = require('morgan');
var sequelize = require('./models').sequelize;
const cors = require('cors');
const path = require('path')



// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

//route
const assignmentRouter = require('./routes/assignments')

//use cors
app.use(cors({
    exposedHeaders: ['location'] //expongo la cabecera location para que cuando responda en una de mis rutas con location el front end pueda coger esa direccion por ejemplo
    //para poder redireccionarlo.
}));

//Production
//app.use(express.static(path.join(__dirname, 'build')));


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/assignments', assignmentRouter)

//Production
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });

// send 404 if no other route matched
app.use((req, res) => {
    res.status(404).json({
        message: 'Route Not Found',
    });
});

// setup a global error handler
app.use((err, req, res, next) => {
    console.log(err)
    console.log(err)
    if (enableGlobalErrorLogging) {
        console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    }

    res.status(err.status || 500).json({
        message: err.message
    });
});

// set our port
app.set('port', process.env.PORT || 5000);


// start listening on our port -con { force: true } creo tablas de nuevo y pierdo la info!
sequelize.sync({ force: true }).then(() => {
    app.listen(app.get('port'), () => {
        console.log(`Express server is listening on port ${app.get('port')}`);
    })

});