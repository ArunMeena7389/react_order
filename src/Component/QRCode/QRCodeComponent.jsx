import React, { useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { getCustomerDataAction } from '../../Redux/Action';
import { useDispatch } from 'react-redux';

const QRCodeComponent = () => {
  const dispatch = useDispatch();
  const businessID = localStorage.getItem('businessID');
  console.log(businessID, 'businessIDbusinessID');
  const websiteUrl = `https://react-order-nine.vercel.app/customer/${businessID}`;
  useEffect(() => {
    dispatch(getCustomerDataAction(businessID));
  }, [])
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Scan to Visit My Website!</h2>
      <QRCodeCanvas
        value={websiteUrl}
        size={256}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />
    </div>
  );
};

export default QRCodeComponent;