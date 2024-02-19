import { Component } from "react";
import { TextInput, Text, Paper, Button, Title, Center } from "@mantine/core";
import { Link } from "react-router-dom";

export default class ForgotPassword extends Component<object, { email: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    const { email } = this.state;
    console.log(email);
    fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        alert(data.status);
      });
  }

  render() {
    return (
      <Center>
        <Paper radius="md" p="xl" withBorder shadow="xl">
          <Title size="1.8rem" pb="xl" pt="xl" pl="xl" pr="xl">
            Forgot Your Password?
          </Title>
          <Text lineClamp={4} ta="center" pb="xl">
            If you've forgotten your password, enter{<br />} your email address
            below. We'll email you a{<br />} link to a page where you can easily
            create a{<br />} new password.
          </Text>

          <form onSubmit={this.handleSubmit}>
            <TextInput
              required
              placeholder="Email Address"
              onChange={(e) =>
                this.setState({
                  email: e.target.value,
                })
              }
              radius="md"
            />

            <Center pt="xl">
              <Button type="submit" radius="xl">
                Submit
              </Button>
            </Center>
          </form>
        </Paper>
      </Center>
    );
  }
}
