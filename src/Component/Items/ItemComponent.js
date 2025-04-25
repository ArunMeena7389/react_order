import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMenuDataAction, getmenueDataAction } from '../../Redux/Action';
import Config from '../../Config';
import PopupComponent from '../../Common/PopupComponent';
import DailogComponent from '../../Common/DailogComponent';
import { showCustomLoader } from '../../Common/showCustomLoader';

let initialPayload = {
  "fields": ["name", "price", "image_url","taste","description"],
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

  const getmenueData = async()=>{
    showCustomLoader(true);
    if(selectorDataTaste?.length) initialPayload.filter.taste = selectorDataTaste.map(dt=>{return dt?.title?.toLowerCase()});
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
        {dataItem?.map((item, index) => (
          <div className="card m-2 bg-dark position-relative" key={index}>
            <div className="card-img-container position-relative overflow-hidden">
              <img
                src={Config.url + "/img/" + item.image_url}
                className="card-img-top image-hover"
                alt="..."
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
              />
              <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-2">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h2 className="card-title text-light mb-1">{item.name}</h2>
                    <p className="card-text text-light mb-0">{item.taste}</p>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
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
                </div>
              </div>
            </div>

            <button
              className="btn btn-danger btn-sm position-absolute"
              style={{ top: "10px", right: "10px" }}
              onClick={() => {
                setSelectedItem(item);
                setShow(true);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {show && <PopupComponent onClose={handleClose} onClick={handleClose} />}
      {editOpen && <DailogComponent open={editOpen} onClick={handleToClose} selectedItem={selectedItem} onClose={handleToClose} title={"Edit"} text={" I am Good, Hope the same for you!"} />}

    </Fragment>
  );
}

export default ItemComponent;
