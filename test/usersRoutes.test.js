const supertest = require('supertest');
const chai = require('chai');
const app = require('../src/server');
const expect = chai.expect;
let id
let username
let access_token
let refresh_token 
let userId
function getRandomIndex(arr) {
  if (arr.length === 0) {
    throw new Error('Array is empty');
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return randomIndex;
}
describe('User Routes', () => {
  // Test for getting all users
  it('should get all users', async () => {
    const response = await supertest(app).get('/api/users');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    id = response.body[getRandomIndex(response.body)]._id
    username = response.body[getRandomIndex(response.body)].username
  });

  // Test for creating a new user
  it('should create a new user', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
      "name": "Jane Smith",
      "role": "doctor",
      "email": "jane.smigsdth@example.com",
      "phonenumber": "987-654-3210",
      "reservations": []
    };
    const response = await supertest(app).post('/api/users').send(newUser);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('access_token');
    refresh_token = response.body.refresh_token
    userId = response.body._id
  });
  it('should get a user by ID', async () => {
    const response = await supertest(app).get('/api/users/' + id );
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('_id');
  });

  // Test for getting a user by a specific key-value pair
  it('should get a user by a specific key-value pair', async () => {
    // Assume 'username' and 'testuser' exist in your database
    const response = await supertest(app).get('/api/users/username/'+username);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('_id');
  });

  // Test for user login
  it('should log in a user', async () => {
    const credentials = {
      "username": "jane.smith",
      "password": "pass456",
    };
    const response = await supertest(app).post('/api/users/login').send(credentials);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('access_token');
  });

  // Test for generating an access token from a refresh token
  it('should generate an access token from a refresh token', async () => {
    // Assume 'validRefreshToken' is a valid refresh token
    const refreshTokenData = { refresh_token};
    const response = await supertest(app).post('/api/users/generateAccessToken').send(refreshTokenData);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('access_token');
    access_token = response.body.access_token
  });

  // Test for verifying the validity of an access token
  it('should verify the validity of an access token', async () => {
    // Assume 'validAccessToken' is a valid access token
    const accessTokenData = { access_token,userId};
    const response = await supertest(app).post('/api/users/verifyAccessToken').send(accessTokenData);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('valid').to.equal(true);
  });

  // Test for verifying the validity of a refresh token
  it('should verify the validity of a refresh token', async () => {
    // Assume 'validRefreshToken' is a valid refresh token
    const refreshTokenData = {refresh_token,userId};
    const response = await supertest(app).post('/api/users/verifyRefreshToken').send(refreshTokenData);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('valid').to.equal(true);
  });

  // Test for updating a user by ID
  it('should update a user by ID', async () => {
    // Assume 'exampleUserId' exists in your database
    const updatedUserData = {
      // Provide the updated data
      username: 'majsflsd',
      // Add other updated fields
    };
    const response = await supertest(app).put('/api/users/' + id).send(updatedUserData);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('username').to.equal('majsflsd');
  });

  // Test for deleting a user by ID
  it('should delete a user by ID', async () => {
    // Assume 'exampleUserId' exists in your database
    const response = await supertest(app).delete('/api/users/'+id);
    expect(response.status).to.equal(200);
    // Add more assertions based on your application logic
  });

  // // Test for deleting all users
  // it('should delete all users', async () => {
  //   const response = await supertest(app).delete('/api/users');
  //   expect(response.status).to.equal(200);
  //   // Add more assertions based on your application logic
  // });
});
