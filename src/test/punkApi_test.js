const chai = require('chai');
chai.use(require('chai-json-schema'));
const { expect } = require('chai');
const supertest = require('supertest');
const schema = require('../json_schema/beers_schema.json');

const rootApi = supertest(`https://api.punkapi.com/v2/`);
const pagination = [20,5,1];

describe(`Punk API Test`, () => {

    pagination.forEach((page) => {
        it(`Page data validation for ${page}`, async () => {
            const response = await rootApi.get(`beers/?page=2&per_page=${page}`).send();
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(page);
        });
    });

    it(`Validation data for beers`, async () => {
        const response = await rootApi.get(`beers`).send();
        let lengthData = response.body.length;
        
        expect(response.body).to.be.jsonSchema(schema);
        expect(response.status).to.eql(200);
        expect(response.body.length).to.eql(25);
        for (let index = 0; index < lengthData; index++) {
            console.log(response.body[index].name);
        }
    });
});