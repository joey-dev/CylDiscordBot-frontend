import { renderHook } from '@testing-library/react-hooks';
import * as ReactRouterDom from 'react-router-dom';
import { IServer } from '../../../../interfaces/api/Server';
import ServerItemsLogic, { ServerItemsLogicProps } from './ServerItems.logic';


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as typeof ReactRouterDom,
    useNavigate: () => mockedUsedNavigate,
    useParams: jest.fn().mockReturnValue({}),
}));

describe('In the server items: ', () => {

    const servers: IServer[] = [
        {
            id: '794988966590808124',
            name: 'Joey\'s bot test',
            icon: null,
            owner: true,
            permissions: '2199023255551',
            features: [],
            alreadyJoined: true,
        },
        {
            id: '794988966590808121',
            name: 'Joey\'s bot test',
            icon: null,
            owner: true,
            permissions: '2199023255551',
            features: [],
            alreadyJoined: true,
        },
    ];
    const parameters = {
        currentServerId: '794988966590808124',
    };

    test('one server is removed from the serverList and is added to default', () => {
        const {result} = renderHook(() => ServerItemsLogic({
            currentServerId: parameters.currentServerId,
            servers: servers,
        }));

        expect(result.current.serverList.length).toBe(1);
        expect(result.current.currentServer).not.toBeUndefined();
    });

    test('when there is no default, expect only text', () => {
        const {result} = renderHook(() => ServerItemsLogic({
            servers: servers,
        }));

        expect(result.current.serverList.length).toBe(2);
        expect(typeof result.current.currentServer.value.text).toEqual('string');
        expect(result.current.currentServer.key).toBeUndefined();
        expect(result.current.currentServer.value.icon).toBeUndefined();
        expect(result.current.currentServer.value.logo).toBeUndefined();
    });

    test('server list items are never empty', () => {
        const {result} = renderHook(() => ServerItemsLogic({
            currentServerId: parameters.currentServerId,
            servers: servers,
        }));

        expect(result.current.serverList[0].key).not.toBeUndefined();
        expect(result.current.serverList[0].value.icon).not.toBeUndefined();
        expect(result.current.serverList[0].value.text).not.toBeUndefined();
        expect(result.current.serverList[0].value.logo).not.toBeUndefined();
    })
});

