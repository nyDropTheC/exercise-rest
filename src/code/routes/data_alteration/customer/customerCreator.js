import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const CustomerCreator = ( props ) => {
    const [ isOpen, setOpen ] = React.useState ( false );

    const [ customerData, setCustomerData ] = React.useState ( {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    } );

    const uploadData = ( ) => {
        props.adder ( customerData );

        setOpen ( false );
        setCustomerData ( {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            streetaddress: '',
            postcode: '',
            city: ''
        } );
        
    }; // It kills itself with CORS for some reason

    const onInput = ( ev ) => {
        setCustomerData ( {
            ...customerData,
            [ ev.target.name ]: ev.target.value
        } );
    };

    const keyToLabelDataMap = {
        'firstname': 'First name',
        'lastname': 'Last name',
        'streetaddress': 'Street address',
        'postcode': 'Post code',
    } // Only for those that can't be easily localized

    return <div>
        <Button
            variant = 'contained'
            size = 'small'
            fullWidth = { true }
            color = 'primary'
            onClick = { ( ) => setOpen ( true ) }
        >Add customer</Button>

        <Dialog open={ isOpen } onClose = { ( ) => setOpen ( false ) }>
            <DialogTitle id='customer-add-title'>Add customer</DialogTitle>
            <DialogContent>
                {
                    Object.keys ( customerData ).map ( data => <TextField
                        key = { data } //React bitches at me if I do not do that
                        autoFocus
                        fullWidth
                        margin = 'dense'
                        name = { data }
                        label = { keyToLabelDataMap[ data ] || data.charAt ( 0 ).toUpperCase ( ) + data.slice ( 1 ) }

                        value = { customerData[ data ] }
                        onChange = { ev => onInput ( ev ) }
                    /> )
                }
            </DialogContent>

            <DialogActions>
                <Button onClick = { ( ) => setOpen ( false ) } color='primary'>Close</Button>
                <Button onClick = { ( ) => uploadData ( ) } color='primary'>Add</Button>
            </DialogActions>
        </Dialog>
    </div>
};

export default CustomerCreator;