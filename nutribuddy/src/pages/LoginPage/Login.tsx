import { AppShell, Center, Title } from "@mantine/core";
import { HeaderMegaMenu } from "../../components/HeaderMegaMenu/HeaderMegaMenu";
import classes from "./Login.module.css";
import LoginComponent from "../../components/Login/Login.component";
import { Footer } from "../../components/Footer/Footer";

export function Login() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <HeaderMegaMenu />
      </AppShell.Header>

      <AppShell.Main>
        <Center>
          <LoginComponent />
        </Center>
      </AppShell.Main>

      <Footer />
    </AppShell>
  );
}
