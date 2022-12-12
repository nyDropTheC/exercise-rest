import BasePage from './code/router';
import React from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const appTheme = createTheme ( {
    palette: {
        mode: 'dark'
    }
} );

const App = ( ) => {
    return <div>
        <LocalizationProvider dateAdapter = { AdapterDayjs }>
            <ThemeProvider theme = { appTheme }>
                <CssBaseline />
                <BasePage />
            </ThemeProvider>
        </LocalizationProvider>
    </div>
};

export default App;
