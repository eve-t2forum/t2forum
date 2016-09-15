export interface RuleFile {
  rules: {[id: string]: Rule};
  title: string;
  url: string;
}

export interface Rule {
  headline: string;
  details?: string;
}

export interface RuleLocator {
  fileId: string;
  ruleId: string
}
