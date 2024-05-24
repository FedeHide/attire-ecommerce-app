'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CartModal from './CartModal'

export default function NavIcons() {
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const [isCartOpen, setIsCartOpen] = useState(false)
	const router = useRouter()

	const isLoggedIn = false //TEMP

	const handleProfile = () => {
		if (!isLoggedIn) {
			router.push('/login')
		}
		setIsProfileOpen(!isProfileOpen)
	}

	return (
		<div className="flex items-center gap-4 xl:gap-6 relative">
			{/* PROFILE */}
			<Image
				onClick={handleProfile}
				className="cursor-pointer"
				src="/assets/profile.png"
				alt="profile icon"
				width={22}
				height={22}
			/>
			{isProfileOpen && (
				<div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
					<Link href="/">Profile</Link>
					<div className="mt-2 cursor-pointer">Logout</div>
				</div>
			)}
			{/* NOTIFICATION */}
			<Image
				className="cursor-pointer"
				src="/assets/notification.png"
				alt="notification icon"
				width={22}
				height={22}
			/>
			{/* CART */}
			<div className="relative cursor-pointer">
				<Image
					onClick={() => setIsCartOpen(!isCartOpen)}
					src="/assets/cart.png"
					alt="cart icon"
					width={22}
					height={22}
				/>
				<div className="absolute -top-4 -right-4 w-6 h-6 bg-clrPrimary rounded-full text-white text-sm flex items-center justify-center">
					2
				</div>
			</div>
			{isCartOpen && <CartModal />}
		</div>
	)
}
