import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Loader = (state) => {
  console.log(state, 'statestate');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SHOW_LOADER' });

    setTimeout(() => {
      dispatch({ type: 'HIDE_LOADER' });
    }, 2000);
    // eslint-disable-next-line
  }, [])
  return (
    <div className='custom-loder'>
      <div
        className="position-absolute top-0 start-50 translate-middle-x "
        style={{
          marginTop: '40vh',
          zIndex: 1050,
        }}
      >
        <button class="btn btn-dark" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span class="sr-only">Loading...</span>
        </button>
      </div>
    </div>
  );
};

export default Loader;