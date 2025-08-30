"use client"
import React, { use, useState } from 'react'
import { Hotel } from './ChatBox'
import { Star, Wallet } from 'lucide-react'
import axios from 'axios'
import { useEffect } from 'react'


type Props={
    hotel:Hotel
}
const HotelCardItem = ({hotel}:Props) => {

  const [photoUrl, setPhotoUrl]=useState<string>();

  useEffect(()=>{
    hotel && GetGooglePlaceDetail();
  }, [hotel])
  const GetGooglePlaceDetail=async()=>{
    const result=await axios.post('/api/google-place-detail',{
        placeName:hotel?.hotel_name
    });
    if(result?.data.error){
        console.log(result?.data.error);
        return;
    }
    setPhotoUrl(result?.data);
  }
  return (
       <div className="flex flex-col gap-1">
              <img src={photoUrl?photoUrl:'#'} alt={hotel?.hotel_name} className="w-32 h-24 object-cover rounded-lg"/>
              <h2 className="font-semibold text-lg">{hotel?.hotel_name}</h2>
              <h2 className="text-gray-500">{hotel?.hotel_address}</h2>
              <div className="flex justify-between items-center">
                <p className="flex gap-2 text-green-500"><Wallet /> {hotel?.price_per_night}</p>
                <p className="text-yellow-500 flex gap-2"><Star /> {hotel?.rating}</p>
              </div>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotel_name)}`} target="_blank" rel="noopener noreferrer">
              <button variant={'outline'} className="mt-1 w-full bg-green-100">View</button></a>
              <p className="line-clamp-2 text-gray-400">{hotel?.description}</p>
            </div>
    
  )
}

export default HotelCardItem
