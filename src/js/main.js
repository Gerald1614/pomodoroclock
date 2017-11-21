workDuration= document.getElementById('workDuration');
restDuration= document.getElementById('restDuration');
wdProgress= document.getElementById('wdProgress');
rdProgress= document.getElementById('rdProgress');
sessionProgress= document.getElementById('sessionProgress');
var cdTimer= (Number(workDuration.innerHTML) + Number(restDuration.innerHTML))*60000;

var x;
var started=false;
var distance, now;
let laps=0;
reset();


function minusWD(){
 // if (Number(workDuration.innerHTML) <5) {
 //   document.getElementsByClassName('alert')[0].classList.remove("hidden");
 //   setTimeout(function(){ document.getElementsByClassName('alert')[0].classList.add("hidden") }, 2000);
 // }
 // else {
    workDuration.innerHTML= Number(workDuration.innerHTML)-1;
    adjustSessionDuration();
  //}
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
  wdProgress.setAttribute('aria-valuemax', cdTimer/60000);
  rdProgress.setAttribute('aria-valuemax', cdTimer/60000);
  sessionProgress.setAttribute('aria-valuemax', cdTimer/60000);
  wdProgress.setAttribute('aria-valuenow', (Number(workDuration.innerHTML)));
  rdProgress.setAttribute('aria-valuenow', (Number(restDuration.innerHTML)));
  sessionProgress.setAttribute('aria-valuenow', 0);
  rdProgress.style.width = (Number(restDuration.innerHTML))*100/(cdTimer/60000)+"%";
  wdProgress.style.width = (Number(workDuration.innerHTML))*100/(cdTimer/60000)+"%";
  sessionProgress.style.width = "0%";
  wdProgress.innerHTML=workDuration.innerHTML + " mn";
  rdProgress.innerHTML=restDuration.innerHTML + " mn";

};


function startStop(){
  wdProgress.innerHTML="";
  rdProgress.innerHTML="";
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
  afficher();
}

function myTimer(){

  afficher();
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}
function afficher(){
  console.log("cdTimer + "+ cdTimer + " distance "+ distance);
    now = new Date().getTime();
    distance = countDownDate - now;
    laps =(cdTimer-distance)/60000;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    sessionProgress.setAttribute('aria-valuenow', laps);
    sessionProgress.style.width = (cdTimer-distance)*100/cdTimer+"%";
    if (wdProgress.getAttribute('aria-valuenow') >=0){    
      wdProgress.setAttribute('aria-valuenow', (Number(workDuration.innerHTML))- laps);
      wdProgress.style.width = (Number(workDuration.innerHTML))*100/(cdTimer/60000)- ((cdTimer-distance)*100/cdTimer) +"%";
    }
    else {
      rdProgress.setAttribute('aria-valuenow', (Number(restDuration.innerHTML))- laps);
      rdProgress.style.width = (Number(restDuration.innerHTML))*100/(cdTimer/60000)- ((cdTimer-distance)*100/cdTimer) +"%";
    }

}