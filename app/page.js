import dynamic from 'next/dynamic'

const RootLayout = dynamic(() => import('./root'), {
	ssr: false,
})

export default function Page() {
	return (
		<RootLayout />
	)
}