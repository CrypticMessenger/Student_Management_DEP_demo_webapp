import {
  Th,
  Tr,
  TableContainer,
  Thead,
  Tbody,
  Table,
  Card,
  Heading,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
export function CourseInfo(props) {
  const location = useLocation();
  const toast = useToast();
  const button_text = [
    "Request",
    "Pending Instructor Approval",
    "Pending Advisor Approval",
    "Accepted",
    "Rejected",
  ];
  const button_color = {
    accept: "green",
    reject: "red",
  };
  console.log(location.state)
  const students = location.state.students;
  const name = location.state.name;
  const courseCode = location.state.courseCode;
  const handleClick = async (response,studentmail) => {
    const res = await axios.post(
      "http://localhost:5000/api/instructor/instructorResponse",
      { response: response ,courseCode : courseCode,studentMail : studentmail}
    );
    console.log(res.data.message);
    if (res.data.message === "Operation Successfull.")
      toast({
        title: res.data.message,
        status: "success",
        duration: 5000,
        position: "bottom-right",
        isClosable: true,
      });
    else
      toast({
        title: res.data.message,
        status: "alert",
        duration: 5000,
        position: "bottom-right",
        isClosable: true,
      });
  };
  const row = students.map((student, value) => {
    let email = student[0]
    let name = student[1]
    let status = student[2]
    console.log(email,name,status);
    return (
      <Tr key={value}>
        <Th>{email}</Th>
        <Th>{name}</Th>
        {status === 1 ? (
          <Th>
            <Button
              w="50%"
              fontFamily={"Montserrat"}
              colorScheme={button_color["accept"]}
              onClick={() => handleClick(1,email)}
            >
              Accept
            </Button>
            <Button
              w="50%"
              fontFamily={"Montserrat"}
              colorScheme={button_color["reject"]}
              onClick={() => handleClick(0,email)}
            >
              Reject
            </Button>
          </Th>
        ) : (
          <>
            <Th>{button_text[status]}</Th>
          </>
        )}
      </Tr>
    );
  });
  return (
    <Card m={"auto"} maxW={900}>
      <Heading align="center" fontFamily={"Montserrat"} m={5}>
        {name}
      </Heading>
      <TableContainer align={"center"} margin={"auto"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Email</Th>
              <Th>Name</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody w="100%">{row}</Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
}
