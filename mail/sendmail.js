const nodemailer = require("nodemailer");
const { TemplateHelper } = require("./templateHelper"); // Ensure this is correctly exported

const transporter = nodemailer.createTransport({
  host: "mail.weboney.in",
  secure: true,
  port: 465,
  auth: {
    user: "manikandan@weboney.in",
    pass: "Manikandanmsm@2025",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = async (values) => {
  console.log(values);
  try {
    if (!values.email) {
      console.warn("⚠️ Warning: No recipient email provided for sendMail()");
      return false;
    }

    const templateData = TemplateHelper(values);
    const subject = templateData?.subject || "Default Subject";
    const html = templateData?.template || "<p>No content available</p>";

    const result = await transporter.sendMail({
      from: "manikandan@weboney.in",
      to: values.email,
      subject,
      html,
    });

    console.log("✅ Email sent successfully:", result.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error Sending Email:", err);
    return false;
  }
};

const orderMail = async (values) => {
  try {
    const userEmail = values?.userDetails?.[0]?.email;

    if (!userEmail) {
      console.warn("⚠️ Warning: No recipient email found in userDetails");
      return false;
    }

    const { subject, template } = TemplateHelper({ ...values, target: "placed order" });

    const result = await transporter.sendMail({
      from: "mlcreation806r@gmail.com",
      to: userEmail,
      subject: subject || "Order Confirmation",
      html: template || "<p>Order details missing</p>",
    });

    console.log("✅ Order Email Sent Successfully:", result.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error Sending Order Email:", err);
    return false;
  }
};

module.exports = { sendMail, orderMail };
