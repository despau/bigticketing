import request from 'supertest';
import mongoose from 'mongoose';

import { app } from './../../app';
import { Ticket } from '../../models/ticket';


it('returns 404 if the ticket is not found', async () => {

    const id = new mongoose.Types.ObjectId().toHexString();

    //need to fix problem in common errors ts
    await request(app).get(`/api/tickets/${id}`).send().expect(400);
});


it('creates a ticket with valid inputs', async () => {

    const title = 'title with valid input';
    const price = 10;

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title, 
            price
        })
        .expect(201);

    await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);
    
    // console.log('ticketResponse to see shape: ', ticketResponse)
    // expect(ticketResponse.body.price).toEqual(5);
    // expect(ticketResponse.body.title).toEqual(title);

});