import {React,useEffect,useState} from 'react'
import { Card, Text, CardBody, CardFooter,Image,Stack,Heading,Input,Divider,ButtonGroup,Button,InputRightElement,InputGroup } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
 


  useEffect(() => {
    if(localStorage.getItem('login')){
      navigate('/home')
    }
  },[])
  
  const handleUsernameChange = (e)=>{
    setEmail(e.target.value);
  }
 
  const handleSubmit = async (e)=>{
    e.preventDefault();
    
  
    
      
    let body = {email:email, password:password};
    const res = await axios.post("http://localhost:5000/api/login",{data:body});
    if(res.data.success){
      navigate('/home');
      localStorage.setItem("login","true");
    }
    else{
      alert("wrong email / password entered!");
      navigate('/')
      setEmail("");
      setPassword("");
    }
   
      
  }
 
  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
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
      <Input placeholder='Enter email'  type="email" value={email} onChange={handleUsernameChange}/>
      <InputGroup size='md'>
      {/* <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        value={password} 
        onChange={handlePasswordChange}
      /> */}
      { <Input
        pr='4.5rem'
        placeholder='Enter Password'
        value={password} 
        onChange={handlePasswordChange}
      />}
      //! add alert and toast notifications
      
    </InputGroup>
     
    {/* <Heading>{success? "SUCCESS":"INVALID CREDENTIALS"}</Heading> */}
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={handleSubmit}>
        {"Login"}
      </Button>
      
    </ButtonGroup>
  </CardFooter>
</Card>
  )
}
