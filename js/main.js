// Desarrollo JS para Proyecto Final JavaScript 2024
// Autor: Martin Andres d'Huicque

let userName = 'admin';
let userEmail = 'admin@travelconversor.com';
let userPassword = '1234';

let userNameInput, emailInput, passwordInput;

// Verificación del nombre de usuario
for (let i = 0; i < 3; i++) {
    userNameInput = prompt('Ingrese su Nombre de Usuario - Datos de Acceso en ReadMe.md').toLocaleLowerCase();
    if (userNameInput === userName) {
        alert('Usuario correcto.');
        break;
    } else {
        alert('Nombre de usuario incorrecto. Intento restante: ' + (2 - i));
        if (i === 2) {
            alert('Se han agotado los intentos para ingresar el nombre de usuario. El servicio terminará.');
            throw new Error('Intentos agotados.');
        }
    }
}

// Verificación del correo electrónico
for (let i = 0; i < 3; i++) {
    emailInput = prompt('Ingrese su Correo Electrónico:');
    if (emailInput === userEmail) {
        alert('Correo electrónico correcto.');
        break;
    } else {
        alert('Correo electrónico incorrecto. Intento restante: ' + (2 - i));
        if (i === 2) {
            alert('Se han agotado los intentos para ingresar el correo electrónico. El servicio terminará.');
            throw new Error('Intentos agotados.');
        }
    }
}

// Verificación de la clave
for (let i = 0; i < 3; i++) {
    passwordInput = prompt('Ingrese su Clave:');
    if (passwordInput === userPassword) {
        alert('Clave correcta. Acceso concedido.');
        break;
    } else {
        alert('Clave incorrecta. Intento restante: ' + (2 - i));
        if (i === 2) {
            alert('Se han agotado los intentos para ingresar la clave. El servicio terminará.');
            throw new Error('Intentos agotados.');
        }
    }
}

// Si llega hasta aquí, todas las credenciales son correctas.
alert('Bienvenido al Conversor de divisas para tu viaje!.');

document.addEventListener('DOMContentLoaded', function() {
// Lista estática de países para crear datalist
    const paises = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
        "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
        "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
        "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
        "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
        "Cape Verde", "Central African Republic", "Chad", "Chile", "China",
        "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia",
        "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
        "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt",
        "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia",
        "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
        "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
        "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland",
        "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
        "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
        "North Korea", "South Korea", "Kuwait", "Kyrgyzstan", "Laos",
        "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
        "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi",
        "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
        "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
        "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
        "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
        "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau",
        "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
        "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
        "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
        "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
        "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
        "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
        "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden",
        "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
        "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
        "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
        "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
        "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    const paisesLista = document.getElementById('paises');
    paises.forEach(pais => {
        let option = new Option(pais, pais);
        paisesLista.appendChild(option);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const montoInput = document.getElementById('monto');
    const origenMonedaSelector = document.getElementById('origen-moneda');
    const destinoMonedaSelector = document.getElementById('destino-moneda');
    const botonConversion = document.getElementById('convertir');
    const resultadoDisplay = document.getElementById('resultado');

    // Seleccion de Monedas comunes para mostrar primero
    const commonCurrencies = ["USD", "EUR", "GBP", "JPY", "CNY"];

    // Carga inicial de todas las divisas disponibles
    function initializeCurrencySelectors() {
        fetch('https://api.exchangerate-api.com/v4/latest/USD') // Usando USD como base para obtener todas las monedas
            .then(response => response.json())
            .then(data => {
                const monedasCodigos = Object.keys(data.rates);
                // Añadir primero las monedas comunes
                commonCurrencies.forEach(code => {
                    if (monedasCodigos.includes(code)) {
                        let option = new Option(code, code);
                        origenMonedaSelector.appendChild(option.cloneNode(true));
                        destinoMonedaSelector.appendChild(option.cloneNode(true));
                    }
                });
                // Añadir el resto de monedas
                monedasCodigos.forEach(code => {
                    if (!commonCurrencies.includes(code)) {
                        let option = new Option(code, code);
                        origenMonedaSelector.appendChild(option.cloneNode(true));
                        destinoMonedaSelector.appendChild(option.cloneNode(true));
                    }
                });
            })
            .catch(error => {
                console.error('Error cargando divisas:', error);
                resultadoDisplay.textContent = 'Error en la información de conversión de divisas.';
            });
    }

    initializeCurrencySelectors(); // Llamar a la función al cargar la página

    // Función para cargar tasas de cambio
    function loadExchangeRates(monedaBase, callback) {
        fetch(`https://api.exchangerate-api.com/v4/latest/${monedaBase}`)
            .then(response => response.json())
            .then(data => {
                callback(data.rates);
            })
            .catch(error => {
                console.error('Error en la información de conversión de divisas:', error);
                resultadoDisplay.textContent = 'Error en la información de conversión de divisas.';
            });
    }

    // Función para calcular la conversión
    function convertCurrency(monto, fromRate, toRate) {
        return (monto * (toRate / fromRate)).toFixed(2);
    }

    // Manejo del evento de conversión
    botonConversion.addEventListener('click', function() {
        const monto = parseFloat(montoInput.value) || 0;
        const fromCurrency = origenMonedaSelector.value;
        const toCurrency = destinoMonedaSelector.value;

        if (monto === 0) {
            resultadoDisplay.textContent = 'Por favor ingrese un monto correcto';
            return;
        }

        loadExchangeRates(fromCurrency, (rates) => {
            const fromRate = rates[fromCurrency];
            const toRate = rates[toCurrency];
            const resultado = convertCurrency(monto, fromRate, toRate);
            resultadoDisplay.textContent = `${monto} ${fromCurrency} es igual a ${resultado} ${toCurrency}`;
        });
    });
});

// Fetch API de Unsplash para imagenes de Lugares de Origen y Destino de la app

document.addEventListener('DOMContentLoaded', function() {
    const paisOrigenInput = document.getElementById('ubicacion-actual');
    const paisDestinoInput = document.getElementById('ubicacion-destino');
    const paisOrigenImage = document.getElementById('ubicacion-actual-img');
    const paisDestinoImage = document.getElementById('destino-img');

    function fetchImagePais(paisInput, imageContainer) {
        const pais = paisInput.value;
        fetch(`https://api.unsplash.com/search/photos?query=${pais}&client_id=x4A0Vj7CbUUus9Q8t6oDnKfLvlTzw5XnIgwTaoUyLjo`)
            .then(response => response.json())
            .then(data => {
                if (data && data.results && data.results.length > 0) {
                    const imageUrl = data.results[0].urls.regular;
                    imageContainer.style.backgroundImage = `url('${imageUrl}')`;
                    imageContainer.style.backgroundSize = 'cover';
                    imageContainer.style.backgroundPosition = 'center';
                } else {
                    imageContainer.style.backgroundImage = 'none';
                    imageContainer.textContent = 'No hay una imagen en Unsplash';
                }
            })
            .catch(error => {
                console.error('Error haciendo fetching para imagen de Unsplash:', error);
                imageContainer.textContent = 'Error cargando imagen';
            });
    }

    paisOrigenInput.addEventListener('input', function() {
        fetchImagePais(this, paisOrigenImage);
    });

    paisDestinoInput.addEventListener('input', function() {
        fetchImagePais(this, paisDestinoImage);
    });
});

// Función para borrar formulario completo, conversiones y las imagenes
// Permite que los enlaces de Alojamiento y Actividades se oculten si no hay destino seleccionado

function updateVisibilidadLinks() {
    const destino = document.getElementById('ubicacion-destino').value;
    const destinoList = document.getElementById('paises');
    const DestinoValido = destino && Array.from(destinationList.options).some(option => option.value === destino);
    const linksDestino = document.getElementById('destino-links');

//Creación de Enlaces Sencillos de Busqueda en Google segun la locación
    if (DestinoValido) {
        document.getElementById('hospedaje-link').href = `https://www.google.com/search?q=Alojamientos+en+${encodeURIComponent(destino)}`;
        document.getElementById('actividades-link').href = `https://www.google.com/search?q=Qué+hacer+en+${encodeURIComponent(destino)}`;
        document.getElementById('hospedaje-link').querySelector('span').textContent = `Alojamientos en ${destino}`;
        document.getElementById('actividades-link').querySelector('span').textContent = `Qué hacer en ${destino}`;
        linksDestino.style.display = 'flex'; // Muestra los enlaces
    } else {
        linksDestino.style.display = 'none'; // Oculta los enlaces
    }
}

// Asignar correctamente los event listeners
document.getElementById('ubicacion-destino').addEventListener('input', updateVisibilidadLinks);

document.getElementById('borrar').addEventListener('click', function() {
    document.getElementById('ubicacion-actual').value = '';
    document.getElementById('ubicacion-destino').value = '';
    document.getElementById('origen-moneda').selectedIndex = 0;
    document.getElementById('destino-moneda').selectedIndex = 0;
    document.getElementById('monto').value = '';
    document.getElementById('resultado').textContent = '';
    document.getElementById('ubicacion-actual-img').style.backgroundImage = '';
    document.getElementById('destino-img').style.backgroundImage = '';

    // Resetear enlaces y ocultar contenedor de enlaces
    const hospedajeLink = document.getElementById('hospedaje-link');
    const actividadesLink = document.getElementById('actividades-link');
    const linksDestino = document.getElementById('destino-links');

    hospedajeLink.href = '#';
    actividadesLink.href = '#';

    hospedajeLink.querySelector('span').textContent = 'Alojamientos en [Destino]';
    actividadesLink.querySelector('span').textContent = 'Qué hacer en [Destino]';
    linksDestino.style.display = 'none'; // Usa estilo directo para controlar la visibilidad
});


// Función para cargar tabla con registro de las ultimas 10 conversiones realizadas por el usuario

document.addEventListener('DOMContentLoaded', function() {
    const botonConversion = document.getElementById('convertir');
    const contendorRegistros = document.getElementById('convertir-registros');
    const origenMonedaSelector = document.getElementById('origen-moneda');
    const destinoMonedaSelector = document.getElementById('destino-moneda');
    const montoInput = document.getElementById('monto');
    const resultadoDisplay = document.getElementById('resultado');

    botonConversion.addEventListener('click', function() {
        const fromCurrency = origenMonedaSelector.value;
        const toCurrency = destinoMonedaSelector.value;
        const monto = parseFloat(montoInput.value);

        if (!monto) {
            alert("Por favor, ingresa una cantidad válida.");
            return;
        }

        loadExchangeRates(fromCurrency, (rates) => {
            if (!rates[toCurrency]) {
                alert("Error al recuperar la tasa de cambio.");
                return;
            }
            const fromRate = rates[fromCurrency];
            const toRate = rates[toCurrency];
            const conversionRate = (toRate / fromRate).toFixed(6);
            const resultado = convertCurrency(monto, fromRate, toRate);

            resultadoDisplay.textContent = `${monto} ${fromCurrency} es igual a ${resultado} ${toCurrency}`;

            const dateTime = new Date().toLocaleString();
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${monto}</td>
                <td>${fromCurrency}</td>
                <td>${resultado}</td>
                <td>${toCurrency}</td>
                <td>${conversionRate}</td>
                <td>${dateTime}</td>
            `;
            contendorRegistros.insertBefore(newRow, contendorRegistros.firstChild);

            // Limitar a las últimas 10 entradas
            while (contendorRegistros.rows.length > 10) {
                contendorRegistros.deleteRow(10);
            }
        });
    });
});

function loadExchangeRates(monedaBase, callback) {
    fetch(`https://api.exchangerate-api.com/v4/latest/${monedaBase}`)
        .then(response => response.json())
        .then(data => callback(data.rates))
        .catch(error => console.error('Error Cargando las divisas:', error));
}

function convertCurrency(monto, fromRate, toRate) {
    return (monto * (toRate / fromRate)).toFixed(2);
}


document.getElementById('ubicacion-destino').addEventListener('input', function() {
    const destino = this.value;
    const destinationList = document.getElementById('paises');
    const hospedajeLink = document.getElementById('hospedaje-link');
    const actividadesLink = document.getElementById('actividades-link');
    const linksDestino = document.getElementById('destino-links');

    // Verifica si el destino está en el datalist
    const DestinoValido = Array.from(destinationList.options).some(option => option.value === destino);

    if (DestinoValido) {
        hospedajeLink.href = `https://www.google.com/search?q=Alojamientos+en+${encodeURIComponent(destino)}`;
        actividadesLink.href = `https://www.google.com/search?q=Qué+hacer+en+${encodeURIComponent(destino)}`;
    
        hospedajeLink.querySelector('span').textContent = `Alojamientos en ${destino}`;
        actividadesLink.querySelector('span').textContent = `Qué hacer en ${destino}`;
    
        linksDestino.classList.add('visible');
    } else {
        linksDestino.classList.remove('visible');
    }
});

