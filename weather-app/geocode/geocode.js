const request = require('request');

var geoEndereco = (endereco, callback) => {

    var encondedEndereco = encodeURIComponent(endereco);
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encondedEndereco}&key=AIzaSyBuCN6iTNS4XYed_007jdQdVzXOed2f6mI`;

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Não é possivel conectar nos servidores Google.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('A pesquisa não encontrou o endereço informado nos servidores Google.');
        } else if (body.status !== 'OK') {
            callback('Houve um problema localizando o endereço informado nos servidores Google.');
        } else {
            callback(undefined, {
                endereco: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = {
    geoEndereco
}