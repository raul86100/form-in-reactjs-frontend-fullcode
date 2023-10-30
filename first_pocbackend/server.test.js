const request = require('supertest');
const express = require('express');
const app = require('./server');

describe('Test Express App', () => {
 
  
  
  it('test getall', async () => {
    const response = await request(app).get('/api/call/userinfo/');
    expect(response.status).toBe(200);
    
  });
  it('test getbyid', async () => {
    const response = await request(app).get('/api/call/userinfo/getbyid/ragul86100@gmail.com');
    expect(response.status).toBe(200);
    
  });

  it('test delete', async () => {
    const response = await request(app).delete('/api/call/userinfo/delete/ragul86100@gmail.com');
    expect(response.status).toBe(200);
    
  });
  it('test insert', async () => {
    const response = await request(app).post('/api/call/userinfo/add/test19@gmail.com/test/latname/1234567890/15-05-2003/123,address');
    expect(response.status).toBe(200);
    
  });
  

  

});
describe('Test update', () => {
  it('test update', async() => {
    const response = await request(app).put('/api/call/userinfo/update/')
    .send({
      'firstname': 'ragultest',
      'lastname': 'lasttest',
     'mobile': '9087654321',
      'dob': '15-05-2023',
      'address': '123,abc',
      'email': 'ragul86100@gmail.com',
    });
    expect(response.status).toBe(200);
    
  });
});
