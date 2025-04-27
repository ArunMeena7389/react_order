import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMenuDataAction, getmenueDataAction } from '../../Redux/Action';
import Config from '../../Config';
import PopupComponent from '../../Common/PopupComponent';
import DailogComponent from '../../Common/DailogComponent';
import { showCustomLoader } from '../../Common/showCustomLoader';
import '../Customer/customer.scss';
import DeleteIcon from '@mui/icons-material/Delete';

let initialPayload = {
  "fields": ["name", "price", "image_url", "taste", "description", "business_id"],
  "filter": {
  }
}
const ItemComponent = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [editOpen, setEditOpen] = useState(false);

  const selectorData = useSelector((state) => state.user.data);
  const selectorDataTaste = useSelector((state) => state.taste.data);
  const dataItem = selectorData.data || [];

  const getmenueData = async () => {
    showCustomLoader(true);
    if (selectorDataTaste?.length) initialPayload.filter.taste = selectorDataTaste.map(dt => { return dt?.title?.toLowerCase() });
    await dispatch(getmenueDataAction(initialPayload));
    showCustomLoader(false);
  }
  useEffect(() => {
    getmenueData();
    // eslint-disable-next-line
  }, []);

  // {
  //   "fields": ["name", "price", "taste"],
  //   "filter": {
  //     "taste": "sweet"
  //   }
  // }

  const handleSingleRemove = async (item) => {
    showCustomLoader(true)
    await dispatch(deleteMenuDataAction(item._id));
    await dispatch(getmenueDataAction(initialPayload));
    showCustomLoader(false)
  }
  const handleClose = (action) => {
    setShow(false)
    if (action) {
      handleSingleRemove(selectedItem);
    }
  }

  const handleAction = () => {
    setEditOpen(!editOpen)
  };

  const handleToClose = () => {
    setEditOpen(!editOpen)
  }

  return (
    <Fragment>
      <div className="m-2">
        <div className="customer-card-wrapper">
          {dataItem?.map((item, index) => (
            <div className="card customer-card" key={index}>
              <img
                className="customer-image"
                src={Config.url + "/img/" + item.image_url}
                alt="Customer"
              />
              <div className="card-body text-center text-white">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.taste}</p>
                <button
                  className="btn btn-primary btn-sm position-absolute"
                  style={{ top: "5px", left: "5px" }}
                  onClick={() => {
                    handleAction()
                    const fullImageUrl = `${Config.url}/img/${item.image_url}`;
                    setSelectedItem({
                      ...item,
                      image: fullImageUrl,
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm position-absolute"
                  style={{ top: "5px", right: "5px" }}
                  onClick={() => {
                    setSelectedItem(item);
                    setShow(true);
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
      {show && <PopupComponent onClose={handleClose} onClick={handleClose} />}
      {editOpen && <DailogComponent open={editOpen} onClick={handleToClose} selectedItem={selectedItem} onClose={handleToClose} title={"Edit"} text={" I am Good, Hope the same for you!"} />}

    </Fragment>
  );
}

export default ItemComponent;
