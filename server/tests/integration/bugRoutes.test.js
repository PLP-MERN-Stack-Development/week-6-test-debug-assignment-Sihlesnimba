// server/tests/integration/bugRoutes.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../../src/app.js'; // we'll extract the express app here

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Bug Routes API (integration)', () => {
  let bugId;

  it('should create a new bug', async () => {
    const res = await request(app).post('/api/bugs').send({
      title: 'Bug A',
      description: 'Test description',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Bug A');
    bugId = res.body._id;
  });

  it('should get all bugs', async () => {
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update bug status', async () => {
    const res = await request(app).patch(`/api/bugs/${bugId}`).send({
      status: 'resolved',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  it('should delete the bug', async () => {
    const res = await request(app).delete(`/api/bugs/${bugId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bug deleted');
  });
});
