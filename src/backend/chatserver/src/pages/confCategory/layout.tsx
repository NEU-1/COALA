
export const metadata = {
    title: 'List Page',
    description: 'Generated by create next app',
}

export default function AboutLayout({
    children,
    }: {
        children: React.ReactNode
    }) {
        return (
            <>
                <nav>About NavBar</nav>
                <main>{children}</main>
            </>
        )
}