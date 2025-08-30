"use client";
import React from 'react'
import ChatBox from './_components/ChatBox'
import Itinery from './_components/Itinery'

const CreateNewatrip = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10'>
      <div>
            <ChatBox/>
      </div>
      <div className='col-span-2'>
            <Itinery/>
      </div>
    </div>
  )
}

export default CreateNewatrip
