// chave api está no meu email

document.getElementById('weatherForm').addEventListener('submit', function (e) {
  e.preventDefault()
// preventDefault previne o comportamento padrão do formulário de RECARREGAR a página.

  const city = document.getElementById('cityInput').value
  getWeather(city)
})

function getWeather(city) {
  const apiKey = 'CHAVEAPIESTANOMEUEMAIL'
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Atualize os elementos HTML com os dados da API
      document.getElementById(
        'place'
      ).innerText = `${data.name}, ${data.sys.country}`
      document.getElementById(
        'degrees'
      ).innerText = `Temperatura: ${data.main.temp.toFixed(1)}°C`
      //converti m/s para km/h
      const speedInKm = data.wind.speed * 3.6
      document.getElementById(
        'wind'
      ).innerText = `Velocidade do Vento: ${speedInKm.toFixed(1)} Km/h`
      //avisar se está chovendo
      const condicaoMet = data.weather[0].main.toLocaleLowerCase();
      const condicaoChuva = ['rain', 'drizzle', 'thunderstorm']
      
      document.getElementById(
        'precipitation'
      ).innerText = `${condicaoMet}`
      if (condicaoChuva.includes(condicaoMet)) {
        document.getElementById('precipitation').innerText = 'Leve o guarda-chuva!';
    }
      // A URL da imagem do ícone do clima é fornecida pela API
      const weatherIcon = document.getElementById('weatherIcon')
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      weatherIcon.alt = data.weather[0].description

      // remove a classe hiden dos icones
      document.querySelectorAll('#content-response i').forEach(icon => {
        icon.classList.remove('hidden')
      })
    
    })
    .catch(error => {
      console.error('Erro ao obter dados da API:', error)
    })
}
