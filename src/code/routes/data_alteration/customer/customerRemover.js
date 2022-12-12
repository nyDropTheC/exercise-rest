import React from 'react';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForever from '@mui/icons-material/DeleteForever';

const CustomerRemover = ( props ) => {
    const [ isInConfirmation, setConfirmation ] = React.useState ( false );

    const onDelete = ( ) => {
        props.remover ( props.data.data );
        setConfirmation ( false );
    };

    return <div>
        <Button
            variant = 'contained'
            size = 'small'
            fullWidth = { true }
            color = 'error'
            startIcon = { <DeleteForever /> }
            onClick = { ( ) => setConfirmation ( true ) }
        >Delete</Button>

        <Dialog open={ isInConfirmation } onClose = { ( ) => setConfirmation ( false ) }>
            <DialogTitle id='confirm-customer-removal'>Are you sure?</DialogTitle>

            <DialogActions>
                <Button 
                    onClick = { ( ) => onDelete ( ) } 
                    color = 'error' 
                    size = 'small' 
                    variant = 'contained'
                    fullWidth = { true }
                >Delete</Button>
            </DialogActions>
        </Dialog>
    </div>;
};

export default CustomerRemover;