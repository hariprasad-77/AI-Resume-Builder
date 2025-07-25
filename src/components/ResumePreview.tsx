import React from 'react';
import { ResumeData, TemplateType } from '../types/resume';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div id="resume-preview" className="transform scale-75 origin-top-left">
        {renderTemplate()}
      </div>
    </div>
  );
};