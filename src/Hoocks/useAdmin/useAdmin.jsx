
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Sharde/AuthProvider/AuthProvider';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';


const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const axisoSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isLoadingAdmin } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            if (user) {
                const res = await axisoSecure.get(`/users/admin/${user?.email}`);
                return res.data?.admin;
            }
        }

    })
    return [isAdmin, isLoadingAdmin];

};

export default useAdmin;