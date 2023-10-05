import React from 'react';
import styles from './Overlay.module.scss';

interface OverlayProps {
    toggle: (activeForm: string) => void;
    visible: boolean;
}
export default function Overlay({ toggle, visible }: OverlayProps) {
    const handleToggle = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;

        toggle(target.id);
    };

    return (
        <div className={`${styles.overlayContainer} ${visible && styles.rightPanel}`}>
            <div className={styles.overlay}>
                <div className={styles.overlayLeft}>
                    <h2>Welcome to TastyPlan!</h2>
                    <p>We are glad you decided to check us out.</p>
                    <p>Already have an account ?</p>
                    <br />
                    <button className="btn-secondary" onClick={handleToggle} id="login">
                        Sign In
                    </button>
                </div>
                <div className={styles.overlayRight}>
                    <h2>Welcome Back!</h2>
                    <p>Don`t have an account ? </p>
                    <br />
                    <button className="btn-secondary" onClick={handleToggle} id="registration">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}
