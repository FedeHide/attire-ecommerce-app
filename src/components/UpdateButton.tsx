'use client'
import { useFormStatus } from 'react-dom'

export default function UpdateButton(): JSX.Element {
	const { pending } = useFormStatus()
	return (
		<button
			disabled={pending}
			className="bg-clrPrimary text-white p-2 rounded-md cursor-pointer disabled:bg-pink-200 disabled:cursor-not-allowed max-w-96"
		>
			{pending ? 'Updating...' : 'Update'}
		</button>
	)
}
