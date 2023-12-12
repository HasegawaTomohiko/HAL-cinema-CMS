import { Box, Button, FormControl, Input, InputLabel, Modal, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
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

export default function MovieForm (props) {
  const [movieID, setMovieID] = React.useState('');
  const [movieName, setMovieName] = React.useState('');
  const [movieImage, setMovieImage] = React.useState();
  const [movieLenght, setMovieLenght] = React.useState(dayjs());
  const [movieContext, setMovieContext] = React.useState('');

  const handleMovieIDChange = (event) => {
    setMovieID(event.target.value);
  }

  const haldleMovieNameChange = (event) => {
    setMovieName(event.target.value);
  }

  //ファイルの保存処理に変更
  const handleMovieImageChange = (event) => {
    setMovieImage(event.target.files[0]);
  }

  const handleMovieLenghtChange = (time) => {
    setMovieLenght(time);
  }

  const handleMovieContextChange = (event) => {
    setMovieContext(event.target.value);
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('movieID',movieID);
    formData.append('movieName',movieName);
    formData.append('movieImage',movieImage);
    formData.append('movieLenght',movieLenght.toString());
    formData.append('movieContext',movieContext);
    await axios.post('http://localhost:4000/movie',formData,{
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    }).then(() => {
      props.onClose();
      window.location.reload();
    });
  }

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Box sx={style}>
        <FormControl fullWidth>
          <TextField
            label="映画ID"
            value={movieID}
            id='movieID'
            onChange={handleMovieIDChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="映画タイトル"
            value={movieName}
            id='movieName'
            onChange={haldleMovieNameChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <Input
            label="映画画像"
            type='file'
            id='movieImage'
            onChange={handleMovieImageChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField 
            label="上映時間"
            id='movieLenght'
            onChange={handleMovieLenghtChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="映画概要"
            value={movieContext}
            id='movieContext'
            onChange={handleMovieContextChange}
          />
        </FormControl>

        <Button variant='contained' onClick={handleSubmit}>
          送信
        </Button>
      </Box>
    </Modal>
  );
}