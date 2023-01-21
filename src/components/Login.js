import { React, useEffect, useState } from "react";
import {
  Card,
  Text,
  Container,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Input,
  Divider,
  ButtonGroup,
  Button,
  Highlight,
  Box,
  InputGroup,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const UserState = ["Student","Instructor","Advisor"]
  const UserStateTabs = UserState.map((user,i) => <Tab key={i}>{user}</Tab>)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [prevlogin, setPrevlogin] = useState(false);
  const [optionState, setOptionState] = useState("Email");
  const [userState, setUserState] = useState(UserState[0]);

  useEffect(() => {
    if (localStorage.getItem("login")) {
      setPrevlogin(true);
    }
  }, []);

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    let userType= 0;
    if(userState === UserState[1]) userType = 1;
    else if(userState === UserState[2]) userType = 2;
    let body = { email: email,usertype : userType };
    const res = await axios.post("http://localhost:5000/api/login", {
      data: body,
    });
    if (res.data.success) {
      setOptionState("OTP");

      // navigate("/home");
      // localStorage.setItem("login", `${email}`);
    } else {
      alert("This user does not exists!");
      navigate("/");
      setEmail("");
      setOtp("");
    }
  };
  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    let body = { otp: otp };
    const res = await axios.post("http://localhost:5000/api/otp", {
      data: body,
    });
    if (res.data.success) {
      // setOptionState('OTP')
      if(userState === UserState[0]) 
      navigate("/homeStudent", { state: { email: email } });
      else if(userState === UserState[1])
      navigate("/homeInstructor", { state: { email: email } });
      else 
      navigate("/homeAdvisor", { state: { email: email } });
      localStorage.setItem("login", `${email}`);
    } else {
      alert("Wrong OTP entered!");
      navigate("/");
      // setEmail("");
      setOtp("");
    }
  };

  const handlePasswordChange = (e) => {
    setOtp(e.target.value);
  };
  const handleContinue = () => {
    alert(`logging in as ${localStorage.getItem("login")} `);
    navigate("/home", { state: { email: email } });
  };

  const inputOption =
    optionState === "Email" ? (
      <Input
        placeholder={`Enter email of ${userState}`}
        type="email"
        value={email}
        onChange={handleUsernameChange}
        backgroundColor={"white"}
      />
    ) : (
      <Input
        pr="4.5rem"
        placeholder="Enter OTP"
        value={otp}
        onChange={handlePasswordChange}
        backgroundColor={"white"}
      />
    );

  const buttonOption =
    optionState === "Email" ? (
      <Button variant="solid" colorScheme="blue" onClick={handleEmailSubmit}>
        {"Login"}
      </Button>
    ) : (
      <>
        {/* <Button variant="solid" colorScheme="blue" onClick={() => setOptionState('Email')}>
        {"Prev"}
      </Button> */}
        <Button variant="solid" colorScheme="blue" onClick={handleOTPSubmit}>
          {"Verify"}
        </Button>
      </>
    );
  return (
    <>
      <Container mt={12}>
        <Divider />
        <Card maxW="sm" margin={"auto"}>
          <CardBody backgroundColor={"#8DCBE6"}>
            <Image
              src="https://qph.cf2.quoracdn.net/main-qimg-931e2ae90300fef481552c51ec1b659c-lq"
              alt="Hostel"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Tabs
                isFitted
                variant="enclosed"
                onChange={index => setUserState(UserState[index])}
              >
                <TabList mb="1em">
                  {UserStateTabs}
                </TabList>
              </Tabs>
              {inputOption}

              {/* <Heading>{success? "SUCCESS":"INVALID CREDENTIALS"}</Heading> */}
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2" margin={"auto"}>
              {buttonOption}
            </ButtonGroup>
          </CardFooter>
        </Card>
        <Box maxW="x1">
          <Heading lineHeight="tall" fontFamily={"Montserrat"} size="sm">
            <Highlight
              query={["G10", "Amit", "Ankit", "Nishant", "Pragat"]}
              styles={{ px: "2", rounded: "full", bg: "blue.100" }}
            >
              Group ID G10
            </Highlight>
            <br />
            <Highlight
              query={[
                "2020csb1070",
                "2020csb1072",
                "2020csb1102",
                "2020csb1109",
              ]}
              styles={{ px: "2", rounded: "full", bg: "blue.100" }}
            >
              Amit Kumar [2020csb1070], Ankit Sharma [2020csb1072], Nishant
              Sharma [2020csb1102], Pragat Sharma [2020csb1109]
            </Highlight>
          </Heading>
        </Box>
      </Container>
    </>
  );
}
