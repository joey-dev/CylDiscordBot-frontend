import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/forms/Button/Button';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <main style={{padding: '1rem'}}>
            <p>404 page not found</p>
            <Button
                variant="outlined"
                onClick={() => {
                    navigate('/');
                }}
            > Go Back Home
            </Button>
        </main>
    );
};

export default NotFound;
