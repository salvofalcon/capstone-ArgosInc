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
import { useState } from "react";

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

  const handleServingSelect = (value: string | null, option: ComboboxItem) => {
    if (value !== null) {
      // Find the selected serving in the servingsData array
      const serving = props.servingsData.find(
        (serving) => serving.value === value
      );
      if (serving) {
        // Update the selectedServing state with the selected serving
        setSelectedServing(serving);
      }
    }
  };

  const handleNumServingsChange = (value: string | number) => {
    const numValue = typeof value === "string" ? parseInt(value, 10) : value;
    setServingsNumber(numValue);
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
          />

          {/* Display the calories based on serving scale */}
          {selectedServing && (
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

          <Button>Add Food</Button>
        </Stack>
      </Modal>

      <Button onClick={open} radius="xl">
        Add Food
      </Button>
    </div>
  );
}
