document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const currentDate = dayjs().format('DD/MM/YYYY');
    const apiKey = '2fb2e898d56792b6d47cffb5c77a6d47';
    const city = document.getElementById('search-input').value;
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const inputHistory= document.getElementById('history')

    
    
    fetch(queryURL)
      .then(response => {        
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`);
        }       
        return response.json();
      })
      .then(data => {        
        console.log(data)
        const weatherToday = document.getElementById('today');

        var icon =data.list[0].weather[0].icon;
        var iconUrl =  `https://openweathermap.org/img/wn/${icon}.png`;       
        
        weatherToday.innerHTML = `
          <h2>${data.city.name} (${currentDate}) <img src="${iconUrl}"></h2>   
          <p>${data.list[0].main.temp} &degC </p>
          <p>${data.list[0].wind.speed}</p>
          <p>${data.list[0].main.humidity}%</p>
        `;
      })
      .catch(error => console.error(error));
});
