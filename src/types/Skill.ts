export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type SkillCategory =
  | 'Frontend'
  | 'Mobile'
  | 'Backend'
  | 'Testing'
  | 'Tools';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}
