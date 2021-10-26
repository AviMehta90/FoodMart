import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StripeApp from "./StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";
export default function Payment() {
  return (
    <StripeProvider publishableKey="pk_test_51JoWJrSCEnOeXCnonSUvArYcjUAsaALfLRxEe9G5pwu1JgDJp9DyHcNxt5LBdXcwkgl74ocRnu9mXWrFQWQVb7R80059Kh9LTv">
      <StripeApp />
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
