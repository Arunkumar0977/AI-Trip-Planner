// "use Client";
// import React from 'react'
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from '@/components/ui/button';
// import { ArrowDown, Globe2, Icon, Landmark, Plane, Send } from 'lucide-react';
// import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
// import { useUser } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';


// const suggestions = [
//     {
//         title: "Create New Trip",
//         icon:<Globe2 className=' text-blue-400 h-5 w-5' />, 
//     },
//     {
//         title: "Suggest me where to go",
//         icon:<Plane className=' text-green-400 h-5 w-5' />, 
//     },
//     {
//         title: "Discover hidden gems",
//         icon:<Landmark className=' text-orange-400 h-5 w-5' />, 
//     },
//     {
//         title: "Adventure destinations",
//         icon:<Globe2 className=' text-yellow-400 h-5 w-5' />, 
//     },
//     ]

// const Hero = () => {

//     const {user}= useUser();
//     const router = useRouter();
//     const onSend = () => {
//         if (!user) {
//             router.push('/sign-in');        
//             return;
//         }


//   return (
//     <div className='mt-24 w-full flex justify-center '>
//         {/*Content*/}
//         <div className='max-w-3xl w-full text-center space-y-6'>
//             <h1 className="text-xl md:text-5xl font-bold whitespace-nowrap ">
//   Hey, I'm Your Personal <span className="text-primary">Trip Planner</span>
// </h1>

//             <p className='text-lg'>Tell me what you want, and I'll handle the rest: Flights, Hotels all plannings in second</p>
        
//         {/*Input box*/}
//         <div>
//             <div className='border rounded-2xl p-4 relative'>
//                 <Textarea placeholder='Create a trip to Paris'
//                  className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none' />
//                  <Button size={'icon'} className='absolute bottom-6 right-6'onClick={()=>onSend()}><Send className='h-4 w-4'/></Button>
//             </div>
//         </div>
//         {/*Suggestions*/}
//         <div className='flex gap-5'>
//         {suggestions.map((suggestions, index) => (
//             <div key={index} className='flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg hover:bg-muted/10 transition-all cursor-pointer '>
//                 {suggestions.icon}
//                 <h2 className='text-xs'>{suggestions.title}</h2>
//             </div>
//         ))}
//         </div>
//         <h2 className='my-7 mt-14 flex gap-2 text-center'>Not sure where to start? <strong>See how it works</strong><ArrowDown/></h2>
//         {/*Video Section*/}
//         <HeroVideoDialog
//         className="block dark:hidden"
//         animationStyle="from-center"
//         videoSrc="https://youtu.be/Mf_nGEPIsQ8?si=sOYCoN_pcvp0ipWG"
//         thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
//         thumbnailAlt="Dummy Video Thumbnail"
//         />
//       </div>
//     </div>
//   )
// }

// export default Hero;

"use client";
import React from 'react'
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { ArrowDown, Globe2, Landmark, Plane, Send } from 'lucide-react';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export const suggestions = [
  {
    title: "Create New Trip",
    icon: <Globe2 className='text-blue-400 h-5 w-5' />,
  },
  {
    title: "Suggest me where to go",
    icon: <Plane className='text-green-400 h-5 w-5' />,
  },
  {
    title: "Discover hidden gems",
    icon: <Landmark className='text-orange-400 h-5 w-5' />,
  },
  {
    title: "Adventure destinations",
    icon: <Globe2 className='text-yellow-400 h-5 w-5' />,
  },
];

const Hero = () => {
  const { user } = useUser();
  const router = useRouter();

  const onSend = () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    // Add your logic to send the trip data (API call or state update)
    console.log("Trip submitted!");
    router.push('/create-new-trip')
  };

      

  return (
    <div className='mt-24 w-full flex justify-center'>
      {/* Content */}
      <div className='max-w-3xl w-full text-center space-y-6'>
        <h1 className="text-xl md:text-5xl font-bold whitespace-nowrap">
          Hey, I'm Your Personal <span className="text-primary">Trip Planner</span>
        </h1>

        <p className='text-lg'>
          Tell me what you want, and I'll handle the rest: Flights, Hotels, all planning in seconds.
        </p>

        {/* Input Box */}
        <div>
          <div className='border rounded-2xl p-4 relative'>
            <Textarea
              placeholder='Create a trip to Paris'
              className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
            />
            <Button
              size={'icon'}
              className='absolute bottom-6 right-6 cursor-pointer'
              onClick={onSend}
            >
              <Send className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Suggestions */}
        <div className='flex gap-5 flex-wrap justify-center'>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className='flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg hover:bg-muted/10 transition-all cursor-pointer'
            >
              {suggestion.icon}
              <h2 className='text-xs'>{suggestion.title}</h2>
            </div>
          ))}
        </div>
    
        <h2 className='my-7 mt-14 flex gap-2 text-center justify-center items-center'>
          Not sure where to start? <strong>See how it works</strong>
          <ArrowDown />
        </h2>
          
        {/* Video Section */}
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/Mf_nGEPIsQ8"

          thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
          thumbnailAlt="Dummy Video Thumbnail"
        />
      </div>
    </div>
  );
};

export default Hero;
