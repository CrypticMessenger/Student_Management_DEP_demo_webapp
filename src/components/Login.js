import {React,useState} from 'react'
import { Card, Text, CardBody, CardFooter,Image,Stack,Heading,Input,Divider,ButtonGroup,Button,InputRightElement,InputGroup } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [credentials, setCredentials] = useState({
    "username":"abc@123",
    "password":"123"
  })
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [success,setSuccess] = useState(false);
  const [show, setShow] = useState(false)
  const handleUsernameChange = (e)=>{
    setUsername(e.target.value);
  }
  const handleSubmit = ()=>{
    if (username === credentials.username && password === credentials.password){
      setSuccess(true);
      setUsername("");
      setPassword("");
      navigate("/home")
    }
    else{
      setSuccess(false);
      setUsername("");
      setPassword("");
    }
  }
  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
  }
  const handleClick = ()=>{
    setShow(!show);
  }
  return (
  <Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Login</Heading>
      <Input placeholder='Enter Username' value={username} onChange={handleUsernameChange}/>
      <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        value={password} 
        onChange={handlePasswordChange}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
     
      <Heading>{success? "SUCCESS":"INVALID CREDENTIALS"}</Heading>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={handleSubmit}>
        Login
      </Button>
      
    </ButtonGroup>
  </CardFooter>
</Card>
  )
}
