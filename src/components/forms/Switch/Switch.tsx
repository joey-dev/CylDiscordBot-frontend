import { Switch as MuiSwitch } from '@mui/material';
import React from 'react';


type Props = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
};

const Switch: React.FC<Props> = (props: Props) => {
    return (
        <MuiSwitch
            name="enabled"
            edge="end"
            color="info"
            checked={props.checked}
            onChange={props.onChange}
        />
    );
};

export default (Switch);
