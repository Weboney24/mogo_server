const crypto = require("crypto");
const querystring = require("querystring");

const TrigerPayment = (req, res, payload) => {
  try {
    const { order_id, user_email, payment } = payload;
    const ccAvenueData = {
      merchant_id: process.env.CCAVENUE_MERCHANT_ID,
      order_id: order_id,
      currency: "INR",
      payment,
      redirect_url: "http://yourdomain.com/payment-success",
      cancel_url: "http://yourdomain.com/payment-cancel",
      language: "EN",
      billing_email: user_email,
    };

    // Convert data to query string format
    const data = querystring.stringify(ccAvenueData);

    // Define key and IV as buffers, ensure they're correctly formatted
    const key = Buffer.from(process.env.CCAVENUE_WORKING_KEY, "utf8");
    const iv = Buffer.from(process.env.CCAVENUE_IV, "utf8");

    // Initialize cipher with AES-256-CBC
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    // Encrypt the data
    let encryptedData = cipher.update(data, "utf8", "hex");
    encryptedData += cipher.final("hex");

    // Send response with CCAvenue URL
    res.json({
      success: true,
      url: `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=${encryptedData}&access_code=${process.env.CCAVENUE_ACCESS_CODE}`,
    });
  } catch (err) {
    console.error(err);
    // return res.status(500).send({ message: "Failed to initialize payment" });
  }
};

module.exports = { TrigerPayment };
