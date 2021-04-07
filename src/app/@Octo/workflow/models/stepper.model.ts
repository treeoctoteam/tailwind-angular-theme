export interface Step {
  stepId: string;
  name: string;
  icon: string;
  isCustomIcon: boolean;
  title: string;
  route: string;
  disabled: boolean;
  active: boolean;
  completed: boolean;
  params: string[];
  activeBack: boolean;
  data: any;
  sections: Section[];
}

export interface Section {
  idCode: string;
  name: string;
  hidden: boolean;
  validationRequired: boolean;
}
