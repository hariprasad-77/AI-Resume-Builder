import React from 'react';
import { TemplateType } from '../types/resume';
import { Palette } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

const templates: { id: TemplateType; name: string; description: string; color: string }[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with blue accents',
    color: 'bg-blue-500',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional format perfect for conservative industries',
    color: 'bg-gray-700',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant and artistic design for creative professionals',
    color: 'bg-purple-500',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant with focus on content',
    color: 'bg-green-500',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate-friendly design with subtle styling',
    color: 'bg-indigo-500',
  },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Palette className="w-5 h-5 text-blue-600" />
        Resume Templates
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-full h-16 ${template.color} rounded mb-3 opacity-80`}></div>
            <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
            <p className="text-xs text-gray-600">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};