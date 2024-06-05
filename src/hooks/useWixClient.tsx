'use client'

import { WixClientContext } from '@/context/wixContext'
import { useContext } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useWixClient = () => {
	return useContext(WixClientContext)
}
