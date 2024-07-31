//staring at my dream. a reflection on the water. a dream i forged. i give shape to my hope in this fountain.
//a forge of light. 

////SUNYA////

/*
I really need a serious index here..

INDEX

UPDATE, GLOBAL, HTML, ORB, INNER, RADIANCE
VOID, USER, STATES, FUNCTION, KEYS
INTERFACE, STREAM, COMMANDS, FILE, UPLOAD, EVENT
EDIT, IMG, AUDIO, CIRCLE, RECT, TXT, OSC
ACT, PHONE, ONLINE
____

*/



var all = {};//this will go soon. keeping it for phone things refference

//PEAK GLOBALS
//Sunya Globals
var kaoz = true;//false;//undefined; //where is zai? :(
var zai = 0.5;//false;//undefined;

//time update tracker
//var tut = undefined;

var actx = undefined; //audio context
const soundCue = [];

var Ename = 'Kaozzai'; 									// /name
var Eid = 0;										// /id
var Entry = undefined;									// /entry
var Ein	= undefined;									// /in
var Eout = undefined;									// /out
//boolean to manage input entry dounble Enter system
var nLine =false;
//Stance is the current "directory". '/' means we are on Entity main directory. 'orbnameorid' makes the memory the root directory
//var stancE = '~'; //the symbol for Entity stance
//in distinguishes from entry?yes we need Ein to process lines that are not commands
var Orbs = [];	//All entity orbs are stored in here.					// /orbs
var ALOrbs = []; //after loop Orbs commands
//const WM = [];	Other memories?
var Drag = [];
var staNce = ['~']; //all stances
var stancE = '~'; //The ent or memory orb that will respond to commands with no target

var eX = 0;//x entity screen center								// /eX
var eY = 0;//y entity screen center								// /eY
var Egspeed = 20;

//var anglE = 0;										// /angle
//var Ewspeed = 1;
//var Focus = undefined;

//var disMode = 'grid';	 //'wheel'							// /disMode
//local files
var LImg = []; //an array to hold all buffered images					// /files
var LAudio = []; //holds all local loaded audio
var VoidID = Date.now();//sunya initialization time					//
//....so maybe just make one const U and make all these the entity properties
//var dB = -1; //data beat								// /dB
////what layer... msp graphic layer..?
var laYer = 0;//?									// /layer
var dsignat = [ //data signature							// /dsignat
			//["r",230,"g",230,"b",230], //white
			["r",176,"g",215,"b",235], //celeste
			["r",91,"g",157,"b",237] //azure
			//["r",0,"g",4,"b",233], //blue
			//["r",97,"g",28,"b",188], //purple blue
			//["r",138,"g",12,"b",152], //purple
			//["r",0,"g",0,"b",0], //black
			//["r",255,"g",10,"b",6], //red
			//["r",255,"g",152,"b",1], //orange
			//["r",255,"g",221,"b",38], //yellow
			//["r",163,"g",238,"b",4], //green
			//["r",127,"g",224,"b",191] //calypso

	//['r',20,'g',230,'b',120,'a',1],
	//['r',230,'g',230,'b',200,'a',0.5]
] //customize entity data lines. its a beat container
var dfont = 'px Courier New';								// /font
var dfontSize = 18;

//ok lets define MSp. We have radius, memorycap ? size? limit? current?
var MSpX = 0;//memspace rad center							// /mspx
var MSpY = 0;										// /mspy
var MSpRad = 700;									// /msprad
/*
So i was thinking maybe instead of a random ass number why not take a measure of how much time is a heartbeat taking to finish
all work the entity and its orbs do in a single update. This time should give us an idea of how many orbs we can have doing stuff
at any moment .. yes we got it, its tut
*/
var MSpSize = undefined;//The number of max allocated space in radius 			// /Mcounter
const MSp = {
	B : 1,	layer:0, 								// /msB...
//so MSp field should simply use dsignat and radius should not be able to be modified from beats
	beats:dsignat,
	//[										// /msignat
	//	['r',20,'g',160,'b',7,'a',1],
	//	['r',230,'g',255,'b',230,'a',0.8]//,'radius',1]
	//],
	state:{
		r:230, g:230, b:230, a:0.8, x:MSpX, y:MSpY, radius:MSpRad, is:'circle',		// /domain?
		inside:'empty'
	}//a special circle state.	
}


//Entity shortcuts. backspace memory interface needs update.
var EkeyS = [										// /keys
/*
Ok we want a single orb to follow entity and monitor: current entity position , currently selected orb, current selected line
if text aspect active, current circle form position
*/

	//some temporal shorts for developing..
	//{name:"begin", key:"begin", com1:
//"@MAINS<>:@LOG1<>left200>>LOG1 #LOG1>>~/drag #~>>LOG1/script<>#loop>>LOG1/script/run>>MAINS/text"
//"@MAINS<>:@LOG1 #~>>LOG1/script #loop>>LOG1/script/run>>MAINS/text"
	{name:"logs", key:"logs", com1:"@RUN<>#once>>RUN/script/run"}, //# is inconsistent to be used after <>...
	//},
	{name:"ZZ", key:"ZZ", com1:"#~>>~/stance"},
//Roy keeps growing
	{name:"o1", key:"o1", com1:"@Roy<>left100>>Roy"},
	{name:"o2", key:"o2", com1:"@Carl<>right200>>Carl"},
	{name:"o3", key:"o3", com1:"@Jupiter<>up80>>Jupiter"},//<>#Jupiter>>Jupiter/text"},
	{name:"o4", key:"o4", com1:"@Vespa<>down90>>Vespa"},
	{name:"o5", key:"o5", com1:"@Never<>left300>>Never"},
	
	{name:"grow", key:"grow", com1:"#msgrow>>Roy/script<>#loop>>Roy/script/run"},//Roy/name>>~/stance"},
//Carl could keep track of line selected and stance and others. also we want Carl on Drag
	{name:"follow", key:"follow", com1:"#Carl>>~/drag<>#20>>Carl/gspeed"},
	//{name:"chain", key:"chain", com1:"#Carl>>~/drag<>#20>>Carl/gspeed"},
	//{name:"track", key:"track", com1:">>Carl/text<>#20>>Carl/gspeed"},
	//drag/add ... we dont want toalways putall drag orbs at once wealso wanto add
	{name:"focus", key:"focus", com1:"#~>>Carl/script<>#loop>>Carl/script/run"},
	{name:"army", key:"army", com1:"~/orbs>>Vespa/script<>#loop>>Vespa/script/run"},
	//........
	//{name:"track", key:"track", com1:"$/text/cn>>Jupiter/script<>#loop>>Jupiter/script/run"},

//so iw as thinkin Jupiter, maybe you dont want to do text and thats cool babe. xD . Jupiter you are not real btw 

	{name:"mm", key:"mm", com1:"+>>~/stance"},
	{name:"zz", key:"zz", com1:"->>~/stance"},

	{name:"bv", key:"bv", com1:"->>$/text/cn"},
	{name:"nm", key:"nm", com1:"+>>$/text/cn"},

//use Jupiter 
	//{name:"s1", key:"s1", com1:'Jupiter/text/1>>~/gspeed'},
	//{name:"s2", key:"s2", com1:'Jupiter/text/2>>~/gspeed'},

/*
so we can create a script that listen to the names of new orbs created and when a specific name matches it processes it in a specific
way . embed circle form to Jin when created, and call run on a script to process Jin
circleform>>Jin,#once>>JinProcess/script/run
OK we need a command to delete an orb.. am strugling with this one.. because it doesnt feel right to be able to woosh an orb like that
somehow.. 
*/
	{name:"rml", key:"rml", com1:'rmline>>$/text/current'},
	{name:"coml", key:"coml", com1:'$/text/current>>~/comline'},
	{name:"inl", key:"inl", com1:'$/text/current>>~/inline'}

//!!!!!!!! interesting. Having caps keys allow the possibility to lock the key on repeat when we let go shift. To remove from key_d
//we just have to use shift to call the key again and let go while still pressing shift. 
	//{name:"G", key:"G", com1:"msgrow"},
	//{name:"H", key:"H", com1:"msshrink"}

]


//we need a center cursor to appear when entity is idling or displacing on its memory space. Should always indicate the screen center
//This point Holds eX and eY always.
const Ecen = {
	B : 1,	layer:2, 								// /msB...
	beats:[										// /msignat
		['r',20,'g',160,'b',7,'a',0.3],
		['r',230,'g',255,'b',230,'a',0.9]
	],
	state:{
		r:230, g:230, b:230, a:0.8, x:eX, y:eY, radius:1, is:'circle',		
		inside:'filled',
		layer:2
	}
}


//PEAK elid2 update neccesary. What really IS elid2. Its the void eye lid? kinda. The lid of the entity. We might use this one
//later. Its useful to have a rect state just ready out there to do stuff. Just make an object on global for this. Its the rect
//on the whole screen data. Good for fading out, maybe we could manipulate it later to create some effects. Maybe it can be shrinked
//Maybe it can be tinted with another color ant semi transparent. Yes this is a useful element to have. Pretty much a user feature.
//
//so Elid could be an active element in user experience. instead of making it a special rect here, an orb rect could do this job.
//Its purpose is to prevent the overwhelming activity in the void from saturating the entity screen. ... ... and now am thinking,
//this could be a circle actually... and this circle area should also protect entity from the sea void unbearable noise.
//This circle should probably be the first orb users learn to control in order to work against the void... or maybe this is
//simply the work of MSp field.. To silence the void noise and clear up the void color surges in the screen.
const Elid = {
	B:1,	layer:2,
	beats:[
		//['r',1,'g',1,'b',1,'a',0.2,'w',window.innerWidth,'h',window.innerHeight]
	],
	state:{
		r:1, g:1, b:1, a:zai, x:eX-window.innerWidth/2, y:eY-window.innerHeight/2, is:'rect',
		w:window.innerWidth, h:window.innerHeight,
		inside:'filled',
		layer:2
	}//a special rect state.	
}


//kfeed need to be an object just like MSp
const Kfeed = {
	B : 0,	layer:2, font:"30px Courier New", align:'center',
	beats:[
		//['a',0.8]
	],
	state:{
		align:'center', font:"30px Courier New",
		r:230, g:230, b:230, a:0.8, 
		x:eX+window.innerWidth/2,
		y:eY+window.innerHeight/2,
		is:'txt', txt:'',
		layer:2 //not even using Kfeed layer tho

	}//a special txt state.	
}

//Aspects on an orb are very important.. am thinking what if we start with the most basic form, and we unlock manually. And once we
//unlock a seal, orb structure changes for ever and there is no turning back to a basic form again. This might add some interesting
//mechanics...
//The other possibility is to just create orbs for specific tasks. and offer the possibility to expand a layer which consumes memory?
//What if orbs just do one thing..... this is an alluring idea. Its consistent with the Big Picture lets say
//but maybe all aspects on one memory make it simpler for users.. Its just very logic to have a memory do all forms at once
//Its just better for organizing ideas, a memory is suposed to contain all bits of it.. Yes. Let memories have unity. A sense
//of singularity in its functionality and its purpuse. Memories in Sunya are tools for the soul to express itself.
//
/*
Build several procedures to embed the orb with form layers.
.. we need to think a bit more about orb creation now..  text, circle, tone, rect, image ... maybe we want to go in this order
Being text the most basic aspect.. or maybe we only want some aspects to require other aspects previously awakened...
also.. where to put the orb when created? and .. maybe we can extend the command to specify what aspects to have awaken initially?

so we could have orbs with only circle aspect poping into existance anywhere we want inside MSp. 

Circles and rects can listen and produce signals to affect other circles and rects even from other entities.
When 2 entities MSp fields share the same space, their memories aspects can interact.
Circles and rects can both scan and create signals. Audio is shared, and images can be seen only when both entities agree and have
the image buffer loaded. same as audio
Audio emanates from circles and rects aspects.

.ok  so everybeat a circle or rect is transparent , it takes more stamina to maintain it like this. displacements take much more stamina
when number is high. ...

Combat mechanic. Active healing or recovering . An entity can recover but this recovery can be interrumpted by another entity.
Leting an oponent entity recover is an act that says a lot about an entity s nature.
So stamina is a very apealing concept to me because it speaks about potential and a single, continuing movement. Hit points
are not consistent with living entities procedural nature..
SO commands could have a cost depending on their  effect.. but how could be simplify this idea so we avoid making all these calculations?
We could use the time we spend at everyheartbeat to form an idea of the computer limits. Its working already, ~/mspsize



*/
//whats up with defauls orbs huh? 
const OrbSoul = function(){
	var id = Date.now(); var idn = id.toFixed(0);
		//o.cursor='text'; 
		//o.drag=[]; //do we want drag or nah
		//o.gspeed=1;
	o = {
//meta 
		name:idn, //id name
		cursor:'text',
		drag:[],
		gspeed:1,
/*
//seals, all possible forms
		text:false, 		//TE	..not sure if text should be on by default
//body does seem redundant. 
		//body:false,		//BO
		script:false,		//SC
		circle:false,		//CI
		image:false,		//IM
		rectangle:false,	//RE
		line:false,		//LI
		audio:false,		//AU
		oscillator:false,	//OS
*/
	}
	return o
} //OrbSoul
//We can then name this returned soul like orb structure or add aspects to be awakened by SoulSeal

//Many aspects can be awakened at once. Still working on default values here.. maybe we can just toggle with those after.
//this is functional programming beibei. declarative style peak ohio rizz beybey
//
//..ok so maybe we could do seal>>orb/text  , unseal>>orb/circle
//What if we just do the linear progression thing. Any orb can have text and script aspect, but in order to have image aspects, we need
//to previously unseal rectangle aspect, and in order to have audio aspects, we need to have circle aspect...
//Because audio will rely on circle shape to excert its effect, and images can probably work with rectangles .. becaues we kinda need
//rectangles to edit image animations.... so its bassically 3 types of orbs? text and script, rect and image, circle and audio...
//now that am thinking about it... wouldnt it be nice to just have one orb perform one specific task..? writer orb, scene orb , 
//music orb. each type of orb has 2 aspects
//... ok maybe later but for now just unlock one aspect at a time
const SoulSeal = function(o,asp){
	//if(o.body){
//so am thinking... maybe o.x and o.y should not be always necessarily linked to its rect or circle for position... we certainly
//wont link it to image position... but should o.x and o.y even exist? maybe  not? We do need circle and rect and image to be
//independant, we can t use the same x and y on all forms, this is too limiting... but how about displacing? what is it that we displace
//when we say displace>>target  ? Should now we specify what aspect we want to displace? yes probly . yes do that. but how about speed..
//do we want a displace speed for each form? or do we want a better displace command.. probly yes . disleft10>>orb/circle
// disup30>>orb/rect..  or maybe left3>>orb/circle . lets distile displaces into left, right, up and down, and reserve strifeleft
//striferight , advance, recede, for focus. if no focus, then these commands dont do anything.
		//o.dismode='grid'; //'wheel' ... maybe we dont really need a dismode since focus movements will not be asociated to arrows
		//o.focus=undefined;
		///o.x=0; o.y=0;
		//o.cursor='text'; 
		//o.drag=[]; //do we want drag or nah
		//o.gspeed=1;
		//o.wspeed=1;
		//o.angle=0;
		//o.rad=0; //distance from target focus?
	//}

	switch(asp){

		case 'script':
			if(o.script==false){o.script=true; return}
			o.script=true;
			o.o=undefined;   //o for command out.. the current command running ?
			o.cast = false; //boolean for after loop cast
			o.scR='off'; o.scB=1; o.scC=[];
			break

		case 'text':
			if(o.text==false){o.text=true; return}
			o.text=true;
			o.txtX=eX; o.txtY=eY;
			o.spacer=15; //o.insertop='newline';
			//o.Elis=undefined; //true to listen to Ein . for now
			o.i=undefined; 
			o.txtB=1;
			//o.print='static'; 
			o.txtL=2;
			o.txtLi=[];
			break

		case 'rectangle':
			if(o.rectangle==false){o.rectangle=true; return}
			o.rectangle=true;
			o.rectF=dsignat; o.rectB=1; o.rectR='loop'; o.rectL=1;
			o.rectS={
				r:230, g:230, b:230, a:0.8, x:o.txtX, y:o.txtY, w:60, h:60, is:'rect',
				inside:'empty'
			};
			break

		case 'image':
			if(o.image==false){o.image=true; return}
			o.image=true;
			o.imgfile=undefined;
			o.imgF=[]; o.imgB=1; o.imgR='off'; o.imgL=0;
			o.imgS={
				img:undefined,  is:'img',
				x:0, y:0, w:0, h:0, px:0, py:0, pw:0, ph:0, a:1,
				layer:0
			};
			break

		case 'circle':
			if(o.circle==false){o.circle=true; return}
			o.circle=true;
			o.cirF=dsignat; o.cirB=1; o.cirR='loop'; o.cirL=1;
			o.cirS={
				r:230, g:230, b:230, a:0.8,
				//x:o.txtX, y:o.txtY,
				x:eX, y:eY,
				radius:13, is:'circle',
				inside:'empty'
			};
			break



/////////WEB AUDIO
//Holy shiet audio. ok
//Basic oscillator using audio web API the Audio context holds nodes. Nodes are connected to create various effects and
//filters. the source node has no input only output,the destination node has no output, only input. All nodes between these
//two act as filters and each can have multiple ins and outs
//!
//An audio object should hold all the instructions and buffers neccesary for a
//function to create the precise Audio Node audio objects can be located on orbs , void nodes and user data
//!
		case 'audio':
/*
//Get an AudioBufferSourceNode.
//This is the AudioNode to use when we want to play an AudioBuffer. createBufferSource
//we use this with local files loaded as well !!
//this snipet here should return a state, which holds a source node , and also can hold
//filter nodes, and compressor nodes as deem neccesary. definitly will need a gain node
//should return a state to run a buffer
all.buffer_s = function(custom_buffer, audio_ctx, name, a_a){
	var s = {}; 
	s.name = name;  s.is="audio"; s.s = "audio"; s.end='not';
	var src_node = all.au.createBufferSource();
	//set the buffer in the AudioBufferSourceNode
	src_node.buffer = custom_buffer;
	s.src_node = src_node;
	//use a_a to set intial params
	s.src_node.loopStart = a_a.start; s.src_node.loopEnd = a_a.end;
	s.fade = a_a.fade;
	//gain node
	var gain_n = audio_ctx.createGain(); //audio.gain_n
	s.gain_n = gain_n;
	s.gain_n.gain.value = a_a.gain;
	s.src_node.connect(s.gain_n);
	s.gain_n.connect(audio_ctx.destination);
	//connect the AudioBufferSourceNode to the destination so we can hear the sound
	//s.src_node.connect(audio_ctx.destination); //all.au.destination
	//s.src_node.start();

	return s
}
//to start the source playing
//s.src_node.start();
//use the boolean on loop property to set a loop. there is also loopStart and loopEnd to determine where the loop starts and ends
//s.src_node.loop = true;

//returns a compressor for audio context all.au?
//need a proper interface to experiment with
//All these audio nodes should take parameters from independetn audio objects so
//the same nodes can be created many times
//A state should hold a returned compressor so it affects the audio source that inhabits it
//s.compressor_node , s.src_node, and so on
//use an object to return a configured compressor. states will probly use it
all.c_audio_compressor = function(){
	var compressor = all.au.createDynamicsCompressor();
	compressor.threshold.setValueAtTime(-20, all.au.currentTime);
	compressor.knee.setValueAtTime(30, all.au.currentTime);
	compressor.ratio.setValueAtTime(5, all.au.currentTime);
	compressor.attack.setValueAtTime(.05, all.au.currentTime);
	compressor.release.setValueAtTime(.25, all.au.currentTime);
	return compressor
}

		if(s.is=="audio"){
			//s.t++; //...
//maybe state needs to know animation duration....maybe. probly. for acts access
			if(s.end=="end"){
			s.src_node.stop(); s.src_node.disconnect(); s.is="rm";
			//a tag for audio state to tell it to stop by fading out
			if(s.end=="fade"){
				s.gain_n.gain.setTargetAtTime(0, all.au.currentTime + 0.1, s.fade);
				s.end = "check";
			if(s.end=="check"){
				if(s.gain_n.gain.value<=0.00){
					s.src_node.stop(); s.src_node.disconnect(); s.is="rm";

							var a = {};
							a.name = mcp_a[1];
							a.audio_file_name= c_o.current_audio_file.name;
							a.gain=0.07; a.fade=0.3;
							a.start = 0; a.end = c_o.audio_access.duration;
							c_o.audio.push(a);





//this buffer should be located on an audio source node. create a source using all.au.createBufferSource
//use param1 now to randomize buffer channels
//.. let param1 be an instruction to return a type of buffer ?
//.. needs params to control buffer size. . .
//a function to return an empty audio buffer source. Users should be able to fill in buffer manually to create their own waves
//also, sunya can call these buffers to create white noise and other sound effects
all.c_custom_buffer = function(w_n){ 
	//the type of buffer will change acording to param..
	var a_buffer = all.au.createBuffer(2, all.au.sampleRate * 3, all.au.sampleRate);//these params control the size of the buffer

	if(w_n == "w_n"){
		//randomize channels to create white noise
		for (let channel = 0; channel < a_buffer.numberOfChannels; channel++) {
		  //This gives us the actual ArrayBuffer that contains the data
			const nowBuffering = a_buffer.getChannelData(channel);
			for (let i = 0; i < a_buffer.length; i++) {
  		 	 // Math.random() is in [0; 1.0]
  			 // audio needs to be in [-1.0; 1.0]
			nowBuffering[i] = Math.random() * 2 - 1;
			}
		}
	}
	return a_buffer
}

//a function to load an audio file from server into an orb.. it delivers an audio buffer
//Maybe orbs should be able to hold multiple audio files.....
//so to load audio from server static directory
all.url_audio = function(url){
	var audio_buffer = new Audio(url);
	//var media_src = all.au.createMediaElementSource(audio_buffer);
	return audio_buffer
}
	//
//return an audio file state. accepts a previously buffed media audio file as param
all.media_s = function(url_audio, destination){
	var s = {};
	var src_node = all.au.createMediaElementSource(url_audio);	
	s.src_node = src_node;
	s.src_node.connect(destination);
	return s
}
//now we can affect the audio using Web Audio API but we keep using url_audio.play(), url_audio.pause()
//currentTime = number , a property that allows us to instantly start playing from number
//duration  , A read-only double-precision floating-point value indicating the total duration of the media in seconds.
//ended , Returns a boolean that indicates whether the media element has finished playing
//loop ,  boolean that reflects the loop HTML attribute, which indicates whether the media element should start over when
//it reaches the end.
//preservesPitch , A boolean value that determines if the pitch of the sound will be preserved. If set to false, 
//the pitch will adjust to the speed of the audio
//volume , A double indicating the audio volume, from 0.0 (silent) to 1.0 (
//other methods from the audio element
//This media element source can be connected to other nodes to change audio wave
//before reaching audio context destination
//hence, the second param can accept any other audio node destination besides
//all.au.destination



*/
			if(o.audio==false){o.audio=true; return}
			o.audio=true;
			break

		case 'oscillator':
			if(o.oscillator==false){o.oscillator=true; return}
			o.oscillator=true;
			o.oscTL=[
	//lets have a tone for refference
				//['start',0,'duration',2,'freq',439,'gain',0.07,'fadein',0.3,'fadeout',0.3]
				'start,0,duration,2,freq,439,gain,0.07,fadein,0.3,fadeout,0.3'
				//[]
			];
			//o.oscB=1; 
			o.oscR='off'; 
			break

/* 
//PEAK okok so when we run an oscilator, it will go trough each line just like any other line, but we dont beatUp like others
//we use duration to determine how long we stay on the line. hearAll . a function to update audio elements activity
//By monitoring the duration, we control the flow of tones.
//We begin monitoring on a heartbeat but once its running, it detaches and just use duration to control the tones flow
//An osc tone line will create a audio nodes necesary to perform using the audio sinthax
//so what is an annalyzer? might be interesting
//var analyzer = actx.createAnalyser();
//osc.connect.analyzer

//so we need a function to create parameters to use from the tone line. sinthax. maybe a variation of beatUp. we push new properties
//and value using the data on the line to modify a state, then we monitor the state. All we really need to monitor on heartbeat
//is for when a global gain reaches 0. We then have to stop and disconnect the node. so its pretty much the old system.

//freq,456,gain,0.07,fade,0,3,duration,6

//returns a sounding oscilator
//this function uses parameters from the audio animation(oscilator editor), it just creates osc and gain node, puts them into
//the audio state and conects them, and returns a state ready to be pushed on anim_a. anim_a should check when to end the sound and
//will use proper methods so it doesnt literaly pop out of existance, but gradually decreases its gain until is self removed. 
//PEAK so the idea of having all tone parameters on a single state for each line still makes sense i guess

//Take a line and create a state with all nodes necesary. Monitor the state, when duration ends , we run function on next line
//We probably need a sound cue array.. so the system should actually just facilitate control of a timeline which can be modified
//in real time. . this is very interesting. 
//entities choose a moment in time to make events happen. how much time after the present as parameter func(howfarinmiliseconds)
//and then naturally TimeUp(howfar,duration) . WHen it starts and when it ends
//ok so we need a cue for audio activity. A state? to store and control node nets of audio. states check on heartbeat only for
//when its global gain reaches 0 if(s.gain_n.gain.value<=0.00) , s.src_node.stop(); s.src_node.disconnect(); s.is="rm";

//OSC
//use R to play the sound. numbers and T to asign a frequency. U sine,  I square, O sawtooth, P triangle
//Y volume +, G volume -, Q quits,  F and C to increase fade out. should also be able to increase/decrease fade in
//use H and B to go 1 hertz up or down on frequency
*/


		//incomplete...
		//line=[],
		//
	}
}//SoulSeal






//so create an oscilator with a line and push it into soundCue
//so a line need to be able to create and push an oscilator state into soundCue using a tone line on run
//
//create state
//var os = {
//	id:Date.now(), start:0, freq:420, gain:0.7, fadein:0.2, fadeout:0.3,type:0,duration:1
//}

//update state using tone line
const timeUp = function(osc,TL){ 
	for (var i = 0; i <= TL.length-2; i+=2) {
		var p = TL[i]; var v = TL[i+1]; var nv = v;
		if(v.length==undefined){}else{
			var dots = v.substr(0,2);
			if(dots=='..'){
				var cded = v.substr(2); var cdeda = cded.split("-");
				var min = parseFloat(cdeda[0]); var max = parseFloat(cdeda[1]);
				var n_rand = getRandom(min,max);
				nv = n_rand;
			}
		}
		osc[p] = nv;
	}
}

	
//ok so default values are given to the state if not specified on the tune line
//[start,0,duration,1,freq,439,gain,0.07,fadein,?,fadeout,0.3],
//var osc = COsc()
//var COsc = function(start,freq,gain,fadein,fadeout,type,duration){
//
//use updated os to create osc nodes
const COsc = function(os){
	if(os.type==0){os.type='sine';}if(os.type==1){os.type='square';} //.. and so on
	var osc = {}
	//oscillator node
	osc.start = actx.currentTime+os.start;
	osc.oscn = actx.createOscillator();
	osc.oscn.frequency.value=os.freq;
	osc.oscn.type=os.type;

	//gain node
	osc.oscg = actx.createGain();
	osc.oscg.gain.value = 0.001;

	//analyzer
	//analyzer=actx.createAnalyser();
	//analyzer.fftSize = 2 ** 13; //this is just the size of the thing
	
	//we can use gain node to determine duration of the tone
	osc.oscg.gain.setTargetAtTime(os.gain, osc.start, os.fadein);
	osc.oscg.gain.setTargetAtTime(0, osc.start + os.duration, os.fadeout);
	
	osc.oscn.connect(osc.oscg);

	//osc.oscg.connect(analyzer);

	osc.oscg.connect(actx.destination);
	osc.oscn.start(osc.start);

	osc.duration=os.duration;
	osc.end = osc.start+os.duration+os.fadeout+1;
	osc.oscn.stop(osc.end); //stop can also take a time to stop at time
//so what if we annalize right here the total duration of the state and make it self remove?

	return osc
}

//push osc
//soundCue.push(osc);


//if ended, remove
//we place all osc states on soundCue from where we can monitor non timming crucial data about the audio playing. its name, position
//conection with other orbs etc. its the sound aspect accesible. We check for soundCue on every heartbeat to when its necesary to
//remove the audio object from memory
const hearAll = function(s,l){
	var check = s.end-actx.currentTime;
	if(check<=0){
		s.oscn.stop(); s.oscn.disconnect(); soundCue.splice(l,1);
	}
}

//oscn.stop();
//oscn.disconnect();
//osc.oscg.gain.setTargetAtTime(0, actx.currentTime + 0.1, 0.3);//0.3 is fade , 0.1 is when we apply the fade so yes its a timer
//we can also set a value on time like this:
//osc.oscn.frequency.setValueAtTime(100,0) // 0 is how much to wait until the change occurs , 100 is the new value
//linearRampToValueAtTime(value, endTime)
//we can do some funky stuff by feeding oscilator nodes into other oscilator nodes
//.. am considering creating a system in tune with the tools given by the web api. i think its the right aproach
//ok so we create nodes and connect them..hmm
//ok an idea. a tune line goes like this. we got a set of minimal parameters and ranges to work with
//[freq,439,gain,0.07,fade,0.3,start,0,end,2]
//When run is 'once', we just read all lines at once and let the sound finish on its own. if run is 'loop' it means the sound will
//start over again on total duration end? We could just let loop set all end to no end 'repeat' is not used.
//So the line creates a state that we use to form all nodes necesary for it and we just read all lines at once. just create
//as many states as there are lines and check for them to when it all ends.
//


//let analyzer = null;

//PEAK
// Am thinking it may be helpful to allow instances to clear up context and create a new one once and then so it doesnt carry
// gigantic numbers to create timestamps. might be good for optimization
const audioser = function(){
	var actx = new
		(window.AudioContext || window.webkitAudioContext)();
	return actx
}


//so i think we probably need a f untion here to ...... ok we want to create lines with the output text, but with dsignat beats?
//we probably need a line constructor here a function to return a line structure. empty probably? with no beats please
//This is a data line. It can be customized to be displayed as free text
const DataLine = function(){
	var L ={
		txt:'',
		tB:1, //layer:2,
		//use Esignature to build default beats
//so Esignature should be a list of beats to be used on default beats
		beats:[
			//['a',1]
		],
		state : {
			is:'txt',
			txt:'',
			font:'18px Courier New', //do we need font here.. ?
			align:'left', //by default could be left
			x:0,//+window.innerWidth/2,
			y:0,//+window.innerHeight/2,
			r:230, g:230, b:230, a:1,
			layer:2
		}
	}
	return L
}//line structure

/*
const CircleForm = function(){
	cirS:{
		r:230, g:230, b:230, a:0.8, x:0, y:0, radius:27, is:'circle',
		inside:'empty'
	}
	return cirS
}
*/


//the idea now is that we could just create a state using
//the properties of the container and RSout beat and run it once independently from the beats of the container here.. This operation
//might be interesting to proyect mirrors of the body of the orb itself. These proyections dont need to have 'physical'  properties
//but might be useful to create complementary images to the animations in the form of visual feedback...
//ok if we do this, then we really dont care about the number after the line.... so we dont need to access beats directly like that
//we just care about the line text and layer... ok no we want a state to work on so we need to point at a beat and call mirror
//on it: orb/circle/3/mirror etc ... no i think its just orb/circle/mirror
//text is different. orb/text/current/mirror
//but we can create a fully custom state from here the mirror
//so for game mechanics this mirror concept is interesting because now orbs can create visual decoys.
//we can write a function to do mirror on last, current and by number
const Mirror = function(txtb,sm){//,layer){
	var nb = txtToB(txtb);
	var BL = nb.length;
	//if(BL==0){}else{
	for (var i = 0; i <= BL-2; i+=2) { //BL-2
		var p = nb[i]; var v = nb[i+1]; var nv = v;
		if(v.length==undefined){}else{
		//a random notation system.. i like this one
			var dots = v.substr(0,2);
			if(dots=='..'){
				var cded = v.substr(2); var cdeda = cded.split("-");
				var min = parseFloat(cdeda[0]); var max = parseFloat(cdeda[1]);
				var n_rand = getRandom(min,max);
				nv = n_rand;
			}
		}
		sm[p] = nv;
	}
	//}
/*
	if(layer==0){visual_q0.push(sm);} 
	if(layer==1){visual_q1.push(sm);}
	if(layer==2){visual_q2.push(sm);}
*/
	//o.o = nb;
	return sm
}//mirror



// -- DATA CONTROL . SUNYA FUNCTIONS


//
const KLTObj = function(kpair){
	var kobj = {};
	for (var i = 0; i <= kpair.length-2; i+=2) {
		var p = kpair[i]; var v = kpair[i+1];
		kobj[p] = v;
	}
	console.log(kobj);
	return kobj
}


//PEAK
//BEAT UP
//a function to update beats on any object that requires it. G is an object that has beats[], B and state{}
//remember we read beats from left to right now, just like normal ppl do.
//This function will run for form states and also for lines states? wait... lines can be beats?.. no beats are arrays..
//Lines have data, B, beats, and state . Data has txt, beats have arrays... we have to convert txt into beat array if we want
//to beat data. We also want to return lines of data formated as txt to work as beats when we ask for /orb/5/3 or /orb/4/beats
//const beatUp = function(G){
//We cant just say beats or state because orbs structure needs to have as few layers as posible. All form share the same depth
//
//OK we need to address the random thing.. what about txtToB
const beatUp = function(F,B,S){ //Frame, Beat, State
	//var Del = G.beats[G.B-1];
	var Del = F[B-1];
	var BL = Del.length;
	if(BL==0){}else{
		for (var i = 0; i <= BL-2; i+=2) { //BL-2
			var p = Del[i]; var v = Del[i+1]; var nv = v;
			if(v.length==undefined){}else{
			//a random notation system.. i like this one
//so if we request the current beat we need to ask after changes?
				var dots = v.substr(0,2);
				if(dots=='..'){
					var cded = v.substr(2); var cdeda = cded.split("-");
					var min = parseFloat(cdeda[0]); var max = parseFloat(cdeda[1]);
					var n_rand = getRandom(min,max);
//we want to construct this '..1-5-1' , the last number will now hold thecurrent value of the randomizer. this notation isrebuilt while
//we use the result to perform the operation. ok works perfectly
					var nn = '..'+cdeda[0]+'-'+cdeda[1]+'-'+n_rand; 
					Del[i+1] = nn;//
					nv = n_rand;
				}
			}
			S[p] = nv;
		}
	}
}//beatUp


//PEAK
//REPEAT
//repeat system
//if there are items in this array, we check for them. we check for the key, if there is no keyup signal, then run the asociated function
//when timestamp is a certain number bigger than first press. at an interval
//.. so this function is probly the best time to ask if there is a repeated command, if so we need to prevent execution and inmediately
//flush it
const repeatSys = function(){
	if(keyD.length!=0){
		var l = keyD.length;
		while(l--){
			var kd = keyD[l];
		//this solves it. works perfectly fine.. maybe we can expand some more but this already works.
			if(l==1){//its because there is 0..
				//so compare with 0
				kd0 = keyD[0];
				if(kd.ins==kd0.ins){
					keyD.splice(0,1);
				}
			}
			switch (kd.ins){

//run a script to readjust what arrows do by changing comA first parameter... so this script can simply change a parameter and we
//asociate this script into any key.
//lets keep stance. however we will not be using stance as we were using it. Now stance will simply go into the first argument
//of coma here, and this will affect Comand keys .. ehh
				//
//OK new idea. we want to be able to asign a number after displacement commands left23 to specify speed . if no number, then
//use orb or entity speed. done

				case 'left':
					///var cline='left'+Egspeed+'>>'+stancE
					var cline='left>>'+stancE;
					comA(undefined,cline);
					break
				case 'right':
					var cline='right>>'+stancE;
					comA(undefined,cline);
					break
				case 'up':
					var cline = 'up>>'+stancE;
					comA(undefined,cline);

					break
				case 'down':
					var cline = 'down>>'+stancE;
					comA(undefined, cline);
					break
//keyD.push({ins:'com', str:key_short.com1});
			//we can now fast repeat any command... but one a t a time... this is not bad but... arrows could be an exception
//because we want arows to be able to run together
				case 'com':
					//PEAK
					//Entry = {str:kd.str};
					Entry = kd.str;
					break

			}
//ok so maybe its pushing the arrow again when we release the second one... but why.. we could implement something to prevent the same
//command to be on repeat . we need to find the best moment to ask if the command we pushing on repeat already is on the repeat array
			//if(cline){console.log(cline);}
		}
	}
}//repeat keys sys

const toDegree = function(rad){var degree = rad*180/Math.PI; return Math.round(degree);}

const toRadian = function(degree){
	var pi = Math.PI; var rad = degree * (pi/180);
	var radian = parseFloat(rad.toFixed(2));
	return  radian
}

//get difference between 2 numbers
const Diff = (a, b) => {return (a > b) ? (a - b) : (b - a);}
/*
const diff = (a, b) => {
    if (a > b) {return a - b;} else {return b - a;}
}
const diff = (a, b) => {return Math.abs(a - b);}
*/

//a function to calculate theta in radians using 2 points... however we need to modify this. Because cuadrants
//if casterx > 0 >>> if castery > 0 , down right , if castery < 0 , up right
//if casterx < 0 >>> if castery > 0 , down left, if castery < 0 , up left
//if cuadrant right up, we just use getTheta
//if cuadrant left up,  PI/2 - theta, and we add PI/2
//if cuadrant is left down, PI/2 + theta and we add PI
//if cuadrant is right down, PI/2 - theta and we add PI/2*3
//ok.. this is fine
const getAngle = function(caX,caY,taX,taY){ //caster and target

	var a = Diff(caY,taY); var c = getDist(caX,taX,caY,taY); //var c = Math.round(cc);
	var sin = a/c; var thet = Math.asin(sin); var theta = parseFloat(thet.toFixed(2));
//now use theta and cuadrants to get the angle
	if(caX>=0){if(caY>=0){var cuad = 'downr';} if(caY<=0){var cuad = 'upr';}}
	if(caX<=0){if(caY>=0){var cuad = 'downl';} if(caY<=0){var cuad = 'upl';}}

	if(cuad=='upr'){return theta}
	if(cuad=='upl'){return (Math.PI/2-theta)+Math.PI/2}
	if(cuad=='downl'){return theta+Math.PI}
	if(cuad=='downr'){return (Math.PI/2-theta)+(Math.PI/2)*3}
	//return theta
}

/*
//lets learn trigonometry and math stuf with radu
//const tan=a/b;
//const cos=b/c;
//const sin=a/c;
//const theta=Math.asin(sin); //returns angle in radians..
//90 degrees is 1.57 radians, which is half PI , PI is 180 degrees  , 2 PI is 360 degrees. Math.PI*2
//fullcircle = Math.PI*2 . we can get equidistant points around a circle by dividing this value.

//SO focus needs to create some data to perform. When we focus a target, we will now calculate and hold the current angle
//from caster to target at every heartbeat and we will use this angle to change location with strife commands.
//to calculate the angle we can use Math.asin  , so we need sin. to calculate sin, we need 2 distances. a and c
//castery - targety = a  , use get dist for c . there is your sin. now get theta. getTheta()
//we need to consider cuadrants. This as is only works for right up cuadrant. We want to get the angle in radians, we dont simply want
//theta
	//
//once we get theta, we can now store this value on caster. caster.angle always uses the focused target as theta, 
//we now want to be able to relocate caster using this angle

*/

//strife. 
//ok we want to strife around a target which can be an orb or an entity
//ok so given a radius, an angle and a centerX and a centerY, we can calculate xy of a point in the circle rim
//var x = centerRadius * Math.cos(angleTheta)//+centerX;?
//var y = centerRadius * Math.sin(angleTheta)//+centerY;?
//but! we need to use the correct values. orb forms coordinates hold values in refference to MSp coordinates.. so we probly want
//to add these... and yeah now that i see it with fresh rested eyes, i realize this is not what i want now.
//we want the caster to start moving in a circular pattern around the target but from the current position.
//So we first need to calculate the current angle.. a straight line from current position to target center, this is the starting angle
//theta. Every time target or caster moves, we need to getTheta() as long as caster/focus holds the name of a memory or an entity
//We can then calculate the distance from caster and target and calculate the point by increasing or decreasing the angle
//
//We also want to go back and forth from a focused target. we could use polarity.
//... ihate when this happens. am just burned because this doesnt work and i dont know why. hate it
//okoko i see now. we are just . no. i dont understand what the single fuck is wrong here, am toasted. am losing my shit, its a fucking day
//i dont see where the fuck is the problem. i hate everything , this makes no fucking sense. its fucking insane. computers are shit
//trigonometry is ass. formulas dont work, this is random as shit, i dont see the error, am really fucking pissed , i just want to move on
//this fucking bug is fucking invisible, it makes no fucking sense. am really fucking pissed
//
//OK. am done with this shit. Its not even necesary.
//4 directions gang. WASD for the win. FUCK RADIANS AND ANGLES

/*	
//const strifE = function(caster,dir,aspect,speed,target){
const strifE = function(caster,dir,speed){
		var cas = Fting(Orbs,'name',caster);
		var tar = Fting(Orbs,'name',cas.focus);
		if(dir=='right'){
			var nang = cas.angle+speed;
			//cas.angle = cas.angle+speed;
			//
			cas.angle = nang;
			console.log(nang);
			var radius = getDist(cas.cirS.x,tar.cirS.x,cas.cirS.y,tar.cirS.y);
			console.log(radius);
			var nx = radius * Math.cos(cas.angle);//+tar.cirS.x;
			var ny = radius * Math.sin(cas.angle);//+tar.cirS.y;
			console.log(nx,ny);
		}
		if(dir=='left'){
			cas.angle = cas.angle-speed;
			var radius = getDist(cas.cirS.x,tar.cirS.x,cas.cirS.y,tar.cirS.y);
			var nx = radius * Math.cos(cas.angle);//+tar.cirS.x;
			var ny = radius * Math.sin(cas.angle);//+tar.cirS.y;

		}
		//var nnx = nx.toFixed(0); nnnx = parseFloat(nnx);
		//var nny = ny.toFixed(0); nnny = parseFloat(nny);
		//console.log(nnnx,nnny);
		//cas.cirS.x = nnnx;
		//cas.cirS.y = nnny;
		cas.cirS.x = nx;
		cas.cirS.y = ny;

		//const getAngle = function(caX,caY,taX,taY){ //caster and target
		//var ang = getAngle(cas.cirS.x,cas.cirS.y,tar.cirS.x,tar.cirS.y);
		//cas.angle = ang;

//////////////
// strifec>>~  strifE('~','right',undefined,undefined,Focus);
	if(caster=='~'){
		if(dir=='right'){
			//var n = anglE-0.1; var ns = n.toFixed(1); anglE = parseFloat(ns);
			//if(anglE<0){anglE=6.2;}
			var center = Fting(Orbs,'name',target);
			if(center){
				var angle = anglE;
				var ridex = center.cirS.radius * Math.cos(angle)+center.cirS.x;
				var ridey = center.cirS.radius * Math.sin(angle)+center.cirS.y;
				//.. damn.. what 0 we use now
				//ctx0.translate((-U.x),(-U.y));//this should put user on 0
				ctx0.translate((-MSpX),(-MSpY));//this should put user on 0
				//var rpx = Math.round(-ridex+(window.innerWidth/2)); var rpy = Math.round(-ridey+(window.innerHeight/2));
				var rpx = Math.round(-ridex); var rpy = Math.round(-ridey);
				ctx0.translate(rpx,rpy);
				//U.x=rpx; U.y=rpy;
				eX=rpx; eY=rpy;
				//pupil.x=-U.x+window.innerWidth/2; pupil.y=-U.y+window.innerHeight/2;
				Ecen.state.x=eX; Ecen.state.y=eY;
				Elid.state.x=eX-window.innerWidth/2; Elid.state.y=eY-window.innerHeight/2;
			}
			return
		}
		if(dir=='left'){
			var n = anglE+0.1; var ns = n.toFixed(1); anglE = parseFloat(ns);
			if(anglE>6.2){anglE=0;}
			return
		}

	}
///////////
//

}//strifE


*/

const displacE = function(S,dir,aspect,speed){
		
//so we want to be able to move only on memory space instead of husk now. always. We dont want to be able to displace freely
//while user is not inside its memory space. The void is too dense and chaotic to being able to freely move around.
//remember now we are using eY and eX as center of screen. We have considerate these as center when we displace. so if we want
//to place screen with this point in center, we need to translate to -eX+window.innerwidth/2, -eY+window.innerHeight/2
//ok so now want to drag, this function could ask also what the orb or entity is draging and just call displacer right away
//into all targets on drag list.. however not right here... or yes here maybe.. we ask for o.Drag... thing is
//maybe we want to send a drag signal, but process on ALOrbs along with other after loop requests. Because all signals need
//an instance for the target orb to process. In most cases signals will be picked up and processed, but maybe the target orb
//is out of reach, or its running permissions or a defense layer. drag, delete... signals should be any command with a target really
//Maybe we could prevent orbs from being modified by other entities , so when other entities send transfer data signals, orbs will
//not accept them. . Yeah this makes sense. All command are basically signals to other orbs, entities or self. 
//.. question. Does an orb from an entity command count as a signal from the entity or from the orb? .. because we clearly are going
//to implement other entities, so we need some kind of defense layer to prevent entities easily messing up another entity system
//But what about entity1 orb sending a signal to entity2 orb? maybe we need orbs to have an origin tag so we can run the defense
//protocol when orbs origin doesnt match.
//I cant think about an instance to where an entity would like to restrict its own control power on a memory in its own space.. so
//this defense system should only apply when other entities interact
	//
//OK so we want to anchor entities and orbs position in refference to other orbs and other entities as well. one thing. this probably
//should work for entities and orbs that share origin..
//We also want to be able to send signals tat drag memories from other entities and forcefully
//displace them, or damage them .. or modify their data? Here goes the defense protocol.. so how about... orbs casting a counter command
//in response when a signal arrives? 
	////displacE(o.name,'left',aspect,speed)
	if(S=='~'){
		//if(speed==undefined){var gspeed = Egspeed;}
		var ra = displacer(eX,eY,dir,speed); //returns [x,y]
		if(ra!=undefined){
			if(dir=='left'){eX=ra[0]; ctx0.translate(speed,0);} //only moving entity translates
			if(dir=='right'){eX=ra[0]; ctx0.translate(-speed,0);}
			if(dir=='up'){eY=ra[1]; ctx0.translate(0,speed);}
			if(dir=='down'){eY=ra[1]; ctx0.translate(0,-speed);}
//PEAK TRANSLATE FUNCTION
//a function to move all elements concerning user screen should be at hand. translate, move Ecen and Elid all at once
			//Ecen up
	//we should be able to modify x and y directly form the states on Ecen. Beats on Ecen should never mess with x and y, beats
	//here will only affect rgba
			Ecen.state.x=eX; Ecen.state.y=eY;
			//Elid up
	//we also need to move our screen lid
			Elid.state.x=eX-window.innerWidth/2; Elid.state.y=eY-window.innerHeight/2;
		}

	}else{	

		var o = Fting(Orbs,'name',S);
		if(o){
			//
			//this could be a function to accept a value in order to move by the specified value.
	//.. so we can recycle and also we can move a structure to a precise point in one command. Should only be useable on data lines
	//beats and data states beats. not even on entity... Because the thing is: We cant expect users to asign precise coordinates
	//into structures, its by far much more simpler to move a determined number of pixels on a direction i think.
	// 
			//if(speed==undefined){var gspeed = o.gspeed;}else{var gspeed=speed;}
//now we want to use aspect to determine what form we are requesting to move... maybe we can use a switch
//btw what aspect will be affected when user on stance uses arrows then?  if aspect is undefined, use o.cursor
			if(aspect==undefined){var aspect = o.cursor;}
			switch (aspect){
				case 'circle':
					if(o.circle){
						var ra = displacer(o.cirS.x,o.cirS.y,dir,speed); //returns [x,y]
						if(ra!=undefined){
							if(dir=='left'){o.cirS.x=ra[0];} 
							if(dir=='right'){o.cirS.x=ra[0];} 
							if(dir=='up'){o.cirS.y=ra[1];} 
							if(dir=='down'){o.cirS.y=ra[1];}
						}					
					} 
					break
				case 'rectangle':
					if(o.rectangle){
						var ra = displacer(o.rectS.x,o.rectS.y,dir,speed); //returns [x,y]
						if(ra!=undefined){
							if(dir=='left'){o.rectS.x=ra[0];} 
							if(dir=='right'){o.rectS.x=ra[0];} 
							if(dir=='up'){o.rectS.y=ra[1];} 
							if(dir=='down'){o.rectS.y=ra[1];}
						}					
					} 
					break
				case 'text':
					if(o.text){
						var ra = displacer(o.txtX,o.txtY,dir,speed); //returns [x,y]
						if(ra!=undefined){
							if(dir=='left'){o.txtX=ra[0];} 
							if(dir=='right'){o.txtX=ra[0];} 
							if(dir=='up'){o.txtY=ra[1];} 
							if(dir=='down'){o.txtY=ra[1];}
						}					
						dESpacer(o);
					}
					break
			//..osc whould probably be asociated to circle form...
				//case 'osc':
				//	break

			}

		}// orb stance

	} //orb else

}//displacE

//PEAK
// /disup  /disdown   /disleft  /disright .command keys to move a structure. orb or entity. Because these are our bodies.
//we can transfer /orb/x,/y values into any other data line or beat key . So we use displacements on orbs to create coordinates
//to be used directly on the beats. The points the orb returns already have a refference which is the center of msp.
//So beats keys involving points in the grid use the center of the orb as refference. if we asign x100 to an img data beat, it will place
//the image 100 pixels to the right of the orb when it beats. So when we edit images we can move all the beats of an animation at once
//using orb.x and y
// orb1/data/3>>orb1/disright
// orb/data/7>>~/disleft
//we can asign values to these keys to displace a determined number of pixels at once with one command.

//so maybe displacer is one function....
//so instead of directly changing x y point, we create a model to test it. var x = o.x-speed  , var y = o.y+speed... in the end
//its the same number of operations....
//We take a given x and y, a direction and a speed and we return an array with x and y if the operation is possible
//to be performed in the memory space. return undefined if not possible
//We can use dir and the result to determine how to translate in the case we want to displace the entity itself and not an orb.
const displacer = function(x, y, dir, speed){
	switch (dir){
		case 'left':
			var nx = x-speed; var ny = y; break
		case 'right':
			var nx = x+speed; var ny = y; break
		case 'up':
			var ny = y-speed; var nx = x; break
		case 'down':
			var ny = y+speed; var nx = x; break
	}	

//and limiter is another function that accepts any circle as limit and tests the location handed to it to return a boolean
//we can just pass an hipotetic x y point..
	var e_ms = getDist(nx, MSp.state.x , ny, MSp.state.y); var e_msp = e_ms.toFixed(0); var e_ms = parseFloat(e_msp);
	if(e_ms>MSp.state.radius){}else{ 
		x=nx; y=ny; 
		return [x,y]
		//return [nx,ny]
	}//mspace limits

	return		
}//displacer



//PRINT PEAK
//we need to substract this operation in order to be called everytime a txt memory modifies any of its lines. Maybe we dont need to clear
//all everytime... We actually dont need to clear all txt states because now all states are cleared up at every heart beat by design.
//..So we call y realignment(printo) when we add a data line, when we remove one and when we displace with it.
//It needs to be a very precise function. Call once and let beats maintain the words vibing.
//Even minor changes on beats wont require printo, we are only concerned with relocating all lines of the txt in order to display them
//as desired.
//Maybe we should simply use the orb x and y as base, txt center. Asigning a coordinate to every single line not only seems
//convoluted but also unnecesary. Lets just not , for now.
//Ok so beats wont mess around with x and y. We can safely just modify x and y from the states of the datalines themselves.
//and they should perdure because states live in the lines themselves, we are only pushing and removing refferences when we
//push to drawing arrays.
	//
//Just apply spacer on y coordinates on a data txt. takes orb as parameter.
//Relocate data lines from top to bottom using orb Y location as base.
//data Edit Spacer
//.... this function should also update datalines x using orb values o.x etc... so we can simply call this when we move the orb around
//What we rly want is to reorder the data lines position using orb location. nothing more.
const dESpacer = function(o){//a second parameter to select pprint mode. edit or stream
//ok lets just locate lines one bellow the other just like now for edit mode.
	var spacer = 0;
	//.. change data for text
	for (var i = 0; i <= o.txtLi.length-1; i++) {
		var dl = o.txtLi[i]; dl.state.y=o.txtY+spacer; dl.state.x=o.txtX;
		//if(dl.txt=''){}
	spacer = spacer+o.spacer;
	}
} //dESpacer

/*
//SO PEAK stream in is obsolete
//stream in
//but on stream in mode, we want to print the last limit lines only..limitL . We dont want to center the screen anymore on the new lines
//arriving, and we dont want to keep the lines in memory beyond limitL.. no we dont need all this.
//We can simply rewrite orbs texts or we can keep data. simple. working already
//deprecat
const dSSpacer = function(o){
	var spacer = 0; var i = 0; //i act as a counter now
	//.. change data for text
	var l = o.txtLi.length;
	var Y = o.y+(o.spacer*(o.limitL-1)); //havent tested this.....
	while(l--){
		var dl = o.txtLi[l]; dl.state.y=Y-spacer; dl.state.x=o.x; //! 
	spacer = spacer+o.spacer;
	i++;
	if(i>=o.limitL){break} //+1
	}
}//dSSpacer
*/


//So now drawAll function will just draw all using the small states and flush all draw arrays at the end...
//We could modularize this. A specific drawing operation for a specific 'is'. we can simply ask for 'is' value outside the scope
//of the draw function. This would add more versatibility... maybe not neccesary...
const drawAll = function(s){
	var c = ctx0;
	if(s.is=='img'){
		//var c = s.ctx;
		c.save();
		//c.translate(s.tx, s.ty);
		//rotate.. flip... goes here. state params should control these
		c.globalAlpha = s.a;
		
		c.drawImage(
			s.img, 
			s.x, s.y, s.w, s.h, 
			s.px, s.py, s.pw, s.ph
		);
		//c.drawImage(this,cropsX,cropsY,cropW,cropH,drawX,drawY,drawW,drawH);
		c.restore();
		//s.is = "c_img";//sends to animation check by default
		//continue
		return
	}
	
	if(s.is=='rect'){
		//var c = s.ctx;
		c.save();
		//c.translate(s.tx, s.ty);
		if(s.inside=="empty"){
			c.strokeStyle=`rgba(${s.r},${s.g},${s.b},${s.a})`;
			//all.d_empty_rect(s.ctx, s.x, s.y, s.w, s.h);
			c.strokeRect(s.x,s.y,s.w,s.h);
		}
		if(s.inside=="filled"){
			c.fillStyle=`rgba(${s.r},${s.g},${s.b},${s.a})`;
			//all.d_rect(s.ctx, s.x, s.y, s.w, s.h);
			c.fillRect(s.x,s.y,s.w,s.h);
		}
		c.restore();
		//s.is = "c_rect";
		//continue
		return
	}

/*
	ctx0.strokeStyle =`rgba(200,200,200,1)`;
	ctx0.arc(0,0,130,0,Math.PI*2,true);
	var pip = ctx0.isPointInPath(-120,0);
	console.log(pip);
*/
	
	if(s.is=='circle'){
		//var c = s.ctx;
		c.save();
		//c.translate(s.tx, s.ty);
		c.beginPath();
//also, we can do
//c.fillStyle="white"; c.strokeStyle="red"; and then we fill and stroke to get different colors inside and on stroke radius
//we can also change the c.lineWidth=some number .. so yeah this needs to go somewhere. Lines can do other things like dashing etc
		if(s.inside=="empty"){
			c.strokeStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
			c.arc(s.x,s.y,s.radius,0,Math.PI*2,true);
			c.stroke();
		}
		if(s.inside=="filled"){
			c.fillStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
			c.arc(s.x,s.y,s.radius,0,Math.PI*2,true);
//ok so we can actually just ask in here. but we use an array to ask for all requested points.?
//so if this state is a txt orb prim, it could simply ask to an array holding outputs
//we could just push all outputs into an array and flush it at the end of the heartbeat
			//if(s.mode=='scan'){
			//	var lso = all.c_out.length;
			//	while(lso--){
			//		let point = all.c_out[lso];
			//		let inArea = c.isPointInPath(point.x,point.y);
			//		if(inArea){s.data.push(point);}
			//	}
			//}
			c.fill();
		}
		c.restore();
		//s.is = "c_circle";
		//continue
		return
	}
	
	if(s.is=='txt'){
		//var c = s.ctx;
		c.save();
		c.fillStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
		c.font = s.font;
		//c.txtBaseLine='middle'; //we can do this as well to align vertically
		c.textAlign=s.align;
		//var c_x = (s.x+s.tx); 
		//var c_y = (s.y+s.ty); //not sure if ux and uy needs to be here....
		//c.strokeText can also do some funky stuff
		//c.fillText(s.txt,c_x,c_y);
		c.fillText(s.txt,s.x,s.y);
		c.restore();
		//s.is = "c_txt";
		//continue
		return
	}

/*
//we want lines now..
//lines can do
//c.beginPath();  , c.moveTo(x,y); ,  c.lineTo(x,y); ,   c.lineWidth=number; , c.strokeStyle= ...
//c.setLineDash([n1,n2,n3...]); , use c.setLineDash([]); to turn into normal line again
	//refference
	if(s.is=='txt'){
		//var c = s.ctx;
		c.save();
		c.fillStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
		c.font = s.font;
		//c.txtBaseLine='middle'; //we can do this as well
		c.textAlign=s.align;
		var c_x = (s.x+s.tx); 
		var c_y = (s.y+s.ty); //not sure if ux and uy needs to be here....
		//c.strokeText can also do some funky stuff
		c.fillText(s.txt,c_x,c_y);
		c.restore();
		s.is = "c_txt";
		//continue
		return
	}
*/

}//drawAll PEAK



//PEAK



//deprecat
//GLOBAL OLD
//const all = {};//will contain everything for now
//const unl = []; // unique names list.. kinda deprecated. not very smart system
var gameStart = Date.now();//sunya initialization time
var heartBeat = undefined;//becomes hold return for heartbeat interval

//orb escence. a different color on each beat
//.. i could run random range once, then substract 60 to create a second value, and add 60 to create third value, always between
//0 - 220 . this way it would be more efficient and the result would be more contrasting ?
//var o_r=220; var o_g=220; var o_b=220; 
//var a_v =0;


var Sstr = ' ';//contains symbols as a single string
var SstrL = ' ';//to compare on draw text system
var SstrT = 0;//timer for symbols to dissapear on their own
//Sstr_font ="30px Courier New"; //string symbols size and font
//Sstr_x=window.innerWidth/2;//+window.scrollX;
//Sstr_y=window.innerHeight/2;//+window.scrollY-100;//update this to center
var SstrRed=220;
var SstrGreen=220;
var SstrBlue=220;
var SstrAlpha=0.8;
//all.k_feed=undefined;//a state to print keys feedback
var waitCK=false; //key mem system flag
var waitCKforget = true;
//all.orb_track_l = undefined; //for prims wheel updates on new orb arrival

//to start a timer just set timer_base to Date.now()  ? we should be able to call
//many timers
//all.timer_base = 0;


var chatOn = false;//boolean for chat input activation
var chatIn = ''; //holds input before sending
//all.c_out =[]; //holds output data


//ARRAY containers

var keyD = [];//contains keys on repeat

var visual_q0 = [];//layer 0
var visual_q1 = [];//later 1
var visual_q2 = [];//layer 2


//TOUCH
//all.touches_a = []; //holds touches
var gesSeq = []; //gesture sequence ? am i using thiis
var btAlr = false; //for touch button system


///////////////////////////////////////////////////////////////////////////////HTML
//CANVAS
//ok new resolution:
//We are just going to create a rendering system using 1 canvas element. 
//an offscreen tag for states will act just like a ctx but it wont draw, it will only run and
//update the logics.
//Now just focus on making all editors use a single context. You just learned that having txt in a canvas apart hoping
//it would be less drawing process in the end didnt cut it because you still would like to see txt on screen being animated somehow.
//We will just clear all and print all in one context. //done
//

/*
off screen canvas?
you can transfer the image using imagebitmap but also you can clone it
Ok window scrolling is slow and dependant on canvas DOM relation.. we dont want that.. 
If we could use OffscreenCanvas to perform operations on a big not rendered canvas and just transfer images to the screen when
those images affect the coordinates that the window user is on.. then that would be more efficient
than using the scroll window element tingy right?
createImageBitmap
//
ImageBitmap.close() //good practice
//
var offscreen = new OffscreenCanvas(w,h);
var ctx = offscreen.getContext('2d');
//render stuff to ctx
var image = offscreen.transferToImageBitmap()
//
var snapshot = backgroundCanvas.transferToImageBitmap();
vat ctx = viewCanvas.getContext('bitmaprenderer');
ctx.transferFromImageBitmap(snapshot);
//
const offscreen = new OffscreenCanvas(256, 256);
const bmren = offscreen.getContext("bitmaprenderer"); //this is what we want 
//
var offscreen = new OffscreenCanvas(w,h);
var ctxOff = offscreen.getContext('2d'); //'bitmaprenderer'??
//ctxOff.drawImage .... etc
//
var offscreen = canvas.transferControlToOffscreen();
var context = offscreen.getContext('2d');
function animationloop(){
//draw with context

}
*/
//so i need a function to create and return an offscreen context to play with.
//so all states in void would compute in this offscreen ctx
//and we could simply proyect a section into another context which is the size of the user screen
//this is crashing the browser slightly.screen completely fade to black for a second. spooky
//a big canvas even if offscreen is still consuming massive resources so we need to think about structural design.
/*
all.blacksea = function(){
	var docc = document.createElement('canvas');
	docc.width = 10000; docc.height = 10000;
	var offscreen = docc.transferControlToOffscreen();
	var ctxOff = offscreen.getContext('2d');
	return ctxOff
}
//var ctxOff = all.blacksea();
*/

const Canvaser = function(id, zIndex){
	var j_b = document.createElement('canvas');
	var toma = document.getElementById('everything');
	toma.appendChild(j_b);
	j_b.id = id; //asigns id to element just created
	j_b.style.position="absolute";
	j_b.style.width=window.innerWidth+"px";
	//j_b.style.width="5000px";
	j_b.style.height=window.innerHeight+"px";
	//j_b.style.height="5000px";
	j_b.style.top ='0px';
	j_b.style.left ='0px';
	//j_b.style.border="1px solid rgb(255, 0, 0)";
	j_b.style.zIndex = zIndex;
	j_b.width = j_b.scrollWidth;//canvas drawing surface adapts to css size
	j_b.height = j_b.scrollHeight;//same as above
}

//a function to change all canvases width and heigth correctly.. well this looks expensive..
/*
//use these to get screen size
	//j_b.style.width=window.innerWidth+"px";
	//j_b.style.height=window.innerHeight+"px";
*/
//const Canresize = function(width,height){
//canvas0.style.width=width+"px"; canvas0.style.height=height+"px"; canvas0.width=width; canvas0.height=height;
//canvas1.style.width=width+"px"; canvas1.style.height=height+"px"; canvas1.width=width; canvas1.height=height;
//canvas2.style.width=width+"px"; canvas2.style.height=height+"px"; canvas2.width=width; canvas2.height=height;
//canvas3.style.width=width+"px"; canvas3.style.height=height+"px"; canvas3.width=width; canvas3.height=height;
//canvas4.style.width=width+"px"; canvas4.style.height=height+"px"; canvas4.width=width; canvas4.height=height;
//}

//currently working with 5 layers, a canvas is a layer.. but maybe we could
//do just fine with 3 layers!!!!
//.... or maybe we could just use one or 2.. if we implement offscreen canvas
//
//Its just one canvas we are good .
Canvaser('canvas0', 1);
//Canvaser('canvas1', 2);
//Canvaser('canvas2', 3);
//Canvaser('canvas3', 4);
//fifth layer for phone commands buttons.. anf keys feedback
//keyboard users probly dont need this one.. or maybe keys feedback could use this layer actually
//Canvaser('canvas4', 5);

//____________________________________________________________
//right now am thinking about not even putting everything on all var
//and just using GLOBAL VARIABLES . 
const ctx0 = document.getElementById("canvas0").getContext("2d");
//const ctx1 = document.getElementById("canvas1").getContext("2d");
//const ctx2 = document.getElementById("canvas2").getContext("2d");
//const ctx3 = document.getElementById("canvas3").getContext("2d");
//
//const ctx4 = document.getElementById("canvas4").getContext("2d");


//are these rly necesary?.. yes to access style
const canvas0 = document.getElementById("canvas0");
//const canvas1 = document.getElementById("canvas1");
//const canvas2 = document.getElementById("canvas2");
//const canvas3 = document.getElementById("canvas3");
//
//const canvas4 = document.getElementById("canvas4");


//create au audio context by default.. but not here
//all.au = new (AudioContext || webkitAudioContext)();

//access chat input.. should i just keep it global?
const chat_in = document.getElementById('chatext'); //entry
chat_in.spellcheck=false;
chat_in.style.outline="none";//no more outline. nice
chat_in.style.zIndex=6;
//chat_in.style.opacity=0.5;
//chat_in.style.color='black'; 
chat_in.style.fontSize="18px";
chat_in.style.position='fixed';//fixed is the bey. literally fixed my problem
//chat_in.style.left="200px";
chat_in.style.fontFamily='Courier New';
chat_in.style.backgroundColor='rgba(0,0,0,0.6)';
chat_in.style.color='rgba(230,235,240,1)';
chat_in.style.borderColor='rgba(230,230,230,0)';
chat_in.style.width=window.innerWidth+"px";
chat_in.style.display="none";
//chat_in.offsetWidth  offsetHeight  offsetTop  offsetLeft offsetParent

//input boxes to handle loaded files
//use fileInput.click(); to simulate a click on the input button
const img_in = document.getElementById('input_img');
const audio_in = document.getElementById('input_audio');



///////////////////////////////////////////////////////////////HTML


//INTERFACE,  COMMAND INPUT, KEYBOARD, EVENT, LISTENERS

//KEYS feedback interface
//prints keys from Sstr on screen
//.. ok so new system will simply hold symbols as they come. We will be able to asign commands just as we do now, but every
//symbol will be usable, we wont map into caps anymore. 
//Get enterless keys input, place it on k_feed txt, and print with beats to last for 20 heartbeats? and evaluate. If another
//key is pressed, just add it into k_feed text

//we need to modify keys feed now..instead of acting on kfeed, we need to modify Kfeed.state
const KeysFeed = function(){
	SstrT++;	//timer count should run before clearing and before logic updates
	if(waitCK==true){SstrT--;}//wait for command to save on key_s a lock
	if(SstrT > 20){ //time limit for command feedback 
		SstrT = 0;	//reinitialization
		//self cleans. we set the txt to undefined
		Sstr = ' '; SstrL = '';//cleaning string symbols here ..?
		return;
	}
	if(Sstr == SstrL){	
		//check if text is the same
		//if txt is the same then just push to print
		visual_q2.push(Kfeed.state);
	}else{
		SstrL = Sstr;	//keep track of text for check
		
		//PEAK
		Kfeed.state.x=eX; Kfeed.state.y=eY; 
		Kfeed.state.txt=SstrL;
		//Kfeed.state.r=SstrRed; Kfeed.state.g=SstrGreen; Kfeed.state.b=SstrBlue; Kfeed.state.a=SstrAlpha;
		//var KF = Kfeed.state;
		visual_q2.push(Kfeed.state);
		
	}

}//keys feed


//EVENT funcs KEY
const kdown = function(ev){
	//event.preventDefault();
	//console.log(ev.shiftKey);
	//ev.shiftKey
	//ev.ctrlKey
	//var e = ev.which; 
	//console.log(e + " " + String.fromCharCode(e)); //allow this to see what key code you press on console

//so repeat is bad. we need to build a custom repeat here
//It needs to work in conjunction with key up. . We are going to send the key instruction into an array to be checked and called
//over again and again with a fied interval by us, and will only be removed from the repeat array when key up is fired.
	if(ev.repeat){
		//maybe we could use repeat to execute the command asociated again if its possible
		//maybe we can use timeStamp here
		return
	}//prevents repeating.. but we want repeat on certain instances. scrolling stream for example
	
	//we can use key.. timeStamp is also useful
	//console.log(ev.key+'_____'+ev.timeStamp);

//SPACEBAR
//a system to attach commands into keys.. 
//if length is zero, then its space
	if (ev.key == ' ' && ev.target == document.body) { //spacebar
		ev.preventDefault();//prevents space to scroll document.. idfk how but it works
		if(Sstr==' '){
			//here goes ting to clean key memory
			waitCKforget = true;
			//console.log("Enter key to break command line asociated");
		}else{
			//wait com key lock
			waitCK = true; 
			Kfeed.state.g=30; Kfeed.state.r=20;
			//console.log(Sstr + " key ready to be linked");

		}
		return

	}//spacebar


//KEY COMBINATIONS
//if key length is 1 , then just evaluate
//as part of a key combination to create shorts for commands. 
//what kind of memory is kfeed?
//kfeedback needs to always be responsive and linked with the command notation system. Maybe is should only be visible by keyboard
//Users.. we dont need this on phone users, and we shouldnt expect the symbols be treated as memories because that would imply
//phone users have no way to interact with kfeeds from other entities.
//So kfeed really is a user feedback to manage commands shortcuts, no need to worry about kfeed form or anything. kfeed
//is not a txt memory either
	if(ev.key.length==1&&chatOn == false){
		//key combination to k_feed
		Sstr=SstrL+ev.key; SstrT = 0;//by default , at every key stroke, timer should be reset
		//console.log(ev.key+'_____'+ev.timeStamp);
		//console.log(SstrL);

	//ask for asigned key short
//while on void , ask for user keyshorts
		var ksa = EkeyS;//U.void_ks;//
		var i = ksa.length;
		//checks for key
		while(i--){
			if(ksa[i].key==Sstr){
				var key_short = ksa[i];
				//console.log(key_short);
				break
			}
		}

		if(key_short){
			//splice key short if waitCKforget is true
			if(waitCKforget){
		//splice from user if we are on void, splice from orb if we are in orb stance.. its the same ksa
				var key_index = ksa.indexOf(key_short); ksa.splice(key_index, 1);
				//all.stream_a.push("Key liberated."); all.screen_log();
				waitCKforget = false;
				var dont_send_com = true;
			}
			if(dont_send_com){}else{
			//send command asocited with key
			//all.com_a = {str:key_short.com1}//is_a:"c",}
//so nowinstead of directly sending the command, we send a request to key_d so it keep sending the command as long as button is pressed
			//keyD.push({k:ev.key, ins:'left'});
				if(keyD.length>1){}else{
					//here, k is the problem. we need to specify that only 1 letter k should be able to be repeated
					//!!!!!!!!!!!!!!!!! solved. nice. good for now
					if(key_short.key.length>1){//multi letter keys
						Entry=key_short.com1;
					}else{//single letter keys
						keyD.push({k:ev.key , ins:'com', str:key_short.com1});
					}
				}
			SstrT = 20; Sstr =' '; SstrL =''; /// this fixed the thing?
			}
		}
	return

	}//feed keys



//OTHER SPECIAL KEYS
//all keys that have more than one symbol are special keys like tab, shift enter etc, so these keys will do different things
//depending on user stance, but these wont be part of key combinations. maybe we can use shift to type
//symbols in caps but Shift wont become part of the key combination short to call custom commands
//!!!!! we want to make these special keys able to call commands. entities should be able to asign a command line to these special
//keys literally
	if(ev.key.length>1){
		//console.log(ev.key+'special key'+ev.timeStamp);
		if (ev.key == 'Backspace' && chatOn == false){ //backspace
			Sstr = ' '; SstrL = ''; waitCK = false;
			Kfeed.state.g=220; Kfeed.state.r=220; Kfeed.state.b=220;
			waitCKforget = false; //clear forget key lock also
		}//backspace

//ENTER, CHAT TXT MEMORY CREATOR
//input system to chat ,send strings to server and enter commands if enter, check if chatOn is true or false, if true,
//then send data and chat_on to false, or just set chat_on to false if there is no data to send
//if enter, and chat_on is false, then activate system and set chatOn to true
//when system is activated, allow only e 13 , and focus on chat_in
//once value is ready, enter sends value to chatIn so proper filter and
//respective emitter send the data to wherever neccesary and set chat_on false
//and allow other symbols of command interface
//!!!!!!!!!!!!!!!
//SO if its a command, we say all.command = chat_in.value;  , if its not, we say chatIn = chat_in.value..... simple. 
		if (ev.key == 'Enter'){ //press enter to focus on input html tag
			//event.Default();

			if(nLine){
//So we are just producing a string on Ein here now. Let orbs handle what to do with it on orbs updates.!!!!
//We CAN input numbers on Ein and they will be parsed here for now..
				if(chat_in.value==''){
					Ein=undefined;
				}else{
					Ein=chat_in.value; 
					//We wanto turn number strings into numbers
//isNaN(number string) will only return false when we have a number string..
					let isn = isNaN(chat_in.value);
					if(isn){
						Ein=chat_in.value;
					}else{
						Ein=parseFloat(chat_in.value);
						chat_in.value = Ein;
						
					}
//what if we just run a command. '~/inline>>'+stancE+/in . So now we just check for o.i . Looks much cleaner
					var inp = '~/inline>>'+stancE+'/in';
					comA(undefined,inp);
//ok so we need o.i to hold input messages now. Yeah we should be able to access this. Like, other orbs listenning to the input
//changes on other orbs. thats interesting
					//console.log(Ein);
				}

				chat_in.value = ""; chatOn = false;
				chat_in.blur(); chat_in.style.display="none";

				nLine=false;
				return

			}//nLine

			if(chatOn == true){
//PEAK	
//let normal enter become a command prompt
//to create an new input, press enter again. phones can simply use a button to enter commands prompt and another button to enter
//a new input line... maybe we could to the same for keyboards. just call comprompt on Enter, and call inputprompt with a command
//comprompt , inprompt
				///PEAK
				//user presed enter while no value on input, so we call inprompt
				if(chat_in.value==''){
					Ein=undefined;
					Elid.beats=[];
					Elid.state.r=1;Elid.state.g=1;Elid.state.b=1;Elid.state.a=zai;
					nLine=true;
					return
				}
				//if input holds a value, we ask for waitCK key memory system
//ok key mem sytem working again, but it needs some feedback..
				if(waitCK==true){
					var lm = EkeyS.length;
					while(lm--){
						//check if key already asigned to the command on input box
						var ksalr = EkeyS[lm];
						if(ksalr.com1==chat_in.value){
							ksalr.key=Sstr;
							var kready = true;
							break
						}
					}
					if(kready){}else{EkeyS.push({name:Sstr, key:Sstr, com1:chat_in.value});}
					waitCK = false;
	//PEAK UNIMPLEMENTED!!!!!!!!!!!!!
					var KF = Kfeed.state;
	//KF.x=eX; KF.y=eY; KF.txt=SstrL;
	//KF.r=Sstr.r; KF.g=Sstr.g; KF.b=Sstr.b; KF.a=Sstr.a;
					KF.g=220; KF.r=220; KF.b=220;
					visual_q2.push(KF);
				}


				//if no waitCK, Entry will now hold the command and it will be processed by comA
				Entry=chat_in.value;
				//
				Elid.beats=[];
				Elid.state.r=1;Elid.state.g=1;Elid.state.b=1;Elid.state.a=zai;

				chat_in.value = "";
				chatOn = false;
				chat_in.blur();
				chat_in.style.display="none";
				
			}else{//if chat_on is false, then activate
	//this line calls the input. i should probly use a diferent variable  and i need input box to be bigger.
				//.. we also need some kind of feedback to let know user compromt is listening and not inprompt
				//Elid.state.r='..1-200';Elid.state.g='..1-4';Elid.state.b='..1-4';
				Elid.beats=[
					['r','..1-30','g','..1-30','b','..1-35'],
					['r',1,'g',1,'b',1,'a',0.2]
				];
				//Elid.state.a=0.3;
				chat_in.style.display="inLine"; chatOn = true; chat_in.focus();

			}//chat on
	//chat_in.focus(); bring focus to html input. chat_in.blur(); remove focus
	//chat_in.value; return text value 
	//chat_in = document.getElementById('chatext');
	///

		}//Enter

//TAB
//PEAK
//ok so All these special keys could simply map to scripts created by the user really...
//OKSO fo now lets just embed
//+>>~/stance
//And shift Tab to
//+>>~/stance
		if (ev.key == 'Tab'){//&& ev.target == document.body){
			ev.preventDefault(); //this is not preventing Tab defualt behavior

			//just ask in a specific box what to run and make an orb key to be written
			//Tab should simply make the orb run the script once.

		}

//ESC
		if(ev.key == 'Escape' && chatOn == false){
			ev.preventDefault();
			//same as tab
			waitCK = false; waitCKforget = false;
			var KF = Kfeed.state;
			KF.g=220; KF.r=220; KF.b=220;
		}//esc

//while chat is on, Esc takes us out and doesnt print anything. Fast out
		if(ev.key == 'Escape' && chatOn == true){
			chat_in.value = ""; chatOn=false; chat_in.blur(); chat_in.style.display="none";
			Elid.beats=[];
			Elid.state.r=1;Elid.state.g=1;Elid.state.b=1;Elid.state.a=zai;
			nLine=false; //PEAK
			//waitCK = false; waitCKforget = false;
			//KF.g=220; KF.r=220; KF.b=220;
		}//esc on input box

//ARROW 
//OKSO lets push a displace instruction into an array. and call that instruction repeatedly as long as 'Key' up is not being fired.
//repeatSys . Works like a charm
//!!!!!!!!!!!!111PEAK
//let arrows and all special keys to call specific commands. .. just asign a command line to these keys
		if(ev.key == 'ArrowLeft' & chatOn == false){
			if(["ArrowLeft"].indexOf(ev.code) > -1) {ev.preventDefault();}
//ok so just call displace function and pass on direction. we can access stance from anywhere since its a global, so we dont pass stance.
			if(keyD.length<2){
				keyD.push({k:ev.key, ins:'left'});
				//console.log(keyD);
			}
		}//left arrow

		if(ev.key == 'ArrowRight' & chatOn == false){
			if(["ArrowRight"].indexOf(ev.code) > -1) {ev.preventDefault();}
			if(keyD.length<2){
				keyD.push({k:ev.key, ins:'right'});
			}
		}//right arow

		if(ev.key == 'ArrowUp' & chatOn == false){
			if(["ArrowUp"].indexOf(ev.code) > -1) {ev.preventDefault();}
			if(keyD.length<2){
				keyD.push({k:ev.key, ins:'up'});
			}
		}//up arow

		if(ev.key == 'ArrowDown' & chatOn == false){
			//if(["ArrowDown"].indexOf(ev.code) > -1) {ev.preventDefault();}
			//ev.preventDefault();
			if(keyD.length<2){
				keyD.push({k:ev.key, ins:'down'});
			}
		}//down arow

//SHIFT?


	}//other keys


}//kdown
//window.addEventListener('keydown', kdown);

//This is good. almost.. but what if we simply clear the array when any command is released. just a hunch. nah, didnt work as expected.
//ok so we could complicate this a bit, but i think it might be interesting to try something a bit complex. lets hope is not
//too expensive to perform this operation everytime we release a 1 key command like this
const kup = function(ev){
	var l = keyD.length;
	while(l--){
		var kd = keyD[l];
		if(kd.k==ev.key){
			keyD.splice(l,1); //this gives the speed up glitch
			//keyD.length=0; return //this gives even more glitches lol
//ok since we are looping here already we are going to take the command key value and store it on another array. we do this with all commands.
//..
		}
	}
//.. so after the main loop, we just ask which key was repeated... wait there wont be more tha 2 or 3 keys at the same time, we can just
//compare each one and yoiny the repeated one. Am just trying to make this as efficient as possible..

}//kup
//window.addEventListener('keyup', kup);



//COMMANDS
//a function to check for commands to execute on next loop. uses all.com_a. All commands should be here. this is for our brain convenience.
//so modes could simply have default keys memorized. and keys should always run commands... yeah this is how it should be.
//so buttons for touches call commands
/*
NEW STRUCTURE . NEW PERSPECTIVE
*This function should do one thing, to disect a command line and process it.

Each and every one of these commands can be called directly from the prompt, can be stored in a key, or can be written into
a memory orb so the orb can play these commands altogether on demand as well. The sinthax is the same.
We should be able to call many commands at once now
Memories, Entities.. they have containers with specific names. Sunya recalls specific directories to run functions using data
in those directories
Patterns

*/
//PEAK COMMANDS
//.. i think we l need to bring back the command cue for when more than one command is called in the same hearbeat? we simply
//execute them both but we considerate it into the result.
//Now we need to annalize using '/' as separators. Lets use split to chop the line. '>>' . '{}'... can we use 2 symbols as separators? YES

//confusing. We want commands to be crystal clear. Calling one line on one orb should to the same thing in another orb
//Having to worry about the stance sounds like an unnecesary limitation.
//!!! PEAK
//OK so now annalizer will have lots less problems because the structure of possible commands is much more consistent


//NEW STRUCTURE. DEFINITELY FINAL FORM
//return true on success, undefined if no match nor success
const getCom = function(C){
	if(C[0]=='@'){
// @orbname
		var oname = C.substr(1);
		//look if the name already has been asigned to an orb. what if it has
		let l1 = staNce.length;
		while(l1--){if(oname==staNce[l1]){return} }
		var o = OrbSoul();
	//for now we are having body aspect by default and text by default.. and others lol
		//o.body=true; o.text=true; o.script=true; //o.circle=true;
		//o.rectangle=true; o.image=true; o.oscillator=true;//for now
		//line
		//audio
		//...

		SoulSeal(o,'text'); SoulSeal(o,'script');
		//this for now.. but we need to decide orbs first location by default..
		o.txtX=eX; o.txtY=eY; //!!!!!!!
		if(oname!=''){o.name=oname;} Orbs.push(o); staNce.push(o.name);
		Eout = '@'+o.name;
		return true
	}// @

	if(C=='msgrow'){
//msgrow
		MSpRad++; MSp.state.radius++;
		//var last = MSp.beats.length-1;
		//MSp.beats[last].pop(); MSp.beats[last].pop(); MSp.beats[last].push('radius',msRad); 
		Eout = 'msgrow';
		return true
	}
	if(C=='msshrink'){
//msshrink
		MSpRad--; MSp.state.radius--;
		//var last = MSp.beats.length-1;
		//MSp.beats[last].pop(); MSp.beats[last].pop(); MSp.beats[last].push('radius',msRad); 
		Eout = 'msshrink';
		return true
	}
	if(C=='loadimage'){
//loadimg . create a buffer for an image file on local machine 
		Eout='loadimage';
		img_in.click();
		return true
	}
	if(C=='loadaudio'){
//loadaudio . local audio file buffer into the browser
		Eout='loadaudio';
		audio_in.click();
		return true
	}
	return
}//getCom

//we should be able to say delete>>orb/text/1 and leave this on an orb as an instruction. so comRiTarget only couls evaluate
//RS text like this... but its a problem because some signals use orb/key as target.. left>>orb/text .. left>>orb/text/1
//so maybe we can throw an exception here, since all we really want is to use specific lines as targets, so its always 2 '/' on
//right side. Other signals use max 1 '/' on right side.. but this is kinda inconsistent
//however we do want to be able to create a list of names and use them to create orbs.
//WE cCOULD by default evaluate RS from comRiTarget as RSout instead of orb/key format.. this would keep consistency and allow
//for more versatile signal script writing.... !!!!!!
//return undefined on success, return 'end' otherwise
const comRiTarget = function(signal,target,St){
// command>>target
//annalize target on right side
	var speed = undefined; //let aspect, speed
	if(target[0]=='~'){var ent = true;}
//so we may or may not have a '/' here. if no aspect is specified, we roll with default values 
	var CCS = target.split('/');  //
	var o = undefined;
	if(target[0]=='$'){var o = Fting(Orbs,'name',St);}//else{var o = Fting(Orbs,'name',CCS[0]);} 
	if(target[0]=='%'){var o = Fting(Orbs,'name',stancE)}
	if(o==undefined){var o = Fting(Orbs,'name',CCS[0]);}
	var aspect = CCS[1]; //aspect is simply undefined if there isnt
	var line = CCS[2];
//.. yeah ok now i see it. command signals will ask for these pieces of data. displacements may only use aspect and not line,
//delete signal will ask for line, if no line, then it will only be concerned with o, which is CCS[0]... yeah this is ok
//
//ent, o, signal, target

	if(signal=='%'){return 'getv'}
	if(signal=='$'){return 'getv'}
	if(signal=='~'){return 'getv'}

//displacements
//displacements expect an orb name and an aspect or not
	//get the displacement command by reading just the first 2 letters.. ok it works!!
	var dc = signal.substr(0,2);
	
	if(dc=='le'){ // left
		var dcn = signal.substr(4);
		if(ent){
// left>>~
			if(dcn!=''){var speed = parseFloat(dcn);}else{var speed = Egspeed;}
			displacE('~','left',aspect,speed);
			Eout='left'+speed+'>>~';
		//so maybe we dont want drag after all... its kinda overpowered anyway
			if(Drag.length>0){
				for (var i3 = 0; i3 < Drag.length; i3++) {
					var to = Drag[i3].split('/');
					displacE(to[0],'left',to[1],speed);
				}
			}
			return
		}
		if(o){
//left>>orb ,  /aspect
			if(dcn!=''){var speed = parseFloat(dcn);}else{var speed = o.gspeed;}
			displacE(o.name,'left',aspect,speed);
			if(aspect==undefined){var asp = '';}else{var asp = o.name+'/'+aspect;}
			o.o='left'+speed+'>>'+asp;

//o drag is working but am still not sure if we want to really implement orb drag
			if(o.drag.length>0){
				for (var i3 = 0; i3 < o.drag.length; i3++) {
					var to = o.drag[i3].split('/');
					displacE(to[0],'left',to[1],speed);
					//displacE(o.drag[i3],'left',aspect,speed);
				}
			}
			return
		}
	}

	if(dc=='ri'){//right
		var dcn = signal.substr(5); //if(dcn!=''){var speed = parseFloat(dcn);}
		if(ent){
// right>>~
			if(dcn!=''){var speed = parseFloat(dcn);}else{var speed = Egspeed;}
			displacE('~','right',aspect,speed);
			Eout='right'+speed+'>>~';
			if(Drag.length>0){
				for (var i3 = 0; i3 < Drag.length; i3++) {
					var to = Drag[i3].split('/');
					displacE(to[0],'right',to[1],speed);
				}
			}
			return
		}
// right>>orb  ,/aspect
		if(o){
			if(dcn!=''){var speed = parseFloat(dcn);}else{var speed = o.gspeed;}
			displacE(o.name,'right',aspect,speed);
			o.o='right'+speed+'>>'+o.name;
			if(o.drag.length>0){
				for (var i3 = 0; i3 < o.drag.length; i3++) {
					var to = o.drag[i3].split('/');
					displacE(to[0],'right',to[1],speed);
				}
			}
			return
		}
	}

	if(dc=='up'){ // up
		var dcn = signal.substr(2); //if(dcn!=''){var speed = parseFloat(dcn);}
		if(ent){
// up>>~
			if(dcn!=''){var speed = parseFloat(dcn);}else{var speed = Egspeed;}
			displacE('~','up',aspect,speed);
			Eout='up'+speed+'>>~';
			if(Drag.length>0){
				for (var i3 = 0; i3 < Drag.length; i3++) {
					var to = Drag[i3].split('/');
					displacE(to[0],'up',to[1],speed);
				}
			}
			return
		}
// up>>orb , /aspect
		if(o){
			if(dcn!=''){var speed = parseFloat(dcn);}else{var speed = o.gspeed;}
			displacE(o.name,'up',aspect,speed);
			o.o='up'+speed+'>>'+o.name;
			if(o.drag.length>0){
				for (var i3 = 0; i3 < o.drag.length; i3++) {
					var to = o.drag[i3].split('/');
					displacE(to[0],'up',to[1],speed);
				}
			}
			return
		}
	}

	if(dc=='do'){ //down
		var dcn = signal.substr(4); //if(dcn!=''){var speed = parseFloat(dcn);}
//we need to add Drag here
		if(ent){
// down>>~
			if(dcn!=''){var speed = parseFloat(dcn);}else{var speed = Egspeed;}
			displacE('~','down',aspect,speed);
			Eout='down'+speed+'>>~';
			if(Drag.length>0){
				for (var i3 = 0; i3 < Drag.length; i3++) {
					var to = Drag[i3].split('/');
					displacE(to[0],'down',to[1],speed);
				}
			}
			return
		}
// down>>orb , /aspect
		if(o){
			if(dcn!=''){var speed = parseFloat(dcn);}else{var speed = o.gspeed;}
			displacE(o.name,'down',aspect,speed);
			o.o='down'+speed+'>>'+o.name;
			if(o.drag.length>0){
				for (var i3 = 0; i3 < o.drag.length; i3++) {
					var to = o.drag[i3].split('/');
					displacE(to[0],'down',to[1],speed);
				}
			}
			return
		}
	}

//from here on o is necessary so we might as well just ask once if its defined
	if(o){}else{return 'end'}

/*
//incomplete!!!!!!!!!!!!!!!!!!!!!!!!!
//strife clockwise and counter clockwise
//we want to be able to focus on a target circle form for now ... strife comands are incomplete!!!!!!!!!!
	if(signal=='strifec'){
// strifec>>~
		if(ent){
			//strifE('~','right',undefined,undefined,Focus);
		}
		if(o){
//why doesnt displacE also just use o instead of o.name...? !!!!!
			strifE(o.name,'right',0.01);
		}
	}
	if(signal=='strifecc'){
// strifecc>>~
		if(ent){
			//strifE('~','left',aspect,speed);
		}
		if(o){
			strifE(o.name,'left',0.01);
		}
	}

	if(signal=='advance'){
// advance>>~
		if(ent){
			//strifE('~','up',aspect,speed);
		}
		//if(o) ..
	}

	if(signal=='recede'){
// recede>>~
		if(ent){
			//strifE('~','down',aspect,speed);
		}
		//if(o) ..
	}
*/

//a commnad to delete a target orb.. for now
// delete should always expect a single string which is an orb name... maybe an aspect too? .. yes this is good. if only
//an orb, delete the orb, if orb and aspect, delete the aspect, if orb/text/number, ... use the dataline as target...? thats inconsistent
//.. but this line of logic is interesting nevertheless. we need to use data from text to select our target, this is important to create
//scripts.. at the very last this is a good feature in the system to have available. The whole point of having access to orbs data is to
//use this data to create processes using scripts.
// delete>>orb , orb/aspect , orb/aspect/subk
	if(signal=='delete'){
		if(line){//line? more like, sub
			//if(sub=='x') ... so we could say +>>orb/circle/x... yeah thats lovely. signals to states directly
//use data on lines to select a target
			if(line=='last'){
// delete>>orb/text/last
				if(o.txtLi.length==0){return 'end'}//nothing here
				var lastl = o.txtLi[o.txtLi.length-1].txt;
				if(lastl==undefined){return 'end'}
				var T = lastl.split('/'); //T[0] is the orb name, T[1] could be the aspect
				var not = Fting(Orbs,'name',T[0]); //new orb target
				var nota = T[1];
				//var not = Fting(Orbs,'name',lastl); //new orb target
			}
			if(line=='current'){
// delete>>orb/text/current
				if(o.txtLi.length==0){return 'end'}//nothing here
				var currentl = o.txtLi[o.txtB-1];
				if(currentl==undefined){return 'end'}
				var T = currentl.split('/'); //T[0] is the orb name, T[1] could be the aspect
				var not = Fting(Orbs,'name',T[0]); //new orb target
				var nota = T[1];
				//var not = Fting(Orbs,'name',currentl); //new orb target
			}

// delete>>orb/text/number
			//if stil here, we ask if this is a number we can work with
		//but returning end here is preventing T from updating target!!!!!
			if(not){}else{ //heh this kinda ugly but does the job
				var rln = parseFloat(line);
				//if(rln==undefined){return 'end'}
				let nan = isNaN(rln);
				if(nan){return 'end'}
				if(rln>o.txtLi.length){return 'end'}
				var rl = o.txtLi[rln-1].txt;
				if(rl){
					var T = rll.split('/'); //T[0] is the orb name, T[1] could be the aspect
					var not = Fting(Orbs,'name',T[0]); //new orb target
					var nota = T[1];
					//var not = Fting(Orbs,'name',rl);
				}
				//if line exists but we didnt find a target on the text, we need to return end here since we dont want to
				//use o as target for sure
				if(not==undefined){return 'end'}
			}
		}
//!!!!!!! this is tricky. its not very clear but this is how peak performance look like xD
		if(not){o = not; aspect = nota;}

//ok now we can delete orbs and also specific orbs aspects so this needs update!!!!!!!!!
//... however i think it would be more apropiate to design a different signal to manage aspects. seal and unseal
//So with signals we can simply restrict the activity of orbs aspects without erasing all data. this might be an interesting mechanic.
//well seal and unseal are both working. Maybe delete could remove alldata from specified aspect..!!!!!!
		//incomplete
// delete>>orb/aspect
		if(aspect){ //remove an aspect from target orb
			if(aspect=='circle'){o.circle=false;}
			if(aspect=='rectangle'){o.rectangle=false;}
			if(aspect=='text'){o.text=false;}
			return
		}
		//.. orb is always defined if we are here
		//if(o){
//send a signal to be processed on correct instance. but for now just remove
		var ioo = Orbs.indexOf(o);
		Orbs.splice(ioo,1);
		var iooo = staNce.indexOf(o.name);
		staNce.splice(iooo,1);
		Eout = 'delete>>'+o.name;
		return
		//}
		//.. not sure whi i blocked this. it makes sense to return 'end' here if we didnt find a target
		//return 'end'
	}

//.. and how about deleting specific things. how would delete line look like.. here maybe?
//SO actually rmline is good because it literally removes the text line when we do orb/text/number as target . 'delete' command
//signal uses the line in the target text to create a new target instead of removing the line itself. Yes this is worthy
//of clarification and its actually looking consistent and logic.. to me at least
// rmline>>orb/text/..... hm... modify the switch a bit maybe? Because now we can do a command>>into a specific place/of a target orb
//so '>>' doesnt just transfer data but sinthax also uses it to cast a command on a target... !!!!!!! we definitely want the sinthax
//to work like this because command>>target looks kinda easy to grasp i mean it is self explanatory imo... ok this is interesting..
//i  realized rmline could simply access an orb, and just yoink the current text line... this is notbad either.. but no
//rmline should always expect orb/text/1..2..current..last etc...... OR MAYBE we could also expect rmline>>orb/circle/number, 
//so we can specify a beat from an aspect to be removed... not a bad idea... kinda messy tho
// rmline>>orb/text/line
	if(signal=='rmline'){
//we could send a signal kinda like when we do orb/in ..
		//if(o){
			//send a signal to be processed on correct instance. but for now just remove the line on txtB
		if(o.text){
			if(line){
				if(line=='current'){var targetl = o.txtLi[o.txtB-1]; var place = o.txtB;}
			//.. so last is not really the last line we see.. its the first line
				if(line=='last'){var targetl = o.txtLi[o.txtLi.length-1]; var place = o.txtLi.length-1;}
				if(line=='all'){o.txtLi=[]; return}
				if(place==undefined){var targetl = o.txtLi[line-1]; var place = line;}
			}
			if(targetl){
				//o.txtLi.splice(o.txtB-1,1);
				o.txtLi.splice(place-1,1);
				dESpacer(o);
				Eout = 'rmline>>'+target;//o.name;
				return
			}
			return 'end'
		}
		//}			
		//return 'end'
	}

//aspect embeding commands.. maybe these could be a bit different . it feels kinda clunky right now
//seal>>orb/circle , unseal>>orb/rectangle
// form>>orb
/*
	if(signal=='textform'){
		if(o){ o.text=true; SoulSeal(o); return }else{return 'end'}
	}
	if(signal=='circleform'){
		if(o){ o.circle=true; SoulSeal(o); return }else{return 'end'}
	}
	if(signal=='rectangleform'){
		if(o){ o.rectangle=true; SoulSeal(o); return }else{return 'end'}
	}
	if(signal=='oscillatorform'){
		if(o){ o.oscillator=true; SoulSeal(o); return }else{return 'end'}
	}
	if(signal=='imageform'){
		if(o){ o.image=true; SoulSeal(o); return }else{return 'end'}
	}
	if(signal=='scriptform'){
		if(o){ o.script=true; SoulSeal(o); return }else{return 'end'}
	}
*/
	if(signal=='seal'){
		if(aspect=='text'){o.text=false; return}
		if(aspect=='circle'){o.circle=false; return}
		if(aspect=='rectangle'){o.rectangle=false; return}
		if(aspect=='image'){o.image=false; return}
	}
	if(signal=='unseal'){SoulSeal(o,aspect); return}

	return 'end'
} //comRiTarget


//produce LSout
const getLeValue = function(LS,St){
//LS might be : ~/cont  , orb/cont , orb/cont/key , orb/cont/key/sub . 
	var SS = LS.split('/');
	//check origin
	var o = undefined;
	if(SS[0]=='~'){var ent = true;}
	if(SS[0]=='%'){var o = Fting(Orbs,'name',stancE);}
	if(SS[0]=='$'){var o = Fting(Orbs,'name',St);}//else{var o = Fting(Orbs,'name',SS[0]);}
	if(o==undefined){var o = Fting(Orbs,'name',SS[0]);}

	if(SS.length==1){
//?
//help commands... we could have them... or just have a really good manual somewhere as a text file
		//
		if(ent){
// ~
//return access keys to entity structure... actually, we could just request all data in real time , same with orbs. 
			var res = [
				//'~/name', '~/orbs', '~/stance', '~/dsignat', '~/in', '~/out', '~/gspeed', '~/wspeed',
				//'~/x', '~/y', '~/angle', '~/mspx','~/mspy','~/mspsize','~/mspradius', '~/limage',
				//'~/dismode'
				'~/name: '+Ename,
				'~/orbs: '+Orbs.length,
				'~/stance: '+stancE,
				'~/dsignat: ...',
				'~/x: '+eX,
				'~/y: '+eY,
				'~/gspeed: '+Egspeed,
				'~/mspalpha: '+zai,
				'~/mspx: '+MSpX,
				'~/mspy: '+MSpY,
				'~/mspsize: '+MSpSize,
				'~/mspradius: '+MSpRad,
				'~/out: '+Eout,
				'~/in: '+Ein,
				'~/limage: ...'
			]
			return res
		}

		if(o){
// $ , %
//return access keys for orb control $elected or $tanciated... yes actually we could just request all data in real time , we can even
//highlight active line... when we request orb/cont ... but 'orb' on its own could just return a special monitoring data array with
//all orb properties and values. if we request at every heartbeat we could see changes in real time. Yes.
			//var asp = [];
			var res = [];
			res.push(
				'/name: '+o.name,
				'/gspeed: '+o.gspeed,
				'/cursor: '+o.cursor,
				//'angle: '+o.angle, 'focus: '+o.focus,
				//o.name+'/name', o.name+'/gspeed', o.name+'/wspeed', o.name+'/in', 
				'/out: '+o.o,
				'/in: '+o.i
				//o.name+'/x', o.name+'/y', o.name+'/angle'
				//o.name+'/elis' , what about focus , 
//we probably want to be able to learn from here, what aspects does the orb has active
			);
			
			if(o.text){
				//asp.push('text');
				res.push(
					'/text/x: '+o.txtX,
					'/text/y: '+o.txtY,
					'/text/cn: '+o.txtB
					//o.name+'/text'
				);
			}
			if(o.script){
				//asp.push('script');
				res.push(
					'/script/run: '+o.scR,
					'/script ...'
				);
			}
			if(o.circle){
				//asp.push('circle');
				res.push(
					'/circle/x: '+o.cirS.x,
					'/circle/y: '+o.cirS.y,
					'/circle/radius: '+o.cirS.radius
					//o.name+'/circle'
				);
			}
			if(o.rectangle){
				//asp.push('rectangle');
				res.push(
					'/rectangle/x: '+o.rectS.x,
					'/rectangle/y: '+o.rectS.y
				);
			}
			if(o.oscillator){
				//asp.push('oscillator');
				res.push(
					'/osc'
				);
			}
			if(o.image){
				//asp.push('image');
				res.push(
					'/image/px: '+o.imgS.px,
					'/image/py: '+o.imgS.py,
					'/image/pw: '+o.imgS.pw,
					'/image/ph: '+o.imgS.ph,
					'/image/file: '+o.imgfile
				);
			}

			//var aspects = asp.join(',');
			//res.push('aspects: '+aspects);
			return res

		}

		return 'end'
	}


	if(SS.length==2){ //SS[1] is a cont
		if(ent){
			var k = SS[1];
			switch (k){
				case 'name':
//~/name
					return [Ename] 
				case 'x':
//~/x
					return [eX] 
				case 'y':
//~/y
					return [eY] 
				case 'drag':
//~/drag
					return Drag		
				case 'mspsize':
//~/mspsize
					return [MSpSize]
				case 'mspx':
//~/mspx
					return [MSpX]
				case 'mspy':
//~/mspy
					return [MSpY]
				case 'mspalpha':
//~/mspalpha
					return [zai]
				case 'mspradius':
//~/mspradius
					return [MSpRad]
				case 'orbs':
//~/orbs
		//read only . return a list of all orbs in the domain
					var aorbs = [];
					for (var i = 1; i <= staNce.length-1; i++) {
						var on = staNce[i];
						aorbs.push(on);
					}
					return aorbs
					//return staNce
				case 'dsignat':
//~/dsignat
					var dsi = [];
					for (var i = 0; i <= dsignat.length-1; i++) {
						var dsib = dsignat[i].toString();
						dsi.push(dsib);
					}
					return dsi;
				case 'keys':
//~/keys
					var SkS = [];
					//loop for EkeyS
					for (var i = 0; i <= EkeyS.length-1; i++) {
						var sk = EkeyS[i];
			//turn each object key into kpair style format. so embed the key and use the value, then join with ','
						var kpsf = [];
						kpsf.push('name',sk.name,'key',sk.key,'com1',sk.com1);
						var line = kpsf.join(',');
						SkS.push(line);

					}
					return SkS //LSout is an array with key lines

				//read only. use a file name to store on orb/image/file to use it
				case 'limage':
//~/limage
					var images = [];
					for (var i = 0; i <= LImg.length-1; i++) {
						var im = LImg[i].name;
						images.push(im);
					}
					return images

				//case 'laudio':
					//var images = [];
					//for (var i = 0; i <= LImg.length-1; i++) {
					//	var im = LImg[i].name;
					//	images.push(im);
					//}
					//return images
					//break

				case 'gspeed':
//~/gspeed
					return [Egspeed]

				case 'follow':
					//follow should be similar to stance. we just need to select an orb name or '~' in order to follow it
					//we can probably toggle this one
					break
				case 'stance':
//~/stance
					return [stancE]

		//These commands rule. 
				case 'inline':
//~/inline
					return [chat_in.value]
				case 'comline':
//~/comline
					return [chat_in.value]

		//read only, returns entity input and output... this is a special case watch out
				case 'in':
//~/in
					if(Ein==undefined){return 'end'}
					return [Ein]
				case 'out':
//~/out
					if(Eout==undefined){return 'end'}
					return [Eout]
			}//switch
		}//ent

		if(o){
			var k = SS[1];
			switch (k){

				case 'name':
//orb/name
					return [o.name] 
 
				//case 'x':
				//	return [o.x-MSp.state.x]
				//	break
				//case 'y':
				//	return [o.y-MSp.state.y]
				//	break


//into a different array ALOrbs , after loop orbs. This array contains all signals that need inmediate reaction to orbs activity
//drag, delete, in, out. All these signals need a special after procesing time .
//okok i rememebr. o was stance orb and or was SS[0] . because if an orb asks for orb/in we need to do the o.cast thing so
//we read the instruction on LSOrbs phase . so we need to use St to get the current stance if any
//UNTESTED
				case 'in':
//orb/in
					var or = Fting(Orbs,'name',St);
					if(or){
						if(or.cast){ 
							or.cast=false;
							if(o.i==undefined){return 'end'}
							return [o.i]; 
						}else{
	//create package to read later in order to not have issues, orb/in or out should always go on the first line. .We also need to let
	//know the orb loop
	//!!!!!!!!!a detail here .... can signal run the second command as a signal later?.. hmm i think it can
	//we want to use RS[0] name to find the orb and ask for the whole command on scB because C only holds first '<>' 
	//.. and yea we want to recycle comA so we want to use comA again on ALOrbs loop. We need a tag to distinguish . ok its o.cast
	//.. we store the tag on the stance calling.. and also use the stance scC 
							or.cast=true;
							ALOrbs.push({//scR:'signal', 
								st:St,//RS[0], //? stancE
								com:or.scC[or.scB-1]
							});
							//we dont want to read the second instruction on line either just yet
							return 'end'
						}
					}
					return 'end'

				case 'out':
//orb/out
					var or = Fting(Orbs,'name',St);
//. we could simply include all signals into a switch !!... the idea here of this thought was .. maybe it would be handy to manage
//all signals on ALOrbs because ALOrbs loop is a good instance to evaluate the signal effect. i was thinking about entities sending
//signals into orbs from different entities
					if(or){
						if(or.cast){ 
							or.cast=false;
							if(o.o==undefined){return 'end'}
							return [o.o]; 
						}else{
							or.cast=true;
							ALOrbs.push({//scR:'signal', 
								st:St,//RS[0], //? stancE
								com:or.scC[or.scB-1]
							});
							//we dont want to read the second instruction on line either just yet
							return 'end'
						}
					}
					return 'end'

				case 'script':
//orb/script
					var scla = [];
					for (var i = 0; i <= o.scC.length-1; i++) {
						var scl = o.scC[i];
						scla.push(scl);
					}
					return scla;
				case 'circle':
//orb/circle
					var btt = [];
					for (var i = 0; i <= o.cirF.length-1; i++) {
						var bt = o.cirF[i].toString();
						btt.push(bt);
					}
					return btt;

				case 'rectangle':
//orb/rectangle
					var btt = [];
					for (var i = 0; i <= o.rectF.length-1; i++) {
						var bt = o.rectF[i].toString();
						btt.push(bt);
					}
					return btt;
				case 'image':
//orb/image
					var btt = [];
					for (var i = 0; i <= o.imgF.length-1; i++) {
						var bt = o.imgF[i].toString();
						btt.push(bt);
					}
					return btt;
				case 'text':
//orb/text
					var dla = [];
					for (var i = 0; i <= o.txtLi.length-1; i++) {
						var tl = o.txtLi[i].txt;
						dla.push(tl);
					}

					return dla

				case 'osc':
//orb/osc
					var tla = [];
					for (var i = 0; i <= o.oscTL.length-1; i++) {
						var tl = o.oscTL[i];
						tla.push(tl);
					}
					return tla;

//.. wait
//drag . Make a target move with the caster. drag accepts targets names . every target is sent a displacement signal everytime
//the orb displaces. o.Drag accepts a list of one or more names to send signals to. if no op, it returns the list of draging targets
//into RSout
				case 'drag':
//orb/drag
					return o.drag		
				case 'cursor':
//orb/cursor
					return [o.cursor]	
				case 'gspeed':
//orb/gspeed
					return [o.gspeed]
			}
		}//orb

		return 'end'
	}

	if(SS.length==3){ //SS[2] is a contkey
		if(ent){
//not much here......
// ~/cont/key
		}

		if(o){
			var cont = SS[1]; var ckey = SS[2];
			if(cont=='text'){
				if(o.text){
		//so what if we want to put op[0] on a new line on target text..
					//these might fail.. need testing
					if(ckey=='x'){
// orb/text/x
						return [o.txtX];
					}
					if(ckey=='y'){
// orb/text/y
						return [o.txtY];
					}
					if(ckey=='last'){
// orb/text/last
						if(o.txtLi.length==0){return 'end'}//nothing here
						var lastl = o.txtLi[o.txtLi.length-1].txt;
						return [lastl];
					}
					if(ckey=='current'){
// orb/text/current
						if(o.txtLi.length==0){return 'end'}//nothing here
						var currentl = o.txtLi[o.txtB-1];
						if(currentl==undefined){return 'end'}
						return [currentl.txt];
					}

					if(ckey=='cn'){
// orb/text/cn
						return [o.txtB]	
					}
//orb/text/number
					//if stil here, we ask if this is a number we can work with
					var rln = parseFloat(ckey);//we need to turn ckey into a number
					//if(rln==undefined){return 'end'}
					let nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>o.txtLi.length){return 'end'}
					var rl = o.txtLi[rln-1].txt;
					if(rl){return [rl]}

				}//text cont

				//.. if no data defined, then we should return 'end'
				return 'end'
			}//text

			if(cont=='script'){
				if(o.script){
					//.. hmm polarity on run seems unnecesary.. but this is an interesting aproach
					if(ckey=='run'){
// orb/script/run
						return [o.scR]	
					}

					if(ckey=='last'){
//... why would we want to retrieve last like script line like this tho...?
// orb/script/last
						var lastl = o.scC[o.scC.length-1];
						return [lastl];
					}

					if(ckey=='current'){
// orb/script/current
						var currentl = o.scC[o.scB-1];
						return [currentl];
					}
					if(ckey=='cn'){
// orb/script/cn
						return [o.scB]
					}
// orb/script/number
					//we need to turn ckey into a number
					var rln = parseFloat(ckey);
					let nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>o.scC.length){return 'end'}
					var rl = o.scC[rln-1];
					if(rl){return [rl];}
				}
			}//script

			if(cont=='image'){
				if(o.image){
					if(ckey=='file'){
//orb/image/file
						return [o.imgfile]
					}
					if(ckey=='run'){
//orb/image/run
						return [o.imgR]	
					}
					if(ckey=='last'){
// orb/image/last
						var lastl = o.imgF[o.imgF.length-1].toString();
						return [lastl];
					}
					if(ckey=='current'){
//orb/image/current
				//current needs to return the current beat as text
						var strb = o.imgF[o.imgB-1].toString();
						return [strb];
					}
					if(ckey=='cn'){
//orb/image/cn
						return [o.imgB]	
					}
// orb/image/number
					//we need to turn ckey into a number
					var rln = parseFloat(ckey);
					let nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>o.imgF.length){return 'end'}
					var rl = o.imgF[rln-1].toString();
					if(rl){return [rl];}
				}
			}//image

//.. rememeber we need to consider text to beat and beat to text format transfomations in all these beat manipulations
			if(cont=='circle'){
				if(o.circle){
					if(ckey=='x'){
// orb/circle/x
						return [o.cirS.x];
					}
					if(ckey=='y'){
// orb/circle/y
						return [o.cirS.y];
					}
					if(ckey=='run'){
//orb/circle/run
						return [o.cirR]	
					}
					if(ckey=='last'){
//orb/circle/last
						var strb = o.cirF[o.cirF.length-1].toString();
						return [strb];			
					}
					if(ckey=='current'){
//orb/circle/current
						var strb = o.cirF[o.cirB-1].toString();
						return [strb];			
					}
					if(ckey=='cn'){
//orb/circle/cn
						return [o.cirB];
					}
				}
			}//circle

			if(cont=='rectangle'){
				if(o.rectangle){
					if(ckey=='x'){
// orb/rectangle/x
						return [o.rectS.x];
					}
					if(ckey=='y'){
// orb/rectangle/y
						return [o.rectS.y];
					}
					if(ckey=='run'){
//orb/rectangle/run
						return [o.rectR]	
					}
					if(ckey=='current'){
//orb/rectangle/current
						var strb = o.rectF[o.rectB-1].toString();
						return [strb];
					}
					if(ckey=='cn'){
//orb/rectangle/cn
					}
				}
			}

			if(cont=='osc'){
				if(o.oscillator){
					if(ckey=='run'){
//orb/osc/run
						return [o.oscR]	
					}
//.. osc and audio works differently. there is no current beat selected because all tone lines run at once and are monitored by hearall
//however we want to be able to access each tone data individually and be able to modify and see whats going on using this sinthax
//so orb/osc could simply return all tone lines..
					if(ckey=='current'){

					}
					if(ckey=='cn'){

					}
				}
			}

		}
		//if we still here then we might just return 'end' because nothing worked
		return 'end'
	}

//
	if(SS.length==4){ //SS[3] is a sub
		if(ent){
// ~/cont/ckey/sub
			// reff.
			//if(RS[0]=='~'){
			//cant think about 3 '/' on left side for '~' yet..
				//return
			//}
		}
		
		if(o){
// orb/cont/ckey/sub
			var cont = SS[1]; var ckey = SS[2]; var sub =SS[3];
			// o , cont, ckey, sub . we are retrieving here RS[1] is cont , RS[2] is ckey

			if(cont=='text'){
				if(o.txtLi){
					if(o.txtLi.length==0){return 'end'}//nothing here
					if(ckey=='last'){
						var lastl = o.txtLi[o.txtLi.length-1];

						if(sub=='beats'){
// orb/text/last/beats>>?
							var strba = [];
							for (var i = 0; i <= lastl.beats.length-1; i++) {
								var strb =  lastl.beats[i].toString();//txtToB(RSout[i]);
								strba.push(strb);
							}
							//var RSout=strba;
							//o.o=RSout;
							return strba
						}
						if(sub=='cn'){
// orb/text/last/cn>>?
							//var RSout=[lastl.tB];
							//o.o=RSout;
							return [lastl.tB]
						}
// orb/text/last/1..2..3.. >>?
						var rln = parseFloat(sub);//we need to turn sub into a number
						let nan = isNaN(rln);
						if(nan){return 'end'}
						if(rln>lastl.beats.length){return 'end'}
						var strb = lastl.beats[rln-1].toString();
						//var RSout = [strb]
						//o.o=RSout;
						return [strb]
					}//last

					if(ckey=='current'){
						var currl = o.txtLi[o.txtB-1]; 
						if(sub=='beats'){
// orb/text/current/beats>>?
							var strba = [];
							for (var i = 0; i <= currl.beats.length-1; i++) {
								var strb =  currl.beats[i].toString();
								strba.push(strb);
							}
							//var RSout=strba;
							//o.o=RSout;
							return strba

						}
						if(sub=='cn'){
// orb/text/current/cn>>?
							//var RSout=[currl.tB];
							//o.o = RSout;
							return [currl.tB];
						}
// orb/text/current/1..2..3.. >>?
						var rln = parseFloat(sub);
						var nan = isNaN(rln);
						if(nan){return 'end'}
						if(rln>currl.beats.length){return 'end'}
						var strb = currl.beats[rln-1].toString();
						//var RSout = [strb]
						//o.o=RSout;
						return [strb]

					} 

					var rln = parseFloat(ckey);
					var nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>o.txtLi.length){return 'end'}
					var irl = o.txtLi[rln-1];
					//irl holds the whole line now...
					if(sub=='beats'){
// orb/text/1..2..3../beats>>?
						var strba = [];
						for (var i = 0; i <= irl.beats.length-1; i++) {
							var strb =  irl.beats[i].toString();//txtToB(RSout[i]);
							strba.push(strb);
						}
						//var RSout=strba;
						//o.o=RSout;
						return strba
					}
					if(sub=='cn'){
// orb/text/1..2..3../cn>>?
						//var RSout=[irl.tB];
			//so retrieve commands should not really return data to o.o? not sure. 
						//o.o = RSout;
						return [irl.tB]
					}
// orb/text/1..2..3../1..2..3..>>?
					var rln = parseFloat(sub);
					var nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>irl.beats.length){return 'end'}
					var strb = irl.beats[rln-1].toString();
					//var RSout = [strb];
					//o.o = RSout;
					return [strb]
				}//o.txtLi 
			}//text

		}
	}
	//...
	return 'end'

}//getLeValue


//const swKOrb = function(o,k,po,op){
//const swKEnt = function(k,po,op){
//const swCKOrb = function(o ,cont, ckey,po,op){ //takes an orb, a container and a container key. modify value using op
//putRiValue should be able to merge all switches by annalyzing right side. LS should always be an array with strings or a number
//return undefined when succesful, return 'end' when operation couldnt be performed
const putRiValue = function(op,RS,St,pol){
//RS might be : ~/cont  , orb/cont , orb/cont/key , orb/cont/key/sub
	var SS = RS.split('/');
	//check origin
	var o = undefined;
	if(SS[0]=='~'){var ent = true;}
	if(SS[0]=='$'){var o = Fting(Orbs,'name',St);}//else{var o = Fting(Orbs,'name',SS[0]);}
	if(SS[0]=='%'){var o = Fting(Orbs,'name',stancE);}
	if(o==undefined){var o = Fting(Orbs,'name',SS[0]);}

	//if(SS.length==1){ //... orb/key>>~ ... i think this doesnt exist
	//}
	
	if(SS.length==2){
		if(ent){
			var k = SS[1];
			switch (k){
				case 'name':
// ~/name
					Ename=op[0];
					return 

				case 'x':
// ~/x
					if(pol==0){
						ctx0.translate(eX,0);
						ctx0.translate(-(op[0]),0);
						eX=op[0];
						Ecen.state.x=eX; 
						Elid.state.x=eX-window.innerWidth/2; 
					}
					return
				case 'y':
// ~/y
					if(pol==0){
						ctx0.translate(0,eY);
						ctx0.translate(0,-(op[0]));
						eY=op[0];
						Ecen.state.y=eY;
						Elid.state.y=eY-window.innerHeight/2;
					}
					return
		// entity Drag
				case 'drag':
// ~/drag
					Drag=op;
					return //[]  //not sure what to return here
/*
//these are read only... right? i mean... for now
				case 'mspsize':
					return MSpSize
					break
				case 'mspx':
					return MSpX
					break
				case 'mspy':
					return MSpY
					break
				case 'mspradius':
					return MSpRad
					break
				case 'orbs':
		//read only . return a list of all orbs in the domain... including '~' ? but this is not an orb... should be stance
					return staNce 
					break
*/
				case 'dsignat':
// ~/dsignat
					//read. write. A list of beats to all forms by default
		//.. would be convenient to designate all the most common colours on default
					var nba = [];
					for (var i = 0; i <= op.length-1; i++) {
						var rsob = txtToB(op[i]);
						nba.push(rsob);
					}
					dsignat = nba;
					return 
				case 'keys':
// ~/keys
					EkeyS = [];
					for (var i = 0; i <= op.length-1; i++) {
						var sk = op[i];
						//turn key lines into obj
						var ska = sk.split(',');
						var kobj = KLTObj(ska);
						EkeyS.push(kobj);
					}
					//o.o = op;
					return 
/*
			//read only. use a file name to store on orb/image/file to use it with image beat lines
				case 'limage':
					var images = [];
					for (var i = 0; i <= LImg.length-1; i++) {
						var im = LImg[i].name;
						images.push(im);
					}
					return images
					break
				//case 'laudio':
					//var images = [];
					//for (var i = 0; i <= LImg.length-1; i++) {
					//	var im = LImg[i].name;
					//	images.push(im);
					//}
					//return images
					//break
*/
				case 'gspeed':
// ~/gspeed
					//to toggle between lines to select on a data container. should be easy
					if(pol==0){
						var numba = parseFloat(op[0]);
						let nan = isNaN(numba);
						if(nan){return 'end'}
						Egspeed=numba;
						return //[Egspeed]
					}else{
						var res = Egspeed+pol;
						if(res>=60){res--;} 
						if(res<=0){res++;} 
						Egspeed=res;
						return //[Egspeed]
					}
				//case 'follow':
// ~/follow
					//follow should be similar to stance. we just need to select an orb name or '~' in order to follow it
					//we can probably toggle this one
				//	break
				case 'stance':
// ~/stance
					//if we want a new key value literally, we use op and set polarity to 0
					if(pol==0){
						stancE=op[0];
						return //[stancE]
					}else{
						var n = staNce.indexOf(stancE);
						var res = n+pol;
						if(res<=0){stancE = '~'; return}
						if(res>(staNce.length-1)){res--;}
						var l = staNce.length; 
						while(l--){
							var name = staNce[l];
							if(l==res){
								stancE = name;
								return //[stancE]
							}
						}
						//if no match, just return to initial stance. 
						stancE = '~';
						return //['~']
					}
		//These commands rule. 
				case 'inline':
// ~/inline
					// and now we should be able to get a whole text on chat_in.value, eachline separated by ' ' and
					// a ':' at the beggining? 
			//retrieving multiliners should be user friendly, it would be nice to be able to produce a text with each line
			//separated... we l come back here later
					var alldata = op.join(' ');
					chat_in.value = alldata;//op[0]//we want RSout here
					chat_in.style.display="inLine";
					chatOn = true; 
					nLine = true; //inline prompt
					chat_in.focus();
					return
				case 'comline':
// ~/comline
					chat_in.value = op[0]//we want RSout here
					chat_in.style.display="inLine";
					chatOn = true; 
					chat_in.focus();		
					return
/*
		//read only, returns entity input and output
				case 'in':
					if(Ein==undefined){return}
					return [Ein]
					break
				case 'out':
					if(Eout==undefined){return}
					return [Eout]
					break
*/


			}//switch
		}//~

		if(o){
			var k = SS[1];
			switch (k){
				case 'name':
// orb/name
					var si = staNce.indexOf(o.name);
					staNce.splice(si,1,op[0]);
					o.name = op[0];
					return 

				case 'in':
// orb/in
					o.i = op[0]; return
				//case 'out':
// orb/out ?
					//
					//return [o.o]
					//break

				case 'script':
// orb/script
					//op should be an array with instructions
					o.scB=1; o.scC = op; return //[]  //not sure what to return here

				case 'circle':
//orb/circle
		//so circle should return circle beats on string format.. beat to array
					var ncb = [];
					for (var i = 0; i <= op.length-1; i++) {
						var ttb = txtToB(op[i]);
						ncb.push(ttb);
					}
					o.cirB = 1; o.cirF = ncb; return //?

				case 'rectangle':
//orb/rectangle
					var ncb = [];
					for (var i = 0; i <= op.length-1; i++) {
						var ttb = txtToB(op[i]);
						ncb.push(ttb);
					}
					o.rectB = 1; o.rectF = ncb; return //?

				case 'image':
//orb/image
					var ncb = [];
					for (var i = 0; i <= op.length-1; i++) {
						var ttb = txtToB(op[i]);
						ncb.push(ttb);
					}
					o.imgB = 1; o.imgF = ncb; return //?

				case 'text':
//orb/text
//so, we can place multilines on a data container by passing in an array with lines on op
//text key on its own does not react to polarity. it returns all text lines in the orb.
//this command not only needs to clear previous data, but also return all lines
//op is the data we want to have now so we want to clear old data here and place op instead
//we want RSout op to overide all data and replace it.... but we could ask if there is a line structure already and just use
//that. we would only have to pass on the new text data only. in this way also we could just use the previous beat
					//
//so we need the beat from the orb or entity that produced op.. ? i think not anymore. we can probly highlight using mirror
// orb/circle>>orb2/text<>#r,220,b,220,g,220>>orb/circle/current

//so before clearing up o.txtLi, we check if there are as many datalines as op.length. yup this is good
					//o.txtLi = [];
					for (var i = 0; i <= op.length-1; i++) {
						var text = op[i];
						if(o.txtLi[i]){o.txtLi[i].txt=text;}else{
							var Line = DataLine();
							Line.beats=dsignat;
							Line.x=o.txtX; Line.y=o.txtY;
							Line.txt=text;
							o.txtLi.push(Line);
						}
					}

					dESpacer(o);
					return //[]  //not sure what to return here

				case 'osc':
//orb/osc
					o.oscTL = op;
					return //[]  //not sure what to return here
//.. wait
//drag . Make a target move with the caster. drag accepts targets names . every target is sent a displacement signal everytime
//the orb displaces. o.Drag accepts a list of one or more names to send signals to... 
				case 'drag':
//orb/drag
					o.drag=op;
					return //[]  //not sure what to return here

				case 'cursor':
//orb/cursor
					if(pol==0){
						o.cursor=op[0];
						return //[o.cursor]	
					}
					var cursor = ['text','circle','rectangle']; //osc?
					var n = cursor.indexOf(o.cursor);
					var res = n+pol;
					if(res>=cursor.length){res--;} 
					if(res<0){res++;} 
					o.cursor=cursor[res];
					return //o.cursor

				case 'gspeed':
//orb/gspeed
//gspeed huh....
					//to toggle between lines to select on a data container. should be easy
					if(pol==0){
						//op could be an array... with 1 line.. so thats why this didnt work
						o.gspeed=op[0];
						return //[o.gspeed]	
					}
					var res = o.gspeed+pol;
					if(res>=100){res--;} 
					if(res<=0){res++;} 
					o.gspeed=res;
					return //[o.gspeed]
			}//switch
		}//orb
	}

	if(SS.length==3){
//SS[1] is cont, SS[2] is ckey
		if(ent){
//not much here either....
		}

		if(o){
			var cont = SS[1]; var ckey = SS[2];
			if(cont=='text'){
				if(o.text){
					if(ckey=='x'){
//orb/text/x
						o.txtX=op[0]; dESpacer(o); return
					}
					if(ckey=='y'){
//orb/text/y
						o.txtY=op[0]; dESpacer(o); return
					}
//so what if we want to put op[0] on a new line on target text.. or what if we want to say o1/text/1>>o2/text/3 and just replace
//line 3 of o2 with line 1 of o1.. yea we probably want this. we also going to need a keyword to simply push new line into text container
//so it specifically creates new lines without erasing anything previous.
//yeah so by default these commands should replace target with op. we want text to fine control other scripts. use orb/text/new
//to simply push all op into the text as new lines
		//we should be able to toggle current number....!!!!!
					if(ckey=='cn'){
//orb/text/cn
						if(pol==0){
							//.. maybe we need to check here if op[0] is a number?
							o.txtB=op[0];
							return //[o.txtB]	
						}else{
							o.txtB = o.txtB+pol;
							if(o.txtB<=0){o.txtB=1;} 
							return
						}

					}
					if(ckey=='new'){
//orb/text/new
       			//a loop to push new lines into the text without deleting any line previously there
						for (var i2 = 0; i2 < op.length; i2++) {
							var dli = DataLine();
							dli.beats=dsignat; 
							dli.txt=op[i2];
							dli.x=o.txtX; dli.y=o.txtY;
							//o.txtLi.splice(rln-1,0,dli);
							o.txtLi.push(dli);
						}
						dESpacer(o);
       						return
					}
//.... i dont think we need last tbh... i rememebr i included this for some reason... but that reason does not come into my mind now
					if(ckey=='last'){
//orb/text/last
						//we want to put op[0] on the last line of the orb text
						if(o.txtLi.length==0){
							var dli = DataLine(); dli.beats=dsignat; dli.txt=op[0];
							dli.x=o.txtX; dli.y=o.txtY;
							o.txtLi.push(dli);
							dESpacer(o);
							return
						}else{
							o.txtLi[o.txtLi.length-1].txt = op[0];
							o.o=[op[0]];
							return
						}
					}
//we want to replace the currently selected line with op[0].. right?. we could do o1/text/current>o2/text/current on a key so we can
//transfer specific lines from one text to another. interesting ok done already
//we create empty lines to reach the line number requested if there arent enough lines already
					if(ckey=='current'){
//orb/text/current
						if(o.txtB>o.txtLi.length){
							//get the difference... i have a function to get diff now.. maybe use it here!!!!!!!!
							var subs = Diff(o.txtB,o.txtLi.length);
							//add empty DataLines to make up for the difference 
							for (var i2 = 0; i2 < subs; i2++) {
								var dli = DataLine();
								dli.beats=dsignat; 
								dli.txt='';
								dli.x=o.txtX; dli.y=o.txtY;
								//o.txtLi.splice(rln-1,0,dli);
								o.txtLi.push(dli);
							}
							var ldli = o.txtLi[o.txtB-1];
							ldli.txt = op[0];
						}else{
					//use prev dataline structure, just replace text
							o.txtLi[o.txtB-1].txt=op[0];
					/*
							var dli = DataLine();
							dli.beats=dsignat; 
							dli.txt=op[0];
							dli.x=o.txtX; dli.y=o.txtY;
							//this operation adds a line simply on selected place
							//o.txtLi.splice(rln-1,0,dli);
							//we could also replace the line from here like this:
							o.txtLi.splice(o.txtB-1,1,dli);
     					*/
						}

						dESpacer(o);
						return
					}



//orb/text/number
					var rln = parseFloat(ckey);//we need to turn ckey into a number
					//if(rln==undefined){return 'end'}
					let nan = isNaN(rln);
					if(nan){return 'end'}

					if(rln>o.txtLi.length){
						//get the difference... i have a function to get diff now.. maybe use it here!!!!!!!!
						//var subs = rln-o.txtLi.length;
						var subs = Diff(rln,o.txtLi.length);
						//add empty DataLines to make up for the difference 
						for (var i2 = 0; i2 < subs; i2++) {
							var dli = DataLine();
							dli.beats=dsignat; 
							dli.txt='';
							dli.x=o.txtX; dli.y=o.txtY;
							o.txtLi.push(dli);
						}
						//and place op[0] text on rln
						var ldli = o.txtLi[rln-1];
						ldli.txt = op[0];
					}else{
						o.txtLi[rln-1].txt=op[0];
				/*
						var dli = DataLine();
						dli.beats=dsignat; 
						dli.txt=op[0];//Ein;
						dli.x=o.txtX; dli.y=o.txtY;
						//this operation adds a line simply on selected place
						//o.txtLi.splice(rln-1,0,dli);
						//we could also replace the line from here like this:
						o.txtLi.splice(rln-1,1,dli);
				*/
					}

					dESpacer(o);
					return

				}
				//.. if no data defined, then we should return 'end'
				return 'end'
			}//text

			if(cont=='script'){
				if(o.script){
				//.. hmm polarity on run seems unnecesary.. but this is an interesting aproach
					if(ckey=='run'){
//orb/script/run
						o.scR=op[0]; return
					}

					if(ckey=='last'){
//orb/script/last
						o.scC[o.scC.length-1] = op[0]; return
					}

					//if(ckey=='current'){
//orb/script/current
		//this is a bit weird to have in here because current reffers to the currently executing instruction on the script
		//.. yeah probably we want to read and annalyze the current running instruction but change it ...? no this doesnt feel
		//right... but maybe we could still implement it
						//o.scC[o.scB-1] = op[0];
						//return
					//}

					if(ckey=='cn'){
//orb/script/cn
			//we probly want cn to manage toggle ?
						//should only accept numbers.. max is number of lines in script
						//.... maybe we want to turn this into a number
						o.scB = op[0]; return
					}
//orb/script/number
		//this command would put a new value on the target script instruction... feels kinda aggressive but might be usable
					//we need to turn ckey into a number
					var rln = parseFloat(ckey);
					let nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>=o.scC.length){return 'end'}
					var rl = o.scC[rln-1];
					if(rl){
						o.scC[rln-1] = op[0];
						return
					}
				}

			}//script

			if(cont=='image'){
				if(o.image){
					if(ckey=='file'){
//orb/image/file
		//loading a file should should create a beat by default with image default properties? we expect a file name on op
						//use op[0] to find the image on LImg
						if(LImg.length==0){return 'end'}
						for (var i = 0; i <= LImg.length-1; i++) {
							var Img = LImg[i];
							if(Img.name==op[0]){
								o.imgfile = op[0];
								o.imgS.img = Img.img;
								o.imgF.push(
									[
								//these coordinates need clarification..
										'x',0,//o.x
										'y',0,//o.y
										'w',Img.img.width,'h',Img.img.height,
	//!!!!!!!!!!!!!!! am using circle coordinates now here but ... i just have this realization... we probably need to use rect.
										'px',MSpX,//o.cirS.x,//o.x
										'py',MSpY,//o.cirS.y,//o.y
										'pw',Img.img.width,'ph',Img.img.height
									]
								);
								return 
							}//match
						}
						return 'end'
					}
					if(ckey=='run'){
//orb/image/run
						if(pol==0){
							o.imgR=op[0]; return
						}else{
							var run = ['off','once','loop','repeat']; 
							var n = run.indexOf(o.imgR);
							var res = n+pol;
							if(res>=run.length){res--;} 
							if(res<0){res++;} 
							o.imgR=run[res];
							return
						}
					}
					if(ckey=='current'){
//>>orb/image/current
						var nb = txtToB(op[0]);
						o.imgF[o.imgB-1] = nb;
						return //CSout
					}
					if(ckey=='cn'){
//>>orb/image/cn
						o.imgB = op[0];
						return
					}
					if(ckey=='mirror'){
//>>orb/image/mirror
//mirror pretty much requires op because... what could mirror do on the left side RS? ... one sec $/image/mirror>> ... maybe an instruction
//to copy a beat
						var mirror = {
							img:o.imgS.img,
							is:'img',
							x:0, y:0, w:0, h:0, px:0, py:0, pw:0, ph:0, a:1,
							layer:0
						}
						var sm = Mirror(op[0],mirror);//,o.imgL);
						if(sm.layer==0){visual_q0.push(sm);} 
						if(sm.layer==1){visual_q1.push(sm);}
						if(sm.layer==2){visual_q2.push(sm);}
						//console.log(op[0],mirror,o.cirL);
					//ouput returns the beat..
						o.o=op[0];
						return

					}//mirror
				}
			}

		//.. rememeber we need to consider text to beat and beat to text format transfomations in all these beat manipulations
			if(cont=='circle'){
				if(o.circle){
					if(ckey=='x'){
//>>orb/circle/x
						o.cirS.x=op[0]; return
					}
					if(ckey=='y'){
//orb/circle/y
						o.cirS.y=op[0]; return
					}
					if(ckey=='run'){
//orb/circle/run
						if(pol==0){
							o.cirR=op[0];
							return //[o.cirR]	
						}else{
							var run = ['off','once','loop','repeat']; 
							var n = run.indexOf(o.cirR);
							var res = n+pol;
							if(res>=run.length){res--;} 
							if(res<0){res++;} 
							o.cirR=run[res];
							return //[run[res]]
						}
					}

					if(ckey=='current'){
//orb/circle/current
					//in here we need to transform text beat format into beat array
						var nb = txtToB(op[0]);
						o.cirF[o.cirB-1] = nb;
						return //CSout
					}
					if(ckey=='cn'){
//orb/circle/cn
						//we want to make sure op[0] points to a valid value here....!!!!
						o.cirB = op[0];
						return
					}
					if(ckey=='mirror'){
// ?>>orb/circle/mirror
//mirror pretty much requires op because... what could mirror do on the left side RS? ... one sec $/circle/mirror>> ... maybe an instruction
//to copy a beat
						var mirror = {
							is:'circle', radius:o.cirS.radius,
							x:o.cirS.x,//+window.innerWidth/2,
							y:o.cirS.y,//+window.innerHeight/2,
							inside:o.cirS.inside,
							r:o.cirS.r, g:o.cirS.g, b:o.cirS.b, a:o.cirS.a,
							layer:o.cirS.layer
						}
						//Mirror(op[0],mirror,o.cirL);
						var sm = Mirror(op[0],mirror);//,o.imgL);
						if(sm.layer==0){visual_q0.push(sm);} 
						if(sm.layer==1){visual_q1.push(sm);}
						if(sm.layer==2){visual_q2.push(sm);}
						o.o=op[0];
						return

					}//mirror
				}
			}//circle

			if(cont=='rectangle'){
				if(o.rectangle){
					if(ckey=='x'){
//orb/rectangle/x
						o.rectS.x=op[0]; return
					}
					if(ckey=='y'){
//orb/rectangle/y
						o.rectS.y=op[0]; return
					}
					if(ckey=='run'){
//orb/rectangle/run
						if(pol==0){
							o.rectR=op[0];
							return //[o.rectR]
						}else{
							var run = ['off','once','loop','repeat']; 
							var n = run.indexOf(o.rectR);
							var res = n+pol;
							if(res>=run.length){res--;} 
							if(res<0){res++;} 
							o.rectR=run[res];
							return //[run[res]]
						}
					}
					if(ckey=='current'){
//orb/rectangle/current
					//in here we need to transform text beat format into beat array
						var nb = txtToB(op[0]);
						o.rectF[o.rectB-1] = nb;
						return //CSout
					}
					if(ckey=='cn'){
//orb/rectangle/cn
					//we want to make sure op[0] points to a valid value here....!!!!
						o.rectB = op[0];
						return
					}

					if(ckey=='mirror'){
// ?>>orb/rectangle/mirror
						var mirror = {
							is:'rect', 
							x:o.rectS.x, y:o.rectS.y, w:o.rectS.w, h:o.rectS.h,
							inside:o.rectS.inside,
							r:o.rectS.r, g:o.rectS.g, b:o.rectS.b, a:o.rectS.a,
							layer:o.rectS.layer
						}
						//Mirror(op[0],mirror,o.cirL);
						var sm = Mirror(op[0],mirror);//,o.imgL);
						if(sm.layer==0){visual_q0.push(sm);} 
						if(sm.layer==1){visual_q1.push(sm);}
						if(sm.layer==2){visual_q2.push(sm);}
						o.o=op[0];
						return

					}//mirror
				}
			}

			if(cont=='osc'){
				if(o.oscillator){
					if(ckey=='run'){
						if(pol==0){
							o.oscR=op[0];
							return //[o.oscR]	
						}else{
							var run = ['off','once','loop'];//,'loop','repeat']; 
							var n = run.indexOf(o.oscR);
							var res = n+pol;
							if(res>=run.length){res--;} 
							if(res<0){res++;} 
							o.oscR=run[res];
							return //[run[res]]
						}
					}
//osc are different. 
					//...
					if(ckey=='current'){

					}
					//...
					if(ckey=='cn'){

					}
				}
			}//osc

		}

		//if we return here we save from asking unnecesary stuff
		return 'end'
	}

	if(SS.length==4){
		if(ent){

		}
		if(o){
			var cont = SS[1]; var ckey = SS[2]; var sub = SS[3];
			// o , pol, op , cont, ckey, sub . we are retrieving here CS[1] is cont , CS[2] is ckey

			if(cont=='text'){
				if(o.txtLi){
					if(o.txtLi.length==0){return 'end'}//nothing here

					if(ckey=='last'){

						var lastl = o.txtLi[o.txtLi.length-1];
					//this one also untested
						if(lastl==undefined){return 'end'}

						if(sub=='beats'){
// ?>>orb/text/last/beats
//we want to rewrite all beats. so we clear and use op array to fill it up .. actually we need to transform RSout into beats.
//So loop RSout elements and run txtToB on each one of them. Beats expects beat formated texts, any number of lines. we need  a safe
//changes on beats are permanent. 
							var nba = [];
							for (var i = 0; i <= op.length-1; i++) {
								var rsob = txtToB(op[i]);
								nba.push(rsob);
							}
							lastl.beats = nba;
							lastl.tB = 1;//////////!!!!!!!!!!!!!!!!!!!
							//o.o=RSout;
							return
						}
						if(sub=='cn'){
// ?>>orb/text/last/cn
//We want to change the current beat on line form. This command should only accept a number, no less than 0 and not higher than the line
//beats.length. needs adjustments!!!!!
							lastl.tB = op[0];
							//o.o = RSout[0];
							return
						}

						if(sub=='mirror'){
// ?>>orb/text/last/mirror
//sowhen we mirror last night, even tho we selected a different line, it didnt mirror the line selected , but kept blinking,
//mirror line kept blinking on text/1. we need to clarify what is cn and current
							var mirror = {
								is:'txt',
								txt:lastl.txt,
								font:'18px Courier New', //do we need font here.. ?
								align:'left', //by default could be left
								x:o.txtX,//+window.innerWidth/2,
								y:o.txtY,//+window.innerHeight/2,
								r:lastl.state.r, g:lastl.state.g,
								b:lastl.state.b, a:lastl.state.a,
								layer:lastl.state.layer
							}
							Mirror(op[0],mirror);//,o.txtL);
							var sm = Mirror(op[0],mirror);//,o.imgL);
							if(sm.layer==0){visual_q0.push(sm);} 
							if(sm.layer==1){visual_q1.push(sm);}
							if(sm.layer==2){visual_q2.push(sm);}
							o.o=op[0];
							return

						}//mirror

					}//last

					if(ckey=='current'){
						var currl = o.txtLi[o.txtB-1];
					//i think this makes sense but maybe its breaking something.. not sure. need more testing
						if(currl==undefined){return 'end'}

						if(sub=='beats'){
// ?>>orb/text/current/beats 
							var nba = [];
							for (var i = 0; i <= op.length-1; i++) { // lenght-1?
								var rsob = txtToB(op[i]);
								nba.push(rsob);
							}
							currl.beats = nba;
							currl.tB = 1;//////////!!!!!!!!!!!!!!!!!!!
							//o.o=op;
							return

						}
						if(sub=='cn'){
// ?>>orb/text/current/cn
							currl.tB = op[0];
							//o.o = op[0];
							return
						}
						if(sub=='mirror'){
// ?>>orb/text/current/mirror
							var mirror = {
								is:'txt',
					//when we select current line with no text it throws error
								txt:currl.txt,
								font:'18px Courier New', //do we need font here.. ?
								align:'left', //by default could be left
								//x:o.txtX,//+window.innerWidth/2,
								//y:o.txtY,//+window.innerHeight/2,
								x:currl.state.x,//+window.innerWidth/2,
								y:currl.state.y,//+window.innerHeight/2,
								r:currl.state.r, g:currl.state.g,
								b:currl.state.b, a:currl.state.a,
								layer:currl.state.layer
							}
							Mirror(op[0],mirror);//,o.txtL);
							var sm = Mirror(op[0],mirror);//,o.imgL);
							if(sm.layer==0){visual_q0.push(sm);} 
							if(sm.layer==1){visual_q1.push(sm);}
							if(sm.layer==2){visual_q2.push(sm);}
							o.o=op[0];
							return
							//Mirror(op[0],mirror,o.txtL);
							//return

						}//mirror

// ?>>orb/text/current/1..2..3.. 
						var rln = parseFloat(sub);//we need to turn RS[2] into a number
						let nan = isNaN(rln);
						if(nan){return 'end'}
						if(rln>currl.beats.length){return 'end'}
						var nb = txtToB(op[0]);
						currl.beats[rln-1] = nb;
						//o.o = nb;
						return

					} 

					/////////
					var rln = parseFloat(ckey);
					var nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>o.txtLi.length){return 'end'}
					var irl = o.txtLi[rln-1];
					//maybe irl is undefined... posible error
					//irl holds the whole line now...
					if(sub=='beats'){
// ?>>orb/text/1..2..3../beats 
						var nba = [];
						for (var i = 0; i <= op.length-1; i++) {
							var rsob = txtToB(op[i]);
							nba.push(rsob);
						}
						irl.beats = nba;
						irl.tB = 1;//////////!!!!!!!!!!!!!!!!!!!
						//o.o=RSout;
						return
					}
					if(sub=='cn'){
// ?>>orb/text/1..2..3../cn 
						irl.tB=op[0];
						//o.o = RSout[0];
						return
					}
					if(sub=='mirror'){
// ?>>orb/text/1..2..3../mirror
						var mirror = {
							is:'txt',
							txt:irl.txt,
							font:'18px Courier New', //do we need font here.. ?
							align:'left', //by default could be left
							x:o.txtX,//+window.innerWidth/2,
							y:o.txtY,//+window.innerHeight/2,
							r:irl.state.r, g:irl.state.g,
							b:irl.state.b, a:irl.state.a,
							layer:irl.state.layer
						}
						Mirror(op[0],mirror);//,o.txtL);
						var sm = Mirror(op[0],mirror);//,o.imgL);
						if(sm.layer==0){visual_q0.push(sm);} 
						if(sm.layer==1){visual_q1.push(sm);}
						if(sm.layer==2){visual_q2.push(sm);}
						o.o=op[0];
						return
						//Mirror(op[0],mirror,o.txtL);
						//o.o=RSout; 
						//return

					}//mirror
// ?>>orb/text/1..2..3../1..2..3.. 
					var rln = parseFloat(sub);
					var nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>irl.beats.length){return 'end'}
					irl.beats[rln-1] = op[0];
					o.o = op[0];
					return
				}//o.txtLi 
			}//text

		}
	
	}
//if we are here, it means operation wasnt succesful
	return 'end'
	
}//putRiValue


//string beat text to array beat. neat . ok but we need to consider the random asignment sinthax '..12-23'
//r,123,g,225,b..
const txtToB = function(txt){
	var beat = []; 
	var ba = txt.split(','); var len = ba.length-1;
	for (var i = 0; i <= len; i++) {
		var nv = parseFloat(ba[i]); let numba = isNaN(nv);
		if(numba==false){
			beat.push(nv)
		}else{
			//.. here we could have '..'... but this is good okoko one sec
			beat.push(ba[i]);
		}
	}
	return beat
}


//COMMAND ANNALIZER PEAK
const comA = function(S,C){ 

//If we use ':' at left side of '>>', we can make multiple lines to go into a container. space is used to split into lines so
//text must be properly formated to be picked by the system. returns and array with multilines on left side
	if(C[0]==':'){
// :multiliner>>RS
	//we probably want the last line to be '>>something' and be its own line.
		var ml = C.substr(1);
		var mla = ml.split(' ');
		var RS = mla.pop();
		var RSml = RS.substr(2);
		var res = putRiValue(mla,RSml,S,0);
		return res //return end if operation wasnt succesful

	}

//main split. if an operation is successful, we simply return, if we cant find the caster or the target, we return 'end' , so the
//instruction after '<>' if any, wont be executed
	var MS = C.split('>>');
	if(MS.length>1){

//check for '#'. this will return LS and RS , left side and right side. 
		//
//PEAK '#'
//hashtag should allow everything in between '#' and the last '>>' . Literals require at least 1 '>>' . A command line starting
//with '#' can be used to change any container or key value after '>>'. it produces LSout. working perfectly
//what if we say '#sfverbdbdsrs>>#sfbdrsves#sdvdbdvfsvfsvrsi'.. i think this also works.
		//
//ok i think we can make # work with multiple <> but it will take a bit of effort so.... !!!!!!!1 maybe later i want to check other
//stuff now
		if(MS[0][0]=='#'){
			if(MS.length==2){ 
	// there is 1 '>>'
				var LSout = [];
				var lit = MS[0].substr(1); var litn = parseFloat(lit);
				var nan = isNaN(litn);
				if(nan){LSout.push(lit);}else{LSout.push(litn);}
			}
			if(MS.length>2){
	//we want to make LSout into everything until the last '>>'.. and RS must be the last '>>'
				var RSh = MS.pop();
				var LSo = MS.join('>>');
				var rmhash = LSo.substr(1);
				var LSout = [rmhash];
				MS[1]=RSh;
			}

//we now only need to check if we can put the value of LS into RS. so we need to evaluate RS as a put.
//might be : ~/cont  , orb/cont , orb/cont/key , orb/cont/key/sub
//.. then again. what stops us from processing MS[1] with getLeValue first?... wait..no
			var res = putRiValue(LSout,MS[1],S,0);
			return res //return end if operation wasnt succesful

		}//#

//if no  '#', we check for left side. 
//check toggle here.. polarity
//.. we could also say +234>>? . its not dificult to implement from here. incresing by number like this is probably going to be
//used a lot but it might be messy
		var pol = 0;
		if(MS[0][0]=='+'){var pol = 1;}
		if(MS[0][0]=='-'){var pol = -1;}

//check if its a signal... well we could simply ask if there is '/' on MS[0].. signals dont have '/' on left side
//... so we could simply  : var RSout = getLeValue(MS[1],S); and use RSout as target... instead of literal MS[1]..!!!!!!
//so signals could use extracted values from other containers as targets or evenliterals: signal>>orb/text/1 , signal>>#orbname/aspect
//comRiTarget now would evaluate the literal content on RSout to check if its a valid target .. wait . example:
//signal>>#orb/text/x .. should signal work on orb text x or orb/text/x value? well since the system know its a signal, it should
//use the string composition and not the value.. but if we feed orb/text/x into getLeValue, it will return the value..
//...
//and also, # on the right side does look confusing
//... how else could we do it... well maybe we can just use text data to check. orb/text/1==orb/name<>#once>>orb2/script/run
//.noup this does not allow us to use a text line to work with signals
//yeah no we dont want target to be processed with getLeValue, its too messy.. or is it not.. if not then we still need a way
//to use a list of orbs to send signals to..
//It all comes to what signals expect
		//
//btw polarity could simply be regarded as a signal. '+' , '-' and we could do '+20' or '-100'. .. so it follows, +20>>orb/text/x ,
//-100>>~/y ... this would render directioncommands kinda obsolete.. because we do want orb/text/parameter to be accesible
//and makes sense to use signals to change these directly
		if(pol==0){
			var MSS = MS[0].split('/');
			if(MSS.length==1){
				//return comRiTarget(MS[0],MS[1],S);
				var res = comRiTarget(MS[0],MS[1],S);
				//if end, return end, if done , return, if getv , continue
				if(res=='end'){return 'end'}
				if(res==undefined){return}
				if(res=='getv'){}
			}

//if we get here, its a retrieve not a signal .We divide using '/' on getLeValue. it should return LSout .
			var LSout = getLeValue(MS[0],S);
			if(LSout=='end'){return 'end'}
		}

		var res = putRiValue(LSout,MS[1],S,pol); //yeah this is ok because if pol is not 0 , LSout can be undefined, we dont use it
		return res

	}//'>>'

//conditions
	var MS = C.split('=='); //... ok its also working
	if(MS.length==2){
//check for '#'. 
		if(MS[0][0]=='#'){
			if(MS.length==2){ 
	// there is 1 '=='
				var LSout = [];
				var lit = MS[0].substr(1); var litn = parseFloat(lit); var nan = isNaN(litn);
				if(nan){LSout.push(lit);}else{LSout.push(litn);}
			}

		}else{
			var LSout = getLeValue(MS[0],S);
		}

		var RSout = getLeValue(MS[1],S);
//check for left side as retrieve value.  check right side also as retrieve value. compare
		//problem here is... arrays cant be compared... but maybe we can turn these outs into strings and just compare them
		//.. and yes we can. no problem
		var lsout = LSout.toString();	var rsout = RSout.toString();
		if(lsout==rsout){return}else{return 'end'}
		
	}// '=='

//if we still here, its an entity command with no '>>' nor '=='. It might also be a retrieve with or without '/' to be
//printed into the current stance orb if text aspect activated
	var com = getCom(C);
	if(com){return}
	var ret = getLeValue(C,S);
	if(ret=='end'){return 'end'}
	if(ret){
		var o = Fting(Orbs,'name',S);
		if(o){
			if(o.text){
//op generated here is directed by default into the current stance orb text . no '>>' 
//...put data on orb text if aspect activated
				o.txtLi = [];
				for (var i = 0; i <= ret.length-1; i++) {
					var text = ret[i];
					var Line = DataLine();
					Line.beats=dsignat;
					Line.x=o.txtX; Line.y=o.txtY;
					Line.txt=text;
					o.txtLi.push(Line);
				}
	//we also probably need to let the orb know it has new data so we might want to call.... line alignment functions
				dESpacer(o);
				return //[]  //not sure what to return here
			}
		}
	}// ret is LSout

	//if we got here, then this is not a valid command, so dont run next instruction after '<>' if any
	return 'end'


}//command annalizer PEAK





/*//r3ff
all.clear_circle = function(context,x,y,radius) {
	//var c_x = s.x+s.tx; var c_y = s.y+s.ty;
	context.save();
	context.beginPath();
	context.arc(x, y, radius, 0, 2*Math.PI, true);
	context.clip();
	context.clearRect(x-radius,y-radius,radius*2,radius*2);
	context.restore();
}
*/

//STATES
//All these states should just take a name as param. . . . its just more consistent
//that way. It can be modified at the moment of creation anyway.. using state.param = value
/*
//updates for image data state. imda stands for image data
//would be awesome to have the possibility to capture image screen at any
//moment and work on it as is using pixels
//so far,the state is the img data buffer itself.. maybe this is not rly
//convenient.it needs to be wraped in a state i think. needs rework
//.. i can imagine this being a very powerful tool to create very interesting effects. . . we l come back here later for sure.
		if(s.is=="imda"){
			//timers
			if(s.se=="w_noise"){//a tag to produce white noise
				var pix = s.data;
				var i = 0; var l = pix.length;
				while(l--){
				pix[i] = pix[i+1] = pix[i+2] = 40 * Math.random(); // Set a random gray
				pix[i+3] = 255; // 100% opaque
				i+=4;}
				ctx0.putImageData(s,s.x,s.y);
			}
		}
*/



//i should just create the image data and add some properties to let anim_func manage it
//this is an image data state . can make white noise using w_noise tag when run
//trough anim_func!!!!!!!!
//imgd state needs more versatility. we want to be able to create empty images, but also
//take screenshots from specified ctx. to copy canvas into the image and modify pixels
//as desired,create effects, etc
//unfinished..... wrap buffer into state?
/*
all.imgd_s_new = function(ctx,name,w,h){
	var s = ctx.createImageData(w,h);
	s.name = name; s.is = "f"; //s.se = "w_noise"; 
	s.x = 100; s.y = 100; 
	//s.tx = 0; s.ty = 0; s.s="imda"; 
	return s
}
*/

//DRAW functions
//translate(x,y)
//rotate(angle)
//scale(x,y)
//you can frikin flip images doing negative values with scale
//scale(-x,y) .. nice
//setTransform(xScale, ySkew, xSkew, yScale, xTrans, yTrans) //more independent changes
//transform(xScale, ySkew, xSkew, yScale, xTrans, yTrans)
//
//toDataURL()  . .?
//he HTMLCanvasElement.toDataURL() method returns a data URL containing a representation
//of the image in the format specified
//by the type parameter.



/*
//we can destructure like this
var qwe = {a:'aa', b:'bb', c:'cc'}
var {a,b,c} = qwe;
a , b and c will now be defined and hold their values on qwe. nice 
*/
//interpolation. a and b are 2 different point on a vector. t is the position we want in between the point. we can use decimals
//0.1 , returns the 10% of the distance, 0.3 returns 30% and so on
//negative values return points outside, its called extrapolation. values over 1 extrapolates to the other side
const lerp = function(a,b,t){ 
	return a+(b-a)*t;
}
//we could use this one to avoid funny numbers
const lerpe = function(a,b,t){//lerperfect
	return a*(1-t)+b*t;
}
//we can also work with 2 dimensions at once so we can feed objects with x and y coordinates into the function...
const vLerp = function(A,B,t){
	return{
		x:lerp(A.x,B.x,t),
		y:lerp(A.y,B.y,t)
	};
}
//..
//but we just want to work with x and y directly. return an object with x and y
const xyLerp = function(x1,x2,y1,y2,t){
	return{
		x:lerp(x1,x2,t),
		y:lerp(y1,y2,t)
	};
}


//we can return an array with number n of equidistant points between 2 points A and B where each returned point is an object
//with x and y coordinates . untested
const equidisLerp = function(A,B,n){
	var a = []; 
	for(let i=0;i<=n-1;i++){
		var t =i/(n-1);
		var point = vLerp(A,B,t);
		point.x=Math.floor(point.x);
		point.y=Math.floor(point.y);
		a.push(point);
	}
	return a
}

//another function from radu mariescu video about linear interpolation..!
//We generalize vLerp so we can work with all properties inside objects A and B
const vLerpG = function(A,B,t){ 
	var res ={}
	for(let attr in A){
		res[attr]=lerp(A[attr],B[attr],t);
	}
	return res
}

//a function to spawn a number between min and max.. might be simpler
const getRandom = function(min, max){return Math.floor(Math.random() * (max - min + 1) ) + min;}


//get dist.
const getDist = function(x1,x2,y1,y2){
	var vx = x1 - x2;
	var vy = y1 - y2;
	return Math.sqrt(vx*vx+vy*vy);
}

/*
all.get_dist = function(x1,x2,y1,y2){
	var vx = x1 - x2;
	var vy = y1 - y2;
	return Math.sqrt(vx*vx+vy*vy);
}
//return distance between two points on screen using x y values. this is better i think because it handles overflow and underflow?
//.. but it doesnt work so...
all.get_dist_meh = function(x1,x2,y1,y2){
	var vx = x1 - x2;
	var vy = y1 - y2;
	return Math.hypot(vx+vy);
}
*/



//a TIMER ?
//use Date.now and any other refference
//Just create an instance to loop this function when a timer is necesary. It should run on each logic loop
//.. so maybe this can help with audio stuff
/*
all.timer = function(){
	var msec = Date.now()/1000;
	var sec = msec-Math.floor(msec);
}
*/



//better yet. a function to find and return object in a specific array using specific parameter and parameter value
//a is an array, p is a parameter , and v is the value of the parameter
//needs  new name  Fting xD like, FUck teh ting lol I like it!
const Fting = function(a,p,v){var i = 0; var len = a.length; while(len--){if(a[i][p]=== v ){return a[i]}; i++;}}

//am only using all find ting
//find and return a thing directly stored on an array
//Fting2 = function(a,v){var i = 0; var len = a.length; while(len--){if(a[i]=== v ){return a[i]}; i++;}}
//find and return index of object in array
//.... there is indexOf to do exactly this. syntax is: array.indexOf(item), returns index number
//.. just keeping this one for the record
//all.find_index = function(a,obj){var i= 0;var len = a.length; while(len--){if(a[i]=== obj){return i}; i++;}}
//just find a ting inside an array and return an object with a reference to the ting and its index on that same aray
//ting:  i:
//all.find = function(a,p,v){var i = 0; var l = a.length; while(l--){if(a[i][p]=== v ){var found = {ting:a[i], i:i}; return found}; i++;}}
//find an object on an array with a property
//all.find_property = function(a,p){var i = 0; var l = a.length; while(l--){if(a[i][p]){ return a[i]}; i++;}}



//HTML IMG FILE UPLOAD EVENT
//input_img html element can deal with images to load from client side. img_in
//input_audio html element can deal with sound to load from client side. audio_in
//.. i forgot what to do when i want to request files from server lol
//
//listen for change events on img_in and audio_in
//When user enters the load command, simulate a click on the input and let user  select the file.
//This function should let user know the file is loading. Once finished, it should store the file buffer somewhere accesible.
//
//we only want to change where the buffers are stored in. We want fast access for memories. For now, we l just make all files
//available for any memory.!!!!!!!!!!!!!!!!!!
const handleImgFile = function(){
	var selectedFile = img_in.files[0];//access file 0 from selected files array
	if(img_in.files[0]==undefined){console.log("No File Uploaded"); return}
	var reader  = new FileReader();
	reader.onload = function(ev)  {
		//all.stream_a.push('Image file successfully loaded.');
		//all.screen_log();
		//var orb = Fting(all.up_objs, "u_in_contrl", true);
		//stance.img_access = all.img_adder(ev.target.result) //result is the property
		var img = new Image(); img.src=ev.target.result;
		//stance.img_access = img;
/*
//UPDATE THIS FOR PEAK PERFORMANCE
*/
		var imageobj = {
			//file:selectedFile,
			name: selectedFile.name, size: selectedFile.size, type: selectedFile.type,
			img:img
		}
		LImg.push(imageobj);
		//let orb have a parameter to store its currently loaded img file data
		//stance.current_img_file = {
		//	name: selectedFile.name,
		//	size: selectedFile.size,
		//	type: selectedFile.type
		//}
		
	}
	reader.readAsDataURL(selectedFile);// you have to declare the file loading

	//
	//all.stream_a.push(selectedFile.name+"  "+selectedFile.size+"  "+selectedFile.type);
	//all.screen_log();
	//console.log(selectedFile.name+"  "+selectedFile.size+"  "+selectedFile.type);//name, size, type of the file
	//type string is empty is file cant be determined
}
//EVENT
img_in.addEventListener("change", handleImgFile);

//AUDIO
//return a buffer into controled orb.audio_access using a file loaded by user
//it needs to be located on a BufferSource
const handleAudioFile = function(){
	var selectedFile = audio_in.files[0];//access file 0 from selected files array
	if(audio_in.files[0]==undefined){
		//all.stream_a.push("No File Uploaded"); all.screen_log(); return
	}
	var reader = new FileReader();
	reader.onload = function(ev){
		//all.stream_a.push('Audio file successfully loaded.');
		//all.screen_log();
		//var orb = Fting(all.up_objs, "u_in_contrl", true);
		all.au.decodeAudioData(ev.target.result).then(function(buffer) {
	//then pattern i havent studied that, good 4 promises i think. but i can call
	//this later
			//buffer should be stored on the orb, createBufferSource should be
			//called when audio is going to be played
			//
			//audio_access could be an array of many files
			//stance.audio_access = buffer;
			var audiobj = {
				name: selectedFile.name, size: selectedFile.size, type: selectedFile.type,
				buffer:buffer
			}
			LAudio.push(audiobj);

    			//var soundSource = all.au.createBufferSource();
			//soundSource.buffer = buffer;
			//orb.audio_access= soundSource;
		});
	}
	reader.readAsArrayBuffer(audio_in.files[0]);	// you have to declare the file loading
	//all.stream_a.push(selectedFile.name+"  "+selectedFile.size+"  "+selectedFile.type);
	//all.screen_log();
}
//EVENT
audio_in.addEventListener("change", handleAudioFile);






//needs massive update..
/////////PHONE users
//bro study this for phone

/*	
//Learn about touchevents for phone interface   .  .  .
//First thing i definitely have to learn is to prevent touch default behavior of scrolling around like crazy. //DONE
//idek how, i ujst added some html css stuff, whatever
//
//So when user touches screen, i want interface command buttons to appear . their position and function will depend on the user current
//stance and situation.. maybe command interface should just always be listening for phone users, it doesnt make sense
//to waste a touch to call interface command, interface should already be there and a touch just call the desired command.
//
//... but i want the screen to be clean . i only want button to pop up when user touched something.
//Actually , the buttons will be determined by what the user touched.
//
//When command interface is activated, user can touch commands on the screen to execute them. So a touch should pass coordinates
//to a function to compare x y with x y of buttons on the screen.. use get distance . if the distance is small, then the command
//or interaction from button is called
//
//touch screen need only to ask if touch is in selectable area and run an available interaction. this is pretty straightforward.
//i might implement gestures to access subcommands

//Returns a list of all the touch objects whose state changed between the previous touch and this touch . ev.changedTouches
//Returns a list of all the touch objects that are currently in contact with the surface.  ev.touches
//The targetTouches property returns an array of Touch objects, one for each finger that is touching the current target element.
//ev.targetTouches
//The targetTouches read-only property is a TouchList listing all the Touch objects for touch points that are still in contact with
//the touch surface and whose touchstart event occurred inside the same target element as the current target element.

//Return true if all of the touches are within the target element, otherwise return false.
//return ev.touches.length === ev.targetTouches.length;
	
//holds x and y location ev.touches[0].clientX, ev.touches[0].clientY
//Returns a unique identifier for this Touch object. A given touch point (say, by a finger) will have the same identifier for the
//duration of its movement around the surface. This lets you ensure that you're tracking the same touch all the time.
//ev.touches[0].identifier
*/


///////////////////////////////////

//Ok so user can touch 3 things
//buttons, edits active point and background
//edits active points do specific things and background call buttons
//eap might run a special operation command
//user can asign commands to buttons. buttons have limited gestures. simple touch,
//drag to change button place and long_press
//users can create  buttons by asigning commands with custom interface
//act language asigns data changes on edits active points with more elaborated gestures
//background can be void, inner mode, or edit modes. each have its own memory? husks have no memory
//void_tch for void, orbin_tch for inner mode on idling,
//img_etch , txt_etch, rect_etch and so on?

//touchstart locates a touched state or background and pushes an object gesture with
//id and first coordinate. then pushes thething into all.touches_a
//touchmove pushes all coordinates to the respective touch and
//touchend pushes end . states hold data on s.tch , s.ges, s.com, s.ges_call

//a function to create buttons . needs colors as well
//parameters;ctx, name, command, com1 for long press touch,
//X, Y, text boolean, persist/desist
const CreateBt = function(ctx, name, com1, com2, X, Y, text, persist){
	var bt_obj = {};

	var bt = all.circle_s_new(name+'_bt'); 
	bt.is="circle"; bt.ctx=ctx;  //
	bt.tx=X; bt.ty=Y; bt.inside = "filled"; bt.radius=22;
	bt.r=80; bt.g=80; bt.b=80; bt.a=0.8; 
	bt.tch='bt'; bt.ges=[]; //bt.command=command;
	bt.com1=com1;
	bt.com2=com2;
	bt.persist=persist;
	bt_obj.bt = bt;
	//also create a txt to be inside the button..if requested?
	if(text){
		var btxt = all.txt_s_new(name+'bt_txt');
		btxt.ctx=ctx; btxt.tx=X; btxt.ty=Y;
		btxt.r=220; btxt.g=220; btxt.b=220; btxt.a=1; 
		btxt.txt=name; btxt.se ='bt_txt'; btxt.font='18px Courier New';
		btxt.align='center';
		btxt.is='txt';
		bt_obj.txt = btxt;
	}
	return bt_obj
}//create_bt


//touch HANDLERS EVENT
const tstart = function(e){
//so far so good.
	//this avoids creating insane amounts of touches? noup
	//if(e.touches.length>2){e.touches.splice(2);}
	//if(e.touches.length>2){console.log(all.anim_a.length);}//nothing
	
	if(chatOn){return}

	e.preventDefault();//
//really fun bug ahead.. solved
//for some reason, touchmove keeps adding touches. i l just process first 2 
//and ignore the rest.. maybe i l consider 3 touches later
	//console.log(e.touches.length);

	var tl = 2;//touch limit  to process
	while(tl--){//test
		var touch = e.changedTouches[tl];
		if(touch){
		//			
			var nvt = undefined;
		
			var clX = Math.floor(touch.clientX);
			var clY = Math.floor(touch.clientY);
		
			var l = all.anim_a.length;
			while(l--){
				var s = all.anim_a[l]; 
		//bt already ting
				if(btAlr){
					if(s.tch=='bt'){
						var dist = getDist(clX,s.tx,clY,s.ty);
						if(dist<22){
							s.gesID=touch.identifier; s.gesEND=false;
							s.ges=[{X:clX, Y:clY}]; s.gesPRESS=0;
							s.tchev=true;
							var nvt=true;
							//break for button
							break
						}
					}
				}else{	//button priority
		
//any other state that needs tch interaction just needs tch property defined.. hm
					if(s.tch=='prim'){
						var dist = getDist(clX,s.tx,clY,s.ty);
						if(dist<22){
							s.gesID=touch.identifier; s.gesEND=false;
							s.ges=[{X:clX, Y:clY}]; s.gesPRESS=0;
							s.tchev = true;
							var nvt=true;
							//break from prim
							break
						}
					}//prim
					
					//k
//k could really benefit from calling osc right from here. we want these to act as
//fast as posible
					if(s.tch=='k'){
						var dist = getDist(clX,s.tx,clY,s.ty);
						if(dist<22){
///*
////////////
//lets make this faster... eh.. well .. i l think about something later..
//maybe touch hardware cant go faster? just a hunch
							var co = all.up_objs[0];
							var l = co.osc.length;
							while(l--){
								var a_a = co.osc[l];
								if(a_a.name==s.asigned_osc){
									break
								}
							}
						//use co and a_a
							a_a.on_a[0]=all.au.currentTime;
							var a_s = all.osc_s(all.au, a_a.name+"_"+a_a.on_a[0], a_a);
					//osc control params check later..
							a_s.gain_n.gain.value= 0.001;  //0.001 
							a_s.gain_n.gain.setTargetAtTime(
								a_a.gain, all.au.currentTime, 0.08  //0.06
							);
							a_s.tid=touch.identifier;
							all.anim_a.push(a_s);
/////
//*/
						/*
							s.gesID=touch.identifier; s.gesEND=false;
							s.ges=[{X:clX, Y:clY}]; s.gesPRESS=0;
							s.tchev = true;
						*/
							var nvt=true;
							//no break for k  
						}//dist match
					}//k

				}// no bt already else
			}//anim_a loop
			
		//touches data and push the thing into touches_a
			if(nvt==undefined){
//maybe i need to ask if already exists since this mightbe a second orthird
//touch on bg ... same goes with states. but these could be managed independently..
//issue will arise when these same2 touches meet the same anim state probly if i simply
//use a permanent bg state. each state should always handle one id
		
				var bgalr = Fting(all.anim_a, 'gesID', touch.identifier);
				if(bgalr){
					//
					//bgalr.is='rm';//this works but just splice instead?
					var index = all.anim_a.indexOf(bgalr);
					all.anim_a.splice(index, 1);
					
					var bgs = {
						tch:'bg',
						ges:[{X:clX, Y:clY}],
						tchev:true, gesID:touch.identifier,
						//gesX:clX, gesY:clY, 
						gesPRESS:0, gesEND:false
					}
			
					all.anim_a.push(bgs);
					//console.log(all.anim_a.length+'.... well shiet');//fun bug washere
					
				}else{
					var bgs = {
						tch:'bg',
						ges:[{X:clX, Y:clY}],
						tchev:true, gesID:touch.identifier,
						gesPRESS:0, gesEND:false
					}
			
					all.anim_a.push(bgs);
					
				}
			}//nvt ting
			
		}//changed touch item is defined
	}//test
	
}//tstart

const tmove = function(e){
	//this avoids creating insane amounts of touches.. no this doesn do anything
	//if(e.touches.length>2){
		//e.touches.splice(2);
		//console.log(e.touches.length+'  insanity');
	//}

	if(chatOn){return}

	e.preventDefault();//

	var tl = 2;//touch limit  to process
	while(tl--){
		var touch = e.changedTouches[tl];
		if(touch){

			var clX = Math.floor(touch.clientX);
			var clY = Math.floor(touch.clientY);
	
			var l = all.anim_a.length;
			while(l--){
	//so in new sys just loop anim_a again & search for id...
				var s = all.anim_a[l];
				//var s = all.touches_a[l];
				if(s.tchev){
					//if(touch.identifier==s.ges[0].id){
					if(touch.identifier==s.gesID){
						//s.gesX=clX; s.gesY=clY; 
						s.ges.push({X:clX, Y:clY});
						//s.tchev=true;
						break
					}
				}
			}// loop
		}//touch
	}//t limit to process
	
}//tmove

const tend= function(e){
//let touch clear up and hide input box?. no, sacrifice this comodity for
//easy implementation

	//this dont seem to do much
	//if(e.touches.length>2){e.touches.splice(2);}

	if(chatOn){return}

	e.preventDefault();//

	var tl = 2;//touch limit  to process
	while(tl--){
		var touch = e.changedTouches[tl];
		if(touch){

	//;[...e.changedTouches].forEach(touch =>{
//loop touches_a to determine what to do with touched states.. no. evaluation needs
//to go on a different instance... ? are you sure about that..
//touch end should simply add data into gesture.

			var l = all.anim_a.length;
			while(l--){
				var s = all.anim_a[l];
///*
///////faster!!!!
				if(s.tid!=undefined){ //only k has tid
					//console.log('tid real?');//yeah its real
					if(s.tid==touch.identifier){
						//s.osc_n.stop(); s.osc_n.disconnect(); s.is="rm";
						//if loop...
						s.end="fade";
						//a_s.name=undefined;
						//if rec on then..
					}
				}

//////////
///*/
				if(s.tchev){
					if(touch.identifier==s.gesID){
						//console.log(tl+' '+s.gesID);
						s.gesEND=true;
						break
					}
				}
			}//while
		
		}//limited touches
	}//t limit

}//tend

const tcancel= function(e){
	//return
	//if(e.touches.length>2){e.touches.splice(2);}

	if(chatOn){return}

	e.preventDefault();//
	
}//tcancel

//DEBUG version commands
//In order to use eruda we need	to be able to add and remove touch listeners on the run.
//a function to add all touch listeners and input box system events at once
const NS = function(){//normalize system
	document.addEventListener("touchstart", tstart,{passive:false})
	document.addEventListener("touchmove", tmove,{passive:false})
	document.addEventListener("touchend", tend,{passive:false})
	document.addEventListener("touchcancel", tcancel,{passive:false})
	
	window.addEventListener('keydown', kdown);
	window.addEventListener('keyup', kup);
	
	heartBeat =	setInterval(update,60); //100 //70

}		


//needs a lot of updates and rethinking... 	
//TOUCH updates
//tips:
//console.log('Touches', e.touches.length)//all touches
//console.log('Targets', e.targetTouches.length)//touches on document(target)
//console.log('Changed', e.changedTouches.length)//changed touches.. usually just one
//console.log(e);
//console.log('pageX:'+touch.pageX.toFixed(), 'screenX:'+touch.screenX.toFixed());
//all.stream_a.push('id: '+touch.identifier+' X:'+touch.screenX.toFixed()+' Y:'+touch.screenY.toFixed()); all.screen_log();

//at every update we check for touches states data and determine what gesture was made. then we check for what command to run acording
//to such gesture. 

//even from here, and double touch, we need to consider t counter and use seq length
//directly to process multitouch.. would be cool to be able to process even 4 or 5 touches
//a big touchscreen could run a script game to play with friends irl next to each other
//:)
//.. maybe we dont even need seq... nah its good
//unfinished....

all.c_tch = function(){

	var seq =[]; //
	var t_counter = 0;//this fixed ting mostly. count touches.. hmm not now
	var l = all.anim_a.length; 
//all this loop does is synch press counter with heartbeat while picking touched states
//from anim_a to process them by pushing them into seq
	while(l--){
		var t = all.anim_a[l];
/*
		if(t_counter==2){
//2 touches and 2 ends at same time need to go in here
			if(seq[0].gesEND==true&&seq[1].gesEND==true){
				console.log('double end, pretty epic');
				seq[0].is='rm';
				seq[1].is='rm';

			}//double t
			break
		}//t limit
*/
		if(t.tchev==true&&t_counter<2){//eval tag . remove on end
//...instead of ges, use a diferent tag to look for... run this on allstates tagged.
//remove tag only if there areno more on-going touches
//.. i dont really need to push so much stuff here, i just need to push touched things
			t.gesPRESS++;
			seq.push(t);
			//.. seq length will always be same as t counter...  t counter is redundant
			t_counter++;
			
		}//tchev
	}//anim_a loop
	

//log tests
/*
//swipe control. if tch is not bg we need to make swiped flag into false after use
	if(seq.length==3){
		if(seq[0].ges.length>5){seq[0].swiped = true;}
	}

//1 tch
	if(seq.length==4){

		all.stream_a.push(
			seq[0].gesID//id
			+' '+seq[1]//press
			+' '+seq[2]//pos
			+' '+seq[3]//end
		);

//eval phase should go after operations.. but bg state can simply be removed.. here tho?
		if(seq[0].tch=='bg'){
			seq[0].is='rm';
			all.stream_a.push(all.anim_a.length);
		}
		


	}//1
	
	//2 tches
	if(seq.length==7){
		//console.log(seq)
		//first tch was lifted
		if(seq[3]=='end'){
			all.stream_a.push(
			seq[0].gesID//id
			+' '+seq[1]//press
			+' '+seq[2]//pos
			+' '+seq[3]//end
			+' | '+seq[4].gesID//id
			+' '+seq[5]//press
			+' '+seq[6]//pos
			);
			
			if(seq[0].tch=='bg'){seq[0].is='rm';}
			all.stream_a.push(all.anim_a.length);

		}
		
		//second tch was lifted
		if(seq[6]=='end'){
			all.stream_a.push(
			seq[0].gesID//id
			+' '+seq[1]//press
			+' '+seq[2]//pos
			+' | '+seq[3].gesID//id
			+' '+seq[4]//press
			+' '+seq[5]//pos
			+' '+seq[6]//end
			);
			
			if(seq[3].tch=='bg'){seq[3].is='rm';}
			all.stream_a.push(all.anim_a.length);

		}
		
	}//2
	
*/

//we could run forEach in here..process all touches one by one. or ask for seq length
//and work with number of touches..

//.. id touches MIGHT mess up here
	//if(seq.length==1){var t0 = seq[0];}
	//if(seq[0]){var t0 = seq[0];}

	if(seq[1]){var t1 = seq[1];}
	
	//if(seq[2]){var t2 = seq[2];}

	
//what buttons to create we need to ask each stance and mode . they all need their own array which is of course, fully customizable
//users can also customize what buttons to call when they touch the background on any stance. there are default buttons as well
//so we run a loop on bg button array container and create buttons using data on arrays
//some modes have special effects with certain gestures
// its stance, tch, gesture... no.. 
//its tch, stance, gesture.. buttons and animations dont need stance. we only care
//about bg touches if we ask for stance anyway
//.. this might improve performance.. use t0 instead of accessing seq[0] so much
	//if(t0){
	if(seq.length>0){	//.. even better.
		var t0 = seq[0];
		
		if(t0.tch=='bg'){
//here goes all stances background interactions. t0 is a must, but we might want to call
//on more than 1 touch as well

//universal bg gesture to call input box or other stuff. ignores modes
			if(seq.length==2&&seq[1].tch=='bg'){
				var t1 = seq[1];

				//last of both touches indexes
				var liga = t0.ges.length-1; var ligb = t1.ges.length-1;
				//last ges of both
				var ltga = t0.ges[liga]; var ltgb = t1.ges[ligb];
				
//ok so we cant keep adding vars from here, we need to push gesturetags into the states
//keep adding gestures until an instance recognizes the sequence. if both touches end
//and no instance recognizes it then just clear all and ignore
		
				if(t0.ges.length>28){//t0swipe
					var aprev_pos = t0.ges[liga-24];
			//we only interested in Y
					var aprev_dY = (aprev_pos.Y+22); var aprev_uY = (aprev_pos.Y-22);
		
					if(ltga.Y>aprev_dY){
						gesSeq.push('down','t0');
						t0.ges=[]; //t0.ges.push({id:0});
						all.stream_a.push('t0 down'); all.screen_log();
					}
					if(ltga.Y<aprev_uY){
						gesSeq.push('up','t0');
						t0.ges=[]; //t0.ges.push({id:0});
						all.stream_a.push('t0 up'); all.screen_log();
					}
					
				}
				
				if(t1.ges.length>28){//t1swipe
					var bprev_pos = t1.ges[ligb-24];
					var bprev_dY = (bprev_pos.Y+22); var bprev_uY = (bprev_pos.Y-22);
					if(ltgb.Y>bprev_dY){
						gesSeq.push('down','t1');
						t1.ges=[]; //t[1].ges.push({id:1});
						all.stream_a.push('t1 down'); all.screen_log();
					}
					if(ltgb.Y<bprev_uY){
						gesSeq.push('up','t1');
						t1.ges=[]; //t[1].ges.push({id:1});
						all.stream_a.push('t1 up'); all.screen_log();
					}
				}
				//temporary..
				if(t0.gesEND==true||t1.gesEND==true){
				
					if(gesSeq[0]=='down'&&gesSeq[2]=='down'&&
					gesSeq[4]=='up'&&gesSeq[6]=='up'){
						var command = {is_a:"c", str:'.type:'}; all.com_a.push(command);
					}
					
					t0.is='rm';
					t1.is='rm';
					gesSeq=[]; //all.touches_a=[];
				}

				return
			}//input universal gesture
			
//void
			if(all.user.stance=='void'){
//.. now i can just ask for seq length to run specific gestures. this might prevent
//2 touch mess
				//if(seq.length==1){
				if(t0.gesEND==true){
					if(btAlr==true){var clear_bt=true;}else{
	// key_s						
						var lbt = all.user.key_s.length;
						while(lbt--){
							var b = all.user.key_s[lbt];
				//(name, command, com1, X,Y,text boolean, persist)
							if(b.X==undefined){continue}
							//b.name not b.key, ctx2 previously
							var bts = CreateBt(ctx0, b.name,b.com1, b.com2,
							b.X, b.Y, true, b.persist);
							bts.bt.reff=b;
							////add coordinates and text boolean
							all.anim_a.push(bts.bt, bts.txt);
						}//void tch list loop
						
						btAlr = true; //var end=true;
					}
				}//end
				
			}//on void

//ORB STANCE
//orb
			if(all.user.stance=='orb'){
				var co = all.up_objs[0];//controlled orb
//inner mode
				if(co.inner_mode==true){
					if(t0.gesEND==true){
//button caller could be a function..
//a simple touch on any background calls for buttons on buttons memory array
						if(btAlr==true){var clear_bt = true;}else{
							var lbt = co.inner_ks.length;
							while(lbt--){
								var b = co.inner_ks[lbt];
					//(name, com, X,Y,text boolean)
								if(b.X==undefined){continue}
								//b.name not b.key
								var bts = CreateBt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true,b.persist);
								bts.bt.reff=b;
								////add coordinates and text boolean
								all.anim_a.push(bts.bt, bts.txt);
							}//inner tch list loop
							
							btAlr = true;
						}//button call
					}//end
					
				}//inner mode
				
//radiant mode
				if(co.radiant_mode==true){
					if(t0.gesEND==true){
//button caller could be a function..
//a simple touch on any background calls for buttons on buttons memory array
						if(btAlr==true){var clear_bt = true;}else{
							var lbt = co.radiant_ks.length;
							while(lbt--){
								var b = co.radiant_ks[lbt];
					//(name, com, X,Y,text boolean)
								if(b.X==undefined){continue}
								//b.name not b.key
								var bts = CreateBt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true,b.persist);
								bts.bt.reff=b;
								////add coordinates and text boolean
								all.anim_a.push(bts.bt, bts.txt);
							}//inner tch list loop
							
							btAlr = true;
						}//button call
					}//end
					
				}//radiant mode
				
				if(co.edit_img_mode==true){
					
//this swipe module works pretty nice as an interface for displacing things on screen
//turn this one into a function to do diferent things . . .
//swipe
					if(t0.gesEND==false&&t0.ges.length>5){
						//t0.swiped = true;
						//if(co.selected_drag==false){
				//use op6 to tell if image can be scrolled
						if(co.op4==0&&co.op6==1){
							var lg = t0.ges.length-1;
							var fX = t0.ges[0].X; var lX = t0.ges[lg].X;
							var fY = t0.ges[0].Y; var lY = t0.ges[lg].Y;
//so instead of scrolling, operate on a states parameters.
							var irec = Fting(all.anim_a, "name", "rect__sel");
							var srX = irec.x; var srY = irec.y;
							var ibg = Fting(all.anim_a, "name", "img__bg");
							var sbX = ibg.x; var sbY = ibg.y;

//scroll left fX-lX
if(fX>lX){var slef=fX-lX; var nbX=sbX-slef; var nrX=srX+slef;}
//scroll right lX-fX
if(fX<lX){var srig=lX-fX; var nbX=sbX+srig; var nrX=srX-srig;}
//scroll up fY-lY
if(fY>lY){var supw=fY-lY; var nbY=sbY-supw; var nrY=srY+supw;}
//scroll down lY -fY
if(fY<lY){var sdow=lY-fY; var nbY = sbY+sdow; var nrY=srY-sdow;}
if(nbX==undefined){var nbX = sbX;}if(nrX==undefined){var nrX = srX;}
if(nbY==undefined){var nbY = sbY;}if(nrY==undefined){var nrY = srY;}
//just clear all screen bg in this case here..?when image is smaller than screen,
//it clears onlythe size of bg.. funny.. wait..
//ibg.x=nbX; ibg.y=nbY; ibg.is='img';
ibg.u_d.push('x',nbX,'y',nbY,'is','img');
ibg.is='c_img'; ibg.t=1;//!!!!!!!!!!
irec.u_d.push('x',nrX,'y',nrY,'is','rect');
irec.is='c_rect'; irec.t=1;

						}//drag is false
					}//swipe
					
					if(t0.gesEND==true){
						if(t0.ges.length>5){var clear_bt = true;}else{//
						//if(t0.swiped){var clear_bt = true;}else{//
							if(btAlr==true){var clear_bt = true;}else{
								var lbt = co.img_ks.length;
								while(lbt--){
									var b = co.img_ks[lbt];
									if(b.X==undefined){continue}//no coordinates
									var bts = CreateBt(ctx0, b.name,b.com1, b.com2,
									b.X, b.Y, true, b.persist ); //this works..
									bts.bt.reff=b;
									all.anim_a.push(bts.bt, bts.txt);
								}//inner tch list loop
								btAlr = true;
	
							}//button call	
						}//swiped

					}//end
//other gestures..
					
				}//img

				if(co.edit_txt_mode==true){
					if(t0.gesEND){
						if(btAlr==true){var clear_bt = true;}else{
							var lbt = co.txt_ks.length;
							while(lbt--){
								var b = co.txt_ks[lbt];
								if(b.X==undefined){continue}//no coordinates
								var bts = CreateBt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true, b.persist ); //this works..
								bts.bt.reff=b;
	//unshift seem to give drawing priority but ctx still messes up with text
								all.anim_a.push(bts.bt, bts.txt);
							}//inner tch list loop
							btAlr = true;
						}//button call
					}//end
				}//txt

				if(co.edit_circle_mode==true){
					if(t0.gesEND){
					//call buttons
						if(btAlr==true){var clear_bt = true;}else{
							var lbt = co.circle_ks.length;
							while(lbt--){
								var b = co.circle_ks[lbt];
								if(b.X==undefined){continue}//no coordinates
								var bts = CreateBt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true, b.persist ); //this works..
								bts.bt.reff=b;
								all.anim_a.push(bts.bt, bts.txt);
							}//circle tch list loop
							btAlr = true;
						}//button call
					}//end
				}//circle mode
			
				if(co.edit_rect_mode==true){
					if(t0.gesEND){
					//call buttons
						if(btAlr==true){var clear_bt = true;}else{
							var lbt = co.rect_ks.length;
							while(lbt--){
								var b = co.rect_ks[lbt];
								if(b.X==undefined){continue}//no coordinates
								var bts = CreateBt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true, b.persist ); //this works..
								bts.bt.reff=b;
								all.anim_a.push(bts.bt, bts.txt);
							}//rect tch list loop
							btAlr = true;
						}//button call					
					}//end
					
				}//rect mode
			
				if(co.edit_osc_mode==true){
					if(t0.gesEND){
					//call buttons
						if(btAlr==true){var clear_bt = true;}else{
							var lbt = co.osc_ks.length;
							while(lbt--){
								var b = co.osc_ks[lbt];
								if(b.X==undefined){continue}//no coordinates
								var bts = CreateBt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true, b.persist ); //this works..
								bts.bt.reff=b;
								all.anim_a.push(bts.bt, bts.txt);
							}//circle tch list loop
							btAlr = true;
						}//buttons call
					}//end
					
				}//osc mode
			
				if(co.edit_audio_mode==true){
					if(t0.gesEND){
					//call buttons
						if(btAlr==true){var clear_bt = true;}else{
							var lbt = co.audio_ks.length;
							while(lbt--){
								var b = co.audio_ks[lbt];
								if(b.X==undefined){continue}//no coordinates
								var bts = CreateBt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true, b.persist ); //this works..
								bts.bt.reff=b;
								all.anim_a.push(bts.bt, bts.txt);
							}//audio tch list loop
							btAlr = true;
						}//button call					
					}//end
					
				}//audio mode
			
				if(co.vox_mode==true){
					if(t0.gesEND){
					//call buttons
						if(btAlr==true){var clear_bt = true;}else{
							var lbt = co.vox_ks.length;
							while(lbt--){
								var b = co.vox_ks[lbt];
								if(b.X==undefined){continue}//no coordinates
								if(b.asigned_osc!=undefined){continue}//special k button
								var bts = CreateBt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true, b.persist ); //this works..
								bts.bt.reff=b;
								all.anim_a.push(bts.bt, bts.txt);
							}//vox tch list loop
							btAlr = true;
						}//button call					
					}//end
	
					
				}//vox mode
			
			//add other modes.. wait i think there are no more modes
			
			}//orb
			
//maybe i can remove bg state here...
			//if(t0.gesEND==true){
			//	t0.is='rm';
			//}

		}//bg

//k. a special button for vox
//once a button has been asigned an oscillator anim, it becomes a k button
//.. we want to be able to press many keys at same time .. sAme with animations
//.. for each touch.. yeah this loop works fine iguess
//not sure if k should only be available on vox stance so am leaving it here
//!!!!! update incoming. we want k buttons to have fast response so osc states
//are getting directly from tstart event handler. we can still process k touches
//here but differently..?
/*
		;[...seq].forEach(t =>{
			if(t.tch=='k'){
				var co = all.up_objs[0];
				var l = co.osc.length;
				while(l--){
					var osc = co.osc[l];
					if(osc.name==t.asigned_osc){var a_a = osc;}
				}
			//use co and a_a
				if(t.gesPRESS>0){
		//as long as user is pressing, run its asigned oscillator
					var a_s = Fting(all.anim_a, 'name', a_a.name+'_'+a_a.on_a[0]);
					if(a_s){
						//if loop...
					}else{
						a_a.on_a[0]=all.au.currentTime;
						var a_s = all.osc_s(all.au, a_a.name+"_"+a_a.on_a[0], a_a);
				//osc control params check later..
						a_s.gain_n.gain.value= 0.001; 
						a_s.gain_n.gain.setTargetAtTime(
							a_a.gain, all.au.currentTime, 0.06
						);
						all.anim_a.push(a_s);
					}//else s
		
				}//pressing , swipe
				
				if(t.gesEND==true){
					var a_s = Fting(all.anim_a , "name", a_a.name+"_"+a_a.on_a[0]);
					if(a_s){
						//if loop...
						a_s.end="fade";
						a_s.name=undefined;
						//if rec on then..
					}
		
					t.tchev=false; t.ges=[];
					t.gesEND = false; t.gesPRESS = 0; t.gesID = undefined;
		
				}//end
				
			}//k
			
		})
*/

//buttons
//we dont always want buttons to go away after we press them so wecan use persist
		if(t0.tch=='bt'){
			if(t0.gesEND){
				if(t0.ges.length<5){
					if(t0.gesPRESS>13){
						if(t0.com2==undefined){}else{
							var command = {is_a:"c", str:t0.com2};
							all.com_a.push(command);
						}
						var clear_bt = true;
					}else{
						var command = {is_a:"c", str:t0.com1}; 
						all.com_a.push(command);
				//PERSIST		
						if(t0.persist=='persist'){
							t0.tchev=false; t0.ges=[]; 
							t0.gesEND = false; t0.gesPRESS = 0;
							t0.gesID = undefined;
		
						}
						if(t0.persist=='desist'){
							var clear_bt = true;
							//var end = true;
						}
					}
				}else{//swipe end
					t0.tchev=false; t0.ges=[]; //t0.swiped=false;
					t0.gesEND = false; t0.gesPRESS = 0; t0.gesID = undefined;
				}
			}//end
			
//swipe
			//swipe buttons to perma relocate them
			if(t0.gesEND==false&&t0.ges.length>5){
				if(t0.reff){
					var lg = t0.ges.length-1;
					var lX = t0.ges[lg].X; var lY = t0.ges[lg].Y;
					t0.reff.X=lX; t0.reff.Y=lY;
					t0.u_d.push('tx',lX,'ty',lY,'is','circle');//!!!! tx ty?
					t0.is='c_circle'; t0.t=1;
				}//bt has reff
	//what about bt txt..
			}//swipe

		}//bt
		
		if(t0.tch=='prim'){ //prim
			if(t0.gesEND){
				//.control
				//create control button on 1 touch
//maybe prims could ask some array to create buttons like bg does... on swip,
//control bt doesnt have a bt reff to relocate itself
				var bt = CreateBt(
					ctx0, '...','.orb.'+t0.name.substr(7)+'.control',
					undefined, t0.tx, t0.ty, true,'desist'
				);
				all.anim_a.push(bt.bt, bt.txt);
	
				t0.tchev=false; t0.ges=[]; 
				t0.gesEND = false; t0.gesPRESS = 0; t0.gesID = undefined;
				
				btAlr = true;
	
			}//end
			
			//.status? could use l_press
	
		}//prim. all prims are touchable


//after process

		//1 touch
		if(seq.length==1){
			if(t0.tch=='bg'&&t0.gesEND==true){
				t0.is='rm';
				//console.log('t0 l1 done');
			}
		}//1

		//2 tches
//no matter if we lift both at same time, both touches are being processed independently
//.. we could include non bg touches by asking for gesEND first..
		if(seq.length==2){
			//first tch was lifted
			if(t0.tch=='bg'&&t0.gesEND==true){
				if(t0.tch=='bg'){t0.is='rm';}
				//console.log('t0 done');
			}
			
			//second tch was lifted
			if(t1.tch=='bg'&&t1.gesEND==true){
				if(t1.tch=='bg'){t1.is='rm';}
				//console.log('t1 done');
			}
		}//2

	}//seq > 0

//bt clear
	if(clear_bt){
		//clear buttons
		var l = all.anim_a.length;
		while(l--){
			var s = all.anim_a[l];
			
			if(s.tch=='bt'){
				//rm.tch = undefined; rm.se = undefined;
				s.u_d.push('is','rm');
				s.is='c_circle'; s.t = 1;
				continue
			}
			//remove the bt_txt
			if(s.se=='bt_txt'){
				//s.tch = undefined; s.se = undefined;
				s.u_d.push('is','rm');
				s.is='c_txt'; s.t = 1;
				continue
			}

			//all.redraw_ms=true;
		}//
		
		btAlr = false;
	}

}//all.c_tch




///////////

//am leaving this as is for now.. later i l change whatever needs change.
//sunya should be fully available offline anyway
//socket io                                     //SERVER//

/*
//a function to return a socket . use socket.disconnect() to disconnect from server
all.fast_link = function(){
	var socket = io.connect('http://192.168.43.9:8080', {'forceNew':true});
	return socket
}

//emits an object to server
all.chant = function(obj){
	all.link.emit('messages', obj);//emit is a socket function. the object returned by io.connect has it
}

//creates a socket connection to server on all.link
//These functions should be called on demand by user
//all.link = all.fast_link();


//listen to messages event from server
//socket.on('servermessages', (data) =>{
//	console.log(data);
//});

*/



///////////////////////////////////////////////////PEAK
//PEAK UPDATE
//so comA and animF are now more independant.
function update(){ //PEAK

	const t0 = performance.now();
//PEAK
//CLEAR FIRST
	if(kaoz){}else{ //A special condition that prevents all clears and unlocks Artistic potential
	//one clear. always clear the part of the canvas the user is looking
		ctx0.clearRect((eX-window.innerWidth/2),(eY-window.innerHeight/2),window.innerWidth, window.innerHeight);
	}
	if(zai){//Slowly paint everything black
		//we need to update Elid now
//update Elid graphics
		if(Elid.beats.length>0){
			beatUp(Elid.beats,Elid.B,Elid.state);
			Elid.B++;
			if(Elid.B>=Elid.beats.length+1){Elid.B=1;}
		}

		if(Elid.state.layer==0){visual_q0.push(Elid.state);}
		if(Elid.state.layer==1){visual_q1.push(Elid.state);}
		if(Elid.state.layer==2){visual_q2.push(Elid.state);}
	}

//graphics first.. graphics should simply draw, not even update frames
//Just Draw all states on all array layers and flush. then worry about counters and changes. All these things were taken care
//on the previus heartbeat already
//DRAWALL
//draw states from anim cues and then clear them. i know its 3 loops in here but the amount of items per array is distributed
//and this secures the order in which states will be drawn.
	//layer 0
	var l = visual_q0.length;
	while(l--){var s = visual_q0[l]; drawAll(s);} visual_q0=[];
	//layer 1
	var l = visual_q1.length;
	while(l--){var s = visual_q1[l]; drawAll(s);} visual_q1=[];
	//layer 2
	var l = visual_q2.length;
	while(l--){var s = visual_q2[l]; drawAll(s);} visual_q2=[];


//check sound cue
	var l = soundCue.length;
	while(l--){var s = soundCue[l]; hearAll(s,l);}


//.. we are not checking for when no beats on these elements....
//update MSp circle graphics Memory Space
	beatUp(MSp.beats,MSp.B,MSp.state);
	//So we need to check what happening with MSp.B, beatUp should not even increase MSp even. we need to do this now after
	//beatUp. This way we have more control even. a function should do a specific thing only lol
	MSp.B++;
	if(MSp.B>=MSp.beats.length+1){MSp.B=1;}
	//console.log(MSp.B);
//we could probably use a switch here on layer system
	if(MSp.state.layer==0){visual_q0.push(MSp.state);} //[B]?
	if(MSp.state.layer==1){visual_q1.push(MSp.state);}
	if(MSp.state.layer==2){visual_q2.push(MSp.state);}

//update Ecen entity center cursor
	beatUp(Ecen.beats,Ecen.B,Ecen.state);
	//So we need to check what happening with MSp.B, beatUp should not even increase MSp even. we need to do this now after
	//beatUp. This way we have more control even. a function should do a specific thing only lol
	Ecen.B++;
	if(Ecen.B>=Ecen.beats.length+1){Ecen.B=1;}
	//console.log(MSp.B);
	if(Ecen.state.layer==0){visual_q0.push(Ecen.state);} //[B]?
	if(Ecen.state.layer==1){visual_q1.push(Ecen.state);}
	if(Ecen.state.layer==2){visual_q2.push(Ecen.state);}


//these functions are more related to hardware
	if(Sstr == ' '){}else{KeysFeed();} //needs to be independant from anim_f
	repeatSys(); //this ok?

//OK SO Entry is an input from box that is a command. Ein is an input from box that is normal text. orb
//Eout is a returned value from Entry?
	//
//Entry
//..ok so the '<>' symbol is disrupting ':' multiliner sinthax, we need to fix that!!... and its still disrupting '#' as well
//.. so we need a real solution here.. when using '<>' on a # commandline it also breaks the line. but we want to be able to write
//anything, even '<>' on a literal.. #something<>something>>orb/text<>#somethingmore>>orb2/text
//IF we limit the use of ':' and '#' to lines with no '<>' , this would be far much easier.. and it would make sense because
//doing these #vsrs<>vsdrvere>>orb/text does look unnecesary. the ':' for multiliner sinthax also makes little sense to serve as a 
//conditionant for a second instruction. Yeah i think these operations dont need to consider '<>'... maybe ':' could.. but # actually
//should be able to work with '<>'? .. ok lets make it so when we use # , we cant use <> on the literal... for now.. because i cant think
//of a better solution now
	if(Entry==undefined){}else{//run entity command
		if(Entry[0]==':'){comA(stancE,Entry);}else{
			var csplit = Entry.split('<>'); //comands split .. diamond symbol
			for (var i = 0; i <= csplit.length-1; i++) { 
				var end = comA(stancE,csplit[i]);
				if(end==undefined){}else{break}
				if(i>=1){break}
			}
		}
	}


//ORBS LOOP , ENTRY, ASPECTS
//We expect orbs and single orbs instructions at the end.. we need a for loop here then because we want to push ins and outs
//solo instructions to be read and flush at the end
	//var flush=0; //a counter to flush signals at the end
	//
//... so maybe when we add these signals to Orbs then the length messes up somehow
	for (var i = 0; i < Orbs.length; i++) {

		var o = Orbs[i];
		if(o==undefined){break} //safe

//OSCILATOR ASPECT
		if(o.oscillator){
			if(o.oscR=='off'){} 
			if(o.oscR=='once'){ 
			//so do all this with every line at once.. ok lets run a test
				for (var i2 = 0; i2 <= o.oscTL.length-1; i2++) {
					var TL = o.oscTL[i2];
					//create state.. should we be doing default here? 
					var os = {
						id:Date.now(), start:0, freq:420, gain:0.7, fadein:0.2, fadeout:0.3,type:0,duration:1
					}
					//update state using tone line
					var TLr = txtToB(TL);
					timeUp(os,TLr);
					var osc = COsc(os);
					//push osc
					soundCue.push(osc);
				}
				o.oscR='off';
			}
		}	

//IMAGE ASPECT
		if(o.image){
			if(o.imgR=='off'){} 
			if(o.imgR=='loop'){ 
				beatUp(o.imgF,o.imgB,o.imgS); // o,o
				//We need to synch with orb position... . . images huh
	//well i think we want to use circle as refference ... or maybe rects . for now just circle !!!!!!!!!!!!
				//o.imgS.px=o.cirS.x; o.imgS.py=o.cirS.y;
				o.imgB++;
				if(o.imgB>o.imgF.length){o.imgB=1;}
	//layer could be on state, this way state beats could also affect layer so we can specify layer when we create mirrors.
				//if(o.imgL==0){visual_q0.push(o.imgS);} //[B]?
				//if(o.imgL==1){visual_q1.push(o.imgS);}
				//if(o.imgL==2){visual_q2.push(o.imgS);}
				if(o.imgS.layer==0){visual_q0.push(o.imgS);} //[B]?
				if(o.imgS.layer==1){visual_q1.push(o.imgS);}
				if(o.imgS.layer==2){visual_q2.push(o.imgS);}
			}
			if(o.imgR=='repeat'){ 
				beatUp(o.imgF,o.imgB,o.imgS); // o,o
				//if(o.imgB>o.imgF.length){o.imgB=1;}
	//layer could be on state, this way state beats could also affect layer so we can specify layer when we create mirrors.
				//if(o.imgL==0){visual_q0.push(o.imgS);} //[B]?
				//if(o.imgL==1){visual_q1.push(o.imgS);}
				//if(o.imgL==2){visual_q2.push(o.imgS);}
				if(o.imgS.layer==0){visual_q0.push(o.imgS);} //[B]?
				if(o.imgS.layer==1){visual_q1.push(o.imgS);}
				if(o.imgS.layer==2){visual_q2.push(o.imgS);}
			}
		}

//CIRCLE ASPECT
		if(o.circle){

			if(o.cirR=='off'){} 
			if(o.cirR=='loop'){ 
				beatUp(o.cirF,o.cirB,o.cirS); // o,o
				//We need to synch circle with orb position... . . ?
				//o.cirS.x=o.x; o.cirS.y=o.y;
				o.cirB++;
				if(o.cirB>o.cirF.length){o.cirB=1;}
				//if(o.cirL==0){visual_q0.push(o.cirS);} //[B]?
				//if(o.cirL==1){visual_q1.push(o.cirS);}
				//if(o.cirL==2){visual_q2.push(o.cirS);}
				if(o.cirS.layer==0){visual_q0.push(o.cirS);} //[B]?
				if(o.cirS.layer==1){visual_q1.push(o.cirS);}
				if(o.cirS.layer==2){visual_q2.push(o.cirS);}
			}

//we need to keep angle updated.. but we are ignoring the changes on angle. we need to update somewhere else.... we need to update
//everytime caster or target change location. Its easy to check for caster but we cant check on focused target...
	//maybe we could ask for distance. if distance from target changes, we update the angle !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//THIS BUG MAKES ABSOLUTELY NO FUCKING SENSE AT ALL
	/*
			if(o.focus!=undefined){
				var foc = Fting(Orbs,'name',o.focus);
				if(foc){
					//const getAngle = function(caX,caY,taX,taY) //caster and target
					var ang = getAngle(o.cirS.x,o.cirS.y,foc.cirS.x,foc.cirS.y);
					o.angle = ang;
				}
			}
	*/


		}

//RECTANGLE ASPECT
		if(o.rectangle){
			if(o.rectR=='off'){} 
			if(o.rectR=='loop'){ 
				beatUp(o.rectF,o.rectB,o.rectS); // o,o
				//We need to synch circle with orb position... . .?
				//o.rectS.x=o.x; o.rectS.y=o.y;
				o.rectB++;
				if(o.rectB>o.rectF.length){o.rectB=1;}
				//if(o.rectL==0){visual_q0.push(o.rectS);} //[B]?
				//if(o.rectL==1){visual_q1.push(o.rectS);}
				//if(o.rectL==2){visual_q2.push(o.rectS);}
				if(o.rectS.layer==0){visual_q0.push(o.rectS);} //[B]?
				if(o.rectS.layer==1){visual_q1.push(o.rectS);}
				if(o.rectS.layer==2){visual_q2.push(o.rectS);}
			}

		}


//TEXT ASPECT
		if(o.text){
//!!!!!!!!!!!!!!
//so now what we could do... is to make a specific parameter on text aspect to listen to specified entities or orbs
//..... you know maybe orbs should only be able to listen to 1 entity input at a  time. Ive never really liked these crazy streams
//with all ppl talking at the same time. words ppl say going fast to nowhere. ok we are not doing that here, enough already.
//what if we just run a command. '~/inline>>'+stancE+/in . So now we just check for o.i . Looks much cleaner
			if(o.iz==o.i){
				o.i=undefined;
				//and we could also clear o.o here aye... maybe not. shouldnt be bounded to this condition
				//o.o=undefined;
				o.iz=Date.now();
			} //we good
			if(o.i!=undefined){

				if(o.txtB>o.txtLi.length){
					//get the difference
					var subs = o.txtB-o.txtLi.length;
					//add DataLines difference 
					for (var i2 = 0; i2 < subs; i2++) {
						var dli = DataLine();
						dli.beats=dsignat; 
						dli.txt='';
						dli.x=o.txtX; dli.y=o.txtY;
						//o.txtLi.splice(o.txtB-1,0,dli);
						o.txtLi.push(dli);
					}
					//and place o.i text on o.txtB
					var ldli = o.txtLi[o.txtB-1];
					ldli.txt = o.i;
				}else{

					var dli = DataLine();
					dli.beats=dsignat; 
					dli.txt=o.i;//Ein;
					dli.x=o.txtX; dli.y=o.txtY;
					//this operation adds a line simply on selected place
					o.txtLi.splice(o.txtB-1,0,dli);
					//we could also replace the line from here like this:
					//o.txtLi.splice(o.txtB-1,1,dli);
		   		//but we dont want to replace the line by default when writing into a text from input.... do we
		    		//nah.. because we want to be able to quicly insert a new line in place when we are here..
				}

//so before despacer, and here, only once per heartbeat, check if last line text is '', if so then remove.
//... the idea of dividing long oerations into heartbeats sounds right. the goal is to distribute the heavy work into small steps
//that can be executed one at a time per heartbeat. its a way to prevent the pressure excess on the machine
				//havent tested this one out..
				if(o.txtLi[o.txtLi.length-1].txt==''){
					o.txtLi.pop();
				}

				dESpacer(o);

				o.iz = o.i;

			}// o.i

		//Line beats
			////.. change data for text
			if(o.txtLi.length==0){}else{ //for loops are kinda stupid
				for (var i2 = 0; i2 <= o.txtLi.length-1; i2++) {
					var OL = o.txtLi[i2]; //orb line
			//beat up needs to be universal. We want to have other words for B , because we might want to beat
			//many aspects of an orb in one update.. you are doing well
					beatUp(OL.beats,OL.tB,OL.state);
					OL.tB++;
					if(OL.tB>OL.beats.length){OL.tB=1;}
					//if(o.L==i){}
					//not sure where i want to keep txt. in state or directly in the data line structure
					OL.state.txt=OL.txt;
					//if(o.txtL==0){visual_q0.push(OL.state);}
					//if(o.txtL==1){visual_q1.push(OL.state);}
					//if(o.txtL==2){visual_q2.push(OL.state);}
					if(OL.state.layer==0){visual_q0.push(OL.state);} //[B]?
					if(OL.state.layer==1){visual_q1.push(OL.state);}
					if(OL.state.layer==2){visual_q2.push(OL.state);}
				}
			}
		}//text

//SCRIPT ASPECT
//so now we want to be able to cast more than a single command per beat. Command lines will now be separated by <>,
//for now max number of commands on the same line is 2 we just call comA on every <> split.. simple huh
		if(o.script){
//so o.o should only hold a command when we created an instruction. in here probly is the best place to clear o.o using the same
//technique we use to clear o.i . 
			if(o.oz==o.o){
				o.o=undefined;
				o.oz=Date.now();
			} 
			if(o.o!=undefined){
				o.oz = o.o;
			}
			if(o.scR=='off'){}
			if(o.scR=='once'){ 
				var RL = o.scC[o.scB-1];//item 0 is line 1. we want to use B to understand we are accessing line 1
				if(RL){
					//if(RL[0]=='#'){comA(o.name,RL);}else{
					var csplit = RL.split('<>'); //comands split
					for (var i2 = 0; i2 <= csplit.length-1; i2++) {
						var end = comA(o.name,csplit[i2]);
						if(end==undefined){}else{break}
						if(i2>=1){break}
					}
					//}
					o.scB++;
					if(o.scB>o.scC.length){o.scB = 1; o.scR='off';}
				}

			}
			if(o.scR=='loop'){ 
				var RL = o.scC[o.scB-1];//item 0 is line 1. we want to use B to understand we are accessing line 1
				if(RL){
					//if(RL[0]=='#'){comA(o.name,RL);}else{
					var csplit = RL.split('<>'); //comands split
					for (var i2 = 0; i2 <= csplit.length-1; i2++) {
						var end = comA(o.name,csplit[i2]); //o.name is the stance S
						if(end==undefined){}else{break}
						if(i2>=1){break}
					}
					//}
					o.scB++;
					if(o.scB>o.scC.length){o.scB = 1;} //o.scR='off';}
				}

			}
			if(o.scR=='repeat'){ 
				var RL = o.scC[o.scB-1];//item 0 is line 1. we want to use B to understand we are accessing line 1
				if(RL){
					//if(RL[0]=='#'){comA(o.name,RL);}else{
					var csplit = RL.split('<>'); //comands split
					for (var i2 = 0; i2 <= csplit.length-1; i2++) {
						var end = comA(o.name,csplit[i2]);
						if(end==undefined){}else{break}
						if(i2>=1){break}
					}
					//}
				}
			}

		}//script aspect	


	}//orb loop


//ALOrbs hold commands that require Orbs array to be already updated
//.. maybe this is the right instance to process signals comming from other entities.
	for (var i = 0; i < ALOrbs.length; i++) {
		var c = ALOrbs[i];
		if(c==undefined){break} //safe
		var csplit = c.com.split('<>');

		for (var i2 = 0; i2 <= csplit.length-1; i2++) {
			var end = comA(c.st,csplit[i2]);//.. ok so we are passing o.name here, 
			if(end==undefined){}else{break}
			if(i2>=1){break}
		}
	}//ALOrbs
	ALOrbs = []; //flush every heartbeat

//AND also we need to clear inout array instead of these Ein and Eout... ok we goose? no. we not goose. we want Ein and Eout

	Entry=undefined; Ein=undefined; Eout=undefined;
	
	const t1 = performance.now();

//track update time
	MSpSize = t1-t0;

}//update



/*
//I think annalyzer works only with animation request .. we are not doing that i think
	if(analyzer){
		//console.log(analyzer);
		const data = new Uint8Array(analyzer.fftSize); //array with values betw 0 and 255
		analyzer.getByteTimeDomainData(data);

		ctx0.beginPath();
		for(let i = 0; i < data.length; i++){
			const x = canvas0.width * i/data.length;
			const y = data[i];
			if(i==0){
				ctx0.moveTo(x,y);
			}else{
				ctx0.lineTo(x,y);
			}
		}		
		ctx0.stroke();
	}
*/



//SUNYA INIT
//here goes everything that needs to be run once, at the start. Ask if user is on phone
//etc, if user wants to run a tutorial
//Sunya will ask if user wishes to be introduced to sunya by an assistant. Game will
//recommend it if user is new
//When user wants to run the tutorial, it will be assumed its a new user, and so,
//Valeri Tutorial consist in telling a story and learn sunya tools by inmersing in the
//story.
//At some point we have to use what we ve learn to protect the ones we love and in
//some cases, to protect Valeri if user gets to care about her
//brainstorm..
//We see an orb being created and memories being loaded into it. we see the keys being
//stroke creating the commands; create, load. etc
//
//All images and audio files should be loaded before anything happens. ?
//
//An init game instance should ask if user is on phone or keyboard or something else
//and send js code acordingly
//am totally doing this manually since auto detecting user device looks kinda
//unreliable and i dont want to look too much into it right now.
//I l just send users to a black screen with 2 icons. If user presses Enter , it will
//send sunya for keyboard users
//If user touches the screen, it will send sunya for phone users, as simple as that
//This instance should also allow all.au to resolve Audiocontext conflict so user will
//already had interacted with the page.
//So this page should just be the same page and the phone and keyboard code should be
//part of the same js file for simplicity

///*



//SUNYA INIT
var SunyaInit = function(device, tutorial){//tutorial no need to go here
	//keyboard
	if(device=="keyboard"){

	}//keyboard

	//phone
	if(device=="touch"){

/////////////////////////////////////////////////////////////////////
//so in order to use eruda to debug i need to modularize these event listeners
		document.addEventListener("touchstart", tstart,{passive:false});
		document.addEventListener("touchmove", tmove,{passive:false});
		document.addEventListener("touchend", tend,{passive:false});
		document.addEventListener("touchcancel", tcancel,{passive:false});

////////////////////////////////////////////////////
		all.stream_a.push("Enabling touch screen interface.."); all.screen_log();
	}//touch interface


	//here goes for all devices. we are sending kdown and kup on phones as well for now
	window.addEventListener('keydown', kdown);
	window.addEventListener('keyup', kup);
	//

	//create au audio context by default
//The Audio context holds a currentTime counter that keeps growing. I should learn if this counter size affects performance and if so
//how to prevent it
	//all.au = new (AudioContext || webkitAudioContext)();
	actx = audioser();

	ctx0.translate(-eX+window.innerWidth/2, -eY+window.innerHeight/2);

//if tutorial..
//For now, i l just create Tools here because i dont want to load it every time i work on it..
//Create a vessel for Tools first memory ? nah
	

//users should be able to ask for audio files from server on demand. the shared
//folder allows for easy access. just use url as source
//on new Audio. An audio management function should  . .

//load a starting song for sunya <3
//this first audio file sent should be returned on a special object that holds audio
//files to run currently at any moment
//.. maybe valeri should hold it.. maybe an orb controled by valeri should hold it... yes.. orbs controling other orbs. .
	
	//var bg_audio = new Audio("sounds/canal olvidomp3.mp3");
	//var bg_audio_src = all.au.createMediaElementSource(bg_audio);
	//bg_audio_src.connect(all.au.destination);
	//bg_audio.play(); //dont play for now

	
//once everything is settled and the contract between user and server is done, 
//out of prerender, start sunya
//RENDER
	clearInterval(heartBeat); 
	heartBeat =	setInterval(update,60); //100 //70
	//console.time('test');

}//sunya_init SUNYA INIT



//PRERENDERING
//A pre renderind update function to wait for user to type enter or touch screen. i dont want a condition here.
var preRendering = function(){
	//after user has revealed input method, ask if sunya should send an assistant or not
	//and only then run sunya . . 

	if(all.keyboard_enabled){SunyaInit("keyboard",true);}
	if(all.touch_enabled){SunyaInit("touch",true);}
	
	//all.anim_func();
	//requestAnimationFrame(preRendering);

}//pre rendering



heartBeat = setInterval(preRendering,60);
//just add these events here?
//window.addEventListener('keydown', kdown);
//window.addEventListener('keyup', kup);
//
//detect keyboard
document.addEventListener("keydown", e  =>{
	e.preventDefault();
	if (e.which == 18){
//alt press on start messes up audio context init.. needs fix
		console.log("the alt ting..");
	} 
	all.keyboard_enabled = true;
},{once:true, passive:false})


//user on touchscreen. runs once, detects touch screen user
document.addEventListener("touchend", e  =>{
	e.preventDefault();
	all.touch_enabled = true;
},{once:true, passive:false})


//---------------------------------------------------------------------------------------------------
//thanks my guy . this prevents scrolling
/*
window.addEventListener("keydown", function(e) {
	    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
		            e.preventDefault();
		        }
}, false);
*/

//RENDER < game pulsating heart
//setInterval(update,70); //100
//clearInterval();
//setTimeout();
//clearTimeout();


//other tips
/*
//console log performance test
//console time
//console.time('looper');
//let i = 0;
//while(i < 1000000) {i++;}
//console.timeEnd('looper');

//The continue statement terminates execution of the statements in the current iteration of the current or labeled loop,
//and continues execution of the loop with the next iteration.
//The break statement terminates the current loop or switch statement and transfers program control to the statement following
//the terminated statement. It can also be used to jump past a labeled statement when used within that labeled statement.
	//
	//
//i hope i dont have to do this mad code
(function loop() {
	setTimeout(() => {
	      // Your logic here
	  
     		loop();
	}, delay);
})();
In the above snippet, a named function loop() is declared and is immediately executed. loop() is recursively called inside setTimeout() 
after the logic has completed executing. While this pattern does not guarantee execution on a fixed interval, it does guarantee
that the previous interval has completed before recursing.
*/


