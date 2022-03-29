import React, { useMemo, useState } from 'react';
import styled from 'styled-components';


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
    children: JSX.Element|string,
    onClick?: () => void;
};

const ListItem: React.FC<Props> = (props: Props) => {
    const clickable = !!props.onClick;

    return (
        <StyledMainDiv clickable={clickable} onClick={props.onClick}>
            {props.children}
        </StyledMainDiv>
    );
};

export default (ListItem);
