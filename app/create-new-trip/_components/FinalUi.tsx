import { Globe2 } from 'lucide-react'
import React from 'react'

function FinalUi({viewtrip, disable}:any) {
  return (
    <div className='flex flex-col items-center justify-center mt-6 p-6 bg-white'>
      <Globe2 className='text-primary text-4xl animate-bounce'></Globe2>
        <h2 className='mt-3 text-lg font-semibold text-primary'>
          Planning your dream trip
        </h2>
        <p>Gathering best destinations, activities and travel details for you</p>
        <button disabled={disable}  onClick={viewtrip} className='mt-2 w-full bg-red-500 border-e-foreground'>View Trip</button>
    </div>
  )
}

export default FinalUi
