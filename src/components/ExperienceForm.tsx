import React from 'react';
import { Experience } from '../types/resume';
import { Briefcase, Plus, Trash2, Sparkles } from 'lucide-react';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
  onGenerateDescription: (index: number) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  data,
  onChange,
  onGenerateDescription,
}) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(
      data.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          Work Experience
        </h3>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {data.map((exp, index) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => removeExperience(exp.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Job Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Current
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <button
                  onClick={() => onGenerateDescription(index)}
                  className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  <Sparkles className="w-3 h-3" />
                  AI Generate
                </button>
              </div>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};