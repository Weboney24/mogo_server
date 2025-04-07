const sendResponce = (res, messages) => {
  try {
    return res
      .status(500)
      .send({ message: `Something Went Wrong  while ${messages}` });
  } catch (e) {}
};

module.exports = { sendResponce };
