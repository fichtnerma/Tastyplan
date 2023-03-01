import Image from 'next/image';
import styles from '../../styles/StartPage.module.scss';
import logo from '../../../public/logo.svg';

export default function index() {
    return (
        <div className={styles.main}>
            <div className={styles.greenShadow}>
                <div className={styles.logo}>
                    <Image src={logo} alt="logo" width={400} height={239} priority />
                </div>
                <h2 className={styles.startText}>Los gehts!</h2>
                <div className={styles.startButton}>
                    <button className={styles.buttonContent} onClick={() => console.log('Button clicked!')}>
                        <h4 className={styles.startButtonText}>Start</h4>
                    </button>
                </div>
            </div>
        </div>
    );
}
