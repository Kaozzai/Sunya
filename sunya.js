//staring at my dream. a reflection on the water. a dream i forged. i give shape to my hope in this fountain.
//a forge of light. 

////SUNYA////



var all = {};//this will go soon. keeping it for phone things refference

//PEAK GLOBALS
//Sunya Globals
var kaoz = false;//false;//undefined; //where is zai? :(
var wev = true;
//var zai = 0.5;//false;//undefined; //deprecat..
var keyboardEnabled = undefined;
var jsonIn=false;
var ALL = undefined; //container for tests... json formating
//time update tracker
//var tut = undefined;
var regxt = new RegExp('text'); //just define regex once on globals ///////////testing
//var regxt = /text/; //is this faster?
var regxi = new RegExp('/in');
var regxo = new RegExp('/out');

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
//not anymore. one array for each orb Aspect...
var scriptOrbs = [];
var textOrbs = [];
var circleOrbs = [];
var rectOrbs = [];
var imageOrbs = [];
var oscOrbs = [];
var audioOrbs = [];

var ghOsts =[];

var ALOrbs = []; //after loop Orbs commands
var staNce = ['~']; //all stances
var stancE = '~'; //The ent or memory orb that will respond to commands with no target

var eF = []; //array to conain all script feedbacks
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

//Entity shortcuts. 
var EkeyS = [										// /keys


/*
so we can create a script that listen to the names of new orbs created and when a specific name matches it processes it in a specific
way . embed circle form to Jin when created, and call run on a script to process Jin
circleform>>Jin,#once>>JinProcess/script/run
OK we need a command to delete an orb.. am strugling with this one.. because it doesnt feel right to be able to woosh an orb like that
somehow.. 
*/


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
		align:'center', font:"30px arial",
		r:230, g:230, b:230, a:0.8, 
		x:eX+window.innerWidth/2,
		y:eY+window.innerHeight/2,
		is:'txt', txt:'',
		layer:2 //not even using Kfeed layer tho

	}//a special txt state.	
}




const OrbSoul = function(){
	var id = Date.now(); var idn = id.toFixed(0);
	o = {
		x:eX , y:eY,
		//screenx:1, screeny:1, random:[],
		name:idn, //?
		//sFop:undefined, sFtar : [], sFres:false
		sfeed:[]
	}
	return o
} //OrbSoul





const SoulSeal = function(o,asp){
	if(o[asp]){return}
	switch(asp){

		case 'script':
			if(o.script==false){o.script=true; return}
			o.script=true;
			o.o=undefined;   //o for command out.. the current command running ?
			//o.cast = false; //boolean for after loop cast
			//o.screenx = []; o.screeny = []; o.random = [];
			//o.offsx=0; o.offsy=0; o.tradx=0; o.trady=0; o.cx=0; o.cy=0; o.posx=0; o.posy=0;
			o.scR='off'; o.scB=1; o.scC=[];
			o.Asp='script';
			o.arr='scriptOrbs';
			return true//arr
			//break

		case 'text':
//ok so now am thinking maybe text aspect needs a signature to act upon all textlines by default. this signature is used
//everytime the textorb produces a line. and we can also customize this signature of course. 
			if(o.text==false){o.text=true; return}
			o.text=true;
			var firstf = dsignat.slice(0);
			o.signat = [firstf];
			//o.txtX=eX; o.txtY=eY;
		//..i think we need control on spacer as well.. and size
//size needs to be correlated with spacer.... fuck it lets make it customizable as well. Lets keep font as a beat parameter,
//but size and spacer as a text aspect parameter so when we change those, it affects all lines. Just like txtX and txtY. This
//will simplify managing texts. a s.font looks like this s.font='style sizepx font'
//styles: 'normal' , 'italic', 'bold'
//font: 'serif' ,'arial', 'courier new', 
//style size, spacer and font need to be built using these params everytime a new line is created.
//.. text signat should be applied on dESpacer..!!!! we can modify everyline with its personal beat, but we first
//should apply signat by default
			o.tspacer=17; o.tsize=18; o.tstyle = 'normal'; 
			o.tfont='arial';//'courier new'; 
			o.talign = 'left';
			o.i=undefined; o.inop = 'insert';
			o.txtB=1;
			o.txtLi=[];
			o.Asp='text';
			o.arr='textOrbs';
			return true//arr

		case 'circle':
			if(o.circle==false){o.circle=true; return}
			o.circle=true;

//we now want a default beat with all possible params. .maybe we can still put in dsignat for colors, but each aspect has their own
//unique parameters..!!!!
			var firstf = dsignat.slice(0);
			firstf.push('a',0.8,'x',0,'y',0,'radius',50,'inside','filled','layer',0);
			o.cirF = [firstf];
			o.cirB=1; o.cirR='repeat'; //o.cirL=1;
			o.cirS={
				r:230, g:230, b:230, a:0.8, cx:eX, cy:eY,
				x:0, y:0,
				radius:50, is:'circle', inside:'filled', wait:0, waitc:0,
				layer:0//,
				//scan: false, scanl:[], scanto:''
			};

			o.Asp='circle';
			o.arr='circleOrbs';
			return true//arr


		case 'rectangle':
			if(o.rectangle==false){o.rectangle=true; return}
			o.rectangle=true;
			//o.rectF=dsignat;
			var firstf = dsignat.slice(0);
			firstf.push('a',0.8,'x',0,'y',0,'w',60,'h',60,'inside','filled','layer',0);
			o.rectF = [firstf];
			o.rectB=1; o.rectR='repeat'; //o.rectL=1;
			o.rectS={
				r:230, g:230, b:230, a:0.8, cx:eX, x:0, cy:eY, y:0, w:60, h:60, is:'rect',
				inside:'filled', wait:0, waitc:0,
				layer:0
			};
			o.Asp='rectangle';
			o.arr='rectOrbs';
			//var arr = 'rectOrbs';
			return true//arr
			//break

		case 'image':
			if(o.image==false){o.image=true; return}
			o.image=true;
			o.imgfile=undefined;
//and a default frame.... we dont need a default frame. this one is created when an image file is loaded into the orb
			o.imgF=[
				//['x',0,'y',0,'w',0,'h',0,'px',0,'py',0,'pw',0,'ph',0,'a',1,'layer',0]
			];
			o.imgB=1; o.imgR='repeat'; //o.imgL=0;
			o.imgS={
				img:undefined,  is:'img', wait:0, waitc:0,
				x:0, y:0, w:0, h:0, px:0, py:0, cx:eX, cy:eY, pw:0, ph:0, a:1,
				layer:0
			};
			o.Asp='image';
			o.arr='imageOrbs';
			return true//arr

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
			o.Asp='audio';
			o.arr='audioOrbs';
			//var arr = 'audioOrbs';
			return true//arr
			//break


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
	//.. we want oscB to manage the tonelines, even tho osc are different, we dont beatUp, we can still use beat mechanic to
	//select tonelines
			o.oscB=1; 
			o.oscR='off'; 
			o.oscPA=false;
			o.Asp='oscillator';
			o.arr='oscOrbs';
			//var arr = 'oscOrbs';
			return true//arr
			//break

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

/*
OKok so .. make tonelines dont self remove when they go off, just use fadeout parameter to end sound not abruptly. Tonlines
dont need to disapear, we can keep them off , change them and play again.
An interface needs a timeline  in loop. we want a sequencer. horizontal displacement (x) controls position in time, vertical (y)
controls frequency... ok but we want basic things
*/

	var o = Fting(oscOrbs,'name',s.origin);
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
			//var o = Fting(oscOrbs,'name',s.origin); //... why am is asking again here? isnt o already defined?
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
		
		beats:[],
		state : {
			is:'txt',
			txt:'',
			font:undefined,//'18px Courier New', //do we need font here.. ?
			align:undefined,//'left', //by default could be left
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
//... 
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
	if(beat==undefined){return} //!!!!!!!!
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
		var dl = o.txtLi[i];
//we should add signat here....!!!!!!!!!!
		var font = o.tstyle+' '+o.tsize+'px '+o.tfont;
		dl.state.font = font;
		dl.state.align = o.talign;
		//dl.state.y=o.txtY+spacer; dl.state.x=o.txtX;
		dl.state.y=o.y+spacer; dl.state.x=o.x;
		//if(dl.txt=''){}
	spacer = spacer+o.tspacer;
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
//
//ok... we need to fix the weird displacing thingy... its annoying. not really fixed but understood. wont be a problem no  more
const repeatSys = function(){
	if(keyD.length>0){
		var l = keyD.length;
		while(l--){
			var kd = keyD[l];
		////////........... it works..
			//console.log(kd.str);
			var En = kd.str;
			if(En[0]==':'||En[0]=='#'){comA(stancE,En);}else{
				var csplit = En.split('<>'); //comands split .. diamond symbol
	//... so i think this down bellow is not crucial now that we solved the hashtag thing !!!!!!!!!!!!!!
				if(csplit.length>1){ //there is 1 or more <>. the second instruction is always after the last '<>'
					var secins = csplit.pop(); var firstins = csplit.join('<>');
					var end = comA(stancE,firstins); if(end=='end'){}else{comA(stancE,secins);}			
				}else{comA(stancE,En);}
			}
			//Entry = undefined;
		}
	}

	//Entry = undefined; //... is this ok now?

}//repeat keys sys


//Math.abs(number)   Returns absolute values only, geting rid of negatives. Might be interesting later..

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
//way. ok we are now playing with all parameters.
const getTrackPos = function(offsX,offsY,trackRadX,trackRadY,trackCX,trackCY){
	return {
		x:Math.round(trackCX + Math.cos(offsX) * trackRadX),
//radu uses "-" instead of "+" here when getting 'y' to start off by drawing upwards... hmmmm!!!!!
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
		if(s.inside=="empty"){
			//`hsl(${s.hue}, 100%, 50%)`  //another way to get color is using hue , saturation and lightness
			//
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




	if(s.is=='circle'){
//i know asking this everytime is not good, but we would rather ask here,once, than in every other instance
		if(s.radius<1){s.radius=1;} 
		c.save();
		c.beginPath();
		var X = s.x+s.cx; var Y = s.y+s.cy;
//also, we can do
//c.fillStyle="white"; c.strokeStyle="red"; and then we fill and stroke to get different colors inside and on stroke radius
//we can also change the c.lineWidth=some number .. so yeah this needs to go somewhere. Lines can do other things like dashing etc
		if(s.inside=="empty"){
			c.strokeStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
//remember we use the last boolean parameter set to true, to draw counter clockwise and false for clockwise here on arc method..
//.. and maybe we actually dont need to set this at true by default at all..
			c.arc(s.x+s.cx,s.y+s.cy,s.radius,0,2*Math.PI);//,true);
			c.stroke();
		}
		if(s.inside=="filled"){
			c.fillStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
			c.arc(X,Y,s.radius,0,2*Math.PI);//,true);
			c.fill();

//I was tying to do this from here. But it was way more simpler to be done elsewhere
//all this deprecatz
//ok so we can actually just ask in here. but we use an array to ask for all requested points.?
//so if this state is a txt orb prim, it could simply ask to an array holding outputs
//we could just push all outputs into an array and flush it at the end of the heartbeat
//.. so we have 2 arrays. one holds the location of the targets we are looking for and the second holds the matches?. on match we just
//ok am not even totally of implementing this or if its even necesary so pause
/*
			if(s.scan){
				//debugger
				var allp = [];
				for (var i = 0; i < s.scanl.length; i++) {
					var p = s.scanl[i];
//ctx0.translate(-eX+window.innerWidth/2, -eY+window.innerHeight/2); ..... omg.... wasted a whole day finding this . f hell
					//var inArea = c.isPointInPath((p[0]-eX)+window.innerWidth/2, (p[1]-eY)+window.innerHeight/2);
					var inArea = c.isPointInPath(p[0]+window.innerWidth/2, p[1]+window.innerHeight/2);
					if(inArea){allp.push(p[2]);}
				}
				if(inArea){
					//console.log(allp);
					var tt = Fting(textOrbs, 'name', s.scanto);
					if(tt){
						if(tt.text){
							for (var i = 0; i < allp.length; i++) {
								var text = allp[i];
								if(tt.txtLi[i]){tt.txtLi[i].txt=text;}else{
									var Line = DataLine();
									var firstf = tt.signat.slice(0);
									Line.beats = [firstf];
									var font = tt.tstyle+' '+tt.tsize+'px '+tt.tfont;
									Line.state.font = font;
									Line.state.align = tt.talign;
									Line.x=tt.x; Line.y=tt.y;
									Line.txt=text;
									tt.txtLi.push(Line);
								}
							}
							if(tt.txtLi.length>allp.length){tt.txtLi.splice(allp.length);}
							dESpacer(tt);
						}
					}
				} //in area

		//...so this is not really reseting the state from the orb.... hmmm....
				//s.scan = false; s.scanl = []; s.scanto = '';

			}//circle scan
*/


		}
		c.restore();
		return
	}



	if(s.is=='txt'){
/*
textAlign = value
Text alignment setting. Possible values: start, end, left, right or center. The default value is start.
textBaseline = value
Baseline alignment setting. Possible values: top, hanging, middle, alphabetic, ideographic, bottom. The default value is alphabetic.
direction = value
Directionality. Possible values: ltr, rtl, inherit. The default value is inherit.
*/
		c.save();
		c.fillStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
		c.font = s.font;
		c.textBaseline='top'; //we can do this as well to align vertically
		c.textAlign=s.align;
		//c.strokeText can also do some funky stuff
		//c.fillText(s.txt,c_x,c_y);
		c.fillText(s.txt,s.x,s.y);
		c.restore();
		return
	}


//we want lines now.. i find interesting that we can build lines to let aspects use them as tracks.
//{is,r,g,b,a,sx,sy,tx,ty}
//lines can do
//c.beginPath();  , c.moveTo(x,y); ,  c.lineTo(x,y); ,   c.lineWidth=number; , c.strokeStyle= ... isPointInStroke() ....
//c.setLineDash([n1,n2,n3...]); , use c.setLineDash([]); to turn into normal line again
	if(s.is=='line'){
		c.save();
		c.strokeStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
		c.beginPath();
		c.moveTo(s.sx,s.sy);
		c.lineTo(s.tx,s.ty);
		c.stroke();
		c.restore();
		return
	}


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
var visual_q3 = [];//layer 3



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
chat_in.style.fontFamily='Arial';
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
		if(jsonIn){
			if(chat_in.value==""){
				jsonIn=false; chat_in.blur(); chat_in.style.display="none";
				return
			}
//ok so we want to restart from the new data or we want to ADD these orbs into the existing ones.. kinda tricky.. we should be able to
//recall groups of orbs specifically but this option prbably is ok if it replaces all arrays with input data, we want to restore a state
//of the run completely. for now. needs better names than jsonin jsonout i think
//var all = [textOrbs,scriptOrbs,imageOrbs,circleOrbs,rectOrbs,oscOrbs,audioOrbs];
			ALL = JSON.parse(chat_in.value); //how does this look
//here we need to identify if its a replace with new load request, or we are just recovering a group of orbs and dont want to erase
//current run data. 
			//if we only have an array filled with orbs, then we ask if orb names dont conflict and push them on proper arr

			if(ALL[0].name){
				for (var i = 0; i < ALL.length; i++) {
					var o = ALL[i];
					for (var i2 = 0; i2 < staNce.length; i2++) {
						if(staNce[i2]==o.name){ var dont = true; break}
					}
					if(dont){}else{
						window[o.arr].push(o); staNce.push(o.name);
					}
				}
			}else{		
				//for replace load do this
				audioOrbs = ALL.pop();
				oscOrbs = ALL.pop();
				rectOrbs = ALL.pop();
				circleOrbs = ALL.pop();
				imageOrbs = ALL.pop();
				scriptOrbs = ALL.pop();
				textOrbs = ALL.pop();
			}
			chatOn = false;
			jsonIn=false;
			chat_in.value = ""; chat_in.blur(); chat_in.style.display="none";
			return
		}

		if(nLine){
//So we are just producing a string on Ein here now. Let orbs handle what to do with it on orbs updates.!!!!
//We CAN input numbers on Ein and they will be parsed here for now..
			if(chat_in.value==''){
				Ein=undefined;
			}else{
				Ein=chat_in.value; 
				//We wanto turn number strings into numbers
				if(isNaN(chat_in.value)){
					Ein=chat_in.value;
				}else{
					Ein=parseFloat(chat_in.value); chat_in.value = Ein;
				}
//what if we just run a command. '~/inline>>'+stancE+/in . So now we just check for o.i . Looks much cleaner
//.. ok s instead of this funky command, we use a tag to manage input behavior.
//if normal, generate Entry, if not, generate Ein. Let orbs manage what to do with Ein data.
//we could now design a script to set Ein tag on, and set text orb insert or replace operation to store the content of Ein
//ein    a signal to activate nLine   entry a signal to activate command line? .. maybe not for entry
//~/in>>%/in<>
//
				//var inp = '~/inline>>'+stancE+'/in'; //!!!!! there is /in on ~/inline...
				//comA(undefined,inp);
//ok so we need o.i to hold input messages now. Yeah we should be able to access this. Like, other orbs listenning to the input
//changes on other orbs. thats interesting
			}

			chat_in.value = ""; //chatOn = false;
			chat_in.blur(); chat_in.style.display="none";
			chatOn = false;
			nLine=false;
			return

		}//nLine

		if(chatOn == true){
//PEAK	
//let normal enter become a command prompt
//to create an new input, press enter again. phones can simply use a button to enter commands prompt and another button to enter
//a new input line... maybe we could to the same for keyboards. just call comprompt on Enter, and call inputprompt with a command
//comprompt , inprompt ... yes double Enter is a bit confusing.... actually... we could simply use a script to.. wait 
			///PEAK
			//user presed enter while no value on input, so we call inprompt
			if(chat_in.value==''){
				//Ein=undefined;
	//... i think we dont want double enter to call nLine anymore. we should use a signal to call inprompt, nline
	//this way users can simply asign a key to it. Enter should be exclusively for commands... leave it for now
	//we could use Insert to call for inprompt !!!!!!!!
				//nLine=true; 
				//chatOn = false; //
				//return
			}else{Entry=chat_in.value;}

			//Entry=chat_in.value;
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
		if(chatOn==true){
			chat_in.value = "";  chat_in.blur(); chat_in.style.display="none";
			chatOn=false; nLine=false; jsonIn=false;//PEAK
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
//in chrome i think only, Tab while left pressed, starts ignoring preventDefault
	if (ev.code == 'Tab'){//&& ev.target == document.body){
		ev.preventDefault(); 
		//just ask in a specific box what to run and make an orb key to be written
		//Tab should simply make the orb run the script once.
		//Sstr=SstrL+ev.code; SstrT = 0;//by default , at every key stroke, timer should be reset
		//return
	}



	if(chatOn == false&&nLine==false&&jsonIn==false){
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
			//console.log(kd.k);
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

//a command to call inprompt. 
//ein
	if(C=='ein'){ 
		nLine=true; chat_in.style.display="inLine"; chatOn = true; chat_in.focus(); 
		////const scriptF = function(ca, ta, res, type)
		
		return true
	}
	
	if(C=='loadimage'){
//loadimg . create a buffer for an image file on local machine 
		Eout='loadimage'; img_in.click(); return true
	}
	if(C=='loadaudio'){
//loadaudio . local audio file buffer into the browser
		Eout='loadaudio'; audio_in.click(); return true
	}

//these are fun.....
	if(C=='kaoz'){kaoz = true; return true}

	if(C=='zai'){kaoz = false; return true}

	if(C=='wev'){wev = true; visual_q3=[]; return true}

	if(C=='vew'){wev = false; visual_q3=[]; return true}

//we need a command to capture images on the screen... and create an image buffer.... maybe its a rectangle aspect key skill.....
	//
//A command to save all orbs. .. lets just parse all orbs objects and create a text on ~/inprompt
//var newo = JSON.parse(JSON.stringify(to));
//PEAKPEAK .. now we want to go trough all orbs arrays.....!!!!!!!!
//we could say jsonout/textorbs , etc, or maybe we could just say jsonout/targetorb ... that would be handy
//OR even better, we could do jsonout>>orb/text , and stringify all orb on the list. but on its own, jsonout
//could simply stringify all orbs.. and shortkeys?
	if(C=='jsonout'){
//so we need to stringify all 7 aspectOrbs arrays now. maybe we can put all arrays into one before stringifying
		var all = [textOrbs,scriptOrbs,imageOrbs,circleOrbs,rectOrbs,oscOrbs,audioOrbs];
		var jsonall = JSON.stringify(all);
		//var texto = JSON.stringify(textOrbs);
		//var scripto = JSON.stringify(scriptOrbs);
		//var imageo = JSON.stringify(imageOrbs);
		//var circleo = JSON.stringify(circleOrbs);
		//var recto = JSON.stringify(rectOrbs);
		//var osco = JSON.stringify(oscOrbs);
		//
		//var all = JSON.stringify(Orbs);
		//var alldata = op.join(' ');
		chat_in.value = jsonall//all;//op[0]//we want RSout here
		chat_in.style.display="inLine";
		chatOn = true; 
		nLine = true; //inline prompt
		chat_in.focus();
		return true
	}
//Accept a json string array from input box with orbs structures
	if(C=='jsonin'){ chat_in.style.display="inLine"; jsonIn = true;  chat_in.focus(); return true }

//ok so we need a command to stop all activity in order to be able to check when something did something that doesnt make sense...
//would be ideal to stop the heartbeats, but that would also stop the tools of sunya to annalize what went wrong... we need a way around this

	return
}//getCom



//we should be able to say delete>>orb/text/1 and leave this on an orb as an instruction. so comRiTarget only could evaluate
//RS text like this... but its a problem because some signals use orb/key as target.. left>>orb/text .. left>>orb/text/1
//so maybe we can throw an exception here, since all we really want is to use specific lines as targets, so its always 2 '/' on
//right side. Other signals use max 1 '/' on right side.. but this is kinda inconsistent
//however we do want to be able to create a list of names and use them to create orbs.
//WE cCOULD by default evaluate RS from comRiTarget as RSout instead of orb/key format.. this would keep consistency and allow
//for more versatile signal script writing.... !!!!!!
//return undefined on success, return 'end' otherwise

//var res = comRiTarget(LS,RS,S);
//signals are:  s0/s1/s2...>>orb/text ... maybe we dont really need anything else but a refference to a text or a text line
//with a content that will respond differently depending on the signal.
//in any case , i think we first need to check if RS[1] =='text', so we can check for the text content . signals can
//work on multiliners, single lines, names of orbs, retrieve commands with '/', words and comma specified format lines
//and raw numbers... and why not literals

//feed stuctures
//targ.push({name:tor.name,res:res});
//eF.push(['transfer',undefined,targ]);
//lo.sfeed.push(['transfer',undefined,targ]);

const comRiTarget = function(sig,tar,S){//LS,RS,S .. is better .. not sure if we need S now because to was taken considering S already..
//define target

	if(tar[0]=='~'){var ent = true;}
	if(tar[0]=='%'){var to = FFting('name',stancE);}//this might need tunning. we could also reffer to entity!
	if(tar[0]=='$'){var to = FFting('name',S);}
	if(to==undefined){var to = FFting('name',tar[0]);}
	//var to = FFting('name',tar[0]);
//we can pobly put many of these under a single if(to) ....
	if(to){
		if(tar[1]=='text'){
			if(to.Asp=='text'){
				var line = tar[2];
				var mult = [];
				if(line==undefined){
					for (var i = 0; i < to.txtLi.length; i++) {
						var tl = to.txtLi[i].txt;
						mult.push(tl);
					}
				}
	//if no line i guess we got nothing to do here do we... can we just skip tests? maybe a switch here instead of asking
	//for each different case
				//if(to.txtLi.length==0)
	//we should we be able to work with most of these....
//signals on signat as target dont sound very promising... not even for polarity
	// orb/text/signat>>
				if(line=='signat'){var txtsignat = to.signat;}
	// orb/text/align>>
				if(line=='align'){var txtalign = to.talign}
	// orb/text/style>>
				if(line=='style'){var txtstyle = to.tstyle;}
	// orb/text/font
				if(line=='font'){var txtfont = to.tfont;}
	// orb/text/size>>
				if(line=='size'){var txtsize = to.tsize;}
	// orb/text/spacer>>
				if(line=='spacer'){var txtspacer = to.tspacer;}
	// orb/text/last>>
				if(line=='last'){
					if(to.txtLi[to.txtLi.length-1]){mult.push(to.txtLi[to.txtLi.length-1].txt);}
					//if(to.txtLi.length==0){}else{mult.push(to.txtLi[to.txtLi.length-1].txt);}
				}

	// orb/text/current>>
				if(line=='current'){
					if(to.txtLi[to.txtB-1]){mult.push(to.txtLi[to.txtB-1].txt);}
					//if(to.txtLi.length==0){}else{mult.push(to.txtLi[to.txtB-1].txt);}
					//console.log(mult[0]);
				}
	// orb/text/cn>>
				//no need for this one, we might do orb/aspect/cn
				//if(line=='cn'){var txtb = to.txtB;} //we need to be able to change the selected line with pol if we find this

	//orb/text/number>>
				if(line!=undefined){//if stil here, we ask if this is a number we can work with
					var rln = parseFloat(line);//we need to turn ckey into a number
					if(isNaN(rln)){}else{
						if(rln>to.txtLi.length){return 'end'}
						var rl = to.txtLi[rln-1]; //but wemightwant to create thisline...!
						if(rl){mult.push(rl.txt);}
					}
				}

			}//target is in text
		}
	}


//If RS has no aspect specified we can simply use the word as an orb new name. simple. if RS[1] == 'text', then we use the text to
//create multiple orbs using the text lines.. remmeber to check if all the things we need exist always
// if mult == undefined, just take tar[0] as a newname



	if(sig[0][0]=='@'){
// @aspect>>newname  ,  orb/text  , orb/text/line
		var targ = [];//
		if(mult){
			var norbs = [];
			for (var i = 0; i < mult.length; i++) {
				var onam = mult[i];
				var pass = true; var l1 = staNce.length;
				while(l1--){if(onam==staNce[l1]){var pass = false; break} }
				if(pass){norbs.push(onam);}
			}
			for (var i = 0; i < norbs.length; i++) {
				var o = OrbSoul(); o.name=norbs[i]; SoulSeal(o,sig[0].substr(1));
				window[o.arr].push(o); staNce.push(o.name);
				targ.push({name:o.name,res:undefined});//
			}

			if(norbs.length>0){
				eF.push(['core',undefined,targ]); return
			}else{
				eF.push(['core','end',targ]); return 'end'
			}
		}else{
			//look if the name already has been asigned to an orb. what if it has
			let l1 = staNce.length;
			while(l1--){
				if(tar[0]==staNce[l1]){
					eF.push(['core','end',targ]);//
					return 'end'
				} 
			}

			//nameless orb cannot exist
			if(tar[0]==''){eF.push(['core','end',targ]); return 'end'}

			var o = OrbSoul();  SoulSeal(o,sig[0].substr(1)); o.name=tar[0]; 
			staNce.push(o.name); window[o.arr].push(o);
			targ.push({name:o.name,res:undefined});//

			///lets inmediately store the orb index on itself maybe? maybe later its a god idea idk
			///sw2i = scriptOrbs.indexOf(sw2);

			eF.push(['core',undefined,targ]);//

			return
		}

	}// @



	if(to){




//... yeah we should be able to also remove beats from aspects.!!!!!!!!
//EDat/text/2==#circle<>#6>>RmBeat/script/cn
//line 6.. rmline/circle/current>>%
//rmline can simply be written like this now:

//rmline>>orb/text/line    ,  use all to remove all lines or beats		
		if(sig[0]=='rmline'){
			var targ= []; //
//this is fine. maybe later we can implement rmline to remove multiple line targets!! Do we want to be able to remove lines from
//entities containers?.maybe
			switch(tar[1]){
				case 'text': var contstr = 'txtLi'; var bstr = 'txtB'; break
				case 'script': var contstr = 'scC'; var bstr = 'scB'; break
				case 'circle': var contstr = 'cirF'; var bstr = 'cirB'; break
				case 'rectangle': var contstr = 'rectF'; var bstr = 'rectB'; break
				case 'image': var contstr = 'imgF'; var bstr = 'imgB'; break
				//case 'track': var contstr = 'trackF'; var bstr = 'trackB'; break

	//maybe we can modify both tone line and the state tone itself if playing.. both from here. we actually want to remove the
	//tone line so if o.oscPA, then we also need to end the tone asociated.. but probably a nice end, so we request fade out, not just
	//remove the state, we dont want the poping sound
				case 'oscillator':
					var contstr = 'oscTL'; 
					if(to.oscPA){
			//... what about rmline/oscillator/all ... should remove all tone lines.
						var k = parseFloat(tar[2]);
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

			switch(tar[2]){
				case 'all':
					var kstr = 'all';
				case 'current':
					var kstr = to[bstr]-1;
					if(isNaN(kstr)){return 'end'}
					break
				case 'last':
					var kstr = to[contstr].length-1; break
					if(isNaN(kstr)){return 'end'}
				default:
					//line is a number now.. not sure if parse is necesary again.. ? 
					var k = parseFloat(tar[2]);
					var kstr = k-1; 
					if(isNaN(kstr)){return 'end'}
					break
			}
//feed stuctures
//targ.push({name:tor.name,res:res});
//eF.push(['transfer',undefined,targ]);
//lo.sfeed.push(['transfer',undefined,targ]);
			//
//sig		an array holding '/' parts of LS
//tar		an array holding '/' parts of RS
//to		a target orb from RS . holds an orb structure, or '~' ?
//S		a stance as string
//mult		an array holding 0 or more lines from a text specified as target
//txtalign	access to the target text align directly, to work with polarity, we need to use the number to idea array technique
//pol		a number we want to add to something

//rmline>>orb/aspect/all    ,  use all to remove all lines or beats	
			if(tar[2]=='all'){
				//if(k1=='oscillator'){} ////we need to remove all oscillator tones if active..
				to[contstr].splice(0); return
			}

	//now we check if this line exists, if so then remove it.
			var B = to[contstr];//[kstr];
			if(B[kstr]){
				to[contstr].splice(kstr,1); 
				if(tar[1]=='text'){
					dESpacer(to);
					//Eout = 'rmline>>'+to.name//target;//we need a better output structure to annalize i think
				}

//ok so rmline could be comming from a script orb, or an entity.
				//scriptF peak
				targ.push({name:to.name,res:undefined});
				if(S=='~'){eF.push(['delete',undefined,targ]);}
				var st = FFting('name',S);
				if(st){st.sfeed.push(['delete',undefined,targ]);}

				return
			}		

			return 'end' //return end if no rmline match because the operation failed and so second ins if any cant execute
		}//rmline



//seals or unseals multiple orbs. text needs to hold target orbs names
// seal>>targetorb   , orb/text ,  orb/text/line  .  this is what we want now and here
//seal and unseal is the same... if no aspect, we just use the word to check if the orb exist 
		if(sig[0]=='seal'){
	//we only can seal orbs that already have been created. And we can only seal the aspect that was previously unsealed.
//scriptF peak
//targ.push({name:to.name,res:undefined});
//if(sig[0]=='~'||S=='~'){eF.push(['delete',undefined,targ]);}
//var st = FFting('name',S);
//if(st){st.sfeed.push(['delete',undefined,targ]);}

// maybe we need a different circle form for seal and unseal?
			var targ = [];
			if(mult){
				for (var i = 0; i < mult.length; i++) {
					var sealo = FFting('name',mult[i]); 
					if(sealo){
						sealo[sealo.Asp]=false;
						targ.push({name:sealo.name,res:undefined});//
					}
					
				}
				if(sealo){
					if(S=='~'){eF.push(['signal',undefined,targ]);}
					var st = FFting('name',S);
					if(st){st.sfeed.push(['signal',undefined,targ]);}
					return
				}
			}else{
				if(to[to.Asp]!=undefined){
					to[to.Asp] = false; 
					//scriptF
					targ.push({name:to.name,res:undefined});//
					if(S=='~'){eF.push(['signal',undefined,targ]);}
					var st = FFting('name',S);
					if(st){st.sfeed.push(['signal',undefined,targ]);}
					return 

				}
			}
			if(S=='~'){eF.push(['signal','end',targ]);}
			var st = FFting('name',S);
			if(st){st.sfeed.push(['signal','end',targ]);}
			return 'end'
		}
	// unseal>>targetorb, orb/text ,  orb/text/line  . 
		if(sig[0]=='unseal'){ //MAN undefined is not the same as false for sure
			var targ = [];
			if(mult){
				for (var i = 0; i < mult.length; i++) {
					var sealo = FFting('name',mult[i]); 
					if(sealo){
						sealo[sealo.Asp]=true;
						targ.push({name:sealo.name,res:undefined});//
					}
				}
				if(sealo){
					if(S=='~'){eF.push(['signal',undefined,targ]);}
					var st = FFting('name',S);
					if(st){st.sfeed.push(['signal',undefined,targ]);}
					return
				}
			}else{
				if(to[to.Asp]!=undefined){
					to[to.Asp] = true; 
					//scriptF
					targ.push({name:to.name,res:undefined});//
					if(S=='~'){eF.push(['signal',undefined,targ]);}
					var st = FFting('name',S);
					if(st){st.sfeed.push(['signal',undefined,targ]);}
					return
				}
			}
			if(S=='~'){eF.push(['signal','end',targ]);}
			var st = FFting('name',S);
			if(st){st.sfeed.push(['signal','end',targ]);}
			return 'end'
		}

	// delete>>orb  ,  orb/text            ... sometimes it doesnt delete all orbs tho..ouu i get it, init orbs are not in staNce okok 
//.. so is we delete here , we cant find it later on feed loop.. this i saw a long time ago i rememeber.. we need to perform actual delete
//on feed loop, after we push feed visuals.. i think
		if(sig[0]=='delete'){
			var targ = [];
			if(mult){
				for (var i = 0; i < mult.length; i++) {
					var delo = FFting('name',mult[i]);
					if(delo){
						var ioo = window[delo.arr].indexOf(delo);
						if(ioo==undefined){continue}
						var iooo = staNce.indexOf(delo.name);
						staNce.splice(iooo,1);
//ok ghOsts is good, but we actually want to know who created the delete signal, we want to see the lines
						//scriptF
						var dead = window[delo.arr].splice(ioo,1);//////
						if(S=='~'){dead[0].Dbyx=eX; dead[0].Dbyy=eY;}
						var st = FFting('name',S);
						if(st){dead[0].Dbyx=st.x; dead[0].Dbyy=st.y;}
						ghOsts.push(dead[0]);
			//!!!!! if we delete here, we cant find target later on feed loop..!!!!!!
						//targ.push({name:delo.name,res:undefined});//
					}
				}
				if(delo){
					//if(S=='~'){eF.push(['delete',undefined,targ]);}
					//var st = FFting('name',S);
					//if(st){st.sfeed.push(['delete',undefined,targ]);}
					return
				}else{
					//if(S=='~'){eF.push(['delete','end',targ]);}
					//var st = FFting('name',S);
					//if(st){st.sfeed.push(['delete','end',targ]);}
					return 'end'
				}	
			}


			//var toarr = to.arr;

			var ioo = window[to.arr].indexOf(to);
			if(ioo==undefined){return 'end'}
			var iooo = staNce.indexOf(to.name);
			staNce.splice(iooo,1);
			Eout = 'delete>>'+to.name;
			//scriptF
			//targ.push({name:to.name,res:undefined});//
			//if(S=='~'){eF.push(['delete',undefined,targ]);}
			//var st = FFting('name',S);
			//if(st){st.sfeed.push(['delete',undefined,targ]);}
		//then again.... if we delete here, we wont find targets later on feed loop... need to account for this
			//
			var dead = window[to.arr].splice(ioo,1);//////
			if(S=='~'){dead[0].Dbyx=eX; dead[0].Dbyy=eY;}
			var st = FFting('name',S);
			if(st){dead[0].Dbyx=st.x; dead[0].Dbyy=st.y;}
			ghOsts.push(dead[0]);
			//ghOsts.push(window[to.arr].splice(ioo,1)); //!!!!!!!!!!!!
			return
		}

//stringify orbs from a taget or target text list to be copied and taken from input box
// jsonout>>orb  ,  orb/text
		if(sig[0]=='jsonout'){
			if(mult){
				var orbss = [];
				for (var i = 0; i < mult.length; i++) {
					var jsono = FFting('name',mult[i]);
					if(jsono){
	//var all = [textOrbs,scriptOrbs,imageOrbs,circleOrbs,rectOrbs,oscOrbs,audioOrbs];
	//var jsonall = JSON.stringify(all);
	//we want to create a similar structure here but only using the orbs listed on the orb text... nevermind that
	//just do whats more efficient
						orbss.push(jsono);
						//var newo = JSON.stringify(jsono); orbss.push(newo);
					}
				}
				var allo = JSON.stringify(orbss);				
				chat_in.value = allo;
				chat_in.style.display="inLine";
				chatOn = true; 
				nLine = true; //inline prompt
				chat_in.focus();
				return
			}
			var nallo = [to]
			var allo = JSON.stringify(nallo);				
			chat_in.value = allo;
			chat_in.style.display="inLine";
			chatOn = true; 
			nLine = true; //inline prompt
			chat_in.focus();

			//sciptF(undefined,undefined,undefined,'core'); /////////not working?

			return
		}

//SECOND PATTERN
//Ok so we..are interested in thispattern where we create a value using an access key from a text..
//accepts a text with retrieve commands to be printed on printer orb all at once. love this one. its more robust now, wont throw error
//even if it finds non access keys or number

//by defect uses to because it needs mult
//we want to be able to print access keys from orbs names found on a text..... but we could just print all retrieve commands that a
//text has actually.... so print could just read a text, and execute all retrieve instructions and print them on pro.... that would be
//convenient.... and cool because we could just remove access keys lines we dont want to see... we would see access keys on Main2
//and Main3 printing its values next to it, only the lines we want, in real time.. EXACTLY what we want. ok deal . we do this. done already.
//print/Main2>>%/text/current yes
//print/Main3>>Main31/text yes
//Another great idea for print. Lets make it so when we 

//print/printerorb>>orb/text
		if(sig[0]=='print'){
			var targ = []; //
			if(mult){
				var pro = Fting(textOrbs,'name',sig[1]); //printer is on sig[1]
				if(pro){
					if(pro.text){
	//.. we already did this loop, data is on mult..wait.. mult holds the literal lines, we need to use the lines in
	//this case to retrieve values. But now we need to first turn these lines into arrays splited by '/' before feeding them
	//into getLeValue. so if mult.length is 1, it means we specified a line, multi has many lines, its the whole to text
						var rv = []; //retrieved values from text lines
						if(mult.length==0){return 'end'}
						if(mult.length==1){
						//we cant split a number... and we might have numbers here..
							if(isNaN(mult[0])){
								var SM = mult[0].split('/');
								var r0 = SM[0];
								if(r0=='~'){var ro = {name:'~'};}
								if(r0=='%'){var ro = FFting('name',stancE);}
								if(r0=='$'){var ro = FFting('name',S);}
								if(ro==undefined){var ro = FFting('name',r0);}
								if(ro){
									var rv = getLeValue(SM,ro); //retrieved from text
									targ.push({name:ro.name,res:rv});//
									if(rv=='end'){rv=[];}
								}
							}
						}
						if(mult.length>1){
							for (var i2 = 0; i2 < mult.length; i2++) {
	//so we need to get more specific functions.. here we dont need to ask all possible retrieve commands... i think?.. wait idk
	//so stance here should be...yeah tricky.. the orb casting? the printer or the orb being retrieved...lets make the caster for now
								var SM = mult[i2].split('/');
								var r0 = SM[0];
								if(r0=='~'){var ro = {name:'~'};}
								if(r0=='%'){var ro = FFting('name',stancE);}
								if(r0=='$'){var ro = FFting('name',S);}
								if(ro==undefined){var ro = FFting('name',r0);}
								if(ro){
									var rft = getLeValue(SM,ro); //retrieved from text
									targ.push({name:ro.name,res:rft});//
									//should only be able to retrieve 1 line per instruction?
									rv.push(rft[0]); 
								}
							}
						}
			//print every retrieved value
						for (var i = 0; i < rv.length; i++) {
							var text = rv[i];
							if(pro.txtLi[i]){pro.txtLi[i].txt=text;}else{
								var Line = DataLine();
								var firstf = pro.signat.slice(0);
								Line.beats = [firstf];
								var font = pro.tstyle+' '+pro.tsize+'px '+pro.tfont;
								Line.state.font = font;
								Line.state.align = pro.talign;
								Line.x=pro.x; Line.y=pro.y;
								Line.txt=text;
								pro.txtLi.push(Line);
							}
						}
						//remove lines from previous text if any. we just want what we created now
						if(pro.txtLi.length>rv.length){pro.txtLi.splice(rv.length);}

						dESpacer(pro);

						pro.sfeed.push(['transfer',undefined,targ]);//

						return //[]  //not sure what to return here
					}
				}//pro
			}//mult

			return 'end' //if no pro or mult, this is a failed operation
		}//print


//SCAN
//scan sinthax
//scan is a signal that works with 2 texts and 1 form. circle form for now.
//scan/circleorb/sourcelist>>target  Must be a text orb
//Once executed, a list of coordinates is created for the circle state to perform c.isPointInPath
//... ok we need to consider efficiency and sinthax. 
//maybe we can fill the sourcetext with x, and y positions directly. the function uses the coordinates to make the circle ask point by point.
//... maybe a scan operation should work for a single orb at once... so a scan takes a heartbeat...
//scan/circleorb/textorb/line>>target/text/line , new , current..   Check a list of orb names, and copies all names found in the circle
//area into another text. this is all we need. .. i think we should avoid multiple orbs loops in one heatbeat, hence, a single name for
//scan to check max per heartbeat...... yeah maybe later.
//right now, finding multiple orbs on a loop once per heartbeat is not really pushing the machine heat that much i think. so not worrying
//about it for now. but maybe later will be a thing.

//.. we could use a rectangle orb instead of a circular orb to use a rectangle yes. fom here as well, we want rectangles to select 
//lines and other things as well
//scan/rectangleorb/sourcetext>>targettext 
//scan/circleorb/sourcetext>>targettext ... this one for now . we are not using mult here.
		if(sig[0]=='scan'){
			//var cir = Fting(circleOrbs,'name',sig[1]);
			//if(cir){
			//	if(cir.circle){}else{return 'end'}
			//}else{return 'end'}

			//get all lines from source text to perform a scan
			var src = Fting(textOrbs,'name',sig[2]);
			if(src){
				//if cir...
				var cir = Fting(circleOrbs,'name',sig[1]);
				if(cir){
					var cs = cir.cirS;  var X = cs.x+cs.cx; var Y = cs.y+cs.cy; var allp = []; var c = ctx0;
					var inArea = false;
					c.beginPath();
					c.arc(X,Y,cs.radius,0,2*Math.PI);//,true);
				}

				//if rect..
				var rect = Fting(rectOrbs,'name',sig[1]);
				if(rect){
					var rs = rect.rectS; var allp = []; var c = ctx0;
					var X = rs.x+rs.cx; var Y = rs.y+rs.cy; 
					var W = rs.w; var H = rs.h;
					var inArea = false;
					c.beginPath();
					c.rect(X, Y, W, H);
				}
				//var cs = cir.cirS;  var X = cs.x+cs.cx; var Y = cs.y+cs.cy; var allp = []; var c = ctx0;
				//var inArea = false;
				//c.beginPath();
				//c.arc(X,Y,cs.radius,0,2*Math.PI);//,true);

				for (var i = 0; i < src.txtLi.length; i++) {
					//no $, % allowed here
					var sco = FFting('name',src.txtLi[i].txt);
					if(sco){
						//if(sco.name==cir.name) ... i was thinking about omiting circle... but eh
//ctx0.translate(-eX+window.innerWidth/2, -eY+window.innerHeight/2); ..... omg.... wasted a whole day finding this . f hell
	//. and we need to add the inverse of eX eY.. this is our offset
						inArea = c.isPointInPath(
							(eX*-1)+sco.x+window.innerWidth/2,
							(eY*-1)+sco.y+window.innerHeight/2
						);
						if(inArea){allp.push(sco.name); inArea = false;}
					}
				}

				if(to.text){
					for (var i = 0; i < allp.length; i++) {
						var text = allp[i];
						if(to.txtLi[i]){to.txtLi[i].txt=text;}else{
							var Line = DataLine();
							var firstf = to.signat.slice(0);
							Line.beats = [firstf];
							var font = to.tstyle+' '+to.tsize+'px '+to.tfont;
							Line.state.font = font;
							Line.state.align = to.talign;
							Line.x=to.x; Line.y=to.y;
							Line.txt=text;
							to.txtLi.push(Line);
						}
					}
					if(to.txtLi.length>allp.length){to.txtLi.splice(allp.length);}
					dESpacer(to);
				}

			}

			return 'end'
		}//scan




//var pos = getTrackPos(s.offsx, s.offsy, s.tradx, s.trady, s.cx, s.cy);
//maybe i can use a different value here instead of Math.PI*2.. instead of looping all at once, we use s.angle
//we can then use instructions to simulate 0 to 6.2... so lets build a loop with instructions to generate numbers
//from 0 to 6.2 and restart, while simultaneously feeding the numbers to a track offsx or offsy see how that goes..
//
//I am finnally understanding , all signals should be constructed considering the text system here.. We should be able to
//feed text into these instructions using nothing but lines from text orbs
//The escence of all this is:
//Feeding all these parameters into getrackpos, and using the returned position to animate any other aspect.
//so in sinthesis, we want a signal to processs 6 lines of data to produce an output with x and y . ok so this is very simple
//6 lines on source, 2 lines on target, x and y values. They both need to be text orbs probably? we dont know but...
//.. yeah the only way this makes sense is by asuming source and target are orbs texts with numbers on left side and a container
//to deposit the result(which is always 2 numbers, x and y) , we can then use these values on any other aspect
//..... could be just "orb"
//algo01/source>>orb/text     
		if(sig[0]=='algo01'){
			if(mult){
				//get 6 lines from source
				var src = Fting(textOrbs,'name',sig[1]);
				if(src){
					var gtpp = [];
					for (var i = 0; i < 6; i++) { gtpp.push(src.txtLi[i].txt);}
					//var pos = getTrackPos(s.offsx, s.offsy, s.tradx, s.trady, s.cx, s.cy);
					var pos = getTrackPos(gtpp[0], gtpp[1], gtpp[2], gtpp[3], gtpp[4], gtpp[5]);
					var res = putRiValue([pos.x, pos.y],[tar[0],'text'],to);

					//sciptF(undefined,undefined,undefined,'core');

					if(res=='end'){return 'end'}
					return
				}
			}
		}



//how would random look like here... so clean. No need for random keys on orbs now
//grabs 2 numbers from source, first is min, next one is max. and returns 1 random number between min and max on target
//maybe we could say random/source/line yes, this is convenient
//but also, we could go crazy with target. We could just put the random value in any access key provided by target.
//.. standard signal target. line is mandatory. if no access key on line specified, we just  place the value on the target line.
//.. yeah i think this is good enough. and working as intended
		//
//random/source/line>>orb/text/line
		if(sig[0]=='random'){
			if(mult){
				//get min and max from source
				var src = Fting(textOrbs,'name',sig[1]);
				if(src){
					var gtpp = [];
					//for (var i = 0; i < 2; i++) { gtpp.push(src.txtLi[i].txt);}
					if(src.txtLi[sig[2]-1]){gtpp.push(src.txtLi[sig[2]-1].txt);}else{return 'end'}
					if(src.txtLi[sig[2]]){gtpp.push(src.txtLi[sig[2]].txt);}else{return 'end'}
					if(isNaN(gtpp[0])){return 'end'} ///

					var R = getRandom(gtpp[0],gtpp[1]);
//we want to use the content on target line to determine if we use the access key in there, or if there is no key
//then we just put the value in there
					if(mult.length==1){
					//we cant split a number... and we might have numbers here..
						if(isNaN(mult[0])){
							var SM = mult[0].split('/');
						}else{var SM = [1];}
						if(SM.length==1){
	//if len 1, it means no /, it means we dont have an access key here or just a number, so we dump the rand value on target location
							var res = putRiValue([R],tar,to);///
		//.. how about a special random generator feedback here!!!!!!
							if(res=='end'){return 'end'} return
						}
					//if not, then we use the access key to dump R in there
						var r0 = SM[0];
						if(r0=='~'){var ro = '~';}
						if(r0=='%'){var ro = FFting('name',stancE);}
						if(r0=='$'){var ro = FFting('name',S);}
						if(ro==undefined){var ro = FFting('name',r0);}
						if(ro){			
							var res = putRiValue([R],SM,ro);///
							if(res=='end'){return 'end'} return
						}
					}
					return 'end'  //one line on mult is a requisite for random

				}
			}
		} //random




//and what about screenx and screeny.. we could return both coordinates at once. we want 2 numbers in, percentage from x and y.
//and 2 numbers out , x and y percentage from screen total.. ok but it would be convenient to have all percentages we need on a single
//text so we use the same text to relocate other orbs. so we could say screenxy/source/line>>orb/text/line . this way we can use
//2 texts to manage percentage positions of all orbs we want. we use 1 text to store percentages and the other one to store coordinates
//fo example.. because having 2 extra texts per orb just to update screen position might be too many text orbs to have aound
//screenxy/source/line>>orb/text/line //... kinda messy but give it a thought
		//
//.. other way is this:
////screenxy/source/line>>orb	So the instruction just modifies the orb directly. this is practical. also pointing out
//the source line is mandatory. convenient as well. we could accept or not 'text' on tar[1]
//screenxy/source/line>>orb  , /text
		if(sig[0]=='screenxy'){
			//if(mult){
				//get percentage from x and y 
				var src = Fting(textOrbs,'name',sig[1]);
				if(src){
					var gtpp = [];
					//for (var i = 0; i < 2; i++) {
				//we need to check if line exist, we dont even need a loop here rly
					if(src.txtLi[sig[2]-1]){gtpp.push(src.txtLi[sig[2]-1].txt);}else{return 'end'}
					if(src.txtLi[sig[2]]){gtpp.push(src.txtLi[sig[2]].txt);}else{return 'end'}
					//	gtpp.push(src.txtLi[i].txt);
					//}
					if(isNaN(gtpp[0])){return 'end'} ///

					var scxs = (gtpp[0]*window.innerWidth)/100;
					var scx = Math.round(eX-(window.innerWidth/2)+scxs);

					var scys = (gtpp[1]*window.innerHeight)/100;
					var scy = Math.round(eY-(window.innerHeight/2)+scys);

					if(tar[1]=='text'){
						var res = putRiValue([scx,scy],[tar[0],'text'],to);//,sig[2]],to);
						if(res=='end'){return 'end'}
					}else{
						to.x = scx; to.y = scy;
						if(to.Asp=='text'){dESpacer(to);}
					}
					return
				}
			//}
		}



/*
//need revision .... maybe we should do one clone for each line on a text, each line a new name, and use s1(k1) to point to the cloned
//orb ... i still cant figure how this would be cool... because it would indeed be kinda crazy... we need to modularize bacause scripts
//casting the same commands dont seem very scalable
// clone/newname>>targetorb
	if(sig[0]=='clone'){
		//look if the name already has been asigned to an orb. what if it has
		if(k1==undefined){return 'end'}
		let l1 = staNce.length;
		while(l1--){if(k1==staNce[l1]){return 'end'} }
		var newo = JSON.parse(JSON.stringify(to));
		newo.name = k1;
		newo[newo.Asp] = false; //seal inmediately
		window[newo.arr].push(newo);
		Eout = '@'+newo.name;
		return
	}
*/


/*
//needs revision
// modularize/pattern1/replacement1/pattern2/replacement2>>orb/text
		if(ST[0]=='modularize'){
			//if oft?
			for (var i = 0; i < oft.txtLi.length; i++) {
				var tl = oft.txtLi[i].txt;
	//we use each line on the text to find a target
				var oa = tl.split('/');// orb/aspect pair
				var mo = FFting('name',oa[0]); //modularizing orb
				if(mo){
					switch(oa[1]){
						case 'script':
							if(mo['scC']){
					//we check for every script line
								for (var i2 = 0; i2 < mo.scC.length; i2++){
									var scrl = mo.scC[i2];
//and replace values using ST parameters. form ST[1] forward on we find pattern/replacement pairs .
//we begin the loop at 1 and increase by 2 . text.replaceAll(pattern,replacement);
									for (var i3 = 1; i3 <= ST.length; i3+=2){
										var nl = mo.scC[i2].replaceAll(ST[i3],ST[i3+1]);
										mo.scC[i2]=nl;
							//lets just also replace name here for now..
										if(mo.name==ST[i3]){
											var si = staNce.indexOf(mo.name);
											var rname = [ST[i3+1],si];
										}
									}
								}
							}	
							break
						//case 'text':
						//case 'circle':
					}//switch

					if(rname){staNce.splice(rname[1],1,rname[0]); mo.name = rname[0];}
				}
			}
			return
		}//ST[0] == modularize


*/


/*
//needs revision
//swap works with pair of lines containing script orbs names only. we use it to change the order of execution in order to get
//the result we desire when multiple signals are targeting the same orb and parameter
// swap>>orb/text
		if(ST[0]=='swap'){
			for (var i = 0; i <= oft.txtLi.length-2; i+=2) {
				var sw1 = Fting(scriptOrbs,'name',oft.txtLi[i].txt);
				if(sw1){}else{return 'end'}
				var sw2 = Fting(scriptOrbs,'name',oft.txtLi[i+1].txt);
				if(sw2){}else{return 'end'}
				sw1i = scriptOrbs.indexOf(sw1); sw2i = scriptOrbs.indexOf(sw2);
				scriptOrbs[sw2i] = sw1; scriptOrbs[sw1i] = sw2;
			}
			return		
		}

*/	





	} //to



//POLARITY PEAKING RIGHT NOW
//-Polarity got a massive buff.
//+/orb/line>>~/x
//+23>>orb/circle/1/radius
//+>>orb/text/cn
//+/orb/line>>orb/text/line  The signal will now annalize the content of the target
//and determine if its pointing to another target or a number. if its a number, polarity
//will simply add to it, if the text in the line points to a valid target, polarity
//will act on that target.
//We will now be able to add(unimplemented) embeded numbers to the number found in the
//line of the orb on signal to act on the target
//+23/orb/line>>orb/rectanle/3/h
//And if the target text holds lines with numbers, polarity will add to
//all numbers in the text.
//->>orb/text
//And one last thing , if polarity finds an orb name as target, it will try to find the next orb in the
//cue and replace the line with its name. But this only work within the the same aspect array as the target orb. for now 
//+>>orbname
	
	//keeping this ref for polarity
	//}else{
	//var run = ['off','once','loop','repeat']; 
	//var n = run.indexOf(o.imgR);
	//var res = n+pol;
	//if(res>=run.length){res--;} 
	//if(res<0){res++;} 
	//o.imgR=run[res];
	//return
	//}

//.. we might have this now here:
//pol/orb/line>>		This means we want to take a number on a text line and use it as pol value , we might want to add
//				current, last , etc...

	var psign = sig[0][0]; var pol = 0; 

	if(psign=='+'){
		var pol = 1;
		var polto = Fting(textOrbs,'name',sig[1]);
		if(polto){
			if(polto.txtLi[sig[2]-1]){
				var poline = polto.txtLi[sig[2]-1].txt;
				var pol = parseFloat(poline); if(isNaN(pol)){return 'end'}
			}
		}
		if(sig[0].length>1){
			var nnum = sig[0].substr(1); var num = parseFloat(nnum);
			if(isNaN(num)){ return 'end' }else{ if(poline){pol = pol+num;}else{ pol = num;} }
		}
	}

	if(psign=='-'){
		var pol = -1;
		var polto = Fting(textOrbs,'name',sig[1]);
		if(polto){
			if(polto.txtLi[sig[2]-1]){
				var poline = polto.txtLi[sig[2]-1].txt;
				var pol = parseFloat(poline)*-1; if(isNaN(pol)){return 'end'}
			}
		}
		if(sig[0].length>1){
			var nnum = sig[0].substr(1); var num = parseFloat(nnum)*-1;
			if(isNaN(num)){ return 'end' }else{ if(poline){pol = pol+num;}else{ pol = num;} }
		}
	}


//POLARITY
//ok i know what i want to do with polarity now. i want to send a polarity signal into a text with access keys, and yes, add to all
//of them at once. So now we will be able to synch any parameter we want , just by placing the access key into the target text.
//just like how we do with print.  signals work perfectly in this way, signals should only just take targets from text, this is
//how all comes together.
//pol>>orb/text		And we let lines on text be any key we want. neat. this is massive simplification for the code and
//a complete bless for user interface. we just pick targets from text lines. How could i not figure this out before. this is crazy...
//we could do one more thing. take polarity quantity from a text line instead of embeding a number...
//pol/orb/line>>orb/text(optionaly, just target a specific line)  And now polarity signals starting to look like connectors
//pol/orb/line>>%/text/current        So much versatility....
//sig		an array holding '/' parts of LS
//tar		an array holding '/' parts of RS
//to		a target orb from RS . holds an orb structure, or '~' ?
//S		a stance as string
//mult		an array holding 0 or more lines from a text specified as target
//txtalign	access to the target text align directly, to work with polarity, we need to use the number to idea array technique
//pol		a number we want to add to something

	if(pol!=0){

		if(ent){ //here goes polarity signals into entity keys
// pol>>~/x
			if(tar[1]=='x'){
				var nv = eX+pol; //a new value
		//create a packet to perform a translate request at the begginning of next hearbeat..
		//.. btw we need to fix a little thing in the way translates execute on repeat..
				var treq = [-pol,0]; transLate.push(treq);
				//ctx0.translate(-pol,0); //... remmeber when we translate we need to think in reverse.. yup crazy
//maybe we should change eX eY values on transLate check as well...
				//translatE.x = nv;
				eX=nv;

				//do we want Eout to have output data here or not..
				return
			}
// pol>>~/y
			if(tar[1]=='y'){
				var nv = eY+pol;
				var treq = [0,-pol]; transLate.push(treq);
				//ctx0.translate(0,-pol); //... remmeber when we translate we need to think in reverse.. yup crazy
				//translatE.y = nv;
				eY=nv;
				
				//Eout?
				return
			}

		//any other entity keys we want to be able to change with polarity go here.. yeah we dont need polarity on screen..

		}//target entity


		if(to){
//if we only have the name of an orb as target, polarity will try to find the next orb on the loops cue. so we first locate the
//the array of to, our orb index... wait.. if the target was extracted from a list , we simply want to replace the orb name on the list
//with the index obtained using polarity... but if we find the name of the orb on its own in a command, then polarity should not
//do anything with it... for now 

//many commands need to actually be simplified now that we have o.x , y back at it.... but yeah i think this is the way
//so... keep the sinthax but change the internal structure.. we could simply use B instead of having a txtB, imgB etc..
//fonts should be responsive to polarity, so we can toggle between fonts. definitely. also probably align..



//aspect active line should be able to listen to polarity signals in to . only visuals tho. we can probably optimize code here a lot
//we probably can just use to.B  instead of  txtB , rectB etc.. the sinthax is ok tho i think. serves to orient users

//pol>>orb/aspect/cn 
			if(tar[2]=='cn'){ //we might want to target other aspects beats to txtb wont cut it here
		//.. we could simply use o.B ...
				switch(tar[1]){
					case 'text':
						var bstr = 'txtB'; break
					case 'script':
						var bstr = 'scB'; break
					case 'circle':
						var bstr = 'cirB'; break
					case 'rectangle':
						var bstr = 'rectB'; break
					case 'image':
						var bstr = 'imgB'; break
				}

				var newcn = to[bstr]+pol; if(newcn<1){newcn=1; return 'end'}
				to[bstr] = newcn; 
				return
			}



//... so right now we cant use polarity on beats that dont contain the target parameter but we can create those parameter
//using transfer commands..
//and only if this line holds a number, IF it doesnt hold a number, then we can try to use the access provided (if any) by
//the text line specified by target.
//we can now also do  

			if(tar[1]=='text'){

	//pol>>orb/text/font
				if(txtsignat){
					return 'end'
				}

	//pol>>orb/text/font
				if(txtfont){
					var run = ['arial','courier new','serif'];
					var n = run.indexOf(to.tfont);
					var res = n+pol;
					if(res>=run.length){res = run.length-1;} 
					if(res<0){res = 0;} 
					to.tfont = run[res];
					dESpacer(to); return
				}		
				//also style on to.tstyle...

	//pol>>orb/text/style
				if(txtstyle){
					var run = ['normal' , 'italic', 'bold'];
					//var run = ['arial','courier new','serif'];
					var n = run.indexOf(to.tstyle);
					var res = n+pol;
					if(res>=run.length){res = run.length-1;} 
					if(res<0){res = 0;} 
					to.tstyle = run[res];
					dESpacer(to); return
				}			

	//here goes keys unique to aspects... we just ask for to.Asp...
	// pol>>orb/text/size
				if(txtsize){
					var nv = txtsize+pol;
					if(nv<3){nv=3;}
					to.tsize = nv;
					dESpacer(to); return
				}

	// pol>>orb/text/spacer
				if(txtspacer){
					var nv = txtspacer+pol;
					if(nv<1){nv=1;}
					to.tspacer = nv;
					dESpacer(to); return
				}


//if mult, it means we are accessing text aspect content lines
				if(mult){

//... to just cast polarity on every line at once.. interesting
//pol>>orb/text 
					if(tar[2]==undefined){
					//polarity on all text lines... as long as they are numbers
						for (var i = 0; i < mult.length; i++) {
							var nv = parseFloat(mult[i]);
							if(isNaN(nv)){
								//
							}else{to.txtLi[i].txt=parseFloat((nv+pol).toFixed(2));}
						}
						return
					return 'end'
					}

// pol>>orb/text/current...last... number..      all these require mult
					switch(tar[2]){

						case 'current':
							if(to.txtLi[to.txtB-1]){}else{return 'end'}
							var nv = parseFloat(to.txtLi[to.txtB-1].txt);
							if(isNaN(nv)){
								var SM = mult[0].split('/');
								//////
								//find next orb on cue using polarity
								if(SM.length==1){
									var ton = FFting('name',SM[0]);
									if(ton){
										var newi = window[ton.arr].indexOf(ton)+pol;
										var newon = window[ton.arr][newi];
										if(newon){
											to.txtLi[to.txtB-1].txt = newon.name;
											return
										}
									}

									return 'end' //lets avoid messing around here too much

								}
								//////
								var res = comRiTarget(sig,SM,S);
								if(res=='end'){return 'end'}
							}else{
								//modify the number in the line using pol
								to.txtLi[to.txtB-1].txt=parseFloat((nv+pol).toFixed(2));
							}
							break
						case 'last':
							if(to.txtLi[to.txtLi.length-1]){}else{return 'end'}
							var nv = parseFloat(to.txtLi[to.txtLi.length-1].txt);
							if(isNaN(nv)){					
								var SM = mult[0].split('/');
								//////
								//find next orb on cue using polarity
								if(SM.length==1){
									var ton = FFting('name',SM[0]);
									if(ton){
										var newi = window[ton.arr].indexOf(ton)+pol;
										var newon = window[ton.arr][newi];
										if(newon){
											to.txtLi[to.txtLi.length-1].txt = newon.name;
											return
										}
									}

									return 'end' //lets avoid messing around here too much

								}
								//////
								var res = comRiTarget(sig,SM,S);
								if(res=='end'){return 'end'}
							}else{
								to.txtLi[to.txtLi.length-1].txt=parseFloat((nv+pol).toFixed(2));
							}
							break
						default:
							if(to.txtLi[tar[2]-1]){}else{return 'end'}
							var nv = parseFloat(to.txtLi[tar[2]-1].txt);
							if(isNaN(nv)){
								var SM = mult[0].split('/');
								//////
								//find next orb on cue using polarity
								if(SM.length==1){
									var ton = FFting('name',SM[0]);
									if(ton){
										var newi = window[ton.arr].indexOf(ton)+pol;
										var newon = window[ton.arr][newi];
										if(newon){
											to.txtLi[tar[2]-1].txt = newon.name;
											return
										}
									}

									return 'end' //lets avoid messing around here too much

								}
								//////
								var res = comRiTarget(sig,SM,S);
								if(res=='end'){return 'end'}
							}else{
								var num = parseFloat(tar[2]);
								var nv = parseFloat(to.txtLi[num-1].txt);
								to.txtLi[num-1].txt=parseFloat((nv+pol).toFixed(2));//(nv+pol).toFixed(2);
							}
							break				
					}//switch
					return
				}//if mult
			} //tar[1] is text


//pol>>orb/x  ,  y
			if(tar[1]=='x'){ 
				to.x += pol;
				if(to.Asp=='text'){dESpacer(to);} return //o.o ??
			}
			if(tar[1]=='y'){
				to.y += pol;
				if(to.Asp=='text'){dESpacer(to);} return //o.o ??
			}


//pol>>orb/aspect/line/param
			if(tar[3]){ 
				
				to.o = beatParam(to,tar[1],tar[2],tar[3],undefined,pol); //this returns a neat output

				return
			}
			
			return 'end' //if we are here we got nothing
		}//target orb

	}//polarity



}// comRiTarget .. signals procesing


//produce LSout
//var lres = getLeValue(LS,lo); //we dont need to pass S now
//we now always pass lo as an orb object or as '~', LS is an array splited in '/' already, LS[0] is the orb name, but we already
//used the name to find and pass lo (left orb)
const getLeValue = function(LS,o){ //(LS,o) ... so LS needs to always be an array, the result from spliting wit '/'

	if(o.name=='~'){var ent = true;}

	if(LS.length==1){ 

		if(ent){ return entAccess(); }
		if(o){ return orbAccess(o); }

		return 'end'
	}


	if(LS.length==2){ 
		var k = LS[1];
		if(ent){
			//var k = SS[1];
	/*
	//deprecat? but this is not bad either...
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
	*/
				
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
				case 'y': return [eY] 
//maybe we want screenxy to work with both coordinates at once!!!!!
// ~/screenx>>
				case 'screenx': return [eX-(Math.round(window.innerWidth/2))]
// ~/screeny>>
				case 'screeny': return [eY-(Math.round(window.innerHeight/2))]
// ~/screenw>>
				case 'screenw': return [window.innerWidth]
// ~/screenh>>
				case 'screenh': return [window.innerHeight]
// ~/comprompt>>
				case 'comprompt': return [chatOn] 
// ~/inprompt>>
				case 'inprompt': return [nLine] 
// ~/memheat>>
				case 'memheat': return [hEat]
// ~/orbs>>
				case 'orbs':
					//read only . return a list of all orbs in the domain of the entity
//this is good but we want to actually see the orbs index too. and it should match the line in which they are being printed
//staNce is good to determine if the name of the orb exist, but nothing more. ok we cant print the index of the orbs anyway
//because now we have an array for each aspect, so lets leave this one as is
					var aorbs = [];
					for (var i = 1; i <= staNce.length-1; i++) { //start from 1 because 1 is '~'.. but this is not bad?
						var on = staNce[i]; aorbs.push(on);
					}
					return aorbs
//~/dsignat>>
				case 'dsignat': return [dsignat.slice(0).toString()]
//~/skeys>>
				case 'skeys':
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

//~/stance>>
				case 'stance': return [stancE]

		//These commands rule. 
//~/inline>>
				case 'inline': return [chat_in.value]
//~/comline>>
				case 'comline': return [chat_in.value]

//read only, returns entity input and output... 
//~/in>>
				case 'in':
					if(Ein==undefined){return 'end'} return [Ein]
//~/out>>
				case 'out':
					//if(Eout==undefined){return 'end'}
					if(Entry==undefined){return 'end'} return [Entry]//[Eout]
			}//switch
		}//ent

		if(o){
			switch (k){
		//these need to check for aspect


//orb/name>>
				case 'name': return [o.name] 
//orb/aspect>>
				case 'aspect': return [o.Asp] 

//orb/in and orb/out
//okok i rememebr. o was stance orb and or was SS[0] . because if an orb asks for orb/in we need to do the o.cast thing so
//we read the instruction on LSOrbs phase . so we need to use St to get the current stance if any
//.. we can filter out these before even reaching here and forget about cast and all that.

//orb/in>>
				case 'in':
					if(o.i==undefined){return 'end'} return [o.i]; 
//orb/out>>
				case 'out':
					if(o.o==undefined){return 'end'} return [o.o]; 
					
// orb/x>>
				case 'x': return [o.x]
// orb/y>>
				case 'y': return [o.y]

//these can also probably merged into one single function!!!!!!!!!!!!!!!!!!!!!!!!!
				case 'text':
// orb/text>>
					if(o.Asp=='text'){
						var dla = [];
						for (var i = 0; i < o.txtLi.length; i++) {
							var tl = o.txtLi[i].txt; dla.push(tl);
						}
						return dla
					}
					return 'end'
// orb/script>>
				case 'script':
					if(o.Asp=='script'){
						var scla = [];
						for (var i = 0; i < o.scC.length; i++) {
							var scl = o.scC[i]; scla.push(scl);
						}
						return scla;
					}
					return 'end'
//orb/circle>>
				case 'circle':
					if(o.Asp=='circle'){
						var btt = [];
						for (var i = 0; i < o.cirF.length; i++) {
							var bt = o.cirF[i].toString(); btt.push(bt);
						}
						return btt;
					}
					return 'end'
//orb/rectangle>>
				case 'rectangle':
					if(o.Asp=='rectangle'){
						var btt = [];
						for (var i = 0; i < o.rectF.length; i++) {
							var bt = o.rectF[i].toString(); btt.push(bt);
						}
						return btt;
					}
					return 'end'
//orb/image>>
				case 'image':
					if(o.Asp=='image'){
						var btt = [];
						for (var i = 0; i < o.imgF.length; i++) {
							var bt = o.imgF[i].toString(); btt.push(bt);
						}
						return btt;
					}
					return 'end'
//orb/oscillator>>
				case 'oscillator':
					if(o.Asp=='oscillator'){
						var tla = [];
						for (var i = 0; i < o.oscTL.length; i++) {
							var tl = o.oscTL[i].toString(); tla.push(tl);
						}
						return tla;
					}
					return 'end'

			}//switch k
		}//orb

		return 'end'
	}

	if(LS.length==3){ 
		var cont = LS[1]; var ckey = LS[2];
		if(ent){
// ~/cont/key
			
//.. it would be ideal to match orbs by proximity with a scan signal....
//we could have ~/orbs/pattern to only print orbs whose names partially match the pattern. or something like that.
//it would be interesting to be able to only print orbs that fullfil a criteria. working fine. we could go further.. but this is
//fine for now.. ok now is no more. here is a new now

// ~/orbs/aspect   Should print all orbs of the specified aspect array by index order by design. Because work flow
			if(cont=='orbs'){
				switch(ckey){
					case 'script': aarr = scriptOrbs; break
					case 'text': aarr = textOrbs; break
					case 'circle': aarr = circleOrbs; break
					case 'rectangle': aarr = rectOrbs; break
					case 'image': aarr = imageOrbs; break
					case 'oscillator': aarr = oscOrbs; break
					case 'audio': aarr = audioOrbs; break
					default: return 'end'
				}
				var aorbs = [];
				for (var i = 0; i < aarr.length; i++) {
					aorbs.push(aarr[i].name);
				}
				return aorbs
			}
		}



		if(o){

			if(cont=='text'){
				if(o.Asp=='text'){
// orb/text/inop>>
					if(ckey=='inop'){return [o.inop]}
// orb/text/signat>>
					if(ckey=='signat'){return [o.signat.slice(0).toString()]}
// orb/text/align>>
					if(ckey=='align'){return [o.talign]}
// orb/text/style>>
					if(ckey=='style'){return [o.tstyle]}
// orb/text/font
					if(ckey=='font'){return [o.tfont]}
// orb/text/size>>
					if(ckey=='size'){return [o.tsize]}
// orb/text/spacer>>
					if(ckey=='spacer'){return [o.tspacer]}

/*
//we want to grab from line to line from 1 orb and put it elsewhere
//orb/text/1-5  ... 5-20  ... >>
					var SK = ckey.split('-');
					if(SK.length==2){
						var from = parseFloat(SK[0]); var to = parseFloat(SK[1]);
						
						var rln = parseFloat(ckey);//we need to turn ckey into a number
						//if(rln==undefined){return 'end'}
						var nan = isNaN(rln);
						if(nan){return 'end'}
						if(rln>o.txtLi.length){return 'end'}
						var rl = o.txtLi[rln-1];
						if(rl){return [rl.txt]}					
					}
*/


// orb/text/last>>
					if(ckey=='last'){
						if(o.txtLi.length==0){return 'end'}//nothing here
						var lastl = o.txtLi[o.txtLi.length-1];
						if(lastl){return [lastl.txt]} return 'end'
					}

// orb/text/current>>
					if(ckey=='current'){
						if(o.txtLi.length==0){return 'end'}//nothing here
						var currentl = o.txtLi[o.txtB-1];
						if(currentl){return [currentl.txt]} return 'end'
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
					var rl = o.txtLi[rln-1];
					if(rl){return [rl.txt]}

				}//text cont

				//.. if no data defined, then we should return 'end'
				return 'end'
			}//text

			
			if(cont=='script'){
				if(o.Asp=='script'){
// orb/script/run>>
					if(ckey=='run'){return [o.scR]}
// orb/script/last>>
					if(ckey=='last'){
//... why would we want to retrieve last like script line like this tho...?
						var lastl = o.scC[o.scC.length-1];
						if(lastl){return [lastl];}
					}
// orb/script/current>>
					if(ckey=='current'){
						var currentl = o.scC[o.scB-1];
						if(currentl){return [currentl];}
					}

// orb/script/cue>>		... maybe here
					if(ckey=='cue'){ return [scriptOrbs.indexOf(o)]; }
// orb/script/cn>>
					if(ckey=='cn'){ return [o.scB]}
// orb/script/number>>
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

				if(o.Asp=='image'){
/*
//these return the current image center.. thats ok we can work with that i think.. nowe dont want this. o.x , y lets us access
//to the center of the orb of any aspect, but specific parameters from the aspect should be accessed trough its beats and aspect/key
//combination
// orb/image/x>>
					if(ckey=='x'){return [o.imgS.cx+o.imgS.px];}
// orb/image/y>>
					if(ckey=='y'){return [o.imgS.cy+o.imgS.py];}
// orb/image/w>>
					if(ckey=='w'){return [o.imgS.pw];}
// orb/image/h>>
					if(ckey=='h'){return [o.imgS.ph];}
*/

//orb/image/file>>
					if(ckey=='file'){return [o.imgfile];}
//orb/image/run>>
					if(ckey=='run'){return [o.imgR];}
//orb/image/cn>>
					if(ckey=='cn'){return [o.imgB];}
// orb/image/last>>
					if(ckey=='last'){
						var lastl = o.imgF[o.imgF.length-1];
						if(lastl){return [lastl.toString()];}
						return 'end'
					}
//orb/image/current>>

					if(ckey=='current'){
				//current needs to return the current beat as text.. if exists
						var strb = o.imgF[o.imgB-1];//.toString();
						if(strb){return [strb.toString()];}
						return 'end'
					}

// orb/image/number>>
					//we need to turn ckey into a number
					var rln = parseFloat(ckey);
					let nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>o.imgF.length){return 'end'}
					var rl = o.imgF[rln-1];//.toString();
					if(rl){return [rl.toString()]}
				}
			}//image

//.. rememeber we need to consider text to beat and beat to text format transfomations in all these beat manipulations
			if(cont=='circle'){
				if(o.Asp=='circle'){
//its not consistent to allow acces current parameters like this, we should specify orb/aspect/current/param
/*
// orb/circle/x>>
					if(ckey=='x'){return [o.cirS.x];}
// orb/circle/y>>
					if(ckey=='y'){return [o.cirS.y];}
// orb/circle/r>>
					if(ckey=='r'){return [o.cirS.r];}
// orb/circle/g>>
					if(ckey=='g'){return [o.cirS.g];}
// orb/circle/b>>
					if(ckey=='b'){return [o.cirS.b];}
// orb/circle/a>>
					if(ckey=='a'){return [o.cirS.a];}
*/

//orb/circle/run>>
					if(ckey=='run'){ return [o.cirR]}
//orb/circle/last>>
					if(ckey=='last'){
						var strb = o.cirF[o.cirF.length-1];//.toString();
						return [strb.toString()];			
					}
//orb/circle/current>>
					if(ckey=='current'){
						var strb = o.cirF[o.cirB-1];
						if(strb){return [strb.toString()];} return 'end'
					}
//orb/circle/cn>>
					if(ckey=='cn'){ return [o.cirB];}

//orb/circle/number>>
					var rln = parseFloat(ckey);
					var nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>o.cirF.length){return 'end'}
					var strb = o.cirF[rln-1];
					//o.o = RSout;
					if(srtb){return [strb.toString()]}
				}
			}//circle

			if(cont=='rectangle'){
				if(o.Asp=='rectangle'){
/*
//... i think its ok to just return the state coordinates if we just ask the aspect directly... might be interesting
					//
// orb/rectangle/x>>
					if(ckey=='x'){return [o.rectS.x];}
// orb/rectangle/y>>
					if(ckey=='y'){return [o.rectS.y];}

					if(ckey=='w'){return [o.rectS.w];}
// orb/rectangle/h>>
					if(ckey=='h'){return [o.rectS.h];}
//.... these might need to go on ALOrbs loop.....!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// orb/rectangle/r>>
					if(ckey=='r'){return [o.rectS.r];}
// orb/rectangle/g>>
					if(ckey=='g'){return [o.rectS.g];}
// orb/rectangle/b>>
					if(ckey=='b'){return [o.rectS.b];}
// orb/rectangle/a>>
					if(ckey=='a'){return [o.rectS.a];}
*/

//orb/rectangle/run>>
					if(ckey=='run'){ return [o.rectR]}
//orb/rectangle/current>>
					if(ckey=='current'){ 
						var strb = o.rectF[o.rectB-1];
						if(strb){return [strb.toString()]} return 'end'
					}
//orb/rectangle/cn>>
					if(ckey=='cn'){ return [o.rectB] }

//orb/rectangle/number>>
					var rln = parseFloat(ckey);
					var nan = isNaN(rln);
					if(nan){return 'end'}
					if(rln>o.rectF.length){return 'end'}
					var strb = o.rectF[rln-1];
					//o.o = RSout;
					if(strb){return [strb.toString()]}
				}
			}

/*
			if(cont=='track'){
				if(o.trackF){
// orb/track/cx>>
					//if(ckey=='cx'){return [o.trackS.cx];}
// orb/track/cy>>
					//if(ckey=='cy'){return [o.trackS.cy];}
// orb/track/tradx>>
					if(ckey=='tradx'){return [o.trackS.tradx];}
// orb/track/trady>>
					if(ckey=='trady'){return [o.trackS.trady];}
// orb/track/offsx>>
					if(ckey=='offsx'){return [o.trackS.offsx];}
// orb/track/offsy>>
					if(ckey=='offsy'){return [o.trackS.offsy];}
// orb/track/posx>>
					if(ckey=='posx'){return [o.trackS.posx];}
// orb/track/posy>>
					if(ckey=='posy'){return [o.trackS.posy];}
// orb/track/offspeed>>
					if(ckey=='offspeed'){return [o.trackS.offspeed];}
// orb/track/r>>
					if(ckey=='r'){return [o.trackS.r];}
// orb/track/g>>
					if(ckey=='g'){return [o.trackS.g];}
// orb/track/b>>
					if(ckey=='b'){return [o.trackS.b];}
// orb/track/a>>
					if(ckey=='a'){return [o.trackS.a];}
//orb/track/run>>
					if(ckey=='run'){return [o.trackR]}
//orb/track/current>>
					if(ckey=='current'){var strb = o.trackF[o.trackB-1].toString(); return [strb];}
//orb/track/cn>>
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
*/

			if(cont=='oscillator'){
				if(o.Asp=='oscillator'){
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


	if(LS.length==4){ 
		var cont = LS[1]; var ckey = LS[2]; var sub =LS[3];
		if(ent){
//we can also use another key to match by pattern on the orbs name, but that would mess up the line index matching.. no matter,
//we can still swap using names
//prints all orbs whose name has the pattern matched at any place in it... and maybe here we can now say
//... i think it would make more sense like this :
//~/orbs/aspect/pattern
			if(cont=='orbs'){
				switch(ckey){
					case 'script': aarr = scriptOrbs; break
					case 'text': aarr = textOrbs; break
					case 'circle': aarr = circleOrbs; break
					case 'rectangle': aarr = rectOrbs; break
					case 'image': aarr = imageOrbs; break
					case 'oscillator': aarr = oscOrbs; break
					case 'audio': aarr = audioOrbs; break
					case 'all': var all = true; break
				}
				var aorbs = [];
				if(all){
					for (var i = 1; i < staNce.length; i++) { //start from 1 because 1 is '~'.. confusing ik
						var regex = new RegExp(sub); var on = staNce[i]; var match = regex.test(on);
						if(match){aorbs.push(on);}
					}
					return aorbs				
				}
				for (var i = 0; i < aarr.length; i++) {
					var regex = new RegExp(sub); var on = aarr[i].name; var match = regex.test(on);
					if(match){aorbs.push(on);}
					//aorbs.push(aarr[i].name);
				}
				return aorbs
			}
		}
		
// orb/cont/ckey/sub>>

		if(o){
			if(cont=='text'){
				if(o.Asp=='text'){
					if(o.txtLi.length==0){return 'end'}//nothing here
					if(ckey=='last'){
						var lastl = o.txtLi[o.txtLi.length-1];
// orb/text/last/beats>>
						if(sub=='beats'){
							var strba = [];
							for (var i = 0; i <= lastl.beats.length-1; i++) {
								var strb =  lastl.beats[i].toString();//txtToB(RSout[i]);
								strba.push(strb);
							}
							return strba
						}
// orb/text/last/cn>>
						if(sub=='cn'){ return [lastl.tB]}

// orb/text/last/1..2..3.. >>
						var rln = parseFloat(sub);//we need to turn sub into a number
						let nan = isNaN(rln);
						if(nan){return 'end'}
						if(rln>lastl.beats.length){return 'end'}
						var strb = lastl.beats[rln-1].toString();
						return [strb]
					}//last

					if(ckey=='current'){
						var currl = o.txtLi[o.txtB-1]; 
// orb/text/current/beats>>
						if(sub=='beats'){
							var strba = [];
							for (var i = 0; i <= currl.beats.length-1; i++) {
								var strb =  currl.beats[i].toString();
								strba.push(strb);
							}
							return strba

						}

// orb/text/current/cn>>
						if(sub=='cn'){return [currl.tB];}

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
					if(isNaN(rln)){return 'end'}
					if(rln>o.txtLi.length){return 'end'}
					var irl = o.txtLi[rln-1];
					//irl holds the whole line now...
// orb/text/1..2..3../beats>>
					if(sub=='beats'){
						var strba = [];
						for (var i = 0; i <= irl.beats.length-1; i++) {
							var strb =  irl.beats[i].toString();//txtToB(RSout[i]);
							strba.push(strb);
						}
						return strba
					}
// orb/text/1..2..3../cn>>
					if(sub=='cn'){return [irl.tB]}

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


			if(cont=='script'){
				if(o.Asp=='script'){
/*
					if(ckey=='screenx'){
// orb/script/screenx/in>>
						if(sub=='in'){return [o.screenx[0]]}
// orb/script/screenx/out>>
						if(sub=='out'){return [o.screenx[1]]}

					}

					if(ckey=='screeny'){
// orb/script/screeny/in>>
						if(sub=='in'){return [o.screeny[0]]}
// orb/script/screeny/out>>
						if(sub=='out'){return [o.screeny[1]]}

					}

//..maybe we can improve on this random sinthax a bit.. we should be able to provide min and max from text lines separatedly..
					if(ckey=='random'){
// orb/script/random/min>>
						if(sub=='min'){return [o.random[0]]}
// orb/script/random/max>>
						if(sub=='max'){ return [o.random[1]]}
// orb/script/random/out>>
						if(sub=='out'){ return [o.random[2]]}
					}

					return 'end'
*/
				}
			}

//this can probably be optimized......!!!!!!!!  its all using beatParam
// orb/aspect/beat/param>>
			if(o.Asp==cont){
				var ret = beatParam(o,cont,ckey,sub,undefined,undefined);
				if(ret==undefined){return 'end'}
				o.o = ret;//.toString();
				return [ret[2]]			
			}

		}// o

	}//length 4..

	return 'end' //if we are here it means operation didnt find a target so we end and second instruction cant run
}//getLeValue


//putRiValue should be able to merge all switches by annalyzing right side. LS should always be an array with strings or a number
//return undefined when succesful, return 'end' when operation couldnt be performed
//!!!! i think we should also return data into o.o so these commands are trated like signals. so we can give targets an instance
//to react to specific commands. o.o should give signal[0] and signal[1] , the command and the target.. or something like that

//var res = putRiValue(LSout,RSh,Ro);

//var rres = putRiValue(lres,RS,ro);
//so lres is op, an array with 1 or more lines returned from getLeValue on LS, RS is an array split '/' from C right side and
//ro is either '~' or an orb object
const putRiValue = function(op,RS,o){

//retrieve operations always need a specific target, we cant just dump data on a target without specifying a container, only
//signals may do that.? not sure now.. yeah signals can do that
	if(o.name=='~'){var ent = true;}

//maybe we should be able to say ~/limage>>orbname  . orb/text/1>>orb ... to its implied that when only the name of the orb is
//given on the right side of a retrieve command, it means we want to access its aspect container.. would be nice to write less
//!!!!!!!!

	if(RS.length==2){
//>>target/k1
		var k = RS[1];
		if(ent){
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
//!!!!!!!!
//so ok. maybe we can really step up the output game here.. we were saying we could specify what part of the output we want so
// ~/out/com , ~/out/target , ~/out/value. So Eout[0] is always the command, Eout[1] is allways the target, Eout[2] is always the value
//the command is creating or something like that..... its been a while i wrote that.
//now we have scriptF
					//Eout = ['>>','~/x',op[0]];
				//..maybe we can also push this..
					//translatE.x=op[0];
					eX=op[0]; 
					return

				case 'y':
// >>~/y
					var treq1 = [0,eY];
					var treq2 = [0,-(op[0])]
					transLate.push(treq1,treq2);
					//translatE.y=op[0];
					eY=op[0];
					return

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

//skeys system could also be  be simplified i think..
// >>~/skeys
				case 'skeys':
					EkeyS = [];
					for (var i = 0; i < op.length; i++) {
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
					if(op[0]=='~'){stancE='~'; return}
					var ns = FFting('name',op[0]);
					if(ns){stancE=op[0]; return }else{ return 'end'}

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
// >>~/comline
				case 'comline':
		//maybe we do want to be able to cast multiple commnads at once? no.. no this is wrong
					chat_in.value = op[0]//we want RSout here
					chat_in.style.display="inLine";
					chatOn = true; 
					chat_in.focus();		
					return


			}//switch
		}//~

//!!!!!!!!!!!!!!!!!!!!!!output?
//.. so what kind of output should give these operations besides the effect itself produced by their target having a new value
//.. yes. maybe we can use output here to help user determine what other orb script might be canceling an instruction effect
		if(o){
			//var k = SS[1];
			switch (k){

// >>orb/name
				case 'name':
					var si = staNce.indexOf(o.name);
					staNce.splice(si,1,op[0]);
					o.name = op[0];
					return 

// >>orb/in
				case 'in':
					o.i = op[0]; return
//.. hmm yeah this is like puting a command for the orb to call... dont make mush sense now
//... but maybe we could actually feed a command in here to be executed by the orb... that would be consistent
				//case 'out':
// >>orb/out ?
					//
					//return [o.o]
					//break

//.. and now orb/x  ,  y  makes sense again because we dont need to specify aspect. We just want the position of the orb center..
//.. we use aspects beats to revolve around this center... every aspect should have orb/x  y , to do something in its way. Even audio
//aspects could use it... even script aspect could use it to do the funny track thing.
//!!!!!!!!!!! what about txtX amd txtY now, do we even still need those or we can just use o.x and y ? yes. update this
// >>orb/x
				case 'x':
					o.x=op[0]; if(o.Asp=='text'){dESpacer(o);} return
// >>orb/y
				case 'y':
					o.y=op[0]; if(o.Asp=='text'){dESpacer(o);} return

//a key to let know orb text if we want to see the line number .possible values  on off
// >>orb/linenumber 
				//case 'linenumber':
					//

// >>orb/script
				case 'script':
					if(o.Asp=='script'){
					//op should be an array with instructions
						o.scB=1; o.scC = op; return //[]  //not sure what to return here
					}
					return 'end'
// >>orb/circle
				case 'circle':
					if(o.Asp=='circle'){
						var ncb = [];
						for (var i = 0; i < op.length; i++) {
							var ttb = txtToB(op[i]); ncb.push(ttb);
						}
						//... maybe we dont need to put cirB back to 1 always 
						//o.cirB = 1; 
						o.cirF = ncb;
						return //?
					}
					return 'end'

// >>orb/rectangle
				case 'rectangle':
					if(o.Asp=='rectangle'){
						var ncb = [];
						for (var i = 0; i < op.length; i++) {
							var ttb = txtToB(op[i]); ncb.push(ttb);
						}
						//o.rectB = 1;
						o.rectF = ncb; return //?
					}
					return 'end'

// >>orb/image
				case 'image':
					if(o.Asp=='image'){
						var ncb = [];
						for (var i = 0; i <= op.length-1; i++) {
							var ttb = txtToB(op[i]); ncb.push(ttb);
						}
						//o.imgB = 1;
						o.imgF = ncb; return //?
					}
					return 'end'

// >>orb/text
				case 'text':
					if(o.Asp=='text'){
//so, we can place multilines on a data container by passing in an array with lines on op
//this command needs to clear previous data. we want to create a text from scratch using the data provided on op
//so before clearing up o.txtLi, we check if there are as many datalines as op.length. yup this is good
						for (var i = 0; i < op.length; i++) {
							var text = op[i];
//we simply want to change the text it the dataline already exist, if not, then we create a new Dataline... 
							if(o.txtLi[i]){o.txtLi[i].txt=text;}else{
								var Line = DataLine();
//.. but we want to be able to use a previously configured signature on the orb to create the new beats. so each orb may have
//a diferent font, size, etc. this signature is used to create all lines on the orb and can also be customized
								var firstf = o.signat.slice(0);
								Line.beats = [firstf];
//so in here , always before pushing a data line, we just ask the orb for size, align, spacer, and font as well . and dESpacer
//uses these parameters to always keep all lines on the text properly positioned.. We need to compose font and put it on
//every line state right here. 
//ctx.font = "bold 48px serif";
//o.tspacer=15; o.tsize=18; o.tstyle = 'normal'; o.font='courier new';
								var font = o.tstyle+' '+o.tsize+'px '+o.tfont;
								Line.state.font = font;
								Line.state.align = o.talign;
								//Line.x=o.txtX; Line.y=o.txtY;
								Line.x=o.x; Line.y=o.y;
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
					if(o.Asp=='oscillator'){
						var nob = [];
						for (var i = 0; i < op.length; i++) {
							var ttb = txtToB(op[i]); nob.push(ttb);
						}
						o.oscTL = nob;
						return //[]  //not sure what to return here
					}
					return 'end'

//audio......

			}//switch
		}//orb
		return 'end'
	}

	if(RS.length==3){
		var cont = RS[1]; var ckey = RS[2];
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

//basic functions all orbs should have.
// >>orb/screenx/in
			if(cont=='screenx'){
				if(ckey=='in'){ o.screenx=op[0]; return }	
			}
// >>orb/screeny/in
			if(cont=='screeny'){
				if(ckey=='in'){ o.screeny=op[0]; return }	
			}
			if(cont=='random'){
// >>orb/random/min
				if(ckey=='min'){ o.random[0] = op[0]; return }
// >>orb/random/max
				if(ckey=='max'){ o.random[1] = op[0]; return }
			}


			if(cont=='text'){
				if(o.Asp=='text'){
// >>orb/text/inop
					if(ckey=='inop'){ o.inop = op[0]; dESpacer(o); return }
// >>orb/text/align
					if(ckey=='align'){ o.talign = op[0]; dESpacer(o); return }
// >>orb/text/style
					if(ckey=='style'){ o.tstyle = op[0]; dESpacer(o); return }

//fonts should be responsive to polarity, so we can toggle between fonts. definitely. but also we should be able to put
//a font value on here directly. of course.... we can probably decide what font to use when we create a DataLine.
// >>orb/text/font
					if(ckey=='font'){
						o.tfont = op[0]; dESpacer(o); return
					}
// >>orb/text/size
					if(ckey=='size'){
						o.tsize = op[0]; dESpacer(o); return
					}
// >>orb/text/spacer
					if(ckey=='spacer'){
						//maybe we need t parse number. same with size
						o.tspacer = op[0]; dESpacer(o); return
					}

//text/signat could hold a beats to determine how all new lines created by this orb will look by default.
// >>orb/text/signat
					if(ckey=='signat'){
						var nb = txtToB(op[0]);
						o.signat = nb; dESpacer(o); return
					}

					if(ckey=='cn'){
// >>orb/text/cn
						//.. maybe we need to check here if op[0] is a number?
						o.txtB=op[0]; return //[o.txtB]	

					}
					if(ckey=='new'){
// >>orb/text/new
       			//a loop to push new lines into the text without deleting any line previously there
						for (var i2 = 0; i2 < op.length; i2++) {
					//maybe we could use all lines txtX like params to create unique lines using orb params
							var dli = DataLine();
							var firstf = o.signat.slice(0); dli.beats = [firstf];
							var font = o.tstyle+' '+o.tsize+'px '+o.tfont;
							dli.state.font = font; dli.state.align = o.talign;
							dli.txt=op[i2];
							//dli.x=o.txtX; dli.y=o.txtY;
							dli.x=o.x; dli.y=o.y;
							//o.txtLi.splice(rln-1,0,dli);
							o.txtLi.push(dli);
						}
						dESpacer(o);
       						return
					}
//.... i dont think we need last tbh... i rememebr i included this for some reason... but that reason does not come into my mind now
//well last could be useful because we would replace the last line instead of ading a new one like "new" does
					if(ckey=='last'){
// >>orb/text/last
						//we want to put op[0] on the last line of the orb text... so we replace last line
						if(o.txtLi.length==0){
							var dli = DataLine();
							var firstf = o.signat.slice(0); dli.beats = [firstf];
							var font = o.tstyle+' '+o.tsize+'px '+o.tfont;
							dli.state.font = font; dli.state.align = o.talign;
							dli.txt=op[0];
							//dli.x=o.txtX; dli.y=o.txtY;
							dli.x=o.x; dli.y=o.y;
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
// >>orb/text/current
						var newl = o.txtB+(op.length-1);
						if(newl>o.txtLi.length){
							var subs = Diff(newl,o.txtLi.length);
							//add empty DataLines to make up for the difference 
							for (var i2 = 0; i2 < subs; i2++) {
								var dli = DataLine();
								var firstf = o.signat.slice(0); dli.beats = [firstf];
								var font = o.tstyle+' '+o.tsize+'px '+o.tfont;
								dli.state.font = font; dli.state.align = o.talign;
								dli.txt=''; dli.x=o.x; dli.y=o.y;
								o.txtLi.push(dli);
							}
		//but what if we wanted to put multilines in this position. we want that now, its convenient to manage texts
		//with data for multiple other orbs. also we could use algo01 random and screenxy...
//the other option would be to leave the possibility of not even pointing a target "text" so the instruction just modifies the target
//coordinates directly.why not both
						}
							
						for (var i3 = 0; i3 < op.length; i3++) {
							o.txtLi[(o.txtB+i3)-1].txt = op[i3];
						}

						dESpacer(o);
						return
					}


//am thinking.... we probably want to be able to just replace lines FROM the /text/number when dumping a multiliner..
//i actually need to do that now to reset values on a text to work for a script flow.. and this is better now...
//remember to do the ther ones.... i kinda dont wanna do that now...... so tired
// >>orb/text/number
					var rln = parseFloat(ckey);//we need to turn ckey into a number
					if(isNaN(rln)){return 'end'}
		//lets also add the length of op...
					var rlnop = rln+(op.length-1); ///
					//if(rln>o.txtLi.length){
					if(rlnop>o.txtLi.length){ ///
						//var subs = Diff(rln,o.txtLi.length); ///
						var subs = Diff(rlnop,o.txtLi.length)
						//add empty DataLines to make up for the difference 
						for (var i2 = 0; i2 < subs; i2++) {
							var dli = DataLine();
							var firstf = o.signat.slice(0); dli.beats = [firstf];
							var font = o.tstyle+' '+o.tsize+'px '+o.tfont;
							dli.state.font = font; dli.state.align = o.talign;
							dli.txt='';
							dli.x=o.x; dli.y=o.y;
							o.txtLi.push(dli);
						}
					}
					for (var i3 = 0; i3 < op.length; i3++) {
						o.txtLi[(rln+i3)-1].txt = op[i3];
					}

					dESpacer(o);
					return

				}
				//.. if no data defined, then we should return 'end'
				return 'end'
			}//text

			if(cont=='script'){
				if(o.Asp=='script'){
// >>orb/script/run
					if(ckey=='run'){ o.scR=op[0]; return }
// >>orb/script/last
					if(ckey=='last'){ o.scC[o.scC.length-1] = op[0]; return }

					//if(ckey=='current'){
// >>orb/script/current
		//this is a bit weird to have in here because current reffers to the currently executing instruction on the script
		//.. yeah probably we want to read and annalyze the current running instruction but change it ...? no this doesnt feel
		//right... but maybe we could still implement it somehow
						//o.scC[o.scB-1] = op[0];
						//return
					//}

// >>orb/script/new
					if(ckey=='new'){
						for (var i2 = 0; i2 < op.length; i2++) { o.scC.push(op[i2]); }
						return
					}

					if(ckey=='cn'){
// >>orb/script/cn
						//should only accept numbers.. max is number of lines in script
						//.. maybe we need to check here if op[0] is a number?
						o.scB=op[0]; return
					}
// >>orb/script/number
		//this command puts a new value on the target script instruction
		//we want to be able to place multiple lines from the line position indicated 
					//we need to turn ckey into a number
					var rln = parseFloat(ckey);
					if(isNaN(rln)){return 'end'}else{
						for (var i3 = 0; i3 < op.length; i3++) {
							o.scC[(rln+i3)-1] = op[i3];
						}
						return
					}

					return 'end'
				}

			}//script

			if(cont=='image'){
				if(o.Asp=='image'){
					if(ckey=='file'){
// >>orb/image/file
		//loading a file should should create a beat by default with image default properties? we expect a file name on op
						//use op[0] to find the image on LImg
						if(LImg.length==0){return 'end'}
						for (var i = 0; i < LImg.length; i++) {
							var Img = LImg[i];
							if(Img.name==op[0]){
								o.imgfile = op[0];
								o.imgS.img = Img.img;
								if(o.imgF.length==0){
									o.imgF = [];
									o.imgF.push(
										[
									//these coordinates need clarification..
											'x',0,'y',0,
											'w',Img.img.width,'h',Img.img.height,
											'px',0,'py',0,
											'pw',Img.img.width,'ph',Img.img.height,
											'wait',0,
											//'cx',eX,'cy',eY,
											'a',0.9,'layer',1
										]
									);
								}
								return 
							}//match
						}
						return 'end'
					}
					if(ckey=='run'){
// >>orb/image/run
						o.imgR=op[0]; return

					}

//>>orb/image/current
					if(ckey=='current'){var nb = txtToB(op[0]); o.imgF[o.imgB-1] = nb; return }
//>>orb/image/cn
					if(ckey=='cn'){
//...but if we select an index thats larger than currently defined number of beats... maybe we can fill the gaps with a copy of a beat
//taken  form the last one... yeah that makes sense. needs to work with polarity as well... we need to prevent the case where
//there is no beat to copy. in which case we simply do not create a beat..... but maybe this is exclusive behavior for the editor.
//...
						//.. maybe we need to check here if op[0] is a number?
						//if(o.imgB>o.imgF.length){

						//}
						o.imgB=op[0];
						return
					}

// >>orb/image/new
					if(ckey=='new'){
						for (var i2 = 0; i2 < op.length; i2++) {
							var nb = txtToB(op[i2]); o.imgF.push(nb);
						}
						return
					}

					if(ckey=='mirror'){
//>>orb/image/mirror
//mirror pretty much requires op because... what could mirror do on the left side RS? ... one sec $/image/mirror>> ... maybe an instruction
//to copy a beat.. this mirror system is not escalable and doesnt align with the sinthax now. we want something more like:
//mirror/orb/line... wait maybe we can adapt this.
						var ims = o.imgS;
						var mirror = {
							img:ims.img, is:'img',
							x:ims.x, y:ims.y, w:ims.w, h:ims.h,
							px:ims.px, py:ims.py, pw:ims.pw, ph:ims.ph,
							cx:ims.cx, cy:ims.cy, wait:0, waitc:0,
							a:ims.a, layer:ims.layer
						}
						var sm = Mirror(op[0],mirror);//,o.imgL);
						if(sm.layer==0){visual_q0.push(sm);} 
						if(sm.layer==1){visual_q1.push(sm);}
						if(sm.layer==2){visual_q2.push(sm);}
					//ouput returns the beat..
						o.o=op[0];
						return

					}//mirror
//test this now......
// >>orb/image/number
					var rln = parseFloat(ckey);
					if(isNaN(rln)){return 'end'}else{
						for (var i3 = 0; i3 < op.length; i3++) {
							var nb = txtToB(op[i3]);
							o.imgF[(rln+i3)-1] = nb; 
						}
						return
					}

					return 'end'
				}
			}

		//.. rememeber we need to consider text to beat and beat to text format transfomations in all these beat manipulations
			if(cont=='circle'){
				if(o.Asp=='circle'){
//....but now we have orbs with one aspect ... so it would make sense to use orb/aspect/x , y  to move the aspect center...
//ok so now all aspects would have a cx , cy ... but not in the beat.. now that i think about it.. it only makes beats more convoluted
//we should only reserve beats to use coordinates in refference to the aspect center. But we should control the center from the orb
//itself... however we can have both so.. 
// >>orb/circle/run
					if(ckey=='run'){o.cirR=op[0]; return}

					if(ckey=='current'){
// >>orb/circle/current
					//in here we need to transform text beat format into beat array
						var nb = txtToB(op[0]); o.cirF[o.cirB-1] = nb;
						return //CSout
					}

// >>orb/circle/cn
//.. maybe we need to check here if op[0] is a number?
					if(ckey=='cn'){o.cirB=op[0]; return}
// >>orb/circle/new
					if(ckey=='new'){
						for (var i2 = 0; i2 < op.length; i2++) {
							var nb = txtToB(op[i2]); o.cirF.push(nb);
						}
						return
					}				
// >>orb/circle/mirror
					if(ckey=='mirror'){
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
						var nb = txtToB(op[0]); o.cirF[rln-1] = nb; return
					}


				}//circle Aspect on

				return 'end'


			}//circle


			if(cont=='rectangle'){
				if(o.Asp=='rectangle'){
// >>orb/rectangle/run
					if(ckey=='run'){o.rectR=op[0]; return}
// >>orb/rectangle/current
					if(ckey=='current'){
						var nb = txtToB(op[0]); o.rectF[o.rectB-1] = nb;
						return //CSout
					}
// >>orb/rectangle/cn
// maybe we should check if the number is valid...
					if(ckey=='cn'){o.rectB=op[0]; return}

// >>orb/rectangle/new
					if(ckey=='new'){
						for (var i2 = 0; i2 < op.length; i2++) {
							var nb = txtToB(op[i2]); o.rectF.push(nb);
						}
						return
					}

					if(ckey=='mirror'){
// ?>>orb/rectangle/mirror
						var mirror = {
							is:'rect', 
							x:o.rectS.x, y:o.rectS.y, w:o.rectS.w, h:o.rectS.h,
							cx:o.x, cy:o.y,
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
					var nan = isNaN(rln);
					if(nan){return 'end'}

					if(o.rectF[rln-1]){
						var nb = txtToB(op[0]); o.rectF[rln-1] = nb; return
					}
				}
			}


//.. time... we see ranges of time. we can only work on past and future, we are never truly synched, we can only work with timelines
//We dont have beats on osc Aspect, we have tonelines. Tonelines are controled directly 
//osc are different. incomplete
			if(cont=='oscillator'){
				if(o.Asp=='oscillator'){
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
//this ok?... however if we push like this, and the oscilator is already running.. then what do we do. should we start running the
//tone inmediately? ..
// >>orb/oscillator/new
					if(ckey=='new'){
						for (var i2 = 0; i2 < op.length; i2++) {
							var ttb = txtToB(op[i2]); 
							o.oscTL.push(ttb);
						}
						return
					}
					//...
				}
			}//osc

		}

		//if we return here we save from asking unnecesary stuff
		return 'end'
	}

	if(RS.length==4){
		var cont = RS[1]; var ckey = RS[2]; var sub = RS[3];
		if(ent){
//... 4 keys on entity ? .... probly never. might as well not even ask
		}

		if(o){

			// o , pol, op , cont, ckey, sub . we are retrieving here CS[1] is cont , CS[2] is ckey

			if(cont=='text'){
				if(o.Asp=='text'){
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
							lastl.tB = op[0]; return
						}

// ?>>orb/text/last/mirror
						if(sub=='mirror'){
							var font = o.tstyle+' '+o.tsize+'px '+o.tfont;
							var mirror = {
								is:'txt',
								txt:lastl.txt,
								font:font,
								align:o.talign,
								x:lastl.state.x,
								y:lastl.state.y,
								r:lastl.state.r, g:lastl.state.g,
								b:lastl.state.b, a:lastl.state.a,
								layer:lastl.state.layer
							}
							var sm = Mirror(op[0],mirror);//,o.imgL);
							if(sm.layer==0){visual_q0.push(sm);} 
							if(sm.layer==1){visual_q1.push(sm);}
							if(sm.layer==2){visual_q2.push(sm);}
					//maybe we can output the state here in text format... just an idea..!!!!!
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
							var font = o.tstyle+' '+o.tsize+'px '+o.tfont;
							var mirror = {
								is:'txt',
					//when we select current line with no text it throws error
								txt:currl.txt,
								font:font,//'18px Courier New', //do we need font here.. ?
								align:o.talign,//'left', //by default could be left
								x:currl.state.x,//+window.innerWidth/2,
								y:currl.state.y,//+window.innerHeight/2,
								r:currl.state.r, g:currl.state.g,
								b:currl.state.b, a:currl.state.a,
								layer:currl.state.layer
							}
							var sm = Mirror(op[0],mirror);//,o.imgL);
							if(sm.layer==0){visual_q0.push(sm);} 
							if(sm.layer==1){visual_q1.push(sm);}
							if(sm.layer==2){visual_q2.push(sm);}
							//o.o=op[0];
							return

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
						var font = o.tstyle+' '+o.tsize+'px '+o.tfont;
						var mirror = {
							is:'txt',
							txt:irl.txt,
							font: font, //do we need font here.. ?
							align: o.talign, //by default could be left
							x:irl.state.x,//+window.innerWidth/2,
							y:irl.state.y,//+window.innerHeight/2,
							r:irl.state.r, g:irl.state.g,
							b:irl.state.b, a:irl.state.a,
							layer:irl.state.layer
						}
						var sm = Mirror(op[0],mirror);//,o.imgL);
						if(sm.layer==0){visual_q0.push(sm);} 
						if(sm.layer==1){visual_q1.push(sm);}
						if(sm.layer==2){visual_q2.push(sm);}
						o.o=op[0];
						return

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

			
			if(cont=='script'){
				if(o.Asp=='script'){
/*
					if(ckey=='screenx'){
// >>orb/script/screenx/in
						if(sub=='in'){o.screenx[0] = op[0]; return}
// >>orb/script/screenx/out
						//if(sub=='out'){o.screenx[1] = op[0]; return}
					}

					if(ckey=='screeny'){
// >>orb/script/screeny/in
						if(sub=='in'){o.screeny[0] = op[0]; return}
// >>orb/script/screeny/out
						//if(sub=='out'){o.screeny[1] = op[0]; return}
					}

					if(ckey=='random'){
// >>orb/script/random/min
						if(sub=='min'){o.random[0]=op[0]; return}
// >>orb/script/random/max
						if(sub=='max'){o.random[1]=op[0]; return}
// >>orb/script/random/out
						//if(sub=='out'){o.random[2]=op[0]; return}
					}

					return 'end'
*/
				}
			}

// >>orb/aspect/beat/param
			if(o.Asp==cont){
				var ret = beatParam(o,cont,ckey,sub,op[0],undefined);
				if(ret==undefined){return 'end'}
				//o.o = ret;//.toString();
				return //[ret[2]]
			}
		}// o
	
	}// length 4
//if we are here, it means operation wasnt succesful
	return 'end'
	
}//putRiValue


//we might be missing some keys...!!!!!!
const entAccess = function(){
	var res = [
	'~/name', '~/now', '~/orbs', '~/stance', '~/dsignat', '~/x', '~/y',
	'~/screenx', '~/screeny', '~/screenw', '~/screenh', '~/comprompt', '~/inprompt',
	'~/memheat', '~/out', '~/in', '~/limage'
	]
	return res
}

const orbAccess = function(o){
	var res = [];
	var n = o.name;
	res.push(
		n+'/name', n+'/aspect', n+'/x', n+'/y',
		n+'/screenx/in', n+'/screenx/out', n+'/random/min', n+'/random/max',n+'/random/out'
	);
	
	if(o.Asp=='text'){
		res.push(
			n+'/text', n+'/text/cn', n+'/text/signat', n+'/in', n+'/text/font', n+'/text/size', n+'/text/spacer'
		);
	}
	if(o.Asp=='script'){
		res.push(
			n+'/script', n+'/script/run', n+'/script/cn', n+'/out'
		);
	}
	if(o.Asp=='circle'){
		res.push(
			n+'/circle', n+'/circle/run', n+'/circle/cn', n+'/circle/current/radius'
		);
	}
	if(o.Asp=='rectangle'){
		res.push(
			n+'/rectangle', n+'/rectangle/run', n+'/rectangle/cn', n+'/rectangle/current/w'

		);
	}
	if(o.Asp=='oscillator'){
		res.push(
			n+'/oscillator', n+'/oscillator/run'//, n+'/oscillator/' //we want to say osc/current..
		);
	}
	if(o.Asp=='image'){
		res.push(
			n+'/image', n+'/image/file', n+'/image/run', n+'/image/cn'
		);
	}
	return res
}



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
			var contstr = 'oscTL';  //var bstr = 'oscB';
//..so instead of multiple loops, lets just asign name+audiotype+line and search for that on oscCue.. but this means we cant
//adress all oscillators at once. No matter what i do there is always a new thing to considerate. I migth as well just focus on
//writing everything as modular as possible. Maybe we should even have 2 arrays instead of one oscCue. This way i dont need to
//add even more tags to find states i l just focus on name and line, oscCue  audioCue . 
			if(o.oscPA){
				var k = parseFloat(key);
				for (var i = 0; i < oscCue.length; i++) {
					var os = oscCue[i];
					if(os.origin==o.name){
						if(os.toneline==k){
							switch(sub){
//['start',0,'duration',2,'frequency',432,'gain',0.07,'fadein',0.3,'fadeout',0.3,'type',0]
								case 'frequency':
									if(op){os.oscn.frequency.value=op;}
									if(pol){
										os.oscn.frequency.value +=pol;
									}
									break
								case 'gain':
									if(op){os.oscg.gain.value=op;}
									if(pol){
										os.oscg.gain.value +=pol;
									}
									break
								//case '':
								//	break
							}
						}//toneline match
					}//origin name match
				}//sound cue loop
			}//osc playing already
			break
		return //return if no cont match
	}

	if(o[contstr]==undefined){return}

	//.. key needs to create a number but to access the number.. we need the container to tell use its corresponding beat
	switch(key){
		case 'current':
			var kstr = o[bstr]-1;//-1;
			if(isNaN(kstr)){return}
			break
		case 'last':
			var ocont = o[contstr];
			if(ocont==undefined){return}
			var kstr = o[contstr].length-1;
			if(isNaN(kstr)){return}
			break
		default:
			//key is a number now.. not sure if parse is necesary again.. ? 
			var k = parseFloat(key);
			var kstr = k-1; 
			if(isNaN(kstr)){return}
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
//.. there is a detail with certain image aspects parameters. When we modify w or h, i noticed is convenient to also modify pw and ph
//because we can already deform the image if we simply modify pw or ph, but is we simply want to extract a bigger size and not deform it
//we actually need to synch changes on w pw and h ph, which is an annoyance. The system should probably handle this automatically.
//we dont want to have a script to this everytime either.... but its a bit complicated to do this. maybe later
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
}//beatParam




//COMMAND ANNALIZER PEAK
//.. maybe a third parameter to let the function know if it should evaluate to kick command into ALOrbs. kick
const comA = function(S,C,kick){ 

//... we could definitely evaluate for : and # outside from comA !!!!11  comA2
//If we use ':' at left side of '>>', we can make multiple lines to go into a container. space is used to split into lines so
//text must be properly formated to be picked by the system. returns and array with multilines on left side
	if(C[0]==':'){
// :multiliner>>RS
//we probably want the last line to be '>>something' and be its own line. yes i like this. ok so in order to use ':' , we need to
//do ' ' and '>>target' at the end always.. maybe we could improve this sinthax a bit
//... we havent added '>>>' to multiliners...we should. ok added already.

		var ml = C.substr(1);
		var mla = ml.split(' ');
		var RS = mla.pop();
// >>>   Ok so we want to check if RS[2] == '>' , if so, then var multi = true
		if(RS[2]=='>'){var RSml = RS.substr(3); var multi = true;}else{var RSml = RS.substr(2);}
		//var RSml = RS.substr(2);//extract '>>'
		var SRSml = RSml.split('/');

		var r0 = SRSml[0];
		if(r0=='~'){var ro = {name:'~'};}
//..r0 cant be stancE, r is target.. signal goes from caster to target, stance is always caster... tho we probly want to be able
//to say :asd something asasdq >>%/text .... or $/text... 
		if(r0=='%'){var ro = FFting('name',stancE);}//this might need tunning. we could also reffer to entity!
		if(r0=='$'){var ro = FFting('name',S);}
		if(ro==undefined){var ro = FFting('name',r0);}
		if(ro){

			var targ = [];
			if(multi){
				//i dont even need to ask if SRSh[1] is 'text'..
				if(ro.Asp=='text'){
					for (var i = 0; i < ro.txtLi.length; i++) {
						var Stor = ro.txtLi[i].txt.split('/');
				//maybe later implement being able to send to other containers,  but for now just orb/text
						var tor = Fting(textOrbs,'name',Stor[0]); ///implementlater
						//also, this multi target signals should not accept $ or % or ~.. maybe ~ later
						if(tor){
							var res = putRiValue(mla,Stor,tor);
							//scriptF
				//we want a tag to find the inteacting actors, and an instruction to let scriptF know what happened.
							//targ.push([tor.name,res]);
							targ.push({name:tor.name,res:res});
						}
					}
					if(tor){
						ro.sfeed.push(['transfer',undefined,targ]);
						return
					}else{
						ro.sfeed.push(['transfer','end',targ]);
						return 'end'
					}
				}
			}

			var res = putRiValue(mla,SRSml,ro);//,0);

			//scriptF
	//.. ro might be  ~
			//targ.push([ro.name,res]);
			targ.push({name:ro.name,res:res});
			if(ro.name=='~'||S=='~'){
				eF.push(['transfer',res,targ]);
			}else{
				ro.sfeed.push(['transfer',res,targ]);
			}
//return end if operation wasnt succesful so 'end' prevents the second instruction if any.. : doesnt allow them tho hmmmm.......!!!!!!!
			return res 
		}
		return 'end'

	}

//we good here. hashtag has a more manageable structure now.
	if(C[0]=='#'){
		var MS = C.split('>>');
//# always needs >> .... BUT we want to do an exception with mirror. .. Because we want to be able to dump literals as beat into
//a mirror? but can do #beatline>>mirror no problem
		if(MS.length>1){ // ??>>??>>??>>??

//we want to make LSout into everything until the last '>>'.. and RSh must be the last '>>'.. but first we check if its just a number
			var RSh = MS.pop();
			var LSh = MS.join('>>'); var rmhash = LSh.substr(1); //we need to remove the #
			var LSout = []; 
//new and definitive way to check if value is a number we can work with or a combination of letters and number or just letters!!!!!!!!
			if(isNaN(rmhash)){LSout.push(rmhash); }else{ var num = parseFloat(rmhash); LSout.push(num);}
		}else{return 'end'}

		var SRSh = RSh.split('/');
// >>>   Ok so we want to check if RSh[0] == '>' , if so, then var multi = true
		if(SRSh[0][0]=='>'){var r0 = SRSh[0].substr(1); var multi = true;}else{var r0 = SRSh[0];}
		/////
		//var r0 = SRSh[0];
		if(r0=='~'){var ro = {name:'~'};}
		if(r0=='%'){var ro = FFting('name',stancE);}//this might need tunning. we could also reffer to entity!
		if(r0=='$'){var ro = FFting('name',S);}
		if(ro==undefined){var ro = FFting('name',r0);}
// >>> if multi, we want to put LSout on all orbs listed on text RS. we might as well just ask if SRSh[1] =='text'
		if(ro){
			var targ = [];
			if(multi){
				//i dont even need to ask if SRSh[1] is 'text'..
				if(ro.Asp=='text'){
					for (var i = 0; i < ro.txtLi.length; i++) {
						var Stor = ro.txtLi[i].txt.split('/');
						var tor = FFting('name',Stor[0]);
						//also, this multi target signals should not accept $ or % or ~.. maybe ~ later
						if(tor){
							var res = putRiValue(LSout,Stor,tor);
							//scriptF
							//targ.push([tor.name,res]);
							targ.push({name:tor.name,res:res});
						}

					}
					if(tor){
						ro.sfeed.push(['transfer',undefined,targ]);
						return
					}else{
						ro.sfeed.push(['transfer','end',targ]);
						return 'end'
					}

				}
			}
			/////
			var res = putRiValue(LSout,SRSh,ro);
			//scriptF
			//... ro might not have a name
			targ.push({name:ro.name,res:res});
			if(ro.name=='~'||S=='~'){
				eF.push(['transfer',res,targ]);
			}else{
				ro.sfeed.push(['transfer',res,targ]);
			}

			return res //return end if operation wasnt succesful
		}
		return 'end'

	}//#

// ==
	var MS = C.split('=='); 
	if(MS.length==2){ // just 2 sides to compare
		/////////////testing.. worked.. but now need testing again
		if(kick){
			var match = regxt.test(MS[0]); //'text'
			if(match){
				var or = Fting(scriptOrbs,'name',S);
				if(or){
					ALOrbs.push( {st:S, com:or.scC[or.scB-1]} ); return 'end' //////!!!!!!!!!!!!!!!
				}	
			}
		}
//conditions may take literals after '=='
		//scriptF
		var targ = [];

		var LS = MS[0].split('/');
		var l0 = LS[0];
		if(l0=='~'){var lo = {name:'~'};} //var lof = {x:eX, y:eY};} //scriptF
		if(l0=='%'){var lo = FFting('name',stancE);}//this might need tunning. we could also reffer to entity!
		if(l0=='$'){var lo = FFting('name',S);}
		if(lo==undefined){var lo = FFting('name',l0);}
		if(lo){
			var LSout = getLeValue(LS,lo);//!!!
			//scriptF
			if(LSout=='end'){
				if(lo.name=='~'||S=='~'){
					eF.push(['compare',LSout,targ]);
				}else{
					lo.sfeed.push(['compare',LSout,targ]);
				}
				return 'end'
			}
		}else{
			//and we need a script feedback here as well..!!!!!!!!
			return 'end'
		}

		var RS = MS[1].split('/');
		var r0 = RS[0];
		//we can now have literals after '=='
// ==#
		if(r0[0]=='#'){
			var rmhash = r0.substr(1); //we need to remove the #
			var RSout = []; 
//new and definitive way to check if value is a number we can work with or a combination of letters and number or just letters!!!!!!!!
			if(isNaN(rmhash)){RSout.push(rmhash); }else{ var num = parseFloat(rmhash); RSout.push(num);}
			//scriptF
			var ro = {name:'~'};
			//targ.push([ro.name,RSout]);
			targ.push({name:ro.name,res:RSout});
		}else{
			if(r0=='~'){var ro = {name:'~'};} 
			if(r0=='%'){var ro = FFting('name',stancE);}//this might need tunning. we could also reffer to entity!
			if(r0=='$'){var ro = FFting('name',S);}
			if(ro==undefined){var ro = FFting('name',r0);}
			if(ro){
				var RSout = getLeValue(RS,ro);//!!!!
				//scriptF
				//targ.push([ro.name,RSout]);
				targ.push({name:ro.name,res:RSout});
				if(RSout=='end'){
					if(lo.name=='~'||S=='~'){
						eF.push(['compare',RSout,targ]);
					}else{
						lo.sfeed.push(['compare',RSout,targ]);
					}
					return 'end'
				}
			}else{
				//... feedback here also missing!!!!!
				return 'end'
			}
		}
	


//check for left side as retrieve value.  check right side also as retrieve value. compare
		var lsout = LSout.toString();	var rsout = RSout.toString();
//return and let second ins run if any, return end if condition wasnt met.
		if(lsout==rsout){
			if(lo.name=='~'||S=='~'){
				eF.push(['compare',undefined,targ]); //LSout must not be 'end'
			}else{
				lo.sfeed.push(['compare',undefined,targ]);
			}
			return
		}else{
			if(lo.name=='~'||S=='~'){
				eF.push(['compare','end',targ]); //its 'end' because comparison failed
			}else{
				lo.sfeed.push(['compare','end',targ]);
			}
			return 'end'
		}
	}// '=='


//so conditions using '==' are perfectly fine when dealing with text lines.. but dealing with number counters is not ideal because
//sometimes numbers will skip the condition because we might use counters adding by values higher than 1. So we can
//just implement <= >= right here to prevent this.
//<= and >= coul be optimized i know, but for now.... this
		//
//>=
	var MS = C.split('>='); 
	if(MS.length==2){ // just 2 sides to compare
		/////////////testing.. worked.. but now need testing again
		if(kick){
			var match = regxt.test(MS[0]); //'text'
			if(match){
				var or = Fting(scriptOrbs,'name',S);
				if(or){
					ALOrbs.push( {st:S, com:or.scC[or.scB-1]} ); return 'end' //////!!!!!!!!!!!!!!!
				}	
			}
		}
//conditions may take literals after '>='
		//scriptF
		var targ = [];

		var LS = MS[0].split('/');
		var l0 = LS[0];
		if(l0=='~'){var lo = {name:'~'};} 
		if(l0=='%'){var lo = FFting('name',stancE);}//this might need tunning. we could also reffer to entity!
		if(l0=='$'){var lo = FFting('name',S);}
		if(lo==undefined){var lo = FFting('name',l0);}
		if(lo){
			var LSout = getLeValue(LS,lo);//!!!
			//scriptF
			if(isNaN(LSout[0])){//return 'end'} if(isNaN(RSout[0])){return 'end'}
			//if(LSout=='end'){
				if(lo.name=='~'||S=='~'){
					eF.push(['compare','end',targ]);
				}else{
					lo.sfeed.push(['compare','end',targ]);
				}
				return 'end'
			}
		}else{
			//and we need a script feedback here as well..!!!!!!!!
			return 'end'
		}

		var RS = MS[1].split('/');
		var r0 = RS[0];
// >=#
		if(r0[0]=='#'){
			var rmhash = r0.substr(1); //we need to remove the #
			var RSout = [];
//new and definitive way to check if value is a number we can work with or a combination of letters and number or just letters!!!!!!!!
			if(isNaN(rmhash)){
				RSout.push(rmhash); var res = 'end';
			}else{
				var num = parseFloat(rmhash); RSout.push(num); var res = undefined;
			}
			//scriptF
			var ro = {name:'~'};
			targ.push({name:ro.name,res:res});

		}else{
			if(r0=='~'){var ro = {name:'~'};} 
			if(r0=='%'){var ro = FFting('name',stancE);}//this might need tunning. we could also reffer to entity!
			if(r0=='$'){var ro = FFting('name',S);}
			if(ro==undefined){var ro = FFting('name',r0);}
			if(ro){
				var RSout = getLeValue(RS,ro);//!!!!
				//scriptF
				//targ.push([ro.name,RSout]);
				if(isNaN(RSout[0])){ //return 'end'} if(isNaN(RSout[0])){return 'end'}
					targ.push({name:ro.name,res:'end'});
				}else{
					targ.push({name:ro.name,res:undefined});
				}

				if(isNaN(RSout[0])){//return 'end'} if(isNaN(RSout[0])){return 'end'}
				//if(RSout=='end'){
					if(lo.name=='~'||S=='~'){
						eF.push(['compare','end',targ]);
					}else{
						lo.sfeed.push(['compare','end',targ]);
					}
					return 'end'
				}
			}else{
				//... feedback here also missing!!!!!
				return 'end'
			}
		}
	

//check for left side as retrieve value.  check right side also as retrieve value. compare
		//var lsout = LSout.toString();	var rsout = RSout.toString();
//return and let second ins run if any, return end if condition wasnt met.
		if(LSout[0]>=RSout[0]){
			if(lo.name=='~'||S=='~'){
				eF.push(['compare',undefined,targ]); //LSout must not be 'end'
			}else{
				lo.sfeed.push(['compare',undefined,targ]);
			}
			return
		}else{
			if(lo.name=='~'||S=='~'){
				eF.push(['compare','end',targ]); //its 'end' because comparison failed
			}else{
				lo.sfeed.push(['compare','end',targ]);
			}
			return 'end'
		}
	}// '>='



//<=
	var MS = C.split('<='); 
	if(MS.length==2){ // just 2 sides to compare
		/////////////testing.. worked.. but now need testing again
		if(kick){
			var match = regxt.test(MS[0]); //'text'
			if(match){
				var or = Fting(scriptOrbs,'name',S);
				if(or){
					ALOrbs.push( {st:S, com:or.scC[or.scB-1]} ); return 'end' //////!!!!!!!!!!!!!!!
				}	
			}
		}
//conditions may take literals after '>='
		//scriptF
		var targ = [];

		var LS = MS[0].split('/');
		var l0 = LS[0];
		if(l0=='~'){var lo = {name:'~'};} 
		if(l0=='%'){var lo = FFting('name',stancE);}//this might need tunning. we could also reffer to entity!
		if(l0=='$'){var lo = FFting('name',S);}
		if(lo==undefined){var lo = FFting('name',l0);}
		if(lo){
			var LSout = getLeValue(LS,lo);//!!!
			//scriptF
			if(isNaN(LSout[0])){//return 'end'} if(isNaN(RSout[0])){return 'end'}
			//if(LSout=='end'){
				if(lo.name=='~'||S=='~'){
					eF.push(['compare','end',targ]);
				}else{
					lo.sfeed.push(['compare','end',targ]);
				}
				return 'end'
			}
		}else{
			//and we need a script feedback here as well..!!!!!!!!
			return 'end'
		}

		var RS = MS[1].split('/');
		var r0 = RS[0];
// <=#
		if(r0[0]=='#'){
			var rmhash = r0.substr(1); //we need to remove the #
			var RSout = [];
//new and definitive way to check if value is a number we can work with or a combination of letters and number or just letters!!!!!!!!
			if(isNaN(rmhash)){
				RSout.push(rmhash); var res = 'end';
			}else{
				var num = parseFloat(rmhash); RSout.push(num); var res = undefined;
			}
			//scriptF
			var ro = {name:'~'};
			targ.push({name:ro.name,res:res});

		}else{
			if(r0=='~'){var ro = {name:'~'};} 
			if(r0=='%'){var ro = FFting('name',stancE);}//this might need tunning. we could also reffer to entity!
			if(r0=='$'){var ro = FFting('name',S);}
			if(ro==undefined){var ro = FFting('name',r0);}
			if(ro){
				var RSout = getLeValue(RS,ro);//!!!!
				//scriptF
				//targ.push([ro.name,RSout]);
				if(isNaN(RSout[0])){ //return 'end'} if(isNaN(RSout[0])){return 'end'}
					targ.push({name:ro.name,res:'end'});
				}else{
					targ.push({name:ro.name,res:undefined});
				}

				if(isNaN(RSout[0])){//return 'end'} if(isNaN(RSout[0])){return 'end'}
				//if(RSout=='end'){
					if(lo.name=='~'||S=='~'){
						eF.push(['compare','end',targ]);
					}else{
						lo.sfeed.push(['compare','end',targ]);
					}
					return 'end'
				}
			}else{
				//... feedback here also missing!!!!!
				return 'end'
			}
		}
	

//check for left side as retrieve value.  check right side also as retrieve value. compare
		//var lsout = LSout.toString();	var rsout = RSout.toString();
//return and let second ins run if any, return end if condition wasnt met.
		if(LSout[0]<=RSout[0]){
			if(lo.name=='~'||S=='~'){
				eF.push(['compare',undefined,targ]); //LSout must not be 'end'
			}else{
				lo.sfeed.push(['compare',undefined,targ]);
			}
			return
		}else{
			if(lo.name=='~'||S=='~'){
				eF.push(['compare','end',targ]); //its 'end' because comparison failed
			}else{
				lo.sfeed.push(['compare','end',targ]);
			}
			return 'end'
		}
	}// '<='



/*
//idea
so maybe we do need math .. i can imagine taking 2 values, puting them on a text, then using those values to perform
aditions , subtractions... and even divisions... or multiplications.. operation would return 'math/res' and then we use
res as LS for RS !!!!!!!!!!
o1/text/1++o1/text/2>>o2/circle/1/x
o1/text/1--o1/text/2>>o2/circle/1/x
o1/text/1%%o1/text/2>>o2/circle/1/x
o1/text/1**o1/text/2>>o2/circle/1/x
*/

//in here we can already check if this is a solo command like loadimage or jsonin
	//we should not be able to call loadimage and loadaudio from a script.... at least not yet
	var scom = getCom(C);
	//scriptF
	if(scom){
		//getCom is a bit weird because when scom is true, we just want to end. solo commands dont allow second instructions.
		//so its a succesful operation but its ending anyway.. might change this later but for now its ok
		eF.push(['core',undefined,[]]); //empty array, no target
		return 'end'
	}

	///////////////////////////////////////////////!!!!!!!

//main split. if an operation is successful, we simply return, if we cant find the caster or the target, we return 'end' , so the
//instruction after '<>' if any, wont be executed
//we dont have # , : , == , all is left is checking if LS is a signal , a solo command or a retrieve command
	var MS = C.split('>>');
	//we can inmediately stop here if we know.. 
	if(MS.length==1){
		//its a solo retrieve. we ask now if stance is a text orb, if so we print data here
		var so = Fting(textOrbs,'name',S);
		if(so){
			if(so.text){
				var LS = MS[0].split('/');
				var l0 = LS[0];
				if(l0=='~'){var lo = {name:'~'};} //var lof = {x:eX, y:eY};} //scriptF
				if(l0=='%'){var lo = FFting('name',stancE);}//this might need tunning. we could also reffer to entity!
				if(l0=='$'){var lo = FFting('name',S);}
				if(lo==undefined){var lo = FFting('name',l0);}
				if(lo){
					var targ = [];
					var ret = getLeValue(LS,lo); //we dont need to pass S now
					//scriptF
					targ.push({name:lo.name,res:ret});
					if(ret=='end'){
						so.sfeed.push(['transfer',ret,targ]);
						return 'end'
					}

					so.sfeed.push(['transfer',ret,targ]);

					for (var i = 0; i <= ret.length-1; i++) {
						var text = ret[i];
						if(so.txtLi[i]){so.txtLi[i].txt=text;}else{
							var Line = DataLine();
							var firstf = so.signat.slice(0);
							Line.beats = [firstf];
							var font = so.tstyle+' '+so.tsize+'px '+so.tfont;
							Line.state.font = font;
							Line.state.align = so.talign;
							Line.x=so.x; Line.y=so.y;
							Line.txt=text;
							so.txtLi.push(Line);
						}
					}
					//remove lines from previous text if any. we just want what we created now
					if(so.txtLi.length>ret.length){so.txtLi.splice(ret.length);}
					dESpacer(so);
					return //[]  //not sure what to return here
				}
			}
		}
		//needs feedback probaly
		return 'end'
	}

	if(MS.length>1){
		/////////////testing.. works. we only care when these patterns are on the left side of ">>"
		if(kick){
			var match = regxt.test(MS[0]);// "text"
			if(match){
				var or = Fting(scriptOrbs,'name',S);
				ALOrbs.push( {st:S, com:or.scC[or.scB-1]} ); return 'end'
			}
			var match = regxi.test(MS[0]);// "/in"
			if(match){
				var or = Fting(scriptOrbs,'name',S);
				ALOrbs.push( {st:S, com:or.scC[or.scB-1]} ); return 'end'
			}
			var match = regxo.test(MS[0]);// "/out"
			if(match){
				var or = Fting(scriptOrbs,'name',S);
				ALOrbs.push( {st:S, com:or.scC[or.scB-1]} ); return 'end'
			}
		}
		////////////

		var LS = MS[0].split('/');  var l0 = LS[0]; 

		if(l0=='~'){var lo = {name:'~'};}
		if(l0=='%'){var lo = FFting('name',stancE);}//this might need tunning. we could also reffer to entity,,!!!!!!!!!
		if(l0=='$'){var lo = FFting('name',S);}
		if(lo==undefined){var lo = FFting('name',l0);}

		var RS = MS[1].split('/');  //var r0 = RS[0]; //
// >>>   Ok so we want to check if RSh[0] == '>' , if so, then var multi = true
		if(RS[0][0]=='>'){var r0 = RS[0].substr(1); var multi = true;}else{var r0 = RS[0];}
		RS[0]=r0;

	//maybe we could add literals here, so we use literals to point to access keys.... would be kinda crazy but consistent
		//same with putRiValue
		if(r0=='~'){var ro = {name:'~'};}
		if(r0=='%'){var ro = FFting('name',stancE);}//this might need tunning. we could also reffer to entity,,!!!!!!!!!
		if(r0=='$'){var ro = FFting('name',S);}
		if(ro==undefined){var ro = FFting('name',r0);}
			
		if(lo){ 
			var targ = [];
			var LSout = getLeValue(LS,lo); //we dont need to pass S now
			if(LSout=='end'){
				if(lo.name=='~'||S=='~'){
					eF.push(['transfer','end',targ]);
				}else{
					lo.sfeed.push(['transfer','end',targ]);
				}
				return 'end'
			}

			if(ro){	
	// >>>

				if(multi){
					if(ro.Asp=='text'){
						for (var i = 0; i < ro.txtLi.length; i++) {
							var Stor = ro.txtLi[i].txt.split('/');
							var tor = FFting('name',Stor[0]);
							//also, this multi target signals should not accept $ or % or ~.. maybe ~ later
							if(tor){
								var res = putRiValue(LSout,Stor,tor);
								//scriptF
								targ.push({name:tor.name,res:res});

							}
						}
						if(tor){
							if(lo.name=='~'||S=='~'){
								eF.push(['transfer',undefined,targ]);
							}else{
								lo.sfeed.push(['transfer',undefined,targ]);
							}
							return
						}else{
							if(lo.name=='~'||S=='~'){
								eF.push(['transfer','end',targ]);
							}else{
								lo.sfeed.push(['transfer','end',targ]);
							}
							return 'end'
						}
					}
				}
	//its a retrieve from left orb into right orb... but we dont need to check again on getLeValue. we just pass LS, lo
				//var lres = getLeValue(LS,lo); //we dont need to pass S now
				var res = putRiValue(LSout,RS,ro);
				//scriptF
				targ.push({name:ro.name,res:res});
				if(res=='end'){
					if(lo.name=='~'||S=='~'){
						eF.push(['transfer',res,targ]);
					}else{
						lo.sfeed.push(['transfer',res,targ]);
					}
					return 'end'
				}else{
					if(lo.name=='~'||S=='~'){
						eF.push(['transfer',res,targ]);
					}else{
						lo.sfeed.push(['transfer',res,targ]);
					}
					return
				}


			}//lo and ro

			//.. a feed for only lo and no ro here prbly
			return 'end'

		}else{
			//its a signal
		//sfeed on signals could be more specific to the signal itself so we probly want to implement this inside comRiTarget
			var res = comRiTarget(LS,RS,S);
			//scriptF(undefined,undefined,res,'comRi');  //also, we need a different way to process comRi
			if(res=='end'){
		//we prbly want script feed s here and..
				return 'end'
			}else{
		//..here..
				return
			}

		}
	}



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

const FFting = function(p,v){
	var o = Fting(scriptOrbs,p,v);
	if(o){return o}
	var o = Fting(textOrbs,p,v);
	if(o){return o}
	var o = Fting(circleOrbs,p,v);
	if(o){return o}
	var o = Fting(rectOrbs,p,v);
	if(o){return o}
	var o = Fting(imageOrbs,p,v);
	if(o){return o}
	var o = Fting(oscOrbs,p,v);
	if(o){return o}
	var o = Fting(audioOrbs,p,v);
	if(o){return o}
}

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





const scriptF = function(tara){ //lets take an aray with orbs names
	for (var i = 0; i < tara.length; i++) {
		var o = FFting('name',tara[i]);
	//we define all params used on feed considering o as staNce
		if(o){
			var fcont = o.sfeed; var fromx = o.x; var fromy = o.y;
	//else we define all params used considering no staNce
		}else{
			var fcont = eF; var fromx = eX; var fromy = eY;
		}
		//ask for feeds
		for (var i2 = 0; i2 < fcont.length; i2++) {
			var F = fcont[i2];
		 	//F is [type,result,[{name:targetname, res:targetres}{name:targetname, res:targetres}]]
			var feeds = [];
			//caster circle
			var cac = {r:110, g:110, b:110, a:0.4, cx:fromx, cy:fromy, x:0, y:0, radius:14, is:'circle', inside:'filled'};
			//we can ask for Fp[1] before all this. so we adjust cac red
			if(F[1]=='end'){cac.r = 250;}
//eF.push(['transfer',res,targ]);
			switch(F[0]){
				case 'core':
					cac.g = 220; cac.radius = 200; cac.a=0.3;// cac.cx=eX; cac.cy=eY; cac.r=r;
					feeds.push(cac);
					break
				case 'transfer':
					for (var i3 = 0; i3 < F[2].length; i3++) {
			var lin = {r:110, g:150, b:110, a:0.4, sx:fromx, sy:fromy, tx:0, ty:0, is:'line'};
			var tac = {r:110, g:150, b:110, a:0.4, cx:0, cy:0, x:0, y:0, radius:33, is:'circle', inside:'empty'}; 
						var to = FFting('name',F[2][i3].name);
						if(to){
							lin.tx=to.x; lin.ty=to.y; tac.cx=to.x; tac.cy=to.y;
						}
						if(F[2][i3].name=='~'){
							lin.tx=eX; lin.ty=eY; tac.cx=eX; tac.cy=eY;
						}

						if(F[2][i3].res=='end'){
							lin.r=250; lin.g=110; tac.r=250; tac.g=110;
						}

						feeds.push(lin,tac);
					}
					cac.radius = 33; cac.inside='empty';
					feeds.push(cac);

					break
				case 'signal':
					for (var i3 = 0; i3 < F[2].length; i3++) {
			var lin = {r:160, g:180, b:180, a:0.4, sx:fromx, sy:fromy, tx:0, ty:0, is:'line'};
			var tac = {r:160, g:180, b:180, a:0.4, cx:0, cy:0, x:0, y:0, radius:25, is:'circle', inside:'filled'}; 
						var to = FFting('name',F[2][i3].name);
						if(to){
							lin.tx=to.x; lin.ty=to.y; tac.cx=to.x; tac.cy=to.y;
						}
						if(F[2][i3].name=='~'){
							lin.tx=eX; lin.ty=eY; tac.cx=eX; tac.cy=eY;
						}

						if(F[2][i3].res=='end'){
							lin.r=250; lin.g=180; tac.r=250; tac.g=180;
						}

						feeds.push(lin,tac);
					}
					cac.radius = 25; cac.inside='empty';
					feeds.push(cac);

					break
				case 'compare':
					for (var i3 = 0; i3 < F[2].length; i3++) {
			var lin = {r:110, g:110, b:170, a:0.6, sx:fromx, sy:fromy, tx:0, ty:0, is:'line'};
			var tac = {r:110, g:110, b:170, a:0.6, cx:0, cy:0, x:0, y:0, radius:44, is:'circle', inside:'empty'}; 
						var to = FFting('name',F[2][i3].name);
						if(to){
							lin.tx=to.x; lin.ty=to.y; tac.cx=to.x; tac.cy=to.y;
						}
						if(F[2][i3].name=='~'){
							lin.tx=eX; lin.ty=eY; tac.cx=eX; tac.cy=eY;
						}

						if(F[2][i3].res=='end'){
							lin.r=250; lin.g=110; tac.r=250; tac.g=110;
						}

						feeds.push(lin,tac);
					}
					cac.radius = 44; cac.inside='empty';
					feeds.push(cac);

					break

				case 'delete':
					for (var i3 = 0; i3 < F[2].length; i3++) {
			var lin = {r:150, g:110, b:110, a:0.5, sx:fromx, sy:fromy, tx:0, ty:0, is:'line'};
			var tac = {r:150, g:110, b:110, a:0.5, cx:0, cy:0, x:0, y:0, radius:50, is:'circle', inside:'filled'}; 
						var to = FFting('name',F[2][i3].name);
						if(to){
							lin.tx=to.x; lin.ty=to.y; tac.cx=to.x; tac.cy=to.y;
						}
						if(F[2][i3].name=='~'){
							lin.tx=eX; lin.ty=eY; tac.cx=eX; tac.cy=eY;
						}

						if(F[2][i3].res=='end'){
							lin.r=250; lin.g=110; tac.r=250; tac.g=110;
						}

						feeds.push(lin,tac);
							
					}
					cac.radius = 50; cac.inside='empty';
					feeds.push(cac);

					break
				default:
					//push as idle
					feeds.push(cac);
					break
			}

			for (var i4 = 0; i4 < feeds.length; i4++) {visual_q3.push(feeds[i4]);}

		} //o.sfeed loop

		if(o){o.sfeed=[];}else{eF = [];}
		//fcont = [];

	}//feed loop
} //scriptF









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

		//i think we use actx now..
		//actx.decodeAudioData(ev.target.result).then(function(buffer) {
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



//PEAK PHONESCEEN 2024
/*
Most of the logc is recyclable , we just need to change containers and actually redesign how touches will work in sunya...ok
So we need a circular area on the screen, adjustable of course. once we touch and hold any part inside this area, it becomes a new
circle layered with the touch at the center. when we swipe just a bit further away from the center and we touch a first layer, the screen
moves slowly at first, then faster if we swipe further away. This is probably going to be a screen displacement exclusive mechanic
because i ve already tested it, its just feels nice to move around like this on a phone.
we will also have buttons to be called when we touch specific things on the screen.

*/


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
	/*	
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
							//s.gesID=touch.identifier; s.gesEND=false;
							//s.ges=[{X:clX, Y:clY}]; s.gesPRESS=0;
							//s.tchev = true;
			
							var nvt=true;
							//no break for k  
						}//dist match
					}//k

				}// no bt already else
			}//anim_a loop
*/
			
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


////////////////////////////////
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


//////////////////try moving this one around?
	if(wev){
		var l = visual_q3.length;
		while(l--){var s = visual_q3[l]; drawAll(s);} visual_q3=[];
	}
//////////////////

/*
////////////////////translatessss.... working when done here.... but.. eh.... no. Its better to translate later actually
//.. if we could translate here.... because the problem is we are drawing .. before translating.. so we see the screen moving
//when everything has already been drawn.. we need to change that.... what if we just draw after all logic like we did long time
//before? at some point i thought it was better to just draw all at the start... and it did make sense in a way..because
//no matter how much time logic would take, drawings would be performed consistenly at the beggining of every heartbeat..
//because the idea is escalate the number of operations in time..
//but translates are being performed on logic check phase... and so this is why everything lags behind when we move the screen..
//maybe all signals could be moved here as well... that would make sense kinda..
//ok here. check for translate requests from previous heartbeat. one more detail. if multiple translates are executed on a heartbeat
//they are still geting executed one at a time and this produces a yank displacement of the screen.. a solution would be
//to go trough all changes, add up the numbers and call ctx.translate only once.!!!!!!!

	var ti = transLate.length; var tx = 0; var ty = 0;
	while(ti--){
		var tr = transLate[ti]; 
		//ctx0.translate(tr[0],tr[1]);
//so what if we simply add all tanslates ... this seem to not do anything
		tx += tr[0]; ty += tr[1];
	}
	ctx0.translate(tx,ty);
	transLate = [];

///////////////translates are a ting
*/

//check sound cue.. we should only check for oscillators here
	var l = oscCue.length;
	while(l--){var s = oscCue[l]; hearAll(s,l);} //hearAll should be hearOsc needs a more precise name


//these functions are more related to hardware
	if(Sstr == ' '){}else{
		KeysFeed();
	} 

//////////7///////sus
	repeatSys(); //this ok
//////////////////

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

	//PEAKPEAK
//we now want an array for each aspect. and we check every aspect in this particular order now: script, text, circle , rect, image, osc,audio
	for (var i = 0; i < scriptOrbs.length; i++) {
		var o = scriptOrbs[i];

//SCRIPT ASPECT
//so now we want to be able to cast more than a single command per heartbeat. Command lines will now be separated by <>,
//for now max number of commands on the same line is 2 we just call comA on every <> split.. simple huh
		if(o.script){
//so o.o should only hold a command when we created an instruction. in here probly is the best place to clear o.o using the same
//technique we use to clear o.i . This little jugling secures o.o reading and clearing properly
			if(o.oz==o.o){ o.o=undefined; o.oz=Date.now();} 
			if(o.o!=undefined){ o.oz = o.o;}


			if(o.scR=='off'){}
			if(o.scR=='once'){ 
				var RL = o.scC[o.scB-1];//item 0 is line 1. we want to use B to understand we are accessing line 1
	//so if RL is undefined, the script stops dead.... interesting.
				if(RL){
					if(RL[0]==':'||RL[0]=='#'){comA(o.name,RL);}else{
						var csplit = RL.split('<>'); //comands split .. diamond symbol
//... an idea to halt the execution of the script until a condition fullfills? / needs to go on a second ins tho
//but it can also work on firstins
//its interesting to have a script on once or loop halted, the only way to move forward is by changing the script beat. so yeah
//many flow option arise from this dynamic
						if(csplit.length==1){
							if(RL[0]=='/'){o.scB--;}else{comA(o.name,RL);}
						}
						if(csplit.length>1){ 
							var secins = csplit.pop(); var firstins = csplit.join('<>');
							var end = comA(o.name,firstins,true); if(end=='end'){}else{comA(o.name,secins);}
						}
					}
					o.scB++;
				}
				if(o.scB>o.scC.length){o.scB = 1; o.scR='off';}
			}

			if(o.scR=='loop'){ 
				var RL = o.scC[o.scB-1];//item 0 is line 1. we want to use B to understand we are accessing line 1
				if(RL){
					if(RL[0]==':'||RL[0]=='#'){comA(o.name,RL);}else{
						var csplit = RL.split('<>'); //comands split .. diamond symbol
						if(csplit.length==1){
							if(RL[0]=='/'){o.scB--;}else{comA(o.name,RL);}
						}
						if(csplit.length>1){ 
							var secins = csplit.pop(); var firstins = csplit.join('<>');
							var end = comA(o.name,firstins,true); if(end=='end'){}else{comA(o.name,secins);}
						}
					}
					o.scB++;
				}
		//if B is larget than actual beat lines, default behavior should be to readjust the beat to 1 i think. for loop
				if(o.scB>o.scC.length){o.scB = 1;} 

			}
			if(o.scR=='repeat'){ 
				var RL = o.scC[o.scB-1];//item 0 is line 1. we want to use B to understand we are accessing line 1
				if(RL){
					if(RL[0]==':'||RL[0]=='#'){comA(o.name,RL);}else{
						var csplit = RL.split('<>'); //comands split .. diamond symbol
						if(csplit.length==1){
							if(RL[0]=='/'){
								//why sub here if we are not adding beat later..
								//o.scB--; /////////!!!!!!!!!!!
							}else{comA(o.name,RL);}
						}
						if(csplit.length>1){ 
							var secins = csplit.pop(); var firstins = csplit.join('<>');
							var end = comA(o.name,firstins,true); if(end=='end'){}else{comA(o.name,secins);}
						}
					}
				//but maybe repeat dont need to go back to 1...
				}
			}

		}//script aspect


	}

//After Loop Orbs check
//ALOrbs hold commands that require Orbs array to be already updated
//.. maybe this is the right instance to process signals comming from other entities.
//.. and actually the only command we probably want to process is orb/out.. that would be very clean. and i think it is the only
//commands we want to process.. because outputs are signals produced by all orbs and ents. .. and we probably always
//want to evaluate here for a second instructions.. thats the point of listening to signals.. to be ready to react to them!!!
//.. but ALSO, we could use this instance to perform instructions that require updated text containers. So all instructions
// that request text>> to be used, need to have already other instructions changing >>text values performed first.
	for (var i = 0; i < ALOrbs.length; i++) {
		var c = ALOrbs[i];
		//if(c==undefined){break} //safe
		var csplit = c.com.split('<>');
		if(csplit.length>1){ 
			var secins = csplit.pop(); var firstins = csplit.join('<>');
			//console.log(firstins); we here no problem
			var end = comA(c.st,firstins); if(end=='end'){}else{comA(c.st,secins);}
		}else{comA(c.st,csplit[0]);}

	}//ALOrbs


	ALOrbs = []; //flush every heartbeat






	for (var i = 0; i < textOrbs.length; i++) {
//TEXT ASPECT
		var o = textOrbs[i];
		//if(o.text){
//what if we just run a command. '~/inline>>'+stancE+/in . So now we just check for o.i . Looks much cleaner
//so now /in works always even on sealed texts. seals only prevent beat state push activity
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
					var firstf = o.signat.slice(0); dli.beats = [firstf];
					var font = o.tstyle+' '+o.tsize+'px '+o.tfont;
					dli.state.font = font; dli.state.align = o.talign;
					dli.txt='';
					//dli.x=o.txtX; dli.y=o.txtY;
					dli.x=o.x; dli.y=o.y;
					o.txtLi.push(dli);
				}
				//and place o.i text on o.txtB
				o.txtLi[o.txtB-1].txt = o.i;

			}else{

				var dli = DataLine();
				var firstf = o.signat.slice(0); dli.beats = [firstf];
				var font = o.tstyle+' '+o.tsize+'px '+o.tfont;
				dli.state.font = font; dli.state.align = o.talign;
				dli.txt=o.i;
				//dli.x=o.txtX; dli.y=o.txtY;
				dli.x=o.x; dli.y=o.y;

				//this operation adds a line simply on selected place
				if(o.inop=='insert'){o.txtLi.splice(o.txtB-1,0,dli);}

				//we could also replace the line from here like this:
				if(o.inop=='replace'){o.txtLi.splice(o.txtB-1,1,dli);}

//but we dont want to replace the line by default when writing into a text from input.... do we ....nah.. because we want to be able
//to quicly insert a new line in place when we are here..not erasing the text that was previously in here.

			}

//so before despacer, and here, only once per heartbeat, check if last line text is '', if so then remove.
//... the idea of dividing long oerations into heartbeats sounds right. the goal is to distribute the heavy work into small steps
//that can be executed one at a time per heartbeat. its a way to prevent the pressure excess on the machine but also, its an integral
//feature of the system itself, we want processes to unfold rythmically and slower, so humans are more able to undertand them.
			if(o.txtLi[o.txtLi.length-1].txt==''){
				o.txtLi.pop();
			}

			dESpacer(o);

			o.iz = o.i;

		}// o.i

//wait on text is not implemented yet.... !!!!!!!!
		if(o.text){
//Line beats so by default, printing text behaves like loop..
			if(o.txtLi.length==0){}else{ //for loops are kinda stupid
				for (var i2 = 0; i2 < o.txtLi.length; i2++) {
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
		}//text unsealed prints text


	}//text loop



	for (var i = 0; i < circleOrbs.length; i++) {
//CIRCLE ASPECT
		var o = circleOrbs[i];
		if(o.circle){
			if(o.cirR=='off'){} 
			if(o.cirR=='once'){ 
				if(o.cirF.length>0){
					beatUp(o.cirF,o.cirB,o.cirS); // o,o
					o.cirS.cx = o.x; o.cirS.cy = o.y; 
					o.cirS.waitc--;//
					if(o.cirS.waitc<=0){o.cirB++; o.cirS.waitc = o.cirS.wait;}//
					o.cirB++;
					if(o.cirB>o.cirF.length){o.cirB=1; o.cirR='off';}
					if(o.cirS.layer==0){visual_q0.push(o.cirS);} //[B]?
					if(o.cirS.layer==1){visual_q1.push(o.cirS);}
					if(o.cirS.layer==2){visual_q2.push(o.cirS);}
				}
			}
			if(o.cirR=='loop'){ 
				if(o.cirF.length>0){
//.... so to always let circle orbs control the center, we could update here... we not only update the state we want to push
//but also we update the state cx , cy using the orb.x , y .... that makes sense. because not only we can control the center
//from a command in a less convoluted way, also, does not prevent the possibility for beats to also modify the center temporarily
//if for some reason we would like to do that idk
					beatUp(o.cirF,o.cirB,o.cirS); // o,o
					o.cirS.cx = o.x; o.cirS.cy = o.y; 
					o.cirS.waitc--;//
					if(o.cirS.waitc<=0){o.cirB++; o.cirS.waitc = o.cirS.wait;}//
					//o.cirB++;
					if(o.cirB>o.cirF.length){o.cirB=1;}
					if(o.cirS.layer==0){visual_q0.push(o.cirS);} //[B]?
					if(o.cirS.layer==1){visual_q1.push(o.cirS);}
					if(o.cirS.layer==2){visual_q2.push(o.cirS);}
				}
			}

			if(o.cirR=='repeat'){
				if(o.cirF.length>0){
					beatUp(o.cirF,o.cirB,o.cirS); // o,o
					o.cirS.cx = o.x; o.cirS.cy = o.y; 
					if(o.cirS.layer==0){visual_q0.push(o.cirS);} //[B]?
					if(o.cirS.layer==1){visual_q1.push(o.cirS);}
					if(o.cirS.layer==2){visual_q2.push(o.cirS);}
				}
			}
			// .. anyway we want to optimize this code here

		}//circle 


	}


	for (var i = 0; i < rectOrbs.length; i++) {
//RECTANGLE ASPECT
		var o = rectOrbs[i];
		if(o.rectangle){
			if(o.rectR=='off'){} 
			if(o.rectR=='once'){ 
				if(o.rectF.length>0){
					beatUp(o.rectF,o.rectB,o.rectS); // o,o
					o.rectS.cx = o.x; o.rectS.cy = o.y; 
					o.rectS.waitc--;//
					if(o.rectS.waitc<=0){o.rectB++; o.rectS.waitc = o.rectS.wait;}//
					//o.rectB++;
					if(o.rectB>o.rectF.length){o.rectB=1; o.rectR='off';}
					if(o.rectS.layer==0){visual_q0.push(o.rectS);} //[B]?
					if(o.rectS.layer==1){visual_q1.push(o.rectS);}
					if(o.rectS.layer==2){visual_q2.push(o.rectS);}
				}
			}
			if(o.rectR=='loop'){ 
				if(o.rectF.length>0){
					beatUp(o.rectF,o.rectB,o.rectS); // o,o
					o.rectS.cx = o.x; o.rectS.cy = o.y; 
					o.rectS.waitc--;//
					if(o.rectS.waitc<=0){o.rectB++; o.rectS.waitc = o.rectS.wait;}//
					//We need to synch circle with orb position... . .? .. yeah am back here
					//o.rectS.x=o.x; o.rectS.y=o.y;
					//o.rectB++;
					if(o.rectB>o.rectF.length){o.rectB=1;}
					if(o.rectS.layer==0){visual_q0.push(o.rectS);} //[B]?
					if(o.rectS.layer==1){visual_q1.push(o.rectS);}
					if(o.rectS.layer==2){visual_q2.push(o.rectS);}
				}
			}
			if(o.rectR=='repeat'){
				if(o.rectF.length>0){
					beatUp(o.rectF,o.rectB,o.rectS); // o,o
					o.rectS.cx = o.x; o.rectS.cy = o.y; 
					if(o.rectS.layer==0){visual_q0.push(o.rectS);} //[B]?
					if(o.rectS.layer==1){visual_q1.push(o.rectS);}
					if(o.rectS.layer==2){visual_q2.push(o.rectS);}
				}
			}
		}


	}



	for (var i = 0; i < imageOrbs.length; i++) {
//IMAGE ASPECT
		var o = imageOrbs[i];
		if(o.image){
//all these visual Aspects probably need to set run to off when there are no beats to beat... or we could simply not run beatUp
//... and just leave run value as is. we dont want to just run off because users l have to set run on again thats not nice
//
			//if(Object.keys(o.imgS.img).length==0){o.imgR='off'; continue}
			//if(o.imgS.img==undefined){o.imgR='off'; continue}
		//this check works... but also when it has content is true so...
			//if(JSON.stringify(o.imgS.img)==='{}'){o.imgR='off'; continue}
			//.. ok this i think it works... jeez
			if(o.imgS.img){
				if(o.imgS.img.tagName==undefined){o.imgR='off'; continue}
			}
			//if(o.imgS.img.tagName==undefined){o.imgR='off'; continue}
			if(o.imgR=='off'){} 
			if(o.imgR=='once'){ 
				if(o.imgF.length>0){
					beatUp(o.imgF,o.imgB,o.imgS); // o,o
					o.imgS.cx = o.x; o.imgS.cy = o.y; 
					o.imgS.waitc--;//
					if(o.imgS.waitc<=0){o.imgB++; o.imgS.waitc = o.imgS.wait;}//
					//o.imgB++;
					if(o.imgB>o.imgF.length){o.imgB=1; o.imgR='off';}
					if(o.imgS.layer==0){visual_q0.push(o.imgS);} //[B]?
					if(o.imgS.layer==1){visual_q1.push(o.imgS);}
					if(o.imgS.layer==2){visual_q2.push(o.imgS);}
				}
			}
			if(o.imgR=='loop'){ 
				if(o.imgF.length>0){
					beatUp(o.imgF,o.imgB,o.imgS); // o,o
					o.imgS.cx = o.x; o.imgS.cy = o.y; 
					o.imgS.waitc--;//
					if(o.imgS.waitc<=0){o.imgB++; o.imgS.waitc = o.imgS.wait;}//
					//o.imgB++;
					if(o.imgB>o.imgF.length){o.imgB=1;}
					if(o.imgS.layer==0){visual_q0.push(o.imgS);} //[B]?
					if(o.imgS.layer==1){visual_q1.push(o.imgS);}
					if(o.imgS.layer==2){visual_q2.push(o.imgS);}
				}
			}
			if(o.imgR=='repeat'){
				if(o.imgF.length>0){
					beatUp(o.imgF,o.imgB,o.imgS); // o,o
					o.imgS.cx = o.x; o.imgS.cy = o.y; 
		//layer could be on state, this way state beats could also affect layer so we can specify layer when we create mirrors.
					if(o.imgS.layer==0){visual_q0.push(o.imgS);} //[B]?
					if(o.imgS.layer==1){visual_q1.push(o.imgS);}
					if(o.imgS.layer==2){visual_q2.push(o.imgS);}
				}
			}
//so the criteria here would be.. if the last beat is empty(has no changes) , and its not selected(dosent match aspectB), then its
//automatically removed
		}


	}



	for (var i = 0; i < oscOrbs.length; i++) {
//OSCILATOR ASPECT
//.. we should have some kind of mechanic to connect audio aspects into forms to localize the audio.
		var o = oscOrbs[i];
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
							//update state using tone line using timeUp
							timeUp(os,TL);
							var osc = COsc(os);
				//we need an id to reffer to this tone state. orb/oscillator/1 should point us to the tone state generated
//but we should be able to make changes on the tone states timers more precisely.. maybe we can create changes from reading kdown
//or touch events directly and not in synch with heartbeat..!!!!!!!!
							osc.origin=o.name; osc.toneline=i2+1;
							oscCue.push(osc);
						}
				//we need to set oscPA (osc playing already) to true to let the system know tones are running.
						o.oscPA = true;
					}
				}
			}

		} //osc



	}



	for (var i = 0; i < audioOrbs.length; i++) {
//AUDIO ASPECT
		var o = audioOrbs[i];


	}


//SCRIPT FEEDBACK
//maybe here we can run scriptF
//i think we need to beat all scripts after script loop anyway.... if not we get inconsistencies on drawing because we are pushing
//positions too early, and some scripts change their position before displacements. we need to run script loop first and then
//request for feedback visuals positions

//first we can just ask if eF has any feed in there. i know this needs improve its repeating code improve later... better to rewrite
//this right now before coninuing ... 
//we start from 1 since entity was already checked... we know staNce[0] is always user entity..
//... ok so we also want to check for ghOsts now, so we could turn this into actual scriptF back again now that is working .. ehh.right.

//so ...... yeah lol. am just using ghostsn instead of staNce but am still accessing orbs from original arrays. that brilliant Kaozzai
//You truly are... a Genius... woah
//ok seriously now. This ghOsts array is interesting. Maybe we can use it to do other stuff as well...
	if(ghOsts.length>0){
	//call feed once and then
		for (var i = 0; i < ghOsts.length; i++) {
			var o = ghOsts[i]; //let X = o.x; let Y = o.y;
//ok so this is not scriptF. we only want to use orbs on ghOsts to create feeds... its different !!!!!!
			var cac = {r:250, g:110, b:110, a:0.5, cx:o.x, cy:o.y, x:0, y:0, radius:50, is:'circle', inside:'filled'};
			var tac = {r:250, g:110, b:110, a:0.5, cx:o.Dbyx, cy:o.Dbyy, x:0, y:0, radius:50, is:'circle', inside:'filled'}; 
			//console.log(cac); debugger
			visual_q3.push(cac,tac);
		}
	//clear
		ghOsts = [];
	} 


	scriptF(staNce);


//////////////////////////////////////////////////////////testing.. i think this is better..
	//if(transLate.length=)
	//
	var ti = transLate.length; var tx = 0; var ty = 0;
	while(ti--){
		var tr = transLate[ti]; 
		//ctx0.translate(tr[0],tr[1]);
//so what if we simply add all tanslates ... this seem to not do anything
		tx+=tr[0]; ty+=tr[1];
//we can also just use same index for translatE .... but wait.... we just need the last one..
		//var tr2 = translatE[ti];
	}
	ctx0.translate(tx,ty);

	//oesnt work either..
	//if(ti>0){eX=translatE.x; eY=translatE.y;}
	//this messes up the thing..
	//eX=eX+tx; eY=eY+ty;
	transLate = [];
//////////////////////////////////////////////////////////


/////
	//repeatSys(); //this ok? no. if we put it here, it creates lag
/////



	Entry=undefined; Ein=undefined; Eout=undefined;

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
	name: "FirstSequence", script: true, sfeed:[],//sFop:undefined, sFtar : [], sFres:false,
	Asp:'script', arr:'scriptOrbs', x:0, y:0,
	//screenx:[], screeny:[], random:[],
	scR: "once", scB: 1,
	scC: [

/*
//Main Sequencer 
"@MSeq<>unseal/text>>MSeq",
"#1>>MSeq/text/1",
"@MSeqB<>unseal/script>>MSeqB",
"#+1>>MSeq/text/1>>MSeqB/script",
"#loop>>MSeqB/script/run",

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



//note
//A status screen with general data is what we want, how about also puting speed control
//and current stance.. yeah, we could also show the ent position, the stance position.. useful stuff
//we need a button to also select this. Maybe one text prints a fixed indicator like 'Stance: '  , 'Ent speed:' 'Aspect speed:'
//and another one printing text thats actually controling the speed and stance, so i we change these, we can change those things.

//.. how would we set multiple orbs in a list to run... #repeat>>orb/text ... but this would place 'repeat' on the text...
//how about using this idea... togling between run keys... we can use polarity on multiple lines now... and that would make sense
//.. eh.. doesnt convince me. its not a precise way to control multiple  run values... but it would be cool for users to being able
//to mess around using polarity on eveything and realize it actually does something. It would add consistency to the sinthax and invite
//users to experiment with the features
						//	var run = ['off','play'];//,'loop','repeat']; 
						//	var n = run.indexOf(o.oscR);
						//	var res = n+pol;
						//	if(res>=run.length){res--;} 
						//	if(res<0){res++;} 
						//	o.oscR=run[res];
						//	return //[run[res]]
//so maybe period could print a number of options on the screen for use to select one like, a new speed... a new set of parameters
//to asign to WASD... hmm.. how about creating a loop. YES. PREBUILT SCRIPTS. GENIUS

//ANOTHER POLARTITY/not FEATURE great idea not implemented yet !!!!!!!!!!!PHONE
//if a sunya sinthax keyword sits in a text, we can use polarity to call for the next one? signals . 
//once written , keywords can be rewriten to another keyword by sending polarity signals into the line that contains them
//rmline , @ , delete , seal ... what if we could simply run trough all possible outcomes its an autocomplete function..
//orb/   If we toggle this, we can see orb/name , orb/text , orb/x.. no,,, that wouldnt work, it would trigger orb/x and change orb
//x parameter.. we need a function to construct commands without the commandline for phone users, this is important because phones
//are cool too.. but it must be a different command, we cant use polarity to do this.




//!!!!!!!!!!!!PEAK
//OK SO Main0 only needs to seal and unseal now. And it will exclusively print History
//Main1 will print orbs names with space and will be stanciated with Digit1
//Main2 will print orbs acces keys when selected and will be stanciated with Digit2
//Main3 will print access keys results and will be stanciated with Digit3.. not sure if in real time but yeah.. probably irt is what we want
//... aaand maybe we can just modularize even more and not make it dependant on Main1 Main2 Main3 but just being able to chain texts
//to print data structures independently........... yes yes yes

//create a list of names for button to create scripts
//ok we have a weird lag taht affects only some displacements... it comes to the order of script execution i noticed.
"@text>>GPsorbs",
//"#100>>GPsorbs/x",
//no need to see this either
"seal>>GPsorbs",
":AspRight AspLeft AspUp AspDown EntRight EntLeft EntUp EntDown KeyE KeyR KeyF KeyT KeyG KeyY KeyH KeyU KeyJ CursorX CursorC CursorV CursorZ CursorEnt PrevF NextF RmBeat >>GPsorbs/text",
//use list to build scripts at once
"@script>>GPsorbs/text",
"delete>>GPsorbs", //self removes

//HISTORY
//give me a history text orb.. let Main0 be the History text orb and just unseal it ? wait later.. we need to write a toggle mechanic
//for Tab
"@text>>History<>seal>>History",
//History script listener
"@script>>HistoryRegister",
"#~/out>>History/in>>HistoryRegister/script",
"#repeat>>HistoryRegister/script/run",

//NUMS
//Nums a text with useful numbers to have around. numbers match line. 1 to 9 so far. 
"@text>>Nums<>seal>>Nums",
":1 2 3 4 5 6 7 8 9 0 >>Nums/text",

//Maybe create a script so when we stanciate
//speeds, we can read Entry to change the number in the current line. This script only should run when we stanciate speeds.
//this is nice. we select a line, we press enter, we type in a new number, then the number is replaced. lovely

//Speeds
//line1 synched with entity displacement speed, line2 synched with aspect in control speed, line3 in synch with current stance name
//on line4 we could actually have the aspect of the stance, so we can always check it out
//ok so Speeds could ALSO handle how much polarity intensity... wait.. its more convenient to have speeds and polarity intensities
//seperated. Because now we can just run a command and change the intensity. so its the 4 directions, polarity intensity, a filter for..
		//
//all random and screenxy need update here
//new screexy system just droped. ..  so we probably want a single text orb to hold all screen percentages locations we need for
//general purpuse main interface.. but lets just make a text for each for now. working fine!


//SPEEDS
"@text>>Speeds",
"#r,90,g,..200?250,b,200,a,0.6,layer,2>>Speeds/text/signat",
//aspcursor entcursor polarity w h radius ... i think these are ok
//we want to configure Speeds to be used with buttons when we are on a specific
//orb with a specific aspect. So maybe when we call a Specific Cursor, we also configure all buttons using the Speeds text...
":20 20 1 1 1 1 >>Speeds/text", 
"@text>>SpeedsPos<>seal>>SpeedsPos",
":15 70 >>SpeedsPos/text",
//a script to stanciate and position Speeds on recall with Backquotes. yeah this is ok but we want to change scipt name
"@script>>SpeedsRecall",
"#Speeds/name>>~/stance>>SpeedsRecall/script/new",
"#screenxy/SpeedsPos/1>>Speeds>>SpeedsRecall/script/new",
"#unseal>>Speeds>>SpeedsRecall/script/new",


//EDAT
//Holds data regarding editors. Used to contol configuration loads and active listeners.. maybe it should follow around user...
"@text>>EDat",
"#r,..3?100,g,..200?240,b,..5?250,a,0.6,layer,2>>EDat/text/signat",
":orbname orbaspect ... cursor >>EDat/text",
//"#25>>EDat/screenx/in",
//"#70>>EDat/screeny/in",
//"screenxy/EDatPos/1>>EDat",
//"EDat/screenx/out>>EDat/x<>EDat/screeny/out>>EDat/y",
"@text>>EDatPos<>seal>>EDatPos",
":25 75 >>EDatPos/text",
//always follow user screen		
"@script>>EDatFollow",
"#screenxy/EDatPos/1>>EDat>>EDatFollow/script",
"#repeat>>EDatFollow/script/run",


//MAIN0
//so maybe we are interested in relocating a text to work with using digits instead.. now that we aislated positioning....
//.. but this is nice already.. if we add the capture rect area thing we would be good 
//Main0 . Prints history with Tab,  appears positioned on the top right corner when
//printing, also is selected. vibes with colors so its always visible.. maybe vibing too much..
"@text>>Main0",
"#right>>Main0/text/align",
"#r,..3?230,g,..4?240,b,..5?250,a,1,layer,2>>Main0/text/signat",
//"#99>>Main0/screenx/in",
//"#8>>Main0/screeny/in",
"@text>>Main0Pos<>seal>>Main0Pos",
":99 8 >>Main0Pos/text",
//we want to press Tab , and print history content to Main0, and select line 1. useful
"@script>>HistoryRecall",
"#screenxy/Main0Pos/1>>Main0>>HistoryRecall/script/new",
//"#Main0/screenx/out>>Main0/x<>Main0/screeny/out>>Main0/y>>HistoryRecall/script/new",
"#History/text>>Main0/text>>HistoryRecall/script/new",
"##Main0>>~/stance>>HistoryRecall/script/new",
"##1>>Main0/text/cn>>HistoryRecall/script/new",
"#unseal>>Main0>>HistoryRecall/script/new",


//MAIN1
//Main1 text orb to start access chain. . .Now Main1 will be created if non existant. it will repond to Space printing orb names,
//and will self locate to the left of the screen
"@text>>Main1",
"#r,30,g,..100?240,b,200,a,1,layer,2>>Main1/text/signat",
//"#1>>Main1/screenx/in",
//"#8>>Main1/screeny/in",
"@text>>Main1Pos<>seal>>Main1Pos",
":1 8 >>Main1Pos/text",
//Use Space to call a script to print Orbs lists on Main1.. maybe it can use a mechanism to adjust what to print but for now just
//print all orbs
//so maybe Space could actually scan a circular area looking for orbs to be printed on Main1..
//now am thinking... it doesnt really make too much sense to being able to stanciate a script orb now doesnt it.
//scripts have no need for x and y.. we dont rreally need to move these around..
"@script>>OrbsLister",
"#screenxy/Main1Pos/1>>Main1>>OrbsLister/script/new",
//"#Main1/screenx/out>>Main1/x<>Main1/screeny/out>>Main1/y>>OrbsLister/script/1",
"#~/orbs>>Main1/text>>OrbsLister/script/new",
"##Main1>>~/stance>>OrbsLister/script/new",
"#unseal>>Main1>>OrbsLister/script/new",


//MAIN2
//okokokok how about this: Just let parameters we are interested in on Main2 and we just change them using polarity AND Entry value. Genius
//so a listener on main2... go there. ok its a good idea but 
//Main2 text orb to follow access chain. . .Main2 will be created if non existant. it will respond to KeyM executing orb access keys
//printed on Main1 and will self locate next to Main1
"@text>>Main2",
"#r,30,g,..10?170,b,230,a,1,layer,2>>Main2/text/signat",
//"#15>>Main2/screenx/in",
//"#8>>Main2/screeny/in",
"@text>>Main2Pos<>seal>>Main2Pos",
":15 8 >>Main2Pos/text",
//Use KeyM to call a script to print access keys from the currently selected text line and print it on the next access key
//chain. Main2 for now 
"@script>>GetAccess",
"#screenxy/Main2Pos/1>>Main2>>GetAccess/script/new",
//"#Main2/screenx/out>>Main2/x<>Main2/screeny/out>>Main2/y>>GetAccess/script/1",
"#print/Main2>>%/text/current>>GetAccess/script/new",
"##Main2>>~/stance>>GetAccess/script/new",
"#unseal>>Main2>>GetAccess/script/new",


//MAIN3
//Main3, a text to hold selected lines calling accesskeys to be printed on Main4
"@text>>Main3",
"#r,70,g,..165?170,b,90,a,1,layer,2>>Main3/text/signat",
//"#30>>Main3/screenx/in",
//"#8>>Main3/screeny/in",
"@text>>Main3Pos<>seal>>Main3Pos",
":30 8 >>Main3Pos/text",



//MAIN4
//Main4 text orb to follow access chain. . .Main4 will be created if non existant. it will respond to Comma by seting up
// a script to execute on repeat the access command selected on Main3 and will self locate next to Main3
"@text>>Main4",
"#r,40,g,..230?240,b,190,a,1,layer,2>>Main4/text/signat",
//"#45>>Main4/screenx/in",
//"#8>>Main4/screeny/in",
"@text>>Main4Pos<>seal>>Main4Pos",
":45 8 >>Main4Pos/text",
//Comma should now be able to read an access command and place it on Main3, and create a script to execute the access key on repeat
//to create an ouput on the chain access Main4, next to Main3
//we also now want to see highlights for beats only in the case were we are actually printing a beat container and not a key.
//.. yes this would kinda be like the piece of my soul that is missing. we really want this.
//would be neat to just add constructions into a command..... interface inteface
//we need to delete beats from Main4 directly. use End to delete a selected line beat
"@script>>GetIRTparam",
"#screenxy/Main3Pos/1>>Main3<>screenxy/Main4Pos/1>>Main4>>GetIRTparam/script/new",
//"#Main3/screenx/out>>Main3/x<>Main3/screeny/out>>Main3/y>>GetIRTparam/script/new",
//"#Main4/screenx/out>>Main4/x<>Main4/screeny/out>>Main4/y>>GetIRTparam/script/new",
"#%/text/current>>Main3/text>>GetIRTparam/script/new",
"##repeat>>IRTparam/script/run>>GetIRTparam/script/new",
"#unseal>>Main3<>unseal>>Main4>>GetIRTparam/script/new",
//IRTparam , a script to print access instruction result from Main3 , running on repeat to be seen on Main4 in real time
"@script>>IRTparam",
"#print/Main4>>Main3/text>>IRTparam/script/1",


//LINEIN
//a script to always put the result of Ein into the stance /in key
"@script>>LineIn",
"#~/in>>%/in>>LineIn/script/new",
"#loop>>LineIn/script/run",

//INSERT
//a script to grab a line and insert a modified version without erasing anything
"@script>>InsertLine",
"##insert>>%/text/inop>>InsertLine/script/new",
"#%/text/current>>~/inline<>ein>>InsertLine/script/new",

//REPLACE
//a script to grab the line selected so we can modify it and use it to replace the previous line. replace. grab text, put it on
//inline, modify, then when we press enter we replace it
"@script>>ReplaceLine",
"##replace>>%/text/inop>>ReplaceLine/script/new",
"#%/text/current>>~/inline<>ein>>ReplaceLine/script/new",

//so a listener on Main2. When user has a parameter in line selected we can call a script that will read Entry value and use it
//to modify the parameter written in the line? ... what?
//~/in

//THL
//Text Highlight
//this is great for general purpuse working with text lines
"@script>>THL",
"##x,..-3?2,y,..-1?2,txt, + - + - + - + - + - +,a,-0.1>>%/text/current/mirror>>THL/script",
"#repeat>>THL/script/run",


//RMLINE
//a script to remove a line called with Delete
"@script>>RmLine",
"#rmline>>%/text/current>>RmLine/script/new",
"##end>>RmLine/script/run>>RmLine/script/new",


//POLARITY
//Polarity script. We use Speeds line 3 to send polarity numbers
"@script>>Polarity",
":+/Speeds/3>>%/text/current Nums/text/1>>Polarity/script/cn<>#end>>Polarity/script/run -/Speeds/3>>%/text/current #end>>Polarity/script/run >>Polarity/script",


//DASH
//SpDash1 and SpDash2 are temorarily used as long as a button is pressed. We are using ShiftLeft now
//normal
"@text>>SpDash1",
":1 20 1 1 1 1 >>SpDash1/text",
"seal>>SpDash1",
//dash1
"@text>>SpDash2",
":50 60 0.01 10 10 10 >>SpDash2/text",
"seal>>SpDash2",
//ShiftLeft temporarily modify Speeds values so we get a dash on all cursors and levers.
//ok so when we set cn to 2, we dump SpDash2/text>>Speeds/text, as long as cn is 2, we do that. the moment we release, script
//runs its course and next line normalizes Speeds. SpDash1 is normal, SpDash2 is different. we just set on loop and set the
//first line to '/' , this will halt the execution of the script
"@script>>ShiftLDash",
":/ SpDash2/text>>Speeds/text SpDash1/text>>Speeds/text >>ShiftLDash/script",
"#loop>>ShiftLDash/script/run",


//And we should be able to select Main1 to Main4 and more if any using Digits.. but these are simple buttons i think,
//no need to make a script. for now

//again, the flow is Main0 for history, Main1 to call orbs names list or all of them, Main2 to show a selected orb access keys
//and maybe we want Main4 to print Main3 content using comma so we can see what access key is being retrieved at everyheartbeat on Main4

//how about making Escape print unseal all buttons for us to see for a moment, select the text that does this , and then we can just
//backspace to seal it back . snapy
//or create a help message with all buttons explained. we call with ControlLeft and close with ControlLeft again
//maybe obscure the screen a bit and drop the help bomb

//Maybe a nice feedback would be to have a specific color as default signature for textlines that match an orb with a specific aspect
//so maybe script orb names when recalled using Space are White, text orbs are Blue, circles are Yellow etc... but yeah maybe this
//is a script thing, not the default behavior

//GPSkeys text container. a list of skeys to add at once 
"@text>>GPskeys",
//no need to see this no more
		
"seal>>GPskeys",
":name,RmBeat,key,End,com1,#once>>RmBeat/script/run name,LDash,key,ShiftLeft,com1,#2>>ShiftLDash/script/cn name,LineNameToStance,key,Period,com1,%/text/current>>~/stance name,StatusToStance,key,Backquote,com1,#once>>SpeedsRecall/script/run name,Polarity+,key,BracketRight,com1,Nums/text/1>>Polarity/script/cn<>#once>>Polarity/script/run name,Polarity-,key,Slash,com1,Nums/text/3>>Polarity/script/cn<>#once>>Polarity/script/run name,Main1ToStance,key,Digit1,com1,#Main1>>~/stance name,Main2ToStance,key,Digit2,com1,#Main2>>~/stance name,Main3ToStance,key,Digit3,com1,#Main3>>~/stance name,Main4ToStance,key,Digit4,com1,#Main4>>~/stance name,Main0ToStance,key,Digit0,com1,#Main0>>~/stance name,SealAsp,key,Backspace,com1,seal>>% name,RmLine,key,Delete,com1,#once>>RmLine/script/run name,CommandGrab,key,KeyO,com1,%/text/current>>~/comline name,Insert,key,KeyI,com1,#once>>InsertLine/script/run name,Replace,key,KeyP,com1,#once>>ReplaceLine/script/run name,PrevLine,key,KeyB,com1,->>%/text/cn name,NextLine,key,KeyN,com1,+>>%/text/cn name,SelStance,key,KeyM,com1,$/text/current>>~/stance name,OrbsList,key,Space,com1,#once>>OrbsLister/script/run name,SkeysList,key,ControlRight,com1,~/skeys>>Main0/text name,GetAccess,key,KeyM,com1,#once>>GetAccess/script/run name,GetIRTparam,key,Comma,com1,#once>>GetIRTparam/script/run name,KTab,key,Tab,com1,#once>>HistoryRecall/script/run name,PrevFrame,key,PageUp,com1,#once>>PrevF/script/run name,NextFrame,key,PageDown,com1,#once>>NextF/script/run name,EntRight,key,ArrowRight,com1,#once>>EntRight/script/run name,EntLeft,key,ArrowLeft,com1,#once>>EntLeft/script/run name,EntUp,key,ArrowUp,com1,#once>>EntUp/script/run name,EntDown,key,ArrowDown,com1,#once>>EntDown/script/run name,AspRight,key,KeyD,com1,#once>>AspRight/script/run name,AspLeft,key,KeyA,com1,#once>>AspLeft/script/run name,AspUp,key,KeyW,com1,#once>>AspUp/script/run name,AspDown,key,KeyS,com1,#once>>AspDown/script/run name,Repeat,key,KeyE,com1,#once>>KeyE/script/run name,Loop,key,KeyR,com1,#once>>KeyR/script/run name,Off,key,KeyF,com1,#once>>KeyF/script/run name,KT,key,KeyT,com1,#once>>KeyT/script/run name,KG,key,KeyG,com1,#once>>KeyG/script/run name,KY,key,KeyY,com1,#once>>KeyY/script/run name,KH,key,KeyH,com1,#once>>KeyH/script/run name,KU,key,KeyU,com1,#once>>KeyU/script/run name,KJ,key,KeyJ,com1,#once>>KeyJ/script/run name,KZ,key,KeyZ,com1,#once>>CursorZ/script/run name,KX,key,KeyX,com1,#once>>CursorX/script/run name,KC,key,KeyC,com1,#once>>CursorC/script/run name,KV,key,KeyV,com1,#once>>CursorV/script/run >>GPskeys/text",
//use container to create buttons at once. so maybe we do this, create buttons when we stance on orbs with different aspects
"GPskeys/text>>~/skeys",
"delete>>GPskeys", //but for now just remove this. creating skeys is quick

//configure default CursorZ displacements . we use this cursor to move the orb aspect position as a whole. we move the center from which
//the animation unfolds
":#+/Speeds/1>>%/x>>AspRight/script/1 ##end>>AspRight/script/run>>AspRight/script/2 #-/Speeds/1>>%/x>>AspLeft/script/1 ##end>>AspLeft/script/run>>AspLeft/script/2 #-/Speeds/1>>%/y>>AspUp/script/1 ##end>>AspUp/script/run>>AspUp/script/2 #+/Speeds/1>>%/y>>AspDown/script/1 ##end>>AspDown/script/run>>AspDown/script/2 #CursorZ>>EDat/text/4 >>CursorZ/script",
"#once>>CursorZ/script/run", //default asp cursor init


//lets have a text with ENt displacements cn access
//... this pattern is interesting to contol multiple orbs at once... i think we can just build a rectangle selectos with a script
"@text>>EntDisCn",
":EntRight/script/cn EntLeft/script/cn EntUp/script/cn EntDown/script/cn >>EntDisCn/text",
//so now we can change all cn s at once, this way we synch displacements an prevent the funny yank

//Nums/text/1>>>EntDisCn/text<>
//ok so... this script sometimes makes the funky laggy thingy on displacements because they synch out. sometimes disleft second script
//statement is called when disright fist one is executing, this provokes the yank.... take your time to solve this.!!!!!!!
//configure arrows displacement for entity using Speeds line 2 as speed
":#+/Speeds/2>>~/x>>EntRight/script/1 #-/Speeds/2>>~/x>>EntLeft/script/1 #-/Speeds/2>>~/y>>EntUp/script/1 #+/Speeds/2>>~/y>>EntDown/script/1 >>CursorEnt/script",
"#once>>CursorEnt/script/run", //default ent cursor init


//BTHL
//Beat Highlight. should highlight the current beat on Main4. but only if its printing a beat.. maybe
//wont bother if its there when printing a key tho. done
//an instruction to synch and create a proper highlight mirror. just use repeat and cn. a line for each aspect
"@script>>BTHL",
"#%/script/cn>>Main4/text/cn<>#x,..-3?2,y,..-1?2,txt,___-__-__-__-__-____-__,a,-0.1>>Main4/text/current/mirror>>BTHL/script/new",
"#%/text/cn>>Main4/text/cn<>#x,..-3?2,y,..-1?2,txt,__-____-_____-____-__,a,-0.1>>Main4/text/current/mirror>>BTHL/script/new",
"#%/circle/cn>>Main4/text/cn<>#x,..-3?2,y,..-1?2,txt,__-______-______-___,a,-0.1>>Main4/text/current/mirror>>BTHL/script/new",
"#%/rectangle/cn>>Main4/text/cn<>#x,..-3?2,y,..-1?2,txt,____-____-__-_____-__,a,-0.1>>Main4/text/current/mirror>>BTHL/script/new",
"#%/image/cn>>Main4/text/cn<>#x,..-3?2,y,..-1?2,txt,__-__-___-___-____-___,a,-0.1>>Main4/text/current/mirror>>BTHL/script/new",



//MONITOR
//Monitor Aspect Configuration checks forr stance changing and ask what aspect does the stance have to run the proper configuration
"@script>>MonitorAC",
"#%/name==EDat/text/1<>#10>>MonitorAC/script/cn>>MonitorAC/script/new",
"#%/aspect==#script<>#once>>ScriptConf/script/run>>MonitorAC/script/new",
"#%/aspect==#text<>#once>>TextConf/script/run>>MonitorAC/script/new",
"#%/aspect==#circle<>#once>>CirConf/script/run>>MonitorAC/script/new",
"#%/aspect==#rectangle<>#once>>RectConf/script/run>>MonitorAC/script/new",
"#%/aspect==#image<>#once>>ImageConf/script/run>>MonitorAC/script/new",
"#%/name>>EDat/text/1<>%/aspect>>EDat/text/2>>MonitorAC/script/new",
//init Monitor
"#loop>>MonitorAC/script/run",



//TEXT
//we could have buttons on text conf to spread texts position... and actually.. manipulate text beats..
"@script>>TextConf",
"##once>>CursorZ/script/run>>TextConf/script/new", //initialize CursorZ by default




//SCRIPT 
//.... what exactly could we do with scripts.. maybe we could create lines to connect orbs that interact... and we 
//also want to see scripts beats highlighted so we can study their behavior
//SO am not sure if we really need script and text conf given the nature of these aspects is more unsiversal and we can work
//with text buttons and other aspect buttons just fine..
"@script>>ScriptConf",
"###repeat>>%/script/run>>KeyE/script/1>>ScriptConf/script/new", 
"###loop>>%/script/run>>KeyR/script/1>>ScriptConf/script/new",
"###off>>%/script/run>>KeyF/script/1>>ScriptConf/script/new",
"###once>>%/script/run>>KeyV/script/1>>ScriptConf/script/new",
//.. in script conf, we dont really want to copy current into next beat, we just want to move trough the selected beats
//prevf
"##->>%/script/cn>>PrevF/script/1>>ScriptConf/script/new",
"###end>>PrevF/script/run>>PrevF/script/2>>ScriptConf/script/new",
//nextf
"##+>>%/script/cn>>NextF/script/1>>ScriptConf/script/new",
"###end>>NextF/script/run>>NextF/script/2>>ScriptConf/script/new",

//configure beat highlight
"#Nums/text/1>>BTHL/script/cn<>#repeat>>BTHL/script/run>>ScriptConf/script/new",
/*
//... what cursor do we need for script orbs?.. The idea of scripts having position still is interesting because we could
//use the script position as refference to work with other Aspects.. we need to resolve this and the tack thing first
//Cursor X for circle beats
"#:#+/Speeds/1>>%/circle/current/x>>AspRight/script/1 ##end>>AspRight/script/run>>AspRight/script/2 #-/Speeds/1>>%/circle/current/x>>AspLeft/script/1 ##end>>AspLeft/script/run>>AspLeft/script/2 #-/Speeds/1>>%/circle/current/y>>AspUp/script/1 ##end>>AspUp/script/run>>AspUp/script/2 #+/Speeds/1>>%/circle/current/y>>AspDown/script/1 ##end>>AspDown/script/run>>AspDown/script/2 >>CursorX/script>>CirConf/script/new",

//.. so BTHL could use a specific text to change what beat to highlight. we use 1 2 3 4... a number for each Aspect
//instead of EditData, SwBTHL
"#Nums/text/3>>BTHL/script/cn<>#repeat>>BTHL/script/run>>CirConf/script/new", //configure beat highlight
//"#:confalready rectangle image text circle >>EditData/text/4>>CirConf/script/new",//normalize others
//"#EditData/text/2>>CirConf/script/run<>EditData/text/3>>CirConf/script/cn>>CirConf/script/new", //set to auto repeat on cn 1
//"#repeat>>CirConf/script/run", //init once
*/	



		
//CIRCLE
"@script>>CirConf",
"###repeat>>%/circle/run>>KeyE/script/1>>CirConf/script/new", 
"###loop>>%/circle/run>>KeyR/script/1>>CirConf/script/new",
"###off>>%/circle/run>>KeyF/script/1>>CirConf/script/new",
//prevf
"##%/circle/current>>EDat/text/3<>->>%/circle/cn>>PrevF/script/1>>CirConf/script/new", //grabs a copy of the current beat..
"##%/circle/current>>%/circle/current<>+>>PrevF/script/cn>>PrevF/script/2>>CirConf/script/new", //we skip the next ins
"##EDat/text/3>>%/circle/current>>PrevF/script/3>>CirConf/script/new",
//nextf
"##%/circle/current>>EDat/text/3<>+>>%/circle/cn>>NextF/script/1>>CirConf/script/new", //grabs a copy of the current beat..
"##%/circle/current>>%/circle/current<>+>>NextF/script/cn>>NextF/script/2>>CirConf/script/new", //we skip the next ins
"##EDat/text/3>>%/circle/current>>NextF/script/3>>CirConf/script/new",
//End key to remove circle current beat
"##rmline>>%/circle/current<>->>%/circle/cn>>RmBeat/script/1>>CirConf/script/new",
"###end>>RmBeat/script/run>>RmBeat/script/2>>CirConf/script/new",
//T
"##+/Speeds/6>>%/circle/current/radius>>KeyT/script/1>>CirConf/script/new",
//"##+>>%/circle/current/radius>>KeyT/script/new>>CirConf/script/new",
"##end>>KeyT/script/run>>KeyT/script/2>>CirConf/script/new",
//G
"##-/Speeds/6>>%/circle/current/radius>>KeyG/script/1>>CirConf/script/new",
"###end>>KeyG/script/run>>KeyG/script/2>>CirConf/script/new",
//Cursor X for circle beats
"#:#+/Speeds/1>>%/circle/current/x>>AspRight/script/1 ##end>>AspRight/script/run>>AspRight/script/2 #-/Speeds/1>>%/circle/current/x>>AspLeft/script/1 ##end>>AspLeft/script/run>>AspLeft/script/2 #-/Speeds/1>>%/circle/current/y>>AspUp/script/1 ##end>>AspUp/script/run>>AspUp/script/2 #+/Speeds/1>>%/circle/current/y>>AspDown/script/1 ##end>>AspDown/script/run>>AspDown/script/2 #CursorX>>EDat/text/4 >>CursorX/script>>CirConf/script/new",
//configure beat highlight
"#Nums/text/3>>BTHL/script/cn<>#repeat>>BTHL/script/run>>CirConf/script/new",




//RECT
"@script>>RectConf",
"###repeat>>%/rectangle/run>>KeyE/script/1>>RectConf/script/new", 
"###loop>>%/rectangle/run>>KeyR/script/1>>RectConf/script/new",
"###off>>%/rectangle/run>>KeyF/script/1>>RectConf/script/new",
//prevf
"##%/rectangle/current>>EDat/text/3<>->>%/rectangle/cn>>PrevF/script/1>>RectConf/script/new", //grabs a copy of the current beat..
"##%/rectangle/current>>%/rectangle/current<>+>>PrevF/script/cn>>PrevF/script/2>>RectConf/script/new", //we skip the next ins
"##EDat/text/3>>%/rectangle/current>>PrevF/script/3>>RectConf/script/new",
//nextf
"##%/rectangle/current>>EDat/text/3<>+>>%/rectangle/cn>>NextF/script/1>>RectConf/script/new", //grabs a copy of the current beat..
"##%/rectangle/current>>%/rectangle/current<>+>>NextF/script/cn>>NextF/script/2>>RectConf/script/new", //we skip the next ins
"##EDat/text/3>>%/rectangle/current>>NextF/script/3>>RectConf/script/new",
//End key to remove rectangle current beat
"##rmline>>%/rectangle/current<>->>%/rectangle/cn>>RmBeat/script/1>>RectConf/script/new",
"###end>>RmBeat/script/run>>RmBeat/script/2>>RectConf/script/new",
//T
"##+/Speeds/4>>%/rectangle/current/w>>KeyT/script/1>>RectConf/script/new",
"##end>>KeyT/script/run>>KeyT/script/2>>RectConf/script/new",	
//G
"##-/Speeds/4>>%/rectangle/current/w>>KeyG/script/1>>RectConf/script/new",
"##end>>KeyG/script/run>>KeyG/script/2>>RectConf/script/new",	
//Y
"##+/Speeds/5>>%/rectangle/current/h>>KeyY/script/1>>RectConf/script/new",
"##end>>KeyY/script/run>>KeyY/script/2>>RectConf/script/new",	
//H
"##-/Speeds/5>>%/rectangle/current/h>>KeyH/script/1>>RectConf/script/new",
"##end>>KeyH/script/run>>KeyH/script/2>>RectConf/script/new",	
//Cursor X for rectangle beats
"#:#+/Speeds/1>>%/rectangle/current/x>>AspRight/script/1 ##end>>AspRight/script/run>>AspRight/script/2 #-/Speeds/1>>%/rectangle/current/x>>AspLeft/script/1 ##end>>AspLeft/script/run>>AspLeft/script/2 #-/Speeds/1>>%/rectangle/current/y>>AspUp/script/1 ##end>>AspUp/script/run>>AspUp/script/2 #+/Speeds/1>>%/rectangle/current/y>>AspDown/script/1 ##end>>AspDown/script/run>>AspDown/script/2 #CursorX>>EDat/text/4 >>CursorX/script>>RectConf/script/new",

//configure beat highlight
"#Nums/text/4>>BTHL/script/cn<>#repeat>>BTHL/script/run>>RectConf/script/new", 




//IMAGE
"@script>>ImageConf",
"###repeat>>%/image/run>>KeyE/script/1>>ImageConf/script/new", 
"###loop>>%/image/run>>KeyR/script/1>>ImageConf/script/new",
"###off>>%/image/run>>KeyF/script/1>>ImageConf/script/new",
//create an orb to print the whole image as bg
"#@image>>ImageBg>>ImageConf/script/new",
"#%/image/file>>ImageBg/image/file>>ImageConf/script/new",
//PageUp and PageDown to move between frames and create new ones to work with. we are skiping an instruction when we dont find
//the current beat. its an interesting pattern
//prevf
"##%/image/current>>EDat/text/3<>->>%/image/cn>>PrevF/script/1>>ImageConf/script/new", //grabs a copy of the current beat..
"##%/image/current>>%/image/current<>+>>PrevF/script/cn>>PrevF/script/2>>ImageConf/script/new", //we skip the next ins
"##EDat/text/3>>%/image/current>>PrevF/script/3>>ImageConf/script/new",
//nextf
"##%/image/current>>EDat/text/3<>+>>%/image/cn>>NextF/script/1>>ImageConf/script/new", //grabs a copy of the current beat..
"##%/image/current>>%/image/current<>+>>NextF/script/cn>>NextF/script/2>>ImageConf/script/new", //we skip the next ins
"##EDat/text/3>>%/image/current>>NextF/script/3>>ImageConf/script/new",
//End key to remove image current beat
"##rmline>>%/image/current>><>->>%/image/cn>>RmBeat/script/new>>ImageConf/script/new",
"###end>>RmBeat/script/run>>RmBeat/script/new>>ImageConf/script/new",

//in image editor , cursor X and C are used to work on position and extraction. These are "modes" . Maybe we can also modify
//other buttons when selecting a cursor here. X could also modify TGYH to work with pw ph , and C could modify TGYH to work with
//w h ... ok its doable. WOrks. We want a few things to help with image inteface. a list by priority
//1 we need to have the json thing where we extract orbs as text working already so we can save progress on an edit. kinda done
//2 we want a rectangle to highlight the image selected both for when we use cursor X and cursor C as well. almost full done
//3 i think it might we nice to make bg and selection brighter or dimmer acording to which one we are working on
//4 figure out and implement a fast and easy way to modify cursors speed. done
//5 we need a Help script to print all available skeys with an explanation at any moment
//6 we definitely need delete>>orb/text . done

//maybe Backlash halts and wait a direction for a second to use a fast value for once, like the old L we had. rememebr?
//nevermind. we came up with a very nice system usinf ShiftLeft. so its done

//CursorX script for image aspect 
"#:#+/Speeds/1>>%/image/current/px>>AspRight/script/1 ##end>>AspRight/script/run>>AspRight/script/2 #-/Speeds/1>>%/image/current/px>>AspLeft/script/1 ##end>>AspLeft/script/run>>AspLeft/script/2 #-/Speeds/1>>%/image/current/py>>AspUp/script/1 ##end>>AspUp/script/run>>AspUp/script/2 #+/Speeds/1>>%/image/current/py>>AspDown/script/1 ##end>>AspDown/script/run>>AspDown/script/2 #+/Speeds/4>>%/image/current/pw>>KeyT/script/1 ##end>>KeyT/script/run>>KeyT/script/2 #-/Speeds/4>>%/image/current/pw>>KeyG/script/1 ##end>>KeyG/script/run>>KeyG/script/2 #+/Speeds/5>>%/image/current/ph>>KeyY/script/1 ##end>>KeyY/script/run>>KeyY/script/2 #-/Speeds/5>>%/image/current/ph>>KeyH/script/1 ##end>>KeyH/script/run>>KeyH/script/2 #off>>ImageBgSynch/script/run #CursorX>>EDat/text/4 >>CursorX/script>>ImageConf/script/new",
//CursorC script for image asp 
"#:#+/Speeds/1>>%/image/current/x>>AspRight/script/1 ##end>>AspRight/script/run>>AspRight/script/2 #-/Speeds/1>>%/image/current/x>>AspLeft/script/1 ##end>>AspLeft/script/run>>AspLeft/script/2 #-/Speeds/1>>%/image/current/y>>AspUp/script/1 ##end>>AspUp/script/run>>AspUp/script/2 #+/Speeds/1>>%/image/current/y>>AspDown/script/1 ##end>>AspDown/script/run>>AspDown/script/2 #+/Speeds/4>>%/image/current/w>>KeyT/script/1 #+/Speeds/5>>%/image/current/pw>>KeyT/script/2 ##end>>KeyT/script/run>>KeyT/script/3 #-/Speeds/4>>%/image/current/w>>KeyG/script/1 #-/Speeds/4>>%/image/current/pw>>KeyG/script/2 ##end>>KeyG/script/run>>KeyG/script/3 #+/Speeds/5>>%/image/current/h>>KeyY/script/1 #+/Speeds/5>>%/image/current/ph>>KeyY/script/2 ##end>>KeyY/script/run>>KeyY/script/3 #-/Speeds/5>>%/image/current/h>>KeyH/script/1 #-/Speeds/5>>%/image/current/ph>>KeyH/script/2 ##end>>KeyH/script/run>>KeyH/script/3 #off>>ImageBgSynch/script/run #CursorC>>EDat/text/4 >>CursorC/script>>ImageConf/script/new",
//CursorZ displacements . we use this cursor to move the orb aspect position as a whole. we move the center from which
//the animation unfolds. but image editor also needs to move 
"#:#+/Speeds/1>>%/x>>AspRight/script/1 ##end>>AspRight/script/run>>AspRight/script/2 #-/Speeds/1>>%/x>>AspLeft/script/1 ##end>>AspLeft/script/run>>AspLeft/script/2 #-/Speeds/1>>%/y>>AspUp/script/1 ##end>>AspUp/script/run>>AspUp/script/2 #+/Speeds/1>>%/y>>AspDown/script/1 ##end>>AspDown/script/run>>AspDown/script/2 #repeat>>ImageBgSynch/script/run #CursorZ>>EDat/text/4 >>CursorZ/script>>ImageConf/script/new",

"##once>>CursorZ/script/run>>ImageConf/script/new", //initialize CursorZ by default


//so the rectangle like selection need to only be visible when we are on image aspect orb. CursorX 
//a rectangle to illustrate image extraction
"#@rectangle>>ImageRectS>>ImageConf/script/new",
//so a monitor for image asp. as long as img asp is stanciated, we draw a rectangle on selection or extraction acording to cursor
//2 scripts.. ok so this works, but moving aound cursorZ messes the rectangle position so we need to account for that
//these scripts are created when we stanciate an image aspect orb
"#@script>>XYImageRectS>>ImageConf/script/new",
"##%/image/current/x>>ImageRectS/rectangle/current/x<>%/image/current/y>>ImageRectS/rectangle/current/y>>XYImageRectS/script>>ImageConf/script/new",
"##repeat>>XYImageRectS/script/run>>ImageConf/script/new",

"#@script>>WHImageRectS>>ImageConf/script/new",
"##%/image/current/w>>ImageRectS/rectangle/current/w<>%/image/current/h>>ImageRectS/rectangle/current/h>>WHImageRectS/script>>ImageConf/script/new",
"##repeat>>WHImageRectS/script/run>>ImageConf/script/new",

"#@script>>ZXYImageRectS>>ImageConf/script/new",
"##%/aspect==#image<>#2>>ZXYImageRectS/script/cn>>ZXYImageRectS/script/1>>ImageConf/script/new",
"###5>>ZXYImageRectS/script/cn>>ZXYImageRectS/script/2>>ImageConf/script/new",
"##%/x>>ImageRectS/x<>%/y>>ImageRectS/y>>ZXYImageRectS/script/3>>ImageConf/script/new",
"##loop>>ZXYImageRectS/script/run>>ImageConf/script/new",

"#Nums/text/5>>BTHL/script/cn<>#repeat>>BTHL/script/run>>ImageConf/script/new", //configure beat highlight

//when we use CursorZ , we also need to displace the ImageBg orb. lets make a script to synch ImageBg position. this works
//as long as current stance aspect is image, we keep synching ImageBg position with the stance orb
"#@script>>ImageBgSynch>>ImageConf/script/new",
"#:%/aspect==#image<>#once>>ImageBgBeat/script/run >>ImageBgSynch/script>>ImageConf/script/new",
//initialize ImageBgSynch to synch image bg to current image orb position
"##repeat>>ImageBgSynch/script/run>>ImageConf/script/new",		
//ImageBgBeat
"#@script>>ImageBgBeat>>ImageConf/script/new",
"#:%/x>>ImageBg/x<>%/y>>ImageBg/y >>ImageBgBeat/script>>ImageConf/script/new",

//i thinkvwe need a command to consolidate beats and just remove redundancy ... might be good for efficiency!!!!
//consolidate>>target

//all is working perfectly. ok now lets keep moving. we can send polarity signals to all the text lines at once , this is
//really great because now we can really easily synch orbs just by synching the orbs to the numbers in the text.
//The idea of having texts to store data we can manipulate with scripts
//and let beats use this data is what is all about. 

//The idea of making groups of orbs related by name and functionality to move in the same pattern all at once.
//so, we could have a list with coordinates to make a group of scripts organize in a distinct shape , also a specific circle orb to move
//around all related orbs at once . use algo01 //algo01/source>>orb/text 
//var pos = getTrackPos(gtpp[0], gtpp[1], gtpp[2], gtpp[3], gtpp[4], gtpp[5]); ... give me  a sec
/*
"@script>>bnfShipPos",
"bnfShipDat/text/1>>bnfShip/x<>bnfShipDat/text/2>>bnfShip/y",
//!!!!!!!caterpillar!! put all Pos lines in here so we update one after the other!!
"bnfShipDat/text/1>>bnfShipDat/x<>bnfShipDat/text/2>>bnfShipDat/y",
"bnfShipDat/text/1>>bnfCnumbers/x<>bnfShipDat/text/2>>bnfCnumbers/y",

"@circle>>bnfShip",
":radius,200 >>bnfShip/circle",
	
"@script>>bnf",

"@text>>bnfShipDat",
":1 1 1 >>bnfShipDat/text",
*/

//back n and forth counters tests. working perfectly
"@text>>bnfCnumbers",
":0 6.3 0 1 2 >>bnfCnumbers/text",

"@script>>bnfCcond",
":bnfCnumbers/text/1>=bnfCnumbers/text/2<>#once>>bnfCswitchT4/script/run bnfCnumbers/text/1<=bnfCnumbers/text/3<>#once>>bnfCswitchT5/script/run >>bnfCcond/script",
"#repeat>>bnfCcond/script/run",

"@script>>bnfCbeats",
":+0.1>>bnfCnumbers/text/1 -0.1>>bnfCnumbers/text/1 >>bnfCbeats/script",
"#repeat>>bnfCbeats/script/run",

"@script>>bnfCswitchT4",
":bnfCnumbers/text/5>>bnfCbeats/script/cn bnfCnumbers/text/5>>bnfCcond/script/cn >>bnfCswitchT4/script",

"@script>>bnfCswitchT5",
":bnfCnumbers/text/4>>bnfCbeats/script/cn bnfCnumbers/text/4>>bnfCcond/script/cn >>bnfCswitchT5/script",


//from 0 to max then back to zero
"@text>>Cnumbers",
":0 1000 >>Cnumbers/text",

"@script>>Ccond",
"#Cnumbers/text/1>=Cnumbers/text/2<>#0>>Cnumbers/text/1>>Ccond/script/new",
"#repeat>>Ccond/script/run",

"@script>>Cbeats",
"#+1>>Cnumbers/text/1>>Cbeats/script/new",
"#repeat>>Cbeats/script/run",
		
/*


//clone and modularize
"clone/numbers>>bnfCnumbers",
"clone/cond>>bnfCcond",
"clone/beats>>bnfCbeats",
"clone/switchT4>>bnfCswitchT4",
"clone/switchT5>>bnfCswitchT5",

"@mods<>unseal/text/script>>mods",
"#numbers/script>>mods/text/new",
"#cond/script>>mods/text/new",
"#beats/script>>mods/text/new",
"#switchT4/script>>mods/text/new",
"#switchT5/script>>mods/text/new",

"modularize/bnfCnumbers/numbers/bnfCcond/cond/bnfCbeats/beats/bnfCswitchT4/switchT4/bnfCswitchT5/switchT5>>mods/text"
*/
//"#All set.>>Main/text/new",
//"delete>>FirstSequence"

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

	]

}
staNce.push(o.name);
scriptOrbs.push(o);


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
//
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


/*
script loop, script orb annalize current instruction, ... yeah we can just ask again every orb for their stack changes...
text loop, ask each orb for change stacks, perform changes

*/


