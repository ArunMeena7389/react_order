import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CustomerRedirectPage = () => {
    const { id } = useParams(); // get id from url
    console.log(id,"22222222222222222222");
    
    const navigate = useNavigate();
    useEffect(()=>{
        // dispatch(getCustomerDataAction());
        navigate('/customer', { replace: true });
    },[])
  return (
    <div>
      
    </div>
  )
}

export default CustomerRedirectPage;
