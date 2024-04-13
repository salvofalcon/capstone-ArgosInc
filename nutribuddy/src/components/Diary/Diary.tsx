import React, { Component, ReactNode } from "react";
import { Button, Center, Paper, Stack } from "@mantine/core";
import { DatePicker } from "../DatePicker/DatePicker";
import { rem } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";

export default class Diary extends Component<
  object,
  { userData: any; selectedDate: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      userData: "",
      selectedDate: new Date(),
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

  //   renderEntries = () => {
  //     if (this.state.userData.entries && this.state.userData.entries.length > 0) {
  //       for (let i = 0; i < this.state.userData.entries.length; i++) {
  //         // Extract foodName from the first entry
  //         const foodName = this.state.userData.entries[i].foodName;
  //         const dateNeeded = this.state.userData.entries[i].date;
  //         //Transform the date to match selected date
  //         const dateSelected = new Date(this.state.selectedDate);
  //         const neededDate = new Date(this.state.userData.entries[i].date);
  //         const dateSelectedTransformed = new Date(
  //           dateSelected.getFullYear(),
  //           dateSelected.getMonth(),
  //           dateSelected.getDate()
  //         );

  //         const dateNeededTransformed = new Date(
  //           neededDate.getFullYear(),
  //           neededDate.getMonth(),
  //           neededDate.getDate()
  //         );
  //         console.log("DATE SELECTED: " + dateSelectedTransformed);
  //         console.log("DATE NEEDED: " + dateNeededTransformed);
  //         //NEED TO LOOP THROUGH ALL ENTRIES TO COMPARE DATE AND RENDER ON MATCH
  //         //ALSO NEED TO EVENTUALLY SORT BY BREAKFAST, LUNCH, DINNER, SNACKS
  //         //WILL ALSO NEED TO DISPLAY CALORIES/MACROS
  //         //AND ADD A BUTTON TO SEARCH FOR MORE FOOD
  //         if (
  //           dateSelectedTransformed.getMonth() ==
  //             dateNeededTransformed.getMonth() &&
  //           dateSelectedTransformed.getFullYear() ==
  //             dateNeededTransformed.getFullYear() &&
  //           dateSelectedTransformed.getDate() == dateNeededTransformed.getDate()
  //         ) {
  //           console.log("THEY ARE EQUAL");
  //           return (
  //             <>
  //               Food Name<h1>{foodName}</h1>
  //               Date Needed<h1>{dateNeeded}</h1>
  //             </>
  //           );
  //         }
  //       }
  //       return <>No entries for this day</>;
  //     } else {
  //       return <h1>No entries found</h1>;
  //     }
  //   };

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
              {/* Render other fields of the entry here */}
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
              {/* Render other fields of the entry here */}
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

  handleDateChange = (date: Date | null) => {
    this.setState({ selectedDate: date });
    //console.log(date?.toISOString());
  };

  render(): React.ReactNode {
    const icon = (
      <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    );
    return (
      <>
        <Paper shadow="sm" radius="md" p="lg">
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
          <Stack>
            <Paper withBorder p="lg" mt="lg">
              <h2>Breakfast</h2>
              {this.renderBreakfastEntries()}
              <Button color="green" variant="transparent" radius="lg">
                Add Food
              </Button>
            </Paper>

            <Paper withBorder p="lg" mt="lg">
              <h2>Lunch</h2>
              {this.renderLunchEntries()}
              <Button color="green" variant="transparent" radius="lg">
                Add Food
              </Button>
            </Paper>

            <Paper withBorder p="lg" mt="lg">
              <h2>Dinner</h2>
              {this.renderLunchEntries()}
              <Button color="green" variant="transparent" radius="lg">
                Add Food
              </Button>
            </Paper>

            <Paper withBorder p="lg" mt="lg">
              <h2>Snacks</h2>
              {this.renderLunchEntries()}
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
        </Paper>
      </>
    );
  }
}
