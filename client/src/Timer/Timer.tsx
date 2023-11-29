import { Button, Typography, LinearProgress, Box } from '@mui/material';

import { TimerProvider, useTimer } from '../providers';
import { displayElapsedTime } from '../utils';
import { Slider } from '../Slider';

const TimerWithContext = () => {
   const { elapsedTime, toggleTimer, getProgress } = useTimer();

   return (
      <Box sx={{ width: '400px', m: 5, border: '1px solid gray', p: 3, borderRadius: 1 }}>
         <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }} variant='h6' gutterBottom>Timer</Typography>
         <Box display='flex'>
            <Typography sx={{ whiteSpace: 'nowrap', mr: 1 }} variant='h6' gutterBottom>Elapsed Time:</Typography>
            <Box sx={{ position: 'relative', width: 1 }}>
               <LinearProgress sx={{ height: 30, bgColor: '#f0f0f0' }} variant='determinate' value={getProgress()} />
               <Typography variant='h6' sx={{ position: 'absolute', top: 0 }}>
                  {elapsedTime ? displayElapsedTime(elapsedTime) : '00:00'}s
               </Typography>
            </Box>
         </Box>
         <Slider/>
         <Button sx={{ width: 1 }} variant='contained' onClick={toggleTimer}>
            {elapsedTime ? 'Reset' : 'Start'}
         </Button>
      </Box>
   )
};

export const Timer = () => (
   <TimerProvider>
      <TimerWithContext />
   </TimerProvider>
);