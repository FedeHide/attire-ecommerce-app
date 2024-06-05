'use client'

import { WixClientContext } from '@/context/wixContext'
import type { WixClient } from '@wix/sdk'
import { useContext } from 'react'

export const useWixClient = (): WixClient => {
	return useContext(WixClientContext)
}
