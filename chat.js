/* eslint-disable no-redeclare */
/*global songlist*/
/*eslint no-undef: "error"*/

var ws = new WebSocket("ws://192.168.1.13:8100");
var x = 1900;
var y = 920;

var members =
	[
		{ user: 'Personne', color: '#FF0000' },
		{ user: 'TotoroPHD', color: 'red' },
		{ user: 'Lokimolp', color: '#ff33fc' },
		{ user: 'yumemasho', color: '#21A1BE' },
		{ user: 'Lunevirtuelle', color: '#fabc14' }
	]

var tokens = [];

var instruments = ['Batterie', 'Basse', 'Autre', 'Voix'];

var categories = [' 1 ', ' 2 ', ' 3 ', ' 4 '];
var colorcategories = ['#00DDEE', '#E02887', '#F5ED0B', '#31e62b'];

var points = [];
var totalpoints = [];

var debugInc = 0;

var voteprop = [];
var votes = [];

var mosaicpics = [];
var blankpic = [];
var coverpic = [];
var curmosaic = [];
var tbfmosaic = [];
var foundmosaic = [];
var cdmosaic = -1;
var defaultcdmosaic = 200;
var lastuserfound = [];
var lastsongfound = [];

var collabpic = new Image();
var collabblank = [];
var collabsongs = [];
var tbfcollab = [];

var chat = [];

var bonusword;
var bonusletters = [];
var bonusprop = [];
var bonusans = [];
var bonusfound = "false";
var defaultdelay = 700;
//var defaultdelay = 0;
var delay = 0;
var countdown = -1;
var ready = false;

var nbwin = 3;
//var defaultnbwin = 1;
var defaultnbwin = 3;
var singlewin = [];

var doublewin = [[], []];

var gametype = "idle";
var numberfound = 0;
var songfound = false;
var info1found = false;
var info2found = false;

var multisongs = [];
//var trivialsongs = [];
var stopsong;
var countries = [];
var countryanswer;

var songindex = 0;
var song = "Ceci est un nom de chanson totalement random pour commencer le jeu";
var youtube;
var winImage;
var alternate = '';
var fullsongname;
var singletext = '';
var liste = "begin";
var bg = "#000000";

var djviewers = [];

var years = [];
var gus = [];
var gusstop = false;

var visiblepoints = false;
var visibletheme = false;
var visibletotalpoints = false;
var visiblevote = false;
var visiblewin = false;
var visiblecountries = false;
var visibleyear = false;
var visiblegus = false;
var visiblebonus = false;

var hintreveal = 0;
var hint = false;
var countdownhint = 0;
var hintpic = [];
var loadedhint = false;

var Latinise = {}; Latinise.latin_map = { "Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A", "Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A", "Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A", "Ⱥ": "A", "Ã": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C", "Ȼ": "C", "Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D", "ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E", "Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E", "Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E", "Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ꝫ": "ET", "Ḟ": "F", "Ƒ": "F", "Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G", "Ḡ": "G", "Ǥ": "G", "Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H", "Ḥ": "H", "Ħ": "H", "Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I", "Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I", "Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "Ꝺ": "D", "Ꝼ": "F", "Ᵹ": "G", "Ꞃ": "R", "Ꞅ": "S", "Ꞇ": "T", "Ꝭ": "IS", "Ĵ": "J", "Ɉ": "J", "Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K", "Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L", "Ǉ": "LJ", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N", "Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "Ǌ": "NJ", "Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O", "Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O", "Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O", "Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ɛ": "E", "Ɔ": "O", "Ȣ": "OU", "Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝙ": "Q", "Ꝗ": "Q", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R", "Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꜿ": "C", "Ǝ": "E", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S", "Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T", "Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "Ɐ": "A", "Ꞁ": "L", "Ɯ": "M", "Ʌ": "V", "Ꜩ": "TZ", "Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U", "Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U", "Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U", "Ṹ": "U", "Ṵ": "U", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "Ꝡ": "VY", "Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W", "Ẍ": "X", "Ẋ": "X", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y", "Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ĳ": "IJ", "Œ": "OE", "ᴀ": "A", "ᴁ": "AE", "ʙ": "B", "ᴃ": "B", "ᴄ": "C", "ᴅ": "D", "ᴇ": "E", "ꜰ": "F", "ɢ": "G", "ʛ": "G", "ʜ": "H", "ɪ": "I", "ʁ": "R", "ᴊ": "J", "ᴋ": "K", "ʟ": "L", "ᴌ": "L", "ᴍ": "M", "ɴ": "N", "ᴏ": "O", "ɶ": "OE", "ᴐ": "O", "ᴕ": "OU", "ᴘ": "P", "ʀ": "R", "ᴎ": "N", "ᴙ": "R", "ꜱ": "S", "ᴛ": "T", "ⱻ": "E", "ᴚ": "R", "ᴜ": "U", "ᴠ": "V", "ᴡ": "W", "ʏ": "Y", "ᴢ": "Z", "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a", "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a", "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b", "ƃ": "b", "ɵ": "o", "ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c", "ƈ": "c", "ȼ": "c", "ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d", "ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d", "ı": "i", "ȷ": "j", "ɟ": "j", "ʄ": "j", "ǳ": "dz", "ǆ": "dz", "é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e", "ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e", "ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e", "ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e", "ꝫ": "et", "ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g", "ḡ": "g", "ᶃ": "g", "ǥ": "g", "ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h", "ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ƕ": "hv", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i", "ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i", "ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ꝺ": "d", "ꝼ": "f", "ᵹ": "g", "ꞃ": "r", "ꞅ": "s", "ꞇ": "t", "ꝭ": "is", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j", "ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k", "ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l", "ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l", "ᶅ": "l", "ɭ": "l", "ł": "l", "ǉ": "lj", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n", "ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n", "ñ": "n", "ǌ": "nj", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o", "ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o", "ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o", "ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ƣ": "oi", "ꝏ": "oo", "ɛ": "e", "ᶓ": "e", "ɔ": "o", "ᶗ": "o", "ȣ": "ou", "ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p", "ᵽ": "p", "ꝑ": "p", "ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r", "ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r", "ᶉ": "r", "ɍ": "r", "ɽ": "r", "ↄ": "c", "ꜿ": "c", "ɘ": "e", "ɿ": "r", "ś": "s", "ṥ": "s", "š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s", "ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "ɡ": "g", "ᴑ": "o", "ᴓ": "o", "ᴝ": "u", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t", "ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t", "ʈ": "t", "ŧ": "t", "ᵺ": "th", "ɐ": "a", "ᴂ": "ae", "ǝ": "e", "ᵷ": "g", "ɥ": "h", "ʮ": "h", "ʯ": "h", "ᴉ": "i", "ʞ": "k", "ꞁ": "l", "ɯ": "m", "ɰ": "m", "ᴔ": "oe", "ɹ": "r", "ɻ": "r", "ɺ": "r", "ⱹ": "r", "ʇ": "t", "ʌ": "v", "ʍ": "w", "ʎ": "y", "ꜩ": "tz", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u", "ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u", "ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u", "ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u", "ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵫ": "ue", "ꝸ": "um", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v", "ṽ": "v", "ꝡ": "vy", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w", "ⱳ": "w", "ẘ": "w", "ẍ": "x", "ẋ": "x", "ᶍ": "x", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y", "ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y", "ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z", "ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl", "ĳ": "ij", "œ": "oe", "ﬆ": "st", "ₐ": "a", "ₑ": "e", "ᵢ": "i", "ⱼ": "j", "ₒ": "o", "ᵣ": "r", "ᵤ": "u", "ᵥ": "v", "ₓ": "x" };
String.prototype.latinise = function () { return this.replace(/[^A-Za-z0-9\[\] ]/g, function (a) { return Latinise.latin_map[a] || a }) };
String.prototype.latinize = String.prototype.latinise;
String.prototype.isLatin = function () { return this == this.latinise() }

var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");
ctx.font = '20px Trebuchet MS';
ctx.fillStyle = "white";
ctx.strokeStyle = "white";
ctx.lineWidth = 5;

ws.onmessage = function (event) {
	var msg = JSON.parse(event.data);

	if (msg[0] != undefined) {
		if (msg[0].color != undefined) {
			members = Array.from(msg);
		}
		if (msg[0].points != undefined) {
			totalpoints = Array.from(msg);
		}
	}

	if (msg.content == undefined) {
		return;
	}

	if (msg.content.startsWith("!addpoints")) {
		if (msg.isBroadcaster == "true") {
			var pts;
			var usr;
			var ar = msg.content.replace("!addpoints ", "").split(" ");
			if (isNaN(parseInt(ar[0])) && isNaN(parseInt(ar[1]))) {
				ws.send("!say Erreur d'ajout des points");
			}

			if (!isNaN(parseInt(ar[0])) && isNaN(parseInt(ar[1]))) {
				pts = msg.content.replace("!addpoints ", "").split(" ")[0];
				usr = msg.content.replace("!addpoints ", "").split(" ")[1];
				ws.send("!say Adding " + pts + " point(s) to " + usr);
				addPoints(parseInt(pts), usr);
			}

			if (isNaN(parseInt(ar[0])) && !isNaN(parseInt(ar[1]))) {
				usr = msg.content.replace("!addpoints ", "").split(" ")[0];
				pts = msg.content.replace("!addpoints ", "").split(" ")[1];
				ws.send("!say Adding " + pts + " point(s) to " + usr);
				addPoints(parseInt(pts), usr);
			}
		}
	}
	else if (msg.content.startsWith("!botmembers")) {
		members = msg.replace("!botmembers", "");
	}
	else if (msg.content.startsWith("!bottotal")) {
		totalpoints = msg.replace("!bottotal", "");
	}
	else if (msg.content == "!clear") {
		if (msg.isBroadcaster == "true") {
			resetvisibles();
			ctx.clearRect(0, 0, x, y);
			bg = "#000000";
		}
	}
	else if (msg.content == "!chill") {
		if (msg.isBroadcaster == "true") {
			ws.send("!say Petit rappel : On félicite les premiers, on ne les insulte pas ! (Même si vous vous connaissez !) Respect et bienveillance avant tout ! Merci");
		}
	}
	else if (msg.content == "!twitter") {
		ws.send("!say Suivez moi sur Twitter pour ne pas louper les prochains blindtest ! https://twitter.com/AfkCafe");
	}
	else if (msg.content == "!clearchat") {
		if (msg.isBroadcaster == "true") {
			chat = [];
		}
	}
	else if (msg.content.startsWith("!bonus")) {
		if (msg.content == "!bonus") {
			ws.send("!say Jeu bonus sur le principe du pendu ! Ca se passe en haut à droite. Tapez !bonus PROPOSITION pour tenter de trouver l\'artiste bonus ! 3 points pour la bonne réponse. Attention, un seul essai par thème ! Si vous avez gagné des tokens, tapez !bonus X pour tenter de dévoiler une lettre et gagner 1 point.");
		}
		else if (msg.content.startsWith("!bonus ") && bonusfound == "false") {

			var prop = msg.content.replace("!bonus ", "")

			if (prop.length > 1) {
				// mot 
				if (bonusans.includes(msg.user)) {
					ws.send("!say Hop hop hop ! Tu as déjà tenté ta chance, crapule !");
				}
				else {
					ws.send("!say La proposition mot " + msg.user + " est : " + msg.content.replace("!bonus ", ""));
					bonusans.push(msg.user);

					if (similarity(prop, bonusword) >= 0.80) {
						ws.send("!say Félicitations, le mot était bien " + bonusword + "! 3 points bonus pour " + msg.user);
						ws.send("!say !applause");
						addPoints(3, msg.user);
						bonusfound = msg.user;

						for (var i = 0; i < bonusletters.length; i++) {
							bonusprop.push({ 'user': 'fill', 'letter': bonusletters[i].letter });
						}
						redraw();
					}
					else {
						ws.send("!say Booooouh tu pues du slip c'était pas du tout ça")
					}
				}
				return;
			}

			if (tokens.find(x => x.user === msg.user) == undefined) {
				ws.send("!say Désolé " + msg.user + ", tu n'as pas encore de Token !");
				return;
			}

			if (tokens.find(x => x.user === msg.user).token == 0) {
				ws.send("!say Désolé " + msg.user + ", tu n'as plus  de Token !");
				return;
			}

			if (prop.length == 1) {
				//lettre
				ws.send("!say La proposition lettre " + msg.user + " est : " + msg.content.replace("!bonus ", ""));
				bonusprop.push({ 'user': msg.user, 'letter': prop.toUpperCase() });

				if (bonusletters.find(x => x.letter === prop.toUpperCase()) != undefined) {
					if (bonusletters.find(x => x.letter === prop.toUpperCase()).found == false) {
						var countFound = 0;
						bonusletters.find(x => x.letter === prop.toUpperCase()).found = true;
						for (var i = 0; i < bonusletters.length; i++) {
							if (bonusletters[i].found == true) {
								countFound++;
							}
						}
						if (countFound == bonusletters.length) {
							ws.send("!say Félicitations, toutes les lettres ont été trouvées !");
							addPoints(3, msg.user);
							bonusfound = msg.user;
						}
						else {
							addPoints(1, msg.user);
							ws.send("!say Félicitations, la lettre est dans le mot bonus, 1 point bonus pour " + msg.user);
						}
					}
					else {
						ws.send("!say Lettre déjà proposée, désolé !");
					}
				}
				else {
					ws.send("!say Loupé !");
				}
			}
			tokens.find(x => x.user === msg.user).token--;
		}
	}
	else if (msg.content.startsWith("!color ")) {
		var color = msg.content.replace("!color ", "");
		if (members == undefined) {
			members.push({ 'user': msg.user, 'color': color });
			return;
		}
		if (members.find(x => x.user === msg.user) != undefined) {
			members.find(x => x.user === msg.user).color = color;
		}
		else {
			members.push({ 'user': msg.user, 'color': color });
		}
	}
	else if (msg.content.startsWith("!github")) {
		ws.send("!say Retrouvez le code source du blindtest sur : https://github.com/TotoroPHD/blindtest");
	}
	else if (msg.content.startsWith("!site")) {
		ws.send("!say Retrouvez la liste de toutes les anciennes éditions sur http://home.totorophd.xyz");
	}
	else if (msg.content == "!gnagnagna") {
		if (msg.isBroadcaster == "true") {
			ctx.clearRect(0, 0, x, y);
			bg = "#444444";
		}
	}
	else if (msg.content == "!hint") {
		if (msg.isBroadcaster == "true") {
			hint = true;
			hintreveal = 0;
			visiblewin = true;
		}
	}
	else if (msg.content.startsWith("!helpcolor")) {
		ws.send("!say Tapez !color + un code hexa (exemple : !color #FF00FF) ou une couleur (exemple !color purple) pour changer de couleur de pseudo ! Vous pouvez trouver le code hexa qui vous plaît sur https://htmlcolorcodes.com/fr/selecteur-de-couleur/");
	}
	else if (msg.content.startsWith("!load")) {
		if (msg.isBroadcaster == "true") {
			ctx.clearRect(0, 0, x, y);
			ws.send("!say Récupération des données viewers (score et couleur) OK");
			ws.send("!load");
		}
	}
	else if (msg.content == "!lost") {
		if (msg.isBroadcaster == "true") {
			if (gametype == "multi" && songfound == true) {
				ws.send("!say Grmblblbl... 1 point bonus pour vous : ");
				var toGive = "";
				for (var i = 0; i < songlist.find(x => x.listname === liste).songs[songindex].songs.length; i++) {
					toGive += "@" + songlist.find(x => x.listname === liste).songs[songindex].songs[i].user + " ";
					addPoints(1, songlist.find(x => x.listname === liste).songs[songindex].songs[i].user);
				}
				ws.send("!say " + toGive);
			}
		}
	}
	else if (msg.content.startsWith("!next") || msg.content.startsWith("!go")) {
		if (msg.isBroadcaster == "true" && songindex < songlist.find(x => x.listname === liste).songs.length - 1) {
			if (gametype == "single" || gametype == "double" || gametype == "gus" || gametype == "djviewers") {
				countdown = delay;
				if (countdown > 0) {
					ws.send("!say Prochaine chanson dans...")
				}
				ready = false;
			}

			if (gametype == "collab") {
				ready = true;
			}

			if (gametype == "year") {
				ready = true;
			}

			if (gametype == "trivial") {
				ready = true;
				// if (songindex > 0)
				// {
				// 	for (var i = 0; i < songlist.find(x => x.listname === liste).songs[songindex].quiz.length; i++)
				// 	{
				// 		trivialsongs[songindex][i].pause();
				// 	}	
				// }
			}

			bg = "#000000";
			resetvisibles();

			songfound = false;
			numberfound = 0;
			songindex++;
			ctx.clearRect(0, 0, x, y);
			drawTitle();

			winImage = "./images/" + liste + "/" + songindex + ".jpg";
			hint = false;

			youtube = songlist.find(x => x.listname === liste).songs[songindex].youtube;

			if (gametype == "single" || gametype == "trivial" || gametype == "collab" || gametype == "year" | gametype == "gus" | gametype == "djviewers") {
				singlewin = [];
				song = songlist.find(x => x.listname === liste).songs[songindex].name;
				alternate = songlist.find(x => x.listname === liste).songs[songindex].alternate;
				fullsongname = songlist.find(x => x.listname === liste).songs[songindex].fullname;
				singletext = songlist.find(x => x.listname === liste).songs[songindex].singletext;
				if (singletext == undefined) {
					singletext = "C'est parti pour la chanson " + (songindex + 1);
				}

				if (gametype == "year") {
					visibleyear = true;
					years = [];
				}

				if (gametype == "gus") {
					visiblegus = true;
					gus = [];
					gusstop = false;
				}
			}

			if (gametype == "double") {
				doublewin = [[], []];
				info1found = false;
				info2found = false;
			}

			if (gametype == "mosaic") {
				cdmosaic = defaultcdmosaic;
			}

			if (gametype == "multi") {
				stopsong.pause();
				stopsong.currentTime = 0;
				countries = [];
				for (var i = 0; i < songlist.find(x => x.listname === liste).songs[songindex].songs.length; i++) {
					multisongs[songindex][i].play();
				}
			}

			// if (gametype == "trivial")
			// {			
			// 	for (var i = 0; i < songlist.find(x => x.listname === liste).songs[songindex].quiz.length; i++)
			// 	{
			// 		trivialsongs[songindex][i].volume = 0;
			// 		trivialsongs[songindex][i].currentTime = 0;
			// 		trivialsongs[songindex][i].play();
			// 	}		
			// }	
		}
	}
	else if (msg.content.startsWith("!replay")) {
		if (msg.isBroadcaster == "true") {
			for (var i = 0; i < songlist.find(x => x.listname === liste).songs.length; i++) {
				for (j = 0; j < songlist.find(x => x.listname === liste).songs[i].songs.length; j++) {
					multisongs[i][j].currentTime = 20;
				}
			}
		}
	}
	else if (msg.content.startsWith("!save")) {
		if (msg.isBroadcaster == "true") {
			ws.send("!say Sauvegarde des données viewers (score et couleur)");
			if (members.length > 0) ws.send(JSON.stringify(members));
			if (totalpoints.length > 0) ws.send(JSON.stringify(totalpoints));
		}
	}
	else if (msg.content == "!score") {
		if (msg.isBroadcaster == "true") {
			if (members.length > 0) ws.send(JSON.stringify(members));
			if (totalpoints.length > 0) ws.send(JSON.stringify(totalpoints));
			resetvisibles();
			if (points.length > 0) {
				visiblepoints = !visiblepoints;
			}
		}
	}
	else if (msg.content.startsWith("!so ")) {
		if (msg.isBroadcaster == "true") {
			if (msg.content.replace("!so ", "").replace("@", "") == "ThomasHercouet") {
				ws.send("!say Ancien animateur radio, CM de chez Topito, créateur de la Nuit Originale, streameur, écrivain...  : Cet homme est multitalentueux, n'hésitez pas à follow Thomas Hercouët sur tous ses réseaux ! twitter.com/DrHercouet twitch.tv/thomashercouet");
			}
			else {
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
	}
	else if (msg.content.startsWith("!start")) {
		if (msg.isBroadcaster == "true") {
			bg = "#000000";
			resetvisibles();
			if (songlist[parseInt(msg.content.replace("!start ", ""))] == undefined) {
				ws.send("!say Désolé mais cette liste n'existe pas !");
			}
			else {
				liste = songlist[parseInt(msg.content.replace("!start ", ""))].listname
				singletext = "On va commencer !";
				points = [];
				numberfound = 0;
				songindex = -1;
				fullsongname = "On a pas encore commencé !";
				ctx.clearRect(0, 0, x, y);
				songfound = false;

				songlist.find(x => x.listname === liste).done = true;

				if (songlist.find(x => x.listname === liste).nbwin != undefined) {
					nbwin = parseInt(songlist.find(x => x.listname === liste).nbwin);
				}
				else nbwin = defaultnbwin;

				if (songlist.find(x => x.listname === liste).bonus != undefined) {
					bonusword = songlist.find(x => x.listname === liste).bonus.toUpperCase();
					bonusletters = [];
					bonusans = [];
					for (var i = 0; i < bonusword.length; i++) {
						if (bonusletters.find(x => x.letter === bonusword.charAt(i)) == undefined) {
							bonusletters.push({ 'letter': bonusword.charAt(i), 'found': false });
						}
					}
					bonusprop = [{ 'user': 'space', 'letter': ' ' }, { 'user': 'tiret', 'letter': '-' }]
					visiblebonus = true;
					bonusfound = "false";

					tokens = [];
				}
				else {
					visiblebonus = false;
					bonusword = undefined;
				}

				if (songlist.find(x => x.listname === liste).delay != undefined) {
					delay = parseInt(songlist.find(x => x.listname === liste).delay) * 100;
				}
				else delay = defaultdelay;

				if (songlist.find(x => x.listname === liste).type == "single") {
					gametype = "single";
				}

				if (songlist.find(x => x.listname === liste).type == 'multi') {
					gametype = "multi";
					preloadMulti();
					redraw();
				}

				if (songlist.find(x => x.listname === liste).type == 'trivial') {
					//preloadTrivial();	
					gametype = "trivial";
				}

				if (songlist.find(x => x.listname === liste).type == 'djviewers')
				{				
					gametype = "djviewers";		
					preloadDJ(songlist.find(x => x.listname === liste).songs.length);
				}				

				if (songlist.find(x => x.listname === liste).type == 'year') {
					gametype = "year";
				}

				if (songlist.find(x => x.listname === liste).type == 'gus') {
					gametype = "gus";
				}

				if (songlist.find(x => x.listname === liste).type == 'collab') {
					gametype = "collab";
					preloadCollab();
					tbfcollab = Array.from(songlist.find(x => x.listname === liste).songs[0].songs);
				}

				if (songlist.find(x => x.listname === liste).type == 'mosaic') {
					gametype = "mosaic";
					foundmosaic = [];
					tbfmosaic = Array.from(songlist.find(x => x.listname === liste).songs);
					curmosaic = Array.from(tbfmosaic);
					foundmosaic = [];

					curmosaic.splice(9, tbfmosaic.length - 9);
					tbfmosaic.splice(0, 9);

					preloadMosaic(songlist.find(x => x.listname === liste).songs.length);
				}

				if (songlist.find(x => x.listname === liste).type == 'double') {
					gametype = "double";
					info1found = false;
					info2found = false;
				}
			}
		}
	}
	else if (msg.content.startsWith("!stop")) {

		if (msg.isBroadcaster == "true" && songindex >= 0) {
			if (gametype == "gus") {
				visiblewin = true;
				gusstop = true;
				giveGusPoints(songlist.find(x => x.listname === liste).songs[songindex].minutes);
			}
		}

		if (msg.isBroadcaster == "true" && songfound == false && songindex >= 0) {
			songfound = true;
			visiblewin = true;

			countdown = -1;
			ready = false;

			for (var i = 0; i < chat.length; i++)chat[i].cur = "no";

			if (gametype == "single" || gametype == "trivial" || gametype == "gus" || gametype == "djviewers") {
				if (singlewin.length == 0) {
					drawSingleLose();
				}
				else {
					drawSingleWin();
					givePoints(singlewin);
				}
			}

			if (gametype == "collab") {
				givePoints(singlewin);
				visiblewin = false;
			}

			if (gametype == "multi") {
				if (msg.isBroadcaster == "true") {
					for (var i = 0; i < songlist.find(x => x.listname === liste).songs.length; i++) {
						for (j = 0; j < songlist.find(x => x.listname === liste).songs[i].songs.length; j++) {
							multisongs[i][j].pause();
						}
					}
				}
			}

			if (gametype == "double") {

				if (doublewin[0].length > 0 && info1found == false) {
					givePoints(doublewin[0]);
				}

				if (doublewin[1].length > 0 && info2found == false) {
					givePoints(doublewin[1]);
				}

				info1found = true;
				info2found = true;
			}

			if (gametype == "year") {
				visiblewin = true;
				giveYearPoints(songlist.find(x => x.listname === liste).songs[songindex].name);
			}

			if (youtube != undefined) {
				ws.send("!say Pour réécouter tranquillement : " + youtube);
			}

			if (songindex == songlist.find(x => x.listname === liste).songs.length - 1) {
				ws.send("!say C'était la dernière chanson de la liste ! Un point sur les scores !");
			}
		}
	}
	else if (msg.content == "!theme") {
		if (msg.isBroadcaster == "true") {
			resetvisibles();
			visibletheme = !visibletheme;
		}
	}
	else if (msg.content == "!total") {
		if (msg.isBroadcaster == "true") {
			resetvisibles();
			if (totalpoints.length > 0) {
				visibletotalpoints = !visibletotalpoints;
			}
		}
	}
	else if (msg.content.startsWith("!vote ")) {
		if (msg.isBroadcaster == "true") {
			gametype = 'vote';
			visiblevote = !visiblevote;
			voteprop = msg.content.replace("!vote ", "").split("/");
			votes = [];
		}
	}
	else if ((gametype == "single" || gametype == "trivial" || gametype == "collab" || gametype == "gus" || gametype == "djviewers") && ready == true) {
		addChat(msg.user, msg.content, "", "yes");

		if (songfound == false) {
			var lev = 0.75;

			if (songlist.find(x => x.listname === liste).songs[songindex].lev != undefined)
				lev = songlist.find(x => x.listname === liste).songs[songindex].lev

			var ok = false;
			if (similarity(msg.content, song) >= lev) {
				ok = true;
			}
			if (alternate != '' && similarity(msg.content, alternate) >= lev) {
				ok = true;
			}
			if (singlewin.find(x => x.user === msg.user) != undefined) {
				// UNCOMMENT
				//ok = false;
			}
			if (ok) {
				if (singlewin.length == 0) chat[chat.length - 1].found = "🥇";
				if (singlewin.length == 1) chat[chat.length - 1].found = "🥈";
				if (singlewin.length == 2) chat[chat.length - 1].found = "🥉";
				if (singlewin.length >= 3) chat[chat.length - 1].found = "🍭";

				if (singlewin.length < nbwin) {
					singlewin.push({ 'user': msg.user });
				}

				if (singlewin.length == nbwin) {
					visiblewin = true;
					songfound = true;

					countdown = -1;
					//ready = false;

					if (gametype != "collab") {
						drawSingleWin();
					}

					givePoints(singlewin);

					for (var i = 0; i < chat.length; i++)chat[i].cur = "no";

					if (youtube != undefined) {
						ws.send("!say Pour réécouter tranquillement : " + youtube);
					}
				}
			}
		}

		if (numberfound < 4 && gametype == "trivial") {
			for (var i = 0; i < songlist.find(x => x.listname === liste).songs[songindex].quiz.length; i++) {
				var lev = 0.75;
				if (songlist.find(x => x.listname === liste).songs[songindex].quiz[i].lev != undefined)
					lev = songlist.find(x => x.listname === liste).songs[songindex].quiz[i].lev

				var inf = songlist.find(x => x.listname === liste).songs[songindex].quiz[i].answer;
				var alt = songlist.find(x => x.listname === liste).songs[songindex].quiz[i].alternate;
				var found = songlist.find(x => x.listname === liste).songs[songindex].quiz[i].found;
				var ok = false;

				if (similarity(msg.content, inf) >= lev) {
					ok = true;
				}
				if (alt != '' && similarity(msg.content, alt) >= lev) {
					ok = true;
				}
				if (found != 'false') {
					ok = false;
				}
				if (ok) {
					//trivialsongs[songindex][numberfound].volume = 1;
					chat[chat.length - 1].found = "⭐";
					chat[chat.length - 1].cur = "no";
					songlist.find(x => x.listname === liste).songs[songindex].quiz[i].found = msg.user;

					ws.send("!say GivePLZ Bravo @" + msg.user + " ! 1 point de plus pour toi TakeNRG");
					addPoints(1, msg.user);
					numberfound++;
				}
			}
		}

		if (numberfound < 25 && gametype == "collab") {
			for (var i = 0; i < tbfcollab.length; i++) {
				var lev = 0.75;
				var inf = tbfcollab[i].name;
				var alt = tbfcollab[i].alternate;
				var found = tbfcollab[i].found;
				var ok = false;

				if (similarity(msg.content, inf) >= lev) {
					ok = true;
				}
				if (alt != '' && similarity(msg.content, alt) >= lev) {
					ok = true;
				}
				if (found != 'false') {
					ok = false;
				}
				if (ok) {
					chat[chat.length - 1].found = "⭐";
					chat[chat.length - 1].cur = "no";
					tbfcollab[i].found = msg.user;

					ws.send("!say GivePLZ Bravo @" + msg.user + " ! 3 points de plus pour toi TakeNRG");
					addPoints(3, msg.user);
					numberfound++;
				}
			}
		}

		if (numberfound == 25 && gametype == "collab") {
			numberfound = 26;
			ws.send("!say SingsNote Vous avez tout trouvé SingsNote ! Bravo ! Et " + singlewin.length + " personnes ont trouvé l'artiste de la pochette ! PogChamp");
		}

		if (gametype == 'gus') {
			if (!isNaN(msg.content) && ready) {
				if (msg.content >= 0 && msg.content < 500) {
					const duplicate = x => x.user.toString() === msg.user.toString().toString()
					if (gus.findIndex(duplicate) >= 0) {
						gus.splice(gus.findIndex(duplicate), 1);
					}
					gus.push({ 'user': msg.user.toString().toString(), 'minutes': parseInt(msg.content, 10) });
				}
			}
		}

		if(gametype == "djviewers")
		{
			if(!isNaN(parseInt(msg.content)) && songfound == false)
			{
				var sample = parseInt(msg.content);
				if(sample >= 0 && (sample <= songlist.find(x => x.listname === liste).songs[songindex].samples))
				{
					djviewers[songindex][sample].play();
				}
			}
		}
	}
	else if (gametype == "double" && ready == true) {
		addChat(msg.user, msg.content, "", "yes");
		if (songfound == false && songindex >= 0) {


			for (var i = 0; i < 2; i++) {
				var inf = songlist.find(x => x.listname === liste).songs[songindex].info[i].name;
				var alt = songlist.find(x => x.listname === liste).songs[songindex].info[i].alternate;
				var ok = false;

				var lev = 0.75;

				if (songlist.find(x => x.listname === liste).songs[songindex].info[i].lev != undefined)
					lev = songlist.find(x => x.listname === liste).songs[songindex].info[i].lev

				console.log(lev);

				if (similarity(msg.content, inf) > lev) {
					ok = true;
				}
				if (alt != '' && similarity(msg.content, alt) > lev) {
					ok = true;
				}
				if (doublewin[i].find(x => x.user === msg.user) != undefined) {
					// UNCOMMENT
					ok = false;
				}
				if (ok) {
					if (doublewin[i].length == 0) chat[chat.length - 1].found = "🥇";
					if (doublewin[i].length == 1) chat[chat.length - 1].found = "🥈";
					if (doublewin[i].length == 2) chat[chat.length - 1].found = "🥉";
					if (doublewin[i].length >= 3) chat[chat.length - 1].found = "🍭";

					chat[chat.length - 1].cur = "yes" + i;

					if (doublewin[i].length < nbwin) {
						doublewin[i].push({ 'user': msg.user });
					}
				}

				if (doublewin[0].length == nbwin && info1found == false) {
					info1found = true;
					givePoints(doublewin[0]);
					for (var i = 0; i < chat.length; i++) {
						if (chat[i].cur == "yes0") chat[i].cur = "no";
					}
				}

				if (doublewin[1].length == nbwin && info2found == false) {
					info2found = true;
					givePoints(doublewin[1]);
					for (var i = 0; i < chat.length; i++) {
						if (chat[i].cur == "yes1") chat[i].cur = "no";
					}
				}

				if (info1found && info2found) {
					visiblewin = true;
					songfound = true;

					countdown = -1;
					ready = false;

					if (youtube != undefined) {
						ws.send("!say Pour réécouter tranquillement : " + youtube);
					}
				}
			}
		}
	}
	else if (gametype == "multi") {
		addChat(msg.user, msg.content, "", "no");
		drawTitle();

		if (songindex >= 0) {
			var pts = Math.round((6 - numberfound) / 2);

			for (var i = 0; i < songlist.find(x => x.listname === liste).songs[songindex].songs.length; i++) {
				var inf = songlist.find(x => x.listname === liste).songs[songindex].songs[i].name;
				var alt = songlist.find(x => x.listname === liste).songs[songindex].songs[i].alternate;
				var found = songlist.find(x => x.listname === liste).songs[songindex].songs[i].found;
				var ok = false;


				if (similarity(msg.content, inf) > 0.75) {
					ok = true;
				}
				if (alt != '' && similarity(msg.content, alt) > 0.75) {
					ok = true;
				}
				if (found != 'false') {
					ok = false;
				}
				if (ok) {
					chat[chat.length - 1].found = "🏅";
					songlist.find(x => x.listname === liste).songs[songindex].songs[i].found = numberfound;
					songlist.find(x => x.listname === liste).songs[songindex].songs[i].user = msg.user;
					multisongs[songindex][i].pause();
					if (numberfound < 4) {
						ws.send("!say GivePLZ Bravo @" + msg.user + " ! " + pts.toString() + " points de plus pour toi TakeNRG");
					}
					else {
						ws.send("!say GivePLZ Bravo @" + msg.user + " ! " + pts.toString() + " point de plus pour toi TakeNRG");
					}
					addPoints(pts, msg.user);
					numberfound++;
				}
			}
		}

		if (numberfound == 6) {
			if (songfound == false) {
				stopsong.play();
				ws.send("!say Bravo, vous avez tout trouvé ! Pour réécouter tranquillement : ");
				for (var i = 0; i < songlist.find(x => x.listname === liste).songs[songindex].songs.length; i++) {
					ws.send("!say " + songlist.find(x => x.listname === liste).songs[songindex].songs[i].fullname + " - " + songlist.find(x => x.listname === liste).songs[songindex].songs[i].youtube);
				}
			}
			songfound = true;
		}


	}
	else if (gametype == 'vote') {
		var v = parseInt(msg.content);
		if (isNaN(v) == false) {
			if (v > 0 && v <= voteprop.length) {
				if (votes.find(x => x.user === msg.user) != undefined) {
					votes.find(x => x.user === msg.user).vote = v;
					ws.send("!say " + msg.user + ", vote mis à jour !");
				}
				else {
					votes.push({ 'user': msg.user, 'vote': v });
					ws.send("!say " + msg.user + ", merci pour le vote !");
				}

			}
			else addChat(msg.user, msg.content, "", "no");
		}
		else addChat(msg.user, msg.content, "", "no");
	}
	else if (gametype == 'mosaic') {
		addChat(msg.user, msg.content, "", "no");
		drawTitle();

		if (songindex >= 0) {
			for (var i = 0; i < curmosaic.length; i++) {
				var inf = curmosaic[i].name;
				var alt = curmosaic[i].alternate;
				var found = curmosaic[i].found;
				var ok = false;

				if (similarity(msg.content, inf) > 0.75) {
					ok = true;
				}
				if (alt != '' && similarity(msg.content, alt) > 0.75) {
					ok = true;
				}
				if (found != 'false') {
					ok = false;
				}
				if (ok) {
					chat[chat.length - 1].found = "🏅";
					curmosaic[i].found = msg.user;
					lastuserfound[i] = msg.user;
					lastsongfound[i] = curmosaic[i].name;
					ws.send("!say 👏" + curmosaic[i].fullname + "👏 a été trouvé par " + msg.user);
					addPoints(1, msg.user);
					numberfound++;

					foundmosaic.push(curmosaic[i]);

					if (tbfmosaic.length > 0) {
						curmosaic[i] = tbfmosaic[0];
						tbfmosaic.splice(0, 1);
					}
					else {
						curmosaic[i].index = -1
					}
				}
			}
		}

		if (numberfound == mosaicpics.length) {
			if (songfound == false) {
				ws.send("!say Bravo, vous avez tout trouvé !");
			}

			songfound = true;
		}
	}
	else if (gametype == 'year') {
		addChat(msg.user, msg.content, "", "yes");
		var year = msg.content;

		if (!isNaN(year) && ready) {
			if (year > 1900 && year < 2050) {
				const duplicate = x => x.user.toString() === msg.user.toString()
				if (years.findIndex(duplicate) >= 0) {
					years.splice(years.findIndex(duplicate), 1);
				}
				years.push({ 'user': msg.user.toString(), 'year': msg.content });
			}
		}
	}
	else addChat(msg.user, msg.content, "", "no");
	redraw();
};

function drawTitle() {
	var title;
	var subtitle;
	if (liste == "begin") {
		title = "Bienvenue !";
		subtitle = "C'est parti pour 3h20 de musique, de bonne humeur, d'amitié aussi !";
	}
	else {
		title = songlist.find(x => x.listname === liste).title;
		subtitle = songlist.find(x => x.listname === liste).subtitle;
	}

	ctx.strokeStyle = "white";
	ctx.fillStyle = "black";
	roundRect(ctx, x / 2 - 800, 10, 1600, 90, 20, true);

	ctx.fillStyle = "white";
	ctx.font = '40px Trebuchet MS';
	ctx.fillText(title, x / 2 - ctx.measureText(title).width / 2, 50);
	ctx.font = '20px Trebuchet MS';
	ctx.fillText(subtitle, x / 2 - ctx.measureText(subtitle).width / 2, 80);

	if (gametype == "single" || gametype == "double" || gametype == "trivial" || gametype == "year" || gametype == "gus" || gametype == "djviewers") {
		ctx.font = '40px Trebuchet MS';
		var tot = songlist.find(x => x.listname === liste).songs.length;
		ctx.fillText((songindex + 1) + "/" + tot, x / 2 - 700, 68);
		ctx.font = '20px Trebuchet MS';
	}
}

function drawCadre(color, height = 200, offset = 0) {
	ctx.strokeStyle = color;
	ctx.fillStyle = bg;
	roundRect(ctx, x / 2 - 800, 120 + offset, 780, height, 20, true);
}

function drawSingleWin() {
	ctx.font = '20px Trebuchet MS';
	drawCadre("green");
	var winnerswidth = 0;
	for (var i = 0; i < singlewin.length; i++) {
		winnerswidth += ctx.measureText("🥇 , ").width;
		winnerswidth += ctx.measureText(singlewin[i].user).width;
	}
	ctx.fillStyle = "white";
	ctx.fillText("Félicitations à : ", x / 2 - 400 - ctx.measureText("Félicitations à :").width / 2, 160);

	var curposwin = 0;
	for (var j = 0; j < singlewin.length; j++) {
		ctx.fillStyle = getUserColor(singlewin[j].user);
		if (j == 0) ctx.fillText("🥇" + singlewin[j].user, x / 2 - 400 - winnerswidth / 2 + curposwin, 190);
		if (j == 1) ctx.fillText("🥈" + singlewin[j].user, x / 2 - 400 - winnerswidth / 2 + curposwin, 190);
		if (j == 2) ctx.fillText("🥉" + singlewin[j].user, x / 2 - 400 - winnerswidth / 2 + curposwin, 190);
		if (j >= 3) ctx.fillText("🍭" + singlewin[j].user, x / 2 - 400 - winnerswidth / 2 + curposwin, 190);
		curposwin += ctx.measureText("🥇" + singlewin[j].user + " ").width;
		ctx.fillStyle = "white";

		if (j == singlewin.length - 1) {
			ctx.fillText(" !", x / 2 - 400 - winnerswidth / 2 + curposwin, 190);
		}
		else {
			ctx.fillText(", ", x / 2 - 400 - winnerswidth / 2 + curposwin, 190);
			curposwin += ctx.measureText(", ").width;
		}
	}

	ctx.fillText("La bonne réponse était", x / 2 - 400 - ctx.measureText("La bonne réponse était").width / 2, 230);
	ctx.font = '30px Trebuchet MS';
	if (ctx.measureText(fullsongname).width >= 770) {
		ctx.font = '25px Trebuchet MS';
	}
	ctx.fillText(fullsongname, x / 2 - 400 - ctx.measureText(fullsongname).width / 2, 280);
	ctx.font = '20px Trebuchet MS';
}

function drawSingleLose() {
	drawCadre("red");
	ctx.fillStyle = "white";
	ctx.fillText("C'est pas grave, c'était dur !", x / 2 - 400 - ctx.measureText("C'est pas grave, c'était dur !").width / 2, 160);
	ctx.fillText("La bonne réponse était", x / 2 - 400 - ctx.measureText("La bonne réponse était").width / 2, 200);
	ctx.font = '30px Trebuchet MS';
	if (ctx.measureText(fullsongname).width >= 770) {
		ctx.font = '25px Trebuchet MS';
	}
	ctx.fillText(fullsongname, x / 2 - 400 - ctx.measureText(fullsongname).width / 2, 280);
	ctx.font = '20px Trebuchet MS';
}

function drawDoubleTags() {
	ctx.fillStyle = "white";
	ctx.fillText("2 informations à trouver :", x / 2 - 400 - ctx.measureText("2 informations à trouver :").width / 2, 160);
	var info1 = songlist.find(x => x.listname === liste).info1;
	var info2 = songlist.find(x => x.listname === liste).info2;
	if (info1found == false) ctx.fillText(info1, x / 2 - 400 - ctx.measureText(info1).width / 2, 190);
	if (info2found == false) ctx.fillText(info2, x / 2 - 400 - ctx.measureText(info2).width / 2, 250);
}

function drawDoubleWin(info) {
	ctx.font = 'bold 20px Trebuchet MS';
	ctx.fillStyle = "white";

	var infos = [songlist.find(x => x.listname === liste).info1, songlist.find(x => x.listname === liste).info2];
	var answer = songlist.find(x => x.listname === liste).songs[songindex].info[info].fullname;
	ctx.fillText(infos[info] + " : " + answer, x / 2 - 400 - ctx.measureText(infos[info] + " : " + answer).width / 2, 190 + info * 60);

	ctx.font = '20px Trebuchet MS';
	var winnerswidth = 0;
	for (var i = 0; i < doublewin[info].length; i++) {
		winnerswidth += ctx.measureText("🥇 , ").width;
		winnerswidth += ctx.measureText(doublewin[info][i].user).width;
	}
	ctx.fillStyle = "white";

	var curposwin = 0;
	for (var j = 0; j < doublewin[info].length; j++) {
		ctx.fillStyle = getUserColor(doublewin[info][j].user);
		if (j == 0) ctx.fillText("🥇" + doublewin[info][j].user, x / 2 - 400 - winnerswidth / 2 + curposwin, 220 + info * 60);
		if (j == 1) ctx.fillText("🥈" + doublewin[info][j].user, x / 2 - 400 - winnerswidth / 2 + curposwin, 220 + info * 60);
		if (j == 2) ctx.fillText("🥉" + doublewin[info][j].user, x / 2 - 400 - winnerswidth / 2 + curposwin, 220 + info * 60);
		if (j >= 3) ctx.fillText("🍭" + doublewin[info][j].user, x / 2 - 400 - winnerswidth / 2 + curposwin, 220 + info * 60);
		curposwin += ctx.measureText("🥇" + doublewin[info][j].user + " ").width;
		ctx.fillStyle = "white";

		if (j == doublewin[info].length - 1) {
			ctx.fillText(" !", x / 2 - 400 - winnerswidth / 2 + curposwin, 220 + info * 60);
		}
		else {
			ctx.fillText(", ", x / 2 - 400 - winnerswidth / 2 + curposwin, 220 + info * 60);
			curposwin += ctx.measureText(", ").width;
		}
	}
}

function givePoints(win) {
	var tosend = "!say GivePLZ "
	for (var i = 0; i < win.length; i++) {
		var pts = 3 - i;

		if (pts == 3) {
			if (tokens.find(x => x.user === win[i].user) == undefined) {
				tokens.push({ 'user': win[i].user, 'token': 1 });
			}
			else {
				tokens.find(x => x.user === win[i].user).token++;
			}
		}

		if (pts <= 1) pts = 1;

		if (pts > 1) tosend += pts + " points pour @" + win[i].user + ", ";
		else tosend += pts + " point pour @" + win[i].user + ", ";

		addPoints(pts, win[i].user);
	}
	tosend += " bravo ! TakeNRG";
	ws.send(tosend);
}

function drawWinImage() {
	var img = new Image();   // Crée un nouvel élément Image
	img.src = winImage; // Définit le chemin vers sa source
	img.onload = function () {

		var hRatio = 380 / img.width;
		var vRatio = 555 / img.height;

		if (gametype == 'trivial' || gametype == 'year' || gametype == 'gus') {
			var vRatio = 380 / img.height;
		}

		var ratio = Math.min(hRatio, vRatio);

		var xoffset = 0;
		var yoffset = 0;
		if (ratio == hRatio) {
			if (gametype == 'trivial' || gametype == 'year' || gametype == 'gus') {
				yoffset = Math.round((380 - img.height * ratio) / 2);
			}
			else {
				yoffset = Math.round((555 - img.height * ratio) / 2);
			}
		}
		else {
			xoffset = Math.round((380 - img.width * ratio) / 2);
		}

		ctx.fillStyle = 'white';
		ctx.strokeStyle = 'white';

		if (gametype == 'trivial' || gametype == 'year' || gametype == 'gus') {
			ctx.drawImage(img, 0, 0, img.width, img.height, x / 2 - 400 + xoffset, 515 + yoffset, img.width * ratio, img.height * ratio);
			if (hint && !songfound) {
				ctx.drawImage(hintpic[hintreveal], x / 2 - 400, 515, 380, 380);
			}
			roundRect(ctx, x / 2 - 400, 515, 380, 380, 5, false);
		}
		else {
			ctx.drawImage(img, 0, 0, img.width, img.height, x / 2 - 400 + xoffset, 340 + yoffset, img.width * ratio, img.height * ratio);
			if (hint && !songfound) {
				ctx.drawImage(hintpic[hintreveal], x / 2 - 400, 340, 380, 555);
			}
			roundRect(ctx, x / 2 - 400, 340, 380, 555, 5, false);
		}
	}
}

function drawMultiTags() {
	ctx.font = '18px Trebuchet MS';
	ctx.fillStyle = "white";
	ctx.fillText("Chanson 1 : ", x / 2 - 750, 150);
	ctx.fillText("Chanson 2 : ", x / 2 - 750, 180);
	ctx.fillText("Chanson 3 : ", x / 2 - 750, 210);
	ctx.fillText("Chanson 4 : ", x / 2 - 750, 240);
	ctx.fillText("Chanson 5 : ", x / 2 - 750, 270);
	ctx.fillText("Chanson 6 : ", x / 2 - 750, 300);
	ctx.font = '20px Trebuchet MS';
}

function drawMultiSongs() {
	ctx.font = '18px Trebuchet MS';
	for (var i = 0; i < songlist.find(x => x.listname === liste).songs[songindex].songs.length; i++) {
		var mulsong = songlist.find(x => x.listname === liste).songs[songindex].songs.find(x => x.found === i)
		if (mulsong != undefined) {
			var usr = songlist.find(x => x.listname === liste).songs[songindex].songs.find(x => x.found === i).user;
			ctx.fillStyle = getUserColor(usr);
			ctx.fillText(usr, x / 2 - 750 + ctx.measureText("Chanson X : ").width, 150 + 30 * i);
			ctx.fillStyle = "white";
			ctx.fillText(" - " + mulsong.fullname, x / 2 - 750 + ctx.measureText("Chanson X : " + usr).width, 150 + 30 * i);
		}
	}
	ctx.font = '20px Trebuchet MS';
}

function drawQuiz() {
	ctx.strokeStyle = "white";
	ctx.fillStyle = "black";
	roundRect(ctx, x / 2 - 800, 338, 1500, 160, 20, true);

	if (visiblewin == false) {
		roundRect(ctx, x / 2 - 400, 515, 380, 380, 20, false);
		ctx.font = '28px Trebuchet MS';
		ctx.fillStyle = 'white';
		ctx.fillText("Instruments débloqués : ", x / 2 - 400 + 380 / 2 - ctx.measureText("Instruments débloqués :").width / 2, 560);
	}

	for (var i = 0; i < songlist.find(x => x.listname === liste).songs[songindex].quiz.length; i++) {
		var question = songlist.find(x => x.listname === liste).songs[songindex].quiz[i].question;
		var category = songlist.find(x => x.listname === liste).songs[songindex].quiz[i].category;
		var found = songlist.find(x => x.listname === liste).songs[songindex].quiz[i].found;
		var answer = songlist.find(x => x.listname === liste).songs[songindex].quiz[i].answer;

		ctx.strokeStyle = colorcategories[categories.indexOf(category)];
		ctx.fillStyle = colorcategories[categories.indexOf(category)];

		ctx.font = '20px Trebuchet MS';
		roundRect(ctx, x / 2 - 785, 380 + 30 * i - 18, ctx.measureText(category).width, 22, 10, true, true);

		var catwidth = ctx.measureText(category).width;
		ctx.fillStyle = 'black';
		ctx.fillText(category, x / 2 - 785, 380 + 30 * i);

		ctx.font = '20px Trebuchet MS';
		ctx.fillStyle = 'white';

		if (found == 'false') {
			ctx.fillStyle = 'white';
			ctx.font = '20px Trebuchet MS';
			ctx.fillText(" " + question, x / 2 - 785 + catwidth, 380 + 30 * i);
			ctx.fillStyle = 'white';
		}
		else {
			ctx.fillText(question, x / 2 - 785 + catwidth + ctx.measureText(" ").width, 380 + 30 * i);
			ctx.fillText(" : " + answer, x / 2 - 785 + catwidth + ctx.measureText(" " + question).width, 380 + 30 * i);
			ctx.fillStyle = getUserColor(found);
			ctx.fillText(" - " + found, x / 2 - 785 + catwidth + ctx.measureText(" " + question + " : " + answer).width, 380 + 30 * i);
		}

		ctx.font = '40px Trebuchet MS';
		if (visiblewin == false) {
			if ((numberfound - i) > 0) {
				ctx.fillStyle = 'white';
			}
			else {
				ctx.fillStyle = '#4e4e4e';
			}
			ctx.fillText(instruments[i], x / 2 - 390 + 95 + i % 2 * 190 - ctx.measureText(instruments[i]).width / 2, 650 + Math.trunc(i / 2) * 190);
		}
		ctx.font = '20px Trebuchet MS';
	}
}

function redraw() {

	ctx.clearRect(0, 0, x, y);

	drawChat();
	drawTitle();

	if (gametype == "single" || gametype == "trivial" || gametype == "gus" || gametype == "djviewers") {
		drawCadre("white");
		if (songfound == false) {
			if (singletext != undefined) {
				ctx.font = '40px Trebuchet MS';
				ctx.fillStyle = 'white';
				ctx.fillText(singletext, x / 2 - 400 - ctx.measureText(singletext).width / 2, 230);
				ctx.font = '20px Trebuchet MS';
			}
		}

		if (songfound == true) {
			if (singlewin.length == 0) drawSingleLose();
			else drawSingleWin();
		}

		if (gametype == "trivial" && songindex >= 0) {
			drawQuiz();
		}

		if (gametype == "collab" && songindex >= 0) {
			drawCollab();
		}
	}

	if (gametype == "double") {
		if (songfound == false) {
			drawCadre("white");
		}
		else {
			drawCadre("green");
		}

		drawDoubleTags();

		if (info1found == true) drawDoubleWin(0);
		if (info2found == true) drawDoubleWin(1);
	}

	if (gametype == "multi") {

		if (numberfound == 6) {
			drawCadre("green");
		}
		else {
			drawCadre("red");

		}

		if (songindex >= 0) {
			drawMultiTags();
			drawMultiSongs();
		}
		else {
			if (singletext != undefined) {
				ctx.font = '40px Trebuchet MS';
				ctx.fillStyle = 'white';
				ctx.fillText(singletext, x / 2 - 400 - ctx.measureText(singletext).width / 2, 230);
				ctx.font = '20px Trebuchet MS';
			}
		}
	}

	if (gametype == 'mosaic') {
		if (songindex < 0) {
			drawMosaic();
		}
		else {
			fillMosaic();
		}
	}

	if (gametype == 'collab') {
		if (songindex < 0) {
			drawCollab();
		}
		else {
			fillCollab();
		}
	}

	if (visiblepoints || visibletotalpoints) {
		displayPoints();
	}

	if (visibletheme) {
		displayThemes();
	}

	if (visiblebonus) {
		displayBonus();
	}

	if (visiblecountries) {
		displayCountries();
	}

	if (visiblevote) {
		displayVote();
	}

	if (winImage != undefined && visiblewin) {
		drawWinImage();
	}

	if (visibleyear) {
		displayYears();
	}

	if (visiblegus) {
		displayGus();
	}
}

function addPoints(amount, user) {
	if (points.find(x => x.user === user) != undefined) {
		points.find(x => x.user === user).points = points.find(x => x.user === user).points + amount;
	}
	else {
		points.push({ 'user': user, 'points': amount, 'gold': 0, 'silver': 0, 'bronze': 0 });
	}

	if (amount >= 0) {
		var tot = amount;

		while (tot != 0) {
			if (tot >= 3) {
				points.find(x => x.user === user).gold += 1;
				tot = tot - 3;
			}
			if (tot == 2) {
				points.find(x => x.user === user).silver += 1;
				tot = 0;
			}
			if (tot == 1) {
				points.find(x => x.user === user).bronze += 1;
				tot = 0;
			}

		}
	}

	if (liste != "exemple" && liste != "mosaicexemple") {
		if (totalpoints.find(x => x.user === user) != undefined) {
			totalpoints.find(x => x.user === user).points = totalpoints.find(x => x.user === user).points + amount;
		}
		else {
			totalpoints.push({ 'user': user, 'points': amount, 'gold': 0, 'silver': 0, 'bronze': 0 });
		}

		if (amount >= 0) {
			var tot = amount;

			while (tot != 0) {
				if (tot >= 3) {
					totalpoints.find(x => x.user === user).gold += 1;
					tot = tot - 3;
				}
				if (tot == 2) {
					totalpoints.find(x => x.user === user).silver += 1;
					tot = 0;
				}
				if (tot == 1) {
					totalpoints.find(x => x.user === user).bronze += 1;
					tot = 0;
				}
			}
		}
	}
}

function displayPoints() {
	if (visiblepoints || visibletotalpoints) {
		var maxheight = 12;
		var disppoints = [];
		if (visiblepoints) { disppoints = Array.from(points); } else { disppoints = Array.from(totalpoints); }
		var column = 1 + Math.trunc((disppoints.length - 1) / maxheight);

		var hpoints = 90 + disppoints.length * 25;
		if (disppoints.length > maxheight) {
			hpoints = 90 + maxheight * 25
		}
		var wpoints = 300 * column;

		ctx.clearRect(x / 2 - 400 - wpoints / 2, 320 - hpoints / 2, wpoints, hpoints);

		disppoints.sort((a, b) => a.points - b.points);
		disppoints.reverse();

		ctx.fillStyle = bg;
		if (visiblepoints) { ctx.strokeStyle = "orange"; } else { ctx.strokeStyle = "purple"; }

		roundRect(ctx, x / 2 - 400 - wpoints / 2, 320 - hpoints / 2, wpoints, hpoints, 20, true);

		ctx.font = '40px Trebuchet MS';
		ctx.fillStyle = ctx.strokeStyle;
		ctx.fillText("Scores", x / 2 - 400 - ctx.measureText("Scores").width / 2, 320 - hpoints / 2 + 50);

		ctx.font = '18px Trebuchet MS';

		for (var i = 0; i <= disppoints.length - 1; i++) {
			var curcol = 1 + Math.trunc(i / maxheight);
			var colx = 0;
			colx = 300 * curcol - 150 - 300 * (column / 2);
			var curi = i % maxheight;

			var usr = disppoints[i].user;
			var pts = disppoints[i].points;
			var gold = disppoints[i].gold;
			var silver = disppoints[i].silver;
			var bronze = disppoints[i].bronze;

			var wscore = ctx.measureText(usr + pts + "🥇🥇🥇 - " + gold + silver + bronze).width;

			ctx.fillStyle = getUserColor(usr);
			ctx.fillText(usr, x / 2 - 400 + colx - wscore / 2, 320 - hpoints / 2 + 90 + curi * 25);

			ctx.fillStyle = "white";

			ctx.fillText(" 🥇" + gold + "🥈" + silver + "🥉" + bronze + " - " + pts, x / 2 - 400 + colx - wscore / 2 + ctx.measureText(usr).width, 320 - hpoints / 2 + 90 + curi * 25);
		}
		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";
		ctx.font = '20px Trebuchet MS';
	}
}

function displayCountries() {
	if (visiblecountries) {
		var maxheight = 12;
		var column = 1 + Math.trunc((countries.length - 1) / maxheight);

		var hpoints = 90 + countries.length * 25;
		if (countries.length > maxheight) {
			hpoints = 90 + maxheight * 25
		}
		var wpoints = 300 * column;

		ctx.clearRect(x / 2 - 400 - wpoints / 2, 320 - hpoints / 2, wpoints, hpoints);

		ctx.fillStyle = bg;
		if (visiblecountries) { ctx.strokeStyle = "pink"; } else { ctx.strokeStyle = "purple"; }

		roundRect(ctx, x / 2 - 400 - wpoints / 2, 320 - hpoints / 2, wpoints, hpoints, 20, true);

		ctx.font = '40px Trebuchet MS';
		ctx.fillStyle = ctx.strokeStyle;
		ctx.fillText("Pays", x / 2 - 400 - ctx.measureText("Pays").width / 2, 320 - hpoints / 2 + 50);

		ctx.font = '18px Trebuchet MS';

		for (var i = 0; i < countries.length; i++) {
			var curcol = 1 + Math.trunc(i / maxheight);
			var colx = 0;
			colx = 300 * curcol - 150 - 300 * (column / 2);
			var curi = i % maxheight;

			var usr = countries[i].user;
			var ctr = countries[i].country;

			var wcountry = ctx.measureText(usr + " - " + ctr).width;

			ctx.fillStyle = getUserColor(usr);
			ctx.fillText(usr, x / 2 - 400 + colx - wcountry / 2, 320 - hpoints / 2 + 90 + curi * 25);

			ctx.fillStyle = "white";

			if (similarity(ctr, countryanswer) >= 0.75) {
				ctx.fillStyle = "green";
			}

			ctx.fillText(" " + ctr, x / 2 - 400 + colx - wcountry / 2 + ctx.measureText(usr).width, 320 - hpoints / 2 + 90 + curi * 25);
		}
		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";
		ctx.font = '20px Trebuchet MS';
	}
}

function displayYears() {
	if (visibleyear) {
		var maxheight = 12;
		var column = 1 + Math.trunc((years.length - 1) / maxheight);

		var hpoints = 90 + years.length * 25;
		if (years.length > maxheight) {
			hpoints = 90 + maxheight * 25
		}
		var wpoints = 300 * column;

		ctx.clearRect(x / 2 - 400 - wpoints / 2, 320 - hpoints / 2, wpoints, hpoints);

		ctx.fillStyle = bg;
		ctx.strokeStyle = "pink";

		roundRect(ctx, x / 2 - 400 - wpoints / 2, 320 - hpoints / 2, wpoints, hpoints, 20, true);

		ctx.font = '40px Trebuchet MS';
		ctx.fillStyle = ctx.strokeStyle;

		var ansyear = parseInt(songlist.find(x => x.listname === liste).songs[songindex].name);

		if (!songfound) {
			ctx.fillText("Années", x / 2 - 400 - ctx.measureText("Années").width / 2, 320 - hpoints / 2 + 50);
		}
		else {
			ctx.fillText("Réponse : " + ansyear, x / 2 - 400 - ctx.measureText("Réponse : " + ansyear).width / 2, 320 - hpoints / 2 + 50);
		}

		ctx.font = '18px Trebuchet MS';

		for (var i = 0; i < years.length; i++) {
			var curcol = 1 + Math.trunc(i / maxheight);
			var colx = 0;
			colx = 300 * curcol - 150 - 300 * (column / 2);
			var curi = i % maxheight;

			var usr = years[i].user;
			var yea = years[i].year;

			var wyea = ctx.measureText(usr + " - " + yea).width;

			ctx.fillStyle = getUserColor(usr);
			ctx.fillText(usr, x / 2 - 400 + colx - wyea / 2, 320 - hpoints / 2 + 90 + curi * 25);

			ctx.fillStyle = "white";
			var medal = " ";
			if (songfound) {
				if (yea == ansyear) {
					ctx.fillStyle = "green";
					medal = "🥇";
				}
				else if (Math.abs(yea - ansyear) == 1) {
					ctx.fillStyle = "yellow";
					medal = "🥈";
				}
				else if (Math.abs(yea - ansyear) == 2) {
					ctx.fillStyle = "orange";
					medal = "🥉";
				}
				else {
					ctx.fillStyle = "red";
				}
			}
			ctx.fillText(medal + yea, x / 2 - 400 + colx - wyea / 2 + ctx.measureText(usr).width, 320 - hpoints / 2 + 90 + curi * 25);

		}
		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";
		ctx.font = '20px Trebuchet MS';
	}
}

function displayGus() {
	if (visiblegus) {
		var maxheight = 6;
		var column = 1 + Math.trunc((gus.length - 1) / maxheight);

		var hpoints = 90 + gus.length * 25;
		if (gus.length > maxheight) {
			hpoints = 90 + maxheight * 25
		}

		ctx.clearRect(x / 2 - 800, 120 + 200, 780, 195);

		ctx.fillStyle = bg;
		ctx.strokeStyle = "pink";

		roundRect(ctx, x / 2 - 800, 120 + 200, 780, 195, 20, true);

		var ansmin = parseInt(songlist.find(x => x.listname === liste).songs[songindex].minutes);

		ctx.font = '30px Trebuchet MS';
		ctx.fillStyle = ctx.strokeStyle;
		if (!gusstop) {
			ctx.fillText("# Albums", x / 2 - 400 - ctx.measureText("# Albums").width / 2, 350);
		}
		else {
			if (ansmin == 1)
			{
				ctx.fillText("Réponse : " + ansmin + "  album", x / 2 - 400 - ctx.measureText("Réponse : " + ansmin + " album").width / 2, 350);
			}
			else
			{
				ctx.fillText("Réponse : " + ansmin + "  albums", x / 2 - 400 - ctx.measureText("Réponse : " + ansmin + " albums").width / 2, 350);
			}
		}

		ctx.font = '18px Trebuchet MS';

		for (var i = 0; i < gus.length; i++) {
			var curcol = 1 + Math.trunc(i / maxheight);
			var colx = 0;
			colx = 200 * curcol - 100 - 200 * (column / 2);
			var curi = i % maxheight;

			var usr = gus[i].user;
			var min = gus[i].minutes;

			var wmin = ctx.measureText(usr + " - " + min).width;

			ctx.fillStyle = getUserColor(usr);
			ctx.fillText(usr, x / 2 - 400 + colx - wmin / 2, 320 - hpoints / 2 + 180 + curi * 25);

			ctx.fillStyle = "white";
			var medal = " ";

			if (gusstop) {
				if (min == ansmin) {
					ctx.fillStyle = "green";
					medal = "🥇";
				}
				else if (Math.abs(min - ansmin) >= 1 && Math.abs(min - ansmin) <= 2) {
					ctx.fillStyle = "yellow";
					medal = "🥈";
				}
				else if (Math.abs(min - ansmin) > 2 && Math.abs(min - ansmin) <= 5) {
					ctx.fillStyle = "orange";
					medal = "🥉";
				}
				else {
					ctx.fillStyle = "red";
				}
			}
			ctx.fillText(medal + min, x / 2 - 400 + colx - wmin / 2 + ctx.measureText(usr).width, 320 - hpoints / 2 + 180 + curi * 25);
		}
		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";
		ctx.font = '20px Trebuchet MS';
	}
}

function giveYearPoints(year) {
	var bonus = 3;
	for (var i = 0; i < years.length; i++) {
		if (years[i].year == year) {
			addPoints(3 + bonus, years[i].user);
			if (bonus > 0) {
				ws.send("!say Bravo " + years[i].user + ", 3 points bonus pour toi !");
				bonus = 0;

				if (tokens.find(x => x.user === years[i].user) == undefined) {
					tokens.push({ 'user': years[i].user, 'token': 1 });
				}
				else {
					tokens.find(x => x.user === years[i].user).token++;
				}
			}
		}
		else if (Math.abs(years[i].year - year) == 1) {
			addPoints(2, years[i].user);
		}
		else if (Math.abs(years[i].year - year) == 2) {
			addPoints(1, years[i].user);
		}
	}
}

function giveGusPoints(minutes) {
	var bonus = 3;
	for (var i = 0; i < gus.length; i++) {
		if (gus[i].minutes == minutes) {
			addPoints(3 + bonus, gus[i].user);
			if (bonus > 0) {
				ws.send("!say Bravo " + gus[i].user + ", 3 points bonus pour toi !");
				bonus = 0;

				if (tokens.find(x => x.user === gus[i].user) == undefined) {
					tokens.push({ 'user': gus[i].user, 'token': 1 });
				}
				else {
					tokens.find(x => x.user === gus[i].user).token++;
				}
			}
		}
		else if (Math.abs(gus[i].minutes - minutes) >= 1 && Math.abs(gus[i].minutes - minutes) <= 2) {
			addPoints(2, gus[i].user);
		}
		else if (Math.abs(gus[i].minutes - minutes) > 2 && Math.abs(gus[i].minutes - minutes) <= 5) {
			addPoints(1, gus[i].user);
		}
	}
}

function drawCollab() {
	ctx.strokeStyle = "white";

	roundRect(ctx, x / 2 - 780, 135, 750, 750);

	for (var i = 0; i < 4; i++) {
		ctx.fillRect(x / 2 - 780, 135 + 150 + i * 150, 750, 4);
		ctx.fillRect(x / 2 - 780 + 150 + i * 150, 135, 4, 750);
	}
}

function fillCollab() {
	ctx.drawImage(collabpic, x / 2 - 780, 135, 750, 750);

	for (var i = 0; i < 25; i++) {
		var x0 = x / 2 - 780;
		var y0 = 135;

		if (tbfcollab[i].found == 'false') {
			var rank = tbfcollab[i].rank;
			ctx.drawImage(collabblank[rank], x0 + rank % 5 * 150, y0 + Math.trunc(rank / 5) * 150, 150, 150);
		}
	}
	drawCollab();
}

function drawMosaic() {
	ctx.strokeStyle = "white";
	ctx.fillStyle = "black";
	roundRect(ctx, x / 2 - 780, 135, 750, 750);
	for (var i = 0; i < 2; i++) {
		ctx.fillRect(x / 2 - 780, 135 + 248 + i * 250, 750, 4);
		ctx.fillRect(x / 2 - 780 + 248 + i * 250, 135, 4, 750);
	}
}

function preloadMosaic(length) {
	for (var i = 0; i < length; i++) {
		mosaicpics[i] = new Image();   // Crée un nouvel élément Image
		mosaicpics[i].src = "./images/" + liste + "/" + i + ".jpg"; // Définit le chemin vers sa source
	}

	blankpic = new Image();
	blankpic.src = "./mosaic/blank.jpg";

	for (var i = 0; i < 15; i++) {
		coverpic[i] = new Image();
		coverpic[i].src = "./mosaic/cover" + i + ".png";
	}

	for (var i = 0; i < 9; i++) {
		curmosaic[i].cover = coverpic.length - 1;
	}
}

function preloadHint() {
	for (var i = 0; i < 20; i++) {
		hintpic[i] = new Image();
		hintpic[i].src = "./hint/cover" + i + ".png";
	}
}

function preloadCollab() {
	collabpic.src = "./images/" + liste + "/0.jpg"; // Définit le chemin vers sa source

	for (var i = 0; i < 25; i++) {
		collabblank[i] = new Image();
		collabblank[i].src = "./collab/" + i + ".jpg";
	}
}

function preloadMulti() {
	stopsong = new Audio();
	stopsong.src = "./stop.mp3";

	for (var i = 0; i < songlist.find(x => x.listname === liste).songs.length; i++) {
		if (!multisongs[i]) multisongs[i] = [];
		for (j = 0; j < songlist.find(x => x.listname === liste).songs[i].songs.length; j++) {
			multisongs[i][j] = new Audio();
			multisongs[i][j].src = "./multi/" + i + "/" + j + ".mp3";
			multisongs[i][j].currentTime = 20;
		}
	}
}

function preloadDJ(length)
{

	//ffmpeg -i test.mp3 -f segment -segment_time 1 -c copy %01d.mp3
	//find . -name '*.mp3' -exec ffmpeg -y -i {} -af "afade=t=in:st=0:d=0.1" -hide_banner -loglevel panic {} \;

	for (var i = 0; i < length; i++) {
		if (!djviewers[i]) djviewers[i] = [];
		for (var j = 0; j < songlist.find(x => x.listname === liste).songs[i].samples; j++)
			{
				djviewers[i][j] = new Audio();
				djviewers[i][j].src = "./djviewers/"+liste+"/"+i+"/"+j+".mp3";
			}		
	}
}

// function preloadTrivial()
// {
// 	stopsong = new Audio();
// 	stopsong.src = "./stop.mp3";

// 	for (var i = 0; i < songlist.find(x => x.listname === liste).songs.length; i++) {
// 		if (!trivialsongs[i]) trivialsongs[i] = [];
// 		for (j = 0; j < songlist.find(x => x.listname === liste).songs[i].quiz.length; j++)
// 			{
// 				trivialsongs[i][j] = new Audio();
// 				trivialsongs[i][j].src = "./trivial/"+i+"/"+j+".mp3";
// 				trivialsongs[i][j].currentTime = 20;
// 			}		
// 	}
// }

function fillMosaic() {
	for (var i = 0; i < 9; i++) {
		var x0 = x / 2 - 780;
		var y0 = 135;

		if (curmosaic[i].index == -1) {
			ctx.drawImage(blankpic, x0 + i % 3 * 250, y0 + Math.trunc(i / 3) * 250, 250, 250);
		}
		else {
			ctx.drawImage(mosaicpics[curmosaic[i].index], x0 + i % 3 * 250, y0 + Math.trunc(i / 3) * 250, 250, 250);
			ctx.drawImage(coverpic[curmosaic[i].cover], x0 + i % 3 * 250, y0 + Math.trunc(i / 3) * 250, 250, 250);
		}


		if (curmosaic[i].cover < 2 || curmosaic[i].index == -1) {
			ctx.fillStyle = "green";
			ctx.font = '30px Trebuchet MS';

			var fontsize = 30;
			while (ctx.measureText(lastsongfound[i]).width > 240) {
				fontsize = fontsize - 2;
				ctx.font = fontsize.toString() + "px Trebuchet MS";
			}
			ctx.fillText(lastsongfound[i], x0 + i % 3 * 250 + 250 / 2 - ctx.measureText(lastsongfound[i]).width / 2, y0 + Math.trunc(i / 3) * 250 + 60);

			ctx.fillStyle = "white";
			ctx.font = '30px Trebuchet MS';
			ctx.fillText("GG", x0 + i % 3 * 250 + 250 / 2 - ctx.measureText("GG").width / 2, y0 + Math.trunc(i / 3) * 250 + 110);

			fontsize = 30;
			while (ctx.measureText(lastuserfound[i]).width > 240) {
				fontsize = fontsize - 2;
				ctx.font = fontsize.toString() + "px Trebuchet MS";
			}
			ctx.fillText(lastuserfound[i], x0 + i % 3 * 250 + 250 / 2 - ctx.measureText(lastuserfound[i]).width / 2, y0 + Math.trunc(i / 3) * 250 + 140);


			ctx.font = '30px Trebuchet MS';
			ctx.fillText("🔥", x0 + i % 3 * 250 + 250 / 2 - ctx.measureText("🔥").width / 2, y0 + Math.trunc(i / 3) * 250 + 180);
			ctx.font = '20px Trebuchet MS';
		}
		drawMosaic();
	}
}

function displayThemes() {
	if (visibletheme == true) {
		ctx.strokeStyle = "white";
		ctx.fillStyle = "black";

		var fullheight = songlist.length * 40 + 100;
		roundRect(ctx, x / 2 - 400, 120, 380, fullheight, 20, true);

		ctx.font = '40px Trebuchet MS';
		ctx.fillStyle = "white";
		ctx.fillText("Menu du Jour", x / 2 - 205 - ctx.measureText("Menu du Jour").width / 2, y / 2 - 270);
		ctx.font = '20px Trebuchet MS';
		for (var i = 0; i <= songlist.length - 1; i++) {

			var the = songlist[i].title;
			var done = songlist[i].done;

			if (done == true) {
				ctx.fillStyle = "grey";
				ctx.fillRect(x / 2 - 205 - ctx.measureText(the).width / 2 - 20, y / 2 - 220 + i * 40 - 8, ctx.measureText(the).width + 40, 3);
			}
			else {
				ctx.fillStyle = "white";
			}
			ctx.fillText(i + " - " + the, x / 2 - 205 - ctx.measureText(i + " - " + the).width / 2, y / 2 - 220 + i * 40);
		}
		ctx.fillStyle = "white";
	}
}

function displayBonus() {
	if (visiblebonus == true) {
		ctx.font = '30px Trebuchet MS';
		//ctx.fillStyle="white";

		ctx.strokeStyle = "white";
		ctx.fillStyle = "black";
		roundRect(ctx, x - 200 - ctx.measureText("Bonus : ").width - bonusword.length * 20 - 30, 120, ctx.measureText("Bonus : ").width + bonusword.length * 20 + 80, 90, 20, true);

		ctx.fillStyle = "white";
		ctx.fillText("Bonus : ", x - 200 - ctx.measureText("Bonus : ").width - bonusword.length * 20, 154);

		if (bonusfound == "false") {
			ctx.fillText("Lettres : ", x - 200 - ctx.measureText("Lettres : ").width - bonusword.length * 20, 190);
			for (var i = 2; i < bonusprop.length; i++) {
				if (bonusletters.some(item => item.letter === bonusprop[i].letter)) {
					ctx.fillStyle = "green";
				}
				else
				{
					ctx.fillStyle = "white";
				}
				if (bonusprop[i].user != 'fill') {
					ctx.fillText(bonusprop[i].letter, x - 180 - bonusword.length * 20 + (i - 2) * 20 - ctx.measureText(bonusprop[i].letter).width / 2, 190);
				}
			}
		}
		else {
			ctx.fillText("Winner : ", x - 200 - ctx.measureText("Winner : ").width - bonusword.length * 20, 190);
			ctx.fillStyle = getUserColor(bonusfound);
			ctx.fillText(bonusfound, x - 200 - bonusword.length * 20, 190);
			ctx.fillStyle = "white";
		}

		ctx.fillStyle = "white";
		for (var i = 0; i < bonusword.length; i++) {
			if (bonusprop.find(x => x.letter === bonusword.charAt(i)) != undefined) {
				if (bonusfound != "false") {
					ctx.fillStyle = "green";
				}
				ctx.fillText(bonusword.charAt(i), x - 180 - bonusword.length * 20 + i * 20 - ctx.measureText(bonusword.charAt(i)).width / 2, 154);
			}
			else if (bonusprop.find(x => x.letter === bonusword.charAt(i)) == undefined) {
				if (bonusfound != "false") {
					ctx.fillStyle = "green";
				}
				ctx.fillText("_", x - 180 - bonusword.length * 20 + i * 20 - ctx.measureText("_").width / 2, 154);
			}
		}

		if (tokens.length > 0 && bonusfound == "false") {
			ctx.font = '20px Trebuchet MS';
			var tileWidth = 0

			for (var i = 0; i < tokens.length; i++) {
				var tileWidth_ = ctx.measureText(tokens[i].user).width + tokens[i].token * ctx.measureText("📀").width;
				if (tileWidth <= tileWidth_) {
					tileWidth = tileWidth_;
				}
			}

			ctx.strokeStyle = "white";
			ctx.fillStyle = "black";

			roundRect(ctx, x - 200 - tileWidth - 20, 210, tileWidth + 70, tokens.length * 30 + 30, 20, true);

			ctx.fillStyle = "white";
			for (var i = 0; i < tokens.length; i++) {
				var dispToken = "❌";
				if (tokens[i].token > 0) {
					dispToken = "📀".repeat(tokens[i].token);
				}
				ctx.fillText(tokens[i].user + dispToken, x - 200 - tileWidth, 210 + 35 + i * 30);
			}
		}
	}
}

function displayVote() {
	if (visiblevote) {
		var hvotes = voteprop.length * 40 + 80;

		ctx.clearRect(x / 2 - 800, 120, 380, hvotes);

		ctx.fillStyle = bg;
		roundRect(ctx, x / 2 - 800, 120, 380, hvotes, 20, true);

		ctx.font = '40px Trebuchet MS';
		ctx.fillStyle = ctx.strokeStyle;

		ctx.fillText("Votes", x / 2 - 600 - ctx.measureText("Votes").width / 2, 120 + 50);
		ctx.font = '20px Trebuchet MS';

		for (var i = 0; i <= voteprop.length - 1; i++) {
			var prop = voteprop[i];
			var count = 0;
			for (var j = 0; j <= votes.length - 1; j++) {
				if (votes[j].vote == (i + 1)) { count++; }
			}
			ctx.fillStyle = "white";
			ctx.fillText((i + 1) + " : " + prop + " - " + count, x / 2 - 600 - ctx.measureText(i + " : " + prop + " - " + count).width / 2, 120 + 90 + i * 40);
		}

		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";
	}
}

function addChat(user, message, found, cur) {
	if (canvas.getContext) {

		if (chat.length == 25) {
			chat.shift();
		}

		chat.push({ 'user': user, 'message': message, 'found': found, 'cur': cur });
	}
}

function drawChat() {
	ctx.fillStyle = "black";
	ctx.strokeStyle = "white";

	roundRect(ctx, x / 2, 120, 800, 775, 20, true);

	var offset = 25 - chat.length;
	if (chat.length > 0) {
		for (var i = chat.length - 1; i >= 0; i--) {
			if (chat[i].found != "" && chat[i].cur == "no") {
				ctx.font = '20px Trebuchet MS';
				ctx.fillStyle = getUserColor(chat[i].user);
				ctx.fillText(chat[i].found + chat[i].user + chat[i].found + " : ", x / 2 + 20, 160 + i * 30 + offset * 30);
				ctx.fillStyle = "white";
				ctx.fillText(chat[i].message, x / 2 + 20 + ctx.measureText(chat[i].found + chat[i].user + chat[i].found + " : ").width, 160 + i * 30 + offset * 30);
			}
			else {
				ctx.font = '20px Trebuchet MS';
				ctx.fillStyle = getUserColor(chat[i].user);
				ctx.fillText(chat[i].user + " : ", x / 2 + 20, 160 + i * 30 + offset * 30);
				ctx.fillStyle = "white";
				ctx.fillText(chat[i].message, x / 2 + 20 + ctx.measureText(chat[i].user + " : ").width, 160 + i * 30 + offset * 30);
			}
		}

		ctx.clearRect(x / 2 + 803, 120, x - x / 2 - 800, 700);
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

function editDistance(s1, s2) {
	s1 = s1.toLowerCase().latinise();
	s2 = s2.toLowerCase().latinise();

	var costs = new Array();
	for (var i = 0; i <= s1.length; i++) {
		var lastValue = i;
		for (var j = 0; j <= s2.length; j++) {
			if (i == 0)
				costs[j] = j;
			else {
				if (j > 0) {
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

function intToRGB(i) {
	var c = (i & 0x00FFFFFF)
		.toString(16)
		.toUpperCase();

	return "00000".substring(0, 6 - c.length) + c;
}

function getUserColor(username) {
	var usr = members.find(x => x.user === username);
	var color = ctx.fillStyle = "#" + intToRGB(hashCode(username));
	if (usr != undefined) {
		color = ctx.fillStyle = usr.color;
	}
	return color;
}

function resetvisibles() {
	visiblepoints = false;
	visibletotalpoints = false;
	visibletheme = false;
	visiblevote = false;
	visiblewin = false;
	visiblecountries = false;
	visibleyear = false;
	visiblegus = false;
	//visiblebonus = false;
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
		radius = { tl: radius, tr: radius, br: radius, bl: radius };
	}
	else {
		var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
		for (var side in defaultRadius) {
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

setInterval(function () {
	if (countdown > 0) {
		if (countdown % 100 == 0) {
			ws.send("!say " + countdown / 100 + "...");
		}
		countdown--;
	}

	if (!loadedhint) {
		preloadHint();
		loadedhint = true;
	}

	if (countdown == 0 && ready == false) {
		ws.send("!say GO !");
		ready = true;
	}

	if (visiblewin && hint && ready) {
		if (countdownhint % 200 == 0) {
			countdownhint = 0;
			if (hintreveal < 19) {
				hintreveal++;
				redraw();
			}
		}
		countdownhint++;
	}

	if (gametype == "mosaic") {
		cdmosaic--;
		if (cdmosaic == 0) {
			cdmosaic = defaultcdmosaic;
			redraw();

			for (var i = 0; i < curmosaic.length; i++) {
				if (curmosaic[i].cover < 14) {
					curmosaic[i].cover++
				}
			}
		}
	}

	if (gametype == "multi" && songindex == -1) {
		var ok = true;
		for (var i = 0; i < songlist.find(x => x.listname === liste).songs.length; i++) {
			for (j = 0; j < songlist.find(x => x.listname === liste).songs[i].songs.length; j++) {
				if (multisongs[i][j].readyState != 4) {
					ok = false;
				}
			}
		}

		if (ok) {
			singletext = "Toutes les chansons ont été chargées !";
			redraw();
		}
		else {
			singletext = "Chargement des chansons en cours...";
			redraw();
		}
	}

	if (gametype == "djviewers" && songindex == -1) {

		var lgth = songlist.find(x => x.listname === liste).songs.length;
		var sample = songlist.find(x => x.listname === liste).songs[lgth - 1].samples;
		if (djviewers[lgth - 1][sample - 1].readyState == 4)
		{
			singletext = "Toutes les chansons ont été chargées !";
			redraw();
		}
		else {
			singletext = "Chargement des chansons en cours...";
			redraw();
		}			
	}	
}, 10);