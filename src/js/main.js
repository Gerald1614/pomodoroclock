workDuration= document.getElementById('workDuration');
restDuration= document.getElementById('restDuration');
wdProgress= document.getElementById('wdProgress');
rdProgress= document.getElementById('rdProgress');
sessionProgress= document.getElementById('sessionProgress');
var cdTimer= (Number(workDuration.innerHTML) + Number(restDuration.innerHTML))*60000;
var countDownDate = new Date();
countDownDate.setMilliseconds(countDownDate.getMilliseconds()+ cdTimer);
var x;
var started=false;
var distance;

myTimer();


function minusWD(){
  if (Number(workDuration.innerHTML) <5) {
    document.getElementsByClassName('alert')[0].classList.remove("hidden");
  }
  else {
    workDuration.innerHTML= Number(workDuration.innerHTML)-1;
    adjustSessionDuration();
  }
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
  wdProgress.setAttribute('aria-valuenow', (Number(workDuration.innerHTML)));
  rdProgress.setAttribute('aria-valuenow', (Number(restDuration.innerHTML)));
  wdProgress.setAttribute('aria-valuenow', (Number(workDuration.innerHTML)));
  rdProgress.style.width = (Number(restDuration.innerHTML))*100/(cdTimer/60000)+"%";
  wdProgress.style.width = (Number(workDuration.innerHTML))*100/(cdTimer/60000)+"%";
  wdProgress.innerHTML=workDuration.innerHTML + " mn";
  rdProgress.innerHTML=restDuration.innerHTML + " mn";
}


function startStop(){
  console.log(cdTimer);
  if (started==false){
   
    started=true;
    document.getElementsByClassName('btn')[0].innerHTML="Stop";
    document.getElementsByClassName('btn')[0].setAttribute('class', 'btn btn-outline-danger');
    document.getElementsByClassName('btn')[1].disabled=true;
    x = setInterval(function() { myTimer() }, 1000);


  }
  else if (started==true){
    cdTimer=distance;
    clearInterval(x);
    document.getElementsByClassName('btn')[0].innerHTML="Start";
    document.getElementsByClassName('btn')[0].setAttribute('class', 'btn btn-outline-success');
    document.getElementsByClassName('btn')[1].disabled=false;
    started=false;
  }

}
function reset(){
  cdTimer= (Number(workDuration.innerHTML) + Number(restDuration.innerHTML))*60000;
  //document.getElementById("timer").innerHTML ="0h 00m 00s";
  countDownDate = new Date();
  countDownDate.setMilliseconds(countDownDate.getMilliseconds()+ cdTimer);
  myTimer();

}

function myTimer(){
  var now = new Date().getTime();
  distance = countDownDate - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}