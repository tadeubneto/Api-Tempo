// chave api está no meu email

document.getElementById('weatherForm').addEventListener('submit', function (e) {
  e.preventDefault()
  // preventDefault previne o comportamento padrão do formulário de RECARREGAR a página.

  const city = document.getElementById('cityInput').value
  getWeather(city)
})

function getWeather(city) {
  const apiKey = 'fac693ca9e878854d3e3d17e3fac9630'
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
      ).innerText = `Temperatura: ${data.main.temp}°C`
      document.getElementById(
        'wind'
      ).innerText = `Velocidade do Vento: ${data.wind.speed} m/s`

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
