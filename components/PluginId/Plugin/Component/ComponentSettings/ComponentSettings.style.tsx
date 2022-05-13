import React from "react";
import styled from "styled-components";


const Modal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #36393f;
    color: white;
    border: 2px solid #000;
    box-shadow: black;
    max-height: 80%;
    width: 40%;
    padding: 40px;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 6px;
        padding: 3px
    }

    ::-webkit-scrollbar-thumb {
        background-color: #43464D;
    }
`;

const Settings = styled.div`
`;


const Style = {
	Modal,
	Settings,
};

export default Style;
