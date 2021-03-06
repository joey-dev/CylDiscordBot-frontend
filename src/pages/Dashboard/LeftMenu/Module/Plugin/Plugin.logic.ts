import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage';
import { useNavigate, useParams } from 'react-router-dom';
import { IFullPluginWithData } from '../../../../../interfaces/api/Plugin';
import { IDetailedServer } from '../../../../../interfaces/api/Server';
import CapitalizeFirstLetter from '../../../../../services/stringManipulation/CapitalizeFirstLetter';


type ReturnValue = {
    title: string;
    navigateToPlugin: () => void;
}

export type ModuleLogicProps = {
    detailedServer: IDetailedServer;
    data: IFullPluginWithData;
    moduleId: number;
}

function ModuleLogic(props: ModuleLogicProps): ReturnValue {
    const languageName = props.detailedServer.language.small_name;
    const title = CapitalizeFirstLetter(getItemTranslate(languageName, props.data.name));

    const navigate = useNavigate();
    const params = useParams();
    const currentServerId = params.serverId || '';

    const navigateToPlugin = () =>
        navigate(`/dashboard/${currentServerId}/${props.moduleId}/${props.data.id}`);

    return {
        title,
        navigateToPlugin,
    };
}

export default ModuleLogic;
