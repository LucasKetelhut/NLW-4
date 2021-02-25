import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext); 

    return (
        <div className={styles.profileContainer} >
            <img src="https://github.com/LucasKetelhut.png" alt="Lucas Ketelhut" />
            <div>
                <strong>Lucas Ketelhut</strong>
                <p>
                    <img src="icons/level.svg" alt="Ícone de level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}