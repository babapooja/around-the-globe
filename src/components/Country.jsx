import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CgSearchLoading } from 'react-icons/cg';

// redux
import { useSelector, useDispatch } from 'react-redux'
import { showAllCountries, searchByRegion } from '../features/countries/CountriesAction'

const Country = () => {

  const { countriesData, loading, success, error, region, searchTerm } = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showAllCountries());
    if (region) {
      dispatch(searchByRegion(region));
    }

    if (error) {
      console.log(error)
    }
  }, [dispatch, error, success, region])

  const data = countriesData.filter((item) => item.name.common.toLowerCase().includes(searchTerm));


  return (
    // flex flex-wrap gap-3 
    <section className={`mt-16 grid grid-cols-1 gap-10 justify-between lg:grid-cols-4 md:grid-cols-2 
    ${loading || data?.length === 0 ? 'md:flex md:items-center md:justify-center sm:flex sm:items-center sm:justify-center lg:flex lg:items-center lg:justify-center' : ''}`}>
      {
        loading ? (<div className='flex justify-center mt-36 h-[calc(100vh-80px)] dark:text-white'>
          <h1 className='text-4xl flex '><CgSearchLoading className='mr-3' size={35} />Loading...</h1>
        </div>)
          :
          data?.length > 0 ? (data.map((item, index) => {
            // w-1/5 
            return (<Link
              className="bg-white shadow-lg dark:shadow-md shadow-gray-500 rounded-lg mb-10 cursor-pointer"

              key={index}
              to={`/${item.cioc}`}
            >
              <img src={item.flags.png}
                alt={item.flags.alt} className="w-full rounded-t-lg h-1/2 shadow-md" />
              <div className="country-content px-4 py-5 ">
                <h3 className='text-xl font-semibold underline'>{item.name.common}</h3>
                <p className=' text-lg'>
                  Population: <span className='font-medium'>{item.population.toLocaleString()}</span>
                </p>
                <p className=' text-lg'>
                  Region: <span className='font-medium'>{item.region}</span>
                </p>
                <p className='text-lg'>
                  Capital: <span className='font-medium'>{item.capital}</span>
                </p>
              </div>
            </Link>)
          })) : <h2 className='text-3xl font-semibold h-[calc(100vh-80px)]'>No countries found for search term: {searchTerm}</h2>
      }

    </section >
  )
}

export default Country