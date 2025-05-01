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
      <div className='customer-header d-flex align-items-center justify-content-between mb-3 px-2'>
        {/* <span>Filter</span>
      <FilterAltIcon onClick={() => setOpen(true)} style={{ color: 'white',fontSize:"35px" }} className='m-1'/> */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(true)}
          endIcon={<FilterAltIcon />}
          style={{
            backgroundColor: 'white',
            color: '#000000',
            borderRadius: '5px',
            textTransform: 'none',
          }}
        >
          Filter
        </Button>
        <ShoppingCartIcon style={{ color: 'white', fontSize: "35px" }} className='m-1' />
        <TextField
          placeholder="Search"
          variant="outlined"
          className="search-input"
          value={searchValue}
          onChange={handleSearch}
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
