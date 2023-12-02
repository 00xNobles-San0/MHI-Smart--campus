const supertest = require('supertest');
const chai = require('chai');
const app = require('../src/server');
const expect = chai.expect;

let parkingSpaceId;

function getRandomIndex(arr) {
  if (arr.length === 0) {
    throw new Error('Array is empty');
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return randomIndex;
}

describe('Parking Space Routes', () => {
  it('should create a new parking space', async () => {
    const newParkingSpace = {
      isOccupied: false,
      location: 'Parking Lot A',
      type: 'Standard',
    };
    const response = await supertest(app).post('/api/parking-spaces').send(newParkingSpace);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('_id');
    parkingSpaceId = response.body._id;
  });

  it('should get a parking space by ID', async () => {
    const response = await supertest(app).get('/api/parking-spaces/' + parkingSpaceId);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('_id');
  });

  it('should update a parking space by ID', async () => {
    const updatedParkingSpaceData = {
      location: 'Parking Lot B',
    };
    const response = await supertest(app).put('/api/parking-spaces/' + parkingSpaceId).send(updatedParkingSpaceData);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('location').to.equal('Parking Lot B');
  });

  it('should delete a parking space by ID', async () => {
    const response = await supertest(app).delete('/api/parking-spaces/' + parkingSpaceId);
    expect(response.status).to.equal(200);
  });

  it('should get a parking space by a specific key-value pair', async () => {
    const response = await supertest(app).get('/api/parking-spaces/location/Parking Lot A');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('_id');
  });

  it('should get all parking spaces', async () => {
    const response = await supertest(app).get('/api/parking-spaces');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});
