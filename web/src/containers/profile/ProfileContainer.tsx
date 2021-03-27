import { Formik } from 'formik';
import { isInputType } from 'graphql';
import React from 'react';
import { useMeQuery, useUpdateProfilePicMutation } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';


const ProfileContainer: React.FC<{}> = () => {
    const { data } = useMeQuery({
        skip: isServer()
    });

    let username = data?.me?.username || 'Loading...';

    return (
        <div>
       <h2> Whagwan, {username} </h2>
       <Formik
            <label htmlFor="myFile">Update Profile Picture:</label>
            <input type="file" id="myFile" name="myFile"></input>
       </Formik>
        
        </div>
    )
}

export default ProfileContainer;