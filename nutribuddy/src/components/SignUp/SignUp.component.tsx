import { Component } from "react";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Button,
  Divider,
  Anchor,
  Stack,
  Center,
} from "@mantine/core";
import { Link } from "react-router-dom";

export default class SignUp extends Component<
  object,
  { fname: any; lname: any; email: any; password: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    const { fname, lname, email, password } = this.state;
    console.log(fname, lname, email, password);
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "OK") {
          alert("Account created successfully, please log in");
          window.location.href = "./login";
        } else {
          alert(data.error);
        }
      });
  }

  render() {
    return (
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Nutribuddy, please register
        </Text>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Text c="dimmed" size="xs" ta="center" mt={5}>
            Already have an account?{" "}
            <Anchor size="sm" component="button">
              Login
            </Anchor>
          </Text>
        </Link>

        <Divider my="lg" />

        <form onSubmit={this.handleSubmit}>
          <Stack>
            <div>
              <TextInput
                required
                label="First Name"
                placeholder="Your first name"
                onChange={(e) =>
                  this.setState({
                    fname: e.target.value,
                  })
                }
                radius="md"
              />
            </div>

            <div>
              <TextInput
                required
                label="Last Name"
                placeholder="Your last name"
                onChange={(e) =>
                  this.setState({
                    lname: e.target.value,
                  })
                }
                radius="md"
              />
            </div>

            <div>
              <TextInput
                required
                label="Email"
                placeholder="Your email"
                onChange={(e) =>
                  this.setState({
                    email: e.target.value,
                  })
                }
                radius="md"
              />
            </div>

            <div className="mb-3">
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

            <Center pt="lg">
              <Button type="submit" radius="xl">
                Sign Up
              </Button>
            </Center>
          </Stack>
        </form>
      </Paper>
    );
  }
}
