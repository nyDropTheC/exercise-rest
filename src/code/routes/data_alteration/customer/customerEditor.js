import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import EditAttributes from '@mui/icons-material/EditAttributes';

const CustomerEditor = ( props ) => { // React bitches at me if I forget the round brackets
    const [ isOpen, setOpen ] = React.useState ( false );

    const [ customerData, setCustomerData ] = React.useState ( {
        firstname: '',
        lastname: '',
        
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: '',

        content: [ ], // useless field i keep here lol
        links: [ ] // useless for get/set, but useful for making requests
    } );

    const uploadData = ( ) => {
        setOpen ( false );

        props.editor ( customerData );
    }; // It kills itself with CORS for some reason

    const onOpen = ( ) => {
        setOpen ( true );
        setCustomerData ( props.customer.data );
    };

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
            startIcon = { <EditAttributes /> }
            fullWidth = { true }
            color = 'primary'
            onClick = { ( ) => onOpen ( ) }
        >Edit</Button>

        <Dialog open={ isOpen } onClose = { ( ) => setOpen ( false ) }>
            <DialogTitle id='customer-add-title'>Editor</DialogTitle>
            <DialogContent>
                {
                    Object.keys ( customerData ).filter ( data => data !== 'links' && data !== 'content' ).map ( data => <TextField
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
                <Button onClick = { ( ) => uploadData ( ) } color='primary'>Edit</Button>
            </DialogActions>
        </Dialog>
    </div>
};

export default CustomerEditor;