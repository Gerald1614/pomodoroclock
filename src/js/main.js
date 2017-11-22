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
  countDownDate = new Date();
  countDownDate.setMilliseconds(countDownDate.getMilliseconds()+ cdTimer);
  r = (Number(restDuration.innerHTML))*100/(cdTimer/60000);
  w = (Number(workDuration.innerHTML))*100/(cdTimer/60000);
  wdProgress.innerHTML=workDuration.innerHTML + " mn";
  rdProgress.innerHTML=restDuration.innerHTML + " mn";
  afficher();
  s=1/cdTimer*100000;
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
}

function myTimer(){

  afficher();
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}
function afficher(){
    now = new Date().getTime();
    distance = countDownDate - now;
  //  laps =(cdTimer-distance)/60000;

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    
    if (w>0){
      w = w-s;
    }
    else {
      w=0;
      r = r-s;
    }
    sessionProgress.style.width = (100-w-r)+"%"
    wdProgress.style.width = w+"%";    
    rdProgress.style.width = r+"%";




}