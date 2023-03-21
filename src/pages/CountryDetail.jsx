import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchByCIOC } from '../features/countries/CountriesAction';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { BiLinkExternal } from 'react-icons/bi';
import { reset } from '../features/countries/CountriesSlice';

const CountryDetail = () => {
  const { countryData, error } = useSelector(state => state.countries);
  const dispatch = useDispatch();
  const { code } = useParams();

  useEffect(() => {
    if (code) {
      dispatch(searchByCIOC(code));
    }
    if (error) {
      console.log(error);
    }
    return () => {
      dispatch(reset())
    }
  }, [dispatch, error, code]);



  return (
    <>
      <div className='px-24 py-14 md:h-[calc(100vh-80px)] h-full mt-20 dark:bg-gray-800'>
        <div className='flex items-center justify-center md:justify-start'>
          <Link to="/" className='py-4 px-7 bg-white dark:bg-gray-600 shadow-md flex w-fit items-center justify-between
        hover:scale-105 transition-all ease-in-out border-gray-200 dark:border-0 dark:text-white rounded-md border-2'>
            <MdOutlineArrowBackIosNew size={15} /><span className='text-lg font-semibold'>Back</span>
          </Link>
        </div>
        {
          countryData.length > 0 ? (

            <div className='mt-10 flex flex-col w-full items-center lg:justify-around lg:flex-row dark:text-white'>
              {/* flag */}
              <div className=''>
                <img src={countryData[0].flags.png} alt={countryData[0].flags.alt}
                  className="w-full" />
                <h2 className='text-2xl font-semibold text-center mt-3 mb-5 lg:mb-0'>{countryData[0].name.common.toUpperCase()}</h2>
              </div>
              {/* details */}
              <div className=''>
                <p className='text-2xl font-semibold mb-3 text-center md:text-left'>Official name: <span className='font-normal'>{countryData[0].name.official}</span></p>
                <h3 className='italic text-2xl underline text-center md:text-left'>Region Details:</h3>
                <div className='grid md:grid-cols-2 grid-cols-1 text-center md:text-left'>
                  <p className='text-xl font-semibold'>Region: <span className='font-normal'>{countryData[0].region}</span></p>
                  <p className='text-xl font-semibold'>Sub Region: <span className='font-normal'>{countryData[0].subregion}</span></p>
                  <p className='text-xl font-semibold'>Area: <span className='font-normal'>{countryData[0].area.toLocaleString()} sq. ft</span></p>
                  <p className='text-xl font-semibold'>Capital: <span className='font-normal'>{countryData[0].capital} sq. ft</span></p>
                  <p className='flex text-xl font-semibold'>Google Maps: &nbsp;
                    <Link className='flex items-center text-blue-700 dark:text-blue-400  font-normal' target="_blank"
                      to={countryData[0].maps.googleMaps}>
                      See Map
                      <BiLinkExternal clasName="ml-4" size={20} />
                    </Link>
                  </p>
                </div>

                <h3 className='italic text-2xl underline mt-5 text-center md:text-left'>Demographic Details:</h3>
                <div className='grid md:grid-cols-2 grid-cols-1 text-center md:text-left'>
                  <p className='text-xl font-semibold'>Population: <span className='font-normal'>{countryData[0].population.toLocaleString()}</span></p>
                  <p className='text-xl font-semibold'>Languages: <span className='font-normal'>{Object.values(countryData[0].languages).join(', ')}</span></p>
                  <p className='text-xl font-semibold'>Currencies: <span className='font-normal'>{Object.keys(countryData[0].currencies).join(', ')}</span></p>
                </div>

                <p className='text-xl font-semibold mt-4'>Border Countries: &nbsp;
                  {countryData[0].borders && countryData[0].borders.map((item, index) => {
                    return <Link key={index} className="rounded-xl bg-white dark:bg-gray-600 shadow-md px-5 py-2 mr-2" to={`/${item}`}> {item}</Link>
                  })}</p>

              </div>

            </div>

          )
            : (<h2 className='text-4xl font-semibold text-center mt-36 dark:text-white'>Details unvailable for: {code}</h2>)
        }
      </div>
    </>
  )
}

export default CountryDetail;