import { DarkMode, IconButton, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  BoltIcon,
  NetworkIcon,
  SettingsIcon,
  WindowIcon,
} from "@/components/base";
import { sessionContext } from "@/tools/session";

const MenuApps = () => {
  const { isAuthenticated } = useContext(sessionContext);

  return (
    isAuthenticated() && (
      <DarkMode>
        <Stack bg="black" direction="row">
          <IconButton
            as={Link}
            variant="ghost"
            boxSize={8}
            icon={<BoltIcon />}
            title="Ações"
            to="/widgets"
          />
          <IconButton
            as={Link}
            variant="ghost"
            boxSize={8}
            icon={<WindowIcon />}
            title="Mobilizações"
            to="/mobilizations"
          />
          <IconButton
            as={Link}
            variant="ghost"
            boxSize={8}
            icon={<SettingsIcon />}
            title="Comunidade"
            to="/communities"
          />
          <IconButton
            as={Link}
            variant="ghost"
            boxSize={8}
            icon={<NetworkIcon />}
            title="Redes"
            to="/redes"
          />
        </Stack>
      </DarkMode>
    )
  );
};

export default MenuApps;
