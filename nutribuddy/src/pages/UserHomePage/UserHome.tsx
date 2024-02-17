import { AppShell, Title } from "@mantine/core";
import { HeaderMegaMenu } from "../../components/HeaderMegaMenu/HeaderMegaMenu";
import { useLocation } from "react-router-dom";

export function UserHome() {
  const location = useLocation();
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <HeaderMegaMenu />
      </AppShell.Header>

      <AppShell.Main>
        <Title ta="center">
          Hello {location.state.id} and welcome back to Nutribuddy!
        </Title>
      </AppShell.Main>
    </AppShell>
  );
}
