// src/pages/Dashboard/Dashboard.tsx

import React, {useState, useEffect} from "react";
import { Container, Card, Text, Progress, Title, Group, Button } from '@mantine/core';
import { Plus } from 'tabler-icons-react';


interface DashboardProps {

}


export const Dashboard: React.FC<DashboardProps> = (props) => {



    // State for storing and setting user's calorie data and other relevant state
    const [calorieGoal, setCalorieGoal] = useState(5); // Replace with real goal
    const [caloriesConsumed, setCaloriesConsumed] = useState(500);
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
        
        // Let's see what the user data is
        console.log('User Data:', userData);
        console.log(userData.data.userCalorieGoal);

      } catch (error) {
        console.error('Failed to fetch user data: ', error);
      }
    };
    
    useEffect(() => {
      fetchUserData();
    }, []);

    // setCaloriesRemaining(calorieGoal - caloriesConsumed);
    // Determine the progress percentage
    const progress = (caloriesConsumed / calorieGoal) * 100;
  
    return (
      <Container size="lg" mt="md">
        <Title order={1}>Your Dashboard</Title>
        <Text>Calorie Goal: {calorieGoal}</Text>
        <Text>Calories Consumed: {caloriesConsumed}</Text>
        <Text>Calories Remaining: {caloriesRemaining}</Text>
        <Progress value={(caloriesConsumed / calorieGoal) * 100} size="xl" />

    

      </Container>
    );
  };
  
  export default Dashboard;