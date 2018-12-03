process.env.NODE_ENV

const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')
const knex = require('../knex')

describe('GET /sloths', () => {
  beforeEach(done => {
    Promise.all([
      knex('sloths').insert({id: 1, name: 'Dagny'}),
      knex('sloths').insert({id: 2, name: 'Wyatt'}),
      knex('sloths').insert({id: 3, name: 'Caroline'})
    ])
    .then(() => {
      console.error('done 1')
      done()
    })
  })

  afterEach(done => { 
    knex('sloths')
      .del()
      .then(() => {
        console.error('done 2')
        done()
      })
  })

  it('responds with JSON', done => {
    request(app)
      .get('/sloths')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('returns an array of all sloth objects when responding with JSON', done => {
    request(app)
      .get('/sloths')
      .end((err, res) => {
        expect(res.body).to.deep.equal([{
          id: 1,
          name: 'Dagny'
        }, {
          id: 2,
          name: 'Wyatt'
        }, {
          id: 3,
          name: 'Caroline'
        }])
        done()
      })
    })
})

xdescribe('GET /sloths/:id', () => {

})

xdescribe('POST /sloths', () => {

})

xdescribe('PATCH /sloths', () => {

})

xdescribe('DELETE /sloths', () => {

})