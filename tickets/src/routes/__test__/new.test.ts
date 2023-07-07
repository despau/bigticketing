import request from 'supertest';
import { app } from './../../app'
import { Ticket } from '../../models/ticket';

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);

});

it('returns a status !== 401 if user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});

    expect(response.status).not.toEqual(401);
});

it('returns an error if provided an invalid title', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })
        .expect(400);
});

it('returns an error if provided an invalid price', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'valid title',
            price: -10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'title without price'
        })
        .expect(400);

});

it('creates a ticket with valid inputs', async () => {
    // add in a check to ensure ticket was saved
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = 'title with valid input';

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price: '5'
        })
        .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(5);
    expect(tickets[0].title).toEqual(title);

});


// it('', async () => {

// });
