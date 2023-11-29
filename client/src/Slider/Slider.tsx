import { Slider as MuiSlider } from '@mui/material';

import { useTimer } from '../providers';

export const Slider = () => {
    const { timer, setTimer } = useTimer();

    const handleChange = (_: Event, newValue: number | number[]) => {
        setTimer(newValue as number);
      };

    return (
        <MuiSlider value={timer} onChange={handleChange}/>
    )
};