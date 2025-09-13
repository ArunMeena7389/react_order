import React, { Fragment, useState } from "react";
import { addFindCustomerAction, addOrderAction } from "../Redux/Action";
import { useDispatch } from "react-redux";
import ButtonComponent from "../Ui-Elements/Button/ButtonComponent";
import InputComponent from "../Ui-Elements/Input/InputComponent";
import PopupComponent from "../Ui-Elements/Popup/PopupComponent";

const CustomerVerfiedAccount = ({
  onClick,
  onClose,
  open,
  title = "",
  selectedItem = "",
  orderItems,
  ...props
}) => {
  const dispatch = useDispatch();
  const [stateValue, setStateValue] = useState({
    name: "",
    mobile: "",
    otp: "",
  });

  const [error, setError] = useState({
    name: false,
    mobile: false,
    otp: false,
  });

  const [helperText, setHelperText] = useState({
    name: "",
    mobile: "",
    otp: "",
  });

  const [isOtpField, setIsOtpField] = useState(false);
  const handleOnChange = (val, type) => {
    setStateValue((prev) => ({
      ...prev,
      [type]: val,
    }));

    setError((prev) => ({ ...prev, [type]: false }));
    setHelperText((prev) => ({ ...prev, [type]: "" }));
  };

  const validateMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);
  const validateOtp = (otp) => /^\d{6}$/.test(otp);

  const handleSubmit = async () => {
    if (!isOtpField) {
      let hasError = false;
      const newError = { name: false, mobile: false, otp: false };
      const newHelperText = { name: "", mobile: "", otp: "" };

      if (!stateValue.name.trim()) {
        newError.name = true;
        newHelperText.name = "Full name is required";
        hasError = true;
      }

      if (!validateMobile(stateValue.mobile)) {
        newError.mobile = true;
        newHelperText.mobile = "Enter a valid 10-digit mobile number";
        hasError = true;
      }

      setError(newError);
      setHelperText(newHelperText);

      if (!hasError) {
        console.log("Sending OTP to:", stateValue.mobile);
        setIsOtpField(true);
      }
    } else {
      // Step 2: Validate OTP
      const isValidOtp = validateOtp(stateValue.otp);
      if (!isValidOtp) {
        setError((prev) => ({ ...prev, otp: true }));
        setHelperText((prev) => ({
          ...prev,
          otp: "Enter a valid 6-digit OTP",
        }));
        return;
      } else if (stateValue.otp === "999999") {
        console.log("Verified & Submitted:", stateValue);
        onClick?.(stateValue);
        onClose();
        const businessID = localStorage.getItem("business_ID");
        await dispatch(
          addFindCustomerAction(
            { name: stateValue.name, mobile: `91${stateValue.mobile}` },
            (data) => {
              const nowTime = new Date();
              const orderPayload = {
                business_id: businessID,
                customer_id: data.customer._id,
                business_name: "",
                customer_name: data.customer.name,
                order_item: orderItems.items,
                total_price: orderItems.totalPrice,
                order_status: "Ordered",
                payment_status: "Pending",
                order_time: nowTime.toLocaleString(),
              };
              dispatch(addOrderAction(orderPayload));
            }
          )
        );
      }
    }
  };

  return (
    <Fragment>
      <PopupComponent
        isOpen={open}
        onClose={() => {
          onClose();
        }}
        title={title}
        width="100%"
        height="auto"
        content={
          <>
            {!isOtpField ? (
              <>
                <InputComponent
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={stateValue.name}
                  onChange={(e) => handleOnChange(e.target.value, "name")}
                  required
                  error={error.name ? helperText.name : ""}
                />
                <br />
                <InputComponent
                  name="phone"
                  type="number"
                  placeholder="Mobile Number"
                  value={stateValue.mobile}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    handleOnChange(onlyNums, "mobile");
                  }}
                  required
                  error={error.mobile ? helperText.mobile : ""}
                />
              </>
            ) : (
              <>
                <p>
                  OTP hasbeen sent to your mobile number {stateValue.mobile}
                </p>
                <InputComponent
                  name="otp"
                  type="number"
                  placeholder="Enter OTP"
                  value={stateValue.otp}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    handleOnChange(onlyNums, "otp");
                  }}
                  required
                  error={error.otp ? helperText.otp : ""}
                />
              </>
            )}
          </>
        }
        footer={
          <>
            <ButtonComponent
              name={isOtpField ? "Verify OTP" : "Send OTP"}
              variant="primary"
              onClick={() => {
                handleSubmit("save");
              }}
            />
          </>
        }
      />
    </Fragment>
  );
};

export default CustomerVerfiedAccount;
