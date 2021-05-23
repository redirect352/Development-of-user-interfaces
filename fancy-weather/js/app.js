var timezone = 0;

const 
city =  document.getElementById("FindCity"),

    //refresh button
    ButtNowIm = document.getElementById("refresh"),
    //Eng russian
    ButtEN=document.getElementById('End_butt'),
    ButtRU=document.getElementById('Rus_butt'),

    //Изменение температуры
    tempF=document.getElementById('farenheit'),
    tempC=document.getElementById('celsius'),

// отображение времени и даты
    dates = document.querySelector('.date'),
    time = document.querySelector('.time'),
//Место
    NCity=document.querySelector('.NameCity'),
    CoyntriS=document.querySelector('.Coyntry'),
  //Координаты  
    LatText=document.querySelector('.long-text'),
    LonText=document.querySelector('.lat-text'),
    
    Longitube=document.querySelector('.long-value'),
    Latitube=document.querySelector('.lat-value'),
// Погода сегодня
    //Температура с иконкой
    temperature = document.querySelector('.temperature'),
    IconTemp=document.querySelector('.IconTemp'),
    
    //Доп инфа
    weatherIcon = document.querySelector('.icon'),//иконка
    EyseS=document.querySelector('.description'),//описание словами
//Темпа
    LikeWint=document.querySelector('.LikeWinter'),
    Like_Temp=document.querySelector('.Like_Temp'),
    IconTempN=document.querySelector('.IconTempN'),
//Ск ветра
    Speend=document.querySelector('.wind-speed'),
    Need=document.querySelector('.wind-text')
//Влажность
    Water=document.querySelector('.humidity-value'),
    Humit=document.querySelector('.humidity-text'),


    



    //Cлед день
    FirstweatherIcon=document.querySelector('.icon1'),
    FirstDayWeek=document.querySelector('.day1'),
    FirstTemper=document.querySelector('.temp1'),
    IconTempNext=document.querySelector('.temp-type1'),

//2 день
    SeconweatherIcon=document.querySelector('.icon2'),
    SeconTemper=document.querySelector('.temp2'),
    SeconDayWeek=document.querySelector('.day2'),
    IconTempNextTo=document.querySelector('.temp-type2'),
//3 день
    TrisweatherIcon=document.querySelector('.icon3'),
    TrisTemper=document.querySelector('.temp3'),
    TrisDayWeek=document.querySelector('.day3'),
    IconTempToNextTo=document.querySelector('.temp-type3'),
    
    weatherDescription = document.querySelector('.weather-description'),

//Кнопка поиска
	searchButton = document.getElementById("search_button")
	
  ;
  


  const tzDate = (timezoneOffset = 0) => {
	let d = new Date();
	return new Date(
	  d.getTime() + d.getTimezoneOffset() * 60000 + timezoneOffset * 1000
	);
  };



var NumLatit=0;
var NumLongit=0;
var WeekDayRu=['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
var WeekDayEN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var LanWeb='ru';
var Cels='metric';

// Show Time
function showTime() {
  let today = tzDate(timezone),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
	
  // Output Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Show DateTime
function showDateTime() {
	
	var options = { weekday: 'short', month: 'long', day: 'numeric' };
	
  let today = new Date(),
	Month = today.getMonth(),
    Day = today.getDate();
	
  // Output Time
  dates.innerHTML =today.toLocaleString(LanWeb, options);
}

//Button update
async function getLinkToImage() {
   const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
   const res = await fetch(url);
   const data = await res.json();
   document.body.style.backgroundImage="url("+data.urls.regular+")";
   setTimeout(getLinkToImage, 250000);
 }
 
function ShowMap() {
	mapboxgl.accessToken = 'pk.eyJ1IjoidG9zbGF2IiwiYSI6ImNrb3AwZHlueTBnZWYyb281MzJ6YWl3a3cifQ.G1zeK3_s5e7Ut1KDrBl0rw';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [NumLongit,NumLatit], // starting position [lng, lat]
        zoom: 10 // starting zoom
    });


	getWeather();
	getWeatherToDay();
	getWeatherNextToDay();
	getWeatherToNextToDay();
	getLang();
	getTemper();
}

async function getWeather() {

const url =`https://api.openweathermap.org/data/2.5/forecast?lat=${NumLatit}&lon=${NumLongit}&lang=${LanWeb}&APPID=75da956a1e338b6ae689bcd764ce78a2&units=${Cels}`;
  const res = await fetch(url);
  const data = await res.json();
	timezone = data.city.timezone;
 // console.log(data);
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.list[0].weather[0].id}`);
  
  temperature.textContent = `${data.list[0].main.temp.toFixed(0)}`;
  Speend.textContent=`${data.list[0].wind.speed}м/с`;
  Water.textContent=`${data.list[0].main.humidity}%`;
  LikeWint.textContent=`${data.list[0].main.feels_like}`;
  EyseS.textContent=`${data.list[0].weather[0].description}`;
  //city.textContent=data.city['name'];
  NCity.textContent=data.city['name'];
  CoyntriS.textContent=`${data.city.country}`;

}

async function getWeatherUser() {
  const url =`https://api.openweathermap.org/data/2.5/forecast?q=${city.textContent}&lang=${LanWeb}&APPID=75da956a1e338b6ae689bcd764ce78a2&units=${Cels}`;
  const res = await fetch(url);
  const data = await res.json();
  
  //Локальный часовой пояс
  timezone = data.city.timezone;
	//Координаты
	NumLatit = data.city.coord.lat;
	NumLongit = data.city.coord.lon;
	let tmp = {
		coords :{
			latitude:NumLatit,
			longitude:NumLongit
		},
		flag :true
	};	
	SetLatitude(tmp);

  //console.log(data);
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.list[0].weather[0].id}`);


  temperature.textContent = `${data.list[0].main.temp.toFixed(0)}`;

  Speend.textContent=`${data.list[0].wind.speed}м/с`;
  Water.textContent=`${data.list[0].main.humidity}%`;
  LikeWint.textContent=`${data.list[0].main.feels_like}`;
  EyseS.textContent=`${data.list[0].weather[0].description}`;
  NCity.textContent=data.city['name'];
  city.textContent=data.city['name'];
  CoyntriS.textContent=`${data.city.country}`;
  
  	getWeatherToDay();
	getWeatherNextToDay();
	getWeatherToNextToDay();
	ShowMap();
}

async function getWeatherToDay(){
  let today = new Date(),
	Year = today.getFullYear(),
	Month = today.getMonth(),
	Day = today.getDate();
	
	Month=Month+1;
	if(Month>12)
		Month=1;
	Day=Day+1;
	DateStrND=Year+"-"+addZero(Month)+"-"+addZero(Day)+" 12:00:00";

  const UrlND =`https://api.openweathermap.org/data/2.5/forecast?lat=${NumLatit}&lon=${NumLongit}&lang=${LanWeb}&APPID=75da956a1e338b6ae689bcd764ce78a2&units=${Cels}`;
  const ResND = await fetch(UrlND);
  const DataND = await ResND.json();
  var i = 0;
  var n=0;
  while (i != 1) {
    NextDay=DataND.list[n].dt_txt;
	if(DateStrND===NextDay){
		FirstweatherIcon.textContent=DataND.list[n].weather[0]['description'];
        FirstTemper.textContent=DataND.list[n].main['temp'].toFixed(0);
		i=1;
	}
	n=n+1;
  }
  n=n-1;
}

async function getWeatherToDayUser(){
  let today = new Date(),
	Year = today.getFullYear(),
	Month = today.getMonth(),
	Day = today.getDate();
	
	Month=Month+1;
	if(Month>12)
		Month=1;
	Day=Day+1;
	DateStrND=Year+"-"+addZero(Month)+"-"+addZero(Day)+" 12:00:00";

  const UrlND =`https://api.openweathermap.org/data/2.5/forecast?q=${city.textContent}&lang=${LanWeb}&APPID=75da956a1e338b6ae689bcd764ce78a2&units=${Cels}`;
  const ResND = await fetch(UrlND);
  const DataND = await ResND.json();
  var i = 0;
  var n=0;
  while (i != 1) {
    NextDay=DataND.list[n].dt_txt;
	if(DateStrND===NextDay){
		FirstweatherIcon.textContent=DataND.list[n].weather[0]['description'];
        FirstTemper.textContent=DataND.list[n].main['temp'].toFixed(0);
		i=1;
	}
	n=n+1;
  }
  n=n-1;
}

async function getWeatherNextToDay(){
  let today = new Date(),
	Year = today.getFullYear(),
	Month = today.getMonth(),
	Day = today.getDate();
	
	Month=Month+1;
	if(Month>12)
		Month=1;
	Day=Day+2;
	DateStrTN=Year+"-"+addZero(Month)+"-"+addZero(Day)+" 12:00:00";

  const UrlTND =`https://api.openweathermap.org/data/2.5/forecast?lat=${NumLatit}&lon=${NumLongit}&lang=${LanWeb}&APPID=75da956a1e338b6ae689bcd764ce78a2&units=${Cels}`;
  const ResTND = await fetch(UrlTND);
  const DataTND = await ResTND.json();
  var i = 0;
  var n=0;
  while (i != 1) {
    NextDay=DataTND.list[n].dt_txt;
	if(DateStrTN===NextDay){
		SeconweatherIcon.textContent=DataTND.list[n].weather[0]['description'];
        SeconTemper.textContent=DataTND.list[n].main['temp'].toFixed(0);
		i=1;
	}
	n=n+1;
  }
  n=n-1;
}

async function getWeatherNextToDayUser(){
  let today = new Date(),
	Year = today.getFullYear(),
	Month = today.getMonth(),
	Day = today.getDate();
	
	Month=Month+1;
	if(Month>12)
		Month=1;
	Day=Day+2;
	DateStrTN=Year+"-"+addZero(Month)+"-"+addZero(Day)+" 12:00:00";

  const UrlTND =`https://api.openweathermap.org/data/2.5/forecast?q=${city.textContent}&lang=${LanWeb}&APPID=75da956a1e338b6ae689bcd764ce78a2&units=${Cels}`;
  const ResTND = await fetch(UrlTND);
  const DataTND = await ResTND.json();
  var i = 0;
  var n=0;
  while (i != 1) {
    NextDay=DataTND.list[n].dt_txt;
	if(DateStrTN===NextDay){
		SeconweatherIcon.textContent=DataTND.list[n].weather[0]['description'];
        SeconTemper.textContent=DataTND.list[n].main['temp'].toFixed(0);
		i=1;
	}
	n=n+1;
  }
  n=n-1;
}

async function getWeatherToNextToDay(){
  let today = new Date(),
	Year = today.getFullYear(),
	Month = today.getMonth(),
	Day = today.getDate();
	
	Month=Month+1;
	if(Month>12)
		Month=1;
	Day=Day+3;
	DateStrNTN=Year+"-"+addZero(Month)+"-"+addZero(Day)+" 12:00:00";

  const UrlNTND =`https://api.openweathermap.org/data/2.5/forecast?lat=${NumLatit}&lon=${NumLongit}&lang=${LanWeb}&APPID=75da956a1e338b6ae689bcd764ce78a2&units=${Cels}`;
  const ResNTND = await fetch(UrlNTND);
  const DataNTND = await ResNTND.json();
  var i = 0;
  var n=0;
  while (i != 1) {
    NextDay=DataNTND.list[n].dt_txt;
	if(DateStrNTN===NextDay){
		TrisweatherIcon.textContent=DataNTND.list[n].weather[0]['description'];
        TrisTemper.textContent=DataNTND.list[n].main['temp'].toFixed(0);
		i=1;
	}
	n=n+1;
  }
  n=n-1;
}

async function getWeatherToNextToDayUser(){
  let today = new Date(),
	Year = today.getFullYear(),
	Month = today.getMonth(),
	Day = today.getDate();
	
	Month=Month+1;
	if(Month>12)
		Month=1;
	Day=Day+3;
	DateStrNTN=Year+"-"+addZero(Month)+"-"+addZero(Day)+" 12:00:00";

  const UrlNTND =`https://api.openweathermap.org/data/2.5/forecast?q=${city.textContent}&lang=${LanWeb}&APPID=75da956a1e338b6ae689bcd764ce78a2&units=${Cels}`;
  const ResNTND = await fetch(UrlNTND);
  const DataNTND = await ResNTND.json();
  var i = 0;
  var n=0;
  while (i != 1) {
    NextDay=DataNTND.list[n].dt_txt;
	if(DateStrNTN===NextDay){
		TrisweatherIcon.textContent=DataNTND.list[n].weather[0]['description'];
        TrisTemper.textContent=DataNTND.list[n].main['temp'].toFixed(0);
		i=1;
	}
	n=n+1;
  }
  n=n-1;
}


function SetLatitude(pos) {
  var crd = pos.coords;
	NumLatit=crd.latitude;
	NumLongit=crd.longitude;
	let lat = "N",long = "E";
	if (NumLatit<0)
		lat = "S";
	if(NumLongit <0)
		long = "W";		

	let flag = false;

  	let Zel=Math.trunc(crd.latitude);
	  console.log(Zel);
	let  Drop=crd.latitude-Zel;
  	Drop=Math.trunc(Drop*60);
	  console.log(Drop);
 	 Latitube.textContent=Zel+"°"+Drop+"'" + " " + lat ;
  	Zel=Math.trunc(crd.longitude);
  	Drop=crd.longitude-Zel;
  	Drop=Math.trunc(Drop*60);
  	Longitube.textContent=Zel+"°"+Drop+"'"+ " " + long;
};

function SowNextDay() {
let today = new Date(),
    Day = today.getDay();
	
	//console.log(Day);
	Day=Day+1;
	if(Day>6)
		Day=0;
	if(LanWeb==='ru'){
		FirstDayWeek.textContent=WeekDayRu[Day];
	}
	else{
		FirstDayWeek.textContent=WeekDayEN[Day];
	}
	Day=Day+1;
	if(Day>6)
		Day=0;
	if(LanWeb==='ru'){
		SeconDayWeek.textContent=WeekDayRu[Day];
	}
	else{
		SeconDayWeek.textContent=WeekDayEN[Day];
	}
	
	Day=Day+1;
	if(Day>6)
		Day=0;
	if(LanWeb==='ru'){
		TrisDayWeek.textContent=WeekDayRu[Day];
	}
	else{
		TrisDayWeek.textContent=WeekDayEN[Day];
	}
	
}

function ShowLang(){

	if(LanWeb==='ru'){
		LatText.textContent="Широта:";
		LonText.textContent="Долгота:";
		Like_Temp.textContent="Ощущается:";
		Need.textContent="Скорость ветра:";
		Humit.textContent="Влажность:";
		ButtRU.checked = true;
	}
	
	if(LanWeb==='en'){
		LatText.textContent="Latitude:";
		LonText.textContent="Longitude:";
		Like_Temp.textContent="Feels like:";
		Need.textContent="Wind:";
		Humit.textContent="Humidity:";
		ButtEN.checked = true;
	}
	setLang();
	
	SowNextDay();
	showDateTime();
	getWeatherUser();
	getWeatherToDayUser();
	getWeatherNextToDayUser();
	getWeatherToNextToDayUser();
}


function ShowTemp(){

	if(Cels==='metric'){
		tempC.className='tempCAc';
		tempF.className='tempF';
		IconTemp.textContent="°C";
		IconTempNext.textContent="°C";
		IconTempNextTo.textContent="°C";
		IconTempToNextTo.textContent="°C";
		IconTempN.textContent="°C";
		tempC.checked =true;
	}
	
	if(Cels==='imperial'){
		tempF.className='tempFAc';
		tempC.className='tempC';
		IconTemp.textContent="°F";
		IconTempNext.textContent="°F";
		IconTempNextTo.textContent="°F";
		IconTempToNextTo.textContent="°F";
		IconTempN.textContent="°F";
		tempF.checked =true;
	}
	
	setTemper();
	
    getWeatherUser();
	getWeatherToDayUser();
	getWeatherNextToDayUser();
	getWeatherToNextToDayUser();	
}

function getTempC(){
	Cels='metric';
	ShowTemp();
}
function getTempF(){
	Cels='imperial';
	ShowTemp();
}

function getLangRU(){
	LanWeb='ru';
	ShowLang();
}
function getLangEN(){
	LanWeb='en';
	ShowLang();
}

function setLang(){
	localStorage.setItem('Langvig', LanWeb);
}
function setTemper(){
	localStorage.setItem('Temper', Cels);
}
function getLang(){
	if(localStorage.getItem('Langvig') != null)
	{   LanWeb = localStorage.getItem('Langvig');

	}
}
function getTemper(){
	if(localStorage.getItem('Temper') != null)
	   Cels = localStorage.getItem('Temper');
}


function setCity(event) {
  if (event.code === 'Enter' || event.type == 'click') {
    getWeatherUser();
	getWeatherToDayUser();
	getWeatherNextToDayUser();
	getWeatherToNextToDayUser();
    city.blur();
  }
}

navigator.geolocation.getCurrentPosition(SetLatitude);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
ButtNowIm.addEventListener('click', getLinkToImage);
tempC.addEventListener('click',getTempC);
tempF.addEventListener('click',getTempF);
ButtRU.addEventListener('click',getLangRU);
ButtEN.addEventListener('click',getLangEN);

searchButton.addEventListener('click',setCity);

// Run
showTime();
showDateTime();
getLinkToImage();
ShowMap();
SowNextDay();
ShowLang();
ShowTemp();