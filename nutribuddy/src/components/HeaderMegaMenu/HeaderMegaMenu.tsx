import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  Image,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import classes from "./HeaderMegaMenu.module.css";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };

  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* <MantineLogo size={30} /> */}
          <Logo />

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/foodLookup" className={classes.link}>
              Food Lookup
            </Link>
            <Link to="/" className={classes.link}>
              Food Diary
            </Link>
            <Link to="/dashboard" className={classes.link}>
              Dashboard
            </Link>
            <Link to="/assistant" className={classes.link}>
              AI Assistant
            </Link>
          </Group>

          {isLoggedIn == "true" ? (
            <Group visibleFrom="sm">
              <Button style={{ backgroundColor: "#22B37B" }} onClick={logOut}>
                Sign out
              </Button>
              <ThemeToggle />
            </Group>
          ) : (
            <Group visibleFrom="sm">
              <Link to="/login">
                <Button variant="default">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button style={{ backgroundColor: "#22B37B" }}>Sign up</Button>
              </Link>
              <ThemeToggle />
            </Group>
          )}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link to="/" className={classes.link}>
            Home
          </Link>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          {/*<Collapse in={linksOpened}>{links}</Collapse>*/}
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          {isLoggedIn == "true" ? (
            <Group visibleFrom="sm">
              <Button onClick={logOut}>Sign out</Button>
              <ThemeToggle />
            </Group>
          ) : (
            <Group justify="center" grow pb="xl" px="md">
              <Link to="/login">
                <Button variant="default">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
              <ThemeToggle />
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
