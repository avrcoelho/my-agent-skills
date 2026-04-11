import { Skill, SkillLevel } from '../../types/Skill';

const levelColors: Record<SkillLevel, string> = {
  beginner: 'bg-gray-100 text-gray-600',
  intermediate: 'bg-blue-100 text-blue-700',
  advanced: 'bg-green-100 text-green-700',
  expert: 'bg-purple-100 text-purple-700',
};

interface Props {
  skill: Skill;
}

export function SkillCard({ skill }: Props) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <span className="text-base font-semibold text-gray-800">{skill.name}</span>
      <span className="text-xs text-gray-500">{skill.category}</span>
      <span
        className={`mt-auto w-fit rounded-full px-2 py-0.5 text-xs font-medium capitalize ${levelColors[skill.level]}`}
      >
        {skill.level}
      </span>
    </div>
  );
}
