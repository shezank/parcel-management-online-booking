import React from 'react';
import Bannar from '../Bannar/Bannar';
import WebFeatures from '../WebFeatures/WebFeatures';
import Statistics from '../Statistics/Statistics';
import TopDeliveryMan from '../TopDeliveryMan/TopDeliveryMan';

const Home = () => {
    return (
        <div>
            <Bannar/>
            <WebFeatures></WebFeatures>
            <Statistics></Statistics>
            <TopDeliveryMan></TopDeliveryMan>
        </div>
    );
};

export default Home;