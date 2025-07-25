import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { format } from 'date-fns';

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString + '-01'), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  const getSkillWidth = (level: string) => {
    switch (level) {
      case 'Beginner': return '25%';
      case 'Intermediate': return '50%';
      case 'Advanced': return '75%';
      case 'Expert': return '100%';
      default: return '50%';
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {data.personalInfo.address}
            </div>
          )}
          {data.personalInfo.linkedIn && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              {data.personalInfo.linkedIn}
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              {data.personalInfo.website}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-200 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600 font-medium">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
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
          <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-blue-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
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
          <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-3">
                <span className="text-gray-700 font-medium w-24 text-sm">{skill.name}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: getSkillWidth(skill.level) }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-16">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};