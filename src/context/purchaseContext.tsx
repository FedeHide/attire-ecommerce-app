'use client'
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface PurchaseContextType {
	purchaseCompleted: boolean
	setPurchaseCompleted: (completed: boolean) => void
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined)

export const PurchaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [purchaseCompleted, setPurchaseCompleted] = useState(false)

	return (
		<PurchaseContext.Provider value={{ purchaseCompleted, setPurchaseCompleted }}>
			{children}
		</PurchaseContext.Provider>
	)
}

export const usePurchase = (): PurchaseContextType => {
	const context = useContext(PurchaseContext)
	if (context == null) {
		throw new Error('usePurchase must be used within a PurchaseProvider')
	}
	return context
}
