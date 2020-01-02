const { API } = require('../config');
const axios = require('axios');
// ngeset header authnya
axios.defaults.headers.common = { 'Authorization': `bearer ${API.BEARER_TOKEN}` };

const apiController = {
  startVm: () => {
    const url = `https://management.azure.com/subscriptions/${API.SUBSCRIPTION_ID}/resourceGroups/${API.RESOURCE_GROUP}/providers/Microsoft.Compute/virtualMachines/${API.VM_NAME}/start?api-version=${API.API_VERSION}`;

    // disini masih error. responsenya 401 :(
    axios.post(url).then((response) => {
      if (response.status == 202) {
        console.log('VM will run in a few minutes');
      }
    });
  },
};

module.exports = apiController;
