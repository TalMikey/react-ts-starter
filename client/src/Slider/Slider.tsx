import { Slider as MuiSlider } from '@mui/material';

import { useTimer } from '../providers';

const MIN_TIME = 15 * 1000;
const MAX_TIME = 2 * 60 * 1000;

export const Slider = () => {
    const { timerEnd, setTimerEnd } = useTimer();

    const handleChange = (_: Event, newValue: number | number[]) => {
        const value = newValue as number;
        const range = MAX_TIME - MIN_TIME;
        const percentage = value / 100;

        setTimerEnd(range * percentage + MIN_TIME);
      };

    return (
        <MuiSlider value={((timerEnd - MIN_TIME) / (MAX_TIME - MIN_TIME)) * 100} onChange={handleChange}/>
    )
};