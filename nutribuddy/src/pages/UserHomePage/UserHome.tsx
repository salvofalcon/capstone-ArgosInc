import { AppShell, Title } from "@mantine/core";
import { HeaderMegaMenu } from "../../components/HeaderMegaMenu/HeaderMegaMenu";
import UserHomeComponent from "../../components/UserHome/UserHome";

export function UserHome() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <HeaderMegaMenu />
      </AppShell.Header>

      <AppShell.Main>
        <UserHomeComponent />
      </AppShell.Main>
    </AppShell>
  );
}
