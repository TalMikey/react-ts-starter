import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface TimerProviderProps {
    children: React.ReactNode;
}

interface TimerContextProps {
    elapsedTime: number;
    toggleTimer: () => void;
    timerEnd: number;
    setTimerEnd: (value: number) => void;
}

const DEFAULT_TIME = 60 * 1000;

const TimerContext = createContext<TimerContextProps>({} as TimerContextProps);

export const TimerProvider = ({ children }: TimerProviderProps) => {
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [timerEnd, setTimerEnd] = useState<number>(DEFAULT_TIME);
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
        if (elapsedTime > timerEnd) {
            reset();
        }
    }, [elapsedTime, timerEnd]);

    return (
        <TimerContext.Provider value={{ elapsedTime, toggleTimer, timerEnd: timerEnd, setTimerEnd: value => setTimerEnd(value) }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);