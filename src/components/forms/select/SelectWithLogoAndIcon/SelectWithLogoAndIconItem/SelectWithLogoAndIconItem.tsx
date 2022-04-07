import { Avatar, IconButton, ListItem as MuiListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import arrowDown from '../../../../../assets/icons/arrowDown.svg';


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
    color: white;
    cursor: ${(props: StyledMainDivProps) => props.clickable ? 'pointer' : 'auto'};
`;

type StyledArrowDownImgProps = {
    listOpen: boolean;
}

const StyledArrowDownImg = styled.img<StyledArrowDownImgProps>`
    width: 25px;
    transform: rotate(${(props: StyledArrowDownImgProps) => (props.listOpen ? 180 : 0)}deg);
    transition: transform 0.4s ease;
`;


export type ISelectWithLogoAndIconItem = {
    key?: string,
    value: {
        logo?: JSX.Element,
        text: string,
        icon?: JSX.Element,
    },
}

type Props = {
    item: ISelectWithLogoAndIconItem,
    onClick?: () => void;
    isSelected?: boolean;
    isOpen?: boolean;
};

const SelectWithLogoAndIconItem: React.FC<Props> = (props: Props) => {
    const arrow = <StyledArrowDownImg src={arrowDown}
        listOpen={props.isOpen || false}
        onClick={props.onClick}
    />;

    return (
        <StyledMainDiv clickable={true}>
            <MuiListItem
                secondaryAction={
                    <IconButton edge="end">
                        {props.isSelected
                            ? arrow
                            : props.item.value.icon
                        }
                    </IconButton>
                }
                onClick={props.onClick}
            >
                {props.item.value.logo && (
                    <ListItemAvatar>
                        <Avatar>
                            {props.item.value.logo}
                        </Avatar>
                    </ListItemAvatar>
                )}
                <ListItemText primary={props.item.value.text} />
            </MuiListItem>
        </StyledMainDiv>
    );
};

export default (SelectWithLogoAndIconItem);
