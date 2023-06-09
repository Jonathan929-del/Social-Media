// Import
import moment from 'moment';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import {AuthContext} from '../context/auth';
import {useContext, useRef, useState} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {Grid, Image, Card, Button, Icon, Label, Form, Popup} from 'semantic-ui-react';





// Queries and Mutations
const CREATE_COMMENT_MUTATION = gql`
    mutation ($postId:ID!, $body:String!){
        createComment(postId:$postId, body:$body){
            id commentCount
            comments{
                id body createdAt username
            }
        }
    }
`;
const FETCH_POST_QUERY = gql`
    query getPost($postId:ID!){
        getPost(postId:$postId){
            id body createdAt username likeCount commentCount
            likes{
                username
            }
            comments{
                username createdAt body id
            }
        }
    }
`;





// Main Function
const SinglePost = ({postId}) => {

    const commentInputRef = useRef(null);
    const [comment, setComment] = useState('');
    const {data} = useQuery(FETCH_POST_QUERY, {
        variables:{postId}
    });
    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update:() => {
            setComment('');
            commentInputRef.current.blur();
        },
        variables:{
            postId,
            body:comment
        }
    });
    const {user} = useContext(AuthContext);
    let postMarkup;
    const router = useRouter();

    const deletePostCallback = () => {
        router.push('/');
    };


    if(!data?.getPost){
        postMarkup = (<p>Loading...</p>)
    }else{
        const {id, body, createdAt, username, likes, comments, likeCount, commentCount} = data.getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                            size='small'
                            float='right'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={data.getPost}/>
                                <Popup
                                    inverted
                                    content='Comments'
                                    trigger={
                                        <Button
                                            as='div'
                                            labelPosition='right'
                                        >
                                            <Button basic color='blue'>
                                                <Icon name='comments'/>
                                            </Button>
                                            <Label basic color='blue' pointing='left'>
                                                {commentCount}
                                            </Label>
                                        </Button>
                                    }
                                />
                                {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback}/>}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Leave a comment...</p>
                                    <Form>
                                        <div className='ui action input fluid'>
                                            <input
                                                type='text'
                                                placeholder='comment...'
                                                name='comment'
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button
                                                type='submit'
                                                className='ui button teal'
                                                disabled={comment.trim() === ''}
                                                onClick={createComment}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id}/>
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }


    return postMarkup;
};





// Export
export default dynamic(() => Promise.resolve(SinglePost), {ssr:false});