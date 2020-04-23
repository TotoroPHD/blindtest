var WebSocketServer = require("ws").Server;
var ws = new WebSocketServer( { port: 8100 } );
var members = [];
var total = [];
const tmi = require('tmi.js');

// Define configuration options
const opts = {
    options: {
        debug: true
    },    
    identity: {
    username: '', // Use your twitch bot account
    password: '' // Use your token auth : http://twitchapps.com/tmi/
    },
    channels: [
    '' // Channels you want the bot to be active on
    ]
};

// Create a client with our options
let client = new tmi.client(opts);

// Connect to Twitch:
client.connect();

client.on('connected', (adress, port) => {
    console.log(client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port);
    client.say(opts.channels[0], "Le bot est en ligne !");
});

ws.on('connection', function (ws) {
  console.log("Browser connected online...")
   
  client.on('chat', (channel, user, message, isSelf) => {
    if (isSelf) return;
    if (message.length > 100)
    {
     message = message.substring(0, 100) + "...";   
    }
    ws.send('{ "user":"'+user['display-name']+'", "content":"'+message+'", "isBroadcaster":"'+isBroadcaster(user)+'"}' ); 
  });   

  ws.on("close", function() {
      console.log("Browser gone.")
  })
  
  ws.on("message", function (str) {
    if (str.toString().startsWith("!say "))
    {
      client.say(opts.channels[0], str.replace("!say ", ""));
    }
    else if (str.toString().startsWith("!log "))
    {
    console.log(str.replace("!log ", ""));
    }
    else if (str.toString().startsWith("!load"))
    {
    console.log("On envoie les saves");
    ws.send(JSON.stringify(members));
    ws.send(JSON.stringify(total));
    }

    if (isJson(str))
    {
      
      var obj = JSON.parse(str);
      console.log(obj);
      
      if (obj[0].color != undefined)
      {
      console.log("Couleurs trouvées !");
      members = obj;
      }
      
      if (obj[0].points != undefined)
      {
      console.log("Total trouvé !");
      total = obj;
      }		  
    }
  })
});

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function isBroadcaster(user){
  if (user.badges != null)
  {
    return user.badges.broadcaster == '1';
  }
  else return false;
}