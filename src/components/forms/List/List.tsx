import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import ListItem from '../ListItem/ListItem';


const StyledDiv = styled.div`
    margin-top: 10px;
`;

export type IListItem = {
    key: string,
    value: JSX.Element|string,
}

type Props = {
    items: IListItem[],
    default: IListItem,
    itemClicked: (key: string) => void,
};

const List: React.FC<Props> = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const currentSelected = useMemo(() => {
        return props.items.filter(item => {
            if (item.key === props.default.key) {
                return item;
            }
        })[0];
    }, [props.default.key]);

    const items = useMemo(() => {
        return props.items.map(item => {
            if (item.key === currentSelected.key) {
                return ""
            }
            return (
                <ListItem onClick={() => OnNewItemSelected(item.key)}>
                    {item.value}
                </ListItem>
            )
        });
    }, [props.items]);

    const itemsToShow = useMemo(() => {
        return isOpen ? items : "";
    }, [items, isOpen]);

    const OnNewItemSelected = (key: string) => {
        setIsOpen(false);
    }

    return (
        <>
            <ListItem>
                {currentSelected.value}
            </ListItem>
            <StyledDiv>
                {itemsToShow}
            </StyledDiv>
        </>
    );
};

export default (List);
