import {
  Heading,
  Box,
  FormControl,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { BaseLayout } from "../../layout";
import { delay } from "../../util";
interface Errors {
  email: boolean;
  password: boolean;
}
const Signin = () => {
  const [formError, setFormError] = React.useState<string>("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Errors>({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const createAccount = () => {
    navigate("/signup");
  };

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return setError({
        ...error,
        email: true,
      });
    }
    if (password.length < 6) {
      return setError({
        ...error,
        password: true,
      });
    }
    setLoading(true);
    try {
      api
        .post("/auth/login", {
          email,
          password,
        })
        .then(async (res) => {
          if (res.data.success) {
            localStorage.setItem("token", JSON.stringify(res.data.data));
          } else {
            setFormError(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      await delay(2000);
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <BaseLayout>
      <Box
        paddingBlock="16px"
        paddingInline={{
          base: "8px",
          md: "32px",
        }}
        borderRadius="8px"
        width={{
          base: "350px",
        }}
        backgroundColor="rgba(255, 255, 255, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.05)"
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        <Heading textColor="white" fontFamily="Poppins">
          Log In
        </Heading>
        <form>
          <FormControl
            marginBlockStart="12px"
            width="100%"
            isRequired
            label="Email"
            id="Email"
          >
            <Input
              isRequired
              type="email"
              placeholder="Enter your Email"
              disabled={loading}
              variant="filled"
              height="45px"
              fontWeight="regular"
              transition="0.3s ease-in all"
              fontSize="16px"
              backgroundColor="rgba(255,255,255,0.15)"
              textColor="white"
              fontFamily="Poppins"
              border="none"
              borderRadius="10px"
              onChange={(e) => setEmail(e.target.value)}
              _placeholder={{
                textColor: "rgba(255, 255, 255, 0.25)",
              }}
              _focus={{
                boxShadow: "0px 3px 8px rgba(56,255,56,0.1)",
                border: "1px solid rgba(56,255,56,0.1)",
              }}
              _hover={{
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
            />
            {error.email && (
              <Text
                marginBlockStart="8px"
                textColor="red.500"
                fontFamily="Poppins"
              >
                Please enter valid Email Address.
              </Text>
            )}
          </FormControl>
          <FormControl
            marginBlockStart="12px"
            width="100%"
            isRequired
            label="Password"
            id="Password"
          >
            <Input
              isRequired
              type="password"
              placeholder="Password"
              disabled={loading}
              variant="filled"
              height="45px"
              fontWeight="regular"
              transition="0.3s ease-in all"
              fontSize="16px"
              backgroundColor="rgba(255,255,255,0.15)"
              textColor="white"
              fontFamily="Poppins"
              border="none"
              borderRadius="10px"
              onChange={(e) => setPassword(e.target.value)}
              _placeholder={{
                textColor: "rgba(255, 255, 255, 0.25)",
              }}
              _focus={{
                boxShadow: "0px 3px 8px rgba(56,255,56,0.1)",
                border: "1px solid rgba(56,255,56,0.1)",
              }}
              _hover={{
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
            />
            {error.password && (
              <Text
                marginBlockStart="8px"
                textColor="red.500"
                fontFamily="Poppins"
              >
                Please enter a Valid Password.
              </Text>
            )}
          </FormControl>
          <Text>
            {formError.length > 0 && (
              <Text
                marginBlockStart="8px"
                textColor="red.500"
                fontFamily="Poppins"
              >
                {formError}
              </Text>
            )}
          </Text>
          <Button
            isLoading={loading}
            marginBlockStart="16px"
            width="100%"
            backgroundColor="white"
            fontSize="18px"
            fontWeight="medium"
            height="45px"
            transition=".5s all ease"
            _hover={{
              boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(56,255,56,0.1)",
              textColor: "white",
            }}
            _active={{
              textColor: "white",
              background: "rgba(56,255,56,0.1)",
              boxShadow: "0px 8px 16px rgba(56,255,56,0.1)",
              backdropFilter: "blur(25px)",
            }}
            onClick={login}
          >
            Login
          </Button>
          <Button
            disabled={loading}
            marginBlockStart="16px"
            width="100%"
            backgroundColor="white"
            fontSize="18px"
            fontWeight="medium"
            height="45px"
            transition=".5s all ease"
            _hover={{
              boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(56,255,56,0.1)",
              textColor: "white",
            }}
            _active={{
              textColor: "white",
              background: "rgba(56,255,56,0.1)",
              boxShadow: "0px 8px 16px rgba(56,255,56,0.1)",
              backdropFilter: "blur(25px)",
            }}
            onClick={createAccount}
          >
            Create an Account
          </Button>
        </form>
      </Box>
    </BaseLayout>
  );
};

export default Signin;
