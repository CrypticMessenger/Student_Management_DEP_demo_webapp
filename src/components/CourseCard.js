import { Heading,Text,Card,Button } from '@chakra-ui/react'
import axios from 'axios';
import { useState,useEffect } from 'react'

export default function CourseCard(props) {
    const [name, setName] = useState("");
    const button_text = ["Request","Pending Instructor Approval","Pending Advisor Approval","Accepted"]
    const button_state = [false,true,true,true]
    const button_color = ['blue','gray','gray','green']
    
    const fetchName = async ()=>{
        const body = {email:props.email}
        const res = await axios.post("http://localhost:5000/api/get_inst_name",{data:body})
        console.log(res.data.name)
        setName(res.data.name)
    }

    useEffect( () => {
        
        fetchName();
      
    }, [])
    
    const handleClick = () => {
        
    }
    return (
    <Card maxW={600} m={8} >
        <Heading m={3} fontFamily={'Montserrat'}>{props.courseCode}: {props.courseName}</Heading>
        <Text m={5} fontFamily={'Montserrat'} fontWeight={'bold'}>Instuctor: {name}</Text>
        <Button onClick={handleClick} colorScheme={button_color[props.button_text_ind] } fontFamily={'Montserrat'} disabled={button_state[props.button_text_ind]}>{button_text[props.button_text_ind]}</Button>
        {/* <Button disabled={true}>{button_text[props.button_text_ind]}</Button> */}
    </Card>
    )
}
