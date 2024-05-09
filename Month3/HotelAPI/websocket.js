const { Server } = require('socket.io');
const { Hotel } = require('./Models/hotel');

const initializeWebSocket = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (clientSocket) => {
    console.log('Client Connected');

    setInterval(async () => {
      try {
        const hotels = await Hotel.findAll({
          attributes: ['name', 'price'],
          order: [['createdAt', 'DESC']],
          limit: 10,
        });
        clientSocket.emit('recentPrices', hotels);
      } catch (error) {
        console.error('Error while fetching the prices:', error);
      }
    }, 5000);

    clientSocket.on('disconnect', () => {
      console.log('Client Disconnected');
    });
  });
};

module.exports = initializeWebSocket;
