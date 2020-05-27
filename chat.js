/* eslint-disable no-redeclare */
var ws = new WebSocket("ws://localhost:8100");
var x = 1900;
var y = 900;

var members = [{'user':'Personne','color':'#FF0000'},];

var points = [];
var totalpoints = [];

var voteprop = [];
var votes = [];

var chat = [];


var defaultdelay = 700;
var delay = 0;
var countdown = -1;
var ready = false;

var nbwin = 3;
var defaultnbwin = 3;
var singlewin = [];

var doublewin = [[],[]];

var gametype = "idle";
var numberfound = 0;
var songfound = false;
var info1found = false;
var info2found = false;

var songindex = 0;
var song = "Ceci est un nom de chanson totalement random pour commencer le jeu";
var youtube;
var winImage;
var alternate = '';
var fullsongname;
var singletext = '';
var liste = "begin";
var bg = "#000000";

var visiblepoints = false;
var visibletheme = false;
var visibletotalpoints = false;
var visiblevote = false;
var visiblewin = false;

var canvas = document.getElementById("canvas");

/*global songlist*/
/*eslint no-undef: "error"*/

var ctx = canvas.getContext("2d");
ctx.font = '20px Trebuchet MS';
ctx.fillStyle = "white";
ctx.strokeStyle = "white"; 
ctx.lineWidth = 5;

ws.onmessage=function(event) {
	var msg = JSON.parse(event.data);

	if (msg[0] != undefined)
	{
		if (msg[0].color != undefined)
		{
			members = Array.from(msg);
		}
		if (msg[0].points != undefined)
		{
			totalpoints = Array.from(msg);
		}	
	}
	
	if (msg.content == undefined)
	{
		return;
	}

	if (msg.content.startsWith("!addpoints"))
	{
		if (msg.isBroadcaster == "true")
		{		
			var pts;
			var usr;
			var ar = msg.content.replace("!addpoints ","").split(" ");
			if (isNaN(parseInt(ar[0])) && isNaN(parseInt(ar[1])))
			{
				ws.send("!say Erreur d'ajout des points");
			}

			if (!isNaN(parseInt(ar[0])) && isNaN(parseInt(ar[1])))
			{
				pts = msg.content.replace("!addpoints ","").split(" ")[0];
				usr = msg.content.replace("!addpoints ","").split(" ")[1];
				ws.send("!say Adding " + pts + " point(s) to " + usr);
				addPoints(parseInt(pts), usr);				
			}

			if (isNaN(parseInt(ar[0])) && !isNaN(parseInt(ar[1])))
			{
				usr = msg.content.replace("!addpoints ","").split(" ")[0];
				pts = msg.content.replace("!addpoints ","").split(" ")[1];
				ws.send("!say Adding " + pts + " point(s) to " + usr);
				addPoints(parseInt(pts), usr);				
			}
		}
	}
	else if (msg.content.startsWith("!botmembers"))
	{
		members = msg.replace("!botmembers", "");
	}
	else if (msg.content.startsWith("!bottotal"))
	{
		totalpoints = msg.replace("!bottotal", "");
	}	
	else if (msg.content == "!clear")
	{
		if (msg.isBroadcaster == "true")
		{
			resetvisibles();
			ctx.clearRect(0,0,x,y);
			bg="#000000";
		}
	}	
	else if (msg.content == "!chill")
	{
		if (msg.isBroadcaster == "true")
		{
			ws.send("!say Petit rappel : On félicite les premiers, on ne les insulte pas ! (Même si vous vous connaissez !) Respect et bienveillance avant tout ! Merci");
		}
	}	
	else if (msg.content == "!clearchat")
	{
		if (msg.isBroadcaster == "true")
		{
			chat = [];	
		}
	}
	else if (msg.content.startsWith("!color "))
	{
		var color = msg.content.replace("!color ", "");
		if (members == undefined)
		{
			members.push({'user':msg.user,'color':color});
			return;
		}
		if (members.find(x => x.user === msg.user) != undefined)
		{
			members.find(x => x.user === msg.user).color = color;
		}
		else
		{
			members.push({'user':msg.user,'color':color});
		}
	}	
	else if (msg.content.startsWith("!github"))
	{
		if (msg.isBroadcaster == "true")
		{
			ws.send("!say https://github.com/TotoroPHD/blindtest");  
		}
	}	
	else if (msg.content == "!gnagnagna")
	{
		if (msg.isBroadcaster == "true")
		{
			ctx.clearRect(0,0,x,y);
			bg="#444444";
		}
	}
	else if (msg.content.startsWith("!helpcolor"))
	{
		ws.send("!say Tapez !color + un code hexa (exemple : !color #FF00FF) ou une couleur (exemple !color purple) pour changer de couleur de pseudo ! Vous pouvez trouver le code hexa qui vous plaît sur https://htmlcolorcodes.com/fr/selecteur-de-couleur/");  
	}	
	else if (msg.content.startsWith("!load"))
	{
		if (msg.isBroadcaster == "true")
		{
			ctx.clearRect(0,0,x,y);
			ws.send("!say Récupération des données viewers (score et couleur) OK");
			ws.send("!load");
		}
	}
	else if (msg.content.startsWith("!next") || msg.content.startsWith("!go"))
	{
		if (msg.isBroadcaster == "true" && songindex < songlist.find(x => x.listname === liste).songs.length - 1)
		{
			if (gametype == "single" || gametype == "double")
			{
				countdown = delay;
				if (countdown > 0)
				{
					ws.send("!say Prochaine chanson dans...")
				}
				ready = false;
			}

			bg="#000000";
			resetvisibles();
			songfound = false;
			numberfound = 0;			
			songindex++;
			ctx.clearRect(0,0,x,y);
			drawTitle();

			winImage = "./images/"+liste+"/"+songindex+".jpg";
			youtube = songlist.find(x => x.listname === liste).songs[songindex].youtube;

			if (gametype == "single")
			{
				singlewin = [];
				song = songlist.find(x => x.listname === liste).songs[songindex].name;
				alternate = songlist.find(x => x.listname === liste).songs[songindex].alternate;
				fullsongname = songlist.find(x => x.listname === liste).songs[songindex].fullname;
				singletext = songlist.find(x => x.listname === liste).songs[songindex].singletext;
			}
			
			if (gametype == "double")
			{
				doublewin = [[],[]];
				info1found = false;
				info2found = false;
			}
		}
	}	
	else if (msg.content.startsWith("!save"))
	{
		if (msg.isBroadcaster == "true")
		{
			ws.send("!say Sauvegarde des données viewers (score et couleur)");
			if (members.length > 0)ws.send(JSON.stringify(members));
			if (totalpoints.length > 0)ws.send(JSON.stringify(totalpoints));
		}
	}
	else if (msg.content == "!score")
	{
		if (msg.isBroadcaster == "true")
		{		
			resetvisibles();
			if (points.length > 0)
			{
				visiblepoints = !visiblepoints;
			}
		}
	}	
	else if (msg.content.startsWith("!so "))
	{
		if (msg.isBroadcaster == "true")
		{
			var so = msg.content.replace("!so ", "").replace("@", "");
			var shout = [
				"!say N'hésitez pas à aller faire un tour sur la chaîne Twitch de " + so + " ! C'est par ici : twitch.tv/" + so,
				"!say Du contenu de qualité sur la chaîne de " + so + " ! Allez donc follow par ici : twitch.tv/" + so,
				"!say On va tous follow la chaîne de " + so + " ! C'est par là : twitch.tv/" + so,
				"!say Bonne ambiance et contenu de qualité chez " + so + " ! Pour follow : twitch.tv/" + so,
			]
			ws.send(shout[Math.floor(Math.random() * 4)]);
		}
	}
	else if (msg.content.startsWith("!start"))
	{
		if (msg.isBroadcaster == "true")
		{
			bg="#000000";
			resetvisibles();
			if (songlist[parseInt(msg.content.replace("!start ", ""))] == undefined)
			{
				ws.send("!say Désolé mais cette liste n'existe pas !");
			}
			else
			{
				liste = songlist[parseInt(msg.content.replace("!start ", ""))].listname

				points = [];
				numberfound = 0;
				songindex = -1;
				fullsongname = "On a pas encore commencé !";
				ctx.clearRect(0,0,x,y);
				songfound = false;
				
				songlist.find(x => x.listname === liste).done = true;
				
				if (songlist.find(x => x.listname === liste).nbwin != undefined)
				{
					nbwin = parseInt(songlist.find(x => x.listname === liste).nbwin);
				}
				else nbwin = defaultnbwin;

				if (songlist.find(x => x.listname === liste).delay != undefined)
				{
					delay = parseInt(songlist.find(x => x.listname === liste).delay) * 100;
				}
				else delay = defaultdelay;				

				if (songlist.find(x => x.listname === liste).type == 'single')
				{
					gametype = "single";
				}
				
				if (songlist.find(x => x.listname === liste).type == 'multi')
				{				
					gametype = "multi";				
				}
				
				if (songlist.find(x => x.listname === liste).type == 'double')
				{				
					gametype = "double";		
					info1found = false;
					info2found = false;		
				}				
			}
		}
	}	
	else if (msg.content.startsWith("!stop"))
	{
		if (msg.isBroadcaster == "true" && songfound == false && songindex >= 0)
		{
			songfound = true;
			visiblewin = true;
			
			countdown = -1;
			ready = false;

			for (var i = 0; i < chat.length; i++)chat[i].cur="no";

			if (gametype == "single")
			{
				if (singlewin.length == 0)
				{
					drawSingleLose();
				}
				else
				{
					drawSingleWin();
					givePoints(singlewin);
				} 
			}

			if (gametype == "double")
			{

				if (doublewin[0].length > 0 && info1found == false)
				{
					givePoints(doublewin[0]);
				}

				if (doublewin[1].length > 0 && info2found == false)
				{
					givePoints(doublewin[1]);
				}

				info1found = true;
				info2found = true;
			}				

			if (youtube != undefined)
			{
				ws.send("!say Pour réécouter tranquillement : " + youtube);  
			}
			
			if (songindex == songlist.find(x => x.listname === liste).songs.length - 1)
			{
				ws.send("!say C'était la dernière chanson de la liste ! Un point sur les scores !");  
			} 			
		}		
	}		
	else if (msg.content == "!theme")
	{
		if (msg.isBroadcaster == "true")
		{
			resetvisibles();
			visibletheme = !visibletheme;
		}
	}	
	else if (msg.content == "!total")
	{
		if (msg.isBroadcaster == "true")
		{		
			resetvisibles();
			if (totalpoints.length > 0)
			{
				visibletotalpoints = !visibletotalpoints;
			}
		}
	}
	else if (msg.content.startsWith("!vote "))
	{
		if (msg.isBroadcaster == "true")
		{
			gametype = 'vote';
			visiblevote = !visiblevote;
			voteprop = msg.content.replace("!vote ","").split("/");
			votes = [];
		}
	}		
	else if (gametype == "single" && ready == true)
	{
		addChat(msg.user, msg.content, "", "yes");

		if (songfound == false)
		{
			var ok = false;
			if (similarity(msg.content, song) > 0.75)
			{
				ok = true;
			}
			if (alternate != '' && similarity(msg.content, alternate) > 0.75)
			{
				ok = true;
			}
			if (singlewin.find(x => x.user === msg.user)!=undefined)
			{
				// UNCOMMENT
				//ok = false;
			}
			if (ok)
			{
				if (singlewin.length == 0)chat[chat.length -1].found = "🥇";
				if (singlewin.length == 1)chat[chat.length -1].found = "🥈";
				if (singlewin.length == 2)chat[chat.length -1].found = "🥉";
				if (singlewin.length >= 3)chat[chat.length -1].found = "🍭";

				ws.send("!say /timeout " + msg.user + " 1s Bonne réponse !");

				if (singlewin.length < nbwin)
				{
					singlewin.push({'user':msg.user});
				}
				
				if (singlewin.length == nbwin)
				{
					visiblewin = true;
					songfound = true;

					countdown = -1;
					ready = false;

					drawSingleWin();
					givePoints(singlewin);
					
					for (var i = 0; i < chat.length; i++)chat[i].cur="no";

					if (youtube != undefined)
					{
						ws.send("!say Pour réécouter tranquillement : " + youtube);  
					}					
				}
			}
		}
	}
	else if (gametype == "double" && ready == true)
	{
		addChat(msg.user, msg.content, "", "yes");
		if (songfound == false && songindex >= 0)
		{
			for (var i = 0; i < 2; i++){
				var inf = songlist.find(x => x.listname === liste).songs[songindex].info[i].name;
				var alt = songlist.find(x => x.listname === liste).songs[songindex].info[i].alternate;
				var ok = false;
				
				if (similarity(msg.content, inf) > 0.75)
				{
					ok = true;
				}
				if (alt != '' && similarity(msg.content, alt) > 0.75)
				{
					ok = true;
				}
				if (doublewin[i].find(x => x.user === msg.user)!=undefined)
				{
					// UNCOMMENT
					//ok = false;
				}
				if (ok)
				{			
					if (doublewin[i].length == 0)chat[chat.length -1].found = "🥇";
					if (doublewin[i].length == 1)chat[chat.length -1].found = "🥈";
					if (doublewin[i].length == 2)chat[chat.length -1].found = "🥉";
					if (doublewin[i].length >= 3)chat[chat.length -1].found = "🍭";
					
					chat[chat.length - 1].cur = "yes"+i;

					if (doublewin[i].length < nbwin)
					{
						doublewin[i].push({'user':msg.user});
					}			
				}

				if (doublewin[0].length == nbwin && info1found == false)
				{
					info1found = true;
					givePoints(doublewin[0]);
					for (var i = 0; i < chat.length; i++)
					{
						if (chat[i].cur == "yes0")chat[i].cur="no";
					}
				}

				if (doublewin[1].length == nbwin && info2found == false)
				{
					info2found = true;
					givePoints(doublewin[1]);
					for (var i = 0; i < chat.length; i++)
					{
						if (chat[i].cur == "yes1")chat[i].cur="no";
					}
				}

				if (info1found && info2found)
				{
					visiblewin = true;
					songfound = true;

					countdown = -1;
					ready = false;
					
					if (youtube != undefined)
					{
						ws.send("!say Pour réécouter tranquillement : " + youtube);  
					}
				}
			}
		}
	}
	else if (gametype == "multi")
	{
		addChat(msg.user, msg.content, "", "no");
		drawTitle();
		
		if (songindex >= 0)
		{
			var pts = 6 - numberfound;

			for (var i = 0; i < songlist.find(x => x.listname === liste).songs.length; i++){
				var inf = songlist.find(x => x.listname === liste).songs[i].name;
				var alt = songlist.find(x => x.listname === liste).songs[i].alternate;
				var found = songlist.find(x => x.listname === liste).songs[i].found;
				var ok = false;
				
				
				if (similarity(msg.content, inf) > 0.75)
				{
					ok = true;
				}
				if (alt != '' && similarity(msg.content, alt) > 0.75)
				{
					ok = true;
				}
				if (found != 'false')
				{
					ok = false;
				}
				if (ok)
				{			
					chat[chat.length - 1].found = "🏅";
					songlist.find(x => x.listname === liste).songs[i].found = numberfound;
					songlist.find(x => x.listname === liste).songs[i].user = msg.user;
					if (numberfound < 5)
					{
						ws.send("!say GivePLZ Bravo @" + msg.user + " ! " + pts.toString() + " points de plus pour toi TakeNRG" );
					}
					else
					{
						ws.send("!say GivePLZ Bravo @" + msg.user + " ! " + pts.toString() + " point de plus pour toi TakeNRG" );
					}
					addPoints(pts, msg.user);
					numberfound++;		
				}
			}
		}

		if (numberfound == 6)
		{
			if (songfound == false)
			{
				ws.send("!say Bravo, vous avez tout trouvé ! Pour réécouter tranquillement : " );
				for (var i = 0; i < songlist.find(x => x.listname === liste).songs.length; i++){
					ws.send("!say " + songlist.find(x => x.listname === liste).songs[i].name + " - " + songlist.find(x => x.listname === liste).songs[i].youtube);
				}
			}

			songfound = true;
		}

		drawMultiTags();
		drawMultiSongs();			
	}	
	else if (gametype == 'vote')
	{		
		var v = parseInt(msg.content);
		if(isNaN(v) == false)
		{
			if (v > 0 && v <= voteprop.length)
			{
				if (votes.find(x => x.user === msg.user) != undefined)
				{
					votes.find(x => x.user === msg.user).vote = v;
					ws.send("!say " + msg.user + ", vote mis à jour !");
				}
				else
				{
					votes.push({'user':msg.user,'vote':v});	
					ws.send("!say " + msg.user + ", merci pour le vote !");
				}
				
			}
			else addChat(msg.user, msg.content, "", "no");
		}
		else addChat(msg.user, msg.content, "", "no");
	}
	else addChat(msg.user, msg.content, "", "no");

	redraw();
};

function drawTitle()
{
	var title;
	var subtitle;
	if (liste == "begin")
	{
		title = "Bienvenue !";
		subtitle = "Bienvenue pour ce nouveau blindtest, relooké ! Merci pour vos retours !";
	}
	else
	{
		title = songlist.find(x => x.listname === liste).title;
		subtitle = songlist.find(x => x.listname === liste).subtitle;
	}

	ctx.strokeStyle = "white";
	ctx.fillStyle = "black";		  
	roundRect(ctx,x/2 - 800, 10, 1600, 90, 20, true);

	ctx.fillStyle = "white";		  
	ctx.font = '40px Trebuchet MS';
	ctx.fillText(title, x/2 - ctx.measureText(title).width/2, 50);
	ctx.font = '20px Trebuchet MS';
	ctx.fillText(subtitle, x/2 - ctx.measureText(subtitle).width/2, 80);

	if (gametype == 'single' || gametype == 'double')
	{
		ctx.font = '40px Trebuchet MS';
		var tot = songlist.find(x => x.listname === liste).songs.length;
		ctx.fillText((songindex + 1)  + "/" + tot, x/2 - 700, 68);
		ctx.font = '20px Trebuchet MS';
	}	
}

function drawCadre(color)
{
		ctx.strokeStyle=color;
		ctx.fillStyle=bg;
		roundRect(ctx, x/2 - 800, 120, 780, 200, 20, true );
}

function drawSingleWin()
{
		ctx.font = '20px Trebuchet MS';
		drawCadre("green");
		var winnerswidth = 0;
		for (var i = 0; i < singlewin.length; i++)
		{
			winnerswidth+=ctx.measureText("🥇 , ").width;
			winnerswidth+=ctx.measureText(singlewin[i].user).width;
		}
		ctx.fillStyle = "white";
		ctx.fillText("Félicitations à : ", x/2 - 400 - ctx.measureText("Félicitations à :").width/2, 160);

		var curposwin = 0;
		for (var j = 0; j < singlewin.length; j++)
		{
			ctx.fillStyle = getUserColor(singlewin[j].user);
			if (j == 0)ctx.fillText("🥇" + singlewin[j].user, x/2 - 400 - winnerswidth/2 + curposwin, 190);
			if (j == 1)ctx.fillText("🥈" + singlewin[j].user, x/2 - 400 - winnerswidth/2 + curposwin, 190);
			if (j == 2)ctx.fillText("🥉" + singlewin[j].user, x/2 - 400 - winnerswidth/2 + curposwin, 190);
			if (j >= 3)ctx.fillText("🍭" + singlewin[j].user, x/2 - 400 - winnerswidth/2 + curposwin, 190);
			curposwin += ctx.measureText("🥇" + singlewin[j].user+" ").width ;
			ctx.fillStyle = "white";
			
			if (j == singlewin.length - 1)
			{
				ctx.fillText(" !", x/2 - 400 - winnerswidth/2 + curposwin, 190);
			}
			else
			{
				ctx.fillText(", ", x/2 - 400 - winnerswidth/2 + curposwin, 190);				
				curposwin += ctx.measureText(", ").width;
			}
		}
		
		ctx.fillText("La bonne réponse était", x/2 - 400 - ctx.measureText("La bonne réponse était").width/2, 230);
		ctx.font = '30px Trebuchet MS';	
		if (ctx.measureText(fullsongname).width >= 770)
		{
			ctx.font = '25px Trebuchet MS';	
		}
		ctx.fillText(fullsongname, x/2 - 400 - ctx.measureText(fullsongname).width/2, 280);
		ctx.font = '20px Trebuchet MS';

		if (winImage != undefined && visiblewin)
		{
			drawWinImage();
		}
}

function drawSingleLose()
{
		drawCadre("red");
		ctx.fillStyle = "white";
		ctx.fillText("C'est pas grave, c'était dur !", x/2 - 400 - ctx.measureText("C'est pas grave, c'était dur !").width/2, 160);
		ctx.fillText("La bonne réponse était", x/2 - 400 - ctx.measureText("La bonne réponse était").width/2, 200);
		ctx.font = '30px Trebuchet MS';	
		if (ctx.measureText(fullsongname).width >= 770)
		{
			ctx.font = '25px Trebuchet MS';	
		}
		ctx.fillText(fullsongname, x/2 - 400 - ctx.measureText(fullsongname).width/2, 280);
		ctx.font = '20px Trebuchet MS';
		
		if (winImage != undefined && visiblewin)
		{
			drawWinImage();
		}
}

function drawDoubleTags()
{
	ctx.fillStyle = "white";
	ctx.fillText("2 informations à trouver :", x/2 - 400 - ctx.measureText("2 informations à trouver :").width/2, 160);
	var info1 = songlist.find(x => x.listname === liste).info1;
	var info2 = songlist.find(x => x.listname === liste).info2;
	if(info1found == false)ctx.fillText(info1, x/2 - 400 - ctx.measureText(info1).width/2, 190);
	if(info2found == false)ctx.fillText(info2, x/2 - 400 - ctx.measureText(info2).width/2, 250);
}

function drawDoubleWin(info)
{
	ctx.font = 'bold 20px Trebuchet MS';
	ctx.fillStyle = "white";

	var infos = [songlist.find(x => x.listname === liste).info1, songlist.find(x => x.listname === liste).info2];
	var answer = songlist.find(x => x.listname === liste).songs[songindex].info[info].fullname;
	ctx.fillText(infos[info] + " : " + answer, x/2 - 400 - ctx.measureText(infos[info] + " : " + answer).width/2, 190 + info * 60);

	ctx.font = '20px Trebuchet MS';
	var winnerswidth = 0;
	for (var i = 0; i < doublewin[info].length; i++)
	{
		winnerswidth+=ctx.measureText("🥇 , ").width;
		winnerswidth+=ctx.measureText(doublewin[info][i].user).width;
	}
	ctx.fillStyle = "white";

	var curposwin = 0;
	for (var j = 0; j < doublewin[info].length; j++)
	{
		ctx.fillStyle = getUserColor(doublewin[info][j].user);
		if (j == 0)ctx.fillText("🥇" + doublewin[info][j].user, x/2 - 400 - winnerswidth/2 + curposwin, 220 + info * 60);
		if (j == 1)ctx.fillText("🥈" + doublewin[info][j].user, x/2 - 400 - winnerswidth/2 + curposwin, 220 + info * 60);
		if (j == 2)ctx.fillText("🥉" + doublewin[info][j].user, x/2 - 400 - winnerswidth/2 + curposwin, 220 + info * 60);
		if (j >= 3)ctx.fillText("🍭" + doublewin[info][j].user, x/2 - 400 - winnerswidth/2 + curposwin, 220 + info * 60);
		curposwin += ctx.measureText("🥇" + doublewin[info][j].user+" ").width ;
		ctx.fillStyle = "white";
		
		if (j == doublewin[info].length - 1)
		{
			ctx.fillText(" !", x/2 - 400 - winnerswidth/2 + curposwin, 220 + info * 60);
		}
		else
		{
			ctx.fillText(", ", x/2 - 400 - winnerswidth/2 + curposwin, 220 + info * 60);				
			curposwin += ctx.measureText(", ").width;
		}
	}
	
	if (winImage != undefined && visiblewin)
	{
		drawWinImage();
	}	
}

function givePoints(win)
{
	var tosend = "!say GivePLZ " 
	for(var i = 0; i < win.length; i++)
	{
		var pts = 3 - i;
		if (pts <= 1)pts = 1;

		if (pts > 1)tosend+=pts + " points pour @" + win[i].user + ", ";
		else tosend+=pts + " point pour @" + win[i].user + ", ";
		
		addPoints(pts, win[i].user);
	}
	tosend+=" bravo ! TakeNRG";
	ws.send(tosend);
}

function drawWinImage()
{
	var img = new Image();   // Crée un nouvel élément Image
	img.src = winImage; // Définit le chemin vers sa source
	img.onload = function() {
		var hRatio = 380/img.width;
		var vRatio = 555/img.height;
		var ratio  = Math.min ( hRatio, vRatio );

		var xoffset = 0;
		var yoffset = 0;
		if (ratio == hRatio)
		{
			yoffset = Math.round((555 - img.height*ratio)/2);
		}
		else
		{
			xoffset = Math.round((380 - img.width*ratio)/2);
		}
		ctx.fillStyle='white';
		ctx.strokeStyle='white';
		ctx.drawImage(img, 0,0, img.width, img.height, x/2 - 400 + xoffset, 340 + yoffset, img.width*ratio, img.height*ratio);
		roundRect(ctx,x/2-400, 340, 380,555,5,false);
	}
}

function drawMultiTags()
{
	ctx.font = '18px Trebuchet MS';
	ctx.fillStyle = "white";
	ctx.fillText("Chanson 1 : ", x/2 - 750, 150);
	ctx.fillText("Chanson 2 : ", x/2 - 750, 180);
	ctx.fillText("Chanson 3 : ", x/2 - 750, 210);
	ctx.fillText("Chanson 4 : ", x/2 - 750, 240);
	ctx.fillText("Chanson 5 : ", x/2 - 750, 270);
	ctx.fillText("Chanson 6 : ", x/2 - 750, 300);
	ctx.font = '20px Trebuchet MS';
}

function drawMultiSongs()
{
	ctx.font = '18px Trebuchet MS';
	for (var i = 0; i < songlist.find(x => x.listname === liste).songs.length; i++) {
		var mulsong = songlist.find(x => x.listname === liste).songs.find(x => x.found === i)
		if (mulsong != undefined)
		{
			var usr = songlist.find(x => x.listname === liste).songs.find(x => x.found === i).user;
			ctx.fillStyle = getUserColor(usr);
			ctx.fillText(usr, x/2 - 750 + ctx.measureText("Chanson X : ").width, 150 + 30*i);
			ctx.fillStyle = "white";
			ctx.fillText(" - " + mulsong.fullname, x/2 - 750 + ctx.measureText("Chanson X : " + usr).width, 150 + 30*i);
		}
	}
	ctx.font = '20px Trebuchet MS';
}

function redraw()
{
	ctx.clearRect(0,0,x,y);

	if (gametype == "single")
	{
		if (songfound == false)
		{
			if (singletext != undefined)
			{
				drawCadre("white");
				console.log(singletext);				
				ctx.font = '40px Trebuchet MS';
				ctx.fillStyle = 'white';
				ctx.fillText(singletext, x/2 - 400 - ctx.measureText(singletext).width/2, 230);
				ctx.font = '20px Trebuchet MS';
			}
		}

		if (songfound == true)
		{
			if (singlewin.length == 0)drawSingleLose();
			else drawSingleWin();
		}
	}

	if (gametype == "double")
	{
		if (songfound == false)
		{
			drawCadre("white");
		}
		else
		{
			drawCadre("green");
		}	

		drawDoubleTags();

		if (info1found == true)drawDoubleWin(0);
		if (info2found == true)drawDoubleWin(1);
	}

	if (gametype == "multi")
	{

		if (numberfound == 6)
		{
			drawCadre("green");
		}
		else
		{
			drawCadre("red");
		}
		
		drawMultiTags();
		drawMultiSongs();
	}

	drawChat();
	drawTitle();

	if (visiblepoints || visibletotalpoints)
	{
		displayPoints();
	}
	
	if (visibletheme)
	{
		displayThemes();		
	}	

	if (visiblevote)
	{
		displayVote();		
	}		
}

function addPoints(amount, user)
{
	if (points.find(x => x.user === user) != undefined)
	{
		points.find(x => x.user === user).points = points.find(x => x.user === user).points + amount;
	}
	else
	{
		points.push({'user':user,'points':amount, 'gold':0, 'silver':0, 'bronze':0});	
	}
	
	if(amount >= 0 && gametype != "multi")
	{
		var tot = amount;

		while (tot != 0)
		{
			if (tot >= 3)
			{
				points.find(x => x.user === user).gold+=1;
				tot = tot - 3;
			}
			if (tot == 2)
			{
				points.find(x => x.user === user).silver+=1;
				tot = 0;
			}
			if (tot == 1)
			{
				points.find(x => x.user === user).bronze+=1;
				tot = 0;
			}		
		}
	}

	if (liste != "exemple")
	{
		if (totalpoints.find(x => x.user === user) != undefined)
		{
			totalpoints.find(x => x.user === user).points = totalpoints.find(x => x.user === user).points + amount;
		}
		else
		{
			totalpoints.push({'user':user,'points':amount, 'gold':0, 'silver':0, 'bronze':0});	
		}	
		
		if(amount >= 0)
		{
			var tot = amount;
	
			while (tot != 0)
			{
				if (tot >= 3)
				{
					totalpoints.find(x => x.user === user).gold+=1;
					tot = tot - 3;
				}
				if (tot == 2)
				{
					totalpoints.find(x => x.user === user).silver+=1;
					tot = 0;
				}
				if (tot == 1)
				{
					totalpoints.find(x => x.user === user).bronze+=1;
					tot = 0;
				}		
			}
		}
	}
}

function displayPoints()
{
	if (visiblepoints || visibletotalpoints)
	{
		var maxheight = 12;
		var disppoints = [];
		if (visiblepoints){disppoints = Array.from(points);}else{disppoints = Array.from(totalpoints);}
		var column = 1 + Math.trunc((disppoints.length-1)/maxheight);

		var hpoints = 90 + disppoints.length * 25;
		if (disppoints.length > maxheight)
		{
			hpoints = 90 + maxheight * 25
		}
		var wpoints = 300 * column;

		ctx.clearRect(x/2 - 400 - wpoints/2, 320 - hpoints/2, wpoints, hpoints);

		disppoints.sort((a, b) => a.points - b.points);
		disppoints.reverse();

		ctx.fillStyle=bg;
		if (visiblepoints){ctx.strokeStyle="orange";}else{ctx.strokeStyle="purple";}
		
		roundRect(ctx, x/2 - 400 - wpoints/2, 320 - hpoints/2, wpoints, hpoints, 20, true);

		ctx.font = '40px Trebuchet MS';
		ctx.fillStyle=ctx.strokeStyle;
		ctx.fillText("Scores", x/2 - 400 - ctx.measureText("Scores").width/2, 320 - hpoints/2 + 50);

		ctx.font = '18px Trebuchet MS';
		
		for (var i = 0; i <= disppoints.length - 1; i++) {
			var curcol = 1 + Math.trunc(i/maxheight);
			var colx = 0;
			colx = 300*curcol - 150 - 300*(column/2);
			var curi = i%maxheight;
			
			var usr = disppoints[i].user;
			var pts = disppoints[i].points;
			var gold = disppoints[i].gold;
			var silver = disppoints[i].silver;
			var bronze = disppoints[i].bronze;
			
			var wscore = ctx.measureText(usr + pts + "🥇🥇🥇 - " + gold + silver + bronze).width;

			ctx.fillStyle=getUserColor(usr);
			ctx.fillText(usr, x/2 - 400 + colx - wscore/2, 320 - hpoints/2 + 90 + curi*25);

			ctx.fillStyle="white";

			ctx.fillText(" 🥇"+gold+"🥈"+silver+"🥉"+bronze+" - "+pts , x/2 - 400 + colx - wscore/2 + ctx.measureText(usr).width, 320 - hpoints/2 + 90 + curi*25);
		}
		ctx.fillStyle="white";
		ctx.strokeStyle="white";
		ctx.font = '20px Trebuchet MS';
	}
}

function displayThemes()
{
	if (visibletheme == true)
	{
		ctx.strokeStyle="white";
		ctx.fillStyle="black";

		var fullheight = songlist.length*40+100;
		roundRect(ctx, x/2 - 400, 120, 380, fullheight, 20, true);

		ctx.font = '40px Trebuchet MS';
		ctx.fillStyle="white";
		ctx.fillText("Thèmes", x/2 - 200 - ctx.measureText("Thèmes").width/2, y/2 - 270);
		ctx.font = '20px Trebuchet MS';
		for (var i = 0; i <= songlist.length - 1; i++) {
			
			var the = songlist[i].title;
			var done = songlist[i].done;
			
			if (done == true)
			{
				ctx.fillStyle="grey";
				ctx.fillRect(x/2 - 200 - ctx.measureText(the).width/2 - 20, y/2 - 220 + i*40 - 8, ctx.measureText(the).width + 40, 3);
			}
			else
			{
				ctx.fillStyle="white";
			}
			ctx.fillText(i + " - " + the , x/2 - 200 - ctx.measureText(i + " - " + the).width/2, y/2 - 220 + i*40);
		}
		ctx.fillStyle="white";
	}
}

function displayVote()
{
	if (visiblevote)
	{
		var hvotes = voteprop.length * 40 + 80 ;

		ctx.clearRect(x/2 - 800, 120, 380, hvotes);

		ctx.fillStyle=bg;
		roundRect(ctx, x/2 - 800, 120, 380, hvotes, 20, true);
		
		ctx.font = '40px Trebuchet MS';
		ctx.fillStyle=ctx.strokeStyle;
		
		ctx.fillText("Votes", x/2 - 600 - ctx.measureText("Votes").width/2, 120 + 50);
		ctx.font = '20px Trebuchet MS';
		
		for (var i = 0; i <= voteprop.length - 1; i++) {
			var prop = voteprop[i];
			var count = 0;
			for (var j = 0; j <= votes.length - 1; j++)
			{
				if(votes[j].vote == (i + 1)){count++;}
			}
			ctx.fillStyle="white";
			ctx.fillText((i+1)  + " : " + prop + " - " + count, x/2 - 600 - ctx.measureText(i + " : " + prop + " - " + count).width/2, 120 + 90 + i*40);
		}

		ctx.fillStyle="white";
		ctx.strokeStyle="white";
	}
}

function addChat(user, message, found, cur) {
  if (canvas.getContext) {

	if (chat.length == 25)
	{
		chat.shift();
	}

	chat.push({'user':user,'message':message, 'found':found, 'cur':cur});
  }
}

function drawChat()
{
		ctx.fillStyle = "black";	
		ctx.strokeStyle="white";	

		roundRect(ctx, x/2, 120, 800, 775, 20, true);

		var offset = 25 - chat.length;
		if (chat.length > 0)
		{
			for (var i = chat.length - 1; i >= 0; i--)
			{
				if (chat[i].found!="" && chat[i].cur == "no")
				{
					ctx.font = '20px Trebuchet MS';
					ctx.fillStyle = getUserColor(chat[i].user);
					ctx.fillText(chat[i].found + chat[i].user + chat[i].found + " : ", x/2 + 20, 160 + i*30 + offset * 30);				
					ctx.fillStyle = "white";		
					ctx.fillText(chat[i].message, x/2 + 20 + ctx.measureText(chat[i].found + chat[i].user + chat[i].found + " : ").width, 160 + i*30 + offset * 30);
				}
				else
				{
					ctx.font = '20px Trebuchet MS';
					ctx.fillStyle = getUserColor(chat[i].user);
					ctx.fillText(chat[i].user + " : ", x/2 + 20, 160 + i*30 + offset * 30);		
					ctx.fillStyle = "white";		
					ctx.fillText(chat[i].message, x/2 + 20 + ctx.measureText(chat[i].user + " : ").width, 160 + i*30 + offset * 30);
				}
			}

			ctx.clearRect(x/2 + 803, 120, x - x/2 - 800, 700);
		}	
}

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
	longer = s2;
	shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
	return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2){
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++)
  {
	var lastValue = i;
	for (var j = 0; j <= s2.length; j++)
	{
		if (i == 0)
			costs[j] = j;
		else {
			if (j > 0)
			{
				var newValue = costs[j - 1];
				if (s1.charAt(i - 1) != s2.charAt(j - 1))
					newValue = Math.min(Math.min(newValue, lastValue),
				costs[j]) + 1;
				costs[j - 1] = lastValue;
				lastValue = newValue;
			}
		}
	}
	if (i > 0)
		costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function hashCode(str) { // java String#hashCode
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return hash;
} 

function intToRGB(i){
	var c = (i & 0x00FFFFFF)
		.toString(16)
		.toUpperCase();

	return "00000".substring(0, 6 - c.length) + c;
}

function getUserColor(username)
{
	var usr = members.find(x => x.user === username);
	var color = ctx.fillStyle = "#" + intToRGB(hashCode(username));
	if (usr != undefined)
	{
		color = ctx.fillStyle = usr.color;   
	}
	return color;
}

function resetvisibles()
{
	visiblepoints = false;
	visibletotalpoints = false;
	visibletheme = false;
	visiblevote = false;
	visiblewin = false;
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *				 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
	if (typeof stroke === 'undefined') {
		stroke = true;
	}
	if (typeof radius === 'undefined') {
		radius = 5;
	}
	if (typeof radius === 'number') {
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
	}
	else
	{
		var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
		for (var side in defaultRadius)
		{
			radius[side] = radius[side] || defaultRadius[side];
		}
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	if (fill) {
		ctx.fill();
	}
	if (stroke) {
		ctx.stroke();
	}
  }

  setInterval(function() {
	if (countdown > 0)
	{
		if (countdown%100 == 0)
		{
			ws.send("!say " + countdown/100 + "...");
		}
		countdown--;
	}
	
	if (countdown == 0 && ready == false)
	{
		ws.send("!say GO !");
		ready = true;
	}
  }, 10);