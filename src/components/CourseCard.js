import { Heading,Text,Card,Button ,Grid,GridItem} from '@chakra-ui/react'
import axios from 'axios';
import { useState,useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function CourseCard(props) {
    const toast = useToast();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [students, setStudents] = useState([]);
    const button_text = ["Request","Pending Instructor Approval","Pending Advisor Approval","Accepted"]
    const button_state = [0,true,true,true]
    const button_color = ['blue','gray','gray','green']
    
    const fetchName = async ()=>{
        const body = {email:props.email}
        const res = await axios.post("http://localhost:5000/api/get_inst_name",{data:body})
        setStudents(res.data.students)
        setName(res.data.name)
    }

    useEffect( () => {
        
        fetchName();
      
    }, [])
    
    const handleClick = () => {
        toast({
            title: 'Course requested!',
            description: `${props.courseName} course requested...`,
            status: 'success',
            duration: 5000,
            position:'bottom-right',
            isClosable: true,
          })
    }
    const handleInfo = () => {
        navigate('/courseinfo',{state:{students:props.students,name:props.courseName}})
        console.log('information')
    }
    return (
    <Card maxW={600} m={8} >
        <Heading m={3} fontFamily={'Montserrat'}>{props.courseCode}: {props.courseName}</Heading>
        
        <Text m={5} fontFamily={'Montserrat'}>Instuctor: {name}</Text>
        <Grid templateColumns='repeat(2, 1fr)' gap={1}>
            <GridItem w='100%' h='10'>

                <Button w="100%" fontFamily={'Montserrat'} onClick={handleInfo}>More Info</Button>
            </GridItem>
            <GridItem w='100%' h='10'>
                <Button w="100%"  fontFamily={'Montserrat'} onClick={handleClick} colorScheme={button_color[props.button_text_ind]} disabled={button_state[props.button_text_ind]}>{button_text[props.button_text_ind]}</Button>

            </GridItem>
        
        </Grid>
    </Card>
    )
}
