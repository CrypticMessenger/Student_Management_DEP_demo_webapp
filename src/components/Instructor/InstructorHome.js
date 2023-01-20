import { Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import InstructorCourses from "./InstructorCourses";
export default function InstructorHome() {
    const location = useLocation()
    
  return (
    <>
      <div align="center">
        <Heading align={"center"} fontFamily={"Montserrat"}>
          Hello, {location.state.email}
        </Heading>
        <InstructorCourses email={location.state.email} fontFamily={'Montserrat'} />
      </div>
    </>
  );
}
