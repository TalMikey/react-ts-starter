import { createContext, useContext, useRef, useState } from 'react';
import { displayElapsedTime } from '../../utils';

interface TimerProviderProps {
    children: React.ReactNode;
}

interface TimerContextProps {
    elapsedTime: string;
    toggleTimer: () => void;
    // setTimer: (value: number) => void;
}

const TimerContext = createContext<TimerContextProps>({} as TimerContextProps);

export const TimerProvider = ({ children }: TimerProviderProps) => {
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    // const [timer, setTimer] = useState<number>(15 * 1000);
    const intervalRef = useRef<number>(null);
    
    const toggleTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        } else {
            const start = Date.now() - elapsedTime;
            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - start);
            });
        }
    };

    return (
        <TimerContext.Provider value={{ elapsedTime: displayElapsedTime(elapsedTime), toggleTimer }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);