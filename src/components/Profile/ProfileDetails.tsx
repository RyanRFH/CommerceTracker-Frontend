import React from 'react';

const ProfileDetails = (props: any) => {
    console.log(props?.userDetails);
    return (
        <div className='h-[300px]'>
            <div className='flex items-center justify-center flex-col h-full'>
                <p>Username: {props.userDetails?.userName}</p>
                <p>Email: {props.userDetails?.email}</p>
                <p>Role: {props.userDetails?.role}</p>
                <p>User ID: {props.userDetails?.id}</p>
            </div>

        </div>
    );
};

export default ProfileDetails;