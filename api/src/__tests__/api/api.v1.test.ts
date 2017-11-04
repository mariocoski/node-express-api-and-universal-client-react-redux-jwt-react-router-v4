require('dotenv').config();
import { generateToken} from '../../utils';
import {findUserById, findUserByEmail} from '../../repositories/userRepo';
import {UNAUTHORIZED,USER_DOES_NOT_EXIST} from '../../constants/errors';
import config from '../../config/main';

const db = require('../../models');

describe('API V1', () => {

  const request = require('supertest');
  let app: any;

  beforeEach(async() => {
    await db.sequelize.sync({force:true});
    app = require('../../server');
  });

  afterEach(async() => {
    app.close();
  });

  it('should respond with 200 for health check', async () => {
    expect.assertions(1);
    const response = await request(app).get('/api/v1');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with 404', async () => {
    expect.assertions(2);
    const response = await request(app).get('/not-existing-route');
    expect(response.statusCode).toBe(404);
    expect(response.text).toMatchSnapshot();
  });

  it('should respond with 401 when token is not present', async () => {
    const response = await request(app).get('/api/v1/profile');
    expect(response.statusCode).toBe(401);
    expect(response.text).toMatchSnapshot();
  });

  it('should respond with 401 when token is invalid', async() => {
    const response = await request(app)
                                  .get('/api/v1/profile')
                                  .set('Authorization', 'Bearer invalid-token');
    expect(response.statusCode).toBe(401);
    expect(response.text).toMatchSnapshot();
  });

  it('should respond with 400 when _id is not present in user data', async() => {
    const userIdWhichDoesNotExist = 999;
    const token = await generateToken({});
    const response = await request(app)
                                  .get('/api/v1/profile')
                                  .set('Authorization',`Bearer ${token}`);
    expect(response.statusCode).toBe(400);
  });

  it('should respond with 401 when token is valid, but user does not exist anymore', async() => {
    const userIdWhichDoesNotExist = 999;
    const token = await generateToken({_id: userIdWhichDoesNotExist});
    const response = await request(app)
                                  .get('/api/v1/profile')
                                  .set('Authorization',`Bearer ${token}`);
    expect(response.statusCode).toBe(401);
    expect(response.text).toMatchSnapshot();
  });

  it('should respond with 200 when token is valid and user exists', async() => {
      const validUser = {email:config.mailgun_test_recipient, password: 'password'};
      await db.User.create(validUser);
      const foundUser = await findUserByEmail(config.mailgun_test_recipient);
      const token = await generateToken({_id: foundUser.id});
      const response = await request(app)
                                    .get('/api/v1/profile')
                                    .set('Authorization',`Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.text).toMatch(config.mailgun_test_recipient);
    });


});
