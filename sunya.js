//staring at my dream. a reflection on the water. a dream i forged. i give shape to my hope in this fountain.
//a forge of light. 

////SUNYA////



var all = {};//this will go soon. keeping it for phone things refference

//PEAK GLOBALS
//Sunya Globals
var kaoz = false;//false;//undefined; //where is zai? :(
//var zai = 0.5;//false;//undefined; //deprecat..
var keyboardEnabled = undefined;
//time update tracker
//var tut = undefined;

var actx = undefined; //audio context
const oscCue = [];

var transLate = [];

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
//var Drag = [];
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
var dsignat = //[ //data signature							// /dsignat
			//["r",230,"g",230,"b",230], //white
			["r",176,"g",215,"b",235]; //celeste
			//["r",91,"g",157,"b",237] //azure
			//["r",0,"g",4,"b",233], //blue
			//["r",97,"g",28,"b",188], //purple blue
			//["r",138,"g",12,"b",152], //purple
			//["r",0,"g",0,"b",0], //black
			//["r",255,"g",10,"b",6], //red
			//["r",255,"g",152,"b",1], //orange
			//["r",255,"g",221,"b",38], //yellow
			//["r",163,"g",238,"b",4], //green
			//["r",127,"g",224,"b",191] //calypso

//] //customize entity data lines. its a beat container
var dfont = 'px Courier New';								// /font
var dfontSize = 18;

//ok lets define MSp. We have radius, memorycap ? size? limit? current?
var MSpX = 0;//memspace rad center							// /mspx
var MSpY = 0;										// /mspy
var MSpRad = 700;									// /msprad
/*
So i was thinking maybe instead of a random ass number why not take a measure of how much time is a heartbeat taking to finish
all work the entity and its orbs do in a single update. This time should give us an idea of how many orbs we can have doing stuff
at any moment .. yes we got it its hEat
*/
var hEat = undefined;									// /memheat
/*
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
		inside:'empty',
		layer:0
	}//a special circle state.	
}
*/

//Entity shortcuts. 
var EkeyS = [										// /keys

/*
We want a script to let us create an oscillator and link it with a circle that when is displaced, it affects a parameter.
one pixel to the right increase 1 frequency , to the left decreases 1 freq

.. a command to seal all orbs at once..
or we could just .. cast a command while on no stance orb, but instruct all orbs to cast the command on Eout as if they where casting
it on themselves. So we can now say seal>>$/text . This would seal all texts. then unseal>>$/text to bring them back.

We also want a command to just move the center screen into the selected orb when we select it.

Ok we want a single orb to follow entity and monitor: current entity position , currently selected orb, current selected line
if text aspect active, current circle form position

*/
	//{name:"create Start", key:"Home", com1:"@Start<>unseal/script>>Start"},
	//{name:"run Start", key:"End", com1:"#once>>Start/script/run"},
	//{name:"Main", key:"Main", com1:"@Main<>unseal/text/script/circle/rectangle/image/oscillator>>Main"},
	//{name:"MM", key:"MM", com1:"#Main>>~/stance"},
	//{name:"SR", key:"SR", com1:"#once>>Main/script/run"},
	//{name:"CR", key:"CR", com1:"#once>>Main/circle/run"},
	//{name:"RR", key:"RR", com1:"#once>>Main/rectangle/run"},
	//{name:"IR", key:"IR", com1:"#once>>Main/image/run"},
	//{name:"OR", key:"OR", com1:"#play>>Main/oscillator/run"},

	//{name:"MC", key:"MC", com1:"@Clear<>unseal/text/script>>Clear"},

	//{name:"ArrowLeft", key:"ArrowLeft", com1:"-100/x>>~"},
	//{name:"ArrowRight", key:"ArrowRight", com1:"+100/x>>~"},
	//{name:"ArrowUp", key:"ArrowUp", com1:"-100/y>>~"},
	//{name:"ArrowDown", key:"ArrowDown", com1:"+100/y>>~"},


	//{name:"mm", key:"mm", com1:"+/text/cn>>OrbsSel<>OrbsSel/text/current>>~/stance"},
	//{name:"zz", key:"zz", com1:"-/text/cn>>OrbsSel<>OrbsSel/text/current>>~/stance"},

	//{name:"mm", key:"mm", com1:"+>>~/stance"},
	//{name:"zz", key:"zz", com1:"->>~/stance"},

	//{name:"bb", key:"bb", com1:"-/text/cn>>$"},
	//{name:"nn", key:"nn", com1:"+/text/cn>>$"},


/*
so we can create a script that listen to the names of new orbs created and when a specific name matches it processes it in a specific
way . embed circle form to Jin when created, and call run on a script to process Jin
circleform>>Jin,#once>>JinProcess/script/run
OK we need a command to delete an orb.. am strugling with this one.. because it doesnt feel right to be able to woosh an orb like that
somehow.. 
*/
	//{name:"rml", key:"rml", com1:'rmline/text/current>>$'},
	//{name:"coml", key:"coml", com1:'$/text/current>>~/comline'},
	//{name:"inl", key:"inl", com1:'$/text/current>>~/inline'}

//!!!!!!!! interesting. Having caps keys allow the possibility to lock the key on repeat when we let go shift. To remove from key_d
//we just have to use shift to call the key again and let go while still pressing shift. 
	//{name:"G", key:"G", com1:"msgrow"},
	//{name:"H", key:"H", com1:"msshrink"}

]


//fair lines
//I know its a bit of a sudden .. But could you please do something for me real quick?
//Commands are instructions! Buttons are just calling Commands! We can asign Commands
//into any Button! We can create Buttons using Commands!
//The possibilities are Endless! Haha


//kfeed need to be an object just like MSp? maybe not. kfeed is more of hardware thingy
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
	o = {name:idn} //idname
	return o
} //OrbSoul

//We can then name this returned soul like orb structure or add aspects to be awakened by SoulSeal
//Many aspects can be awakened at once. Still working on default values here.. maybe we can just toggle with those after.
//this is functional programming beibei. declarative style peak ohio rizz beybey
//
//What if we just do the linear progression thing. Any orb can have text and script aspect, but in order to have image aspects, we need
//to previously unseal rectangle aspect, and in order to have audio aspects, we need to have circle aspect...
//Because audio will rely on circle shape to excert its effect, and images can probably work with rectangles .. becaues we kinda need
//rectangles to edit image animations.... so its bassically 3 types of orbs? text and script, rect and image, circle and audio...
//now that am thinking about it... wouldnt it be nice to just have one orb perform one specific task..? writer orb, scene orb , 
//music orb. each type of orb has 2 aspects
//... ok maybe later but for now just unlock one aspect at a time
const SoulSeal = function(o,asp){
	switch(asp){

//maybe text and script could produce a default text to be momentarily visible and then self remove... would be a neat detail
		case 'script':
			if(o.script==false){o.script=true; return}
			o.script=true;
			o.o=undefined;   //o for command out.. the current command running ?
			o.cast = false; //boolean for after loop cast
			o.scR='off'; o.scB=1; o.scC=[];
			break

		case 'text':
//ok so now am thinking maybe text aspect needs a signature to act upon all textlines by default. this signature is used
//everytime the textorb produces a line. and we can also customize this signature of course. 
			if(o.text==false){o.text=true; return}
			o.text=true;
			o.txtX=eX; o.txtY=eY;
		//..i think we need control on spacer as well.. and size
			o.spacer=15; //o.insertop='newline';
			o.i=undefined; 
			o.txtB=1;
			o.txtLi=[];
			break

		case 'circle':
			if(o.circle==false){o.circle=true; return}
			o.circle=true;
//we now want a default beat with all possible params. .maybe we can still put in dsignat for colors, but each aspect has their own
//unique parameters..!!!!
			var firstf = dsignat.slice(0);
			firstf.push('a',0.8,'cx',eX,'x',0,'cy',eY,'y',0,'radius',13,'inside','empty','layer',0);
			o.cirF = [firstf];
			o.cirB=1; o.cirR='off'; //o.cirL=1;
			o.cirS={
				r:230, g:230, b:230, a:0.8, cx:eX, cy:eY, x:0, y:0,
				radius:13, is:'circle', inside:'empty',
				layer:0
			};
			break
///*
		case 'track':
			if(o.track==false){o.track=true; return}
			o.track=true;
			var firstf = dsignat.slice(0);
			firstf.push(
				'a',0.8,//'cx',eX,'x',0,
				'cx',eX,'cy',eY,'offsx',0,'offsy',0,'tradx',100,'trady',100,//'cy',eY,'y',0,
				'offspeed',0.05,'layer',0
			);
			o.trackF = [firstf];
			o.trackB=1; o.trackR='off';
			o.trackS={
				is:'track',
				r:230, g:230, b:230, a:0.8,// cx:eX, cy:eY, x:0, y:0, 
				offspeed:0.05,
				offsx:0, offsy:0, tradx:100, trady:100,//tRad: 100,
				cx:eX, cy:eY, layer:0
			};
			break
//*/

		case 'rectangle':
			if(o.rectangle==false){o.rectangle=true; return}
			o.rectangle=true;
			//o.rectF=dsignat;
			var firstf = dsignat.slice(0);
			firstf.push('a',0.8,'cx',eX,'x',0,'cy',eY,'y',0,'w',60,'h',60,'inside','empty','layer',0);
			o.rectF = [firstf];
			o.rectB=1; o.rectR='off'; //o.rectL=1;
			o.rectS={
				r:230, g:230, b:230, a:0.8, cx:eX, x:0, cy:eY, y:0, w:60, h:60, is:'rect',
				inside:'empty',
				layer:0
			};
			break

		case 'image':
			if(o.image==false){o.image=true; return}
			o.image=true;
			o.imgfile=undefined;
//so we need the center coordinates now..
			//o.imgCX=eX;  o.imgCY=eY;
//and a default frame.... we dont need a default frame. this one is created when an image file is loaded into the orb
			o.imgF=[
				//['x',0,'y',0,'w',0,'h',0,'px',0,'py',0,'pw',0,'ph',0,'a',1,'layer',0]
			];
			o.imgB=1; o.imgR='off'; //o.imgL=0;
			o.imgS={
				img:undefined,  is:'img',
				x:0, y:0, w:0, h:0, px:0, py:0, cx:eX, cy:eY, pw:0, ph:0, a:1,
				layer:0
			};
			break

/////////WEB AUDIO
//Basic oscillator using audio web API the Audio context holds nodes. Nodes are connected to create various effects and
//filters. the source node has no input only output,the destination node has no output, only input. All nodes between these
//two act as filters and each can have multiple ins and outs
//An audio object should hold all the instructions and buffers neccesary for a
//function to create the precise Audio Node audio objects can be located on orbs , void nodes and user data
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
	//lets have a tone for refference. duration can have 'loop' but lets prevent by default that so users dont panic
	//this is ok for now its a basic tone line, but later we can try experimenting with other audio nodes
			['start',0,'duration',2,'frequency',432,'gain',0.07,'fadein',0.3,'fadeout',0.3,'type',0]
				//'start,0,duration,2,freq,439,gain,0.07,fadein,0.3,fadeout,0.3'
				//[]
			];
			//o.oscB=1; 
			o.oscR='off'; 
			o.oscPA=false;
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




//update state using tone line
const timeUp = function(osc,TL){ 
	for (var i = 0; i <= TL.length-2; i+=2) {
		var p = TL[i]; var v = TL[i+1]; var nv = v;
		if(v.length==undefined){}else{
			var dots = v.substr(0,2);
			if(dots=='..'){
				var cded = v.substr(2); var cdeda = cded.split("?");
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
	osc.oscn = actx.createOscillator();
	osc.oscn.frequency.value=os.frequency;
	osc.oscn.type=os.type;

	//gain node
	osc.oscg = actx.createGain();
	//initial value cant be 0 because this is the condition to remove the tone state..
	osc.oscg.gain.value = 0.001;

	//analyzer
	//analyzer=actx.createAnalyser();
	//analyzer.fftSize = 2 ** 13; //this is just the size of the thing
	
	//fade
	osc.fadein=os.fadein; osc.fadeout=os.fadeout; 

	//init timers
	osc.duration = os.duration;
	osc.start = actx.currentTime+os.start;

	//we can use gain node to determine duration of the audible tone too..
	//but no thanks. lets fade in always because no fade in is ugly
	osc.oscg.gain.setTargetAtTime(os.gain, osc.start, os.fadein);

	osc.oscn.connect(osc.oscg);

	//osc.oscg.connect(analyzer);

	osc.oscg.connect(actx.destination);

	//start
	osc.oscn.start(osc.start);

	if(os.duration=='loop'){}else{
		osc.end = osc.start+os.duration+os.fadeout+1; //..+1...
	}

	return osc
}

//push osc
//oscCue.push(osc);


//if ended, remove
//we place all osc states on oscCue from where we can monitor non timming crucial data about the audio playing. its name, position
//conection with other orbs etc. its the sound aspect accesible. We check for oscCue on every heartbeat to when its necesary to
//remove the audio object from memory
const hearAll = function(s,l){
//we want to check if orb still exist. if it was eliminated , then the sound should stop... it these audio objects where kept on
//the orbs themselves , then there would not be a way to stop() and disconnect() them if the orbs where deleted. so its a good thing
//i think to keep these audio states apart on oscCue.
	var o = Fting(Orbs,'name',s.origin);
	if(o){
		//if(o.oscillator==false){s.oscn.stop(); s.oscn.disconnect(); oscCue.splice(l,1);}
		var check = s.end-actx.currentTime;
		if(check<=0){
			//setTargetAtTime(target, startTime, timeConstant)
			s.oscg.gain.setTargetAtTime(0, 0, s.fadeout); s.end = undefined;
		}
		if(s.oscg.gain.value==0){
			s.oscn.stop(); s.oscn.disconnect(); oscCue.splice(l,1);
	//we also need to let the origin orb know so its oscR value updates to 'off'
			var o = Fting(Orbs,'name',s.origin);
			o.oscR='off'; o.oscPA=false;
		}

	}else{
		s.oscn.stop(); s.oscn.disconnect(); oscCue.splice(l,1);
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
			layer:1
		}
	}
	return L
}//line structure


//the idea now is that we could just create a state using
//the properties of the container and RSout beat and run it once independently from the beats of the container here.. This operation
//might be interesting to proyect mirrors of the body of the orb itself. These proyections dont need to have 'physical'  properties
//but might be useful to create complementary images to the animations in the form of visual feedback...
//ok if we do this, then we really dont care about the number after the line.... so we dont need to access beats directly like that
//we just care about the line text and layer... ok no we want a state to work on so we need to point at a beat and call mirror
//on it: orb/circle/3/mirror etc ... no i think its just orb/circle/mirror  because we are using the state, not the cricle beats
//text is different. orb/text/current/mirror
//but we can create a fully custom state from here the mirror
//so for game mechanics this mirror concept is interesting because now orbs can create visual decoys.
//we can write a function to do mirror on last, current and by number
//.... Mirror is pretty much beatUp. We probably need to fuse these together... however its not
//I think we want mirrors to work with the state parameters as refference. so when we feed r,20,g,30,x,45,y,2  we shouldnt use these
//values as is, like we do with beatUp, but we should ADD these into the target state.
//Thats the whole point of using a state to create a mirror image
//We want to reflect the Aspect from with its parameters slightly modified by the beat we feed into the mirror command!!!
//
const Mirror = function(txtb,sm){//,layer){
	var nb = txtToB(txtb);
	var BL = nb.length;
	//if(BL==0){}else{
	for (var i = 0; i <= BL-2; i+=2) { //BL-2
		var p = nb[i]; var v = nb[i+1]; var nv = v;
		if(v.length==undefined){
			//it means we are working with a number, so we simply add the feed beat to the previous value
			//sm[p] = sm[p]+v; continue
		}else{
			//a random notation system.. i like this one
			var dots = v.substr(0,2);
			if(dots=='..'){
				var cded = v.substr(2); var cdeda = cded.split("?");
				var min = parseFloat(cdeda[0]); var max = parseFloat(cdeda[1]);
				var n_rand = getRandom(min,max);
				nv = n_rand;
				//if we use random sinthax, we just use random sinthax, we dont care about previous value on state
				//sm[p] = nv; continue
			}else{
				//if we want to modify words, they are simply replaced not added
				sm[p] = nv; continue
			}
		
		//if we use a string, we should just replace the string normally, just like beatUp.. for now
		//sm[p] = v;

		}
		//sm[p] = nv;
		//ok lets try this
		sm[p] = sm[p]+nv;
	}
	return sm
}//mirror



// -- DATA CONTROL . SUNYA FUNCTIONS


//... details details. What happens when we add a key that already exists. . probably should overide it.
//also we want a ~/skeys/new  option to simply add the keys and not erase the previous ones.
const KLTObj = function(kpair){
	var kobj = {};
	for (var i = 0; i <= kpair.length-2; i+=2) {
		var p = kpair[i]; var v = kpair[i+1];
		kobj[p] = v;
	}
	//console.log(kobj);
	return kobj
}


//PEAK
//BEAT UP
//a function to update beats on any object that requires it. G is an object that has beats[], B and state{}
//remember we read beats from left to right now, just like normal ppl do.
//This function will run for form states and also for lines states? wait... lines can be beats?.. no beats are arrays..
//Lines have data, B, beats, and state . Data has txt, beats have arrays... we have to convert txt into beat array if we want
//to beat data. We also want to return lines of data formated as txt to work as beats when we ask for /orb/5/3 or /orb/4/beats
//We cant just say beats or state because orbs structure needs to have as few layers as posible. All form share the same depth
//
//OK we need to address the random thing.. what about txtToB
//We need to prevent ilegal values to reach the drawing phase because that throws an error. we dont want the program to throw
//console errors, we need to make ilegal configurations create a feedback for the user entity and just prevent the script execution
//
const beatUp = function(F,B,S){ //Frame, Beat, State
	var beat = F[B-1];
	var BL = beat.length;
	if(BL==0){}else{
		for (var i = 0; i <= BL-2; i+=2) { //BL-2
			var p = beat[i]; var v = beat[i+1]; var nv = v;
			if(v.length==undefined){}else{ //else for not a number .numbers have no length.
			//a random notation system.. i like this one
//so if we request the current beat we need to ask after changes?
				var dots = v.substr(0,2);
				if(dots=='..'){
					//we need a new symbol because '-' should be used to create negative numbers
					//..-23?-3
					var cded = v.substr(2); var cdeda = cded.split("?");
					var min = parseFloat(cdeda[0]); var max = parseFloat(cdeda[1]);
					var n_rand = getRandom(min,max);
//we want to construct this '..1-5-1' , the last number will now hold thecurrent value of the randomizer. this notation isrebuilt while
//we use the result to perform the operation. ok works perfectly
					var nn = '..'+cdeda[0]+'?'+cdeda[1]+'?'+n_rand; 
					beat[i+1] = nn;//
					nv = n_rand;
				}
			}
			S[p] = nv;
		}
	}
}//beatUp


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
//What we rly want is to reorder the data lines position using orb location. nothing more. but also..
//
//.. we need to consider spacer when we change text size..!!!!!!
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


//PEAK
//REPEAT
//repeat system
//if there are items in this array, we check for them. we check for the key, if there is no keyup signal, then run the asociated function
//when timestamp is a certain number bigger than first press. at an interval
//.. so this function is probly the best time to ask if there is a repeated command, if so we need to prevent execution and inmediately
//flush it
//... ok we want to run all things on keyD in one heartbeat, we should be able to cast more than one command at the same time if
//we press more than one button at the same time. this even sounds fun. for displacing in more than one direction, for experimenting
//and to play more than one tone . yes we want this
const repeatSys = function(){
	if(keyD.length!=0){
		var l = keyD.length;
		while(l--){
			var kd = keyD[l];
		//this solves it. works perfectly fine.. maybe we can expand some more but this already works.
		//.. kinda frisky kinda messy but works... cant rememebr why i did this... doesnt look pretty
			//if(l==1){//its because there is 0..
				//so compare with 0
			//	kd0 = keyD[0];
			//	if(kd.ins==kd0.ins){
			//		keyD.splice(0,1);
			//	}
			//}
		////////........... it works..
			var En = kd.str;
			if(En[0]==':'||En[0]=='#'){comA(stancE,En);}else{
				var csplit = En.split('<>'); //comands split .. diamond symbol
	//... so i think this down bellow is not crucial now that we solved the hashtag thing !!!!!!!!!!!!!!
				if(csplit.length>1){ //there is 1 or more <>. the second instruction is always after the last '<>'
					var secins = csplit.pop(); var firstins = csplit.join('<>');
					var end = comA(stancE,firstins); if(end=='end'){}else{comA(stancE,secins);}			
				}else{comA(stancE,En);}
			}
		////////
			//sober
			//Entry = kd.str;
			//break
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

//PEAK
//we need x and y from an offset, and track data. offset is just the angle. it really is just the angle. so were do we get this angle from.
//maybe its a parameter from the circle aspect. because we want multiple aspects using this track, so it makes sense to let each
//aspect have its own offset/angle at any moment. ok perfect. now we only need a good sinthax for sunya to let us do this in an elegant
//way
const getTrackPos = function(offsX,offsY,trackRadX,trackRadY,trackCX,trackCY){
	return {
		x:Math.round(trackCX + Math.cos(offsX) * trackRadX),
		y:Math.round(trackCY + Math.sin(offsY) * trackRadY)
	}

}	

/*
//a function to calculate theta in radians using 2 points... however we need to modify this. Because cuadrants
//if casterx > 0 >>> if castery > 0 , down right , if castery < 0 , up right
//if casterx < 0 >>> if castery > 0 , down left, if castery < 0 , up left
//if cuadrant right up, we just use getTheta
//if cuadrant left up,  PI/2 - theta, and we add PI/2
//if cuadrant is left down, PI/2 + theta and we add PI
//if cuadrant is right down, PI/2 - theta and we add PI/2*3
//ok.. this is fine.. but lets start from the beggining..
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
*/


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

/*
//deprecatz
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
			//.. this wont be necesary anymore
			//Ecen.state.x=eX; Ecen.state.y=eY;
			//Elid up
	//we also need to move our screen lid
			//.. neither this
			//Elid.state.x=eX-window.innerWidth/2; Elid.state.y=eY-window.innerHeight/2;
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
			//
//AAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaand displaces affecting only states of forms might present inconsistencies with beats changing
//x y coordinates. that is, beats will override states coordinates so... this needs to be considered.
//DISplaces need to address aspects beats coordinates, not states. left20>>orb/aspect/beat...
//so the correct and scalable way to do this would be to make signals being able to read right side from a text, just like delete..
//... we are using polarity now.
//+20>>orb/aspect/beat/param .. ok so now we can use pol and param to determine direction. ... the idea now is create limits using
//orbs circle and rect aspects...
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

*/


/*
//peak deprecat
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
//OK so this one also needs to change a bit since now limiters will be orbs, not just MSp!!!!!!!!!!!!!!
	//
//.. this snipet here returns the coordinates only when the destination is not beyond MSp radius....!!
	var e_ms = getDist(nx, MSp.state.x , ny, MSp.state.y); var e_msp = e_ms.toFixed(0); var e_ms = parseFloat(e_msp);
	if(e_ms>MSp.state.radius){}else{ 
		x=nx; y=ny; 
		return [x,y]
		//return [nx,ny]
	}//mspace limits

	return		
}//displacer
*/




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
		c.save();
		//rotate.. flip... goes here. state params should control these
		c.globalAlpha = s.a;
		c.drawImage(
			s.img, 
			s.x, s.y,
			s.w, s.h, 
			s.px+s.cx, s.py+s.cy, //center lives in the state as well
			s.pw, s.ph
		);
		c.restore();
		return
	}
	
	if(s.is=='rect'){
		c.save();
		//c.translate(s.tx, s.ty);
		if(s.inside=="empty"){
			c.strokeStyle=`rgba(${s.r},${s.g},${s.b},${s.a})`;
			c.strokeRect(s.x+s.cx,s.y+s.cy,s.w,s.h);
		}
		if(s.inside=="filled"){
			c.fillStyle=`rgba(${s.r},${s.g},${s.b},${s.a})`;
			c.fillRect(s.x+s.cx,s.y+s.cy,s.w,s.h);
		}
		c.restore();
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
//remember we use the last boolean parameter set to true, to draw counter clockwise and false for clockwise here on arc method..
//.. and maybe we actually dont need to set this at true by default at all..
			c.arc(s.x+s.cx,s.y+s.cy,s.radius,0,Math.PI*2);//,true);
			c.stroke();
		}
		if(s.inside=="filled"){
			c.fillStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
			c.arc(s.x+s.cx,s.y+s.cy,s.radius,0,Math.PI*2);//,true);
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

//.. lets just use the same circle structure here but modify it a bit so we can use it as a funny circle state aspect with our system
//so the state we want to use needs a few more parameters here.. lets just implement the whole aspect so we can play around with it
//using circle aspect as refference... rememebr to put this one on Orbs updates . this was a good idea :D
///*
	if(s.is=='track'){
		c.save();
		c.beginPath();
		c.strokeStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
//maybe i can use a different value here instead of Math.PI*2.. instead of looping all at once, we use s.angle
//we can then use instructions to simulate 0 to 6.2... so lets build a loop with instructions to generate numbers
//from 0 to 6.2 and restart, while simultaneously feeding the numbers to a track offsx or offsy see how that goes..
		//for(let a = 0; a < Math.PI * 2; a += s.offspeed){
			//c.lineTo(s.CX + Math.cos(s.offsX) * s.tradX, s.CY + Math.sin(s.offsY) * s.tradY,);
			////getTrackPos = function(offsX,offsY,trackRadX,trackRadY,trackCX,trackCY)

			var pos = getTrackPos(s.offsx, s.offsy, s.tradx, s.trady, s.cx, s.cy);
			c.moveTo(pos.x, pos.y);
			//lets just draw a point on position now
			c.arc(pos.x, pos.y, 1 , 0, Math.PI * 2);//.. maybe there is a more efficient way to draw a point lol
			//c.fill();
			//var pos = getTrackPos(a+s.offsX, a+s.offsY, s.tradX, s.tradY, s.CX, s.CY);
			//c.lineTo(pos.x, pos.y);
//now here each of these positions i can use to update other aspects.... i am  thinking now.. we can make all kinds of funky forms
//here and thats fun. but i still need to figure out how to build the sinthax around it.
//.. so instead of drawing a line, we could simply create an array of coordinates to be used on other aspects... thats going to be crazy.
//because drawing a line was not the point in this . we are only interested in creating tracks for other forms to follow,
//so once we create a track, we could simply transfer the position to other aspects. so lets refine this to make it do what we really
//want to do. so we dont need to create all the points at once in this for loop, we could calculate the points once per heartbeat..
//or we could calculate all points once and simply stop doing this operation and just use the array of point produced for other
//aspects to use.... maybe is more inline with the system to produce one point per heartbeat, we dont want to perform too many operations
//at once, i think its better to distribute the load work evenly in time.
//All Aspects should be able to be easily tuned using sunya sinthax.
		//}
		//c.closePath();
		c.stroke();
		c.restore();
		return
	}
//*/


	if(s.is=='txt'){
/*
textAlign = value
Text alignment setting. Possible values: start, end, left, right or center. The default value is start.
textBaseline = value
Baseline alignment setting. Possible values: top, hanging, middle, alphabetic, ideographic, bottom. The default value is alphabetic.
direction = value
Directionality. Possible values: ltr, rtl, inherit. The default value is inherit.
*/
		//var c = s.ctx;
		c.save();
		c.fillStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
		c.font = s.font;
		c.textBaseline='top'; //we can do this as well to align vertically
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
//we want lines now.. i find interesting that we can build lines to let aspects use them as tracks.
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
	if(SstrT > 17){ //time limit for command feedback 
		SstrT = 0;	//reinitialization
		//self cleans. we set the txt to undefined
		Sstr = ' '; SstrL = '';//cleaning string symbols here ..?
		//ctx0.clearRect((eX-800),(eY-200),1400, 300);
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
//.. i think we should use ev.code instead.. these value are more universal i think.
const kdown = function(ev){
	//event.preventDefault();
	//ev.shiftKey ev.ctrlKey
	//var e = ev.which; 
	//console.log(e + " " + String.fromCharCode(e)); //allow this to see what key code you press on console
	//console.log(ev); //allow this to see what key code you press on console

//so repeat is bad. we need to build a custom repeat here
//It needs to work in conjunction with key up. . We are going to send the key instruction into an array to be checked and called
//over again and again with a fied interval by us, and will only be removed from the repeat array when key up is fired.
	if(ev.repeat){
		//maybe we can use timeStamp here
		return
	}//prevents repeating
	
	//we can use key.. timeStamp is also useful
	//console.log(ev.key+'_____'+ev.timeStamp);

//SPACEBAR
//Maybe we can use other parameter in the event to let ' ' spacebar also be customizable..... !!!!!
//a system to attach commands into keys.. 
	if (ev.code == 'Space' && ev.target == document.body) { //spacebar
		ev.preventDefault();//prevents space to scroll document.
/*
//we are getting rid of space memory thingy. not necesary
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
*/
		//return

	}//spacebar


//KEY COMBINATIONS
//what kind of memory is kfeed?
//kfeedback needs to always be responsive and linked with the command notation system. Maybe is should only be visible by keyboard
//Users.. we dont need this on phone users, and we shouldnt expect the symbols be treated as memories because that would imply
//phone users have no way to interact with kfeeds from other entities.
//So kfeed really is a user feedback to manage commands shortcuts, no need to worry about kfeed form or anything. kfeed
//is not a txt memory either

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
	if (ev.code == 'Enter'){ //press enter to focus on input html tag
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
				//Entry = inp;
				comA(undefined,inp);
//ok so we need o.i to hold input messages now. Yeah we should be able to access this. Like, other orbs listenning to the input
//changes on other orbs. thats interesting
				//console.log(Ein);
			}

			chat_in.value = ""; //chatOn = false;
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
	//... i think we dont want double enter to call nLine anymore. we should use a signal to call inprompt, nline
	//this way users can simply asign a key to it. Enter should be exclusively for commands... leave it for now
				nLine=true; 
				chatOn = false; //
				return
			}
/*
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
				//ctx0.clearRect((eX-800),(eY-200),1400, 300);
			}
*/

			//if no waitCK, Entry will now hold the command and it will be processed by comA
			Entry=chat_in.value;
			//
			chat_in.value = "";
			chatOn = false;
			chat_in.blur();
			chat_in.style.display="none";
			
		}else{//if chat_on is false, then activate
			chat_in.style.display="inLine"; chatOn = true; chat_in.focus();

		}//chat on
//chat_in.focus(); bring focus to html input. chat_in.blur(); remove focus
//chat_in.value; return text value 
//chat_in = document.getElementById('chatext');
///
		return //////!!!!!!!!!!!!!!!!!!!!!!!!!!

	}//Enter

//ESC1
//while chat is on, Esc takes us out and doesnt print anything. Fast out
	if(ev.code == 'Escape'){
		ev.preventDefault();
		if(chatOn==true||nLine==true){
			chat_in.value = "";  chat_in.blur(); chat_in.style.display="none";
			chatOn=false; nLine=false; //PEAK
			return
		}
	}//esc on input box

/*
//BACKSPACE
//while chat is on, Esc takes us out and doesnt print anything. Fast out
	if(ev.code == 'Backspace'){
		if(chatOn==false&&nLine==false){
			ev.preventDefault();
			//waitCK = false; waitCKforget = false;
			//Kfeed.state.g=230; Kfeed.state.r=230;
			//SstrT = 20; Sstr =' '; SstrL =''; /// this fixed the thing?

		}
		return
	}//esc on input box
*/

//TAB
//PEAK
//ok so All these special keys could simply map to scripts created by the user really...
//OKSO fo now lets just embed
//+>>~/stance
//And shift Tab to
//+>>~/stance
	
	if (ev.code == 'Tab'){//&& ev.target == document.body){
		ev.preventDefault(); 
		//just ask in a specific box what to run and make an orb key to be written
		//Tab should simply make the orb run the script once.
		//Sstr=SstrL+ev.code; SstrT = 0;//by default , at every key stroke, timer should be reset
		//return
	}


	if(chatOn == false&&nLine==false){
		ev.preventDefault();
		//Sstr=SstrL+ev.code; SstrT = 0;//by default , at every key stroke, timer should be reset
		Sstr=ev.code; SstrT = 0;//by default , at every key stroke, timer should be reset
	}

//SHIFT?
//...other keys? more?


	//ask for asigned key short .. we can now evaluate all keys... mostly
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
 
//We only need fast responsve keys with fast repeat. If we want to execute multiple operations or specific operations with
//a sequence of keys, we might as well create apropiate scripts. and problem solved.
		keyD.push({k:ev.code , str:key_short.com1});
		SstrT = 17; Sstr =' '; SstrL =''; /// this fixed the thing?
	}//keyshort


}//kdown
//window.addEventListener('keydown', kdown);


//This is good. almost.. but what if we simply clear the array when any command is released. just a hunch. nah, didnt work as expected.
//ok so we could complicate this a bit, but i think it might be interesting to try something a bit complex. lets hope is not
//too expensive to perform this operation everytime we release a 1 key command like this
const kup = function(ev){
	//console.log(ev);
	var l = keyD.length;
	while(l--){
		var kd = keyD[l];
		if(kd.k==ev.code){
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

Each and every one of these commands can be called directly from the prompt, can be stored in a button, or can be written into
a memory orb so the orb can play these commands altogether on demand as well. The sinthax is the same.
We should be able to call many commands at once now
Memories, Entities.. they have containers with specific names. Sunya recalls specific directories to run functions using data
in those directories
Patterns

*/


//NEW STRUCTURE. DEFINITELY FINAL FORM
//return true on success, undefined if no match nor success
const getCom = function(C){

//..!!!!!an idea for orb creation sinthax. Why not just do unseal>>orbname . If the orb name doesnt exist, its created.
//.. hmm.. but if it exists already...what do. would be interesting to be abtle to say unseal>>orb/aspect1/aspect2... and so on.
//so orbs can be unsealed multiple aspect in one line. This makes sense.. however am not sure if we want to necesarily create the
//orb if it doesnt exist. Its interesting to set a script to wait for the existence of a specificaly named orb. we dont want to 
//sacrifice that. But multi aspects in one line is good... we are doing unseal/aspect1/aspect2..>>targetorb now
	if(C[0]=='@'){
// @orbname
		var oname = C.substr(1);
		//look if the name already has been asigned to an orb. what if it has
		let l1 = staNce.length;
		while(l1--){if(oname==staNce[l1]){return 'end'} }
		var o = OrbSoul();
		if(oname!=''){o.name=oname;} Orbs.push(o); staNce.push(o.name);
		Eout = '@'+o.name;
		return true
	}// @

	if(C=='loadimage'){
//loadimg . create a buffer for an image file on local machine 
		Eout='loadimage';
		img_in.click();
		return 'end'
	}
	if(C=='loadaudio'){
//loadaudio . local audio file buffer into the browser
		Eout='loadaudio';
		audio_in.click();
		return 'end'
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
//
//
const comRiTarget = function(signal,target,St){
//so we already know signal is a signal not a target so not a retrieve command. lets analyze the signal by dividing it with '/'
//signal . signal/aspect/line/param   . each signal uses more or less number of '/' .
	
//annalize target on right side. produce tent or to (target ent or target orb). target should be a name string
	var TS = target.split('/');
	var tg = TS[0];
	var to = undefined; var tent = undefined;
	if(tg=='~'){var tent = '~';} //future me. now you have to think about other entities..
	if(tg=='$'){var to = Fting(Orbs,'name',St);} 
	if(tg=='%'){var to = Fting(Orbs,'name',stancE)}
	if(to==undefined){var to = Fting(Orbs,'name',tg);}
	if(to==undefined){if(tent==undefined){return 'end'}}

	if(signal=='sig'){return 'end'} //this here is so ugly..
//aNALIZE signal now..
//signal/k1/k2/k3
	var SS = signal.split('/');  //
	var sig = SS[0]; var k1 = SS[1]; var k2 = SS[2]; var k3 = SS[3];

	if(sig=='seal'){
		for (var i = 1; i < SS.length; i++) { 
			//var asp = SS[i]; 
			to[SS[i]]=false; 
		} 
		return
	}
	if(sig=='unseal'){
		for (var i = 1; i < SS.length; i++) { SoulSeal(to,SS[i]); } return
	}

//we can check for polarity here now
//... so right now we cant use polarity on beats that dont contain the target parameter but we can create those parameter
//using transfer commands..
//ok so maybe we want to be able to use polarity on data lines...... like  +123>>orb/text/line ... yeah thats neat
//all we need is to not specify aspect. just polarity and optionally, a quantity. This construction can only affect orb/text/line targets
//... yes this is useful
	var pol = 0;
	if(sig[0]=='+'){
		if(sig.length>1){
			var nnum = sig.substr(1);
			var num = parseFloat(nnum);
			if(isNaN(num)){var pol = 1;}else{var pol = num*1;}
		}else{var pol = 1;}
	}
	if(sig[0]=='-'){
		if(sig.length>1){
			var nnum = sig.substr(1);
			var num = parseFloat(nnum);
			if(isNaN(num)){var pol = -1;}else{var pol = num*-1;}
		}else{var pol = -1;}
	}

//signals will no hold elements that we were placing on RS previously so this needs reestructuring.
// sig to tent k1 k2 k3 pol

//.. maybe we can work with pol right from here. for clarity s sake, it should be in here, not on putRiValue. details details
//mirror is not a polarity thing. putRiValue should only deal with the case of LS being a value we want to put somewhere
//if polarity is not 0, then we ask all possible uses right here. we can modify parameters on aspects beats, we can play around
//with aspects active line cn, and we also should be able to affect entity center screen location
	if(pol!=0){


		//console.log(pol);
//we simply need to add pol to the target and check if its a valid operation. signal/k1/k2/k3
		if(tent){ //here goes polarity signals into entity keys
			if(k1=='x'){
				var nv = eX+pol; //a new value
		//create a packet to perform operation at the begginning of next hearbeat..
				var treq = [-pol,0];
				transLate.push(treq);
				//ctx0.translate(-pol,0); //... remmeber when we translate we need to think in reverse.. yup crazy
				eX=nv;
				//do we want Eout to have output data here or not..
				return
			}

			if(k1=='y'){
				var nv = eY+pol;
				var treq = [0,-pol];
				transLate.push(treq);
				//ctx0.translate(0,-pol); //... remmeber when we translate we need to think in reverse.. yup crazy
				eY=nv;
				//Eout?
				return
			}

		//any other entity keys we want to be able to change with polarity go here.. yeah we dont need polarity on screen..

		}//target entity


		if(to){
			if(k1==undefined){ //just polarity, no aspect nor line nor param specification
//we want to add pol to a number siting in a dataline. we use known keywords to access the line we looking for
//current, last, or number.. but we want simple numbers so we can match with conditions from instructions!! its a hard
//time to ask for 6.2 with all those crazy decimals...what would be the most efficient aproach here?
//.. ok so an idea.. maybe we can by default divide by 100. So we have to use bigger numbers and counters..
// pol>>orb/text/line
				if(TS[1]=='text'){//we want to use polarity on a value stored directly on the target text
					
					switch(TS[2]){
						case 'current':
							var nv = parseFloat(to.txtLi[to.txtB-1].txt);
							to.txtLi[to.txtB-1].txt=parseFloat((nv+pol).toFixed(2));
							break
						case 'last':
							var nv = parseFloat(to.txtLi[to.txtLi.length-1].txt);
							to.txtLi[to.txtLi.length-1].txt=parseFloat((nv+pol).toFixed(2));
							break
						default:
							if(isNaN(TS[2])){
								return 'end'//LSout.push(TS[2]);
							}else{
								var num = parseFloat(TS[2]);
								var nv = parseFloat(to.txtLi[num-1].txt);
								to.txtLi[num-1].txt=parseFloat((nv+pol).toFixed(2));//(nv+pol).toFixed(2);
	//if(isNaN(rmhash)){LSout.push(rmhash); }else{ var num = parseFloat(rmhash); LSout.push(num);}
							}
							break				
					}
					return
				}
				return 'end'
			}

//pol/text/x , y , cn>>
			if(to[k1]){ //text aspect unsealed?
			//only pol/text/x  locates x and y on k2 so far.. because we move all lines of the text at once
			//this is just too convenient not to have. working on txtX and txtY makes this possible
				if(k2=='x'){ 
					to.txtX=to.txtX+pol; dESpacer(to); return //o.o ??
				}
				if(k2=='y'){
					to.txtY=o.txtY+pol; dESpacer(to); return //o.o ??
				}
			}

//aspect active line should be able to listen to polarity signals in to . only visuals tho. we can probably optimize code here a lot
			if(k2=='cn'){
				if(to[k1]){ //orb Aspect is unsealed.
					switch(k1){
					case 'text':
						//var contstr = 'txtLi'; 
						var bstr = 'txtB'; break
					case 'script':
						//var contstr = 'scC';
						var bstr = 'scB'; break
					case 'circle':
						//var contstr = 'cirF';
						var bstr = 'cirB'; break
					case 'rectangle':
						//var contstr = 'rectF';
						var bstr = 'rectB'; break
					case 'image':
						//var contstr = 'imgF';
						var bstr = 'imgB'; break
					case 'track':
						//var contstr = 'imgF';
						var bstr = 'trackB'; break

					//case 'oscillator':
					//	var contstr = 'oscTL'; break //var bstr = 'imgB'; break
					}

					var newcn = to[bstr]+pol; if(newcn<=0){return 'end'}
					to[bstr] = newcn; 
					return
					
				}

				return 'end' //if aspect is sealed we cant change its active line. failed operation
			}
			
//we can do something with oscillators here.. +23/oscillator/toneline/param ... we do, but we need k3.
//and k2 needs to be a number to adress a specific tone line
//if k3 is defined, then we want to use polarity on an aspect beat parameter.
//beatParam(o,cont,key,sub,op,pol) . this function is almost written already !! 
//pol/aspect/line/param  signal/k1/k2/k3
			if(k3){ 
				o.o = beatParam(to,k1,k2,k3,undefined,pol); //this returns a neat output
				return
			}
			
			return 'end' //if we are here we got nothing
			
		}//target orb

	}//polarity



//lets make delete now take a single orb name or orb reff . to
	if(sig=='delete'){
		var ioo = Orbs.indexOf(to);
		if(ioo==undefined){return 'end'}
		var iooo = staNce.indexOf(to.name);
		staNce.splice(iooo,1);
		Eout = 'delete>>'+to.name;
		Orbs.splice(ioo,1);
		return
	}


	if(sig=='rmline'){
 //ok we only need to work with o, aspect and line !!  rmline>>orb/aspect/line .. no more
//new rmline sinthax.
//rmline/cont/line>>target .... so its   sig/k1/k2>>to  ..or tent?  . Do we want to be able to remove lines from entities containers?!!!
		switch(k1){
			case 'text': var contstr = 'txtLi'; var bstr = 'txtB'; break
			case 'script': var contstr = 'scC'; var bstr = 'scB'; break
			case 'circle': var contstr = 'cirF'; var bstr = 'cirB'; break
			case 'rectangle': var contstr = 'rectF'; var bstr = 'rectB'; break
			case 'image': var contstr = 'imgF'; var bstr = 'imgB'; break
			case 'track': var contstr = 'trackF'; var bstr = 'trackB'; break


//maybe we can modify both tone line and the state tone itself if playing.. both from here. we actually want to remove the
//tone line so if o.oscPA, then we also need to end the tone asociated.. but probably a nice end, so we request fade out, not just
//remove the state, we dont want the poping sound
			case 'oscillator':
				var contstr = 'oscTL'; 
				if(to.oscPA){
		//... what about rmline/oscillator/all ... should remove all tone lines.
					var k = parseFloat(k2);
					for (var i = 0; i < oscCue.length; i++) {
						var os = oscCue[i];
						if(os.origin==to.name){
							if(os.toneline==k){
								//remove tone line gently
								os.end=0; //this works?
							}//toneline match
						}//origin name match
					}//sound cue loop
				}//osc playing already
				break
			return 'end'//return if no cont match
		}

		switch(k2){
			case 'all':
				var kstr = 'all';
			case 'current':
				var kstr = to[bstr]-1; break
			case 'last':
				var kstr = to[contstr].length-1; break
			default:
				//line is a number now.. not sure if parse is necesary again.. ? 
				var k = parseFloat(k2);
				var kstr = k-1; var nan = isNaN(kstr); if(nan){return 'end'}
				break
		}
//now we check if this line exists, if so then remove it.
		if(k2=='all'){
			//if(k1=='oscillator'){} ////we need to remove all oscillator tones if active..
			to[contstr].splice(0); return
		}
		var B = to[contstr][kstr];
		if(B){
			to[contstr].splice(kstr,1); 
			if(k1=='text'){
				dESpacer(to);
				Eout = 'rmline>>'+to.name//target;//we need a better output structure to annalize i think
				return
			}
		}
		
		return 'end' //return end if no rmline match because the operation failed and so second ins if any cant execute

	}//rmline

}// comRiTarget .. signals procesing



//produce LSout
const getLeValue = function(LS,St){
//LS might be : ~/cont  , orb/cont , orb/cont/key , orb/cont/key/sub . 
	var SS = LS.split('/');
	//check origin
	var o = undefined; var ent = undefined;
	if(SS[0]=='~'){var ent = true;}
	if(SS[0]=='%'){var o = Fting(Orbs,'name',stancE);}//this might need tunning. we could also reffer to entity,,!!!!!!!!!
	if(SS[0]=='$'){var o = Fting(Orbs,'name',St);}//else{var o = Fting(Orbs,'name',SS[0]);}
	if(o==undefined){var o = Fting(Orbs,'name',SS[0]);}
	if(o==undefined){if(ent==undefined){return 'sig'}}

//since its not a signal, its a retrieve command, we return the value from the operation
	if(SS.length==1){
//?
//help commands... we could have them... or just have a really good manual somewhere as a text file
		//
		if(ent){
// ~
//return access keys to entity structure... actually, we could just request all data in real time , same with orbs. 
			var res = [
				'~/name: '+Ename,
				'~/now: '+Math.round((Date.now()-VoidID)/1000),
				'~/orbs: '+Orbs.length,
				'~/stance: '+stancE,
				'~/dsignat: '+dsignat.toString(),
				'~/x: '+eX,
				'~/y: '+eY,
				'~/screenx: '+(eX-(Math.round(window.innerWidth/2))),
				'~/screeny: '+(eY-(Math.round(window.innerHeight/2))),
				'~/screenw: '+window.innerWidth,
				'~/screenh: '+window.innerHeight,
				'~/comprompt: '+chatOn,
				'~/inprompt: '+nLine,
				'~/memheat: '+hEat,
				'~/out: '+Entry,//+Eout,
				'~/in: '+Ein,
			//limage here could return the number of images..
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
				'/name: '+o.name
				//deprecated..
				//'/gspeed: '+o.gspeed,
				//'/cursor: '+o.cursor,
				//'angle: '+o.angle, 'focus: '+o.focus,
				//o.name+'/name', o.name+'/gspeed', o.name+'/wspeed', o.name+'/in', 
				//o.name+'/x', o.name+'/y', o.name+'/angle'
				//o.name+'/elis' , what about focus , 
//we probably want to be able to learn from here, what aspects does the orb has active
			);
			
			if(o.text){
				//asp.push('text');
				res.push(

					'/text/x: '+o.txtX,
					'/text/y: '+o.txtY,
					'/text/cn: '+o.txtB,
				//.. need to implement something here to not print anything if current line dont exist..
					//'/text/current: '+o.txtLi[o.txtB-1].txt,
					'/in: '+o.i
					//o.name+'/text'
				);
			}
			if(o.script){
				//asp.push('script');
				res.push(
					'/script/run: '+o.scR,
					'/script/cn: '+o.scB,
					//'/script/current:'+o.scC[o.scB-1],
					'/out: '+o.o
				);
			}
			if(o.circle){
				//asp.push('circle');
				res.push(
					'/circle/x: '+o.cirS.x,
					'/circle/y: '+o.cirS.y,
					'/circle/radius: '+o.cirS.radius,
					//'/circle/current: '+o.cirF[o.cirB-1].toString(),//o.cirR,
					'/circle/run: '+o.cirR,
					'/circle/cn: '+o.cirB
				);
			}
			if(o.rectangle){
				//asp.push('rectangle');
				res.push(
					'/rectangle/x: '+o.rectS.x,
					'/rectangle/y: '+o.rectS.y,
					'/rectangle/w: '+o.rectS.w,
					'/rectangle/h: '+o.rectS.h,
					//'/rectangle/current: '+o.rectF[o.rectB-1].toString(),//o.cirR,
					'/rectangle/run: '+o.rectR,
					'/rectangle/cn: '+o.rectB

				);
			}
			if(o.track){
				res.push(
				///r:230, g:230, b:230, a:0.8, cx:eX, cy:eY, x:0, y:0, is:'track',
				///offspeed:0.01, offset:0, tRad: 100, tCX:eX, tCY:eY, layer:0
					//getTrackPos(a+s.offsX,a+s.offsY,s.tradX, s.tradY,s.CX, s.CY)
					'/track/cx: '+o.trackS.cx,
					'/track/cy: '+o.trackS.cx,
					'/track/tradx: '+o.trackS.tradx,
					'/track/trady: '+o.trackS.trady,
					'/track/offsx: '+o.trackS.offsx,
					'/track/offsy: '+o.trackS.offsy,
					'/track/offspeed: '+o.trackS.offspeed,
					'/track/run: '+o.trackR,
					'/track/cn: '+o.trackB
				);
			}
			if(o.oscillator){
				//asp.push('oscillator');
				res.push(
					'/oscillator/run: '+o.oscR
					//'/oscillator'
				);
			}
			if(o.image){
				//asp.push('image');
				res.push(
					'/image/cx: '+o.imgS.cx,
					'/image/cy: '+o.imgS.cy,
					'/image/px: '+o.imgS.px,
					'/image/py: '+o.imgS.py,
					'/image/pw: '+o.imgS.pw,
					'/image/ph: '+o.imgS.ph,
					'/image/x: '+o.imgS.x,
					'/image/y: '+o.imgS.y,
					'/image/w: '+o.imgS.w,
					'/image/h: '+o.imgS.h,
					'/image/file: '+o.imgfile,
					//'/image/current: '+o.imgF[o.imgB-1].toString(),
					'/image/run: '+o.imgR,
					'/image/cn: '+o.imgB
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
//...!!! ok we need screenx0 .. 100 .. 300 to specify how far we want to position ourselves from the corner here.
//same with screeny. we need this because otherwise we would waste so much time building a script to do this.
//ok. grab the word "screen", process the next symbol, x y w h , and then check for a number... so maybe switch is not apropiated for
//this. so we test for these before the switch statement. and its working perfectly
			var screen = k.substr(0,6); // 'screen'
			if(screen=='screen'){
				var p = k.substr(6,1); //should have the next symbol
				var a = parseFloat(k.substr(7));  //has the value to add. if none, then value is 'NaN'
				var isnan = isNaN(a); if(isnan){a = 0;}
				if(p=='x'){var tg = eX+a; return [tg-(Math.round(window.innerWidth/2))]}
				if(p=='y'){var tg = eY+a; return [tg-(Math.round(window.innerHeight/2))]}
				if(p=='w'){return [window.innerWidth+a]}
				if(p=='h'){return [window.innerHeight+a]}
			}//screen

				
			switch (k){

// ~/name>>
				case 'name': return [Ename] 
//.. its easier to work with seconds to create timers to scripts to run... but we probably want to elaborate further to properly
//sunch with audio aspects...
// ~/now>>
				case 'now': return [Math.round((Date.now()-VoidID)/1000)]
				//case 'now': return [(Date.now()-VoidID)] 
// ~/timer>>
				//case 'now': return Math.round((Date.now()-VoidID)/1000)
// ~/x>>
				case 'x': return [eX] 
// ~/y>>
				case 'y':return [eY] 
// ~/comprompt>>
				case 'comprompt': return [chatOn] 
// ~/inprompt>>
				case 'inprompt': return [nLine] 
// ~/memheat>>
				case 'memheat': return [hEat]
// ~/orbs>>
				case 'orbs':
		//read only . return a list of all orbs in the domain
					var aorbs = [];
					for (var i = 1; i <= staNce.length-1; i++) {
						var on = staNce[i];
						aorbs.push(on);
					}
					return aorbs
					//return staNce
				//broken...
				case 'dsignat':
//~/dsignat>>
					//var dsi = [];
					//for (var i = 0; i <= dsignat.length-1; i++) {
					//	var dsib = dsignat[i].toString();
					//	dsi.push(dsib);
					//}
					//return dsi;
					return [dsignat.slice(0).toString()]
				case 'skeys':
//~/skeys>>
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
//~/limage>>
					var images = [];
					for (var i = 0; i <= LImg.length-1; i++) {
						var im = LImg[i].name;
						images.push(im);
					}
					return images
//unfinished audio..
				//case 'laudio':
					//var images = [];
					//for (var i = 0; i <= LImg.length-1; i++) {
					//	var im = LImg[i].name;
					//	images.push(im);
					//}
					//return images
					//break
				case 'stance':
//~/stance>>
					return [stancE]

		//These commands rule. 
				case 'inline':
//~/inline>>
					return [chat_in.value]
				case 'comline':
//~/comline>>
					return [chat_in.value]

//read only, returns entity input and output... 
				case 'in':
//~/in>>
					if(Ein==undefined){return 'end'}
					return [Ein]
				case 'out':
//~/out>>
					//if(Eout==undefined){return 'end'}
					if(Entry==undefined){return 'end'}
					return [Entry]//[Eout]
			}//switch
		}//ent

		if(o){
			var k = SS[1];
			switch (k){
		//these need to check for aspect

				case 'name':
//orb/name>>
					return [o.name] 
//orbs on themselves have no x and y values we need to specify aspect and beat
				//case 'x':
				//	return [o.x-MSp.state.x]
				//	break
				//case 'y':
				//	return [o.y-MSp.state.y]
				//	break


//into a different array ALOrbs , after loop orbs. This array contains all signals that need inmediate reaction to orbs activity
//drag, delete, in, out. All these signals need a special after procesing time .... its just o.i and o.o.
//orb/in and orb/out
//okok i rememebr. o was stance orb and or was SS[0] . because if an orb asks for orb/in we need to do the o.cast thing so
//we read the instruction on LSOrbs phase . so we need to use St to get the current stance if any
				case 'in':
//orb/in>>
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
//orb/out>>
					var or = Fting(Orbs,'name',St);
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

//these can also probably merged into one single function!!!!!!!!!!!!!!!!!!!!!!!!!
					//
				case 'text':
//orb/text>>
					if(o.text){
						var dla = [];
						for (var i = 0; i <= o.txtLi.length-1; i++) {
							var tl = o.txtLi[i].txt;
							dla.push(tl);
						}

						return dla
					}
					return 'end'

				case 'script':
//orb/script>>
					if(o.script){
						var scla = [];
						for (var i = 0; i <= o.scC.length-1; i++) {
							var scl = o.scC[i];
							scla.push(scl);
						}
						return scla;
					}
					return 'end'
				case 'circle':
//orb/circle>>
					if(o.script){
						var btt = [];
						for (var i = 0; i <= o.cirF.length-1; i++) {
							var bt = o.cirF[i].toString();
							btt.push(bt);
						}
						return btt;
					}
					return 'end'

				case 'rectangle':
//orb/rectangle>>
					if(o.rectangle){
						var btt = [];
						for (var i = 0; i <= o.rectF.length-1; i++) {
							var bt = o.rectF[i].toString();
							btt.push(bt);
						}
						return btt;
					}
					return 'end'
				case 'image':
//orb/image>>
					if(o.image){
						var btt = [];
						for (var i = 0; i <= o.imgF.length-1; i++) {
							var bt = o.imgF[i].toString();
							btt.push(bt);
						}
						return btt;
					}
					return 'end'
				case 'oscillator':
//orb/oscillator>>
					if(o.oscillator){
						var tla = [];
						for (var i = 0; i <= o.oscTL.length-1; i++) {
							var tl = o.oscTL[i].toString();
							tla.push(tl);
						}
						return tla;
					}
					return 'end'
//orb/track>>
				case 'track':
					if(o.track){
						var tla = [];
						for (var i = 0; i <= o.trackF.length-1; i++) {
							var tl = o.trackF[i].toString();
							tla.push(tl);
						}
						return tla;
					}
					return 'end'

			}//switch k
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
// orb/text/x>>
					if(ckey=='x'){return [o.txtX];}
// orb/text/y>>
					if(ckey=='y'){return [o.txtY];}

// orb/text/last>>
					if(ckey=='last'){
						if(o.txtLi.length==0){return 'end'}//nothing here
						var lastl = o.txtLi[o.txtLi.length-1].txt;
						return [lastl];
					}

// orb/text/current>>
					if(ckey=='current'){
						if(o.txtLi.length==0){return 'end'}//nothing here
						var currentl = o.txtLi[o.txtB-1];
						if(currentl==undefined){return 'end'}
						return [currentl.txt];
					}
// orb/text/cn>>
					if(ckey=='cn'){return [o.txtB];}

//orb/text/number>>
					//if stil here, we ask if this is a number we can work with
					var rln = parseFloat(ckey);//we need to turn ckey into a number
					//if(rln==undefined){return 'end'}
					var nan = isNaN(rln);
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
//these return the current image center.. thats ok we can work with that i think
// orb/image/x
					if(ckey=='x'){return [o.imgS.cx+o.imgS.px];}
// orb/image/y
					if(ckey=='y'){return [o.imgS.cy+o.imgS.py];}
// orb/image/w
					if(ckey=='w'){return [o.imgS.pw];}
// orb/image/h
					if(ckey=='h'){return [o.imgS.ph];}
//orb/image/file
					if(ckey=='file'){return [o.imgfile];}
//orb/image/run
					if(ckey=='run'){return [o.imgR];}
//orb/image/cn
					if(ckey=='cn'){return [o.imgB];}
// orb/image/last
					if(ckey=='last'){var lastl = o.imgF[o.imgF.length-1].toString(); return [lastl];}
//orb/image/current
					if(ckey=='current'){
				//current needs to return the current beat as text.. if exists
						var strb = o.imgF[o.imgB-1]//.toString();
						if(strb){return [strb.toString()];}
						return 'end'
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

// orb/circle/x
					if(ckey=='x'){return [o.cirS.x];}
// orb/circle/y
					if(ckey=='y'){return [o.cirS.y];}
// orb/circle/r
					if(ckey=='r'){return [o.cirS.r];}
// orb/circle/g
					if(ckey=='g'){return [o.cirS.g];}
// orb/circle/b
					if(ckey=='b'){return [o.cirS.b];}
// orb/circle/a
					if(ckey=='a'){return [o.cirS.a];}

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
//orb/circle/number
					var rln = parseFloat(ckey);
					var nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>o.cirF.length){return 'end'}
					var strb = o.cirF[rln-1].toString();
					//var RSout = [strb];
					//o.o = RSout;
					return [strb]
				}
			}//circle

			if(cont=='rectangle'){
				if(o.rectangle){
//... i think its ok to just return the state coordinates if we just ask the aspect directly... might be interesting
					//
// orb/rectangle/x
					if(ckey=='x'){return [o.rectS.x];}
// orb/rectangle/y
					if(ckey=='y'){return [o.rectS.y];}

					if(ckey=='w'){return [o.rectS.w];}
// orb/rectangle/h
					if(ckey=='h'){return [o.rectS.h];}
//.... these might need to go on ALOrbs loop.....!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// orb/rectangle/r
					if(ckey=='r'){return [o.rectS.r];}
// orb/rectangle/g
					if(ckey=='g'){return [o.rectS.g];}
// orb/rectangle/b
					if(ckey=='b'){return [o.rectS.b];}
// orb/rectangle/a
					if(ckey=='a'){return [o.rectS.a];}

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
//orb/rectangle/number>>
					var rln = parseFloat(ckey);
					var nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>o.rectF.length){return 'end'}
					var strb = o.rectF[rln-1].toString();
					//var RSout = [strb];
					//o.o = RSout;
					return [strb]
				}
			}


			if(cont=='track'){
				if(o.track){
// orb/track/cx
					if(ckey=='x'){return [o.trackS.cx];}
// orb/track/cy
					if(ckey=='y'){return [o.trackS.cy];}
// orb/track/tradx
					if(ckey=='w'){return [o.trackS.tradx];}
// orb/track/trady
					if(ckey=='w'){return [o.trackS.trady];}
// orb/track/offsx
					if(ckey=='w'){return [o.trackS.offsx];}
// orb/track/offsy
					if(ckey=='w'){return [o.trackS.offsy];}
// orb/track/offspeed
					if(ckey=='h'){return [o.trackS.offspeed];}
// orb/track/r
					if(ckey=='r'){return [o.trackS.r];}
// orb/track/g
					if(ckey=='g'){return [o.trackS.g];}
// orb/track/b
					if(ckey=='b'){return [o.trackS.b];}
// orb/track/a
					if(ckey=='a'){return [o.trackS.a];}
//orb/track/run
					if(ckey=='run'){return [o.trackR]}
//orb/track/current
					if(ckey=='current'){var strb = o.trackF[o.trackB-1].toString(); return [strb];}
//orb/track/cn
					if(ckey=='cn'){return [o.trackB];}
//orb/track/number>>
					var rln = parseFloat(ckey);
					var nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>o.trackF.length){return 'end'}
					var strb = o.trackF[rln-1].toString();
					//var RSout = [strb];
					//o.o = RSout;
					return [strb]
				}
			}

			if(cont=='oscillator'){
				if(o.oscillator){
//orb/oscillator/run>>
					if(ckey=='run'){return [o.oscR]	}
//.. osc and audio works differently. there is no current beat selected because all tone lines run at once and are monitored by hearall
//however we want to be able to access each tone data individually and be able to modify and see whats going on using this sinthax
//so orb/osc could simply return all tone lines.. we could say..orb/osc/1..2..3 and being able to monitor tone states right away
//.. so we return the lines and when we change the lines everything updates but on heartbeat, not on real time. we can reserve
//real time speed for paramChange like this: #desiredvalue>>orb/osc/2/gain  .. and these commands when asigned to keys or buttons do
//create changes in real time.. or at least as fast as possible. yes this sounds ok. ok lets do it.
//
//orb/oscillator/number>>
					var rln = parseFloat(ckey);
					var nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>o.oscTL.length){return 'end'}
					var strb = o.oscTL[rln-1].toString();
					//var RSout = [strb];
					//o.o = RSout;
					return [strb]

				}
			}

		}
		//if we still here then we might just return 'end' because nothing worked
		return 'end'
	}

//
	if(SS.length==4){ //SS[3] is a sub
		if(ent){
// ~/cont/ckey/sub>>
			// reff.
			//if(RS[0]=='~'){
			//cant think about 3 '/' on left side for '~' yet..
				//return
			//}
		}
		
		if(o){
// orb/cont/ckey/sub>>
			var cont = SS[1]; var ckey = SS[2]; var sub =SS[3];
			// o , cont, ckey, sub . we are retrieving here RS[1] is cont , RS[2] is ckey

			if(cont=='text'){
				if(o.text){
					if(o.txtLi.length==0){return 'end'}//nothing here
					if(ckey=='last'){
						var lastl = o.txtLi[o.txtLi.length-1];

						if(sub=='beats'){
// orb/text/last/beats>>
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
// orb/text/last/cn>>
							//var RSout=[lastl.tB];
							//o.o=RSout;
							return [lastl.tB]
						}
// orb/text/last/1..2..3.. >>
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
// orb/text/current/beats>>
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
// orb/text/current/cn>>
							//var RSout=[currl.tB];
							//o.o = RSout;
							return [currl.tB];
						}
// orb/text/current/1..2..3.. >>
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
// orb/text/1..2..3../beats>>
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
// orb/text/1..2..3../cn>>
						//var RSout=[irl.tB];
			//so retrieve commands should not really return data to o.o? not sure. 
						//o.o = RSout;
						return [irl.tB]
					}
// orb/text/1..2..3../1..2..3..>>
					var rln = parseFloat(sub);
					var nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>irl.beats.length){return 'end'}
					var strb = irl.beats[rln-1].toString();
					//var RSout = [strb];
					//o.o = RSout;
					return [strb]
				} 
				return 'end'
			}//text
//i think we need to be able to request and also modify specific parameters on specific beats as well...? this is going to be extenuating..
//maybe there is a different way? changing a specific element on the beat might be too complicated..? except its not necesarily so
//we write a function similiar to beatUp but it works with a single beat line. 
//			var cont = SS[1]; var ckey = SS[2]; var sub =SS[3]; // o
//we could accept a fifth param to modify the target value instead of just retrieving if necesary
//beatParam(o,cont,key,sub,op)
// orb/aspect/key/sub>>
//this can probably be optimized......!!!!!!!!  its all using beatParam
			if(cont=='circle'){
				if(o.circle){
// orb/circle/beat/param>>
					var ret = beatParam(o,cont,ckey,sub,undefined,undefined);
					if(ret==undefined){return 'end'}
					o.o = ret;//.toString();
					return [ret[2]]
				}
			}
			if(cont=='rectangle'){
				if(o.rectangle){
// orb/rectangle/beat/param>>
					var ret = beatParam(o,cont,ckey,sub,undefined,undefined);
					if(ret==undefined){return 'end'}
					o.o = ret;//.toString();
					return [ret[2]]
				}
			}
			if(cont=='image'){
				if(o.image){
// orb/image/beat/param>>
					var ret = beatParam(o,cont,ckey,sub,undefined,undefined);
					if(ret==undefined){return 'end'}
					o.o = ret;//.toString();
					return [ret[2]]
				}
			}


			if(cont=='track'){
				if(o.track){
// orb/track/beat/param>>
					var ret = beatParam(o,cont,ckey,sub,undefined,undefined);
					if(ret==undefined){return 'end'}
					o.o = ret;//.toString();
					return [ret[2]]
				}
			}

//audios are a bit different because commands changing params act on existing audio objects.. anyway
//we ant here something like: 
			if(cont=='oscillator'){
//orb/oscillator/toneline/param>>
				if(o.oscillator){
//ok we need to find the tone line thats playing... and change the parameters of the tone state directly.
					var ret = beatParam(o,cont,ckey,sub,undefined,undefined);
					if(ret==undefined){return 'end'}
					o.o = ret;//.toString();
					return [ret[2]]
				}
			
			}
			if(cont=='audio'){
//orb/audio/audioline/param>>
				if(o.audio){
					//var ret = beatParam(o,cont,ckey,sub,undefined,undefined);
					//if(ret==undefined){return 'end'}
					//o.o = ret;//.toString();
					//return [ret[2]]
				}		
			}
		}

	}//length 4..

	return 'end' //if we are here it means operation didnt find a target so we end and second instruction cant run
}//getLeValue


//const swCKOrb = function(o ,cont, ckey,po,op){ //takes an orb, a container and a container key. modify value using op
//putRiValue should be able to merge all switches by annalyzing right side. LS should always be an array with strings or a number
//return undefined when succesful, return 'end' when operation couldnt be performed
//!!!! i think we should also return data into o.o so these commands are trated like signals. so we can give targets an instance
//to react to specific commands. o.o should give signal[0] and signal[1] , the command and the target.. or something like that
//
//ok but.... we dont want polarity here now do we....
const putRiValue = function(op,RS,St){//,pol){
//RS might be : ~/cont  , orb/cont , orb/cont/key , orb/cont/key/sub
	var SS = RS.split('/');
	//check for RS structure to determine where to put op or use pol
	var o = undefined; var ent = undefined;
	if(SS[0]=='~'){var ent = true;}
	if(SS[0]=='$'){var o = Fting(Orbs,'name',St);}//else{var o = Fting(Orbs,'name',SS[0]);}
	if(SS[0]=='%'){var o = Fting(Orbs,'name',stancE);} //.. this one might need tunning.. for what we really want
	if(o==undefined){var o = Fting(Orbs,'name',SS[0]);}
	if(o==undefined){if(ent==undefined){return 'end'}}


	//if(SS.length==1){ //... orb/key>>~ ... i think this doesnt exist
	//}
//retrieve operations always need a specific target, we cant just dump data on a target without specifying a container, only
//signals may do that.
	if(SS.length==2){
//target/k1
		if(ent){
			var k = SS[1];
			switch (k){
				case 'name':
// >>~/name
					Ename=op[0]; 
		//outsignal should let other know the entity changed its name. Its a very tricky move
					//Eout=['~/name', op[0]];
					return 

				case 'x':
// >>~/x
//errors could also be processed. If op or op[0] is not a valid new parameter, we need a feedback to let user know it.
//we dont want to silently ignore the operation wasnt succesful, errors should have a recoil that affects the entity performance
//and prevent the execution of the rest of the script
					var treq1 = [eX,0];
					var treq2 = [-(op[0]),0];
					transLate.push(treq1,treq2);
					//ctx0.translate(eX,0); ctx0.translate(-(op[0]),0);
					eX=op[0]; return
					//var res = eX+pol;
					//ctx0.translate(-pol,0); //... remmeber when we translate we need to think in reverse.. yup crazy
					//eX=res;
					//return
				case 'y':
// >>~/y
					var treq1 = [0,eY];
					var treq2 = [0,-(op[0])]
					transLate.push(treq1,treq2);
					//ctx0.translate(0,eY); ctx0.translate(0,-(op[0]));
					eY=op[0]; return
					//var res = eY+pol;
					//ctx0.translate(0,-pol); //... remmeber when we translate we need to think in reverse.. yup crazy
					//eY=res;
					//return

				case 'dsignat':
// >>~/dsignat
					//read. write. A list of beats to all forms by default
		//.. would be convenient to designate all the most common colours on default
					//var nba = [];
					//for (var i = 0; i <= op.length-1; i++) {
					//	var rsob = txtToB(op[i]);
					//	nba.push(rsob);
					//}
					//dsignat = nba;
					dsignat = op[0];
					return 
				case 'skeys':
// >>~/skeys
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

				case 'stance':
// >>~/stance
					//if we want a new key value literally, we use op and set polarity to 0
					//if(pol==0){
					if(op[0]=='~'){stancE='~'; return}
					var ns = Fting(Orbs,'name',op[0]);
					if(ns){stancE=op[0]; return }else{ return 'end'}
						//return //[stancE]
					/*
					}else{
						var n = staNce.indexOf(stancE);
						var res = n+pol;
						if(res<=0){stancE = '~'; return 'end'}
						if(res>(staNce.length-1)){ return 'end'}//res--;}
						var l = staNce.length; 
						while(l--){
							var name = staNce[l];
							if(l==res){
								stancE = name;
								return //[stancE]
							}
						}
						//if no match, just return to initial stance. and return end because operation failed
						stancE = '~';
						return 'end'//['~']
					}
					*/
		//These commands rule. 
				case 'inline':
// >>~/inline
					// and now we should be able to get a whole text on chat_in.value, eachline separated by ' ' and
					// a ':' at the beggining? 
			//retrieving multiliners should be user friendly, it would be nice to be able to produce a text with each line
			//separated... we l come back here later
					var alldata = op.join(' ');
					chat_in.value = alldata;//op[0]//we want RSout here
					chat_in.style.display="inLine";
					//chatOn = true; 
					nLine = true; //inline prompt
					chat_in.focus();
					return
				case 'comline':
// >>~/comline
		//maybe we do want to be able to cast multiple commnads at once
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

//!!!!!!!!!!!!!!!!!!!!!!output?
//.. so what kind of output should give these operations besides the effect itself produced by their target having a new value
		if(o){
			var k = SS[1];
			switch (k){
				case 'name':
// >>orb/name
					var si = staNce.indexOf(o.name);
					staNce.splice(si,1,op[0]);
					o.name = op[0];
					return 

				case 'in':
// >>orb/in
					o.i = op[0]; return
//.. hmm yeah this is like puting a command for the orb to call... dont make mush sense now
				//case 'out':
// >>orb/out ?
					//
					//return [o.o]
					//break

				case 'script':
// >>orb/script
					if(o.script){
					//op should be an array with instructions
						o.scB=1; o.scC = op; return //[]  //not sure what to return here
					}
					return 'end'

				case 'circle':
// >>orb/circle
					if(o.circle){
		//so circle should return circle beats on string format.. beat to array
						var ncb = [];
						for (var i = 0; i <= op.length-1; i++) {
							var ttb = txtToB(op[i]);
							ncb.push(ttb);
						}
						//... maybe we dont need to put cirB back to 1 always
						o.cirB = 1; 
						o.cirF = ncb;
						return //?
					}
					return 'end'

				case 'rectangle':
// >>orb/rectangle
					if(o.rectangle){
						var ncb = [];
						for (var i = 0; i <= op.length-1; i++) {
							var ttb = txtToB(op[i]);
							ncb.push(ttb);
						}
						o.rectB = 1; o.rectF = ncb; return //?
					}
					return 'end'

				case 'image':
// >>orb/image
					if(o.image){
						var ncb = [];
						for (var i = 0; i <= op.length-1; i++) {
							var ttb = txtToB(op[i]);
							ncb.push(ttb);
						}
						o.imgB = 1; o.imgF = ncb; return //?
					}
					return 'end'


				case 'track' :
// >>orb/track
					if(o.track){
						var ncb = [];
						for (var i = 0; i <= op.length-1; i++) {
							var ttb = txtToB(op[i]);
							ncb.push(ttb);
						}
						o.trackF = ncb;
						//probably all these puts need to perform this operation here so
						//we can modify the beats without cuting the flow in the animation if possible
						if(o.trackF[o.trackB-1]==undefined){o.trackB = 1;}
						return //?
					}
					return 'end'

				case 'text':
					if(o.text){
// >>orb/text
//so, we can place multilines on a data container by passing in an array with lines on op
//this command needs to clear previous data. we want to create a text from scratch using the data provided on op
//so before clearing up o.txtLi, we check if there are as many datalines as op.length. yup this is good
						for (var i = 0; i <= op.length-1; i++) {
							var text = op[i];
//we simply want to change the text it the dataline already exist, if not, then we create a new Dataline
							if(o.txtLi[i]){o.txtLi[i].txt=text;}else{
								var Line = DataLine();
								//Line.beats=dsignat;
//.. but we want to be able to use a previously configured signature on the orb to create the new beats. so each orb may have
//a diferent font, size, etc. this signature is used to create all lines on the orb and can also be customized
//orb/text/signat !!!!!!!!!!!!!!
								var firstf = dsignat.slice(0);
								Line.beats = [firstf];
								Line.x=o.txtX; Line.y=o.txtY;
								Line.txt=text;
								o.txtLi.push(Line);
							}
						}
			//!!!!!!!!!! but we also want to remove the excedent lines !!!!  we can use op.length to flush all lines
			//from a previous text. we dont want the text to keep lines from previous commands modifying the content. ok done
						if(o.txtLi.length>op.length){o.txtLi.splice(op.length);}

						dESpacer(o);
						return //[]  //not sure what to return here
					}
					return 'end'

				case 'oscillator':
// >>orb/oscillator
					if(o.oscillator){
						var nob = [];
						for (var i = 0; i <= op.length-1; i++) {
							var ttb = txtToB(op[i]);
							nob.push(ttb);
						}
						o.oscTL = nob;
						return //[]  //not sure what to return here
					}
					return 'end'

			}//switch
		}//orb
	}

	if(SS.length==3){
//SS[1] is cont, SS[2] is ckey
		var cont = SS[1]; var ckey = SS[2];
//target/cont/ckey
		if(ent){
//ok we want to be able to add keys using new i think... because sometimes we just want to add a new shortkey with a single
//instruction and we dont want to erase previous keys
			if(cont=='skeys'){
				if(ckey=='new'){
// >>~/skeys/new
			//ok so now we want to check if a skey already exists. if so, replace it with the new one.
					for (var i = 0; i < op.length; i++) {
						var sk = op[i];
						//turn key lines into obj
						var ska = sk.split(',');
						var kobj = KLTObj(ska);

						var kalr = kobj.key;
						for (var i2 = 0; i2 < EkeyS.length; i2++) {
							var sk = EkeyS[i2];
							if(sk.key==kalr){
								EkeyS.splice(i2,1,kobj); var dp = true; break
							}
	
						}
						if(dp){}else{EkeyS.push(kobj);}
					}

					return
				}
			}
		}

		if(o){
			if(cont=='text'){
				if(o.text){
//these text/x and y to move all lines at once are ok .
//... these x and y command take literal numbers
					if(ckey=='x'){
// >>orb/text/x
						if(op){o.txtX=op[0];}
						//if(pol){o.txtX=o.txtX+pol;}
						//o.o ??
						dESpacer(o); return
					}
					if(ckey=='y'){
// >>orb/text/y
						if(op){o.txtY=op[0];}
						//if(pol){o.txtY=o.txtY+pol;}
						//o.o ??
						dESpacer(o); return
					}
// >>orb/text/align
// >>orb/text/font
// >>orb/text/size...

//text/signat could hold a beats to determine how all new lines created by this orb will look by default.
// >>orb/text/signat
					if(ckey=='signat'){
						o.tsignat = op;
					}


//so what if we want to put op[0] on a new line on target text.. or what if we want to say o1/text/1>>o2/text/3 and just replace
//line 3 of o2 with line 1 of o1.. yea we probably want this. we also going to need a keyword to simply push new line into text container
//so it specifically creates new lines without erasing anything previous.
//yeah so by default these commands should replace target with op. we want text to fine control other scripts. use orb/text/new
//to simply push all op into the text as new lines
		//we should be able to toggle current number....!!!!!
					if(ckey=='cn'){
//orb/text/cn
						//if(pol==0){
							//.. maybe we need to check here if op[0] is a number?
							o.txtB=op[0];
							return //[o.txtB]	
						//}else{
						//	o.txtB = o.txtB+pol;
						//	if(o.txtB<=0){o.txtB=1;} 
						//	return
						//}

					}
					if(ckey=='new'){
//orb/text/new
       			//a loop to push new lines into the text without deleting any line previously there
						for (var i2 = 0; i2 < op.length; i2++) {
					//maybe we could use all lines txtX like params to create unique lines using orb params
							var dli = DataLine();
							//dli.beats=dsignat; 
							var firstf = dsignat.slice(0);
							dli.beats = [firstf];
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
							var dli = DataLine();
							//dli.beats=dsignat;
							var firstf = dsignat.slice(0);
							dli.beats = [firstf];
							dli.txt=op[0];
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
								//dli.beats=dsignat; 
								var firstf = dsignat.slice(0);
								dli.beats = [firstf];
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
						}

						dESpacer(o);
						return
					}



// >>orb/text/number
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
							//dli.beats=dsignat; 
							var firstf = dsignat.slice(0);
							dli.beats = [firstf];
							dli.txt='';
							dli.x=o.txtX; dli.y=o.txtY;
							o.txtLi.push(dli);
						}
						//and place op[0] text on rln
						var ldli = o.txtLi[rln-1];
						ldli.txt = op[0];
					}else{
						o.txtLi[rln-1].txt=op[0];

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
// >>orb/script/run
						o.scR=op[0]; return
					}

					if(ckey=='last'){
// >>orb/script/last
						o.scC[o.scC.length-1] = op[0]; return
					}

					//if(ckey=='current'){
// >>orb/script/current
		//this is a bit weird to have in here because current reffers to the currently executing instruction on the script
		//.. yeah probably we want to read and annalyze the current running instruction but change it ...? no this doesnt feel
		//right... but maybe we could still implement it
						//o.scC[o.scB-1] = op[0];
						//return
					//}

					if(ckey=='cn'){
// >>orb/script/cn
						//if(pol==0){
						//should only accept numbers.. max is number of lines in script
							//.. maybe we need to check here if op[0] is a number?
							o.scB=op[0];
							return
						//}else{
						//	o.scB = o.scB+pol;
						//	if(o.scB<=0){o.scB=1;} 
						//	return
						//}
					}
// >>orb/script/number
		//this command would put a new value on the target script instruction... feels kinda aggressive but might be usable
					//we need to turn ckey into a number
					var rln = parseFloat(ckey);
					let nan = isNaN(rln);
					if(nan){return 'end'}
					//if(rln>=o.scC.length){return 'end'}
					//var rl = o.scC[rln-1];
					//if(rl){
				//this works better like this now..
						o.scC[rln-1] = op[0];
						return
					//}
				}

			}//script

			if(cont=='image'){
				if(o.image){
					if(ckey=='file'){
// >>orb/image/file
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
										'x',0,'y',0,
										'w',Img.img.width,'h',Img.img.height,
										'px',0,'py',0,
										'pw',Img.img.width,'ph',Img.img.height,
										'cx',eX,'cy',eY,
										'a',0.9,'layer',1
									]
								);
								return 
							}//match
						}
						return 'end'
					}
					if(ckey=='run'){
// >>orb/image/run
						//if(pol==0){
							o.imgR=op[0]; return
						//}else{
						//	var run = ['off','once','loop','repeat']; 
						//	var n = run.indexOf(o.imgR);
						//	var res = n+pol;
						//	if(res>=run.length){res--;} 
						//	if(res<0){res++;} 
						//	o.imgR=run[res];
						//	return
						//}
					}
					if(ckey=='current'){
//>>orb/image/current
						var nb = txtToB(op[0]);
						o.imgF[o.imgB-1] = nb;
						return //CSout
					}
					if(ckey=='cn'){
//>>orb/image/cn
						//if(pol==0){
						//should only accept numbers.. max is number of lines in script
							//.. maybe we need to check here if op[0] is a number?
							o.imgB=op[0];
							return
						//}else{
						//	o.imgB = o.imgB+pol;
						//	if(o.imgB<=0){o.imgB=1;} 
						//	return
						//}
					}
					if(ckey=='mirror'){
//>>orb/image/mirror
//mirror pretty much requires op because... what could mirror do on the left side RS? ... one sec $/image/mirror>> ... maybe an instruction
//to copy a beat
						var ims = o.imgS;
						var mirror = {
							img:ims.img,
							is:'img',
							x:ims.x, y:ims.y, w:ims.w, h:ims.h,
							px:ims.px, py:ims.py, pw:ims.pw, ph:ims.ph,
							cx:ims.cx, cy:ims.cy,
							a:ims.a,
							layer:ims.layer
						}
						var sm = Mirror(op[0],mirror);//,o.imgL);
						if(sm.layer==0){visual_q0.push(sm);} 
						if(sm.layer==1){visual_q1.push(sm);}
						if(sm.layer==2){visual_q2.push(sm);}
					//ouput returns the beat..
						o.o=op[0];
						return

					}//mirror
				}
			}

		//.. rememeber we need to consider text to beat and beat to text format transfomations in all these beat manipulations
			if(cont=='circle'){
				if(o.circle){
//... yeah this cannot be. we dont want to change states we want to change beats directly !!!!!!!!!!!
/*
					if(ckey=='x'){
//>>orb/circle/x
						o.cirS.x=op[0]; return
					}
					if(ckey=='y'){
// >>orb/circle/y
						o.cirS.y=op[0]; return
					}
*/

					if(ckey=='run'){
// >>orb/circle/run
						//if(pol==0){
							o.cirR=op[0];
							return //[o.cirR]	
						//}else{
						//	var run = ['off','once','loop','repeat']; 
						//	var n = run.indexOf(o.cirR);
						//	var res = n+pol;
						//	if(res>=run.length){res--;} 
						//	if(res<0){res++;} 
						//	o.cirR=run[res];
						//	return //[run[res]]
						//}
					}

					if(ckey=='current'){
// >>orb/circle/current
					//in here we need to transform text beat format into beat array
						var nb = txtToB(op[0]);
						o.cirF[o.cirB-1] = nb;
						return //CSout
					}
					if(ckey=='cn'){
// >>orb/circle/cn
						//if(pol==0){
						//should only accept numbers.. max is number of lines in script
							//.. maybe we need to check here if op[0] is a number?
							o.cirB=op[0];
							return
						//}else{
						//	o.cirB = o.cirB+pol;
						//	if(o.cirB<=0){o.cirB=1;} 
						//	return
						//}
					}
					if(ckey=='mirror'){
// >>orb/circle/mirror
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
// >>orb/circle/number
	
			//this command would put a new beat on the target beat line.. if exists..
		//but maybe we can make it exist.....
					//we need to turn ckey into a number
					var rln = parseFloat(ckey);
					let nan = isNaN(rln);
					if(nan){return 'end'}

					if(o.cirF[rln-1]){
						var nb = txtToB(op[0]);
						o.cirF[rln-1] = nb;
						return
					}


				}//circle Aspect on

				return 'end'


			}//circle


			if(cont=='rectangle'){
				if(o.rectangle){
/*
//deprecated. no need to change rects states directly... but maybe we could use rectangle center refference....... but its not consistent
					if(ckey=='x'){
//orb/rectangle/x
						o.rectS.x=op[0]; return
					}
					if(ckey=='y'){
//orb/rectangle/y
						o.rectS.y=op[0]; return
					}
*/
					if(ckey=='run'){
// >>orb/rectangle/run
						o.rectR=op[0];
						return //[o.rectR]

					}
					if(ckey=='current'){
// >>orb/rectangle/current
						var nb = txtToB(op[0]); o.rectF[o.rectB-1] = nb;
						return //CSout
					}
					if(ckey=='cn'){
// >>orb/rectangle/cn
						// maybe we should check if the number is valid...
						o.rectB=op[0];
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
						var sm = Mirror(op[0],mirror);
						if(sm.layer==0){visual_q0.push(sm);} 
						if(sm.layer==1){visual_q1.push(sm);}
						if(sm.layer==2){visual_q2.push(sm);}
						o.o=op[0];
						return

					}//mirror
// >>orb/rectangle/number
//this command would put a new beat on the target beat line.. if exists.. but maybe we can make it exist.....
					//we need to turn ckey into a number
					var rln = parseFloat(ckey);
					let nan = isNaN(rln);
					if(nan){return 'end'}

					if(o.rectF[rln-1]){
						var nb = txtToB(op[0]);
						o.rectF[rln-1] = nb;
						return
					}
				}
			}


			if(cont=='track'){
				if(o.track){
// >>orb/track/run
					if(ckey=='run'){
						o.trackR=op[0];
						return //[o.rectR]
					}
// >>orb/track/current
					if(ckey=='current'){
						var nb = txtToB(op[0]); o.trackF[o.trackB-1] = nb;
						return //CSout
					}
// >>orb/track/cn
					if(ckey=='cn'){
						// maybe we should check if the number is valid...
						o.trackB=op[0];
						return
					}

// ?>>orb/track/mirror .... hmm track mirror huh.... hmmmmmmm
		/*	
					if(ckey=='mirror'){
						var mirror = {
							is:'rect', 
							x:o.rectS.x, y:o.rectS.y, w:o.rectS.w, h:o.rectS.h,
							inside:o.rectS.inside,
							r:o.rectS.r, g:o.rectS.g, b:o.rectS.b, a:o.rectS.a,
							layer:o.rectS.layer
						}
						var sm = Mirror(op[0],mirror);
						if(sm.layer==0){visual_q0.push(sm);} 
						if(sm.layer==1){visual_q1.push(sm);}
						if(sm.layer==2){visual_q2.push(sm);}
						o.o=op[0];
						return

					}//mirror
		*/
// >>orb/track/number
//this command would put a new beat on the target beat line.. if exists.. but maybe we can make it exist.....
					//we need to turn ckey into a number
					var rln = parseFloat(ckey);
					let nan = isNaN(rln);
					if(nan){return 'end'}

					if(o.trackF[rln-1]){
						var nb = txtToB(op[0]);
						o.trackF[rln-1] = nb;
						return
					}
				}
			}


//osc are different. incomplete
			if(cont=='oscillator'){
				if(o.oscillator){
					if(ckey=='run'){
// ?>>orb/oscillator/run
						//if(pol==0){
							o.oscR=op[0];
							return //[o.oscR]	
						//}else{
						//	var run = ['off','play'];//,'loop','repeat']; 
						//	var n = run.indexOf(o.oscR);
						//	var res = n+pol;
						//	if(res>=run.length){res--;} 
						//	if(res<0){res++;} 
						//	o.oscR=run[res];
						//	return //[run[res]]
						//}
					}
					//...
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
				if(o.text){
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
								//align:'left', //by default could be left
								align:currl.state.align,//+window.innerWidth/2,
								//cx:currl.state.cx,//+window.innerWidth/2,
								//cy:currl.state.cy,//+window.innerHeight/2,
								x:currl.state.x,//+window.innerWidth/2,
								y:currl.state.y,//+window.innerHeight/2,
								r:currl.state.r, g:currl.state.g,
								b:currl.state.b, a:currl.state.a,
								layer:currl.state.layer
							}
							//Mirror(op[0],mirror);//,o.txtL);
							var sm = Mirror(op[0],mirror);//,o.imgL);
							if(sm.layer==0){visual_q0.push(sm);} 
							if(sm.layer==1){visual_q1.push(sm);}
							if(sm.layer==2){visual_q2.push(sm);}
							//o.o=op[0];
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
				}//o.text 
				return 'end'
			}//text

			if(cont=='circle'){
				if(o.circle){
// ?>>orb/circle/beat/param
					var ret = beatParam(o,cont,ckey,sub,op[0],undefined);
					if(ret==undefined){return 'end'}
					//o.o = ret;//.toString();
					return //[ret[2]]
				}
			}
			if(cont=='rectangle'){
				if(o.rectangle){
// ?>>orb/rectangle/beat/param
					var ret = beatParam(o,cont,ckey,sub,op[0],undefined);
					if(ret==undefined){return 'end'}
					//o.o = ret;
					return //[ret]
				}
			}
			if(cont=='image'){
				if(o.image){
// ?>>orb/image/beat/param
					var ret = beatParam(o,cont,ckey,sub,op[0],undefined);
					if(ret==undefined){return 'end'}
					//o.o = ret;
					return //[ret]
				}
			}

			if(cont=='track'){
				if(o.track){
// ?>>orb/track/beat/param
					var ret = beatParam(o,cont,ckey,sub,op[0],undefined);
					if(ret==undefined){return 'end'}
					//o.o = ret;
					return //[ret]
				}
			}


//audios are a bit different because commands changing params act on existing audio objects. 
			if(cont=='oscillator'){
//orb/oscillator/toneline/param
				if(o.oscillator){
//ok we need to find the tone line thats playing... and change the parameters of the tone state directly.
					var ret = beatParam(o,cont,ckey,sub,op[0],undefined);
					if(ret==undefined){return 'end'}
					//o.o = ret;//.toString();
					return //[ret[2]]
				}
			
			}
			if(cont=='audio'){
			
			}
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
		var nv = parseFloat(ba[i]); var numba = isNaN(nv);
		if(numba){
			beat.push(ba[i]);
		}else{
			beat.push(nv);
		}
/*
		if(numba==false){
			beat.push(nv)
		}else{
			//.. here we could have '..'... but this is good okoko one sec
			beat.push(ba[i]);
		}
*/
	}
	return beat
}

//a function to change a specific param on a specific beat. return target if found return undefined if not
//... this function could definitely be implemented more on getLeValue and putRiValue... maybe after we finish track system!!!!!!
const beatParam = function(o,cont,key,sub,op,pol){
	switch(cont){
		case 'circle':
			var contstr = 'cirF'; var bstr = 'cirB'; break
		case 'rectangle':
			var contstr = 'rectF'; var bstr = 'rectB'; break
		case 'image':
			var contstr = 'imgF'; var bstr = 'imgB'; break
		case 'track':
			var contstr = 'trackF'; var bstr = 'trackB'; break
//maybe we can modify both tone line and the state tone itself if playing.. both from here
		case 'oscillator':
			var contstr = 'oscTL'; 
//..so instead of multiple loops, lets just asign name+audiotype+line and search for that on oscCue.. but this means we cant
//adress all oscillators at once. No matter what i do there is always a new thing to considerate. I migth as well just focus on
//writing everything as modular as possible. Maybe we should even have 2 arrays instead of one oscCue. This way i dont need to
//add even more tags to find states i l just focus on name and line, oscCue  audioCue . 
			if(op!=undefined||pol!=0){
				if(o.oscPA){
					var k = parseFloat(key);
					for (var i = 0; i < oscCue.length; i++) {
						var os = oscCue[i];
						if(os.origin==o.name){
							if(os.toneline==k){
								switch(sub){
									case 'frequency':
										if(op){os.oscn.frequency.value=op;}
										if(pol){}
										break
									case 'gain':
										if(op){os.oscg.gain.value=op;}
										if(pol){}
										break
									//case '':
									//	break
								}
							}//toneline match
						}//origin name match
					}//sound cue loop
				}//osc playing already
			}//op or pol
			break
		return //return if no cont match
	}
	//.. key needs to create a number but to access the number.. we need the container to tell use its corresponding beat
	switch(key){
		case 'current':
			var kstr = o[bstr]-1; break
		case 'last':
			var kstr = o[contstr].length-1; break
		default:
			//key is a number now.. not sure if parse is necesary again.. ? 
			var k = parseFloat(key);
			var kstr = k-1; var nan = isNaN(kstr); if(nan){return}
			break
	}
//now we need to ask if adress of beat even exist and then use sub to look for its pair value on the target beat
//.. beatParam can used to create the parameter if it doesnt exist already...
//... asking here for B actually is great because we simply ask once.. instead of asking for each case on get and put functions....
//i could really really optimize the code here.... but dont worry now just finish the system first then optimize
	var B = o[contstr][kstr];
	//console.log(B); //we here and B is good....
//this little snipet here works on the parameter we specified on the command..
	if(B){
		for (var i = 0; i <= B.length-2; i+=2) {
			var p = B[i]; var v = B[i+1]; //var nv = v;
			if(p==sub){
				var outs = [cont,sub];//produce an output signal
				if(op){B[i+1]=op; outs.push(op);} //.. this also works... even tho am using B.. hm
			//polarity on random?... needs revision
				if(pol){B[i+1]=B[i+1]+pol; outs.push(B[i+1]);}
				if(outs.length==2){outs.push(v);}
				return outs
			}
		}	
		//if we are here, it means we didnt find a match for sub, because the beat doesnt have it
		//we could create some feedback on output, or we could simply create the new parameter and add it
		//into the beat.... that would be neat. but would only work with op because we can signal polarity into a
		//value that doesnt exist... unless we use the value of the state.. but what for..
		if(op){
			//hell yeah this works
			var strB = B.toString(); strB = strB+','+sub+','+op;
			o[contstr][kstr] = txtToB(strB);
		}
		
	}
}




//COMMAND ANNALIZER PEAK
const comA = function(S,C){ 

//If we use ':' at left side of '>>', we can make multiple lines to go into a container. space is used to split into lines so
//text must be properly formated to be picked by the system. returns and array with multilines on left side
	if(C[0]==':'){
// :multiliner>>RS
//we probably want the last line to be '>>something' and be its own line. yes i like this. ok so in order to use ':' , we need to
//do ' ' and '>>target' at the end always.. maybe we could improve this sinthax a bit
		var ml = C.substr(1);
		var mla = ml.split(' ');
		var RS = mla.pop();
		var RSml = RS.substr(2);//extract '>>'
		//if(RSml=='~/out')....
		var res = putRiValue(mla,RSml,S);//,0);
		return res //return end if operation wasnt succesful

	}

//we good here. hashtag has a more manageable structure now.
	if(C[0]=='#'){
		var MS = C.split('>>');
//# always needs >> .... BUT we want to do an exception with mirror. .. Because we want to be able to dump literals as beat into
//a mirror 
		if(MS.length>1){ // ??>>??>>??
//we want to make LSout into everything until the last '>>'.. and RS must be the last '>>'.. but first we check if its just a number
			var RSh = MS.pop(); var LSh = MS.join('>>'); var rmhash = LSh.substr(1); //we need to remove the #
			var LSout = []; 
//new and definitive way to check if value is a number we can work with or a combination of letters and number or just letters!!!!!!!!
			if(isNaN(rmhash)){LSout.push(rmhash); }else{ var num = parseFloat(rmhash); LSout.push(num);}
			//var litn = parseFloat(rmhash); var nan = isNaN(litn);
			//if(nan){LSout.push(rmhash);}else{LSout.push(litn);}
			//console.log(LSout[0],RSh);
		}else{return 'end'}

//we now only need to check if we can put the value of LSout into RS. so we need to evaluate RS as a put.
		var res = putRiValue(LSout,RSh,S);
		return res //return end if operation wasnt succesful
	}//#

//conditions need to be evaluated first
//we shouldnt have >> if we are here.. we use conditions to compare LS with RS 
	var MS = C.split('=='); //... ok its also working.. wait !!!!!!!!!
	if(MS.length==2){ // just 2 sides to compare
//conditions dont use # no more. literals will now used exlusively to create values to be used later. conditions check from text
//or other containers
		var LSout = getLeValue(MS[0],S);
		var RSout = getLeValue(MS[1],S);

//condition ==		
//check for left side as retrieve value.  check right side also as retrieve value. compare
		var lsout = LSout.toString();	var rsout = RSout.toString();
//return and let second ins run if any, return end if condition wasnt met.
		if(lsout==rsout){ if(lsout=='sig'){ return 'end'} return }else{ return 'end' }//lol this works just fine
	}// '=='

/*
so maybe we do need math .. i can imagine taking 2 values, puting them on a text, then using those values to perform
aditions , subtractions... and even divisions... or multiplications.. operation would return 'math/res' and then we use
res as LS for RS !!!!!!!!!!
o1/text/1++o1/text/2>>o2/circle/1/x
o1/text/1--o1/text/2>>o2/circle/1/x
o1/text/1%%o1/text/2>>o2/circle/1/x
o1/text/1**o1/text/2>>o2/circle/1/x
*/

/////!!!!!!!
//main split. if an operation is successful, we simply return, if we cant find the caster or the target, we return 'end' , so the
//instruction after '<>' if any, wont be executed
//we dont have # , : , == , all is left is checking if LS is a signal , a solo command or a retrieve commnand
	var MS = C.split('>>');
	if(MS.length>1){
//a signal, or a retrieve command. 
//we now ask for LS. we first check if its an orb, an stance refference or an entity. if does then getLeVal and use
//result to act upon RS 
//if no target match on LS, then its a signal, so it returns 'sig'. And signals operate differently on RS
		var LS = getLeValue(MS[0],S);
		if(LS=='end'){return 'end'}
//.. something is off here.. am returning 'sig' and just using it as LS
		if(LS=='sig'){
//anyway when we type a number on its own on compromt it prints 'sig' it shouldnt!!!!!!!!!!!!!!!!!
//so signals targets can now be literals or can point to a line on a list. we can always expect an orb or an entity name.
//so if LS is a signal, then RS needs to be a name. we only need to ask if it reffers to a text line or if its a literal
//... do we really need literals on signals targets?.. we already built the signal annalises function to work using the name
//of an orb or an entity.. thats all we need realy because the signal details all go on left side.. sig/k1/k2/k3>>target
//number of k will depend on signal...

//in case its not  a literal, we check if the target is trying to point us to a value on a text 
//.. we dont want to do all these stuf when we have a pol>>orb/text/line structure....!!!!!!!!!!!!!!!!!!!
//we need to do an exception for this one case
			var ST = MS[0].split('/')
			if(ST.length==1){//pol>>orb/text/line  exception
				var res = comRiTarget(MS[0],MS[1],S);		
				if(res=='end'){return 'end'} return
			}

			var sig = MS[0];
			var TT = MS[1].split('/'); //text target

			var oft = Fting(Orbs,'name',TT[0]); //orb from textline. or simply target orb if no text target
			var aft = TT[1]; //aspect from textline. 'text'
			var lft = TT[2]; // line from textline
			//if(oft==undefined){return 'end'}
	// signal>>oft/aft/lft
			if(aft=='text'){
				if(lft=='last'){
	// signal>>orb/text/last
					if(oft.txtLi.length==0){return 'end'}//nothing here
					var RST = oft.txtLi[oft.txtLi.length-1].txt; //right side target
					//return [lastl];
				}
				if(lft=='current'){
	// signal>>orb/text/current
					if(oft.txtLi.length==0){return 'end'}//nothing here
					var R = oft.txtLi[oft.txtB-1];
					if(R==undefined){return 'end'}
					var RST = R.txt; 
				}

	// signal>>orb/text/number
				if(RST==undefined){
					var rln = parseFloat(lft);//we need to turn ckey into a number
					let nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>oft.txtLi.length){return 'end'}
					var rl = oft.txtLi[rln-1];
					if(rl){var RST = rl.txt;}
				}

			}
	////////
			if(RST){
				var res = comRiTarget(sig,RST,S);		
				if(res=='end'){return 'end'} return
			}

			var res = comRiTarget(sig,MS[1],S);		
			if(res=='end'){return 'end'} return


			return 'end'//if its a signal but we still here, its nothing
		}//LS is a signal

//if LS is not 'sig', then is holds the value of the extracting operation , so now we want to putRiValue using LS and MS[1]
		var res = putRiValue(LS,MS[1],S);
		if(res=='end'){return 'end'}
		return

	}//'>>'

//if length is 1 , its a solo command

//if we still here, its an entity command with no '>>' nor '=='. It might also be a retrieve with or without '/' to be
//printed into the current stance orb if text aspect activated
	var com = getCom(C);
	if(com=='end'){return 'end'} //return true if it was a solo command
	if(com){return} //return true if it was a solo command

	//if com is undefined, is a retrieve into stance text
	var ret = getLeValue(C,S);
	if(ret=='end'){return 'end'}
	if(ret=='sig'){return 'end'} //fine.. if getLeVal doesnt find a target it return sig here..
	if(ret){//ret here is always an array
		var o = Fting(Orbs,'name',S);
		if(o){
			if(o.text){
//op generated here is directed by default into the current stance orb text . no '>>' 
//...put data on orb text if aspect activated
				o.txtLi = [];
				for (var i = 0; i <= ret.length-1; i++) {
					var text = ret[i];
					if(o.txtLi[i]){o.txtLi[i].txt=text;}else{
						var Line = DataLine();
						//Line.beats=dsignat;
						var firstf = dsignat.slice(0);
						Line.beats = [firstf];
						Line.x=o.txtX; Line.y=o.txtY;
						Line.txt=text;
						o.txtLi.push(Line);
					}
				}
				//remove lines from previous text if any. we just want what we created now
				if(o.txtLi.length>ret.length){o.txtLi.splice(ret.length);}

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
	//if(zai){//Slowly paint everything black
		//ctx0.clearRect((eX-800),(eY-200),1400, 300);//this is sooo funky
		
	//}

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

////////////////////translatessss.... working when done here

//.. if we could translate here.... because the problem is we are drawing .. before translating.. so we see the screen moving
//when everything has already been drawn.. we need to change that.... what if we just draw after all logic like we did long time
//before? at some point i thought it was better to just draw all at the start... and it did make sense in a way..because
//no matter how much time logic would take, drawings would be performed consistenly at the beggining of every heartbeat..
//because the idea is escalate the number of operations in time..
//but translates are being performed on logic check phase... and so this is why everything lags behind when we move the screen..
//ok its either we translate here before drawing , or me move all drawing phase to the end after logic !!!
	//maybe all signals could be moved here as well... that would make sense kinda..
//ok here. check for translate requests from previous heartbeat
	var ti = transLate.length; 
	while(ti--){var tr = transLate[ti]; ctx0.translate(tr[0],tr[1]);}
	transLate = [];

///////////////translates are a ting

//check sound cue.. we should only check for oscillators here
	var l = oscCue.length;
	while(l--){var s = oscCue[l]; hearAll(s,l);} //hearAll should be hearOsc needs a more precise name


//these functions are more related to hardware
	if(Sstr == ' '){}else{
		KeysFeed();
	} //needs to be independant from anim_f

	repeatSys(); //this ok?

//OK SO Entry is an input from box that is a command. Ein is an input from box that is normal text. 
//Eout is a returned value from Entry
//Entry
	if(Entry==undefined){}else{//run entity command
		//.. so right now we can even evaluate conditions using hashtag.....!!!! kinda neat.. am really pushing js here i think.tbh
		if(Entry[0]==':'||Entry[0]=='#'){comA(stancE,Entry);}else{
			var csplit = Entry.split('<>'); //comands split .. diamond symbol
//... so i think this down bellow is not crucial now that we solved the hashtag thing !!!!!!!!!!!!!!
			if(csplit.length>1){ //there is 1 or more <>. the second instruction is always after the last '<>'
				var secins = csplit.pop(); var firstins = csplit.join('<>');
				var end = comA(stancE,firstins); if(end=='end'){}else{comA(stancE,secins);}			
			}else{comA(stancE,Entry);}
		}
	}

//ORBS LOOP
	for (var i = 0; i < Orbs.length; i++) {

		var o = Orbs[i];
		if(o==undefined){break} //safe

//SCRIPT ASPECT
//so now we want to be able to cast more than a single command per beat. Command lines will now be separated by <>,
//for now max number of commands on the same line is 2 we just call comA on every <> split.. simple huh
		if(o.script){
//so o.o should only hold a command when we created an instruction. in here probly is the best place to clear o.o using the same
//technique we use to clear o.i . This little jugling secures o.o reading and clearing properly
			if(o.oz==o.o){ o.o=undefined; o.oz=Date.now();} 
			if(o.o!=undefined){ o.oz = o.o;}

			if(o.scR=='off'){}
			if(o.scR=='once'){ 
				var RL = o.scC[o.scB-1];//item 0 is line 1. we want to use B to understand we are accessing line 1
				if(RL){
					if(RL[0]==':'||RL[0]=='#'){comA(o.name,RL);}else{
						var csplit = RL.split('<>'); //comands split .. diamond symbol
						if(csplit.length>1){ 
							var secins = csplit.pop(); var firstins = csplit.join('<>');
							var end = comA(o.name,firstins); if(end=='end'){}else{comA(o.name,secins);}
						}else{comA(o.name,RL);}

					}
					o.scB++;
					if(o.scB>o.scC.length){o.scB = 1; o.scR='off';}
				}

			}
			if(o.scR=='loop'){ 
				var RL = o.scC[o.scB-1];//item 0 is line 1. we want to use B to understand we are accessing line 1
				if(RL){
					if(RL[0]==':'||RL[0]=='#'){comA(o.name,RL);}else{
						var csplit = RL.split('<>'); //comands split .. diamond symbol
						if(csplit.length>1){ 
							var secins = csplit.pop(); var firstins = csplit.join('<>');
							var end = comA(o.name,firstins); if(end=='end'){}else{comA(o.name,secins);}
						}else{comA(o.name,RL);}
					}
					o.scB++;
					if(o.scB>o.scC.length){o.scB = 1;} //o.scR='off';}
				}

			}
			if(o.scR=='repeat'){ 
				var RL = o.scC[o.scB-1];//item 0 is line 1. we want to use B to understand we are accessing line 1
				if(RL){
					if(RL[0]==':'||RL[0]=='#'){comA(o.name,RL);}else{
						var csplit = RL.split('<>'); //comands split .. diamond symbol
						if(csplit.length>1){ 
							var secins = csplit.pop(); var firstins = csplit.join('<>');
							var end = comA(o.name,firstins); if(end=='end'){}else{comA(o.name,secins);}
						}else{comA(o.name,RL);}

					}
				}
			}

		}//script aspect


//OSCILATOR ASPECT
		if(o.oscillator){
			if(o.oscR=='off'){
				if(o.oscPA){
			//we want to access every tone and shut it down
					for (var i2 = 0; i2 < oscCue.length; i2++) {
						//var TL = o.oscTL[i2];
						var ts = oscCue[i2];
						if(o.name==ts.origin){
							//.. we should use fade out here instead of just end 0
							ts.end=0;
						}	
					}
				}
			} 
			if(o.oscR=='play'){
				if(o.oscPA){}else{
					if(o.oscTL.length>0){
						for (var i2 = 0; i2 <= o.oscTL.length-1; i2++) {
							var TL = o.oscTL[i2];
							var os = {
					id:Date.now(), start:0, frequency:432, gain:0.07, fadein:0.3, fadeout:0.3,type:0,duration:1
							}
							//update state using tone line
							timeUp(os,TL);
							var osc = COsc(os);
				//we need an id to reffer to this tone state. orb/oscillator/1 should point us to the tone state generated
				//by the first line. so  osc.origin=o.name+i2
//but we should be able to make changes on the tone states timers more precisely.. maybe we can create changes from reading kdown
//or touch events directly and not in synch with heartbeat..
							osc.origin=o.name; osc.toneline=i2+1;
							oscCue.push(osc);
						}
				//we need to set run to a value to let the system know tones are running.
						//o.oscR='playing';
						o.oscPA = true;
					}
				}
			}
		}	

//IMAGE ASPECT
		if(o.image){
//all these visual Aspects probably need to set run to off when there are no beats to beat... or we could simply not run beatUp
//... and just leave run value as is. we probly dont want to just run off because users l have to set run on again thats not nice
			if(o.imgR=='off'){} 
			if(o.imgR=='loop'){ 
				if(o.imgF.length>0){
					beatUp(o.imgF,o.imgB,o.imgS); // o,o
					//We need to synch with orb position... . . images huh
		//well i think we want to use circle as refference ... or maybe rects . for now just circle !!!!!!!!!!!!
					//o.imgS.px=o.cirS.x; o.imgS.py=o.cirS.y;
					o.imgB++;
					if(o.imgB>o.imgF.length){o.imgB=1;}
					if(o.imgS.layer==0){visual_q0.push(o.imgS);} //[B]?
					if(o.imgS.layer==1){visual_q1.push(o.imgS);}
					if(o.imgS.layer==2){visual_q2.push(o.imgS);}
				}
			}
			if(o.imgR=='repeat'){
				if(o.imgF.length>0){
					beatUp(o.imgF,o.imgB,o.imgS); // o,o
		//layer could be on state, this way state beats could also affect layer so we can specify layer when we create mirrors.
					if(o.imgS.layer==0){visual_q0.push(o.imgS);} //[B]?
					if(o.imgS.layer==1){visual_q1.push(o.imgS);}
					if(o.imgS.layer==2){visual_q2.push(o.imgS);}
				}
			}
		}

//TRACK ASPECT
///*
		if(o.track){
//all these visual Aspects probably need to set run to off when there are no beats beat.!!!!!
			if(o.trackR=='off'){} 
			if(o.trackR=='loop'){ 
				if(o.trackF.length>0){
					beatUp(o.trackF,o.trackB,o.trackS); // o,o
					o.trackB++;
					if(o.trackB>o.trackF.length){o.trackB=1;}
					if(o.trackS.layer==0){visual_q0.push(o.trackS);}
					if(o.trackS.layer==1){visual_q1.push(o.trackS);}
					if(o.trackS.layer==2){visual_q2.push(o.trackS);}
				}
			}

			if(o.trackR=='repeat'){
				if(o.trackF.length>0){
					beatUp(o.trackF,o.trackB,o.trackS); // o,o
					if(o.trackS.layer==0){visual_q0.push(o.trackS);}
					if(o.trackS.layer==1){visual_q1.push(o.trackS);}
					if(o.trackS.layer==2){visual_q2.push(o.trackS);}
				}
			}
		}
//*/


//CIRCLE ASPECT
		if(o.circle){
//all these visual Aspects probably need to set run to off when there are no beats beat.!!!!!
			//if(o.cirF.length==0){o.cirR='off';}
			if(o.cirR=='off'){} 
			if(o.cirR=='loop'){ 
				if(o.cirF.length>0){
					beatUp(o.cirF,o.cirB,o.cirS); // o,o
					//We need to synch circle with orb position... . . ?
					//o.cirS.x=o.x; o.cirS.y=o.y;
					o.cirB++;
					if(o.cirB>o.cirF.length){o.cirB=1;}
					if(o.cirS.layer==0){visual_q0.push(o.cirS);} //[B]?
					if(o.cirS.layer==1){visual_q1.push(o.cirS);}
					if(o.cirS.layer==2){visual_q2.push(o.cirS);}
				}
			}

			if(o.cirR=='repeat'){
				if(o.cirF.length>0){
					beatUp(o.cirF,o.cirB,o.cirS); // o,o
					if(o.cirS.layer==0){visual_q0.push(o.cirS);} //[B]?
					if(o.cirS.layer==1){visual_q1.push(o.cirS);}
					if(o.cirS.layer==2){visual_q2.push(o.cirS);}
				}
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
				if(o.rectF.length>0){
					beatUp(o.rectF,o.rectB,o.rectS); // o,o
					//We need to synch circle with orb position... . .?
					//o.rectS.x=o.x; o.rectS.y=o.y;
					o.rectB++;
					if(o.rectB>o.rectF.length){o.rectB=1;}
					if(o.rectS.layer==0){visual_q0.push(o.rectS);} //[B]?
					if(o.rectS.layer==1){visual_q1.push(o.rectS);}
					if(o.rectS.layer==2){visual_q2.push(o.rectS);}
				}
			}
			if(o.rectR=='repeat'){
				if(o.rectF.length>0){
					beatUp(o.rectF,o.rectB,o.rectS); // o,o
					if(o.rectS.layer==0){visual_q0.push(o.rectS);} //[B]?
					if(o.rectS.layer==1){visual_q1.push(o.rectS);}
					if(o.rectS.layer==2){visual_q2.push(o.rectS);}
				}
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
				o.iz=Date.now();
			} //we good
			if(o.i!=undefined){

				if(o.txtB>o.txtLi.length){
					//get the difference
					var subs = o.txtB-o.txtLi.length;
					//add DataLines difference 
					for (var i2 = 0; i2 < subs; i2++) {
						var dli = DataLine();
						//dli.beats=dsignat; 
						var firstf = dsignat.slice(0);
						dli.beats = [firstf];
						dli.txt='';
						dli.x=o.txtX; dli.y=o.txtY;
						o.txtLi.push(dli);
					}
					//and place o.i text on o.txtB
					var ldli = o.txtLi[o.txtB-1];
					ldli.txt = o.i;
				}else{

					var dli = DataLine();
					//dli.beats=dsignat; 
					var firstf = dsignat.slice(0);
					dli.beats = [firstf];
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
					OL.state.txt=OL.txt;
					if(OL.state.layer==0){visual_q0.push(OL.state);} //[B]?
					if(OL.state.layer==1){visual_q1.push(OL.state);}
					if(OL.state.layer==2){visual_q2.push(OL.state);}
				}
			}
		}//text


	}//orb loop

/*
//refference.... am i doing something here that i need to also do on ALOrbs loop? ..

					if(RL[0]==':'||RL[0]=='#'){comA(o.name,RL);}else{
						var csplit = RL.split('<>'); //comands split .. diamond symbol
						if(csplit.length>1){ 
							var secins = csplit.pop(); var firstins = csplit.join('<>');
							var end = comA(o.name,firstins); if(end=='end'){}else{comA(o.name,secins);}
						}else{comA(o.name,RL);}
*/

//OK. noted. We need signals to... wait
//ALOrbs hold commands that require Orbs array to be already updated
//.. maybe this is the right instance to process signals comming from other entities.
//.. and actually the only command we probably want to process is orb/out.. that would be very clean. and i think it is the only
//commands we want to process.. because outputs are signals produced by all orbs and ents. .. and we probably always
//want to evaluate here for a second instructions.. thats the point of listening to signals.. to be ready to react to them!!!
	for (var i = 0; i < ALOrbs.length; i++) {
		var c = ALOrbs[i];
		if(c==undefined){break} //safe
		var csplit = c.com.split('<>');
		if(csplit.length>1){ 
			var secins = csplit.pop(); var firstins = csplit.join('<>');
			var end = comA(c.st,firstins); if(end=='end'){}else{comA(c.st,secins);}
		}else{comA(c.st,csplit[0]);}

	}//ALOrbs
	ALOrbs = []; //flush every heartbeat

//AND also we need to clear inout array instead of these Ein and Eout... ok we goose? no. we not goose. we want Ein and Eout

	Entry=undefined; Ein=undefined; Eout=undefined;

////////////



///////////
	
	const t1 = performance.now();

//track update time
	hEat = t1-t0;

}//update







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
		//all.stream_a.push("Enabling touch screen interface.."); all.screen_log();
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

//FIrst sequence. will change later. for now we just want to create useful scripts to keep working
var o = {
	name: "FirstSequence", script: true, cast: false,
	scR: "once", scB: 1,
	scC: [

/*
//Main Sequencer. Heart . control HeartBeat
"@Heart<>unseal/text/script>>Heart",
"#1>>Heart/text/1",
"@HeartBeat<>unseal/script>>HeartBeat",
"#+1>>Heart/text/1>>HeartBeat/script",
"#loop>>HeartBeat/script/run",
//Wait for user input. this is easy now. Just let user press enter and type in. orbs can evaluate ~/out .
"@WaitIn<>unseal/script>>WaitIn",
"#-1>>Heart/text/1>>WaitIn/script",
"#loop>>WaitIn/script/run", //to release the heart, we set off WaitIn. and we can always set it to wait again using #loop on run key
//VCSStream
"@VCStream<>unseal/text/script/circle>>VCStream",
"#r,..1?200,g,..1?200,b,..1?200,a,0.1,radius,900,inside,filled>>VCStream/circle/1",//>>VCStream/script",
"##loop>>VCStream/circle/run>>VCStream/script/1", //remember, when we want touse a literal on a literally stored instruction we need 2 "#"
//"", //call multiple oscillators to create white noise
//"#@NoiseIn<>unseal/script>>NoiseIn>>VCStream/script/2",
//"#+0.1/circle/1/a>>VCStream>>NoiseIn/script",
//Trigger Noise Begin
"@NoiseCue<>unseal/text/script>>NoiseCue",
"+100/text/x>>NoiseCue<>#200>>NoiseCue/text/1",
"#Heart/text/1==NoiseCue/text/1<>#once>>VCStream/script/run>>NoiseCue/script",
"#loop>>NoiseCue/script/run",

//Trigger Valeri Circle
//
*/


///*
//for testing purposes
//main scripter
"@Main<>unseal/text/script/circle/rectangle/oscillator/image>>Main",
"#Main>>~/stance",
"@MainPos<>unseal/script>>MainPos",
"#~/screenx>>Main/text/x<>~/screeny40>>Main/text/y>>MainPos/script/1",
"#loop>>MainPos/script/run",
"@THL<>unseal/text/script>>THL",
"##r,..4?25,g,-130,b,..20?50,x,..-1?2,y,0,layer,1,txt,-+-+-+-+-+-+-+,a,-0.1,is,txt,align,left>>%/text/current/mirror>>THL/script/1",
"#loop>>THL/script/run",
//skeys
"#name,Mstance,key,Home,com1,#Main>>~/stance>>~/skeys/new",
"#name,MSR,key,End,com1,#once>>Main/script/run>>~/skeys/new",
"#name,rmLine,key,Delete,com1,rmline/text/current>>%>>~/skeys/new",
"#name,coml,key,KeyO,com1,%/text/current>>~/comline>>~/skeys/new",
"#name,inl,key,KeyI,com1,%/text/current>>~/inline>>~/skeys/new",
"#name,back,key,KeyB,com1,-/text/cn>>%>>~/skeys/new",
"#name,next,key,KeyN,com1,+/text/cn>>%>>~/skeys/new",
"#name,OrbsList,key,Space,com1,~/orbs>>%/text>>~/skeys/new",
"#name,KeysList,key,ControlRight,com1,~/skeys>>%/text>>~/skeys/new",
//use wasd to move the selected orb aspect.. maybe a script can use a couple of lines to determine what orb and what aspect to move!!
//.. hard to do with aspect.. but maybe a different aproach. just create buttons on the fly for each ocassion. so when we press the
//control button while on a stance, we have a brief time to select an aspect. once we do, we call a script to create buttons
//acording to what we selected.. better yet.. we just select the option previously no need to quick select option
//but the orbs for displacing already exist and.. are already configured, we just use option button to link the set to WASD at any moment.
//Of course in this case WASD will use the stance orb % to send the displacement signals on the aspect we choose. this is the right
//way to do it i think
"@OrbAspSel<>unseal/text>>OrbAspSel",
//"AspRight",
//"AspLeft",
//"AspUp",
//"AspDown",
//ent movility
"@EntRight<>unseal/script>>EntRight",
"#+50/x>>~>>EntRight/script/1",
"#end>>EntRight/script/run>>EntRight/script/2",
"#name,Right,key,ArrowRight,com1,#once>>EntRight/script/run>>~/skeys/new",
"@EntLeft<>unseal/script>>EntLeft",
"#-50/x>>~>>EntLeft/script/1",
"#end>>EntLeft/script/run>>EntLeft/script/2",
"#name,Left,key,ArrowLeft,com1,#once>>EntLeft/script/run>>~/skeys/new",
"@EntUp<>unseal/script>>EntUp",
"#-50/y>>~>>EntUp/script/1",
"#end>>EntUp/script/run>>EntUp/script/2",
"#name,Up,key,ArrowUp,com1,#once>>EntUp/script/run>>~/skeys/new",
"@EntDown<>unseal/script>>EntDown",
"#+50/y>>~>>EntDown/script/1",
"#end>>EntDown/script/run>>EntDown/script/2",
"#name,Down,key,ArrowDown,com1,#once>>EntDown/script/run>>~/skeys/new",
///loop from 0 to 6.2 and back again to zero
"@Loop62<>unseal/text/script>>Loop62",
"#0>>Loop62/text/1",
"@Loop62B<>unseal/script>>Loop62B",
"#+0.01>>Loop62/text/1>>Loop62B/script",
"#loop>>Loop62B/script/run",
"@Loop62Limit<>unseal/text/script>>Loop62Limit",
"#6.2>>Loop62/text/2",
"#Loop62/text/1==Loop62/text/2<>#0>>Loop62/text/1>>Loop62Limit/script",
"#loop>>Loop62Limit/script/run",
//make a track fast
"@T<>unseal/track/text>>T",
"#-300>>T/text/x",
"#T>>~/stance"
//*/

	]

}
Orbs.push(o)


	//console.time('test');

}//sunya_init SUNYA INIT



//PRERENDERING
//A pre renderind update function to wait for user to type enter or touch screen. i dont want a condition here.
var preRendering = function(){
	//after user has revealed input method, ask if sunya should send an assistant or not
	//and only then run sunya . . 

	if(keyboardEnabled){SunyaInit("keyboard",true);}
	if(all.touch_enabled){SunyaInit("touch",true);}
	
	//all.anim_func();
	//requestAnimationFrame(preRendering);

}//pre rendering



heartBeat = setInterval(preRendering,60);



const prerHandler = function(ev){
	ev.preventDefault();
	//if (ev.which == 18){
//alt press on start messes up audio context init.. needs fix
	//	console.log("the alt ting..");
	//} 
	keyboardEnabled = true;
	document.removeEventListener('keyup',prerHandler);
}

document.addEventListener('keyup', prerHandler);//,{once:true, passive:false});

/*
//detect keyboard
document.addEventListener("keydown", e  =>{
	e.preventDefault();
	if (e.which == 18){
//alt press on start messes up audio context init.. needs fix
		console.log("the alt ting..");
	} 
	keyboardEnabled = true;
},{once:true, passive:false})
*/

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
