// Imports
import Head from 'next/head';
import {useContext} from 'react';
import dynamic from 'next/dynamic';
import {useQuery} from '@apollo/client';
import {AuthContext} from '../context/auth';
import MenuBar from '../components/MenuBar';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {FETCH_POST_QUERY} from '../util/graphql';
import {Container, Grid, Transition} from 'semantic-ui-react';





// Main function
const Home = () => {

  const {loading, data} = useQuery(FETCH_POST_QUERY);
  const {user} = useContext(AuthContext);

  return (
    <div>
      <Head>
        <title>Social Media</title>
        <meta name="description" content="Social Media" />
      </Head>
      <Container>
        <MenuBar />
        <Grid columns={3}>
          <Grid.Row>
            <h1 style={{width:'100%', textAlign:'center', fontSize:'2rem', marginTop:10}}>Recent Posts</h1>
          </Grid.Row>
          <Grid.Row>
              {user && (
                <Grid.Column>
                  <PostForm />
                </Grid.Column>
              )}
              {loading ? (
                <h1>Loading posts...</h1>
              ) : (
                <Transition.Group>
                    {
                      data?.getPosts && data.getPosts.map(post => (
                        <Grid.Column style={{marginBottom:20}} key={post.id}>
                          <PostCard post={post}/>
                        </Grid.Column>
                      ))
                    }
                </Transition.Group>
              )}
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
};





// Export
export default dynamic(() => Promise.resolve(Home), {ssr:false});