import { HomeIcon, TruckIcon, HandThumbUpIcon } from '@heroicons/react/20/solid';
import AuthNavbar from '../UserComponents/AuthNav';

export default function About() {
  return (
    <div>
        <div>
            <AuthNavbar/>
        </div>
        <div className="relative isolate overflow-hidden bg-[#C2B29F] px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="background-pattern"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect fill="url(#background-pattern)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold text-indigo-600">Find Your Dream Home</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Afrihous Realtors – Your Trusted Home Finder
              </h1>
              <p className="mt-6 text-xl text-gray-700">
                Searching for a home has never been easier! With Afrihous, you can find, move into, and settle in your
                dream home without pausing your daily job. Our platform brings house hunting to your fingertips,
                allowing you to explore, select, and secure your new home from the comfort of your desk.
              </p>
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt="Afrihous Real Estate"
            src="https://source.unsplash.com/800x600/?modern-house"
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-gray-700 lg:max-w-lg">
              <p>
                We provide seamless real estate solutions that save you time and effort. No more weekend house
                hunting—Afrihous takes care of everything while you focus on what matters most.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <HomeIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Personalized House Hunting.</strong> Browse curated
                    listings tailored to your preferences, all from your device.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <TruckIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Hassle-Free Moving.</strong> We coordinate all
                    logistics to ensure a smooth transition to your new home.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <HandThumbUpIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Affordable & Transparent.</strong> No hidden fees,
                    just straightforward pricing to make homeownership accessible.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Join thousands of happy homeowners who found their dream homes effortlessly with Afrihous. Let us make
                your next move stress-free and efficient!
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Start Your Search Today</h2>
              <p className="mt-6">
                Sign up now and browse available homes in your preferred location. Afrihous is committed to making home
                buying and moving a seamless experience for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}
