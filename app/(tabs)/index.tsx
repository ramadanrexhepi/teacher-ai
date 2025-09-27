import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  // Send user directly to LoadingScreen on startup
  return <Redirect href="/screens/LoadingScreen" />;
}
