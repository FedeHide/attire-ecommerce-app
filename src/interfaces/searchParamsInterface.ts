export interface listSearchParamsProps {
	searchParams: {
		cat: string | undefined | null
		name: string
		type: string
		min: number
		max: number
		sort: string
	}
}

export interface productListSearchParams {
	name: string
	type: string
	min: number
	max: number
	sort: string
}
