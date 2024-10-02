import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Lagos", "Oyo", "Abuja", "Rivers", "Imo"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["below 100,000 NGN", "100,000-200,000", "201,000-500,000",'500,000']
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    // If the selected value is already the clicked value, reset the selection (uncheck)
    if (selectedValue === value) {
      setSelectedValue('');
    } else {
      setSelectedValue(value);
    }
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div className='flex items-center space-x-2 my-2' key={itemId}>
                      <RadioGroupItem value={item} id={itemId} checked={selectedValue === item} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  );
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
