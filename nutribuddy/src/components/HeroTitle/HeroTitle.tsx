import { Container, Text, Button, Group } from "@mantine/core";
import { GithubIcon } from "@mantinex/dev-icons";
import classes from "./HeroTitle.module.css";

export function HeroTitle() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            fully featured
          </Text>{" "}
          calorie counter and AI assistant tool
        </h1>

        <Text className={classes.description} color="dimmed">
          Keep track of your daily calorie intake and reach your fitness goals
          with ease – Nutribuddy includes all of your favorite foods and
          provides you with daily goals and an AI assistant to keep you on track
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
          >
            Get started
          </Button>

          <Button
            component="a"
            href="https://github.com/salvofalcon/capstone-ArgosInc"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<GithubIcon size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}
