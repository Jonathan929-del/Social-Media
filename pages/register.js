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
const REGISTER_USER = gql`
  mutation register(
    $username:String!
    $email:String!
    $password:String!
    $confirmPassword:String!
  ){
    register(
      registerInput:{
        username:$username
        email:$email
        password:$password
        confirmPassword:$confirmPassword
      }
    ){
      id username email createdAt token
    }
  }
`;





// Main Function
const Register = () => {


  const context  = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const {changeHandler, submitHandler, values} = useForm(registerUser, {
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  });
  const [addUser, {loading}] = useMutation(REGISTER_USER, {
    update:(_, {data:{login:userData}}) => {
      context.login(userData);
      router.push('/');
    },
    variables:values,
    onError:err => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });
  function registerUser(){
    addUser();
  };
  useEffect(() => {
    context.user !== null && router.push('/');
  }, []);


  return (
    <Container>
      <MenuBar />
      <Form noValidate style={{width:400, margin:'auto'}} className={loading ? 'loading' : ''}>
        <h1>Register</h1>
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
          type='email'
          label='Email'
          placeholder='Email..'
          name='email'
          error={errors.email ? true : false}
          value={values.email}
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
        <Form.Input
          type='password'
          label='Confirm Password'
          placeholder='Confirm Password..'
          name='confirmPassword'
          error={errors.confirmPassword ? true : false}
          value={values.confirmPassword}
          onChange={changeHandler}
        />
        <Button type='submit' primary onClick={submitHandler}>
          Register
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
export default Register;