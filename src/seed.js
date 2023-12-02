const path = require('path');
const fs = require('fs').promises;
let spaceModel = require('./models/spaceModel');
let reservationsModel = require('./models/reservationsModel');
let usersModel = require('./models/usersModel');
const { connectToDatabase, disconnectFromDatabase } = require('./connectToDatabase');

const seedUsers = async () => {
  let con
  try {
    con = await connectToDatabase()
    const Users = await usersModel(con)
    const usersData = await fs.readFile(path.join(__dirname, '../', 'data', 'users.json'), 'utf8');
    const users = JSON.parse(usersData);
    await Users.create(users);

    console.log('Users seeding completed.');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await disconnectFromDatabase(con)
  }
};

const seedParkingSpaces = async () => {
  let con
  try {
    con = await connectToDatabase()
    const ParkingSpaces = await spaceModel(con)
    const parkingSpacesData = await fs.readFile(path.join(__dirname, '../', 'data', 'parkingSpaces.json'), 'utf8');
    const parkingSpaces = JSON.parse(parkingSpacesData);

    // Use create() for bulk insertion
    await ParkingSpaces.create(parkingSpaces);

    console.log('Parking spaces seeding completed.');
  } catch (error) {
    console.error('Error seeding parking spaces:', error);
  } finally {
    await disconnectFromDatabase(con)
  }
};
const seedReservations = async () => {
  let con
  try {
    con = await connectToDatabase()
    const ParkingSpaces = await  spaceModel(con)
    const Users = await usersModel(con)
    const Reservations = await reservationsModel(con)
    const reservationsData = await fs.readFile(path.join(__dirname, '../', 'data', 'reservations.json'), 'utf8');
    const reservations = JSON.parse(reservationsData);
    const allUsers = await Users.find();
    const allParkingSpaces = await ParkingSpaces.find();
    function getRandomIndex(arr) {
      if (arr.length === 0) {
        throw new Error('Array is empty');
      }
    
      const randomIndex = Math.floor(Math.random() * arr.length);
      return randomIndex;
    }

    for (const reservation of reservations) {
      const randomUserIndex = getRandomIndex(allUsers);
      const randomParkingSpaceIndex = getRandomIndex(allParkingSpaces);
      reservation.userId = allUsers[randomUserIndex]._id;
      reservation.spaceId = allParkingSpaces[randomParkingSpaceIndex]._id;
      await Reservations.create(reservation);
    }

    console.log('Reservations seeding completed.');
  } catch (error) {
    console.error('Error seeding reservations:', error);
  } finally {
    await disconnectFromDatabase(con)
  }
};


// Execute the seed functions
seedUsers().then(()=>{
  seedParkingSpaces().then(()=>{
    seedReservations();
  });
})
