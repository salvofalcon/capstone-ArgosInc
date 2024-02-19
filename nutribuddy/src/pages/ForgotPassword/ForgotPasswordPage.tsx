import { AppShell } from "@mantine/core";
import { HeaderMegaMenu } from "../../components/HeaderMegaMenu/HeaderMegaMenu";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword.component";

export function ForgotPasswordPage() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <HeaderMegaMenu />
      </AppShell.Header>

      <AppShell.Main m="xl">
        <ForgotPassword />
      </AppShell.Main>
    </AppShell>
  );
}
