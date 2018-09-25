const request = require('request');
const yargs = require('yargs');

const argv = yargs
            .options({
                e: {
                    demand: true,
                    alias: 'end',
                    describe: 'Endereço referência para as informações do tempo.',
                    string: true
                }
            })
            .help()
            .alias('help','h')
            .argv;
request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=avenida%20celso%20garcia,%205754%20tatuape%20sao%20paulo,cep%2003064000&key=AIzaSyBuCN6iTNS4XYed_007jdQdVzXOed2f6mI',
    json: true
 }, (error, response, body) => {
     //console.log(JSON.stringify(body, undefined, 2));
     console.log(`Endereço: ${body.results[0].formatted_address}`);
     console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
     console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});