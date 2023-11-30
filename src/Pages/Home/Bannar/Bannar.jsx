import React from 'react';

const Bannar = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content w-full">

                <div className="w-full">
                    <div className='my-10'>
                        <h1 className='md:text-7xl text-3xl font-bold'><span className='text-blue-500'>Trust</span> <span className='text-red-500'>Line</span></h1>
                        <p className='text-center text-3xl md:text-5xl font-semibold'>Now You Can Booking Your Parcel Onlice</p>
                    </div>
                    <form>
                        <div className='flex max-w-3xl mx-auto'>
                            <input type="text" placeholder="Search Here" className="input input-bordered w-full" />
                            <input className="btn btn-primary -ml-16" type="button" value="Search" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Bannar;