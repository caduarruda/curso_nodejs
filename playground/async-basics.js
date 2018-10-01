console.log('Starting app');

setTimeout(() => {
    console.log('Callback 1'); // Este termina segundo, pois o contador de tempo é maior, 
    // mas não segura a execução do restante em segundo-plano
}, 2000);

setTimeout( () => {
    console.log('Callback 2'); // Este termina primeiro pois o contador de tempo e menor
}, 1000 );

console.log('Finishing app');