// import React, { useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import CircularProgress from '@mui/material/CircularProgress';
// import jsPDF from 'jspdf';
// import Button from '@mui/material/Button';

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);
//   const downloadInvoice = () => {

//     const doc = new jsPDF();
    
//     // Add content to the PDF
//     doc.text(`Invoice for Order ID: ${row.paymentId}`, 10, 10);
//     doc.text(`Product ID: ${row.products[0].productId}`, 10, 20);
//     doc.text(`Quantity: ${row.products[0].quantity}`, 10, 30);
//     doc.text(`Total Price: ${row.products[0].totalPrice}`, 10, 40);

//     // Save the PDF
//     doc.save(`invoice_${row.paymentId}.pdf`);
//   };

//   return (
//     <React.Fragment>
//     <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//       <TableCell>
//         <IconButton
//           aria-label="expand row"
//           size="small"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//         </IconButton>
//       </TableCell>
//       <TableCell component="th" scope="row">
//         {row.paymentId}
//       </TableCell>
     
//       <TableCell align="right">{row.totalPrice}</TableCell>
//       <TableCell align="right">{row.orderDate}</TableCell> {/* Add order date */}
    
//     </TableRow>
//     <TableRow>
//       <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
//         <Collapse in={open} timeout="auto" unmountOnExit>
//           <Box sx={{ margin: 1 }}>
//             <Typography variant="h6" gutterBottom component="div">
//               Order Details
//             </Typography>
//             <Table size="small" aria-label="product details">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Product ID</TableCell>
//                     <TableCell>Quantity</TableCell>
//                     <TableCell>Total Price</TableCell>
//                     <TableCell>Address</TableCell>
//                     <TableCell>Phone Number</TableCell>
//                     <TableCell> Email</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.products.map((product) => (
//                     <TableRow key={product._id}>
//                       <TableCell>{product.productId}</TableCell>
//                       <TableCell>{product.quantity}</TableCell>
//                       <TableCell>{product.totalPrice}</TableCell>
//                       <TableCell>{row.address}</TableCell>
//                       <TableCell>{row.phone}</TableCell>
//                       <TableCell>{row.email}</TableCell>
//                     </TableRow>
                    
//                   ))}
//                 </TableBody>
//               </Table>
//           </Box>
//         </Collapse>
//       </TableCell>
//     </TableRow>
    
//   </React.Fragment>
//   );
// }

// function ViewOrderHistory() {
//   const [products, setProducts] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [loading, setLoading] = useState(true);
//   const isLoggedIn = sessionStorage.getItem('token');

//   // Check if the token exists before attempting to decode
//   useEffect(() => {
//     if (isLoggedIn) {
//       try {
//         const decodedToken = jwtDecode(isLoggedIn);
//         const userId = decodedToken.userId;
//         setUserId(userId);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/user/details/orderHistory/${userId}`);
//       console.log(response.data)
//         setProducts(response.data);
//         console.log(products)
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [userId]);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell>Payment ID</TableCell>
//             <TableCell align="right">Total Price</TableCell>
//             <TableCell align="right">Date purchased</TableCell>
//             <TableCell>
//           {/* Button to download PDF invoice */}
//           <Button variant="contained" onClick={downloadInvoice}>
//             Download Invoice
//           </Button>
//         </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {products.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={4} align="center">
//                 No order history found for the user
//               </TableCell>
//             </TableRow>
//           ) : (
//             products.map((product) => <Row key={product.productId} row={product} />)
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default ViewOrderHistory;
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import jsPDF from 'jspdf';
import  'jspdf-autotable';


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  // Function to handle downloading PDF invoice
  const downloadInvoice = () => {
    const doc = new jsPDF();


    // Add company name, username, email, phone number, and date of order
    doc.text(`J$L`,10,10)
doc.text(`Kozhikode`, 10, 20); // Address
doc.text(`Order ID: ${row.orderId}`, 10, 30);
doc.text(`Payment ID: ${row.paymentId}`, 10, 40);
doc.text(`First Name: ${row.firstName}`, 10, 60);
doc.text(`Last Name: ${row.lastName}`, 10, 70);
doc.text(`Email: ${row.email}`, 10, 90);
doc.text(`Phone Number: ${row.phone}`, 10, 100);
doc.text(`Date of Order: ${row.orderDate}`, 10, 110);
doc.text(`Signature: ${row.signature}`, 10, 120); // Signature (includes J$L)


// Right-aligned text for date, time, and day
const indianOptions = { timeZone: 'Asia/Kolkata' };
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-IN', indianOptions);
const formattedTime = currentDate.toLocaleTimeString('en-IN', indianOptions);
const formattedDay = currentDate.toLocaleDateString('en-IN', { weekday: 'long', ...indianOptions });

// Calculate the width of the text to align it to the right side
const textWidth = doc.getStringUnitWidth(formattedDate) * doc.internal.getFontSize();
const rightSideX = doc.internal.pageSize.width - 10 - textWidth;

doc.text(`Date: ${formattedDate}`, rightSideX, 20);
doc.text(`Time: ${formattedTime}`, rightSideX, 30);
doc.text(`Day: ${formattedDay}`, rightSideX, 40);
    // Draw a line to separate user details from the table
    doc.line(10, 150, 200, 150);
    
    // Add a table
    const columns = ["Product ID", "Quantity", "Total Price"];
    const data = row.products.map(product => [product.productId, product.quantity, product.totalPrice]);
    
    // Calculate total quantity and total price
    const totalQuantity = row.products.reduce((total, product) => total + product.quantity, 0);
    const totalPrice = row.products.reduce((total, product) => total + product.totalPrice, 0);
    
    // Append the row for total quantity and total price to the data array
    data.push(["Total", totalQuantity, totalPrice]);
    
    // Add the table below the line
    doc.autoTable({
        startY: 160,
        head: [columns],
        body: data,
    });
    
    // Save the PDF
    doc.save(`invoice_${row.paymentId}.pdf`);
};


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.paymentId}
        </TableCell>
        <TableCell align="right">{row.totalPrice}</TableCell>
        <TableCell align="right">{row.orderDate}</TableCell>
        <TableCell>
          <Button variant="contained" onClick={downloadInvoice}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"/>
</svg>
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="product details">
                <TableHead>
                  <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell> Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product.productId}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.totalPrice}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function ViewOrderHistory() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const isLoggedIn = sessionStorage.getItem('token');

  // Check if the token exists before attempting to decode
  useEffect(() => {
    if (isLoggedIn) {
      try {
        const decodedToken = jwtDecode(isLoggedIn);
        const userId = decodedToken.userId;
        setUserId(userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/details/orderHistory/${userId}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId]);

  if (loading) {
    return <CircularProgress />;
  }
 

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Payment ID</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Date purchased</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No order history found for the user
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => <Row key={product.productId} row={product} />)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ViewOrderHistory;
