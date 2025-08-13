import React from 'react'


export const SelectBudgetOptions = [

{

id: 1,

title: 'Cheap',

desc: 'Stay conscious of costs',

icon:'💵',

color: 'bg-green-100 text-green-600'

},

{

id: 2,

title: 'Moderate', 
desc: 'Keep cost on the average side', color: 'bg-yellow-100 text-yellow-600',

icon:'💰',

},

{

id: 3,

title: 'Luxury',

desc: 'Do not worry about cost', 
icon:'💸', 
color: 'bg-purple-100 text-purple-600'

},
]


const BudgetUi = ({onSelectedOption}:any) => {
  return (
    <div>
       <div className='grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1'>
            {SelectBudgetOptions.map((item, index)=>(
              <div key={index} className='p-3 border rounded-2xl hover:border-primary bg-red-50 cursor-pointer'
              onClick={()=>onSelectedOption(item.title+":"+item.desc)}
              >
                  <h2>{item.icon}</h2>
                  <h2>{item.title}</h2>
              </div>
            ))}
          </div>
    </div>
  )
}

export default BudgetUi
