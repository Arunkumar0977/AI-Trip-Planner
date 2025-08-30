// "use client"
// import React, { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { Loader, Send } from 'lucide-react'
// import axios from 'axios'
// import { useFormState } from 'react-dom'
// import EmptyBoxState from './EmptyBoxState'
// import { strict } from 'assert'
// import GroupSizeui from './GroupSizeui'
// import BudgetUi from './BudgetUi'
// import DaysSelector from './TripDurationUi'
// import FinalUi from './FinalUi'
// import { useMutation } from 'convex/react'
// import * as api from '@/convex/_generated/api'

// import { CreateTripDetail } from '@/convex/tripDetail'
// import { useUserDetail } from '@/app/_components/provider'
// import { v4 as uuidv4 } from 'uuid';


// type Message={
//   role: string,
//   content: string,
//   ui?:string,
// }

// export type TripInfo={
//   budget: string,
//   destination: string,
//   duration: string,
//   group_size: string,
//   hotels: any,
//   itinerary: any
// }

// const ChatBox = () => {


//   const [messages, setMessages] = useState<Message[]>([]);
//   const [userInput, setUserInput] = useState<string>();
//   const [loading, setLoading] = useState(false);
//   const [isFinal, setIsFinal]=useState(false);
//   const [tripDetail, setTripDetail] = useState<TripInfo>();

//   const SaveTripDetail=useMutation(api.tripDetail.CreateTripDetail);
//   const {userDetail, setUserDetail} = useUserDetail();



//   const onSend = async() => {
//     // handle send logic
//     if(!userInput?.trim()) return;

//     setLoading(true);
//     setUserInput('');
//     const newMsg:Message={
//       role:'user',
//       content:userInput??''
//     }

//     setMessages((prev:Message[])=>[...prev,newMsg]);

//     const result =await axios.post('/api/aimodel',{
//       messages:[...messages, newMsg],
//       isFinal: isFinal
//     });

//     console.log("TRIP", result.data);

//     !isFinal && setMessages((prev: Message[]) => [...prev, {
//       role:'assistant',
//       content: result?.data?.resp,
//       ui:result?.data?.ui
//     }]);

//     if (isFinal){
//       setTripDetail(result?.data?.trip_plan);
//       const tripId = uuidv4();
//       const result =await SaveTripDetail({
//         tripDetail: result?.data?.trip_plan,
//         tripId: tripId,
//         uid: userDetail?._id
//       });
//     }

//     console.log(result.data);
//     setLoading(false);
//   }

//   const RenderGenerativeUi=(ui:string)=>{
//     if(ui == 'budget'){
//       //budget ui component
//       return <BudgetUi onSelectedOption={(v:string)=>{setUserInput(v); onSend()}}/>
//     }
//     else if(ui == 'groupSize'){
//         //gropusize ui component
//         return <GroupSizeui onSelectedOption={(v:string)=>{setUserInput(v); onSend()}}/>
//     }
//     else if(ui == 'tripDuration'){
//       //tripDuration ui component
//   return <DaysSelector onSelectedOption={(v: string) => { setUserInput(v); onSend() }} />


//     }
//     else if(ui == 'final'){
//           // final ui components
//           return <FinalUi viewtrip={()=> console.log()}
//             disable={!tripDetail}
//           />
//     }
//       return null
//   }

//   useEffect(()=>{
//     const lastMsg=messages[messages.length-1];
//     if(lastMsg?.ui == 'final'){
//       setIsFinal(true);
//       setUserInput('ok, Great');
//       // onSend();

//     }
//   },[messages])

//   useEffect(()=>{
//     if(isFinal && userInput){
//       onSend();
//     }
//   }, [isFinal]);  

//   return (
//     <div className="h-[85vh] flex flex-col">
//       {/* Display message */}
//       {messages?.length == 0 &&
//           <EmptyBoxState 
//           onselectOption={(v:string)=>{setUserInput(v); onSend()}}/>
//         }
//       <section className="flex-1 overflow-y-auto p-4">
//         {messages.map((msg:Message, index)=>(
//           msg.role == 'user' ?
//           <div className='flex justify-end mt-2' key={index}>
//           <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-2xl'>
//             {msg.content}
//           </div>
//         </div>:
//         <div className='flex justify-start mt-2' key={index}>
//           <div className='max-w-lg bg-blue-100 text-black px-4 py-2 rounded-2xl'>
//             {msg.content}
//             {RenderGenerativeUi(msg.ui??'')}
//           </div>
//         </div>
//         ) )}
//         <div className='flex justify-start mt-2' >
//           {loading&& <div className='max-w-lg bg-blue-100 text-black px-4 py-2 rounded-2xl'>
//             <Loader className='animate-spin'/>
//           </div>}
//         </div>
        
//       </section>

//       {/* User Input */}
//       <section className="p-4 border-t">
//         <div className='border rounded-2xl p-4 relative'>
//           <Textarea
//             placeholder='Start your Journey with your AI Trip Planner....'
//             className='w-full h-20 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
//             onChange={(event)=>setUserInput(event.target.value)}
//             value={userInput}
//           />
//           <Button
//             size={'icon'}
//             className='absolute bottom-6 right-6 cursor-pointer'
//             onClick={onSend}
//           >
//             <Send className='h-4 w-4' />
//           </Button>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default ChatBox

"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Send } from "lucide-react";
import axios from "axios";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeui from "./GroupSizeui";
import BudgetUi from "./BudgetUi";
import DaysSelector from "./TripDurationUi";
import FinalUi from "./FinalUi";
import { useMutation } from "convex/react";
// import * as api from "@/convex/_generated/api";
import { api } from "@/convex/_generated/api";
import { useTripDetail, useUserDetail } from "@/app/_components/provider";
import { v4 as uuidv4 } from "uuid";
import { CreateTripDetail } from "@/convex/tripDetail";

type Message = {
  role: "user" | "assistant";
  content: string;
  ui?: string;
};

export type TripInfo = {
  budget: string;
  destination: string;
  duration: string;
  group_size: string;
  origin: string;
  hotels: Hotel[];
  itinerary: Itinerary;
};

export type Hotel={
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  description: string;
}
export type Itinerary={
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: any;
}


interface APIResponse {
  resp: string;
  ui?: string;
  trip_plan?: TripInfo;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>();
  const [tripDetailInfo, setTripDetailInfo] = useTripDetail();

  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);

  const { userDetail } = useUserDetail();

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const onSend = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    const newMsg: Message = {
      role: "user",
      content: userInput,
    };

    const newMessages = [...messages, newMsg];
    setMessages(newMessages);
    setUserInput("");

    try {
      const { data } = await axios.post<APIResponse>("/api/aimodel", {
        messages: newMessages,
        isFinal,
      });

      console.log("TRIP", data);

      if (!isFinal) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.resp, ui: data.ui },
        ]);
      } else {
        setTripDetail(data.trip_plan);
        setTripDetailInfo(data.trip_plan);
        const tripId = uuidv4();
        await SaveTripDetail({
          tripDetail: data.trip_plan,
          tripId,
          uid: userDetail?._id,
        });
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const RenderGenerativeUi = (ui: string) => {
    switch (ui) {
      case "budget":
        return (
          <BudgetUi
            onSelectedOption={(v: string) => {
              setUserInput(v);
              onSend();
            }}
          />
        );
      case "groupSize":
        return (
          <GroupSizeui
            onSelectedOption={(v: string) => {
              setUserInput(v);
              onSend();
            }}
          />
        );
      case "tripDuration":
        return (
          <DaysSelector
            onSelectedOption={(v: string) => {
              setUserInput(v);
              onSend();
            }}
          />
        );
      case "final":
        return (
          <FinalUi
            viewtrip={() => console.log()}
            disable={!tripDetail}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui === "final" && !isFinal) {
      setIsFinal(true);
      setUserInput("ok, Great");
    }
  }, [messages, isFinal]);

  useEffect(() => {
    if (isFinal && userInput === "ok, Great") {
      onSend();
    }
  }, [isFinal, userInput]);

  return (
    <div className="h-[85vh] flex flex-col">
      {/* Empty state */}
      {messages.length === 0 && (
        <EmptyBoxState
          onselectOption={(v: string) => {
            setUserInput(v);
            onSend();
          }}
        />
      )}

      {/* Messages */}
      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) =>
          msg.role === "user" ? (
            <div className="flex justify-end mt-2" key={index}>
              <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-2xl">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className="max-w-lg bg-blue-100 text-black px-4 py-2 rounded-2xl">
                {msg.content}
                {RenderGenerativeUi(msg.ui ?? "")}
              </div>
            </div>
          )
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-blue-100 text-black px-4 py-2 rounded-2xl">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </section>

      {/* Input Section */}
      <section className="p-4 border-t">
        <div className="border rounded-2xl p-4 relative">
          <Textarea
            placeholder="Start your Journey with your AI Trip Planner...."
            className="w-full h-20 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
          />
          <Button
            size="icon"
            className="absolute bottom-6 right-6 cursor-pointer"
            onClick={onSend}
            disabled={loading}
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
