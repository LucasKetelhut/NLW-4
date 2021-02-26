import { url } from 'inspector';
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const { 
        min, 
        sec, 
        hasFinished, 
        isActive, 
        resetCountdown, 
        startCountdown 
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(min).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(sec).padStart(2, '0').split('');

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