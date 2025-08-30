"use client"
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

type Props={
    activity:any
}
const PlaceCardItem = ({activity}:any) => {

    const [photoUrl, setPhotoUrl]=useState<string>();
    
      useEffect(()=>{
        activity && GetGooglePlaceDetail();
      }, [activity])
      const GetGooglePlaceDetail=async()=>{
        const result=await axios.post('/api/google-place-detail',{
            placeName:activity?.place_name+":"+activity?.place_address
        });
        if(result?.data.error){
            console.log(result?.data.error);
            return;
        }
        setPhotoUrl(result?.data);
      }

  return (
    <div className="flex flex-col md:flex-row gap-4">
                  <img src={photoUrl?photoUrl:'#'} alt={activity?.place_name} className="w-full md:w-48 h-32 object-cover rounded-lg"/>
                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-lg">{activity?.place_name}</h2>
                    <p className="text-gray-500">{activity?.place_address}</p>
                    <p className="text-gray-400 line-clamp-2">{activity?.place_details}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-2">
                      <p className="flex gap-1 text-blue-400"><Ticket/> {activity?.ticket_pricing}</p>
                      <p className="flex gap-1 text-orange-500"><Clock/>{activity?.time_travel_each_location}</p>
                      <p className="text-orange-500 flex gap-1"><span className="font-semibold text-orange-500">Best Time:</span> {activity?.best_time_to_visit}</p>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity?.place_name)}`} target="_blank" rel="noopener noreferrer">
                        <button className="w-full mt-4 flex items-center bg-green-100 text-green-500 font-semibold py-2 rounded-lg hover:bg-green-200 transition">View <ExternalLink /> </button>
                      </a>
                    </div>
                  </div>
                </div>
  )
}

export default PlaceCardItem
