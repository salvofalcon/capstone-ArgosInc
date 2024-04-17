import React, { Component, ReactNode } from "react";
import { Button, Center, Container, Paper, Stack } from "@mantine/core";
import { DatePicker } from "../DatePicker/DatePicker";
import { rem } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";

export default class Diary extends Component<
  object,
  { userData: any; selectedDate: any; calories: number }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      userData: "",
      selectedDate: new Date(),
      calories: 0,
    };
  }
  componentDidMount(): void {
    fetch("http://localhost:5000/foodData", {
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
        console.log(data, "foodData");
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

  renderBreakfastEntries = () => {
    const { userData, selectedDate } = this.state;
    if (userData.entries && userData.entries.length > 0) {
      const entriesForSelectedDate = userData.entries.filter(
        (entry: { mealType: string; date: string | number | Date }) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getFullYear() === selectedDate.getFullYear() &&
            entryDate.getMonth() === selectedDate.getMonth() &&
            entryDate.getDate() === selectedDate.getDate() &&
            entry.mealType === "Breakfast"
          );
        }
      );

      if (entriesForSelectedDate.length > 0) {
        return entriesForSelectedDate.map(
          (
            entry: {
              calories: number;
              foodName: string | number | null | undefined;
              date:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <div key={index}>
              <h3>{entry.foodName}</h3>
              <p>Calories: {entry.calories.toFixed()}</p>
            </div>
          )
        );
      } else {
        return <p>No breakfast entries found for the selected date</p>;
      }
    } else {
      return <h2>No entries found</h2>;
    }
  };

  renderLunchEntries = () => {
    const { userData, selectedDate } = this.state;
    if (userData.entries && userData.entries.length > 0) {
      const entriesForSelectedDate = userData.entries.filter(
        (entry: { mealType: string; date: string | number | Date }) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getFullYear() === selectedDate.getFullYear() &&
            entryDate.getMonth() === selectedDate.getMonth() &&
            entryDate.getDate() === selectedDate.getDate() &&
            entry.mealType === "Lunch"
          );
        }
      );

      if (entriesForSelectedDate.length > 0) {
        return entriesForSelectedDate.map(
          (
            entry: {
              calories: number;
              foodName: string | number | null | undefined;
              date:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <div key={index}>
              <h3>Food Name: {entry.foodName}</h3>
              <p>Calories: {entry.calories.toFixed()}</p>
            </div>
          )
        );
      } else {
        return <p>No lunch entries found for the selected date</p>;
      }
    } else {
      return <h2>No entries found</h2>;
    }
  };

  renderDinnerEntries = () => {
    const { userData, selectedDate } = this.state;
    if (userData.entries && userData.entries.length > 0) {
      const entriesForSelectedDate = userData.entries.filter(
        (entry: { mealType: string; date: string | number | Date }) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getFullYear() === selectedDate.getFullYear() &&
            entryDate.getMonth() === selectedDate.getMonth() &&
            entryDate.getDate() === selectedDate.getDate() &&
            entry.mealType === "Dinner"
          );
        }
      );

      if (entriesForSelectedDate.length > 0) {
        return entriesForSelectedDate.map(
          (
            entry: {
              calories: number;
              foodName: string | number | null | undefined;
              date:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <div key={index}>
              <h3>Food Name: {entry.foodName}</h3>
              <p>Calories: {entry.calories.toFixed()}</p>
            </div>
          )
        );
      } else {
        return <p>No dinner entries found for the selected date</p>;
      }
    } else {
      return <h2>No entries found</h2>;
    }
  };

  renderSnackEntries = () => {
    const { userData, selectedDate } = this.state;
    if (userData.entries && userData.entries.length > 0) {
      const entriesForSelectedDate = userData.entries.filter(
        (entry: { mealType: string; date: string | number | Date }) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getFullYear() === selectedDate.getFullYear() &&
            entryDate.getMonth() === selectedDate.getMonth() &&
            entryDate.getDate() === selectedDate.getDate() &&
            entry.mealType === "Snacks"
          );
        }
      );

      if (entriesForSelectedDate.length > 0) {
        return entriesForSelectedDate.map(
          (
            entry: {
              calories: number;
              foodName: string | number | null | undefined;
              date:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <div key={index}>
              <h3>Food Name: {entry.foodName}</h3>
              <p>Calories: {entry.calories.toFixed()}</p>
            </div>
          )
        );
      } else {
        return <p>No snack entries found for the selected date</p>;
      }
    } else {
      return <h2>No entries found</h2>;
    }
  };

  handleDateChange = (date: Date | null) => {
    this.setState({ selectedDate: date });
    //console.log(date?.toISOString());
  };

  render(): React.ReactNode {
    const icon = (
      <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    );

    let totalCalories = 0;
    if (this.state.userData.entries && this.state.userData.entries.length > 0) {
      const { selectedDate } = this.state;
      const entriesForSelectedDate = this.state.userData.entries.filter(
        (entry: { date: string | number | Date }) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getFullYear() === selectedDate.getFullYear() &&
            entryDate.getMonth() === selectedDate.getMonth() &&
            entryDate.getDate() === selectedDate.getDate()
          );
        }
      );

      totalCalories = entriesForSelectedDate.reduce(
        (acc: number, entry: { calories: number }) => acc + entry.calories,
        0
      );
    }
    return (
      <>
        <Container>
          <Center>
            <h1>Your Food Diary</h1>
          </Center>
          <DatePickerInput
            leftSection={icon}
            leftSectionPointerEvents="none"
            label="Select date"
            placeholder="Select date"
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
          />
          <h2>Calories Consumed: {totalCalories.toFixed()}</h2>
          <Stack>
            <Paper withBorder p="lg" mt="lg">
              <h2>Breakfast</h2>
              <hr></hr>
              {this.renderBreakfastEntries()}
              <Button color="green" variant="transparent" radius="lg">
                Add Food
              </Button>
            </Paper>

            <Paper withBorder p="lg" mt="lg">
              <h2>Lunch</h2>
              <hr></hr>
              {this.renderLunchEntries()}
              <Button color="green" variant="transparent" radius="lg">
                Add Food
              </Button>
            </Paper>

            <Paper withBorder p="lg" mt="lg">
              <h2>Dinner</h2>
              <hr></hr>
              {this.renderDinnerEntries()}
              <Button color="green" variant="transparent" radius="lg">
                Add Food
              </Button>
            </Paper>

            <Paper withBorder p="lg" mt="lg">
              <h2>Snacks</h2>
              <hr></hr>
              {this.renderSnackEntries()}
              <Button color="green" variant="transparent" radius="lg">
                Add Food
              </Button>
            </Paper>
          </Stack>

          <Center>
            <Button
              style={{ backgroundColor: "#22B37B" }}
              onClick={this.logOut}
            >
              Sign out
            </Button>
          </Center>
        </Container>
      </>
    );
  }
}
