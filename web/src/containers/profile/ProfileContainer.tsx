import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';

const ProfileContainer: React.FC<{}> = () => {
    const { data } = useMeQuery();

    let username = data?.me?.username || 'Loading...';

    return (
        <div>
       <h2> Whagwan, {username} </h2>
       <form>
            <label htmlFor="myFile">Update Profile Picture:</label>
            <input type="file" id="myFile" name="myFile"></input>
       </form>
        
        </div>
    )
}

export default ProfileContainer;