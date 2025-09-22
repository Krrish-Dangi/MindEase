import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Users, 
  BookOpen, 
  TrendingUp,
  FileText,
  Download,
  Share2,
  Eye,
  Heart
} from 'lucide-react';
import { useTheme } from '../contexts/theme-context';
import { SoundEffects } from './sound-effects';

interface Resource {
  id: string;
  title: string;
  type: 'guide' | 'video' | 'article' | 'worksheet';
  category: string;
  description: string;
  downloads: number;
  rating: number;
  dateAdded: string;
}

interface StudentStats {
  totalActive: number;
  thisWeekSessions: number;
  resourcesAccessed: number;
  avgWellnessScore: number;
}

export function StudentResourcescounsellor() {
  const { theme } = useTheme();
  const [resources, setResources] = useState<Resource[]>([]);
  const [studentStats, setStudentStats] = useState<StudentStats>({
    totalActive: 0,
    thisWeekSessions: 0,
    resourcesAccessed: 0,
    avgWellnessScore: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch student statistics
      const statsRes = await fetch('http://localhost:5000/api/counsellor/student-stats');
      if (statsRes.ok) {
        const stats = await statsRes.json();
        setStudentStats(stats);
      }
      
      // Fetch available resources
      const resourcesRes = await fetch('http://localhost:5000/api/counsellor/resources');
      if (resourcesRes.ok) {
        const resourcesData = await resourcesRes.json();
        setResources(resourcesData);
      }
      
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const shareResource = async (resourceId: string) => {
    SoundEffects.playClick();
    try {
      const response = await fetch(`http://localhost:5000/api/counsellor/resources/${resourceId}/share`, {
        method: 'POST'
      });
      if (response.ok) {
        SoundEffects.playSuccess();
        alert('✅ Resource shared with students!');
      }
    } catch (error) {
      console.error('Error sharing resource:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return <BookOpen className="h-4 w-4" />;
      case 'video': return <Eye className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'worksheet': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'video': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'article': return 'bg-green-100 text-green-700 border-green-200';
      case 'worksheet': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96 relative mindease-subtle-stars">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading student resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative mindease-subtle-stars">
      {/* Header */}
      <div className="border p-6 rounded-3xl shadow-lg backdrop-blur-lg relative z-10" style={{
        background: 'rgba(255, 255, 255, 0.08)',
        borderColor: 'rgba(133, 130, 157, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'var(--mindease-gradient-primary)' }}>
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Student Resources ✨</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Manage and share wellness resources with students</p>
          </div>
        </div>
      </div>

      {/* Student Statistics */}
      <div className="grid md:grid-cols-4 gap-6 relative z-10">
        <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{studentStats.totalActive}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Week Sessions</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{studentStats.thisWeekSessions}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Resources Accessed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{studentStats.resourcesAccessed}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(133, 130, 157, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Wellness Score</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{studentStats.avgWellnessScore.toFixed(1)}/10</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resources List */}
      <Card className="border-0 rounded-3xl shadow-lg backdrop-blur-lg" style={{
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(133, 130, 157, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(30, 63, 145, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <BookOpen className="h-5 w-5 mr-3 text-purple-500" />
            <span className="text-gray-900 dark:text-white">Available Resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {resources.length > 0 ? (
            <div className="space-y-4">
              {resources.map((resource) => (
                <div key={resource.id} className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(resource.type)}
                          <h4 className="font-semibold text-gray-900 dark:text-white">{resource.title}</h4>
                        </div>
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {resource.category}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Download className="h-3 w-3" />
                          <span>{resource.downloads} downloads</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{resource.rating}/5 rating</span>
                        </div>
                        <span>Added {new Date(resource.dateAdded).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => shareResource(resource.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline" className="hover:bg-gray-50">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No resources available</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Resources will appear here once they're added to the system.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}