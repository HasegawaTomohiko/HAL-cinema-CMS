import * as React from 'react';
import Button from '@mui/material/Button';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const BootstrapButton = styled(Button)({
  backgroundColor: '#0063cc',
  color:'white',
  float:'right',
  marginRight:'20px;',
});

export default function AddMovieButton(props) {

  return (
    <div>
      <BootstrapButton onClick={props.onClick}>

        {<SpeedDialIcon />}
        
      </BootstrapButton>
    </div>
  );
}