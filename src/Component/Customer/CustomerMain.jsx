import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import './customer.scss';
import BottomPopupFilter from './BottomPopupFilter';
import { useLocation } from 'react-router-dom';
import { getCustomerDataAction } from '../../Redux/Action';
import { TextField, InputAdornment, Button } from '@mui/material';
import BottomPopupAddCart from './BottomPopupAddCart';


const CustomerMain = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const customerMenuData = useSelector((state) => state?.customerMenu?.data);
  const dataItem = customerMenuData?.data || [];
  const [dataItemMenu, setDataItemMenu] = useState(dataItem.map(item => ({ ...item, count: 0 })));
  const [searchValue, setSearchValue] = useState("");
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const [openAddCartPopup, setOpenAddCartPopup] = useState(false);
  const [addedCartData, setAddedCartData] = useState([]);
  const businessID = location.state?.businessID;
  console.log(businessID,'businessIDbusinessID111');
  
  useEffect(() => {
    dispatch(getCustomerDataAction(businessID));
    // eslint-disable-next-line
  }, [businessID]);

  useEffect(() => {
    const filterCartData = dataItemMenu.filter(item => item.count);
    setAddedCartData(filterCartData);
  }, [dataItemMenu]);

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

  const handleAddClick = (data, type) => {
    if (type === "Add") {
      setDataItemMenu(prev =>
        prev.map(item =>
          item._id === data._id
            ? { ...item, count: 1 }
            : { ...item }
        )
      );
    } else if (type === "plush") {
      setDataItemMenu(prev =>
        prev.map(item =>
          item._id === data._id
            ? { ...item, count: item.count + 1 }
            : { ...item }
        )
      );

    } else if (type === "minus") {
      setDataItemMenu(prev =>
        prev.map(item =>
          item._id === data._id
            ? { ...item, count: item.count - 1 }
            : { ...item }
        )
      );
    }

  }
  return (
    <div className="customer-container">
      <div
        className="customer-header d-flex align-items-center justify-content-between mb-3 p-1"
        style={{
          backgroundColor: '#f8f9fa',
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setOpenFilterPopup(true)}
          endIcon={<FilterAltIcon />}
          sx={{
            color: '#333',
            borderColor: '#ccc',
            textTransform: 'none',
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
            color: addedCartData.length > 0 ? '#f28f0e' : '#333',
            fontSize: '28px',
            backgroundColor: addedCartData.length > 0 ? '#e0f7fa' : 'transparent',
            borderRadius: '50%',
            padding: addedCartData.length > 0 ? '4px' : '0',
            transition: 'all 0.3s ease',
          }}
          onClick={() => setOpenAddCartPopup(true)}
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
              {!item.count ? <button className="add-btn" onClick={() => { handleAddClick(item, 'Add') }}>+ ADD</button> :
                <div className="counter-wrapper">
                  <button
                    className="count-btn-min"
                    onClick={() => handleAddClick(item, 'minus')}
                  >-</button>
                  <span className="count-display">{item.count}</span>
                  <button
                    className="count-btn-plush"
                    onClick={() => handleAddClick(item, 'plush')}
                  >+</button>
                </div>}

            </div>
          </div>
        ))}
      </div>
      <BottomPopupFilter open={openFilterPopup} onClose={() => setOpenFilterPopup(false)} onOpen={() => { }} />
      <BottomPopupAddCart open={openAddCartPopup} onClose={() => setOpenAddCartPopup(false)} onOpen={() => { }} addedCartData={addedCartData} />
    </div>

  )
}

export default CustomerMain;
