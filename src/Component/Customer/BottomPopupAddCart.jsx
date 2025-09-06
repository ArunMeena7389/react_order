import React, { Fragment, useEffect, useState } from "react";
import {
  SwipeableDrawer,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CustomerVerfiedAccount from "../../Common/CustomerVerfiedAccount";

const BottomPopupAddCart = ({
  open,
  onClose,
  onOpen,
  addedCartData,
  handleAddClick,
}) => {
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [orderItems, setOrderItems] = useState({
    totalPrice: "",
    items: addedCartData,
  });

  const handleAdd = (dt) => {
    handleAddClick(dt, "plush");
  };

  const handleRemove = (dt) => {
    handleAddClick(dt, "minus");
  };

  const handleOrderClick = () => {
    setIsOpenAccount(true);
  };

  useEffect(() => {
    let total = addedCartData.reduce(
      (sum, item) => sum + Number(item.price || 0) * item.count,
      0
    );

    if (total > 1000) {
      total = total - total * 0.05;
    }

    setOrderItems((prev) => ({
      ...prev,
      totalPrice: total.toFixed(2),
      items: addedCartData,
    }));
  }, [addedCartData]);

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        disableEnforceFocus={true}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 2,
            maxHeight: "80vh",
            height: "60vh",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            bgcolor: "#fff",
            borderRadius: "12px 12px 0 0",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
          </Box>
          {addedCartData.map((item, index) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={1}
              borderBottom="1px solid #e0e0e0"
              sx={{ width: "100%", maxWidth: 500, mx: "auto" }}
              key={index}
            >
              {/* Food Name */}
              <Typography variant="subtitle1" sx={{ fontSize: 14, flex: 1 }}>
                {`${index + 1}. ${item.name}`}
              </Typography>

              {/* Counter */}
              <Box
                display="flex"
                alignItems="center"
                border="1px solid #ccc"
                borderRadius="6px"
                px={1}
                mx={1}
              >
                <IconButton
                  size="small"
                  onClick={() => {
                    handleRemove(item);
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" mx={1}>
                  {item.count}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => {
                    handleAdd(item);
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, minWidth: 50 }}
              >
                ₹{Number(item.price) * item.count}
              </Typography>
            </Box>
          ))}
          {addedCartData.length ? (
            <div>
              <p className="">5% extra discount if order above ₹1000.</p>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, minWidth: 50 }}
                style={{ position: "absolute", right: "30px" }}
              >
                Total :₹{orderItems.totalPrice}
              </Typography>
              <Button
                variant="contained"
                style={{
                  position: "absolute",
                  right: "20px",
                  marginTop: "30px",
                }}
                onClick={() => {
                  handleOrderClick();
                }}
              >
                Check Out
              </Button>
            </div>
          ) : (
            <div>No Data Added to Cart</div>
          )}
        </Box>
      </SwipeableDrawer>
      <CustomerVerfiedAccount
        open={isOpenAccount}
        orderItems={orderItems}
        onClose={() => {
          setIsOpenAccount(false);
        }}
      />
    </Fragment>
  );
};

export default BottomPopupAddCart;
