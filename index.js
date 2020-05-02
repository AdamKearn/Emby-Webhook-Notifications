const request = require("request");
const timestamp = require('time-stamp');
const yargs = require('yargs');

const argv = yargs
    .command('onAuthenticationFailed', 'When incorrect login details are provided this event is called.')
    .option('ping', {
        alias: 'p',
        description: 'Pings a user/role. MUST include the @ symbol.',
        type: 'string'
    })
    .option('webhook', {
        alias: 'w',
        description: 'The Discord Webhook URL',
        type: 'string'
    })
    .option('data', {
        alias: 'd',
        description: 'Pass data into the functions as an array.',
        type: 'array'
    })
    .help()
    .alias('help', 'h')
    .demandOption(['webhook', 'data'], 'The webhook and data arguments are needed.')
    .argv;

if (!argv.webhook) {
  console.log('the --webhook option must have the discord webhook URL.');
  process.exit();
}

if (argv.data === undefined || argv.data == 0) {
  console.log('You must pass a value into --data');
  process.exit();
}

if (argv._.includes('onAuthenticationFailed')) {
  onAuthenticationFailed('asd');
}

function getMentions() {
  if (argv.ping) {
    return argv.ping
  }
}

function sendWebhook(embeds) {
  const options = {
    uri: argv.webhook,
    method: 'POST',
    json: {
      "username": "Emby",
      "avatar_url": "https://images-eu.ssl-images-amazon.com/images/I/51WJTxymC6L.png",
      "content": getMentions(),
      "embeds": [embeds]
    }
  };

  request(options, function(err, response, body) {
    console.log('Sending POST request...')
    if (err) {
      console.log(err);
      return;
    }
  });
}

function generateEmbed(title, description, color) {
  const embed = {
    "title": title,
    "description": description,
    "color": color,
    "footer": {
      "text": "From",
      "icon_url": "https://images-eu.ssl-images-amazon.com/images/I/51WJTxymC6L.png"
    },
    "timestamp": `${timestamp('YYYY-MM-DDTHH:mm:ss')}`
  }

  return embed
}

function onAuthenticationFailed(username) {
  console.log('EVENT: onAuthenticationFailed was triggered.');
  const result = generateEmbed(
    "Authentication Failed",
    `Scripter-X detected that Authentication has failed with the following user:\n**${argv.data[0]}**`,
    15746887
  );

  sendWebhook(result);
}
