let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let api_key = '247ba97b94272c5085d92473a7032a0c'
let difKelvin = 273.15

document.getElementById('botonBusqueda').addEventListener('click', () =>{
    const ciudad = document.getElementById('ciudadEntrada').value
    if(ciudad){
        fetchDatosClima(ciudad)
    }
})
document.getElementById('ciudadEntrada').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que se realice la acción predeterminada del "Enter" (por ejemplo, enviar un formulario)
        const ciudad = document.getElementById('ciudadEntrada').value;
        if (ciudad) {
            fetchDatosClima(ciudad);
        }
    }
});


function fetchDatosClima(ciudad){
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
    .then(data => data.json())
    .then(data => mostrarDatosClima(data))
}

function mostrarDatosClima(data){
    console.log(data)
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML=''

    const ciudadNombre = data.name
    const paisNombre = data.sys.country
    const temperatura = data.main.temp
    const descripcion = data.weather[0].description
    const humedad = data.main.humidity
    const icono = data.weather[0].icon
    const ciudadTitulo = document.createElement('h2')
    ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`

    const temperaturaInfo = document.createElement('p')
    temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura-difKelvin)}°C`

    const iconoInfo = document.createElement('img');
    iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`;
    const descripcionInfo = document.createElement('p')
    descripcionInfo.textContent = `La descripcion meteorológica es: ${descripcion}`

    const humedadInfo = document.createElement('p')
    humedadInfo.textContent = `La Humedad es: ${humedad}`

    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(temperaturaInfo)
    divDatosClima.appendChild(descripcionInfo)
    divDatosClima.appendChild(humedadInfo)
    divDatosClima.appendChild(iconoInfo)
}
