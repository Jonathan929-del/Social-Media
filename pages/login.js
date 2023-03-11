// Imports
import gql from 'graphql-tag';
import {useForm} from '../util/hooks';
import {useRouter} from 'next/router';
import {useMutation} from '@apollo/client';
import {AuthContext} from '../context/auth';
import MenuBar from '../components/MenuBar';
import {useState, useContext, useEffect} from 'react';
import {Button, Container, Form} from 'semantic-ui-react';





//  Queries
const LOGIN_USER = gql`
  mutation login(
    $username:String!
    $password:String!
  ){
    login(
      loginInput:{
        username:$username
        password:$password
      }
    ){
      id username email createdAt token
    }
  }
`;





// Main Function
const Login = () => {


  const context = useContext(AuthContext);
  useEffect(() => {
    context.user !== null && router.push('/');
  }, []);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const {changeHandler, submitHandler, values} = useForm(loginUserCallback, {
    username:'',
    password:'',
  });
  const [loginUser, {loading}] = useMutation(LOGIN_USER, {
    update:(_, {data:{login:userData}}) => {
      context.login(userData);
      router.push('/');
    },
    variables:values,
    onError:err => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });
  function loginUserCallback(){
    loginUser();
  };


  return (
    <Container>
      <MenuBar />
      <Form noValidate style={{width:400, margin:'auto'}} className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          type='text'
          label='Username'
          placeholder='Username..'
          name='username'
          error={errors.username ? true : false}
          value={values.username}
          onChange={changeHandler}
        />
        <Form.Input
          type='password'
          label='Password'
          placeholder='Password..'
          name='password'
          error={errors.password ? true : false}
          value={values.password}
          onChange={changeHandler}
        />
        <Button type='submit' primary onClick={submitHandler}>
          Login
        </Button>
      </Form>
        {Object.keys(errors).length > 0 && (
          <div className='ui error message' style={{width:400, margin:'30px auto'}}>
            <ul className='list'>
              {Object.values(errors).map(value => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
    </Container>
  )
};





// Export
export default Login;