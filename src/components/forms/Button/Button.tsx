import { Button as MuiButton } from '@mui/material';
import React from 'react';


type Props = {
    variant?: "text" | "outlined" | "contained";
    children: React.ReactNode;
    onClick: () => void;
};

const Button: React.FC<Props> = (props: Props) => {
    return (
        <MuiButton variant={props.variant}
            color={'secondary'}
            onClick={props.onClick}
        >
            {props.children}
        </MuiButton>
    );
};

export default (Button);
