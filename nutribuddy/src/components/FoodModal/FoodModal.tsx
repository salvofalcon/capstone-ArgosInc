import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Select, Stack, NumberInput } from "@mantine/core";
import classes from "./FoodModal.module.css";

type ModalProps = {
  title: string;
  servingsData: any;
  calories: any;
  //carbs: any;
  //fat: any;
  //protein: any;
};

export function FoodModal(props: ModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={classes.container}>
      <Modal opened={opened} onClose={close} title={props.title} centered>
        <Stack>
          <Select
            label="Serving Size"
            placeholder="Pick value"
            data={props.servingsData}
          />

          <NumberInput label="Number of Servings" placeholder="1" />

          <Select
            label="Meal"
            placeholder="Select a Meal"
            data={["Breakfast", "Lunch", "Dinner", "Snacks"]}
          />

          {/* Need to pass calories and update based on serving size selected */}

          <Button>Add Food</Button>
        </Stack>
      </Modal>

      <Button onClick={open} radius="xl">
        Add Food
      </Button>
    </div>
  );
}
