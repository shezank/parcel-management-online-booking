import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Shard/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';

const PaymentsHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSequre = useAxiosSecure()
    const { data: payments } = useQuery({
        queryKey: ['payments', user.emial],
        queryFn: async () => {
            const res = await axiosSequre.get(`/payments/${user.email}`);
            console.log(res.data)
            return res.data;
        }
    })


    return (
        <div className='m-10'>
            <h1 className='text-3xl font-bold'>Total Payments:{payments?.length} </h1>

            <div className='m-10'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                payments.map((payment, idx) => <tr key={payment._id} className="bg-base-200">
                                    <th>{idx +1}</th>
                                    <td>{payment.email}</td>
                                    <td>{payment.price}</td>
                                    <td>{payment.status}</td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentsHistory;