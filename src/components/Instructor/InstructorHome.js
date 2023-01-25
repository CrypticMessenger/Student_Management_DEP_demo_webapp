import { Heading,Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import InstructorCourses from "./InstructorCourses";
export default function InstructorHome() {
    const location = useLocation()
    console.log(location.state.email)
    const navigate = useNavigate()
    function handleLogout()
    {
      navigate("/")
    }
  return (
    <>
      <div align="center">
        <Heading align={"center"} fontFamily={"Montserrat"}>
          Hello, {location.state.email}
        </Heading>
        <InstructorCourses email={location.state.email} fontFamily={'Montserrat'} />
        <Button variant="solid" colorScheme="blue" onClick={handleLogout}>
        {"Logout"}
      </Button>
      </div>
    </>
  );
}
