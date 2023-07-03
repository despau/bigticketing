import request from 'supertest';
import { app } from './../../app';

it('fails when submit with a non-existing email address', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: '2test@test.com',
            password: 'password'
        })
        .expect(400)
})

it('fails when submit with an incorect password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'fasfdafsdfsd'
        })
        .expect(400)
})

it('responds with a cookie given a valid credential', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
})