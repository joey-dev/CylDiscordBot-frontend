import {
    Autocomplete as MuiAutocomplete,
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    AutocompleteRenderInputParams, TextField,
} from '@mui/material';
import React, { SyntheticEvent } from 'react';


type Props = {
    options: readonly any[]|any;
    name: string;
    onOpen: (event: React.SyntheticEvent) => void;
    onClose: (event: React.SyntheticEvent, reason: string) => void;
    onChange: (event: SyntheticEvent<Element, Event>, value: any[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => void;
    value?: any|any[];
    multiple: boolean;
};

const AutoComplete: React.FC<Props> = (props: Props) => {
    return (
        <MuiAutocomplete
            disablePortal
            disableCloseOnSelect={props.multiple}
            id="combo-box-demo"
            size="small"
            multiple={props.multiple}
            sx={{width: '100%'}}

            renderInput={(renderInputParams: AutocompleteRenderInputParams) =>
                <TextField color="info" {...renderInputParams}
                    label={props.name}
                />
            }

            options={props.options}
            onOpen={props.onOpen}
            onClose={props.onClose}
            onChange={props.onChange}
            value={props.value}
        />
    );
};

export default AutoComplete;
