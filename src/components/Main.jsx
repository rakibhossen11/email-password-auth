import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Main = () => {
    return (
        <div className='w-100 mx-auto'>
            <Header />
            <Outlet />
        </div>
    );
};

export default Main;