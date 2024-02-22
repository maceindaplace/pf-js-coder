let userName = 'admin';
let userEmail = 'admin@conversor.com';
let userPassword = '1234';

let userNameInput, emailInput, passwordInput;

// Verificación del nombre de usuario
for (let i = 0; i < 3; i++) {
    userNameInput = prompt('Ingrese su Nombre de Usuario:').toLocaleLowerCase();
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
