import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Loader from './components/layout/Loader/Loader';
import Header from './components/layout/Header/Header';
import PrivateRoute from './components/routing/PrivateRoute/PrivateRoute';
import AuthRedirect from './pages/AuthRedirect/AuthRedirect';
import Home from './pages/Home/Home';
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
        <React.Fragment>
            <Header token={null} />

            <Routes>
                <Route path="/"
                    element={<Home />}
                />
                <Route path="/auth/redirect"
                    element={<AuthRedirect token={null} />}
                />
                {props.isAuthenticated && (
                    PrivateRoute.map(route => route)
                )}
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </React.Fragment>
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
