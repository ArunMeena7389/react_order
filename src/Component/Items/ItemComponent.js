import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMenuDataAction, getmenueDataAction } from '../../Redux/Action';
import Config from '../../Config';


const ItemComponent = () => {
  const dispatch = useDispatch()
  const selectorData = useSelector((state) => state.user.data);
  // eslint-disable-next-line
  console.log(selectorData.data, 'ddddddddddd');
  const dataItem = selectorData.data || [];
  useEffect(() => {
    dispatch(getmenueDataAction())
    // eslint-disable-next-line
  }, []);

  const handleSingleRemove = (item) => {
    dispatch(deleteMenuDataAction(item._id));
    dispatch(getmenueDataAction());
  }
  return (
    <Fragment>
      <div className='m-2'>
        {dataItem?.map((item, index) => (
          <div className="card m-2" key={index}>
            <img
              src={Config.url + "/img/" + item.image_url}
              className="card-img-top"
              alt="..."
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p className="card-text">{item.taste}</p>
            </div>
            <button
              className="btn btn-danger btn-sm position-absolute"
              style={{ top: "10px", right: "10px" }}
              onClick={() => { handleSingleRemove(item) }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default ItemComponent;
