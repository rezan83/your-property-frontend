import { Anchor, Nav } from "grommet";
import { Home as HomeIcone } from "grommet-icons";
import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <Nav
        as="nav"
        fill
        width="100%"
        direction="row"
        background="brand"
        pad="small"
      >
        <Link href="/">
          <Anchor icon={<HomeIcone />} hoverIndicator />
        </Link>
      </Nav>
    </>
  );
};

export default NavBar;
