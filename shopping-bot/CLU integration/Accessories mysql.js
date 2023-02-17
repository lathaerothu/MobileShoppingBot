var axios = require('axios');

var config = {
  method: 'post',
  url: 'localhost:8000/MobileAccessories/mobile chargers',
  headers: { }
};
try{
    let response=await axios(config)
    console.log(JSON.stringify(response.data));
}

catch(error) {
  console.log(error);
}
