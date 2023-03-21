import React from 'react'
import Country from '../components/Country'
import Filter from '../components/Filter'
import Search from '../components/Search'

const Home = () => {
    return (
        <div className='px-24 py-16 dark:bg-gray-800 mt-20'>
            <div className='flex flex-col justify-center items-center md:flex-row md:justify-between'>
                <Search />
                <div className='mt-4 md:hidden'/>
                <Filter />
            </div>
            <Country />
        </div>
    )
}

export default Home