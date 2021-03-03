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
  function: any;
  badge: {
    title: string;
    translate: string;
    bg: string;
    fg: string;
  };
  children: NavigationItem[];
}

export interface NavigationItem extends NavigationBase {}
