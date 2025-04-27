import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerDataAction } from '../../Redux/Action';
import Config from '../../Config';

const CustomerMain = () => {
  const dispatch = useDispatch();
  const customerMenuData = useSelector((state) => state?.customerMenu?.data);
  const dataItem = customerMenuData.data || [];
  
  useEffect(()=>{
    dispatch(getCustomerDataAction());
    // eslint-disable-next-line
  },[])
  return (
    <div  className='text-white'>
      <h2>Customer Page</h2>
      {dataItem?.map((item, index) => (
     <div className="card" style={{width: "18rem"}}>
  <img className="card-img-top" src={Config.url + "/img/" + item.image_url} alt="Card"/>
  <div className="card-body">
    <h5 className="card-title">{item.name}</h5>
    <p className="card-text">{item.taste}</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>))}
    </div>
  )
}

export default CustomerMain;
