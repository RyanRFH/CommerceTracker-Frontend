import React, { useEffect, useState } from 'react';
import ProfileDetails from '../../components/Profile/ProfileDetails';
import { getUser } from '../../services/AccountServices';

const Profile = () => {

    const [userDetails, setUserDetails] = useState(Object);

    const getUserDetails = async () => {
        const user = await getUser();
        if (user.error) {
            return;
        }
        if (user) {
            setUserDetails(user);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div>
            <ProfileDetails userDetails={userDetails} />
        </div>
    );
};

export default Profile;