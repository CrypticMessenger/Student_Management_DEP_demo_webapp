import {React,useEffect,useState} from 'react'
import {Text} from "@chakra-ui/react"
import axios from 'axios'

export default function StudentCourses(props) {
    const [data, setData] = useState([])
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const fetchData = async ()=>{
        const res = await axios.post("http://localhost:5000/api/courses");
        // if(res.data.data){
        //     console.log("data is present and good")
        // }
        // console.log( res.data.data);
        setIsDataLoaded(true);
        // console.log("log=");
        // console.log(typeof data);
        setData(res.data.data)
        // console.log(data);
    }
    useEffect(() => {
        if(!isDataLoaded){
            fetchData();
        }   
    }, [isDataLoaded])
    

    const list = data.map((state,value)=>{
        return (
            <Text key={value}>{state.name}</Text>
        )
    })
    return (
        <div>
    StudentCourses
    {list}
    </div>
    )
}
