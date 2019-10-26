const { ApolloClient } = require('apollo-boost');
const gql = require('graphql-tag');
const express = require('express');
const fetch = require('node-fetch');
const {createHttpLink} = require('apollo-link-http');
const {InMemoryCache} = require('apollo-cache-inmemory');
const { setContext } = require('apollo-link-context');

const app = express.Router();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_SECRET
    }
  }
});

const httpLink = createHttpLink({
  uri: process.env.GRAPHLQL_URL,
  fetch: fetch,
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


  const GET_ORGANISATION_DETAILS = gql`query{
    ngo{
      name
      admin_email
      id
      status
      documents
    }
  }`;

  const APPROVE_OR_REJECT_ORGANISATION = gql`mutation update_ngo($status: String, $id:Int){  	
    update_ngo( 
      where:{id:{_eq:$id}},
      _set:{status:$status}
      ) {
      returning{
        id
        status
        name
      }
    } 
  }`;

  app.get('/getList',async (req,res)=>{
    const data = await client.query({query: GET_ORGANISATION_DETAILS});
    res.send(data)
  });

  app.get('/updateStatus/:orgId', async(req,res)=>{
    const orgId = req.param.orgId;
    const status = req.query.status;
    const data = await client.mutate({
      variables: { status: status, id: orgId },
      mutation: APPROVE_OR_REJECT_ORGANISATION
    });
    res.send(data)
  })

module.exports = app;