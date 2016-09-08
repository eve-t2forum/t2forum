export interface RuleFile {
  rules: {[num:number]: Rule};
  title: string;
  url: string;
}

export interface Rule {
  headline: string;
  details?: string;
}
