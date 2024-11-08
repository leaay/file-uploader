import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white ">
        <div className="text-center">
          <p className="text-base font-semibold text-purple-600">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Sorry, we couldn&quot;t find the page you&quot;re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href={'/'}><Button>Go back home</Button></Link>
          </div>
        </div>
      </main>
  )
}