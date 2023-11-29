// import { useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@mui/material';

import { TimerProvider, useTimer } from '../providers';
import { displayElapsedTime } from '../utils';
import { Slider } from '../Slider';

const TimerWithContext = () => {
   const { elapsedTime, toggleTimer } = useTimer();

   return (
      <>
         <Typography variant='h6' gutterBottom>Timer</Typography>
         <Typography variant='h6' gutterBottom>
            {elapsedTime ? displayElapsedTime(elapsedTime) : '00:00'}
         </Typography>
         <Slider/>
         <Button variant='contained' onClick={toggleTimer}>
            {elapsedTime ? 'Reset' : 'Start'}
         </Button>
      </>
   )
};

export const Timer = () => (
   <TimerProvider>
      <TimerWithContext />
   </TimerProvider>
);