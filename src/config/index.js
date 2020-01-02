const NODE_ENV = process.env.NODE_ENV || 'development';
if(NODE_ENV == 'development') require('dotenv').config();

const config = {
  API : {
    RESOURCE_GROUP : process.env.RESOURCE_GROUP,
    VM_NAME : process.env.VM_NAME,
    API_VERSION : process.env.API_VERSION,
    SUBSCRIPTION_ID : process.env.SUBSCRIPTION_ID,
    BEARER_TOKEN : process.env.BEARER_TOKEN,
  },
  PORT : process.env.PORT || 5015,
};

module.exports = config;
