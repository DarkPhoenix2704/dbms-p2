import React from "react";
import { VStack } from "@chakra-ui/react";

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <VStack background="rgb(0, 2, 18)" height="100vh" width="100vw">
      <VStack
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100vw"
        background="radial-gradient(ellipse 80% 50% at 50% 50%,rgba(56,255,56,0.1),rgba(255,255,255,0))"
      >
        {children}
      </VStack>
    </VStack>
  );
};

interface BaseLayoutProps {
  children: React.ReactNode;
}
export default BaseLayout;
