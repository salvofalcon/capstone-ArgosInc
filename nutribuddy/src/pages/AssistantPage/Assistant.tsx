
import { HeaderMegaMenu } from "../../components/HeaderMegaMenu/HeaderMegaMenu";
import { Paper } from '@mantine/core';
import { AppShell } from "@mantine/core";


const AIAssistant: React.FC = () => {
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

      </AppShell>

      <Paper shadow="sm" radius="md" p="lg" withBorder style={{ marginTop: 60 }}>
        <iframe
          id="SRDAHUOLZX"
          loading="eager"
          src="https://embed.pickaxeproject.com/axe?id=NutriBuddy_AI_OQQJF&mode=embed_gold&host=beta&theme=light&opacity=100&font_header=Real+Head+Pro&size_header=30&font_body=Real+Head+Pro&size_body=16&font_labels=Real+Head+Pro&size_labels=14&font_button=Real+Head+Pro&size_button=16&c_fb=FFFFFF&c_ff=FFFFFF&c_fbd=888888&c_bb=228DD7&c_bt=FFFFFF&c_t=000000&s_ffo=100&s_bbo=100&s_f=minimalist&s_b=filled&s_t=2&s_r=2"
          width="100%"
          height="500px"
          onMouseOver={(e: React.MouseEvent<HTMLIFrameElement, MouseEvent>) => (e.currentTarget.style.boxShadow = '0px 6px 6px -3px rgba(0,0,0,0.1)')}
          onMouseOut={(e: React.MouseEvent<HTMLIFrameElement, MouseEvent>) => (e.currentTarget.style.boxShadow = 'none')}
          style={{
            border: '1px solid rgba(0, 0, 0, 0.1)',
            transition: '.3s',
            borderRadius: '4px',
          }}
          frameBorder="0"
        ></iframe>



      </Paper>
    </>
  );
};

export default AIAssistant