const crypto = require("crypto");
const querystring = require("querystring");

const TrigerPayment = (req, res, payload) => {
  console.log("Triggering CCAvenue Payment with:", payload);

  try {
    const { order_id, user_email, payment } = payload;

    const ccAvenueData = {
      merchant_id: process.env.CCAVENUE_MERCHANT_ID,
      order_id: order_id.toString(),
      currency: "INR",
      amount: parseFloat(payment).toFixed(2),
      redirect_url: "https://themogo.com/payment-success",
      cancel_url: "https://themogo.com/payment-cancel",
      language: "EN",
      billing_name: "Test User",
      billing_email: user_email,
      billing_tel: "9876543210",
      billing_address: "123 Test Street",
      billing_city: "Mumbai",
      billing_state: "Maharashtra",
      billing_zip: "400001",
      billing_country: "India",
    };

    const data = querystring.stringify(ccAvenueData);

    const key = Buffer.from(process.env.CCAVENUE_WORKING_KEY.trim(), "utf8"); // í·¼ .trim() removes extra spaces
    const iv = Buffer.from(process.env.CCAVENUE_IV.trim(), "utf8"); // í·¼ remove leading space

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encryptedData = cipher.update(data, "utf8", "hex");
    encryptedData += cipher.final("hex");

    const responseUrl = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=${encryptedData}&access_code=${process.env.CCAVENUE_ACCESS_CODE}`;

    console.log("Redirecting to:", responseUrl);

    res.status(200).json({
      paymentRedirect: true,
      url: responseUrl,
    });

  } catch (err) {
    console.error("Error in CCAvenue Trigger:", err);
    res.status(500).send({ message: "Failed to initialize payment" });
  }
};

module.exports = { TrigerPayment };

