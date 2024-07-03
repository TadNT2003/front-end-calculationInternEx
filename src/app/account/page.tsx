'use client'

export default function Account() {
    return (
        <main>
            <form>
                <label htmlFor="userName">User name: </label>
                <input name="userName" id="userName" placeholder="User name"></input>
                <label htmlFor="password">Password: </label>
                <input name="password" id="password" placeholder="Password"></input>
                <button type="submit">Đăng nhập</button>
                <button type="submit">Đăng ký</button>
            </form>
        </main>
    )
}