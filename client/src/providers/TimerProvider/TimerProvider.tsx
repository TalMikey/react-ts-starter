import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface TimerProviderProps {
    children: React.ReactNode;
}

interface TimerContextProps {
    elapsedTime: number;
    toggleTimer: () => void;
    timer: number;
    setTimer: (value: number) => void;
    getProgress: () => number;
}

const MIN_TIME = 15 * 1000;
const MAX_TIME = 2 * 60 * 1000;
const DEFAULT_TIME = 60 * 1000;

const TimerContext = createContext<TimerContextProps>({} as TimerContextProps);

export const TimerProvider = ({ children }: TimerProviderProps) => {
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [timer, setTimer] = useState<number>(((DEFAULT_TIME - MIN_TIME) / (MAX_TIME - MIN_TIME)) * 100); // value is 0-100
    const intervalRef = useRef<number | null>(null);
    
    const start = () => {
        const start = Date.now() - elapsedTime;

        intervalRef.current = setInterval(() => {
            const currentElapsed = Date.now() - start;
            setElapsedTime(currentElapsed);
        });
    }

    const reset = () => {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setElapsedTime(0);
    }

    const toggleTimer = () => {
        if (intervalRef.current) {
            reset();
        } else {
            start();
        }
    };

    useEffect(() => {
        const didFinished = () => {
            const range = MAX_TIME - MIN_TIME;
            const time = (timer / 100) * range + MIN_TIME;
    
            return elapsedTime >= time;
        };

        if (didFinished()) {
            reset();
        }
    }, [elapsedTime, timer])

    const getProgress = () => {
        const time = (timer / 100) * (MAX_TIME - MIN_TIME) + MIN_TIME
        
        return (elapsedTime / time) * 100;
    } 

    return (
        <TimerContext.Provider value={{ elapsedTime, toggleTimer, timer, setTimer: value => setTimer(value), getProgress }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);