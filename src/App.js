import Login from './components/Login';
import StudentHome from './components/Student/StudentHome'
import InstructorHome from './components/Instructor/InstructorHome';
import AdvisorHome from './components/Advisor/AdvisorHome';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseInfo from './components/Student/StudentList';
import {CourseInfo as StudentListForInstructor} from './components/Instructor/StudentList';
import {CourseInfo as StudentListForAdvisor} from './components/Advisor/StudentList';

function App() {
  
  return (
    <ChakraProvider>
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/homeStudent" element={<StudentHome />} />
      <Route path="/homeInstructor" element={<InstructorHome />} />
      <Route path="/homeInstructor/StudentList" element={<StudentListForInstructor />} />
      <Route path="/homeAdvisor/StudentList" element={<StudentListForAdvisor />} />
      <Route path="/homeAdvisor" element={<AdvisorHome />} />
      <Route path="/courseinfo" element={<CourseInfo />} />
    </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
