const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig');
const userDb = require('../users/users-model');

    
// /api/users/...
describe('auth router', () => {
    // user can update account
    describe('POST /auth/register', () => {
        it('should return status 201 if registered', async () => {
            const res = await request(server).post('/api/auth/register')
            .send({
                username: 'testuser1234',
                password: 'pass',
            });

            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
        })
    })

    // user can login
    describe('POST /auth/login', () => {
        it('should require authorization', async () => {
            it('should return status 200 and an array if authenticated', async () => {
                const auth = await request(server).post('/api/auth/login')
                .send({
                    username: 'testuser1234',
                    password: 'pass'
                });
            })
        })
    });

    // user can reach jokes
    describe('GET /api/jokes', () => {
        it('should require authorization', async () => {
            const res = await request(server).get('/api/jokes');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({message: 'No token was provided'})
        });

        it('should return status 200', async () => {
            const auth = await request(server).post('/api/auth/login')
            .send({
                username: 'testuser1234',
                password: 'pass'
            });

            const res = await request(server).get('/api/jokes').set({'authorization': auth.body.token});
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
            expect(res.body.length).toBeTruthy();
        })
    })
});