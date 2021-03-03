import { Footer } from "./footer.model";
import { Navbar } from "../../models/navbar.model";
import { Sidebar } from "./sidebar.model";

export interface LandingpageConfig {
  navbar: Navbar;
  footer: Footer;
  routes: string[];
}
