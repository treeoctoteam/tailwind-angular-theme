import { Navigation } from "@angular/router";

interface LayoutBase {
  logoPath?: string;
  navigation: Navigation[];
}

export interface Layout {
  navbar: Navbar;
  sidabar: Sidebar;
  footer: Footer;
  routes: string[];
}

export interface Navbar extends LayoutBase {}
export interface Sidebar extends LayoutBase {}
export interface Footer extends LayoutBase {}

export type DashboardConfig = Layout;
export type LandingPageConfig = Omit<Layout, 'sidebar'>;
export type WorkflowConfig = Layout;


