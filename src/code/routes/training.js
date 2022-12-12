import React from 'react';

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import dayjs from 'dayjs';

import TrainingRemover from './data_alteration/training/trainingDeleter';

const Training = props => {
    const columns = [ {
        valueGetter: params => dayjs ( params.data.date ).format ( 'DD/MM/YYYY HH:mm' ),
        field: 'date'
    }, {
        field: 'activity'
    }, {
        field: 'duration',
        headerTooltip: 'min'
    }, {
        field: 'customer.firstname',
        headerName: 'First name'
    }, {
        field: 'customer.lastname',
        headerName: 'Last name'
    }, {
        field: 'customer.links',
        headerName: 'Delete',
        
        valueGetter: params => params.data,
        cellRenderer: ( data ) => <TrainingRemover data = { data.data } deleter = { props.data.removeTraining } />
    } ];

    /*
        activity 
: 
"Spinning"
customer
: 
{id: 1, firstname: 'John', lastname: 'Johnson', streetaddress: '5th Street', postcode: '23110', …}
date
: 
"2022-12-03T01:54:41.137+00:00"
duration
: 
60
id
: 
16
    */

    const sortableMemo = {
        sortable: true,
        filter: true,
        resizable: true
    };

    return <Container maxWidth = { false }>
        <Paper variant='elevation'>
            <div className = 'ag-theme-alpine-dark' style = { { width: 'auto' } }>
                <AgGridReact
                    rowData = { props.data.state.filter ( data => data.customer !== null ) }
                    columnDefs = { columns }
                    defaultColDef = { sortableMemo }
                    domLayout = 'autoHeight'
                ></AgGridReact>
            </div>
        </Paper>
    </Container>
        
};

export default Training;