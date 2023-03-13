// Imports
import dynamic from 'next/dynamic';
import React from 'react';
import {useRouter} from 'next/router';
import {Container} from 'semantic-ui-react';
import MenuBar from '../../components/MenuBar';
import SinglePost from '../../components/SinglePost';
import BackgroundImage from '../../public/images/Background2.png';





// Main Function
const Post = () => {

    const router = useRouter();
    const {id} = router.query;

    return (
        <div style={{backgroundImage:`url(${BackgroundImage.src})`, minHeight:'100vh', backgroundSize:'cover'}}>
            <Container>
                <MenuBar />
                <SinglePost postId={id}/>
            </Container>
        </div>
    );
};





// Export
export default dynamic(() => Promise.resolve(Post), {ssr:false});