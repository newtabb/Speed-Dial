document.addEventListener("DOMContentLoaded", function () {
  const weatherIconMap = {
    // Céu limpo e parcialmente nublado
    1000: 'icon/weather/clear.png',             // Céu limpo
    1003: 'icon/weather/partly_cloudy.png',       // Parcialmente nublado
    1006: 'icon/weather/cloudy.png',              // Nublado
    1009: 'icon/weather/overcast.png',            // Encoberto

    // Condições de chuva leve (muito comuns durante a estação das chuvas)
    1063: 'icon/weather/light_rain.png',          // Chuva leve / garoa
    1180: 'icon/weather/light_rain.png',          // Chuva leve
    1183: 'icon/weather/light_rain.png',          // Chuva leve

    // Condições de chuva moderada
    1186: 'iconsweather/rain.png',                // Chuva moderada
    1189: 'icon/weather/rain.png',                // Chuva moderada

    // Chuva pesada (em períodos de tempestade tropicais)
    1192: 'icon/weather/heavy_rain.png',          // Chuva forte em alguns momentos
    1195: 'icon/weather/heavy_rain.png',          // Chuva pesada

    // Tempestades
    1087: 'icon/weather/thunderstorm.png',        // Possíveis tempestades
    1273: 'icon/weather/thunderstorm.png',        // Tempestade com chuva leve
    1276: 'icon/weather/thunderstorm.png',        // Tempestade com chuva

    // Outros códigos podem ocorrer; usa-se default como fallback.
  };

  // Atualização da seção de clima
  const apiKey = "e4daac4d1a15408b9a0233727252903"; // Substitua pela sua chave válida da WeatherAPI
  const cidade = "Salvador";     // Altere conforme necessário
  const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}&lang=pt`;

  fetch(weatherUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.location && data.current) {
        document.getElementById("city").textContent = data.location.name;
        document.getElementById("temperature").innerHTML = `${data.current.temp_c}&deg;C`;

        const iconUrl = "https:" + data.current.condition.icon;
        document.getElementById("weatherIcon").src = iconUrl;
        document.getElementById("weatherIcon").alt = data.current.condition.text;
      } else {
        document.getElementById("city").textContent = "Dados não disponíveis";
      }
    })
    .catch((error) => {
      console.error("Erro ao obter dados do clima:", error);
      document.getElementById("city").textContent = "Erro ao carregar o clima";
    });

  // Função para atualizar a cotação do dólar em tempo real
  function updateDollarRate() {
    fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Usamos a propriedade "bid" para exibir o valor atual
        const rate = data.USDBRL.bid;
        document.getElementById("dollarValue").textContent = `Dólar: R$ ${rate}`;
      })
      .catch((error) => {
        console.error("Erro ao obter cotação do dólar:", error);
        document.getElementById("dollarValue").textContent = "Erro na cotação";
      });
  }

  // Chama a função de atualização imediatamente e depois a cada 60 segundos
  updateDollarRate();
  setInterval(updateDollarRate, 60000);

  // Função para realizar a pesquisa
  function realizarPesquisa() {
    const query = document.getElementById("searchInput").value.trim();
    if (query !== "") {
      // Redireciona para o Google usando a mesma guia
      window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(query);
    }
  }

  // Event listener para o botão de pesquisa
  document.getElementById("searchIcon").addEventListener("click", realizarPesquisa);

  // Permite a pesquisa pressionando "Enter"
  document.getElementById("searchInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      realizarPesquisa();
    }
  });
});