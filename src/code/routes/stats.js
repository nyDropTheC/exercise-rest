import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Box from '@mui/material/Container';
import Stack from '@mui/material/Stack';

const lodash = require ( 'lodash' );

const Stats = props => {
    const keyValuePairs = props.state.reduce ( ( accumulator, current ) => {
        if ( !( current.activity in accumulator ) ) {
            accumulator[ current.activity ] = 0;
        }

        accumulator[ current.activity ] += current.duration;

        return accumulator
    }, { } ); // I am aware this could be done more prettily with Lodash or something alike to that
    // Unfortunately, I do not care

    const rechartedPairs = lodash.map ( keyValuePairs, ( value, key ) => ( { name: key, value: value } ) );

    return <Box>
        <Stack spacing={ 15 }>
        <ResponsiveContainer width = '100%' height = '100%'>
            <BarChart width = {150} height = {40} data = {rechartedPairs} margin = { {
                top: 10,
                right: 20,
                left: 20,
                bottom: 10 
            } }>
                <XAxis dataKey = 'name' />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign = 'top' align = 'left' layout = 'vertical'/>
                <Bar dataKey = 'value' fill = '#8884d8' name = 'Total duration' unit = ' min'/>
            </BarChart>
        </ResponsiveContainer>
        </Stack>
    </Box>
        
};

export default Stats;