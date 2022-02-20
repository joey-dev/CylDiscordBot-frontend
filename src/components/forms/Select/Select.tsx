import { SelectChangeEvent, Select as MuiSelect } from '@mui/material';
import React from 'react';


type Props = {
    value: string;
    label: string;
    children: React.ReactNode;
    onChange: (event: SelectChangeEvent) => void;
};

const Select: React.FC<Props> = (props: Props) => {
    return (
        <MuiSelect
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={props.value}
            onChange={props.onChange}
            label={props.label}
        >
            {props.children}
        </MuiSelect>
    );
};

export default (Select);
