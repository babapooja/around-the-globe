import React from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../features/countries/CountriesSlice';

const Header = () => {
    const dispatch = useDispatch()
    const { theme } = useSelector((state) => state.countries)
    useEffect(() => {
        const root = window.document.documentElement;
        let colorTheme = theme === 'light' ? 'dark' : 'light';
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    return (
        <>
            <div className='fixed top-0 w-full py-7 px-24 shadow-md flex justify-between items-center bg-white 
            dark:text-white dark:shadow-slate-400 dark:shadow-lg dark:bg-slate-800 h-20 z-50'>
                <h2 className='font-bold text-3xl'>Around The Globe</h2>
                <>
                    <div className='flex justify-center items-center cursor-pointer' 
                    onClick={() => dispatch(theme === 'light' ? setTheme('dark') : setTheme('light'))}>
                        {
                            theme === 'light'
                                ? <MdLightMode size={30} />
                                : <MdDarkMode size={30} />
                        }
                        <p className='text-xl ml-2 capitalize' >{theme} Mode</p>
                    </div>
                </>
            </div>
            <Outlet />
        </>
    )
}

export default Header