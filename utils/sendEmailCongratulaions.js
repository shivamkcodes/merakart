const mailjet = require("node-mailjet").connect(
  process.env.key,
  process.env.private
);

module.exports = function (email, callback) {
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
        Subject: "Password Updated",
        TextPart: "Greetings from Merakart",
        HTMLPart: `<h1>Congratulations!!! merakart tells you that you have updated your password recently</h1>
          <p>if it wasnot you,plz mail us as soon as possible ,we will surely help you</p>
        
  
          
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
