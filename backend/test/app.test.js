const assert = require('assert');
const request = require('supertest');
const express = require('express');
const app = require('../app'); // Adjust the path as necessary
describe('Backend Application', () => {
    it('hello world!', () => {
        assert.strictEqual(1 + 1, 2);
    });
});
describe('GET /', () => {
    it('should return 302 Found', (done) => {
        request(app)
            .get('/')
            .expect(302, done);
    });
});

describe('GET /api/test', () => {
    it('should return 200 OK and contain check result', (done) => {
        request(app)
            .get('/api/test')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.text.includes('Test OK, Time is:'));
                done();
            });
    });
});

describe('Static html file', () => {
    it('should return 200 OK and contain "Hello World"', (done) => {
        request(app)
            .get('/static.html')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.text.includes('static html test'));
                done();
            });
    });
});

// Close the server after all tests
after(() => {
    app.close();
});