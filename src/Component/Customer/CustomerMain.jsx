import React from 'react'
import { useSelector } from 'react-redux';
import Config from '../../Config';
import './customer.scss';

const CustomerMain = () => {
  const customerMenuData = useSelector((state) => state?.customerMenu?.data);
  const dataItem = customerMenuData?.data || [];

  return (
    <div className="customer-container text-white">
    <h2 className="text-center mb-4">Customer Page</h2>
  
    <div className="customer-card-wrapper">
      {dataItem?.map((item, index) => (
        <div className="card customer-card" key={index}>
          <img
            className="card-img-top customer-image"
            src={Config.url + "/img/" + item.image_url}
            alt="Customer"
          />
          <div className="card-body text-center text-white">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.taste}</p>
            <a href="#" className="btn btn-primary">+ ADD</a>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default CustomerMain;
