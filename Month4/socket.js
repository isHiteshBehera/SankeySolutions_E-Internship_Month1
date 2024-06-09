const tcp = require('net');
const { fetchHotelRates } = require('./configuration/database');

const tcpServer = tcp.createServer((client) => {
    console.log('New client connection established');

    client.on('data', (incomingData) => {
        const { destination, roomType, stayDuration } = JSON.parse(incomingData);

        fetchHotelRates(destination, roomType, stayDuration)
            .then((hotelList) => {
                hotelList.forEach((hotelInfo) => {
                    client.write(JSON.stringify(hotelInfo) + '\n');
                });
            })
            .catch((err) => {
                console.error('Database query error:', err);
            });
    });

    client.on('end', () => {
        console.log('Client has disconnected');
    });
});

const tcpPort = 9999;
tcpServer.listen(tcpPort, () => {
    console.log(`TCP server active on port ${tcpPort}`);
});