workDuration= document.getElementById('workDuration');
restDuration= document.getElementById('restDuration');
wdProgress= document.getElementById('wdProgress');
rdProgress= document.getElementById('rdProgress');
sessionProgress= document.getElementById('sessionProgress');
var cdTimer;
var w,r,s;
var x;
var started=false;
var distance, now;
reset();
adjustSessionDuration() 

function minusWD(){
//  if (Number(workDuration.innerHTML) <5) {
//    document.getElementsByClassName('alert')[0].classList.remove("hidden");
//    setTimeout(function(){ document.getElementsByClassName('alert')[0].classList.add("hidden") }, 2000);
//  }
 // else {
    workDuration.innerHTML= Number(workDuration.innerHTML)-1;
    adjustSessionDuration();
//  }
};
function plusWD(){
  workDuration.innerHTML= Number(workDuration.innerHTML)+1;
  adjustSessionDuration();
};
function minusRD(){
  if (Number(restDuration.innerHTML) <3) {
    document.getElementsByClassName('alert')[0].classList.remove("hidden");
    setTimeout(function(){ document.getElementsByClassName('alert')[0].classList.add("hidden") }, 2000);
  }
  else {
  restDuration.innerHTML= Number(restDuration.innerHTML)-1;
  adjustSessionDuration();
  }
};
function plusRD(){
  restDuration.innerHTML= Number(restDuration.innerHTML)+1;
  adjustSessionDuration();
};

function adjustSessionDuration() {
  cdTimer= (Number(workDuration.innerHTML) + Number(restDuration.innerHTML))*60000;
  countDownDate = new Date();
  countDownDate.setMilliseconds(countDownDate.getMilliseconds()+ cdTimer);
  r = (Number(restDuration.innerHTML))*100/(cdTimer/60000);
  w = (Number(workDuration.innerHTML))*100/(cdTimer/60000);
  wdProgress.innerHTML=workDuration.innerHTML + " m";
  rdProgress.innerHTML=restDuration.innerHTML + " m";
  afficher();
  s=1/cdTimer*100000;
};

function startStop(){
  if (started==false){ 
    countDownDate = new Date();
    countDownDate.setMilliseconds(countDownDate.getMilliseconds()+ cdTimer);
    started=true;
    var list = document.getElementsByClassName('colT');
    for (i=0; i<list.length; i++) {
      list[i].setAttribute('class', 'col colT disabled');
    }
    document.getElementsByClassName('btn')[0].innerHTML="Stop";
    document.getElementsByClassName('btn')[0].setAttribute('class', 'btn btn-outline-danger');
    document.getElementsByClassName('btn')[1].disabled=true;
    x = setInterval(function() { myTimer() }, 1000);
  }
  else if (started==true){
    cdTimer=distance;
    clearInterval(x);
    var list=document.getElementsByClassName('colT');
    for (i=0; i<list.length; i++) {
      list[i].setAttribute('class', 'col colT');
    }
    document.getElementsByClassName('btn')[0].innerHTML="Start";
    document.getElementsByClassName('btn')[0].setAttribute('class', 'btn btn-outline-success');
    document.getElementsByClassName('btn')[1].disabled=false;
    started=false;
  }

}

function reset(){
  cdTimer= (Number(workDuration.innerHTML) + Number(restDuration.innerHTML))*60000;
  countDownDate = new Date();
  countDownDate.setMilliseconds(countDownDate.getMilliseconds()+ cdTimer);
  adjustSessionDuration();
}

function myTimer(){

  afficher();
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "FINISHED";
        emitSound()
        document.getElementById("timer").classList.add("awesome");
        setTimeout(function(){ document.getElementById("timer").classList.remove("awesome") }, 5000);
        document.getElementsByClassName('btn')[0].innerHTML="Start";
        document.getElementsByClassName('btn')[0].setAttribute('class', 'btn btn-outline-success');
        document.getElementsByClassName('btn')[1].disabled=false;
        started=false;
    }
}
function afficher(){
    now = new Date().getTime();
    distance = countDownDate - now;

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (hours == 0 ) {
      document.getElementById("timer").innerHTML =  minutes + " m " + seconds + " s ";
    }
    else if (minutes == 0) {
      document.getElementById("timer").innerHTML = seconds + " s ";
    }
   else {
    document.getElementById("timer").innerHTML = hours + " h " + minutes + " m " + seconds + " s ";
   };
   sessionProgress.innerHTML= (Number(restDuration.innerHTML) + Number(workDuration.innerHTML))- minutes -1+ " m";
    if (w>0){
      wdProgress.innerHTML= minutes - restDuration.innerHTML + " m " + seconds + " s";
      rdProgress.innerHTML=restDuration.innerHTML + " m";
      w = w-s;

      if (w>0 && w<3) {
        emitSound()
        document.getElementById("timer").classList.add("awesome");
        setTimeout(function(){ document.getElementById("timer").classList.remove("awesome") }, 5000);
      }
    }
    else {

      w=0;
      r = r-s;
      rdProgress.innerHTML= minutes + " m " + seconds + " s";
    }
    wdProgress.style.width = w+"%";    
    rdProgress.style.width = r+"%";
    sessionProgress.style.width = (100-w-r)+"%"

}
function emitSound(){
  var context = new (window.AudioContext || window.webkitAudioContext)();
  var osc = context.createOscillator(); // instantiate an oscillator
  osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
  osc.frequency.value = 440; // Hz
  osc.connect(context.destination); // connect it to the destination
  osc.start(); // start the oscillator
  osc.stop(context.currentTime + 2); // stop 2 seconds after the current time
}