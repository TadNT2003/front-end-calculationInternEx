// "use client"

import Home from '@/app/page';
import { getCookies } from '@/lib/action';
import { Cookie } from 'next/font/google';
// import { useRouter } from 'next/navigation';

export default async function UserHome({params} : {params: {id: number}}) {
    // const route = useRouter();

    async function getID() {
        const cookie = await getCookies();
        const CookieID = Number(cookie);
        if (CookieID == params.id) {
            return true
        }
        else {
            return false
        }
    }

    // const CookieID = getID()
    const checkCookie = await getID()

    // return <p>this user number {params.id}</p>
    return <Home userID={params.id} checkCookie={checkCookie}></Home>
}