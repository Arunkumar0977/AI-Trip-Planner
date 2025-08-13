'use client';
import React, { useState } from 'react';
import { Plus, Minus, CalendarDays, CheckCircle } from 'lucide-react';

interface Props {
  onSelectedOption: (value: string) => void;
}

const DaysSelector: React.FC<Props> = ({ onSelectedOption }) => {
  const [days, setDays] = useState<number>(1);

  const increaseDays = () => setDays(prev => prev + 1);
  const decreaseDays = () => setDays(prev => (prev > 1 ? prev - 1 : 1));

  const handleConfirm = () => {
    const message = `Trip Duration: ${days} ${days === 1 ? 'day' : 'days'}`;
    onSelectedOption(message);
  };

  return (
    <div className='p-4 border rounded-2xl hover:border-primary bg-blue-50 flex flex-col items-center mt-4 w-full max-w-sm'>
      <CalendarDays size={28} className="mb-1" />
      <h2 className='text-lg font-semibold'>Select Trip Duration</h2>

      <div className='flex items-center gap-4 mt-3'>
        <button
          className='bg-white border rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100'
          onClick={decreaseDays}
        >
          <Minus size={18} />
        </button>

        <span className='text-lg font-medium'>{days} {days === 1 ? 'Day' : 'Days'}</span>

        <button
          className='bg-white border rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100'
          onClick={increaseDays}
        >
          <Plus size={18} />
        </button>
      </div>

      <button
        className='mt-4 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90'
        onClick={handleConfirm}
      >
        <CheckCircle size={18} /> Confirm
      </button>
    </div>
  );
};

export default DaysSelector;
