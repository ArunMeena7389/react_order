import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useDispatch } from "react-redux";
import { getTableAction } from "../../Redux/Action";

const TableSeating = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(
      getTableAction((data) => {
        setTableData(data);
      })
    );
    // eslint-disable-next-line
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {tableData.map((item) => (
        <div
          key={item._id}
          className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            {item.table_name}
          </h3>
          <p className="text-sm text-gray-500 mb-3">No: {item.table_no}</p>

          <QRCodeCanvas
            // value={`https://yourdomain.com/order/${item._id}`}
            size={150}
            bgColor="#ffffff"
            fgColor="green"
            level="H"
            includeMargin={true}
          />

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => onEdit(item)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item._id)}
              className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSeating;
