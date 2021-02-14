import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
      <title>React Paypal example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          React example for collecting payments with{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Paypal!
          </a>
        </h1>

      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://adebola.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Written by Adebola
        </a>
      </footer>
    </div>
  )
}
