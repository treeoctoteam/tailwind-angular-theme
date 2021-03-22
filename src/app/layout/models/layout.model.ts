import { Navigation } from "./navigation.model";

interface LayoutBase {
  logoPath?: string;
  navigation: Navigation[];
}

export interface Layout {
  navbar: Navbar;
  sidabar: Sidebar;
  footer: Footer;
  authenticate: boolean;
  defaultRoute: string;
  routes: PageRoute[];
}

export interface Navbar extends LayoutBase {
}
export interface Sidebar extends LayoutBase {
}
export interface Footer extends LayoutBase { }

export type DashboardConfig = Layout;
export type LandingPageConfig = Omit<Layout, 'sidebar'>;
export type WorkflowConfig = Layout;

export interface PageRoute {
  path: string;
  authenticate: boolean;
}
