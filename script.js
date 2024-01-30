document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const currentDate = dayjs().format('DD/MM/YYYY');   
    const apiKey = '2fb2e898d56792b6d47cffb5c77a6d47';
    const city = document.getElementById('search-input').value;
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const inputHistory= document.getElementById('history');
    let inputCity = document.getElementById('search-input').value;
    
    fetch(queryURL)
      .then(response => {        
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }       
        return response.json();
      })
      .then(data => {                
        const weatherToday = document.getElementById('today');
        const forecastFiveDays = document.getElementById('forecast');

        let icon = data.list[0].weather[0].icon;
        let iconUrl =  `https://openweathermap.org/img/wn/${icon}.png`;       
        
        // show weather current day
        weatherToday.innerHTML = `
          <h2>${data.city.name} (${currentDate}) <img src="${iconUrl}"></h2>   
          <p>Temp: ${data.list[0].main.temp} &degC </p>
          <p>Wind: ${data.list[0].wind.speed} KPH</p>
          <p>Humidity: ${data.list[0].main.humidity}%</p>
        `;

        // show weather for next 5 days
        const fiveDay = () => {
          forecastFiveDays.innerHTML = '';
          for (let i = 0; i < data.list.length; i++) {
            let fiveDayDataList = data.list[i];
            // console.log(fiveDayDataList);
            let apiDayDateTime = fiveDayDataList.dt_txt;      
            const fiveDayDate = dayjs(apiDayDateTime).format('DD/MM/YYYY');   
            const fiveDayTime = dayjs(apiDayDateTime).format('HH:mm:ss');
            
            // console.log(fiveDayTime); 
            let fiveDayIconUrl = `https://openweathermap.org/img/w/${fiveDayDataList.weather[0].icon}.png`;  
            if(fiveDayTime === '15:00:00') {                           
              forecastFiveDays.innerHTML += `
                <div class="card m-2 p-4 bg-primary">    
                    <h3>${fiveDayDate}</h3>
                    <p> <img src="${fiveDayIconUrl}"></p>
                    <p>Temp: ${fiveDayDataList.main.temp}&degC;</p>     
                    <p>Wind: ${fiveDayDataList.wind.speed} KPH</p>               
                    <p>Humidity: ${fiveDayDataList.main.humidity}%</p>
                </div>`;              
            }                
          }
        };
        fiveDay();
        
      })
      .catch(error => console.error(error));
});
