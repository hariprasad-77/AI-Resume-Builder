import React from 'react';
import { Education } from '../types/resume';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          Education
        </h3>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {data.map((edu) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4 relative">
            <button
              onClick={() => removeEducation(edu.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="University Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Computer Science, Business, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3.8/4.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};