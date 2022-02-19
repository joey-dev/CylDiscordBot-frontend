import { ILanguages } from '@cylbot/cyldiscordbotlanguage/index';
import { all } from 'redux-saga/effects';
import { IIconName } from '../../components/images/Icon/Icon';

export interface IDisplayLanguage {
    flag: IIconName;
    name: string;
    key: keyof ILanguages;
}

export function* watchServerSagas() {
    yield all([]);
}

export type websiteStoreState = {
    language: IDisplayLanguage
};
