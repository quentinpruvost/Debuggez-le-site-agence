/* eslint-disable no-return-assign */
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./_menu.scss";

const Menu = () => (
  <nav data-testid="logo-svg" >
    <Logo  />
    <ul>
      <li>
        <a href="#nos-services" data-testid="link-nos-services" >Nos services</a>
      </li>
      <li>
        <a href="#nos-realisations" data-testid="link-nos-realisations" >Nos réalisations</a>
      </li>
      <li>
        <a href="#notre-equipe" data-testid="link-notre-equipe" >Notre équipe</a>
      </li>
    </ul>
    <Button title="contact" data-testid="link-contact" onClick={() => (window.document.location.hash = "#contact")}  >
      Contact
    </Button>
  </nav>
);

export default Menu;
