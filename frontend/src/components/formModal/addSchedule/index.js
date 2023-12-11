import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axios from 'axios';
import dayjs from 'dayjs';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
export default function BasicModal(props) {
  const [movieID, setMovieID] = React.useState('');
  const [screenID, setScreenID] = React.useState('');
  const [scheduleStartDatetime, setScheduleStartDatetime] = React.useState(dayjs());
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:4000/movie')
      .then(res => setMovies(res.data));
  },[]);

  const handleMovieChange = (event) => {
    setMovieID(event.target.value);
  }

  const handleScreenChange = (event) => {
    setScreenID(event.target.value);
  }

  const handleDatetimeChange = (datetime) => {
    setScheduleStartDatetime(datetime);
  }

  const handleSubmit = () => {
    axios.post('http://localhost:4000/schedule',{
      movieID,
      screenID,
      scheduleStartDatetime : scheduleStartDatetime.toISOString(),
    }).then(() => {
      props.onClose();
      window.location.reload();
    });
  }
  

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            スケジュール情報新規追加
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="movieID">映画ID</InputLabel>
            <Select
              labelId="movieID-label"
              id="movieID"
              value={movieID}
              label="movieID"
              onChange={handleMovieChange}
            >
              {movies.map((movie) => (
                <MenuItem key={movie.id} value={movie.movieID}>
                  {movie.movieName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="screenID">スクリーンID</InputLabel>
            <Select
              labelId="screenID-label"
              id="screenID"
              value={screenID}
              label="screenID"
              onChange={handleScreenChange}
            >
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((id) => (
                <MenuItem key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <FormControl fullWidth>
                <input
                  type="datetime-local"
                  id="scheduleStartDatetime"
                  name="scheduleStartDatetime"
                  value={scheduleStartDatetime}
                  onChange={handleDatetimeChange}
                />
          </FormControl> */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl fullWidth>
              <DatePicker
                label="開始日"
                value={scheduleStartDatetime}
                onChange={handleDatetimeChange}
              />
              <TimePicker
                label="開始時間"
                value={scheduleStartDatetime}
                onChange={handleDatetimeChange}
              />
            </FormControl>
          </LocalizationProvider>

          <Button variant="contained" onClick={handleSubmit}>
            送信
          </Button>
        </Box>
      </Modal>
    </div>
  );
}