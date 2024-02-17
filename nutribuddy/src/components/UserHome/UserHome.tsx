import React, { Component } from "react";

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
      });
  }

  render(): React.ReactNode {
    return (
      <div>
        Name<h1>{this.state.userData.fname}</h1>
        Email<h1>{this.state.userData.email}</h1>
      </div>
    );
  }
}
