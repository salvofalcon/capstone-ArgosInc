import { Component } from "react";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import { Link } from "react-router-dom";

export default class Login extends Component<
  object,
  { email: any; password: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "OK") {
          //alert("Login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", "true");

          if (data.bmrCalculated) { 
          window.location.href = "./dashboard";
          } else {
            window.location.href = "/bmr-calculator";
          }
        } else {
          alert("Login failed, please try again");
        }
      });
  }

  render() {
    return (
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Nutribuddy, please login
        </Text>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Text c="dimmed" size="xs" ta="center" mt={5}>
            Do not have an account yet?{" "}
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Text>
        </Link>

        <Divider my="lg" />

        <form onSubmit={this.handleSubmit}>
          <Stack>
            <div>
              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
                onChange={(e) =>
                  this.setState({
                    email: e.target.value,
                  })
                }
                radius="md"
              />
            </div>

            <div>
              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                onChange={(e) =>
                  this.setState({
                    password: e.target.value,
                  })
                }
                radius="md"
              />
            </div>

            <Group justify="space-between" mt="xl">
              <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                <Anchor component="button" type="button" c="dimmed" size="xs">
                  Forgot Password?
                </Anchor>
              </Link>
              <Button
                style={{ backgroundColor: "#22B37B" }}
                type="submit"
                radius="xl"
              >
                Submit
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    );
  }
}