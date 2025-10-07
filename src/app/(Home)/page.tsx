import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className="text-red-500">Next Library</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
        atque dicta dignissimos dolorem, doloribus ea eveniet explicabo hic id
        illum, nesciunt nostrum perferendis possimus quae repellat repudiandae,
        soluta tempore vitae.
      </p>
      <Link href={'/books'}>Start exploring</Link>
    </div>
  )
}
