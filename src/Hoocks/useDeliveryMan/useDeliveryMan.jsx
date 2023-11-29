import React, { useContext, useState } from 'react';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';
import { AuthContext } from '../../Sharde/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useDeliveryMan = () => {
    const { user, loading } = useContext(AuthContext);
    const axisoSecure = useAxiosSecure();
    const { data: isDeliveryMan, isPending: isLoadingDeliveryMan } = useQuery({
        queryKey: [user?.email, 'isDeliveryMan'],
        enabled: !loading,
        queryFn: async () => {
            if (user) {
                const res = await axisoSecure.get(`/users/deliveryman/${user?.email}`);
                console.log(res.data.deliveryMan)
                return res.data?.deliveryMan;
            }
        }

    })
    return [isDeliveryMan, isLoadingDeliveryMan];

};

export default useDeliveryMan;