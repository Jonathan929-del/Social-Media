// Imports
import gql from 'graphql-tag';
import {useForm} from '../util/hooks';
import {useMutation} from '@apollo/client';
import {Button, Form} from 'semantic-ui-react';
import {FETCH_POST_QUERY} from '../util/graphql';





// Queries
const CREATE_POST_MUTATATION = gql`
    mutation createPost($body:String!){
        createPost(body:$body){
            id body createdAt username likeCount commentCount
            likes{
                id username createdAt
            }
            comments{
                id body username createdAt
            }
        }
    }
`;





// Main Function
const PostForm = () => {


    const {values, submitHandler, changeHandler} = useForm(createPostCallback, {
        body:''
    });

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATATION, {
        variables:values,
        update:(proxy, results) => {
            const data = proxy.readQuery({
                query:FETCH_POST_QUERY
            });
            const newData = {
                getPosts:[]
            };
            newData.getPosts = [results.data.createPost, ...data.getPosts];
            proxy.writeQuery({query:FETCH_POST_QUERY, data:newData});
            values.body = '';
        }
    });

    function createPostCallback(){
        createPost();
    };


  return (
    <>
        <Form onSubmit={submitHandler}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder='Hi World!'
                    name='body'
                    onChange={changeHandler}
                    value={values.body}
                    error={error ? true : false}
                />
                <Button type='submit' color='teal'>Submit</Button>
            </Form.Field>
        </Form>
        {error && (
            <div className='ui error message'>
                <ul className='list'>
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )}
    </>
  )
};





// Export
export default PostForm;