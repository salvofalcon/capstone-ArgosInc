import { AppShell, Title, Center } from "@mantine/core";
import { HeaderMegaMenu } from "../../components/HeaderMegaMenu/HeaderMegaMenu";
import FoodLookupComponent from "../../components/FoodLookup/FoodLookup.component";
import { Footer } from "../../components/Footer/Footer";

export function FoodLookup() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <HeaderMegaMenu />
      </AppShell.Header>

      <AppShell.Main m="sm">
        <FoodLookupComponent />
      </AppShell.Main>

      <Footer />
    </AppShell>
  );
}
