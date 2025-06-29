import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
const convertDateTime = (inputStr)=>{
  if (!inputStr) return '';

  const [datePart, timePart] = inputStr.split(', ');
  const [day, month, year] = datePart.split('/');

  const formattedDateStr = `${month}/${day}/${year} ${timePart}`;
  const date = new Date(formattedDateStr);

  const formattedDate = date.toLocaleDateString('en-GB'); // DD/MM/YYYY
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
}
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.customer_name}</TableCell>
        <TableCell align="right">{row.total_price}</TableCell>
        <TableCell align="right">{row.payment_status?<p style={{color:"green"}}>Done</p>:<p style={{color:"yellow"}}>Pending</p>}</TableCell>
        <TableCell align="right">{row.order_status}</TableCell>
        <TableCell align="right">{convertDateTime(row.order_time)}</TableCell>
      </TableRow>
      {row.order_item?.length > 0 && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Selected Items
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell align="right">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.order_item.map((historyRow, index) => (
                      <TableRow key={index}>
                        <TableCell>{historyRow.name}</TableCell>
                        <TableCell>{historyRow.price}</TableCell>
                        <TableCell align="right">{historyRow.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    customer: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    paymentStatus: PropTypes.string.isRequired,
    orderStatus: PropTypes.string.isRequired,
    orderTime: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default function CustomTable({ data, ...props }) {
    
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Customer</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Payment Status</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right">Order Time</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
