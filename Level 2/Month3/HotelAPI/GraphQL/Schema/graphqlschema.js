const { gql } = require('apollo-server-express');
const userHandlers = require('../Handlers/userHandlers');
const hotelHandlers = require('../Handlers/hotelHandlers');
const bookingHandlers = require('../Handlers/bookingHandlers');
const roomHandlers = require('../Handlers/roomHandlers');

const typeDefs = gql`
  type Person {
    id: ID!
    fullName: String!
    secretCode: String!
    emailAddress: String!
    role: String!
  }

  type Accommodation {
    id: ID!
    name: String!
    location: String!
    description: String!
    rating: Float!
  }

  type Reservation {
    id: ID!
    personId: ID!
    roomId: ID!
    type: String!
    price: Float!
  }

  type Room {
    id: ID!
    personId: ID!
    checkInDate: String!
    checkOutDate: String!
    totalPrice: Float!
  }

  type Query {
    people: [Person!]!
    person(id: ID!): Person
    accommodations: [Accommodation!]!
    accommodation(id: ID!): Accommodation
    reservations: [Reservation!]!
    reservation(id: ID!): Reservation
    rooms: [Room!]!
    room(id: ID!): Room
  }

  type Mutation {
    createPerson(input: CreatePersonInput!): Person!
    updatePerson(id: ID!, input: UpdatePersonInput!): Person!
    deletePerson(id: ID!): DeleteResponse!
    createAccommodation(input: CreateAccommodationInput!): Accommodation!
    updateAccommodation(id: ID!, input: UpdateAccommodationInput!): Accommodation!
    deleteAccommodation(id: ID!): DeleteResponse!
    createReservation(input: CreateReservationInput!): Reservation!
    updateReservation(id: ID!, input: UpdateReservationInput!): Reservation!
    deleteReservation(id: ID!): DeleteResponse!
    createRoom(input: CreateRoomInput!): Room!
    updateRoom(id: ID!, input: UpdateRoomInput!): Room!
    deleteRoom(id: ID!): DeleteResponse!
  }

  input CreatePersonInput {
    fullName: String!
    secretCode: String!
    emailAddress: String!
  }

  input UpdatePersonInput {
    fullName: String
    secretCode: String
    emailAddress: String
  }

  input CreateAccommodationInput {
    name: String!
    location: String!
    description: String!
    rating: Float!
  }

  input UpdateAccommodationInput {
    name: String
    location: String
    description: String
    rating: Float
  }

  input CreateReservationInput {
    personId: ID!
    roomId: ID!
    type: String!
    price: Float!
  }

  input UpdateReservationInput {
    personId: ID
    roomId: ID
    type: String
    price: Float
  }

  input CreateRoomInput {
    personId: ID!
    checkInDate: String!
    checkOutDate: String!
    totalPrice: Float!
  }

  input UpdateRoomInput {
    personId: ID
    checkInDate: String
    checkOutDate: String
    totalPrice: Float
  }

  type DeleteResponse {
    message: String!
  }
`;

const handlers = {
  Query: {
    ...userHandlers.Query,
    ...hotelHandlers.Query,
    ...bookingHandlers.Query,
    ...roomHandlers.Query
  },
  Mutation: {
    ...userHandlers.Mutation,
    ...hotelHandlers.Mutation,
    ...bookingHandlers.Mutation,
    ...roomHandlers.Mutation
  }
};

module.exports = { typeDefs, handlers };
