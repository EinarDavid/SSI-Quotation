import React from "react";
import { Html } from '@react-email/html';
import { Heading } from '@react-email/heading';
import { Text } from '@react-email/text';

export const Email = () => {
  return (
    <Html lang="en">
      <Heading as="h2">Lorem ipsum</Heading>
      <Text>Lorem ipsum</Text>
    </Html>
  );
};
