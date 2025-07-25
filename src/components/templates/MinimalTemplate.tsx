import React from 'react';
import { ResumeData } from '../../types/resume';
import { format } from 'date-fns';

interface MinimalTemplateProps {
  data: ResumeData;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
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
      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-4">{data.personalInfo.fullName}</h1>
        <div className="text-gray-600 text-sm space-y-1">
          <div className="flex flex-wrap gap-6">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
          </div>
          {(data.personalInfo.linkedIn || data.personalInfo.website) && (
            <div className="flex flex-wrap gap-6">
              {data.personalInfo.linkedIn && <span>{data.personalInfo.linkedIn}</span>}
              {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-lg font-light">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 font-medium">{exp.company}</p>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed">
                    {exp.description.split('\n').map((line, index) => (
                      <p key={index} className="mb-2">{line}</p>
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
        <div className="mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-gray-600">{edu.institution}</p>
                {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};