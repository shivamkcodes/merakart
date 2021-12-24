const mailjet = require("node-mailjet").connect(
  process.env.key,
  process.env.private
);

module.exports = function (email, token, callback) {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "socializing.on.vocals@gmail.com",
          Name: "SOV",
        },
        To: [
          {
            Email: email,
            Name: "uKnows",
          },
        ],
        Subject: "Email verification",
        TextPart: "Greetings from Merakart",
        HTMLPart: `<h2>forgot password link ${token} </h2>
          <a href="${process.env.BASEURL}forgot/${token}">click to change password</a>
  
         
          `,
      },
    ],
  });
  request
    .then((result) => {
      callback(null, result.body);
    })
    .catch((err) => {
      callback(err.statusCode, null);
    });
};
