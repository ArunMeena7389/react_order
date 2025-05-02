import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import './customer.scss';
import BottomPopup from './BottomPopup';
import { useLocation } from 'react-router-dom';
import { getCustomerDataAction } from '../../Redux/Action';
import { TextField, InputAdornment, Button } from '@mui/material';


const CustomerMain = () => {
  const dispatch = useDispatch();
  const customerMenuData = useSelector((state) => state?.customerMenu?.data);
  const dataItem = customerMenuData?.data || [];
  const [dataItemMenu, setDataItemMenu] = useState(dataItem);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const businessID = location.state?.businessID;
  useEffect(() => {
    dispatch(getCustomerDataAction(businessID));
    // eslint-disable-next-line
  }, [businessID]);
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    const delayDebounce = setTimeout(() => {
      const searchTerm = event?.target?.value?.trim()?.toLowerCase() || "";
      const filteredItems = dataItem.filter(item =>
        (item.name || "")?.trim()?.toLowerCase().includes(searchTerm)
      );
      setDataItemMenu(filteredItems);
    }, 3000);
    return () => clearTimeout(delayDebounce);
  };
  return (
    <div className="customer-container text-white">
      <div
  className="customer-header d-flex align-items-center justify-content-between mb-3 px-2"
  style={{
    backgroundColor: '#f8f9fa', // Light gray background
    padding: '8px',
    borderRadius: '8px',
    flexWrap: 'wrap', // Stack items on small screens
    gap: '8px',
  }}
>
  <Button
    variant="outlined"
    onClick={() => setOpen(true)}
    endIcon={<FilterAltIcon />}
    sx={{
      color: '#333',
      borderColor: '#ccc',
      textTransform: 'none',
      fontSize: '0.85rem',
      padding: '4px 12px',
      backgroundColor: '#fff',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    }}
  >
    Filter
  </Button>

  <ShoppingCartIcon
    style={{
      color: '#333',
      fontSize: '28px',
    }}
  />

  <TextField
    placeholder="Search"
    variant="outlined"
    size="small"
    value={searchValue}
    onChange={handleSearch}
    sx={{
      flex: 1,
      minWidth: '140px',
      backgroundColor: 'white',
      borderRadius: '8px',
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon fontSize="small" />
        </InputAdornment>
      ),
    }}
  />
</div>


      <div className="customer-card-wrapper">
        {dataItemMenu?.map((item, index) => (
          <div className="card customer-card" key={index}>
            <img
              className="card-img-top customer-image"
              src={item.image_url}
              alt="Customer"
            />
            <div className="card-body text-center text-white">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.taste}</p>
              <p className="btn btn-primary">+ ADD</p>
            </div>
          </div>
        ))}
      </div>

      <BottomPopup open={open} onClose={() => setOpen(false)} onOpen={() => { }} />
    </div>

  )
}

export default CustomerMain;
