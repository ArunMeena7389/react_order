import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerDataAction } from '../../Redux/Action';
import { useDispatch } from 'react-redux';

const CustomerRedirectPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // get id from url    
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getCustomerDataAction(id));
        navigate('/customer', { replace: true });
    }, [])
    return (
        <div>

        </div>
    )
}

export default CustomerRedirectPage;
