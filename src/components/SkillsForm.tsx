import React from 'react';
import { Skill } from '../types/resume';
import { Star, Plus, Trash2, Sparkles } from 'lucide-react';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
  onGenerateSkills: () => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
  data,
  onChange,
  onGenerateSkills,
}) => {
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
    };
    onChange([...data, newSkill]);
  };

  const removeSkill = (id: string) => {
    onChange(data.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onChange(
      data.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Star className="w-5 h-5 text-blue-600" />
          Skills
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onGenerateSkills}
            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            <Sparkles className="w-3 h-3" />
            AI Suggest
          </button>
          <button
            onClick={addSkill}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((skill) => (
          <div key={skill.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Skill name"
              />
            </div>
            <div className="flex-1">
              <select
                value={skill.level}
                onChange={(e) => updateSkill(skill.id, 'level', e.target.value as Skill['level'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};