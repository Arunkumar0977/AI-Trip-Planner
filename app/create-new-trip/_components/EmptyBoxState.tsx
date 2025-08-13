import React from 'react'
import { suggestions } from '@/app/_components/Hero'

const EmptyBoxState = ({onselectOption}:any) => {
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-3xl text-center'>Start Planning New <strong className='text-primary'>Trip</strong> with AI </h2>
        <p className='text-center mt-2 text-gray-400'>Experience the future of travel with our AI-powered trip planner! Based on your preferences, budget, and schedule — Fast, smart, and stress-free planning at your fingertips.</p>
    <div className='flex flex-col gap-5 flex-wrap justify-center'>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={()=>onselectOption(suggestion.title)}
                  className='flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-xl hover:bg-muted/10 transition-all cursor-pointer'
                >
                  {suggestion.icon}
                  <h2 className='text-lg'>{suggestion.title}</h2>
                </div>
              ))}
            </div>
    
    
    </div>
  )
}

export default EmptyBoxState
