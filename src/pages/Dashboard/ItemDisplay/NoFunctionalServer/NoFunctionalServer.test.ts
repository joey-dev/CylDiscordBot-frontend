import { renderHook } from '@testing-library/react-hooks';
import * as ReactRouterDom from 'react-router-dom';
import { IServer } from '../../../../interfaces/api/Server';
import { IDisplayLanguage } from '../../../../store/website';
import NoFunctionalServerLogic, { NoFunctionalServerLogicReturnValue } from './NoFunctionalServer.logic';


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as typeof ReactRouterDom,
    useNavigate: () => mockedUsedNavigate,
    useParams: jest.fn().mockReturnValue({}),
}));

describe('In the no functional server: ', () => {
    const server: IServer = {
        id: '794988966590808124',
        name: 'Joey\'s bot test',
        icon: null,
        owner: true,
        permissions: '2199023255551',
        features: [],
        alreadyJoined: true,
    };
    const language: IDisplayLanguage = {
        flag: "us",
        key: "enUS",
        name: "en-us",
    }

    const checkIfNoValuesAreUndefined = (result: NoFunctionalServerLogicReturnValue) => {
        expect(result.showAddBotButton).not.toBeUndefined();
        expect(result.setupMessage).not.toBeUndefined();
        expect(result.addBotToServerUrl).not.toBeUndefined();
        expect(result.text).not.toBeUndefined();
        expect(result.text.whenFinishedBotSetup).not.toBeUndefined();
        expect(result.text.botSetupButton).not.toBeUndefined();
        expect(result.text.finish).not.toBeUndefined();
    }


    test('Nothing undefined when there is a server', () => {
        const {result} = renderHook(() => NoFunctionalServerLogic({
            currentServerId: "123",
            language: language,
            server: server,
        }));

        checkIfNoValuesAreUndefined(result.current);
    });

    test('Nothing undefined when there is no server', () => {
        const {result} = renderHook(() => NoFunctionalServerLogic({
            currentServerId: "123",
            language: language,
        }));

        checkIfNoValuesAreUndefined(result.current);
    });

});

