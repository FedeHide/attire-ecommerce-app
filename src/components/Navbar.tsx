import Link from 'next/link'
import Menu from './Menu'
import Image from 'next/image'

export default function Navbar() {
	return (
		<div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
			{/* MOBILE */}
			<div className="h-full flex items-center justify-between">
				<Link href="/">
					<div className="text-2xl tracking-wide">PURRIS</div>
				</Link>
				<Menu />
			</div>
			{/* DESKTOP */}
			<div className="hidden md:flex items-center justify-between gap-8 h-full">
				<div className="w-1/3">
					<Link href="/">
						<Image src="/assets/logo.png" alt="logo" width={24} height={24} />
						<div className="text-2xl tracking-wide">PURRIS</div>
					</Link>
				</div>
				<div className="w-2/3"></div>
			</div>
		</div>
	)
}
