import dynamic from 'next/dynamic'


const RootLayout = dynamic(() => import('./createQuiz'), {
	ssr: false,
})

export default async function Page() {
	return (
		<RootLayout />
	)
}
