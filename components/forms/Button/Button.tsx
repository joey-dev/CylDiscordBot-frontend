import { Button as MuiButton } from '@mui/material';
import React from "react";


export type ButtonProps = {
    variant?: "text" | "outlined" | "contained";
    color?: 'primary' | 'secondary';
    children: React.ReactNode|string;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <MuiButton variant={props.variant}
            color={props.color || 'secondary'}
            onClick={props.onClick}
        >
            {props.children}
        </MuiButton>
    );
};

export default (Button);
