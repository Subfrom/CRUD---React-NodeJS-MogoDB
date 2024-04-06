const axios = require('axios');
const jwt = require('jsonwebtoken');
const Transition = require('../Models/Transition');
const Order = require('../Models/Order');

exports.payment = async (user, orderID, amount, res) => {
  try {
    let time = new Date().getTime();

    let secretKey = process.env.SECRET_KEY;
    let payload = {
      merchantID: `${process.env.MERCHANT_ID}`,
      invoiceNo: `${time}`,
      userDefined1: `${user}`,
      userDefined2: `${orderID}`,
      amount: `${amount}`,
      currencyCode: "THB",
      backendReturnUrl: `${process.env.BACKEND_RETURN_URL}`,
      description: "Test Payment",
    };

    // console.log(payload);

    let jwtToken = jwt.sign(payload, secretKey, { algorithm: "HS256" });

    let data = {
      payload: jwtToken,
    };

    return axios
      .post("https://sandbox-pgw.2c2p.com/payment/4.3/PaymentToken/", data, {
        headers: {
          "Content-Type": "application/*+json",
        },
      })
      .then((response) => {
        // console.log(response.data);
      let decoded = jwt.verify(response.data.payload, process.env.SECRET_KEY);
       res.json({ data: decoded });
       return decoded;

      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.backendPayment = async (req) => {
  try{
    // console.log(req.body.payload);
    const decoded = jwt.verify(req.body.payload, process.env.SECRET_KEY);

    // console.log(decoded);

    const transition = await new Transition({
      userID: decoded.userDefined1,
      orderID: decoded.userDefined2,
      response: decoded,
    }).save();
    
    Order.findOneAndUpdate(
      { _id: decoded.userDefined2 },
      { status: decoded.respDesc },
      { new: true }
    ).exec();

  } catch (err) {
    console.log(err);
  }
}