import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeComponent = () => {
  const websiteUrl = "https://react-order-nine.vercel.app";

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