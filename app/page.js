import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'


const RootLayout = dynamic(() => import('./root'), {
	ssr: false,
})


export default async function Page() {

	return (
		<RootLayout />
	)
}