import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { format } from 'date-fns';

interface ProfessionalTemplateProps {
  data: ResumeData;
}

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data }) => {
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
      <div className="border-b-4 border-indigo-600 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{data.personalInfo.fullName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="space-y-2">
            {data.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-600" />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                {data.personalInfo.address}
              </div>
            )}
          </div>
          <div className="space-y-2">
            {data.personalInfo.linkedIn && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-indigo-600" />
                {data.personalInfo.linkedIn}
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-600" />
                {data.personalInfo.website}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-indigo-600 uppercase tracking-wider mb-3">
            Executive Summary
          </h2>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-indigo-600 uppercase tracking-wider mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="bg-gray-50 p-4 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-indigo-600 font-semibold">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600 font-medium bg-white px-2 py-1 rounded">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 text-sm leading-relaxed mt-3">
                    {exp.description.split('\n').map((line, index) => (
                      <p key={index} className="mb-1">▪ {line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-indigo-600 uppercase tracking-wider mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 p-3 rounded">
                  <h3 className="font-bold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-indigo-600 font-medium">{edu.institution}</p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-indigo-600 uppercase tracking-wider mb-3">
              Core Competencies
            </h2>
            <div className="bg-gray-50 p-3 rounded">
              <div className="grid grid-cols-2 gap-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                    <span className="text-indigo-600 text-xs">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};