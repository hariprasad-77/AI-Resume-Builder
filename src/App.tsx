import React, { useState } from 'react';
import { ResumeData, TemplateType, PersonalInfo, Experience, Education, Skill } from './types/resume';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { ExperienceForm } from './components/ExperienceForm';
import { EducationForm } from './components/EducationForm';
import { SkillsForm } from './components/SkillsForm';
import { TemplateSelector } from './components/TemplateSelector';
import { ResumePreview } from './components/ResumePreview';
import { generatePDF } from './utils/pdfGenerator';
import { generateJobDescription, generateSummary, generateSkillSuggestions } from './utils/aiGenerator';
import { FileText, Download, Sparkles } from 'lucide-react';

const initialPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  linkedIn: '',
  website: '',
  summary: '',
};

const initialResumeData: ResumeData = {
  personalInfo: initialPersonalInfo,
  experience: [],
  education: [],
  skills: [],
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handlePersonalInfoChange = (data: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo: data }));
  };

  const handleExperienceChange = (data: Experience[]) => {
    setResumeData(prev => ({ ...prev, experience: data }));
  };

  const handleEducationChange = (data: Education[]) => {
    setResumeData(prev => ({ ...prev, education: data }));
  };

  const handleSkillsChange = (data: Skill[]) => {
    setResumeData(prev => ({ ...prev, skills: data }));
  };

  const handleGenerateSummary = () => {
    const generatedSummary = generateSummary(resumeData.personalInfo, resumeData.experience);
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, summary: generatedSummary }
    }));
  };

  const handleGenerateJobDescription = (index: number) => {
    const experience = resumeData.experience[index];
    if (experience && experience.position) {
      const descriptions = generateJobDescription(experience.position);
      const updatedExperience = [...resumeData.experience];
      updatedExperience[index] = {
        ...experience,
        description: descriptions.join('\n')
      };
      setResumeData(prev => ({ ...prev, experience: updatedExperience }));
    }
  };

  const handleGenerateSkills = () => {
    const suggestions = generateSkillSuggestions(resumeData.experience);
    const newSkills: Skill[] = suggestions.map(skill => ({
      id: Date.now().toString() + Math.random(),
      name: skill,
      level: 'Intermediate' as const,
    }));
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, ...newSkills] }));
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const fileName = `${resumeData.personalInfo.fullName || 'resume'}_resume.pdf`;
      await generatePDF('resume-preview', fileName);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
            </div>
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 h-4" />
              {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Forms Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5" />
                <h2 className="text-lg font-semibold">AI-Powered Resume Builder</h2>
              </div>
              <p className="text-blue-100">
                Create a professional resume with AI-generated content suggestions. 
                Fill in your information and let our AI help you craft compelling descriptions.
              </p>
            </div>

            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />

            <PersonalInfoForm
              data={resumeData.personalInfo}
              onChange={handlePersonalInfoChange}
              onGenerateSummary={handleGenerateSummary}
            />

            <ExperienceForm
              data={resumeData.experience}
              onChange={handleExperienceChange}
              onGenerateDescription={handleGenerateJobDescription}
            />

            <EducationForm
              data={resumeData.education}
              onChange={handleEducationChange}
            />

            <SkillsForm
              data={resumeData.skills}
              onChange={handleSkillsChange}
              onGenerateSkills={handleGenerateSkills}
            />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                <div className="text-sm text-gray-500 capitalize">
                  {selectedTemplate} Template
                </div>
              </div>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <ResumePreview data={resumeData} template={selectedTemplate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;