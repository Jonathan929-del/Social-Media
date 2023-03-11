// Imports
import dynamic from 'next/dynamic';
import React from 'react';
import {useRouter} from 'next/router';
import {Container} from 'semantic-ui-react';
import MenuBar from '../../components/MenuBar';
import SinglePost from '../../components/SinglePost';





// Main Function
const Post = () => {

    const router = useRouter();
    const {id} = router.query;

    return (
        <Container>
            <MenuBar />
            <SinglePost postId={id}/>
        </Container>
    );
};





// Export
export default dynamic(() => Promise.resolve(Post), {ssr:false});