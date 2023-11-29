import React, { useEffect, useState } from 'react';
import { FaRunning, FaUserCircle } from 'react-icons/fa';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../../../Hoocks/useAxiosSecure/useAxiosSecure';
import useAdmin from '../../../Hoocks/useAdmin/useAdmin';



const AllUsers = () => {
    const [refetch] = useAdmin()
    const axiosSequre = useAxiosSecure();
    const handleRoleManage = user => {
        axiosSequre.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data.modifiedCount);
                if (res.data) {
                    // refetch()
                    toast.success(`${user.name} Make A Admin Now`);
                }
            })
    }

    const handleRoleDeliveryMan = user => {
        axiosSequre.patch(`/users/deliveryman/${user._id}`)
            .then(res => {
                console.log(res.data.modifiedCount);
                if (res.data.modifiedCount) {
                    toast.success(`${user.name} Make A Delivery Man Now`);
                    refetch()
                }
            })
    }
    const [users, setUsers] = useState([]);
    console.log(users)
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [count, setCount] = useState(0)
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    useEffect(() => {
        fetch('http://localhost:5000/usersCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/users/count?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [currentPage, itemsPerPage]);


    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }


    return (
        <div className='m-20'>

            <div className='my-10'>
                <h1 className='text-center text-4xl font-bold'>Total User: {users.length}</h1>
            </div>



            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-orange-400'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone No</th>
                            <th>Total Booking</th>
                            <th>Role Deliivery Man</th>
                            <th>Role Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, idx) =>
                                <tr key={user._id} className="bg-base-200">
                                    <th>{idx + 1}</th>
                                    <td>{user.name}</td>
                                    <th>{user.phone}</th>
                                    <th>Total Bookings</th>
                                    <td>
                                        {user.role === 'Delivery Man' ? 'Delivery Man' :
                                            <button onClick={() => handleRoleDeliveryMan(user)} className="btn btn-ghost btn-xs hover:bg-orange-500 bg-orange-400 text-white mr-2"><FaRunning></FaRunning></button>
                                        }
                                    </td>
                                    <td>
                                        {user.role === 'admin' ? 'admin' :
                                            <button onClick={() => handleRoleManage(user)} className="btn btn-ghost btn-xs hover:bg-orange-500 bg-orange-400 text-white mr-2"><FaUserCircle></FaUserCircle></button>
                                        }
                                    </td>
                                    
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className="p-4 flex  items-center justify-center flex-wrap fixed bottom-0">
                <nav aria-label="Page navigation">
                    <ul className="inline-flex">
                        <li><button onClick={handlePrevPage} className="px-4 py-2 text-orange-600 transition-colors duration-150 bg-white border border-r-0 border-orange-600 rounded-l-lg focus:shadow-outline hover:bg-green-100">Prev</button></li>
                        {
                            pages.map(page =>
                                <button onClick={() => setCurrentPage(page)} className={currentPage === page ? "px-4 py-2 text-white font-bold transition-colors duration-150 bg-orange-600 border border-orange-600 focus:shadow-outline" : "px-4 py-2 text-orange-600 transition-colors duration-150 bg-white border border-orange-600 focus:shadow-outline hover:bg-green-100"}>{page}</button>
                            )
                        }
                        <li><button onClick={handleNextPage} className="px-4 py-2 text-orange-600 transition-colors duration-150 bg-white border border-orange-600 rounded-r-lg focus:shadow-outline hover:bg-green-100">Next</button></li>
                    </ul>
                </nav>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AllUsers;