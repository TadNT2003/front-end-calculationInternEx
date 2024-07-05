// "use client"

import Link from 'next/link';
import React from 'react';
import styles from "./page.module.css";
import { getCookies, logout } from '@/lib/action';
import { useRouter } from 'next/navigation';

export default function account({userId}: {userId: number | null}) {
  const route = useRouter()

  // async function getID() {
  //   const cookie = await getCookies();
  //   return Number(cookie);
  // }

  // const CookieID = getID()

  async function Logout() {
    await logout()
  } 
  
  if (!userId) return (
    <p className={styles.account_page}><Link href="/account">Đăng nhập/Đăng ký</Link></p>
  )
  else return (
    <div>
        <p>Đã đăng nhập, UserID: {userId}, <text className={styles.account_page} onClick={() => {Logout(); route.push("/")}}>Đăng xuất</text></p>
    </div>
  )
  // else {
  //   route.push(`/account/${CookieID}`);
  // }
}
