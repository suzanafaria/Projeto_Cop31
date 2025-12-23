import Sidebar from "./Sidebar";
import Menu from "./Menu";
import Footer from "./Footer";
import { Box } from "@mui/material";

const SIDEBAR_WIDTH = 240;
const NAVBAR_HEIGHT = 64;
const FOOTER_HEIGHT = 56;

export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar width={SIDEBAR_WIDTH} />
      <Box
        sx={{
          marginLeft: `${SIDEBAR_WIDTH}px`,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Menu
          width={`calc(100% - ${SIDEBAR_WIDTH}px)`}
          height={NAVBAR_HEIGHT}
        />
        <Box
          sx={{
            marginTop: `${NAVBAR_HEIGHT}px`,
            marginBottom: `${FOOTER_HEIGHT}px`,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            overflowY: "auto",
            padding: 3,
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
