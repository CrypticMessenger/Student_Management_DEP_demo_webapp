import {React,useEffect,useState} from 'react'
import {Text} from "@chakra-ui/react"
import axios from 'axios'
import CourseCard from './CourseCard'
export default function StudentCourses(props) {
    const [data, setData] = useState([])
    const [email,setEmail] = useState(props.email);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const fetchData = async ()=>{
        const res = await axios.post("http://localhost:5000/api/courses");
        setIsDataLoaded(true);
        setData(res.data.data)
       
    }
    useEffect(() => {
        if(!isDataLoaded){
            fetchData();
        }   
    }, [isDataLoaded])
    
    const list = data.map((state,value)=>{
        const students = state.students;
        let button_text_ind = 0;
        for(let i=0; i<students.length; i+=1){
            if(students[i][0]===email){
                button_text_ind = students[i][2];
                break;
            }
        }
        
        
        return (
            // <Text key={value}>{state.dept}-{state.course_code}</Text>
            
             <CourseCard user={email} 
             key={value} 
             courseCode={state.course_code} 
             courseName={state.course_name} 
             email={state.instructor_email} 
             button_text_ind = {button_text_ind}

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
