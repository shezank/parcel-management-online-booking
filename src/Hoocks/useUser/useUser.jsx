import React, { useContext } from 'react';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';
import { AuthContext } from '../../Sharde/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
    const { user, loading } = useContext(AuthContext);
    const axisoSecure = useAxiosSecure();
    const { data: isUser, isPending: isLoadingUser } = useQuery({
        queryKey: [user?.email, 'isUser'],
        enabled: !loading,
        queryFn: async () => {
            if (user) {
                const res = await axisoSecure.get(`/users/check/${user?.email}`);
                console.log(res.data)
                return res.data?.userOnly;
            }
        }

    })
    return [isUser, isLoadingUser];
};

export default useUser;