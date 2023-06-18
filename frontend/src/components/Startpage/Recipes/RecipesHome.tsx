import React from 'react';
// import Image from 'next/image';
import styles from './RecipesHome.module.scss';

function RecipesHome() {
    return (
        <div className={styles.recipes}>
            <div className="bg-green-custom1 pt-20 lg:pb-20 mx-[-3.5rem]">
                <div className="mx-14 lg:flex">
                    <div className="lg:w-1/3">
                        <h2 className="leading-none mb-2">Simple and Tasty Recipes</h2>
                        <p>
                            - Indulge in a world of culinary delight, where visually captivating recipes take center
                            stage while remaining simple.
                        </p>
                    </div>
                    <div className={styles.imageLayout}>
                        <div className={styles.mainImage}></div>
                        <div className={`${styles.smallImage} ${styles.topLeft}`}></div>
                        <div className={`${styles.smallImage} ${styles.topRight}`}></div>
                        <div className={`${styles.smallImage} ${styles.bottomLeft}`}></div>
                        <div className={`${styles.smallImage} ${styles.bottomRight}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipesHome;
