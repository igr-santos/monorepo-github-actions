import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useContext } from "react";

import { ArrowDownIcon } from "@/components/base";
import { sessionContext } from "@/tools/session";

const MenuSession = () => {
  const { login, session, isAuthenticated, logout } =
    useContext(sessionContext);

  return isAuthenticated() ? (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            variant="ghost"
            isActive={isOpen}
            as={Button}
            rightIcon={<ArrowDownIcon />}
          >
            {session.data?.firstName}
          </MenuButton>
          <MenuList bg="white">
            <MenuItem>Atualizar informações</MenuItem>
            <MenuItem onClick={() => logout()}>Sair</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  ) : (
    <Button
      onClick={() => {
        login(
          import.meta.env.VITE_LOGIN_USER,
          import.meta.env.VITE_LOGIN_PASS
        ).catch(() => {
          console.log("falha ao fazer login");
        });
      }}
    >
      Login
    </Button>
  );
};

export default MenuSession;
