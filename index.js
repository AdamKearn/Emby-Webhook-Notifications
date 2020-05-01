const request = require("request");
const timestamp = require('time-stamp');

function sendWebhook (embeds) {
  const options = {
    uri: 'https://discordapp.com/api/webhooks/702281289855795241/YrV2uqC2Xf65oHCHL-35D7HhpxdWxY1_q2HCdh0RhPS7DerWTKPBus-0_nonRvKr58wg',
    method: 'POST',
    json: {
      "username": "Emby",
      "avatar_url": "https://images-eu.ssl-images-amazon.com/images/I/51WJTxymC6L.png",
      "content": "@everyone",
      "embeds": [embeds]
    }
  };

  request(options, function(err, response, body) {
    if (err) {
      console.log(err);
      return;
    }
  });
}

function onAuthenticationFailed (username) {
  const embeds = {
    "title": "Authentication Failed",
    "description": `Scripter-X detected that Authentication has failed with the following user:\n**${username}**`,
    "color": 15746887,
    "footer": {
      "text": "From",
      "icon_url": "https://images-eu.ssl-images-amazon.com/images/I/51WJTxymC6L.png"
    },
    "timestamp": `${timestamp('YYYY-MM-DDTHH:mm:ss')}`
  }

  sendWebhook(embeds);
}

// Send a test Webhook.
onAuthenticationFailed("test")
