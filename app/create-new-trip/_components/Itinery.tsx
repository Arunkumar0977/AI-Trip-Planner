// "use client";
// import React, { useEffect, useState } from "react";
// import { Timeline } from "@/components/ui/timeline";
// import { Clock, ExternalLink, Star, Ticket, Timer, Wallet } from "lucide-react";
// import HotelCardItem from "./HotelCardItem";
// import PlaceCardItem from "./PlaceCardItem";
// import { useTripDetail } from "@/app/_components/provider";
// import { TripContextType } from "@/context/TripDetailContext";
// import { TripInfo } from "@/app/create-new-trip/_components/ChatBox";


// function Itinery() {
// //@ts-ignore
//       const [tripDetailInfo, setTripDetailInfo] = useState<any>();
//       const [tripData, setTripData] = useState<TripInfo | null>(null);

//       useEffect(() => {
//         tripDetailInfo && setTripData(tripDetailInfo)
//       }, [tripDetailInfo])

//   const data = tripData?[
//     {
//       title: "Recommended Hotels",
//       content: (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//          {tripData?.hotels.map((hotel, index) => (
//            <HotelCardItem key={index} hotel={hotel}/>
//           ))}

//         </div>
//       ),
//     },
//     ...tripData?.itinerary.map((dayData) => ({
//       title: `Day ${dayData?.day}`,
//       content: (
//         <div className="flex flex-col gap-4">
//           {dayData.activities.map((activity, index) => (
//             <PlaceCardItem key={index} activity={activity} />
//           ))}
//         </div>
//       ),
//     })),

//   ]:[];
//   return (
//     <div className="relative w-full overflow-auto h-[85vh]">
//       {tripData && <Timeline data={data} tripData={tripData} />}
//     </div>
//   );
  
// }

// export default Itinery;



"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import HotelCardItem from "./HotelCardItem";
import PlaceCardItem from "./PlaceCardItem";
import { useTripDetail } from "@/app/_components/provider";
import { TripContextType } from "@/context/TripDetailContext";
import { TripInfo } from "@/app/create-new-trip/_components/ChatBox";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

function Itinery() {
  const { tripDetailInfo } = useTripDetail() as TripContextType;
  const tripData: TripInfo | null = tripDetailInfo;

  const data = tripData ? [
    {
      title: "Recommended Hotels",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {tripData.hotels.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} />
          ))}
        </div>
      ),
    },
    ...(tripData?.itinerary ?? []).map((dayData: { day: number; activities?: any[] }) => ({
  title: `Day ${dayData.day}`,
  content: (
    <div className="flex flex-col gap-4">
      {(dayData.activities ?? []).map((activity, index) => (
        <PlaceCardItem key={index} activity={activity} />
      ))}
    </div>
  ),
})),

  ] : [];

  return (
    <div className="relative w-full overflow-auto h-[85vh]">
      {tripData ? <Timeline data={data} tripData={tripData} />
      :
      <div>
        <h2 className="flex gap-2 text-3xl items-center left-10 absolute bottom-10 font-bold text-white"><ArrowLeft/>Getting to know you to build perfect trip here...</h2>
      <Image src="/trip.jpg" alt="Image" width={'800'} height={'800'} className="w-full h-full object-cover rounded-3xl" />
      
      </div>
      }
      
    </div>
  );
}

export default Itinery;
