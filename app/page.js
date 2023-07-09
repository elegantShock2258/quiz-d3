import dynamic from 'next/dynamic'


const RootLayout = dynamic(() => import('./root'), {
	ssr: false,
})




export default async function Page() {
	const res = await fetch('http://localhost:3000/api/user', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({anon: true }),
	}).then((data) => {
		return data
	})

	return (
		<RootLayout />
	)
}