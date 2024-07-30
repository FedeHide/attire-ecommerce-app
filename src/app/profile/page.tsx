/* eslint-disable @typescript-eslint/no-misused-promises */
import UpdateButton from '@/components/UpdateButton'
import { updateUser } from '@/lib/actions'
import { wixClientServer } from '@/lib/wixClientServer'
import { members } from '@wix/members'
import Link from 'next/link'

export default async function Profile(): Promise<JSX.Element> {
	const wixClient = await wixClientServer()
	const isLoggedIn = wixClient.auth.loggedIn()

	if (!isLoggedIn) {
		return (
			<div className="flex flex-col gap-8 items-center justify-center">
				<p>Please log in to view your profile</p>
				<Link href="/login" passHref>
					<button className="bg-clrPrimary text-white p-2 rounded-md hover:bg-pink-300 px-4">
						Login
					</button>
				</Link>
			</div>
		)
	}

	try {
		const user = await wixClient.members.getCurrentMember({
			fieldsets: [members.Set.FULL],
		})

		const contactId = user.member?.contactId != null ? user.member?.contactId : ''
		const contactNickname =
			user.member?.profile?.nickname != null ? user.member?.profile?.nickname : 'john'
		const contactFirstName =
			user.member?.contact?.firstName != null ? user.member?.contact?.firstName : 'John'
		const contactLastName =
			user.member?.contact?.lastName != null ? user.member?.contact?.lastName : 'Doe'
		const contactPhone =
			user.member?.contact?.phones?.[0] != null
				? user.member?.contact?.phones?.[0]
				: '+1234567'
		const contactLoginEmail =
			user.member?.loginEmail != null ? user.member?.loginEmail : 'john@gmail.com'

		return (
			<section className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-10%)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
				<section className="w-full md:w-1/2">
					<h1 className="text-2xl">Profile</h1>
					<form action={updateUser} className="mt-12 flex flex-col gap-4">
						<input type="text" hidden name="id" defaultValue={contactId} />
						<label className="text-sm text-gray-700">Username</label>
						<input
							type="text"
							name="username"
							placeholder={contactNickname}
							className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
						/>
						<label className="text-sm text-gray-700">First Name</label>
						<input
							type="text"
							name="firstName"
							placeholder={contactFirstName}
							className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
						/>
						<label className="text-sm text-gray-700">Surname</label>
						<input
							type="text"
							name="lastName"
							placeholder={contactLastName}
							className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
						/>
						<label className="text-sm text-gray-700">Phone</label>
						<input
							type="text"
							name="phone"
							placeholder={contactPhone}
							className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
						/>
						<label className="text-sm text-gray-700">E-mail</label>
						<input
							type="email"
							name="email"
							placeholder={contactLoginEmail}
							className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
						/>
						<UpdateButton />
					</form>
				</section>
			</section>
		)
	} catch (error) {
		console.error(error)
		return (
			<section className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-10%)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
				<div className="flex items-center justify-center">Error loading profile</div>
			</section>
		)
	}
}
