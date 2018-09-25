var getUser = (id, funccallback ) => {
    var user = {
        id: id, 
        name: 'Cadu'
    };

    setTimeout( () => {
        funccallback(user); // A funcao de callback sera chamada depois de 3 segundos.
    }, 3000 );
}

getUser( 31, (userObject) => { // Essa arrow-function será passada como argumento para getUser e executada dentro da funcao getUser
   console.log( userObject );
});