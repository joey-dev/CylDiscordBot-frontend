import { List as MuiList } from '@mui/material';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import SelectWithLogoAndIconItem, { ISelectWithLogoAndIconItem } from './SelectWithLogoAndIconItem/SelectWithLogoAndIconItem';


const StyledDiv = styled.div`
    margin-top: 10px;
    width: 300px;
`;

type Props = {
    items: ISelectWithLogoAndIconItem[],
    default: ISelectWithLogoAndIconItem,
    itemClicked: (key?: string) => void,
};

const SelectWithLogoAndIcon: React.FC<Props> = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(props.default);

    const GetElementFromKey = (key?: string): ISelectWithLogoAndIconItem => {
        if (!key || props.default.key === key) {
            return props.default;
        }

        return props.items.filter(item => {
            if (item.key === key) {
                return item;
            }
        })[0];
    };

    const currentSelected = useMemo(() => {
        return GetElementFromKey(selected.key);
    }, [selected.key]);

    const items = useMemo(() => {
        return props.items.map(item => {
            if (item.key === currentSelected.key) {
                return;
            }

            return (
                <SelectWithLogoAndIconItem item={item}
                    onClick={() => OnNewItemSelected(item.key)}
                    key={item.key}
                />
            );
        }).filter((item: JSX.Element | undefined) => {
            return item !== undefined;
        }) as JSX.Element[];

    }, [props.items, selected]);

    const OnNewItemSelected = (key?: string) => {
        setIsOpen(false);
        props.itemClicked(key);
        setSelected(GetElementFromKey(key));
    };

    return (
        <StyledDiv>
            <MuiList>
                <SelectWithLogoAndIconItem item={currentSelected}
                    onClick={() => setIsOpen(!isOpen)}
                    isSelected={true}
                    isOpen={isOpen}
                    key="default"
                />

                {isOpen && items}
            </MuiList>
        </StyledDiv>
    );
};

export default SelectWithLogoAndIcon;
