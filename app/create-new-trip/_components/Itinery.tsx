import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Clock, ExternalLink, Star, Ticket, Timer, Wallet } from "lucide-react";
import HotelCardItem from "./HotelCardItem";
import PlaceCardItem from "./PlaceCardItem";

const TRIP_DATA={

    "destination": "Goa",
    "duration": "2 days",
    "origin": "Kanpur",
    "budget": "Moderate",
    "group_size": "Couple",
    "hotels": [
      {
        "hotel_name": "Lemon Tree Amarante Beach Resort",
        "hotel_address": "Utorda Beach, Salcete, Goa 403714",
        "price_per_night": "₹7,500",
        "hotel_image_url": "https://uat.lemontreehotels.com/uploads/hotelgallery/17_Nov_2023_11_20_12Main%20Gate%20Entry.jpg",
        "geo_coordinates": {
          "latitude": 15.3081,
          "longitude": 73.9085
        },
        "rating": 4.5,
        "description": "Beachfront resort with lush gardens, pool, and romantic dining options."
      },
      {
        "hotel_name": "Riva Beach Resort",
        "hotel_address": "Beach Road, Candolim, Goa 403515",
        "price_per_night": "₹6,800",
        "hotel_image_url": "https://rivaresorts.com/images/riva-sliders/gallery-page-banner.jpg",
        "geo_coordinates": {
          "latitude": 15.5256,
          "longitude": 73.7577
        },
        "rating": 4.2,
        "description": "Modern property with sea-view rooms, private beach access, and tropical pool."
      },
      {
        "hotel_name": "Acron Waterfront Resort",
        "hotel_address": "Near Miramar Beach, Panjim, Goa 403002",
        "price_per_night": "₹7,200",
        "hotel_image_url": "data:image/jpeg;base64,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",
        "geo_coordinates": {
          "latitude": 15.488,
          "longitude": 73.8025
        },
        "rating": 4.3,
        "description": "Serene Mandovi riverside property with balconies overlooking waterways."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "day_plan": "North Goa Leisure & Romance",
        "best_time_to_visit_day": "November-February (Cool weather)",
        "activities": [
          {
            "place_name": "Candolim Beach",
            "place_details": "Start the day with a romantic sunrise walk at Candolim Beach.",
            "place_image_url": "data:image/jpeg;base64,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",
            "geo_coordinates": {
              "latitude": 15.5130,
              "longitude": 73.7695
            },
            "place_address": "Candolim, North Goa, Goa 403515",
            "ticket_pricing": "Free",
            "time_travel_each_location": "15 mins from hotel",
            "best_time_to_visit": "Early morning for sunrise"
          },
          {
            "place_name": "Fort Aguada",
            "place_details": "Explore the iconic 17th-century Portuguese fort overlooking the Arabian Sea.",
            "place_image_url": "https://example.com/fort-aguada.jpg",
            "geo_coordinates": {
              "latitude": 15.4920,
              "longitude": 73.7735
            },
            "place_address": "Aguada Fort Area, Candolim, Goa 403515",
            "ticket_pricing": "₹50 per person",
            "time_travel_each_location": "20 mins from Candolim Beach",
            "best_time_to_visit": "Morning to avoid heat"
          },
          {
            "place_name": "Mandovi River Cruise",
            "place_details": "Enjoy a sunset cruise with live Goan music and dance performances.",
            "place_image_url": "https://example.com/mandovi-cruise.jpg",
            "geo_coordinates": {
              "latitude": 15.5007,
              "longitude": 73.8278
            },
            "place_address": "Mandovi River, Panjim, Goa 403001",
            "ticket_pricing": "₹500–₹700 per person",
            "time_travel_each_location": "40 mins from Fort Aguada",
            "best_time_to_visit": "Evening (sunset time)"
          }
        ]
      },
      {
        "day": 2,
        "day_plan": "Cultural Exploration & Relaxation",
        "best_time_to_visit_day": "Early morning starts recommended",
        "activities": [
          {
            "place_name": "Sahakari Spice Plantation",
            "place_details": "Experience Goa’s natural beauty with a guided tour through spice gardens.",
            "place_image_url": "https://example.com/spice-plantation.jpg",
            "geo_coordinates": {
              "latitude": 15.4030,
              "longitude": 74.0155
            },
            "place_address": "Curti, Ponda, Goa 403401",
            "ticket_pricing": "₹400 per person (includes lunch)",
            "time_travel_each_location": "1 hr from Panjim",
            "best_time_to_visit": "Morning to afternoon"
          },
          {
            "place_name": "Basilica of Bom Jesus",
            "place_details": "UNESCO World Heritage church housing the remains of St. Francis Xavier.",
            "place_image_url": "https://example.com/bom-jesus.jpg",
            "geo_coordinates": {
              "latitude": 15.4989,
              "longitude": 73.9107
            },
            "place_address": "Old Goa Road, Bainguinim, Goa 403402",
            "ticket_pricing": "Free",
            "time_travel_each_location": "30 mins from Spice Plantation",
            "best_time_to_visit": "Late morning"
          },
          {
            "place_name": "Miramar Beach",
            "place_details": "Relax at a serene riverside beach before departure.",
            "place_image_url": "https://example.com/miramar.jpg",
            "geo_coordinates": {
              "latitude": 15.4829,
              "longitude": 73.8057
            },
            "place_address": "Panjim, North Goa, Goa 403001",
            "ticket_pricing": "Free",
            "time_travel_each_location": "20 mins from Old Goa",
            "best_time_to_visit": "Evening for sunset"
          }
        ]
      }
    ]
  }






function Itinery() {

      // const [tripDetailInfo, setTripDetailInfo] = useState<any>();

  const data = [
    {
      title: "Recommended Hotels",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
         {TRIP_DATA.hotels.map((hotel, index) => (
           <HotelCardItem hotel={hotel}/>
          ))}

        </div>
      ),
    },
    ...TRIP_DATA.itinerary.map((dayData) => ({
      title: `Day ${dayData.day}: ${dayData.day_plan}`,
      content: (
        <div className="flex flex-col gap-4">
          {dayData.activities.map((activity, index) => (
            <PlaceCardItem activity={activity} />
          ))}
        </div>
      ),
    })),

  ];
  return (
    <div className="relative w-full overflow-auto h-[85vh]">
      <Timeline data={data} tripData={TRIP_DATA} />
    </div>
  );
  
}

export default Itinery;
