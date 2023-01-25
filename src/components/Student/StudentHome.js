import { Heading,Button } from '@chakra-ui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import StudentCourses from './StudentCourses';

export default function StudentHome() {
  const location = useLocation(); 
  const navigate = useNavigate()
  const [email,setEmail] = React.useState(location.state.email);
  function handleLogout()
    {
      navigate("/")
    }
  return (
    <div align='center'>
    <Heading align={"center"} fontFamily={'Montserrat'}>Hello,  {email}</Heading>
    <StudentCourses email={email} fontFamily={'Montserrat'} />
    <Button variant="solid" colorScheme="blue" onClick={handleLogout}>
        {"Logout"}
      </Button>
    </div>
  )
}

