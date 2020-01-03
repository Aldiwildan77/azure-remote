const { API, AAD } = require('../config');
const axios = require('axios');
const util = require('util');
const { URLSearchParams } = require('url')
const FormData = require('form-data')
const querystring = require('querystring')

let url = util.format('https://management.azure.com/subscriptions/%s/resourceGroups/%s/providers/Microsoft.Compute/virtualMachines/%s/', API.SUBSCRIPTION_ID, API.RESOURCE_GROUP, API.VM_NAME);

const selectionAPI = ['start', 'deallocate', 'runCommand'];
const options = {
  headers: {
    'Authorization': 'Bearer ' + API.BEARER_TOKEN,
    'Content-Type': 'application/json',
  },
  params: {
    'api-version': API.API_VERSION,
  },
};

const apiController = {
  start: (req, res, next) => {
    url = url + selectionAPI[0];
    axios.post(url, null, options)
      .then(response => {
        console.log(response);
        return res.status(202).end();
      })
      .catch(err => {
        const customError = new Error(err.response.statusText);
        customError.statusCode = err.response.status;
        customError.stack = err.config;
        return next(customError);
      });
  },
  deallocate: (req, res, next) => {
    url = url + selectionAPI[1];
    axios.post(url, null, options)
      .then(response => {
        console.log(response);
        return res.status(202).end();
      })
      .catch(err => {
        const customError = new Error(err.response.statusText);
        customError.statusCode = err.response.status;
        customError.result = err;
        return next(customError);
      });
  },
  runCommand: async (req, res, next) => {
    const { password, passwordConfirm } = await req.body;
    if (password !== passwordConfirm || password == null || passwordConfirm == null) {
      const customError = new Error('Password didn\'t match!');
      customError.statusCode = 403;
      customError.result = {};
      return next(customError);
    }

    const requestBody = {
      commandId: 'RunShellScript',
      script: [`/home/the-forest/server-run.sh ${password} ${passwordConfirm}`],
    };
    url = url + selectionAPI[2];
    axios.post(url, requestBody, options)
      .then(response => {
        console.log(response);
        return res.status(202).end();
      })
      .catch(err => {
        const customError = new Error(err.response.statusText);
        customError.statusCode = err.response.status;
        customError.result = err;
        return next(customError);
      });
  },
  getBearerToken : async () => {
    // ----- percobaan pertama pake form-data -----
    // const requestBody = new FormData();
    // requestBody.append('grant_type', 'client_credentials');
    // requestBody.append('client_id', AAD.CLIENT_ID);
    // requestBody.append('client_secret', AAD.CLIENT_SECRET);
    // requestBody.append('resource', AAD.RESOURCE);
    // ----- percobaan kedua pake querystring.stringify -----
    // let requestBody = {
    //   grant_type: 'client_credentials',
    //   client_id: AAD.CLIENT_ID,
    //   clien_secret: AAD.CLIENT_SECRET,
    //   resource: AAD.RESOURCE
    // };
    // ----- percobaan ketiga pake URLSearchParams
    // ----- dan semua percobaan tetep gagal :(
    // ----- tolong benerin ya mas aldi. saya sudah nyerah :(
    const options = {
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    let url = `https://login.microsoftonline.com/${AAD.TENANT_ID}/oauth2/token`;
    await axios({
      url,
      method: 'post',
      validateStatus: function (status) { // fungsi ini digunakan agar status kode 400 gk masuk ke catch
        return status >= 200 && status < 500;
      },
      data: requestBody,
    }).then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }
};

module.exports = apiController;
