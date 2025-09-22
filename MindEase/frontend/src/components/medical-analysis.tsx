import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { 
  Heart, 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Activity,
  CheckCircle,
  Clock,
  Thermometer,
  Zap
} from 'lucide-react';
import { useTheme } from '../contexts/theme-context';
import { SoundEffects } from './sound-effects';

interface MedicalSymptom {
  id: string;
  name: string;
  category: 'physical' | 'cognitive' | 'emotional' | 'behavioral';
  severity: number; // 1-5 scale
}

export function MedicalAnalysis() {
  const { theme } = useTheme();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  // Mock symptoms data
  const symptoms: MedicalSymptom[] = [
    // Physical symptoms
    { id: 'headache', name: 'Frequent headaches', category: 'physical', severity: 2 },
    { id: 'sweating', name: 'Excessive sweating', category: 'physical', severity: 3 },
    { id: 'fatigue', name: 'Chronic fatigue/tiredness', category: 'physical', severity: 4 },
    { id: 'sleep_issues', name: 'Sleep disturbances', category: 'physical', severity: 3 },
    { id: 'appetite_changes', name: 'Changes in appetite', category: 'physical', severity: 2 },
    { id: 'muscle_tension', name: 'Muscle tension/aches', category: 'physical', severity: 2 },
    { id: 'nausea', name: 'Nausea or stomach issues', category: 'physical', severity: 2 },
    { id: 'chest_pain', name: 'Chest tightness/pain', category: 'physical', severity: 4 },
    
    // Cognitive symptoms
    { id: 'concentration', name: 'Difficulty concentrating', category: 'cognitive', severity: 3 },
    { id: 'memory', name: 'Memory problems', category: 'cognitive', severity: 3 },
    { id: 'indecisiveness', name: 'Trouble making decisions', category: 'cognitive', severity: 2 },
    { id: 'racing_thoughts', name: 'Racing thoughts', category: 'cognitive', severity: 4 },
    { id: 'confusion', name: 'Feeling confused/foggy', category: 'cognitive', severity: 2 },
    
    // Emotional symptoms
    { id: 'sadness', name: 'Persistent sadness', category: 'emotional', severity: 4 },
    { id: 'anxiety', name: 'Excessive worry/anxiety', category: 'emotional', severity: 4 },
    { id: 'irritability', name: 'Increased irritability', category: 'emotional', severity: 3 },
    { id: 'hopelessness', name: 'Feelings of hopelessness', category: 'emotional', severity: 5 },
    { id: 'guilt', name: 'Excessive guilt/shame', category: 'emotional', severity: 3 },
    { id: 'mood_swings', name: 'Frequent mood swings', category: 'emotional', severity: 3 },
    
    // Behavioral symptoms
    { id: 'social_withdrawal', name: 'Avoiding social situations', category: 'behavioral', severity: 3 },
    { id: 'procrastination', name: 'Increased procrastination', category: 'behavioral', severity: 2 },
    { id: 'risky_behavior', name: 'Engaging in risky behaviors', category: 'behavioral', severity: 4 },
    { id: 'substance_use', name: 'Increased substance use', category: 'behavioral', severity: 5 },
    { id: 'self_harm', name: 'Self-harm thoughts/behaviors', category: 'behavioral', severity: 5 }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical': return Activity;
      case 'cognitive': return Brain;
      case 'emotional': return Heart;
      case 'behavioral': return TrendingUp;
      default: return Activity;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physical': return 'linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(220, 38, 38, 0.9) 100%)';
      case 'cognitive': return 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.9) 100%)';
      case 'emotional': return 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(147, 51, 234, 0.9) 100%)';
      case 'behavioral': return 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(21, 128, 61, 0.9) 100%)';
      default: return 'var(--mindease-gradient-primary)';
    }
  };

  const handleSymptomToggle = (symptomId: string) => {
    SoundEffects.playClick();
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const analyzeSymptoms = async () => {
    SoundEffects.playClick();
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on selected symptoms
    const selectedSymptomsData = symptoms.filter(s => selectedSymptoms.includes(s.id));
    const totalSeverity = selectedSymptomsData.reduce((sum, s) => sum + s.severity, 0);
    const avgSeverity = selectedSymptomsData.length > 0 ? totalSeverity / selectedSymptomsData.length : 0;
    
    // Calculate risk scores based on symptom categories and severity
    const depressionSymptoms = ['sadness', 'hopelessness', 'fatigue', 'sleep_issues', 'appetite_changes', 'concentration', 'guilt', 'social_withdrawal'];
    const anxietySymptoms = ['anxiety', 'racing_thoughts', 'sweating', 'chest_pain', 'muscle_tension', 'irritability', 'sleep_issues'];
    const severeSymptoms = ['hopelessness', 'self_harm', 'substance_use', 'risky_behavior'];
    
    const depressionScore = Math.min(100, (selectedSymptoms.filter(s => depressionSymptoms.includes(s)).length / depressionSymptoms.length) * 100);
    const anxietyScore = Math.min(100, (selectedSymptoms.filter(s => anxietySymptoms.includes(s)).length / anxietySymptoms.length) * 100);
    const severityScore = Math.min(100, (selectedSymptoms.filter(s => severeSymptoms.includes(s)).length / severeSymptoms.length) * 100);
    
    const results = {
      overallRisk: avgSeverity > 3 ? 'High' : avgSeverity > 2 ? 'Moderate' : 'Low',
      depressionRisk: {
        score: Math.round(depressionScore),
        level: depressionScore > 60 ? 'High' : depressionScore > 30 ? 'Moderate' : 'Low'
      },
      anxietyRisk: {
        score: Math.round(anxietyScore),
        level: anxietyScore > 60 ? 'High' : anxietyScore > 30 ? 'Moderate' : 'Low'
      },
      severePsychological: {
        score: Math.round(severityScore),
        level: severityScore > 25 ? 'High' : severityScore > 10 ? 'Moderate' : 'Low'
      },
      recommendations: getRecommendations(avgSeverity, depressionScore, anxietyScore, severityScore),
      nextSteps: getNextSteps(avgSeverity, severityScore)
    };
    
    setAnalysisResults(results);
    setIsAnalyzing(false);
    SoundEffects.playSuccess();
  };

  const getRecommendations = (avgSeverity: number, depression: number, anxiety: number, severe: number) => {
    const recommendations = [];
    
    if (severe > 25) {
      recommendations.push('Immediate professional consultation recommended');
      recommendations.push('Consider emergency mental health services if experiencing crisis');
    } else if (avgSeverity > 3 || depression > 60 || anxiety > 60) {
      recommendations.push('Schedule appointment with mental health professional');
      recommendations.push('Consider therapy or counseling services');
    } else if (avgSeverity > 2) {
      recommendations.push('Monitor symptoms and consider self-care strategies');
      recommendations.push('Engage in stress-reduction activities');
    } else {
      recommendations.push('Continue healthy lifestyle practices');
      recommendations.push('Practice preventive mental health care');
    }
    
    return recommendations;
  };

  const getNextSteps = (avgSeverity: number, severe: number) => {
    if (severe > 25) {
      return ['Contact crisis helpline immediately', 'Schedule emergency consultation', 'Inform trusted person'];
    } else if (avgSeverity > 3) {
      return ['Book counselor session through MindEase', 'Complete detailed assessment', 'Track symptoms daily'];
    } else {
      return ['Use MindEase wellness tools', 'Join peer support groups', 'Practice mindfulness'];
    }
  };

  const groupedSymptoms = symptoms.reduce((acc, symptom) => {
    if (!acc[symptom.category]) {
      acc[symptom.category] = [];
    }
    acc[symptom.category].push(symptom);
    return acc;
  }, {} as Record<string, MedicalSymptom[]>);

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
            <Thermometer className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className={`text-3xl font-bold mindease-theme-transition ${theme === 'light' ? 'text-orange-900' : 'text-white'}`}>
              Medical Symptom Analysis ✦
            </h2>
            <p className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              Track your physical and psychological symptoms for professional assessment
            </p>
          </div>
        </div>
        
        <div className={`p-4 rounded-2xl border-l-4 flex items-center gap-2 ${theme === 'light' ? 'bg-blue-50 border-blue-400' : 'bg-blue-900/20 border-blue-600'}`}>
          <AlertTriangle className="h-4 w-4 text-blue-500" />
          <span className={`text-sm ${theme === 'light' ? 'text-blue-800' : 'text-blue-300'}`}>This analysis is for informational purposes only and does not replace professional medical diagnosis.</span>
        </div>
      </div>

      {/* Symptom Categories */}
      <div className="space-y-6">
        {Object.entries(groupedSymptoms).map(([category, categorySymptoms]) => {
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
                  <span className={`capitalize ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {category} Symptoms
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySymptoms.map((symptom) => (
                    <div
                      key={symptom.id}
                      className={`flex items-center space-x-3 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedSymptoms.includes(symptom.id)
                          ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-400'
                          : 'bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => handleSymptomToggle(symptom.id)}
                    >
                      <Checkbox 
                        checked={selectedSymptoms.includes(symptom.id)}
                        onChange={() => handleSymptomToggle(symptom.id)}
                      />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {symptom.name}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex space-x-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < symptom.severity ? 'bg-red-400' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            Severity: {symptom.severity}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Notes */}
      <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(133, 130, 157, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        <CardHeader>
          <CardTitle className={`text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Additional Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe any additional symptoms, their frequency, duration, or circumstances when they occur..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </CardContent>
      </Card>

      {/* Analysis Button */}
      <div className="text-center">
        <Button
          onClick={analyzeSymptoms}
          disabled={selectedSymptoms.length === 0 || isAnalyzing}
          className="px-8 py-4 text-lg rounded-2xl mindease-button text-white hover:scale-105 transition-all duration-300"
        >
          {isAnalyzing ? (
            <>
              <Clock className="h-5 w-5 mr-2 animate-spin" />
              Analyzing Symptoms...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5 mr-2" />
              Analyze Symptoms ({selectedSymptoms.length} selected) ✧
            </>
          )}
        </Button>
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
                Analysis Results ✦
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Risk Scores */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Depression Risk
                  </h4>
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <Progress value={analysisResults.depressionRisk.score} className="h-2" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{analysisResults.depressionRisk.score}%</span>
                    </div>
                  </div>
                  <Badge className={`${
                    analysisResults.depressionRisk.level === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                    analysisResults.depressionRisk.level === 'Moderate' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                    'bg-green-100 text-green-700 border-green-200'
                  }`}>
                    {analysisResults.depressionRisk.level} Risk
                  </Badge>
                </div>

                <div className="text-center">
                  <h4 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Anxiety Risk
                  </h4>
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <Progress value={analysisResults.anxietyRisk.score} className="h-2" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{analysisResults.anxietyRisk.score}%</span>
                    </div>
                  </div>
                  <Badge className={`${
                    analysisResults.anxietyRisk.level === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                    analysisResults.anxietyRisk.level === 'Moderate' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                    'bg-green-100 text-green-700 border-green-200'
                  }`}>
                    {analysisResults.anxietyRisk.level} Risk
                  </Badge>
                </div>

                <div className="text-center">
                  <h4 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Severe Psychological Risk
                  </h4>
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <Progress value={analysisResults.severePsychological.score} className="h-2" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{analysisResults.severePsychological.score}%</span>
                    </div>
                  </div>
                  <Badge className={`${
                    analysisResults.severePsychological.level === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                    analysisResults.severePsychological.level === 'Moderate' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                    'bg-green-100 text-green-700 border-green-200'
                  }`}>
                    {analysisResults.severePsychological.level} Risk
                  </Badge>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Recommendations ✧
                </h4>
                <div className="space-y-2">
                  {analysisResults.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Suggested Next Steps ✩
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {analysisResults.nextSteps.map((step: string, index: number) => (
                    <div key={index} className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className={`text-sm font-medium ${theme === 'light' ? 'text-blue-800' : 'text-blue-300'}`}>
                          Step {index + 1}
                        </span>
                      </div>
                      <p className={`text-sm ${theme === 'light' ? 'text-blue-700' : 'text-blue-200'}`}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}