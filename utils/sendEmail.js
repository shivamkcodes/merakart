const mailjet = require("node-mailjet").connect(
  process.env.key,
  process.env.private
);

module.exports = function (email, token, callback) {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "impriyankaguglani@gmail.com",
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
        HTMLPart: `<p>token is plz verify this token ${token} </p>
        <a href="${process.env.BASEURL}verifyuser/${token}">click to verify</a>

        
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
