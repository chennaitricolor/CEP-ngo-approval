const axios = require('axios');

const HASURA_QUERY_URL = `${process.env.HASURA_URL}/v1/query`;
const USER_TABLE = "testing";
const headers = {
  'x-hasura-admin-secret': process.env.HASURA_SECRET
};
//create role function
const createRole = async (appID) => {

  const createParams = `{
    "type" : "create_select_permission",
    "args" : {
        "table" : "${USER_TABLE}",
        "role" : "${appID}",
        "permission" : {
            "columns" : "*",
            "filter" : {
            	"mobile":{
            		"$eq":"x-hasura-mobile-no"
            		}
        		}
        }
    }
  }`

  return new Promise((resolve, reject)=>{
    
    axios.post(HASURA_QUERY_URL, createParams, { headers })
    .then((res)=>{
      resolve({
        status : true,
        message: res.data.message
      })
    })
    .catch((err)=>{
      reject({
        status : false,
        message: err.response.data.error
      })
    })

  });
};


//remove role function
const removeRole = (appID)  => {

  const removeParams = `{
    "type" : "drop_select_permission",
    "args" : {
        "table" : "${USER_TABLE}",
        "role" : "${appID}"
    }
  }`

  return new Promise((resolve, reject) =>{
    axios.post(HASURA_QUERY_URL, removeParams, { headers })
      .then((res) => {
        resolve({
          status: true,
          message: res.data.message
        })
      })
      .catch((err) => {
        reject({
          status: false,
          message: err.response.data.error
        })
      })
    
  });

}

module.exports = { createRole, removeRole }