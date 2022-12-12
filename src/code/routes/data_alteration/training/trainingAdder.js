import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const TrainingAdder = ( props ) => {
    const [ isOpen, setOpen ] = React.useState ( false );

    const [ trainingInput, setTraining ] = React.useState ( {
        date: dayjs ( ),
        activity: '',
        duration: ''
    } );

    const onAdd = ( ) => {
        props.adder ( props.customer.data, trainingInput );
    };

    const onChange = ( ev ) => {
        setTraining ( {
            ...trainingInput,
            [ ev.target.name ]: ev.target.value
        } );
    }

    const excluded = { 'date': true };

    return <div>
        <Button
            variant = 'contained'
            size = 'small'
            fullWidth = { true }
            color = 'success'
            onClick = { ( ) => setOpen ( true ) }
        >Add training</Button>

        <Dialog open = { isOpen } onClose = { ( ) => setOpen ( false ) }>
            <DialogTitle id='training-add-title'>Add training</DialogTitle>
            <DialogContent>
                {
                    Object.keys ( trainingInput ).filter ( data => !excluded[ data ] ).map ( data => <TextField 
                        key = { data }
                        autoFocus
                        fullWidth
                        margin = 'dense'
                        name = { data }
                        label = { data.charAt ( 0 ).toLocaleUpperCase ( ) + data.slice ( 1 ) }

                        value = { trainingInput[ data ] }
                        onChange = { ev => onChange ( ev ) }
                    />)
                }

                <DateTimePicker // it doesn't use the correct locale - who cares?
                    label = 'Date'
                    value = { trainingInput.date }
                    onChange = { ( newValue ) => {
                        setTraining ( { ...trainingInput, date: newValue } )
                    } }
                    renderInput = { ( params ) => {
                        return <TextField { ...params } /> 
                    } }
                />
            </DialogContent>

            <DialogActions>
                <Button onClick = { ( ) => setOpen ( false ) } color='error'>Close</Button>
                <Button onClick = { ( ) => onAdd ( ) } color='success'>Add</Button>
            </DialogActions>
        </Dialog>
    </div>
};

export default TrainingAdder;