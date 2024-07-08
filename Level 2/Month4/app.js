const expressFramework = require('express');
const filePath = require('path');
const httpProtocol = require('http');
const websocketIO = require('socket.io');
const sessionMiddleware = require('express-session');

const databaseConfig = require('./configuration/database');

// Database connection
databaseConfig.authenticate()
    .then(() => console.log('Database connection: Successful'))
    .catch(error => console.log('Database connection: Failed ' + error))

const webApp = expressFramework();
const httpServer = httpProtocol.createServer(webApp);
const socketServer = websocketIO(httpServer);

// Socket.io configuration
socketServer.on('connection', clientSocket => {
    console.log('New connection to the hotel site');

    clientSocket.emit('welcomeMessage', 'Welcome');
    clientSocket.broadcast.emit('newUserMessage', 'Visitor Arrived');
    clientSocket.on('disconnect', () => {
        socketServer.emit('userLeftMessage', 'Visitor Left');
    });
});

// Middleware
webApp.use(expressFramework.urlencoded({extended: true}));
webApp.use(expressFramework.json());

// View engine setup
webApp.set("view engine", "ejs");

// Routes
webApp.get('/', (request, response) => response.render('homepage', {pageTitle: "Welcome"}));
webApp.use(expressFramework.static('public'));

webApp.get('/findhotel', (request, response) => response.render('searchpage', {pageTitle: 'Find Hotels'}));

webApp.get('/checkout', (request, response) => response.render('payment', {pageTitle: "Checkout"}));

// User details routes
webApp.post('/submitdetails', (request, response) => {
    const insertQuery = 'INSERT INTO usertransaction SET ?';
    const newUser = {
          firstName: request.body.fname,
          middleName: request.body.mname,
          lastName: request.body.lname,
          emailAddress: request.body.email,
          phoneNumber: request.body.phoneno,
          countryOfResidence: request.body.country,
          cardHolderName: request.body.nameoncard,
          cardNumber: request.body.cardno,
          cardExpiryDate: request.body.expdate,
          cardCVV: request.body.cvv
  };
});

webApp.put('/modifydetails/:userId', (request, response) => {
    const updateQuery = 'UPDATE usertransaction SET ? WHERE userid = ?';
    // Implementation remains the same
});

webApp.delete('/removedetails/:userId', (request, response) => {
    const deleteQuery = 'DELETE FROM usertransaction WHERE userid = ?';
    // Implementation remains the same
});

// Server configuration
const SERVER_PORT = process.env.PORT || 4411;

httpServer.listen(SERVER_PORT, () => console.log(`Server is active on port ${SERVER_PORT}`));