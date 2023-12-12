import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React from 'react';

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

export default function MovieTables() {
  const [movie, setMovies] = React.useState([]);

  React.useEffect(() => {
    const getStaticPaths = async () => {
      const movieData = await axios.get('http://localhost:4000/movie');
      setMovies(movieData.data);
    }

    getStaticPaths();
  },[]);


  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">映画ID</StyledTableCell>
            <StyledTableCell align="center">映画タイトル</StyledTableCell>
            <StyledTableCell align="center">映画画像</StyledTableCell>
            <StyledTableCell align="center">上映時間</StyledTableCell>
            <StyledTableCell align="center">概要</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movie.map((row) => (
            <StyledTableRow key={row.movieID}>
              <StyledTableCell component="th" scope="row" align="center">{row.movieID}</StyledTableCell>
              <StyledTableCell align="center">{row.movieName}</StyledTableCell>
              <StyledTableCell align="center"><img src={`http://localhost/HAL-cinema/image/movie/${row.movieImagePath}`} width={100}/></StyledTableCell>
              <StyledTableCell align="center">{row.movieLenght}</StyledTableCell>
              <StyledTableCell align="center">{row.movieContext}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}