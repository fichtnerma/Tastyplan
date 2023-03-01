import React from 'react'

import Image from 'next/image';
import logo from '../../../public/logo.svg';
import styles from '../Header/Header.module.scss';

export default function Header() {
  return (
    <>
      <div className={styles.container}>
        <div className='grid grid-cols-3'>
          <Image src={logo} alt="Logo" width={200} height={155} priority />
          <div className='col-span-2'>
            <h1>Hi, Jo!</h1>
            <h2 className={styles.secondTitle}>Willkommen bei Tasty Plan</h2>
          </div>
        </div>
      </div>
    </>
  )
}
