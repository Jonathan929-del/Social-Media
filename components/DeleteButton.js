// Imports
import gql from 'graphql-tag';
import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {FETCH_POST_QUERY} from '../util/graphql';
import {Button, Icon, Confirm, Popup} from 'semantic-ui-react';





// Mutations
const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId:ID!){
        deletePost(postId:$postId)
    }
`;
const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId:ID!, $commentId:ID!){
        deleteComment(postId:$postId, commentId:$commentId){
            id commentCount
            comments{
                id username createdAt body
            }
        }
    }
`;





// Main Function
const DeleteButton = ({postId, commentId, callback}) => {

    const [isConfirmOpened, setIsConfirmOpened] = useState(false);
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
    const [deletePostOrComment] = useMutation(mutation, {
        update:(proxy) => {
            setIsConfirmOpened(false);
            if(!commentId){
                const data = proxy.readQuery({query:FETCH_POST_QUERY});
                let newData = {
                    getPosts:[]
                }
                newData.getPosts = data.getPosts.filter(p => p.id !== postId);
                proxy.writeQuery({query:FETCH_POST_QUERY, data:newData});
            }
            callback && callback();
        },
        variables:{postId, commentId}
    });

    return (
        <>
            <Popup inverted content={commentId ? 'Delete Comment' : 'Delete post'} trigger={
                <Button
                    as='div'
                    color='red'
                    floated='right'
                    onClick={() => setIsConfirmOpened(true)}
                >
                    <Icon name='trash' style={{margin:0}}/>
                </Button>
            }/>
            <Confirm
                open={isConfirmOpened}
                onCancel={() => setIsConfirmOpened(false)}
                onConfirm={deletePostOrComment}
            />
        </>
    )
};





// Export
export default DeleteButton;