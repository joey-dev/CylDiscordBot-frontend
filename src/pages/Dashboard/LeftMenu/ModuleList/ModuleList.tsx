import React from 'react';
import { IFullModuleWithData } from '../../../../interfaces/api/Module';
import { IDetailedServer } from '../../../../interfaces/api/Server';
import { IEditServerData } from '../../../../store/server/Sagas';
import Module from './Module/Module';


type Props = {
    server: IDetailedServer;
    modules: IFullModuleWithData[];
    onPluginEnabledChange: (event: IEditServerData) => void;
};

const ModuleList: React.FC<Props> = (props: Props) => {
    return (
        <React.Fragment>
            {props.modules.map(module =>
                <Module key={module.id}
                    detailedServer={props.server}
                    data={module}
                    onPluginEnabledChange={event => props.onPluginEnabledChange({module_id: module.id, ...event})}
                />,
            )}
        </React.Fragment>
    );
};


export default ModuleList;
