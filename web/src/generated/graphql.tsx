import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  user: User;
  searchResults: Array<User>;
  me: User;
  team: Team;
  teams: Array<Team>;
  messages: Array<Message>;
  directMessages: Array<DirectMessage>;
  channels: Array<Channel>;
  channel: Channel;
  onlineFriends: Array<User>;
  friendRequests: Array<User>;
  friends: Array<User>;
};


export type QueryUserArgs = {
  userId?: Maybe<Scalars['Int']>;
};


export type QuerySearchResultsArgs = {
  query: Scalars['String'];
};


export type QueryTeamArgs = {
  teamId: Scalars['Int'];
};


export type QueryMessagesArgs = {
  channelId: Scalars['Int'];
};


export type QueryDirectMessagesArgs = {
  receiverId: Scalars['Int'];
};


export type QueryChannelsArgs = {
  teamId: Scalars['Int'];
};


export type QueryChannelArgs = {
  channelId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  email: Scalars['String'];
  username: Scalars['String'];
  profilePic: Scalars['String'];
  activeStatus: Scalars['Float'];
  profileURL: Scalars['String'];
  friendStatus: Scalars['Float'];
  isMe: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Team = {
  __typename?: 'Team';
  id: Scalars['Float'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  channels: Array<Channel>;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['Float'];
  name: Scalars['String'];
  teamId: Scalars['Float'];
  lastMessage: Message;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Float'];
  text?: Maybe<Scalars['String']>;
  pic: Scalars['String'];
  senderId: Scalars['Float'];
  channelId: Scalars['Float'];
  isRead: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type DirectMessage = {
  __typename?: 'DirectMessage';
  id: Scalars['Float'];
  text?: Maybe<Scalars['String']>;
  pic: Scalars['String'];
  senderId: Scalars['Float'];
  receiverId: Scalars['Float'];
  user: User;
  isRead: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  removeProfilePic: Scalars['Boolean'];
  updateProfilePic: Scalars['Boolean'];
  login: UserResponse;
  register: UserResponse;
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  changeUsername: Scalars['Boolean'];
  setStatus: Scalars['Boolean'];
  createTeam: Scalars['Boolean'];
  addUserToTeam: Team;
  leaveTeam: Scalars['Boolean'];
  deleteTeam: Scalars['Boolean'];
  sendMessage: Scalars['Boolean'];
  deleteMessage: Scalars['Boolean'];
  sendFile: Scalars['Boolean'];
  editMessage: Scalars['Boolean'];
  editDirectMessage: Scalars['Boolean'];
  sendDirectMessage: Scalars['Boolean'];
  deleteDirectMessage: Scalars['Boolean'];
  sendDmFile: Scalars['Boolean'];
  createChannel: Scalars['Boolean'];
  deleteChannel: Scalars['Boolean'];
  updateRead: Scalars['Boolean'];
  invite: Invite;
  removeFriend: Scalars['Boolean'];
  acceptFriendRequest: Scalars['Boolean'];
  cancelFriendRequest: Scalars['Boolean'];
  declineFriendRequest: Scalars['Boolean'];
  sendFriendRequest: Scalars['Boolean'];
};


export type MutationUpdateProfilePicArgs = {
  file: Scalars['Upload'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangeUsernameArgs = {
  username: Scalars['String'];
};


export type MutationSetStatusArgs = {
  status: Scalars['Int'];
};


export type MutationCreateTeamArgs = {
  teamName: Scalars['String'];
};


export type MutationAddUserToTeamArgs = {
  teamId: Scalars['Int'];
};


export type MutationLeaveTeamArgs = {
  teamId: Scalars['Int'];
};


export type MutationDeleteTeamArgs = {
  teamId: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  channelId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['Int'];
};


export type MutationSendFileArgs = {
  channelId: Scalars['Int'];
  file: Scalars['Upload'];
};


export type MutationEditMessageArgs = {
  messageId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationEditDirectMessageArgs = {
  messageId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationSendDirectMessageArgs = {
  receiverId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationDeleteDirectMessageArgs = {
  messageId: Scalars['Int'];
};


export type MutationSendDmFileArgs = {
  receiverId: Scalars['Int'];
  file: Scalars['Upload'];
};


export type MutationCreateChannelArgs = {
  teamId: Scalars['Int'];
  channelName: Scalars['String'];
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['Int'];
};


export type MutationUpdateReadArgs = {
  channelId: Scalars['Int'];
};


export type MutationInviteArgs = {
  receiverId: Scalars['Int'];
  teamId: Scalars['Int'];
};


export type MutationRemoveFriendArgs = {
  friendId: Scalars['Int'];
};


export type MutationAcceptFriendRequestArgs = {
  senderId: Scalars['Int'];
};


export type MutationCancelFriendRequestArgs = {
  receiverId: Scalars['Int'];
};


export type MutationDeclineFriendRequestArgs = {
  senderId: Scalars['Int'];
};


export type MutationSendFriendRequestArgs = {
  receiverId: Scalars['Int'];
};


export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Invite = {
  __typename?: 'Invite';
  senderID: Scalars['Float'];
  receiverID: Scalars['Float'];
  teamID: Scalars['Float'];
  createdAt: Scalars['DateTime'];
};

export type RegularChannelFragment = (
  { __typename?: 'Channel' }
  & Pick<Channel, 'id' | 'name'>
);

export type RegularMessageFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'text' | 'createdAt' | 'isRead' | 'pic'>
  & { user: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type RegularTeamFragment = (
  { __typename?: 'Team' }
  & Pick<Team, 'id' | 'name'>
  & { channels: Array<(
    { __typename?: 'Channel' }
    & Pick<Channel, 'id'>
  )> }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'isMe' | 'email' | 'username' | 'friendStatus' | 'activeStatus' | 'profileURL' | 'createdAt' | 'updatedAt'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>> }
);

export type CreateChannelMutationVariables = Exact<{
  channelName: Scalars['String'];
  teamId: Scalars['Int'];
}>;


export type CreateChannelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createChannel'>
);

export type DeleteChannelMutationVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type DeleteChannelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteChannel'>
);

export type UpdateReadMutationVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type UpdateReadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateRead'>
);

export type DeleteDirectMessageMutationVariables = Exact<{
  messageId: Scalars['Int'];
}>;


export type DeleteDirectMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteDirectMessage'>
);

export type EditDirectMessageMutationVariables = Exact<{
  text: Scalars['String'];
  messageId: Scalars['Int'];
}>;


export type EditDirectMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editDirectMessage'>
);

export type SendDirectMessageMutationVariables = Exact<{
  text: Scalars['String'];
  receiverId: Scalars['Int'];
}>;


export type SendDirectMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendDirectMessage'>
);

export type SendDmFileMutationVariables = Exact<{
  file: Scalars['Upload'];
  receiverId: Scalars['Int'];
}>;


export type SendDmFileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendDmFile'>
);

export type AcceptFriendRequestMutationVariables = Exact<{
  senderId: Scalars['Int'];
}>;


export type AcceptFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptFriendRequest'>
);

export type CancelFriendRequestMutationVariables = Exact<{
  receiverId: Scalars['Int'];
}>;


export type CancelFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cancelFriendRequest'>
);

export type DeclineFriendRequestMutationVariables = Exact<{
  senderId: Scalars['Int'];
}>;


export type DeclineFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'declineFriendRequest'>
);

export type RemoveFriendMutationVariables = Exact<{
  friendId: Scalars['Int'];
}>;


export type RemoveFriendMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeFriend'>
);

export type SendFriendRequestMutationVariables = Exact<{
  receiverId: Scalars['Int'];
}>;


export type SendFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendFriendRequest'>
);

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['Int'];
}>;


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMessage'>
);

export type EditMessageMutationVariables = Exact<{
  text: Scalars['String'];
  messageId: Scalars['Int'];
}>;


export type EditMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editMessage'>
);

export type SendFileMutationVariables = Exact<{
  file: Scalars['Upload'];
  channelId: Scalars['Int'];
}>;


export type SendFileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendFile'>
);

export type SendMessageMutationVariables = Exact<{
  text: Scalars['String'];
  channelId: Scalars['Int'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendMessage'>
);

export type AddUserToTeamMutationVariables = Exact<{
  teamId: Scalars['Int'];
}>;


export type AddUserToTeamMutation = (
  { __typename?: 'Mutation' }
  & { addUserToTeam: (
    { __typename?: 'Team' }
    & RegularTeamFragment
  ) }
);

export type CreateTeamMutationVariables = Exact<{
  teamName: Scalars['String'];
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createTeam'>
);

export type DeleteTeamMutationVariables = Exact<{
  teamId: Scalars['Int'];
}>;


export type DeleteTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTeam'>
);

export type LeaveTeamMutationVariables = Exact<{
  teamId: Scalars['Int'];
}>;


export type LeaveTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveTeam'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ChangeUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type ChangeUsernameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeUsername'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type RemoveProfilePicMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveProfilePicMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeProfilePic'>
);

export type SetStatusMutationVariables = Exact<{
  status: Scalars['Int'];
}>;


export type SetStatusMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setStatus'>
);

export type UpdateProfilePicMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UpdateProfilePicMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateProfilePic'>
);

export type ChannelQueryVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type ChannelQuery = (
  { __typename?: 'Query' }
  & { channel: (
    { __typename?: 'Channel' }
    & RegularChannelFragment
  ) }
);

export type ChannelsQueryVariables = Exact<{
  teamId: Scalars['Int'];
}>;


export type ChannelsQuery = (
  { __typename?: 'Query' }
  & { channels: Array<(
    { __typename?: 'Channel' }
    & RegularChannelFragment
  )> }
);

export type DirectMessagesQueryVariables = Exact<{
  receiverId: Scalars['Int'];
}>;


export type DirectMessagesQuery = (
  { __typename?: 'Query' }
  & { directMessages: Array<(
    { __typename?: 'DirectMessage' }
    & Pick<DirectMessage, 'id' | 'text' | 'createdAt' | 'senderId' | 'isRead' | 'pic'>
    & { user: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
  )> }
);

export type FriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendRequestsQuery = (
  { __typename?: 'Query' }
  & { friendRequests: Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type FriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendsQuery = (
  { __typename?: 'Query' }
  & { friends: Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type OnlineFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type OnlineFriendsQuery = (
  { __typename?: 'Query' }
  & { onlineFriends: Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type MessagesQueryVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & RegularMessageFragment
  )> }
);

export type TeamQueryVariables = Exact<{
  teamId: Scalars['Int'];
}>;


export type TeamQuery = (
  { __typename?: 'Query' }
  & { team: (
    { __typename?: 'Team' }
    & RegularTeamFragment
  ) }
);

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
    { __typename?: 'Team' }
    & RegularTeamFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type SearchResultsQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchResultsQuery = (
  { __typename?: 'Query' }
  & { searchResults: Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type UserQueryVariables = Exact<{
  userId?: Maybe<Scalars['Int']>;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export const RegularChannelFragmentDoc = gql`
    fragment RegularChannel on Channel {
  id
  name
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  isMe
  email
  username
  friendStatus
  activeStatus
  profileURL
  createdAt
  updatedAt
}
    `;
export const RegularMessageFragmentDoc = gql`
    fragment RegularMessage on Message {
  id
  text
  createdAt
  isRead
  pic
  user {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const RegularTeamFragmentDoc = gql`
    fragment RegularTeam on Team {
  id
  name
  channels {
    id
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  user {
    ...RegularUser
  }
  errors {
    ...RegularError
  }
}
    ${RegularUserFragmentDoc}
${RegularErrorFragmentDoc}`;
export const CreateChannelDocument = gql`
    mutation CreateChannel($channelName: String!, $teamId: Int!) {
  createChannel(channelName: $channelName, teamId: $teamId)
}
    `;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      channelName: // value for 'channelName'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, baseOptions);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const DeleteChannelDocument = gql`
    mutation DeleteChannel($channelId: Int!) {
  deleteChannel(channelId: $channelId)
}
    `;
export type DeleteChannelMutationFn = Apollo.MutationFunction<DeleteChannelMutation, DeleteChannelMutationVariables>;

/**
 * __useDeleteChannelMutation__
 *
 * To run a mutation, you first call `useDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChannelMutation, { data, loading, error }] = useDeleteChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useDeleteChannelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChannelMutation, DeleteChannelMutationVariables>) {
        return Apollo.useMutation<DeleteChannelMutation, DeleteChannelMutationVariables>(DeleteChannelDocument, baseOptions);
      }
export type DeleteChannelMutationHookResult = ReturnType<typeof useDeleteChannelMutation>;
export type DeleteChannelMutationResult = Apollo.MutationResult<DeleteChannelMutation>;
export type DeleteChannelMutationOptions = Apollo.BaseMutationOptions<DeleteChannelMutation, DeleteChannelMutationVariables>;
export const UpdateReadDocument = gql`
    mutation UpdateRead($channelId: Int!) {
  updateRead(channelId: $channelId)
}
    `;
export type UpdateReadMutationFn = Apollo.MutationFunction<UpdateReadMutation, UpdateReadMutationVariables>;

/**
 * __useUpdateReadMutation__
 *
 * To run a mutation, you first call `useUpdateReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReadMutation, { data, loading, error }] = useUpdateReadMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useUpdateReadMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReadMutation, UpdateReadMutationVariables>) {
        return Apollo.useMutation<UpdateReadMutation, UpdateReadMutationVariables>(UpdateReadDocument, baseOptions);
      }
export type UpdateReadMutationHookResult = ReturnType<typeof useUpdateReadMutation>;
export type UpdateReadMutationResult = Apollo.MutationResult<UpdateReadMutation>;
export type UpdateReadMutationOptions = Apollo.BaseMutationOptions<UpdateReadMutation, UpdateReadMutationVariables>;
export const DeleteDirectMessageDocument = gql`
    mutation DeleteDirectMessage($messageId: Int!) {
  deleteDirectMessage(messageId: $messageId)
}
    `;
export type DeleteDirectMessageMutationFn = Apollo.MutationFunction<DeleteDirectMessageMutation, DeleteDirectMessageMutationVariables>;

/**
 * __useDeleteDirectMessageMutation__
 *
 * To run a mutation, you first call `useDeleteDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDirectMessageMutation, { data, loading, error }] = useDeleteDirectMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteDirectMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDirectMessageMutation, DeleteDirectMessageMutationVariables>) {
        return Apollo.useMutation<DeleteDirectMessageMutation, DeleteDirectMessageMutationVariables>(DeleteDirectMessageDocument, baseOptions);
      }
export type DeleteDirectMessageMutationHookResult = ReturnType<typeof useDeleteDirectMessageMutation>;
export type DeleteDirectMessageMutationResult = Apollo.MutationResult<DeleteDirectMessageMutation>;
export type DeleteDirectMessageMutationOptions = Apollo.BaseMutationOptions<DeleteDirectMessageMutation, DeleteDirectMessageMutationVariables>;
export const EditDirectMessageDocument = gql`
    mutation EditDirectMessage($text: String!, $messageId: Int!) {
  editDirectMessage(text: $text, messageId: $messageId)
}
    `;
export type EditDirectMessageMutationFn = Apollo.MutationFunction<EditDirectMessageMutation, EditDirectMessageMutationVariables>;

/**
 * __useEditDirectMessageMutation__
 *
 * To run a mutation, you first call `useEditDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editDirectMessageMutation, { data, loading, error }] = useEditDirectMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useEditDirectMessageMutation(baseOptions?: Apollo.MutationHookOptions<EditDirectMessageMutation, EditDirectMessageMutationVariables>) {
        return Apollo.useMutation<EditDirectMessageMutation, EditDirectMessageMutationVariables>(EditDirectMessageDocument, baseOptions);
      }
export type EditDirectMessageMutationHookResult = ReturnType<typeof useEditDirectMessageMutation>;
export type EditDirectMessageMutationResult = Apollo.MutationResult<EditDirectMessageMutation>;
export type EditDirectMessageMutationOptions = Apollo.BaseMutationOptions<EditDirectMessageMutation, EditDirectMessageMutationVariables>;
export const SendDirectMessageDocument = gql`
    mutation SendDirectMessage($text: String!, $receiverId: Int!) {
  sendDirectMessage(text: $text, receiverId: $receiverId)
}
    `;
export type SendDirectMessageMutationFn = Apollo.MutationFunction<SendDirectMessageMutation, SendDirectMessageMutationVariables>;

/**
 * __useSendDirectMessageMutation__
 *
 * To run a mutation, you first call `useSendDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendDirectMessageMutation, { data, loading, error }] = useSendDirectMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useSendDirectMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendDirectMessageMutation, SendDirectMessageMutationVariables>) {
        return Apollo.useMutation<SendDirectMessageMutation, SendDirectMessageMutationVariables>(SendDirectMessageDocument, baseOptions);
      }
export type SendDirectMessageMutationHookResult = ReturnType<typeof useSendDirectMessageMutation>;
export type SendDirectMessageMutationResult = Apollo.MutationResult<SendDirectMessageMutation>;
export type SendDirectMessageMutationOptions = Apollo.BaseMutationOptions<SendDirectMessageMutation, SendDirectMessageMutationVariables>;
export const SendDmFileDocument = gql`
    mutation SendDmFile($file: Upload!, $receiverId: Int!) {
  sendDmFile(file: $file, receiverId: $receiverId)
}
    `;
export type SendDmFileMutationFn = Apollo.MutationFunction<SendDmFileMutation, SendDmFileMutationVariables>;

/**
 * __useSendDmFileMutation__
 *
 * To run a mutation, you first call `useSendDmFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendDmFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendDmFileMutation, { data, loading, error }] = useSendDmFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useSendDmFileMutation(baseOptions?: Apollo.MutationHookOptions<SendDmFileMutation, SendDmFileMutationVariables>) {
        return Apollo.useMutation<SendDmFileMutation, SendDmFileMutationVariables>(SendDmFileDocument, baseOptions);
      }
export type SendDmFileMutationHookResult = ReturnType<typeof useSendDmFileMutation>;
export type SendDmFileMutationResult = Apollo.MutationResult<SendDmFileMutation>;
export type SendDmFileMutationOptions = Apollo.BaseMutationOptions<SendDmFileMutation, SendDmFileMutationVariables>;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($senderId: Int!) {
  acceptFriendRequest(senderId: $senderId)
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      senderId: // value for 'senderId'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, baseOptions);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const CancelFriendRequestDocument = gql`
    mutation CancelFriendRequest($receiverId: Int!) {
  cancelFriendRequest(receiverId: $receiverId)
}
    `;
export type CancelFriendRequestMutationFn = Apollo.MutationFunction<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;

/**
 * __useCancelFriendRequestMutation__
 *
 * To run a mutation, you first call `useCancelFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelFriendRequestMutation, { data, loading, error }] = useCancelFriendRequestMutation({
 *   variables: {
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useCancelFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>) {
        return Apollo.useMutation<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>(CancelFriendRequestDocument, baseOptions);
      }
export type CancelFriendRequestMutationHookResult = ReturnType<typeof useCancelFriendRequestMutation>;
export type CancelFriendRequestMutationResult = Apollo.MutationResult<CancelFriendRequestMutation>;
export type CancelFriendRequestMutationOptions = Apollo.BaseMutationOptions<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;
export const DeclineFriendRequestDocument = gql`
    mutation DeclineFriendRequest($senderId: Int!) {
  declineFriendRequest(senderId: $senderId)
}
    `;
export type DeclineFriendRequestMutationFn = Apollo.MutationFunction<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;

/**
 * __useDeclineFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeclineFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineFriendRequestMutation, { data, loading, error }] = useDeclineFriendRequestMutation({
 *   variables: {
 *      senderId: // value for 'senderId'
 *   },
 * });
 */
export function useDeclineFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>) {
        return Apollo.useMutation<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>(DeclineFriendRequestDocument, baseOptions);
      }
export type DeclineFriendRequestMutationHookResult = ReturnType<typeof useDeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationResult = Apollo.MutationResult<DeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationOptions = Apollo.BaseMutationOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;
export const RemoveFriendDocument = gql`
    mutation RemoveFriend($friendId: Int!) {
  removeFriend(friendId: $friendId)
}
    `;
export type RemoveFriendMutationFn = Apollo.MutationFunction<RemoveFriendMutation, RemoveFriendMutationVariables>;

/**
 * __useRemoveFriendMutation__
 *
 * To run a mutation, you first call `useRemoveFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useRemoveFriendMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendMutation, RemoveFriendMutationVariables>) {
        return Apollo.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument, baseOptions);
      }
export type RemoveFriendMutationHookResult = ReturnType<typeof useRemoveFriendMutation>;
export type RemoveFriendMutationResult = Apollo.MutationResult<RemoveFriendMutation>;
export type RemoveFriendMutationOptions = Apollo.BaseMutationOptions<RemoveFriendMutation, RemoveFriendMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($receiverId: Int!) {
  sendFriendRequest(receiverId: $receiverId)
}
    `;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useSendFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        return Apollo.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, baseOptions);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: Int!) {
  deleteMessage(messageId: $messageId)
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const EditMessageDocument = gql`
    mutation EditMessage($text: String!, $messageId: Int!) {
  editMessage(text: $text, messageId: $messageId)
}
    `;
export type EditMessageMutationFn = Apollo.MutationFunction<EditMessageMutation, EditMessageMutationVariables>;

/**
 * __useEditMessageMutation__
 *
 * To run a mutation, you first call `useEditMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMessageMutation, { data, loading, error }] = useEditMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useEditMessageMutation(baseOptions?: Apollo.MutationHookOptions<EditMessageMutation, EditMessageMutationVariables>) {
        return Apollo.useMutation<EditMessageMutation, EditMessageMutationVariables>(EditMessageDocument, baseOptions);
      }
export type EditMessageMutationHookResult = ReturnType<typeof useEditMessageMutation>;
export type EditMessageMutationResult = Apollo.MutationResult<EditMessageMutation>;
export type EditMessageMutationOptions = Apollo.BaseMutationOptions<EditMessageMutation, EditMessageMutationVariables>;
export const SendFileDocument = gql`
    mutation SendFile($file: Upload!, $channelId: Int!) {
  sendFile(file: $file, channelId: $channelId)
}
    `;
export type SendFileMutationFn = Apollo.MutationFunction<SendFileMutation, SendFileMutationVariables>;

/**
 * __useSendFileMutation__
 *
 * To run a mutation, you first call `useSendFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFileMutation, { data, loading, error }] = useSendFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSendFileMutation(baseOptions?: Apollo.MutationHookOptions<SendFileMutation, SendFileMutationVariables>) {
        return Apollo.useMutation<SendFileMutation, SendFileMutationVariables>(SendFileDocument, baseOptions);
      }
export type SendFileMutationHookResult = ReturnType<typeof useSendFileMutation>;
export type SendFileMutationResult = Apollo.MutationResult<SendFileMutation>;
export type SendFileMutationOptions = Apollo.BaseMutationOptions<SendFileMutation, SendFileMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($text: String!, $channelId: Int!) {
  sendMessage(text: $text, channelId: $channelId)
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const AddUserToTeamDocument = gql`
    mutation AddUserToTeam($teamId: Int!) {
  addUserToTeam(teamId: $teamId) {
    ...RegularTeam
  }
}
    ${RegularTeamFragmentDoc}`;
export type AddUserToTeamMutationFn = Apollo.MutationFunction<AddUserToTeamMutation, AddUserToTeamMutationVariables>;

/**
 * __useAddUserToTeamMutation__
 *
 * To run a mutation, you first call `useAddUserToTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToTeamMutation, { data, loading, error }] = useAddUserToTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useAddUserToTeamMutation(baseOptions?: Apollo.MutationHookOptions<AddUserToTeamMutation, AddUserToTeamMutationVariables>) {
        return Apollo.useMutation<AddUserToTeamMutation, AddUserToTeamMutationVariables>(AddUserToTeamDocument, baseOptions);
      }
export type AddUserToTeamMutationHookResult = ReturnType<typeof useAddUserToTeamMutation>;
export type AddUserToTeamMutationResult = Apollo.MutationResult<AddUserToTeamMutation>;
export type AddUserToTeamMutationOptions = Apollo.BaseMutationOptions<AddUserToTeamMutation, AddUserToTeamMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($teamName: String!) {
  createTeam(teamName: $teamName)
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      teamName: // value for 'teamName'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, baseOptions);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($teamId: Int!) {
  deleteTeam(teamId: $teamId)
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, baseOptions);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const LeaveTeamDocument = gql`
    mutation LeaveTeam($teamId: Int!) {
  leaveTeam(teamId: $teamId)
}
    `;
export type LeaveTeamMutationFn = Apollo.MutationFunction<LeaveTeamMutation, LeaveTeamMutationVariables>;

/**
 * __useLeaveTeamMutation__
 *
 * To run a mutation, you first call `useLeaveTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveTeamMutation, { data, loading, error }] = useLeaveTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useLeaveTeamMutation(baseOptions?: Apollo.MutationHookOptions<LeaveTeamMutation, LeaveTeamMutationVariables>) {
        return Apollo.useMutation<LeaveTeamMutation, LeaveTeamMutationVariables>(LeaveTeamDocument, baseOptions);
      }
export type LeaveTeamMutationHookResult = ReturnType<typeof useLeaveTeamMutation>;
export type LeaveTeamMutationResult = Apollo.MutationResult<LeaveTeamMutation>;
export type LeaveTeamMutationOptions = Apollo.BaseMutationOptions<LeaveTeamMutation, LeaveTeamMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeUsernameDocument = gql`
    mutation ChangeUsername($username: String!) {
  changeUsername(username: $username)
}
    `;
export type ChangeUsernameMutationFn = Apollo.MutationFunction<ChangeUsernameMutation, ChangeUsernameMutationVariables>;

/**
 * __useChangeUsernameMutation__
 *
 * To run a mutation, you first call `useChangeUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUsernameMutation, { data, loading, error }] = useChangeUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useChangeUsernameMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUsernameMutation, ChangeUsernameMutationVariables>) {
        return Apollo.useMutation<ChangeUsernameMutation, ChangeUsernameMutationVariables>(ChangeUsernameDocument, baseOptions);
      }
export type ChangeUsernameMutationHookResult = ReturnType<typeof useChangeUsernameMutation>;
export type ChangeUsernameMutationResult = Apollo.MutationResult<ChangeUsernameMutation>;
export type ChangeUsernameMutationOptions = Apollo.BaseMutationOptions<ChangeUsernameMutation, ChangeUsernameMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  register(username: $username, password: $password, email: $email) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveProfilePicDocument = gql`
    mutation RemoveProfilePic {
  removeProfilePic
}
    `;
export type RemoveProfilePicMutationFn = Apollo.MutationFunction<RemoveProfilePicMutation, RemoveProfilePicMutationVariables>;

/**
 * __useRemoveProfilePicMutation__
 *
 * To run a mutation, you first call `useRemoveProfilePicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProfilePicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProfilePicMutation, { data, loading, error }] = useRemoveProfilePicMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveProfilePicMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProfilePicMutation, RemoveProfilePicMutationVariables>) {
        return Apollo.useMutation<RemoveProfilePicMutation, RemoveProfilePicMutationVariables>(RemoveProfilePicDocument, baseOptions);
      }
export type RemoveProfilePicMutationHookResult = ReturnType<typeof useRemoveProfilePicMutation>;
export type RemoveProfilePicMutationResult = Apollo.MutationResult<RemoveProfilePicMutation>;
export type RemoveProfilePicMutationOptions = Apollo.BaseMutationOptions<RemoveProfilePicMutation, RemoveProfilePicMutationVariables>;
export const SetStatusDocument = gql`
    mutation SetStatus($status: Int!) {
  setStatus(status: $status)
}
    `;
export type SetStatusMutationFn = Apollo.MutationFunction<SetStatusMutation, SetStatusMutationVariables>;

/**
 * __useSetStatusMutation__
 *
 * To run a mutation, you first call `useSetStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStatusMutation, { data, loading, error }] = useSetStatusMutation({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useSetStatusMutation(baseOptions?: Apollo.MutationHookOptions<SetStatusMutation, SetStatusMutationVariables>) {
        return Apollo.useMutation<SetStatusMutation, SetStatusMutationVariables>(SetStatusDocument, baseOptions);
      }
export type SetStatusMutationHookResult = ReturnType<typeof useSetStatusMutation>;
export type SetStatusMutationResult = Apollo.MutationResult<SetStatusMutation>;
export type SetStatusMutationOptions = Apollo.BaseMutationOptions<SetStatusMutation, SetStatusMutationVariables>;
export const UpdateProfilePicDocument = gql`
    mutation UpdateProfilePic($file: Upload!) {
  updateProfilePic(file: $file)
}
    `;
export type UpdateProfilePicMutationFn = Apollo.MutationFunction<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>;

/**
 * __useUpdateProfilePicMutation__
 *
 * To run a mutation, you first call `useUpdateProfilePicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfilePicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfilePicMutation, { data, loading, error }] = useUpdateProfilePicMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUpdateProfilePicMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>) {
        return Apollo.useMutation<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>(UpdateProfilePicDocument, baseOptions);
      }
export type UpdateProfilePicMutationHookResult = ReturnType<typeof useUpdateProfilePicMutation>;
export type UpdateProfilePicMutationResult = Apollo.MutationResult<UpdateProfilePicMutation>;
export type UpdateProfilePicMutationOptions = Apollo.BaseMutationOptions<UpdateProfilePicMutation, UpdateProfilePicMutationVariables>;
export const ChannelDocument = gql`
    query Channel($channelId: Int!) {
  channel(channelId: $channelId) {
    ...RegularChannel
  }
}
    ${RegularChannelFragmentDoc}`;

/**
 * __useChannelQuery__
 *
 * To run a query within a React component, call `useChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useChannelQuery(baseOptions: Apollo.QueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
        return Apollo.useQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, baseOptions);
      }
export function useChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
          return Apollo.useLazyQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, baseOptions);
        }
export type ChannelQueryHookResult = ReturnType<typeof useChannelQuery>;
export type ChannelLazyQueryHookResult = ReturnType<typeof useChannelLazyQuery>;
export type ChannelQueryResult = Apollo.QueryResult<ChannelQuery, ChannelQueryVariables>;
export const ChannelsDocument = gql`
    query Channels($teamId: Int!) {
  channels(teamId: $teamId) {
    ...RegularChannel
  }
}
    ${RegularChannelFragmentDoc}`;

/**
 * __useChannelsQuery__
 *
 * To run a query within a React component, call `useChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelsQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useChannelsQuery(baseOptions: Apollo.QueryHookOptions<ChannelsQuery, ChannelsQueryVariables>) {
        return Apollo.useQuery<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, baseOptions);
      }
export function useChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelsQuery, ChannelsQueryVariables>) {
          return Apollo.useLazyQuery<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, baseOptions);
        }
export type ChannelsQueryHookResult = ReturnType<typeof useChannelsQuery>;
export type ChannelsLazyQueryHookResult = ReturnType<typeof useChannelsLazyQuery>;
export type ChannelsQueryResult = Apollo.QueryResult<ChannelsQuery, ChannelsQueryVariables>;
export const DirectMessagesDocument = gql`
    query DirectMessages($receiverId: Int!) {
  directMessages(receiverId: $receiverId) {
    id
    text
    createdAt
    senderId
    isRead
    pic
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useDirectMessagesQuery__
 *
 * To run a query within a React component, call `useDirectMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirectMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectMessagesQuery({
 *   variables: {
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useDirectMessagesQuery(baseOptions: Apollo.QueryHookOptions<DirectMessagesQuery, DirectMessagesQueryVariables>) {
        return Apollo.useQuery<DirectMessagesQuery, DirectMessagesQueryVariables>(DirectMessagesDocument, baseOptions);
      }
export function useDirectMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DirectMessagesQuery, DirectMessagesQueryVariables>) {
          return Apollo.useLazyQuery<DirectMessagesQuery, DirectMessagesQueryVariables>(DirectMessagesDocument, baseOptions);
        }
export type DirectMessagesQueryHookResult = ReturnType<typeof useDirectMessagesQuery>;
export type DirectMessagesLazyQueryHookResult = ReturnType<typeof useDirectMessagesLazyQuery>;
export type DirectMessagesQueryResult = Apollo.QueryResult<DirectMessagesQuery, DirectMessagesQueryVariables>;
export const FriendRequestsDocument = gql`
    query FriendRequests {
  friendRequests {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useFriendRequestsQuery__
 *
 * To run a query within a React component, call `useFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendRequestsQuery(baseOptions?: Apollo.QueryHookOptions<FriendRequestsQuery, FriendRequestsQueryVariables>) {
        return Apollo.useQuery<FriendRequestsQuery, FriendRequestsQueryVariables>(FriendRequestsDocument, baseOptions);
      }
export function useFriendRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendRequestsQuery, FriendRequestsQueryVariables>) {
          return Apollo.useLazyQuery<FriendRequestsQuery, FriendRequestsQueryVariables>(FriendRequestsDocument, baseOptions);
        }
export type FriendRequestsQueryHookResult = ReturnType<typeof useFriendRequestsQuery>;
export type FriendRequestsLazyQueryHookResult = ReturnType<typeof useFriendRequestsLazyQuery>;
export type FriendRequestsQueryResult = Apollo.QueryResult<FriendRequestsQuery, FriendRequestsQueryVariables>;
export const FriendsDocument = gql`
    query Friends {
  friends {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useFriendsQuery__
 *
 * To run a query within a React component, call `useFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsQuery(baseOptions?: Apollo.QueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
        return Apollo.useQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, baseOptions);
      }
export function useFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
          return Apollo.useLazyQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, baseOptions);
        }
export type FriendsQueryHookResult = ReturnType<typeof useFriendsQuery>;
export type FriendsLazyQueryHookResult = ReturnType<typeof useFriendsLazyQuery>;
export type FriendsQueryResult = Apollo.QueryResult<FriendsQuery, FriendsQueryVariables>;
export const OnlineFriendsDocument = gql`
    query OnlineFriends {
  onlineFriends {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useOnlineFriendsQuery__
 *
 * To run a query within a React component, call `useOnlineFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOnlineFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnlineFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOnlineFriendsQuery(baseOptions?: Apollo.QueryHookOptions<OnlineFriendsQuery, OnlineFriendsQueryVariables>) {
        return Apollo.useQuery<OnlineFriendsQuery, OnlineFriendsQueryVariables>(OnlineFriendsDocument, baseOptions);
      }
export function useOnlineFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OnlineFriendsQuery, OnlineFriendsQueryVariables>) {
          return Apollo.useLazyQuery<OnlineFriendsQuery, OnlineFriendsQueryVariables>(OnlineFriendsDocument, baseOptions);
        }
export type OnlineFriendsQueryHookResult = ReturnType<typeof useOnlineFriendsQuery>;
export type OnlineFriendsLazyQueryHookResult = ReturnType<typeof useOnlineFriendsLazyQuery>;
export type OnlineFriendsQueryResult = Apollo.QueryResult<OnlineFriendsQuery, OnlineFriendsQueryVariables>;
export const MessagesDocument = gql`
    query Messages($channelId: Int!) {
  messages(channelId: $channelId) {
    ...RegularMessage
  }
}
    ${RegularMessageFragmentDoc}`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const TeamDocument = gql`
    query Team($teamId: Int!) {
  team(teamId: $teamId) {
    ...RegularTeam
  }
}
    ${RegularTeamFragmentDoc}`;

/**
 * __useTeamQuery__
 *
 * To run a query within a React component, call `useTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useTeamQuery(baseOptions: Apollo.QueryHookOptions<TeamQuery, TeamQueryVariables>) {
        return Apollo.useQuery<TeamQuery, TeamQueryVariables>(TeamDocument, baseOptions);
      }
export function useTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamQuery, TeamQueryVariables>) {
          return Apollo.useLazyQuery<TeamQuery, TeamQueryVariables>(TeamDocument, baseOptions);
        }
export type TeamQueryHookResult = ReturnType<typeof useTeamQuery>;
export type TeamLazyQueryHookResult = ReturnType<typeof useTeamLazyQuery>;
export type TeamQueryResult = Apollo.QueryResult<TeamQuery, TeamQueryVariables>;
export const TeamsDocument = gql`
    query Teams {
  teams {
    ...RegularTeam
  }
}
    ${RegularTeamFragmentDoc}`;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SearchResultsDocument = gql`
    query SearchResults($query: String!) {
  searchResults(query: $query) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useSearchResultsQuery__
 *
 * To run a query within a React component, call `useSearchResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchResultsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchResultsQuery(baseOptions: Apollo.QueryHookOptions<SearchResultsQuery, SearchResultsQueryVariables>) {
        return Apollo.useQuery<SearchResultsQuery, SearchResultsQueryVariables>(SearchResultsDocument, baseOptions);
      }
export function useSearchResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchResultsQuery, SearchResultsQueryVariables>) {
          return Apollo.useLazyQuery<SearchResultsQuery, SearchResultsQueryVariables>(SearchResultsDocument, baseOptions);
        }
export type SearchResultsQueryHookResult = ReturnType<typeof useSearchResultsQuery>;
export type SearchResultsLazyQueryHookResult = ReturnType<typeof useSearchResultsLazyQuery>;
export type SearchResultsQueryResult = Apollo.QueryResult<SearchResultsQuery, SearchResultsQueryVariables>;
export const UserDocument = gql`
    query User($userId: Int) {
  user(userId: $userId) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;