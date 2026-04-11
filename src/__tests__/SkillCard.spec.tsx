import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SkillCard } from '../components/SkillCard';
import { Skill } from '../types/Skill';

const mockSkill: Skill = {
  id: '1',
  name: 'React',
  category: 'Frontend',
  level: 'expert',
};

describe('SkillCard', () => {
  it('renders the skill name', () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders the skill category', () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('renders the skill level', () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText('expert')).toBeInTheDocument();
  });
});
