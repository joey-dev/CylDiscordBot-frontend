import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem/ListItem';
import { List as MuiList } from '@mui/material';


const StyledDiv = styled.div`
    margin-top: 10px;
`;

export type IListItem = {
    key: string,
    value: {
        logo: JSX.Element,
        text: string,
        icon: JSX.Element,
    },
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
                <ListItem item={item} onClick={() => OnNewItemSelected(item.key)} />
            )
        });
    }, [props.items]);

    const itemsToShow = useMemo(() => {
        return isOpen ? items : "";
    }, [items, isOpen]);

    const OnNewItemSelected = (key: string) => {
        setIsOpen(false);
        console.log(`selected: ${key}`);
    }

    return (
        <MuiList>
            {itemsToShow}
        </MuiList>
    );
};

export default (List);
