import React, { useEffect, useState } from 'react';
import { auth, setAuthRedirectPath } from '../../store/auth/Action';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapStateToProps } from '../../store';
import { AuthStoreState } from '../../store/auth';
import Loader from '../../components/layout/Loader/Loader';

type DispatchProps = {
    onAuth: (code: string) => void;
    onSetAuthRedirectPath: (path: string) => void;
};

type Props = AuthStoreState & DispatchProps;

const AuthRedirect: React.FC<Props> = (props: Props) => {
    const useQuery = () => new URLSearchParams(useLocation().search);
    const [error, setError] = useState(false);

    const query = useQuery();

    const code = query.get('code');
    const navigate = useNavigate();

    console.log(code);
    console.log(props.error);

    useEffect(() => {
        if (props.isAuthenticated) {
            navigate("/dashboard");
        }
    }, [props.isAuthenticated]);

    useEffect(() => {
        if (!props.isAuthenticated && !props.loading) {
            if (!code || props.error) {
                setError(true);
                console.log('error!!');
            } else {
                console.log("trying to send to api");
                console.log(props.error);
                props.onAuth(code);
            }
        }
    }, [props.isAuthenticated, props.loading]);

    return (
        <React.Fragment>
            {props.loading && <Loader centered />}
            {error && <p>An error occurred while logging in. Please try again</p>}
        </React.Fragment>
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.userId !== null,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

type DispatchPropsArgs = {
    type: string;
    isSignUp?: boolean;
    path?: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        onAuth: (code: string) => dispatch(auth(code)),
        onSetAuthRedirectPath: (path: string) => dispatch(setAuthRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);
