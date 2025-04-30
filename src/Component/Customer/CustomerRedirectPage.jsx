import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CustomerRedirectPage = () => {
    const { id } = useParams(); // get id from url    
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/customer', { replace: true,state: { businessID: id } });
    }, [])
    return (
        <div>

        </div>
    )
}

export default CustomerRedirectPage;
