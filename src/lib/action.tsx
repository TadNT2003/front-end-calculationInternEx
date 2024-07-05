'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const URL = "http://localhost:4000/auth/"

export async function login(formData: FormData) {
    // "use server"
    const userName = formData.get("userName");
    const password = formData.get("password");
    await axios.post(URL.concat("login"), {
                        userName: userName,
                        password: password
                    })
                    .then((reponse) => {
                        // console.log(reponse.data);
                        const data = reponse.data
                        // <userContext.Provider value={reponse.data.currentUser.id}></userContext.Provider>;
                        // <tokenContext.Provider value={reponse.data.access_token}></tokenContext.Provider>;
                        // route.push(`/?userId=${data.currentUser.id}`);
                        cookies().set("access_token", data.access_token)
                        cookies().set("userId", data.currentUser.id)
                        cookies().set("userName", data.currentUser.userName)
                        // redirect(`account/${data.currentUser.id}`)
                        // return <Link href={{pathname: "/", query: reponse.data}}></Link>
                    })
                    .catch((error: any) => {
                        console.error(error);
                    })
                }

export async function signin(formData: FormData) {
        // "use server"
    const userName = formData.get("userName");
    const password = formData.get("password");
    await axios.post(URL.concat("signin"), {
                        userName: userName,
                        password: password
                    })
                .then((reponse) => {
                        // console.log(reponse.data);
                        const data = reponse.data
                        // <userContext.Provider value={reponse.data.currentUser.id}></userContext.Provider>;
                        // <tokenContext.Provider value={reponse.data.access_token}></tokenContext.Provider>
                        // route.push('/');
                        cookies().set("access_token", data.access_token)
                        cookies().set("userId", data.currentUser.id)
                        cookies().set("userName", data.currentUser.userName)
                    })
                .catch((error: any) => {
                        console.error(error);
                    })
                }

export async function getCookies() {
    const userID = await cookies().get("userId");
    const allCookies = await cookies().getAll();
    console.log(allCookies)
    console.log("userId trong cookies: ", userID);
    console.log("lay user cookies kieu khac", allCookies[1].value)
    return userID?.value
}

export async function logout() {
    await cookies().set("access_token", "");
    await cookies().set("userId", "");
    await cookies().set("userName", "");
}