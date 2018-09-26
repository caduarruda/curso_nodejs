const request = require('request');

var getInfo = (lat, lng, callback) => {

    var url = `https://api.darksky.net/forecast/78b66e2e9f96f5952acfc5d49c20541e/${lat},${lng}`;

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Não foi possivel conectar nos servidores forcast.io');
        } else if(response.statusCode === 400) {
            calback('Não foi possivel pegar informações do tempo em forcast.io');
        } else if(response.statusCode === 200) {
            callback( undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });   
}

module.exports = {
    getInfo
}