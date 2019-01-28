import Link from 'next/link';

export default () => {
    return (
        <div>
            <h1>Hello Next.js 👋</h1>
            <Link href="/randomPos"><a>Random Position</a></Link><br/>
            <Link href="/benchmark"><a>Benchmark</a></Link>
        </div>
    )
}