import { AppShell, Button, Center, Paper, Title } from "@mantine/core";
import { HeaderMegaMenu } from "../../components/HeaderMegaMenu/HeaderMegaMenu";
import UserHomeComponent from "../../components/UserHome/UserHome";
import { Footer } from "../../components/Footer/Footer";
import Diary from "../../components/Diary/Diary";

export function UserHome() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <HeaderMegaMenu />
      </AppShell.Header>

      <AppShell.Main>
        <Center>
          {/*<UserHomeComponent />*/}
          <Diary></Diary>
        </Center>
      </AppShell.Main>

      <Footer />
    </AppShell>
  );
}
