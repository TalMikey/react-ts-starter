// import { useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@mui/material';

import { TimerProvider, useTimer } from '../providers';

const TimerWrapper = () => {
   const {  elapsedTime, toggleTimer } = useTimer();

   return (
      <>
         <Typography variant='h6' gutterBottom>Timer</Typography>
         <Typography variant='h6' gutterBottom>{elapsedTime}</Typography>
         <Button variant='contained' onClick={toggleTimer}>Toggle</Button>
      </>
   )
};

export const Timer = () => (
   <TimerProvider>
      <TimerWrapper />
   </TimerProvider>
);