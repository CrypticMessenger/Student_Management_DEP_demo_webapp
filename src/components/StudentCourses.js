import {React,useEffect,useState} from 'react'
import {Text} from "@chakra-ui/react"
import axios from 'axios'

export default function StudentCourses(props) {
    const [data, setData] = useState({})
    const fetchData = async ()=>{
        const res = await axios.get("http://localhost:5000/api/courses");
        
        console.log("res= \n")
        console.log(res.data.data)
        setData(res.data.data);
        console.log(res.data)
        console.log(data)
    }
    useEffect(() => {
        fetchData();    
    }, [])
    


    return (
        <div>
    StudentCourses
        
    </div>
    )
}
