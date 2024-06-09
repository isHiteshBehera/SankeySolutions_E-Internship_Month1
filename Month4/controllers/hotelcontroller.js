const databaseConfig = require('../configuration/database');
const database = require('../configuration/database');
const HotelEntity = require('../models/hotel');

const createHotel = async (req, res) => {
    res.render('homepage', { title: "Homepage" });
};

const fetchHotels = async (req, res) => {
    let hotelList = await HotelEntity.findAll({
        attributes: [
            'destination',
            'executive',
            'accommodation',
            'arrival',
            'departure',
        ]
    });
    res.render('searchpage', { title: "Search Page" });
};

const renderPaymentPage = async (req, res) => {
    try {
        res.render('payment', { title: 'Payment Gateway' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Page rendering failed' });
    }
};

module.exports = {
    createHotel,
    fetchHotels,
    renderPaymentPage
};