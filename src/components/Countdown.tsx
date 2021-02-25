import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(30 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const min = Math.floor(time / 60);
    const sec = time % 60;

    const [minuteLeft, minuteRight] = String(min).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(sec).padStart(2, '0').split('');

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(30 * 60);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])    // toda vez que o valor de active/time mudar, executa uma ação
    
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                    disabled
                    className={styles.startCdButton}
                >
                    Ciclo encerrado
                    <img 
                        src="icons/check-circle.svg" alt="Encerrado"
                        style={{ marginLeft: "10px" }}
                    />
             </button>
            ) : (
                <>
                { isActive ? (
                <button 
                    type="button" 
                    className={`${styles.startCdButton} ${styles.startCdButtonActive}`}
                    onClick={resetCountdown}
                >
                    Abandonar ciclo
                    <img 
                        src="icons/close.svg" alt="Encerrar"
                        style={{ marginTop: "2px", marginLeft: "10px" }}    
                    />
                </button>
                ) : (
                <button 
                    type="button" 
                    className={styles.startCdButton}
                    onClick={startCountdown}
                >
                    Iniciar um ciclo
                    <img 
                        src="icons/play.svg" alt="Iniciar"
                        style={{ marginLeft: "10px", marginTop: "2px" }}
                    />
                </button>
                ) }
                </>
            )}

        </div>
    );
}