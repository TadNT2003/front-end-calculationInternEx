'use client'

import axios from 'axios';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { login, getCookies, signin } from '@/lib/action'
// import { userContext, tokenContext } from '@/app/userContext';
// import { useContext } from 'react';

const URL = "http://localhost:4000/auth/"

export default function Account() {
    const route = useRouter()

    // async function login(formData: FormData) {
    //     // "use server"
    //     const userName = formData.get("userName");
    //     const password = formData.get("password");
    //     await axios.post(URL.concat("login"), {
    //                         userName: userName,
    //                         password: password
    //                     })
    //                     .then((reponse) => {
    //                         console.log(reponse.data);
    //                         const data = reponse.data
    //                         // <userContext.Provider value={reponse.data.currentUser.id}></userContext.Provider>;
    //                         // <tokenContext.Provider value={reponse.data.access_token}></tokenContext.Provider>;
    //                         route.push(`/?userId=${data.currentUser.id}`);
    //                         // return <Link href={{pathname: "/", query: reponse.data}}></Link>
    //                     })
    //                     .catch((error: any) => {
    //                         console.error(error);
    //                     })
    // }
    async function Login(formData: FormData) {
        try {
            await login(formData);
            // console.log(userID)
            const userID = await getCookies()
            console.log(userID)
            route.push(`/account/${userID}`)
        }
        catch (error) {
            console.error(error)
        }
    }

    async function Signin(formData: FormData) {
        try {
            await signin(formData);
            // console.log(userID)
            const userID = await getCookies()
            console.log(userID)
            route.push(`/account/${userID}`)
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <main>
            <form>
                <label htmlFor="userName">User name: </label>
                <input name="userName" id="userName" placeholder="User name"></input>
                <label htmlFor="password">Password: </label>
                <input name="password" id="password" placeholder="Password"></input>
                <button type="submit" formAction={Login}>Đăng nhập</button>
                <button type="submit" formAction={Signin}>Đăng ký</button>
            </form>
        </main>
    )
}