import {React,useEffect,useState} from 'react'
import { Card, Text, CardBody, CardFooter,Image,Stack,Heading,Input,Divider,ButtonGroup,Button,InputRightElement,InputGroup, Container } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [prevlogin, setPrevlogin] = useState(false);


  useEffect(() => {
    if(localStorage.getItem('login')){
      setPrevlogin(true)
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
      localStorage.setItem("login",`${email}`);
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
  const handleContinue = ()=>{
    alert(`logging in as ${localStorage.getItem('login')} `)
    navigate('/home')
  }
  
  return (
    <>
<Container mt={12}>

  {prevlogin && (<Button variant='solid' colorScheme='blue' onClick={handleContinue} mb={8} ml={'25%'} >
  Continue previous account
  </Button>)}

  <Divider/>
  <Card maxW='sm' ml={'10%'}>
  <CardBody backgroundColor={'#8DCBE6'}>
    <Image
      src='https://qph.cf2.quoracdn.net/main-qimg-931e2ae90300fef481552c51ec1b659c-lq'
      alt='Hostel'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md' margin={'auto'} fontFamily={'Montserrat'}>Login</Heading>
      <Input placeholder='Enter email'  type="email" value={email} onChange={handleUsernameChange} backgroundColor={'white'}/>
      <InputGroup size='md' backgroundColor={'white'}>
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
    
    <ButtonGroup spacing='2' margin={'auto'}>
    
      <Button variant='solid' colorScheme='blue' onClick={handleSubmit}>
        {"Login"}
      </Button>
      
    </ButtonGroup>
    
  </CardFooter>
</Card>
        </Container>
    </>
  )
}
