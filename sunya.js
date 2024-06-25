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


//ALL
// Instead of 'all', it should be 'conciousness' .but i need a better word
//for 'conciousness'
//EFFICIENCY
//What if we made most functions const global variables and most arrays the same.
//would it run faster?
//How about just keeping all buffers like this aswell. we would now simply have
//to let orbs remember what buffer they need to run its animations
/*
const buffers = []
var img = {n:'img name', b:img buffer}
buffers.push(img)

*/
//PEAK GLOBALS
//Sunya Globals
var kaoz = true;//false;//undefined; //where is zai? :(
var zai = true;//false;//undefined;
var actx = undefined;
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
var staNce = ['~']; //all stances
var stancE = '~'; //The ent or memory orb that will respond to displacement commands
		
//const staNce = 'Void';	The entity current stance. 'MSpace', 'Orb' ,  ??		

//const WM = [];	Other memories?

var eX = 0;//x entity center								// /eX
var eY = 0;//y entity center								// /eY
var Egspeed = 1;



var laYer = 0;//?										// /layer
var aNgle = 0;										// /angle
var msRad = 1;										// /msRad
var Ewspeed = 1;

var disMode = 'grid';	 //'wheel'							// /disMode
//local files
var LImg = []; //an array to hold all buffered images					// /files
var LAudio = []; //holds all local loaded audio
var Skeys = [];										// /skeys
var VoidID = Date.now();//sunya initialization time					//
//....so maybe just make one const U and make all these the entity properties
//var dB = -1; //data beat								// /dB
var dsignat = [ //data signature							// /dsignat
			//["r",230,"g",230,"b",230], //white
			["r",176,"g",215,"b",235], //celeste
			["r",91,"g",157,"b",237], //azure
			["r",0,"g",4,"b",233], //blue
			["r",97,"g",28,"b",188], //purple blue
			//["r",138,"g",12,"b",152], //purple
			//["r",0,"g",0,"b",0], //black
			//["r",255,"g",10,"b",6], //red
			//["r",255,"g",152,"b",1], //orange
			//["r",255,"g",221,"b",38], //yellow
			["r",163,"g",238,"b",4], //green
			["r",127,"g",224,"b",191] //calypso

	//['r',20,'g',230,'b',120,'a',1],
	//['r',230,'g',230,'b',200,'a',0.5]
] //customize entity data lines. its a beat container
var dfont = 'px Courier New';								// /font
var dfontSize = 18;

//Entity shortcuts. backspace memory interface needs update.
const EkeyS = [
	//some temporal shorts for developing..

//its too easy to repeat commands with 1 key. might be a feature... but its repeating also on 2 symbols combination too easily
//as well. Its bad we dont want that
/*
orb1
~/orbs>>$/text,$/text/current
*/
	{name:"o1", key:"o1", com1:"@Roy,Roy/name>>~/stance"},
	{name:"o2", key:"o2", com1:"@Carl"},
	{name:"o3", key:"o3", com1:"@Jupiter"},
//so iw as thinkin Jupiter, maybe you dont want to do text and thats cool babe. xD . Jupiter you are not real btw 

	{name:"m", key:"m", com1:"+>>~/stance,~/stance>>Carl/text"},//'+>>oO/text/cn,oO/text/current>>~/stance'
	{name:"z", key:"z", com1:"->>~/stance,~/stance>>Carl/text"},

	{name:"s1", key:"s1", com1:'Jupiter/text/1>>~/gspeed'},
	{name:"s2", key:"s2", com1:'Jupiter/text/2>>~/gspeed'},
//ok so we want to run a little script to change the speed of the current stance for one beat and then go back to previus speed
//and yeah we need to at least being able to load a text.... and doing 'A literal line'>>orb/text would not be bad either
//we could just do something like 'A line','another one','anoter one'>>orb/text . That would be sick. We could create many instructions
//with a single instruction called with a simple key combination asigned previously. Give it one more thought before implementing this.
//loadtxt
//#What about hashtag sinthax for literals>>orb/text  .. i think its more #helegant lol . a left side exclusive thing. Yeah this
//Also , the sleep command. idle.. sleep[number] . maybe another symbol.. &? <<100  .12.12 .. what if ->>$/script/cn
/*
so we can create a script that listen to the names of new orbs created and when a specific name matches it processes it in a specific
way 	
*/

	{name:"coml", key:"com1", com1:'$/text/current>>~/comline'},
	{name:"inl", key:"inl", com1:'$/text/current>>~/inline'},

//!!!!!!!! interesting. Having caps keys allow the possibility to lock the key on repeat when we let go shift. To remove from key_d
//we just have to use shift to call the key again and let go while still pressing shift. 
	{name:"G", key:"G", com1:"msgrow"},
	{name:"H", key:"H", com1:"msshrink"}
	//editor tests
	//{name:"next line", key:"n", com1:".linedown"},
	//{name:"prev line", key:"b", com1:".lineup"},
	//{name:"beats", key:"t", com1:".type:.beats:"},
	//{name:"beat", key:"y", com1:".type:.beat:"},
	//{name:"beatup", key:"m", com1:".beatup"},
	//{name:"beatdown", key:"v", com1:".beatdown"},
]

var msX = 0;//memspace rad center							// /msX
var msY = 0;										// /msY
var Msrad = 1;
var Mcounter = 1;//The number of max allocated space in radius 				// /Mcounter
const MSp = {
	B : 1,	layer:0, 								// /msB...
	beats:[										// /msignat
		['r',20,'g',160,'b',7,'a',1],
		['r',230,'g',255,'b',230,'a',0.8,'radius',1]
	],
	state:{
		r:230, g:230, b:230, a:0.8, x:eX, y:eY, radius:1, is:'circle',		// /domain?
		inside:'empty'
	}//a special circle state.	
}

//we need a center cursor to appear when entity is idling or displacing on its memory space. Should always indicate the screen center
const Ecen = {
	B : 1,	layer:2, 								// /msB...
	beats:[										// /msignat
		['r',20,'g',160,'b',7,'a',0.3],
		['r',230,'g',255,'b',230,'a',0.9]
	],
	state:{
		r:230, g:230, b:230, a:0.8, x:eX, y:eY, radius:1, is:'circle',		// /domain?
		inside:'filled'
	}//a special circle state.	
}


//PEAK elid2 update neccesary. What really IS elid2. Its the void eye lid? kinda. The lid of the entity. We might use this one
//later. Its useful to have a rect state just ready out there to do stuff. Just make an object on global for this. Its the rect
//on the whole screen data. Good for fading out, maybe we could manipulate it later to create some effects. Maybe it can be shrinked
//Maybe it can be tinted with another color ant semi transparent. Yes this is a useful element to have. Pretty much a user feature.
const Elid = {
	B:1,	layer:2,
	beats:[
		//['r',1,'g',1,'b',1,'a',0.2,'w',window.innerWidth,'h',window.innerHeight]
	],
	state:{
		r:1, g:1, b:1, a:0.2, x:eX-window.innerWidth/2, y:eY-window.innerHeight/2, is:'rect',
		w:window.innerWidth, h:window.innerHeight,
		inside:'filled'
	}//a special rect state.	
}



//kfeed need to be an object just like MSp
var Kfeed = {
	B : 0,	layer:2, font:"30px Courier New", align:'center',
	beats:[
		['a',0.8]
	],
	state:{
		align:'center', font:"30px Courier New",
		r:230, g:230, b:230, a:0.8, 
		x:eX+window.innerWidth/2,
		y:eY+window.innerHeight/2,
		is:'txt', txt:''

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
Build several procedures to embed the orb with form layers 
*/
const OrbSoul = function(){
	var id = Date.now(); var idn = id.toFixed(0);
	o = {
//meta 
		name:idn, //id name
//seals, all possible forms
		text:false, 		//TE	..not sure if text should be on by default
		body:false,		//BO
		script:false,		//SC
		circle:false,		//CI
		image:false,		//IM
		rectangle:false,	//RE
		line:false,		//LI
		audio:false,		//AU
		oscillator:false,	//OS

	}
	return o
} //OrbSoul
//We can then name this returned soul like orb structure or add aspects to be awakened by SoulSeal

//Many aspects can be awakened at once. Still working on default values here.. maybe we can just toggle with those after.
//this is functional programming beibei. declarative style peak ohio rizz beybey
const SoulSeal = function(o){
	if(o.body){
		o.dismode='grid'; //'wheel'
		o.x=0; o.y=0; o.gspeed=1;
		o.angle=0; o.rad=0; o.wspeed=1;
	}

	if(o.script){
		o.c=undefined;   //c for command.. the current command running ?
		o.scR='off'; o.scB=1; o.scC=[];
	}

	if(o.text){
		o.spacer=15; o.insertop='newline';
		o.Elis=undefined; //true to listen to Ein . for now
		o.i=undefined; 
		o.txtB=1;
		o.print='static'; 
		o.txtL=2;
		o.txtLi=[];
	}

	if(o.image){
		o.imgfile=undefined;
		o.imgF=[]; o.imgB=1; o.imgR='off'; o.imgL=0;
		o.imgS={
			img:undefined,  is:'img',
			x:0, y:0, w:0, h:0, px:0, py:0, pw:0, ph:0, a:1
		};
	}

	if(o.circle){
		o.cirF=dsignat; o.cirB=1; o.cirR='loop'; o.cirL=1;
		o.cirS={
			r:230, g:230, b:230, a:0.8, x:o.x, y:o.y, radius:27, is:'circle',
			inside:'empty'
		};
	}

	if(o.rectangle){
		o.rectF=dsignat; o.rectB=1; o.rectR='loop'; o.rectL=1;
		o.rectS={
			r:230, g:230, b:230, a:0.8, x:o.x, y:o.y, w:60, h:60, is:'rect',
			inside:'empty'
		};
	}

/////////WEB AUDIO
//Holy shiet audio. ok
//Basic oscillator using audio web API the Audio context holds nodes. Nodes are connected to create various effects and
//filters. the source node has no input only output,the destination node has no output, only input. All nodes between these
//two act as filters and each can have multiple ins and outs
//!
//An audio object should hold all the instructions and buffers neccesary for a
//function to create the precise Audio Node audio objects can be located on orbs , void nodes and user data
//!
	if(o.audio){
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

*/
	}

	if(o.oscillator){
		o.oscTL=[
			//[start,0,duration,1,freq,439,gain,0.07,fadein,?,fadeout,0.3],
			//[]
		];
		//o.oscB=1; 
		o.oscR='off'; 
	}

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
				var n_rand = all.get_r_num(min,max);
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
var COsc = function(os){
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
			r:230, g:230, b:230, a:1 
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
//on it: orb/circle/3/mirror etc
//but we can create a fully custom state from here the mirror
//so for game mechanics this mirror concept is interesting because now orbs can create visual decoys.
//we can write a function to do mirror on last, current and by number
const Mirror = function(rsout,sm,layer){
	var nb = txtToB(rsout);
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
					var n_rand = all.get_r_num(min,max);
					nv = n_rand;
				}
			}
			sm[p] = nv;
		}
	//}
	if(layer==0){visual_q0.push(sm);} 
	if(layer==1){visual_q1.push(sm);}
	if(layer==2){visual_q2.push(sm);}
	//o.o = nb;
	return
}//mirror



// -- DATA CONTROL . SUNYA FUNCTIONS

//PEAK
//ANIMF
//We need to build the escence of animf here so it can be called right here... wait no we dont call it here, we call on entity updates
//and entity updates pushes the state into draw cue. so the state is far much more eficient now ok? 
//So pretty much all Graphics can live anywhere we want we just need these to be objects to be iterated and asked to animF
//
//animF pretty much enlivens graphic states.. animFrames
//we need a new function to enliven statements, data lines running. orb.lines. it needs to
//count using /orb/L and /orb/run to determine what to do with lines . We also want to update lines beats since we are here..

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
				var dots = v.substr(0,2);
				if(dots=='..'){
					var cded = v.substr(2); var cdeda = cded.split("-");
					var min = parseFloat(cdeda[0]); var max = parseFloat(cdeda[1]);
					var n_rand = all.get_r_num(min,max);
					nv = n_rand;
				}
			}
			S[p] = nv;
			//console.log(nv); //.... this seems to be working
		}
	}
	//even layer selecting should not be done here!!!!
	//not sure if we have to add the beat counter here... but sure why not. dont
}


//PEAK?
//REPEAT
//repeat system
//if there are items in this array, we check for them. we check for the key, if there is no keyup signal, then run the asociated function
//when timestamp is a certain number bigger than first press. at an interval
//.. so this function is probly the best time to ask if there is a repeated command, if so we need to prevent execution and inmediately
//flush it
const repeatSys = function(){
	if(all.key_d.length!=0){
		var l = all.key_d.length;
		while(l--){
			var kd = all.key_d[l];
		//this solves it. works perfectly fine.. maybe we can expand some more but this already works.
			if(l==1){//its because there is 0..
				//so compare with 0
				kd0 = all.key_d[0];
				if(kd.ins==kd0.ins){
					all.key_d.splice(0,1);
				}
			}
			switch (kd.ins){
//we probably want to displace faster.. maybe shift Arrows could increase speed of displacement
//.. before adding more stuff here i need to test this well. i think its doing something funny. we can process 2 commands
//also, when displacing up and right or down and left, the test is in husk is not working at all. am really burned out here
//its been a solid 2 days since am stuck in this. am really pissed.
			//ok since these are special cases we could just use a const... or
//run a script to readjust what arrows do by changing comA first parameter... so this script can simply change a parameter and we
//asociate this script into any key.
//SO since comA first parameter will not be stance anymore, it may still be used to ... ok no .
//lets keep stance. however we will not be using stance as we were using it. Now stance will simply go into the first argument
//of coma here, and this will affect Comand keys .. ehh
/*
... how to change the right side
disleft>>
disright>>
disup>>
disdown>> 
......
So how about just building the command string right here? So we just use stancE to asociate displacement commands to a specific orb
or entity. Also since it runs right here, we can move diagonally. we want this. not too bad. But its doing something weird when
we release the second arrow, it speeds up for some reason. we dont want that
*/
				case 'left':
					var cline = 'disleft>>'+stancE;
					comA(undefined,cline);
					//Entry = kd.str;
					//comA('~',kd.str);
					//displacE('~','left');
					break
				case 'right':
					var cline = 'disright>>'+stancE;
					comA(undefined,cline);
					//Entry = kd.str;
					//comA('~',kd.str);
					//displacE('~','right');
					break
				case 'up':
					var cline = 'disup>>'+stancE;
					comA(undefined,cline);
					//Entry = kd.str;
					//comA('~',kd.str);
					//displacE('~','up');
					break
				case 'down':
					var cline = 'disdown>>'+stancE;
					comA(undefined, cline);
					//Entry = kd.str;
					//comA('~',kd.str);
					//displacE('~','down');
					break
//all.key_d.push({ins:'com', str:key_short.com1});
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
}

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
	var e_ms = all.get_dist(nx, MSp.state.x , ny, MSp.state.y); var e_msp = e_ms.toFixed(0); var e_ms = parseFloat(e_msp);
	if(e_ms>MSp.state.radius){}else{ 
		x=nx; y=ny; 
		return [x,y]
		//return [nx,ny]
	}//mspace limits

	return		
}//displacer



//deprecat
//DISPLACE function
//We call this function with Arrows of with Touches in a special place... maybe later commands can call it too.
//if stance.form is Void, the displace command should.. do something?
//if stance.form is Wave , we could use this to move along the rim
//if stance.form is Husk , we could displace entity while inside the Husk radius freely
//if stance.form is Orb , we ask Orb se or mode, if editing, we move the frame or line, if memory is closed, we move the orb prim
//.... ok no more
//PEAK
//Now a stance is simply a directory.
//... this Arrow system probly dont even need to be a command, just a function to work with special Arrow keys.
//.. the idea of being able to scroll trough txts is not bad, but maybe we could implement later perhaps using scripts.
//a function to displace screen acording to current stance conditions. might need to be adapted later for other entities
//.... we probably want to be able to displace a specific number of times... but for now lets just keep it simple
//!!!!!!!!!!!!!!!
//PEAK update incoming
//i went crazy here and i didnt even get to test it. Am ridiculous.
const displacE = function(S,dir){
		
/*refference. we were using angles here, that interesting
//Not sure if we want to be able to trife around x y grid position of the orbs or entitiy itself or around something else.
	if(stance.form=='Fire'){
//.. this is working just fine now.. not sure if we rly need up and down. but we do want fast repeat!!!!!!!!!!!!1
//U.rangle holds the angle of the entity from a given xy center and radius. we will mostly use the stance circle prim params.
//from 0 to 6.2 we can cover all angles.
		if(dir=='left'){
			var n = U.rangle-0.1; var ns = n.toFixed(1); U.rangle = parseFloat(ns);
			if(U.rangle<0){U.rangle=6.2;}
			return
		}
		if(dir=='right'){
			var n = U.rangle+0.1; var ns = n.toFixed(1); U.rangle = parseFloat(ns);
			if(U.rangle>6.2){U.rangle=0;}
			return
		}
	}
*/

//so we want to be able to move only on memory space instead of husk now. always. We dont want to be able to displace freely
//while user is not inside its memory space. The void is too dense and chaotic to being able to freely move around.
//so lets start out with some memory space now to try some stuff. ok ready. now lets just remove husk condition since
//we are always going to ask if we are on memory space anyway
//maybe we could use some parameter in the husk to determine how fast entities move trough it.
	//we first just move user position... replace U.x U.y with eX and eY
//remember now we are using eY and eX as center of screen. We have considerate these as center when we displace. so if we want
//to place screen with this point in center, we need to translate to -eX+window.innerwidth/2, -eY+window.innerHeight/2

//this is the displace function we call when we are on '~' stance. But when we are on orb stance, we should simply displace
//the orb and not even follow with the screen. displacing entity moves the screen, displacing orbs not necesarily so, unless
//entity is following the orb. 
	//if(stancE=='~'){
	if(S=='~'){
		
		var ra = displacer(eX,eY,dir,Egspeed); //returns [x,y]
		if(ra!=undefined){
			if(dir=='left'){eX=ra[0]; ctx0.translate(Egspeed,0);} //only moving entity translates
			if(dir=='right'){eX=ra[0]; ctx0.translate(-Egspeed,0);}
			if(dir=='up'){eY=ra[1]; ctx0.translate(0,Egspeed);}
			if(dir=='down'){eY=ra[1]; ctx0.translate(0,-Egspeed);}
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

	}else{	// '~'

		var o = Fting(Orbs,'name',S);
		if(o){
			//
			//this could be a function to accept a value in order to move by the specified value.
	//.. so we can recycle and also we can move a structure to a precise point in one command. Should only be useable on data lines
	//beats and data states beats. not even on entity... Because the thing is: We cant expect users to asign precise coordinates
	//into structures, its by far much more simpler to move a determined number of pixels on a direction i think.
	// 
			var ra = displacer(o.x,o.y,dir,o.gspeed); //returns [x,y]
			if(ra!=undefined){
				if(dir=='left'){o.x=ra[0];} //ctx0.translate(o.speed,0);} //only moving entity translates
				if(dir=='right'){o.x=ra[0];} //ctx0.translate(-o.speed,0);}
				if(dir=='up'){o.y=ra[1];} //ctx0.translate(0,o.speed);}
				if(dir=='down'){o.y=ra[1];}// ctx0.translate(0,-o.speed);}
			}

		//...	
			if(o.print=='stream'){
				dSSpacer(o);
			}
			if(o.print=='static'){
				dESpacer(o);
			}

		}// orb stance

	} //orb else

}//displace

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
		var dl = o.txtLi[i]; dl.state.y=o.y+spacer; dl.state.x=o.x;
	spacer = spacer+o.spacer;
	}
} //dESpacer

//stream in
//but on stream in mode, we want to print the last limit lines only..limitL . We dont want to center the screen anymore on the new lines
//arriving, and we dont want to keep the lines in memory beyond limitL
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
const all = {};//will contain everything for now
//const unl = []; // unique names list.. kinda deprecated. not very smart system
all.gameStart = Date.now();//sunya initialization time
all.heartbeat = undefined;//becomes hold return for heartbeat interval

//orb escence. a different color on each beat
//.. i could run random range once, then substract 60 to create a second value, and add 60 to create third value, always between
//0 - 220 . this way it would be more efficient and the result would be more contrasting ?
//var o_r=220; var o_g=220; var o_b=220; 
//var a_v =0;


all.sstr = ' ';//contains symbols as a single string
all.sstr_l = ' ';//to compare on draw text system
all.sstr_t = 0;//timer for symbols to dissapear on their own
all.sstr_font ="30px Courier New"; //string symbols size and font
all.sstr_x=window.innerWidth/2;//+window.scrollX;
all.sstr_y=window.innerHeight/2;//+window.scrollY-100;//update this to center
all.sstr_r=220; all.sstr_g=220; all.sstr_b=220; all.sstr_a=0.8;
//all.k_feed=undefined;//a state to print keys feedback
all.wait_com_key=false; //key mem system flag

//all.orb_track_l = undefined; //for prims wheel updates on new orb arrival

//to start a timer just set timer_base to Date.now()  ? we should be able to call
//many timers
//all.timer_base = 0;

//all.stat = {};//may contain the status of the player avatar
//all.mouse = {x:undefined, y:undefined, str:undefined}
//all.mouse_str = undefined;
//all.touch_xy = undefined;
//
all.chat_on = false;//boolean for chat input activation
all.c_input = ''; //holds input before sending
all.c_out =[]; //holds output data


//ARRAY containers

all.key_d=[];//contains keys on repeat

var visual_q0 = [];//layer 0
var visual_q1 = [];//later 1
var visual_q2 = [];//layer 2

//all.com_a = undefined;//[];//commands container

//deprecats
//all.res_acts = [];//stores act resources
//all.perform = [];//stores temporary acces to act resources

//TOUCH
//all.touches_a = []; //holds touches
all.ges_seq = []; //gesture sequence ? am i using thiis
all.bt_alr = false; //for touch button system

//deprecat
//all.stream_a = [];//contains txt lines as items to be streamed



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

all.canvaser = function(id, zIndex){
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
all.canresize = function(width,height){
canvas0.style.width=width+"px"; canvas0.style.height=height+"px"; canvas0.width=width; canvas0.height=height;
//canvas1.style.width=width+"px"; canvas1.style.height=height+"px"; canvas1.width=width; canvas1.height=height;
//canvas2.style.width=width+"px"; canvas2.style.height=height+"px"; canvas2.width=width; canvas2.height=height;
//canvas3.style.width=width+"px"; canvas3.style.height=height+"px"; canvas3.width=width; canvas3.height=height;
//canvas4.style.width=width+"px"; canvas4.style.height=height+"px"; canvas4.width=width; canvas4.height=height;
}

//currently working with 5 layers, a canvas is a layer.. but maybe we could
//do just fine with 3 layers!!!!
//.... or maybe we could just use one or 2.. if we implement offscreen canvas
//
//Its just one canvas we are good .
all.canvaser('canvas0', 1);
//all.canvaser('canvas1', 2);
//all.canvaser('canvas2', 3);
//all.canvaser('canvas3', 4);
//fifth layer for phone commands buttons.. anf keys feedback
//keyboard users probly dont need this one.. or maybe keys feedback could use this layer actually
//all.canvaser('canvas4', 5);

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
//prints keys from all.sstr on screen
//.. ok so new system will simply hold symbols as they come. We will be able to asign commands just as we do now, but every
//symbol will be usable, we wont map into caps anymore. 
//Get enterless keys input, place it on k_feed txt, and print with beats to last for 20 heartbeats? and evaluate. If another
//key is pressed, just add it into k_feed text


//we need to modify keys feed now..instead of acting on kfeed, we need to modify Kfeed.state
all.keys_feed = function(){
	all.sstr_t++;	//timer count should run before clearing and before logic updates
	if(all.wait_com_key==true){all.sstr_t--;}//wait for command to save on key_s a lock
	if(all.sstr_t > 20){ //time limit for command feedback 
		all.sstr_t = 0;	//reinitialization
		//self cleans. we set the txt to undefined
		//kfeed.is='c_txt'; //Kfeed.state.is=undefined?
		//kfeed.display='ignore';//just dont push this state.!!!!!!!!!
		//kfeed.txt=undefined; //Kfeed.state.txt=undefined;?
		//we clean symbols here thats ok
		all.sstr = ' '; all.sstr_l = '';//cleaning string symbols here ..?
		return;
	}
	if(all.sstr == all.sstr_l){	
		//check if text is the same
		//if txt is the same then just push to print
		//We probably need to update beats and push here. So call beatUp.. i think beatUp pushes... but we should separate
		//beatUp from pushing actually. just push the beat for now
		visual_q2.push(Kfeed.state);
		//kfeed.is='c_txt';
		//kfeed.display='normal';//Kfeed.state
	}else{
		all.sstr_l = all.sstr;	//keep track of text for check
		
		//PEAK
		Kfeed.state.x=eX; Kfeed.state.y=eY; 
		Kfeed.state.txt=all.sstr_l;
		Kfeed.state.r=all.sstr_r; Kfeed.state.g=all.sstr_g; Kfeed.state.b=all.sstr_b; Kfeed.state.a=all.sstr_a;
		//var KF = Kfeed.state;
		visual_q2.push(Kfeed.state);
		
		//kfeed.r=all.sstr_r; kfeed.g=all.sstr_g; kfeed.b=all.sstr_b; kfeed.a=all.sstr_a;
		//kfeed.x=eX;//-window.innerWidth/2;
		//kfeed.y=eY;//-window.innerHeight/2; 

		//kfeed.txt=all.sstr_l; 
		//kfeed.is='c_txt';
		//kfeed.display='normal';
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
//a system to attach commands into keys.. currently not working.
//if length is zero, then its space
	if (ev.key == ' ' && ev.target == document.body) { //spacebar
		ev.preventDefault();//prevents space to scroll document.. idfk how but it works
		//console.log('space');
		if(all.sstr==' '){
			//here goes ting to clean key memory
			all.wait_com_key_forget = true;
			//all.stream_a.push("Enter key to break command line asociated");
			//all.screen_log();
			//console.log("Enter key to break command line asociated");

		}else{
			//wait com key lock
			all.wait_com_key = true; 
			//all.sstr_g=30; all.sstr_r=20;
			kfeed.g=30; kfeed.r=20;

			//all.stream_a.push(all.sstr + " key ready to be linked","Type a command for this key"); all.screen_log();
			//console.log(all.sstr + " key ready to be linked");

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
	if(ev.key.length==1&&all.chat_on == false){
		//key combination to k_feed
		all.sstr=all.sstr_l+ev.key; all.sstr_t = 0;//by default , at every key stroke, timer should be reset
		//console.log(ev.key+'_____'+ev.timeStamp);
		//console.log(all.sstr_l);

	//ask for asigned key short
//while on void , ask for user keyshorts
		var ksa = EkeyS;//U.void_ks;//
		var i = ksa.length;
		//checks for key
		while(i--){
			if(ksa[i].key==all.sstr){
				var key_short = ksa[i];
				//console.log(key_short);
				break
			}
		}

		if(key_short){
			//splice key short if all.wait_com_key_forget is true
			if(all.wait_com_key_forget){
		//splice from user if we are on void, splice from orb if we are in orb stance.. its the same ksa
				var key_index = ksa.indexOf(key_short); ksa.splice(key_index, 1);
				//all.stream_a.push("Key liberated."); all.screen_log();
				all.wait_com_key_forget = false;
				var dont_send_com = true;
			}
			if(dont_send_com){}else{
			//send command asocited with key
			//all.com_a = {str:key_short.com1}//is_a:"c",}
//so nowinstead of directly sending the command, we send a request to key_d so it keep sending the command as long as button is pressed
//here is the problem.... all.key_d is repeating the command send even tho its a combination..the problem is here somewhere on
//repeat system...
			//all.key_d.push({k:ev.key, ins:'left'});
			if(all.key_d.length>1){}else{
				//here, k is the problem. we need to specify that only 1 letter k should be able to be repeated
				//!!!!!!!!!!!!!!!!! solved. nice. good for now
				if(key_short.key.length>1){Entry=key_short.com1;}else{
					all.key_d.push({k:ev.key , ins:'com', str:key_short.com1});
				}
			}
			//all.com_a=command;//.push(command);
			all.sstr_t = 20; all.sstr =' '; all.sstr_l =''; /// this fixed the thing?
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
		if (ev.key == 'Backspace' && all.chat_on == false){ //backspace

			all.sstr = ' '; all.sstr_l = ''; all.wait_com_key = false;
		//PEAK ..not implemented!!!!!!!!!!!!!!!!!!!
		//let KF = Kfeed.state;
		//KF.x=eX; KF.y=eY; KF.txt=all.sstr_l;
		//KF.r=all.sstr.r; KF.g=all.sstr.g; KF.b=all.sstr.b; KF.a=all.sstr.a;
		//visual_q2.push(KF);
			//we want to change the color of the state
			//
			//kfeed.is='c_txt'; kfeed.txt=undefined;
			Kfeed.state.g=220; Kfeed.state.r=220; //kfeed.display='ignore';
			all.wait_com_key_forget = false; //clear forget key lock also
	//and also, just clear active stream?
	//ok if user is on radiant mode, we have to clear the orb stream
		}//backspace

//ENTER, CHAT TXT MEMORY CREATOR
//input system to chat ,send strings to server and enter commands
//if enter, check if all.chat_on is true or false, if true, then send data and chat_on
//to false, or just set chat_on to false if there is no data to send
//if enter, and chat_on is false, then activate system and set all.chat_on to true
//when system is activated, allow only e 13 , and focus on chat_in
//once value is ready, enter sends value to all.c_input so proper filter and
//respective emitter send the data to wherever neccesary and set chat_on false
//and allow other symbols of command interface
//!!!!!!!!!!!!!!!
//SO if its a command, we say all.command = chat_in.value;  , if its not, we say all.c_input = chat_in.value..... simple. 
		if (ev.key == 'Enter'){ //press enter to focus on input html tag
			//event.Default();

			if(nLine){
//So we are just producing a string on Ein here now. Let orbs handle what to do with it on orbs updates.!!!!
//We CAN input numbers on Ein and they will be parsed here for now..
				//if(stancE=='~'){
				if(chat_in.value==''){
					Ein=undefined;
				}else{
					//Ein=chat_in.value; 
					//We wanto turn number strings into numbers
//isNaN(number string) will only return false when we have a number string..
					let isn = isNaN(chat_in.value);
					if(isn){
						//Ein=chat_in.value;
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

				chat_in.value = ""; all.chat_on = false;
				chat_in.blur(); chat_in.style.display="none";

				nLine=false;
				return

			}//nLine

			if(all.chat_on == true){
//PEAK	
//let normal enter become a command prompt
//to create an new input, press enter again. phones can simply use a button to enter commands prompt and another button to enter
//a new input line
				///PEAK
				//
				if(chat_in.value==''){
					Ein=undefined;//?
					nLine=true;
					return
				}else{
					//Ein=chat_in.value; 
					Entry=chat_in.value;
					//Eins.run='once';
				}
				//Entry=chat_in.value;
				//
				//
				//
	/*
//!!!!!!!!!!!! We need to eimplement wait com system again..
					//key memory system
				if(all.wait_com_key==true){
					var mbox =EkeyS; //U.void_ks;
					var lm = mbox.length;
					while(lm--){
						var ksalr = mbox[lm];
						if(ksalr.com1==chat_in.value){
							ksalr.key=all.sstr;
							var kready = true;
							break
						}
					}
					if(kready){}else{mbox.push({name:all.sstr, key:all.sstr, com1:chat_in.value});}
					all.wait_com_key = false;
	//PEAK UNIMPLEMENTED!!!!!!!!!!!!!
					let KF = Kfeed.state;
	//KF.x=eX; KF.y=eY; KF.txt=all.sstr_l;
	//KF.r=all.sstr.r; KF.g=all.sstr.g; KF.b=all.sstr.b; KF.a=all.sstr.a;
					KF.g=220; KF.r=220;
					visual_q2.push(KF);
				}else{//memory key lock
					Entry=chat_in.value;
					
				}

	*/
				//
				chat_in.value = "";
				all.chat_on = false;
				chat_in.blur();
				chat_in.style.display="none";
				
			}else{//if chat_on is false, then activate
	//this line calls the input. i should probly use a diferent variable  and i need input box to be bigger.
				chat_in.style.display="inLine"; all.chat_on = true; chat_in.focus();
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
//We will now use Esc to leave a memory in stance at any moment. Not sure what could happen when we are already on Void....
//but lets say we are editing a memory and press Esc. then we should go to the Husk, Fire or Void stance inmediately
		if(ev.key == 'Escape' && all.chat_on == false){
			ev.preventDefault();
			//same as tab
		}//esc

//while chat is on, Esc takes us out and doesnt print anything. Fast out
		if(ev.key == 'Escape' && all.chat_on == true){
			chat_in.value = ""; all.chat_on=false; chat_in.blur(); chat_in.style.display="none";
			nLine=false; //PEAK
		}//esc on input box

//ARROW 
//OKSO lets push a displace instruction into an array. and call that instruction repeatedly as long as 'Key' up is not being fired.
//repeatSys . Works like a charm
//!!!!!!!!!!!!111PEAK
//let arrows and all special keys to call specific commands. .. just asign a command line to these keys
		if(ev.key == 'ArrowLeft' & all.chat_on == false){
			if(["ArrowLeft"].indexOf(ev.code) > -1) {ev.preventDefault();}
//ok so just call displace function and pass on direction. we can access stance from anywhere since its a global, so we dont pass stance.

			if(all.key_d.length<2){
				all.key_d.push({k:ev.key, ins:'left'});
				//console.log(all.key_d);
			}
		}//left arrow

		if(ev.key == 'ArrowRight' & all.chat_on == false){
			if(["ArrowRight"].indexOf(ev.code) > -1) {ev.preventDefault();}
			if(all.key_d.length<2){
				all.key_d.push({k:ev.key, ins:'right'});
			}
		}//right arow

		if(ev.key == 'ArrowUp' & all.chat_on == false){
			if(["ArrowUp"].indexOf(ev.code) > -1) {ev.preventDefault();}
			if(all.key_d.length<2){
				all.key_d.push({k:ev.key, ins:'up'});
			}
		}//up arow

		if(ev.key == 'ArrowDown' & all.chat_on == false){
			//if(["ArrowDown"].indexOf(ev.code) > -1) {ev.preventDefault();}
			//ev.preventDefault();
			if(all.key_d.length<2){
				all.key_d.push({k:ev.key, ins:'down'});
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
	var l = all.key_d.length;
	while(l--){
		var kd = all.key_d[l];
		if(kd.k==ev.key){
			all.key_d.splice(l,1); //this gives the speed up glitch
			//all.key_d.length=0; return //this gives even more glitches lol
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


//COMMAND ANNALIZER PEAK
const comA = function(S,C){ 

//Ok so we need to split using '>>'. But we split C directly. Because from here on, we will be working with more than 1 '/', so
//'>>' is possible.
//So we first annalize TS[0] , the Retrieving Side and then we see how it would go into TS[1] the Container Side
	var TS = C.split('>>');  //transfer split

//if there is no '>>' it means its an orb creation command or memory space grow/shrink request
	if(TS.length==1){
//ORB PEAK
//this command should create an orb soul. Probably needs to have the entity physical stats
//we could say @orbname ..
		// @orbname
		if(C[0]=='@'){
			var oname = C.substr(1);
			//look if the name already has been asigned to an orb. what if it has
			let l1 = staNce.length;
			while(l1--){
				if(oname==staNce[l1]){return 'end'} //maybe some feedback here..
			}
			var o = OrbSoul();
		//for now we are having body aspect by default and text by default.. and others lol
			o.body=true; o.text=true; o.script=true;// o.circle=true; o.rectangle=true; o.image=true;
			//o.oscillator=true;//for now

			SoulSeal(o);
			o.x=eX; o.y=eY;
			if(oname!=''){o.name=oname;}
			Orbs.push(o);
			staNce.push(o.name);

			return 
		}// @

		if(TS[0]=='msgrow'){
			msRad++;
			//we should do pop push here. The last beat should be the 'first one'.
			var last = MSp.beats.length-1;
			MSp.beats[last].pop(); MSp.beats[last].pop(); MSp.beats[last].push('radius',msRad); 
			return
		}
		if(TS[0]=='msshrink'){
			msRad--;
			var last = MSp.beats.length-1;
			MSp.beats[last].pop(); MSp.beats[last].pop(); MSp.beats[last].push('radius',msRad); 
			return
		}
		if(TS[0]=='loadimg'){
			img_in.click();
			return
		}
		if(TS[0]=='loadaudio'){
			audio_in.click();
			return
		}

	}

	if(TS.length==2){ //there is '>>'
//left side retrieves, right side accepts the return value. on the left side we need to determine from where we need to retrieve
//on the right side, we need to check if container is capable to handle the output from left side. TS[0] is the left side
//we need to annalize TS[0] , RS retrieve side
		var RS = TS[0].split('/');

//.. we could also say +234>>? . its not dificult to implement from here. incresing by number like this is probably going to be
//used a lot but it might be messy
		var pol = 0;
		if(RS[0][0]=='+'){var pol = 1;}
		if(RS[0][0]=='-'){var pol = -1;}

// no '/' on left side , '>>'
		if(RS.length==1){
//literals might be something like.. yup this works
			if(RS[0][0]=='#'){
				var RSout = [];
				var lit = RS[0].substr(1); var litn = parseFloat(lit);
				var nan = isNaN(litn);
				if(nan){RSout.push(lit);}else{RSout.push(litn);}
			}		

//now we also want to check for key commands . commands that dont require to know stance. displacements, edit commands etc..
//these commands always act upon something so they use '>>' . they dont use '/' either
// we have , displacement commands, edit data commands, or commands that act upon orbs as well.....
//OKSO maybe we can offer the possibility to just dont use '>>' for displacements only?
// command>>target
			//textform>>orbname , circleform..... and so on.. unfinished
			//we expect an orb name on TS[1] always here
			if(RS[0]=='textform'){
				var o = Fting(Orbs,'name',TS[1]);
				if(o){ o.text=true; SoulSeal(o); return }else{return 'end'}
			}
			if(RS[0]=='circleform'){
				var o = Fting(Orbs,'name',TS[1]);
				if(o){ o.circle=true; SoulSeal(o); return }else{return 'end'}
			}
			if(RS[0]=='rectangleform'){
				var o = Fting(Orbs,'name',TS[1]);
				if(o){ o.rectangle=true; SoulSeal(o); return }else{return 'end'}
			}
			if(RS[0]=='oscillatorform'){
				var o = Fting(Orbs,'name',TS[1]);
				if(o){ o.oscillator=true; SoulSeal(o); return }else{return 'end'}
			}
			if(RS[0]=='imageform'){
				var o = Fting(Orbs,'name',TS[1]);
				if(o){ o.image=true; SoulSeal(o); return }else{return 'end'}
			}
			if(RS[0]=='scriptform'){
				var o = Fting(Orbs,'name',TS[1]);
				if(o){ o.script=true; SoulSeal(o); return }else{return 'end'}
			}

			//keycommands
			if(RS[0]=='disleft'){
				if(TS[1]=='~'){displacE('~','left');return}
				if(TS[1]=='$'){displacE(S,'left');return}
				var o = Fting(Orbs,'name',TS[1]);
				if(o){displacE(TS[1],'left'); return}
			}
			if(RS[0]=='disright'){
				if(TS[1]=='~'){displacE('~','right');return}
				if(TS[1]=='$'){displacE(S,'right');return}
				var o = Fting(Orbs,'name',TS[1]);
				if(o){displacE(TS[1],'right'); return}
			}
			if(RS[0]=='disup'){
				if(TS[1]=='~'){displacE('~','up');return}
				if(TS[1]=='$'){displacE(S,'up');return}
				var o = Fting(Orbs,'name',TS[1]);
				if(o){displacE(TS[1],'up'); return}
			}
			if(RS[0]=='disdown'){
				if(TS[1]=='~'){displacE('~','down');return}
				if(TS[1]=='$'){displacE(S,'down');return}
				var o = Fting(Orbs,'name',TS[1]);
				if(o){displacE(TS[1],'down'); return}
			}

			if(RS[0]=='~'){
				RSout=[
					'~/name', '~/orbs', '~/stance', '~/dsignat', '~/in', '~/out', '~/gspeed', '~/wspeed',
					'~/x', '~/y', '~/angle', '~/dismode'
				]
			}
			if(RS[0]=='$'){
				var o = Fting(Orbs,'name',S);
				if(o){
					var RSout=[
						o.name+'/name', o.name+'/gspeed', o.name+'/wspeed', o.name+'/in', 
						o.name+'/out', o.name+'/x', o.name+'/y', o.name+'/angle',
						o.name+'/elis'
					];
					if(o.text){RSout.push(o.name+'/text');}
					if(o.script){RSout.push(o.name+'/script');}
					if(o.circle){RSout.push(o.name+'/circle');}
					if(o.rectangle){RSout.push(o.name+'/rectangle');}
					if(o.oscillator){RSout.push(o.name+'/osc');}
					if(o.image){RSout.push(o.name+'/image');}
				}
			}


/*
	//keycommands..? old idea already
	if(RS[0]=='copycom'){
	}
	if(RS[0]=='copyin'){
	}
	if(RS[0]=='lineless'){
	}

*/



		}//key commands with no '/' on left side


// 1 '/' on the left side RS. it means we are calling retrieve commands. These always look for a key value inside entity or orb
//and return an array RSout with 1 or multilines of data to be placed on CS 
		if(RS.length==2){ //there is 1 '/' on the left side...
//can we have orb/x>>orb/out ..... no these instructions should always go on the left side. makes no sense to read them from right side
//there is a good reason trust me.
			if(RS[0]=='~'){
		//is all this good?
				var RSout = swKEnt(RS[1],0,undefined);
				//.. we also want to listen to ~/in and ~/out
// ~/in>>?
				if(RS[1]=='in'){
					var RSout = [Ein]; if(Ein==undefined){return 'end'}
				}
				if(RS[1]=='out'){
// ~/out>>?
					var RSout = [Eout]; if(Eout==undefined){return 'end'}
				}
			}
			if(RS[0]=='$'){var o = Fting(Orbs,'name',S); }else{ var o = Fting(Orbs,'name',RS[0]); }
			if(o){
				//var RSout = swKOrb(o,RS[1],0,undefined);
				if(RS[1]=='in'||RS[1]=='out'){
					if(o.run=='signal'){
						//this is a bit messy but dont worry now
//ok so what is o.i now? input system is a bit different now.. 
						if(RS[1]=='in'){
//orb/in>>? 
							var RSout = [o.i]; if(o.i==undefined){return 'end'}
							//if o.i has nothing, we should return end
						}
						//still not sure of what out does...
		//!!!!!!!!!!!!!!!!!!!maybe out could print the command line an orb is calling at any moment... o.c
						if(RS[1]=='out'){
//orb/out>>?
							var RSout = [o.o]; if(o.o==undefined){return 'end'}
						}
						//even tho switch all it does is return o.i or o.o lol
						//var RSout = swKOrb(o,RS[1],0); //using RS[1] as key o, key, polarity, requested new value
						//and now we have input or output of orb on RSout
						//var proceed = true;
					}else{
						//create package to read later
	//in order to not have issues, orb/in or out should always go on the first line. .We also need to let know the orb loop
	//to not read the command after the comma right now . ok we are using return. just return something else than undefined for now
				//this packet we are pushing... it needs script aspect
			//!!!!!!!!!a detail here .... can signal run the second command as a signal later?.. hmm i think it can
						Orbs.push({run:'signal', 
							name:RS[0], //? stancE
							script:true, 
							com:C
						});
						//we are pushing the whole instruction to read after all other orbs updates
						//because we dont want to read the second instruction on line either
						return 'end'
					}

				}else{
//orb/key>>?
					var RSout = swKOrb(o,RS[1],pol,undefined);
				}

			}// orbname on RS[0]

		}// 1 '/' on RS, 1 '>>'

//2 '/' on retrieve side RS ... 
		if(RS.length==3){ //there are two '/' on the left side..
// ~/container/conk>>?
			if(RS[0]=='~'){
				//var RSout = ...
			}

// orb/container/conk>>?  
			if(RS[0]=='$'){var o = Fting(Orbs,'name',S);}else{var o = Fting(Orbs,'name',RS[0]);}
			if(o){
				var RSout = swCKOrb(o, RS[1],RS[2],undefined);
			}

		}// 2 '/' on left side , 1 '>>'
// 3 '/' on left side
		if(RS.length==4){ 
			if(RS[0]=='~'){
				//return
			}

			if(RS[0]=='$'){var o = Fting(Orbs,'name',S);}else{var o = Fting(Orbs,'name',RS[0]);}
			if(o){
				if(RS[1]=='text'){
					if(o.txtLi){
						if(o.txtLi.length==0){return 'end'}//nothing here
						if(RS[2]=='last'){
							var lastl = o.txtLi[o.txtLi.length-1];

							if(RS[3]=='beats'){
// orb/text/last/beats>>?
								var strba = [];
								for (var i = 0; i <= lastl.beats.length-1; i++) {
									var strb =  lastl.beats[i].toString();//txtToB(RSout[i]);
									strba.push(strb);
								}
								var RSout=strba;
								o.o=RSout;
							}
							if(RS[3]=='cn'){
// orb/text/last/cn>>?
								var RSout=[lastl.tB];
								o.o=RSout;
							}
							if(o.o==undefined){ 
// orb/text/last/1..2..3.. >>?
								var rln = parseFloat(RS[3]);//we need to turn RS[3] into a number
								let nan = isNaN(rln);
								if(nan){return 'end'}
								if(rln>currl.beats.length){return 'end'}
								var strb = lastl.beats[rln-1].toString();
								var RSout = [strb]
								o.o=RSout;
							}
						}//last

						if(RS[2]=='current'){
							var currl = o.txtLi[o.txtB-1]; 
							if(RS[3]=='beats'){
// orb/text/current/beats>>?
								var strba = [];
								for (var i = 0; i <= currl.beats.length-1; i++) {
									var strb =  currl.beats[i].toString();//txtToB(RSout[i]);
									strba.push(strb);
								}
								var RSout=strba;
								o.o=RSout;

							}
							if(RS[3]=='cn'){
// orb/text/current/cn>>?
								var RSout=[currl.tB];
								o.o = RSout;
							}
							if(o.o==undefined){ 
// orb/text/current/1..2..3.. >>?
								var rln = parseFloat(RS[3]);//we need to turn RS[3] into a number
								let nan = isNaN(rln);
								if(nan){return 'end'}
								if(rln>currl.beats.length){return 'end'}
								var strb = currl.beats[rln-1].toString();
								var RSout = [strb]
								o.o=RSout;
							}

						} 

						if(o.o==undefined){ 
							var rln = parseFloat(RS[2]);
							let nan = isNaN(rln);
							if(nan){return 'end'}
							if(rln>o.txtLi.length){return 'end'}
							var irl = o.txtLi[rln-1];
							//irl holds the whole line now...
							if(RS[3]=='beats'){
// orb/text/1..2..3../beats>>? 
								var strba = [];
								for (var i = 0; i <= irl.beats.length-1; i++) {
									var strb =  irl.beats[i].toString();//txtToB(RSout[i]);
									strba.push(strb);
								}
								var RSout=strba;
								o.o=RSout;
							}
							if(RS[3]=='cn'){
// orb/text/1..2..3../cn>>?
								var RSout=[irl.tB];
								o.o = RSout;
							}
							if(o.o==undefined){ 
// orb/text/1..2..3../1..2..3..>>?
								var rln = parseFloat(RS[3]);
								let nan = isNaN(rln);
								if(nan){return 'end'}
								if(rln>irl.beats.length){return 'end'}
								var strb = irl.beats[rln-1].toString();
								var RSout = [strb];
								o.o = RSout;
							}
						}//RS[2] is a number to access a line
					}//o.txtLi 
				}//text
			}//RS[0] is orb

		}// 3 '/' on left side

/////////////////////////////////////////////////////////////////////////// CS
//We need or RSout or pol not 0. This part here is key to stop the second command on the line from executing when the first one
//didnt find anything to retrieve
		if(pol==0){
			if(RSout){}else{return 'end'}
		}
//RSout processing....		
//By now we should have a return value on RSout. We need to annalise TS[1] to see if we can place
//it where the instruction requests
//so now we use TS[1] to work on the right side. CS . container side
		var CS = TS[1].split('/');
//there is one '/' on the right side...  there should at least be 1 '/' because there is '>>' , and this means we want to place a value
//somewhere, and we can never place a value on an orb or an entity directly >>orb , ent , thats just ugly
		if(CS.length==2){ 
			if(CS[0]=='~'){
// ?>>~/entkey
				//so RSout is an array always 
				Eout = swKEnt(CS[1],pol,RSout); 
				return
			}
			if(CS[0]=='$'){var o = Fting(Orbs,'name',S);}else{var o = Fting(Orbs,'name',CS[0]);}
			if(o){
// ?>>orb/key
				//console.log('RSout??'); //WE ARE TOTALLY HERE. CONGRATULATIONS MY GUY THIS IS GOING WELL:D
				//YOUT GOT THIS COME BACK LATER PLEASE WE UNDERSTAND YOUR BATERY IS DYING ITS HARD TO BE A HUMAN U,U
				o.o = swKOrb(o,CS[1],pol,RSout); //here goes RSout.. right?
				return
			}
			
		} // 1 '/' on right side

// 2 '/' on right side
		if(CS.length==3){ 

			if(CS[0]=='~'){
// ?>>~/con/ckey.... maybe later?
				// Eout =
				//return
			}
			if(CS[0]=='$'){var o = Fting(Orbs,'name',S);}else{var o = Fting(Orbs,'name',CS[0]);}
			if(o){
//?>>orb/con/ckey  
				o.o = swCKOrb(o,CS[1],CS[2],pol,RSout); 
				return
			}		

		}// 2 '/' on right side

// 3 '/' on right side
		if(CS.length==4){ 
			if(CS[0]=='~'){
// ?>>~/con/ckey.... maybe later?
				//return
			}

// ?>>orb/con/conk/beats  , ?>>orb/con/conk/mirror
			if(CS[0]=='$'){var o = Fting(Orbs,'name',S);}else{var o = Fting(Orbs,'name',CS[0]);}
			if(o){
				if(CS[1]=='text'){
					if(o.txtLi){
						if(o.txtLi.length==0){return 'end'}//nothing here

						if(CS[2]=='last'){

							var lastl = o.txtLi[o.txtLi.length-1];

							if(CS[3]=='beats'){
// ?>>orb/text/last/beats
//we want to rewrite all beats. so we clear and use RSout array to will it up .. actually we need to transform RSout into beats.
//So loop RSout elements and run txtToB on each one of them. Beats expects beat formated texts, any number of lines. we need  a safe
//changes on beats are permanent. 
								var nba = [];
								for (var i = 0; i <= RSout.length-1; i++) {
									var rsob = txtToB(RSout[i]);
									nba.push(rsob);
								}
								lastl.beats = nba;
								lastl.tB = 1;//////////!!!!!!!!!!!!!!!!!!!
								o.o=RSout; return
							}
							if(CS[3]=='cn'){
// ?>>orb/text/last/cn
//We want to change the current beat on line form. This command should only accept a number, no less than 0 and not higher than the line
//beats.length. needs adjustments!!!!!
								lastl.tB = RSout[0];
								o.o = RSout; return
							}

							if(CS[3]=='mirror'){
// ?>>orb/text/last/mirror
								var mirror = {
									is:'txt',
									txt:lastl.txt,
									font:'18px Courier New', //do we need font here.. ?
									align:'left', //by default could be left
									x:o.x,//+window.innerWidth/2,
									y:o.y,//+window.innerHeight/2,
									r:lastl.state.r, g:lastl.state.g,
									b:lastl.state.b, a:lastl.state.a 
								}
								Mirror(RSout[0],mirror,o.txtL);
								o.o=RSout; return

							}//mirror

						}//last

						if(CS[2]=='current'){
							var currl = o.txtLi[o.txtB-1];
							if(CS[3]=='beats'){
// ?>>orb/text/current/beats 
								var nba = [];
								for (var i = 0; i <= RSout.length-1; i++) { // lenght-1?
									var rsob = txtToB(RSout[i]);
									nba.push(rsob);
								}
								currl.beats = nba;
								currl.tB = 1;//////////!!!!!!!!!!!!!!!!!!!
								o.o=RSout;
								//.. actually we need to transform RSout into beats
								//currl.beats = RSout;

							}
							if(CS[3]=='cn'){
// ?>>orb/text/current/cn
								currl.tB = RSout[0];
								o.o = RSout; return
							}
							if(CS[3]=='mirror'){
// ?>>orb/text/current/mirror
								var mirror = {
									is:'txt',
									txt:currl.txt,
									font:'18px Courier New', //do we need font here.. ?
									align:'left', //by default could be left
									x:o.x,//+window.innerWidth/2,
									y:o.y,//+window.innerHeight/2,
									r:currl.state.r, g:currl.state.g,
									b:currl.state.b, a:currl.state.a 
								}
								Mirror(RSout[0],mirror,o.txtL);
								o.o=RSout; return

							}//mirror

							if(o.o==undefined){ 
// ?>>orb/text/current/1..2..3.. 
								var rln = parseFloat(CS[3]);//we need to turn RS[2] into a number
								let nan = isNaN(rln);
								if(nan){return 'end'}
								if(rln>currl.beats.length){return 'end'}
								var nb = txtToB(RSout[0]);
								currl.beats[rln-1] = nb;
								o.o = nb;
								return
							}

						} 

						if(o.o==undefined){ //asume its a number.. but it might not
							var rln = parseFloat(CS[2]);
							let nan = isNaN(rln);
							if(nan){return 'end'}
							if(rln>o.txtLi.length){return 'end'}
							var irl = o.txtLi[rln-1];
							//irl holds the whole line now...
							if(CS[3]=='beats'){
// ?>>orb/text/1..2..3../beats 
								var nba = [];
								for (var i = 0; i <= RSout.length-1; i++) {
									var rsob = txtToB(RSout[i]);
									nba.push(rsob);
								}
								irl.beats = nba;
								irl.tB = 1;//////////!!!!!!!!!!!!!!!!!!!
								o.o=RSout;
							}
							if(CS[3]=='cn'){
// ?>>orb/text/1..2..3../cn 
								irl.tB=RSout[0];
								o.o = RSout[0];
							}
							if(CS[3]=='mirror'){
// ?>>orb/text/1..2..3../mirror
								var mirror = {
									is:'txt',
									txt:irl.txt,
									font:'18px Courier New', //do we need font here.. ?
									align:'left', //by default could be left
									x:o.x,//+window.innerWidth/2,
									y:o.y,//+window.innerHeight/2,
									r:irl.state.r, g:irl.state.g,
									b:irl.state.b, a:irl.state.a 
								}
								Mirror(RSout[0],mirror,o.txtL);
								o.o=RSout; return

							}//mirror
							if(o.o==undefined){ 
// ?>>orb/text/1..2..3../1..2..3.. 
								var rln = parseFloat(CS[3]);
								let nan = isNaN(rln);
								if(nan){return 'end'}
								if(rln>irl.beats.length){return 'end'}
								irl.beats[rln-1] = RSout[0];
								o.o = RSout[0];
							}
						}//CS[1] is a number to access a line
					}//o.txtLi 
				}//text

			}//CS[0] is orb

		}// 3 '/' on right side

	}//there is '>>'


}//command annalizer PEAK




//!!!!!!!!!!!!!!!
//SWITCH COMMANDS
//Ok i have really good idea. Lets just modularize all the switch calls. Yes this makes a lot of sense because we might need the same
//switches on different situations.
//switch orb commands. takes orb and command as params
//
//PEAK. love this one
//use a key a number and a polarity to toggle between possible values. all possible values live here.
//.. we could probably use the orb and something else?
//might still be extracted even more, because we could have one function to extract the value, and different function to act upon
//results
//But we just want to retrieve a value from key without changing it. so we set po = 0. got it.
//This switch should simply return the value of the key, modified by polarity or not.
//We probably want a swKtog for entity and one for orbs?.. maybe not. if all keys are unique then we rly dont
//we need to rename n to cv for current value....
//This function should serve as key retriever and also toggler..? Because we only want to access these cases once
//But we need one for entity and one for orbs
//const swKOrb = function(o,k,po){ // swKOrb requires (orb,key,polarity)
//const swKEnt = function(k,po){ // requires (key,polarity)
//polarity could be 1, or -1 , or 0
//so we could have something like. 
// swKinOrb , to let in a new key value on orb
// swKoutOrb , to retrieve the value into RSout
// swKinEnt , swKoutOrb ... for entity
// And we would only use polarity on swKin operations. And we could use RSout as last optional parameter as well.... !!!
// SO no ... just swKOrb and swKEnt ... use the last parameter to determine if we want to asign this value or if we want to
// retrieve this value,,, like this. 
// swKOrb(orb, key, polarity, operation)
// if operation is defined, it holds the new value we want to store on the key, if operation is not defined, it means we want
// to return the value in the key... Yes. I think this is it.
// one last thing. If polarity is zero, we simply return the key value, and ask if op wants to redefine the key
// if polarity is not zero, we modify the key using po
// PEAK
// we l need a switch for beats keys i think.
const swKOrb = function(o,k,po,op){ 
	switch (k){
//we shouldnt be able to change position directly .. for now at least. When we ask for orb/x , what refference do we take?
//MSp? but memories can exist beyond MSp right? .. if a memory is out of MSp... how do we locate it? ..hmm . Maybe we can just
//keep monitoring its position but not making it responsive to the entity commands... but we dont want to move the orb out of
//range when we move the entity.. so it needs to be independant from the entity location.. so maybe orbs just need to use real
//coordinates.. hmm.. yeah like everything else, its just that , when we retrieve an orb coordinates, we want a number with which
//we can work with. We cant work with its real values, we need to have a refference. MSp makes sense to be this refference, orbs
//cant be commanded beyond MSp radius actually, so yeah
		case 'name':
			return [o.name] 
			break
/*
		case 'elis':
			if(op){
				o.Elis = op;
				return [o.Elis]  //not sure what to return here
			}
			return [o.Elis]
			break
*/
		case 'x':
			//console.log(o.x-MSp.state.x);
			return [o.x-MSp.state.x]
			break
		//read,
		case 'y':
			//console.log(o.y-MSp.state.y);
			return [o.y-MSp.state.y]
			break
		//untested
//SO NOW we want to be able to directly place a line of data here on o.i with op[0]. So on text updates we use the value
//on o.i to create a line where txtR dictates
		case 'in':
			if(op){
				o.i = op[0];
				return
			}
			return [o.i]
			break
		//untested
		case 'out':
			//
			return [o.o]
			break
		case 'script':
			if(op){
				o.scC = op; //op should be an array with instructions
				return //[]  //not sure what to return here
			}
		//is this ok? .. if we are not changing the data, we are requesting it. so we are creating an array with
		//raw text lines and returning it into RSout.. right?
			var dla = [];
			var l = o.scC.length; 
			while(l--){
				//we are only pushing the text here and in reverse... important?
				dla.push(o.scC[l]);
			}
			return dla
			
			break
		case 'text':
//so, we can place multilines on a data container by passing in an array with lines on op
//text key on its own does not react to polarity. it returns all text lines in the orb.
//this command not only needs to clear previous data, but also return all lines
			if(op){
				//op is the data we want to have now so we want to clear old data here and place op instead
				//we want RSout op to overide all data and replace it
				o.txtLi = [];
				var l = op.length; 
		//so RSout(op) is always espected to be a list of lines we can use to create a text.. format lines and push them into data
				while(l--){
					var text = op[l];
					//call here a function to create as many lines as there are output data bits
					var Line = DataLine();
					//use dsignat to create default beats on the new line
					Line.beats=dsignat;
			//maybe we could pass entity layer here laYer ?
					Line.x=o.x; Line.y=o.y;
					//and push the text into Line.txt
					Line.txt=text;
					//only then we can push the Line
					o.txtLi.push(Line);
				}
	//we also probably need to let the orb know it has new data so we might want to call.... line alignment functions
				//

				//o.data = RSout //... we cant do this with just string they need to go into a line structure
				if(o.print=='stream'){
					dSSpacer(o);
				}
				if(o.print=='static'){
					dESpacer(o);
				}
				return //[]  //not sure what to return here
			}
		//is this ok? .. if we are not changing the data, we are requesting it. so we are creating an array with
		//raw text lines and returning it into RSout.. right?
			var dla = [];
			var l = o.txtLi.length; 
			while(l--){
				//we are only pushing the text here and in reverse... important?
				dla.push(o.txtLi[l].txt);
			}
			return dla
			
			break
		case 'osc':
			if(op){
				o.oscTL = op;
				return //[]  //not sure what to return here
			}
			var tla = [];
			var l = o.oscTL.length; 
			while(l--){
				//we are only pushing the text here and in reverse... important?
				tla.push(o.oscTL[l]);
			}
			return tla
			break

		case 'print':
			if(po==0){
				if(op){o.print=op;} return [o.print]
			}else{
				var print = ['static','stream']; 
				var n = print.indexOf(o.print);
				var res = n+po;
				if(res>=print.length){res=0;} 
				if(res<0){res=1;} 
				o.print=print[res];
				return [print[res]]
			}
			break
/*
//run doesnt go here now..
		case 'run':
			if(po==0){
				if(op){o.run=op;} return [o.run]	
			}else{
				var run = ['off','once','loop','repeat']; 
				var n = run.indexOf(o.run);
				var res = n+po;
				if(res>=run.length){res--;} 
				if(res<0){res++;} 
				o.run=run[res];
				return [run[res]]
			}
			break
*/
		case 'gspeed':
			//to toggle between lines to select on a data container. should be easy
			if(po==0){
				//op could be an array... with 1 line.. so thats why this didnt work
				if(op){o.gspeed=op;} return [o.gspeed]	
			}else{
				var res = o.gspeed+po;
				if(res>=60){res--;} 
				if(res<=0){res++;} 
				o.gspeed=res;
				return [o.gspeed]
			}
			//return Egspeed
			break
	}
}

const swKEnt = function(k,po,op){
	switch (k){
		case 'name':
			//read only . return a list of all orbs in the domain
			return [Ename] 
			break
		case 'orbs':
			//read only . return a list of all orbs in the domain
			return staNce 
			break
		case 'dsignat':
			//read. write. A list of beats to all forms by default
//.. would be convenient to designate all the most common colours on default
			if(op){
				var nba = [];
				for (var i = 0; i <= RSout.length-1; i++) {
					var rsob = txtToB(RSout[i]);
					nba.push(rsob);
				}
				dsignat = nba;
				return RSout;
			}else{ 
				var dsi = [];
				for (var i = 0; i <= dsignat.length-1; i++) {
					var dsib = dsignat[i].toString();
					dsi.push(dsib);
				}
				return dsi;
			}
			break
		//read only. use a file name to store on orb/image/file to use it
		case 'limage':
			var images = [];
			for (var i = 0; i <= LImg.length-1; i++) {
				var im = LImg[i].name;
				images.push(im);
			}
			return images
			break
		case 'laudio':
/*
			var images = [];
			for (var i = 0; i <= LImg.length-1; i++) {
				var im = LImg[i].name;
				images.push(im);
			}
			return images
			break
*/

			break
		case 'gspeed':
			//to toggle between lines to select on a data container. should be easy
			if(po==0){
				//op could be an array... with 1 line.. so thats why this didnt work
				//op is always an array now
				//ok and we always expect a number here so .. yeah check for other containers like this
		//we need to pay atention to numbers on op

				if(op){
					var numba = parseFloat(op[0]);
					let nan = isNaN(numba);
					if(nan){return 'end'}
					Egspeed=numba;
				}
				return [Egspeed]
			}else{
				var res = Egspeed+po[0];
				if(res>=60){res--;} 
				if(res<=0){res++;} 
				Egspeed=res;
				return [Egspeed]
			}
			//return Egspeed
			break
		//follow is kinda deprecated .. not sure just leave as is for now
		case 'follow':
			//follow should be similar to stance. we just need to select an orb name or '~' in order to follow it
			//we can probably toggle this one
			break
		case 'stance':
//PEAK function here
//we need to ask Orbs and consider '~'... but we first need to match the current stance with a number. find stancE index num
//so in this case we dont even need n from function param. Interesting function here. We can just toggle safely upwards and downwards
//using an array with strings as options. we probably need to extract this one
			//if we want a new key value literally, we use op and set polarity to 0
			if(po==0){
				if(op){stancE=op[0];} return [stancE]
			}else{
				var n = staNce.indexOf(stancE); var res = n+po;
				if(res<=0){stancE = '~'; return ['~']} //return first value on array which in this case is always '~'
				if(res>(staNce.length-1)){res--;}
				var l = staNce.length; //we would have to create staNce an array to keep track of all memories names formated
				while(l--){
					var name = staNce[l];
					if(l==res){
						stancE = name;
						return [stancE]
					}
				}
				//if no match, just return to initial stance. 
				stancE = '~'; return ['~']
			}
			break

//TYPE
//.type is a special command that only takes one parameter which is a string that can contain "." and ":" without having an effect
//on the instruction. .type:a string to appear on input and instant focus
//This command is useful to create specific shortkeys
//This commands should probly be available always. !!!!!!!!!!
//PEAK! This command was rally peak ngl. But now a lot has changed. We have com prompt  and in prompt
//We still want to able to just Press a key, and link a couple of commands. we want to grab a current line selected on a text,
//and pass it into the prompt, to modify it, and maybe place it somewhere else. We also want to be able to just type in a previous
//text on any prompt..? But thats kinda strange because we could now simply write something to be copied and keep working on..
//okokokokok maybe treat prompts as containers... in .. and out... kinda like .... let me just.. ... ... what really is in and out?!!!!!!!
// ~/inline	read. write. The value of chat_in on input prompt
// ~/comline	read. write. The value of chat_in on command prompt
//so we could say something like: $/text/current>>~/comline .. or ~/inline>>$/text/3? thats a bit weird... no not really. an orb
//could listen to this value and work with it in real time. PEAK 
		case 'inline':
			if(op){
				chat_in.value = op[0]//we want RSout here
				chat_in.style.display="inLine";
				all.chat_on = true; 
				nLine = true; //inline prompt
				chat_in.focus();
				return
			}
			return [chat_in.value]

			break
		case 'comline':
			if(op){
				chat_in.value = op[0]//we want RSout here
				chat_in.style.display="inLine";
				all.chat_on = true; 
				chat_in.focus();		
				return
			}
			return [chat_in.value]

			break

		case 'in':
			//Ein . A script to process inputs by default. Sending this into output returns the script data
			//lines itself
			break
	//maybe ~/out should be able to be processed by orbs..
		case 'out':
			//Eout. 
			break


	}
}//swKEnt

//.. i think we also need a switch for orbs conkeys on CS..!!! ..maybe we can modify the one we have just a little.. 
//
//a switch for orbs conkeys on RS.. but also CS?
//!!!!!!!!!!ok done. We need to test this op implementation here before proceeding !!!!!!!!!! GN MY GUY YOU VE BEEN INCREDIBLE!!
const swCKOrb = function(o ,cont, ckey,po,op){ //takes an orb, a container and a container key. modify value using op
	if(cont=='text'){
//we want to use RS[1] number to retrieve o.data line but we first check if orb even has data and if that line even has something
		if(o.txtLi){
			if(o.txtLi.length==0){return 'end'}//nothing here


//so what if we want to put op[0] on a new line on target text..
			if(ckey=='last'){
				if(op){
					//we want to put op[0] on the last line of the orb text
					o.txtLi[o.txtLi.length-1].txt = op[0];
					//lets roll with this CSout for now..
					CSout = [op[0]]; return CSout
				}
				var lastl = o.txtLi[o.txtLi.length-1].txt;
				var RSout = [lastl];
			}
			if(ckey=='current'){
				if(op){
					//we want to put op[0] on the last line of the orb text
					o.txtLi[o.txtB-1].txt = op[0];
					//lets roll with this CSout for now..
					CSout = [op[0]]; return CSout
				}
				var currentl = o.txtLi[o.txtB-1].txt;
				var RSout = [currentl];
			}
			if(ckey=='cn'){
				if(op){
					//should only accept numbers.. max is number of lines in text
					o.txtB = op[0];
					//lets roll with this CSout for now..
					CSout = [op[0]]; return CSout
				}
				var cnl = o.txtB;
				var RSout = [cnl];
			}
			//text/number
			//if RSout stil undefined, we ask if this is a number we can work with
			if(RSout==undefined){ //asume its a number.. but it might not
				var rln = parseFloat(ckey);//we need to turn ckey into a number
				//if(rln==undefined){return 'end'}
				let nan = isNaN(rln);
				if(nan){return 'end'}
				if(rln>o.txtLi.length){return 'end'}
				if(op){
					o.txtLi[rln-1].txt = op[0];
					CSout = [op[0]]; return CSout
				}
				var rl = o.txtLi[rln-1].txt;
				if(rl){var RSout = [rl];}
			}
		}
		//.. if no data defined, then we should return 'end'
	}
	if(cont=='script'){
		if(o.script){
			if(o.scC.length==0){return 'end'}//nothing here

			if(ckey=='run'){
				if(po==0){
					if(op){o.scR=op[0];} return [o.scR]	
				}else{
					var run = ['off','once','loop','repeat']; 
					var n = run.indexOf(o.scR);
					var res = n+po;
					if(res>=run.length){res--;} 
					if(res<0){res++;} 
					o.scR=run[res];
					return [run[res]]
				}
			}

			if(ckey=='last'){
				if(op){
					o.scC[o.scC.length-1] = op[0];
					//lets roll with this CSout for now..
					CSout = [op[0]]; return CSout
				}
				var lastl = o.scC[o.scC.length-1];
				var RSout = [lastl];
			}
			if(ckey=='current'){
				if(op){
					o.scC[o.scB-1] = op[0];
					//lets roll with this CSout for now..
					CSout = [op[0]]; return CSout
				}
				var currentl = o.scC[o.scB-1];
				var RSout = [currentl];
			}
			if(ckey=='cn'){
	//we probly want cn to manage toggle
				if(op){
					//should only accept numbers.. max is number of lines in script
					o.scB = op[0];
					//lets roll with this CSout for now..
					CSout = [op[0]]; return CSout
				}
				var cnl = o.scB;
				var RSout = [cnl];
			}
			if(RSout==undefined){
				//we need to turn RS[1] into a number
				var rln = parseFloat(ckey);
				let nan = isNaN(rln);
				if(nan){return 'end'}
				if(rln>o.scC.length-1){return 'end'}
				var rl = o.scC[rln-1];
				if(op){
					if(rl){
						o.scC[rln-1] = op[0];
						CSout = [op[0]]; return CSout
					}
				}
				if(rl){var RSout = [rl];}
				if(rl==undefined){return 'end'}
			}
		}

	}

	if(cont=='image'){
		if(o.image){
			if(ckey=='file'){
				if(op){
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
									'px',o.x,//o.x
									'py',o.y,//o.y
									'pw',Img.img.width,'ph',Img.img.height
								]
							);
							return 
						}//match
					}
					return 'end'
					//o.img = op[0]
					//CSout = [op[0]]; return CSout
				}
				var RSout = [o.imgfile]
				return
			}
			if(ckey=='run'){
				if(po==0){
					if(op){o.imgR=op[0];} return [o.imgR]	
				}else{
					var run = ['off','once','loop','repeat']; 
					var n = run.indexOf(o.imgR);
					var res = n+po;
					if(res>=run.length){res--;} 
					if(res<0){res++;} 
					o.imgR=run[res];
					return [run[res]]
				}
			}
			if(ckey=='current'){

			}
			if(ckey=='cn'){

			}
		}
	}

	if(cont=='circle'){
		if(o.circle){
			if(ckey=='run'){
				if(po==0){
					if(op){o.cirR=op[0];} return [o.cirR]	
				}else{
					var run = ['off','once','loop','repeat']; 
					var n = run.indexOf(o.cirR);
					var res = n+po;
					if(res>=run.length){res--;} 
					if(res<0){res++;} 
					o.cirR=run[res];
					return [run[res]]
				}
			}
			if(ckey=='current'){
				if(op){
					o.cirF[o.cirB-1] = op[0];
					//lets roll with this CSout for now..
					CSout = [op[0]]; return CSout
				}
				var currentl = o.cirF[o.cirB-1];
				var RSout = [currentl];			
			}
			if(ckey=='cn'){

			}
//a mirror for circle forms
			if(ckey=='mirror'){
// ?>>orb/circle/mirror
//mirror pretty much requires op because... what could mirror do on the left side RS? ... one sec $/circle/mirror>> ... maybe an instruction
//to copy a beat
				var mirror = {
					is:'circle', radius:o.cirS.radius,
					x:o.x,//+window.innerWidth/2,
					y:o.y,//+window.innerHeight/2,
					r:o.cirS.r, g:o.cirS.g, b:o.cirS.b, a:lo.cirS.a 
				}
				Mirror(op[0],mirror,o.cirL);
				o.o=op; return

			}//mirror

		}
	}

	if(cont=='rectangle'){
		if(o.rectangle){
			if(ckey=='run'){
				if(po==0){
					if(op){o.rectR=op[0];} return [o.rectR]	
				}else{
					var run = ['off','once','loop','repeat']; 
					var n = run.indexOf(o.rectR);
					var res = n+po;
					if(res>=run.length){res--;} 
					if(res<0){res++;} 
					o.rectR=run[res];
					return [run[res]]
				}
			}
			if(ckey=='current'){

			}
			if(ckey=='cn'){

			}
		}
	}

	if(cont=='osc'){
		if(o.oscillator){
			if(ckey=='run'){
				if(po==0){
					if(op){o.oscR=op[0];} return [o.oscR]	
				}else{
					var run = ['off','once'];//,'loop','repeat']; 
					var n = run.indexOf(o.oscR);
					var res = n+po;
					if(res>=run.length){res--;} 
					if(res<0){res++;} 
					o.oscR=run[res];
					return [run[res]]
				}
			}
			if(ckey=='current'){

			}
			if(ckey=='cn'){

			}
		}
	}

	return RSout
}//swCKOrb


//string beat text to array beat. neat . ok but we need to consider the random asignment sinthax '..12-23'
//r,123,g,225,b..
const txtToB = function(txt){
	var beat = []; 
	var ba = txt.split(',');
	var len = ba.length-1;
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


//deprecated
//TXT ORB
//a function to return a txt memory. we will create these orbs in different situations.
//!!!!!!!!!!!!!!!!!!!!!!1
//okok so now we will have text memory orbs. They will have a circle to represent their prim location, and a number of parameters
//to determine the orb behavior. Orb memories will use input and output packets to update their changes and call print to update
//all lines controled by the orb. When there are no updates, the orb memory will check for its life span or for listeners etc.
//most commands will have an effect on this Orb. this object lives in all.orbs
all.txtOrb = function(){
	var o = {
		name:undefined, form:'Text',//form here? .. probly unnecesary, orbs live in all.orbs array
		id:undefined,
		se:undefined, //sub events could be 'open', 'closed' etc
		mode:undefined, //.. do we need mode
//ok so since this orb structure wont live in all.anim_a, we are going to need it to have a circle state to illustrate its
//primordial form location and appearance. Its prim will be the circle state itself OR the circle state id.. not sure which one is
//more efficient. I think just id can work
		primX:undefined, primY:undefined,
		spacer:15,
		selL:1,//the line currently selected
		selB:0,//line beat selected
		insOp:'new line', //'modify' / 'remove'
		lines:[
//so lines here probly just 1 array of changes per line.. even text can go in the array here.. these are literaly beats
			//['something blabla...','txt',1,'a'], [] //...
		],
		channels:[], //ids of entities or vessels that the memory is listening to
		limitL:5, //the last lines to display /'all' display all lines
		anchor:false,
		synch:undefined, 
		layer:2,
		font:'18px Courier New', align:'left',
		loop:true //here?
		//tin:false, tout:false  //booleans to allow this txt orb to listen to input and output data in proximity
	}
	return o
}

//txt states will now be lines. They will need an id to be asociated with their controling memory orb.
//all parameters of a line should be contained in custom_a, by default there is just one item holding all print data
//this object lives in all.anim_a
all.txtLine = function(){  //so a line needs at least 1 beat to work. and this works good because we use beats from txt orb on print
	var l = {
		is:'f', id:undefined, //st:st, //orb_name:undefined, anim_name:undefined, 
		//txt:undefined,
		font:'18px Courier New', //do we need font here.. ?
		align:'left', //by default could be left
		layer:2, //se: undefined, //subevent
		//x:0, y:0,
		txt:undefined,
		r:210, g:210, b:210, a:1, 
		t:-1, s:"txt", layer:2, loop:false, //do we need loop here?
		display:'custom', mode:undefined,
		custom_a:[
			[1,'a'],0
			//beat,0
			//[220,'r',220,'g',220,'b', 1, 'a', x, 'x', y, 'y', txt , 'txt']
		]
	}
	return l
}

//circle state
all.circle_s_new = function(name){
	var state = {
		is:'f', name:name, 
		x:0, y:0, radius:40, inside:"empty",
		tx:0, ty:0,
		r:180, g:180, b:180, a:0.8, layer:0, 
		loop:false, run:true, s:'circle',
		ft:undefined, rt:-1, et:undefined, nfreq:undefined, anim:undefined,
		//
		t:-1, display:undefined,
		custom_a:[],
		data:[]
		//u_d:[]

	};
	return state;
}


//deprecat...
all.txt_s_new = function(name){ //loop, st, sf, ctx
	var state = {
		anim:undefined,  //anim in txt edits hold lines..
		is:'f', name:name, //st:st, //orb_name:undefined, anim_name:undefined, 
		//ctx:undefined, 
		loop:false,
		txt:undefined, font:'10px Courier New', 
		align:'left', //by default could be left
		x:0, y:0, tx: 0, ty: 0, //sx:0, sy:0,//i think 0 should be default
		r:210, g:210, b:210, a:1, layer:2, //se: undefined, //subevent
		t:-1, //wait:undefined, //nfreq: undefined,
		s:"txt", //cursor tag and anim_func activator

		t:-1, display:'normal',
		custom_a:[],

		u_d: []

	}
	return state
}

//rect state
all.rect_s_new = function(name){
	var state = {
		is:"f",  name:name,   
		x:0, y:0, w:70, h:70, inside:"empty",
		tx: 0, ty: 0,
		r:180, g:180, b:180, a:0.8, layer:0, 
		//ctx:undefined, 
		loop:false, run:true, s:'rect',
		ft:undefined, rt:-1, et:undefined, nfreq:undefined, anim:undefined, 

		t:-1, display:undefined,
		custom_a:[],
		u_d: []
	};
	return state;
}




/*
//we can destructure like this
var qwe = {a:'aa', b:'bb', c:'cc'}
var {a,b,c} = qwe;
a , b and c will now be defined and hold their values on qwe. nice 
*/
//interpolation. a and b are 2 different point on a vector. t is the position we want in between the point. we can use decimals
//0.1 , returns the 10% of the distance, 0.3 returns 30% and so on
//negative values return points outside, its called extrapolation. values over 1 extrapolates to the other side
var lerp = function(a,b,t){ 
	return a+(b-a)*t;
}
//we could use this one to avoid funny numbers
var lerpe = function(a,b,t){//lerperfect
	return a*(1-t)+b*t;
}
//we can also work with 2 dimensions at once so we can feed objects with x and y coordinates into the function...
var vLerp = function(A,B,t){
	return{
		x:lerp(A.x,B.x,t),
		y:lerp(A.y,B.y,t)
	};
}
//..
//but we just want to work with x and y directly. return an object with x and y
var xyLerp = function(x1,x2,y1,y2,t){
	return{
		x:lerp(x1,x2,t),
		y:lerp(y1,y2,t)
	};
}


//we can return an array with number n of equidistant points between 2 points A and B where each returned point is an object
//with x and y coordinates . untested
var equidisLerp = function(A,B,n){
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

var vLerpG = function(A,B,t){ 
	var res ={}
	for(let attr in A){
		res[attr]=lerp(A[attr],B[attr],t);
	}
	return res
}


//a function to spawn a number between min and max.. might be simpler
all.get_r_num = function(min, max){return Math.floor(Math.random() * (max - min + 1) ) + min;}

//get dist.
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

//
//a TIMER ?
//use Date.now and any other refference
//Just create an instance to loop this function when a timer is necesary. It should run on each logic loop
//.. so maybe this can help with audio stuff
/*
all.timer = function(){
	var msec = Date.now()/1000;
	var sec = msec-Math.floor(msec);
	all.stream_a.push(sec);
	all.screen_log()
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

//better yet. find specific param of specific object on specific array using name of object and change value of param
//.. now if i could change more than one param on the same single loop that l be sweet
//a built in object on functions. arguments.length returns how many arguments are passed to the function
//write a single new_pv function that can self resolve how many arguments is going to use
//first arg is the array we wish to modify, second is the name of that specific item to work on,
//third and fourth are the parameter and the new value we want for that parameter.
//Must be able to repeat third and four params in order to change as many params as we want on a single loop
//if no name or id is passed, affect all items on array . ?
//
//try to use the highest number of changes at once so all is done in a single loop run. 
//just here for refference, we not using this one now
//deprecat
all.new_pv = function(a,n,p,nv){
	var i = 0; var l = a.length;
	while(l--){
		if(a[i].name == n){
			a[i][p]= nv; //fist pair goes like this normally
			var args = arguments;
			if(args.length>=6){
				var p_i = 4; var l2 = args.length-4;
				while(l2--){
					if(p_i >= args.length) {return}
					a[i][args[p_i]] = args[p_i+1];
				p_i=p_i+2;}
			}
			return
		}
	i++;}
}



//......HERE
//ok first the mind, then the body. s.u_d works because it add changes after we clear. we need to check user stance, get access to
//element stanciated, ask for commands available. next we need to ask for orbs scripts,
//next we check for elements updates: vessels, husks, waves

//ANIM_FUNC
//In anim_func, anim_a will be checked. So a loop will run trough every state .
//states will be items in anim_a. states would be easily accesible by any object on up_objs
//states should be structures to contain specific kinds of data. They need a tag for
//easy access from logic control
//and they need to be differenciated. A single state for a whole object (entity)
//wouldn make any sense
//states need to hold specific parameters to paint specific tings
//a logic process can even directly change a specific parameter using tag name
//(act statements).
//anim_func loop. the ml_up of animations o,o runs backwards ! ! !
//the idea of using tags to make states behave on specific ways is very good ithink.
//tags nfreq only work using orb.anim to retrieve next frame.
//If i want to run animations using a diferent array i should use a new tag for that.
//Void envelopes should totally be out of users capability of customization.
//users should only be able to excert control on orbs memories trough act language
//States should be as simple as possible, and they should just come and go from 
//anim_a if it becomes complicated to track a single state
//Logic fluidity should t be harmed by states running as they should 
//!!!!!!!!

//anim_func operations should be optimal, we need fast responses and
//animations Must feel fluid. avoid repetitive loops and expensive operations
//at all cost.

//... new system. we dont even need logic to clear, we just clear the only canvas there is once per beat.
//clear the whole screen. only clear the part of the canvas which is visible to the user.
//we are working with one single canvas now

//... ok so what if we simply use one context and we just clear and draw at every beat. animations clears would not overlap anymore..
//it might be a bit forced but it does look like the most simple solution.
//time would simply affect how many times the same frame its going to be drawn before drawing the next one.
//ok lets do rect, cricle and the img for a start... text animations should also implement this new system because we want to
//run these text as animations, changing colors and displacing trough the screen.
//ANIMF
//To create layers without having to create whole context we run animf once, but we push drawing cue into different arrays depending
//on the order we want to draw the thing.
//To change the order in which we want to draw a specific state, we just push the state in the corresponding draw cue
//array.


//just push to different draw cues. this is far much more manageable and efficient.
//each state holds an instruction to indicate layer. after animf checks, we ask layer and place on corresponding draw cue array. simple
//no need to rearrange items on array, no need to run loops against the same array more than once
//SOUND
//Am thinking we are going to need prims for sound as well. Since sound will also behave as a memory Orb and will have a
//center and an area of influence

all.anim_func = function(){
	var l = all.anim_a.length;
	while(l--){
		var s = all.anim_a[l]; //s for state


//c_circle CIRCLE
//All mayor elements are circles. vessels , husks and waves and there are always a few around so we might as well just ask first
//new system . i could even go further and just check if it really is more efficient to just clear all screen on a specific context
//once instead of making all these little clears for each state... //done. we have layers now and just one single ctx
		if(s.is=="c_circle"){

			if(s.display=='custom'){
				if(s.t<0){s.t=s.custom_a.length-1;}
					//var clr = s.custom_a.length-1;
					//s.t=clr;//s.custom_a.length-1;
				var delta = s.custom_a[s.t];
				var lc = delta.length;
				//if(lc){
				while(lc--){
					var p = delta[lc]; var v = delta[lc-1];
					var nv = v;
					if(v.length==undefined){}else{
					//a random notation system.. i like this one
						var dots = v.substr(0,2);
						if(dots=='..'){
							var cded = v.substr(2);
							//console.log(cded,dots,nv);
							var cdeda = cded.split("-");
							var min = parseFloat(cdeda[0]); var max = parseFloat(cdeda[1]);
							var n_rand = all.get_r_num(min,max);
							nv = n_rand;
						}
					}

					s[p] = nv;
					//s[p] = v;
				
				lc--;}//we decrease again because its a parameter value pair in the array. must be, always
				s.t--;
				s.is='circle';
			}//custom system

//this system is clearer , more versatile and less poluted than the old one... and this is also old now.. we should just
//use custom_a system.... deprecat
			if(s.run==false){s.is="f";}
			if(s.run==true){
				//no more clears oh jeez
				//all.u_state(s); //u_states kinda useless now
				if(s.rt==-1){}else{ //here is how we clear and do nothing
					s.rt++; s.ft--; //keep timers together here
					if(s.rt<s.et){
						//we ask for frame time
						if(s.ft>0){
							s.is='circle';
						}
						if(s.ft==0){//ask for nextframe
							s.nfreq++;
							var nf = s.anim[s.nfreq];
							s.x=nf.x; s.y=nf.y; s.radius=nf.radius;
							s.r=nf.r; s.g=nf.g; s.b=nf.b; s.a=nf.a;
							s.inside=nf.inside; s.ft=nf.ft; s.is='circle';
						}
					}
					if(s.rt>=s.et){
						//time up. we reinitialize the state.all properties are taken from f0
//to initialize we want to set rt=0 , and nfreq=0; . we dont need to touch et. and loop will determine s.is value
						var nf = s.anim[0];
						s.x=nf.x; s.y=nf.y; s.radius=nf.radius;
						s.r=nf.r; s.g=nf.g; s.b=nf.b; s.a=nf.a;
						s.inside=nf.inside; s.ft=nf.ft;
						s.rt=0; s.nfreq=0;
						//we then ask for loop
						if(s.loop){s.is='circle';}else{s.rt=-1;}
					}	
				}//rt -1
			}//run

		}//c_circle

//using circle for circle draw
		if(s.is=="circle"){
			if(s.offs){s.is='c_circle';}else{
				if(s.layer==0){visual_q0.push(s);}
				if(s.layer==1){visual_q1.push(s);}
				if(s.layer==2){visual_q2.push(s);}
				//all.anim_cue.push(s);
			}
	//lets just continue after these checks, there is nothing more for circles down here.
			continue

		}//circle animation


//a value for fading out is = "slow_fade_out" sfo
//i need a new "is" to make graphic states dissapear changing alpha value,
//kinda like fading out to give a fading effect? maybe no 'is' necc3sary

//audio states
//.. so maybe i should put all flow logic here as well for order s sake. 
//AUDIO
		if(s.is=="audio"){
			//s.t++; //...
//maybe state needs to know animation duration....maybe. probly. for acts access
			if(s.end=="end"){
			s.src_node.stop(); s.src_node.disconnect(); s.is="rm";
			}
/*
			//a tag for audio state to tell it to stop by fading out
			if(s.end=="fade"){
				s.gain_n.gain.setTargetAtTime(0, all.au.currentTime + 0.1, s.fade);
				s.end = "check";
			}
			if(s.end=="check"){
				if(s.gain_n.gain.value<=0.00){
					s.src_node.stop(); s.src_node.disconnect(); s.is="rm";
				}
			}
*/
		}





//text states
/*
//ok so now am thinking, we need time. we select a number of beats to loop the txt animation. we say 10 beats, animation will print
//10 times the same. but now we need a command to modify each beat properties. so the first 5 beats will have all the same properties
//but 20 red, and the last 5 beats is the same, but now we l have 200 red... so its basically a framing system.. yeah 
//ok so choose a number of beats, and add one change at a time for each beat. . so animf asks what beat number are we, then checks
//for a change on said beat, and then prints and loop
//o.op6 keep track of beat. all changes in color, position, transparency are registered with currently selected beat and pushed into
//a[0].custom_a=[] .
//s.display = 'custom'.. custom has an array with objects. each object represents changes from then to the end of the loop. a loop
//has as many beats as this array. so we use a counter to change what item to use to affect the line property.
*/
//TXT
		if(s.is=="c_txt"){
//.. no the print function needs to run somewhere else..
//only line1 should be able to have print value here. print takes properties from this state and uses them to create the rest
//of the ext anim lines. kinda like print does on edit mode but now we use this state as anim[0] line 1. this state has the anim
//property to retrieve all lines txt values. print actually searches the rest of the line states if they are already on animf and
//quickly clears and banishes them and then it prints the whole text again.
//we use print on act scripts because is easier to keep track of line1 to apply any desired changes to the rest of the animation lines.
//and i think we can treat ft and rt on txt states just the same as others..? noup, ft counts up, t counts down..
//but maybe we dont really need to manipulate time and duration on texts from act scripts.. i rly dont think its escential
			if(s.display=='remove'){s.is='rm';}
			//print here is used by act scripts? the idea was to..
		//update text on screen when new lines arrive. We only want to print again(create all lines again) on lines modifications
	//so this operation probly needs to live in orb_up.? txt_up?
			if(s.display=='print'){
				//always clear old lines if any
				var l0=s.anim[0];
				var al = all.anim_a.length; var cl_pl = (l0.name.length+5);
				while(al--){
					var cs = all.anim_a[al];
					if(s.name){
						var name = cs.name.substr(0, cl_pl);
						if(name == l0.name+'_line'){ //so it removes all lines right now
							//s.is="rm"; 
							if(index==l){}else{
								var index = all.anim_a.indexOf(cs); 
								all.anim_a.splice(index,1);
							}
						}
					}
				}//old lines clear loop

				//print lines of anim from top to bottom using s as starting point
				var i = 2; //we start from 2 here because we dont want to create line1(this very state) again. 
				var al = s.anim.length-1; //not sure what length to use
				var spacer = s.spacer; //spacer unsure yes
				while(al--){
					var l_txt = s.anim[(i-1)].txt;
					var print = all.txt_s_new(s.anim[0].name+"_line"+i+s.actid);
					//print.ctx=ctx1; 
					print.x=s.x; print.y=s.y;
					print.r=s.r; print.g=s.g; print.b=s.b; print.a=s.a;
					print.font=s.font;
					print.tx=s.tx; print.ty=s.ty;
					print.is="txt"; print.txt=l_txt;
					print.y=print.y+spacer; //next line y position difference . we need spacer on s0
					print.display=s.anim[0].display;
					print.custom_a=s.anim[0].custom_a;
					print.t=-1;
					all.anim_a.push(print);
				spacer = spacer+s.spacer;
				i++;}

				s.display=s.anim[0].display;
			}
//do we even need normal...? i dont think so. we could just use custom with 1 item
			if(s.display=='normal'){s.is='txt';}
			if(s.display=='ignore'){s.is='f';}
//custom
			if(s.display=='custom'){
				if(s.t<0){
					var clr = s.custom_a.length-1;
					s.t=clr;//s.custom_a.length-1;
	//and also we need to restore properties to initial.. so just keep initial properties on
	//s.custom_a last item :) yeah nice one
				}
				var delta = s.custom_a[s.t];
//the custom_a items are simple strings with instructions. there are as many items as beats the txt animation has. instructions on each item
//change all the states properties. these changes apply for each succesive beat until s.t reaches 0
//so delta could be;  [20,'r',0.4,'a'] , alpha is set to 0.4, r is set to 20 and so on
				var lc = delta.length;
				while(lc--){
					var p = delta[lc]; var v = delta[lc-1];
					var nv = v;
					if(v.length==undefined){}else{
						var dots = v.substr(0,2);
						if(dots=='..'){
							var cded = v.substr(2);
							var cdeda = cded.split("-");
							var min = parseFloat(cdeda[0]); var max = parseFloat(cdeda[1]);
							var n_rand = all.get_r_num(min,max);
							nv = n_rand;
						}
					}
					s[p] = nv;
				//we decrease again because its a parameter value pair in the array
				lc--;}
				s.t--;
				s.is='txt';
			}//custom system

		}//c_txt
		
//if s is "txt" means is text state not printed. so it will print
		if(s.is=="txt"){
			if(s.offs){s.is='c_txt';}else{
				if(s.layer==0){visual_q0.push(s);}
				if(s.layer==1){visual_q1.push(s);}
				if(s.layer==2){visual_q2.push(s);}
			}
			continue
		}//txt animations


//When we use time and duration on a script we are also reffering to different parameters on states wich account
//to what users perceive as time. scripts synthax purpose is to facilitate animation to users.
//if time = number, sum t(ft) of every frame operation to asign requested nfreq and ft
//if duration = number, simply change et directly

/*
//run time rt could manage nfreq to run the animation from a specific point.
//run time param retrieving sums all ft from every frame and stops at requested number
//we just need to asign to nfreq the frame at which sum stoped
//what if we stop, change rt and start running.. ? in that case, we need to run the
//ft sum operation so anim f can tell from where animation starts running
//the reason we are working with rt now and not frames directly is because we can
//decide for how long a frame stays on screen to control animation speed and rythm,
//and so the number of beats may differ from the number of frames depending on the
//specific animation we are running, hence, we need a beat counter for animations
//that run with frames.
//audio anims and txt work differently but we still want to
//use 'time' and 'duration' instructions to make these operations
			//
//rt, run time. a counter to manage how many beats are we into the animation at
//any time. 
//et, end time when rt reaches et value, animation reinits from frame 0.
//frame time, end time, run time. ft , et, rt
//logic is permanent, we should be able to manage these timers from the state,
//we dont want to create logic resources to always control directly timer parameters
//of a state because actors could mess up timers for other actors
//.. so rt adds 1 at every check and it becomes 0 when animation initializes
//if a run reaches an asigned duration value, it will stop and reinit and ask for loop
*/

//c_img
//ok so we are adding a rt(run time) counter which adds up 1 on every update. its
//reference will be nfreq. we can synch all using nfreq, rt and ft. t will
//change name to ft(frame time). we are also adding et(end time) , by defaul
//its value is going to be the sum of all animation ft. animation state
//will automatically reinit when rt value
//reaches et value. et will be stored on frame0 for visuals.
//acts will now be able to control very precisely how animations will run.
//everytime we want to do anything its c_something , run true. we clear and add changes. we can even freeze again after changes
//IMG
		//FUNC
		if(s.is=="c_img"){
//this system is clearer , more versatile and less poluted
//ok so to mannually just print once and let it be which is rare, mostly bg operations, make s.is=s.s and set run to false
//to ignore checks.
//ok. make it so we can control run start just by changing rt . you need to work on phase 1 statement pushing the link of img state
//.. gn
//ok so if run on, animation will run from rt to et and self reinit.
			if(s.run==false){s.is="f";}
			if(s.run==true){
				//all.u_state(s);
				if(s.rt==-1){}else{ //here is how we clear and do nothing but keep running
					s.rt++; s.ft--; //keep timers together here
					if(s.rt<s.et){
						//we ask for frame time
						if(s.ft>0){
							s.is='img';
						}
						if(s.ft==0){//ask for nextframe
							s.nfreq++;
							var nf = s.anim[s.nfreq];
							s.x=nf.x; s.y=nf.y; s.w=nf.w; s.h=nf.h;
							s.px=nf.px; s.py=nf.py; s.pw=nf.pw; s.ph=nf.ph;
							s.a=nf.a; s.ft=nf.ft; s.is='img';
						}
					}

					if(s.rt>=s.et){//!!!!!!!!!!!!!!!! >=!!!!
						var nf = s.anim[0]; //frame 0
						s.x=nf.x; s.y=nf.y; s.w=nf.w; s.h=nf.h;
						s.px=nf.px; s.py=nf.py; s.pw=nf.pw; s.ph=nf.ph;
						s.a=nf.a; s.ft=nf.ft;
						s.rt=0; s.nfreq=0;
						//we then ask for loop
			//so instead of sending to f straight away, we could do rt-1 . this way we only need to change rt value to start
			//the animation again just once... yeah this is good because animation run value can keep being true but the animation
			//wont run until we do rt = 0. 
						if(s.loop){s.is='img';}else{s.rt=-1;}//s.is='f';}
					}	
				}//rt -1

			}//run

		}//c_img

//img
		if(s.is=="img"){
			//s.se ='started';?
//is it ok to just store a context refference on a state? i l have to test out the cost
//.. maybe i could use a number to create the context refference here on use.. i l test that later
//..so instead of inmediately draw , we cue state data to be used to draw later
			if(s.offs){s.is='c_img';}else{
				if(s.layer==0){visual_q0.push(s);}
				if(s.layer==1){visual_q1.push(s);}
				if(s.layer==2){visual_q2.push(s);}
				//all.anim_cue.push(s);
			}
			//all.anim_cue.push(s);
			continue
		}//img animation


//c_rect RECT
		if(s.is=="c_rect"){
			if(s.display=='custom'){
				if(s.t<0){
					var clr = s.custom_a.length-1;
					s.t=clr;//s.custom_a.length-1;
				}
				var delta = s.custom_a[s.t];
				var lc = delta.length;
				//if(lc){
				while(lc--){
					var p = delta[lc]; var v = delta[lc-1];
					//if(s.t==clr){s[p]=v;}else{s[p] = s[p]+v;}
					s[p] = v;
				//we decrease again because its a parameter value pair in the array
				lc--;}
				s.t--;
				s.is='rect';
			}//custom system

//frame system
			if(s.run==false){s.is="f";}
			if(s.run==true){
				//all.u_state(s);
				if(s.rt==-1){}else{ //here is how we clear and do nothing, but leaving all up to s_u
					s.rt++; s.ft--; //keep timers together here
					if(s.rt<s.et){
						//we ask for frame time
						if(s.ft>0){
							s.is='rect';
						}
						if(s.ft==0){//ask for nextframe
							s.nfreq++;
							var nf = s.anim[s.nfreq];
							s.x=nf.x; s.y=nf.y; s.w=nf.w; s.h=nf.h;
							s.r=nf.r; s.g=nf.g; s.b=nf.b; s.a=nf.a;
							s.inside=nf.inside; s.ft=nf.ft; s.is='rect';
						}
					}
					if(s.rt>=s.et){
						var nf = s.anim[0];
						s.x=nf.x; s.y=nf.y; s.w=nf.w; s.h=nf.h;
						s.r=nf.r; s.g=nf.g; s.b=nf.b; s.a=nf.a;
						s.inside=nf.inside; s.ft=nf.ft;
						s.rt=0; s.nfreq=0;
						//we then ask for loop
						if(s.loop){s.is='rect';}else{s.rt=-1;}
					}	
				}//rt -1 else

			}//run

		}//c_rect

//rect
		if(s.is=="rect"){
			if(s.offs){s.is='c_rect';}else{
				if(s.layer==0){visual_q0.push(s);}
				if(s.layer==1){visual_q1.push(s);}
				if(s.layer==2){visual_q2.push(s);}
			}
			//all.anim_cue.push(s);
			continue

		}//rect animation
	


//if state is f means is frozen, will just be ignored but kept on anim_a
		//should simply be undefined if i just want to ignore it
		if(s.is=="f"){}//dont do anything

//if state is rm means is being removed
		if(s.is=="rm"){all.anim_a.splice(l,1);}

	}//anim_func loop

//after all states data is collected, first phase perform clears and
//modifications, second phase checks anim_cue to run animations
//all.anim_cue simply runs all states in it and flush.
//audio anims probly dont need phase 2 check !!!!
//PHASE2	
//phase2. draw
	//
	all.anim_drawall();
	
}//anim_func







all.txt_up = function(o){//takes txt memory orb prim
//TXT editor
//Txt editor should allow user to create a specific text to be displayed in a specific way.
//Write a line, position it, select color..
//The same txt animation can now take another line, and as many lines as user wants
//When txt animation is run , it will print at every beat, just like any other animation .

//it would be nice to see colourful roots holding the selected line and changing acordingly?.. maybe an idea for act script
//... i would like to see other acts scripts next to each other simultaneously.. this is done , we have .signal:_+/-e
//text probly needs a timer or an end condition.. editor should be able to provide
//that . . ..or maybe not neccesary.. we do want txt to be able to vibe , change colours , position and transparency periodically..
	//!!!!!!!!!!!!!!!!!!!!!!!
//... ok so we will now create txt memories in the void as well, so a txt memory will live in an independant prim
//EDIT
	//if(o.se=='editing'){
	if(o.edit_txt_mode==true){
		if(uinit){ 
			//var tt = all.transition(uinit.transition, uinit.stancefrom);//, uinit.stanceto);
			//if(tt=='all set'){
				var print = true; 
				o.op2 = 1; //always set selected line to 1
				uinit=false;
//we now also need to remove all states from running edits on inner mode if any.. so look for states with names that end in '__r'?
//.. dont remove them, simply offs them... __r thing should ask also for orb name and should be on beginning
		//so we are not going to need to do this anymore because memories now are independant.
				//var l = all.anim_a.length; 
				//while(l--){
				//	var s = all.anim_a[l];
				//	var namend = s.name.substr(-3, 3);
				//	if(namend == '__r'){
				//		//s.offs=true;
				//		all.anim_a.splice(l,1);
				//	}
				//}

			//}

			//if(tt==undefined){return}

		}//init

//ok so everyhting needs to work around grid zero, at the center of the orb. so we need to define grid zero, and all coordinates
//we use here to create animations need to be in X and Y , not in tx or ty, we dont use translates like this anymore, we use
//translates to move the user view exclusively
//grid zero here wont work properly if we change around user location so this needs revamp. fix this one first then we go to
//img editor

		//var ceX=-U.x+window.innerWidth/2; var ceY=-U.y+window.innerHeight/2;//grid zero
		//var ceX=o.primX; var ceY=o.primY;//grid zero
		var ceX=o.x; var ceY=o.x;//grid zero

		//op1 for text animation
		var anim = o.m;//o.txt[o.op1];
		var l0 = anim[0];
//i dont really need to change the line state directly since print will use
//line data on changes ..
		var a_line =  anim[o.op2-1];//animation line. data to keep

		//op6 for tracking beats on custom display
		//op5 for insert modes
		//op4 for input signaling
		//op3 for delta
		//op2 for line
		
		//delta control
		if(o.op3!=0){var delta = all.signify(o.op3);}
		if(delta){
			
			if(delta.signal=='exit'){
				o.inner_mode=true; o.edit_txt_mode = false;
				//uinit='orb edit';
				uinit={transition:'orb edit',stancefrom:o}//,stanceto:o};
//remove all lines from all opened txt anims.
				var tlen = o.txt.length;
				while(tlen--){
					var a = o.txt[tlen];
					if(a[0].open==true){
						//clear lines
						var l0=a[0];
						var l = all.anim_a.length; var cl_pl = (l0.name.length+5);
						while(l--){
							var s = all.anim_a[l];
							if(s.name){
								var name = s.name.substr(0, cl_pl);
								if(name == l0.name+'_line'){
									//s.is="rm"; 
									if(s.showcase==undefined){
										var index = all.anim_a.indexOf(s); 
										all.anim_a.splice(index,1);
									}
								}
							}
						}//clear lines loop
						
						a[0].open=false;
					}//if open
				}//txt anim loop

				//clear selected values
				o.op1= 0; o.op2= 0; o.op3= 0; o.op4= 0; o.op5= 0; o.op6= 0;
				//clear feed
				all.clear_stream(U.estream);
				all.stream_a.push("Out of txt edit mode"); all.screen_log();
				//console.log("Out of edit mode");
				return
			}
		
//we need a command signal to change our txt animation layer i think......
			if(delta.signal=='layer'){
				l0.Glayer=delta.value; var print =true;
			}


//a command to open a different txt to be edit3d simultaneously. open parameter
//on txt anim so exit command knows what states to remove when called
			if(delta.signal=='e'){
//delta value could be the index of the txt we wish to open and edit. the idea is user
//to be able to work on many texts at the same time
			//check if txt item exist
				if(delta.operation=='+'){var ni = (o.op1+1);}
				if(delta.operation=='-'){var ni = (o.op1-1);}
				if(delta.operation==undefined){var ni = delta.value;}
				if(o.txt[ni]){
					o.op1=ni;
					o.txt[o.op1][0].open=true;
					//uinit = 'all set'; //maybe i can just print...?
					var print = true;
					var anim = o.txt[o.op1];
					var l0 = anim[0];
					o.op2 = 1;
					var a_line =  anim[o.op2-1];
					 
					all.stream_a.push("Editing ..."+o.txt[o.op1][0].name); all.screen_log();
					//o.op3= 0;
					//return
				}else{
					all.stream_a.push("No txt found"); all.screen_log();
				}
			}
			
			//select next line
			if(delta.signal=='next'){
				o.op2++;
				if(o.op2>anim.length+1){o.op2--;}
				var a_line = anim[o.op2-1];
				if(a_line){o.op6=0;}
				var print = true;
			}
			//select prev line
			if(delta.signal=='back'){
				o.op2--;
				if(o.op2==0){o.op2++;}
				var a_line =  anim[o.op2-1];
				if(a_line){o.op6=0;}
				var print = true;
			}

//i could modify they we pass on size and font to work with custom display as well.
			if(delta.signal=='size'){
				if(delta.operation=='+'){
					var font = l0.font.substr(5);
					var size = l0.font.substr(0,2); parseInt(size); size++;
					l0.font = size+"px "+font;
					l0.spacer++;
				}
				if(delta.operation=='-'){
					var font = l0.font.substr(5);
					var size = l0.font.substr(0,2); parseInt(size); size--;
					l0.font = size+"px "+font;
					l0.spacer--;
				}

				var print = true;
			}//size

			if(delta.signal=='r'){
				if(delta.value>220){
					all.stream_a.push("Maximum value input is 220.");
				}else{

					//if(l0.display=='custom'){
					if(a_line.display=='custom'){
						//var l0c = l0.custom_a[o.op6];
						var l0c = a_line.custom_a[o.op6];
						var clo = l0c.length; 
						while(clo--){
							var alr = l0c[clo];
							if(alr=='r'){l0c[clo-1] = delta.value; var dont_p = true; break;}
						}
						if(dont_p){}else{l0c.push(delta.value,'r');}
						all.stream_a.push('New red value on beat '+o.op6);
					}else{
						l0.Gr=delta.value;// 
						all.stream_a.push("Numbers are red.");
					}
					var print = true;
				}
				all.screen_log();
			}
				
			if(delta.signal=='g'){
				if(delta.value>220){
					all.stream_a.push("Maximum value input is 220.");
				}else{
					if(a_line.display=='custom'){
						var l0c = a_line.custom_a[o.op6];
						var clo = l0c.length; 
						while(clo--){
							var alr = l0c[clo];
							if(alr=='g'){l0c[clo-1] = delta.value; var dont_p = true; break;}
						}
						if(dont_p){}else{l0c.push(delta.value,'g');}
					}else{
						l0.Gg=delta.value;// 
					}
					var print = true;
					all.stream_a.push("Grass is green.");
				}
				all.screen_log();
			}
				
			if(delta.signal=='b'){
				if(delta.value>220){
					all.stream_a.push("Maximum value input is 220.");
				}else{
					if(a_line.display=='custom'){
						var l0c = a_line.custom_a[o.op6];
						var clo = l0c.length; 
						while(clo--){
							var alr = l0c[clo];
							if(alr=='b'){l0c[clo-1] = delta.value; var dont_p = true; break;}
						}
						if(dont_p){}else{l0c.push(delta.value,'b');}
					}else{
						l0.Gb=delta.value;// 
					}
					var print = true;
					all.stream_a.push("Value is blue.");
				}
				all.screen_log();
			}
//.. should i just turn alpha into transparency and use a synthax similar to rgb? this whol + - messes up custom system..	
//just asign from 1-10 a so 1 translates to 0.1 , 2 to 0.2 and so on. 10 is 1. So bassically divide a_number by 10.
			if(delta.signal=='a'){
				if(delta.value>10){
					all.stream_a.push("Maximum value input is 10.");
				}else{
					if(a_line.display=='custom'){
						var l0c = a_line.custom_a[o.op6];
						var clo = l0c.length; 
						while(clo--){
							var alr = l0c[clo];
							if(alr=='a'){l0c[clo-1] = delta.value/10; var dont_p = true; break;}
						}
						if(dont_p){}else{l0c.push(delta.value/10,'a');}
					}else{
						l0.Ga=delta.value/10;// 
					}
					var print = true;
					all.stream_a.push("Transparency changed.");
				}
				all.screen_log();
			}

			//old alpha system
			//if(delta.signal=='a'){
			//	if(delta.operation=='+'){
			//		l0.Ga = l0.Ga+0.1;
			//		if(l0.Ga > 1){l0.Ga = l0.Ga-0.1}
			//	}
			//	if(delta.operation=='-'){
			//		l0.Ga = l0.Ga-0.1;
			//		if(l0.Ga < 0.1){l0.Ga = l0.Ga+0.1} 
			//	}
			//	var print = true;
			//}

			
//use C to Change the currently selected line from whats already on there
//C and X needs to have a line selected in order to work..
			if(delta.signal=='change'){
				all.chat_on = true;
				chat_in.style.display="inLine";
				chat_in.focus();
				chat_in.value = a_line.txt;
				o.op5=1;
				all.stream_a.push("Change the current line"); all.screen_log();

			}
				
			if(delta.signal=='remove'){
				anim.splice((o.op2-1), 1);
				all.stream_a.push("Line removed"); all.screen_log();
				var print = true;
			}
				
			//cursor
			if(delta.signal=='left'||delta.signal=='right'||delta.signal=='up'||delta.signal=='down'){
//wait so to work with custom here, just check for x or y or create item on custom_a, and calculate new
//x value on selected beat? sounds convoluted. we want cursor to let us move txt fast and easy to work with
//multiple txt at once. Lets reserve the use of .signal:x with custom and beats to create movement effects instead...
//or just push new values into selected custom frame directly this doesnt sound bad at all.

				if(delta.signal=='left'){
					l0.Gx=l0.Gx-delta.value;
				}            
				if(delta.signal=='right'){
					l0.Gx=l0.Gx+delta.value;
				}
				if(delta.signal=='up'){
					l0.Gy=l0.Gy-delta.value;
				}
				if(delta.signal=='down'){
					l0.Gy=l0.Gy+delta.value;
				}
				var print = true;
				//all.screen_log();
			}//cursor

//expressed like this , x and y properties are stored on beats to create movement on txt
//its an interesting idea . do it
			if(delta.signal=='x'){
				if(a_line.display=='custom'){
					var l0c = a_line.custom_a[o.op6];
					var clo = l0c.length; 
					while(clo--){
						var alr = l0c[clo];
						if(alr=='x'){l0c[clo-1] = delta.value; var dont_p = true; break;}
					}
					if(dont_p){}else{l0c.push(delta.value,'x');}
				}else{
					l0.Gx=delta.value;// 
				}
				all.stream_a.push("New x coordinate asigned on beat "+o.op6);
			}

			if(delta.signal=='y'){
				if(a_line.display=='custom'){
					var l0c = a_line.custom_a[o.op6];
					var clo = l0c.length; 
					while(clo--){
						var alr = l0c[clo];
						if(alr=='y'){l0c[clo-1] = delta.value; var dont_p = true; break;}
					}
					if(dont_p){}else{l0c.push(delta.value,'y');}
				}else{
					l0.Gy=delta.value;// 
				}
				all.stream_a.push("New y coordinate asigned on beat "+o.op6);
			}


//.signal:custom_number	Asigns a number of beats to the txt anim custom_a property. Last item holds current properties, all other items
//			are initially empty.
//only rgba properties values work on custom but we should be able to work with x y size spacer as well add these later..
//we need a simple and yet illustrative feedback for these operations. maybe dots or lines that change size to indicate beat position
//and differenciate the beat currently selected
//... so we want custom system to be able to be implemented on each line separatedly. instead of l0 we should use the selected line
//to create a custom_a that will beat only for that line. in this way we can just use the system on any other line including
//stream lines
//we need a command to restore a line into normal display... maybe custom_-1 should do it... but there is a problem here it doesnt
//work.. i l fix later this is weird.. its setting itself back to custom for some reason
			if(delta.signal=='custom'){
				var lc = delta.value;
				if(a_line==undefined){}else{
			//	if(delta.value==-1){
			//		a_line.display='normal'; var ok=true; lc=' zero'; a_line.custom_a=[];//?
			//		o.op6=0;
			//		anim[o.op2-1]=a_line;//animation line. data to keep

			//	}
			//	if(ok){}else{
					o.op6=delta.value-1;
					//shouldnt we define a line again..?
			//if display is already custom, we need to add or substract beats to fit the new value
					if(a_line.display=='custom'){
						if(lc<a_line.custom_a.length){
							var sub = a_line.custom_a.length-lc;
							while(sub--){
								a_line.custom_a.shift();
							}
						}
						if(lc>a_line.custom_a.length){
							var add = lc-a_line.custom_a.length;
							while(add--){
								a_line.custom_a.unshift([]);
							}
						}
					}else{
					//
						while(lc--){
							a_line.custom_a.push([]);
						}
						a_line.display='custom'; a_line.t=-1;
						var ori = a_line.custom_a[a_line.custom_a.length-1];
						//lets stick to rgba for now.. ok adding x and y
				//we need y to be consistent with line number. o.op2 holds line number, we need to calculate
				//y using the line number and l0.spacer
						var lineY = (l0.spacer*(o.op2-1))+l0.Gy;
						ori.push(l0.Gx,'x',lineY,'y',l0.Gr,'r',l0.Gg,'g',l0.Gb,'b',l0.Ga,'a');
					}
				//}//delta.value -1 , we set display to normal !!!!!!!!!! doesnt wurk!!!!!

				all.stream_a.push('Total number of beats is '+lc);
				all.screen_log();				
				var print = true;

				}//a_line safe
			}//custom



//.signal:beat_number	Selects a beat item on custom_a by number. Now we add changes to that beat. we use op6 to track current beat. 
//			So all changes in properties will now use op6 to push changes into custom_a correct item.
			if(delta.signal=='beat'){
				////
				if(delta.value>=a_line.custom_a.length){o.op6=a_line.custom_a.length-1; var ok = true;}
				if(delta.value<0){o.op6=0; var ok =true;}
				if(ok){}else{o.op6=delta.value;}
					
				all.stream_a.push('Current beat '+o.op6+' Listenning to changes.');
				all.screen_log();
			}//beat

			o.op3 = 0;
			
		}//delta

//use X and C to manipulate existing lines.
//C will allow user to change the selected line by puting the line txt on input
//so we can modify it from there
//X will completely remove the selected line. probly could ask to confirm
	//use op4 to let editor know when user want to enter input into a line 
		if(o.op4 == 1){
			//behavior by default
			if(o.op5==0){
				if(o.op2==1){
					var new_line = {
						Gx:a_line.Gx, Gy:a_line.Gy, Glayer:l0.Glayer,
						Gr:a_line.Gr, Gg:a_line.Gg, Gb:a_line.Gb, Ga:a_line.Ga,
						name:a_line.name, //Gt:a_line.Gt,
						running:a_line.running,
						display:a_line.display,
						custom_a:a_line.custom_a,
						t:-1,
						spacer:a_line.spacer,
						font:a_line.font,
						open:true, s:'txt',
						txt:all.c_input,
					}
					var prev0_line = {txt:a_line.txt, custom_a:a_line.custom_a, display:a_line.display}
					anim.splice((o.op2-1), 1, prev0_line);
					anim.splice((o.op2-1), 0, new_line);
				}else{
					var new_line = {txt:all.c_input, custom_a:[], display:'normal'}
					anim.splice((o.op2-1), 0, new_line);//o.op2-1?
				}
			}
			//C behavior .Change line
			if(o.op5==1){
				a_line.txt = all.c_input;
				o.op5=0;//normalize
			}

			o.op2++; //select next empty line automatically after pressing enter
			//all.stream_a.push("line "+o.op2); all.screen_log();
			o.op4 = 0; //normalize input flag
			var print = true;
			
		}//op4
		
		if(print){
//this could be part of an independent function to clear txt anims
			//good clear
			var l0=anim[0];
			var l = all.anim_a.length; var cl_pl = (l0.name.length+5);
			while(l--){
				var s = all.anim_a[l];
				if(s.name){
					var name = s.name.substr(0, cl_pl);
					if(name == l0.name+'_line'){ //so it removes all lines
						//s.is="rm";
						if(s.showcase==undefined){
							var index = all.anim_a.indexOf(s); 
							all.anim_a.splice(index,1);
						}
					}
				}
			}//clears
			//print lines of anim from top to bottom
			var i = 1; var l = anim.length; var spacer = 0;
			while(l--){
				var lin = anim[(i-1)];
				var print = all.txt_s_new(l0.name+"_line"+i);
				print.x=l0.Gx; print.y=l0.Gy;
				//here comes nothing. yup this is the way
				print.tx=ceX; print.ty=ceY;
				print.r=l0.Gr; print.g=l0.Gg; print.b=l0.Gb; print.a=l0.Ga;
				print.font=l0.font; print.layer=l0.Glayer;
			//use [] for selected line... this needs improve, the line number takes too much space
			//better now but still a bit sneaky
				if(o.op2==i){
					print.txt=lin.txt+'   '+i+'  <<';

				}else{print.txt=lin.txt+'   '+i;}

				print.is="c_txt";
				print.display = lin.display;
				print.custom_a = lin.custom_a;
				print.t=-1;
				print.y=print.y+spacer; //next line y position difference
				all.anim_a.push(print);
			spacer = spacer+l0.spacer;
			i++;}
		}//print
//feedback
//we need to see properties of beat selected: 11 .  and an animation to illustrate beats in time |start| 00000100007 |end|
//use Gx rgba properties on normal display. use last custom_a item on custom display
	//maybe custom display should be default and just use 1 beat. beat 0....
	//if(l0.display=='custom'){	
	if(a_line){
		if(a_line.display=='custom'){
			var c_b = o.op6; //current beat
			//var blen = l0.custom_a.length;
			var blen = a_line.custom_a.length;
			b_n_a = [];
			//var l1s = Fting(all.anim_a ,'name', l0.name+'_line1');
			var l1s = Fting(all.anim_a ,'name', l0.name+'_line'+o.op2);
			var c_t = l1s.t;
			while(blen--){
				var B = 0;
				if(blen==c_b){var B = 1;}
				if(blen==c_t){var B = 7;}
				b_n_a.push(B);
			}
			var beatit = b_n_a.join('');

			//get changes
			//var bit = l0.custom_a[o.op6].length;
//when we change line, we also need to adjust current beat selected. some lines might have less beats than others.
			var bit = a_line.custom_a[o.op6].length;
			var changes_a = [];
			while(bit--){
				//var bat =l0.custom_a[o.op6][bit];
				var bat =a_line.custom_a[o.op6][bit];
				changes_a.push(bat);
			}
			var batit = changes_a.join('>');

			if(o.op2==anim.length+1){var seline='NEW LINE';}else{var seline=o.op2;}
			all.stream_a.push(
				beatit,
				"txt name: "+l0.name,
				"current selected beat: "+o.op6,
				"changes: "+batit,
				"current selected line: "+seline,
				"layer: "+l0.Glayer
				);
			all.screen_log('estream');//estream		
		}else{all.clear_stream(U.estream);}
	}else{
		//we could still print some info here
		//if(o.op2==anim.length+1){var seline='NEW LINE';}else{
		all.clear_stream(U.estream);
	}

	}//text edit mode

}




//ex ML_UP (my logic update)
//STANCE UPDATE
//ORB
//all.orb_up runs when user on vessel stance . checking for modes reacting to commands and also check inits
//!!!!!!!!!!!!!!!
//ok so lets leave this orb_up to check for vessels and lets just create a new function txt_up to check on txt mode
all.orb_up = function(o){//takes orb structure

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//ok so most of these operations need to be reestructured and adjusted to fit the new logic so leaving this for refference
//but yeah is mostly deprecated.


//INNER mode
//Users need to access inner mode in order to create , modify , and have full control
//of orbs capabilities. Users may now run commands to access orb information and
//create animations , sounds and programable behavior
//show orb status(animations stored, image stored, jobs being executed, defense
//systems etc )
//User should be able to run on loop any animation on the background of inner mode, along with any sound as well. these animations
//are not interactive but help users have an idea of this orb potential
	//
//!!!!!!!!!!!!!!
//SO... instead of old orb check, what we are really going to need to do is; check for user stance.mode and stance... properties.
//stance.form could be.... txt , img, audio, osc , wave , vessel... stance.se could be.. editing , idling , running, playing
//... no
//!!!!!!!!!!!!!!!!!!!!!!!!

		if(o.inner_mode){
			if(uinit){
//from husk to inner mode>>husk got named, turning into a vessel. 'orb born'
//from radiant to inner>>user run .reform from radiant mode. 'orb reform'
//from other orb mode not radiant to inner>> user did exit signal from mode to inner. 'orb edit'
//from void to inner>> user casted a control command from void. 'orb inwards'
//we return run edits once. on next beat we return 'all set'
				//var tt = all.transition(uinit);
				var tt = all.transition(uinit.transition, uinit.stancefrom);//, uinit.stanceto);
				//if(tt=='set interface'){return}
				if(tt=='all set'){uinit=false; return}
//at this point we also need to push init states of all animations with the running tag on 'TRUE'. except for scripts. scripts dont 'run',
//scripts 'play', they work differently from 'edits' .so we run a loop to find all running edits and push their init states
//when transition returns 'run edits'. we do this when orb has running animations but user got in to edit some animation that
//was running already, changed it and then went from edit mode into inner mode again. we want to see those changes so we simply restart
//all animations.
				if(tt=='run edits'){
//am seriusly thinking about removing circle and rect editors completely...
		 			//circle
					var el = o.circle.length;
					while(el--){
						var a = o.circle[el];
						if(a[0].running=='TRUE'){
							var sr = Fting(all.anim_a, 'name', a[0].name+"__r");
							if(sr){
								//
							}else{
							var sr = all.circle_s_new(a[0].name+"__r");
							sr.anim=a; //sr.layer=1;//sr.ctx=ctx1;
							sr.tx=window.innerWidth/2; sr.ty=window.innerHeight/2; 
							//new
					 		var sret = all.getetv(a);
					 		sr.is='c_circle'; sr.loop = true;
							sr.et=sret; sr.rt=sr.et;
							all.anim_a.push(sr);
							}
						}
					}//circle

 					//rect
					var el = o.rect.length;
					while(el--){
						var a = o.rect[el];
						if(a[0].running=='TRUE'){
							var sr = all.rect_s_new(a[0].name+"__r");
							sr.anim=a; //sr.ctx=ctx1;
							sr.tx=window.innerWidth/2; sr.ty=window.innerHeight/2;
					 		var sret = all.getetv(a);
					 		sr.is='c_rect'; sr.loop = true;
							sr.et=sret; sr.rt=sr.et; 
							all.anim_a.push(sr);
						}
					}//rect

					//img
					var el = o.img.length;
					var ceX=o.primX; var ceY=o.primY;
					while(el--){
						var a = o.img[el];
						if(a[0].running=='TRUE'){
			//we cant push and run this state if the corresponding img file is not loaded..
						if(o.current_img_file.name==a[0].img_file_name){
							var sr = all.ims_s_new(a[0].name+o.name+"__r", o.img_access);
							sr.anim=a; //sr.ctx=ctx1;
							sr.showcase=true;
							sr.tx=ceX; sr.ty=ceY; sr.layer=1;//temporary
							//new
					 		var sret = all.getetv(a);
							sr.et=sret; sr.rt=sr.et;
					 		sr.is='c_img'; sr.loop = true;
							all.anim_a.push(sr);
						}//no img file safe
						}
					}//img

					//txt
					var el = o.txt.length;
					while(el--){
						var a = o.txt[el];
						if(a[0].running=='TRUE'){
			//.... needs to ask if states already exist.. or we could clear by default
			//print lines of anim from top to bottom
				var i = 1; var l = a.length; var spacer = 0; var l0=a[0];
				var ceX=o.primX; var ceY=o.primY;
				while(l--){
					var lin = a[(i-1)];
					//var l_txt = a[(i-1)].txt;
					var print = all.txt_s_new(l0.name+"_line"+i+o.name+'__r');
			//when we call these user should be centered on the orb already... 
					//var ceX=-U.x+window.innerWidth/2; var ceY=-U.y+window.innerHeight/2;
					print.showcase=true; //
					print.tx=ceX; print.ty=ceY;
					print.x=l0.Gx; print.y=l0.Gy;
					print.r=l0.Gr; print.g=l0.Gg; print.b=l0.Gb; print.a=l0.Ga;
					print.font=l0.font; print.layer=l0.Glayer;
					//print.tx=window.innerWidth/2; print.ty=window.innerHeight/2;
					print.is="txt"; print.txt=lin.txt;
					print.y=print.y+spacer; //next line y position difference
					print.display=lin.display;
					print.custom_a=lin.custom_a;
					print.t=-1; //print.run=1;
					all.anim_a.push(print);
				spacer = spacer+l0.spacer;
				i++;}
						}//if running true
					}//txt

					//osc
					//audio
					
					all.shadow_mode(stance);

					return	

				}//tt run edits

				if(tt==undefined){return}

			}//init inner mode

//INNERMODE , IDLING

//Use diferent signals here to manage orb on inner mode, broadcast, streams, sound
//background etc? this command is pretty op 
			if(o.op3!=0){var delta = all.signify(o.op3);}
			if(delta){
				if(delta.signal=='exit'){
					//exit on idling inner mode puts user back into the void
					stance = undefined; 
					uinit={transition:'orb outwards',stancefrom:o}//,stanceto:undefined};

					all.stream_a.push("User left .." + o.name); all.screen_log();
				}//exit
				
				o.op3=0;
				
			}//delta

		}//inner mode


//RADIANCE
//here goes phase 3 of act system?..
//While on radiant mode, input can be managed from act scripts. input typed on prompt
//doesnt go to mainstream anymore, it is piped into the orb radiant stream. Words and text on this stream is also available to be
//processed by act scripts
		if(o.radiant_mode){
			if(uinit){
				//var tt = all.transition(uinit);
				var tt = all.transition(uinit.transition, uinit.stancefrom);
				if(tt=='all set'){
					uinit=false;
			
					if(all.au){}else{all.au=all.audioser();} //safenet?
	//we now also need to remove all states from running edits on inner mode if any.. so look for states with names that end in '__r'
	//Because we dont want animations showcasing when animations will be synched with radiant orb activity
					var l = all.anim_a.length; 
					while(l--){
						var s = all.anim_a[l];
						var namend = s.name.substr(-3, 3);
						if(namend == '__r'){
							all.anim_a.splice(l,1);
						}
					}
					return
				}
				if(tt==undefined){return}
			}//uinit
			
//we need .signal here . op could help manage radiance. we need a way to request
//help, exit to void and changing back to orb stance from here as well

			if(o.op3!=0){var delta = all.signify(o.op3);}
			if(delta){
				if(delta.signal=='exit'){
			//exit on radiant mode puts user back into the void
					stance = undefined; 
					uinit={transition:'orb outwards',stancefrom:o}

					all.stream_a.push("User left .." + o.name); all.screen_log();
				}//exit
				
				o.op3=0;
				return
			}//delta


			
		}//radiant mode




//edit interfaces		ex	..	ANIM..A..T..E
//AUDIO editor
//Create an instance to run the sound in a controled way. The sound snipet can be
//looped, or its sound parameters can be specified on conditions when run.
//Edit can rememebr all parameters used on WEB audio API.
//.. needs a function to define from point the audio starts playing and at which point the
//audio ends

//Implement this now...
//when users load an audio file, a new audio edit should be created automatically.
//a default audio animation ready to run as is. users can simply create orbs to store
//audio buffs to be played later.

//ok so , sound can freely be shared between orbs on inner mode, thats the thing.
//when we load a sound file, a default animation is created to run the audio as is.
//we can edit audio and just run it from editor and leave it running while we do other
//things, just like oscillators.. no this is bad. we dont want to mix allstates from
//editors. also it would mess up op numbers.

//however on radiant mode sound is restricted to acts scripts conditions. We have
//control over specific parameters from here, we can make sound play on specific
//conditions. so we can make playlists , control volume, see and change tracks
//and so on..
	//
//so now we can just showcase run audio . first we need to fix this a bit.. its been a while since i dont mess around here
//we are going to need to refresh what we know and also implement other nodes avaiable. gotta study web api again now...
//good night friend.. You got this.

//EDIT AUDIO
		if(o.edit_audio_mode==true){
			if(uinit){
				//var tt = all.transition(uinit);
				var tt = all.transition(uinit.transition, uinit.stancefrom);
				if(tt=='all set'){uinit=false; return}
			
				if(all.au){}else{all.au=all.audioser();} //safenet?

//we now also need to remove all states from running edits on inner mode if any.. so look for states with names that end in '__r'
				var l = all.anim_a.length; 
				while(l--){
					var s = all.anim_a[l];
					var namend = s.name.substr(-3, 3);
					if(namend == '__r'){
						all.anim_a.splice(l,1);
					}
				}
				//all.stream_a.push('Edit audio mode On'); all.screen_log();
				//return
			}
//audio animation reference
			var a = o.audio[o.op1];
//audio state refference
			var a_s = Fting(all.anim_a,"name", a.name+"__audio");

			if(o.op3!=0){var delta = all.signify(o.op3);}
			if(delta){
				
				if(delta.signal=='exit'){
					o.inner_mode=true; o.edit_audio_mode = false; uinit={transition:'orb edit',stancefrom:o}

	//cant end and splice inmediately after, must disconnect now and then splice
	//or send autoremove to animf.. animf should be able to self remove all kinds of
	//states.. !
					if(a_s){
						//a_s.end='end'; //try this
						a_s.src_node.stop();a_s.src_node.disconnect();
						var index = all.anim_a.indexOf(a_s);
						all.anim_a.splice(index,1);
					}
					//clear data feedback stream
					all.clear_stream(U.estream);//just use all.user.estream

					//clear selected values
					o.op1= 0; o.op5= 0; //var id = a.on_a[0];
					all.stream_a.push("Out of audio edit mode"); all.screen_log();
					o.op3=0;
					return
				}
				
//.. a problem. When i stop and start run  again it doesnt start from a.start . . . .
				if(delta.signal=='run'){
//remember loop control is on s.src_node . consider this when working on act
					if(a_s){
						//a_s.end="fade"; //to end it
						a_s.end="end";
					}else{
						var a_s = all.buffer_s(o.audio_access, all.au, a.name+"__audio", a);
						a_s.src_node.loop = true; 
						a_s.timer_start = all.au.currentTime;//
				//we need to use update time as well in order to synch.. do we
						//a_s.t=0;//
						//start(when, offset, duration)
		//when act calls the edit, we could use start(a.start, a.end, a.end) to set
		//duration. to run audio once
						a_s.src_node.start(a.start, a.end);//this is good
						all.anim_a.push(a_s);
					}
				}//run

//gain
				if(delta.signal=='gain'){
					if(delta.operation=='+'){
						a.gain=a.gain+delta.value;//+0.005;
						if(a_s){
							a_s.gain_n.gain.value=a_s.gain_n.gain.value+delta.value;//+0.005;}
						}
					}
					if(delta.operation=='-'){
						a.gain=a.gain-delta.value;//-0.005;
						if(a_s){
							a_s.gain_n.gain.value=a_s.gain_n.gain.value-delta.value;
						}
					}
					all.stream_a.push("Gain adjusted"); all.screen_log();

				}//gain


//From To control. Use U or LU to increase Start time. Use H and LH to decrease Start time. Use I and LI to increase End time and
//J and LJ to decrease End time

				if(delta.signal=='start time'){
					if(delta.operation=='+'){//+0.01
						if(a_s){
							a_s.src_node.loopStart = a_s.src_node.loopStart+delta.value;
						}
						a.start = a.start+delta.value;
					}
					if(delta.operation=='-'){
						if(a_s){
							a_s.src_node.loopStart = a_s.src_node.loopStart-delta.value;
						}
						a.start = a.start-delta.value;
					}
				}

				
				if(delta.signal=='end time'){
					if(delta.operation=='+'){//+0.01
						if(a_s){
							//a_s.src_node.loopStart = a_s.src_node.loopEnd+delta.value;
							a_s.src_node.loopEnd = a_s.src_node.loopEnd+delta.value;

						}
						a.end = a.end+delta.value;
					}
					if(delta.operation=='-'){
						if(a_s){
							//a_s.src_node.loopStart = a_s.src_node.loopEnd-delta.value;
							a_s.src_node.loopEnd = a_s.src_node.loopEnd-delta.value;
						}
						a.end = a.end-delta.value;
					}
				}

//We should be able  to adjust the number of loops the animation will run...hmm
//..we could simply call it again using act language

				//var up_sel = true;
				o.op3=0;
			}//delta


//now we need to see current time of playing sound. we dont need to display all decimals
//so fast.. 
//s.src_node.buffer.duration ==> total time of sound file
//all.au.currentTime ==> the now time
//so when state starts running we define timer_start = all.au.currentTime;
//every time we need the now time of running state, all.au.currentTime-timer_start
//.. ok its done
//
			
//also, when we dont want to loop on act , s.end needs not only to set src_node.loop
//to false, but also let anim func use a.end to end sound at this value

//doing the timer thing but instead of calling update, i just change feed0 colors
			o.op5++;
			if(o.op5==15){
				var s_0 = U.estream;
				s_0.r=o_r; s_0.g=o_g; s_0.b=o_b;

				o.op5=0;
			}
		//up_sel running at every update here..
			var up_sel = true;//
			//timer
			//Number(2.4387587.toFixed(2))
			if(a_s){
				var ctd = all.au.currentTime-a_s.timer_start;
//if number length is less than 4, i need to add as many zeroes to complete 4 digits
//this will avoid the funny tingy while displaying
				//this works so far
				var ctf = ctd.toFixed(4);//toFixed returns a string.. remember that
				var ctt = ctf+'000000000';
				var ct = ctt.substr(0,9);
			}else{var ct = 0;}
			
//interface to show data from currently selected audio edit
			if(up_sel){//should be update_interface
				var a = o.audio[o.op1];
				var a_s = Fting(all.anim_a,"name", a.name+"__audio");
				all.stream_a.push(
					"Audio name: "+a.name,
					"Gain: "+a.gain,
					"Fade: "+a.fade,
					"Start Time : "+a.start,
					"End Time: "+a.end,
					"Current Time: "+ct

					);
				all.screen_log('estream'); //estream

			}
			//
		}//audio





/*
A central cross painted in the centre of the screen on edit mode should be 
used to refere to a point of convergence. A point were the animation expresses a
transfer of energy. An impact, or a receiving gesture, an interaction trough contact.
It might represent a hit square, or something to protect.
And may actually represent the orb, the center of the vessel.
We can then locate this central reference point whenever we want on the screen,
we can also invert the animation so its executed
from a diferent direction and maybe even control the size of the animation trough
/act programming.
But most importantly, we would be able to connect with other animations trough a
reference point.
Animations will use the contact frame as refference to run in proper timming.
If an attack takes 10 frames before the hit frame and a defense takes 4 frames
before the block frame, then we asign the block and hit to converge frame.
Attack animation starts running first since it takes more frames to reach
converge frame, but defense would start running 4 frames before converge frame,
in this way hit and block frames from both animations will run simultaneously,
creating the impact effect desired.
This can all be programmed using /act language.

img edit will normally position it in the center of the screen so we can
easily create the animation using image coordinates, but then, act can
translate canvas to run the animation on any desired position. we can also
use scale to flip images from origin
coordinates so this is definitely very convenient.

..so when a script asks for lets say run time 21 we run a loop and sum all
t from each frame, when we reach 21, thats the frame we looking for
*/
//push states to illustrate a central cross only when we test run or we
//are definning a capture
//dont allow img scroll when run test is on. or capture still undefined
//EDIT, IMG
		if(o.edit_img_mode==true){
			if(uinit){
//we got o.primX , o.primY , o.limitrad , o.limitdis
				//var tt = all.transition(uinit);
				var tt = all.transition(uinit.transition, uinit.stancefrom);//, uinit.stanceto);
				if(tt=='all set'){uinit=false; return}			
				if(tt=='set interface'){
				//the grid zero we all want
					var ceX=o.primX; var ceY=o.primY;
				//assuming we are already at vessel location
					var anim = o.img[o.op1];
				//push rect state empty with rainbow colors.
					var s = all.rect_s_new("rect__sel"); 
					s.a=1; s.layer=1;
					s.tx=ceX; s.ty=ceY;
					s.inside="empty"; //rect_s.tch='sel';
					all.anim_a.unshift(s);
			
				//push background img state and draw. default values
					var bg = all.ims_s_new("img__bg",o.img_access);//img__bg
					bg.anim = anim; //maybe we dont need anim here...
					bg.layer = 0; bg.a=1;
					bg.tx=ceX; bg.ty=ceY;
					//just freezing this for now..
					//if(o.img_access.width>window.innerWidth||
					//o.img_access.height>window.innerHeight){
					//	o.op6=1;
					//}
					all.anim_a.unshift(bg);

				//push a state to illustrate a caption from the img
					var ims = all.ims_s_new("img__sel",o.img_access);//img__sel
					ims.anim = anim; //ims.ctx = ctx1;
					ims.tx=ceX; ims.ty=ceY;
					ims.layer=0; ims.a=1;
					all.anim_a.unshift(ims);

				//push a state to illustrate animation frames sequentially
					var imr = all.ims_s_new("img_r",o.img_access);//img__r
					imr.anim = anim;
					imr.tx=ceX; imr.ty=ceY;
					imr.layer=0; imr.a=1;
					all.anim_a.unshift(imr);
					
/*
The way we draw this cross is clunky, we should just write a function to do this.
c.beginPath();
c.moveTo(-offsetX,0);
c.lineTo(width-offsetX,0);
c.moveTo(0,-offsetY);
c.lineTo(0,height-offsetY);
c.stroke();
*/
				//horizontal line of cross  ///////////// -
					var csx = all.rect_s_new("x__c"); 
					csx.a=0.6; csx.inside="filled"; 
					csx.tx=ceX; csx.ty=ceY;
					//just making the line very large for now
					csx.w=window.innerWidth*3; csx.h=1;
					csx.x=-o.limitdis; csx.y=0;
					csx.layer=2;
					all.anim_a.unshift(csx);

				//vertical line of cross     ///////////// |
					var csy = all.rect_s_new("y__c"); 
					//csy.is='f'; //csy.ctx=ctx2; 
					csy.a=0.6; csy.inside="filled";
					csy.tx=ceX; csy.ty=ceY;
					csy.w=1; csy.h=window.innerHeight*10;
					csy.x=0; csy.y=-(o.limitdis);
					csy.layer=2;
					all.anim_a.unshift(csy);

				//remove all states from running edits on inner mode if any
					var l = all.anim_a.length; 
					while(l--){
						var s = all.anim_a[l];
						var namend = s.name.substr(-3, 3);
						if(namend == '__r'){
							all.anim_a.splice(l,1);
						}
					}
					return
				}//set interface

				if(tt==undefined){return}
				//u.init = false;
				//return
			}

			//the grid zero we all want. center of edit. the orb center.
			var ceX=o.primX; var ceY=o.primY;
			//a refference to currently selected anim
			var anim = o.img[o.op1];
			//a refference to select rect state .  s
			var s = Fting(all.anim_a, "name", "rect__sel");
			//a reff to test run ims
			var imr = Fting(all.anim_a, "name", "img_r");
			//ref img selection
			var ims = Fting(all.anim_a, "name", "img__sel");
			//bg
			var bg = Fting(all.anim_a, "name", "img__bg");
			//refference to horizontal cross line
			var csx = Fting(all.anim_a, "name", "x__c");
			//refference to vertical cross line
			var csy = Fting(all.anim_a, "name", "y__c");
			//selected frame. we use op2 to keep track of frames we are working on
			var f = anim[o.op2];

//use delta for processing changing signals. if op3 is anything but 0, delta is defined by our signifier function
			if(o.op3!=0){var delta = all.signify(o.op3);}

//allthese new delta functions need to limit number range so it doesnt break anything .. !!!!! needs update
			if(delta){

				if(delta.signal=='exit'){
//op1 tracks animation index, op2 tracks animation frame index
					o.inner_mode=true; o.edit_img_mode = false;
					//uinit = 'orb edit';
					uinit={transition:'orb edit', stancefrom:o}//,stanceto:o};
					s.is='rm'; ims.is='rm'; imr.is='rm'; bg.is='rm';
					csx.is='rm'; csy.is='rm';
					//var feed_stream = Fting(o.stream, "name", "feed0");
					all.clear_stream(U.estream);//just use all.user.estream

					//clear up operation values
					o.op1=0; o.op2=0; o.op3=0; o.op4=0; o.op5=0; o.op6=0; 

					//i need to remove the ghost frame here too..
					if(imr.loop==false){anim.pop();}

					//remove empty array if user didnt even frame once
					if(anim.length==0){var rmf = o.img.indexOf(anim); o.img.splice(rmf,1);}
					
					all.stream_a.push("Leaving from img edit mode.."); all.screen_log();
					//o.op3=0;
					return
				}

//CURSOR IMG
//cursor with s.u_d. so we really dont need u_d system at all now because we are just clearing the whole screen once per beat anyway
//no need to worry about specific clears. .. it might be interesting to be able to clear specific zones eventually but for now we good
				if(delta.signal=='left'||delta.signal=='right'||delta.signal=='up'||delta.signal=='down'){
					if(delta.signal=='left'){var u_p = 'x'; var u_v = s.x-delta.value;}
					if(delta.signal=='right'){var u_p = 'x'; var u_v = s.x+delta.value;}
					if(delta.signal=='up'){var u_p = 'y'; var u_v = s.y-delta.value;}
					if(delta.signal=='down'){var u_p = 'y'; var u_v = s.y+delta.value;}

					s[u_p]=u_v;
					s.is='c_rect'; //s.t=1;
					if(o.op4==1){
						if(u_p=='y'){u_p='py';}
						if(u_p=='x'){u_p='px';}
						ims[u_p]=u_v;
					}
				
				}//cursor

//.. do i need center.. yes i do.. not sure is this is ok tho. i think its good
//we want user translates to consider users actions here... so center now needs to translate user to our selection rect
				if(delta.signal=='center'){
					//if(o.selected_drag==false){
					if(o.op4==0){
						var u_x = window.innerWidth/2; var u_y = window.innerHeight/2;
						s.x=u_x; s.y=u_y;
					}
				}

//square sel size with s.u_d
				if(delta.signal=='width'||delta.signal=='height'){
					if(delta.signal=='width'){
						if(delta.operation=='+'){var u_p = 'w'; var u_v = s.w+delta.value;}
						if(delta.operation=='-'){var u_p = 'w'; var u_v = s.w-delta.value;}
					}
					if(delta.signal=='height'){
						if(delta.operation=='+'){var u_p = 'h'; var u_v = s.h+delta.value;}
						if(delta.operation=='-'){var u_p = 'h'; var u_v = s.h-delta.value;}
					}
					s[u_p]=u_v;
					if(o.op4==1){
						if(u_p=='w'){u_p='pw';}
						if(u_p=='h'){u_p='ph';}
						ims[u_p]=u_v;
					}
				}//size

	//time editor
				if(delta.signal=='time'){

					//all.stream_a.push("Numbers without frames?"); all.screen_log();
					if(delta.operation=='+'){f.ft = (f.ft+delta.value);}
					if(delta.operation=='-'){f.ft = (f.ft-delta.value);}
					if(delta.operation!=undefined){}else{f.ft = delta.value;}
					if(imr.loop){
						//update times
						imr.et = all.getetv(anim); imr.rt=imr.et; //imr.t=1;
						//imr.nfreq=0; 
						//imr.is='c_img';
					}
				}
				
				if(delta.signal=='alltime'){
					var al = anim.length;
					while(al--){
						var af = anim[al];
						af.ft=delta.value; 
					}
					if(imr.loop){
						//update times
						imr.et = all.getetv(anim); imr.rt=imr.et; //imr.t=1;
						//imr.nfreq=0; 
						//imr.is='c_img';
					}
					all.stream_a.push("New beat"); all.screen_log();
				}

	//alpha editor . transparency
				if(delta.signal=='alpha'){
					if(delta.operation=='+'){ f.a = f.a+(0.1);}
					if(delta.operation=='-'){ f.a = f.a-(0.1);}
				}
	//frame back
				if(delta.signal=='back'){
					//its weird to go back when there is no back to go
					if(anim[o.op2-1]){ //then i can go back
						o.op2--;
						if(imr.loop){
							var f = anim[o.op2];//refer selected frame again
			//we could just instruct the state to reinit itself using the anim refference stored in itself
			//trough the animf function instead of manually changing them in here !!!!!!!!!!!!!!!!!! optimization

							ims.x=f.x; ims.y=f.y; ims.w=f.w; ims.h=f.h;
							ims.px=f.px; ims.py=f.py; ims.pw=f.pw; ims.ph=f.ph;
							ims.a=f.a;
							

							s.x=f.px; s.y=f.py; s.w=f.pw; s.h=f.ph;

							o.op4=1;
							//we can modify on run
							//updating captured and definning again.. huh.. 
							o.C = {x:f.x, y:f.y, w:f.w, h:f.h}
						}
					}else{
						all.stream_a.push("First frame"); all.screen_log();
					}

				}//back

				if(delta.signal=='next'){
					//moves on to the next frame... if there is one
					if(anim[o.op2+1]){
						o.op2++;
						if(imr.loop){
							var f = anim[o.op2];//refer selected frame again

							ims.x=f.x; ims.y=f.y; ims.w=f.w; ims.h=f.h;
							ims.px=f.px; ims.py=f.py; ims.pw=f.pw; ims.ph=f.ph;
							ims.a=f.a;
 
							s.x=f.px; s.y=f.py; s.w=f.pw; s.h=f.ph;

							//o.selected_drag = true;
							o.op4=1;

							o.C = {x:f.x, y:f.y, w:f.w, h:f.h}
						}

					}else{
						all.stream_a.push("last frame.."); all.screen_log();
					}
				}//next

	//capture
//both C and selected_drag couldsimply be op numbers, for order s sake
//!!!!! if we are capturing, prevent img scroll? and call cross

				if(delta.signal=='capture'){
					if(imr.loop==true){
						all.stream_a.push("Unrun first"); all.screen_log();
					}else{
						o.C = {x:s.x, y:s.y, w:s.w, h:s.h}	 

						all.stream_a.push("Frame captured on orb.C"); all.screen_log();

						//updates the section just selected and ready it to drag around..
						//bg dont go here either this is probly messing up
						ims.x=s.x; ims.y=s.y; ims.w=s.w; ims.h=s.h;
						o.op4=1;
						//when we capture, we probably want to decrease the bg img a to a minimum
						//so we can work with the selected image captured using our grid cross

//also, select rect needs to inmediately drag the selected image to center of the screen
						//wait a second...
				//we could simply displace user here , dont mess up tx ty
				//now screen position center on vessel
				//CENTER ON STRUCTURE 
						ctx0.translate((-U.x),(-U.y));//this should put user on ctx0 zero xy at any moment
						var screencX = -ceX+(window.innerWidth/2); var screencY = ceY-(window.innerHeight/2);
						ctx0.translate(screencX,screencY);
						U.x=screencX; U.y=screencY;

						all.adjust_stream(U.mainstream);

						s.x = 0; s.y = 0; //kinda centered selection
	
						ims.px=s.x; ims.py=s.y; ims.pw=s.w; ims.ph=s.h;
					}

				}//capture
	//am HERE...	
		
				if(delta.signal=='define'){
					if(o.C.x==undefined){//this safe even working?.. i think it is
					//if(o.op6==0){?
						all.stream_a.push("Capture first.."); all.screen_log();
					}else{
					//just placedata on frame, dont erase name
						f.x=o.C.x; f.y=o.C.y; f.w=o.C.w; f.h=o.C.h;
						f.px=s.x; f.py=s.y; f.pw=s.w; f.ph=s.h;
						f.a=1; //f.st=0; f.f=o.op2;
						f.ft=15;
	
						all.stream_a.push("Frame SAVED"); all.screen_log();

	//so on loop... we want to keep all running, just modify changes in frame in real time
						if(imr.loop){
							o.op4=0;
						}
						
						if(imr.loop==false){
			//only push new frame if loop is false and last frame was defined
							if(anim[anim.length-1].a){anim.push({});}
							bg.a=1;
							o.op4=0;
						//place rest selection on selected frame to keep working from there
							s.x=f.x; s.y=f.y; s.w=f.w; s.h=f.h; 
			//and here, we also want to translate user so selected frame rect is in the middle of the screen
			//so we can continue from there..
						//CURSOR CENTER on s
							ctx0.translate((-U.x),(-U.y));//ctx0 zero xy
							var rectcX = (-ceX-s.x)+(window.innerWidth/2);
							var rectcY = (ceY-s.y)-(window.innerHeight/2);
							ctx0.translate(rectcX,rectcY);
							U.x=rectcX; U.y=rectcY;
							
							all.adjust_stream(U.mainstream);

							o.C={};
						}//when no loop
					}//capture first..
				}//define

	//run test
				if(delta.signal=='run'){
					if(imr.loop){
						imr.loop=false; imr.run=false;
						var done =true;
						o.op4=0;
						bg.a=1;
					//update select rect position to selected frame
					//.. sel rect should now be positioned on where the frame is extracted from !
						s.x=f.x; s.y=f.y; s.w=f.w; s.h=f.h;
					//also translate user so we can keep working from here.
						ctx0.translate((-U.x),(-U.y));//ctx0 zero xy
						var rectcX = (-ceX-s.x)+(window.innerWidth/2);
						var rectcY = (ceY-s.y)-(window.innerHeight/2);
						ctx0.translate(rectcX,rectcY);
						U.x=rectcX; U.y=rectcY;

						all.adjust_stream(U.mainstream);
						
					//when we out of loop we push ghost frame again
						anim.push({});

					}
					if(done){}else{ //this is so sketchy lol
						if(imr.loop==false){
							if(anim.length==0){
								all.stream_a.push('Cant run without frames..'); all.screen_log();
							}else{
								anim.pop(); //poping ghost frame
								//new
								var imret = all.getetv(anim); //imretard lol no
								//imr.tx=window.innerWidth/2; imr.ty=window.innerHeight/2;//neccesary?
								imr.anim=anim; imr.is='c_img';
								imr.loop=true; imr.run=true; imr.et=imret; imr.rt=imr.et;
						
								//place cursor on selected frame pos
								s.x=f.px; s.y=f.py; s.w=f.pw; s.h=f.ph;

								//and translate user to center of prim to see the animation focus activity
								ctx0.translate((-U.x),(-U.y));//ctx0 zero xy at any moment
								var screencX = -ceX+(window.innerWidth/2);
								var screencY = ceY-(window.innerHeight/2);
								ctx0.translate(screencX,screencY);
								U.x=screencX; U.y=screencY;

								all.adjust_stream(U.mainstream);
								
								//bg now is almost transparent so we can see the animation more clearly
								bg.a=0.2;

							}
						}//loop false
					}
				}//run

	//and other signals..

				//var update_sel = true;
				o.op3=0;//clear operation
			}//if delta

			//op4 with value of 1 tells us user is currently capturing a selected rectangle from our image file
			//so we should update value in a couple of states here to help us work with our capture
			if(o.op4==1){
				//cross updates
				//csx.u_d.push('r',o_r,'g',o_g,'b',o_b,'is','rect'); 
				csx.r=o_r; csx.g=o_g; csx.b=o_b; csx.is='rect'; 
				//csy.u_d.push('r',o_r,'g',o_g,'b',o_b,'is','rect');
				csy.r=o_r; csy.g=o_g; csy.b=o_b; csy.is='rect';
				//selected image drawing
				//ims.u_d.push('is','img');
				ims.is='img';
				//ims.is='c_img';
			}
			//and here goes updates on states that need refreshing when user has not captured yet
			if(o.op4==0){
				//rainbow selection
				s.r=o_r; s.g=o_g; s.b=o_b; s.is='rect';
				//whole image in the backgound located on the positive side of the prim center grid
				bg.is='img';
			}

//feedback
//ask if frames have new params and if they do, gather data and print feedback acordingly
//we can make 3 random calls to create a color at every update and then
//just use the same color for all things orbs inner systems related..
//that l surely help with performance.
//and it will be super cool to see, and good for interface visibility..
//except that on text it is anxiety inducing lol. maybe tone down the
//pulsating frequency.
			//using op5 as timer to update estream here. heh .. probly could be done in a more consistent way
			o.op5++;
			if(o.op5==9){
				var s_0 = U.estream;
				s_0.r=o_r; s_0.g=o_g; s_0.b=o_b;
				o.op5=0;
			}

			var f = anim[o.op2];
				
			//refreshing frame feedback estream
			var frames = anim.length; var f_n_a = []; //frame number array
			if(frames == 1){f_n_a.push("[0]");}
			if(frames == 2){
				if(o.op2==0){f_n_a.push("[0]",1);}
				if(o.op2==1){f_n_a.push(0,"[1]");}
			}
			if(frames >= 3){
				if(o.op2==0){}else{f_n_a.push(0);}
				while(frames--){
					if(frames == o.op2){f_n_a.push("["+frames+"]");}
				}
				if(o.op2==(anim.length-1)){}else{f_n_a.push((anim.length-1));}
			}	
			var framed = f_n_a.join("...");//join f_n_a togheter separated by ...
		
			all.stream_a.push(
				"Animation name: "+anim[0].name, 
				"Frame: "+framed,
				"Frame X:"+f.px+" Y:"+f.py+" W:"+f.pw+" H:"+f.ph,
				"Timer: "+f.ft,
				"Alpha:"+f.a,
				"Cursor X:"+s.x+" Y:"+s.y+" W:"+s.w+" H:"+s.h
			);
			all.screen_log('estream'); //estream

		}//edit img mode






//VOX mode .. needs update
//a synthetizer
//While on vox mode, users should be able to choose if they want to radiate the sounds produced. . ?
//Orbs radiating oscillations will have visuals particular to their frequencies emited.?
//Yes, a user will be able to listen to orbs even on void. 
//The volume of the sounds emited will start to decrease gradually from the moment orbs emiting it fall outside of the
//listening user perceiving range so it is possible to navigate  the void listening to orbs. Sounds emited by Orbs travel longer
//than normal perception. Sounds also have special effects on voids
//An orb can be programmed to emit a specific sound when a specific condition is met, just like any other animation.....?

//Ok, so.. we want osc to be called just like animations?.. no..records..
//.. maybe  vox can be like a music studio for recording.. 
//this method for recording should be used to loop sequences in
//real time.. vox is an instance to create sound sequences (records) , and then
//act language should be able to call these records the same way it calls animations
//But vox could simply be used to play music as well. Using snipets from loaded music
//files and oscillators. Users should be able to swap between orbs while on vox? to
//run multiple sound files simultaneously. Could act language do this?
//OK SO vox is an instrument which can be tuned and fully customized. each orb has one vox
//instance to remember asigned oscillators.
//if we want to mess around with audio files and vox records then we use act language.
//ok we good now.

		if(o.vox_mode){
			if(u.init){		
			//if(o.init){
				//all modes init should do this
				var o_bg = Fting(all.anim_a, "name", "__obg");
				if(o_bg){o_bg.is='rm';}	
//screen travels to the right, user can see the orb radius line reacting to the sound now.
//clear and run traveling to the side animation. dont allow interactions during transition
				all.sstr_l = ' ';  all.sstr_t = 20;
//all.sstr=' '; all.sstr_t=20; all.s_s_t_r=[]; //all.com_a=[]; //why was i doing this?

				o.op5=1;
				u.init=false;
				//o.init=false;
				return//using return is good for transition inits
			}
			
//manage k buttons using op5
			if(o.op5==1){
				var l = all.anim_a.length;
				while(l--){
					var rm_k = all.anim_a[l];
					
					if(rm_k.se){
						if(rm_k.se=='k_txt'){
							rm_k.is='rm';
						}
					}
					
					if(rm_k.tch){
						if(rm_k.tch=='k'){
							rm_k.is='rm';
						}
					}
					
				}//rm
//on touchscreen users search for asigned buttons on membox and call them
				var l = o.vox_ks.length;
				while(l--){
					var bt = o.vox_ks[l];
					if(bt.asigned_osc!==undefined){
						var ok = all.create_bt(ctx0, bt.name,undefined, undefined,
						bt.X, bt.Y, true, 'persist');
						ok.bt.asigned_osc=bt.asigned_osc;
						ok.bt.tch='k';
						ok.txt.se='k_txt';
						//bts.bt.reff=b;
						//add coordinates and text boolean
						all.anim_a.push(ok.bt, ok.txt);
					}
				}
				
				o.op5=0;
			}//op5 k management
			
			if(o.op3!=0){var delta = all.signify(o.op3);}
			if(delta){
				
				if(delta.signal=='exit'){
//instead of directly setting inner mode true and vox mode false, i could
//just set rad_l sub event to "quit" 
					o.inner_mode=true; o.vox_mode = false;
					//o.init=true;
					var obg = all.circle_s_new('__obg');
					obg.radius=900; obg.t=5;
					obg.r=0; obg.g=0; obg.b=0; obg.a=0;
					obg.inside="filled"; obg.is='circle';
					obg.x=Math.floor(window.innerWidth/2);
					obg.y=Math.floor(window.innerHeight/2);
					obg.ctx=ctx0;
					if(o.inner_mode){obg.se='idle_pick';}
					//if(o.radiant_mode){obg.se='expand_colors';}
					all.anim_a.push(obg);
					
//what we do with osc states on exit?
					//if(a_s){a_s.end="fade";}
					var l = all.anim_a.length;
					while(l--){
						var rm_k = all.anim_a[l];
						if(rm_k.tch){
							if(rm_k.tch=='k'){rm_k.is='rm';}
						}
						
						if(rm_k.se){
							if(rm_k.se=='k_txt'){rm_k.is='rm';}
						}
						
					}

					all.stream_a.push("Out of vox mode"); all.screen_log();
					//console.log("Out of vox mode");
				}//exit
				
				o.op3=0;
			}//delta
			
			
//inside the orb, audio animations names can be seen as well as their asigned keys
//Ask is sc_log text corresponds to any audio animations. if does, then take
//sc_log states and draw lines from anima name text
//towards orb radius line . Fixate a color when user strokes the key to the asigned anim .

/*
touch users need to create special buttons and asign oscillators to them on vox.
This k button behaves just like a button but takes an asigned osc instead of a command.
Long press runs the oscillator as long as pressed and a gesture can lock into loop.
Keys are persistant always by default.
*/

//numbers might be reserved for record button, or a button to list all audio animations.
//user hit a key and press spacebar, input is focused now with text .asign: already so
//now all user has to do is type in the name of the audio anim to asign it.
			//run a loop on o.osc to determine what keys should trigger osc
			var l = o.osc.length;
			while(l--){
				var a_a = o.osc[l];
				//keyboard system
				if(all.sstr==a_a.asigned_key){
					all.sstr_l = ' ';  all.sstr_t = 20; //so it doesnt repeat the command
					//all.sstr=' ';//
					
					//i need an id to avoid problems here
					var id = all.au.currentTime;//id should be stored on a_a for later access.. ?
					//to prevent too fast keydown, use previous timestamp and add some time
					if(a_a.on_a[0]){var fast = true;}
					if(fast){if(a_a.on_a[0]+0.3>id){var dont = true;}}
					if(dont){//dont push another sound please, its too fast
					}else{
						var a_s = Fting(all.anim_a, "name", a_a.name+"_"+a_a.on_a[0]);
						if(a_s){var ask_loop = true;}
						if(ask_loop){if(a_s.loop){var loop = true;}}		
						
						if(loop){
							all.stream_a.push("Key already on loop"); all.screen_log();
							//console.log("Key already on loop");
						}else{
							//record system
							if(o.rec[0] !== "off"){
							var starttime = id-o.rec[1];
							o.rec.push(a_a.name+"_start_"+starttime+"_"+id);
							}//
							a_a.on_a.push(id);//default
							var a_s = all.osc_s(all.au, a_a.name+"_"+id, a_a);
							a_s.gain_n.gain.value= 0.001; 
							a_s.gain_n.gain.setTargetAtTime(a_a.gain, all.au.currentTime, 0.06);
							all.anim_a.push(a_s);
							//record
							
							//here goes visual
							all.stream_a.push("Sounds .. "+a_s.name+ "time: "+id); all.screen_log();
							//console.log("Sounds .. ");
						}
					}
				}//asigned key stroke

			}//trigger loop


//a button to start recording
//to record vox activity, i can listen to strokes timestamp for push and release,
//for shift activity etc and just create
//a sequence of instructions to repeat the activity recorded
//when record button is stroke, take all.au current time and and store on
//rec.startTime. Now everytime user strikes another key
//, do key press time - start time. Store numbers obtained on each stroke while on
//record, register the waveform, and the time the key
//is being pressed as well
//a combination of numbers and R, starts recording. the same number and R again stops
//recording?. Records names are the numbers used.

//instead of l1 and l2 system to synch loops, the solution is far much more simple
//Every record should hold a space to create a timestamp every time the record is
//being reproduced. A timestamp for when it starts
//playing and a total time. To get the total time i should just save current time of
//user finishing the record instead of acccessing
//the last key end time.

//It would be cool to get some visuals when a record is playing. something to let user
//know when playback is going to end etc
			//
//Users should be able to issue commands to orbs so they start playing a specific record...
//and maybe records should be able to be asigned into actions..
//check out if web audio API already comes with a visualizer . . . . .
			//..just turn R into a delta signal
			var R = all.num_in("R");
//... typing a number and then R is a bit hard to do with rythm, should just
//accept "0" to end the rec
//if user strokes 0 while recording, make var R into the record name so it stops
//recording and save
			if(all.sstr=="0"){
				all.sstr_l = ' ';  all.sstr_t = 20;
				if(o.rec[0] !== "off"){
					var R = o.rec[0];
				}
			}
			
			//R for start recording on selected number
//its nice to type a number and start recording but it would also be nice for user to
//be able to asign a name for the record
//maybe something like
//.name:[record number]:[a name]
/*
			
*/

//Also, users should be able to manipulate the record so it can be shortened on demand , while running
//a timer to illustrate the record progression. we can move limiters to subtract time from begginning to end and from end to beggining
//.. ahhhh this is gonna be a bit confusing . maybe later gonna work on this

			
			if(R!==undefined){
			//check if already recording, 
				if(o.rec[0] == "off"){
					//index 0 and 1 of rec are always the name of record (a number) and start recording time
					o.rec.pop();//no more "off" on [0]
					o.rec.push(R, all.au.currentTime);//first 2 items are always number name and startt
					//is recording, if so then push stroke data into the rec item
					all.stream_a.push("Recording.."); all.screen_log();
				}else{
					//end recording when the same number is used to record
					if(o.rec[0] == R){
					var rec_time = all.au.currentTime - o.rec[1];
					o.rec.push(rec_time);//the total record time
					o.rec[1] = 0;
					o.records.push(o.rec);

					o.rec = [];
					o.rec.push("off");//normalizes rec
					all.stream_a.push("Record stored."); all.screen_log();
					}
				}
			}

//To start playing a previous record, use number and P, to play. Use number and P again to stop playing the record.
//A loop trough record item use data to push osc audio states at once, which will follow instructions to run properly
//anim_func can set oscilator ending from the beginning of record play request
//these playing record functions shouldnt rely on anim_func because timing is not good on updates.
//s.gain_n.gain.setTargetAtTime(0, all.au.currentTime + 0.2, s.fade);
//
			var P = all.num_in("P");
			var L = all.num_in("L");
			
			var i1 = 0; var l1 = o.records.length;
			while(l1--){
//the structure of a key pressed is a single string: animname_action_executiontime , so i can use "_" to separate values
//use r_a[0]to get the name of animation, r_a[1] is the operation,  r_a[2] is the start or ending time, r_a[3] is thekey identifier
				var r = o.records[i1];
				if(r[0]==P){
					//when its playing . . it should stop the sound, clear all record states
					var playing = Fting(all.anim_a, "r_name", r[0]);
					if(playing){
						var l = all.anim_a.length;
						while(l--){var s = all.anim_a[l]; if(s.r_name==r[0]){s.end = "fade";}}
					//when its not playing . .
					}else{var P_call = true;}
				}	
//when user requests loop, store current time on r[1] and use r[r.length-1] to let know update when to
//push_r again since r[r.length-1] is the total time of the record
//make it so when update checks, it pushes again the record after a fixed time and not just current time
//since updates times are not precise. just give update a window to realize the operation.
//a time fixed controled window, a constant so it doesnt mess up the playback timming
				if(r[0]==L){
					//when its looping already . . it should stop the sound, clear all record states
					if(r[1]!==0){
						r[1] = 0;
						var l = all.anim_a.length;
						while(l--){var s = all.anim_a[l]; if(s.r_name==r[0]){s.end = "fade";}}
					//when its not playing . .
					}else{var P_call = true; r[1] = all.au.currentTime;}
				}
				
				//Play 1 loop call
				if(P_call){var push_r = true;}//

				//to check for Loops, just ask 
				if(r[1]!==0){  
					//push record again when r[1] + r[r.length-1] is less or equal to currentTime
					var timer = r[1] + r[r.length-1];
					if(timer<=all.au.currentTime){
//make it so record is pushed  some miliseconds after the condition //define a var to add to pushing time
//also make it so r[1] is re defined //rem_time should be timer + 0.5
						var rem_time = timer + 0.3;
						//console.log(timer);
						var push_r = true;
						//r[1] = all.au.currentTime;
						r[1] = timer;
					}
				}//
		
	
				if(P_call||r[1]!==0){ 
				//console.log("Yes, you P called  or r[1]!==0");
				var i3 = 2; var l3 = r.length-3;//start from item 3
				if(rem_time){
					//console.log("using rem_time");
				}else{
					var rem_time = all.au.currentTime+0.3;
					//console.log("rem time =  "+rem_time);
				}
				while(l3--){
					var r_a = r[i3].split("_"); //record array
					var aud = Fting(o.osc, "name", r_a[0]);
					var time = parseFloat(r_a[2]);
					if(r_a[1]=="start"){var start = true;}
					if(r_a[1]=="end"){var end = true;}
					//
					if(push_r){ 
						if(start){
							var s = all.osc_s(all.au, r_a[0]+"_"+rem_time+"_"+r_a[3], aud);
							s.gain_n.gain.value= 0.0001; 
							s.r_name = r[0];//record name
							s.gain_n.gain.setTargetAtTime(aud.gain, rem_time+time, 0.06); 
							all.anim_a.push(s);
							//console.log(rem_time);
						start = false;
						}

						if(end){
							var s = Fting(all.anim_a, "name", r_a[0]+"_"+rem_time+"_"+r_a[3]);
							s.gain_n.gain.setTargetAtTime(0, rem_time+time , aud.fade);
							s.end = "check";
							//console.log(rem_time);
						end = false;
						}
					}//push record

				i3++;}
				}//any of 2 conditions
				//should reset all vars used to control looped record here before passing to next record . . .
				rem_time = undefined;
				P_call = undefined;
			i1++;}//check records

		}//vox mode

}//orb_up








//OLD
all.c_com = function(){ 
	//var st = stance;
	if(all.com_a==undefined){}else{
	//if(all.com_a[0]){ //empty array lock



		//old
//Commands are generally called by users and are executed on demand when conditions
//are met, but there may be some cases when some of these commands may be called by certain events. An encounter may put a 
//string on all.c_input or an external event may trigger the .commands macro for users to react to incoming attacks or proposals
//comands packet logic go first on updates and they self delete after executed so they only run once.
//turn the command string into an array to contain every word between the dots and symbols
//so users words can specify subcommands and parameters to the commands first dot means its a command macro ,
//after second dot its an action for the macro to execute. most actions take parameters, ':' allows users to pass parameters
		//
		var com = all.com_a;//[0];
		var str = com.str; 
		var mcp_a = str.split(":");
//mcp_a[0] is the macro and the actions separated by dots. the other elements in the array are user parameters
		var mc_a = mcp_a[0].split("."); 
//mc_a[0] is always empty, [1] is always the macro and [2], [3] and further are commands of the macro
//define orb in control once
//... commands should be available for all stances its just that, they will do different things depending on stance.form and stance.se

//DEBUG version exclusive commands
//a command to remove touch listeners and key press listeners. also stops the heartbeat
//of Sunya for console debug.
//to add back listeners just run NS(); directly on the console
		if(mc_a[1]=="scan"){
			document.removeEventListener("touchstart", tstart,{passive:false})
			document.removeEventListener("touchmove", tmove,{passive:false})
			document.removeEventListener("touchend", tend,{passive:false})
			document.removeEventListener("touchcancel", tcancel,{passive:false})
			
			window.removeEventListener('keydown', kdown);
			window.removeEventListener('keyup', kup);
			
			clearInterval(all.heartbeat); 
			//all.heartbeat =	setInterval(update,65); //100 //70
			//eruda.init();

			console.log('console is responsive now, thanks eruda :)');
		} //scan

//TYPE
//.type is a special command that only takes one parameter which is a string that can contain "." and ":" without having an effect
//on the instruction. .type:a string to appear on input and instant focus
//This command is useful to create specific shortkeys
//This commands should probly be available always. !!!!!!!!!!
		if(mc_a[1]=="type"){
			var ta = str.split(":"); ta.shift(); 
			chat_in.style.display="inLine";	chat_in.value = ta.join(":");
			all.chat_on = true; chat_in.focus();
		
		}//.type

//FIREWAVE
//PULSE
//.. will be called Fire Wave, will work differently...  !!!!!!!!!!!!!
//A wave will be a stance now. Special keys will have specific effects while on Fire wave stance.
//ok so given a radius, an angle and a centerX and a centerY, we can calculate xy of a point in the circle rim
//var x = radius * Math.cos(angle)+centerX;
//var y = radius * Math.sin(angle)+centerY;
//!!!!!!
//i dont like where wave_up is being called, Fire riding should be tracked before animf, but after we ask for user stance updates.
//..this command creates the wave state and sets the entity into the Fire wave stance. . so after we ask for all.c_com to evaluate commands
//acording to stance, we should also update all changes and keep track of the stance logic inmediately after. these changes will be
//specific to the stance. After this, we need to ask for :
//orbs, husks, vessels that are not stanciated, but which are the mayor actors that update all other states changes.
//animf simply runs the graphics.
//So now Firewave is simply how entities travel. Firewaves should be able to drag memories along when encountered so entities
//will be able to grab rogue memories in a wide area , finding memories out there on their own will be harder in some areas
//but easier in others.
//.fire
		if(mc_a[1]=='fire'){
			if(stance.form=='Fire'){
				stance.intensity++;
				stance.custom_a=[]
				stance.custom_a.push([0.5, "a"],0,0,0);
				let nin = stance.intensity;
				var ix = stance.intensity;
				while(ix--){stance.custom_a.push(0);}
				stance.custom_a.push([1,'a',27-nin,'b',54-nin,'g',153+nin,'r']); stance.t=-1;
				stance.radius=1;
				stance.x=Math.round(-U.x+window.innerWidth/2);
				stance.y=Math.round(-U.y+window.innerHeight/2);
				stance.maxrad = stance.maxrad+nin;

			}//else{

			if(stance.form=='Void'){
				var id = Date.now();
				var p = all.circle_s_new(id+'___fire');
				p.entity = U.name; p.id = id;
				p.x = Math.round(-U.x+window.innerWidth/2);
				p.y = Math.round(-U.y+window.innerHeight/2);
				p.form='Fire'; p.display='custom'; p.is='c_circle';
				p.custom_a.push([0.5, "a"],0,0,0,[0.7,"a",27,'b',54,'g',153,'r']); p.t=-1;
				p.maxrad=500;
				p.intensity=1;
				p.radius=1;

				stance=p;
				all.anim_a.push(stance);

			}
			if(stance.form=='Husk'){

			}


		}//fire

//We need Ice now. A command to induce Ice into the stance. Fire waves will freeze and create a Husk once the Firewave reaches
//intensity zero? Maybe Husks could melt and reduce its radius slowly in time? for now we need to freeze the Fire
//.ice
		if(mc_a[1]=='ice'){

			if(stance.form=='Husk'){
				//stack ice on Husk
				stance.intensity--;
				stance.custom_a=[];
				stance.custom_a.push(
					[0.8, "a"],0,0,0,0,0,[0.9,'a',100+(-stance.intensity),'b',20,'g',100,'r']
				); stance.t=-1;
			}

			if(stance.form=='Fire'){
				//create a Husk on intensity 0
				stance.intensity--;
				if(stance.intensity==0){
//maybe update position here after angle changes? .. maybe this operation is performed before updating fire position..
					stance.form='Husk';
					stance.name=stance.id+'___husk';
					stance.custom_a=[];
					stance.custom_a.push([0.8, "a"],0,0,0,0,0,[0.9,'a',100,'b',20,'g',100,'r']); stance.t=-1;
				}
			}


		}//ice

//!!!!!!!!!!!!!!!!!!!!!
//lets make displace a general command that will call the proper function depending on the stance.form and stance.se
//... but am thinking , the displace command doesnt make much sense because, this is going to be a function called by Arrows
//consistently from any stance.. displace is not a command , its a program function. Keyboard users will call it by pressing arrows
//and touchscreen users will call it by pressing some kind of special button on the screen , but its not a command,
//its not a custom button. It doesnt need to go here on all.c_com.
//While an entity is on orb stance, arrows will move the orb memory prim as long as the orb is inside a husk.
//While an entity is on a Husk stance, arrows will displace the screen center
		//
//commands for text editor
//Editors need to track user selected elements. on txt editor we want to keep track of lines , insert operation and line beat
//st.selL  st.insOp  st.selB
//.modify		Changes insert operation to modify a currently existing txt on the selected line
//.lineup  .linedown	To move between lines
//.beats:number		Asign a number of beats to the animation
//.beat:number		Select a beat by number
//once we have selected a beat, we can asign changes like this.
//.r/g/b/a/layer/align
//We can asign one value for each parameter per beat.
		//
//commands for image editor
//.cursor.direction:number	A cursor to move around a selected rectangle. We will use a rect to select an image section and
//				drag it around to place it using the orbprim center as reference.. we could use this to move the txt around
//				too....? so on txt editor, it changes x y on a line, whilest on image editor, it changes x y of the capture
//.capture	Captures a cursor selection to be draged
//.define	Asigns px py pw ph using the captured selection
//We use the same commands on image editor to manage beats.
//once we have a selected a beat/frame, we can asign changes like this.?
//.x/y/w/h/px/py/pw/ph/a/layer ?

		//NEW SYSTEM
		//select next line
//On edit mode , selecting a line should center the screen on the line position !!!!!!!!! done
		//txt orb exclusive. maybe these could work differently on edit mode and on stream in mode.. they should!
		//..on stream mode, this could be used to.. look back into the stream history, only visible for the
		//entity issuing the command!!!!
		//.linedown

		if(mc_a[1]=='linedown'){
			stance.selL++;
			if(stance.selL>stance.lines.length+1){stance.selL--;}
			stance.selB=0;
			//var op = {msg:'new line selected', x:st.primX, y:st.primY}; all.c_out.push(op);
			//var print = true;
		}

		//select prev line
		if(mc_a[1]=='lineup'){
			stance.selL--;
			stance.selB=0;
			if(stance.selL==0){stance.selL++;}
			//var op = {msg:'Line: '+st.selL, cus:[[0.8,'a'],0,0,[250,'r',10,'b']], line:2, x:st.primX, y:st.primY};
	//.. so instead of sending these packets here, we could simply send a message to let know output picking phase user has selected
	//a new line. what we do with this packet should be an independant process. Editors process can be embeded but we are
	//going to need to be able to create this process using scripts.
			//var op = {msg:'new line selected', x:st.primX, y:st.primY}; all.c_out.push(op);
			//var print = true;
		}	

	
		//asign a number of beats for the selected line
		//should work with image edits as well...
		//.beats:number
		if(mc_a[1]=='beats'){
			var lc = parseFloat(mcp_a[1]);
			if(lc<=0){}else{
				var line = stance.lines[stance.selL-1]; // {txt:'...', cus:[[]..]}
				if(lc<line.cus.length){
					var sub = line.cus.length-lc;
					while(sub--){
						line.cus.shift(); //i know shift is slow, but this operation dont need to be rly fast
					}
				}
				if(lc>line.cus.length){
					var add = lc-line.cus.length;
					while(add--){
						line.cus.unshift(0);
					}
				}

				//inform amount of beats and currently selected one. use old method
				//var op = {msg:'new beats number',x:st.primX,y:st.primY}; all.c_out.push(op);
				stance.selB=0;
				var print = true;
			}// no 0 safe

		}

		//select beat by number
	//!!!!!! so when we change the line, we also need to change to an existing beat. maybe just make selected beat 0 idk
		//should work with image edits as well..
		if(mc_a[1]=='beat'){
			var nv = parseFloat(mcp_a[1]);
			var line = stance.lines[stance.selL-1];
			if(nv<0){nv=0;}
			if(nv>=line.cus.length-1){nv=line.cus.length-1;}
			stance.selB = nv;
			//var op = {msg:'beat selected',x:st.primX,y:st.primY}; all.c_out.push(op);
			//var print = true;
		}

		//select next beat
		if(mc_a[1]=='beatdown'){
			stance.selB++;
			var line = stance.lines[stance.selL-1];
			if(stance.selB>line.cus.length-1){stance.selB--;}
			//var print = true;
		}

		//select prev beat
		if(mc_a[1]=='beatup'){
			stance.selB--;
			if(stance.selB<0){stance.selB++;}
			//var print = true;
		}

//a command to change limitL , limit lines to show on stream mode. needs some thinks
		if(mc_a[1]=='limit'){
			stance.limitL=parseFloat(mcp_a[1]);
			//var print = true;
			
		}


		//modify a line
		//txt orbs exclusive
		if(mc_a[1]=='modify'){
			if(stance.selL>=stance.lines.length+1){}else{
				chat_in.style.display="inLine";
				chat_in.focus();
				chat_in.value = stance.lines[stance.selL-1].txt;
				all.chat_on=true;
				stance.insOp='modify';
			}
		}

		//remove a line
		//txt orbs exclusive. maybe we could use remove to remove image frames too
		if(mc_a[1]=='remove'){
			if(stance.selL>=stance.lines.length+1){}else{
				var place = stance.selL-1;
				stance.lines.splice(
					place,1 //let lines be simpler bro
				);
				//all.printo(st,'edit');			
				var print = true;
			}
		}

		//so we should control size from the orb, we dont need a different size for each and every line.
		//txt orbs exclusive. maybe we could generalize to be used on user input size too
		//.sizeup/sizedown
		if(mc_a[1]=='sizeup'){
			var font = stance.font.substr(5);
			var size = stance.font.substr(0,2); parseInt(size); size++;
			stance.font = size+"px "+font;
			stance.spacer++;
			//all.printo(st,'edit');
			//var op = {msg:'new size',x:st.primX,y:st.primY}; all.c_out.push(op);
			//var print = true;
		}

		if(mc_a[1]=='sizedown'){
			var font = stance.font.substr(5);
			var size = stance.font.substr(0,2); parseInt(size); size--;
			stance.font = size+"px "+font;
			stance.spacer--;
			//all.printo(st,'edit');
			//var op = {msg:'new size',x:st.primX,y:st.primY}; all.c_out.push(op);
			//var print = true;
		}

		//change layer of all lines printed by this memory
		//this command could also be generalized
		if(mc_a[1]=='layer'){
			stance.layer=mcp_a[1];
			//all.printo(st,'edit');
			//var op = {msg:'new layer',x:st.primX,y:st.primY}; all.c_out.push(op);
			//var print = true;
		}

//changing rgb could be one function. a is a bit different because of decimals..
		//
		//change red value in the selected beat of the selected line
		if(mc_a[1]=='r'){
			var line = stance.lines[stance.selL-1];
			//if we asign '..number-number' then the system will print a new value for red between numbers
			if(mcp_a[1][1]=='.'){
				var nv = mcp_a[1];
			}else{
				var nv = parseFloat(mcp_a[1]);
				if(nv>255||nv<0){console.log('no'); all.com_a=undefined; return}
			}
			var lc = line.cus[stance.selB];
			if(lc==0){
				//console.log('problem');
				line.cus.splice(stance.selB,1,[nv,'r']);
			}else{
				var clo = lc.length; 
				while(clo--){
					var alr = lc[clo];
					if(alr=='r'){lc[clo-1] = nv; var dont_p = true; break;}
				}
				if(dont_p){}else{lc.push(nv,'r');}
			}
			//all.printo(st,'edit');
			//var op = {msg:'change on line',x:st.primX,y:st.primY}; all.c_out.push(op);
			//var print = true;
		}

		//change green value in the selected beat of the selected line
		if(mc_a[1]=='g'){
			var line = stance.lines[stance.selL-1];
			//if we asign '..number-number' then the system will print a new value for red between numbers
			if(mcp_a[1][1]=='.'){
				var nv = mcp_a[1];
			}else{
				var nv = parseFloat(mcp_a[1]);
				if(nv>255||nv<0){console.log('no'); all.com_a=undefined; return}
			}
			var lc = line.cus[stance.selB];
			if(lc==0){
				//console.log('problem');
				line.cus.splice(stance.selB,1,[nv,'g']);
			}else{
				var clo = lc.length; 
				while(clo--){
					var alr = lc[clo];
					if(alr=='g'){lc[clo-1] = nv; var dont_p = true; break;}
				}
				if(dont_p){}else{lc.push(nv,'g');}
			}
			//all.printo(st,'edit');
			//var op = {msg:'change on line',x:st.primX,y:st.primY}; all.c_out.push(op);
			//var print = true;
		}
		
		//change blue value in the selected beat of the selected line
		//this same command could be adapted to manage other blues we could want to change like; user input blue etc
		//same with all other colors
		if(mc_a[1]=='b'){
			var line = stance.lines[stance.selL-1];
			//if we asign '..number-number' then the system will print a new value for red between numbers
			if(mcp_a[1][1]=='.'){
				var nv = mcp_a[1];
			}else{
				var nv = parseFloat(mcp_a[1]);
				if(nv>255||nv<0){console.log('no'); all.com_a=undefined; return}
			}
			var lc = line.cus[stance.selB];
			if(lc==0){
				//console.log('problem');
				line.cus.splice(stance.selB,1,[nv,'b']);
			}else{
				var clo = lc.length; 
				while(clo--){
					var alr = lc[clo];
					if(alr=='b'){lc[clo-1] = nv; var dont_p = true; break;}
				}
				if(dont_p){}else{lc.push(nv,'b');}
			}
			//all.printo(stance,'edit');
			//var op = {msg:'change on line',x:st.primX,y:st.primY}; all.c_out.push(op);
			//var print = true;
		}

		//change alpha value in the selected beat of the selected line
		//with only a few modifications we can use most of this code for image alpha control as well
		if(mc_a[1]=='a'){
			var line = stance.lines[stance.selL-1];
			//if we asign '..number-number' then the system will print a new value for red between numbers
			if(mcp_a[1][1]=='.'){
				var subs = mcp_a[1].substr(2);
				var v_a = subs.split('-');
				var n1 = v_a[0]; var n2 = v_a[1];
				if(n1>10||n1<1){console.log('no'); all.com_a=undefined; return}
				if(n2>10||n2<1){console.log('no'); all.com_a=undefined; return}
				var nv = '..'+n1/10+'-'+n2/10;
			}else{
				var nv = parseFloat(mcp_a[1])/10;
				if(nv>1||nv<0.1){console.log('no'); all.com_a=undefined; return}
			}
			var lc = line.cus[stance.selB];
			if(lc==0){
				//console.log('problem');
				line.cus.splice(stance.selB,1,[nv,'a']);
			}else{
				var clo = lc.length; 
				while(clo--){
					var alr = lc[clo];
					if(alr=='a'){lc[clo-1] = nv; var dont_p = true; break;}
				}
				if(dont_p){}else{lc.push(nv,'a');}
			}
			//all.printo(st,'edit');
			//var op = {msg:'change on line',x:st.primX,y:st.primY}; all.c_out.push(op);
			//var print = true;
		}

		//A command to change memory orb into edit mode.
//edit always need at least one to listen to its outputs so it will create on if doesnt exist already
		if(mc_a[1]=='edit'){
			stance.mode='edit';
			//var print = true;
		}

		//A command to change memory orb into stream mode.
		if(mc_a[1]=='stream'){
	//?
			ctx0.translate((-U.x),(-U.y));//this should put user on 0
			//var newX= var newY=
			var rpx = Math.round(-stance.primX+(window.innerWidth/2));
			var rpy = Math.round(-stance.primY+(window.innerHeight/2));
			ctx0.translate(rpx,rpy);
			U.x=rpx; U.y=rpy;
			//
			pupil.x=-U.x+window.innerWidth/2; pupil.y=-U.y+window.innerHeight/2;
			//
			stance.mode='stream';
			//all.printo(stance,'stream');
		}

//now we want run script mode
//so actually run script mode should be able to manipulate all memories around. scripts need to be able to change modes
//in all memories and relocate them etc. a script can offuscate itself with another script executing the instructions to offuscate
//The scan instruction....
//...ok .. So,  scripts should simply be commands. Simple as that. All commands need to be modular so they should be able to be called
//simultanoeusly.
//Now we need a command to scan for data nearby. This same command should be able to be run in a script.
//a command to focus on a specific state. We want to focus on any specified state part too. We want line controls, circle rims,
//circle centers.
//Focus . 

		if(mc_a[1]=='focus'){
			

		}	
/*	
//!!!!!!!!!!!!
//so now am thinking , /place/subplace.command.subcommand:param1:param2: etc..
/user.x  , /user.y:new y , 
/void.
/fire .scan ..
/vessel
/orb
/txt
[id].form
.scan		We can scan using the body of the current stance.
{}		Only run when condition is fullfilled.
.focus 				We use focus to select where user screen position goes. focus alone returns current selected stance
.focus:id			Take an entity nearby to the point on demand.
.focus.next/prev/current	Move between posible selections in a txt?. current outputs currently selected id.

[some txt id].focus		We can place the result of a command inside a txt.

.Yes this.

We also want to reestructure heartbeat loop.
Just do exactly the same as in anim cue drawing. Make more arrays to give specific states priority. But make them interchangeable
The same structure but placed on arrays in sequence. So we first check on states with logic first and then simpler ones.

So we can run a script from another script. As long as its in radius of the current stance
/txt/name or id of txt.play
[id]/line.x '/y/r/g/b/a'
So id or name could be anything. ... wow ok you need to keep going. Just go all the way in.

*/



		if(mc_a[1]=='play'){
			//

		}


		//if(print){all.printo(stance,'edit');} //
		if(stance.form=='Text'){
			all.printo(stance, stance.mode);
		}

//panic attack
//refference.... omg this is too much... ok this is the old edit system... we gotta transform all signals into simple commands
//synthesize. we gotta re implement the insert lines system.. come on man you got this.
//..just start from scratch.... you slayed king:) system is much better now. and we can handle outputs now. Maybe check those
//radu videos some more

/*	
//vessel and void exclusive commands? no
		if(comav=='vessel'||comav=='void'){


//MAINSTREAM this will be deprecated soon
//when user is on void or inner mode, we can talk with other users on void or other void entities
//while on void, we can only configure mainstream. We should also be able to access mainstream from inner mode
//the only instante where mainstream is not available is when user is on orb stance and radiant mode. thats when mainstream
//becomes orb stream, and it become susceptible to act language statements and conditions.
//.mainstream.r  , g,  b  , a	Default Color stats of the stream
//.mainstream.x
//.mainstream.y
//.mainstream.limit	Maximum number of lines of the stream
//.mainstream.size	Font size
//.mainstream.font
//.mainstream.spacer	How much space between stream lines
//.. we need to be able to scroll the stream and freeze it at will. would be nice for keyboard users to use arrows
// up and down to scroll, left to detach, right to attach to last
//and touchscreen users could simply swipe the stream up and down, and just touch to atach/detach
//.mainstream.sup , .sdown, .freeze, .unfreeze
//... so we need an object on user to hold mainstream history. Orbs can have an independent stream history object
//we also need a way to clear and switch off mainstream....
//it would be nice to see a vibrating coloring line or rect to frame the mainstream....
//we also need to address the "line is too long to print" issue...

//.mainstream	Print mainstream stats, modify stats using subcommands. Macro and subs only available from void and inner mode.
			if(mc_a[1]=="mainstream"){
				if(c_o){
					if(c_o.radiant_mode==true){
						//Dont allow mainstream control while on radiant mode
						var dont = true;
					}
				}
				if(dont){}else{
					var us = U.mainstream;
					if(mc_a[2]==undefined){
						
						//just print all mainstream stats
						all.stream_a.push(
				'___________________________________',
				//'Use .mainstream.[property]:[new value] to change a property.',
				'r: '+us.r, 'g: '+us.g, 'b: '+us.b, 'a: '+us.a,
				'x: '+us.x, 'y: '+us.y, 'limit: '+us.limit,
				'size: '+us.size, 'font: '+us.font, 'spacer: '+us.spacer,
				'___________________________________'
						);
						all.screen_log();
					}else{
						//a somehow funky command to clear history... needs to use other history property
						//if(mc_a[2]=='clear'){us.history=[]; var done = true;}
					
						if(dont){}else{//its a parameter change command..
							if(mc_a[2]=='font'){
								var p = mcp_a[1]
							}else{
								var p = parseFloat(mcp_a[1]);
							}
							all.n_param_com(mc_a[2], p ,U.mainstream);
						}
					}
		//also needs to clear stream activity before changes occur...... !!!!
				}
			}//mainstream

//BUTTON
//!!!!!!!!!!!!!
//keep for refference but this is mostly deprecat
//commands to create buttons for touchscreen users. these button are shortcuts
//for commands
//.button	Print all buttons stored. If on void recall user keys. If on orb stance, print keys according to orb mode.
//.button:[name]
//.button.[name].name:[new name]
//.button.[name].key:[new key]
//.button.[name].com1:[new com1] //One fast touch calls com1
//.button.[name].com2:[new com2] //One long press touch calls com2
//.button.[name].persist:[new persist value] //'persist'/'desist'
//.button.[name].delete
//.button.[name].asign:[oscillator name]  A vox special command. Turns button into a
//										musical instrument key
//we should be able to customize buttons size color etc..add this
			if(mc_a[1]=="button"){
					//locate mbox memory box
			//deprecat !!!!!!!! c_o doesnt exist anymore
				if(c_o){
					if(c_o.inner_mode){var mbox= U.inner_ks;}
					if(c_o.radiant_mode){var mbox= U.radiant_ks;}
					if(c_o.edit_img_mode){var mbox= U.img_ks;}
					if(c_o.edit_audio_mode){var mbox= U.audio_ks;}
					if(c_o.edit_txt_mode){var mbox= U.txt_ks;}
					if(c_o.edit_circle_mode){var mbox= U.circle_ks;}
					if(c_o.edit_rect_mode){var mbox= U.rect_ks;}
					if(c_o.edit_osc_mode){var mbox= U.osc_ks;}
					if(c_o.vox_mode){var mbox= U.vox_ks;}

					//add others//
				}
				//ehhhhhhh we got a problem here.
				if(c_o==undefined){var mbox= U.void_ks;}
				//if(comav=='husk'){} //.... where do ghostship buttons go?
				//nevermind. ghostship cant see this command.. for now
	
				if(mc_a[2]==undefined){
					if(mcp_a[1]==undefined){
					//.button
		//stream buttons and keys. its all on mbox
		//a loop to print buttons properties
						var ml = mbox.length;
						all.stream_a.push('___________________________________________________________');
						while(ml--){
							var mbt = mbox[ml];
							all.stream_a.push(
		`${mbt.key}, | com1: ${mbt.com1}, name: ${mbt.name},  com2: ${mbt.com2}, X: ${mbt.X}, Y: ${mbt.Y}`//, key: ${mbt.key}`
							);
						}
						all.stream_a.push('___________________________________________________________');
						all.screen_log();
					}else{
					//.button:[new button name]
						var newbtn = {
							key:undefined, name:mcp_a[1], com1:'.type:', com2:'.type:',
							X:50, Y:50, persist:'desist'
						}
						mbox.push(newbtn);
					}
				}else{
				//.button.[button name].parameter:[new param value]
					var ta = str.split(":"); ta.shift(); var nv = ta.join(":");
					//ta = undefined;
					//use mc_a[2] to locate key
					var btalr = Fting(mbox, "name", mc_a[2]);
					if(btalr){
						if(mc_a[3]=='name'){btalr.name=nv;}
						if(mc_a[3]=='com1'){btalr.com1=nv;}
						if(mc_a[3]=='com2'){btalr.com2=nv;}
						if(mc_a[3]=='persist'){btalr.persist=nv;}//persist, desist
					//persist should have a boolean value instead of the literal words persist/desist for consistency
						if(mc_a[3]=='key'){btalr.key=nv;}
						if(mc_a[3]=='delete'){
							var index = mbox.indexOf(btalr);
							mbox.splice(index,1);
						}//indexOf something
						if(c_o){
							if(c_o.vox_mode){
								if(mc_a[3]=='asign'){
									btalr.asigned_osc=nv;//
									btalr.persist='persist';//
									//console.log(nv);
									//btalr.tch='k';
									//c_o.init=true;
									c_o.op5=1;
								}
							
								if(mc_a[3]=='unasign'){
									btalr.asigned_osc=undefined;//
									btalr.persist='desist';//
									//console.log(nv);
									//btalr.tch='k';
									//c_o.init=true;
									c_o.op5=1;
	
								}
							}//vox k commands
						}
					}
				}
			}//.button
		}//vessel and void commands
*/


/*
//void stance commands . 			 /////VOID/////
//these should mostly be easy to asign keys
//VOID exclusive commands
//We should be able to manually create waves from orb inner mode..? WAVES
		if(comav=='void'){


//USER kinda deprecat. this needs to create an output signal
//while in void, U properties directly affect the void stance experience.
//We need a command to manage user properties, print user information on screen etc
//user needs to be able to modify;
//mainstream properties, user displacement speed trough void, name..
//.. for consistency  s sake, maybe we just need .user to print all user related data and use subcommands to change
//properties. just like we do with mainstream and estream
//.user
//.user.name:[new name]
//Change name at will. Void only. Offline only.
//.user.speed:[new speed]
//Modify speed at will. This speed parameter affects user displacement speed trough the void. 
//Available from void only.
//we probly need a location. x and y coordinates for user location..?
//we probly also need a .user.out to print a json from user. later its gonna be useful
//VO
			if(mc_a[1]=='user'){
				if(mc_a[2]==undefined){
					//print user data	
					all.stream_a.push(
				'---------',
				//'Use .user.[property]:[new value] to change a property.',
				'name: '+U.name,
				'birthday: '+U.birthday,
				'speed: '+U.speed,
				'x: ',+U.x,
				'y: ',+U.y,
				'----------'
					);
					all.screen_log();
				}
				if(mc_a[2]=='name'){
					//accept mcp_a[1] as new name
					all.n_param_com('name', mcp_a[1] ,U);
				}


//a command to remember a user
//.user.in:[userjsontext]
				if(mc_a[2]=='in'){
				//import a json text into sunya
					var ta = str.split(":"); ta.shift(); 
					var txt = ta.join(":");
					var obj_user = JSON.parse(txt);
					//
			//besides changing U parameters, we need to translate to its position
					U = obj_user;
					ctx0.translate(U.x,U.y);

					//var orb = {name: obj_orb.name}
					//obj_orb.birth_init= true;
				//!!!!!!!!!!!!!!!!!!!!!!!!!!!
					//all.user.orbs.push(orb);
					//all.up_objs.push(obj_orb);
					all.stream_a.push("User is here again.. "); all.screen_log();
					all.com_a = [];
					return
				}

//a command to print a json of the user
//.user.out
				if(mc_a[2]=='out'){
				//print out user in json
					//var orb = Fting(all.up_objs, 'name', mc_a[2]);
				//but first empty current img and audio files... problem here is i need to put these back again lol
					//orb.current_img_file={}
					//orb.current_audio_file={}
						
					var txt = JSON.stringify(U);
					all.chat_on = true; chat_in.focus();
					chat_in.style.display="inLine";
					chat_in.value = txt;

					all.com_a = [];
					return
				}
			}//user

//ORB
//an orb primordial form will depend on its experience , its animations stored, its data, its jobs etc
//REDEFINING RADIANCE
	//Orbs can only interact with other orbs trough acts.
//void navigation speed from void stance is limited
//The displace command can also be accessed swiping in the direction user whishes to move

//deprecat . we wont create orbs like this anymore but we will asign names to empty vessels to turn them into orbs
//a command to create an empty Orb vessel. Orbs need to have at least a name to be
//referenced.. no
//... the only way we can start controling a vessel is by naming it and so we must cast an impulse that surrounds an empty vessel
//to create a control wave that will now allow us to enter the husk and be able to name it, turning it into a vessel for an orb
//deprecat . we will name orbs, not create them using this command
//We will be able to fast travel to a vessel position and control it using a command
//.... i still dont know how to deal with .orb.in: .. should we be able to put a json orb inside a husk.. what if orb requires
//a big vessel. Well then a message will appear to alert user. if the husk is too big, then orb will just use the required space
//and will peel off the unused husk volume.
//to name a husk , we just need to press ENTER and write down what will become the new orb name. If we want to load a json orb
//we can just paste it on the prompt directly and press enter again.
//needs revision.............!!!!!!!!!!!!!!!!!
//the command to create an orb takes one user parameter which is the orb name so it goes:
//.orb:name
//This part here should just advocate for the commands access, 
//we are in the instance , the moment we can call this particular command
//I can modularize the logic of the commands, and the access
//When this command is available, it can be called using these methods
//1 Typing the power word on the keyboard or
//2 Touching something on the screen
//if touch anything but an orb while on void once, open up "create" button
//if user touches an orb, buttons to pop up, "control", "stream", "act". Also,
//orb more specific data should be recalled on touch.
//...... WELL now orbs are not created just by typing in a command so... all this.. is .. deprecated .. here for reff
		//
//actually most of these commands are good, only the orb creation will be different now.
//users should be able to issue commands to owned orbs from the void.
//ORB
//.orb	List all owned orbs for user to see. position and name
//!!!!!!!!!!!!!!!!!!!
//so this is more like a vessel thing instead of an orb
//.vessel
 			if(mc_a[1]=="orb"){ 
				if(mc_a[2]==undefined){
					//look for owned orbs
					var lso = all.fleet_a.length;
					while(lso--){
						var oo = all.fleet_a[lso];
			//we need a way to identify owned orbs ?
						if(oo.name!=undefined){
							all.stream_a.push(
								'name: '+oo.name+' X: '+oo.x+' Y: '+oo.y
							);
						}
					}
					all.screen_log();//maybe here would be cool to mess around with params
				}else{
					//mc_a[2] is orb name
					switch(mc_a[3]){
//now we need , orb owner, orb name should not always be accesible, orb current stance, 
//number of edits contained and what type, orb birth date, name of img file if any, name of audio file if any
//access to scripts read only, 
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! needs update
						case 'status'://.orb.[name].status
						//"status" should be called on prim touched. ?
							//var o_in_u = Fting(all.user.orbs, 'name', mc_a[2]);
							var orb = Fting(all.fleet_a, 'name', mc_a[2]);
							//img file check
							if(orb.current_img_file.name==undefined){
								var fi_name = 'NO FILE';
								var fi_size = '0';
							}else{
								var fi_name = orb.current_img_file.name;
								var fi_size = orb.current_img_file.size;
							}
							//audio file check
							if(orb.current_audio_file.name==undefined){
								var fa_name = 'NO FILE';
								var fa_size = '0';
							}else{
								var fa_name = orb.current_audio_file.name;
								var fa_size = orb.current_audio_file.size;
							}						

							all.stream_a.push("__________________");
							all.stream_a.push(
								'birthday: '+orb.vessel_id,
								'img edits: '+orb.img.length,
								'img file name: '+fi_name+' size: '+fi_size,
								'audio edits: '+orb.audio.length,
								'audio file name: '+fa_name+' size: '+fa_size,
								'txt edits: '+orb.txt.length,
								'acts: ...',
								'osc:...',
								'circle:...',
								'rect:...',
								'orb mode:...'
							);
							all.stream_a.push("__________________");
							all.screen_log();
							break
//OUT							
						case 'out':
				//print out orb in json
							var orb = Fting(all.fleet_a, 'name', mc_a[2]);
				//but first empty current img and audio files... problem here is i need to put these back again lol
				//yeah this works
							var c_i_f = orb.current_img_file;
							var c_a_f = orb.current_audio_file;
							orb.current_img_file={}
							orb.current_audio_file={}

							var txt = JSON.stringify(orb);
							all.chat_on = true; chat_in.focus();
							chat_in.style.display="inLine";
							chat_in.value = txt;

							orb.current_img_file=c_i_f;
							orb.current_audio_file=c_a_f;

							break
							
						case 'control':
//CONTROL
//a command to take control of an orb. right now there wont be more conditions but later
//there should be a way to prevent users from taking control of orbs they are not suposed to have control of
//sometimes users may participate on a mod
//that involves trying to type in a specific orb name to take control
//but its hard because name keeps changing or remains hiden. try to write an act to reveal an target orb name
//sometimes a specific event triggers orb holding into a name. and thats
//an oportunity for other users to take control etc
//condition to control is all.user.orbs having specific orb data inside?
//and typing in thetarget orb .. if you can type it its yours
							//
//consider all silences an oportunity to restart audio ctx. we dont want unnecesary
//huge timetamps to be dragged around. all precise time operations need to manage their
//values independently, this is, in refference to their own states or edits. user taking control of an orb is a good instance to restart
					//AUDIO values
					//leaving this here for now.... maybe transitions could take care of this !!!!!!
							if(all.au){}else{all.au=all.audioser();} //safenet?
//we should be able to just define stance global to make a refference to structure in control and changes will reflect on original
//object as well
							var orb = Fting(all.fleet_a, 'name', mc_a[2]);
							//uinit='orb inwards';
				//so i could pass on a different vessel to stancefrom if we wanted to travel from vessel to vessel
							uinit={transition:'orb inwards',stancefrom:undefined}//,stanceto:orb};
							stance=orb; 

							all.stream_a.push("User in control of  "+ mc_a[2]);
							all.screen_log();

							break
//ORB	
			//crash and burn. first we burn the memories, then we crash the vessel
						//.orb.[orb name].history.forget
						case 'history':
							if(mc_a[4]=='forget'){
								var orb = Fting(all.fleet_a, 'name', mc_a[2]);
								orb.stream.history = [];
				all.stream_a.push('...'+mc_a[2]+' stream history has vanished for ever.'); all.screen_log();
							}
							break


						//.orb.[orb name].destroy	To delete whole orb at once?
						//this needs a really cool animation.
						case 'destroy':
							var orb = Fting(all.fleet_a, 'name', mc_a[2]);
							var orbi = all.fleet_a.indexOf(orb);
							all.fleet_a.splice(orbi,1);
				all.stream_a.push('...'+mc_a[2]+' is just a string of words now.'); all.screen_log();
							break
						//.orb.[orb name].perform
						//this needs a really cool animation as well
						case 'perform':
							var orb = Fting(all.fleet_a, 'name', mc_a[2]);
							orb.radiant_mode=true;
					//maybe we could call a se to its prim vessel in here
				all.stream_a.push(mc_a[2]+' is performing.'); all.screen_log();
							break

						//case 'travel'
						//case 'vision'?

						//add default case.. ?



					}//switch

//.play
//How about users running commands that run orbs acts...
//... to make orb run an  act from void, orb needs to be in radiant mode!!!!
//Even tho a user wont see the effects from act scripts to a full extent while on void, there might be some visual changes
//on primordials. users might just want to leave scripts running for other users on broadcasting.
//.orb.nameoforb.nameofact.play

						//we need to loop txt edits to find a matching txt name. this is our script
						//we probly need a mechanism to prevent using non script txts.. but i think its done not sure
					if(mc_a[4]=='play'){
						var orb = Fting(all.fleet_a, 'name', mc_a[2]);
				//dont allow operation if orb is nor on radiant mode
						if(orb.radiant_mode){
						var txl = orb.txt.length;
						while(txl--){
							var atxt = orb.txt[txl];
							if(atxt[0].name==mc_a[3]){ //name of txt is on line1
								var lr = all.res_acts.length;
								while(lr--){
									var script = all.res_acts[lr];
									if(atxt[0].name==script.name){
										var playing_already = true;
										break
									}
								}
								var lac = orb.actors.length;
								while(lac--){
									var script = orb.actors[lac];
									if(a[0].name==script.name){
										var playing_already = true;
										break
									}
								}

								if(playing_already!=undefined){
									all.stream_a.push("Already playing.. "+mc_a[3]);
									all.screen_log();
								}else{
									//named_act.running = true;
									var act = all.actuator(atxt, orb); //actuator call
	//after actuator, act is pushed into all.res_acts array or into orb.actors array depending on "is" value
									if(act.is=='resource'){
										all.res_acts.push(act);
									}
									if(act.is=='actor'){
										orb.actors.push(act);
									}
									all.stream_a.push("Playing.. "+mc_a[3]);
									all.screen_log();
								}
							}//mc_a[3] match
						}//txt loop

						}//radiant mode safe

					} //play on mc_a[4]
				
				}//mc_a[2] orb access

			}//.orb   //.vessel?





		}//void commands
*/

/*
//vessel exclusive commands
		if(comav=='vessel'){
//STANCE
//orb inner eye stance COMMANDs				/////VESSEL/////
		//
//inner_mode for when we want to be idling in and
//no edit mode activated. however all edits are still considered user stance vessel
//... no more orb stance. Now stance value holds the name of the vessel or husk in control. If stance is undefined , we are on void stance

//.estream 
//a command to tweak edit feedback stream settings ESTREAM
//.estream	Print estream stats, modify stats using subcommands. Macro and subs only available from orb stance. all modes that use feed
			if(mc_a[1]=="estream"){
				if(mc_a[2]==undefined){
					//just print all estream stats
					var us = U.estream;
					all.stream_a.push(
				'___________________________________',
				'Use .estream.[property]:[new value] to change a property.',
				'r: '+us.r, 'g: '+us.g, 'b: '+us.b, 'a: '+us.a,
				'x: '+us.x, 'y: '+us.y,
				'size: '+us.size, 'font: '+us.font, 'spacer: '+us.spacer,
				'___________________________________'
					);
					all.screen_log();
				}else{
					if(mc_a[2]=='font'){
						var p = mcp_a[1]
					}else{
						var p = parseFloat(mcp_a[1]);
					}
					all.n_param_com(mc_a[2], p , U.estream);
				}
			//probly needs to clear stream activity when changes occur
			}

//SIGNAL
//calls diferent operations acording to orb mode
//op1, op2, op3 op4 and op5. Option, operation. signal should always just use op3
//.signal:[value]
//... so maybe we dont really need to use mc_a[2] to indicate op3 , we can simply use the parameter, this function should always affect op3
//other operations are reserved for edits inner mechanics, those dont need to be able to be changed from here....
//			if(mc_a[1]=='signal'){
//				c_o.op3=mcp_a[1];
//			}
//VOX
//a command to enter vox mode. In vox mode, keys are all now tied to vox interaction
//rules. Users can now asign osc anims to run
//when keys are pressed. The keyboard becomes a musical instrument. 
//phone users have a different experience but the idea is the same.
//An interface to asign previously stored oscilators to keys in order to play sounds
//using keyboard(k buttons)
//while in vox mode, users may choose to record the musical performance to be stored
//and become available for acts to recall
//vox can be run while on inner and radiant mode
			//.vox
			//if(mc_a[1]=="vox"){
				//if(mc_a[2]=="in"){
					//all.user.stance="vox.in";
			//	c_orb.inner_mode=false; c_orb.vox_mode=true; all.user.init = true;
			//	all.stream_a.push("vox.in mode on.."); all.screen_log();
				//}
				//if(mc_a[2]=="out"){
				//	all.user.stance="vox.out";
				//}
			//}

//INNER mode COMMANDS
			if(c_o.inner_mode){
				
//a command to load an image and a command to load an audio into the current
//inhabited Orb. currently only png and mp3 formats are available
//Orbs can only have 1 image and 1 audio loaded at any time... for now
//COMMANDS UPLOAD IMG AUDIO EVENT
//!!!!!!!!!!!!!!!!!!!!
//So the way these will work now is: We create an img or audio memory orb with no asigned file. Once we are on the memory stance,
//we can just call these commands, and files will be stored on the memory orbs.
				if(mc_a[1]=="load"){ //load should be a macro for later load other things besides images as well
					//needs a mechanism to let user know if file didnt load correctly
					if(mc_a[2]=="img"){
						img_in.click();	
					}
					//loads an audio file to run or edit
					if(mc_a[2]=="audio"){
						audio_in.click();
					}
	
				}
//maybe we could use .void to go to void from inner mode..

//EDIT animations using forms, texts  or files.
//...
//ALl these Edit commands will now work differently. We will be able to create memories with independant prims and manipulate
//their position. Memory Orbs(edit elements) will now be able to endure only when inside a Husk or a vessel.
//... so what about loaded files..? Should be independant prims too. Maybe we could distinguish a type of Memory by color.
//memory Prims will have a running form, an edit mode and an idling mode. Each memory will have its own offset from which they will
//project themselves.

//needs revision....
//AUDIO , EDIT
//.audio 
//.audio:[audio name]
//.audio.[audio name].delete
//.audio.[audio name].run //not ready..
//.audio.purge

				if(mc_a[1]=="audio"){
					if(mc_a[2]==undefined&&mcp_a[1]==undefined){var list = true;}
					if(mc_a[2]!=undefined){
						if(mc_a[2]=="purge"){mcp_a[1]=undefined; var purge = true;}
						//if(mc_a[2]=="list"){mcp_a[1]=undefined; var list = true;}
						var l = c_o.audio.length;
						while(l--){
							var a = c_o.audio[l];
							if(a.name==mc_a[2]){
								if(mc_a[3]=='out'){
									var txt = JSON.stringify(a);
									all.chat_on = true; chat_in.focus();
									chat_in.style.display="inLine";
									chat_in.value = txt;
									break
								}
								if(mc_a[3]=='delete'){
									var index = c_o.audio.indexOf(a);
									c_o.audio.splice(index,1);
					all.stream_a.push(a.name+" has been deleted"); all.screen_log();
									break
								}
							}
						}//audio loop
					
					}
					if(mcp_a[1]==''&&mc_a[2]==undefined){
						mcp_a[1]=undefined; var noname = true;
					}
					//ask here if there is no audio file loaded. 
					//dont allow audio edit if there isnt
					if(mcp_a[1]!=undefined&&c_o.audio_access.length==undefined){
						var noaccess = true;
					}
					if(mcp_a[1]!=undefined&&c_o.audio_access.length!=undefined){
						var proceed = true;
					}
					if(purge){
						c_o.audio= [];
						all.stream_a.push('audio edits container has been cleared..');
						all.screen_log();
					}
					if(list){
					//list audio anims and a brief description, which event is tied to etc
						var l = c_o.audio.length;
						while(l--){
							//var aud = c_o.audio[l];
							//all.stream_a.push(aud.name+" .. audio snip... ");
							//all.screen_log();
						}			
					}
					if(noname){
						all.stream_a.push("Please asign a name for this audio edit..");
						all.screen_log();
					}
					if(noaccess){
						all.stream_a.push("Cant create audio snipet without an audio file loaded");
						all.screen_log();
					}
					if(proceed){
						//var name_ok = all.c_unl(mcp_a[1],'audio');
						//if(name_ok){}else{}
						c_o.inner_mode=false; c_o.edit_audio_mode = true;  
						uinit = {transition:'orb edit',stancefrom:c_o};

		//this works because audio anim is just an object not an array
						var named_aud = Fting(c_o.audio, "name", mcp_a[1]);
						if(named_aud){
							c_o.op1 = c_o.audio.indexOf(named_aud); 
							all.stream_a.push("Recalling...   " + mcp_a[1]);
							all.screen_log();
						}else{	


							var a = {};
							a.name = mcp_a[1];
							a.audio_file_name= c_o.current_audio_file.name;
							a.gain=0.07; a.fade=0.3;
							a.start = 0; a.end = c_o.audio_access.duration;
							c_o.audio.push(a);
							
							c_o.op1 = c_o.audio.length-1;
							all.stream_a.push("Editing...audio..  " +mcp_a[1]); all.screen_log();
						}
					}
				}//audio

//IMG, EDIT
//.img
//.img:[img name]
//.img.[img name].delete
//.img.[img name].run
//.img.purge
				if(mc_a[1]=="img"){
					if(mc_a[2]==undefined&&mcp_a[1]==undefined){var list = true;}
					if(mc_a[2]!=undefined){
						//.img.purge
						if(mc_a[2]=="purge"){mcp_a[1]=undefined; var purge = true;}
						//search for name match..
						var l = c_o.img.length;
						while(l--){
							var a = c_o.img[l];
							if(a){
								if(a[0].name==mc_a[2]){
									if(mc_a[3]=='out'){
										var txt = JSON.stringify(a);
										all.chat_on = true; chat_in.focus();
										chat_in.style.display="inLine";
										chat_in.value = txt;
									}
									if(mc_a[3]=='delete'){
										var index = c_o.img.indexOf(a);
										c_o.img.splice(index,1);
						all.stream_a.push(a[0].name+" has been deleted"); all.screen_log();
									}
						//use parameter to rename
									if(mcp_a[1]!=undefined){
								a[0].name = mcp_a[1];
								all.stream_a.push('Changed img name from '+mc_a[2]+' to '+mcp_a[1]);
								all.screen_log();
									}
//here goes img run on inner mode RUN
									if(mc_a[3]=='run'){
 				var sr = Fting(all.anim_a, 'name', a[0].name+c_o.name+"__r");
				if(sr){
					if(sr.loop){
						sr.is='rm';
						a[0].running='FALSE';
					}
				}else{
				//ask if img file is loaded here...
					if(c_o.current_img_file.name==a[0].img_file_name){
						//var ceX=c_o.primX; var ceY=c_o.primY;//grid zero
						var sr = all.ims_s_new(a[0].name+c_o.name+"__r", c_o.img_access);
						var sret = all.getetv(a);
						sr.anim=a; //sr.ctx=ctx1;
						sr.tx=c_o.primX; sr.ty=c_o.primY;
						sr.is='c_img'; //sr.t=1;
						sr.et=sret; sr.rt=sr.et; sr.loop=true; sr.run=true;
						a[0].running='TRUE';
						all.anim_a.push(sr);
					}
			
				}
										all.shadow_mode(c_o);
									}//run
								}//anim access
							}//if a
						}//while
					}//
					
					if(mcp_a[1]==''&&mc_a[2]==undefined){mcp_a[1]=undefined; var noname = true;}
					//ask here if there is no img file loaded. dont allow img edit if there isnt
					if(mcp_a[1]!=undefined&&c_o.img_access.width==undefined){
						var noaccess = true;
					}
					if(mcp_a[1]!=undefined&&c_o.img_access.width!=undefined&&mc_a[2]==undefined){
						var proceed = true;
					}
					//clear is too much a light word to do this... purge is better
					if(purge){
						var rl = c_o.img.length;
						while(rl--){
							var a = c_o.img[rl];
							var sr = Fting(all.anim_a, 'name', a[0].name+"__r");
							if(sr){
								sr.u_d.push('is','rm');
								sr.is='c_img'; sr.t=1; sr.et = -1;
							}
						}
						c_o.img= [];
						all.stream_a.push("All img animations have been deleted."); all.screen_log();

					}
					if(list){
//list img animations and a brief description. number of frames, which event is tied to etc
	//same problem. 
						var l = c_o.img.length; //c_o.img.length;
						if(c_o.current_img_file==undefined){
							var imgf = 'NO IMAGE UPLOADED';
						}else{
				var imgf =`loaded img file name:${c_o.current_img_file.name}, size: ${c_o.current_img_file.size}`
						}
						all.stream_a.push(
							"------------------------------","IMG EDITS", imgf	
						);

						while(l--){
							//if(l<0){break}
							var a = c_o.img[l];
							if(a){if(a[0]){var ok = true;}}
							if(ok){
 							var sr = Fting(all.anim_a, 'name', a[0].name+"__r");
							if(sr){var runin = 'TRUE';}else{var runin = 'FALSE';}
								all.stream_a.push(
					`edit name:${a[0].name}, img file name:${a[0].img_file_name}, running: ${runin}`
								);
								all.screen_log();
							}
						}					
						all.stream_a.push("-------------------------------");
						all.screen_log();
					}
					if(noname){
						all.stream_a.push("Please asign a name to this animation..");
						all.screen_log();
					}
					if(noaccess){
						all.stream_a.push("Cant animate img without a img file loaded");
						all.screen_log();
					}
					if(proceed){
						//var name_ok = all.c_unl(mcp_a[1],'img');
						//if(name_ok){}else{}
						c_o.inner_mode=false; c_o.edit_img_mode=true; 
						//uinit = "orb edit";
						uinit={transition:'orb edit',stancefrom:c_o}//,stanceto:c_o};
						//
						var lim = c_o.img.length;
						while(lim--){
							var a = c_o.img[lim];
							if(a){
								if(a[0].name==mcp_a[1]){
									var index = c_o.img.indexOf(a);
									c_o.op1 = index;
								all.stream_a.push("Recalling...   " + mcp_a[1]); all.screen_log();
									var found = true;
									break
								}
							}
						}
						if(found){a.push({});}else{ //we push an empty frame to start editing
							var na = [];
							var f = {};
							f.x=0; f.y=0; f.w=100; f.h=100; f.f=0;
							f.px=0; f.py=0; f.pw=100; f.ph=100;
							f.ft=15; f.a=1;
							f.name=mcp_a[1];
							f.img_file_name=c_o.current_img_file.name;
							f.running='FALSE';
							na.push(f);
							c_o.img.push(na);
							
							c_o.op1 = c_o.img.length-1;
							all.stream_a.push("Editing...img..  " +mcp_a[1]); all.screen_log();
						}
					}//proceed
				}//img



//CIRCLE , EDIT
//.circle
//.circle:[circle name]
//.circle.[circle name].delete
//.circle.[circle name].run
//.circle.[circle name]:[new name]
//.circle.purge
				if(mc_a[1]=="circle"){
					if(mc_a[2]==undefined&&mcp_a[1]==undefined){var list = true;}
					if(mc_a[2]!=undefined){
						if(mc_a[2]=="purge"){mcp_a[1]=undefined; var purge = true;}
						//its an orb name, find it
						var l = c_o.circle.length;
						while(l--){
							var a = c_o.circle[l];
							if(a[0].name==mc_a[2]){
								if(mc_a[3]=='out'){
							//whats the problem with this circle structure?
									var txt = JSON.stringify(a);
									all.chat_on = true; chat_in.focus();
									chat_in.style.display="inLine";
									chat_in.value = txt;
								}
								if(mc_a[3]=='delete'){
									var index = c_o.circle.indexOf(a);
									c_o.circle.splice(index,1);
			all.stream_a.push(a[0]+" has been deleted"); all.screen_log();
	
								}
						//use parameter to rename
								//.circle.[circle name]:[new name]
								if(mcp_a[1]!=undefined){
									a[0].name = mcp_a[1];
								all.stream_a.push('Changed circle name from '+mc_a[2]+' to '+mcp_a[1]);
									all.screen_log();
								}
	//.circle.[edit name].run
	//a command to run the edit on loop while on inner mode :) . Use command again to stop the animation.
	//we need to tag the animation to let us know it should be ON while user is on inner mode in control of this orb.
								if(mc_a[3]=='run'){
 				var sr = Fting(all.anim_a, 'name', a[0].name+"__r");
				if(sr){
					if(sr.loop){
						sr.u_d.push('is','rm');
						sr.is='c_circle'; //sr.t=1; sr.et = -1;
						a[0].running = 'FALSE';
					}
				}else{
					var sr = all.circle_s_new(a[0].name+"__r");
					var sret = all.getetv(a);
					sr.anim=a; //sr.ctx=ctx1;
					sr.tx=window.innerWidth/2; sr.ty=window.innerHeight/2; 
					sr.et=sret; sr.rt=sr.et;  sr.loop=true;
					sr.is='c_circle';  
					a[0].running = 'TRUE';
					all.anim_a.push(sr);
				} 

								}//run
							}//named edit
						}
						
					}//mc_a[2] not undefined
	
					if(mcp_a[1]==''&&mc_a[2]==undefined){mcp_a[1]=undefined; var noname = true;}
					if(mcp_a[1]!=undefined&&mc_a[2]==undefined){var proceed = true;}
					if(purge){
						var rl = c_o.circle.length;
						while(rl--){
							var a = c_o.circle[rl];
							var sr = Fting(all.anim_a, 'name', a[0].name+"__r");
							if(sr){
								sr.u_d.push('is','rm');
								sr.is='c_circle'; sr.rt=-1; //sr.et = -1;
							}
						}
						c_o.circle= [];
						all.stream_a.push("All circle animations have been deleted."); all.screen_log();
					}
					if(list){
						var l = c_o.circle.length;
						all.stream_a.push("---------------------------");
						while(l--){
							var a = c_o.circle[l];
 							var sr = Fting(all.anim_a, 'name', a[0].name+"__r");
							if(sr){var runin = 'TRUE';}else{var runin = 'FALSE';}
							all.stream_a.push(
								"name: "+a[0].name+" running: "+runin
							);
							all.screen_log();
						}
						all.stream_a.push("---------------------------");
						all.screen_log();
					}
					if(noname){
						all.stream_a.push("Please asign a name for this circle animation."); 
						all.screen_log();
					}
					if(proceed){
						//var name_ok = all.c_unl(mcp_a[1],'circle');
						//if(name_ok){}else{}
						c_o.inner_mode=false; c_o.edit_circle_mode = true; //uinit = 'orb edit';
						uinit={transition:'orb edit',stancefrom:c_o}//'same',stanceto:c_o};
						var l = c_o.circle.length;
						while(l--){
							var a = c_o.circle[l];
							if(a){
								if(a[0].name==mcp_a[1]){
									var index = c_o.circle.indexOf(a);
									c_o.op1 = index;
							all.stream_a.push("Recalling...   " + mcp_a[1]); all.screen_log();
									var found = true; break
								}
							}
						}
						if(found){a.push({});}else{
							var new_anim = [];
							//var new_anim = {};
							
							var an = {};
							an.x=100; an.y=50; an.radius=40; an.r=220; an.g=220; an.b=220;
							an.a=1; an.ft=20; //an.st=0; an.f=0; 
							an.inside='empty'; an.running='FALSE';
							//an.rand = [];
							an.name=mcp_a[1];
							
							//new_anim.push(an);
							new_anim[0]=an;
							c_o.circle.push(new_anim);
							c_o.op1 = c_o.circle.length-1;
						all.stream_a.push("Editing.. circle..  " +mcp_a[1]); all.screen_log();
						}
					}//proceed
					
				}//circle

//RECT, EDIT
//.rect
//.rect:[rect name]
//.rect.[rect name].run
//.rect.[rect name].delete
//.rect.purge
				if(mc_a[1]=="rect"){
					if(mc_a[2]==undefined&&mcp_a[1]==undefined){var list = true;}
					if(mc_a[2]!=undefined){
						if(mc_a[2]=="purge"){mcp_a[1]=undefined; var purge = true;}
						var l = c_o.rect.length;
						while(l--){
							var a = c_o.rect[l];
							if(a[0].name==mc_a[2]){
								if(mc_a[3]=='out'){
									var txt = JSON.stringify(a);
									all.chat_on = true; chat_in.focus();
									chat_in.style.display="inLine";
									chat_in.value = txt;
								}
								if(mc_a[3]=='delete'){
									var index = c_o.rect.indexOf(a);
									c_o.rect.splice(index,1);
					all.stream_a.push(a[0].name+" has been deleted"); all.screen_log();
								}
						//use parameter to rename
								//.rect.[rect name]:[new name]
								if(mcp_a[1]!=undefined){
									a[0].name = mcp_a[1];
								all.stream_a.push('Changed rect name from '+mc_a[2]+' to '+mcp_a[1]);
									all.screen_log();
								}
			 //a command to run the edit on loop while on inner mode :)
								if(mc_a[3]=='run'){

 				var sr = Fting(all.anim_a, 'name', a[0].name+"__r");
				if(sr){
					if(sr.loop){
						sr.u_d.push('is','rm');
						sr.is='c_rect'; sr.rt = -1;
						a[0].running = 'FALSE';
					}
				}else{
					var sr = all.rect_s_new(a[0].name+"__r");
					var sret = all.getetv(a);
					sr.anim=a; //sr.ctx=ctx1;
					sr.tx=window.innerWidth/2; sr.ty=window.innerHeight/2; 
					sr.is='c_rect'; //sr.t=1; 
					sr.et=sret; sr.run=true; sr.rt=sr.et; sr.loop=true;
					a[0].running = 'TRUE';
					all.anim_a.push(sr);
			
				}

								}//run							

							}//named orb
						}
					}
	
					if(mcp_a[1]==''&&mc_a[2]==undefined){mcp_a[1]=undefined; var noname = true;}
					if(mcp_a[1]!=undefined&&mc_a[2]==undefined){var proceed = true;}
					if(purge){
						var rl = c_o.rect.length;
						while(rl--){
							var a = c_o.rect[rl];
							var sr = Fting(all.anim_a, 'name', a[0].name+"__r");
							if(sr){
								sr.u_d.push('is','rm');
								sr.is='c_rect'; //sr.t=1; 
								sr.et = -1;
							}
						}
						c_o.rect= [];
						all.stream_a.push("All rect animations have been deleted."); all.screen_log();

					}
					if(list){
						var l = c_o.rect.length;
						all.stream_a.push("---------------------------");
						while(l--){
							var a = c_o.rect[l];
 							var sr = Fting(all.anim_a, 'name', a[0].name+"__r");
							if(sr){var runin = 'TRUE';}else{var runin = 'FALSE';}
							all.stream_a.push(
								"name: "+a[0].name+" running: "+runin
							);
							all.screen_log();
						}
						all.stream_a.push("---------------------------");
						all.screen_log();
					}
	
					if(noname){all.stream_a.push("Please asign a name for this rect animation."); all.screen_log();}
					if(proceed){
						c_o.inner_mode=false; c_o.edit_rect_mode = true; //uinit = 'orb edit';
						uinit={transition:'orb edit',stancefrom:c_o}//'same',stanceto:c_o};
						var l = c_o.rect.length;
						while(l--){
							var a = c_o.rect[l];
							if(a){
								if(a[0].name==mcp_a[1]){
									var index = c_o.rect.indexOf(a);
									c_o.op1 = index;
							all.stream_a.push("Recalling...   " + mcp_a[1]); all.screen_log();
									var found = true; break
								}
							}
						}
						if(found){a.push({});}else{
							var new_anim = [];
							//var new_anim = {};
							
							var an = {};
							an.x=100; an.y=50; an.w=50; an.h=50;
							an.r=220; an.g=220; an.b=220; an.a=1;
							an.ft=20; //an.st=0;
							//an.f=0; 
							an.inside='empty'; an.running='FALSE';
							an.name=mcp_a[1];
							
							//new_anim.push(an);
							new_anim[0]=an;
							c_o.rect.push(new_anim);
							c_o.op1 = c_o.rect.length-1;
						all.stream_a.push("Editing.. rect..  " +mcp_a[1]); all.screen_log();
						}
					}//proceed
					
				}//rect
//needs revision...
//OSC , EDIT
//.osc
//.osc:[osc name]
//.osc.[osc name].delete
//.osc.[osc name].run
//.osc.[osc name]:[new name]
//.osc.purge
				if(mc_a[1]=="osc"){
					if(mc_a[2]==undefined&&mcp_a[1]==undefined){var list = true;}
					if(mc_a[2]!=undefined){
						if(mc_a[2]=="purge"){mcp_a[1]=undefined; var purge = true;}
						var l = c_o.osc.length;
						while(l--){
							var a = c_o.osc[l];
							if(a.name==mc_a[2]){
								if(mc_a[3]=='out'){
									var txt = JSON.stringify(a);
									all.chat_on = true; chat_in.focus();
									chat_in.style.display="inLine";
									chat_in.value = txt;
								}
								if(mc_a[3]=='delete'){
									var index = c_o.osc.indexOf(a);
									c_o.osc.splice(index,1);
					all.stream_a.push(a.name+" has been deleted"); all.screen_log();
								}
						//use parameter to rename
								//.osc.[osc name]:[new name]
								if(mcp_a[1]!=undefined){
									a.name = mcp_a[1];
								all.stream_a.push('Changed osc name from '+mc_a[2]+' to '+mcp_a[1]);
									all.screen_log();
								}
							}
						}
					
					}
					if(mcp_a[1]==''&&mc_a[2]==undefined){
						mcp_a[1]=undefined; var noname = true;
					}
					if(mcp_a[1]!=undefined&&mc_a[2]==undefined){var proceed = true;}
					//needs revision..
					if(purge){c_o.osc= [];}
					if(list){
						//list rect anims and a brief description, which event is tied to etc
						var l = c_o.osc.length;
						while(l--){
							var osc = c_o.osc[l];
							all.stream_a.push(osc.name+" .. an oscilator... ");
							all.screen_log();
						}			
					}
					if(noname){all.stream_a.push("Please asign a name for this oscillator.."); all.screen_log();}
					if(proceed){
						//var name_ok = all.c_unl(mcp_a[1],'audio');
						//if(name_ok){}else{}
						c_o.inner_mode=false; c_o.edit_osc_mode = true; //uinit = 'orb edit';
						uinit={transition:'orb edit',stancefrom:c_o}//'same',stanceto:c_o};
						var named_osc = Fting(c_o.osc, "name", mcp_a[1]);
						if(named_osc){
							c_o.op1 = c_o.osc.indexOf(named_osc); 
							all.stream_a.push("Recalling...   " + mcp_a[1]); all.screen_log();
						}else{	

//use R to play the sound. numbers and T to asign a frequency. U sine,  I square, O sawtooth, P triangle
//Y volume +, G volume -, Q quits,  F and C to increase fade out. should also be able to increase/decrease fade in
//use H and B to go 1 hertz up or down on frequency
					//cant end and splice inmediately after, must disconnect now and then splice
					if(a_s){
						a_s.osc_n.stop();a_s.osc_n.disconnect();
	//so one touch could simply do _1 and long press types signal ending on _
//screentouch could definitely benefit from swipe control over frequency adjust.. ...
				if(delta.signal=='hz up'||delta.signal=='hz down'){
					if(delta.signal=='hz up'){
						a.freq=a.freq+delta.value;
						if(a_s){
						a_s.osc_n.frequency.value=a_s.osc_n.frequency.value+delta.value;
						}
					}
					if(delta.signal=='hz down'){
						a.freq=a.freq-delta.value;
						if(a_s){
						a_s.osc_n.frequency.value=a_s.osc_n.frequency.value-delta.value;
						}
					}
				}
				
				if(delta.signal=='sine'){
					a.type='sine';if(a_s){a_s.osc_n.type='sine';}
				}
				
				if(delta.signal=='square'){
					a.type='square';if(a_s){a_s.osc_n.type='square';}
				}
				
				if(delta.signal=='saw'){
					a.type='sawtooth';if(a_s){a_s.osc_n.type='sawtooth';}
				}
				
				if(delta.signal=='triangle'){
					a.type='triangle';if(a_s){a_s.osc_n.type='triangle';}
				}
				
				//all.stream_a.push("New waveform has been set."); all.screen_log();
				//what about custom waveforms ?
					
//gain
				if(delta.signal=='gain'){
					if(delta.operation=='+'){
						a.gain=a.gain+0.01;
						if(a_s){a_s.gain_n.gain.value=a_s.gain_n.gain.value+0.01;}
					}
					if(delta.operation=='-'){
						a.gain=a.gain-0.01;
						if(a_s){a_s.gain_n.gain.value=a_s.gain_n.gain.value-0.01;}
					}
					all.stream_a.push("Gain adjusted"); all.screen_log();
				}//gain
							var a = {}; 
							a.name = mcp_a[1];
							a.freq= 435; a.gain=0.07;
							a.type='sine'; a.fade=0.3;
							a.on_a = [];//array for multi calls
	
							c_o.osc.push(a);
							c_o.op1 = c_o.osc.length-1;
							all.stream_a.push("Editing...oscillator..  " +mcp_a[1]); all.screen_log();
						}
					}
				}//.osc

//PERFORM . ACT
//open outer eye animation. orb is now ready to perform
//this means user will be able to see all effects created by currently playing scripts
//.perform
				if(mc_a[1]=='perform'){
					//a stream message here before we get into radiant mode
					//all.stream_a.push("Curtain recedes..."); all.screen_log();
					c_o.inner_mode=false; c_o.radiant_mode=true;
					uinit={transition:'orb perform', stancefrom:c_o}



				}//perform
				
				
			}//inner mode commands

//RADIANCE . ACT RADIANT MODE   ////RADIANCE
//whats the point of orb.out stance now? Acts will run and create instances for orbs to
//interact. the same acts will make instances for orbs
//to do things on their own as well. We only need a stance to check for acts activity... we should be able to do this from void.
//hmmmm... maybe this IS the radiance. always has been :0
//.. maybe this IS the orb.out stance in the end +.+u ... but its an orb mode acshuallly
// but wait.. acts must be able to be checked on inner mode as well. .? no.. because
//inner mode is the instance we use to customize and edit.
//radiant orbs dont even need ml up. inner mode orbs cant run acts. radiant orbs
//performing acts do. checkmate brain ;)

			if(c_o.radiant_mode){
//REFORM .ACT
//a command to go back to inner mode from radiant mode
//.reform
				if(mc_a[1]=="reform"){
					c_o.inner_mode=true; c_o.radiant_mode=false;
					uinit={transition:'orb reform',stancefrom:c_o}

//we really are deprecating the whole act system.. didnt even get to test it omg.
//i l just keep an old copy on.. old act script system sunya etc...
//reform needs to make a call to remove all resources , actors and states asociated with it. If broadcasting, a signal is sent to other users
//to let them know states produced using this orb resources no longer can access the resource and so on..

					//loop own actors box to
					var l1 = c_o.actors.length;
					while(l1--){
						var actor = c_o.actors[l1];

						var l2 = all.anim_a.length; 
						//clear and remove all asociated states
						var rname = '_lks_'+actor.name+c_o.name;
						while(l2--){
							var s = all.anim_a[l2]; 
							var ename = s.name.substr(-rname.length);
							if(ename == rname){
								s.u_d.push('is','rm','rt',-1);
								s.is='c_'+s.s; 
							}
						}//states loop
						//and remove this actor from orb.actors
						//var rmactor = c_orb.actors.indexOf(actor);
						c_o.actors.splice(l1,1);
					}//actors loop
//now we need to remove resources. loop all.res_acts
					var l1 = all.res_acts.length;
					while(l1--){
						var res = all.res_acts[l1];
						if(res.orb==c_o.name){
							all.res_acts.splice(l1,1);
						}
					}
					all.stream_a.push("Curtain drops...");
					all.screen_log();


				}//reform command

//ORB WAVES
//Here goes new waves?
//radiants can manifest 3 more waves apart from the basic ones, but all waves center created by radiants must be inside its field.
//IMPULSE
//also impulses scan data and stores it on orb caster to be used by its logic
				if(mc_a[1]=='impulse'){
					var vf = Fting(all.anim_a, 'name', c_o.vessel_id+'___atfield');
					var vr = vf.radius;
			//we now use vessel location as center, and coordinates we want to create the wave on will reffere this center
			//accept only 1 parameter to cast impulse in the center of the orb
					if(mcp_a[2]==undefined){
						var xnum = vf.x;
						var ynum = vf.y;
						var radnum = parseFloat(mcp_a[1]);
						if(radnum>=vr){var no = true;}//radnum=vr;}
					}else{
						var xnum = vf.x+parseFloat(mcp_a[1]); //var xlim = vf.x+vf.radius;
						var ynum = vf.y+parseFloat(mcp_a[2]); //var ylim = vf.y+vf.radius;
						var radnum = parseFloat(mcp_a[3]);
						
						if(xnum>=vf.x+vr){var no = true;}//xnum=vf.x+vr;} if(xnum<=vf.x-vr){xnum=vf.x-vr;}
						if(ynum>=vf.y+vr){var no = true;}//ynum=vf.y+vr;} if(ynum<=vf.y-vr){ynum=vf.y-vr;}
						if(radnum>=vr){var no = true;}//radnum=vr;}

					}
					var id = Date.now();
					var im = all.circle_s_new(id+'___suc');
					im.entity = U.name; im.orb = c_o.name; im.im_id = id;
					im.x=xnum; im.y=ynum; im.radius=radnum;
					im.chargeq = 0;
					im.se='suc';
					im.form='wave';
					im.is='c_circle';

					all.anim_a.push(im);
				}//impulse

//PULSE
//.pulse:x:y:rad   , .pulse:rad
				if(mc_a[1]=='pulse'){
					var vf = Fting(all.anim_a, 'name', c_o.vessel_id+'___atfield');
					var vr = vf.radius;
			//we now use vessel location as center, and coordinates we want to create the wave on will reffere this center
			//accept only 1 parameters to cast impulse in the center of the orb
					if(mcp_a[2]==undefined){
						var xnum = vf.x; var ynum = vf.y;
						var radnum = parseFloat(mcp_a[1]);
						if(radnum>=vr){var no = true;}//radnum=vr;}
					}else{
//so a problem here is that, if given x and y coordinates are far beyond radius, the center will still be outside the radius of vf
//we need to solve this.. for now we could simply cancel the command if numbers are not inside orb radius.
//what about isinpath method from canvas
						var xnum = vf.x+parseFloat(mcp_a[1]); //var xlim = vf.x+vf.radius;
						var ynum = vf.y+parseFloat(mcp_a[2]); //var ylim = vf.y+vf.radius;
						var radnum = parseFloat(mcp_a[3]);
						
						if(xnum>=vf.x+vr){var no = true;}//xnum=vf.x+vr;} if(xnum<=vf.x-vr){xnum=vf.x-vr;}
						if(ynum>=vf.y+vr){var no = true;}//ynum=vf.y+vr;} if(ynum<=vf.y-vr){ynum=vf.y-vr;}
						if(radnum>=vr){var no = true;}//radnum=vr;}
					}
					if(no){}else{
						var id = Date.now();
						var p = all.circle_s_new(id+'___pump');
						p.entity = U.name; p.orb = c_o.name; p.p_id = id;
						p.x=xnum; p.y=ynum; p.maxrad = radnum;
						p.radius = 1; p.chargeq = 0; p.intensity = 1;
						p.se='pump';
						p.form='wave';
						p.is='c_circle';

						all.anim_a.push(p);
					}
				}//pulse


//PLAY . ACT		
//yeah so whats up with acts.. how to stop resource acts
//So yeah one important thing i want to achieve is that
//acts need to be running
//in the bg. user can reform and go into the void while orbs carry on their
//acts. All effects should be effective but graphics of these animations
//interacting should not be displayed on user screen.
//a command to run an act
//only radiant orbs can perform. yes we can also run acts from orbs not in control
//as long as such orbs are on orb.out stance?, on radiant mode
//... so update this ... hmmm should not have a second parameter here.. while on radiant mode, users can only play acts from currently
//controled orb
//.play Should offer some kind of information..?
//but Its good that radiant orbs can only run 1 command "play", because they are now commited to scripts and not commands from the void.
//.. well we also have .reform , to go back to inner mode..
//.play:[name of act]
				if(mc_a[1]=="play"){
					//if(mc_a[2]=="list"){mcp_a[1]=undefined; var list = true;}
					if(mcp_a[1]==''&&mc_a[2]==undefined){mcp_a[1]=undefined; var noname = true;}
					if(mcp_a[1]!=undefined){var proceed = true;}
		//.. i dont think we need a list command here, we can learn about play with the .help command
					if(list){
						var running=undefined;
//list all running acts
//just ask if txt anim name match all.res_acts names or actors
						var l1 = c_orb.txt.length;
						while(l1--){
							var a = c_orb.txt[l];
							var l2 = all.act_d.length;
							while(l2--){
								var act = all.act_d[l2];
								if(a[0].name==act.name){
									all.stream_a.push(a[0].name+" is currently playing.");
									var playing = true;
									break
								}
							}//check act
						}//check txt
						if(playing){
							all.screen_log(); 
							//var running = undefined; 
						}
					}//list
					if(noname){
						//all.stream_a.push("No act to play selected.");
						//all.screen_log();
					}
					if(proceed){
						var l = c_o.txt.length;
						while(l--){
							var a = c_o.txt[l];
							if(a){
								if(a[0].name==mcp_a[1]){
									var found = true;
									//console.log(a);
									break
								}
							}
						}
						if(found){//if found
		//check res_acts and c_orb.actors
							var l1 = all.res_acts.length;
							while(l1--){
								var script = all.res_acts[l1];
								if(a[0].name==script.name){
									var playing_already = true;
									break
								}
							}
							
							var l1 = c_o.actors.length;
							while(l1--){
								var script = c_o.actors[l1];
								if(a[0].name==script.name){
									var playing_already = true;
									break
								}
							}

							if(playing_already!=undefined){
								//all.stream_a.push("Already playing.. "+mcp_a[1]);
								//all.screen_log();
							}else{
								//named_act.running = true;
								var act = all.actuator(a, c_o); //actuator call
		//after actuator, act is pushed into all.res_acts array or into orb.actors array depending on "is" value
								if(act.is=='resource'){
									all.res_acts.push(act);
								}
								if(act.is=='actor'){
									c_o.actors.push(act);
								}
								//all.stream_a.push("Playing.. "+mcp_a[1]);
								//all.screen_log();
							}
						}else{
							all.stream_a.push("No such act has been found.");
							all.screen_log();
						}
					}//proceed
				}//.play
		
			
			}//radiant mode commands

//VOX			
//store property links between keys and audio animations to call on vox 
//this "asign" works well in here, even tho it feels a bit out ofplace
//... maybe this whole vox deal should be implemented trough act language only..
			//if(c_orb.vox_mode){
			//	if(mc_a[1]=="asign"){
			//		var a_a = Fting(c_orb.osc, "name", mcp_a[1]);
			//		a_a.asigned_key = all.sstr;
					//normalize feedback
			//		all.s_s_t_r = []; all.sstr = ' '; all.sstr_l = ' ';
			//		all.stream_a.push("Osc asigned to key"); all.screen_log();
			//	}

			//}//vox mode commands

		}//vessel commands
*/

/*
//HUSK STANCE only one command available.. actualy we also need orb.in to bring the memory of another orb.
//if any of this commands run, we need to change to orb stance
//!!!! no commands on husk now.... so... deprecat... ok lets have these commands available for my own sanity for now
//husk exclusive commands
		if(comav=='husk'){
			//var gs = Fting(all.anim_a, 'aka', 'ghostship');
			//.name:[new name]
			if(mc_a[1]=="name"){
//we need to send a se to the ghostship so it reacts to its new soul.
//husk now merges with the orb and becomes a vessel
				if(mcp_a[1]==undefined){}else{//if no name this becomes a nameless husk?
					var newo = all.orb_new(mcp_a[1]);
					//var ghostship = {name:undefined, form:'husk', birth_date:s.husk_date}
					//newo.form='vessel';
			//oes.x=gs.x; oes.y=gs.y; oes.limitrad = gs.limitrad;
					newo.primY=c_o.y//primY;
					newo.primX=c_o.x//primX;
					newo.limitrad=c_o.limitrad;
					newo.limitdis=c_o.limitdis;
					//newo.im_id=c_o.im_id;
					//newo.husk_id=c_o.husk_id;
					//newo.vessel_id=c_o.id;
					//newo.prim=
					newo.vessel_id=Date.now();
			//we need to transform husk prim into a vessel
					//var hi = all.fleet_a.indexOf(c_o);
					//all.fleet_a.splice(hi,1);
					all.fleet_a.push(newo);
					stance=all.fleet_a[all.fleet_a.length-1]; //uinit='orb born';
					uinit={transition:'orb born',stancefrom:c_o}//,stanceto:stance};
					//uinit='orb born';
					//gs.se='soul in'; //all.user.init=true;
					//gs.soul=obj_orb.name;
					//gs.aka='newborn';
					all.stream_a.push("A new name for a new vessel ... "+mcp_a[1]); all.screen_log();
				}
			}
			//.in:json orb	
			if(mc_a[1]=='in'){
			//import a json orb text into sunya
				var ta = str.split(":"); ta.shift(); 
				var txt = ta.join(":");
				var oldo = JSON.parse(txt);
				//
				oldo.primY=c_o.y//primY;
				oldo.primX=c_o.x//primX;
				oldo.limitrad=c_o.limitrad;
				oldo.limitdis=c_o.limitdis;
				//oldo.imp_date=c_o.imp_date;
				//oldo.husk_id=c_o.husk_id;
				//oldo.id=c_o.id;
				oldo.vessel_id=Date.now();

				//var hi = all.fleet_a.indexOf(c_o);
				//all.fleet_a.splice(hi,1);
				all.fleet_a.push(oldo);
				stance=all.fleet_a[all.fleet_a.length-1]; //uinit='orb born';//"orb reborn"
				uinit={transition:'orb born',stancefrom:c_o}//,stanceto:stance};

				all.stream_a.push("Orb memory recovered.. " + oldo.name); all.screen_log();
				//i could just clear com_a and return?
				//all.com_a = [];
				//return
			}

			//a command to leave husk for now
			if(mc_a[1]=="exit"){
				//uinit='husk outwards';
				uinit={transition:'husk outwards',stancefrom:c_o}
				stance=undefined;
				all.stream_a.push("abandon ship.. "); all.screen_log();
			}

		}//husk stance
*/		
	all.com_a=undefined;
	//all.c_input='';
		//all.com_a.splice(0);//remove command logic from com_a array..m
	}//else{}//no commands on array condition
}//c_com










//yeah this should even be a function?
//returns an audio context. Normally should go into all.au . Am thinking it may be
//helpful to allow instances to clear up context and
//create a new one once and then so it doesnt carry gigantic numbers to create
//timestamps. might be good for optimization
//this should not be a function..? 
//
all.audioser = function(){
	//var a_ctx = new(
	//	AudioContext || webkitAudioContext || window.webkitAudiocontext
	//)();
	var a_ctx = new AudioContext();
	return a_ctx
}

//Most of these functions structure should take a previous object from an Orb or a
//void element or user data and return a state in order to run the audio
//maybe a command on demand could clear buffs to manage performance

//returns a sounding oscilator
//this function uses parameters from the audio animation(oscilator editor),
//it just creates osc and gain node, puts them into the audio state
//and conects them, and returns a state ready to be pushed on anim_a. anim_a should
//check when to end the sound and will use proper
//methods so it doesnt literaly pop out of existance, but gradually decreases its
//gain until is self removed. 
all.osc_s = function(audio_ctx,name, a_a){//audio_ctx, a_a
	var a_s = {}; //a_s.birth_t = all.au.currentTime;
	a_s.anim_name=a_a.name; a_s.name = name; a_s.fade = a_a.fade; a_s.end=undefined;
	a_s.is="osc"; a_s.s = "osc";
	//osc_node
	var osc_n = audio_ctx.createOscillator(); //a_a.osc
	a_s.osc_n = osc_n;
	a_s.osc_n.frequency.value=a_a.freq; //a_a.freq
	a_s.osc_n.type=a_a.type; //audio.type
	//gain node
	var gain_n = audio_ctx.createGain(); //audio.gain_n
	a_s.gain_n = gain_n;
	a_s.gain_n.gain.value=a_a.gain;//audio.gain
	a_s.osc_n.connect(a_s.gain_n);//0.07 is low volume  .  audio.osc_n.connect(audio.gain_n);
	a_s.gain_n.connect(audio_ctx.destination); //audio.gain_n.connect(audio_ctx.destination);
	//var st = st;
	a_s.osc_n.start();//audio.osc_n.start();
	return a_s //return audio state
}



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







/////////PHONE users
//bro study this for phone
/*
// Listen for mouse moves
	// canvas.addEventListener("mousemove", (event) => {
	//   // Check whether point is inside ellipse's stroke
	//     const isPointInStroke = ctx.isPointInStroke(
	//         ellipse,
	//             event.offsetX,
	//                 event.offsetY,
	//                   );
	//                     ctx.strokeStyle = isPointInStroke ? "green" : "red";
	//
	//                       // Draw ellipse
	//                         ctx.clearRect(0, 0, canvas.width, canvas.height);
	//                           ctx.fill(ellipse);
	//                             ctx.stroke(ellipse);
	//                             });




*/

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
all.create_bt = function(ctx, name, com1, com2, X, Y, text, persist){
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
	
	if(all.chat_on){return}

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
				if(all.bt_alr){
					if(s.tch=='bt'){
						var dist = all.get_dist(clX,s.tx,clY,s.ty);
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
						var dist = all.get_dist(clX,s.tx,clY,s.ty);
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
						var dist = all.get_dist(clX,s.tx,clY,s.ty);
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

	if(all.chat_on){return}

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

	if(all.chat_on){return}

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

	if(all.chat_on){return}

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
	
	all.heartbeat =	setInterval(update,60); //100 //70

}		


	
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
						all.ges_seq.push('down','t0');
						t0.ges=[]; //t0.ges.push({id:0});
						all.stream_a.push('t0 down'); all.screen_log();
					}
					if(ltga.Y<aprev_uY){
						all.ges_seq.push('up','t0');
						t0.ges=[]; //t0.ges.push({id:0});
						all.stream_a.push('t0 up'); all.screen_log();
					}
					
				}
				
				if(t1.ges.length>28){//t1swipe
					var bprev_pos = t1.ges[ligb-24];
					var bprev_dY = (bprev_pos.Y+22); var bprev_uY = (bprev_pos.Y-22);
					if(ltgb.Y>bprev_dY){
						all.ges_seq.push('down','t1');
						t1.ges=[]; //t[1].ges.push({id:1});
						all.stream_a.push('t1 down'); all.screen_log();
					}
					if(ltgb.Y<bprev_uY){
						all.ges_seq.push('up','t1');
						t1.ges=[]; //t[1].ges.push({id:1});
						all.stream_a.push('t1 up'); all.screen_log();
					}
				}
				//temporary..
				if(t0.gesEND==true||t1.gesEND==true){
				
					if(all.ges_seq[0]=='down'&&all.ges_seq[2]=='down'&&
					all.ges_seq[4]=='up'&&all.ges_seq[6]=='up'){
						var command = {is_a:"c", str:'.type:'}; all.com_a.push(command);
					}
					
					t0.is='rm';
					t1.is='rm';
					all.ges_seq=[]; //all.touches_a=[];
				}

				return
			}//input universal gesture
			
//void
			if(all.user.stance=='void'){
//.. now i can just ask for seq length to run specific gestures. this might prevent
//2 touch mess
				//if(seq.length==1){
				if(t0.gesEND==true){
					if(all.bt_alr==true){var clear_bt=true;}else{
	// key_s						
						var lbt = all.user.key_s.length;
						while(lbt--){
							var b = all.user.key_s[lbt];
				//(name, command, com1, X,Y,text boolean, persist)
							if(b.X==undefined){continue}
							//b.name not b.key, ctx2 previously
							var bts = all.create_bt(ctx0, b.name,b.com1, b.com2,
							b.X, b.Y, true, b.persist);
							bts.bt.reff=b;
							////add coordinates and text boolean
							all.anim_a.push(bts.bt, bts.txt);
						}//void tch list loop
						
						all.bt_alr = true; //var end=true;
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
						if(all.bt_alr==true){var clear_bt = true;}else{
							var lbt = co.inner_ks.length;
							while(lbt--){
								var b = co.inner_ks[lbt];
					//(name, com, X,Y,text boolean)
								if(b.X==undefined){continue}
								//b.name not b.key
								var bts = all.create_bt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true,b.persist);
								bts.bt.reff=b;
								////add coordinates and text boolean
								all.anim_a.push(bts.bt, bts.txt);
							}//inner tch list loop
							
							all.bt_alr = true;
						}//button call
					}//end
					
				}//inner mode
				
//radiant mode
				if(co.radiant_mode==true){
					if(t0.gesEND==true){
//button caller could be a function..
//a simple touch on any background calls for buttons on buttons memory array
						if(all.bt_alr==true){var clear_bt = true;}else{
							var lbt = co.radiant_ks.length;
							while(lbt--){
								var b = co.radiant_ks[lbt];
					//(name, com, X,Y,text boolean)
								if(b.X==undefined){continue}
								//b.name not b.key
								var bts = all.create_bt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true,b.persist);
								bts.bt.reff=b;
								////add coordinates and text boolean
								all.anim_a.push(bts.bt, bts.txt);
							}//inner tch list loop
							
							all.bt_alr = true;
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
							if(all.bt_alr==true){var clear_bt = true;}else{
								var lbt = co.img_ks.length;
								while(lbt--){
									var b = co.img_ks[lbt];
									if(b.X==undefined){continue}//no coordinates
									var bts = all.create_bt(ctx0, b.name,b.com1, b.com2,
									b.X, b.Y, true, b.persist ); //this works..
									bts.bt.reff=b;
									all.anim_a.push(bts.bt, bts.txt);
								}//inner tch list loop
								all.bt_alr = true;
	
							}//button call	
						}//swiped

					}//end
//other gestures..
					
				}//img

				if(co.edit_txt_mode==true){
					if(t0.gesEND){
						if(all.bt_alr==true){var clear_bt = true;}else{
							var lbt = co.txt_ks.length;
							while(lbt--){
								var b = co.txt_ks[lbt];
								if(b.X==undefined){continue}//no coordinates
								var bts = all.create_bt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true, b.persist ); //this works..
								bts.bt.reff=b;
	//unshift seem to give drawing priority but ctx still messes up with text
								all.anim_a.push(bts.bt, bts.txt);
							}//inner tch list loop
							all.bt_alr = true;
						}//button call
					}//end
				}//txt

				if(co.edit_circle_mode==true){
					if(t0.gesEND){
					//call buttons
						if(all.bt_alr==true){var clear_bt = true;}else{
							var lbt = co.circle_ks.length;
							while(lbt--){
								var b = co.circle_ks[lbt];
								if(b.X==undefined){continue}//no coordinates
								var bts = all.create_bt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true, b.persist ); //this works..
								bts.bt.reff=b;
								all.anim_a.push(bts.bt, bts.txt);
							}//circle tch list loop
							all.bt_alr = true;
						}//button call
					}//end
				}//circle mode
			
				if(co.edit_rect_mode==true){
					if(t0.gesEND){
					//call buttons
						if(all.bt_alr==true){var clear_bt = true;}else{
							var lbt = co.rect_ks.length;
							while(lbt--){
								var b = co.rect_ks[lbt];
								if(b.X==undefined){continue}//no coordinates
								var bts = all.create_bt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true, b.persist ); //this works..
								bts.bt.reff=b;
								all.anim_a.push(bts.bt, bts.txt);
							}//rect tch list loop
							all.bt_alr = true;
						}//button call					
					}//end
					
				}//rect mode
			
				if(co.edit_osc_mode==true){
					if(t0.gesEND){
					//call buttons
						if(all.bt_alr==true){var clear_bt = true;}else{
							var lbt = co.osc_ks.length;
							while(lbt--){
								var b = co.osc_ks[lbt];
								if(b.X==undefined){continue}//no coordinates
								var bts = all.create_bt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true, b.persist ); //this works..
								bts.bt.reff=b;
								all.anim_a.push(bts.bt, bts.txt);
							}//circle tch list loop
							all.bt_alr = true;
						}//buttons call
					}//end
					
				}//osc mode
			
				if(co.edit_audio_mode==true){
					if(t0.gesEND){
					//call buttons
						if(all.bt_alr==true){var clear_bt = true;}else{
							var lbt = co.audio_ks.length;
							while(lbt--){
								var b = co.audio_ks[lbt];
								if(b.X==undefined){continue}//no coordinates
								var bts = all.create_bt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true, b.persist ); //this works..
								bts.bt.reff=b;
								all.anim_a.push(bts.bt, bts.txt);
							}//audio tch list loop
							all.bt_alr = true;
						}//button call					
					}//end
					
				}//audio mode
			
				if(co.vox_mode==true){
					if(t0.gesEND){
					//call buttons
						if(all.bt_alr==true){var clear_bt = true;}else{
							var lbt = co.vox_ks.length;
							while(lbt--){
								var b = co.vox_ks[lbt];
								if(b.X==undefined){continue}//no coordinates
								if(b.asigned_osc!=undefined){continue}//special k button
								var bts = all.create_bt(ctx0, b.name,b.com1, b.com2,
								b.X, b.Y, true, b.persist ); //this works..
								bts.bt.reff=b;
								all.anim_a.push(bts.bt, bts.txt);
							}//vox tch list loop
							all.bt_alr = true;
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
				var bt = all.create_bt(
					ctx0, '...','.orb.'+t0.name.substr(7)+'.control',
					undefined, t0.tx, t0.ty, true,'desist'
				);
				all.anim_a.push(bt.bt, bt.txt);
	
				t0.tchev=false; t0.ges=[]; 
				t0.gesEND = false; t0.gesPRESS = 0; t0.gesID = undefined;
				
				all.bt_alr = true;
	
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
		
		all.bt_alr = false;
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


//___________________________________________________________________________________


//STANCE UPDATES
//here goes all reactions to commands while user(or any other entity?) is inside any stance. These need to run before animf.
//!!!!!!!!!!!!
//i think c_com doesnt need to be separated from input evaluation.........
all.stance_up = function(){
	var st = stance;
	if(st.form=='Void'||st.form=='Husk'){
//if all.c_input is not empty. Input listenning.
//When we type on void, default behavior is creating a txt orb to hold the input... so what if another txt orb is listenning already..?
//.. stilll needs  a bit of thinking. How should txt orbs react to inputs and outputs... maybe default behavior should be stream mode..
//.. yeah that would make sense. Dont just go into edit mode. Orb needs stream mode and edit mode.. and maybe no reacting mode..?

//When we call .edit command, we show all lines , and we also create a new stream to print edit commands output only by default
//Screen centers on selected line when on edit mode mode:'edit' /'stream'
//we need to select the stream to start typing into it so it picks up entity input.
//We also need to select the stream for it to print commands output? no, output packets can select where to go
//output packets should be different than input packets... yes they are different. We want input to be simple human lines
//output packets are a thing
//output packets include instructions on which line to go to, and which stream to go to as well.
//we can use these mchanics for edit feedback but they can be explored even further with scripts
//like this ; {txt'some data', target:stream id , line:target line}
		if(all.c_input!=''){
//so we put input in the first line of a nameless txt orb. we change stance to the new orb. orb is in stream mode listenning
//for entities input. make stream mode default behavior
//default behavior is displaying 10 lines, storing all messages, and listen to input.

			var id = Date.now();//just use id to locate its prim
			var tO = all.txtOrb();
			if(st.form=='Husk'){
//we need the Husk to keep track of memories contained. .. we can use tab to move between memories contained on a Husk, or a Fire
				//st.residents.push({id:tO.id, x: ,y:});
				tO.husk=st.id; //tO.hx = st.x; tO.hy = st.y;
			}
			tO.id=id;
			tO.mode='stream'; //should be stream but lets work with edit for now i am burnt
			tO.selL=1;
			//prim and animation base points? yes this is convenient
			//we should try keeping a refference here directly to the prim huh
			//we definitely dont want to have to chance both x and y values twice everytime we move the memory position
			//
			tO.primX =-U.x+window.innerWidth/2 ; tO.primY = -U.y+window.innerHeight/2;
			//tO.animX =-U.x+150 ; tO.animY =-U.y+150;
			tO.limitL=5;
			tO.lines=[
				{txt:all.c_input, cus:[[220,'r',220,'g',220,'b',1,'a']]}//we need entity cus here too !!!!!!!!!!
			];
			stance = tO;
			all.orbs.push(tO);

			var prim = all.circle_s_new(id+'___orb');
			prim.x= tO.primX; prim.y= tO.primY;
			prim.inside='empty';
			prim.radius=20;
			prim.display='custom';//for now
			prim.custom_a=[[0.4,'a'],0,0,0,0,[0.2,'a'],0,0];//for now
			prim.is='c_circle';
			all.anim_a.push(prim);

			all.printo(tO,'stream');
			//var command = {is_a:'c', str:'.txt:all.c_input'}; all.com_a.push(command);
			all.c_input='';
			return
		}
	}//Void
//TXT?
//while on edit text mode, we can .name:new name to name the memory.... not sure what goes here. all.c_com handles commands..
//..thinking about making memories just run by default.
//we use .displace to move the memory orb. The x and y locations of the memory frames and lines use other commands.
//txt orb memories will react to entities commands inputs and outputs differently when they are being stanciated? yeah probly
//orbs will react to edit commands and generate edit feedback.. however maybe we can do that from all.c_com.. !!!!!!
//when not stanciated, txt orbs will react only when they are
//configured to react to signals in their proximity
//... wait we do need to listen to  all.c_input here and create new lines.. input is not a command!! but we should process
//commands and input in the same function.!!!??
	if(st.form=='Text'){ //text Orb?
//TXT EDIT MODE
		if(st.mode=='edit'){
//a new input should send a packet to let stream out update feedback on edit mode
				//
//printo simply uses spacer and primXY to locate text where it should be.
//lines could take align on custom_a tho, yeah that might be handy

/*//reference
			if(all.c_input!=''){
				if(st.insOp=='new line'){
					var place = st.selL-1;
					st.lines.splice(
						place,0,
						{txt:all.c_input, cus:[[220,'r',220,'g',220,'b',1,'a']]} //let lines be simpler bro
					);
					all.printo(st,'edit');
					//var op = {msg:'txt edit new line', x:st.primX ,y:st.primY}; all.c_out.push(op);

				}

				if(st.insOp=='modify'){
					var place = st.selL-1;
					st.lines[place].txt=all.c_input;
					//st.lines.splice(
					//	place,1,{txt:all.c_input, cus:[[1,'a'],0]} //let lines be simpler bro
					//);				
					st.insOp='new line';
					all.printo(st,'edit');
					//var op = {msg:'txt edit modify line', x:st.primX ,y:st.primY}; all.c_out.push(op);
				}
			}//input
			all.c_input='';//normalize input

*/

//output packets observation !!!!
//orbs on edit mode do all these feedback updates right here
//feedback output feed.. ok i was thinking , any event can create an outout packet so maybe states on animf can also
//send data like current fram or beat t... that would make a lot of sense...!!!!! instead of having to access a state everytime.?
//might be interesting for animation synch on scripts.. YES ME FROM THE PAST, THIS IS A BANGER OF AN IDEA. AM ACTUALLY DOING IT NOW
//IN THE FUTURE
//

/*
//This was also a pretty idea. its a little asci ting
//we need to see changes of beat selected and an animation to illustrate beats in time |start| 00000100007 |end|
			var c_b = st.selB; //current beat
			//we need to access the line state not the line in memory... maybe we can avoid these all.find loops
			var line = Fting(all.anim_a, 'id', st.id+'_line'+st.selL);
			if(line){
				//create a little asci animation to depict current beat position at any time . beatit
				var blen = line.custom_a.length;
				b_n_a = [];
				var c_t = line.t;
				while(blen--){
					var B = 0;
					if(blen==c_b){var B = 1;}
					if(blen==c_t){var B = 7;}
					b_n_a.push(B);
				}
				var beatit = b_n_a.join('');

				var be = Fting(all.anim_a, 'id', st.id+'_lineBEATS');
				if(be){
					be.txt=beatit;
					be.is='c_txt';
				}else{
					//the beatit asci tingy
					var be = all.txtLine();
					be.id=st.id+'_lineBEATS';
					be.align='center';//should react to line align
					be.layer=st.layer; 
					be.txt=beatit;
					be.custom_a=[[1,'a'],0]; be.r=23; be.g=200; be.b=23;
					be.x=st.primX; be.y=line.y-150;
					be.is='c_txt';
					all.anim_a.push(be);
				}
			}else{
		//if no line in here, then we could create a place holder like; 'new line..' blinking. in here? !!!!!!!!!!
				//remove beatit
				var be = Fting(all.anim_a, 'name', st.id+'___beats');
				if(be){be.is='rm';}
			}// if line

*/


		}//edit mode

//TXT STREAM MODE
		if(st.mode=='stream'){
//stream mode makes the orb listen to input when is selected by an entity, the new line goes at the end
//also, stream always shows the last limit lines but the user screen doesnt move.
//if a txt stream is stanciated, screen should lock into txt stream prim center..?
//we dont want to create output packets when stance is in this mode
			if(all.c_input!=''){
				st.lines.push(
					//we could use cus from entity here..
					{txt:all.c_input, cus:[[220,'r',220,'g',220,'b',1,'a']]} //let lines be simpler bro
				);
				all.printo(st,'stream');
			}//input

			all.c_input='';//normalize input
				
		}//stream in
		//}//input processing

		//all.c_input='';//normalize input

	}//Text


//FIRE
	if(st.form=='Fire'){
//!!!!!!!!!!!!!!!!!!1
//We should also be able to create memory txt orbs while traveling in a wave!!! Actually waves should be grabing all memories
//found in its surge and drag them in the wave rim along with the entity. memories with sound should travel along the wave
//so entities can hear them faintly if on the other side of the circunference
//we know the angle of entity point from the center point. when we find a memory, we trace a line from, entity to memory.
//we then only need to close the triangle to see the angle line...
		//
//another angle...
//when we find a memory point , we can just trace a line to center ,so this line and the line from the center to the entity
//form an angle, this is the angle we need?
//PHANTHASM A way to misinterpret the world by proyecting our feelings on to it
//A Husk can Acomodate memories as it seems fit. But any entity can do so. In order to create harmonic animations we must all agree
//on where do animations go, or we just manage to have the Husk for one entity to decide everything.
//!!!!!!!!!!!!!!!!!
//We will only be able to cast 1 Firewave at a time. Firewaves are pretty much entities movility
//mechanics, Firewaves dont need to ask for other Firewaves to add up and increase intensity, that just happens when the entity
//casts a Firewave over a previous Firewave.
	//Lets increase radius at the beggining. See how it goes.
		var add = Math.round(st.intensity/10);
		st.radius=(st.radius+1)+add;//s.intensity//2;

//ok so given a radius, an angle and a centerX and a centerY, we can calculate xy of a point in the circle rim
//works perfectly. Now we need to control the angle with Arrows and use this point to calculate user position on every beat.
		///*bu
		var angle = U.rangle;
		var ridex = st.radius * Math.cos(angle)+st.x;
		var ridey = st.radius * Math.sin(angle)+st.y;
		ctx0.translate((-U.x),(-U.y));//this should put user on 0
		var rpx = Math.round(-ridex+(window.innerWidth/2)); var rpy = Math.round(-ridey+(window.innerHeight/2));
		ctx0.translate(rpx,rpy);
		U.x=rpx; U.y=rpy;
		//
		pupil.x=-U.x+window.innerWidth/2; pupil.y=-U.y+window.innerHeight/2;
		//console.log('Ux:'+(-U.x+window.innerWidth/2)+'  Uy:'+(-U.y+window.innerHeight/2));

		//we could ask ispointinpath to the wave and just use memories in proximity....
//i think it makes sense to make prims fields maybe able to scan . so a txt memory can have a third mode, edit, stream, scan
//scan would simply ask for data packets in area on demand maybe? or at every hearbeat. memories in proximity can talk to each other.
//So a scan mode will listen to data packets inside its husk field or inside its fire line. we could simply access data scanned and
//put it into .lines or pass it on into another stance in the husk?
/*
			var pl = p.data.length;
			if(pl>0){
				//console.log(p.data);
//ok we want to work with this data.. maybe we should be able to select a filter from the listenning orb instead of
//the output packet itself... or maybe the packet could sugest what to do with it but let orb decide what to do anyway
//maybe run a loop to annalyze every data packet found first
				while(pl--){
					var pd = p.data[pl];
//so data packets need msg , cus , line , origin...its interesting because we can ask for anything. .
//do whatever we want with these data packets
//So maybe packets here could have a tag to let output orb know what to do with it
//on new line selected, we need the line and the id to find it on anim_a and create a txt state to illustrate  a line number nextotheline
					//if(pd.)
					//lets just console log to see if its working. its good
					console.log(pd.msg);

				}//p loop

				p.data = []; //am flushing out prim here...
			}
*/
		//again. how to ask just memories near and not all memories in the black sea...!!
//.. so maybe not all memories need to announce their prescence... 
		//so given a point xy, and a center xy, how can we calculate the angle? we can calculat the distance from center to
		//point xy too.. .. i feel like cheating. lets find another way.
//When Fire encounters a memory, we mark its point. we then just try all angles until we match the point.
/*
		var isang = U.rangle;
		while(true){
			isang=isang+0.1;
			var isx = st.radius * Math.cos(isang)+st.x;
			var isy = st.radius * Math.sin(isang)+st.y;
			var dist = all.get_dist(memx,isx,memy,isy);
			if(dist<5){
				//asign this angle to the memory and break
				memang = isang;
				break
			}else{
				if(isang>6.2){isang=0;}
			}
		}
*/
		
		if(st.radius>=st.maxrad){
			st.is='rm'; st.form='formless7'; st.display=false; 
			stance = {form:'Void'}
		}

		return
	}//Fire

//Husk
	if(st.form=='Husk'){
//Entities can displace themselves and other memories freely using the arrow keys.

	}



}//stance updates


//check for all structures that are not stanciated but are performing an activity
all.nostance_up = function(){
//we probably need to loop all.orbs... husks... Firewaves from other entities if any... Vessels.. we probably need to loop everything
//and just ask if its stanciated here as well. and run stance_up here instead of having a separated function.
	var ol = all.orbs.length;
	while(ol--){
		var o = all.orbs[ol];
//so orbs will listen to outputs in the area. they need a field to listen. maybe we can simply use the prim size. make it a little
//bigger for them
//maybe output could sometimes select a line to be printed, or not, for efficiency, just push into a listenning orb
//ouput data may be a big deal for automated vessel reactions. scripts will probly take full advantage.. 
//stream mode makes the orb listen to output data. the new outputline goes where the ouputs requests
//..so actually stream out mode should not listen to input, only commands outputs.. and scripts probly
//how to listen. output may have a point coordinate and so, all we do is ask if point is in path?... this works just fine
//!!!!!!!!!!!!! now am thinking maybe .scan could produce a txt memory that only listen for output packets in its radius and
//so by default , it prints out in stream fashion? not even that. the data could be redirected using scripts...... yeah that sounds good
//these scan orbs should be fully equiped to take the data and print it anywhere in the screen or just keep the data and store it
//somewhere else even. This needs to be a very versatile process. Maybe beatit could be functionally extracted to be used to visualize
//other data
		//not sure if this one needs to be an orb..
		if(o.mode=='edit txt feed'){ //edit feed... lets have edit feed mode and maybe other modes to work with scripts
//so stream out mode might just need a submode to understand that it is working as an edit feedback for text. lets just do that
//for now , edit feed
//we want to access the selected line on every beat and create beatit........... omg i just realized something
//maybe edit txt feed is a job the memory could perfectly do on itself, no need to create outputs and another whole orb to
//do all this.... yeah this is good for scripts but makes no sense to do on edit mode. lets just make editor orb create all
//txt states and all to create and control to depict user feedback

			//so this orb needs to ask its prim..
			//maybe i can just let the prim refference live in o
			var p = Fting(all.anim_a, 'name', o.id+'___orb');
			var pl = p.data.length;
			if(pl>0){
				//console.log(p.data);
//ok we want to work with this data.. maybe we should be able to select a filter from the listenning orb instead of
//the output packet itself... or maybe the packet could sugest what to do with it but let orb decide what to do anyway
//if o.accept_edit_feed then use packet format? maybe this should be default and scripts only could apply different filters.
//maybe run a loop to annalyze every data packet found first
				while(pl--){
					var pd = p.data[pl];
//so data packets need msg , cus , line , origin...its interesting because we can ask for anything. .
//output feedback will need t so it can illustrate beats in time
//var op = {msg:'Line: '+st.selL, cus:[[0.8,'a'],0,0[250,'r',10,'b']], line:2}; all.c_out.push(op);?
//.. so we could use splice only when line is requested... dont request line if you want more performance
//BETTER YET, dont even use printo by default here. Just take the packet and process it in a unique way depending on the packet
//and the instructions on the script. but since we dont want to use scripts here just yet, we are going to implement instructions
//to display proper feedback using packets received from editors signals
//.. everytime the entity changes a beat, selects a new line, adds a new line with input of a new frame
//or even at every heartbeat we could update some feed animation like beatit.
//let printo be a function to work with lines. its good for edit mode and stream mode but dont rely always on it, we can
//do whatever we want with these data packets
//So maybe packets here could have a tag to let output orb know what to do with it
//on new line selected, we need the line and the id to find it on anim_a and create a txt state to illustrate  a line number nextotheline
//we also want to illustrate beatit. but we want to update beatit on everyheartbeat even when no new command or input is executed..
					//if(pd.)
					//lets just console log to see if its working. its good
					console.log(pd.msg);

				}//p loop

				//all.printo(o,'stream');
				p.data = []; //am flushing out prim here...
			}



		}//edit txt feed

	}//orbs loop

}//nostance up

//PEAK DRAW CIRCLE
const drawC = function(s){
	var c = ctx0;
	c.save();
	c.beginPath();
//also, we can do
//c.fillStyle="white"; c.strokeStyle="red"; and then we fill and stroke to get different colors inside and on stroke radius
//we can also change the c.lineWidth=some number .. so yeah this needs to go somewhere. Lines can do other things like dashing etc
	//if(s.inside=="empty"){
		c.strokeStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
		c.arc(s.x,s.y,s.radius,0,Math.PI*2,true);
		c.stroke();
	//}
	//if(s.inside=="filled"){
	//	c.fillStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
	//	c.arc(s.x,s.y,s.radius,0,Math.PI*2,true);
//ok so we can actually just ask in here. but we use an array to ask for all requested points.?
//so if this state is a txt orb prim, it could simply ask to an array holding outputs
//we could just push all outputs into an array and flush it at the end of the heartbeat
	//	if(s.mode=='scan'){
	//		var lso = all.c_out.length;
	//		while(lso--){
	//			let point = all.c_out[lso];
	//			let inArea = c.isPointInPath(point.x,point.y);
	//			if(inArea){s.data.push(point);}
	//		}
	//	}
	//	c.fill();
	//}
	c.restore();
}


///////////////////////////////////////////////////PEAK
//PEAK UPDATE
//so comA and animF are now more independant.
function update(){ //PEAK
//PEAK
//CLEAR FIRST
	if(kaoz){}else{ //A special condition that prevents all clears and unlocks Artistic potential
	//one clear. always clear the part of the canvas the user is looking
		ctx0.clearRect((eX-window.innerWidth/2),(eY-window.innerHeight/2),window.innerWidth, window.innerHeight);
	}
	if(zai){//Slowly paint everything black
		//we need to update Elid now
//update Elid graphics
		//beatUp(Elid);
		//Elid.B++;
		//if(Elid.B==Elid.beats.length){Elid.B=0;}

		if(Elid.layer==0){visual_q0.push(Elid.state);}
		if(Elid.layer==1){visual_q1.push(Elid.state);}
		if(Elid.layer==2){visual_q2.push(Elid.state);}
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



//update MSp circle graphics Memory Space
	beatUp(MSp.beats,MSp.B,MSp.state);
	//So we need to check what happening with MSp.B, beatUp should not even increase MSp even. we need to do this now after
	//beatUp. This way we have more control even. a function should do a specific thing only lol
	MSp.B++;
	if(MSp.B>=MSp.beats.length+1){MSp.B=1;}
	//console.log(MSp.B);
//we could probably use a switch here on layer system
	if(MSp.layer==0){visual_q0.push(MSp.state);} //[B]?
	if(MSp.layer==1){visual_q1.push(MSp.state);}
	if(MSp.layer==2){visual_q2.push(MSp.state);}

//update Ecen entity center cursor
	beatUp(Ecen.beats,Ecen.B,Ecen.state);
	//So we need to check what happening with MSp.B, beatUp should not even increase MSp even. we need to do this now after
	//beatUp. This way we have more control even. a function should do a specific thing only lol
	Ecen.B++;
	if(Ecen.B>=Ecen.beats.length+1){Ecen.B=1;}
	//console.log(MSp.B);
	if(Ecen.layer==0){visual_q0.push(Ecen.state);} //[B]?
	if(Ecen.layer==1){visual_q1.push(Ecen.state);}
	if(Ecen.layer==2){visual_q2.push(Ecen.state);}


//entry, comA . and we can clean entry
//input , input goes into Eins . so we run animL. dont clean yet
//and output , we dont want to clean it. output goes into Eouts
		//
//then orb graph, 
//entry,
//in,
//out

	if(all.sstr == ' '){}else{all.keys_feed();} //needs to be independant from anim_f
	//these functions are more related to hardware
	repeatSys(); //this ok?

//OK SO Entry is an input from box that is a command. Ein is an input from box that is normal text. orb
//Eout is a returned value from Entry?
	//
//Entry
	if(Entry==undefined){}else{//run entity command
		var csplit = Entry.split(','); //comands split
		for (var i = 0; i <= csplit.length-1; i++) {
			var end = comA(stancE,csplit[i]);
			if(end==undefined){}else{break}
			if(i>=1){break}
		}
	}


//ORBS LOOP , ENTRY, ASPECTS
//We expect orbs and single orbs instructions at the end.. we need a for loop here then because we want to push ins and outs
//solo instructions to be read and flush at the end
	var flush=0; //a counter to flush signals at the end
	//
	for (var i = 0; i <= Orbs.length; i++) {

		var o = Orbs[i];
		if(o==undefined){break} //safe

//OSCILATOR ASPECT
		if(o.oscillator){
			if(o.oscR=='off'){} 
			if(o.oscR=='once'){ 
			//so do all this with every line at once.. ok lets run a test
				for (var i = 0; i <= o.oscTL.length-1; i++) {
					var TL = o.oscTL[i];
					//create state
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
				o.imgS.px=o.x; o.imgS.py=o.y;
				o.imgB++;
				if(o.imgB>o.imgF.length){o.imgB=1;}
				if(o.imgL==0){visual_q0.push(o.imgS);} //[B]?
				if(o.imgL==1){visual_q1.push(o.imgS);}
				if(o.imgL==2){visual_q2.push(o.imgS);}
			}
		}

//CIRCLE ASPECT
		if(o.circle){
			if(o.cirR=='off'){} 
			if(o.cirR=='loop'){ 
				beatUp(o.cirF,o.cirB,o.cirS); // o,o
				//We need to synch circle with orb position... . .
				o.cirS.x=o.x; o.cirS.y=o.y;
				o.cirB++;
				if(o.cirB>o.cirF.length){o.cirB=1;}
				if(o.cirL==0){visual_q0.push(o.cirS);} //[B]?
				if(o.cirL==1){visual_q1.push(o.cirS);}
				if(o.cirL==2){visual_q2.push(o.cirS);}
			}

		}

//RECTANGLE ASPECT
		if(o.rectangle){
			if(o.rectR=='off'){} 
			if(o.rectR=='loop'){ 
				beatUp(o.rectF,o.rectB,o.rectS); // o,o
				//We need to synch circle with orb position... . .
				o.rectS.x=o.x; o.rectS.y=o.y;
				o.rectB++;
				if(o.rectB>o.rectF.length){o.rectB=1;}
				if(o.rectL==0){visual_q0.push(o.rectS);} //[B]?
				if(o.rectL==1){visual_q1.push(o.rectS);}
				if(o.rectL==2){visual_q2.push(o.rectS);}
			}

		}

//SCRIPT ASPECT
//so now we want to be able to cast more than a single command per beat. Command lines will now be separated by commas,
//for now max number of commands on the same line is 2 we just call comA on every comma split.. simple huh
		if(o.script){
//if comA has /orb/in or /orb/out
//push the instruction to read input and process it at the end of Orbs. Create a self removing 'orb' that flushes itself from Orbs
//on loop end
			//o.c also needs checking probably
		//entry
		//PEAK before even asking for the lines, we should simply ask for o.run. if off, dont even loop the lines.
//These need testing..
	//!!!!!!!
	//we could reestructure this. if off, continue. also, once loop and repeat differenciate only at the end so most of
	//the code can be written once. just ask at the end what to do acording to scR value
			if(o.scR=='off'){}
			//if(o.run=='off'){}
			if(o.scR=='once'){ //run until o.L reaches end and then reinit and set run to 'off'
				var RL = o.scC[o.scB-1];//item 0 is line 1. we want to use B to understand we are accessing line 1
//but now lines have many commands separated by comma, so we might want to just separate them right here and
//run comA on each one of them. Maybe we could just set an arbitrary limit for now. yes 2.
//if RL == a number, we might just substract 1 from the number and scB-- to read again until number is = 0.
//So now we have a sleep command. Who doesnt love sleep
	//so we have to check all inputs on scripts everytime if we only have numbers, we need to parseFloat them....
//also counters are going to zero... not sure if we want that lol . To avoid that situation, just keep track of a counter created
//next to the number. So the sinthax to sleep commands is as follow.
//234,234   The second number is the current counter  and the first number is the refference. Its the total time to sleep,
//i do like this concept. Maybe we can implement it with some adjustments. This is important. We want to control beat times
//to synch with other orbs. Maybe we can just build a command straight up... not just keep working on what you had !!
//When we find a number instead of a line, we create a copy of that number right beside and substract 1 per beat. When this
//number reaches zero, we continue executing the lines. its very simple really. its not. lets just kick this one forward
//given all the tools for scriptting this really seem necesary for now.
		/*
	//we cant to 123,123 , because it becomes a string.. we want 2 numbers. . let the system create and handle the second number
//ok we want this to be easy and eficient and not messy. .

				if(RL.length==undefined){
					RL--;
					if(RL<=0){o.scB++; continue}else{continue}
				}
		*/
				var csplit = RL.split(','); //comands split
				for (var i = 0; i <= csplit.length-1; i++) {

					var end = comA(o.name,csplit[i]);
					if(end==undefined){}else{break}
					if(i>=1){break}
				}
				o.scB++;
				if(o.scB>o.scC.length){o.scB = 1; o.scR='off';}//o.script.length is always 1 more than last item index..?

			}
			if(o.scR=='loop'){ //run until o.L reaches end and then reinit and set run to 'off'
				var RL = o.scC[o.scB-1];//item 0 is line 1. we want to use B to understand we are accessing line 1
			//script has text lines now, we dont need a text line structure anymore
				var csplit = RL.split(','); //comands split
				for (var i = 0; i <= csplit.length-1; i++) {
					var end = comA(o.name,csplit[i]);
					if(end==undefined){}else{break}
					if(i>=1){break}
				}
				o.scB++;
				if(o.scB>o.scC.length){o.scB = 1;} //o.scR='off';}

			}
			if(o.scR=='repeat'){ //run until o.L reaches end and then reinit and set run to 'off'
				var RL = o.scC[o.scB-1];//item 0 is line 1. we want to use B to understand we are accessing line 1
				var csplit = RL.split(','); //comands split
				for (var i = 0; i <= csplit.length-1; i++) {
					var end = comA(o.name,csplit[i]);
					if(end==undefined){}else{break}
					if(i>=1){break}
				}
			}
	//so in here, we ask if this is an in or out related instruction. These are always located at the end of Orbs. And we want to
	//remove them after executed. Orbs and Entities create these. We want to run signals after all orbs have been updated so we dont
	//miss a signal.
			if(o.scR=='signal'){ //btw we should not be able to toggle 'signal' on orb/run obviously
	//SO whenever we create an input or output signal, we push a self removing instruction into Orbs itself.
	//This line will have a target to process it. also it will self remove. no need to push around whole orbs,
	//just push whole command
	//IF any entry creates an input or output listener , create a self removing instruction and push it
	//into Orbs.
	//IF the entity or any orb creates an input or output signal, just push it into inout array were o.run signals will ask for what they
	//are looking for
				var RL = o.com;//o.com? yes because its a signal
				var csplit = RL.split(','); //comands split
				for (var i = 0; i <= csplit.length-1; i++) {
					var end = comA(o.name,csplit[i]);
					if(end==undefined){}else{break}
					if(i>=1){break}
				}
	//PEAK

	//SO the function to call on run signal uses these properties to place the in or out signal where it wants to go because by this point
	//we have all inputs and outputs created
	//in:['~', 'an input from entity', 'orb1', 'an input from orb1'];
	//listeners just check this array last and once everyone checked it,
	//we flush it. Yes this makes sense. how about outputs. same probably. but outputs may have multilines so they are arrays
	//out:['~',[],[]]
				flush++;
				continue //we dont want to 
			}//signal

		}//script aspect

//TEXT ASPECT
		
		if(o.text){
//!!!!!!!!!!!!!!
//so now what we could do... is to make a specific parameter on text aspect to listen to specified entities or orbs
//..... you know maybe orbs should only be able to listen to 1 entity input at a  time. Ive never really liked these crazy streams
//with all ppl talking at the same time. words ppl say going fast to nowhere. ok we are not doing that here, enough already.
//.. so Elis Entity listen has the name of an entity whose input is going to listen
//.. not a fan of this. need a new idea
//what if we just run a command. '~/inline>>'+stancE+/in . So now we just check for o.i . Looks much cleaner
			if(o.iz==o.i){o.i=undefined;o.iz=Date.now();} //we good
			if(o.i!=undefined){
				
			//if(o.Elis==Ename){
			//if(o.Elis){
				//We are using Ein for now but we need to change this when more entities are around
				//if(Ein!=undefined){
				//...!!!!!!1 so maybe here we could simply say insert on seL.. so seL is like the 'current' of data
					if(o.insertop=='newline'){ //'ignore'
		// maybe we want an insertop to just push in last index, but newline should push were seL is and never erase a line
		//.. btw we need a line eraser command
						var dli = DataLine();
						dli.beats=dsignat; 
						dli.txt=o.i;//Ein;
						dli.x=o.x; dli.y=o.y;
						//.. change data for text
						//seL needs to go. its txtB
						//this operation adds a line simply on selected place
						o.txtLi.splice(o.txtB-1,0,dli);
						//we could also replace the line from here like this:
						//o.txtLi.splice(o.txtB-1,1,dli);

					}//insertop
					if(o.insertop=='ignore'){ //'ignore'

					}
				//we want to push data and also update data txt states acording to its print value
				//but we are not pushing data yet..
					if(o.print=='stream'){
						dSSpacer(o);
					}
					if(o.print=='static'){
						dESpacer(o);
					}
				//}//Ein!=undefined;
//.. ok so undefining here might be a problem later... but for now.. yeah this feels beter already. we can just stancE an orb
//and the input is procesed by that orb. We can stancE on entity, and we jsut produce a signal anyone can read... but we have the
//orb/in reading problem back again. other orbs listenning to this o.i might miss it if we clear it in here
//oh also rememeber you can clean up arrays like this array.length = 0;
				//o.i=undefined;
				//we could just do something like..  and hope for the best.. we should check how orb/in and orb/out
				//work now... but yeah this iz thing secures clearing o.i on next heartbeat... pretty simple solution
				//... wait... maybe we can apply the same concept here...
				o.iz = o.i;
			}//Elis,, o.i

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
					//if(OL.layer==0){visual_q0.push(OL.state);}
					if(o.txtL==0){visual_q0.push(OL.state);}
					if(o.txtL==1){visual_q1.push(OL.state);}
					if(o.txtL==2){visual_q2.push(OL.state);}
				}
			}
		}//text


		//orb output test.. ok we good
		//if(o.o!=undefined){
		//	console.log(o.o);
		//	o.o=undefined;
		//}

	}//orb loop

//SO after orb loop, we  Orbs.splice(flush);  to remove all run signals. flush is the index we clear from
	if(flush>0){Orbs.splice(flush);}
	
//AND also we need to clear inout array instead of these Ein and Eout... ok we goose? no. we not goose. we want Ein and Eout
//these In and Out are kinda lost in the sauce..
	//In:undefined;
	//Out:[];
	//
	

	Entry=undefined; Ein=undefined; Eout=undefined;


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
all.sunya_init = function(device, tutorial){//tutorial no need to go here
	//keyboard
	if(device=="keyboard"){
/*
		all.stream_a.push(
			//'Greetings and salutations keyboard user. Welcome to this system. You have been expected!',
			//' ',
			//'This program is a realized dream.',// You could tell that already because Its hard to figure out',
			//'...what is this all about? there are no instructions here! .. there are no menu buttons there are no',
			//'Corporate Logos doing the fancy intro...there is just this!? SERIOUSLY??',
			//'.. This is not an atempt to grab your atention and squeze it like a lemon...',
			//' ...',
			//'But i digress. ',
			//'*awkward crickets in the distance ',
			//' ',
			'*ominous crickets--',
			'Press the ESC button on your keyboard to. . . . . print some really useful information at any moment!',
			'Arrow Keys on your keyboard can handle your stream! Yes , THIS stream of words you are reading right now!',
			//'You know what is it for right? To read it! Of course! Yes!
			'Do you like to read? ',
			'... Of course not! Nobody like to read! Hahaha!',
			'Anyways. ',
*/
/*
			'Up and Down Arrows let you detach and scroll trough stream history.',
			'Left Arrow turns OFF stream visibility.',
			'Right Arrow turns back ON and re-atach. Pretty nice and fast.',
			'Try it out! Try it out!',
			'... ... d- ... did you--... ok so',
			'this stream can always be re-atached to follow the last input by pressing the Right Arrow.',
			'Got it?',
			'Press ENTER now and type in all highlighted words you see to impress me with your speed.',
			'Here is a way forward for you my friend',
			'Just type in this word down bellow or press the ESC key to... you know, find out about this system ideas a bit more.',
			'Your move.',
			{msg:'tutorial',cus:[0,0,0,[0.2,'a'],0,0,0,0,[1,'a','..1-220','b']]},
			'..',
			'Ou i forgot to remind you about re-ataching your stream to follow the last input. Its the Right Arrow.',
			'.. it ocurred me that you might have just missed that. I could be wrong of course. Am always wrong..',
			'Have a Blast..! I-i mean.. Have a goood wave mate! heh..eeh.. Au revoi--entry incomplete--kzziSYSTEM DAMAGED PLEASE PROCEED TO EVACUATE FATAL ERROR FATAL ERROR '

		); all.screen_log();
*/
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

//eye lids and pupil to animate transitions and other stuff
	//pupil=all.circle_s_new('eye___pupil'); pupil.se='reset';
	//pupil.radius=1; pupil.x=eX+window.innerWidth/2; pupil.y=eY+window.innerHeight/2;
	//pupil.is='c_circle'; pupil.display='custom';
	//pupil.custom_a=[0];
	//pupil.id='0';


	//elid2=all.rect_s_new('eye___lid2'); elid2.se='reset';
//all.fadeall = function(){
	//elid2.w=window.innerWidth; elid2.h=window.innerHeight;
	//elid2.r=1;elid2.g=1;elid2.b=1; elid2.a=0.2; elid2.inside='filled';
	//elid2.id='2';
//}

	//elid1=all.rect_s_new('eye___lid1'); elid1.se='reset';
	//elid1.id='1';
		
	//ctx0.clearRect((-U.x),(-U.y),window.innerWidth, window.innerHeight);
	
//keys feedback text state. for keyboards users..
	//kfeed=all.txt_s_new('k___feed');
	//needs custom to create key vibes
	//kfeed.x=eX+window.innerWidth/2; kfeed.y=eY+window.innerHeight/2; kfeed.font="30px Courier New"; kfeed.align='center';
	//kfeed.r=220; kfeed.g=220; kfeed.b=220; kfeed.a=0.8; kfeed.display='normal';
	//kfeed.id='3';

	//all.anim_a.push(pupil, elid2, elid1);//,kfeed);

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
	clearInterval(all.heartbeat); 
	all.heartbeat =	setInterval(update,60); //100 //70

}//sunya_init SUNYA INIT



//PRERENDERING
//A pre renderind update function to wait for user to type enter or touch screen. i dont want a condition here.
all.pre_rendering = function(){
	//after user has revealed input method, ask if sunya should send an assistant or not
	//and only then run sunya . . 

	if(all.keyboard_enabled){all.sunya_init("keyboard",true);}
	if(all.touch_enabled){all.sunya_init("touch",true);}
	
	//all.anim_func();
	//requestAnimationFrame(all.pre_rendering);

}//pre rendering



all.heartbeat = setInterval(all.pre_rendering,60);
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
*/




