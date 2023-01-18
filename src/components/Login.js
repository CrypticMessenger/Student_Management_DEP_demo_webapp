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
        backgroundColor={'white'}
      />
    ) : (
      <Input
        pr="4.5rem"
        placeholder="Enter Password"
        value={otp}
        onChange={handlePasswordChange}
        backgroundColor={'white'}
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
    <Container mt={12}>
      {prevlogin && (
        <Button variant="solid" colorScheme="blue" onClick={handleContinue}  mb={8} ml={'25%'} >
          Continue previous account
        </Button>
      )}
      <Divider />
      <Card maxW="sm" margin={'auto'}>
        <CardBody backgroundColor={'#8DCBE6'}>
          <Image
            src='https://qph.cf2.quoracdn.net/main-qimg-931e2ae90300fef481552c51ec1b659c-lq'
            alt='Hostel'
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" margin={'auto'} fontFamily={'Montserrat'}>Login</Heading>
            {inputOption}

            {/* <Heading>{success? "SUCCESS":"INVALID CREDENTIALS"}</Heading> */}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
        <ButtonGroup spacing='2' margin={'auto'}>
            {buttonOption}
          </ButtonGroup>
        </CardFooter>
      </Card>
      </Container>
    </>
  );
}
