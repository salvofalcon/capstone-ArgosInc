import React, { useState } from 'react';
import { Card, Text, TextInput, NumberInput, Button, Group, Container, Select } from '@mantine/core';

const BMRCalculator: React.FC = () => {
  const [height, setHeight] = useState<number | string>("");
  const [weight, setWeight] = useState<number | string>("");
  const [goal, setGoal] = useState<string | null>("");
  const [age, setAge] = useState<number | string>("");
  const [sex, setSex] = useState<string | null>(null);
  const [bmrResult, setBmrResult] = useState<number | null>(null);
  const [activityLevel, setActivityLevel] = useState<string | null>("");
  const [userCalorieGoal, setUserCalorieGoal] = useState<string | null>("");
  const [tdee, setTdee] = useState<number | null>(null);
  


  // Placeholder function for form submission

  const calculateBMR = (
    height: number,
    weight: number,
    userAge: number,
    userSex: string,
  ) => {
    // Mifflin-St Jeor Equation

    let bmr;
    if (userSex === "male") {
      bmr = 66.47 + 6.24 * weight + 12.7 * height - 6.755 * userAge;
    } else {
      bmr = 655.1 + 4.35 * weight + 4.7 * height - 4.7 * userAge;
    }

    return bmr;
  };


  const calorieGoal = (goal: string, tdee: number) => {
    const deficit = goal === '0.5' ? 250 : 500;
    return tdee - deficit;
  };



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userHeight = parseFloat(height as string);
    const userWeight = parseFloat(weight as string);
    const userAge = parseInt(age as string);

    if (!isNaN(userHeight) && !isNaN(userWeight) && !isNaN(userAge) && sex) {
      const bmr = calculateBMR(userHeight, userWeight, userAge, sex);
      setBmrResult(bmr);
      const tdee = (bmr * parseFloat(activityLevel as string));
      setTdee(tdee);
      const userCalorieGoal = goal !== null && tdee !== null ? calorieGoal(goal, tdee) : null;

      // Construct the body of user data to be sent/updated
      const body = {
        height: userHeight,
        weight: userWeight,
        age: userAge,
        sex: sex,
        bmr: bmr,
        goal: goal,
        activityLevel: activityLevel,
        userCalorieGoal: userCalorieGoal,
      };

      try {
        const response = await fetch("http://localhost:5000/complete-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            ...body,
            token: window.localStorage.getItem("token"),
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
      } catch (error) {
        console.error("There was a problem with the fetch:", error);
      }
    } else {
      console.error("Invalid input");
    }
  };

  return (
    <Container size="sm" mt="md">
      <form onSubmit={handleSubmit}>
        <NumberInput
          label="Age"
          placeholder="Your age in years"
          value={age}
          onChange={(value) => setAge(value)}
          required
        />

        <Select
          label="Sex"
          placeholder="Select your sex"
          value={sex}
          onChange={setSex}
          data={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          required
        />

        <NumberInput
          label="Height"
          placeholder="Your height in inches."
          value={height}
          onChange={setHeight}
          required
        />

        <NumberInput
          label="Weight"
          placeholder="Your weight in pounds."
          value={weight}
          onChange={setWeight}
          required
        />

        <Select
          label="How active are you?"
          placeholder="Select your activity level"
          value={activityLevel}
          onChange={setActivityLevel}
          data={[
            { value: "1.2", label: "Sedentary (little or no exercise)" },
            {
              value: "1.375",
              label: "Lightly active (light exercise/sporots 1-3 days/week)",
              // add more options if we need
            },
            { value: "1.55", label: "Moderately active (moderate exercise/sports 3-5 days/week)"},
            { value: "1.725", label: "Very active (hard exercise/sports 6-7 days a week)"},
            { value: "1.9", label: "Extra active (very hard exercise/sports & physical job)"}
          ]}
          required
        />  


        <Select
          label="Weight loss goal per week"
          placeholder="Select your goal"
          value={goal}
          onChange={setGoal}
          data={[
            { value: "0.5", label: "Lose 0.5 lbs" },
            {
              value: "1",
              label: "Lose 1 pounds",
              // add more options if we need
            },
          ]}
          required
        />

        <Button type="submit" mt="md">
          Calculate BMR and Calorie Goal
        </Button>
      </form>

      {bmrResult !== null && (
        <Card shadow="sm" padding="lg" mt="md">
          <Text>Your Basal Metabolic Rate (BMR) is:</Text>
          <Text size="lg" fw={500}>
            {bmrResult.toFixed(2)} calories/day{" "}
          </Text>
        </Card>
      )}
    </Container>
  );
};

export default BMRCalculator;
