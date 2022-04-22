import styled from 'styled-components';


export const StyledLeftMenuBackground = styled.div`
    display: block;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 350px;
    background-color: #1F2129;
    color: white;
    height: 100%;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 0;
    }
`;

export const StyledLeftMenuInnerBackground = styled.div`
    padding: 24px 20px 20px;
`;
