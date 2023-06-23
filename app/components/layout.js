import Head from 'next/head'

const Layout = (props) => (
  <>
    <Head>
      <title>Sign Up</title>

    </Head>

    <main>
      <div className="container">{props.children}</div>
    </main>

  </>
)

export default Layout
