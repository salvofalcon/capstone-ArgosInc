import "./LandingPage.css";
import { HeaderMegaMenu } from "../../components/HeaderMegaMenu/HeaderMegaMenu";
import { HeroTitle } from "../../components/HeroTitle/HeroTitle";
import { AppShell } from "@mantine/core";
import { Footer } from "../../components/Footer/Footer";

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
      >
        <AppShell.Header>
          <HeaderMegaMenu />
        </AppShell.Header>

        {/*<AppShell.Navbar p="md">Navbar</AppShell.Navbar>*/}

        <AppShell.Main>
          <HeroTitle />
        </AppShell.Main>

        <Footer />
      </AppShell>
    </>
  );
}

export default App;
