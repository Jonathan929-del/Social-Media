// Imports
import Link from 'next/link';
import gql from 'graphql-tag';
import {useEffect, useState} from 'react';
import {useMutation} from '@apollo/client';
import {Button, Icon, Label, Popup} from 'semantic-ui-react';






// Mutations
const LIKE_POST_MUTATION = gql`
    mutation likePost($postId:ID!){
        likePost(postId:$postId){
            id likeCount
            likes{
                id username
            }
        }
    }
`;





// Main Function
const LikeButton = ({post, user}) => {

    const [isLiked, setIsLiked] = useState();
    useEffect(() => {
        if(user && post.likes.find(like => like.username === user.username)){
            setIsLiked(true);
        }else setIsLiked(false);
    }, [user, post]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables:{postId:post.id}
    });

    const likeButton = user ? (
        isLiked ? (
            <Button color='teal'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='teal' basic>
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button as={Link} href='/login' color='teal' basic>
            <Icon name='heart' />
        </Button>
    )


  return (
    <Popup
        inverted
        content={isLiked ? 'Unlike' : 'Like'}
        trigger={
            <Button as='div' labelPosition='right' onClick={likePost}>
                {likeButton}
                <Label as='a' basic color='teal' pointing='left'>
                    {post.likeCount}
                </Label>
            </Button>
        }
    />
  )
}





// Export
export default LikeButton;