interface ModuleBase {
  logoPath?: string;
  navigation: Navigation[];
}

export interface Module {
  navbar: Navbar;
  sidabar: Sidebar;
  footer: Footer;
  authenticate: boolean;
  defaultRoute: string;
  routes: PageRoute[];
}

export interface Navbar extends ModuleBase {
}
export interface Sidebar extends ModuleBase {
}
export interface Footer extends ModuleBase { }
export interface PageRoute {
  path: string;
  authenticate: boolean;
}

interface NavigationBase {
  id: string;
  translate: string;
  type: 'item' | 'group' | 'collapsable';
  icon: string;
  url: string;
  hidden: boolean;
}

export interface Navigation extends NavigationBase {
  classes: string;
  exactMatch: boolean;
  externalUrl: boolean;
  openInNewTab: boolean;
  function: unknown;
  badge: {
    title: string;
    translate: string;
    bg: string;
    fg: string;
  };
  children: NavigationItem[];
}

export interface NavigationItem extends NavigationBase { }

// AVAIABLE MODULES

export type DashboardConfig = Module;
export type PublicConfig = Omit<Module, 'sidebar'>;

