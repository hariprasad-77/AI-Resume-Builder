import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { format } from 'date-fns';

interface CreativeTemplateProps {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString + '-01'), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  const getSkillDots = (level: string) => {
    const dots = [];
    const filled = {
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3,
      'Expert': 4
    }[level] || 2;

    for (let i = 0; i < 4; i++) {
      dots.push(
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${
            i < filled ? 'bg-purple-500' : 'bg-gray-300'
          }`}
        />
      );
    }
    return dots;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ minHeight: '297mm' }}>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-6">
          <div className="mb-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl font-bold text-purple-600">
                {data.personalInfo.fullName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">{data.personalInfo.fullName}</h1>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-pink-200">Contact</h2>
            <div className="space-y-2 text-sm">
              {data.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {data.personalInfo.address}
                </div>
              )}
              {data.personalInfo.linkedIn && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <span className="break-all">{data.personalInfo.linkedIn}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="break-all">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-pink-200">Skills</h2>
              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="text-sm font-medium mb-1">{skill.name}</div>
                    <div className="flex gap-1">
                      {getSkillDots(skill.level)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-pink-200">Education</h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <div className="font-semibold">{edu.degree}</div>
                    <div className="text-pink-100">{edu.field}</div>
                    <div className="text-pink-200 text-xs">{edu.institution}</div>
                    <div className="text-pink-200 text-xs">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-600 mb-3 relative">
                About Me
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-600 mb-3 relative">
                Experience
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={exp.id} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-purple-500 rounded-full"></div>
                    {index !== data.experience.length - 1 && (
                      <div className="absolute left-1.5 top-5 w-0.5 h-full bg-purple-200"></div>
                    )}
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <span className="text-sm text-gray-600 font-medium">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-purple-600 font-medium mb-2">{exp.company}</p>
                    {exp.description && (
                      <div className="text-gray-700 text-sm leading-relaxed">
                        {exp.description.split('\n').map((line, lineIndex) => (
                          <p key={lineIndex} className="mb-1">• {line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};