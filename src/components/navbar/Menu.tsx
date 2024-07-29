'use client'

import { useWixClient } from '@/context/wixContext'
import { useCartStore } from '@/hooks/useCartStore'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Menu(): JSX.Element {
	const wixClient = useWixClient()
	const [open, setOpen] = useState(false)
	const { counter } = useCartStore()
	const pathname = usePathname()
	const isLoggedIn = wixClient.auth.loggedIn()
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setOpen(false)
	}, [pathname])

	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {
			if (menuRef.current != null && !menuRef.current.contains(event.target as Node)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [menuRef])

	return (
		<section ref={menuRef}>
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
