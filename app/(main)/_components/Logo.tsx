import Image from 'next/image'
import Link from 'next/link'
const Logo = () => {
  return (
    <div>
            <Link href="/">
                
                <Image className="hidden dark:block" src="./darkmode.svg" width={160} height={80} alt="logo" />
                <Image className='flex dark:hidden' src="./lightmode.svg" width={160} height={80} alt="logo"/>
            </Link>
    </div>
  )
}

export default Logo
