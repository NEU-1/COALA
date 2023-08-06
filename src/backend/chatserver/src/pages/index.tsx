import Link from 'next/link'

export default function Home() {
  let name = 'park'
  return (
    <main>
      <div>Hello {name}</div>
      <h1>
        Home page
      </h1>
      <ul>
        <li><Link href={"/sendImage"}>/sendImage</Link></li>
        {/* <li><Link href={"/chat"}>/chat</Link></li> */}
        {/* <li><Link href={"/sub/about"}>/sub/about</Link></li>
        <li><Link href={"/sub/1"}>/sub/[id].js</Link></li> */}
      </ul>
    </main>
  )
}
