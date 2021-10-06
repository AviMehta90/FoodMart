import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import LoginView from "../accountlogin/Login";
import SignUpView from "../accountlogin/SignUp";

const SignUpNavigation = createStackNavigator({
  SignUp:SignUpView,
  Login: LoginView
});

 export default createAppContainer(SignUpNavigation);
