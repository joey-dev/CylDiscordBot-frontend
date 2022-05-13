import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage';
import { IFullModuleWithData } from '../../../interfaces/api/Module';
import { IDetailedServer } from '../../../interfaces/api/Server';


type ReturnValue = {
    title: string;
}

export type ModuleLogicProps = {
    detailedServer: IDetailedServer;
    data: IFullModuleWithData;
}

function ModuleLogic(props: ModuleLogicProps): ReturnValue {
    const languageName = props.detailedServer.language.small_name;

    const title = getItemTranslate(languageName, props.data.name).toUpperCase();

    return {
        title,
    };
}

export default ModuleLogic;
