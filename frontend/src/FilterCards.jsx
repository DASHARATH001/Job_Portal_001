import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../src/components/ui/radio-group' // Ensure these are imported
import { Label } from '../src/components/ui/utils/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from './components/ui/redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Ahmedabad "]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer" , " MERN STACK" , "UI-UX Designer"]
  },
  {
    filterType: "Salary",
    array: ["0-1 lakh", "1-5 lakh", "5 lakh to 30 lakh"]
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value)
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))

  }, [selectedValue])
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler} >
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h1 className='font-bold text-md'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div key={idx} className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId} >{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard