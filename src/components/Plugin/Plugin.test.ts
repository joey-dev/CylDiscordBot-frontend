import { renderHook } from '@testing-library/react-hooks';
import * as ReactRouterDom from 'react-router-dom';
import { IFullPluginWithData } from '../../interfaces/api/Plugin';
import PluginLogic, { PluginLogicProps } from './Plugin.logic';


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as typeof ReactRouterDom,
    useNavigate: () => mockedUsedNavigate,
    useParams: jest.fn().mockReturnValue({}),
}));

describe('In the plugin: ', () => {

    let parameters: PluginLogicProps;

    let returnValue: IFullPluginWithData;

    beforeEach(() => {
        parameters = {
            modules: [
                {
                    id: 1,
                    name: 'OTHER',
                    plugins: [
                        {
                            id: 2,
                            name: 'Utility',
                            order_id: 3,
                            turned_on: true,
                            components: [
                                {
                                    id: 1,
                                    name: 'PING',
                                    order_id: 1,
                                    turned_on: true,
                                    type: 'command',
                                    data: '[{"name": "role"},{"name": "channel"},{"name": "type"},{"name": "deleteCommand"},{"name": "deleteReply"},{"name": "ephemeral"}]',
                                    server_data: '[{"name":"role","turned_on":true,"data":{"roles":[{"id":"795749571967582218","name":"adminRole"},{"id":"795033292083822643","name":"Cyl"},{"id":"796025329696899072","name":"welcome"}]}},{"name":"channel","turned_on":true,"data":{"channels":[{"id":"796010336821051402","name":"welcome"},{"id":"939668277624463391","name":"test"},{"id":"794988966590808127","name":"general"}]}},{"name":"type","turned_on":true,"data":{"prefix":true,"slash":true}},{"name":"deleteCommand","turned_on":true},{"name":"deleteReply","turned_on":true,"data":{"second":"5"}},{"name":"ephemeral","turned_on":false}]',
                                },
                            ],
                        },
                    ],
                },
            ],
            pluginId: '1',
            moduleId: '1',
        };

        returnValue = {
            id: 1,
            name: 'Utility',
            order_id: 3,
            turned_on: true,
            components: [
                {
                    id: 1,
                    name: 'PING',
                    order_id: 1,
                    turned_on: true,
                    type: 'command',
                    data: '[{"name": "role"},{"name": "channel"},{"name": "type"},{"name": "deleteCommand"},{"name": "deleteReply"},{"name": "ephemeral"}]',
                    server_data: '[{"name":"role","turned_on":true,"data":{"roles":[{"id":"795749571967582218","name":"adminRole"},{"id":"795033292083822643","name":"Cyl"},{"id":"796025329696899072","name":"welcome"}]}},{"name":"channel","turned_on":true,"data":{"channels":[{"id":"796010336821051402","name":"welcome"},{"id":"939668277624463391","name":"test"},{"id":"794988966590808127","name":"general"}]}},{"name":"type","turned_on":true,"data":{"prefix":true,"slash":true}},{"name":"deleteCommand","turned_on":true},{"name":"deleteReply","turned_on":true,"data":{"second":"5"}},{"name":"ephemeral","turned_on":false}]',
                },
            ],
        };
    });

    test('Get correct plugin data back', () => {
        parameters.modules[0].plugins.push(returnValue);
        const {result} = renderHook(() => PluginLogic(parameters));

        expect(result.current.plugin).not.toBeUndefined();

        const pluginToString = JSON.stringify(result.current.plugin);

        expect(pluginToString).toBe(JSON.stringify(returnValue));
    });

    test('Get no plugin data back if there is no plugins in the module', () => {
        const {result} = renderHook(() => PluginLogic(parameters));

        expect(result.current.plugin).toBeUndefined();
    });
});

