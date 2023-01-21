import { Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import AdvisorCourses from "./AdvisorCourses";
export default function AdvisorHome() {
    const location = useLocation()
    console.log(location.state.email)
  return (
    <>
      <div align="center">
        <Heading align={"center"} fontFamily={"Montserrat"}>
          Hello, {location.state.email}
        </Heading>
        <AdvisorCourses email={location.state.email} fontFamily={'Montserrat'} />
      </div>
    </>
  );
}
