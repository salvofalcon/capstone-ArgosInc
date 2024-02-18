import React, { Component } from "react";
import { Button, Center, Paper } from "@mantine/core";

export default class UserHome extends Component<object, { userData: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount(): void {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
        if (data.data == "token expired") {
          alert("Token expired, please log in");
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  }

  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };

  render(): React.ReactNode {
    return (
      <>
        <Paper withBorder shadow="sm" radius="md" p="lg">
          Name<h1>{this.state.userData.fname}</h1>
          Email<h1>{this.state.userData.email}</h1>
          <Center>
            <Button onClick={this.logOut}>Sign out</Button>
          </Center>
        </Paper>
      </>
    );
  }
}
