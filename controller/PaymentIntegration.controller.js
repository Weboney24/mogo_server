const querystring = require("querystring");
const ccav = require("./ccavutil");

const TrigerPayment = (req, res, payload) => {
  try {
    const { order_id, payment } = payload;

    const cleanOrderId = String(order_id);
    const ccAvenueData = {
      merchant_id: process.env.CCAVENUE_MERCHANT_ID,
      order_id: cleanOrderId,
      currency: "INR",
      amount: parseFloat(payment).toFixed(2),
      redirect_url: `${process.env.BASE_URL}/payment-success`, // backend API endpoint
      cancel_url: `${process.env.BASE_URL}/payment-failed`, // backend API endpoint
      language: "EN",
      merchant_param1: cleanOrderId,
    };

    const dataString = querystring.stringify(ccAvenueData);
    const encryptedData = ccav.encrypt(dataString, process.env.CCAVENUE_WORKING_KEY);

    const url = `https://secure.ccavenue.com/transaction.do?command=initiateTransaction&access_code=${process.env.CCAVENUE_ACCESS_CODE}&encRequest=${encryptedData}`;

    return res.status(200).json({
      paymentRedirect: true,
      redirectUrl: url,
    });
  } catch (err) {
    console.error("❌ Error in CCAvenue Trigger:", err);
    return res.status(500).json({ message: "Failed to initialize payment" });
  }
};

module.exports = { TrigerPayment };
