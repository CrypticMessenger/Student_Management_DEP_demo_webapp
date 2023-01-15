import {React,useState} from 'react'
import { Card, Text, CardBody, CardFooter,Image,Stack,Heading,Input,Divider,ButtonGroup,Button,InputRightElement,InputGroup } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState(0);
  const [msg,setMsg] = useState("Send OTP");
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState(0);
  const [success, setSuccess] = useState(false)
  const [otp_sent, setOtp_sent] = useState(false)
  const [isDisabled, setisDisabled] = useState(false)
  const handleUsernameChange = (e)=>{
    setEmail(e.target.value);
  }
  async function handleFirstSubmit(email){
    await axios.post("http://localhost:5000/api/otp",{email:email}).then(res=>{
        setSuccess(res.data.success)
        setOtp_sent(res.data.otp_sent)
      }).then(()=>{

        console.log(otp_sent);
        console.log(success);
        if(otp_sent){
          setisDisabled(true);
          setMsg("Login")
        }
        else if(!success){
          navigate('/')
        }
        else{
          navigate('/home')
        }
      });
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    
  
      // axios.post("http://localhost:5000/api/otp",{email:email}).then(res=>{
      //   setSuccess(res.data.success)
      //   setOtp_sent(res.data.otp_sent)
      // })
      handleFirstSubmit(email);
      // console.log(otp_sent);
      // console.log(success);
      // if(otp_sent){
      //   setisDisabled(true);
      //   setMsg("Login")
      // }
      // else if(!success){
      //   navigate('/')
      // }
      // else{
      //   navigate('/home')
      // }
   
      
  }
  const handleOtp = (e)=>{
    axios.get("http://localhost:5000/api/auth",{email:email,password:password}).then(res=>{
      if(res.data.success){
        navigate('/home')
      }
      else{
        navigate('/')
      }
    })
    // if((''+otp) === password ){
    //   navigate('/home');
    // }
    // else{
    //   setisDisabled(false);
    //   setEmail("");
    //   setPassword("");
    //   setMsg("Send OTP")
    // }
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
      <Input placeholder='Enter email' disabled ={isDisabled} type="email" value={email} onChange={handleUsernameChange}/>
      <InputGroup size='md'>
      {/* <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        value={password} 
        onChange={handlePasswordChange}
      /> */}
      {isDisabled && <Input
        pr='4.5rem'
        placeholder='Enter OTP'
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
      <Button variant='solid' colorScheme='blue' onClick={isDisabled? handleOtp:handleSubmit}>
        {msg}
      </Button>
      
    </ButtonGroup>
  </CardFooter>
</Card>
  )
}
