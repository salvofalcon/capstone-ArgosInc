import "./App.css";
import { HeaderMegaMenu } from "./components/HeaderMegaMenu/HeaderMegaMenu";
import { HeroTitle } from "./components/HeroTitle/HeroTitle";
import { AppShell } from "@mantine/core";

function App() {
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        /*
        navbar={{
          width: 300,
          breakpoint: "sm",
          //collapsed: { mobile: !opened },
        }}
        */
        padding="md"
      >
        <AppShell.Header>
          <HeaderMegaMenu />
        </AppShell.Header>

        {/*<AppShell.Navbar p="md">Navbar</AppShell.Navbar>*/}

        <AppShell.Main>
          <HeroTitle />
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default App;
