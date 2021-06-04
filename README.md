# blindtest

Utiliser node bot.js pour récupérer les informations du chat. 
Le bot communique via websocket avec la page web chat.js pour que le contenu de la page web soit mis à jour en temps reél.

Les réponses sont à préremplir dans le fichier songlist.js (un fichier est mis pour exemple pour comprendre la syntaxe). 

Le champ "Type" de chaque thème correspond au type de jeu souhaité. Voici les différents jeux que j'ai pu coder pour le moment : 

<h1>Les différents types de jeux codés</h1>


<b>Single :</b>

Un jeu simple, une bonne réponse (artiste) à trouver. 3 points pour le 1er, 2 points pour le 2nd, 1 point pour le 3ème.

<b>Double :</b>

Deux réponses à donner (il faut que les deux réponses soient sur 2 lignes différentes). Je m'en sers pour faire, par exemple, un "N'oubliez pas les paroles" (les réponses sont l'artiste, et les mots manquant) ou des reprises en langues étrangères (les réponses sont l'artiste et la langue)

<b>Collab :</b>

Un jeu collaboratif, chaque bonne réponse supprime une petite image d'un carré de 5x5 images, pour laisser apparaître une pochette d'album.

<b>Gus :</b>

Jeu codé spécifiquement à la demande d'un viewer : C'est un thème double, où il faut trouver l'artiste, et une information sous la forme d'un chiffre/nombre.
Par exemple, un artiste, et le nombre d'albums studios qu'il a pu sortir. Les 3 premiers qui trouvent l'artiste ont 3/2/1 point(s). Pour les chiffres, une fois la commande !stop lancée, les plus proches du chiffre correct gagnent plus de points que les autres. 

<b>Year :</b>

Un jeu posé, il faut simplement trouver l'année de sortie de la chanson. Calcul des points automatique à la commande !stop dans le chat.

<b>Trivial :</b>

4 questions de culture générale à écrire. Chaque bonne réponse débloque un instrument de musique. Nécessite d'utiliser l'outil "spleeter" de deezer pour séparer la musique en 4 pistes. 3/2/1 points également pour l'artiste de la chanson.

<b>Multi:</b>

Joue 6 chansons en même temps, et attend les 6 réponses. Chaque artiste trouvé est automatiquement muté, jusqu'à ce que tout soit trouvé. Cacophonique mais fun.

<b>DJ Viewers :</b>

Ce sont les viewers qui jouent la chanson : Les viewers tapent une secondes (exemple : 65) et la page web joue automatiquement la 65ème seconde de la chanson. Les viewers peuvent spammer, les extraits d'une seconde se cumulent. 3/2/1 points pour l'artiste. 






Use node bot.js to scrap twitch channel chat, and communicate with chat.js webpage through websocket ! 
All answers are stored in songlist.js
