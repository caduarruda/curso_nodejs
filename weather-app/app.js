 const yargs = require('yargs');
 const roundTo = require('round-to');

 const geocode = require('./geocode/geocode');
 const weather = require('./weather/weather');

 // Converter graus farenheit em celsius
 var convTemp = ( grausf ) => {
    return roundTo( (grausf - 32)/1.8000, 2 );
 };

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

  geocode.geoEndereco(argv.end, (msgErro, resultado ) => {
      if (msgErro) {
          console.log(msgErro);
      } else {
            weather.getInfo(resultado.latitude, resultado.longitude, (wmsgErro, wresultado) => {
                if(wmsgErro) {
                    console.log(wmsgErro);
                } else {
                    var temp = convTemp( wresultado.temperature);
                    var sens = convTemp( wresultado.apparentTemperature);
                    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Tempo APP -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
                    console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Fonte: Google e Forecast.io -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
                    console.log(`Endereço consultado:  ${resultado.endereco}`);
                    console.log(`Latitude: ${resultado.latitude}`);
                    console.log(`Longitude: ${resultado.longitude}`);
                    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
                    console.log(`Estão fazendo agora: ${temp} graus em ${resultado.endereco}.`);
                    console.log(`Sensação térmica de: ${sens} graus.`)
                    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
                }
            });
        }
  });