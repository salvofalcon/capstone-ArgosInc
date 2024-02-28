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
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconColorSwatch } from "@tabler/icons-react";
import classes from "./FoodLookup.module.css";

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
                  {foodItem.name}

                  <Button radius="xl">Add Food</Button>
                </div>
              </Paper>
            ))}
          </div>
        )}
      </>
    );
  }
}
