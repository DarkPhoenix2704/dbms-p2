import { Heading, Button } from "@chakra-ui/react";
import React from "react";
import { BaseLayout } from "../../layout";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  return (
    <BaseLayout>
      <Heading fontFamily="Poppins" textColor="white">
        404
      </Heading>
      <Button
        marginBlockStart="16px"
        width="250px"
        backgroundColor="white"
        fontSize="18px"
        fontWeight="medium"
        height="45px"
        transition=".5s all ease"
        _hover={{
          boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.15)",
          backgroundColor: "rgba(120,119,198,1)",
          textColor: "white",
        }}
        _active={{
          textColor: "white",
          background: "rgba(120,119,198,0.8)",
          boxShadow: "0px 8px 16px rgba(56,255,56,0.1)",
          backdropFilter: "blur(25px)",
        }}
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </BaseLayout>
  );
};

export default Error;
