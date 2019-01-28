import Link from 'next/link';

export default () => (
    <div>
        <h1>Hello Next.js 👋</h1>
        <Link href='/three-receiver?lon=-73.97650983247132&lat=40.75145561237781'><a>3 Receiver</a></Link><br/>
        <Link href='/four-receiver?lon=-73.97650983247132&lat=40.75145561237781'><a>4 Receiver</a></Link>
    </div>
)