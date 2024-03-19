import { Component } from "react";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Title,
  Center,
  Container,
  ThemeIcon,
  rem,
  Modal,
} from "@mantine/core";
import classes from "./FoodLookup.module.css";
import { FoodModal } from "../FoodModal/FoodModal";

export default class FoodLookup extends Component<
  object,
  { food: any; submitted: any; foodItems: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      food: "",
      submitted: false,
      foodItems: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    const { food } = this.state;
    console.log(food);
    fetch("http://localhost:5000/search-food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: food }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.foods && Array.isArray(data.foods)) {
          this.setState({ foodItems: data.foods, submitted: true });
        } else {
          console.error(
            "Data is not in the expected format (missing or invalid 'foods' array).",
            data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
    const { submitted, foodItems } = this.state;
    return (
      <>
        <Paper radius="md" p="xl" withBorder>
          <Center>
            <Text size="lg" fw={500}>
              Search for your food
            </Text>
          </Center>

          <Divider my="lg" />

          <form onSubmit={this.handleSubmit}>
            <Stack>
              <div>
                <TextInput
                  placeholder="Your food"
                  onChange={(e) =>
                    this.setState({
                      food: e.target.value,
                    })
                  }
                  radius="md"
                />
              </div>

              <Button type="submit" radius="xl">
                Submit
              </Button>
            </Stack>
          </form>
        </Paper>

        {submitted && (
          <div>
            <Text p="md">Search Results</Text>
            {foodItems.map((foodItem: any, index: any) => (
              <Paper
                radius="md"
                m="lg"
                p="xl"
                withBorder
                key={index}
                className={classes.card}
              >
                <div className={classes.container}>
                  <Text>{foodItem.name}</Text>
                  <FoodModal
                    title={foodItem.name}
                    servingsData={foodItem.servings.reduce(
                      (uniqueServings: any, serving: any) => {
                        // Check if the serving name is not already in the array
                        if (
                          !uniqueServings.some(
                            (s: any) => s.value === serving.name
                          )
                        ) {
                          // Add the serving name to the array
                          uniqueServings.push({
                            value: serving.name,
                            scale: serving.scale,
                          });
                        }
                        // Return the array
                        return uniqueServings;
                      },
                      []
                    )}
                    calories={Math.round(foodItem.nutrients.energy / 4.184)}
                    scale={1}
                    carbs={foodItem.nutrients.totalCarbs}
                    fat={foodItem.nutrients.fat}
                    protein={foodItem.nutrients.protein}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text size="xs" style={{ marginRight: "8px" }}>
                    {Math.round(foodItem.nutrients.energy / 4.184)} cal{", "}
                    {foodItem.defaultServing.name}
                    {", "}
                    {foodItem.brand.name}
                  </Text>
                </div>
              </Paper>
            ))}
          </div>
        )}
      </>
    );
  }
}
