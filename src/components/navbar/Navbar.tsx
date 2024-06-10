import Link from 'next/link'
import Menu from './Menu'
import Image from 'next/image'
import SearchBar from './SearchBar'
import NavIcons from './NavIcons'

export default function Navbar(): JSX.Element {
	return (
		<section className="h-20 mb-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
			{/* MOBILE */}
			<article className="h-full flex items-center justify-between md:hidden">
				<Link href="/">
					<div className="text-2xl tracking-wide">ATTIRE</div>
				</Link>
				<Menu />
			</article>
			{/* DESKTOP */}
			<article className="hidden md:flex items-center justify-between gap-8 h-full">
				{/* LOGO & MENU */}
				<div className="w-1/3 xl:w-1/2 flex items-center gap-12">
					<Link className="flex items-center gap-3" href="/">
						<Image src="/assets/logo.webp" alt="logo" width={64} height={64} />
						<div className="text-2xl tracking-wide">ATTIRE</div>
					</Link>
					<div className="hidden xl:flex gap-4">
						<Link href="/">Home</Link>
						<Link href="/">Shop</Link>
						<Link href="/">Deals</Link>
						<Link href="/">About</Link>
						<Link href="/">Contact</Link>
					</div>
				</div>
				{/* SEARCHBAR & NAVICONS */}
				<article className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
					<SearchBar />
					<NavIcons />
				</article>
			</article>
		</section>
	)
}
