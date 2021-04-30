

const 
    time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    Name = document.querySelector('.name'),
    WeekDate = document.querySelector('.WeekDate'),
    Focus = document.querySelector('.focus'),
    btn = document.getElementById("btn"),
    all  = document.querySelector('.all'),
    quoteblock =document.querySelector('.quote'),
    changeQuoteButton = document.getElementById("quote_btn"),
     blockquote = document.querySelector('blockquote'),
     figcaption = document.querySelector('figcaption') ,
     wetherForecast = document.querySelector('.weatherForecast'),
     wetherForecast2 = document.querySelector('.weatherForecast2'),
      weatherIcon = document.querySelector('.weather-icon'),
     weather = document.querySelector('.city');

var months = ["January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"]; 
const times = ["nigth","morning","day","evening"];
const windDirection  = ["N","N-E","E","S-E", "S","S-W","W","N-W"];

var LastPic = {
    time :0,
    numb : 1
};
var prevText_Weather_City ="";

const showAmPm = true;

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        mins = today.getMinutes(),
        seconds = today.getSeconds();

   
        
    if ( mins <=9)
        mins =  "0"+mins;

    if ( seconds <=9)
         seconds =  "0"+seconds;
    time.innerHTML = `${hour}<span>:</span>${mins}<span>:</span>${seconds}`;

    setTimeout(showTime, 1000);
}

function  setTimesOfDayChanges() {
    let today = new Date(),
        hour = today.getHours();
        
    if (hour <= 5)
    {
        greeting.textContent = "Good Nigth";
        document.body.style.color = 'white';
        quoteblock.style.background = "rgba(0,0,0,.2)"; 

    }else if (hour <= 11)
    {
        greeting.textContent = "Good Morning";
        all.style.background = "rgba(255,255,255,.35)";
        quoteblock.style.background = "rgba(255,255,255,.3)";

    } else if (hour <= 17)
    {
        all.style.background = "rgba(255,255,255,.35)";
        quoteblock.style.background = "rgba(255,255,255,.5)";
        greeting.textContent = "Good Afternoon";

    } else if (hour <= 23)
    {
        greeting.textContent = "Good Evening";
        document.body.style.color = 'white';
        
        all.style.background = "rgba(0,0,0,.35)";
        //quoteblock.style.background = "rgba(0,0,0,.2)";
    } 
    let timeout = SetBackgroundPicture(hour, today.getMinutes());


    setTimeout(setTimesOfDayChanges, (1000*(60*timeout - today.getSeconds()) + 1000));
}


//Обеспечивает плавное изменение картинки
function viewBgImage(src) {  
    const img = new Image();
    img.src = src;
    img.onload = () => {      
        document.body.style.backgroundImage = `url(${src})`;
    }; 
  }

function  SetBackgroundPicture(hour, mins) {
    
    let tmp = hour;
    let path = "../assets/"
    let timeofday = (hour - hour%6)/6;

    path = path + times[timeofday];
    LastPic.time = timeofday;
    tmp = (tmp %6) *60 + mins;
    //console.log(tmp);
    let numb = (tmp  - tmp  % 18) / 18 + 1;
    LastPic.numb = numb;
    if (numb >=10)
        path = path + '/' + numb + '.jpg';
    else
        path = path + '/0' + numb + '.jpg';

   // document.body.style.background = path;  
   
   viewBgImage(path);
    return 18 -tmp%18;
    
}







function  SetDayOfWeek(){
    let today = new Date(),
    weekDay = today.getDay(),
    mounth = today.getMonth(),
    day =today.getDate();

    let output = "";
    switch (weekDay)
    {
        case 1: 
            output = output + "Monday,"
            break;
        case 2: 
            output = output + "Tuesday,"
            break;    
        case 3:
            output = output + "Wednesday," 
            break;  
        case 4: 
            output = output + "Thursday,"
            break;  
        case 5:
            output = output + "Friday," 
            break;  
        case 6:
            output = output + "Saturday," 
            break;  
        case 0:
            output = output + "Sunday," 
            break;  

    }
    output = output + " "+months[mounth];
      
    output = output + " " +day;
    WeekDate.textContent = output;

    let timeout = (24*60 - today.getHours()*60 - today.getMinutes()) * 60 - today.getSeconds() + 1;
    setTimeout(SetDayOfWeek, 1000*timeout);
}

//-----------------------------------------------------------------------------------
//Обработчики ввода
var prevText_Name ="", prevText_Focus ="";

function getName(item, itemName, defaultText)
{
    if (localStorage.getItem(itemName)==null)
        item.textContent =defaultText;
    else
        item.textContent =localStorage.getItem(itemName);

}
function setName(e) {
    if (e.type =='keypress')
    {
        if (    e.KeyCode == 13 || e.which == 13)
        {
            localStorage.setItem('name', e.target.innerText)
            Name.blur();
        }
    }
    else
    {
        if (e.target.innerText == "")
        {
            e.target.innerText = prevText_Name;
            return;
        }
        localStorage.setItem('name', e.target.innerText)
    }
}

function setFocus(e) {
    if (e.type =='keypress')
    {
        if (    e.KeyCode == 13 || e.which == 13)
        {
            localStorage.setItem('focus', e.target.innerText)
            Focus.blur();
        }
    }
    else
    {
        if (e.target.innerText == "")
        {
            e.target.innerText = prevText_Focus;
            return;
        }
        
        localStorage.setItem('focus', e.target.innerText)
    }
}

// обработчики 
function clearName(e) {
    prevText_Name = Name.textContent;
    Name.textContent = "";
}
function clearFocus(e) {
    prevText_Focus = Focus.textContent;
    Focus.textContent = "";
}

//-----------------------------------------------------------------------------------
//Обработчик кнопки 
function changeBgClick(e){
    LastPic.numb++;
    if (LastPic.numb>20)
    {
        LastPic.numb =1;
        LastPic.time++;
    }
    if (LastPic.time >3)
    {
        LastPic.time = 0;
    }
    let path = "../assets/"
   

    path = path + times[LastPic.time];
    if (LastPic.numb >=10)
        path = path + '/' + LastPic.numb + '.jpg';
    else
        path = path + '/0' + LastPic.numb + '.jpg';

    viewBgImage(path);
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);

}

// Change quote functuion


function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

var prevQuote = "";

async function changeQuote (e){
    const url = `https://quotesondesign.com/wp-json/wp/v2/posts/?method=getQuote&format=json&lang=en&orderby=rand`;
    
    const res = await fetch(url);
    //console.log(res);
    if (res == null)
        return;
    const data = await res.json(); 
   // console.log(data);

    let n =  randomInteger(0, data.length-1);
    for (let index = 0; index < data.length; index++) {
        if (data[n].content.rendered.length< 200 && data[n].content.rendered != prevQuote)
        {
            break;
        }
        else
        {
            
            n >=data.length-1?  n = 0:n++;;

        }
        
    }
    
    //console.log(n);
    prevQuote = data[n].content.rendered;
    blockquote.innerHTML = data[n].content.rendered;
    figcaption.innerHTML = data[n].title.rendered;
}


// weather block
async function GetWeather(CityName) {
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&lang=en&appid=8232ccfd8f61f1803c4d549b489953df&units=metric`;
    const res = await fetch(link);

    if (!res.ok)
    {
        wetherForecast.textContent = ":cannot find this city."
        return;
    }
    const data = await res.json(); 
    if (data.cod == 401)
    {   
        console.log(data);
        console.log(data.cod, data.message);
        return false;
    }
    let t = data.main.temp;
    if (t > 0)
        t = "+" + t;
    let angle = data.wind.deg + 22;
    angle = ((angle - angle % 45) /45) %8;

    weatherIcon.className = 'weather-icon owf'
    console.log(weatherIcon);
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    wetherForecast.textContent =  ":" + t +"°С, "+ data.main.humidity+"%  ";
    wetherForecast2.textContent = data.weather[0].description+ ", "+ data.wind.speed + " m/s, " + windDirection[angle];
    console.log(data);  
}


function setWeather(e) {
    if (e.type =='keypress')
    {
        if (    e.KeyCode == 13 || e.which == 13)
        {
            localStorage.setItem('Weather_City', e.target.innerText)
            weather.blur();
        }
    }
    else
    {
        if (e.target.innerText == "")
        {
            e.target.innerText = prevText_Weather_City;
            return;
        }
        prevText_Weather_City = e.target.innerText; 
        localStorage.setItem('Weather_City', e.target.innerText);
        GetWeather(e.target.innerText);
    }
}




document.addEventListener("DOMContentLoaded",changeQuote);
changeQuoteButton.addEventListener('click', changeQuote);
btn.addEventListener('click', changeBgClick);
Name.addEventListener('mousedown', clearName);
Name.addEventListener('keypress', setName);
Name.addEventListener('blur', setName);

Focus.addEventListener('mousedown', clearFocus);
Focus.addEventListener('keypress', setFocus);
Focus.addEventListener('blur', setFocus);

weather.addEventListener('keypress', setWeather);
weather.addEventListener('blur', setWeather);

SetDayOfWeek();
setTimesOfDayChanges();
showTime();
getName(Focus, 'focus',"[Enter Focus]");
getName(Name, 'name',"[Enter Name]");
getName(weather, 'Weather_City',"[Enter City]");
GetWeather(weather.innerText);