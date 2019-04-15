function ChangeBackground(url){
var body = document.getElementsByTagName('body')[0];
body.style.backgroundImage = 'url(' + url + ')';
}

function UpdateBack(name){
	
var request = new XMLHttpRequest();

request.open('GET', 'https://nekos.life/api/v2/img/' + name, true);

request.onload = function () {
  	var data = JSON.parse(this.response);
	ChangeBackground(data["url"]);
}
// Send request
request.send();

}
INVERVAL_ID = -1;

function StartUpdateTimer(name,ms)
{
	if(INVERVAL_ID != -1)
	{
		StopUpdateTimer();
	}
	UpdateBack(name);
	INVERVAL_ID = setInterval(function(){ UpdateBack(name) },ms);
}

function StopUpdateTimer()
{
	clearInterval(INVERVAL_ID);
	INVERVAL_ID = -1;
}



StartUpdateTimer("neko",15000);