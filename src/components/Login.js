import { React, useEffect, useState } from "react";
import {
  Card,
  Text,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Input,
  Divider,
  ButtonGroup,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [prevlogin, setPrevlogin] = useState(false);
  const [optionState, setOptionState] = useState('Email');
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

    let body = { email: email };
    const res = await axios.post("http://localhost:5000/api/login", {
      data: body,
    });
    if (res.data.success) {
      setOptionState('OTP')

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
      navigate("/home",{state:{email:email}});
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
    navigate("/home",{state:{email:email}});
  };

  
  const inputOption =
    optionState === 'Email' ? (
      <Input
        placeholder="Enter email"
        type="email"
        value={email}
        onChange={handleUsernameChange}
      />
    ) : (
      <Input
        pr="4.5rem"
        placeholder="Enter Password"
        value={otp}
        onChange={handlePasswordChange}
      />
    );

  const buttonOption =
    optionState === 'Email' ? (
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
      {prevlogin && (
        <Button variant="solid" colorScheme="blue" onClick={handleContinue}>
          "continue previous account"
        </Button>
      )}
      <Divider />
      <Card maxW="sm" align="center">
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Login</Heading>
            {inputOption}

            {/* <Heading>{success? "SUCCESS":"INVALID CREDENTIALS"}</Heading> */}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            {buttonOption}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}
