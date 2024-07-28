'use client'

import { useWixClient } from '@/context/wixContext'
import { useCartStore } from '@/hooks/useCartStore'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Menu(): JSX.Element {
	const wixClient = useWixClient()
	const [open, setOpen] = useState(false)
	const { counter } = useCartStore()
	const isLoggedIn = wixClient.auth.loggedIn()

	return (
		<section>
			<Image
				src="/assets/icons/menu-icon.png"
				alt="menu"
				width={28}
				height={28}
				className="cursor-pointer"
				onClick={() => {
					setOpen(!open)
				}}
			/>
			{open && (
				<div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
					<Link href="/">Home</Link>
					<Link href="/list?cat=all-products">Shop</Link>
					<Link href="/list?cat=deals">Deals</Link>
					<Link href="/about">About</Link>
					<Link href="/contact">Contact</Link>
					{isLoggedIn ? (
						<Link href="/profile">Profile</Link>
					) : (
						<Link href="/login">Login</Link>
					)}
					<Link href="/cart">Cart ({counter})</Link>
				</div>
			)}
		</section>
	)
}
