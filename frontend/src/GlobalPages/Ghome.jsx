import AuthNavbar from "../UserComponents/AuthNav"
export default function ghome() {
  return (
    <div>
      <AuthNavbar/>
      <div className="bg-afrihouse-prim">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-afrihouse-primary text-gray-900 sm:text-7xl">
              Find Your Dream Home with AfriHouse
            </h1>
            <p className="mt-8 text-lg font-medium text-afrihouse-secondary text-gray-500 sm:text-xl/8">
              AfriHouse Realtors – Your Trusted Home Finder
            </p>
            <p className="mt-4 text-lg text-gray-500 sm:text-xl/8">
              Searching for a home has never been easier! With AfriHouse, you can find, move into, and settle in your dream home without pausing your daily job. Our platform brings house hunting to your fingertips, allowing you to explore, select, and secure your new home from the comfort of your desk.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="./login" className="rounded-md bg-afrihouse-prim px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-afrihouse-prim-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-afrihouse-prim-dark">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}
