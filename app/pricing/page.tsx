import React from 'react'
import { PricingTable } from '@clerk/nextjs'

function Pricing() {
  return (
    <div className='mt-20 bg-blue-200'>
        <h2 className=' my-5 font-bold text-center text-3xl'>AI Powered Trip Planner! Pick Your Plan Here!</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
        <PricingTable />
        </div>
    </div>
  )
}

export default Pricing
