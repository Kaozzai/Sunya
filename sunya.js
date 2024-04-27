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
//GLOBAL
const all = {};//will contain everything for now
//const unl = []; // unique names list.. kinda deprecated. not very smart system
all.gameStart = Date.now();//sunya initialization time
all.heartbeat = undefined;//becomes hold return for heartbeat interval

//orb escence. a different color on each beat
//.. i could run random range once, then substract 60 to create a second value, and add 60 to create third value, always between
//0 - 220 . this way it would be more efficient and the result would be more contrasting ?
var o_r=220; var o_g=220; var o_b=220; 
var a_v =0;

var stance = undefined;
var uinit = undefined;

//VOID NODE
//an object to hold void nodes data. 
var voidn = {
	limitx:10000, limity:10000, 
	pressure:1, heat:1
}


//USER Users are void entities
//so translate could just persist always in refference to void sea. if we want to change position or explore while on
//husk or orb stance we could simply move states around and dont even touch translate
//or we could just save translate operations on user. every time we call translate we just add x and y to user position
//all.user = {
var U = {
//all.gameStart = Date.now();//sunya initialization time
	//i l just go with my name since am testing stuff..
	name: 'Kaozzai', speed:10 ,  //do we really need speed...?
	x:0, y:0, //stores all translate operations on void to register position
	birthday: all.gameStart,
//default user stream (mainstream) is independent and fully customizable
//instructions on how to print default stream are stored here and are customizable by user from void stance
//users should be able to influence orbs streams trough other
//orbs using scripts from act language but not straight from void using only commands

//there is mainstream, and estream for editor modes.
	//mainstream , scrollable
	mainstream:	{
		name:"__default",
		r:220, g:220, b:220, a:0.6, 
		x:14, 
		//y:window.innerHeight-28,
		y:220,
		limit:30, 
		font:'px Courier New', size:14, spacer:-15, align:'left',
		freeze: false, up:false, down:false, left:false,right:false, c_last:0,
		history: []
	},
	//edit stream feedback, doesnt scroll
	estream: {
		name:"__feed", 
		r:220, g:200, b:140, a:1,
		//x:window.innerWidth-14,
		x:250,
		//y:window.innerHeight-28,
		y:320,
		on_screen:0, limit:6, align:'right', 
		font:'px Courier New', size:15, spacer:-15, freeze: false, c_last:0,
		history : [] //we dont keep history here but we need it for the print system
	},

//so key_s will now become void_k. we will now have all modes keys stored in here as well... mmm not so sure now
//... ok so orbs will have all their animations stored and they will have a particular set of shortcuts to manipulate their own
//assets so yeah.. maybe we do need buttons stored on orbs and not on user..
	//void_k?
//KEY SHORT
	key_s: [
		//some temporal shorts for developing..
		{name:"in orb", key:"INO", com1:".type:.orb.in:", com2:".type:", X:100, Y:100, persist:"desist"},
		{name:"in user", key:"INU", com1:".type:.user.in:"},
		{name:"out Tools", key:"OO", com1:".orb.Tools.out", com2:".type:", X:170, Y:100, persist:"desist"},
		{name:"out user", key:"OU", com1:".user.out"},
		{name:"help", key:"H", com1:".type:.help."},
		{name:"button", key:"BTN", com1:".button"},
		{name:"control", key:"C", com1:".orb.Tools.control"},
		{name:"impulse", key:"IM", com1:".type:.impulse:"},
		//some test impulses
		{name:"pulse1", key:"P1", com1:".wave:400:200:5:50"},
		{name:"pulse2", key:"P2", com1:".wave:400:230:5:50"},
		{name:"pulse3", key:"P3", com1:".wave:400:260:5:50"},
		{name:"pulse4", key:"P4", com1:".wave:400:290:5:50"},
		{name:"pulse5", key:"P5", com1:".wave:400:320:5:50"},
		{name:"pulse6", key:"P6", com1:".wave:400:350:5:50"},

		{name:"impulse1", key:"I1", com1:".wave:500:200:50:90"},
		{name:"impulse2", key:"I2", com1:".wave:500:230:100:100"},
		{name:"impulse3", key:"I3", com1:".wave:500:260:100:100"},
		{name:"impulse4", key:"I4", com1:".wave:500:290:100:100"},
		{name:"impulse5", key:"I5", com1:".wave:500:320:100:100"},
		{name:"impulse6", key:"I6", com1:".wave:500:350:100:100"},

		//some user displacement tests. 
		{name:"dis up", key:"W", com1:".displace.up:100"},
		{name:"dis left", key:"A", com1:".displace.left:100"},
		{name:"dis down", key:"S", com1:".displace.down:100"},
		{name:"dis right", key:"D", com1:".displace.right:100"}

	], //key shorts
	

	//prims animations:[] ..?
	orbs: [], //currently owned orbs- stores data object concerning orb ?

}; //user



all.k_map = [];//contains pressed KEYS to handle fast press
all.s_s_t_r = [];//contains SYMBOLS of command input in an array
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
all.c_input = undefined; //holds input before sending



//ARRAY containers
//all.up_objs = [];//contains objects to be checked by all.ml_up on update
all.fleet_a =[];//contains vessels running act scripts

all.anim_a = [];//animations states array
//all.anim_cue = [];//internal function array for anim_a implementation
all.anim_q0 = [];//layer 0
all.anim_q1 = [];//later 1
all.anim_q2 = [];//layer 2

all.com_a = [];//commands container

all.res_acts = [];//stores act resources
all.perform = [];//stores temporary acces to act resources

//TOUCH
//all.touches_a = []; //holds touches
all.ges_seq = []; //gesture sequence ? am i using thiis
all.bt_alr = false; //for touch button system

all.stream_a = [];//contains txt lines as items to be streamed

///////////////////////////////////////////////////////////////////////////////HTML
//CANVAS
//ok new resolution:
//We are just going to create a rendering system using 1 or maybe 2 canvas elements. 
//an offscreen tag for states will act just like a ctx but it wont draw, it will only run and
//update the logics.
//Now just focus on making all editors use a single context. You just learned that having txt in a canvas apart hoping
//it would be less drawing process in the end didnt cut it because you still would like to see txt on screen being animated somehow.
//We will just clear all and print all in one context.
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
const chat_in = document.getElementById('chatext');
chat_in.spellcheck=false;
chat_in.style.outline="none";//no more outline. nice
chat_in.style.zIndex=6;
//chat_in.style.opacity=0.5;
//chat_in.style.color='black'; 
chat_in.style.fontSize="25px";
chat_in.style.position='fixed';//fixed is the bey. literally fixed my problem
//chat_in.style.left="200px";
chat_in.style.backgroundColor='rgba(0,0,0,0.6)';
chat_in.style.color='rgba(220,220,220,0.9)';
chat_in.style.borderColor='rgba(220,220,220,0)';
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
all.keys_feed = function(){
	all.sstr_t++;	//timer count should run before clearing and before logic updates
	if(all.wait_com_key==true){all.sstr_t--;}//wait for command to save on key_s a lock
	if(all.sstr_t > 20){ //time limit for command feedback 
		all.sstr_t = 0;	//reinitialization
		kfeed.is='c_txt';
		kfeed.display='ignore';
		all.s_s_t_r = []; all.sstr = ' '; all.sstr_l = ' ';//cleaning string symbols here ..?
		//all.clean_f();   RIP
		//console.log('time up');
		return;
	}
	if(all.sstr == all.sstr_l){	
		//check if text is the same
		kfeed.is='c_txt';
		kfeed.display='normal';
	}else{
		all.sstr_l = all.sstr;	//keep track of text for check

	//let c1 = all.get_r_num(0,220); let c2 = all.get_r_num(0,220); let c3 = all.get_r_num(0,220);
		kfeed.r=all.sstr_r; kfeed.g=all.sstr_g; kfeed.b=all.sstr_b; kfeed.a=all.sstr_a;
		kfeed.tx=-U.x; kfeed.ty=-U.y; //this works
		kfeed.txt=all.sstr_l; 
		kfeed.is='c_txt';
		kfeed.display='normal';
	}

}//keys feed


//EVENT funcs KEY
const kdown = function(ev){
	//event.preventDefault();
	//console.log(ev);
//am disabling this and noticing no changes....
	//if(ev.repeat){return}//prevents repeating.. but we want repeat on certain instances. scrolling stream for example
	//console.log(ev);
	//ev.shiftKey
	//ev.ctrlKey
	//
	var e = ev.which; 
	//console.log(e + " " + String.fromCharCode(e)); //allow this to see what key code you press on console
	//var u = all.user;
	//var c_o = all.find_ting(all.up_objs,"u_in_contrl", true);

	var c_o=stance;
	if(c_o==undefined){
		var comav = 'void';
	}else{
		if(c_o.name==undefined){var comav = 'husk';}else{var comav = 'vessel';}
	}
	//strem for streaming target
	if(c_o){
		if(c_o.radiant_mode==true){var strem = c_o.stream;}else{var strem = U.mainstream;}
	}else{var strem = U.mainstream;}

//SPACEBAR
//a system to attach commands into keys
	if (ev.which == 32 && ev.target == document.body) { //spacebar
		ev.preventDefault();//prevents space to scroll document.. idfk how but it works
		if(all.sstr==' '){
			//here goes ting to clean key memory
			all.wait_com_key_forget = true;
			all.stream_a.push("Enter key to break command line asociated");
			all.screen_log();
			//console.log("Enter key to break command line asociated");

		}else{
			//wait com key lock
			all.wait_com_key = true; 
			//all.sstr_g=30; all.sstr_r=20;
			kfeed.g=30; kfeed.r=20;

			//var c = ctx0;
			//c.save();
			//c.fillStyle =`rgba(${all.sstr_r},${all.sstr_g},${all.sstr_b},${all.sstr_a})`;
			//c.font = "30px Courier New";
			//c.textAlign = "center";
			//all.d_text(ctx0 ,all.sstr_l, all.sstr_x, all.sstr_y);
			//c.fillText(all.sstr_l,all.sstr_x,all.sstr_y);
			//c.restore();
			//
			all.stream_a.push(all.sstr + " key ready to be linked","Type a command for this key"); all.screen_log();
			//console.log(all.sstr + " key ready to be linked");
			//vox lock
//i think vox will now simply be an orb customized keyshorts so this needs update
//.....!!!! update this
			//var c_o = all.find_ting(all.up_objs, "u_in_contrl", true);
			if(c_o){if(c_o.vox_mode){var check_vox = true;}}
			if(check_vox){
			var anim_in = {is_a:"c", str:".type:.asign:"}; all.com_a.push(anim_in);
			} //vox lock
		}
	}//spacebar

//BACKSPACE
//clean command feedback with backspace on ctx4
//.. would be nice to be able to clear the stream from the screen as well
	if (e == 8 && all.chat_on == false){ //backspace
		//normalize key feedback from key save lock
		all.s_s_t_r = []; all.sstr = ' '; all.sstr_l = ' '; all.wait_com_key = false;
		kfeed.is='c_txt';
		kfeed.g=220; kfeed.r=220; kfeed.display='ignore';
		//all.sstr_g=220; all.sstr_r=220;

		all.wait_com_key_forget = false; //clear forget key lock also
	//and also, just clear active stream?
	//ok if user is on radiant mode, we have to clear the orb stream
		//if(c_o.radiant_mode){var strem = c_o.stream;}else{var strem = all.user.mainstream;}
		all.clear_stream(strem);
		//console.log("Clear");
		//rip all.clean_f   F
	}//backspace


//ENTER, CHAT
//input system to chat ,send strings to server and enter commands

//if enter, check if all.chat_on is true or false, if true, then send data and chat_on
//to false, or just set chat_on to false if there is no data to send
//if enter, and chat_on is false, then activate system and set all.chat_on to true
//when system is activated, allow only e 13 , and focus on chat_in
//once value is ready, enter sends value to all.c_input so proper filter and
//respective emitter send the data to wherever neccesary and set chat_on false
//and allow other symbols of command interface

	if (e == 13){ //press enter to focus on input html tag
		//event.Default();
//this command process is not exclusively for keyboard..
//a function to manage all.chat_on
///
		if(all.chat_on == true){
			all.c_input = chat_in.value;

//to emit specific event using keywords on input itself
//var c_i = chat_in.value.substr(0,1); //substracts the first character of chat_in
			let c_i = all.c_input.substr(0,1); //substracts the first character of all.c_input for evaluation
			if (c_i == "."){ //if command input starts with a dot, then the system recognizes it as a command
//if the user is on an Orb, then the system should hand over the command to the Orb.
//If User is on the void, the void decides if the command does anything
//Use ml_up to evaluate the command. send all.c_input in a package and push it into 
//command array com_a .also, commands should not show up on orbs feeback.. maybe they should
				var command = {
					is_a:"c", str:all.c_input
				}
				//key memory system
//if user is on touchscreen, we dont use spacebar mem system
				if(all.wait_com_key==true){
			//update here as well after act can run osc and sounds etc
			//..!!!!!update this
					if(c_o){if(c_o.vox_mode){var check_vox = true;}}
					if(check_vox){

					//.asign:name_of_audio should not go to key_s. the animation should be asigned to the key
					//audio anim should go into an orb array to store vox special key shorts. just ignore key mem
					//system and push the command
						all.com_a.push(command);
						all.wait_com_key=false;
						kfeed.g=220; kfeed.r=220;

					}else{//vox lock
	//save key on user when on void , save key on orb when on orb
						if(stance==undefined){var mbox = U.key_s;}
						if(comav=='void'){var mbox = U.key_s;}
						if(comav=='husk'){var mbox = U.key_s;}
						if(comav=='vessel'){
							if(c_o.inner_mode){var mbox = c_o.inner_ks;}
							if(c_o.radiant_mode){var mbox = c_o.radiant_ks;}
							if(c_o.edit_img_mode){var mbox = c_o.img_ks;}
							if(c_o.edit_audio_mode){var mbox = c_o.audio_ks;}
							if(c_o.edit_txt_mode){var mbox= c_o.txt_ks;}
							if(c_o.edit_circle_mode){var mbox= c_o.circle_ks;}
							if(c_o.edit_rect_mode){var mbox= c_o.rect_ks;}
							if(c_o.edit_osc_mode){var mbox= c_o.osc_ks;}

							//..add others
						}
				//keyboard users
			//look for an element on ks that already has the command on com1 so it adds data into
			//the button object instead of creating a new one
						var lm = mbox.length;
						while(lm--){
							var ksalr = mbox[lm];
							if(ksalr.com1==all.c_input){
								ksalr.key=all.sstr;
								var kready = true;
								break
							}
						}
						if(kready){}else{mbox.push({name:all.sstr, key:all.sstr, com1:all.c_input});}
						//...
						all.stream_a.push("your command is saved on key  "+ all.sstr); all.screen_log();
						//wait com key unlock for keyboard
						all.wait_com_key = false;
						kfeed.g=220; kfeed.r=220;
					
					}//vox mode lock
				}else{//memory key lock
				all.com_a.push(command);
				}
			}// "." notation	

			//console.log(all.c_input);
			if(all.c_input==''){//if after enter there is nothing on input then dont print anything
			}else{
//here goes something to direct the input text where it should be going when its not a command
				if(c_o){//ask if user is on orb
					if (c_i == "."){
						//dont print command on orb feed
					}else{
					//this should go to a local stream channel, not feedback ... this is messy but ok for now
						all.stream_a.push(all.c_input);//all.screen_log("feedback", c_o);
						all.screen_log(); // .. for now
//txt edit mode uses input diferently..
						if(c_o.edit_txt_mode){
						//pass this flag so edit now can take care of it
							c_o.op4 = 1;  //this is versatile, i can use other numbers as well
						}//txt edit mode
					}//not a command
				}else{//default feedback stream when on void
	//.. maybe this input should be listened by server anyway if user is connected to it
					all.stream_a.push(all.c_input);all.screen_log();
				}//user not on orb
			}//chat is not empty
//from here its just return to normal input behavior and clean the text box when normalize is true
			//all.c_input = undefined; //!!! shouldnt clean this just yet, let Orbs evaluate it. shouldnt bother anyone lol
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
	}// e = 13 enter

//ESC , HELP
//use esc at any moment when chat is not on to call for .help command
	if(e == 27 & all.chat_on == false){
		var command = {is_a:"c", str:".help"}; all.com_a.push(command);
	}//esc


//ARROW keys control STREAM SCROLLing HISTORY
//... still needs to handle orb streams on radiant mode update this? no i think it works already
//all arrow keys except for right arrow should freeze stream
	if(e == 37 & all.chat_on == false){
//nothing works to prevent repeat. only when focus is on chat , arrows wont trigger scrooling page on repeat, so am thinking maybe just
//create a dummy button that does nothing, and let default focus hang in there when not on chat input
//if(ev.repeat){return}
//&& ev.target == document.body) { 
//ev.preventDefault();
		if(["ArrowLeft"].indexOf(ev.code) > -1) {ev.preventDefault();}
		//detach from stream updates but keep storing messages on history. freeze stream
		strem.left=true;
		all.screen_log();
	}//left arow

	if(e == 39 & all.chat_on == false){
		if(["ArrowRight"].indexOf(ev.code) > -1) {ev.preventDefault();}
		//unfreeze stream, scroll to last message
		strem.right = true;
		all.screen_log();
	}//right arow

	if(e == 38 & all.chat_on == false){
		if(["ArrowUp"].indexOf(ev.code) > -1) {ev.preventDefault();}
		//detach and print current lines - 1 using limit and history
		strem.up = true;
		all.screen_log();
	}//up arow

	if(e == 40 & all.chat_on == false){
		if(["ArrowDown"].indexOf(ev.code) > -1) {ev.preventDefault();}
		//detach and print current lines + 1 , dont do anything if already on last line
		strem.down=true;
		all.screen_log();
	}//down arow

//SHIFT
//for now, we can use shift to lock oscillators in a loop on vox mode. push tag into all.k_map
//... i dont know how i will implementthis once vox is gone and its just acts and orbs custom keys
	if (e == 16){
		ev.preventDefault();
		//var c_o = all.find_ting(all.up_objs, "u_in_contrl", true);
		if(c_o){if(c_o.vox_mode){var check_vox = true;}}
			if(check_vox){	
				//find if there are keys down and add a tag for vox mode update to read
				//if key down, ask if that key shift is on array, if does, then push shift off
				//... use key down to locate audio anim, change audio anim state property directly
				var k = all.k_map[0]; //[0] might not always be the last key pressed.. but k should always be
				//the second to last all.k_map.length-1 .. which may be 0, but if zero it means its
				//
				if(k){
					var a_a = all.find_ting(c_o.osc, "asigned_key" , k);
					var a_s = all.find_ting(all.anim_a , "name", a_a.name+"_"+a_a.on_a[0]);
					if(a_s){
						//ask if on loop already, if do, then set loop to false
						if(a_s.loop){
							if(c_o.rec[0] !== "off"){
								var offtime = all.au.currentTime-c_o.rec[1];
								c_o.rec.push(a_a.name+"_loop_off_"+offtime+"_"+a_a.on_a[0]);
							}
							a_s.loop=false;
							all.stream_a.push("Loop off"); all.screen_log();
						}else{
							if(c_o.rec[0] !== "off"){
								var ontime = all.au.currentTime-c_o.rec[1];
								c_o.rec.push(a_a.name+"_loop_on_"+ontime+"_"+a_a.on_a[0]);
							}
							a_s.loop=true; 
							all.stream_a.push("Loop on"); all.screen_log();
						}
					}//anim state
				}//if key is on map
			}//check vox
	}//shift



//restrict value of e, only make 13(Enter) available
if(all.chat_on==true){//chat condition
	//use ESC to blur and clear chat box for a quick out of chat input box
	if(e == 27){ chat_in.value = ""; all.chat_on=false; chat_in.blur(); chat_in.style.display="none";}
}else{
//SYMBOL input KEY MAP IMPROVE
//The idea here is to map keys to symbols, if somebody can make this more efficient that would be awesome :)	
	if( 
//e to A-Z
e==65||e==66||e==67||e==68||e==69||e==70||e==71||e==72||e==73||e==74||e==75||e==76||e==77||e==78||
e==79||e==80||e==81||e==82||e==83||e==84||e==85||e==86||e==87||e==88||e==89||e==90||
//e to 0-9
e==48||e==49||e==50||e==51||e==52||
e==53||e==54||e==55||e==56||e==57){//symbol input
//console.log(e);
switch(e){
case 65:var k = 'A';break;case 66:var k = 'B';break;case 67:var k = 'C';break;case 68:var k = 'D';break;
case 69:var k = 'E';break;case 70:var k = 'F';break;case 71:var k = 'G';break;case 72:var k = 'H';break;
case 73:var k = 'I';break;case 74:var k = 'J';break;case 75:var k = 'K';break;case 76:var k = 'L';break;
case 77:var k = 'M';break;case 78:var k = 'N';break;case 79:var k = 'O';break;case 80:var k = 'P';break;
case 81:var k = 'Q';break;case 82:var k = 'R';break;case 83:var k = 'S';break;case 84:var k = 'T';break;
case 85:var k = 'U';break;case 86:var k = 'V';break;case 87:var k = 'W';break;case 88:var k = 'X';break;
case 89:var k = 'Y';break;case 90:var k = 'Z';break;

case 48:var k = '0';break;case 49:var k = '1';break;case 50:var k = '2';break;case 51:var k = '3';break;
case 52:var k = '4';break;case 53:var k = '5';break;case 54:var k = '6';break;case 55:var k = '7';break;
case 56:var k = '8';break;case 57:var k = '9';break;}

//to prevent keydown while 2 keys are pressed and one is up
//should check if same key is already pressed . add keydown to array all.k_map
//all.k_map should also manage if keys were pressed while holding ctrl or shift button
var l = all.k_map.length;
while(l--){
	if(k==all.k_map[l]){return}else{var push = true}
}
//all pressed keys go to all.k_map unless already there
if(all.k_map.length==0){all.k_map.push(k);}
if(push){all.k_map.push(k);}

//if(ev.ctrlKey){all.k_map.push(k+"_ctrl"); }  //dont use control. Browser doesnt allow to disable ctrl+N and other combos

	all.s_s_t_r.push(k);
	all.sstr = all.s_s_t_r.join('');
	all.sstr_t = 0;//by default , at every key stroke, timer should be reset
//.. We should be able to use user keyshorts while on void and orbs keyshorts while in control of orbs  !!
	//ask for asigned key short
//while on void , ask for user keyshorts
	if(comav=='void'||comav=='husk'){var ksa = U.key_s; var on_void = true;}else{
	//var ksa = all.user.key_s; var i = ksa.length;
	//if(comav=='husk'){var ksa = [];}//no memory
//needs an array to hold keys for each mode..
	if(comav=='vessel'){
		//c_o needs update
		//var c_o = stance; //all.find_ting(all.up_objs,"u_in_contrl", true);
		if(c_o.inner_mode){var ksa = c_o.inner_ks; var on_void = false;}
		if(c_o.radiant_mode){var ksa = c_o.radiant_ks; var on_void = false;}
		if(c_o.edit_img_mode){var ksa = c_o.img_ks; var on_void = false;}
		if(c_o.edit_audio_mode){var ksa = c_o.audio_ks; var on_void = false;}
		if(c_o.edit_txt_mode){var ksa = c_o.txt_ks; var on_void = false;}
		if(c_o.edit_circle_mode){var ksa = c_o.circle_ks; var on_void = false;}
		if(c_o.edit_rect_mode){var ksa = c_o.rect_ks; var on_void = false;}
		if(c_o.edit_osc_mode){var ksa = c_o.osc_ks; var on_void = false;}
		//add other modes ...
		//var ksa = c_o.key_s; var on_void = false; 
	}
	}
	var i = ksa.length;
	//checks for key
	while(i--){
		if(ksa[i].key==all.sstr){
			var key_short = ksa[i];
		}
	}
	if(key_short){
		//vox mode lock.. update this later
		//var c_o = all.find_ting(all.up_objs,"u_in_contrl", true);
//fix this vox mode later
		if(c_o){if(c_o.vox_mode){var check_vox = true;}}
		if(check_vox){}else{
			//splice key short if all.wait_com_key_forget is true
			if(all.wait_com_key_forget){
		//splice from user if we are on void, splice from orb if we are in orb stance.. its the same ksa
				//if(on_void){
					var key_index = ksa.indexOf(key_short); ksa.splice(key_index, 1);
				//}else{
				//	var key_index = ksa.indexOf(key_short); ksa.splice(key_index, 1);
					//..so am removing the complete short here.. might need to only remove the 'key' property instead
					//so it doesnt delete the button.. only remove the whole object when its not a button then..do this
				//}
				all.stream_a.push("Key liberated."); all.screen_log();
				all.wait_com_key_forget = false;
				var dont_send_com = true;
			}
			if(dont_send_com){}else{
			//send command asocited with key
			var command = {is_a:"c", str:key_short.com1}
			all.com_a.push(command);
			all.sstr_t = 20;
			}
		}//vox mode lock
	}

}//symbol input
}//chat condition

}//kdown
//window.addEventListener('keydown', kdown);

//needs update c_o is stance now.. !!!!!!!!!!!!!
const kup = function(ev){
		//keydown = false;
	//var e = ev.which; 
	//console.log('bananna');
	var k = ev.code.substr(3,1);
	if(k=="i"){var k = ev.code.substr(5,1);}//Digit throws i on index 3 so use 5
//find pressed key on all.k_map and splice it
	var i = 0; var l = all.k_map.length; //var shift_i = undefined;
	while(l--){
		if(k==all.k_map[i]){all.k_map.splice(i,1); l = 0;}  //console.log(all.k_map[i]);
	i++;}
//i could add this event handler directly on vox init and just remove it when user leaves the mode. since these event handlers
//are way too specific (keyboard only and vox mode)
//if vox on, take the state produced by the keydown and change its end value to "fade"
//if musical instruments, let keyup call fade out
	//console.log(k); //for testing purposes
	//console.log(ev); //for testing purposes
	var c_o = stance;//var c_o = all.find_ting(all.up_objs, "u_in_contrl", true);//needs to be defined here again ..
	if(c_o){if(c_o.vox_mode){var check_vox = true;}}
	//
	if(check_vox){
		var a_a = all.find_ting(c_o.osc, "asigned_key", k);
		if(a_a){
			var id = a_a.on_a[0];//
			if(id){
				var a_s = all.find_ting(all.anim_a , "name", a_a.name+"_"+id);
				if(a_s){
					if(a_s.loop==true){//dont let keyup end it
					
					}else{ 
						a_s.end="fade"; //default..
						if(c_o.rec[0] !== "off"){//if rec on then..
							var endtime = all.au.currentTime-c_o.rec[1];
							c_o.rec.push(a_a.name+"_end_"+endtime+"_"+id);
						}
						var silence = a_a.on_a.splice(0,1);
						console.log("silence "+silence);	
					}
				}
			}//check id of previus state of same osc
		}//if key is asigned to osc
	}//check vox
}//kup
//window.addEventListener('keyup', kup);


//HTML IMG FILE UPLOAD EVENT
//input_img html element can deal with images to load from client side. img_in
//input_audio html element can deal with sound to load from client side. audio_in
//.. i forgot what to do when i want to request files from server lol
//
//listen for change events on img_in and audio_in
//When user enters the load command, simulate a click on the input and let user 
//select the file.
//This function should let user know the file is loading into the orb. Once finished, 
//it should store the file buffer in the orb
//Images go to orb.img_access, Sound should go to orb.audio_access
//Either way, these functions should load the file into a property of a selected Orb
all.handleImgFile = () => {
	var selectedFile = img_in.files[0];//access file 0 from selected files array
	if(img_in.files[0]==undefined){console.log("No File Uploaded"); return}
	var reader  = new FileReader();
	reader.onload = function(ev)  {
		all.stream_a.push('Image file successfully loaded.');
		all.screen_log();
		//var orb = all.find_ting(all.up_objs, "u_in_contrl", true);
		//stance.img_access = all.img_adder(ev.target.result) //result is the property
//all.img_adder = function(img_src){var img = new Image(); img.src = img_src; return img;}
		var img = new Image(); img.src=ev.target.result;
		stance.img_access = img;
		//let orb have a parameter to store its currently loaded img file data
		stance.current_img_file = {
			name: selectedFile.name,
			size: selectedFile.size,
			type: selectedFile.type
		}
		
	}
	reader.readAsDataURL(selectedFile);// you have to declare the file loading

	//
	all.stream_a.push(selectedFile.name+"  "+selectedFile.size+"  "+selectedFile.type);
	all.screen_log();
	//console.log(selectedFile.name+"  "+selectedFile.size+"  "+selectedFile.type);//name, size, type of the file
	//type string is empty is file cant be determined
}
//EVENT
img_in.addEventListener("change", all.handleImgFile);

//AUDIO
//return a buffer into controled orb.audio_access using a file loaded by user
//it needs to be located on a BufferSource
all.handleAudioFile = () => {
	var selectedFile = audio_in.files[0];//access file 0 from selected files array
	if(audio_in.files[0]==undefined){
		all.stream_a.push("No File Uploaded"); all.screen_log(); return
	}
	var reader = new FileReader();
	reader.onload = function(ev){
		all.stream_a.push('Audio file successfully loaded.');
		all.screen_log();
		//var orb = all.find_ting(all.up_objs, "u_in_contrl", true);
		all.au.decodeAudioData(ev.target.result).then(function(buffer) {
	//then pattern i havent studied that, good 4 promises i think. but i can call
	//this later
			//buffer should be stored on the orb, createBufferSource should be
			//called when audio is going to be played
			//
			//audio_access could be an array of many files
			stance.audio_access= buffer;
			stance.current_audio_file = {
				name: selectedFile.name,
				size: selectedFile.size,
				type: selectedFile.type
			}
    			//var soundSource = all.au.createBufferSource();
			//soundSource.buffer = buffer;
			//orb.audio_access= soundSource;
		});
	}
	reader.readAsArrayBuffer(audio_in.files[0]);	// you have to declare the file loading
	all.stream_a.push(selectedFile.name+"  "+selectedFile.size+"  "+selectedFile.type);
	all.screen_log();
}
//EVENT
audio_in.addEventListener("change", all.handleAudioFile);




////SCREEN_LOG, STREAM
//a function to print test messages on screen.
//should be a read only text to act as a console log but doesnt need user to make
//browser debugger active. a user feedback.
//Events, orb streams, feedback from user input.
//Its main purpose is to listen for any relevant information and print it on the
//user screen, on a chat like fashion, with messages appearing on the same place,
//and previous messages automatically scrolling upwards and fading away as new 
//messages arrive.
//user should be able to call for a command to print history of messages on a text on input box . .history.out
//we can also use arrows to manipulate streams behavior
//default stream behavior is streaming local chat, mainstream
//messages coming from other users when on broadcast and the user when typing normally
//on chat_in
//the default stream should always be on top layer.
//
//I like how this works now, all.screen log can be called at any moment,
//it will take all the strings on all.stream_a and print
//them in order, using stream params stored on U.mainstream, estream or in orbs radiant stream
//IMPROVE
//needs a mechanism to automatically print another line if the message is
//too long...
//
//... ok so when no parameter , call mainstream. otherwise, parameter
//is the stream item itself passed from on from the orb calling the function on logic phase

//Now i can wrap up this stream system into another function to be called by user.
//these could be single lines with specific colours
//
//.... review
//so .....Its mainstream , estream and orb stream. we control mainstream trough commands on void and inner mode.
//estream from all modes except for radiant mode, and orb stream is reserved for radiant mode, controled exclusively by act language
//we control orb streams using act scripts. 

//.. ok so lets place estream and mainstream on user settings. We need to add a .user.out command to print out all user
//settings on a json text. this can be useful later for online things too.

//we only need one parameter here.. maybe 2, but for now , stream, which is any stream object. gg. 
//if user is on radiant mode, we use the orb stream we use ACT stream system
//
//This is working great.... but we could still clarify more. Also maybe we can actually make stream even more versatile for this fine 4 now
all.screen_log = function(stream){ //we can pass a second parameter to let function know it should clear stream history
	if(stream===undefined){
		var c_o = stance;//all.find_ting(all.up_objs,"u_in_contrl", true);
		if(c_o){
			if(c_o.radiant_mode==true){var stream = c_o.stream;}else{var stream = U.mainstream;}
		}else{var stream = U.mainstream;}
	}

	if(stream=='estream'){var stream = U.estream; var clear_history = true;}

//all STREAMs use HISTORY..
	var sal = all.stream_a.length; //2
	while(sal--){
		var n_msg = all.stream_a.shift();
		stream.history.push(n_msg);
	}
	//if up arrow, normalize and then decrease current_last , print and freeze
	if(stream.up){
		stream.up=false; 
		if(stream.c_last==0){}else{stream.c_last--;}
		stream.freeze=true;
		stream.left=false;
	}
	//if down arrow, normalize and then increase current_last but leave as is if on last already, print and freeze
	if(stream.down){
		stream.down=false;
		if(stream.history.length==stream.c_last){}else{stream.c_last++;}
		stream.freeze=true;
		stream.left=false;
	}

	//if right arrow, normalize and make current_last equal to actual history length, print and unfreeze
	if(stream.right){stream.right=false; stream.freeze=false; stream.left=false;}

	//if left arrow, normalize and leave current as is , print and freeze
	if(stream.left){
		all.clear_stream(stream); return
		//stream.left=false; stream.freeze=true;
	}

//so if freeze.. then use current last
	if(stream.freeze==true){var l = stream.c_last;}

//if not freeze, use history last and update c_last
	if(stream.freeze==false){var l = stream.history.length; stream.c_last=stream.history.length;}

//we just clear it. we always clear when screen_log is called...
	all.clear_stream(stream); 

//maybe we need l to be current_last. use this value to start printing. change this value to print from somewhere else.
	//var l = stream.history.length; 
	var i = stream.limit;
	var spacer = 0;
	while(l--){
		if(i<=0){break}
		var l_txt = stream.history[l];
		var print = all.txt_s_new(stream.name+i);
		print.x=stream.x; print.y=stream.y;
		print.r=stream.r; print.g=stream.g; print.b=stream.b; print.a=stream.a;
		print.t=-1; print.size=stream.size;
		var Font = stream.size+stream.font; print.font = Font; 
		print.txt=l_txt; print.align=stream.align;
		//tx and ty values need to match the inverse of current user translate position.
		print.tx=-U.x; print.ty=-U.y; // !!!
		//print.sx=window.scrollX; print.sy=window.scrollY;
		print.is="txt"; 
		print.y=print.y-spacer; //next line y position difference
//lol there is no display in here am actually not printing stream at every beat.. well we should because we want streams to vibrate
//with custom_a system. custom with 1 item should be default, no need  for 'normal' display
		print.display='normal'; //for now..
		all.anim_a.push(print);
	spacer = spacer-stream.spacer;
	i--;}

//so we want to clear history when.. we load json data and when we print help messages.
	if(clear_history){
		stream.history = [];
	}


}//screen_log


//a function to CLEAR a specific STREAM. it removes states that start with a specific string of words
//maybe i should also ask for '__line'...
//ok so this clear is great because it simply clears by name match no matter the number of the line at the end
//so we use stream name to clear all corresponding states.
all.clear_stream = function(stream){
	var l = all.anim_a.length; var extr_name = stream.name.length;
	while(l--){
		var s = all.anim_a[l];
		var name = s.name.substr(0, extr_name);
		if(name == stream.name){
	//so maybe this clear needs to remove instantly instead of just changing 'is' on states..
			//this is the funky clear
//so instead of clearing and removing here, we delegate to animf, BUT we change the name of the lines so they dont mess up the
//stream states being pushed again on screen_log
			s.name='___end';
			s.display='remove';

		}
	}
}

//we now need a function to update all stream states without having to print them again. we might want to change tx ty values
//in our lines, or even other properties to highlight specific lines.... it might actually be this same function but improved
all.adjust_stream = function(stream){//maybe we can use a parameter to affect a specific line here
	var l = all.anim_a.length; var extr_name = stream.name.length;
	while(l--){
		var s = all.anim_a[l];
		var name = s.name.substr(0, extr_name);
		if(name == stream.name){
//we can access line by line a stream here already. So we can just make adjustments to all lines or only just specific ones.
			s.tx=-U.x; s.ty=-U.y;
		}
	}
}

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



//ORB
//A function to return an Orb object
all.orb_new = function(orb_name){
	var vessel_date = Date.now();
	var birth_date = vessel_date;
//if user on keyboard or tscreen will determine what properties default keys have
	var orb = {
		vessel_date: vessel_date ,
		form: 'vessel', //
		name: orb_name , //u_in_contrl : false,  
		img_access: undefined, current_img_file : undefined,
		audio_access: undefined, current_audio_file : undefined,

//why not just mode and change mode value..
		//mode: 'inner',
		inner_mode: true,
		radiant_mode: false,
		edit_img_mode: false,
		edit_txt_mode: false, 
		edit_circle_mode :false, 
		edit_rect_mode :false,
		edit_audio_mode :false,
		edit_osc_mode : false,
		vox_mode : false,//soon to be deprecated?... hmm
		op1: 0, op2: 0, op3: 0, op4: 0 , op5: 0, op6:0,
		//selected_drag : false,  //selected drag could simply be op4
	//C is actually an object to be held... might be interesting to have a command
	//to just create an object to be stored inside an orb
		C : {}, //capture frame on img editor container. an object
		img: [], txt: [], audio: [], rect: [], circle: [], osc: [],//holds oscillators
		rec: ["off"], //holds a recording memory,may or may not be kept, if kept, it goes into..
		records : [],//..here
		actors:[], //actor acts currently playing

		//radiant stream
		stream:	{
			name:"__default",
			r:220, g:220, b:220, a:0.6, x:6, y:window.innerHeight-12, limit:15, 
			font:'px Courier New', size:14, spacer:-15, align:'left',
			freeze: false, up:false, down:false, left:false,right:false, c_last:0,
			history: []
		},

		//we hold custom key shorts in here
//default keys could be requested and removed on demand so we dont saturate orbs with these
//objects. edit tools
//also, touchscreen users have other properties because these are buttons. but we can share the same object. keyboard users only
// need key and com1 properties, com1 is common. buttons dont use the 'key' property
		inner_ks : [],
		radiant_ks : [],
		img_ks : [],//edit img mode keys
		audio_ks : [],//edit audio mode keys
		txt_ks : [],//edit txt mode keys
		circle_ks : [],//edit circle mode keys
		rect_ks : [],//edit rect mode keys
		osc_ks : [],//edit osc mode keys
		vox_ks : []//vox mode keys

//ok so. buttons dont really need gestures, but drag. they should simply
//call commands later, we could implement touch interactive animations so
//gestures can be specified
//yeah its gonnabe fun
//for now lets just make buttons do exactly what keys do! all we need now are
//coordinates
//we should be able to drag buttons around with a gesture and long press
//calls com2

	}//orb

	return orb;
}


//STATES
//All these states should just take a name as param. . . . its just more consistent
//that way. It can be modified at the moment of creation anyway.. using state.param = value

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

//A function to return an image sprite state. "img" activates, "c_img" checks
//default values just show the image as is for now
//consider the case window screen not being able to show the full image ..
//img edit considers it
//should be able to work without animation
//as well.. et = -1
all.ims_s_new = function(name, img_access){
	var state = { 
		name: name, img_access:img_access,  
		x:0, y:0, tx: 0, ty: 0,
		w:img_access.width, h:img_access.height,
		//w:window.innerWidth, h:window.innerHeight, 
		px:0, py:0, 
		pw:img_access.width, ph:img_access.height, a:1, layer:0, 
		//pw:window.innerWidth, ph:window.innerHeight, 
		ft:undefined, rt:-1, et:undefined, nfreq:undefined, anim:undefined, //ctx:undefined, 
		nfreq:undefined, s:"img", is:'f', run:true, loop:false,

		t:-1, display:undefined,
		custom_a:[],
		u_d:[]
		//se , tch?
	};
	return state;
}

//a function to return a txt state. "txt" activates, "c_txt" checks
//ctx,str,Font,txtAlign,x,y,r,g,b,a
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
		u_d: []

	};
	return state;
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
		u_d:[]

	};
	return state;
}




// -- DATA CONTROL . FUNCTION
//
//transition. A function to manage user stance and orb modes transition animations and environment changes.


//so if we want to change stance, we place the structure into stance global, and we place requested transition into uinit, and the
//also, we need to set : elid1.se='reset'; elid2.se='reset'; pupil.se='reset';
//when transition is done , it returns 'all set', but we can return other values to manage modes states flow in conjunction
//with init animations.
//All structures should be able to locate its prim states using stance.birth_date , husk_date and vessel_date. unless stance is void
//maybe structures should have stance_form and prim_form states names to be easily located..
//use uinit global to lock into transition whenever neccesary. uinit={transition:'husk inwards',stancefrom:stance, stanceto:stance}
//TRANSITION
//
all.transition = function(transition,stancefrom){ //,stanceto){ //transition, stancefrom , and global stance thats our current structure
//this line locks every interaction.. but touch
//... and i think its not working because transition is being called after the command has already been evaluated on c_com
	all.sstr=' '; all.sstr_t=20; all.s_s_t_r=[]; all.com_a=[];
//qw could do switch here
	//switch(mc_a[3]){
	//	case
	//}
//we can always just use pupil for consistency to run once so we position screen here and set elids as well

//from void to husk>> user succesfully got an impulse to the center . 'husk inwards'
//So we need to position user screen, to see the husk prim in the middle. once
//reset both elids and pupil. once
//slow close up to husk, while blueish fade in full screen. pupil is a big husk now. blue elid fades out.
//husk prims dont show any changes
	if(transition=='husk inwards'){//void to husk
		//let pupil reset always to set up everything that needs to be run once at the begginning
		if(pupil.se=='reset'){
//ok so to center on something, we substract x and y coordinate of the point, and then add half screen w and h
			var hp = all.find_ting(all.anim_a,'husk_date', stance.husk_date); //yeah this is the husk prim
			ctx0.translate((-U.x),(-U.y));//this should put user on 0
			U.x=0; U.y=0;//update to 0
			//now screen position center on husk
			var chx = -hp.x+(window.innerWidth/2); var chy = hp.y-(window.innerHeight/2);
			ctx0.translate(chx,chy);
			U.x=chx; U.y=chy;

			all.adjust_stream(U.mainstream); //

			//using elid1 for blue fades
			elid1.r=15; elid1.g=24; elid1.b=190; elid1.a=0.1; elid1.inside='filled';
			elid1.layer=2;
			//omg what is the logic here idk but it centers the thing
			elid1.x=hp.x-(window.innerWidth/2); elid1.y=-hp.y+(window.innerHeight/2);
			elid1.w=window.innerWidth; elid1.h=window.innerHeight;
			elid1.se='fade in';

			var gs = all.circle_s_new('___ghost');
			gs.x=hp.x; gs.y=hp.y; gs.radius=hp.radius; gs.inside='filled'; gs.r=hp.r; gs.g=hp.g; gs.b=hp.b; gs.a=hp.a;
//limitrad needs to be calculated using the prim radius and other things. for now lets just multiply hp.radius by 2 and add 300.
//actually limitrad should already be in husk data
			//gs.limitrad=(hp.radius*2)+300;
			gs.limitrad=hp.limitrad;
			gs.se='grow'; gs.husk_date=stance.husk_date;
			all.anim_a.push(gs);
			//
			//hp.offs=true;
			pupil.se='chill';

		}

		var gs = all.find_ting(all.anim_a,'name','___ghost');

		if(elid1.se=='fade in'){
			elid1.is='rect'; elid1.a=elid1.a+0.08;
			if(elid1.a>=1){
				//offscreen all by default, then we restore what we need.. no.. better to offscreen only what
				//we need to offscreen. we need a way to identify void prims?
				//var al = all.anim_a.length;
				//while(al--){
				//	var s = all.anim_a[al]; 
				//	s.is='c_'+s.s; s.offs=true;//s.u_d.push('offs',true);
				//}
				elid1.se='fade out'; 
				gs.is='circle'; gs.se='idle'; gs.radius=gs.limitrad;
			}
		}
		if(elid1.se=='fade out'){
			elid1.is='rect'; elid1.a=elid1.a-0.07;
			if(elid1.a<=0){
				elid1.se='reset'; elid2.se='reset'; pupil.se='reset'; return 'all set' //end
			}
		}
		if(gs.se=='grow'){gs.is='circle'; gs.radius=gs.radius+3;}
		if(gs.se=='idle'){gs.is='circle';}

	}//husk inwards //ready

//from husk to inner mode>>husk got named or becomes a vessel for a remembered orb. 'orb born'
//stance is the new vessel. 
	if(transition=='orb born'){//husk to orb
		//name should be related to husk structure for consistency
		var gs = all.find_ting(all.anim_a,'name','___ghost');
		if(pupil.se=='reset'){
			var hp = all.find_ting(all.anim_a,'husk_date',stance.husk_date);
 			hp.display='custom'; hp.is='c_circle';
			hp.custom_a=[[255,'r',255,'g',255,'b',0.8,'a']]; hp.t=-1;

			var oes = all.circle_s_new(stance.vessel_date+'___atfield');
//we need to get data to create soul from orb structure, we cant rely on gs to create soul. on control vessel transition we are
//going to need this data and the gs wont exist by then. so let orb structure on fleet have this bits
			oes.x=gs.x; oes.y=gs.y; oes.limitrad = gs.limitrad; //oes.form='vessel';
			oes.radius=1; oes.inside='filled';  oes.se='grow'; 
			oes.vessel_date=stance.vessel_date;
	//custom display 12 tones on field
			oes.custom_a.push(
			//[220,"r",220,"g",220,"b"], //white
			[176,"r",215,"g",235,"b"], //celeste
			[91,"r",157,"g",237,"b"], //azure
			[0,"r",4,"g",233,"b"], //blue
			[97,"r",28,"g",188,"b"], //purple blue
			[138,"r",12,"g",152,"b"], //purple
			//[0,"r",0,"g",0,"b",0.7,"a"], //black
			[255,"r",10,"g",6,"b"], //red
			[255,"r",152,"g",1,"b"], //orange
			[255,"r",221,"g",38,"b"], //yellow
			[163,"r",238,"g",4,"b"], //green
			[127,"r",224,"g",191,"b"] //calypso
			);
			oes.display='custom'; oes.t=-1; oes.is='c_circle';
			//oes.a=1;
			all.anim_a.push(oes);

			//we need to replace husk structure into a vessel structure
			var hi = all.fleet_a.indexOf(stancefrom);
			all.fleet_a.splice(hi,1);

			pupil.se='chill';
		}

		if(gs.se=='idle'){gs.is='circle';}

		var oes = all.find_ting(all.anim_a,'name',stance.vessel_date+'___atfield');
		if(oes.se=='grow'){
			//oes.is='circle'; oes.r=o_r; oes.g=o_g; oes.b=o_b;
			oes.radius=oes.radius+12;
			if(oes.radius>=oes.limitrad){
				//oes.is='circle'; 
				//at field goes invisible again since now vessel is in idle
				oes.radius=oes.limitrad; oes.inside='empty'; //oes.se='atfield oes idle'; oes.form='vessel';
				oes.display='normal'; oes.r=220; oes.g=220; oes.b=220; oes.a=1; oes.is='f';
				//oes.t=-1;
				//pass husk birth data into the orb.. i think its done already?
				stance.husk_date=gs.husk_date;
				gs.is='rm';

				//update husk prim into vessel prim. update name, we also need vessel_date
				var hp = all.find_ting(all.anim_a,'husk_date',stance.husk_date);
				hp.vessel_date = stance.vessel_date;
				hp.name=stance.vessel_date+'___vessel'; hp.form='vessel'; //hp.se='vp oes idle';
				hp.custom_a.push(
				[220,"r",220,"g",220,"b"], //white
				[176,"r",215,"g",235,"b"], //celeste
				[91,"r",157,"g",237,"b"], //azure
				[0,"r",4,"g",233,"b"], //blue
				[97,"r",28,"g",188,"b"], //purple blue
				[138,"r",12,"g",152,"b"], //purple
				//[0,"r",0,"g",0,"b",0.7,"a"], //black
				[255,"r",10,"g",6,"b"], //red
				[255,"r",152,"g",1,"b"], //orange
				[255,"r",221,"g",38,"b"], //yellow
				[163,"r",238,"g",4,"b"], //green
				[127,"r",224,"g",191,"b"] //calypso
				);
				hp.display='custom'; hp.t=-1;
				//hp.r=o_r; hp.g=o_g; hp.b=o_b; hp.a=1; 
				hp.inside='filled';

				//
				//hp.offs=true;

				pupil.se='reset';
				return 'all set'
			}
		}

	}//orb born

//from husk to void>>'husk outwards'
	if(transition=='husk outwards'){//husk to void

		var gs = all.find_ting(all.anim_a, 'name', '___ghost');
		if(pupil.se=='reset'){
			//white command line going up
			elid1.se='going up'; elid1.r=215;elid1.g=217;elid1.b=215;elid1.a=0.9;
			elid1.x=gs.x; elid1.y=gs.y; elid1.w=3; elid1.h=50; elid1.limity=elid1.y-500;
			//we relocate just above ghostship
			ctx0.translate((-U.x),(-U.y));//this should put user on 0
			U.x=0; U.y=0;//update to 0
			//now screen position center but a bit above
			var ghx = -gs.x+(window.innerWidth/2); var ghy = gs.y-(window.innerHeight/2);
			ctx0.translate(ghx,ghy+150); U.x=ghx; U.y=ghy+150;

			all.adjust_stream(U.mainstream); //

			pupil.se='chill';
		}

		if(gs.se=='idle'){gs.is='circle';}

		if(elid1.se=='going up'){
			elid1.is='rect'; elid1.y=elid1.y-69; 
			if(elid1.y<=elid1.limity){
				//var al = all.anim_a.length;
				//while(al--){
				//	var s = all.anim_a[al]; s.offs=false;
				//}

				//needs to translate user to previus position on void
				ctx0.translate(0,-150); U.y=U.y-150;

				all.adjust_stream(U.mainstream); //

				//var hp = all.find_ting(all.anim_a,'husk_date', gs.husk_date);
				//
				//hp.offs=false;

				gs.is='rm'; 

				elid1.se='reset'; elid2.se='reset'; pupil.se='reset'; return 'all set'
			}
		}
	}//husk outwards

//from inner to void>> .signal:exit command casted from inner mode 
//from radiant to void>> .signal:exit command casted from radiant mode
//cant we just run the same animation for now?
	if(transition=='orb outwards'){//orb to void

		if(pupil.se=='reset'){
			var vp = all.find_ting(all.anim_a, 'name', stancefrom.vessel_date+'___vessel');
			//white command line going up
			elid1.se='going up'; elid1.r=215;elid1.g=217;elid1.b=215;elid1.a=0.9;
			elid1.x=vp.x; elid1.y=vp.y; elid1.w=3; elid1.h=50; elid1.limity=elid1.y-500;
			//we relocate just above vessel
			//lets not do this now...
			//ctx0.translate((-U.x),(-U.y));//this should put user on 0
			//U.x=0; U.y=0;//update to 0
			//now screen position center but a bit above
			//var ohx = -oes.x+(window.innerWidth/2); var ohy = oes.y-(window.innerHeight/2);
			//ctx0.translate(ohx,ohy+150); U.x=ohx; U.y=ohy+150;

			pupil.se='chill';
		}

		//dont need this anymore
		//if(oes.se=='atfield oes idle'){oes.is='circle'; oes.r=o_r; oes.g=o_g; oes.b=o_b;}

		if(elid1.se=='going up'){
			elid1.is='rect'; elid1.y=elid1.y-70; 
			if(elid1.y<=elid1.limity){
				//var al = all.anim_a.length;
				//while(al--){
				//	var s = all.anim_a[al]; s.offs=false;
				//}

				//needs to translate user to previus position on void.. disabled for now
				//ctx0.translate(0,-150); U.y=U.y-150;

				//var vp = all.find_ting(all.anim_a,'vessel_date', oes.vessel_date);//vessel prim
				//vp.offs=false;

				//oes.is='rm'; 
				//
/*
				var vp = all.find_ting(all.anim_a, 'name', stancefrom.vessel_date+'___vessel');
				vp.custom_a=[];
				vp.custom_a.push(
				//[220,"r",220,"g",220,"b"], //white
				[176,"r",215,"g",235,"b"], //celeste
				[91,"r",157,"g",237,"b"], //azure
				[0,"r",4,"g",233,"b"], //blue
				[97,"r",28,"g",188,"b"], //purple blue
				[138,"r",12,"g",152,"b"], //purple
				//[0,"r",0,"g",0,"b",0.7,"a"], //black
				[255,"r",10,"g",6,"b"], //red
				[255,"r",152,"g",1,"b"], //orange
				[255,"r",221,"g",38,"b"], //yellow
				[163,"r",238,"g",4,"b"], //green
				[127,"r",224,"g",191,"b"] //calypso
				);
				vp.display='custom'; vp.t=-1; vp.is='c_circle';
*/
				//oes.se='dormant';

				all.shadow_mode(stancefrom);

				elid1.se='reset'; elid2.se='reset'; pupil.se='reset'; return 'all set'
			}
		}
	}//orb outwards


//from void to inner>> user casted a control command from void. 'orb inwards'
//deprecat
//black lid fade in screen. A white command line traveling fast horizontally then vertically downwards. fade out, we see oes and
//all edits running if any...no deprecat
//vessel prim maybe could be surrounded now by white line? hmm
//We want white user command screen rect to fade now, a white circle apear in the middle briefly and start moving up very fast
//for a moment then disapear. if target orb is on radiant mode and only if its on radiant mode, we displace user screen to corresponding
//coordinates depending on radiant script... but for now lets just move to the controled orb location
	if(transition=='orb inwards'){//void to orb
		//var oes = all.find_ting(all.anim_a, 'name', stance.vessel_date+'___atfield');

		if(pupil.se=='reset'){
			//black backgound fading in
			elid1.r=1; elid1.g=1; elid1.b=1; elid1.a=0; elid1.inside='filled';
			//this line places a rect to full screen on user current location 
			elid1.x=-U.x; elid1.y=-U.y;
			elid1.w=window.innerWidth; elid1.h=window.innerHeight;
			elid1.se='fade to black'; elid1.layer=1;

			//a horizontal command line?.. need to be vertical now
			elid2.r=250; elid2.g=250; elid2.b=250; elid2.a=1; elid2.layer=2;
			elid2.x=(-U.x)+window.innerWidth/2; elid2.y=(-U.y)+(window.innerHeight/2)-70;
			elid2.w=1; elid2.h=70; elid2.is='f';
			elid2.limity=elid2.y-400;
			
			//central point command line ready to go up
			pupil.r=250; pupil.g=250; pupil.b=250; pupil.a=0.9; pupil.layer=2; pupil.radius=2; pupil.inside='filled';
			pupil.x=(-U.x)+window.innerWidth/2; pupil.y=(-U.y)+window.innerHeight/2;
			pupil.is='circle'; //pupil.display='normal';
			//elid2.x=-U.x; elid2.y=-U.y+(window.innerHeight/2); elid2.w=window.innerWidth-150; elid2.h=2;
			//elid2.limitx=elid2.w;

			pupil.se='chill';

		}

		if(elid1.se=='fade to black'){
			elid1.is='rect'; elid1.a=elid1.a+0.12;
			pupil.is='circle';
			//vanish point, start moving line
			if(elid1.a>=1){
				pupil.is='f';
				//comman line traveling while background is black
				elid2.se='go up'; //go up
				elid1.se='stay black';
			}
		}

		if(elid2.se=='go up'){ //no more going right now
			elid2.is='rect'; elid2.y=elid2.y-40;//elid2.x=elid2.x+190;
			if(elid2.y<=elid2.limity){
		//we probly should illustrate command line comming from above into the vessel here....
//we actually need to ask for orb mode.
				//locate on target vessel prim to control
				var vp = all.find_ting(all.anim_a,'name', stance.vessel_date+'___vessel'); //get vessel prim of current stance
				ctx0.translate((-U.x),(-U.y));//this should put user on 0
				U.x=0; U.y=0;//update to 0.. no need to update yet?
				//now screen position center on vessel
				var vpx = -vp.x+(window.innerWidth/2); var vpy = vp.y-(window.innerHeight/2);
				ctx0.translate(vpx,vpy);
				U.x=vpx; U.y=vpy;
				//also translate black background
				elid1.x=-U.x; elid1.y=-U.y;

				all.adjust_stream(U.mainstream); //

				//if showcasing: vessel doesnt change much
				all.shadow_mode(stance);

				//if radiant mode... unfinished
				
				elid1.se='black to fade'; elid1.is='rect';
				elid2.se='chill';
				//run edits unnecesary here since they would already be running. taking control doesnt change anything
				//return 'run edits'
			}
		}

		if(elid1.se=='stay black'){elid1.is='rect';}

		if(elid1.se=='black to fade'){
			//var oes = all.find_ting(all.anim_a,'name','___soul');
			//if(oes.se=='atfield oes idle'){oes.is='circle';}

			elid1.is='rect'; elid1.a=elid1.a-0.12;
			if(elid1.a<=0){
				//all.shadow_mode(stance);
				elid1.se='reset'; elid2.se='reset'; pupil.se='reset'; return 'all set'			
			}
		}

	}//orb inwards

//from other orb mode not radiant to inner>> user did exit signal from mode to inner. 'orb edit' .or from inner to any edit mode
	if(transition=='orb edit'){
//we mostly want to shutdown running edits if any on inner mode. wa also want a slight blink of white
//light before clearing all and then we see the editors estream or whatever we should see on that particular editor.
//white screen fade in, push all editor states including central cross, white blinking at field ,then white fade out. simple.

		if(pupil.se=='reset'){
			//white bg fading in
			elid1.r=220; elid1.g=220; elid1.b=220; elid1.a=0; elid1.inside='filled';
			elid1.x=-U.x; elid1.y=-U.y; //place a centered full screen rect
			elid1.w=window.innerWidth; elid1.h=window.innerHeight;
			elid1.se='fade to white';

			pupil.se='chill';
		}
		if(elid1.se=='fade to white'){
			elid1.is='rect'; elid1.a=elid1.a+0.12; 
			if(elid1.a>=1){
		//we could paint all things the editor need here, so the white screen smooths the transition.. 
				elid1.se='white to fade';
			//ask mode what to return. its on stance
				if(stance.inner_mode){
		/*
					//back to normal idle
					var vp = all.find_ting(all.anim_a, 'name', stance.vessel_date+'___vessel');
					vp.custom_a=[];
					vp.custom_a.push(
						[220,"r",220,"g",220,"b"], //white
						[176,"r",215,"g",235,"b"], //celeste
						[91,"r",157,"g",237,"b"], //azure
						[0,"r",4,"g",233,"b"], //blue
						[97,"r",28,"g",188,"b"], //purple blue
						[138,"r",12,"g",152,"b"], //purple
						//[0,"r",0,"g",0,"b",0.7,"a"], //black
						[255,"r",10,"g",6,"b"], //red
						[255,"r",152,"g",1,"b"], //orange
						[255,"r",221,"g",38,"b"], //yellow
						[163,"r",238,"g",4,"b"], //green
						[127,"r",224,"g",191,"b"] //calypso
					);
					vp.display='custom'; vp.t=-1; vp.inside='filled'; vp.is='c_circle';
		*/
					all.shadow_mode(stance);

					var oes = all.find_ting(all.anim_a, 'name', stance.vessel_date+'___atfield');
					oes.is='f';

					//return 'run edits' //deprecat?
				}else{
					var oes = all.find_ting(all.anim_a, 'name', stance.vessel_date+'___atfield');
					//oes.se='atfield white idle'; //white idle?
					oes.custom_a=[]; 
					oes.custom_a.push(
						0,0,0,0,0,0,0,[0.1,"a"],0,0,0,0,0,0,0,0,0,[0.6,"a",220,'r',220,'g',220,'b'] //white blinking
					);
					oes.display='custom'; oes.t=-1; oes.is='c_circle'; oes.inside='empty';

					var vp = all.find_ting(all.anim_a, 'name', stance.vessel_date+'___vessel');
					//vp.se='vp white idle'; //white idle?
					vp.custom_a=[];
					vp.custom_a.push(
						0,0,0,0,0,0,0,[0.1,"a"],0,0,0,0,0,0,0,0,0,[0.6,"a",220,'r',220,'g',220,'b'] //white blinking
					);
					vp.display='custom'; vp.t=-1; vp.is='c_circle'; vp.inside='empty';

					return 'set interface'

				}

			}
		}
		if(elid1.se=='white to fade'){
			elid1.is='rect'; elid1.a=elid1.a-0.12; 
			if(elid1.a<=0){
				elid1.se='reset'; elid2.se='reset'; pupil.se='reset'; return 'all set'
			}
		}
		
	}//orb edit


//not ready...
	if(transition=='orb death'){

	}//orb death

	if(transition=='orb perform'){
		//affects prim
	}//orb perform

	if(transition=='orb reform'){
		//affects prim
		//
	}//orb reform

	//all.adjust_stream(U.mainstream); //

}//transition

/* //LID animations for refference
//ask for lid
				var lid = all.find_ting(all.anim_a, 'name', '__lid');
				if(lid){
					if(lid.se == 'open'){
						if(lid.y<=0){
							lid.h = (lid.h+12);
							lid.se='fadeout'; //lid.is='rm';//lid.t=2;
							obg.se=undefined; obg.is='rm';
							//o.init=false;
							all.clear_rect(ctx0,0,0,window.innerWidth, window.innerHeight);
							all.clear_rect(ctx3,0,0,window.innerWidth, window.innerHeight);
							return
						}
						lid.h = (lid.h+12); lid.y = (lid.y-6);
						lid.is='rect'; lid.t=3;
					}
					if(lid.se == 'close'){
						if(lid.h<=0){
							lid.se=undefined; lid.is='rm';
							obg.se='idle_fadeout'; //obg.is='rm';
							o.init=false;
							all.clear_rect(ctx0,0,0,window.innerWidth, window.innerHeight);
							all.clear_rect(ctx3,0,0,window.innerWidth, window.innerHeight);
							return
						}
						lid.h = (lid.h-12); lid.y = (lid.y+6);
						lid.is='rect'; lid.t=3;
					}
					if(lid.se == 'fadeout'){
						if(lid.a<=0){
							lid.is='rm'; //lid.se = undefined;
							o.init=false;//deprecat
							return
						}
						lid.a=lid.a-0.2; lid.is='rect';
						all.clear_rect(ctx3,0,0,window.innerWidth, window.innerHeight);
					}

				}//lid
*/
//more lid animations refference
//ask for lid
//... do i need to ask for ALL these se?
//we want these lid thingy on perform reform command animations. A lid to simulate an eye openning and closing. We need rects for this one.
//lets just keep here for now

/*
				//??
				var lid = all.find_ting(all.anim_a, 'name', '__lid');
				if(lid){
					if(lid.se == 'open'){
						if(lid.y<=0){
							//lid.se='fadeout'; 
							lid.is='rm';//lid.t=2;
							//obg.se=undefined; 
							obg.is='rm';
							o.init=false;
							all.clear_rect(ctx0,0,0,window.innerWidth, window.innerHeight);
							all.clear_rect(ctx3,0,0,window.innerWidth, window.innerHeight);
							return
						}
						lid.h = (lid.h+12); lid.y = (lid.y-6);
						lid.is='rect'; lid.t=3;
					}
					if(lid.se == 'close'){
						if(lid.h<=0){
							lid.se='fadeout'; //lid.is='rm';
							obg.se='idle_fadeout'; //obg.is='rm';
							//o.init=false;
							all.clear_rect(ctx0,0,0,window.innerWidth, window.innerHeight);
							all.clear_rect(ctx3,0,0,window.innerWidth, window.innerHeight);
							return
						}
						all.clear_rect(ctx3,0,0,window.innerWidth, window.innerHeight);
						lid.h = (lid.h-12); lid.y = (lid.y+6);
						lid.is='rect'; lid.t=3;
					}
					if(lid.se == 'fadeout'){
						if(lid.a<=0){
							lid.is='rm'; lid.se = undefined;
							u.init=false;
							//o.init=false; 
							return
						}
						lid.a=lid.a-0.2; lid.is='rect';
						all.clear_rect(ctx3,0,0,window.innerWidth, window.innerHeight);
					}

				}//lid


*/


//RUN SHADOW MODE
//this needs to be run everytime after we run any animation to showcase so user need to be on inner mode
//check if animations running... we run this also when we go outwards so we need to check for stance. if on void then
//dont push white 
//change vessel and field into shadow if running. If not running then change into inner idling because we cant run these animation
//from any other stance than inner mode
all.shadow_mode = function(o){
	var l = all.anim_a.length; var extr_name = o.name.length+3;
	while(l--){
		var s = all.anim_a[l];
		var name = s.name.substr(-extr_name);
		if(name == o.name+'__r'){var shadow_on = true; break}
	}

	if(shadow_on){
		var oes = all.find_ting(all.anim_a, 'name', o.vessel_date+'___atfield');
		oes.se='atfield shadow idle'; 
		oes.custom_a=[]; 
		oes.custom_a.push(
			0,0,0,0,[0.1,"a"],0,0,[0.2,"a",220,'r',220,'g',220,'b'] 
		);
		oes.display='custom'; oes.t=-1; oes.is='c_circle'; oes.inside='empty';


		var vp = all.find_ting(all.anim_a, 'name', o.vessel_date+'___vessel');
		vp.se='vp shadow idle'; //white idle?
		vp.custom_a=[];
		vp.custom_a.push(
			0,0,0,0,[0.1,"a"],0,0,[0.2,"a",220,'r',220,'g',220,'b'] 
		);
		vp.display='custom'; vp.t=-1; vp.is='c_circle'; vp.inside='empty';

		return
	}else{
		//back to idle
		//if stance is undefined, dont push white
		var vp = all.find_ting(all.anim_a, 'name', o.vessel_date+'___vessel');
		vp.custom_a=[];
		if(stance==undefined){}else{vp.custom_a.push([255,"r",255,"g",255,"b"]);}
		vp.custom_a.push(
			//[255,"r",255,"g",255,"b"], //white
			[176,"r",215,"g",235,"b"], //celeste
			[91,"r",157,"g",237,"b"], //azure
			[0,"r",4,"g",233,"b"], //blue
			[97,"r",28,"g",188,"b"], //purple blue
			[138,"r",12,"g",152,"b",0.7,'a'], //purple
			//[0,"r",0,"g",0,"b",0.7,"a"], //black
			[255,"r",10,"g",6,"b"], //red
			[255,"r",152,"g",1,"b"], //orange
			[255,"r",221,"g",38,"b"], //yellow
			[163,"r",238,"g",4,"b"], //green
			[127,"r",224,"g",191,"b"] //calypso
		);
		vp.display='custom'; vp.t=-1; vp.inside='filled'; vp.is='c_circle';

	//field off
		var oes = all.find_ting(all.anim_a, 'name', o.vessel_date+'___atfield');
		oes.is='f';
/*
		oes.custom_a=[];
		oes.custom_a.push(
			[220,"r",220,"g",220,"b"], //white
			[176,"r",215,"g",235,"b"], //celeste
			[91,"r",157,"g",237,"b"], //azure
			[0,"r",4,"g",233,"b"], //blue
			[97,"r",28,"g",188,"b"], //purple blue
			[138,"r",12,"g",152,"b"], //purple
			[0,"r",0,"g",0,"b",0.7,"a"], //black
			[255,"r",10,"g",6,"b"], //red
			[255,"r",152,"g",1,"b"], //orange
			[255,"r",221,"g",38,"b"], //yellow
			[163,"r",238,"g",4,"b"], //green
			[127,"r",224,"g",191,"b"] //calypso
		);

*/
		//oes.display='custom'; oes.t=-1; oes.inside='empty'; oes.is='c_circle';

		return
	}
}//shadow mode

//

//calculates a visual anim total initial end time 
//!!!!!! last empty object on anim messes up length... wait not anymkre
all.getetv = function(a){
	var l = a.length; var i = 0; var et = 0;
	while(l--){
		et = et+a[i].ft;
	i++;
	}
	return et
}
//returns corresponding time and frame given a run time number.tested.
all.getcfv = function(a,rt){//takes edit and a desired time
	var l = a.length; var i = 0; var ct = 0;
	while(l--){
		var mf = a[i].ft; ct = ct+mf; 
//we need ft. ft runs backwards so we need to find how much to subtract from ft acording to the difference between ct and rt
		if(ct>=rt){
			//var sub = ct-mf;
			var diff = ct-mf; var ft = mf-diff;
			//var ft = rt-sub;
			return [ft,i] //0 is the frame time, 1 is the frame we are looking for
		}
	i++;
	}
}



// returns an img object using parameter img src
//Users should be able to use this function while inside an Orb to ready an image for it
//the value returned by this function needs to go into the orb.img_access property
//I now need this function to use an input file element so phone users can select a file and load it into the orb
//all.img_adder = function(img_src){var img = new Image(); img.src = img_src; return img;}

//a function to spawn a number between min and max.. might be simpler
all.get_r_num = function(min, max){return Math.floor(Math.random() * (max - min + 1) ) + min;}

//return distance between two points on screen using x y values
all.get_dist = function(x1,x2,y1,y2){
	var vx = x1 - x2;
	var vy = y1 - y2;
	return Math.sqrt(vx*vx+vy*vy);
}

//a function to manage stream param values... can actually accept any object box
//This function is kinda useless
all.n_param_com = function(p,v,box){ //parameter, value, box
	if(v!=undefined){
		box[p] = v;
	//}else{
	//	all.stream_a.push(box[p]); all.screen_log();
	}
}

//a function to process signal value. returns an object with signal string, 
//operation and numerical value if any
all.signify = function(sv){
	var r = {};
	var sv_a = sv.split('_');
	r.signal = sv_a[0];
	if(sv_a[1]!=undefined){
		if(sv_a[1][0]=='+'){
			r.operation = '+';
			var v_a = sv_a[1].split('+'); var number = parseFloat(v_a[1]);
			r.value = number;
			return r
		}
		if(sv_a[1][0]=='-'){
			r.operation = '-';
			var v_a = sv_a[1].split('-'); var number = parseFloat(v_a[1]);
			r.value = number;
			return r
		}
	/*
//don rememebr what i was doing here exactly, but i was trying to create a synthx to express random values inside scripts
		if(sv_a[1][0]=='?'){
			r.operation = '?';//random value
			var v_a = sv_a[1].split('?');
			var range = v_a[1].split('-');
			
			var num1 = parseFloat(range[0]);
			r.min = num1;
			var num2 = parseFloat(range[1]);
			r.max = num2;
			
			r.value=undefined;
			return r
		}
	*/

		var number = parseFloat(sv_a[1]); 
		r.value = number;
	}
	return r
}

//
//a timer
//use Date.now and any other refference
//Just create an instance to loop this function when a timer is necesary. It should run on each logic loop
//all.timer = function(){
//	var now = Date.now();
//	var timer = now-all.timer_base;
//	console.log(timer);
//}

//better yet. a function to find and return object in a specific array using specific parameter and parameter value
//a is an array, p is a parameter , and v is the value of the parameter
all.find_ting = function(a,p,v){var i = 0; var len = a.length; while(len--){if(a[i][p]=== v ){return a[i]}; i++;}}

//am only using all find ting
//find and return a thing directly stored on an array
//all.find_ting2 = function(a,v){var i = 0; var len = a.length; while(len--){if(a[i]=== v ){return a[i]}; i++;}}
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

//a function to allow user use pad digits to return a number to be allocated whenever neccesary
//instead of using a state, this function should just return a value
//this function listen to keys so it needs to be run on an instance
all.num_in = function(endkey){
	if(all.s_s_t_r[0]=="0"||all.s_s_t_r[0]==1||all.s_s_t_r[0]==2||all.s_s_t_r[0]==3||all.s_s_t_r[0]==4||all.s_s_t_r[0]==5||
	all.s_s_t_r[0]==6||all.s_s_t_r[0]==7||all.s_s_t_r[0]==8||all.s_s_t_r[0]==9){
		all.sstr_l = ' '; 
		if(all.s_s_t_r[all.s_s_t_r.length-1]==endkey){//
			all.sstr_t = 20;
			//strip number from endkey and join
			all.s_s_t_r.pop();
			var number_str = all.s_s_t_r.join('');
			var number = parseFloat(number_str);//parseInt() , Number()
			return number
		}
	}
}//num_in

//deprecated?
//an operation to manage name when already exists. return  true if name is succesfully added
//returns false if name is already being used
//local stream, img, audio, osc, txt, rect, circ, orb
all.c_unl = function(nname, ntag){
	var l = unl.length;
	while(l--){
		var ui = unl[l];
		if(nname==ui.name){
			if(ntag==ui.tag){
				return false
			}//tag match
		}//name match
	}
	unl.push({name:nname, tag:ntag});
	return true
}


//deprecat
//a function to update states
//just push param value to change in zequence and shift
//all u state checks s.u_d array to update data changes
//takes a state as param, u_d needs to be filled with pushed pairs of param value
//(param, newvalue, otherparam, newvalue...) as many as desired.
//we can synch clears properly using this function
//.... no need to do that anymore
all.u_state = function(s){
	//var l = s.u_d.length;
	var l = true;
	while(l){ 
		var p = s.u_d.shift(); var v = s.u_d.shift(); s[p] = v;
		if(s.u_d.length<=0){break}
	}
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

//DRAWALL
//draw states from anim cues and then clear them. i know its 3 loops in here but the amount of items per array is distributed
//and this secures the order in which states will be drawn.
all.anim_drawall = function(){
	//layer 0
	var l = all.anim_q0.length;
	while(l--){var s = all.anim_q0[l]; all.anim_draw(s);} all.anim_q0=[];
	//layer 1
	var l = all.anim_q1.length;
	while(l--){var s = all.anim_q1[l]; all.anim_draw(s);} all.anim_q1=[];
	//layer 2
	var l = all.anim_q2.length;
	while(l--){var s = all.anim_q2[l]; all.anim_draw(s);} all.anim_q2=[];

} 

//just push to different draw cues. this is far much more manageable and efficient.
//each state holds an instruction to indicate layer. after animf checks, we ask layer and place on corresponding draw cue array. simple
//no need to rearrange items on array, no need to run loops against the same array more than once

all.anim_func = function(){
	var l = all.anim_a.length;
	while(l--){
		var s = all.anim_a[l]; //s for state

/*
//DEATH... for vessels
//prims die out diferently acording to their last intensity and form.
			if(s.se=='burn'){
//the flames of death strips off two intensity frames per heartbeat and pushes one frame of darkness to depict its prescence and
//put up the final act.
				//s is burning
				s.is='c_'+s.s;
				s.custom_a.pop();
				if(s.custom_a==0){//time to become dust
					//s.se='into dust';
					//s becomes a husk using its last form. Will take one more radial to blow away the ashes.
					//s.form='husk';
					//erase the vessel from fleet if any
					//but for now just remove
					s.is='rm'; s.display=false;
				}
				s.custom_a.pop();
				s.custom_a.push(1,'a',20,'r',20,'g',20,'b'); s.t=-1;//let it be grey for now

			}

//death should be an 'is' value to be checked directly on animf. because everything can die. and death takes time.
			if(s.is=='death'){ //his ignites the process of dying
		//but first we need a one time white flash beat to signify intense fast transformation beggining, then we strip on burn.
		//death can take many forms. but its just death in the end. burn comes on the next heartbeat
				s.se='burn';
				s.custom_a.push(1,'a',255,'r',255,'g',255,'b'); //let there be Light in Darkness
				s.display='custom';
				s.is='c_'+s.s;
			}
*/


//c_circle CIRCLE
//All mayor elements are circles. vessels , husks and waves and there are always a few around so we might as well just ask first
//new system . i could even go further and just check if it really is more efficient to just clear all screen on a specific context
//once instead of making all these little clears for each state... //done. we have layers now and just one single ctx
		if(s.is=="c_circle"){
//these 3 prim checks in here should only update animation. maybe at the end of each update we could just create a refference of itself
//to the logic commanding it so the next beat , logic phase elements dont need to run a loop just to find their states.
//the things is, we want logic phase to run first, then the animations updates, and then draw cue..
//so if we just push circles carrying logic states and shift all other normal states we will always end up checking vessels and
//husks first.. in this way, we need to loop trough elements just once. furthermore, we could simply merge orb obj and vessel obj into
//one so we dont have to vessel.orb to access it.. would this improve performance? not bad until i learned unshift() is slow as hell
//Messing with arrays items being rearanged is totally discarded

//FORMS UPDATE
//we check for and semi automated logic forms. vessels independant logic structure, husk and waves
//these use subevents (se) to manage animations flow.
//VESSEL
			if(s.form=='vessel'){all.vessel_up(s,l);}
//HUSK	
			if(s.form=='husk'){all.husk_up(s,l);}
//WAVE
			if(s.form=='wave'){all.wave_up(s,l);}


//custom_a system for circles!
//the custom_a items are simple strings with instructions. there are as many items as beats the txt animation has. instructions on each item
//change all the states properties. these changes apply for each succesive beat until s.t reaches 0
//so delta could be;  [20,'r',0.4,'a'] , alpha is set to 0.4, r is set to 20 and so on
//we still need more control to be available from this array.
//1 we can already replace an empty array with a 0 value this is probly good for performance. But it doesnt look good to have
//so many elements in the array..hmm
//2 We need to be able to control the animation flow and also their duration by calling se just once. custom_a really allows
//us to just push any change we want straight into the frames so we might as well take advantage of this. we can push se and
//duration as well. so states dont need to be so heavily managed from forms updates
//If we could have custom system do thte same job as nfreq frames that would be ideal. . img edits whould be just a bit different
//would require ANOTHER update oh my god  but i think this is the way
			if(s.display=='custom'){
				if(s.t<0){
//so to consolidate animations, we can use a special value to act as a simple counter instead of being an empty array. so when the loop
//encounters it , it keeps counting but makes no changes to the state.. a surprise.. you can already just use a 0 value and the
//loop will ignore it and just keep counting. nice. I hope this is an improvement since we are procesing a 0 digit instead of an aray
					var clr = s.custom_a.length-1;
					s.t=clr;//s.custom_a.length-1;
				}
				var delta = s.custom_a[s.t];
				var lc = delta.length;
				//if(lc){
				while(lc--){
					var p = delta[lc]; var v = delta[lc-1];
			//i was trying to only pass on changes here...
					//if(s.t==clr){s[p]=v;}else{s[p] = s[p]+v;}
					s[p] = v;
				
				lc--;}//we decrease again because its a parameter value pair in the array
				s.t--;
				s.is='circle';
			}//custom system

//this system is clearer , more versatile and less poluted
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
				if(s.layer==0){all.anim_q0.push(s);}
				if(s.layer==1){all.anim_q1.push(s);}
				if(s.layer==2){all.anim_q2.push(s);}
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

//osc states should be way more simpler, they only need to hold an object containing
//osc_n and gain_n and timers to run audio anims osc states should not use loop
//related timers , they should use timestamps from audio context to synch properly
//with everything else
//i need an optional parameter to set for how long will the state be playing sound
//and end with fade ..i shouldn t rely on loop time tho
//I realized having audio on here doesnt make sense. The loop system is complicated
//enough. but maybe its useful to coordinate updates loop with timestamps
//OSC
		if(s.is=="osc"){
			if(s.end=="fade"){
				//s.gain_n.gain.linearRampToValueAtTime(0,all.au.currentTime+s.fade);
				//s.gain_n.gain.exponentialRampToValueAtTime(0.01,all.au.currentTime+s.fade);
				s.gain_n.gain.setTargetAtTime(0, all.au.currentTime + 0.1, s.fade);
				s.end="check";
			}
			if(s.end=="check"){
				if(s.gain_n.gain.value<=0.00){
					s.osc_n.stop(); s.osc_n.disconnect(); s.is="rm";
				}
			}
		}

//updates for image data state. imda stands for image data
//would be awesome to have the possibility to capture image screen at any
//moment and work on it as is using pixels
//so far,the state is the img data buffer itself.. maybe this is not rly
//convenient.it needs to be wraped in a state i think. needs rework
//.. i can imagine this being a very powerful tool to create very interesting effects. . . we l come back here later for sure.
/*
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
//only line1 should be able to have print value here. print takes properties from this state and uses them to create the rest
//of the ext anim lines. kinda like print does on edit mode but now we use this state as anim[0] line 1. this state has the anim
//property to retrieve all lines txt values. print actually searches the rest of the line states if they are already on animf and
//quickly clears and banishes them and then it prints the whole text again.
//we use print on act scripts because is easier to keep track of line1 to apply any desired changes to the rest of the animation lines.
//and i think we can treat ft and rt on txt states just the same as others..? noup, ft counts up, t counts down..
//but maybe we dont really need to manipulate time and duration on texts from act scripts.. i rly dont think its escential
			if(s.display=='remove'){s.is='rm';}
			//print here is used by act scripts
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
/*
.signal:custom_number	Asigns a number of beats to the txt anim custom_a property. Last item holds current properties, all other items
			are initially empty.
.signal:beat_number	Selects a beat item on custom_a by number. Now we add changes to that beat. we use op6 to track current beat. 
			So all changes in properties will now use op6 to push changes into custom_a correct item.
*/
				var lc = delta.length;
				while(lc--){
					var p = delta[lc]; var v = delta[lc-1];
					//if(s.t==clr){s[p]=v;}else{s[p] = s[p]+v;}
					s[p] = v;
				//we decrease again because its a parameter value pair in the array
				lc--;}
				s.t--;
				s.is='txt';
			}//custom system

		}//c_txt
		
//if s is "txt" means is text state not printed. so it will print
		if(s.is=="txt"){
			if(s.offs){s.is='c_txt';}else{
				if(s.layer==0){all.anim_q0.push(s);}
				if(s.layer==1){all.anim_q1.push(s);}
				if(s.layer==2){all.anim_q2.push(s);}
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
				all.u_state(s);
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
				if(s.layer==0){all.anim_q0.push(s);}
				if(s.layer==1){all.anim_q1.push(s);}
				if(s.layer==2){all.anim_q2.push(s);}
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
				all.u_state(s);
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
				if(s.layer==0){all.anim_q0.push(s);}
				if(s.layer==1){all.anim_q1.push(s);}
				if(s.layer==2){all.anim_q2.push(s);}
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

//ANIM DRAW
all.anim_draw = function(s){
	var c = ctx0;
	if(s.is=='img'){
		//var c = s.ctx;
		c.save();
		c.translate(s.tx, s.ty);
		//rotate.. flip... goes here. state params should control these
		c.globalAlpha = s.a;
		
		c.drawImage(
			s.img_access, 
			s.x, s.y, s.w, s.h, 
			s.px, s.py, s.pw, s.ph
		);
		//c.drawImage(this,cropsX,cropsY,cropW,cropH,drawX,drawY,drawW,drawH);
		c.restore();
		s.is = "c_img";//sends to animation check by default
		//continue
		return
	}
	
	if(s.is=='rect'){
		//var c = s.ctx;
		c.save();
		c.translate(s.tx, s.ty);
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
		s.is = "c_rect";
		//continue
		return
	}
	
	if(s.is=='circle'){
		//var c = s.ctx;
		c.save();
		c.translate(s.tx, s.ty);
		c.beginPath();
		if(s.inside=="empty"){
			c.strokeStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
			c.arc(s.x,s.y,s.radius,0,Math.PI*2,true);
			c.stroke();
		}
		if(s.inside=="filled"){
			c.fillStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
			c.arc(s.x,s.y,s.radius,0,Math.PI*2,true);
			c.fill();
		}
		c.restore();
		s.is = "c_circle";
		//continue
		return
	}
	
	if(s.is=='txt'){
		//var c = s.ctx;
		c.save();
		c.fillStyle =`rgba(${s.r},${s.g},${s.b},${s.a})`;
		c.font = s.font;
		c.textAlign=s.align;
		var c_x = (s.x+s.tx); 
		var c_y = (s.y+s.ty); //not sure if ux and uy needs to be here....
		c.fillText(s.txt,c_x,c_y);
		c.restore();
		s.is = "c_txt";
		//continue
		return
	}
	//}//anim cue loop
}//anim draw


//ACTUATOR
//a function to compile all exposed acts so logic can listen to a single array . all.act_d
//this function should take an /act/txt anim and transform it into an act object to be
//looped by c_act_d
//we feed an act and an orb into this function on the .play command

//if user want to edit an act from editor mode, it must first stop running.
//we shouldnt be able to edit acts while running.
//You cant change the rules of the game while playing it.
//dont let users edit acts while running... or at least dont let such changes
//affect a running act object that stem from it....wait... why not?
//it might be interesting to run links while being edited...ah.. but too messy

//when acts stop running, they should clear their exposed data from act_d(ata) as well
//Expose will now hold the act object. As simple as that.
//maybe i can directly refer orb here? am just a bit concerned about eficiency

//extract elements from the line and use contents to create an accesible object
//so to annalize this line, we could simply run a loop asking for every item on the
//text. starting from txt[5] , which will always be "(" . so.. if [6] is not ")" ,
//then push into an array. then ask [7], [8], and so on.. until we find ")".
//At this point we join all
//items to create the user input param. Repeat process with param 2.

all.actuator = function(txt, orb){
 	var now_time = Date.now();
	var act_obj = {
		name: txt[0].name, orb: orb.name, time: now_time, spot: 'on_stage',
		is:undefined
	}
		//links: [], logics:[], listeners: [], statements: [],
	
//Check act/txt every line loop
	var i = 0; var l1 = txt.length; //var expose = [];
	while(l1--){
		var line = txt[i]; //line

//RESOURCE
//  /resource
//update:
//resource wont need key now, all other operations stay the same
		var le_res = line.txt.substr(0,9);
		if(le_res=="/resource"){ //... txt first 9 item should say "/resource"
			act_obj.is = 'resource';
			act_obj.links=[]; act_obj.logics=[];
		}//check resource line
		
//act is resource
		if(act_obj.is=='resource'){
			//ask for res allocate commands, links and logic containers
//LOGIC
//  /logic(string)(number)(logic key)
			var le_logic = line.txt.substr(0,6);
			if(le_logic=="/logic"){//... txt first 6 item should say "/logic"
				var i2 = 7; var l2 = line.txt.length-7; //start from [7] item
				var logic = []; var param_a = [];
				while(l2--){
					var sym = line.txt[i2]; // symbol
					if(sym=='('){var no_push = true;}
					if(sym==')'){
						var param = param_a.join(''); param_a = []; logic.push(param);
						param = undefined;
						var no_push = true;
					}
					if(no_push){var no_push = undefined;}else{param_a.push(sym);}
				i2++;}
//logic[0] is a string value, logic[1] is a number value, logic[2] is the logic key, 
				//transform value into number
				var lo_num = parseFloat(logic[1]);
				logic.splice(1,1,lo_num);
				act_obj.logics.push(logic);
			}//check logic line
			
//LINK
//	/link//type(edit name)(link key)

			var le_link = line.txt.substr(0,5); //same as deal...
			if(le_link=="/link"){
				var type = line.txt.substr(7,4); //7?
				if(type=='img('){var req = 'img'; var i2 = 10; var s_t='0';}
				if(type=='circ'){var req = 'circle'; var i2 = 13; var s_t='0';}
				if(type=='rect'){var req = 'rect'; var i2 = 11; var s_t='0';}
				if(type=='audi'){var req = 'audio'; var i2 = 12; var s_t='obj'}
				if(type=='txt('){var req = 'txt'; var i2 = 10; var s_t='0';}
				if(type=='reco'){var req = 'records'; var i2 = 14;}//unfinished..
				var l2 = line.txt.length-i2; //start from i2
				var link = []; var param_a = [];
				while(l2--){
					var sym = line.txt[i2]; // symbol
					if(sym=='('){var no_push = true;}
					if(sym==')'){
						var param = param_a.join(''); param_a = []; link.push(param); param = undefined;
						var no_push = true;
					}
					if(no_push){var no_push = undefined;}else{param_a.push(sym);}
				i2++;}
				
				if(s_t=='0'){
					//var edit = all.find_ting(orb[req][0], "name", link[0]);}//iswrong
					var reql = orb[req].length;
					while(reql--){
						var edit = orb[req][reql];
						if(edit[0].name==link[0]){
							break
						}
					}
				}
				if(s_t=='obj'){var edit = all.find_ting(orb[req], "name", link[0]);}
				s_t=undefined;
				if(edit){link.push(edit);}else{link.push('NO EDIT')}
				//link.shift(); //maybe i can get rid here of edit nameornot
//req should be useful to identify the edit nature on act_d
				link.push(req);
				if(req=='img'){link.push(orb.img_access);}
				if(req=='audio'){link.push(orb.audio_access);}
				req = undefined;
				act_obj.links.push(link);
//so far its link[0] edit name, link[1] is link key , link[2] reference to edit ,
//link[3] holds edit nature and link[4] will hold buffer now if any
			}//check link line

//an instruction to link resource owner orb stream into the resource itself.
//STREAM
//	/stream
			var le_stream = line.txt.substr(0,7);
			if(le_stream=="/stream"){//... txt first 7 item should say "/stream"
				act_obj.stream=orb.stream;
			}

		}//resource

//ACTOR
// /listen
//update: we will use /listen now to create an actor phase 1. a counter will start
//adding 1 for each statement after the /listen line until we reach the /acf line.
//runa() will loop trough all resources and run as many states as /listen counter.
//after all resources have been tested using these statements, we run statements
//after the /act line just once.
		var le_listen = line.txt.substr(0,7);
		if(le_listen=="/listen"){ //txt first 7 item should say "/listen"
			act_obj.is = 'listen';
			//act_obj.test_count=0;
			//maybe phase 1 and phase 2...
			act_obj.phase1_stmts=[];
			i++;
			continue
		}
		
//act is actor
		//phase1
		if(act_obj.is=='listen'){
			//check for /act line to move to phase2
			var le_act = line.txt.substr(0,4);
			if(le_act=="/act"){ //txt first 4 item should say "/act"
				act_obj.is = 'act';
				//act_obj.test_count=0;
				act_obj.phase2_stmts=[];
				i++;
				continue
			}
			
//ask for listener statements
//PHASE1 STATEMENTS
//[R]//logic(lkey)(ltag1)
//[ltag1]{keep1}
//[ltag1]//str=#a string am looking for{keep1}
//[ltag1]//num=#a number am looking for{keep1}
//{keep1}[R]//cast(new tag1)
//[R]//name=#a name am looking for{keep2}
			var i2 = 0; var l2 = line.txt.length; 
			var statement = []; var input_a = [];
			while(l2--){
				var sym = line.txt[i2]; // symbol
				
				if(sym=='/'){
					//var no_push = true;
					var push_com = true;
//.. also math operators come after a command... actually.. only operators
//and "(" can really go after a subcommand.. hmmm.. 
//and actually , operators can only go after a subcommand... that really simplifies
//things. also subcommands always go after brackets so.. when '/' , push syms into a
//command container until end of loop , an operator, or a '('.
				}
	
				if(sym=='['){var no_push = true; var brackets = true;}
				if(sym==']'){
					var tag = input_a.join(''); input_a = [];
					statement.push("tag",tag); tag = undefined;
					var no_push = true; brackets = undefined;
				}
	
				if(sym=='('){var no_push = true; var parenthesis = true;}
				if(sym==')'){
					//now we have an parameter for the command on input_a
					var param = input_a.join(''); input_a = [];
					statement.push("param",param); param = undefined;
					var no_push = true; parenthesis = undefined;
				}

				//just push as is and call it a day
				if(sym=='='){
				//var sym = line.txt[i2]; // symbol
					var no_push=true; var operator=true;
				}

				if(sym=='{'){var no_push = true; var lock = true;}
				if(sym=='}'){
					var condition = input_a.join(''); input_a = [];
					statement.push("condition",condition); condition = undefined;
					var no_push = true; lock = undefined;
				}

				if(sym=='#'){
					var push_literal = true;
				}

				if(push_literal){
					if(lock){
						//push lit
						var lit = input_a.join(''); input_a = [];
						statement.push("literal",lit); lit = undefined;
						var push_literal = undefined;
						var lock = undefined;
					}else{
						if(sym!='#'){input_a.push(sym); }
					}
					var no_push = true;
				}

				if(push_com){
					if(operator||parenthesis||lock||brackets||l2==0){//!! this works for /end
						//push com
						var com = input_a.join(''); input_a = [];
						statement.push("com",com); com = undefined;
						if(operator){statement.push("operator",sym);}
						var push_com = undefined; var operator = undefined;
						var parenthesis = undefined; var lock = undefined;
						var brackets = undefined; var statemend = undefined;
					}else{
						if(sym!='/'){
							input_a.push(sym); 
							//if(l2==0)...
						}
					}
					var no_push = true;
				}				
				if(no_push){var no_push = undefined;}else{input_a.push(sym);}
	
			i2++;}
				
			act_obj.phase1_stmts.push(statement);

		}//listen

// /act
//update: we will use /listen now to create an act array to hold phase1_stmts.
//after the /listen line until we reach the /act line.
//playl() will loop trough all resources and run phase1 statements
//after all resources have been tested using these statements,
//playa() will run phase2 statements after the /act line just once.
		if(act_obj.is=='act'){

//PHASE2 STATEMENTS
//[access tag]//subcommand ..
//[resource tag]//logic(logic key)(logic access tag)
//[access tag1]//subcommand=[access tag2]//command{condition evaluated} ..
//{condition}[access tag]//subcommand ..
//update: we are adding literals to statements now..?.. we probly dont really need literals on phase 2 but lets just keep
//them here for now..
//#literal string>>[tag]//subcommand
//[tag]//subcommand+#literal number
//[tag]//subcommand=#literal string{condition}
			// [ or { makes no difference in here
			var i2 = 0; var l2 = line.txt.length; 
			var statement = []; var input_a = [];
			while(l2--){
				var sym = line.txt[i2]; // symbol
	
				if(sym=='/'){
					//var no_push = true;
					var push_com = true;
//.. also math operators come after a command... actually.. only operators
//and "(" can really go after a subcommand.. hmmm.. 
//and actually , operators can only go after a subcommand... that really simplifies
//things. also subcommands always go after brackets so.. when '/' , push syms into a
//command container until end of loop , an operator, or a '('.
				}
	
				if(sym=='['){var no_push = true; var brackets = true;}
				if(sym==']'){
					var tag = input_a.join(''); input_a = [];
					statement.push("tag",tag); tag = undefined;
					var no_push = true; brackets = undefined;
				}
	
				if(sym=='('){var no_push = true; var parenthesis = true;}
				if(sym==')'){
					//now we have an parameter for the command on input_a
					var param = input_a.join(''); input_a = [];
					statement.push("param",param); param = undefined;
					var no_push = true; parenthesis = undefined;
				}
	
				//just push as is and call it a day
				if(sym=='='||sym=='+'||sym=='-'||sym=='<'||sym=='>'){
			//var sym = line.txt[i2]; // symbol
					if(line.txt[i2+1]=='>'){
						i2++; var no_push=true; var asigner=true;
					}else{
						var no_push=true; var operator=true;
					}
				}
	
				if(sym=='{'){var no_push = true; var lock = true;}
				if(sym=='}'){
					var condition = input_a.join(''); input_a = [];
					statement.push("condition",condition); condition = undefined;
					var no_push = true; lock = undefined;
				}

				if(sym=='#'){
					var push_literal = true;
				}

				if(push_com==true||push_literal==true){
					//when no op after second com
					if(i2==line.txt.length-1){input_a.push(sym); var statemend = true;}
	
					if(operator||parenthesis||lock||brackets||statemend||asigner){
						//push com
						var joined = input_a.join(''); input_a = [];
						if(push_literal){statement.push("literal",joined);}
						if(push_com){statement.push("com",joined);}
						if(operator){statement.push("operator",sym);}
						if(asigner){statement.push("operator",'>>');}
						var push_com = undefined; var operator = undefined;
						var parenthesis = undefined; var lock = undefined;
						var brackets = undefined; var statemend = undefined;
						var asigner=undefined; var push_literal = undefined;
						var joined = undefined;
					}else{
						if(sym=='/'||sym=='#'){
							var no_push = true;
						}else{input_a.push(sym);}
					}
					var no_push = true;
				}				
				if(no_push){var no_push = undefined;}else{input_a.push(sym);}
	
			i2++;}
				
			act_obj.phase2_stmts.push(statement);
			if(l1==0){
				act_obj.is='actor';
			}
	
		}//act
		
	i++;}//lines check loop
	
//here goes something to do with exposed act.. maybe return it?
//returning the act object would be beneficial. i could ask if the act is already on
//act_d or something... 
//same act should never be pushed again
	return act_obj

}//actuator


//RUNA
//Acts edits can only be seen under specified conditions. example. if an orb
//runs an animation while user is controling that orb,
//we get to see the animation as specified. however, we can also see such
//animation while in control of a different orb
//It all comes to how acts manage deals logic and links.

all.runa = function(aa){
//perform array holds 3 elements per resource found. tag to res, nature of res,
//resource
//only exception is condition. conditions are simply tags.
	//var perform=[];
//The better the first tests are, the faster the actor will find its target.
//we loop resources and run phase1 statements on each one of them.
	//loop to test and find resources
	var l1 =all.res_acts.length;
	while(l1--){
		var ra = all.res_acts[l1];
//loop to check resources
//.. so maybe i can pass ra into a function , all.playa_listen and after loop
//is done we run all.playa_act using filled perform
//each loop needs to push performers into perform array
		all.playl(ra,aa);
	}//res acts loop
//now we use resources on perform array
	all.playa(aa);
	//and clear all.perform
	all.perform = [];
}//runa

//phase1 test statements on all available resources. runs inside runa resource
//loop
//use current [R] ra to run test statements on all resources
//loop phase1 statements of actor
all.playl = function(ra,aa){
	var i1 = 0; //statements should be read in order
	var l1 = aa.phase1_stmts.length;
	var p1perform = []; //p1perform is a phase1 perform array.we use all.perform exclusively to push ra(resource acts) on phase1
	while(l1--){
		var stmt = aa.phase1_stmts[i1];
//PHASE1 possible arrangements
//we need literals on phase1 so its more practical to find resources.
//we can add resources by its name, by a logic string,a logic number or a logic key
//[R]//logic(lkey)(ltag1) ,  length 8, [3] 'logic'  done
//[R]//name=#a name am looking for{keep1} , length 10, [1] R  done
//[ltag1]//str=#a string am looking for{keep1} , length 10 [3] str  done
//[ltag1]//num=#a number am looking for{keep1} , length 10 [3] num  done
//[ltag1]{keep1} , length 4 done
//{keep1}[R]//cast(new tag1) , length 8 [0] 'condition'  done

//maybe i should only push ra into perform array and use a diferent array for cond
//and ltags? .. not sure yet
		if(stmt.length==8){
		//[R]//logic(key)(access tag)
			if(stmt[3]=='logic'){
				var l2 = ra.logics.length;
				while(l2--){
					var logi = ra.logics[l2];
					if(stmt[5]==logi[2]){//logic key matched
						//so we are pushing the access tag and the logic object itself..ok
						p1perform.push(stmt[7],logi); break
					}
				}
			}//logic

//when the condition is fullfilled, we add the resource to all.perform using the "cast" instruction
//{keep1}[R]//cast(access tag for current resource) , length 8 [0] 'condition'
			if(stmt[0]=='condition'){
				var l2 = p1perform.length;
				while(l2--){
					var cond = p1perform[l2];
					if(stmt[1]==cond){
				//cond tag found on p1perform so we run the statement. in this case the only possible statement to run
				//is to pass on the resource into all.perform for act to work with.
				//we pass an access tag, the 'ra' word and the resource itself. we need 'ra' to identify the resource..?
						all.perform.push(stmt[7],'ra',ra); break //break?
					}
				}	
			}//condition
		}//length 8

//finding a resource
		if(stmt.length==10){
			var l2 = p1perform.length;
			while(l2--){
				var ltag = p1perform[l2];
				if(stmt[1]==ltag){//ltag found on perform
					var logi = p1perform[l2+1];
//by accessing a logic string..
//[ltag1]//str=#a string am looking for{keep1} , length 10 [3] str
					if(stmt[3]=='str'){
						if(logi[0]==stmt[7]){ //logi0 is the string
							p1perform.push(stmt[9]); break //so we push stmnt9 which is the condition keyword
						}
					}
//by accessing a logic number..		
//[ltag1]//num=#a number am looking for{keep1} , length 10 [3] num
					if(stmt[3]=='num'){
						if(logi[1]==stmt[7]){ //logi1 is the number.. ok
							p1perform.push(stmt[9]); break //we push stmnt9 which is the condition keyword
						}
					}
				}
			}//find ltag

//..or by accessing a a resource name
//[R]//name=#a name am looking for{keep1} , length 10, [1] R
			if(stmt[3]=='name'){
				if(ra.name==stmt[7]){
					p1perform.push(stmt[9]);
				}
			}

		}//length 10

// also the simple prescence of a tag can unlock a condition.
		if(stmt.length==4){
//[ltag1]{keep1} , length 4
			var l2 = p1perform.length;
			while(l2--){
				var ltag = p1perform[l2];
				if(stmt[1]==ltag){//ltag found on p1perform so condition is unlocked
					p1perform.push(stmt[3]); break
				}
			}	
		}//length 4

	i1++;
	}//phase1 loop
}//playl


//phase2 statements use resources allocated on all.perform by phase1 playl.
//runs inside runa once, after resource loop
all.playa = function(aa){
//PHASE2 possible arrangements.. maybe we should rly just leave all resource
//accessing commands on phase1... no we just need to ask logic on phase1 in
//order to determine what resource act to allocate
//..only 2 arrangements that dont have 2 resources on a line are act res access
//creators
//on first lines, we expect any number of these
//[resource tag]//logic(logic key)(logic access tag) 8 .... 
//[resource tag]//link(link key)(link access tag) 8 .... 
//what about streams..
//[resource tag]//stream(access tag) 6...
//an instruction to grant actors access into reading a running resource script in the wild
//unfinished...?
//[resource tag]//script?
//an instruction to ask for resource removal
//[resource tag]//shutdown

//an instruction to end the script execution
// /end
	
 
//loop phase2 statements of actor
	var i1 = 0; //statements should be read in order
	var l1 = aa.phase2_stmts.length;
	while(l1--){
		var stmt = aa.phase2_stmts[i1];
//here goes thecondition thing. handle condition at beggining. we just strip 'tag' and condition tag from the statement and run it normally
//if the condition tag was already on all.perform. PERFORM .if not, then we just ignore the statement and proceed with next 
//line(next statement)
		if(stmt[0]=='condition'){
			//ask if its on perform, if its on, then..
			var l2 = all.perform.length;
			while(l2--){
				var tag = all.perform[l2];
				if(stmt[1]==tag){
				//yoink and paste 0 and 1 from stmt at the end..!!!!!
					stmt.shift(); var cond = stmt.shift(); break//
				}
			}
			if(cond==undefined){
				i1++;
				continue
			}
		}//condition on 0

//we need an instruction to end the act... ending an act would imply removing all states under the act control. so we need  way to identify
//states created by this act.. it worked
///end
		if(stmt[1]=='end'){
			//clear all asociated states
			var l = all.anim_a.length; 
			var rname = '_lks_'+aa.name+aa.orb;
			while(l--){
				var s = all.anim_a[l]; 
				var ename = s.name.substr(-rname.length);
				if(ename == rname){
	//ok maybe we do need to clear and remove states using s_u 
					s.u_d.push('is','rm','et',-1);
					s.is='c_'+s.s; s.t=1;
					//var rmsi = all.anim_a.indexOf(s);
					//all.anim_a.splice(rmsi,1);
					//s.is="rm";
				}
			}
			//remove this act from orb.actors
			var orb = all.find_ting(all.up_objs, 'name', aa.orb);
			var rmactor = orb.actors.indexOf(aa);
			orb.actors.splice(rmactor,1);
			break	
		}

//if we find a string in all.perform to match stmt1 it means it can be an access tag to a resource or a container always.
//we only need to ask the instruction then to know exactly if its a resource or a container what we located. we only need to confirm now
//if confirmed then we proceed, if not, then its a resource not founc situation so we simply break out

		var l2 = all.perform.length;
		while(l2--){
			var tag = all.perform[l2];
			//looking for resource access tag..
			if(tag==stmt[1]){
				//[resource tag]//logic(key)(tag) 8
				if(stmt[3]=='logic'){
					var R = all.perform[l2+2];//we know resource is 2 items away from the tag. tag, 'ra',resource
					//R.logics grants access to logic resources
					var l3 = R.logics.length;
					while(l3--){
						var logi = R.logics[l3];
						if(stmt[5]==logi[2]){//logic key matched
							all.perform.push(stmt[7],'logi',logi); break //logi access tag, 'logi', logi
						}
					}

				}//logic
//LINK ANIMATION RADIANCE
//so far its link[0] edit name, link[1] is link key , link[2] reference to edit ,
//link[3] holds edit nature and link[4] will hold buffer now if any
				//[resource tag]//link(key)(tag) 8
				if(stmt[3]=='link'){
					var R = all.perform[l2+2];
					//R.links
					var l3 = R.links.length;
					while(l3--){
						var lin = R.links[l3];
						if(stmt[5]==lin[1]){ //link key match
//.. yeah we probly should just push the state or a unique control container for
//txt and other types of edits. .. we can control txt from first line state.
//audio edits structure need revision!!!!!!!! records too.. 
//okok why not just push the edit straight away in here as the third element on perform triads. that would be way more consistent
//we can then do what we want after we have the instruction and the values we want to work with.
							if(lin[3]=='img'){
			var lks = all.find_ting(all.anim_a, "name", lin[0]+'_lks_'+aa.name+aa.orb);//act and orb names.. yup
								if(lks){}else{
										//console.log('worked!');
		//not sure if here is the best instance to check for loaded img file...
//ok we need to initialize this state right here and now . we cant wait for animf to do it because phase 2 might want to start
//running the animation inmediately with customized properties so the state must be ready from here on
			var lks = all.ims_s_new(lin[0]+'_lks_'+aa.name+aa.orb, lin[4]);
							var sret = all.getetv(lin[2]);
							lks.anim=lin[2]; lks.et=sret;
							//lks.tx=window.innerWidth/2; lks.ty=window.innerHeight/2;
							lks.tx = Math.floor(window.innerWidth/2); 
							lks.ty = Math.floor(window.innerHeight/2);
							//lks.ctx = ctx1;// lets use ctx1 by default for now
							var f0 = lks.anim[0];
							lks.x=f0.x; lks.y=f0.y; lks.w=f0.w; lks.h=f0.h;
							lks.px=f0.px; lks.py=f0.py; lks.pw=f0.pw; lks.ph=f0.ph; lks.a=f0.a; 
							lks.is='c_img'; //lks.run=0;
							lks.rt=0;//lks.et; //lks.t=f0.t;
							lks.loop=false; lks.run=false; 
									all.anim_a.push(lks);
								}
						//we use access tag and +2 to work with the edit state	
								all.perform.push(stmt[7],'img',lks); break
							}//img
							
							//txt
//so txt edits need to get a grip on several states at once using the print function. but the state we really need to be able to
//push into perform here is the first line state since this is the one that holds the parameters that control the rest of the lines.
//.. ok  so what we really need to do is just pass on the edit txt access instead of a state. we are not modifying the edit later anyway
//we are just using it to print later.. maybe we could actually create the states here..yeah create all lines here and control them
//from here find a way.. maybe use the first line state to work with script changes but at each change call print.
							if(lin[3]=='txt'){
			var lks = all.find_ting(all.anim_a, 'name', lin[0]+'_line1'+aa.name+aa.orb);
								if(lks){}else{
							var actid = aa.name+aa.orb;
							var lks = all.txt_s_new(lin[0]+'_line1'+actid);
							lks.anim=lin[2]; lks.actid=actid;
							l0=lin[2][0]; //this l0 omg
							//lks.ctx=ctx1; //ctx1 by default
							lks.x=l0.Gx; lks.y=l0.Gy;
							lks.r=l0.Gr; lks.g=l0.Gg; lks.b=l0.Gb; lks.a=l0.Ga;
							lks.font=l0.font;
							lks.tx=window.innerWidth/2; lks.ty=window.innerHeight/2;
							lks.is="f"; lks.txt=l0.txt; lks.spacer=l0.spacer;
							lks.display='ignore';
							lks.custom_a=l0.custom_a;
							lks.t=-1;
	//create a function print on animf to create all lines using line1 properties. so we only change line1 and print
	//but for now just use actual anim[0] properties on this state because we will use this state properties from here on
										all.anim_a.push(lks);
									}

							//work with lks which is line1
								all.perform.push(stmt[7],'txt',lks); break

							}//txt

							//
							//...
								
						}//link match
					}//links loop
				}//link

//resources should be able to grant access to orbs streams. so streams could be stored on resources directly, since streams are
//just objects with properties, we could access orbs stream properties and also change values to make the stream appear on our
//screen. streams could be treated exactly as logi and link resources. stream txt, x y position, color, size etc. same as edits
//we would use stream properties to create states, and we could affect the states but not the properties of the original stream.
//we could direct the stream to another orb while modifying its appearance, or we could use a stream txt to affect other states.
//.. maybe we dont need to make all history accessible, just one line at a time. so we can take the last stream
//line and process it using its own custom display..? 
//[resource tag]//stream(access tag)  5
				if(stmt[3]=='stream'){
					var R = all.perform[l2+2];//we know resource is 2 items away from the tag. tag, 'ra',resource
					all.perform.push(stmt[5],'stream',R.stream); break
					//stream access tag, 'stream', resource orb stream
				}

//if all.perform.length is 4 , this means its an independent instruction like runon, runoff , loopon, loopoff
//these are instructions that dont require more than 2 different values so they act like switches and dont require values
//taken from somewhere else to work. also, a statement can run these over and over again and the effect of the instruction
//wont add. These instructions simplify the way we handle running animations.
//[edit tag]//runon 4
//[edit tag]//runoff 4
//[edit tag]//loopon 4
//[edit tag]//loopoff 4
//we already know all.perform[1] has matched a resource so we dont need to ask again we just need to confirm its an edit container
//the kind of tag we asked could be a resource, we need a container
					//we know lks is 2 items away from the tag and 1 away is the nature of the edit
//ok so since runon will be able to run an animation as long as its being executed we actually dont need loopon and loopoff.. and
//maybe we dont need runoff either... one sec
				if(stmt[3]=='runon'){
					var lks = all.perform[l2+2];
			//if run already, dont do a thing, if run false, set run on and also set is to c_thing
					if(lks.run){}else{lks.run=true; lks.is='c_'+lks.s;} break
					//lks.run=true; break
				}
				if(stmt[3]=='runoff'){
					var lks = all.perform[l2+2];
					lks.run=false; break
				}
				if(stmt[3]=='loopon'){
					var lks = all.perform[l2+2];
					lks.loop=true; break
				}
				if(stmt[3]=='loopoff'){
					var lks = all.perform[l2+2];
					lks.loop=false; break
				}

			}//resource found .. else let user know res not found? //deprecat

		}//perform loop l2 for 1 R in line on phase2 ..



//PERFORM
//all.perform
//by now all.perform should have consecutive triplets with tag , natureof and resource itself.
//we only need to find tags on perform and we already know its asociated resource
//is located +2 next to it on the same perform array.
//..so any of the statements we evaluate from here on have the instructions asked above, these statements are test statements and
//operation statements.
//from here on we work with..
//a resource access tag, an extraction command, an operation, another tag, and another extraction instruction
//i think i designed it like this for simplicity. these long statements always need 2 resources to operate. if one of the resource isnt
//found or condition isnt found then the statement is simply ignored . even condition tag at the begginning was considered previously
//we have to work with these structures to create all effects that depend on complex values taken from resources.
		//
//these are test statements
//[tag]//subcommand=[tag]//subcommand{cond} 12
//[tag]//subcommand<[tag]//subcommand{cond} 12
//[tag]//subcommand>[tag]//subcommand{cond} 12
		//
//these are operation statements
//[tag]//subcommand+[tag]//subcommand 10
//[tag]//subcommand-[tag]//subcommand 10
//[tag]//subcommand>>[tag]//subcommand 10
		//
//am thinking phase2 doesnt need to handle literals. we have resources already. the whole point is that resources provide data neccesary
//to build all dynamics
//and the stream sc(subcommand) should be able to provide more than enough versatility
//.. am thinking instead of calling these 'subcommands' they should be called 'instructions' for consistency s sake. we already
//have commands and subcommands to work with sunya input box...
//use resources available to run statements on them. if no resource then ignore the statement.

//.. whats all this?.. i could work with all.perform straight away i dont need to ask so much stuff?...okok one sec
//if we even get this far is obviously because the structure of the statement has 10 or more items....
//if all.perform.length >= 10 .... do all this
		//
		var l2 = all.perform.length;
		while(l2--){
			var tag = all.perform[l2];
			//find tags
			if(stmt[1]==tag){var R1 = all.perform[l2+2]; var R1N = all.perform[l2+1];} //Resource and ResourceNature
			if(stmt[7]==tag){var R2 = all.perform[l2+2]; var R2N = all.perform[l2+1];}
		}//perform loop to get tags

		if(R1==undefined||R2==undefined){ //sooo we should always have both resources at this point.... yup
			if(cond!=undefined){
//i think am just restoring the condition here for the next resource check because the condition was fullfilled,
//but the resource wasnt found so we ignore this statement
//maybe on another heartbeat in the future the resource we lack now might available.
				stmt.unshift('condition',cond);
				var cond = undefined;
			}
			i1++;
			continue
		}

//we need to retrieve values from subcommands(instructions) running on resources. the idea is
//to ask all the same questions to both resources so we do a double loop
//rvalues would look like [wheretowork, res1 value, wheretowork, res2 value]... whererowork has no point we already have each resource
//nature
//rvalues now will look like[res1 value, res2 value]  ... no we also need wheretowork
		var l2 = 2; var rvalues =[];
		while(l2--){
//first loop
			if(l2==1){var R = R1; var sc_pos = 3;}
//second loop
			if(l2==0){var R = R2; var sc_pos = 9;}
				//
		//logi
			if(stmt[sc_pos]=='str'){rvalues.push('lstr', R[0]);} //R[0] holds logic string
			//we should transform values into numbers here... or are they already 
			if(stmt[sc_pos]=='num'){rvalues.push('lnum', R[1]);} //R[1] holds logic number

//img, rect circle links. these affect states directly.. also txt now
//these also need to be numbers...
			if(stmt[sc_pos]=='x'){
				rvalues.push('tx', R.tx);//when instruction is x, we are dealing with tx of a state
			} //R is a state now.. again lol 

			if(stmt[sc_pos]=='y'){rvalues.push('ty',R.ty);}

			if(stmt[sc_pos]=='time'){rvalues.push('rt',R.rt);}

			if(stmt[sc_pos]=='duration'){rvalues.push('et',R.et);}
		//stream
//so we have a stream resource. what we are really interested in is in history. we want to be able to extract a specific history item
//so we need an instruction to change the history item we want to extract and an instruction to extract the value of selected item
//we can then pipe this value into other streams or into txt animations so no need to worry about effects right here
		//lets just make the last input available with the "streams" instruction
		//stream values should be able to handle both numbers and strings
			if(stmt[sc_pos]=='streams'){rvalues.push('streams',R.history[R.history.length-1]);}
			//if(stmt[sc_pos]=='history')//{rvalues.push();}
			//
		}//l2 loop rvalues


//All that is left, is to ask for operations and place results where they go
		//'+' and '-' operation need to work with numbers...
		if(stmt[5]=='+'){var NV = (rvalues[1]+rvalues[3]); var to = 1;}
		if(stmt[5]=='-'){var NV = (rvalues[1]-rvalues[3]); var to = 1;}
		if(stmt[5]=='>>'){var NV = rvalues[1]; var to = 2;}
		if(stmt[5]=='='){
			if(rvalues[1]==rvalues[3]){
				//condition tag is pushed alone, we only need to ask if its there.. ?
				 all.perform.push(stmt[11]);
			}
		}
//place results. this are not being placed right. R2[0] ?
//ok what if : [logictag]//num>>[link tag]//x
//we need to account for target resource nature
//maybe ask for to first, then ask for nature.. rvalues 0 has no point in here, we already know the nature
//of the resources at play and so we can determine where to put operation results.. no actually we need to pass what do
		if(to==1){
			if(rvalues[0]=='lstr'){R1[0]=NV;}
			if(rvalues[0]=='lnum'){R1[1]=NV;}
			if(rvalues[0]=='streams'){R1.history[R1.history.length-1]=NV;}

			if(rvalues[0]=='tx'){if(R1N == 'txt'){R1.display='print';} R1.tx=NV;}
			if(rvalues[0]=='ty'){if(R1N == 'txt'){R1.display='print';} R1.ty=NV;}
			if(rvalues[0]=='rt'){if(R1N == 'txt'){ //do txt later..
				}else{
		//ok so we need to change not only rt but also ft and nfreq, here we run the function all.getcfv(a,rt)
	//its backwards... ft runs backwards so we need to fix getcfv 
					var cf = all.getcfv(R1.anim, NV);
					R1.rt=NV; R1.ft=cf[0]; R1.nfreq=cf[1];
				}
			}
			if(rvalues[0]=='et'){if(R1N == 'txt'){}else{R1.et=NV;}}

		}//to 1

		if(to==2){
			if(rvalues[2]=='lstr'){R2[0]=NV;}
			if(rvalues[2]=='lnum'){R2[1]=NV;}
			if(rvalues[2]=='streams'){R2.history[R2.history.length-1]=NV;}

			if(rvalues[2]=='tx'){if(R2N == 'txt'){R2.display='print';}R2.tx=NV;}
			if(rvalues[2]=='ty'){if(R2N == 'txt'){R2.display='print';} R2.ty=NV;}
//time controls from where to run... beats for visuals, seconds for audio. txt for later lol... duration controls where to end.
//time = number, sum t(ft) of every frame operation to asign requested nfreq and ft.. a function to calculate corresponding
//frame given a number for time. all.getcfv = function(a,t) for visuals, takes the edit and the desired time
//rt 0 should always reinit the animation. we should be able to retrieve time as a number but also when we  place a number on
//time container it should affect the edit properly. same with duration. we should be able to change duration and retrieve its value
//in the same way we do with time.
			if(rvalues[2]=='rt'){if(R2N == 'txt'){
				}else{
//ok so we need to change not only rt but also ft and nfreq, here we run the function all.getcfv(a,rt)
					var ct = all.getcfv(R2.anim, NV);
					R2.rt=NV; R2.ft=ct[0]; R2.nfreq=ct[1];
				}
			}

			if(rvalues[2]=='et'){if(R2N == 'txt'){}else{R2.et=NV;}}
		}//to 2
		


		//restoring stmt original structure
		if(cond!=undefined){
			stmt.unshift('condition',cond);
			var cond = undefined;
		}
	i1++;
	}//phase2 stmts loop l1

}//playa



//ex ML_UP (my logic update)
//STANCE UPDATE
//ORB
//all.orb_up runs when user on vessel stance . checking for modes reacting to commands and also check inits
all.orb_up = function(o){//takes orb structure
		//var u = U; //update this..
//INNER mode
//Users need to access inner mode in order to create , modify , and have full control
//of orbs capabilities. Users may now run commands to access orb information and
//create animations , sounds and programable behavior
//show orb status(animations stored, image stored, jobs being executed, defense
//systems etc )
//User should be able to run on loop any animation on the background of inner mode, along with any sound as well. these animations
//are not interactive but help users have an idea of this orb potential

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
//deprecat . 
//at this point we also need to push init states of all animations with the running tag on 'TRUE'. except for scripts. scripts dont 'run',
//scripts 'play', they work differently from 'edits'
//so we run a loop to find all running edits and push their init states
//but need to be timed with transition animation...
/*
				if(tt=='run edits'){
	//we need a boolean here to let us know if orb is running any animation . we can use this boolean to manage vessel prim and field
	//custom display. instead of having to check for all animation boxes we just ask the boolean and set proper display
	//we want almost transparent prims and fields when animations running. And these animations will keep running even
	//when user is away... love this
	//all we gotta do every time we run an animation or unrun is check for states whit "__r" in it and our orb name on it
	//we dont event need to tt run edits now because animations will keep running over transitions. only radiant mode changes.
	//but thats for another day... am tired


		 			//circle
					var el = o.circle.length;
					while(el--){
						var a = o.circle[el];
						if(a[0].running=='TRUE'){
							var sr = all.find_ting(all.anim_a, 'name', a[0].name+"__r");
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
							//sr.tx=window.innerWidth/2; sr.ty=window.innerHeight/2; 
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

					print.tx=ceX; print.ty=ceY;
					print.x=l0.Gx; print.y=l0.Gy;
					print.r=l0.Gr; print.g=l0.Gg; print.b=l0.Gb; print.a=l0.Ga;
					print.font=l0.font;
					//print.tx=window.innerWidth/2; print.ty=window.innerHeight/2;
					print.is="txt"; print.txt=lin.txt;
					print.y=print.y+spacer; //next line y position difference
					print.display=lin.display;
					print.custom_a=lin.custom_a;
					print.t=-1; //print.run=1;
					print.layer=0; //!!!!!!! for now.temporary
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
*/
				if(tt==undefined){return}

			}//init inner mode

//INNERMODE , IDLING

//VESSEL
			//so aybe instead of updating here, we can really just make have a se , so it gets refreshed and updated
			//on vessel_up
			//var oes = all.find_ting(all.anim_a,'name','___soul');
			//if(oes){
			//	oes.is='circle'; oes.r=o_r; oes.g=o_g; oes.b=o_b; oes.a=0.8;
			//	//oes.u_d.push('r',o_r,'g',o_g,'b',o_b,'is','circle','a',0.8);
			//}

			
//Use diferent signals here to manage orb on inner mode, broadcast, streams, sound
//background etc? this command is pretty op 
			if(o.op3!=0){var delta = all.signify(o.op3);}
			if(delta){
				if(delta.signal=='exit'){
					//exit on idling inner mode puts user back into the void
					stance = undefined; 
					//uinit='orb outwards';
					uinit={transition:'orb outwards',stancefrom:o}//,stanceto:undefined};

//we now also need to remove all states from running edits on inner mode if any.. so look for states with names that end in '__r'?
//but we actually dont want to do that. inner mode running edits will be visible for user while on void now, just not playing
//like in a script but still visible.? We will project a rect simulating a user vision, a prismatic line. Animations will run inside
//maybe we can just offs these
			/*
					var l = all.anim_a.length; 
					while(l--){
						var s = all.anim_a[l];
						var namend = s.name.substr(-3, 3);
						if(namend == '__r'){
							all.anim_a.splice(l,1);
						}
					}
			*/


					all.stream_a.push("User left .." + o.name); all.screen_log();
				}//exit
				
				o.op3=0;
				
			}//delta

		}//inner mode



//RADIANCE
//here goes phase 3 of act system?..
//While on radiant mode, input can be managed from act scripts. input typed on prompt
//doesnt go to mainstream anymore, it is piped into the orb radiant stream.
		if(o.radiant_mode){
			if(uinit){
				uinit=false;
				return
			}//init
			
//we need .signal here . op could help manage radiance. we need a way to request
//help, exit to void and changing back to orb stance from here as well

			if(o.op3!=0){var delta = all.signify(o.op3);}
			if(delta){
				if(delta.signal=='exit'){
			//exit on radiant mode puts user back into the void
					stance = undefined; uinit='orb outwards';
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
//EDIT
	//just init kinda updated... but this needs revision
		if(o.edit_audio_mode==true){
			if(uinit){
				//var tt = all.transition(uinit);
				var tt = all.transition(uinit.transition, uinit.stancefrom, uinit.stanceto);
				if(tt=='all set'){uinit=false; return}
			
				if(all.au){}else{all.au=all.audioser();} //safenet?

//we now also need to remove all states from running edits on inner mode if any.. so look for states with names that end in '__r'
//.. i think we dont neccesarily need to remove these either...
				var l = all.anim_a.length; 
				while(l--){
					var s = all.anim_a[l];
					var namend = s.name.substr(-3, 3);
					if(namend == '__r'){
						all.anim_a.splice(l,1);
					}
				}
				all.stream_a.push('Edit audio mode On'); all.screen_log();
				return
			}
//animation reference
			var a = o.audio[o.op1];
//state refference
			var a_s = all.find_ting(all.anim_a,"name", a.name+"_");

			if(o.op3!=0){var delta = all.signify(o.op3);}
			if(delta){
				
				if(delta.signal=='exit'){
					o.inner_mode=true; o.edit_audio_mode = false;
					var obg = all.circle_s_new('__obg');
					obg.radius=900; obg.t=5;
					obg.r=0; obg.g=0; obg.b=0; obg.a=0;
					obg.inside="filled"; obg.is='circle';
					obg.x=Math.floor(window.innerWidth/2);
					obg.y=Math.floor(window.innerHeight/2);
					obg.ctx=ctx0;
					//if(o.inner_mode){obg.se='idle_pick';}
					//if(o.radiant_mode){obg.se='expand_colors';}
				//we need this now.. for now
					if(o.inner_mode){obg.se='expand';}
					all.anim_a.push(obg);

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
					//var feed_stream = all.find_ting(o.stream, 'name', 'feed0');
					//all.clear_stream(feed_stream);//just use all.user.estream
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
						var a_s = all.buffer_s(o.audio_access, all.au, a.name+"_", a);
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
				var s_0 = all.user.estream;
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
				var a_s = all.find_ting(all.anim_a,"name", a.name+"_");
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
//OSC
//edit an oscilator to be asigned to a key on vox mode?
//from here, a tool to edit a customized waveform shoudl be available?
//All functions here modify parameters of the osc object animation and the state simultaneously to reflect changes.
//unlike text editor, its not practical to eliminate and create again oscilator states since we are simply creating a single
//oscilator per edit
//.. need user friendly feedback 
//I should be able to control fade in..
//EDIT
		if(o.edit_osc_mode==true){
			if(uinit){
				//all modes init should do this
				var obg = all.find_ting(all.anim_a, "name", '__obg');
				if(obg){obg.is='rm';}	
				var obgr = all.find_ting(all.anim_a, "name", '__obgr');
				if(obgr){obgr.is='rm';}
				//if(all.au){}else{all.au=all.audioser();} //safenet?
				//Maybe i should push some states to animate graphics to acompany audio. audio graph
				//later, some buttons could be used to build a waveform using cursor or phone touch
//we now also need to remove all states from running edits on inner mode if any.. so look for states with names that end in '__r'
				var l = all.anim_a.length; 
				while(l--){
					var s = all.anim_a[l];
					var namend = s.name.substr(-3, 3);
					if(namend == '__r'){
						all.anim_a.splice(l,1);
					}
				}
				all.clear_rect(ctx1, 0,0,window.innerWidth, window.innerHeight);
				u.init=false;
				//o.init=false;
				all.stream_a.push('Edit oscilator mode On'); all.screen_log();
				return
			}//osc init

//use R to play the sound. numbers and T to asign a frequency. U sine,  I square, O sawtooth, P triangle
//Y volume +, G volume -, Q quits,  F and C to increase fade out. should also be able to increase/decrease fade in
//use H and B to go 1 hertz up or down on frequency
			var a = o.osc[o.op1]; //anim access
			var a_s = all.find_ting(all.anim_a,"name", a.name+"_");//state access if any

			if(o.op3!=0){var delta = all.signify(o.op3);}
			if(delta){
				if(delta.signal=='exit'){
					o.inner_mode=true; o.edit_osc_mode = false;
					var obg = all.circle_s_new('__obg');
					obg.radius=900; obg.t=5;
					obg.r=0; obg.g=0; obg.b=0; obg.a=0;
					obg.inside="filled"; obg.is='circle';
					obg.x=Math.floor(window.innerWidth/2);
					obg.y=Math.floor(window.innerHeight/2);
					obg.ctx=ctx0;
					//if(o.inner_mode){obg.se='idle_pick';}
					//if(o.radiant_mode){obg.se='expand_colors';}
				//we need this now.. for now
					if(o.inner_mode){obg.se='expand';}

					all.anim_a.push(obg);
					//cant end and splice inmediately after, must disconnect now and then splice
					if(a_s){
						a_s.osc_n.stop();a_s.osc_n.disconnect();
						var index = all.anim_a.indexOf(a_s);
						all.anim_a.splice(index,1);
					}
					//clear data feedback stream
					//var feed_stream = all.find_ting(o.stream, "name", "feed0");
					//all.clear_stream(feed_stream);
					all.clear_stream(all.user.estream);//just use all.user.estream

					//clear selected values
					o.op1= 0; o.op2= 0; o.op3=0; o.op5=0;//var id = a.on_a[0];
					all.stream_a.push("Out of oscillator edit mode"); all.screen_log();
					return
				}
				
				if(delta.signal=='run'){
					if(a_s){
						a_s.end="fade";
					}else{
						var a_s = all.osc_s(all.au, a.name+"_", a);
						all.anim_a.push(a_s);
					}
				}

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
					
//in osc mode, we use next and back to change osc
				if(delta.signal=='next'){
					o.op1++;
					if(o.op1>=o.osc.length){o.op1=0;}
					all.stream_a.push("osc "+o.op1); all.screen_log();
				}
				if(delta.signal=='back'){
					o.op1--;
					if(o.op1<0){o.op1=(o.osc.length-1);}
					all.stream_a.push("osc "+o.op1); all.screen_log();
				}
					
				//var up_sel = true;
				o.op3=0;
			}
			
			o.op5++;
			if(o.op5==15){
				var s_0 = all.user.estream;
				s_0.r=o_r; s_0.g=o_g; s_0.b=o_b;
				o.op5=0;
			}
			
			var up_sel = true;
			
//interface to show data from currently selected oscillator
			if(up_sel){//should be update_interface
				var a = o.osc[o.op1];
				var a_s = all.find_ting(all.anim_a,"name", a.name+"_");
				if(a_s){
			//this is funky....
					if(a_s.end==undefined){var runin = 'ON';}
					if(a_s.end=='fade'){var runin = 'OFF';}
				}else{var runin='OFF';}
				all.stream_a.push(
					"Oscilator name: "+a.name+'  Running:'+runin,
					"Frequency: "+a.freq,
					"Gain: "+a.gain,
					"Wave Form: "+a.type,
					"Fade: "+a.fade,
					"Key Asigned: "+a.asigned_key
					);
				all.screen_log('estream'); //estream

			}			

		}//edit oscilator
*/

//TXT editor
//Txt editor should allow user to create a specific text to be displayed in a specific way.
//Write a line, position it, select color..
//The same txt animation can now take another line, and as many lines as user wants
//When txt animation is run , it will print at every beat, just like any other animation .

//would be interesting to have a .txt:[name of text] command to select a different text to edit while on the editor..

//it would be nice to see colourful roots holding the selected line and changing acordingly?.. maybe an idea for act script
//... i would like to see other acts scripts next to each other simultaneously.. this is done , we have .signal:_+/-e
//text probly needs a timer or an end condition.. editor should be able to provide
//that . . ..or maybe not neccesary.. we do want txt to be able to vibe , change colours , position and transparency periodically..
//EDIT
		if(o.edit_txt_mode==true){
			if(uinit){ //text editor initialization
/*//reff
				//this is the corner up left of the screen
				//elid1.x=-U.x; elid1.y=-U.y;
				//grid zero
				var ceX=-U.x+window.innerWidth/2; var ceY=-U.y+window.innerHeight/2;
*/
				//var tt = all.transition(uinit);
				var tt = all.transition(uinit.transition, uinit.stancefrom);//, uinit.stanceto);
				if(tt=='all set'){
					var print = true; 
					o.op2 = 1; //always set selected line to 1
					uinit=false;
//we now also need to remove all states from running edits on inner mode if any.. so look for states with names that end in '__r'?
					var l = all.anim_a.length; 
					while(l--){
						var s = all.anim_a[l];
						var namend = s.name.substr(-3, 3);
						if(namend == '__r'){
							all.anim_a.splice(l,1);
						}
					}
				}

				if(tt==undefined){return}

			}//init

//ok so everyhting needs to work around grid zero, at the center of the orb. so we need to define grid zero, and all coordinates
//we use here to create animations need to be in X and Y , not in tx or ty, we dont use translates like this anymore, we use
//translates to move the user view exclusively
//grid zero here wont work properly if we change around user location so this needs revamp. fix this one first then we go to
//img editor

			//var ceX=-U.x+window.innerWidth/2; var ceY=-U.y+window.innerHeight/2;//grid zero
			var ceX=o.primX; var ceY=o.primY;//grid zero

			//op1 for text animation
			var anim = o.txt[o.op1];
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
										var index = all.anim_a.indexOf(s); 
										all.anim_a.splice(index,1);
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
			
//we nee a command signal to change our txt animation layer i think......


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
			/*//old alpha system
				if(delta.signal=='a'){
					if(delta.operation=='+'){
						l0.Ga = l0.Ga+0.1;
						if(l0.Ga > 1){l0.Ga = l0.Ga-0.1}
					}
					if(delta.operation=='-'){
						l0.Ga = l0.Ga-0.1;
						if(l0.Ga < 0.1){l0.Ga = l0.Ga+0.1} 
					}
					var print = true;
				}
			*/		

				
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
				/*
					if(delta.value==-1){
						a_line.display='normal'; var ok=true; lc=' zero'; a_line.custom_a=[];
						o.op6=0;
						anim[o.op2-1]=a_line;//animation line. data to keep

					}
					if(ok){}else{
				*/
						o.op6=delta.value-1;
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
				if(o.op5==0){
				//behavior by default
					if(o.op2==1){
						var new_line = {
							Gx:a_line.Gx, Gy:a_line.Gy,
							Gr:a_line.Gr, Gg:a_line.Gg, Gb:a_line.Gb, Ga:a_line.Ga,
							name:a_line.name, //Gt:a_line.Gt,
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
							var index = all.anim_a.indexOf(s); 
							all.anim_a.splice(index,1);
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
					print.font=l0.font;
				//use [] for selected line... this needs improve, the line number takes too much space
				//better now but still a bit sneaky
					if(o.op2==i){
						print.txt=lin.txt+'   '+i+' <';

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
				//var l1s = all.find_ting(all.anim_a ,'name', l0.name+'_line1');
				var l1s = all.find_ting(all.anim_a ,'name', l0.name+'_line'+o.op2);
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
					"........"
					);
				all.screen_log('estream');//estream		
			}else{all.clear_stream(U.estream);}
		}else{
			//we could still print some info here
			//if(o.op2==anim.length+1){var seline='NEW LINE';}else{
			all.clear_stream(U.estream);
		}

		}//text edit mode



//edit CIRCLE
//Yes. effects need to be able to be crafted by users because user will be able to
//create their own mechanics. effects will cast areas of interaction. circles
//expanding will trigger events when they touch something. rectangles will be
//interaction buttons for touchscreen users or maybe this is cope
//EDIT
		if(o.edit_circle_mode==true){
			if(uinit){
				//var tt = all.transition(uinit);
				var tt = all.transition(uinit.transition, uinit.stancefrom);//, uinit.stanceto);
				if(tt=='all set'){uinit=false; return}			
				if(tt=='set interface'){
			//this is the corner up left of the screen
			//elid1.x=-U.x; elid1.y=-U.y;
					var ceX=-U.x+window.innerWidth/2; var ceY=-U.y+window.innerHeight/2;//grid zero
					var anim = o.circle[o.op1];
				//a circle cursor on ctx1 .. layer 1 now
					var circle_s = all.circle_s_new("__circle");
					circle_s.anim=anim;//not neccesary ?
					circle_s.layer=1;
					//circle_s.tx=window.innerWidth/2; circle_s.ty=window.innerHeight/2; //old
					//is this the center?
					//circle_s.x=ceX; circle_s.y=ceY;
				//here goes nothing
					circle_s.x=0; circle_s.y=0;//
					circle_s.tx=ceX; circle_s.ty=ceY;//
					circle_s.is='circle'; circle_s.se='cursor'; //?
					all.anim_a.push(circle_s);
				//a circle to run on ctx0 ..layer 0
					var circle_sr = all.circle_s_new("__circle_r");// ex '__r'
					circle_sr.anim=anim; 
					circle_sr.layer=0;
					circle_sr.tx=ceX; circle_sr.tx=ceY;
					//circle_sr.tx=window.innerWidth/2; circle_sr.ty=window.innerHeight/2; 
					circle_sr.is="f";  
					all.anim_a.push(circle_sr);
				//horizontal line of cross
					var csx = all.rect_s_new("x__c"); 
					csx.is='rect'; //csx.ctx=ctx2; 
					csx.layer=1;
					csx.a=0.3; csx.inside="filled"; 
					csx.w=window.innerWidth; csx.h=1;
					//csx.x=0; csx.y=(window.innerHeight/2)-1;
					csx.x=ceX-(window.innerWidth/2); csx.y=ceY;
					all.anim_a.unshift(csx);
				//vertical line of cross
					var csy = all.rect_s_new("y__c"); 
					csy.is='rect'; //csy.ctx=ctx2; 
					csy.layer=1;
					csy.a=0.3; csy.inside="filled";
					csy.w=1; csy.h=window.innerHeight;
					//csy.x=(window.innerWidth/2)-1; csy.y=0;
					csy.x=ceX; csy.y=ceY-(window.innerHeight/2);
					all.anim_a.unshift(csy);

	//we now also need to remove all states from running edits on inner mode if any.. so look for states with names that end in '__r'
					var l = all.anim_a.length; 
					while(l--){
						var s = all.anim_a[l];
						var namend = s.name.substr(-3, 3);
						if(namend == '__r'){
							all.anim_a.splice(l,1);
						}
					}
				}//set interface

				if(tt==undefined){return}
			}

//we now need to define the central edit refference point. edit X and edit Y. //elid1.x=-U.x; elid1.y=-U.y;
//these represent our zero X and zero Y.
			var ceX=-U.x+window.innerWidth/2; var ceY=-U.y+window.innerHeight/2;

//!!!!!!!!!!!!!!!! so far so good but i l jsut work on txt editor right now ok? :D

//a refference to selected frame of selected animation sel_f and current animation
			var anim = o.circle[o.op1];
			var f= anim[o.op2];
//refference for cursor state
			var s = all.find_ting(all.anim_a, "name", "__circle");
//refference to run test animation
			var sr = all.find_ting(all.anim_a, "name", "__circle_r");//changed from '__r' to '_r'
//refference to horizontal cross line
			var csx = all.find_ting(all.anim_a, "name", "x__c");
//refference to vertical cross line
			var csy = all.find_ting(all.anim_a, "name", "y__c");

//use E for empty circle, F for filled circle
//then again, this is simply a parameter to change , a function to change a state 
//parameter directly should be versatile.
//should only take the state and the parameter it wishes to change
			if(o.op3!=0){var delta = all.signify(o.op3);}
			if(delta){
				//delta.signal , delta.value , delta.operation
				
				if(delta.signal=='exit'){
				//so maybe i could init inner mode here...
					o.inner_mode=true; o.edit_circle_mode = false; uinit='orb edit';
					
					//clear states
					s.is="rm"; sr.is="rm"; csx.is='rm'; csy.is='rm';
					//var feed_stream = all.find_ting(o.stream, "name", "feed0");
					//all.clear_stream(feed_stream);
					all.clear_stream(U.estream);//just use all.user.estream

					o.op1= 0; o.op2= 0; o.op5=0;
					//remove last ghost frame... this still needs revision
					if(sr.loop==false){anim.pop();}
					//remove empty array if user didnt even frame once
					if(anim.length==0){var rmf = o.circle.indexOf(anim); o.circle.splice(rmf,1);}
					
					all.stream_a.push("Out of circle edit mode");
					all.screen_log();
					//hah tricky
					o.op3=0;
					return
				}		

//inside
				if(delta.signal=='empty'){
					s.u_d.push('inside','empty');//,'is','circle');
					s.is='c_circle'; //s.t=1;
				}
				
				if(delta.signal=='filled'){
					s.u_d.push('inside','filled');//,'is','circle');
					s.is='c_circle'; //s.t=1;
				}
				
//cursor
				if(delta.signal=='left'||delta.signal=='right'||delta.signal=='up'||delta.signal=='down'){

					if(delta.signal=='left'){
						var u_p = 'x'; var u_v = s.x-delta.value;
					}
					if(delta.signal=='right'){
						var u_p = 'x'; var u_v = s.x+delta.value;
					}
					if(delta.signal=='up'){
						var u_p = 'y'; var u_v = s.y-delta.value;
					}
					if(delta.signal=='down'){
						var u_p = 'y'; var u_v = s.y+delta.value;
					}
					s.u_d.push(u_p, u_v);//,'is','circle');
					s.is='c_circle'; //s.t=1;
					
				}//cursor
				
				if(delta.signal=='radius'){
					if(delta.operation=='+'){
						var u_p = 'radius'; var u_v = s.radius+delta.value;
					}
					if(delta.operation=='-'){
						var u_p = 'radius'; var u_v = s.radius-delta.value;
						if(u_v<=0){u_v=1;}
					}
					s.u_d.push(u_p,u_v);//,'is','circle');
					s.is='c_circle'; //s.t=1;
				}
				
				if(delta.signal=='define'){
					//let t be 20 on default but dont overide if t already has a value
					if(f.ft==undefined){
						var ft=20;
					}else{
						var ft = f.ft;
						all.stream_a.push("Frame SAVED"); all.screen_log();
					}

					f.x=s.x; f.y=s.y;  //f.f=o.op2;
					f.radius=s.radius; f.inside=s.inside;
					f.r=s.r; f.g=s.g; f.b=s.b; f.a=s.a;
					f.ft=ft;
					
					if(sr.loop){
						//update times
						sr.et = all.getetv(anim); sr.rt=sr.et; //sr.t=1;
						//sr.nfreq=0; 
						sr.is='c_circle';
					}
					
					if(sr.loop==false){
						//update duration
						sr.et = all.getetv(anim);
						//only push new frame if loop is false
						if(anim[anim.length-1].inside){anim.push({});}
					}

					//all.stream_a.push("New frame available"); all.screen_log();
					//var update_sel = true;
				}

				if(delta.signal=='back'){
					//its weird to go back when there is no back to go	
					if(anim[o.op2-1]){
						o.op2--;
						//should update the selected frame to state here
						if(sr.loop){
							var f = anim[o.op2];
							s.u_d.push(
								'r',f.r,'g',f.g,'b',f.b,'a',f.a,'x',f.x,'y',f.y,
								'radius',f.radius,'inside',f.inside//,'is','circle'
							);
							s.is='c_circle'; //s.t=1;
						}

					}else{
						all.stream_a.push("First frame"); all.screen_log();
					}
				}
				
				if(delta.signal=='next'){
					//moves on to the next frame... if there is one
					if(anim[o.op2+1]){
						o.op2++;
						if(sr.loop){
							var f = anim[o.op2];
							s.u_d.push(
								'r',f.r,'g',f.g,'b',f.b,'a',f.a,'x',f.x,'y',f.y,
								'radius',f.radius,'inside',f.inside//,'is','circle'
							);
							s.is='c_circle'; //s.t=1;
						}

					}else{all.stream_a.push("Last frame"); all.screen_log();}
				}

				if(delta.signal=='run'){
					if(sr.loop){
						sr.u_d.push('loop',false,'rt',sr.et);
						sr.is='c_circle'; //sr.t=1;
						
						var f = anim[o.op2];
						s.u_d.push(
							'r',f.r,'g',f.g,'b',f.b,'a',f.a,'x',f.x,'y',f.y,
							'radius',f.radius,'inside',f.inside//,'is','circle'
						);
						s.is='c_circle'; //s.t=1;
						
						//when we out of loop we push ghost frame again
						anim.push({});
					}else{
						anim.pop(); 
						//new
						var sret = all.getetv(anim); 
						sr.anim=anim; sr.is='c_circle'; //sr.t=1; sr.nfreq=0; sr.run=1;
						sr.loop=true; sr.et=sret; sr.rt=sr.et;

					}

				}//run

				if(delta.signal=='alltime'){
					var al = anim.length;
					while(al--){
						var af = anim[al];
						af.ft=delta.value; 
					}
					if(sr.loop){
						//update times
						sr.et = all.getetv(anim); sr.rt=sr.et; //sr.t=1; sr.nfreq=0; 
						sr.is='c_circle';
					}
					all.stream_a.push("New beat"); all.screen_log();
				}

				if(delta.signal=='time'){
					f.ft=delta.value; 
					if(sr.loop){
						//update times
						sr.et = all.getetv(anim); sr.rt=sr.et; //sr.t=1; sr.nfreq=0;
						sr.is='c_circle';
					}
					all.stream_a.push("Numbers are time."); all.screen_log();
				}

				if(delta.signal=='red'){
					if(delta.value>220){//check if number is higher than 220
						all.stream_a.push("Max input is 220."); all.screen_log();
					}else{
						s.u_d.push('r',delta.value);//,'is','circle');
						s.is='c_circle'; //s.t=1;
						//all.stream_a.push("Numbers are red rect."); all.screen_log();
					}
				}
				if(delta.signal=='green'){
					if(delta.signal>220){//check if number is higher than 220
						all.stream_a.push("Max input is 220."); all.screen_log();
					}else{
						s.u_d.push('g',delta.value);//,'is','circle');
						s.is='c_circle'; //s.t=1;
						//all.stream_a.push("Numbers are green rect."); all.screen_log();
					}
				}	
				if(delta.signal=='blue'){
					if(delta.signal>220){//check if number is higher than 220
						all.stream_a.push("Max input is 220."); all.screen_log();
					}else{
						s.u_d.push('b',delta.value);//,'is','circle');
						s.is="c_circle"; //s.t=1;
						//all.stream_a.push("Numbers are blue rect."); all.screen_log();
					}
				}
				
//circle transparency. needs update to new a system
				if(delta.signal=='a'){
					//i could implement new txt alpha system here as well
					//if(delta.value>10){
					//	all.stream_a.push("Maximum value input is 10.");
					if(delta.operation=='+'){
						if(s.a>=1){}else{
							var na = s.a+(0.1);
						}
					}
					if(delta.operation=='-'){
						if(s.a<=0){}else{
							var na = s.a-(0.1);
						}
					}
					s.u_d.push('a',na);//,'is','circle');
					s.is='c_circle'; //s.t=1;
				}//a
				
				o.op3=0;
			}//delta
		
			o.op5++;
			if(o.op5==15){
				var s_0 = all.user.estream;
				s_0.r=o_r; s_0.g=o_g; s_0.b=o_b;
				o.op5=0;
			}

			csx.u_d.push('r',o_r,'g',o_g,'b',o_b,'is','rect'); csx.is='c_rect'; //csx.t=1;
			csy.u_d.push('r',o_r,'g',o_g,'b',o_b,'is','rect'); csy.is='c_rect'; //csy.t=1;
			s.u_d.push('is','circle');

			var update_sel = true;// ?

		
//feedback for circle .
//ask if frames have new params and if they do, gather data and print feedback acordingly
			if(update_sel){//should be update_interface
//selection.. maybe just incorporate frame wheel into sixlines and dont draw all
//frames just a few
				var f = anim[o.op2];

				var frames = anim.length; var f_n_a = []; //frame number array
				if(frames == 1){f_n_a.push("[0]");}
				if(frames == 2){
					if(o.op2==0){
						f_n_a.push("[0]",1);
					}
					if(o.op2==1){
						f_n_a.push(0,"[1]");
					}
				}
				if(frames >= 3){
					if(o.op2==0){}else{f_n_a.push(0);}
					while(frames--){
						if(frames == o.op2){f_n_a.push("["+frames+"]");}
					}
					if(o.op2==(anim.length-1)){}else{f_n_a.push((anim.length-1));}
				}	
				var framed = f_n_a.join("...");//join f_n_a togheter separated by -
				
				all.stream_a.push(
					"Animation name: "+anim[0].name+" Frame: "+framed,
					"Run Time:"+sr.rt+" Duration: "+sr.et,
					"Frame R:"+f.r+" G:"+f.g+" B:"+f.b+" A:"+f.a+" Rad:"+f.radius,
					"X:"+f.x+" Y:"+f.y+" Rad:"+f.radius+" Time: "+f.ft,
					"Cursor R:"+s.r+" G:"+s.g+" B:"+s.b+" A:"+s.a,
					"X:"+s.x+" Y:"+s.y+" Rad:"+s.radius
					);
				all.screen_log('estream');//estream

			}//up sel

		}//edit circle


//rect
//RECT , EDIT
		if(o.edit_rect_mode==true){
			if(u.init){
				//all modes init should do this
				var obg = all.find_ting(all.anim_a, "name", '__obg');
				if(obg){obg.is='rm';}	
				var obgr = all.find_ting(all.anim_a, "name", '__obgr');
				if(obgr){obgr.is='rm';}
				//all inits should have this line
				all.sstr=' '; all.sstr_t=20; all.s_s_t_r=[]; all.com_a=[];
				var anim = o.rect[o.op1]; //not sure if this one is necesary ?
				//a rect cursor on ctx1
				var rect_s = all.rect_s_new("__rect");
				rect_s.anim=anim; //rect_s.ctx=ctx1;
				rect_s.tx=window.innerWidth/2; rect_s.ty=window.innerHeight/2; 
				rect_s.is='rect';
				rect_s.se='cursor';//'' ?
				all.anim_a.push(rect_s);
				//a rect to run on ctx0
				var rect_sr = all.rect_s_new("__rect_r");
				rect_sr.anim=anim; rect_sr.ctx=ctx0;
				rect_sr.tx=window.innerWidth/2; rect_sr.ty=window.innerHeight/2; 
				rect_sr.is="f"; 
				all.anim_a.push(rect_sr);
			//horizontal line of cross
				var csx = all.rect_s_new("x__c"); 
				csx.is='rect'; //csx.ctx=ctx2; 
				csx.a=0.4; csx.inside="filled"; 
				csx.w=window.innerWidth; csx.h=2;
				csx.x=0; csx.y=(window.innerHeight/2)-1;
				all.anim_a.unshift(csx);
			//vertical line of cross
				var csy = all.rect_s_new("y__c"); 
				csy.is='rect'; //csy.ctx=ctx2;
				csy.a=0.4; csy.inside="filled";
				csy.w=2; csy.h=window.innerHeight;
				csy.x=(window.innerWidth/2)-1; csy.y=0;
				all.anim_a.unshift(csy);

//we now also need to remove all states from running edits on inner mode if any.. so look for states with names that end in '__r'
				var l = all.anim_a.length; 
				while(l--){
					var s = all.anim_a[l];
					var namend = s.name.substr(-3, 3);
					if(namend == '__r'){
						all.anim_a.splice(l,1);
					}
				}
				u.init=false;
				//return
			}


//a refference to selected frame of selected animation sel_f and current animation
			var anim = o.rect[o.op1];
			var f= anim[o.op2];
//refference for cursor state
			var s = all.find_ting(all.anim_a, "name", "__rect");
//refference to run test animation
			var sr = all.find_ting(all.anim_a, "name", "__rect_r");
//refference to horizontal cross line
			var csx = all.find_ting(all.anim_a, "name", "x__c");
//refference to vertical cross line
			var csy = all.find_ting(all.anim_a, "name", "y__c");
			
		//delta.signal , delta.value , delta.operation
			if(o.op3!=0){var delta = all.signify(o.op3);}
			if(delta){
				if(delta.signal=='exit'){
					o.inner_mode=true; o.edit_rect_mode = false; u.init = true;
					var obg = all.circle_s_new('__obg');
					obg.radius=900; obg.t=5;
					obg.r=0; obg.g=0; obg.b=0; obg.a=0;
					obg.inside="filled"; obg.is='circle';
					obg.x=Math.floor(window.innerWidth/2);
					obg.y=Math.floor(window.innerHeight/2);
					obg.ctx=ctx0;
					//if(o.inner_mode){obg.se='idle_pick';}
					//if(o.radiant_mode){obg.se='expand_colors';}
				//we need this now.. for now
					if(o.inner_mode){obg.se='expand';}

					all.anim_a.push(obg);
					
					//clear states
					s.is='rm'; sr.is='rm'; csx.is='rm'; csy.is='rm';
					//var feed_stream = all.find_ting(o.stream, "name", "feed0");
					//all.clear_stream(feed_stream);
					all.clear_stream(U.estream);//just use all.user.estream

					o.op1= 0; o.op2= 0; o.op5=0; o.op4=0;
					//remove the ghost frame
					if(sr.loop==false){anim.pop();}
					//remove empty array if user didnt even frame once
					if(anim.length==0){var rmf = o.rect.indexOf(anim); o.rect.splice(rmf,1);}			

					all.stream_a.push("Out of rect edit mode"); all.screen_log();
					o.op3=0;
					return
				}
				
				if(delta.signal=='empty'){
					s.u_d.push('inside','empty');//,'is','rect');
					s.is='c_rect'; 
					
					
				}
				
				if(delta.signal=='filled'){
					s.u_d.push('inside','filled');//,'is','rect');
					s.is='c_rect'; 
				}
				
	//cursor
				if(delta.signal=='left'||delta.signal=='right'||delta.signal=='up'||delta.signal=='down'){
					if(delta.signal=='left'){
						var u_p = 'x'; var u_v = s.x-delta.value;
					}
					if(delta.signal=='right'){
						var u_p = 'x'; var u_v = s.x+delta.value;
					}
					if(delta.signal=='up'){
						var u_p = 'y'; var u_v = s.y-delta.value;
					}
					if(delta.signal=='down'){
						var u_p = 'y'; var u_v = s.y+delta.value;
					}
					s.u_d.push(u_p, u_v);//,'is','rect');
					s.is='c_rect';  
					
				}//cursor
				
				
				if(delta.signal=='r'){
					if(delta.value>220){//check if number is higher than 220
						all.stream_a.push("Max input is 220."); all.screen_log();
					}else{
						s.u_d.push('r',delta.value);//,'is','rect');
						s.is='c_rect'; //s.t=1;
						//all.stream_a.push("Numbers are red rect."); all.screen_log();
					}
				}
				if(delta.signal=='g'){
					if(delta.signal>220){//check if number is higher than 220
						all.stream_a.push("Max input is 220."); all.screen_log();
					}else{
						s.u_d.push('g',delta.value);//,'is','rect');
						s.is='c_rect'; //s.t=1;
						//all.stream_a.push("Numbers are green rect."); all.screen_log();
					}
				}
				
				if(delta.signal=='b'){
					if(delta.signal>220){//check if number is higher than 220
						all.stream_a.push("Max input is 220."); all.screen_log();
					}else{
						s.u_d.push('b',delta.value);//,'is','rect');
						s.is="c_rect"; //s.t=1;
						//all.stream_a.push("Numbers are blue rect."); all.screen_log();
					}
				}
				
//rect transparency new system
				if(delta.signal=='a'){
					if(delta.value>10){
						all.stream_a.push("Maximum value input is 10.");
					}else{
						s.u_d.push('a',delta.value/10);//,'is','rect');
						s.is='c_rect'; 
						//if(alr=='a'){l0c[clo-1] = delta.value/10; var dont_p = true; break;}
						//all.stream_a.push("Transparency changed.");
					}
					all.screen_log();
				}
/*
				if(delta.signal=='a'){
					if(delta.operation=='+'){
						if(s.a>=1){}else{
							var na = s.a+(0.1);
						}
					}
					if(delta.operation=='-'){
						if(s.a<=0){}else{
							var na = s.a-(0.1);
						}
					}
					s.u_d.push('a',na,'is','rect');
					s.is='c_rect'; s.t=1;
				}//a
*/				
//rect size
				if(delta.signal=='width'||delta.signal=='height'){
					if(delta.signal=='width'){
						if(delta.operation=='+'){
							var u_p = 'w'; var u_v = (s.w+delta.value);
						}
						if(delta.operation=='-'){
							var u_p = 'w'; var u_v = (s.w-delta.value);
						}
					}
					if(delta.signal=='height'){
						if(delta.operation=='+'){
							var u_p = 'h'; var u_v = (s.h+delta.value);
						}
						if(delta.operation=='-'){
							var u_p = 'h'; var u_v = (s.h-delta.value);
						}
					}
					s.u_d.push(u_p,u_v);//,'is','rect');
					s.is='c_rect'; 
				}//size
				
//time
				if(delta.signal=='alltime'){
					var al = anim.length;
					while(al--){
						var af = anim[al];
						af.ft=delta.value; 
					}
					if(sr.loop){
						//update times
						sr.et = all.getetv(anim); sr.rt=sr.et; sr.is='c_rect';
					}
					all.stream_a.push("New beat"); all.screen_log();

				}
				
				if(delta.signal=='time'){
					f.ft=delta.value; 
					if(sr.loop){
						//update time
						sr.et = all.getetv(anim); sr.rt=sr.et; sr.is='c_rect';
					}
					all.stream_a.push("Numbers are time."); all.screen_log();
				}

//define rect
				if(delta.signal=='define'){
					//let t be 20 on default but dont overide if t already has a value
					if(f.ft==undefined){
						var ft=20;
					}else{
						var ft = f.ft;
					}

					f.x=s.x; f.y=s.y;  //f.f=o.op2;
					f.w=s.w; f.h=s.h; f.inside=s.inside;
					f.r=s.r; f.g=s.g; f.b=s.b; f.a=s.a;
					f.ft=ft;
					//update duration
					sr.et = all.getetv(anim);
					
					if(sr.loop){
						sr.rt=sr.et;
						sr.is='c_rect';
					}

					if(sr.loop==false){
						//only push new frame if loop is false
						if(anim[anim.length-1].inside){anim.push({});}
					}
					
					all.stream_a.push("Frame SAVED"); all.screen_log();
				}

				
				if(delta.signal=='back'){
					//its weird to go back when there is no back to go	
					if(anim[o.op2-1]){
						o.op2--;
						if(sr.loop){
							var f = anim[o.op2];
							s.u_d.push(
								'r',f.r,'g',f.g,'b',f.b,'a',f.a,'x',f.x,'y',f.y,
								'w',f.w,'h',f.h,'inside',f.inside//,'is','rect'
							);
							s.is='c_rect';
						}
					}else{
						all.stream_a.push("First frame"); all.screen_log();
					}
				}//back
				
				
				if(delta.signal=='next'){
					//moves on to the next frame... if there is one
					if(anim[o.op2+1]){
						o.op2++;
						if(sr.loop){
							var f = anim[o.op2];
							s.u_d.push(
								'r',f.r,'g',f.g,'b',f.b,'a',f.a,'x',f.x,'y',f.y,
								'w',f.w,'h',f.h,'inside',f.inside//,'is','rect'
							);
							s.is='c_rect';
						}
						
					}else{
						all.stream_a.push("Last frame"); all.screen_log();
					}
				}//next

//run simulation
				if(delta.signal=='run'){
					if(sr.loop){
						sr.u_d.push('loop',false,'rt',sr.et); sr.is='c_rect';
							
						var f = anim[o.op2];
						s.u_d.push(
							'r',f.r,'g',f.g,'b',f.b,'a',f.a,'x',f.x,'y',f.y,
							'w',f.w,'h',f.h,'inside',f.inside//,'is','rect'
						);
						s.is='c_rect';
						//when we out of loop we push ghost frame again
						anim.push({});
					}
					if(sr.loop==false){
						anim.pop();
						var sret = all.getetv(anim); 
						sr.anim=anim; sr.is='c_rect'; //sr.t=1; 
						sr.loop=true; sr.et=sret; sr.rt=sr.et;

					}
					
					
				}//run
				
				o.op3=0;
			}//delta

			o.op5++;
			if(o.op5==15){
				var s_0 = all.user.estream;
				s_0.r=o_r; s_0.g=o_g; s_0.b=o_b;
				o.op5=0;
			}
			
			//suport forms print
			csx.u_d.push('r',o_r,'g',o_g,'b',o_b,'is','rect'); csx.is='c_rect'; //csx.t=1;
			csy.u_d.push('r',o_r,'g',o_g,'b',o_b,'is','rect'); csy.is='c_rect'; //csy.t=1;
			s.u_d.push('is','rect');

			var update_sel = true;

			if(update_sel){//should be update_interface
				var f = anim[o.op2];

				var frames = anim.length; var f_n_a = []; //frame number array
				if(frames == 1){f_n_a.push("[0]");}
				if(frames == 2){
					if(o.op2==0){
						f_n_a.push("[0]",1);
					}
					if(o.op2==1){
						f_n_a.push(0,"[1]");
					}
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
			"Animation name: "+anim[0].name+" Frame: "+framed,
			"Run Time:"+sr.rt+" Duration: "+sr.et,
			"Frame  X:"+f.x+" Y:"+f.y+" W:"+f.w+" H:"+f.h+" Time:"+f.ft,
			"R:"+f.r+" G:"+f.g+" B:"+f.b+" A:"+f.a,
			"Cursor X:"+s.x+" Y:"+s.y+" W:"+s.w+" H:"+s.h,
			"R:"+s.r+" G:"+s.g+" B:"+s.b+" A:"+s.a
				);
				all.screen_log('estream'); //estream
				
			}

		}//edit rect mode



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
			var s = all.find_ting(all.anim_a, "name", "rect__sel");
			//a reff to test run ims
			var imr = all.find_ting(all.anim_a, "name", "img_r");
			//ref img selection
			var ims = all.find_ting(all.anim_a, "name", "img__sel");
			//bg
			var bg = all.find_ting(all.anim_a, "name", "img__bg");
			//refference to horizontal cross line
			var csx = all.find_ting(all.anim_a, "name", "x__c");
			//refference to vertical cross line
			var csy = all.find_ting(all.anim_a, "name", "y__c");
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
					//var feed_stream = all.find_ting(o.stream, "name", "feed0");
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
				var o_bg = all.find_ting(all.anim_a, "name", "__obg");
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
						var a_s = all.find_ting(all.anim_a, "name", a_a.name+"_"+a_a.on_a[0]);
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
					var playing = all.find_ting(all.anim_a, "r_name", r[0]);
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
					var aud = all.find_ting(o.osc, "name", r_a[0]);
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
							var s = all.find_ting(all.anim_a, "name", r_a[0]+"_"+rem_time+"_"+r_a[3]);
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


//STANCE HUSK checking for user on husk stance activity //ready
all.ghost_up = function(g){ //takes husk ghost structure
	if(uinit){
//from void to husk>> user succesfully got an impulse to the center . 'husk inwards'
//from orb to husk>> orb vessel got destroyed while user was inside. 'orb death'
		//var tt = all.transition(uinit);
		var tt = all.transition(uinit.transition, uinit.stancefrom);//, uinit.stanceto);
		if(tt=='all set'){uinit=false;}
		if(tt==undefined){return}
	}

//should be ghostship not pupil
	//this it the inside view of a ghosthip inhabited by user .. 
	var gs = all.find_ting(all.anim_a,'name','___ghost');
	if(gs.se=='idle'){gs.is='circle';}
}//ghost up


//STANCE USER on VOID checking for user on void stance activity. what about sounds. we should hear waves traveling, orbs singing
//husks echoes, etc..
all.void_up = function(){
	if(uinit){
//do we want to be able to leave orbs on different modes as well? not for now but it might be an interesting idea? idk
//from orb not radiant mode to void>> 'inner outwards'
//from radiant to void>> 'radiant outwards'
//from husk to void>>'husk outwards'
//from husk destroyed to void>>'husk death'
		//var tt = all.transition(uinit);
		var tt = all.transition(uinit.transition, uinit.stancefrom);//, uinit.stanceto);
		if(tt=='all set'){uinit=false;}
		if(tt==undefined){return}
	}
//idling in void

}//void up




//___________________	//VOID WAVES ------------------------------/////////-----------------///////////-................
/*
//Waves, Husks, Vessels.. for now. Lets get wild later. We are in the black sea, there is plenty of misteries to reveal.
////void envelope needs procedural graphics.. i have to work with canvas line drawing tools ...
//Void will be a littledifferent now since sound will be allowed and user can see streams from other orbs while on void as well
//also void creatures animations..
We may need these...
//return distance between two points on screen using x y values
all.get_dist = function(x1,x2,y1,y2)
ctx.isPointInPath() 
return true if the point is inside any of the shapes. if more than one shape in canvas, method will return true if point is inside anyo
context.getImageData(x, y, 1, 1).data; //grab 1 pixel. isnt that cute <3
*/
//this function needs to be run on animf directly on circle states with wave form. WAVE updates
//
//This is the heart of game mechanics, all interactions between prims are dictated by waves mechanics. Scripts simply
//add graphics and more commands for users to express strategies and add more complexity into the game, but escentially,
//waves create and destroy everything that can be proyected into the canvas. and also unify all memories into a single
//playground.
//Waves created by users carry creative and destructive qualities, but waves created by orbs have unique effects dictated
//by scripts.
all.wave_up = function(s,i){
//check for charge value . imp.se='pumping'; needs limits. create an effect on user when too many impulses at once ?
//while pumping charge goes up to strength level. once reach peak, chargeq decreases
//IMPULSE PUMP STRENGTH
//look for an user impulse  ...form wave, se pumping
	if(s.se=='pumping'){
		s.chargeq=s.chargeq+1; s.is='circle';
		if(s.a==0.6){s.a=0.1;}else{s.a=0.6;}
		if(s.chargeq>=s.charge){
			s.name=s.imp_date+'__impulse';
			s.se='inward';
			//low intensity impulse
			s.custom_a.push([0.6,"a"],[0.1, "a"],0,0,0,0,[1,"a",170,'b',50,'g',20,'r']);
			s.display='custom'; s.is='c_circle';
			//s.b=180; s.a=1; s.r=10; s.g=10; s.is='circle'; return
		}
	}
//INWARD the existance of an inward impulse decreases heat and pressure in the void.
//when charge is full, impulse releases. decrease radius using void pressure as refference. s.se='inward', form:'wave'
	if(s.se=='inward'){
		//this loop is used to compare with other waves
		var l0 = all.anim_a.length;
		while(l0--){
			var s0 = all.anim_a[l0];
			if(s0.name==s.name){continue}
//restructure this. first ask for common center, then ask for subevent, then ask for all same subevents but without common center
//leave it here, sleep.. tomorow you will know what to do. gn friend u.u
//waves sharing the same origin point can combine when they crush to create husks
			if(s0.x==s.x&&s0.y==s.y){ //common center
//HUSK CREATION
//husk creation animation should involve a bit of flashy purple. blue and red mix
				if(s0.se=='outward'){
					if(s.radius>=s0.radius){brs=s; srs=s0;}else{brs=s0; srs=s;}//big rad state. small rad state
			//if big radius less small radius <=10 and small radius less big rad <=10 then we good
					if(brs.radius-srs.radius<=10&&srs.radius-brs.radius<=10){
					//impulse wave becomes husk. lets just ignore charge and chargeq and that stuff for now
						s.custom_a=[]; s.t=-1;
						s.custom_a.push(0,[1,'a',40,'b',40,'g',40,'r']); //s.display='custom';

						s.husk_date = Date.now();
						s.form='husk'; s.intensity=1;
						//s.se='husk prim idle'; //we could se a transformation animation
						//s.se='solidify' //fading out purple effect on husk_up for later
						s.is='c_circle';
						//s.r=40; s.g=40; s.b=40; s.a=1; 
						s.inside='filled';
						s.limitrad=(s.radius*2)+300;//limitrad for now, adjust this later
						s.name=s.imp_date+'__husk';
						//create a husk structure to live on all.fleet_a
						var ghostship = {
							name:undefined, form:'husk',
							//we need husk date to locate prim but imp date?
							husk_date:s.husk_date, imp_date:s.imp_date,
							//displacement limits , limitdis
							limitdis:s.limitrad+300, limitrad:s.limitrad,
							primX:s.x , primY:s.y
						}
						all.fleet_a.push(ghostship);
					//the concentric impulse state becomes a husk prim state and
					//the radial pulse now needs an animation to depict waves asimilation into the husk
					//for now lets just rm radial
						s0.form='formless0'; s0.se='rip'; s0.is='rm'; s0.display=false;
						return
					}

				}//inward and outward waves sharing a common center. husk creation. 

			}else{//these operations run when both waves have NOT a common center

	//compare inwards with radials not sharing center . impulses should completely ignore pulses activities.
	//.. or maybe they could scan and provide some data. !!!!!!!!!!!!!!!!
			//needs testing... for now just ignore each other
/*
				if(s0.se=='outward'){ //radial
					var diss0 = all.get_dist(s.x,s0.x,s.y,s0.y); //distance between s and s0 wave centers
					var waver = s.radius+s0.radius;//wave reach
					if(waver>=diss0){
						return
					}

				}//comparing inwards with radials
*/

//IMPULSES ADDING ?
			//compare inwards with other inwards.. should completely ignore each other.. or maybe they could share data
/*
				if(s0.se=='inward'){
					var diss0 = all.get_dist(s.x,s0.x,s.y,s0.y); //distance between s and s0
					var waver = s.radius+s0.radius;//wave reach
					if(waver>=diss0){

					}
				}//comparing inwards with inwards
*/


			}//no common center


		}//comparing inwards as s to s0

	//wave out of charge . didnt interact with anything.				
	//if charge is not enough, this impulse never reaches center
		if(s.chargeq<=0){s.is='rm'; s.form='formless6'; s.display=false; return}


//IMPLODE  . the point where an inward impulse becomes an outward pulse
		if(s.radius<=1){
			s.se='implode';  s.radius = 1; s.outt=4;
			s.custom_a=[];
			s.custom_a.push([0.3,'a'],0,[1,'a',240,'b',240,'g',240,'r']); s.t=-1;
			return
		}
		

//if a wave has reached this point its because no other event from before has been triggered and so , it will continue moving
//use void sea pressure to determine wave speed.
//These operation need to run first...
		var p = voidn.pressure;
		if(p<0){
//if we have negative pressure, ask for pt(pressure time)
//... i think we dont need s.is circle here anymore because we are using customs
			var lerad = s.radius-1;
			//if(lerad<0){var lerad = 0;} //it can never be 0 or less because implode already checks that
			if(s.pt==0){s.radius=lerad; s.pt=p;} //s.is='circle';}//s.u_d.push('radius', lerad,'pt',p,'is', 'circle');}
			if(s.pt<0){s.pt=s.pt+1;} //s.is='circle';}//s.u_d.push('pt',(s.pt+1),'is','circle');}
			if(s.pt==undefined){s.pt=p;}// s.is='circle';}
		}
		if(p>0){
//if we have positive pressure, then we add speed of impulse so we add to radius diminishing .. this needs review
			if(s.radius-p<=0){var newrad = 0;}else{var newrad=s.radius-p;}
			s.radius=newrad; //s.is='circle';//s.u_d.push('radius',newrad,'is', 'circle');//,'charge',s.charge-1);
		}
	
		s.chargeq--;//=s.chargeq-1;
		return
	}//inward
	
//IMPLODE
//implode will now play a more important role. when a wave implodes, it searches for other waves imploding simultaneously
//and creates a portal. We can use this portal to transport orbs or to create other effects !!!!!!!!!!!!!!!!!!!!
//give implode status one frame so it can ask other prims for synch
//so imploding waves do have to loop and search for common center prims and their se..
	if(s.se=='implode'){
		s.outt--;	

		var l0 = all.anim_a.length;
		while(l0--){
			var s0 = all.anim_a[l0];
			if(s0.name==s.name){continue}
			if(s0.x==s.x&&s0.y==s.y){ //common center
				if(s0.form=='husk'){//comparing inwards with husks sharing center
//HUSK CONTROL
//An impulse aligned with a husk once reaches its center, it will allow user to enter the husk. once inside, only a prompt is available.
//The first line we type in, it becomes the husk name and transform it into an orb by granting it a memory. Now the radius becomes a vessel.
//The radius of the husk determines the size of the window... novermind this , we are using husk commands for now, .name: and .in:
					var ghostship = all.find_ting(all.fleet_a,'husk_date',s0.husk_date);
					stance=ghostship;
					uinit={transition:'husk inwards',stancefrom:undefined}
					s.form='formless3'; s.is='rm'; s.se='done'; s.display=false;
					return

				}//implode on husk

			}else{//here goes implode on no common center. charging husks go in here

//HUSK SHIELDS UP CHARGE
				if(s0.form=='husk'){		
					var diss0 = all.get_dist(s.x,s0.x,s.y,s0.y); //distance between s and s0
					if(diss0<=s0.radius){
		//an effect to depict husk charged. maybe similar to pulses intensity counter beats
						s0.intensity++;
						s0.custom_a=[]; s0.t=-1;
						s0.custom_a.push([0.4,"a"],[0.5,'a']);
						var irgb = s0.intensity;
						var ix = s0.intensity;
						while(ix--){s0.custom_a.push(0);}
						s0.custom_a.push([1,'a',26+irgb,'b',15+irgb,'g',26+irgb,'r']);
						s0.display='custom';

						s.is='rm'; s.se='done'; s.form='formless4'; s.display=false;//s0.form='formless5';s0.is='rm';
						return
					}

				}//implode and husks not charing center
			}

		}//loop check with s as implode event

		if(s.outt==0){
//at the end of implode phase when out time(outt) is zero, the wave becomes a radial pulse, and adds heat to the void as long as it exists.
//intensity determines animation displayed
//pop last and push a few zeroes to depict intensity. this would also increase alpha 1 time on screen, making
//the wave feel heavier acording to custom_a length
		//use ix if we want to add weight for some reason	
			//s.is='c_circle'; 
			var iid = Date.now(); //var sid = iid-1000000000;
			s.se='outward'; s.name=iid+'__radi'; s.radius=1; 
			s.intensity=1;//(s.intensity)*(-1); //intensity by default will be 1 for now
			s.custom_a=[]; s.t=-1;
			s.custom_a.push([0.3,"a"]);
			var ix = 0;//s.intensity;
			while(ix--){s.custom_a.push(0);}
			s.custom_a.push([1,'a',20,'b',20,'g',170+s.intensity,'r']);
			//s.display='custom';
			return
		}
	}



//PULSE
//use s.charge to expand as many times as there are charges left. use pressure value to substract here directly maybe.. s.se='outward'
	if(s.se=='outward'){
		//this loop is used to compare with other waves
		var l0 = all.anim_a.length;
		while(l0--){
			var s0 = all.anim_a[l0];
			if(s0.name==s.name){continue}
		//common center operations need to take priority	
			if(s0.x==s.x&&s0.y==s.y){ //common center
				//here are outwards comparing with common center prims
		//so maybe when radials get out orbs.... thats when they can carry orbs special effects.
		//the impulse imbues itself with the orb intent and now the radial can be molded into the orb will
				//unfinished...

			}else{//and these operations only apply to waves with different centers

//PULSES ADDING
				if(s0.se=='outward'){ //radial
					var diss0 = all.get_dist(s.x,s0.x,s.y,s0.y); //distance between s and s0
					var waver = s.radius+s0.radius;//waves reach sum
					if(waver>=diss0){
//both outwards are touching. but we only want radius to have effects on other prims. We need to be able to ignore prims that
//are already positioned inside the radius.
//if diss0 + s.radius < waver  .. before asking this, we need to know which pulse has greater radio
//.. if s.radius+10 > diss0 then s.radius is too far beyond already
//.... this would be far much more simple if waves advanced 1 radius at a time..
//but we also want fast waves..
						if(s.radius>=s0.radius){brs=s; srs=s0;}else{brs=s0; srs=s;}//big rad. small rad
						if(brs.radius+10>diss0){
							//then the wave is too far already		
						}else{
//we now add both waves intensities.
//the smaller radius disapears while the bigger radius one inherits all the intensity of both waves combined
							var balance = s.intensity+s0.intensity;
							//state growing and state srinking
							//if(s.radius>=s0.radius){var sg=s; var ss=s0;}else{var sg=s0; var ss=s;}
							brs.custom_a.pop();
							var ix = srs.intensity;//absorb s0
							while(ix--){brs.custom_a.push(0);}
							brs.custom_a.push([1,'a',20-balance,'b',20-balance,'g',170+balance,'r']); brs.t=-1;
							//
							brs.intensity=balance; //s.r=s.r+balance;
							brs.chargeq=brs.chargeq+srs.chargeq;
							//sg.is='c_circle';//s.se='powerup'; 
							//ss to dust
							//ss.se='to dust';
							//
							srs.is='rm'; srs.se='formless'; srs.display=false;//ss.se='absorbed';
							//continue
								//
							return
						}

						//return
					}
				}//outwards with outwards

			//so what about radials touching husks? here
			//compare outwards with husks not sharing center
				if(s0.form=='husk'){
					var diss0 = all.get_dist(s.x,s0.x,s.y,s0.y); //distance between s and s0
					var waver = s.radius+s0.radius;//wave reach
					if(waver>=diss0){//waves and husk are colliding
//husks can retain impulses intensities to become hardened so they can take hits from radials and not vanish inmediately
//so husks can now be used as spacial armor.   radials intensity peel off husks intensity layers and get  used up
//so a viable defense strat would be to build husks inside an at field surrounding the vessele soul (orb) and charge them up,
//so they can work as meat shields
						var balance = s0.intensity-s.intensity;
						if(balance<=0){
							s0.is='rm'; s0.se='formless'; s0.display=false;

							s.intensity=s.intensity-s0.intensity; 
							if(s.intensity<=0){
								s.is='rm'; s.se='formless'; s.display=false; return
							}
							s.custom_a=[]; s.t=-1;
							s.custom_a.push([0.3,"a"]);
							var irgb = s.intensity;
							var ix = s.intensity;
							while(ix--){s.custom_a.push(0);}
							s.custom_a.push([1,'a',20-irgb,'b',20-irgb,'g',170+irgb,'r']); 
							s.display='custom';
							return
						}else{
				//if some balance is left, it means the husk could take all the radial intensity and survive.
				//a good armor!
							s0.intensity=balance;
							s0.custom_a=[]; s0.t=-1;
							s0.custom_a.push([0.4,"a"],[0.5,'a']);
							var irgb = s0.intensity;
							var ix = s0.intensity;
							while(ix--){s0.custom_a.push(0);}
							s0.custom_a.push([1,'a',26+irgb,'b',15+irgb,'g',26+irgb,'r']);
							s0.display='custom';

							s.is='rm'; s.se='formless'; s.display=false; return
						}

					}
				}//outwards with husks		

			//and what about radials touching vessels
				//
				//


			}//no common center

		}//outwards comparing to others loop


	//same as impulses, pulses without charge are inmediately absorbed in the void
		if(s.chargeq<=0){
	//dont rm here, call a se, let se remove it in time
			s.is='rm'; s.form='formless7'; s.display=false; return
		} //add se='vabsorbed'
		//voidn.heat ? here ..?
		var p = voidn.pressure;
		var heat = 20-p;
		if(heat<=0){
			if(s.pt==0){s.radius=s.radius+1; s.pt=heat; s.chargeq=s.chargeq-1;} //s.is='circle'; }
			if(s.pt<0){s.pt=s.pt+1; s.chargeq=s.chargeq-1;}// s.is='circle';}
			if(s.pt==undefined){s.pt=heat; s.chargeq=s.chargeq-1;} //s.is='circle'; 
		}

		if(heat>0){ s.radius=s.radius+heat; s.chargeq=s.chargeq-1;} //return? s.is='circle';
	}//outwards 

	/*
//here comes se like dying, transforming etc ?
	if(s.se=='absorbed'){
		//s.is='c_'+s.s;
		s.custom_a.pop();
		if(s.custom_a.length==0){//time to become dust
			console.log('wth');
			//s.se='into dust';
			//s becomes a husk using its last form. Will take one more radial to blow away the ashes.
			//s.form='husk';
			//erase the vessel from fleet if any
			//but for now just remove
			s.is='rm'; s.display=false; s.se='none';
		}else{
			s.custom_a.pop();
			s.custom_a.push(1,'a',20,'r',20,'g',20,'b'); s.t=-1;//let it be grey for now
		}
	}
	*/

}//waves updates


//HUSK UPDATE
//se to refresh husk prims ... and inside view not ready
//Husks can be inhabited by void entities that create an impulse big enough to encapsulate its radius.
//all empty husks need this update... maybe this one could run on stance_a loop
all.husk_up = function(s, i){
//maybe they can have a timer depending on charge. and they could loose color gradually until dark grey. and just stay there as long
//as its not destroyed or named.
//We want husks to act as meat shields to protect other prims.
	//if(s.se=='idle'){//should be husk prim idle
	//	s.is='circle';
	//}
	//if(s.se=='husk prim idle'){//should be husk prim idle
	//	s.is='circle';
	//}
	//if(s.se=='husk prim changing'){//
	//	s.is='circle';
	//}
}//husk up


//VESSEL UPDATE
//se to refresh vessel prims and fields
all.vessel_up = function(s, i){
//if we want scripts to affect vessels using subevents, this is the place to write that logic
//updates on vessel animations and their fields. there is a specific se for each so we dont need to ask if vessel orb or vessel field
	if(s.se=='vp white idle'){
		//s.is='circle'; s.r=o_r; s.g=o_g; s.b=o_b; s.a=0.8;
	}
	if(s.se=='vp oes idle'){
		//s.is='circle'; s.r=o_r; s.g=o_g; s.b=o_b; s.a=0.8;
	}
	if(s.se=='atfield oes idle'){
		//s.is='circle'; s.r=o_r; s.g=o_g; s.b=o_b; s.a=0.8;
	}
	if(s.se=='atfield white idle'){
		//s.is='circle'; s.r=o_r; s.g=o_g; s.b=o_b; s.a=0.8;
	}
	if(s.se=='dormant'){

	}
}


//COMMANDS
//a function to check for commands to execute on next loop. uses all.com_a (commands array)
//All commands should be here. this is for our brain convenience.
//so modes could simply have default keys memorized. and keys should always
//run commands... yeah this is how it should be. so buttons for touches call commands
//need a command to clear evrything in case something messes up and i dont have access to browser console . .

all.c_com = function(c_o){ //the parameter we have is an orb or a husk or undefined
	if(all.com_a[0]){ //empty array lock
//use comav to make proper commands available
//since this is here at the start , we could even ignore commands structure.. if we wanted to
		if(c_o==undefined){
			var comav = 'void';
		}else{
			if(c_o.name==undefined){var comav = 'husk';}else{var comav = 'vessel';}
		}

//Commands are generally called by users and are executed on demand when conditions
//are met, but there may be some cases when some
//of these commands may be called by certain events. An encounter may put a 
//string on all.c_input or an external event may trigger
//the .commands macro for users to react to incoming attacks or proposals
//comands packet logic go first on updates and they self delete after executed so 
//they only run once.
//turn the command string into an array to contain every word between the dots and symbols
//so users words can specify subcommands and parameters to the commands
//first dot means its a command macro ,
//after second dot its an action for the macro to execute. most actions take parameters,
// ':' allows users to pass parameters
		var com = all.com_a[0];
		var str = com.str; 
		var mcp_a = str.split(":");
//mcp_a[0] is the macro and the actions separated by dots. the other elements in the array are user parameters
		var mc_a = mcp_a[0].split("."); 
//mc_a[0] is always empty, [1] is always the macro and [2], [3] and further are commands of the macro
//define orb in control once
		var u = U;//not even using this..

					    	////ALL////
//these commands are available for all stances
		
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

//HELP
//a function to print help/guide messages to orient users. List keywords to learn about different topics from Sunya.
//.help
//This command is available using the esc key as well. it needs a gesture..?
//so to simplify, the  .help command will always simply show keywords wich can be used as a subcommand on .help.[keyword]. Now each
//keyword will print information regarding a topic.
//destroy , forget , history
		if(mc_a[1]=="help"){
			if(mc_a[2]==undefined){
				all.stream_a.push(//
				'---------------------------------',
				'Press ENTER and type in:',
				'.help.[keywords]',
				'for more information on any specified [keywords] just bellow.',
				'user , mainstream ,scroll, void , commands  , type , shortcuts',
				'displace , wave , impulse , pulse , husk , vessel , orb',
				'stance , inner mode , edit mode, estream, radiant mode,',
				'edit , load , img , audio , txt , circle, rect, osc, signal, delta',
				'act , perform , reform , broadcasting, help',
				'touchscreen , button',
				'---------------------------------'
				);
			}else{
				if(mc_a[2]=='user'){//
					all.stream_a.push(
				'----------------------------',
				'Hello user. I see you want to learn about yourself.  Thats great.',
				'Welcome to Sunya. Am very glad you are here.',
				'Users are considered void entities since they are free',
				'to do as they please.',
				'Users dont have hit points nor are restrained by',
				'rules except for the ones they do choose to follow.',
				'You are probably alone here in this place, but who am i to tell, right?--',
				//'Type in:',
				//'.name:[new name] if you wish to choose a user name so you can distinguish',
				//'from other void entities. You can only change your user name while not broadcasting.',
				//'Its just a name. Dont make a big fuzz about it--',
				'---entry incomplete---',
				'----------------------------'
					);
				}

				if(mc_a[2]=='mainstream'){//
					all.stream_a.push(
				'-------------------------------------------------------------------------',
				'Mainstream prints the words you type and send using your ENTER input box.',
				'Mainstream also shows all kinds of useful messages when you do tings.',
				'Its a public chat for the void. You can use it as a chat if you want.',
				'Mainstream is not visible anymore when user is controling an orb while on radiant mode.',
				'Type in:',
				'.mainstream to print user mainstream properties.',
				'You can type in:',
				'.mainstream.[property]:[new value]  to change mainstream properties',
				'Color settings use rgba values, red, green, blue and alpha. These all work between 0 to 255',
				'except for alpha. "a" can go from 1 to 10',
				'Use Arrows buttons on your keyboard to manage your stream. Use Up and Down to scroll trough',
				'the stream history. The Left Arrow turns off mainstream visibility. Use Right Arrow to reatach',
				'the stream and follow the last input. Try it out.',
				'Am sorry you are probly bored already... but these are the basics.. I promise it will get fun--',
				'---entry incomplete---',
				'--------------------------------------------------------------------------'
					);
				}

				if(mc_a[2]=='void'){//
					all.stream_a.push(
				'When users are not in direct control of a memory orb, they are siting in the void.',
				//'While on void, users can press ENTER and type in words, which will appear on screen.',
				//'This is the "mainstream".',
				//'A placeholder for words coming from void entities.',
				'Users are also considered void entities.. did i said that already?',
				'... please forgive me i am feeling a bit distracted today.',
				'You can move your screen trough the void using the .displace command',
				'---entry incomplete---'
					);
				}

				if(mc_a[2]=='commands'){//
					all.stream_a.push(
				'____________________________________________________________________________',
				'Commands! Yes! We have a command prompt on Sunya, with quite a few commands at your....',
				'command!',
				'Commands sinthax on sunya is generally structured like this;',
				'.command.subcommand:parameter',
				'All commands start with a dot! Users can type in commands on the input box by pressing ENTER',
				'Different commands are available depending on user stance and orb mode.',
				'Some commands can go like;',
				'.command:parameter',
				'Others may take no parameters;',
				'.command.subcommand',
				'Commands can be easily linked to keys combinations using the shortcut system.',
				'Commands can be asigned to buttons for touchscreen users as well--',
				'_____________________________________________________________________________'
					);
				}

				if(mc_a[2]=='displace'){
					all.stream_a.push(
				'----------------------------------------------------------------------------',
				'We use Arrows to manage stream , to move trough the void, there is a command!',
				'.displace.left:[number of pixels]',
				'.displace.right:[number of pixels]',
				'.displace.up:[number of pixels]',
				'.displace.down:[number of pixels]',
				//'To travel to a specific point use:',
				//'.displace.grid:[x]:[y]',
				'Beware of going too far into the void or you might get disoriented...',
				'Unless you go straight into one direction only..',
				'Its hard to tell where you siting if you havent created any memory yet.',
				'In Sunya, we use Waves to create memories, and to destroy them as well.',
				'.. not all memories need to stay alive in here for ever--',
				'----entry incomplete---',
				'-----------------------------------------------------------------------------'
					);
				}
			/*
				if(mc_a[2]=='speed'){
					all.stream_a.push(
				'_____________________________________________________________________________',
				'Change the speed at wich you want to be able to displace trough the void.',
				'This command can only run when user is on Void.',
				'.user.speed:[a number]',
				'----entry incomplete---',
				'_____________________________________________________________________________'
					);
				}
			*/

				if(mc_a[2]=='orb'){
					all.stream_a.push(
				'________________________________________________________________________________________',
				'Orbs are conveniently structured js objects which can be described as; vessels for memories.',
				'Orbs can be organized to hold images, animations, texts, graphic effects and even',
				'instructions to perform, using all these things in all kinds of ways.',
				'Users can create orbs using commands.',
				'This command is available only when user is on void stance.',
				'.orb:[new orb name]',
				'Creates a default memory vessel (orb) with any name. One atempt.',
				'Watch out for letting go memories with no names...they might get lost in the void..',
				'And they might come back...',
				'.orb.in:[orb in json]',
				'Accepts an orb in json notation to be imported back into Sunya',
				'.orb.[orb name].out', 
				'Sends a json text containning orb data structure to input box so user can copy and paste',
				'somewhere else... like in some text editor.',
				'.orb.[orb name].control',
				'User tries to take control of named orb. One atempt.',
				'Some users have tried many times...',
				'Sending a control wave may have different effects on different orbs.',
				'.orb.[orb name].history.clear',
				'.orb.[orb name].destroy',
				'----entry incomplete---',
				'_________________________________________________________________________________________'
					);
				}




				if(mc_a[2]=='button'){
					all.stream_a.push(
				'_____________________________',
				'.button',
				'Prints all avaiable buttons on current mode and stance at any moment.',
				'.button:[new button name]',
				'Creates a button with its very own name.',
				'We can access a button by its name and change its properties like this;',
				'.button.[button name].[property]:[new value]',
				'---entry incomplete---',
				'_____________________________'
					);
				}
				if(mc_a[2]=='scroll'){
					all.stream_a.push(
				'_____________________________________________________________________________',
				'Use arrows on keyboard to scroll or hide the stream.',
				'Left arrow shuts down the stream, Right arrow scrolls to last message.',
				'Up and Down shows stream history.',
				'_____________________________________________________________________________'
					);
				}
				if(mc_a[2]=='type'){
					all.stream_a.push(
				'____________________________________________________________________________________',
				'Sunya is always waiting for you to type in something.',
				'Keys and numbers are maped in a special way. You can clear up the keys on the screen using',
				'BACKSPACE',
				'You can press Enter to type in normally as well, in a normal html input box.',
				'Press Enter again to send your text to the mainstream. Or ESC if you want to go away in silence.',
				'While on input box, you can press ESC to exit without sending the text.',
				'Only void entities can see what you stream while on void stance. If you choose to broadcast',
				'other entities online might see your stream of words as well.',
				'.type:[text]',
				'A special command that only takes one parameter which is a string that can',
				'contain "." and ":" without having an effect on the instruction. We use it like this;',
				'.type:[a string to appear on input] and gets instant focus. Try it out!',
				'This command is useful to create specific shortcuts. Gotta go fast!',
				'This command also is available from any stance and mode.',
				'Type in .help.shortcuts to learn about the command shortcuts system.',
				'____________________________________________________________________________________'
					);
				}
				if(mc_a[2]=='shortcuts'){
					all.stream_a.push(
				'___________________________________________________________________________________________________',
				'Type in some key combination and then use the SPACEBAR key to freeze it.',
				'You can now press ENTER to go into input box and type in a command and press ENTER again',
				'Your key combination is now linked to the command.',
				'Now press the key combination again. Congratulations, you just used a shorcut.',
				'So keys can run commands. No need to type in the whole command ever again... unless--',
				'You can do; .type:Something you want to see on input box instantly,', 
				'and link that to a key. Have fun.',
				'To release a previously linked key, just press SPACEBAR , and then enter the key combination.',
				'You can also manage your buttons using the .button command macro. .help.button for more..',
				'____________________________________________________________________________________________________'
					);
				}
				if(mc_a[2]=='inner mode'){
					all.stream_a.push(
				'_______________________________________________________________________________________________',
				'Orbs on idle enter inner mode. When users take control , they now have access to orbs edit commands.',
				'Orbs can load images and audio files into the browser to be used on Sunya.',
				'All edit commands are available from inner mode; .img , .audio, .txt, .circle, .rect, .osc... ',
				'There is also; .perform and .signal',
				'________________________________________________________________________________________________'
					);
				}

				if(mc_a[2]=='edit'){
					all.stream_a.push(
				'_________________________________________________________________________________________',
				'When user is on inner mode(orb stance), commands to enter edit modes are available.',
				'Graphic animations can be created on Sunya using Canvas API.',
				'There are 6 edit modes to work with on Sunya',
				'img editor; Create animations using image files loaded directly from users machine.',
				'audio editor; Create and edit audio snipets using an audio file loaded from local machine.',
				'circle editor; Create animations using circles.', 
				'rect editor; Create animations using rectangles.',
				'txt editor; Create txt snipets to be displayed in any way. We can create act scripts as well.', 
				'osc editor; Create customized oscillators using WEB Audio API',
				'All editor use the command .signal to perform different tasks. Type in .help.signal to learn',
				'about editors controls.',
				'_________________________________________________________________________________________'
					);
				}
				if(mc_a[2]=='signal'){
					all.stream_a.push(
				'______________________________________________________________________________________',
				'.signal:[delta]',
				'Use delta to call different operations on orb modes like this; .signal:[delta]',
				'delta is always a string of text which can be a single word or a word and a number',
				'separated by "_". We can also use "+"  or "-" after "_" to add or subtract a value.',
				'Example 1;',
				'To displace img editor cursor in a specific direction a certain number of pixels, we run;',
				'.signal:left_20',
				'Example 2;',
				'To decrease height of a rectangle on rect editor by 10 pixels run;',
				'.signal:height_-10',
				'Every editor has their own delta operations to work with.',
				'Type in .help.delta to see a list of all different delta operations.',
				'______________________________________________________________________________________'
					);
				}

				if(mc_a[2]=='delta'){
					all.stream_a.push(
				'______________________________________________________________________________________',
				'Type in .help.[delta] for detailed explanation on each delta operation down bellow.',
				'exit, next, back, left, right, up, down,',
				'gain, start time, end time, hz up, hz down,',
				'sine, square, saw, triangle, e, size, r, g, b, a,',
				'change, remove, sleft, sright, sup, sdown, width, height, center,',
				'empty, filled, radius, define, capture, run, alltime, time,',
				'custom, beat',
				'______________________________________________________________________________________'
					);
				}

				if(mc_a[2]=='exit'){
					all.stream_a.push(
				'______________________________________________________________________________',
				'.signal:exit',
				'If user is on inner mode, this command will take user to the void.',
				'This command will also allow user to exit from all edit modes into inner mode,',
				'while saving all changes done on the animation.',
				'______________________________________________________________________________'
					);
				}
				if(mc_a[2]=='next'||mc_a[2]=='back'){
					all.stream_a.push(
				'______________________________________________________________________________',
				'.signal:next/back',
				'In osc editor, we use "next" and "back" to change osc edit stored on current orb.',
				'On txt editor, "next" and "back" lets us move between txt lines to work on.',
				'circle, rect and img editors use "next" and "back" to move between the animation frames.',
				'______________________________________________________________________________'
					);
				}
				if(mc_a[2]=='left'||mc_a[2]=='right'||mc_a[2]=='up'||mc_a[2]=='down'){
					all.stream_a.push(
				'______________________________________________________________________________',
				
				'______________________________________________________________________________'
					);
				}
				if(mc_a[2]=='load'){
					all.stream_a.push(
				'______________________________________________________________________________________',
				'While in control of an orb, users can run commands to load images and audio files into',
				'the browser, for orbs to organize and create animations with them.',
				'.load.img',
				'Allows user to select a .png image file from local machine memory to be loaded',
				'into Sunya',
				'.load.audio',
				'Allows user to select an .mp3 audio file from local machine memory to be',
				'loaded into Sunya',
				'______________________________________________________________________________________'
					);
				}
				if(mc_a[2]=='img'){
					all.stream_a.push(
				'____________________________________________________',
				'.img',
				'Prints out informtation of current img edits on this orb.',
				'.img:[img edit name]',
				'Modifies or creates an image edit. Starts img editor.',
				'.img.[img edit name].delete',
				'Deletes specified img edit only.',
				'.img.purge',
				'Deletes all previously stored img edits on this orb.',
				'____________________________________________________'
					);
				}
				if(mc_a[2]=='audio'){
					all.stream_a.push(
				'_______________________________________________________',
				'.audio:[audio edit name]',
				'Modifies or creates an audio edit. Starts audio editor.',
				'.audio.[audio edit name].delete',
				'Deletes specified audio edit only.',
				'.audio.purge',
				'Deletes all previously stored audio edits on this orb.',
				'.audio.list',
				'Prints out a list of current audio edits on this orb.',
				'________________________________________________________'
					);
				}
				if(mc_a[2]=='txt'){
					all.stream_a.push(
				'_______________________________________________________',
				'.txt:[txt edit name]',
				'Modifies or creates a txt edit. Starts txt editor.',
				'.txt.[txt edit name].delete',
				'Deletes specified txt edit.',
				'.txt.purge',
				'Deletes all previously stored txt edits on this orb.',
				'.txt.list',
				'Prints out a list of current txt edits on this orb.',
				'________________________________________________________'
					);
				}
				if(mc_a[2]=='circle'){
					all.stream_a.push(
				'_______________________________________________________',
				'Type in  .circle  to print information about all circle edits.',
				'.circle:[circle edit name]',
				'Modifies or creates a circle edit. Starts circle editor.',
				'.circle.[circle edit name].delete',
				'Deletes specified circle edit.',
				'.circle.[circle edit name].run',
				'Run the edit on loop while user is on inner mode.',
				'.circle.purge',
				'Deletes all previously stored circle edits on this orb.',
				'________________________________________________________'
					);
				}
				if(mc_a[2]=='rect'){
					all.stream_a.push(
				'_______________________________________________________',
				'Type in  .rect  to print information about all rect edits.',
				'.rect:[rect edit name]',
				'Modifies or creates a rect edit. Starts rect editor.',
				'.rect.[rect edit name].delete',
				'Deletes specified rect edit.',
				'.rect.[rect edit name].run',
				'Run the edit on loop while user is on inner mode.',
				'.rect.purge',
				'Deletes all previously stored rect edits on this orb.',
				'________________________________________________________'
					);
				}
				if(mc_a[2]=='perform'){
					all.stream_a.push(
				'_______________________________________________________',
				'Orbs can enter in radiant mode to perform acts by executing scripts',
				'While on inner mode, user can type in:',
				'.perform',
				'While on void, the command to make an orb enter into radiant mode is:',
				'.orb.[name of orb].perform',
				'-----entry incomplete----',
				'________________________________________________________'
					);
				}
				if(mc_a[2]=='osc'){
					all.stream_a.push(
				'_______________________________________________________',
				'.osc:[osc edit name]',
				'Modifies or creates a osc edit. Starts osc editor.',
				'.osc.[osc edit name].delete',
				'Deletes specified osc edit.',
				'.osc.purge',
				'Deletes all previously stored osc edits on this orb.',
				'.osc.list',
				'Prints out a list of current osc edits on this orb.',
				'________________________________________________________'
					);
				}
			}

			all.screen_log();
		}//.help
		
//DISPLACE
//commands to move trough the grid
//.. but husk stance has no memory..  no matter
//we wont be using window scroll at all now. displacement will only translate the grid so user can see different positions
//of the void sea.
//radiants will now be able to move trough the void but using scripts not commands. 
//we want to be able to displace on void, and also while inside a husk, and also while inside a vessel on any mode.
//because now husks can be explored and vessel range limitrad can also go beyond user size screen. Editor will consider limitrad
//size for animations, the larger the radius of the vessel, the more space we have to create its animations.
//While in control of a vessel however we should not be able to displace far beyond the vessel limitrad, same goes with ghostships.
		//
//so either we update translate position to all states or we simply add user position when drawing.. obviously last one
		//.displace.grid:x:y
		if(mc_a[1]=='displace'){
			//comav 'void' 'husk' 'vessel'  c_o = stance for now
			//stances and voidn should have the limits already. dont make limits for void just yet...
	//disabling limits for now !!!!!!!!!!!!!!!!!!!!!! 			!!!!!!!!!!!!!!!!!
			if(comav=='husk'||comav=='vessel'){var testlim = false;} //true



//animations to displace left and right could be:
//a white noise like vertical line in the middle of the screen for a few milisecs. together with soothing white noise sound
//up and down is the same but now the line is horizontal. the line might be displacing. nothing else is visible for some milisecs
			//.displace.left:quantity
			if(mc_a[2]=='left'){
//displacing to the left means we are moving the grid to the right!!!!! this is fucking shit!!
				var disx = parseFloat(mcp_a[1]);//mcp_a[1]//Math.floor(window.innerWidth);
				if(testlim){
//so we have c_o.primX and we have disx and we have c_o.limitdis
//the distance between U.x and c_o.primX cannot be higher than c_o.limitdis  omfg why is this so confusing
//.... unbeliveballe
//ok first get dist between U.x and c_o.primX U_P, now get dist between target X and primx T_P, and you already have limit
//3 distances. current , target, and limit.
//if target > limit
//dif = limit - current
// diff + current = limit
					//it works!
					var target =U.x+disx;
					var T_P = all.get_dist(target,c_o.primX,0,0);
					var U_P = all.get_dist(U.x,c_o.primX,0,0);
					if(T_P>=c_o.limitdis){
						var newdisx = c_o.limitdis-U_P;
					}else{var newdisx = disx;}
				}else{var newdisx = disx;}//no need to test just displace
				ctx0.translate(newdisx,0);
				U.x = U.x+newdisx;
			}

			//.displace.right:quantity
			if(mc_a[2]=='right'){
				var disx = parseFloat(mcp_a[1]);//mcp_a[1];//Math.floor(window.innerWidth);
				if(testlim){
				//limit is not centered.. am leaving this because it kinda works but no idea how
					var target =U.x-disx;
					var T_P = all.get_dist(target,c_o.primX,0,0);
					var U_P = all.get_dist(U.x-window.innerWidth,c_o.primX,0,0);
					if(T_P>=c_o.limitdis){
						var newdisx = (c_o.limitdis-U_P)+window.innerWidth;
					}else{var newdisx = disx;}
				}else{var newdisx = disx;}//no need to test just displace
				ctx0.translate(-newdisx,0);
				U.x = U.x-newdisx;
			}

			//.displace.up:quantity
			if(mc_a[2]=='up'){
				var disy = parseFloat(mcp_a[1]);//mcp_a[1];//Math.floor(window.innerHeight);
				if(testlim){
//if target > limit
//dif = limit - current
// diff + current = limit
					//works
					var target =U.y+disy;
					var T_P = all.get_dist(0,0,target,c_o.primY);
					var U_P = all.get_dist(0,0,U.y,c_o.primY);
					if(T_P>=c_o.limitdis){
						var newdisy = c_o.limitdis-U_P;
					}else{var newdisy = disy;}
				}else{var newdisy = disy;}//no need to test just displace
				ctx0.translate(0,newdisy);
				U.y = U.y+newdisy;
				//
				//ctx0.translate(0,disy);
				//U.y = U.y+disy;
			}

			//.displace.down:quantity
			if(mc_a[2]=='down'){
				var disy = parseFloat(mcp_a[1]);
				if(testlim){
					var target =U.y-disy;
					var T_P = all.get_dist(0,0,target,c_o.primY);
					var U_P = all.get_dist(0,0,U.y-window.innerHeight,c_o.primY);
					if(T_P>=c_o.limitdis){
						var newdisy = (c_o.limitdis-U_P)+window.innerHeight;
					}else{var newdisy = disy;}
				}else{var newdisy = disy;}
				ctx0.translate(0,-newdisy);
				U.y = U.y-newdisy;
				//ctx0.translate(0,-disy);
				//U.y = U.y-disy;
			}

/*
//so confusing.... the four directions are working just fine already. Maybe i l come back here later..
			if(mc_a[2]=='grid'){
				var xnum = parseFloat(mcp_a[1]); var ynum = parseFloat(mcp_a[2]);
				ctx0.translate((-U.x),(-U.y));//this should put user on 0
//ok so maybe we want NlimitX to be a fixed distance number , from center of structure to radius and a bit more.
//so its limitrad+300 for now >> limitdis , structure has it. so maybe we also want to ask structure for prim coordinates as well
				//c_o.primX c_o.primY
//so we calculate distance between prim and new coordinate and here we use limitdis to determine is its too far away
//so then we can adjust how far the displace command will take use. we have to consider screen size on calculations
//var dist = all.get_dist(x1,x2,y1,y2); ... nevermind one sec

				ctx0.translate(xnum,ynum);
				U.x=xnum; U.y=ynum;//and we update position again
			}			
*/

			//make sctream adjustments to match new user position.
			all.adjust_stream(U.mainstream); //

		}//displace on void grid


	
//vessel and void exclusive commands
		if(comav=='vessel'||comav=='void'){
//TYPE
//.type is a special command that only takes one parameter which is a string that can contain "." and ":" without having an effect
//on the instruction. .type:a string to appear on input and instant focus
//This command is useful to create specific shortkeys
			if(mc_a[1]=="type"){
				var ta = str.split(":"); ta.shift(); 
				chat_in.style.display="inLine";	chat_in.value = ta.join(":");
				all.chat_on = true; chat_in.focus();
			
			}//.type

//MAINSTREAM
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
				'Use .mainstream.[property]:[new value] to change a property.',
				'r: '+us.r, 'g: '+us.g, 'b: '+us.b, 'a: '+us.a,
				'x: '+us.x, 'y: '+us.y, 'limit: '+us.limit,
				'size: '+us.size, 'font: '+us.font, 'spacer: '+us.spacer,
				'___________________________________'
						);
						all.screen_log();
					}else{
						//a somehow funky command to clear history
						if(mc_a[2]=='clear'){us.history=[]; var done = true;}
					
						if(done){}else{//its a parameter change command..
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
					if(c_o.inner_mode){var mbox= c_o.inner_ks;}
					if(c_o.radiant_mode){var mbox= c_o.radiant_ks;}
					if(c_o.edit_img_mode){var mbox= c_o.img_ks;}
					if(c_o.edit_audio_mode){var mbox= c_o.audio_ks;}
					if(c_o.edit_txt_mode){var mbox= c_o.txt_ks;}
					if(c_o.edit_circle_mode){var mbox= c_o.circle_ks;}
					if(c_o.edit_rect_mode){var mbox= c_o.rect_ks;}
					if(c_o.edit_osc_mode){var mbox= c_o.osc_ks;}
					if(c_o.vox_mode){var mbox= c_o.vox_ks;}

					//add others//
				}
				//ehhhhhhh we got a problem here.
				if(c_o==undefined){var mbox= U.key_s;}
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
					var btalr = all.find_ting(mbox, "name", mc_a[2]);
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


//void stance commands . 			 /////VOID/////
//these should mostly be easy to asign keys
//VOID exclusive commands

		if(comav=='void'){

//WAVE
//A command to manually manifest a wave in the void.
//x and y positions represent the absolute positions in the void sea so it takes a bit to learn how to create precise impulses.
//user should first orient itself before creating waves in the void.
//.impulse:x:y:radius:strength
			if(mc_a[1]=='wave'){
				//var ux = all.user.x; var uy = all.user.y;
				var impid = Date.now();
				var imp = all.circle_s_new(impid+'__pump');//.. should be __pump
				imp.creator = U.name;
				imp.imp_date = impid;
				//imp.tx=Math.floor(window.innerWidth/2); imp.ty=Math.floor(window.innerHeight/2);
				//imp.ctx=ctx0; 
				imp.is='circle'; 

				var xnum = parseFloat(mcp_a[1]); var ynum = parseFloat(mcp_a[2]); var radnum = parseFloat(mcp_a[3]);
				imp.x=xnum; imp.y=ynum; imp.radius=radnum;
					//
				var chargenum = parseFloat(mcp_a[4]);
				imp.charge=chargenum; 
				imp.chargeq = 0;
				//imp.intensity = -1;
				imp.se='pumping';
				imp.form='wave';

				all.anim_a.push(imp);
			}//impulse

//USER
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
				'___________________________________',
				'Use .user.[property]:[new value] to change a property.',
				'name: '+U.name,
				'birthday: '+U.birthday,
				'speed: '+U.speed,
				'x: ',+U.x,
				'y: ',+U.y,
				'___________________________________'
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
					//var orb = all.find_ting(all.up_objs, 'name', mc_a[2]);
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
							//var o_in_u = all.find_ting(all.user.orbs, 'name', mc_a[2]);
							var orb = all.find_ting(all.fleet_a, 'name', mc_a[2]);
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
								'birthday: '+orb.vessel_date,
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
							var orb = all.find_ting(all.fleet_a, 'name', mc_a[2]);
				//but first empty current img and audio files... problem here is i need to put these back again lol
							//orb.current_img_file={}
							//orb.current_audio_file={}
							
							var txt = JSON.stringify(orb);
							all.chat_on = true; chat_in.focus();
							chat_in.style.display="inLine";
							chat_in.value = txt;
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
							var orb = all.find_ting(all.fleet_a, 'name', mc_a[2]);
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
								var orb = all.find_ting(all.fleet_a, 'name', mc_a[2]);
								orb.stream.history = [];
				all.stream_a.push('...'+mc_a[2]+' stream history has vanished for ever.'); all.screen_log();
							}
							break


						//.orb.[orb name].destroy	To delete whole orb at once?
						//this needs a really cool animation.
						case 'destroy':
							var orb = all.find_ting(all.fleet_a, 'name', mc_a[2]);
							var orbi = all.fleet_a.indexOf(orb);
							all.fleet_a.splice(orbi,1);
				all.stream_a.push('...'+mc_a[2]+' is just a string of words now.'); all.screen_log();
							break
						//.orb.[orb name].perform
						//this needs a really cool animation as well
						case 'perform':
							var orb = all.find_ting(all.fleet_a, 'name', mc_a[2]);
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
						var orb = all.find_ting(all.fleet_a, 'name', mc_a[2]);
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




				//a command to place an Orb into a node core to become a scene orb ..? deprecat

				//a command to send an Orb to another user? .. hmm maybe not... this doesnt sound right.
				//orbs probly need to be a unique part of users and void entities.. we can already share so much, sharing
				//whole orbs simply doesnt sound right nor neccesary.. it actually sounds wrong lol
				//a command to share animations between owned Orbs . .? This could be viable
				//orbs learning from each other sounds good.
				
				
			}//.orb


		}//void commands


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
			if(mc_a[1]=='signal'){
				c_o.op3=mcp_a[1];
			}
/*
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
			if(mc_a[1]=="vox"){
				//if(mc_a[2]=="in"){
					//all.user.stance="vox.in";
				c_orb.inner_mode=false; c_orb.vox_mode=true; all.user.init = true;
				all.stream_a.push("vox.in mode on.."); all.screen_log();
				//}
				//if(mc_a[2]=="out"){
				//	all.user.stance="vox.out";
				//}
			}
*/

//INNER mode COMMANDS
			if(c_o.inner_mode){
				
//a command to load an image and a command to load an audio into the current
//inhabited Orb. currently only png and mp3 formats are available
//Orbs can only have 1 image and 1 audio loaded at any time... for now
//COMMANDS UPLOAD IMG AUDIO EVENT
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

/*
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
						var l = c_orb.audio.length;
						while(l--){
							var a = c_orb.audio[l];
							if(a.name==mc_a[2]){
								if(mc_a[3]=='out'){
									var txt = JSON.stringify(a);
									all.chat_on = true; chat_in.focus();
									chat_in.style.display="inLine";
									chat_in.value = txt;
									break
								}
								if(mc_a[3]=='delete'){
									var index = c_orb.audio.indexOf(a);
									c_orb.audio.splice(index,1);
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
					if(mcp_a[1]!=undefined&&c_orb.audio_access.length==undefined){
						var noaccess = true;
					}
					if(mcp_a[1]!=undefined&&c_orb.audio_access.length!=undefined){
						var proceed = true;
					}
					if(purge){
						c_orb.audio= [];
						all.stream_a.push('audio edits container has been cleared..');
						all.screen_log();
					}
					if(list){
					//list audio anims and a brief description, which event is tied to etc
						var l = c_orb.audio.length;
						while(l--){
							//var aud = c_orb.audio[l];
							//all.stream_a.push(aud.name+" .. audio snip... ");
							//all.screen_log();
						}			
					}
					if(noname){
						all.stream_a.push("Please asign a name for this audio edit..");
						all.screen_log();
					}
					if(noaccess){
						all.stream_a.push("Cant animate audio without an audio file loaded");
						all.screen_log();
					}
					if(proceed){
						//var name_ok = all.c_unl(mcp_a[1],'audio');
						//if(name_ok){}else{}
						c_orb.inner_mode=false; c_orb.edit_audio_mode = true;  all.user.init = true;
		//this works because audio anim is just an object not an array
						var named_aud = all.find_ting(c_orb.audio, "name", mcp_a[1]);
						if(named_aud){
							c_orb.op1 = c_orb.audio.indexOf(named_aud); 
							all.stream_a.push("Recalling...   " + mcp_a[1]);
							all.screen_log();
						}else{	
							var a = {};
							a.name = mcp_a[1];
							a.audio_file_name= c_orb.current_audio_file.name;
							a.gain=0.07; a.fade=0.3;
							a.start = 0; a.end = c_orb.audio_access.duration;
							c_orb.audio.push(a);
							
							c_orb.op1 = c_orb.audio.length-1;
							all.stream_a.push("Editing...audio..  " +mcp_a[1]); all.screen_log();
						}
					}
				}//audio
*/

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
 				var sr = all.find_ting(all.anim_a, 'name', a[0].name+c_o.name+"__r");
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
							var sr = all.find_ting(all.anim_a, 'name', a[0].name+"__r");
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
 							var sr = all.find_ting(all.anim_a, 'name', a[0].name+"__r");
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

//TXT , EDIT
//.txt
//.txt:[txt name]
//.txt.[txt name].delete
//.txt.[txt name].run
//.txt.purge
//.txt.name:[new name]
//maybe a command to change edits names would be nice
//and a command to clone text.. or maybe unnecesary..
//also, its hard to tell on which txt edit we are working when more than one is on screen
				if(mc_a[1]=="txt"){
					if(mc_a[2]==undefined&&mcp_a[1]==undefined){var list = true;}
					if(mc_a[2]!=undefined){
						//.txt.purge
						if(mc_a[2]=="purge"){mcp_a[1]=undefined; var purge = true;}
						//if(mc_a[2]=="name"){mcp_a[1]!=undefined; var rename = true;}
						//search for name match..
						var l = c_o.txt.length;
						while(l--){
							var a = c_o.txt[l];
							if(a){
								if(a[0].name==mc_a[2]){
									if(mc_a[3]=='out'){
										var txt = JSON.stringify(a);
										all.chat_on = true; chat_in.focus();
										chat_in.style.display="inLine";
										chat_in.value = txt;
									}
									if(mc_a[3]=='delete'){
										var index = c_o.txt.indexOf(a);
										c_o.txt.splice(index,1);
						all.stream_a.push(a[0].name+" has been deleted"); all.screen_log();
									}
						//use parameter to rename
									if(mcp_a[1]!=undefined){
								a[0].name = mcp_a[1];
								all.stream_a.push('Changed txt name from '+mc_a[2]+' to '+mcp_a[1]);
								all.screen_log();
									}

									if(mc_a[3]=='run'){
	//ok so if a[0].running='FALSE' then make it 'TRUE' and print the thing. if true then make it false and clear the thing
				if(a[0].running=='FALSE'){var print = true;}
				if(a[0].running=='TRUE'){var erase = true;}
				if(print){
					//print lines of anim from top to bottom
					var i = 1; var al = a.length; var spacer = 0; var l0=a[0];
					var ceX=c_o.primX; var ceY=c_o.primY;//grid zero
					while(al--){
						var lin = a[(i-1)];
						//var l_txt = a[(i-1)].txt;
						var print = all.txt_s_new(l0.name+"_line"+i+c_o.name+'__r');
						//var ceX=-U.x+window.innerWidth/2; var ceY=-U.y+window.innerHeight/2;//grid zero
						print.tx=ceX; print.ty=ceY;
						print.x=l0.Gx; print.y=l0.Gy;
						print.r=l0.Gr; print.g=l0.Gg; print.b=l0.Gb; print.a=l0.Ga;
						print.font=l0.font;
						print.is="c_txt"; print.txt=lin.txt;
						print.y=print.y+spacer; //next line y position difference
						print.display=lin.display;
						print.custom_a=lin.custom_a;
						print.t=-1;
						all.anim_a.push(print);
					spacer = spacer+l0.spacer;
					i++;}
					a[0].running='TRUE';
				}									
				if(erase){
					var l0=a[0];
					var al = all.anim_a.length; var cl_pl = (l0.name.length+5);
					while(al--){
						var s = all.anim_a[al];
						if(s.name){
							var name = s.name.substr(0, cl_pl);
					//this will fail someday..
							if(name == l0.name+'_line'){ //so it removes all lines
								//s.is="rm"; 
								var index = all.anim_a.indexOf(s); 
								all.anim_a.splice(index,1);
							}
						}
					}//clears
					a[0].running='FALSE';				
				}

										all.shadow_mode(c_o);
									}//run
								}//anim access
							}//if a
						}//while
					}//
					if(mcp_a[1]==''&&mc_a[2]==undefined){mcp_a[1]=undefined; var noname = true;}
					if(mcp_a[1]!=undefined&&mc_a[2]==undefined){var proceed = true;}
					if(purge){
						c_o.txt = [];
						var l0=a[0];
						var al = all.anim_a.length; var cl_pl = (l0.name.length+5);
						while(al--){
							var s = all.anim_a[al];
							if(s.name){
								var name = s.name.substr(0, cl_pl);
								if(name == l0.name+'_line'){ //so it removes all lines
									//s.is="rm"; 
								//this is messy
									var index = all.anim_a.indexOf(s); 
									all.anim_a.splice(index,1);
								}
							}
						}//clears
						all.stream_a.push("..All txt edits have been deleted.");all.screen_log();
					}

					if(list){
						//list texts and a brief description. number of lines, which event is tied to etc
						var l = c_o.txt.length;
						all.stream_a.push("_________________________","TXT EDITS");
						while(l--){
							var anim = c_o.txt[l];
							all.stream_a.push(anim[0].name+" .. and some other data... ");
							//all.screen_log();
						}			
						all.stream_a.push("_____________________________");
						all.screen_log();
					}
					if(noname){all.stream_a.push("Please asign a name for this text."); all.screen_log();}
					if(proceed){
						//var name_ok = all.c_unl(mcp_a[1],'txt');
						//if(name_ok){}else{}
						c_o.inner_mode = false; c_o.edit_txt_mode = true; //uinit = 'orb edit';
						uinit={transition:'orb edit',stancefrom:c_o}//'same',stanceto:c_o};
						var l = c_o.txt.length;
						while(l--){
							var a = c_o.txt[l];
							if(a){
								if(a[0].name==mcp_a[1]){
									var index = c_o.txt.indexOf(a);
									c_o.op1 = index;
									a[0].open = true;
									all.stream_a.push("Recalling...   " + mcp_a[1]);
									all.screen_log();
									var found = true;
									break
								}
							}
						}
						if(found){}else{
							var new_anim = [];
							var an = {};
				//line1 , anim[0]will hold global coordinates of anim now,
				//along with other escential data..
				//we now want to add txt effects. these are picked up by animf. default effect is 'normal'.
				//effects are controled by the parameter 'display', also stored on line1
							//var ceX=-U.x+window.innerWidth/2; var ceY=-U.y+window.innerHeight/2;//grid zero
//ok we are removing "Global" parameters , and we are removing 'normal'?... ehhhhh not so sure about that
							an.Gx=0; an.Gy=0;
							an.Gr=200; an.Gg=200; an.Gb=200; an.Ga=1; an.Gt=-1;
							an.name=mcp_a[1];
							an.spacer=15; an.font='10px Courier New';
							an.open=true;
							an.running='FALSE';
							an.display='normal';
							//an.display='custom';
							an.custom_a=[]; an.t=-1;
							an.s='txt'; an.txt='First line.';
							//an.r= 220; an.g= 220; an.b=220; an.a=1; an.t=-1;
	
							//new_anim.push(an);
							new_anim[0]=an;
							c_o.txt.push(new_anim);
							c_o.op1 = c_o.txt.length-1;
						all.stream_a.push("Editing.. txt..  " +mcp_a[1]); all.screen_log();
						}
					}
	
				}//txt

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
 				var sr = all.find_ting(all.anim_a, 'name', a[0].name+"__r");
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
							var sr = all.find_ting(all.anim_a, 'name', a[0].name+"__r");
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
 							var sr = all.find_ting(all.anim_a, 'name', a[0].name+"__r");
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

 				var sr = all.find_ting(all.anim_a, 'name', a[0].name+"__r");
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
							var sr = all.find_ting(all.anim_a, 'name', a[0].name+"__r");
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
 							var sr = all.find_ting(all.anim_a, 'name', a[0].name+"__r");
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
						var named_osc = all.find_ting(c_o.osc, "name", mcp_a[1]);
						if(named_osc){
							c_o.op1 = c_o.osc.indexOf(named_osc); 
							all.stream_a.push("Recalling...   " + mcp_a[1]); all.screen_log();
						}else{	
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
					all.stream_a.push("Curtain recedes..."); all.screen_log();
					c_o.inner_mode=false; c_o.radiant_mode=true; //uinit='orb perform';
				/*	
					var s = all.rect_s_new('__lid');
					s.ctx=ctx3; s.se='open'; s.t=3; s.inside='filled';
					s.r=0; s.g=0; s.b=0; s.a=1; s.h=2; s.x=0;
					s.w = Math.floor(window.innerWidth);
					s.y = Math.floor(window.innerHeight/2);
					all.anim_a.push(s);
				*/
					

//we now also need to remove all states from running edits on inner mode if any.. so look for states with names that end in '__r'
					var l = all.anim_a.length; 
					while(l--){
						var s = all.anim_a[l];
						var namend = s.name.substr(-3, 3);
						if(namend == '__r'){
							all.anim_a.splice(l,1);
						}
					}

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
					c_o.inner_mode=true; c_o.radiant_mode=false; //uinit='orb reform';
/*
				//push lid
					var lid = all.rect_s_new('__lid');
					lid.ctx=ctx3; lid.se='close';
					lid.t=5; lid.inside='filled';
					lid.r=0; lid.g=0; lid.b=0; lid.a=1;
					lid.h=Math.floor(window.innerHeight); lid.x=0;
					lid.w = Math.floor(window.innerWidth); lid.y=0;
					lid.is='rect';
					all.anim_a.push(lid);
*/
					
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
				}

//PLAY . ACT		
/*
yeah so whats up with acts.. how to stop resource acts
So yeah one important thing i want to achieve is that
acts need to be running
in the bg. user can reform and go into the void while orbs carry on their
acts. All effects should be effective but graphics of these animations
interacting should not be displayed on user screen.
*/
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
				/*
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
				*/
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

/*
//VOX			
//store property links between keys and audio animations to call on vox 
//this "asign" works well in here, even tho it feels a bit out ofplace
//... maybe this whole vox deal should be implemented trough act language only..
			if(c_orb.vox_mode){
				if(mc_a[1]=="asign"){
					var a_a = all.find_ting(c_orb.osc, "name", mcp_a[1]);
					a_a.asigned_key = all.sstr;
					//normalize feedback
					all.s_s_t_r = []; all.sstr = ' '; all.sstr_l = ' ';
					all.stream_a.push("Osc asigned to key"); all.screen_log();
				}

			}//vox mode commands
*/

		}//vessel commands


//HUSK STANCE only one command available.. actualy we also need orb.in to bring the memory of another orb.
//if any of this commands run, we need to change to orb stance
//!!!! no commands on husk now.... so... deprecat... ok lets have these commands available for my own sanity for now
//husk exclusive commands
		if(comav=='husk'){
			//var gs = all.find_ting(all.anim_a, 'aka', 'ghostship');
			//.name:[new name]
			if(mc_a[1]=="name"){
//we need to send a se to the ghostship so it reacts to its new soul.
//husk now merges with the orb and becomes a vessel
				if(mcp_a[1]==undefined){}else{//if no name this becomes a nameless husk?
					var newo = all.orb_new(mcp_a[1]);
					//var ghostship = {name:undefined, form:'husk', birth_date:s.husk_date}
					//newo.form='vessel';
			//oes.x=gs.x; oes.y=gs.y; oes.limitrad = gs.limitrad;
					newo.primY=c_o.primY;
					newo.primX=c_o.primX;
					newo.limitrad=c_o.limitrad;
					newo.limitdis=c_o.limitdis;
					newo.imp_date=c_o.imp_date;
					newo.husk_date=c_o.husk_date;
					//newo.prim=
					newo.vessel_date=Date.now();
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
				oldo.primY=c_o.primY;
				oldo.primX=c_o.primX;
				oldo.limitrad=c_o.limitrad;
				oldo.limitdis=c_o.limitdis;
				oldo.imp_date=c_o.imp_date;
				oldo.husk_date=c_o.husk_date;
				oldo.vessel_date=Date.now();

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
		

		all.com_a.splice(0);//remove command logic from com_a array..m
	}//else{}//no commands on array condition
}//c_com






/////////WEB AUDIO
//Holy shiet audio. ok
//Basic oscillator using audio web API
//the Audio context holds nodes. Nodes are connected to create various effects and
//filters. the source node has no input only output,the destination node has no output,
//only input. All nodes between these two act as filters and each can have multiple ins
//and outs
//!
//An audio object should hold all the instructions and buffers neccesary for a
//function to create the precise Audio Node
//audio objects can be located on orbs , void nodes and user data
//!

//returns an audio context. Normally should go into all.au . Am thinking it may be
//helpful to allow instances to clear up context and
//create a new one once and then so it doesnt carry gigantic numbers to create
//timestamps. might be good for optimization
all.audioser = function(){
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
		
				var bgalr = all.find_ting(all.anim_a, 'gesID', touch.identifier);
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
							var irec = all.find_ting(all.anim_a, "name", "rect__sel");
							var srX = irec.x; var srY = irec.y;
							var ibg = all.find_ting(all.anim_a, "name", "img__bg");
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
					var a_s = all.find_ting(all.anim_a, 'name', a_a.name+'_'+a_a.on_a[0]);
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
					var a_s = all.find_ting(all.anim_a , "name", a_a.name+"_"+a_a.on_a[0]);
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

//UPDATE MAIN THREAD HEARTBEAT
//no dont loop a user entity box trust me bro
//when we change stance, we loop all states and change offs acordingly
//..!!!!!!!!!!!
//the checking order.. turns out rearranging arrays is expensive
//Dont merge orbs and vessels.
//...
//ok here is another way.
//we keep controled vessel or husk in a local var alone so we fast check first for commands
//we then keep script running vessels on a specific array to check for that and script level logic for husks as well if any
//and then finnally comes animf, we can check se updates from vessels, husks and waves, clearing updating and drawing
//UPDATE FLOW
//orbs live in all.fleet_a now, but they have a prim circle with vessel form asociated on anim_a that runs se to manage
//behavior when not under control or running any script.
//if an orb is being controled, its removed from this array and placed on stance global, and beat checked
//for commands and modes reacting to commands.
//husks wil also live in all.fleet_a , when controled they are also placed on stance global. they also have a prim circle with
//husk form managed by se on anim_a on animf updates
//waves are circle states prims with wave form that are managed only by se on animf updates

//USER COMMANDS UPDATE
//global var stance holds form under control now. we check commands and vessels modes reacting to commands
all.stance_up = function(){
	if(stance==undefined){ all.c_com(undefined); all.void_up(); return}
	//...transitions need to block user input..
	if(stance.form=='vessel'){ all.c_com(stance); all.orb_up(stance); return}
	if(stance.form=='husk'){ all.c_com(stance); all.ghost_up(stance); return} 
}

//SCRIPT VESSEL ACT UPDATE
//all.fleet_a 
//a loop to check all vessels orb activity when not under control. on all.fleet_a
//this array contains orbs structures and husk structures
all.script_up = function(){
	var l = all.fleet_a.length;
	while(l--){
		var soul = all.fleet_a[l];
//RADIANCE  RUNA SCRIPT ACT
//radiant idle means playing all actors. loops actors and feed all.runa()
//this needs to be done from all.script_up after commands check, all vessels running scripts need to be asked this
//should vessels wear the same name as orbs?
	//check all vessels running scripts
		if(soul.actors){
			var oal = soul.actors.length;
			while(oal--){
				var a = soul.actors[oal]; all.runa(a);
			}	
		}
//if not in control and its not running a script then it has a circle state asociated running a se. we check se on animf
		//maybe husks can do something here.. not sure

	}
}


//UPDATE MAIN
function update(){
	//all.timer();?
//orb escence. Diferent color on each beat. experimental. might be optimized
	o_r=all.get_r_num(160,220); o_g=all.get_r_num(160,220); o_b=all.get_r_num(160,220);
	
//prints symbols on ctx3 .this is exclusively keyboard users code. . its a bit convoluted but needs to go first
//so we can process key commands. we fill up com_a 
	if(all.sstr == ' '){}else{all.keys_feed();}

//Commands and touches are similar, they affect logic boxes so it makes sense for them to be checked first and then the logic.
//check touches
	all.c_tch();

	all.stance_up();

	all.script_up();

//checks states inside anim_a .animation func comes after logic updates
	//one clear. always clear the part of the canvas the user is looking
	ctx0.clearRect((-U.x),(-U.y),window.innerWidth, window.innerHeight);
	all.anim_func();
}//updates




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
all.sunya_init = function(device, tutorial){
	//keyboard
	if(device=="keyboard"){
		all.stream_a.push(
			'Greetings and salutations keyboard user.',
			'Press the ESC button on your keyboard to print some really useful information at any moment!',
			'Use Arrow Keys on your keyboard to manage your stream.',
			'Up and Down Arrows, let you detach and scroll trough the stream history.',
			'Left Arrow turns off stream visibility. Right Arrow turns back on and re-atach',
			'the stream to follow the last input.'		
		); all.screen_log();
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
	all.au = new (AudioContext || webkitAudioContext)();

//eye lids and pupil to animate transitions and other stuff
	pupil=all.circle_s_new('eye___pupil'); pupil.se='reset';
	elid2=all.rect_s_new('eye___lid2'); elid2.se='reset';
	elid1=all.rect_s_new('eye___lid1'); elid1.se='reset';
//keys feedback text state. for keyboards users..
	kfeed=all.txt_s_new('k___feed');
	kfeed.x=window.innerWidth/2; kfeed.y=window.innerHeight/2; kfeed.font="30px Courier New"; kfeed.align='center';
	kfeed.r=220; kfeed.g=220; kfeed.b=220; kfeed.a=0.8; kfeed.display='normal';

	all.anim_a.push(pupil, elid2, elid1, kfeed);

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
//Valeri
//Valeri is the first assistant, she will help users understand the tools provided
//by Sunya.
//On first instance, she is an Orb owned by the user, users first experience on Sunya
//is trough the eyes of Valeri.
//... or maybe Valeri should be a void entity
//var val_orb = all.orb_new("Valeri");
//center CANVAS.. deprecat ?
	//window.scrollTo((canvas0.width/2)-(window.innerWidth/2), (canvas0.height/2)-(window.innerHeight/2));
	//var ux = window.scrollX; var uy = window.scrollY;
	//all.user.x=window.scrollX; all.user.y=window.scrollY;

	if(all.keyboard_enabled){all.sunya_init("keyboard",true);}

	if(all.touch_enabled){all.sunya_init("touch",true);}

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

/*

//leaving this one for refference. using radius to create circles around a common center might be interesting for later
//WHEEL REFFERENCE
//take a center c_x and c_y as refference . wheel should normally be a bit lower, not in the middle of the screen?

			if(all.up_objs.length>2){
				//prims position on wheel
//i could change these parameters to change the center of the wheel when user is moving around maybe using touchscreen..
				var c_x = window.innerWidth/2;
				var c_y = window.innerHeight/2;
				//center of wheel should also let users see relations between orbs
				//if(c_o_w){c_y=window.innerHeight/2;}
	//size , rad od center and position of orbs will be determined by size of screen
	//identify which one is larger, x or y
				if(window.innerWidth>window.innerHeight){
					//use height
					var c_rad = window.innerHeight/3; var p_rad = window.innerHeight/10;
				}else{
					//use width
					var c_rad = window.innerWidth/3; var p_rad = window.innerWidth/10;
				}
				//var rad = window.innerWidth/3;

				var l = all.up_objs.length; var full= Math.PI*2; 
				//var angle_n = full/u.perceived.length; //instead, should always be on top
				var angle = full/all.up_objs.length; var angle_n = 4.71238898038469; //top
				//console.log(angle);
				while(l--){
				//prim00
					var s = all.circle_s_new("prim00_"+all.up_objs[l].name);
					var x = c_rad * Math.cos(angle_n)+c_x; var y = c_rad * Math.sin(angle_n)+c_y;
					s.tx=x; s.ty=y; s.ctx=ctx1;
					s.radius = p_rad-(all.up_objs.length*2); 
					s.inside = "empty";
					s.is="circle"; s.t=1;
					s.se="idle";
					s.r=220; s.g=220; s.b=220; s.a=1; //init values
					s.tch='prim'; s.ges = [];
					//empty circle for w noise
					all.clear_circle(ctx1,s.tx,s.ty,s.radius);
					all.anim_a.push(s);

				//prim01 
					var s_n = all.txt_s_new("prim01_"+all.up_objs[l].name);
					s_n.ctx=ctx1; // hmmm ctx1 ok?
					s_n.tx=x; s_n.ty=y+4;
					s_n.r=220; s_n.g=220; s_n.b=220; s_n.a=0; //init values
					s_n.txt=all.up_objs[l].name;
					s_n.font='18px Courier New';
					s_n.is='c_txt'; s_n.t=-1;
					s_n.display='custom';
					s_n.custom_a=[
						[0.1,'a'],[0.3,'a'],[0.6,'a'],[0.9,'a'],[1,'a'],[0.9,'a'],[0.6,'a'],[0.3,'a'],
						[200,'r',200,'g',200,'b',0.1,'a']
					];
					all.anim_a.push(s_n);

				angle_n = angle_n+angle;
				}

			}

			all.orb_track_l = all.up_objs.length;
			new_wheel = undefined;

		}//new wheel
*/


