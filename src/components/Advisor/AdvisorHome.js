import { Heading } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"
export default function AdvisorHome(props)
    {
        const location = useLocation()
        return  <>
        <div align="center">
          <Heading align={"center"} fontFamily={"Montserrat"}>
            Hello, {location.state.email}
          </Heading>
        </div>
      </>
    }