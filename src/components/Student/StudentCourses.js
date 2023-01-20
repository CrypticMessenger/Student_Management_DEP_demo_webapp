import {React,useEffect,useState} from 'react'
import {Text} from "@chakra-ui/react"
import axios from 'axios'
import CourseCard from '../Course/CourseCard'
export default function StudentCourses(props) {
    const [data, setData] = useState([])
    // const [isDataLoaded, setIsDataLoaded] = useState(false);
    const fetchData = async ()=>{
        const res = await axios.post("http://localhost:5000/api/courses");
        // setIsDataLoaded(true);
        // console.log(res.data.data)
        setData(res.data.data)
       
    }
    useEffect(() => {
        // if(!isDataLoaded){
            fetchData();
        // }   
    },[])
    const list = data.map((state,value)=>{
        let button_text_ind = 0;
        
        state.students.forEach(([email,name,status]) => {
            if(email === props.email)
                {
                    button_text_ind = status
                }
        })
        
        
        
        return (
            // <Text key={value}>{state.dept}-{state.course_code}</Text>
            
             <CourseCard user={props.email} 
             key={value} 
             courseCode={state.course_code} 
             courseName={state.course_name} 
             email={state.instructor_email} 
             status = {button_text_ind}
             students={state.students}
             
             /> 
        )
    })
    return (
        <div>
    StudentCourses
    {list}
    </div>
    )
}
