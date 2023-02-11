const addCustomer = ( dataRefresh, data ) => {
    fetch ( 'https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        body: JSON.stringify ( data ),
        headers: {
            'Content-Type': 'application/json'
        }
    } )
        .then ( resp => resp.json ( ) )
        .then ( resp => { 
            dataRefresh ( ); 
        } )
        .catch ( err => console.error ( err ) );
}; // CORS seems to eff this up a bit, so I cannot add new customers?

const editCustomer = ( dataRefresh, data ) => {
    fetch ( data.links[ 1 ].href, {
        method: 'PUT',
        body: JSON.stringify ( data ),
        headers: {
            'Content-Type': 'application/json'
        }
    } )
        .then ( resp => {
            dataRefresh ( );
        } )
        .catch ( err => console.error ( err ) );
};

const removeCustomer = ( dataRefresh, data ) => {
    fetch ( data.links[ 1 ].href, {
        method: 'DELETE'
    } )
        .then ( resp => {
            dataRefresh ( );
        } )
        .catch ( err => console.error ( err ) );
};

const addTraining = ( dataRefresh, customer, data ) => {
    fetch ( 'https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        body: JSON.stringify ( {
            ...data,
            date: data.date.toISOString ( ),
            customer: customer.links[ 1 ].href
        } ),
        headers: {
            'Content-Type': 'application/json'
        }
    } )
        .then ( resp => {
            dataRefresh ( );
        } )
        .catch ( err => console.error ( err ) );
};

const removeTraining = ( dataRefresh, data ) => {
    fetch ( `https://customerrest.herokuapp.com/api/trainings/${data.id}`, {
        method: 'DELETE'
    } )
        .then ( resp => {
            dataRefresh ( )
        } )
        .catch ( err => console.error ( err ) );
}; // CORS keeps fucking me in the ass

const getApi = ( dataRefresh ) => {
    const apiFuncs = [
        addCustomer,
        editCustomer,
        removeCustomer,
        addTraining,
        removeTraining
    ];

    return apiFuncs.map ( fn => fn.bind ( this, dataRefresh ) );
};

export default getApi;

