How to use the script?

`-d` or `--data` flag is an array so multiple elements can be passed to it.   e.g. `-d %username% -d %time%`\
`-w` or `--webhook` flag is the URL to the discord webhook.\
`-p` or `--ping` takes a string of the username/role that you want to be pinged. e.g. `-p @everyone` or `-p @YourName`

```
node /path/to/Emby-Webhook-Notifications/index.js onAuthenticationFailed \
-w https://discordapp.com/api/webhooks/...... \
-d %username%
```
