import React from "react";
import styled from "styled-components";


const Background = styled.div`
    background-color: #36393F;
    width: calc(100vw - 350px);
    position: absolute;
    left: 350px;
    height: calc(95vh - 56px);
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 6px;
        padding: 3px
    }

    ::-webkit-scrollbar-thumb {
        background-color: #43464D;
    }
`;

const StyledItemDisplay = {
	Background,
};

export default StyledItemDisplay;
