import React from 'react'
import { GoSearch } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../features/countries/CountriesSlice';

const Search = () => {

    const dispatch = useDispatch();
    const { searchTerm } = useSelector((state) => state.countries);
    const handleInputValueChange = (e) => {
        dispatch(setSearchTerm(e.target.value.toLowerCase()));
    }


    return (
        <>
            <div className='px-3 py-4 flex bg-white 
        rounded-md border-2 justify-between items-center h-14 dark:bg-gray-600 dark:border-0 dark:text-white f'>
                <GoSearch className='mr-3' size={20} />
                <input className="text-xl border-0 focus:border:0 
        focus:outline-none dark:bg-gray-600"
                    type="text"
                    value={searchTerm}
                    onChange={handleInputValueChange}
                    placeholder="Search for a country" />
            </div>
        </>
    )
}

export default Search