import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CustomerRedirectPage = () => {
    const { id } = useParams(); // get id from url    
    const navigate = useNavigate();
    console.log(id,'ididid-------1111');
    
    useEffect(() => {
          localStorage.setItem("business_ID",id);
        navigate('/customer', { replace: true, state: { businessID: id } });
        // eslint-disable-next-line
    }, [])
    return (
        <div>

        </div>
    )
}

export default CustomerRedirectPage;
