var workDuration= document.getElementById('workDuration');
var restDuration= document.getElementById('restDuration');
var wdProgress= document.getElementById('wdProgress');
var rdProgress= document.getElementById('rdProgress');
var sessionProgress= document.getElementById('sessionProgress');
var cdTimer,cdTimerConst, countDownDate;
var hours, minutes, seconds;
var w, wt =0;
var r, rt = 0;
var s, st=0; 
var duree=0;
var x;
var started=false;
var distance, now;
adjustSessionDuration();

function minusWD(){
  if (Number(workDuration.innerHTML) <5) {
    document.getElementsByClassName('alert')[0].classList.remove("hidden");
    setTimeout(function(){ document.getElementsByClassName('alert')[0].classList.add("hidden") }, 2000);
  }
  else {
    workDuration.innerHTML= Number(workDuration.innerHTML)-1;
    adjustSessionDuration();
  }
};
function plusWD(){
    if (Number(workDuration.innerHTML) >=90) {
    document.getElementsByClassName('alert')[0].classList.remove("hidden");
    setTimeout(function(){ document.getElementsByClassName('alert')[0].classList.add("hidden") }, 2000);
  }
  else {
  workDuration.innerHTML= Number(workDuration.innerHTML)+1;
  adjustSessionDuration();
}
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
   if (Number(restDuration.innerHTML) >=30) {
    document.getElementsByClassName('alert')[0].classList.remove("hidden");
    setTimeout(function(){ document.getElementsByClassName('alert')[0].classList.add("hidden") }, 2000);
  }
  else {
  restDuration.innerHTML= Number(restDuration.innerHTML)+1;
  adjustSessionDuration();
}
};

function adjustSessionDuration() {
  cdTimer= (Number(workDuration.innerHTML) + Number(restDuration.innerHTML))*60000;
  cdTimerConst=cdTimer;
  s=0;
  countDownDate = new Date();
  countDownDate.setMilliseconds(countDownDate.getMilliseconds()+ cdTimer);
  r = (Number(restDuration.innerHTML))*100/(cdTimer/60000);
  w = (Number(workDuration.innerHTML))*100/(cdTimer/60000);
  rt=restDuration.innerHTML + " m";
  CalcTime();
  afficher();
};

function startStop(){
  if (started==false){ 
    duree=1/cdTimerConst*100000;
    countDownDate = new Date();
    countDownDate.setMilliseconds(countDownDate.getMilliseconds()+ cdTimer);
    started=true;
    var list = document.getElementsByClassName('colT');
    for (var i=0; i<list.length; i++) {
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
    for (var i=0; i<list.length; i++) {
      list[i].setAttribute('class', 'col colT');
    }
    document.getElementsByClassName('btn')[0].innerHTML="Start";
    document.getElementsByClassName('btn')[0].setAttribute('class', 'btn btn-outline-success');
    document.getElementsByClassName('btn')[1].disabled=false;
    started=false;
  }
}

function myTimer(){
  animer();

  if ( distance < 0) {
    clearInterval(x);
    rdProgress.style.width ="0%";
    rdProgress.innerHTML="";
    sessionProgress.style.width ="100%";
    sessionProgress.innerHTML= (Number(workDuration.innerHTML) + Number(restDuration.innerHTML)) +" m";
      document.getElementById("timer").classList.remove("awesome");
      document.getElementById("timer").innerHTML = "FINISHED";
      document.getElementsByClassName('btn')[0].innerHTML="Start";
      document.getElementsByClassName('btn')[0].setAttribute('class', 'btn btn-outline-success');
      document.getElementsByClassName('btn')[1].disabled=false;
      started=false;
      setTimeout(function(){ adjustSessionDuration() }, 5000);   
  }
  if ( distance - Number(restDuration.innerHTML)*60000 <=3000 && distance - Number(restDuration.innerHTML)*60000 >0) {
    document.getElementById("timer").classList.add("awesome");
    setTimeout(function(){ document.getElementById("timer").classList.remove("awesome") }, 8000);
    emitSound();
  };

    if (distance <= 3000) {
        rt="";
        document.getElementById("timer").classList.add("awesome");
        emitSound();
    };
    
}

function CalcTime(){
  now = new Date().getTime();
  distance = countDownDate - now;
  hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.round(((distance) % (1000 * 60)) / 1000);

  if ((hours*60 + minutes) >=60) {
    wt= (hours*60 + minutes - restDuration.innerHTML) + " m " + seconds + " s";
   }
   else if ((hours*60 + minutes) <60){
    wt= minutes - restDuration.innerHTML + " m " + seconds + " s";
   };
}

function afficher(){
 
    if (hours == 0 && minutes == 0) {
      document.getElementById("timer").innerHTML = seconds + " seconds ";
    }
    else if (hours == 0 ) {
      document.getElementById("timer").innerHTML =  minutes + " m " + seconds + " s ";
    }
   else {
    document.getElementById("timer").innerHTML = hours + " h " + minutes + " m " + seconds + " s ";
   };

   wdProgress.style.width = w +"%";   
   wdProgress.innerHTML= wt;
   rdProgress.style.width = r +"%";
   rdProgress.innerHTML=rt;
   sessionProgress.style.width = s+ "%";
   sessionProgress.innerHTML= st;
  };

function animer(){
  if ((hours*60 + minutes && s+duree < Number(workDuration.innerHTML)*6000000/cdTimerConst) >=60) {
    wt= (hours*60 + minutes - restDuration.innerHTML) + " m " + seconds + " s";
   }
   else if ((hours*60 + minutes && s+duree < Number(workDuration.innerHTML)*6000000/cdTimerConst) <60){
    wt= minutes - restDuration.innerHTML + " m " + seconds + " s";
   };

   CalcTime();
   st= (Number(restDuration.innerHTML) + Number(workDuration.innerHTML))- minutes-1 + " m " + (60-seconds) + " s";
   s= s + duree;
   if (s < Number(workDuration.innerHTML)*6000000/cdTimerConst){
      rt=restDuration.innerHTML + " m";
      w = w-duree;
    }
    else if (s >= Number(workDuration.innerHTML)*6000000/cdTimerConst) {
      wt="";
      r = r+ w - duree;
      w=0;
      rt= minutes + " m " + seconds + " s";

    };
    afficher();
};

function emitSound(){
  var beep = document.getElementById("beepAudio"); 
  beep.play(); 
}