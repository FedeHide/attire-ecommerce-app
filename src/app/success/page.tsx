// SuccessPage.tsx
'use client'
import { usePurchase } from '@/context/purchaseContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Confetti from 'react-confetti'

const SuccessPage = (): JSX.Element => {
	const router = useRouter()
	const { purchaseCompleted } = usePurchase()

	useEffect(() => {
		if (!purchaseCompleted) {
			router.push('/')
		} else {
			const timer = setTimeout(() => {
				router.push('/')
			}, 5000)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [purchaseCompleted, router])

	return (
		<div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh-180px)]">
			{purchaseCompleted ? (
				<div className="flex flex-col gap-6 items-center justify-center">
					<Confetti width={2000} height={1000} />
					<h1 className="text-6xl text-green-700">Successful</h1>
					<h2 className="text-xl font-medium">We sent the invoice to your e-mail</h2>
					<h3 className="">You are being redirected to the order page...</h3>
				</div>
			) : (
				<div></div>
			)}
		</div>
	)
}

export default SuccessPage
