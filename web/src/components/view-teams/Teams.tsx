import React from 'react';
import { useTeamsQuery } from '../../generated/graphql';

const Teams: React.FC<{}> = () => {
    const { data } = useTeamsQuery();

    return (
        <div style={{background: '#8ec6c5'}}>
            {data?.teams?.map(t => 
                <div>
                    {t.name[0].toUpperCase()}
                </div>    
            )}
        </div>
    )
}

export default Teams;