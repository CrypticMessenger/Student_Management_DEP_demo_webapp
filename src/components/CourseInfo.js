import { Th ,Tr,TableContainer,Thead,Tbody,Table,Card, Heading} from '@chakra-ui/react';
import React from 'react'
import { useLocation } from 'react-router-dom'

export default function CourseInfo(props) {
    const location = useLocation(); 
    const button_text = ["Request","Pending Instructor Approval","Pending Advisor Approval","Accepted"]

    const students = location.state.students;
    const name = location.state.name;
    console.log(students);
    const row = students.map((student,value) =>{
        return (
            <Tr key={value}>
                <Th>{student[0]}</Th>
                <Th>{student[1]}</Th>
                <Th>{button_text[student[2]]}</Th>
            </Tr>
        )
        
    })
    return (
        <Card m ={'auto'} maxW={900}>
        <Heading align='center' fontFamily={'Montserrat'} m={5}>{name}</Heading>
        <TableContainer align={'center'} margin={'auto'}>
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th>Email</Th>
                    <Th>Name</Th>
                    <Th>Course Status</Th>
                </Tr>
                </Thead>
                <Tbody>
                {row}
                </Tbody>
                
            
            </Table>
        </TableContainer>
        </Card>
    )
}
