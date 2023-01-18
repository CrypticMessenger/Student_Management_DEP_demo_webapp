import { Heading } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import StudentCourses from './StudentCourses';

export default function Home() {
  const location = useLocation(); 
  const email = location.state.email;
  return (
    <div align='center'>
    <Heading align={"center"} fontFamily={'Montserrat'}>Hello,  {email}</Heading>
    <StudentCourses email={email} fontFamily={'Montserrat'} />
    </div>
  )
}

