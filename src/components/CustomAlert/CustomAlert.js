import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';

const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomAlert = ({ isOpen, message, type }) => {
    const [open, setOpen] = useState(true)

    useEffect(() => {
        if(isOpen){
            setOpen(true)
        }
        else{
            setOpen(false)
        }
    }, [isOpen])

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
          <Alert severity={type} onClose={() => setOpen(false)}>
              {message}
          </Alert>
        </Snackbar>
    )
}

export default CustomAlert
