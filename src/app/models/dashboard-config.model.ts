import { Footer } from "./footer.model";
import { Navbar } from "./navbar.model";

export interface DashboardConfig {
  navbar: Navbar;
  footer: Footer;
  routes: string[];
}

