import { skills } from './data/skills';
import { SkillCard } from './components/SkillCard';

function App() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">My Skills</h1>
        <p className="mb-8 text-gray-500">A showcase of my favorite technologies and tools.</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
