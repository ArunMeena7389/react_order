import React, { Fragment, useEffect, useMemo, useState } from "react";
import TableGrid from "../../Ui-Elements/Table/TableGrid";
import ButtonComponent from "../../Ui-Elements/Button/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deletePackageDataAction,
  getpackageDataAction,
} from "../../Redux/Action";
import { formatPrice } from "../../Common/utils";

const Package = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [packageData, setPackageData] = useState([]);

  const fetchPackages = async () => {
    dispatch(
      getpackageDataAction((data) => {
        setPackageData(data.data || []);
      })
    );
  };

  useEffect(() => {
    fetchPackages();
  }, []); // only run once

  const columns = [
    { label: "Image", key: "image_url", type: "image", width: "120px" },
    { label: "Package", key: "packageName", sort: true, width: "200px" },
    { label: "Price", key: "price", sort: true, width: "150px" },
    { label: "Discount", key: "discount", sort: true, width: "150px" },
    {
      key: "action",
      label: "Actions",
      type: "action",
      width: "60px",
      actions: [
        {
          label: "Edit",
          className: "text-blue-600 cursor-pointer",
          onClick: (row) => {
            navigate("/merchant/package/add", { state: row });
          },
        },
        {
          label: "Delete",
          className: "text-red-600 cursor-pointer",
          onClick: async (row) => {
            await dispatch(deletePackageDataAction(row._id));
            fetchPackages();
          },
        },
      ],
    },
  ];

  const rowData = useMemo(
    () =>
      packageData.map((item) => ({
        ...item,
        image_url: item.image_url || "",
        price: formatPrice(item.price),
      })),
    [packageData]
  );

  return (
    <Fragment>
      <ButtonComponent
        name=" Add Package"
        type="add"
        variant="primary"
        icon="+"
        onClick={() => {
          navigate("/merchant/package/add");
        }}
      />
      <div className="mt-2">
        <TableGrid columns={columns} data={rowData} />
      </div>
    </Fragment>
  );
};

export default Package;
