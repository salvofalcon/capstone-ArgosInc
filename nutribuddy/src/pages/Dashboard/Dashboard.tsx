// src/pages/Dashboard/Dashboard.tsx

import React, { useState, useEffect } from "react";
import { Container, Text, RingProgress, Title } from '@mantine/core';

interface DashboardProps {
  // Props definition if needed
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  const [calorieGoal, setCalorieGoal] = useState(-1000000); // Replace with real goal
  const [caloriesConsumed, setCaloriesConsumed] = useState(1800);
  const [caloriesRemaining, setCaloriesRemaining] = useState(0);

  const fetchUserData = async () => {
    try {
      const token = window.localStorage.getItem('token'); // Assuming token is stored in localStorage
      if (!token) throw new Error('No token found');

      const response = await fetch("http://localhost:5000/userData", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const userData = await response.json();
      setCalorieGoal(userData.data.userCalorieGoal); // Update state with fetched calorie goal

      // No need to call setCaloriesRemaining here
      // since it will be called in the useEffect below

    } catch (error) {
      console.error('Failed to fetch user data: ', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    // This useEffect will update caloriesRemaining when calorieGoal or caloriesConsumed change
    setCaloriesRemaining(calorieGoal - caloriesConsumed);
  }, [calorieGoal, caloriesConsumed]); // Dependency array

  // Determine the progress percentage
  const progress = (caloriesConsumed / calorieGoal) * 100;

  return (
    <Container size="lg" mt="md">
      <Title order={1}>Your Dashboard</Title>
      <Text>Calorie Goal: {calorieGoal}</Text>
      <Text>Calories Consumed: {caloriesConsumed}</Text>
      <Text>Calories Remaining: {caloriesRemaining}</Text>
      <RingProgress
  sections={[{ value: progress, color: 'blue' }]}
  label={
    <Text color="blue" size="xl" style={{ textAlign: 'center' }}>
      {`${Math.round(progress)}%`}
    </Text>
  }
  size={200}
  thickness={8}
  roundCaps={true}
/>
    </Container>
  );
};

export default Dashboard;
