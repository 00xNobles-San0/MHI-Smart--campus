const supertest = require('supertest');
const chai = require('chai');
const app = require('../src/server');
const expect = chai.expect;
let userId
let spaceId
let id
let location

function getRandomIndex(arr) {
  if (arr.length === 0) {
    throw new Error('Array is empty');
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return randomIndex;
}


describe('Reservation Routes', () => {
  it('should get all users', async () => {
    const response = await supertest(app).get('/api/users');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    const user = response.body[getRandomIndex(response.body)]
    userId = user._id
  });
  it('should get all spaces', async () => {
    const response = await supertest(app).get('/api/parking-spaces');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    spaceId = response.body[getRandomIndex(response.body)]._id
    location = response.body[getRandomIndex(response.body)].location
  });

  it('should get all reservations', async () => {
    const response = await supertest(app).get('/api/reservation');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    id = response.body[getRandomIndex(response.body)]._id
  });

  it('should create a new reservation', async () => {
    const newReservation = {
      spaceId,
      userId,
      location,
      starttime: new Date(),
      endtime: new Date(),
    };
    const response = await supertest(app).post('/api/reservation').send(newReservation);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('_id');
  });

  it('should get a reservation by ID', async () => {
    const response = await supertest(app).get('/api/reservation/'+id);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('_id');
  });

  it('should update a reservation by ID', async () => {
    const updatedReservationData = {
      location: 'Parking Lot H',
    };
    const response = await supertest(app).put('/api/reservation/'+id).send(updatedReservationData);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('location').to.equal('Parking Lot H');
  });

  it('should delete a reservation by ID', async () => {
    const response = await supertest(app).delete('/api/reservation/' + id);
    expect(response.status).to.equal(200);
  });

  it('should get a reservation by a specific key-value pair', async () => {
    const response = await supertest(app).get('/api/reservation/spaceId/'+spaceId);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('_id');
  });
});