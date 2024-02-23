import { AppShell, Center, Title } from "@mantine/core";
import { HeaderMegaMenu } from "../../components/HeaderMegaMenu/HeaderMegaMenu";
import classes from "./SignUp.module.css";
import SignUpComponent from "../../components/SignUp/SignUp.component";

export function SignUp() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <HeaderMegaMenu />
      </AppShell.Header>

      <AppShell.Main>
        <Center>
          <SignUpComponent />
        </Center>
      </AppShell.Main>
    </AppShell>
  );
}
