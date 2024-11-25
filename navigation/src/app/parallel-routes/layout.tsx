export default function Layout({
    children,
    users,
    revenue,
    notifications,
    login
}: {
    children: React.ReactNode
    users: React.ReactNode
    revenue: React.ReactNode
    notifications: React.ReactNode
    login: React.ReactNode
}) {

    let isLoggedIn = true;

    return isLoggedIn? (
        <>
            <div>
                {children}
            </div>
            <div style={{display:'flex'}}>
                {users}
                {revenue}
            </div>
            <div>
                {notifications}
            </div>
        </>
    )
    :
    (login)
}