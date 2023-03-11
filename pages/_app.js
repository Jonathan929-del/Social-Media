// Imports
import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.css';

import {AuthProvider} from '../context/auth';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient, InMemoryCache} from '@apollo/client';





// Main Function
const MyApp = ({Component, pageProps}) => {



  const httpLink = createHttpLink({
    uri:'https://social-media-server-sjy5.onrender.com'
  });

  const authHeader = setContext(() => {
    const token = localStorage.getItem('token');
    return{
      headers:{
        Authorization:token ? `Bearer ${token}` : ''
      }
    };
  });

  const client = new ApolloClient({
    link: authHeader.concat(httpLink),
    cache: new InMemoryCache()
  });


  return(
    <AuthProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  )
};





// Export
export default MyApp;