import React from 'react';
import SelectWithLogoAndIcon from '../../../../components/forms/select/SelectWithLogoAndIcon/SelectWithLogoAndIcon';
import {
    ISelectWithLogoAndIconItem,
} from '../../../../components/forms/select/SelectWithLogoAndIcon/SelectWithLogoAndIconItem/SelectWithLogoAndIconItem';


interface Props {
    currentServer: ISelectWithLogoAndIconItem;
    serverList: ISelectWithLogoAndIconItem[];
    serverSelected: (server_id: string) => void;
}

const ServerItemsTemplate: React.FC<Props> = (props: Props) => {
    return (
        <SelectWithLogoAndIcon
            items={props.serverList}
            default={props.currentServer}
            itemClicked={(key) => {
                if (key) {
                    props.serverSelected(key);
                }
            }}
        />
    );
};


export default ServerItemsTemplate;
