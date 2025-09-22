import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Clock, 
  Brain, 
  AlertTriangle, 
  Users, 
  GraduationCap,
  CheckCircle,
  Heart,
  Shield,
  BookOpen,
  Calendar
} from 'lucide-react';
import { useTheme } from '../contexts/theme-context';
import { SoundEffects } from './sound-effects';

interface HistoryQuestion {
  id: string;
  question: string;
  category: 'mental_health' | 'college_life' | 'social' | 'coping' | 'support';
  type: 'scale' | 'multiple_choice' | 'yes_no' | 'text';
  options?: string[];
  riskWeight: number; // 1-5 scale for risk assessment
}

export function HistoryAnalysis() {
  const { theme } = useTheme();
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  // Mock history questions
  const questions: HistoryQuestion[] = [
    // Mental Health History
    {
      id: 'previous_mental_health',
      question: 'Have you ever been diagnosed with a mental health condition?',
      category: 'mental_health',
      type: 'yes_no',
      riskWeight: 3
    },
    {
      id: 'therapy_experience',
      question: 'Have you ever received counseling or therapy?',
      category: 'mental_health',
      type: 'multiple_choice',
      options: ['Never', 'Once or twice', 'Several times', 'Regularly for months', 'Currently in therapy'],
      riskWeight: 2
    },
    {
      id: 'medication_history',
      question: 'Have you ever taken medication for mental health concerns?',
      category: 'mental_health',
      type: 'yes_no',
      riskWeight: 3
    },
    {
      id: 'family_history',
      question: 'Is there a family history of mental health conditions?',
      category: 'mental_health',
      type: 'multiple_choice',
      options: ['No family history', 'Distant relatives', 'Extended family', 'Immediate family', 'Multiple family members'],
      riskWeight: 2
    },
    {
      id: 'self_harm_history',
      question: 'Have you ever had thoughts of self-harm or suicide?',
      category: 'mental_health',
      type: 'multiple_choice',
      options: ['Never', 'Rarely, brief thoughts', 'Sometimes', 'Frequently', 'Recently or currently'],
      riskWeight: 5
    },
    
    // College Life
    {
      id: 'academic_stress',
      question: 'How would you rate your current academic stress level?',
      category: 'college_life',
      type: 'scale',
      riskWeight: 3
    },
    {
      id: 'college_adjustment',
      question: 'How well have you adjusted to college life?',
      category: 'college_life',
      type: 'multiple_choice',
      options: ['Very well, no issues', 'Mostly well with minor challenges', 'Moderate difficulties', 'Significant struggles', 'Extremely difficult adjustment'],
      riskWeight: 3
    },
    {
      id: 'financial_stress',
      question: 'Do financial concerns affect your mental health?',
      category: 'college_life',
      type: 'multiple_choice',
      options: ['Not at all', 'Slightly', 'Moderately', 'Significantly', 'Extremely - major source of stress'],
      riskWeight: 2
    },
    {
      id: 'future_anxiety',
      question: 'How anxious are you about your future career/life?',
      category: 'college_life',
      type: 'scale',
      riskWeight: 2
    },
    
    // Social Experiences
    {
      id: 'bullying_experience',
      question: 'Have you experienced bullying during your education?',
      category: 'social',
      type: 'multiple_choice',
      options: ['Never', 'Mild teasing occasionally', 'Moderate bullying', 'Severe bullying', 'Ongoing severe bullying'],
      riskWeight: 4
    },
    {
      id: 'ragging_experience',
      question: 'Have you experienced ragging in college?',
      category: 'social',
      type: 'multiple_choice',
      options: ['No ragging', 'Mild/playful interactions', 'Moderate ragging', 'Severe ragging', 'Traumatic ragging experience'],
      riskWeight: 4
    },
    {
      id: 'social_support',
      question: 'How strong is your social support network?',
      category: 'social',
      type: 'multiple_choice',
      options: ['Very strong support', 'Good support', 'Moderate support', 'Limited support', 'Very little or no support'],
      riskWeight: 3
    },
    {
      id: 'discrimination',
      question: 'Have you experienced discrimination or prejudice?',
      category: 'social',
      type: 'multiple_choice',
      options: ['Never', 'Rarely', 'Occasionally', 'Frequently', 'Regularly/ongoing'],
      riskWeight: 3
    },
    
    // Coping and Support
    {
      id: 'coping_mechanisms',
      question: 'What are your primary coping mechanisms when stressed?',
      category: 'coping',
      type: 'text',
      riskWeight: 2
    },
    {
      id: 'support_seeking',
      question: 'How comfortable are you seeking help when needed?',
      category: 'support',
      type: 'multiple_choice',
      options: ['Very comfortable', 'Somewhat comfortable', 'Neutral', 'Somewhat uncomfortable', 'Very uncomfortable'],
      riskWeight: 2
    },
    {
      id: 'crisis_support',
      question: 'Who would you turn to in a mental health crisis?',
      category: 'support',
      type: 'text',
      riskWeight: 3
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mental_health': return Brain;
      case 'college_life': return GraduationCap;
      case 'social': return Users;
      case 'coping': return Heart;
      case 'support': return Shield;
      default: return Clock;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mental_health': return 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(147, 51, 234, 0.9) 100%)';
      case 'college_life': return 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.9) 100%)';
      case 'social': return 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(21, 128, 61, 0.9) 100%)';
      case 'coping': return 'linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(220, 38, 38, 0.9) 100%)';
      case 'support': return 'linear-gradient(135deg, rgba(245, 158, 11, 0.8) 0%, rgba(217, 119, 6, 0.9) 100%)';
      default: return 'var(--mindease-gradient-primary)';
    }
  };

  const handleResponseChange = (questionId: string, value: string) => {
    SoundEffects.playClick();
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const renderQuestion = (question: HistoryQuestion) => {
    switch (question.type) {
      case 'scale':
        return (
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>1 - Very Low</span>
              <span>10 - Very High</span>
            </div>
            <RadioGroup 
              value={responses[question.id] || ''} 
              onValueChange={(value) => handleResponseChange(question.id, value)}
            >
              <div className="flex justify-between">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i + 1} className="flex flex-col items-center space-y-2">
                    <RadioGroupItem value={String(i + 1)} id={`${question.id}_${i + 1}`} />
                    <Label htmlFor={`${question.id}_${i + 1}`} className="text-sm">{i + 1}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        );
      
      case 'yes_no':
        return (
          <RadioGroup 
            value={responses[question.id] || ''} 
            onValueChange={(value) => handleResponseChange(question.id, value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id={`${question.id}_yes`} />
              <Label htmlFor={`${question.id}_yes`}>Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id={`${question.id}_no`} />
              <Label htmlFor={`${question.id}_no`}>No</Label>
            </div>
          </RadioGroup>
        );
      
      case 'multiple_choice':
        return (
          <RadioGroup value={responses[question.id] || ''} onValueChange={(value) => handleResponseChange(question.id, value)}>
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}_${index}`} style={{ borderColor: '#EA580C', backgroundColor: responses[question.id] === option ? '#EA580C' : '#FFF' }} />
                <Label htmlFor={`${question.id}_${index}`} className="text-sm leading-relaxed">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'text':
        return (
          <Textarea
            placeholder="Please describe in detail..."
            value={responses[question.id] || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className="min-h-[100px] resize-none"
          />
        );
      
      default:
        return null;
    }
  };

  const analyzeHistory = async () => {
    SoundEffects.playClick();
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Calculate risk scores based on responses
    const riskFactors = {
      mentalHealth: 0,
      trauma: 0,
      social: 0,
      support: 0,
      overall: 0
    };

    // Analyze responses for risk factors
    questions.forEach(question => {
      const response = responses[question.id];
      if (!response) return;

      let score = 0;
      
      if (question.type === 'scale') {
        score = (parseInt(response) / 10) * question.riskWeight;
      } else if (question.type === 'yes_no') {
        score = response === 'yes' ? question.riskWeight : 0;
      } else if (question.type === 'multiple_choice' && question.options) {
        const optionIndex = question.options.indexOf(response);
        score = (optionIndex / (question.options.length - 1)) * question.riskWeight;
      }

      // Categorize risk factors
      if (question.category === 'mental_health') {
        riskFactors.mentalHealth += score;
      } else if (question.category === 'social' && (question.id.includes('bullying') || question.id.includes('ragging'))) {
        riskFactors.trauma += score;
      } else if (question.category === 'social') {
        riskFactors.social += score;
      } else if (question.category === 'support' || question.category === 'coping') {
        riskFactors.support += score;
      }
    });

    // Normalize scores
    const maxPossibleScores = {
      mentalHealth: 15, // Max possible from mental health questions
      trauma: 8,        // Max from bullying/ragging questions
      social: 6,        // Max from other social questions
      support: 7        // Max from support questions
    };

    const normalizedScores = {
      mentalHealth: Math.min(100, (riskFactors.mentalHealth / maxPossibleScores.mentalHealth) * 100),
      trauma: Math.min(100, (riskFactors.trauma / maxPossibleScores.trauma) * 100),
      social: Math.min(100, (riskFactors.social / maxPossibleScores.social) * 100),
      support: Math.min(100, (riskFactors.support / maxPossibleScores.support) * 100)
    };

    const overallScore = (normalizedScores.mentalHealth + normalizedScores.trauma + normalizedScores.social + normalizedScores.support) / 4;

    const results = {
      riskProfile: {
        mentalHealth: {
          score: Math.round(normalizedScores.mentalHealth),
          level: normalizedScores.mentalHealth > 60 ? 'High' : normalizedScores.mentalHealth > 30 ? 'Moderate' : 'Low'
        },
        trauma: {
          score: Math.round(normalizedScores.trauma),
          level: normalizedScores.trauma > 60 ? 'High' : normalizedScores.trauma > 30 ? 'Moderate' : 'Low'
        },
        socialIsolation: {
          score: Math.round(normalizedScores.social),
          level: normalizedScores.social > 60 ? 'High' : normalizedScores.social > 30 ? 'Moderate' : 'Low'
        },
        supportDeficit: {
          score: Math.round(normalizedScores.support),
          level: normalizedScores.support > 60 ? 'High' : normalizedScores.support > 30 ? 'Moderate' : 'Low'
        }
      },
      overallRisk: {
        score: Math.round(overallScore),
        level: overallScore > 60 ? 'High' : overallScore > 30 ? 'Moderate' : 'Low'
      },
      keyFindings: generateKeyFindings(responses, normalizedScores),
      recommendations: generateRecommendations(normalizedScores, overallScore),
      intervention: generateInterventionPlan(normalizedScores, overallScore)
    };
    
    setAnalysisResults(results);
    setIsAnalyzing(false);
    SoundEffects.playSuccess();
  };

  const generateKeyFindings = (responses: Record<string, string>, scores: any) => {
    const findings = [];
    
    if (responses['self_harm_history'] && responses['self_harm_history'] !== 'Never') {
      findings.push('History of self-harm thoughts requires immediate attention');
    }
    
    if (scores.trauma > 50) {
      findings.push('Significant history of traumatic social experiences');
    }
    
    if (responses['social_support'] && responses['social_support'].includes('little')) {
      findings.push('Limited social support network identified');
    }
    
    if (scores.mentalHealth > 40) {
      findings.push('Previous mental health concerns present');
    }
    
    if (responses['college_adjustment'] && responses['college_adjustment'].includes('difficult')) {
      findings.push('Difficulty adjusting to college environment');
    }
    
    return findings.length > 0 ? findings : ['No major risk factors identified in history'];
  };

  const generateRecommendations = (scores: any, overallScore: number) => {
    const recommendations = [];
    
    if (overallScore > 60) {
      recommendations.push('Immediate professional mental health evaluation recommended');
      recommendations.push('Consider comprehensive therapy or counseling program');
    } else if (overallScore > 30) {
      recommendations.push('Regular counseling sessions would be beneficial');
      recommendations.push('Develop stronger coping strategies and support network');
    }
    
    if (scores.trauma > 40) {
      recommendations.push('Trauma-informed therapy may be helpful');
    }
    
    if (scores.support > 40) {
      recommendations.push('Focus on building stronger social connections');
      recommendations.push('Consider joining support groups or peer networks');
    }
    
    recommendations.push('Regular mental health check-ins and monitoring');
    
    return recommendations;
  };

  const generateInterventionPlan = (scores: any, overallScore: number) => {
    if (overallScore > 60) {
      return ['Crisis intervention assessment', 'Weekly professional sessions', 'Family/friend notification with consent'];
    } else if (overallScore > 30) {
      return ['Bi-weekly counseling sessions', 'Peer support group participation', 'Regular self-assessment tools'];
    } else {
      return ['Monthly check-ins', 'Preventive mental health practices', 'Stress management workshops'];
    }
  };

  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {} as Record<string, HistoryQuestion[]>);

  const categoryNames = {
    mental_health: 'Mental Health History',
    college_life: 'College Life Experience',
    social: 'Social Experiences',
    coping: 'Coping Mechanisms',
    support: 'Support Systems'
  };

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div className="relative overflow-hidden border p-8 rounded-3xl shadow-2xl backdrop-blur-xl mindease-theme-transition" style={{
        background: theme === 'light'
          ? 'linear-gradient(135deg, rgba(255, 251, 245, 0.9) 0%, rgba(254, 215, 170, 0.8) 50%, rgba(253, 230, 138, 0.7) 100%)'
          : 'linear-gradient(135deg, rgba(30, 63, 145, 0.15) 0%, rgba(66, 92, 169, 0.12) 50%, rgba(213, 166, 114, 0.08) 100%)',
        borderColor: theme === 'light'
          ? 'rgba(254, 215, 170, 0.6)'
          : 'rgba(133, 130, 157, 0.4)',
        boxShadow: theme === 'light'
          ? '0 20px 40px rgba(234, 88, 12, 0.15), 0 0 80px rgba(249, 115, 22, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
          : '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(30, 63, 145, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg" style={{ background: 'var(--mindease-gradient-primary)' }}>
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className={`text-3xl font-bold mindease-theme-transition ${theme === 'light' ? 'text-orange-900' : 'text-white'}`}>
              Personal History Analysis ✧
            </h2>
            <p className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Comprehensive assessment of your mental health journey and experiences
            </p>
          </div>
        </div>
        
        <div className={`p-4 rounded-2xl border-l-4 ${theme === 'light' ? 'bg-blue-50 border-blue-400' : 'bg-blue-900/20 border-blue-600'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle className="h-4 w-4 text-blue-500" style={{ display: 'inline', verticalAlign: 'middle' }} />
          <span className={`text-sm ${theme === 'light' ? 'text-blue-800' : 'text-blue-300'}`} style={{ display: 'inline', verticalAlign: 'middle' }}>All information shared is confidential and used only for providing appropriate support recommendations.</span>
        </div>
      </div>

      {/* Question Categories */}
      <div className="space-y-8">
        {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => {
          const Icon = getCategoryIcon(category);
          return (
            <Card key={category} className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(133, 130, 157, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4" style={{ background: getCategoryColor(category) }}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {categoryNames[category as keyof typeof categoryNames]}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {categoryQuestions.map((question) => (
                  <div key={question.id} className="space-y-4">
                    <h4 className={`text-lg font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {question.question}
                    </h4>
                    <div className="pl-4">
                      {renderQuestion(question)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analysis Button */}
      <div className="text-center">
        <Button
          onClick={analyzeHistory}
          disabled={Object.keys(responses).length < 5 || isAnalyzing}
          className="px-8 py-4 text-lg rounded-2xl mindease-button text-white hover:scale-105 transition-all duration-300"
        >
          {isAnalyzing ? (
            <>
              <Clock className="h-5 w-5 mr-2 animate-spin" />
              Analyzing History...
            </>
          ) : (
            <>
              <Calendar className="h-5 w-5 mr-2" />
              Analyze Personal History ({Object.keys(responses).length} responses) ✩
            </>
          )}
        </Button>
        {Object.keys(responses).length < 5 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Please answer at least 5 questions to generate analysis
          </p>
        )}
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <div className="space-y-6">
          <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(133, 130, 157, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}>
            <CardHeader>
              <CardTitle className={`text-2xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Personal History Analysis Results ✦
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Overall Risk Score */}
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <h3 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Overall Risk Level
                </h3>
                <div className="text-6xl font-bold mb-4">
                  <span className={`${
                    analysisResults.overallRisk.level === 'High' ? 'text-red-600' :
                    analysisResults.overallRisk.level === 'Moderate' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {analysisResults.overallRisk.score}%
                  </span>
                </div>
                <Badge className={`text-lg px-4 py-2 ${
                  analysisResults.overallRisk.level === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                  analysisResults.overallRisk.level === 'Moderate' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                  'bg-green-100 text-green-700 border-green-200'
                }`}>
                  {analysisResults.overallRisk.level} Risk Level
                </Badge>
              </div>

              {/* Risk Profile Breakdown */}
              <div>
                <h4 className={`text-xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Risk Profile Breakdown ✧
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(analysisResults.riskProfile).map(([key, data]: [string, any]) => (
                    <div key={key} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {key === 'mentalHealth' ? 'Mental Health History' :
                           key === 'trauma' ? 'Trauma/Adverse Experiences' :
                           key === 'socialIsolation' ? 'Social Isolation Risk' :
                           'Support System Deficits'}
                        </h5>
                        <Badge className={`${
                          data.level === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                          data.level === 'Moderate' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                          'bg-green-100 text-green-700 border-green-200'
                        }`}>
                          {data.level}
                        </Badge>
                      </div>
                      <Progress value={data.score} className="h-3 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">{data.score}% risk level</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Findings */}
              <div>
                <h4 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Key Findings ✩
                </h4>
                <div className="space-y-3">
                  {analysisResults.keyFindings.map((finding: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20">
                      <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className={`text-sm ${theme === 'light' ? 'text-blue-800' : 'text-blue-300'}`}>{finding}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Professional Recommendations ✪
                </h4>
                <div className="space-y-3">
                  {analysisResults.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intervention Plan */}
              <div>
                <h4 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Suggested Intervention Plan ✦
                </h4>
                <div className="grid gap-4">
                  {analysisResults.intervention.map((step: string, index: number) => (
                    <div key={index} className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <p className={`font-medium ${theme === 'light' ? 'text-green-800' : 'text-green-300'}`}>
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Notice */}
              <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700">
                <div className="flex items-center space-x-3 mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <h4 className={`font-bold ${theme === 'light' ? 'text-red-800' : 'text-red-300'}`}>
                    Important Notice
                  </h4>
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-red-700' : 'text-red-200'}`}>
                  This analysis is based on self-reported information and should not replace professional mental health evaluation. 
                  If you're experiencing crisis thoughts or urgent mental health concerns, please contact emergency services or a crisis helpline immediately.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}