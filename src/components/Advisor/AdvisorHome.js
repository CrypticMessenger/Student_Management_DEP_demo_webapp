import { Heading,Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import AdvisorCourses from "./AdvisorCourses";
export default function AdvisorHome() {
    const location = useLocation()
    const navigate = useNavigate()
    function handleLogout()
    {
      navigate("/")
    }
    console.log(location.state.email)
  return (
    <>
      <div align="center">
        <Heading align={"center"} fontFamily={"Montserrat"}>
          Hello, {location.state.email}
        </Heading>
        <AdvisorCourses email={location.state.email} fontFamily={'Montserrat'} />
        <Button variant="solid" colorScheme="blue" onClick={handleLogout}>
        {"Logout"}
      </Button>
      </div>
    </>
  );
}
