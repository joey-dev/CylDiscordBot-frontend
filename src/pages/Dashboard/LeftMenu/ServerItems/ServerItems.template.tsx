import React from 'react';
import { IServer } from '../../../../interfaces/api/Server';
import ServerItem from './ServerItem/ServerItem';
import { StyledServerItemsDiv } from './ServerItems.style';


interface Props {
    currentServer?: IServer | undefined;
    isListOpened: boolean;
    serverList: JSX.Element[];
    setIsListOpened: (value: boolean) => void
}

const ServerItemsTemplate: React.FC<Props> = (props: Props) => {
    return (
        <React.Fragment>
            <ServerItem server={props.currentServer}
                isCurrentServer={true}
                listOpen={props.isListOpened}
                onArrowClick={() => props.setIsListOpened(!props.isListOpened)}
                onServerClick={() => {
                }}
            />
            <StyledServerItemsDiv>
                {props.isListOpened && props.serverList}
            </StyledServerItemsDiv>
        </React.Fragment>
    );
};


export default ServerItemsTemplate;
