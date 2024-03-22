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