const querystring = require("querystring");
const ccav = require("./ccavutil");

const TrigerPayment = (req, res, payload) => {
  try {
    const { order_id, user_email, payment } = payload;

    const cleanOrderId = typeof order_id === "object" ? order_id.toString() : order_id;

    const ccAvenueData = {
      merchant_id: process.env.CCAVENUE_MERCHANT_ID,
      order_id: cleanOrderId,
      currency: "INR",
      amount: parseFloat(payment).toFixed(2),
      redirect_url: "https://themogo.com",
      cancel_url: "https://themogo.com",
      language: "EN",
    };

    const dataString = querystring.stringify(ccAvenueData);
    const encryptedData = ccav.encrypt(dataString, process.env.CCAVENUE_WORKING_KEY);

  
    const url = `https://test.ccavenue.com/transaction.do?command=initiateTransaction&access_code=${process.env.CCAVENUE_ACCESS_CODE}&encRequest=${encryptedData}`;

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

