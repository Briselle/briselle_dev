import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    'OBJ101',
    'Accounts',
    'Standard',
    'To save account info',
    '2021-12-13',
  ),
  createData(
    1,
    'OBJ102',
    'Contacts',
    'Custom',
    'To save contacts information',
    '2021-12-13',
  ),
  createData(2, 'OBJ103', 'Products', 'Custom', 'To save product information', '2021-12-13'),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Objects</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Object ID</TableCell>
            <TableCell>Object Name</TableCell>
            <TableCell>Object Type</TableCell>
            <TableCell>Object Description</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more objects
      </Link>
    </React.Fragment>
  );
}