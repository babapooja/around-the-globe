import React from 'react'
import { BsChevronDown } from 'react-icons/bs';
import { MdOutlineClear } from 'react-icons/md';
import { useState } from 'react';
import { useEffect } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { reset, setRegion } from '../features/countries/CountriesSlice';


const Filter = () => {
    const [selectedRegion, setSelectedRegion] = useState('');
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const dispatch = useDispatch();
    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
    const handleDropdown = (setToWhat = null) => {
        if (setToWhat == null) {
            setDisplayDropdown(!displayDropdown);
        } else {
            setDisplayDropdown(setToWhat);
        }
    }

    useEffect(() => {
        if (selectedRegion !== '') {
            dispatch(setRegion(selectedRegion.toLowerCase()));
        }

        return () => dispatch(reset());
    }, [dispatch, selectedRegion]);

    return (
        <section className="w-96 ">
            <div className={`filter dark:bg-gray-600
            flex px-3 py-4 bg-white items-center  justify-between h-14
            rounded-md border-2 dark:border-0 dark:text-white cursor-pointer relative w-96 
            ${displayDropdown ? 'rounded-b-none' : ''}`} >
                <input
                    type="text"
                    readOnly
                    placeholder="Filter by Region"
                    value={selectedRegion}
                    className="dark:bg-gray-600 text-xl border-0 focus:border:0 
                    focus:outline-none cursor-pointer"
                    onClick={handleDropdown}
                />
                <div className='flex'>
                    {selectedRegion ? <MdOutlineClear size={20} onClick={() => {
                        dispatch(setRegion(''));
                        setSelectedRegion('');
                        handleDropdown(false)
                    }} /> : null}
                    <BsChevronDown size={20} onClick={() => handleDropdown(false)} />
                </div>
            </div>

            {displayDropdown ? (
                <div className='rounded-b-xl shadow-md absolute w-96'>
                    {regions.map((item, index) => {
                        return <div onClick={() => {
                            setSelectedRegion(item);
                            handleDropdown();
                        }} className={`cursor-pointer text-xl bg-white dark:bg-gray-600 
                        dark:text-white px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700
                        ${regions.length - 1 === index ? 'rounded-b-xl' : ''}`} key={index}>
                            {item}
                        </div>
                    })}
                </div>
            ) : null}
        </section>
    )
}

export default Filter