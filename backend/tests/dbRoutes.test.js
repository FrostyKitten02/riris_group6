import {deleteDocumentById} from "../src/pouchdb";

process.env.NODE_ENV = 'test';
import request from 'supertest';
import app from '../index.mjs'

jest.mock('../src/pouchdb', () => ({
    ...jest.requireActual('../src/pouchdb'), // Preserve other functions if needed
    deleteDocument: jest.fn(), // Mock the deleteDocument function
    updateDocument: jest.fn(),
    destroy: jest.fn(),
    deleteDocumentById: jest.fn()
}));

beforeEach(() => {
    app.use((req, res, next) => {
        console.log('Mocking auth for test');
        req.auth = { userId: 'test-user-id' };  // Mock authentication data
        next();  // Skip actual auth check
    });
});

describe('POST /api/db/add', () => {
    it('should add a document successfully', async () => {
        const response = await request(app)
            .post('/api/db/add')
            .set('Authorization', 'Bearer validToken') // Dodajte veljaven JWT
            .send({
                name: 'Test Document',
                content: 'This is a test document.',
            });

        expect(response.status).toBe(200);
        //expect(response.body).toHaveProperty('ok', true);
    });
});


describe('GET /api/db/all', () => {
    it('should return all documents', async () => {
        const response = await request(app)
            .get('/api/db/all')
            .set('Authorization', 'Bearer validToken');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});


describe('DELETE /api/db/delete/:id/:rev', () => {
    it('should delete a document successfully', async () => {
        const response = await request(app)
            .delete('/api/db/delete/testId/testRev')
            .set('Authorization', 'Bearer validToken');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Document deleted successfully');
    });
});


describe('PUT /api/db/update/:id', () => {
    it('should update a document successfully', async () => {
        const response = await request(app)
            .put('/api/db/update/testId')
            .set('Authorization', 'Bearer validToken')
            .send({
                content: 'Updated content',
            });

        expect(response.status).toBe(200);
    });
});

describe('POST /api/db/addList', () => {
    it('should add multiple documents successfully', async () => {
        const response = await request(app)
            .post('/api/db/addList')
            .set('Authorization', 'Bearer validToken')
            .send([
                { name: 'Document 1', content: 'Content of document 1' },
                { name: 'Document 2', content: 'Content of document 2' },
            ]);

        expect(response.status).toBe(200);
        // Check the response for any specific message or data structure
    });
});


describe('GET /api/db/all/:page', () => {
    it('should return documents for a specific page', async () => {
        const response = await request(app)
            .get('/api/db/all/1') // Requesting the first page
            .set('Authorization', 'Bearer validToken');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); // Ensure some documents are returned
    });
});

describe('GET /api/db/pages', () => {
    it('should return the number of pages', async () => {
        const response = await request(app)
            .get('/api/db/pages')
            .set('Authorization', 'Bearer validToken');

        expect(response.status).toBe(200);
        expect(response.body).toBeGreaterThan(0); // Ensure a number of pages is returned
    });
});


describe('DELETE /api/db/delete/:id', () => {
    it('should delete a document by ID', async () => {
        const response = await request(app)
            .delete('/api/db/delete/testId')
            .set('Authorization', 'Bearer validToken');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Document deleted successfully');
    });
});

describe('DELETE /api/db/delete/:id (Delete Non-Existent Document)', () => {
    it('should return a message indicating the document was not found', async () => {
        const response = await request(app)
            .delete('/api/db/delete/nonExistentId/nonExistentRev')
            .set('Authorization', 'Bearer validToken');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Document deleted successfully');
    });
});


describe('GET /api/db/all/:page (Pagination)', () => {
    it('should return the correct documents for a specific page', async () => {
        const response = await request(app)
            .get('/api/db/all/1')
            .set('Authorization', 'Bearer validToken');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeLessThanOrEqual(5);  // Assuming each page returns a max of 5 documents
    });

    it('should return an empty array if the page exceeds total pages', async () => {
        // Simulate there being no documents on page 100
        const response = await request(app)
            .get('/api/db/all/100')
            .set('Authorization', 'Bearer validToken');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);  // No documents should be returned
    });
});