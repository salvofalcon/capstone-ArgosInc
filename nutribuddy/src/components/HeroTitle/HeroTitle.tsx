import {
  Container,
  Text,
  Button,
  Group,
  Title,
  TextInput,
} from "@mantine/core";
import { GithubIcon } from "@mantinex/dev-icons";
import classes from "./HeroTitle.module.css";
import videoBackground from "./8dBcwut4lk.mp4";
import image from "./wy2Xe4yPYlG.jpg";

export function HeroTitle() {
  return (
    <div className={classes.wrapper}>
      <video autoPlay muted loop className={classes.videoBackground}>
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "teal", to: "green" }}
            inherit
          >
            fully featured
          </Text>{" "}
          calorie counter and AI assistant tool
        </h1>

        <Text className={classes.description} fw={700}>
          Keep track of your daily calorie intake and reach your fitness goals
          with ease – Nutribuddy includes all of your favorite foods and
          provides you with daily goals and an AI assistant to keep you on track
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "teal", to: "green" }}
            component="a"
            href="/signup"
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

      <div className={classes.wrapper2}>
        <div className={classes.body2}>
          <Title className={classes.title2} pb="xl">
            Healthy Living
          </Title>
          {/* <Text fw={500} fz="lg" mb={5}>
            Healthy Living
          </Text> */}
          <Text fz="md">
            Our Diet & Nutrition services are designed to help you achieve a
            healthier lifestyle. Our experienced developers are well-versed in
            the latest nutritional science and can provide you personalized meal
            tracking and an AI assistant. Whether you're looking to lose weight,
            manage a medical condition, or simply improve your overall health,
            we're here to guide you. We also offer comprehensive weight
            management programs, tailored to your unique needs and goals. Let us
            help you on your journey to better health.
          </Text>
        </div>
        <img src={image} className={classes.image2} />
      </div>

      <div className={classes.wrapper}>
        <div className={classes.body2}>
          <Container p="xl">
            <Title className={classes.title2} p="xl">
              Placeholder
            </Title>
            <Text fz="md">
              We offer a comprehensive range of services in the Diet & Nutrition
              industry, tailored to meet individual needs and promote healthy
              living.
            </Text>
          </Container>
        </div>
      </div>
    </div>
  );
}
