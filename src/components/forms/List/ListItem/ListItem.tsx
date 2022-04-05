import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Avatar, IconButton, ListItem as MuiListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { IListItem } from '../List';


interface StyledMainDivProps {
    clickable: boolean,
}

const StyledMainDiv = styled.div<StyledMainDivProps>`
    border: 1px solid black;
    border-radius: 8px;
    padding: 6px 12px;
    background-color: black;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: ${(props: StyledMainDivProps) => props.clickable ? 'pointer' : 'auto'};
`;

type Props = {
    item: IListItem,
    onClick?: () => void;
};

const ListItem: React.FC<Props> = (props: Props) => {
    // const clickable = !!props.onClick;

    return (
        <MuiListItem
            secondaryAction={
                <IconButton edge="end">
                    {props.item.value.icon}
                </IconButton>
            }
            onClick={props.onClick}
        >
            <ListItemAvatar>
                <Avatar>
                    {props.item.value.logo}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.item.value.text} />
        </MuiListItem>
        //
        // <StyledMainDiv clickable={clickable} onClick={props.onClick}>
        //     {props.children}
        //
        // </StyledMainDiv>
    );
};

export default (ListItem);
