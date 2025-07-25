import React from 'react';
import { ResumeData } from '../../types/resume';
import { format } from 'date-fns';

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString + '-01'), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
        <div className="text-sm text-gray-700 space-y-1">
          {data.personalInfo.address && <div>{data.personalInfo.address}</div>}
          <div className="flex justify-center gap-4">
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          </div>
          <div className="flex justify-center gap-4">
            {data.personalInfo.linkedIn && <span>{data.personalInfo.linkedIn}</span>}
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
            Objective
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-700 font-medium">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 font-medium italic mb-2">{exp.company}</p>
                {exp.description && (
                  <div className="text-gray-700 text-sm leading-relaxed">
                    {exp.description.split('\n').map((line, index) => (
                      <p key={index} className="mb-1">• {line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-700 italic">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
            Skills
          </h2>
          <div className="text-gray-700 text-sm">
            {data.skills.map((skill, index) => (
              <span key={skill.id}>
                {skill.name}
                {index < data.skills.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};