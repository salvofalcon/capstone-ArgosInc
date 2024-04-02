import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Text,
  Select,
  Stack,
  NumberInput,
  ComboboxItem,
  Space,
  Center,
} from "@mantine/core";
import classes from "./FoodModal.module.css";
import axios from "axios"; // Import Axios for making HTTP requests

type Serving = {
  value: string;
  scale: number;
};

type ModalProps = {
  title: string;
  servingsData: Serving[];
  calories: any;
  scale: any;
  carbs: any;
  fat: any;
  protein: any;
};

export function FoodModal(props: ModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedServing, setSelectedServing] = useState<Serving | null>(null);
  const [servingsNumber, setServingsNumber] = useState<number>(1);
  const [mealType, setMealType] = useState<string>("");

  const handleServingSelect = (value: string | null, option: ComboboxItem) => {
    if (value !== null) {
      const serving = props.servingsData.find(
        (serving) => serving.value === value
      );
      if (serving) {
        setSelectedServing(serving);
      }
    }
  };

  const handleNumServingsChange = (value: string | number) => {
    const numValue = typeof value === "string" ? parseInt(value, 10) : value;
    setServingsNumber(numValue);
  };

  const handleMealTypeChange = (value: string | null) => {
    if (value !== null) {
      setMealType(value);
    }
  };

  const handleSubmit = async () => {
    if (!selectedServing) {
      console.error("No serving selected");
      return;
    }
    if (!servingsNumber) {
      console.error("No servings number selected");
      return;
    }
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const payload = {
        entries: [
          {
            foodName: props.title,
            quantity: servingsNumber,
            mealType: mealType,
            date: new Date(),
            calories: props.calories * selectedServing.scale * servingsNumber,
            carbs: props.carbs * selectedServing.scale * servingsNumber,
            fat: props.fat * selectedServing.scale * servingsNumber,
            protein: props.protein * selectedServing.scale * servingsNumber,
          },
        ],
        token: token,
      };

      console.log("Payload: ", payload);
      const response = await axios.post(
        "http://localhost:5000/food-diary",
        payload
      );
      console.log("Response: ", response.data);
      close(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding food:", error);
      // Handle error appropriately, e.g., display error message
    }
  };

  return (
    <div className={classes.container}>
      <Modal opened={opened} onClose={close} title={props.title} centered>
        <Stack>
          <Select
            label="Serving Size"
            placeholder="Pick value"
            data={props.servingsData.map((serving: any) => serving.value)}
            onChange={handleServingSelect}
          />

          <NumberInput
            label="Number of Servings"
            placeholder="1"
            min={1}
            value={servingsNumber}
            onChange={handleNumServingsChange}
          />

          <Select
            label="Meal"
            placeholder="Select a Meal"
            data={["Breakfast", "Lunch", "Dinner", "Snacks"]}
            onChange={handleMealTypeChange}
          />

          {selectedServing && servingsNumber && (
            <Center>
              <div style={{ display: "flex" }}>
                <Text>
                  {Math.round(props.calories * selectedServing.scale) *
                    servingsNumber}{" "}
                  cal{" "}
                </Text>
                <Space w="xl"></Space>
                <Text>
                  {Math.round(props.carbs * selectedServing.scale) *
                    servingsNumber}
                  {" g Carbs "}
                </Text>
                <Space w="xl"></Space>
                <Text>
                  {Math.round(props.fat * selectedServing.scale) *
                    servingsNumber}
                  {" g Fat "}
                </Text>
                <Space w="xl"></Space>
                <Text>
                  {Math.round(props.protein * selectedServing.scale) *
                    servingsNumber}
                  {" g Protein"}
                </Text>
              </div>
            </Center>
          )}

          <Button style={{ backgroundColor: "#22B37B" }} onClick={handleSubmit}>
            Add Food
          </Button>
        </Stack>
      </Modal>

      <Button style={{ backgroundColor: "#22B37B" }} onClick={open} radius="xl">
        Add Food
      </Button>
    </div>
  );
}
