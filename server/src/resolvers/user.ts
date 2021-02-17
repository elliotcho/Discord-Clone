import { 
    Arg,
    Mutation, 
    Resolver 
} from "type-graphql";

@Resolver()
export class UserResolver {
    @Mutation(() => Boolean)
    createDummyUser(
        @Arg('username') username: string
    ) : boolean {
        return username.length === 3;
    }
}