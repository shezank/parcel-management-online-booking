import React from 'react';

const WebFeatures = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 my-10 gap-10'>
            <div className="card bg-base-100 shadow-xl">
                <figure><img src="https://www.fleetroot.com/wp-content/uploads/2020/06/Guide_To_Delivery_Management_System-2-1.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="text-center text-2xl font-medium">Delivery Syestem</h2>
                    <p>Our Delivery Syestem and Web App 100% Sequre. You Can Booking 24/7</p>
                </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
                <figure><img src="https://images.unsplash.com/photo-1599202889720-cd3c0833efa1?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Apps Image" /></figure>
                <div className="card-body">
                    <h2 className="text-center text-2xl font-medium">Useing Our Apps</h2>
                    <p>You Can Using Our Apps and you can order online booking in your product and see your booking status</p>
                </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
                <figure><img src="https://images.unsplash.com/photo-1545591841-4a97f1da8d1f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Apps Image" /></figure>
                <div className="card-body">
                    <h2 className="text-center text-2xl font-medium">Parcel Sefty</h2>
                    <p> 100% Parcel Sefty Guarantee Our Company. So No Tention </p>
                </div>
            </div>

        </div>
    );
};

export default WebFeatures;