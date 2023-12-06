import * as React from 'react';
//import { GetStaticPaths, GetStaticProps } from 'next';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';//npm install axios


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));
  
  
export default function CustomizedTables() {

  const [schedule, setSchedule] = React.useState([]);

  React.useEffect(() => {

    const getStaticPaths = async() => {
        const scheduleData = await axios.get('http://localhost:4000/schedule');
        setSchedule(scheduleData.data);
        console.log(schedule);
    }

    getStaticPaths();

  },[]);


    return (       
      <>
        {/*                 
          <Stack spacing={2} direction="row">
          <Button variant="outlined">新規追加</Button>
          </Stack> */}
          
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">映画画像</StyledTableCell>
                <StyledTableCell align="center">タイトル</StyledTableCell>
                <StyledTableCell align="center">開始時間</StyledTableCell>
                <StyledTableCell align="center">上映時間</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((row) => (
                <StyledTableRow key={row.scheduleID}>
                  <StyledTableCell component="th" scope="row" align="center">{row.scheduleID}</StyledTableCell>
                  <StyledTableCell align="center">{row.movieName}</StyledTableCell>
                  <StyledTableCell align="center">{row.screenID}</StyledTableCell>
                  <StyledTableCell align="center">{row.scheduleStartDatetime}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
}