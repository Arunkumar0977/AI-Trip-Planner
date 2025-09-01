
// import React from 'react'
// import { Trip } from '../page'
// import Link from 'next/link'
// import Image from 'next/image'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import axios from 'axios'

// type Props={
//     trip:Trip
// }

// function MyTripCardItem({trip}:Props) {

//   const [photoUrl, setPhotoUrl]=useState<string>();
      
//         useEffect(()=>{
//           trip && GetGooglePlaceDetail();
//         }, [trip])
//         const GetGooglePlaceDetail=async()=>{
//           const result=await axios.post('/api/google-place-detail',{
//               placeName:trip?.tripDetail?.destination
//           });
//           if(result?.data.error){
//               console.log(result?.data.error);
//               return;
//           }
//           setPhotoUrl(result?.data);
//         }

//   return (
//     <Link href={`/view-trip/${trip?.tripId}`} className='p-3 rounded-3xl border-1  hover:scale-105 transition cursor-pointer shadow-lg'>
//                 <img src={photoUrl?photoUrl:'#'} alt={trip.tripId} height={400} width={400} className='rounded-2xl border-2 shadow-2xl w-full h-[250px] '/>
//                 <h2 className='flex gap-2 font-semibold text-xl'>{trip?.tripDetail?.origin}<ArrowBigRight/>{trip?.tripDetail?.destination}</h2>
//                 <h2 className='mt-2 text-gray-500'>{trip?.tripDetail?.duration} Trip with{trip?.tripDetail?.budget} budget</h2>
//             </Link>
//   )
// }

// export default MyTripCardItem



"use client"
import React, { useEffect, useState } from "react"
import { Trip } from "../page"
import { ArrowBigRight } from "lucide-react"
import axios from "axios"
import Link from "next/link"

type Props = {
  trip: Trip
}

function MyTripCardItem({ trip }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string>()

  useEffect(() => {
    trip && GetGooglePlaceDetail()
  }, [trip])

  const GetGooglePlaceDetail = async () => {
    const result = await axios.post("/api/google-place-detail", {
      placeName: trip?.tripDetail?.destination,
    })
    if (result?.data.error) {
      console.log(result?.data.error)
      return
    }
    setPhotoUrl(result?.data)
  }

  return (
    <Link href={`/view-trip/${trip?.tripId}`} passHref>
      <div className="p-3 rounded-3xl border hover:scale-105 transition cursor-pointer shadow-lg">
        <img
          src={photoUrl ? photoUrl : "#"}
          alt={trip.tripId}
          height={400}
          width={400}
          className="rounded-2xl border-2 shadow-2xl w-full h-[250px]"
        />
        <h2 className="flex gap-2 font-semibold text-xl">
          {trip?.tripDetail?.origin}
          <ArrowBigRight />
          {trip?.tripDetail?.destination}
        </h2>
        <h2 className="mt-2 text-gray-500">
          {trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} budget
        </h2>
      </div>
    </Link>
  )
}

export default MyTripCardItem
