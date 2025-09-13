import React from "react";
import QRCodeComponent from "./QRCode/QRCodeComponent";
import { createTableAction } from "../Redux/Action";
import { useDispatch } from "react-redux";

const Setting = () => {
  const dispatch = useDispatch();

  const createTable = async () => {
    dispatch(
      await createTableAction(
        {
          tables: [
            { table_no: "T3", table_name: "Table 3" },
            { table_no: "T4", table_name: "Table 4" },
          ],
        },
        (res) => console.log("Created:", res)
      )
    );
  };

  return (
    <div>
      <h2
        onClick={() => {
          createTable();
        }}
      >
        Setting
      </h2>
      <QRCodeComponent />
    </div>
  );
};

export default Setting;
