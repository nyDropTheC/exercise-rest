import React from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import CustomerCreator from './data_alteration/customer/customerCreator';
import CustomerEditor from './data_alteration/customer/customerEditor';
import CustomerRemover from './data_alteration/customer/customerRemover';

import TrainingAdder from './data_alteration/training/trainingAdder';

import CSVExporter from './export/csv';

const Customers = props => {
    const columns = [ {
        headerName: 'First name',
        field: 'firstname',
    }, {
        headerName: 'Surname',
        field: 'lastname',
    }, {
        field: 'phone'
    }, {
        field: 'email'
    }, {
        headerName: 'Street address',
        field: 'streetaddress'
    }, {
        field: 'postcode'
    }, {
        field: 'city'
    }, {
        filter: false,
        sortable: false,

        field: 'links[2]',
        headerName: 'Training',
        valueGetter: params => params.data,

        cellRenderer: ( data ) => <TrainingAdder customer = { data } adder = { props.data.addTraining } />
    }, {
        filter: false,
        sortable: false,

        field: 'links[0]',
        headerName: 'Edit',
        valueGetter: params => params.data,

        cellRenderer: ( data ) => <CustomerEditor customer= { data } editor={ props.data.editCustomer }/>,
    }, {
        filter: false,
        sortable: false,

        field: 'links[1]',
        headerName: 'Delete',
        valueGetter: params => params.data,

        cellRenderer: ( data ) => <CustomerRemover data = { data } remover = { props.data.removeCustomer } />
    } ];

    const sortableMemo = {
        sortable: true,
        filter: true,
        resizable: true
    };

    const unexportableFields = {
        'content': true,
        'links': true
    };

    return <Container maxWidth = { false }>
        <Paper variant='elevation'>
            <Stack direction = "column" spacing = { 1 }>
                <div className = 'ag-theme-alpine-dark' style = { { width: 'auto' } }>
                    <AgGridReact
                        rowData = { props.data.state }
                        columnDefs = { columns }
                        domLayout = 'autoHeight'
                        defaultColDef = { sortableMemo }
                    ></AgGridReact>
                </div>
                <CustomerCreator adder = { props.data.addCustomer }/>
                <CSVExporter 
                    processedList = { props.data.state } 
                    badFields = { unexportableFields } 
                    fileName = 'customerData' 
                    title = 'Customer data'
                    buttonInfo = { {
                        variant: 'contained',
                        size: 'small',
                        fullWidth: true
                    } }
                />
            </Stack>
        </Paper>
    </Container>
    
};

export default Customers;