import React from 'react';
import Spinner from 'react-spinkit';
import './Loader.scss';

const Loader = () => (
    <div className="spinner-loader">
        <Spinner name='ball-scale-multiple' fadeIn='none' color='#ff6f00' />
    </div>
);

export default Loader;