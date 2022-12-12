import React from 'react';
import { ExportToCsv } from 'export-to-csv';

import Button from '@mui/material/Button';

const removeUnnecessaryFields = ( obj, fields ) => {
    const keys = Object.keys ( obj ).filter ( key => !(key in fields) );
    const ret = { };

    for ( let key of keys ) {
        ret[ key ] = obj[ key ];
    }

    return ret;
};

const CSVExporter = ( props ) => {
    // Imagine my surprise when I learned JS will iterate literal object keys in insertion order
    // Very cool, JS

    const onClick = ( ) => {
        let arr = props.processedList;
        
        if ( props.badFields !== undefined ) {
            arr = arr.map ( data => removeUnnecessaryFields ( data, props.badFields ) );
        }

        new ExportToCsv ( {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            filename: props.fileName || 'generated',
            title: props.title || 'Exported CSV',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true
        } ).generateCsv ( arr );
    };

    return <div>
        <Button { ...props.buttonInfo } onClick = { ( ) => onClick ( ) }>Export to CSV</Button>
    </div>
};

export default CSVExporter;