import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/layout/Loader/Loader';
import Header from './components/layout/Header/Header';
import PrivateRoute from './components/routing/PrivateRoute/PrivateRoute';
import AuthRedirect from './pages/AuthRedirect';
import Index from './pages';
import NotFound from './pages/NotFound/NotFound';
import { MapStateToProps } from './store';
import { authCheckState } from './store/auth/Action';

type Props = {
    onTryAutoSignUp: () => void;
    isAuthenticated: boolean;
    isAutoSigningUp?: boolean;
};

const App: React.FC<Props> = (props: Props) => {
    const {onTryAutoSignUp} = props;

    useEffect(() => {
        if (!props.isAuthenticated) {
            onTryAutoSignUp();
        }
    }, [onTryAutoSignUp, props.isAuthenticated]);

    const routes = (
        <>
            <Header token={null} />

            {/*<Routes>*/}
            {/*    <Route path="/"*/}
            {/*        element={<Index />}*/}
            {/*    />*/}
            {/*    <Route path="/auth/redirect"*/}
            {/*        element={<AuthRedirect token={null} />}*/}
            {/*    />*/}
            {/*    {props.isAuthenticated && (*/}
            {/*        PrivateRoute.map(route => route)*/}
            {/*    )}*/}
            {/*    <Route*/}
            {/*        path="*"*/}
            {/*        element={<NotFound />}*/}
            {/*    />*/}
            {/*</Routes>*/}
        </>
    );

    return <div>{props.isAutoSigningUp ? <Loader centered={true} /> : routes}</div>;
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        isAuthenticated: state.auth.userId !== null,
        isAutoSigningUp: state.auth.isAutoSigningUp,
    };
};

type DispatchPropsArgs = {
    type: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        onTryAutoSignUp: () => dispatch(authCheckState()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
