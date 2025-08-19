// import { Link } from '@tanstack/react-router'
// import { MapPin } from 'lucide-react'
// import { buttonVariants } from '@/components/ui/button'
// import { HeroCards } from './hero-cards'
// import heroBg from '/src/assets/hero-bg.avif'

// export const Hero = () => {
//   return (
//     <section
//       className='-mt-14'
//       style={{
//         backgroundImage: `url('${heroBg}')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div className='dark:bg-background/90 h-full w-full bg-white/80'>
//         <div className='container grid place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2'>
//           <div className='space-y-6 text-center lg:text-start'>
//             <main className='text-5xl font-bold md:text-6xl'>
//               <h1 className='inline'>
//                 <span className='from-accent-foreground to-primary inline bg-linear-to-r bg-clip-text text-transparent'>
//                   Kumthekar
//                 </span>{' '}
//                 Furniture
//               </h1>{' '}
//               for{' '}
//               <h2 className='inline'>
//                 <span className='from-primary to-accent-foreground inline bg-linear-to-r bg-clip-text text-transparent'>
//                   Modern Homes
//                 </span>
//               </h2>
//             </main>

//             <p className='text-muted-foreground mx-auto text-xl md:w-10/12 lg:mx-0'>
//               Handcrafted elegance for timeless interiors. Premium wooden
//               furniture built to elevate your living experience.
//             </p>

//             <div className='space-y-4 md:space-y-0 md:space-x-4'>
//               <Link
//                 to='/products'
//                 className={`w-full md:w-1/3 ${buttonVariants()}`}
//               >
//                 Explore Collection
//               </Link>

//               <Link
//                 rel='noreferrer noopener'
//                 to='/'
//                 target='_blank'
//                 className={`w-full md:w-1/3 ${buttonVariants({
//                   variant: 'outline',
//                 })}`}
//               >
//                 Visit Our Showroom
//                 <MapPin className='ml-2 h-5 w-5' />
//               </Link>
//             </div>
//           </div>

//           {/* Hero cards sections */}
//           <div className='z-10'>
//             <HeroCards />
//           </div>

//           {/* Light effect */}
//           <div className='light-effect'></div>
//         </div>
//       </div>
//     </section>
//   )
// }

// import React from 'react';
// import homevideo from "../assets/extra imges/homevideo1.mp4"

import heroBg from '@/assets/heriimage new.jpg'
// import { useNavigate } from 'react-router';
import { useNavigate } from '@tanstack/react-router';


export const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({to: "/products"}); // Change the path to your desired route
  };
  return (
    <>
     <div className="relative w-full h-screen bg-black ">
     
     {/* <video
  src={homevideo}
  autoPlay
  loop
  muted
  className="absolute inset-0 w-full h-full object-cover opacity-70"
></video> */}
<img src={heroBg} alt='image1' className='absolute inset-0 w-full h-full object-cover opacity-70'>

</img>

      
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>

      <div className="relative z-10 flex flex-col items-end justify-center text-center h-full text-white px-6">
        <h1 className="text-2xl md:text-4xl font-bold">
          Sparkle with Distinction:
        </h1>
        <p className="text-xl md:text-2xl mt-4">
          Explore our Exclusive Collection!
        </p>
        <div className="mt-5">
        <button onClick={handleClick} className="px-6 py-4 bg-[linear-gradient(180deg,_#C47F31,_#C47F31)] rounded-full justify-center items-center gap-[12.94px] inline-flex overflow-hidden cursor-pointer relative transition-all duration-500 hover:px-10 group/nested">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,_#fff,_#fff)] opacity-0 group-hover/nested:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -left-5 w-5 h-5 bg-color-1 rounded-full group-hover/nested:left-72 group-hover/nested:bg-black transition-all duration-500"></div>
                <div className="relative z-10 text-black text-xl font-medium text-nowrap">
                  Explour our collection
                </div>
              </button>
    </div>
      </div>
    </div>
    
    </>
  )
}

// export default Hero