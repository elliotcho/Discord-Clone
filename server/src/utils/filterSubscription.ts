import { Member } from '../entities/Member';
import { SubscriptionPayload } from '../types'; 

export const filterSubscription = async (
    { context, payload } : { context: any, payload: SubscriptionPayload }
) => {
    const { req } = context.connection.context;
    const { uid } = req.session;

    context.req = req;

    if(!payload.isDm) {
        let filter = false;

        const members = await Member.find({ where: { 
            teamId: payload.teamId
        }});
    
        for(let i=0;i<members.length;i++) {
            if(members[i].userId === uid) {
                filter = payload.senderId !== uid;
                break;
            }
        }
    
        return filter;
    }

    return payload.receiverId === uid;
}