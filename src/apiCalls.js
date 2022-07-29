export let getData = ( dataType ) => {
    return fetch( `http://localhost:3001/api/v1/${ dataType }` )
        .then( response => response.json() )
        .catch( error => console.log( error ) ); // Need to add error handling
}


export let postData = ( data ) => {
    return fetch( 'http://localhost:3001/api/v1/users', {
        method: 'POST',
        body: JSON.stringify( data ),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => response.json( ) )
    .catch( error => console.log( error ) ); // Need to add error handling
}