const axios = require('axios');

exports.notify = async (token, message) => {
    try{
        const response = await axios({
          method: "POST",
          url: "https://notify-api.line.me/api/notify",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token,
          },
          data: "message=" + message,
        });
    } catch (error) {
        console.log(error);
    }
}

exports.getIPClient = async (req) => {
  const ip = req.connection.remoteAddress;
  const ipV4 = ip.split(':');
  const checkIP = ipV4[ipV4.length - 1];

  return checkIP;
}