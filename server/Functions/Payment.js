const axios = require('axios');
const jwt = require('jsonwebtoken');

exports.payment = async (description, amount, res) => {
  try {
    let time = new Date().getTime();

    let secretKey = process.env.SECRET_KEY;
    let payload = {
      merchantID: `${process.env.MERCHANT_ID}`,
      invoiceNo: `${time}`,
      description: `${description}`,
      amount: `${amount}`,
      currencyCode: "THB",
    };

    // console.log(payload);

    let jwtToken = jwt.sign(payload, secretKey, { algorithm: "HS256" });

    let data = {
      payload: jwtToken,
    };

    axios
      .post("https://sandbox-pgw.2c2p.com/payment/4.3/PaymentToken/", data, {
        headers: {
          "Content-Type": "application/*+json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};