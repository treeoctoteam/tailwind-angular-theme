import { Footer } from "./footer.model";
import { Navbar } from "../../models/navbar.model";
import { Sidebar } from "./sidebar.model";

export interface DashboardConfig {
  navbar: Navbar;
  sidabar: Sidebar;
  footer: Footer;
  routes: string[];
}

