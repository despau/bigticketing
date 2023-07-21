import request from 'supertest';
import mongoose from 'mongoose';

import { app } from './../../app';


it('returns 404 if id does not exist', async () => {

    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/ticekts/${id}`)
        .set('Cookie', global.signin())
        .send({ title: 'ripe pineable', price: 55 })
        .expect(404)


});


it('returns 401 if user is not authenticated', async () => {

    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/ticekts/${id}`)
        .send({ title: 'ripe pineable', price: 55 })
        .expect(401)


});



it('returns 404 if ', async () => {


});



it('returns 401 ticket doesnt belong to user', async () => {


});



it('returns 400 is ticket title/item (title, price) is invalid', async () => {


});


it('updates ticket if value is good', async () => {


});
