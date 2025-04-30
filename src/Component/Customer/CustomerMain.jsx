import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import './customer.scss';
import BottomPopup from './BottomPopup';
import { useLocation } from 'react-router-dom';
import { getCustomerDataAction } from '../../Redux/Action';
import { TextField,InputAdornment } from '@mui/material';


const CustomerMain = () => {
  const dispatch = useDispatch();
  const customerMenuData = useSelector((state) => state?.customerMenu?.data);
  const dataItem = customerMenuData?.data || [];
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const businessID = location.state?.businessID;
  useEffect(() => {
    dispatch(getCustomerDataAction(businessID));
  }, []);
  return (
    <div className="customer-container text-white">
    <div className='customer-header d-flex align-items-center justify-content-between mb-3 px-2'>
      <FilterAltIcon onClick={() => setOpen(true)} style={{ color: 'white',fontSize:"35px" }} className='m-1'/>
      <ShoppingCartIcon onClick={() => setOpen(true)} style={{ color: 'white',fontSize:"35px" }} className='m-1'/>
      <TextField
        placeholder="Search"
        variant="outlined"
        className="search-input"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: {
            backgroundColor: "white",
            borderRadius: "8px"
          }
        }}
      />
      
    </div>
  
    <div className="customer-card-wrapper">
      {dataItem?.map((item, index) => (
        <div className="card customer-card" key={index}>
          <img
            className="card-img-top customer-image"
            src={item.image_url}
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
  
    <BottomPopup open={open} onClose={() => setOpen(false)} onOpen={() => { }} />
  </div>
  
  )
}

export default CustomerMain;
