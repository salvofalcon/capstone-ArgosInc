// src/pages/Dashboard/Dashboard.tsx

import React, { useState, useEffect } from "react";
import { Button, AppShell, Container, Text, RingProgress, Title, Paper } from '@mantine/core';
import { HeaderMegaMenu } from "../../components/HeaderMegaMenu/HeaderMegaMenu";  // Adjust the path as necessary
import { Link } from "react-router-dom";

interface DashboardProps {
  // Props definition if needed
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  const [calorieGoal, setCalorieGoal] = useState(-1000000); // Replace with real goal
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [caloriesRemaining, setCaloriesRemaining] = useState(0);

  const fetchUserData = async () => {
    try {
      const token = window.localStorage.getItem("token"); // Assuming token is stored in localStorage
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:5000/userData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const userData = await response.json();
      setCalorieGoal(userData.data.userCalorieGoal); // Update state with fetched calorie goal
    } catch (error) {
      console.error("Failed to fetch user data: ", error);
    }
  };

  const fetchCalorieData = async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:5000/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const foodData = await response.json();
      const selectedDate = new Date();
      const entriesForSelectedDate = foodData.data.entries.filter(
        (entry: { date: string | number | Date }) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getFullYear() === selectedDate.getFullYear() &&
            entryDate.getMonth() === selectedDate.getMonth() &&
            entryDate.getDate() === selectedDate.getDate()
          );
        }
      );

      const totalCalories = entriesForSelectedDate.reduce(
        (acc: number, entry: { calories: number }) => acc + entry.calories,
        0
      );

      setCaloriesConsumed(totalCalories);
    } catch (error) {
      console.error("Failed to fetch user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchCalorieData();
  }, []);

  useEffect(() => {
    setCaloriesRemaining(calorieGoal - caloriesConsumed);
  }, [calorieGoal, caloriesConsumed]);

  const progress = (caloriesConsumed / calorieGoal) * 100;

  const titleStyle = {
    fontSize: "3rem", // Make title bigger
    fontWeight: 700,
    color: "#19c26b", // Use a custom color for the title
    margin: "20px 0",
  };

  const textStyle = {
    fontSize: "1.5rem", // Increase the font size for text
    color: "white", // Slightly darker text for better readability
    margin: "white", // Add more vertical space between text elements
  };

  const buttonStyle = {
    marginTop: "30px", // Increase space above the button
    fontSize: "1.25rem", // Larger button text
  };

  const navigateToFoodDiary = () => {
    // Logic to navigate to the food diary page will go here
    console.log("Navigate to the food diary page");
  };

  return (
    <AppShell
      header={{
        height: 60,
      }}
      padding="md"
    >
      <AppShell.Header>
        <HeaderMegaMenu />
      </AppShell.Header>

      <Container
        size="lg"
        mt="md"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Paper
          shadow="sm"
          radius="md"
          p="lg"
          withBorder
          style={{ marginTop: 10 }}
        >
          <Title style={titleStyle}>Your Dashboard</Title>
          <Text style={textStyle}>Calorie Goal: {Math.floor(calorieGoal)}</Text>
          <Text style={textStyle}>
            Calories Consumed: {Math.floor(caloriesConsumed)}
          </Text>
          <Text style={textStyle}>
            Calories Remaining: {Math.floor(caloriesRemaining)}
          </Text>
          <RingProgress
            sections={[{ value: progress, color: "#19c26b" }]}
            label={
              <Text color="#19c26b" size="xl" style={{ textAlign: "center" }}>
                {`${Math.round(progress)}%`}
              </Text>
            }
            size={200}
            thickness={8}
            roundCaps={true}
          />
        </Paper>
        <Link to="/foodLookup">
          <Button
            style={buttonStyle}
            onClick={navigateToFoodDiary}
            variant="filled"
            color="#19c26b"
          >
            Log Meals
          </Button>
        </Link>
      </Container>
    </AppShell>
  );
};

export default Dashboard;
