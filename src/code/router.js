import React from 'react';

import Customers from './routes/customers';
import Training from './routes/training';
import Stats from './routes/stats';
import Scheduling from './routes/scheduling';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import getApi from './api/api_accessors';

const BasePage = ( ) => {
    const [ customerState, setCustomerState ] = React.useState ( [ ] );
    const [ trainingState, setTrainingState ] = React.useState ( [ ] );

    const [ selectedTab, setSelectedTab ] = React.useState ( 0 );

    const dataRefresh = ( ) => {
        fetch ( 'https://customerrest.herokuapp.com/api/customers' )
            .then ( resp => resp.json ( ) )
            .then ( resp => {
                setCustomerState ( resp.content );
                
            } )
            .catch ( err => console.error ( err ) );

        fetch ( 'https://customerrest.herokuapp.com/gettrainings' )
            .then ( resp => resp.json ( ) )
            .then ( resp => {
                setTrainingState ( resp );
                
            } )
            .catch ( err => console.error ( err ) );
    };

    React.useEffect ( ( ) => {
        dataRefresh ( );
    }, [ ] );

    const [ 
        addCustomer, 
        editCustomer, 
        removeCustomer, 
        addTraining,
        removeTraining 
    ] = getApi ( dataRefresh );

    return <Container maxWidth={ false }>
        <Box
            sx = { {
                borderBottom: 1,
                borderColor: 'divider'
            } }
        >
            <Tabs
                orientation = "horizontal"
                variant = "fullWidth"
                height = "100%"
                value = { selectedTab }
                onChange = { ( ev, newValue ) => setSelectedTab ( newValue ) }
            >
                <Tab label="Customers"/>
                <Tab label="Training"/>
                <Tab label="Scheduling"/>
                <Tab label="Statistics"/>
            </Tabs>
        </Box>
        
        { selectedTab === 0 && <Customers 
                                    data = { 
                                        { 
                                            state: customerState, 
                                            addCustomer: addCustomer, 
                                            editCustomer: editCustomer, 
                                            removeCustomer: removeCustomer, 
                                            addTraining: addTraining 
                                        } 
                                    }/> }
        { selectedTab === 1 && <Training 
                                    data = { 
                                        { 
                                            state: trainingState, 
                                            removeTraining: removeTraining 
                                        } 
                                    }/> }
        { selectedTab === 2 && <Scheduling
            state = { trainingState }
        /> }
        { selectedTab === 3 && <Stats
            state = { trainingState }
        /> }
    </Container>
};

export default BasePage;