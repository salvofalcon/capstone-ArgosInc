import React, { useState } from 'react';
import { Card, Text, TextInput, NumberInput, Button, Group, Container, Select } from '@mantine/core';

const BMRCalculator: React.FC = () => {
    const [height, setHeight] = useState<number | string>('');
    const [weight, setWeight] = useState<number | string>('');
    const [goal, setGoal] = useState<string | null>('');
    const [age, setAge] = useState<number | string>('');
    const [sex, setSex] = useState<string | null>(null);
    const [bmrResult, setBmrResult] = useState<number | null>(null);


    // Placeholder function for form submission


    const calculateBMR = (height: number, weight: number, userAge: number, userSex: string) => {
        // Mifflin-St Jeor Equation 

        let bmr;
        if (userSex === 'male') {
            bmr = 66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * userAge);
        } else {
            bmr = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * userAge);
        }
        

        return bmr;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userHeight = parseFloat(height as string);
        const userWeight = parseFloat(weight as string);
        const userAge = parseInt(age as string);

        if (!isNaN(userHeight) && !isNaN(userWeight) && !isNaN(userAge) && sex) {
            const bmr = calculateBMR(userHeight, userWeight, userAge, sex);
            setBmrResult(bmr);
        } else {
            console.error('Invalid input');
        }

        // Construct the body of user data to be sent/updated
        const body = {
            height: userHeight,
            weight: userWeight,
            age: userAge,
            sex: sex,
            bmr: bmrResult,

        };

        try {

            const response = await fetch('/completeProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

        } catch (error) {
            console.error('There was a problem with the fetch:', error);
        }

    }

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
                        {value: 'male', label: 'Male'},
                        {value: 'female', label: 'Female' }
                    ]}
                    required
                />


                <NumberInput
                    label="Height"
                    placeholder="Your height in inches."
                    value = {height}
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
                    label="Weight loss goal per week"
                    placeholder="Select your goal"
                    value={goal}
                    onChange={setGoal}
                    data={[
                        {value: '0.5', label: 'Lose 0.5 lbs' },
                        {value: '1', label: 'Lose 1 pounds',
                        // add more options if we need 
                    }
                    ]}
                    required
                />


                <Button type="submit" mt="md">Calculate BMR and Calorie Goal</Button>

            </form>

            {bmrResult !== null && (
                <Card shadow="sm" padding="lg" mt="md">
                    <Text>Your Basal Metabolic Rate (BMR) is:</Text>
                    <Text size="lg" fw={500}>{bmrResult.toFixed(2)} calories/day </Text>
                </Card>
            )}




        </Container>
    );
}

export default BMRCalculator;