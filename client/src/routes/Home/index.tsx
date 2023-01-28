import React, { useEffect } from "react";
import { Heading, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "../../layout";
import { parseJwt } from "../../util";
const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      const parsed = parseJwt(token as string);
      if (parsed) {
        setUser(parsed);
      } else {
        localStorage.removeItem("token");
        navigate("/signin");
      }
    }
  }, []);
  return (
    <BaseLayout>
      <Heading textColor="white" fontFamily="Poppins">
        Hi <span style={{ color: "red" }}> {user ? user!.name : "Hello"}</span>
        <br />
        Welcome to TODO App
      </Heading>
      <Button
        width="250px"
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
        onClick={logout}
      >
        Logout
      </Button>
    </BaseLayout>
  );
};

export default Home;
