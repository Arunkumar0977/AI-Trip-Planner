"use client"
import { useUserDetail } from '@/app/_components/provider';
import { useParams } from 'next/navigation'
import React from 'react'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect } from 'react';
import { useState } from 'react';
import { Trip } from '@/app/my-trips/page';
import Itinery from '@/app/create-new-trip/_components/Itinery';
import { useTripDetail } from '@/app/_components/provider';

function ViewTrip() {
  const {tripid} = useParams();
  const {userDetail, setUserDetail} =useUserDetail();
  const convex=useConvex();
  const [tripData, setTripData] = useState<Trip>();

  const { tripDetailInfo, setTripDetailInfo } = useTripDetail() as TripContextType;


  useEffect(()=>{
        userDetail && GetTrip();
    }, [userDetail])


  const GetTrip = async()=>{
    const result = await convex.query(api.tripDetail.GetTripById, {
      uid: userDetail?._id,
      tripId: tripid+''
    });
    console.log(result);
    setTripData(result);
    setTripDetailInfo(result?.tripDetail);
  }
  return (
    <div>
      <Itinery/>
    </div>
  )
}

export default ViewTrip
