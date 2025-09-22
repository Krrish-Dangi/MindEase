import { useTheme } from "../contexts/theme-context";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, Video, FileText, BookOpen, Users, Heart, Brain, Shield, AlertCircle, Clock, Star } from "lucide-react";
import { Input } from "./ui/input";

export function ResourceHub() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  // Video placeholder data - you can replace PLACEHOLDERYTLINK with actual YouTube embed URLs
  const videos = [
    {
      id: 1,
      title: "Managing College Stress: A Student's Guide",
      description: "Practical techniques for handling academic pressure and deadlines",
      duration: "12:45",
      category: "Stress Management",
      language: "English",
      embedCode: 'https://www.youtube.com/embed/grfXR6FAsI8'
    },
    {
      id: 2,
      title: "Understanding and Dealing with Ragging",
      description: "How to recognize, report, and recover from ragging incidents",
      duration: "15:30",
      category: "Anti-Ragging",
      language: "Hindi",
      embedCode: 'https://www.youtube.com/embed/lwonYvSuoes'
    },
    {
      id: 3,
      title: "Building Healthy Sleep Habits in College",
      description: "Creating sustainable sleep routines for better mental health",
      duration: "10:20",
      category: "Sleep Health",
      language: "English",
      embedCode: 'https://www.youtube.com/embed/uGdgcayAh2w'
    },
    {
      id: 4,
      title: "कॉलेज में मानसिक स्वास्थ्य की देखभाल",
      description: "College mental health care tips in Hindi",
      duration: "18:15",
      category: "Mental Health",
      language: "Hindi",
      embedCode: 'https://www.youtube.com/embed/NiUu8mMZjEA'
    },
    {
      id: 5,
      title: "Anxiety Management for Exam Season",
      description: "Proven strategies to reduce exam anxiety and improve performance",
      duration: "14:22",
      category: "Anxiety",
      language: "English",
      embedCode: 'https://www.youtube.com/embed/VctnRh8qeoE'
    },
    {
      id: 6,
      title: "Building Confidence After Setbacks",
      description: "Rebuilding self-esteem and confidence after academic or personal failures",
      duration: "16:45",
      category: "Self-Esteem",
      language: "Tamil",
      embedCode: 'https://www.youtube.com/embed/uQKY4_HwTqI'
    }
  ];

  const articles = [
    {
      id: 1,
      title: "The Complete Guide to College Mental Health in India",
      description: "A comprehensive resource covering all aspects of mental wellness for Indian students",
      category: "Mental Health",
      readTime: "15 min",
      language: "English",
      content: `
        <h3>Introduction</h3>
        <p>Mental health in Indian colleges is a critical issue that affects millions of students across the country. This guide provides practical strategies and resources to help you navigate your mental wellness journey.</p>
        
        <h3>Common Mental Health Challenges</h3>
        <ul>
          <li><strong>Academic Pressure:</strong> High expectations from family and society</li>
          <li><strong>Career Anxiety:</strong> Uncertainty about future prospects</li>
          <li><strong>Social Adjustment:</strong> Adapting to new environments and relationships</li>
          <li><strong>Financial Stress:</strong> Managing education costs and family expectations</li>
          <li><strong>Identity Crisis:</strong> Discovering who you are outside family expectations</li>
        </ul>

        <h3>Practical Strategies</h3>
        <p><strong>1. Time Management:</strong> Use the Pomodoro Technique for studying. Break work into 25-minute focused sessions.</p>
        <p><strong>2. Mindfulness Practice:</strong> Start with 5 minutes of daily meditation using apps like Headspace or Calm.</p>
        <p><strong>3. Social Connection:</strong> Join clubs, study groups, or volunteer organizations to build meaningful relationships.</p>
        <p><strong>4. Physical Health:</strong> Maintain regular exercise, even if it's just 20 minutes of walking daily.</p>

        <h3>When to Seek Help</h3>
        <p>Reach out for professional support if you experience persistent sadness, anxiety, sleep problems, or thoughts of self-harm. Remember, seeking help is a sign of strength, not weakness.</p>
      `
    },
    {
      id: 2,
      title: "Understanding and Combating Ragging: Your Rights and Resources",
      description: "Essential information about ragging prevention, reporting, and recovery",
      category: "Anti-Ragging",
      readTime: "12 min",
      language: "English",
      content: `
        <h3>What is Ragging?</h3>
        <p>Ragging is any act of physical or mental harassment of junior students by senior students. It's illegal under the UGC Anti-Ragging Regulations 2009.</p>

        <h3>Types of Ragging</h3>
        <ul>
          <li><strong>Physical Ragging:</strong> Any form of physical assault or torture</li>
          <li><strong>Verbal Ragging:</strong> Abusive language, humiliation, or psychological pressure</li>
          <li><strong>Sexual Harassment:</strong> Any unwelcome sexual conduct or remarks</li>
          <li><strong>Cyber Ragging:</strong> Online harassment through social media or messaging</li>
        </ul>

        <h3>Your Rights</h3>
        <p>Every student has the right to a safe, secure educational environment free from ragging. Institutions are legally bound to protect students.</p>

        <h3>How to Report</h3>
        <ol>
          <li><strong>UGC Anti-Ragging Helpline:</strong> 1800-180-5522 (24/7 toll-free)</li>
          <li><strong>Email:</strong> helpline@antiragging.in</li>
          <li><strong>Online:</strong> www.antiragging.in</li>
          <li><strong>College Anti-Ragging Committee:</strong> Contact your institution's committee</li>
        </ol>

        <h3>Recovery and Support</h3>
        <p>If you've experienced ragging, remember that healing is possible. Seek counseling support, connect with trusted friends or family, and know that what happened was not your fault.</p>
      `
    },
    {
      id: 3,
      title: "Building Resilience: Bouncing Back from Academic Setbacks",
      description: "How to recover and grow stronger from academic failures and disappointments",
      category: "Resilience",
      readTime: "10 min",
      language: "English",
      content: `
        <h3>Understanding Academic Setbacks</h3>
        <p>Academic setbacks are a normal part of the learning journey. They can include poor grades, failed exams, rejected applications, or not meeting expectations.</p>

        <h3>The Growth Mindset Approach</h3>
        <p>View setbacks as opportunities to learn and grow rather than evidence of failure. Your abilities can be developed through dedication and hard work.</p>

        <h3>Practical Steps to Bounce Back</h3>
        <ol>
          <li><strong>Acknowledge Your Feelings:</strong> It's okay to feel disappointed or frustrated</li>
          <li><strong>Analyze What Happened:</strong> Look for specific areas to improve without self-blame</li>
          <li><strong>Create an Action Plan:</strong> Set specific, achievable goals for improvement</li>
          <li><strong>Seek Support:</strong> Talk to professors, peers, or counselors</li>
          <li><strong>Celebrate Small Wins:</strong> Acknowledge progress along the way</li>
        </ol>

        <h3>Long-term Resilience Building</h3>
        <p>Develop emotional regulation skills, maintain perspective on what truly matters, and remember that academic performance doesn't define your worth as a person.</p>
      `
    },
    {
      id: 4,
      title: "कॉलेज में तनाव प्रबंधन: व्यावहारिक सुझाव",
      description: "College stress management practical tips in Hindi",
      category: "Stress Management",
      readTime: "8 min",
      language: "Hindi",
      content: `
        <h3>तनाव क्या है?</h3>
        <p>तनाव शारीरिक और मानसिक दबाव की वह स्थिति है जो कॉलेज के दौरान आम है। यह पढ़ाई, करियर की चिंता, और सामाजिक दबाव से हो सकता है।</p>

        <h3>तनाव के संकेत</h3>
        <ul>
          <li>नींद में कमी या बेचैनी</li>
          <li>खाने की आदतों में बदलाव</li>
          <li>ध्यान केंद्रित करने में कठिनाई</li>
          <li>चिड़चिड़ाहट या गुस्सा</li>
          <li>शारीरिक समस्याएं जैसे सिरदर्द</li>
        </ul>

        <h3>तनाव प्रबंधन की तकनीकें</h3>
        <p><strong>1. गहरी सांस लेना:</strong> तनाव के समय 4-7-8 की तकनीक का उपयोग करें</p>
        <p><strong>2. नियमित व्यायाम:</strong> दैनिक 20-30 मिनट का शारीरिक गतिविधि</p>
        <p><strong>3. समय प्रबंधन:</strong> दैनिक और साप्ताहिक लक्ष्य निर्धारित करें</p>
        <p><strong>4. सामाजिक सहारा:</strong> दोस्तों और परिवार के साथ नियमित संपर्क</p>

        <h3>कब मदद लें</h3>
        <p>अगर तनाव आपके दैनिक जीवन को प्रभावित कर रहा है, तो तुरंत परामर्शदाता या चिकित्सक से संपर्क करें।</p>
      `
    },
    {
      id: 5,
      title: "Healthy Relationships in College: Friendships, Dating, and Boundaries",
      description: "Building and maintaining healthy relationships during your college years",
      category: "Relationships",
      readTime: "14 min",
      language: "English",
      content: `
        <h3>The Importance of Healthy Relationships</h3>
        <p>College is a time when you form many important relationships. Learning to build healthy connections will benefit you throughout life.</p>

        <h3>Building Meaningful Friendships</h3>
        <ul>
          <li><strong>Be Authentic:</strong> Show your genuine self rather than trying to please everyone</li>
          <li><strong>Practice Active Listening:</strong> Give your full attention when friends share</li>
          <li><strong>Set Boundaries:</strong> It's okay to say no to activities that don't align with your values</li>
          <li><strong>Be Reliable:</strong> Follow through on commitments and be there for friends</li>
        </ul>

        <h3>Navigating Romantic Relationships</h3>
        <p>College relationships can be rewarding but also challenging. Focus on mutual respect, open communication, and maintaining your individual identity.</p>

        <h3>Dealing with Peer Pressure</h3>
        <p>Learn to recognize when peers are pressuring you into activities you're uncomfortable with. It's always okay to prioritize your well-being and values.</p>

        <h3>Red Flags to Watch For</h3>
        <ul>
          <li>Controlling behavior</li>
          <li>Disrespect for your boundaries</li>
          <li>Isolation from other friends or family</li>
          <li>Verbal, emotional, or physical abuse</li>
        </ul>
      `
    }
  ];

  const guides = [
    {
      id: 1,
      title: "Emergency Mental Health Action Plan",
      description: "Step-by-step guide for mental health crises",
      category: "Emergency",
      difficulty: "Essential",
      icon: <AlertCircle className="w-5 h-5" />,
      steps: [
        "Recognize the warning signs: persistent sadness, thoughts of self-harm, inability to function",
        "Reach out immediately: Call the National Suicide Prevention Helpline: 9152987821",
        "Contact emergency services if in immediate danger: 100 or 102",
        "Inform a trusted person: friend, family member, or counselor",
        "Seek professional help: visit college counseling center or nearby mental health facility",
        "Follow up with ongoing support and treatment"
      ]
    },
    {
      id: 2,
      title: "Daily Mindfulness Practice for Students",
      description: "Simple mindfulness exercises for busy college schedules",
      category: "Mindfulness",
      difficulty: "Beginner",
      icon: <Brain className="w-5 h-5" />,
      steps: [
        "Start with 5 minutes each morning upon waking",
        "Practice deep breathing: inhale for 4 counts, hold for 4, exhale for 6",
        "Use the 5-4-3-2-1 grounding technique when stressed",
        "Take mindful study breaks every 25 minutes",
        "Practice gratitude by writing 3 things you're thankful for daily",
        "End the day with a 5-minute body scan meditation"
      ]
    },
    {
      id: 3,
      title: "Building a Support Network in College",
      description: "How to create and maintain meaningful connections",
      category: "Social Support",
      difficulty: "Intermediate",
      icon: <Users className="w-5 h-5" />,
      steps: [
        "Join at least one club or organization aligned with your interests",
        "Attend college events and social gatherings regularly",
        "Be vulnerable and share appropriate personal experiences",
        "Offer help and support to others when possible",
        "Maintain contact with family and old friends",
        "Seek out mentors among seniors, faculty, or professionals"
      ]
    },
    {
      id: 4,
      title: "Academic Stress Management Toolkit",
      description: "Proven strategies for managing academic pressure",
      category: "Academic",
      difficulty: "Intermediate",
      icon: <BookOpen className="w-5 h-5" />,
      steps: [
        "Create a realistic study schedule with built-in buffer time",
        "Break large projects into smaller, manageable tasks",
        "Use active study techniques: summarizing, teaching others, practice tests",
        "Establish a consistent study environment free from distractions",
        "Practice the 'good enough' principle - perfection isn't always necessary",
        "Seek help early when struggling with course material"
      ]
    },
    {
      id: 5,
      title: "Sleep Hygiene for College Students",
      description: "Creating healthy sleep habits despite irregular schedules",
      category: "Sleep Health",
      difficulty: "Beginner",
      icon: <Clock className="w-5 h-5" />,
      steps: [
        "Maintain consistent sleep and wake times, even on weekends",
        "Create a bedtime routine: dim lights, avoid screens 1 hour before bed",
        "Keep your dorm room cool, dark, and quiet",
        "Limit caffeine intake after 2 PM",
        "Use your bed only for sleep - study elsewhere",
        "If you can't sleep after 20 minutes, get up and do a quiet activity"
      ]
    }
  ];

  const resources = [
    {
      title: "National Helplines",
      items: [
        "Suicide Prevention Helpline: 9152987821",
        "KIRAN Mental Health Helpline: 1800-599-0019",
        "UGC Anti-Ragging Helpline: 1800-180-5522",
        "Women's Helpline: 181",
        "Child Helpline: 1098"
      ]
    },
    {
      title: "Mental Health Apps",
      items: [
        "Headspace - Meditation and mindfulness",
        "Calm - Sleep stories and relaxation",
        "Insight Timer - Free meditation content",
        "Sanvello - Anxiety and depression support",
        "PTSD Coach - Trauma support tools"
      ]
    },
    {
      title: "Books for Mental Wellness",
      items: [
        "'The Anxiety and Worry Workbook' by David A. Clark",
        "'Mindset' by Carol S. Dweck",
        "'The Body Keeps the Score' by Bessel van der Kolk",
        "'Maybe You Should Talk to Someone' by Lori Gottlieb",
        "'Atomic Habits' by James Clear"
      ]
    },
    {
      title: "Online Resources",
      items: [
        "NIMHANS - nimhans.ac.in (Bangalore-based mental health institute)",
        "The Live Love Laugh Foundation - thelivelovelaughfoundation.org",
        "Vandrevala Foundation - vandrevalafoundation.com",
        "iCALL - icallhelpline.org",
        "YourDOST - yourdost.com"
      ]
    }
  ];

  const filteredContent = {
    videos: videos.filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    articles: articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    guides: guides.filter(guide => 
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  };

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);

  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="min-h-screen p-6 relative" style={{background: 'transparent'}}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 mindease-text-gradient">Mental Health Resource Hub</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive resources for Indian college students to support mental wellness, academic success, and personal growth
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 mindease-card border-0"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="flex w-full mb-8 mindease-card justify-center gap-2 bg-white dark:bg-gray-900 rounded-xl shadow">
            <TabsTrigger value="videos" className="flex items-center gap-2 px-6 py-3 font-semibold text-base text-gray-700 dark:text-gray-200">
              <Video className="w-4 h-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2 px-6 py-3 font-semibold text-base text-gray-700 dark:text-gray-200">
              <FileText className="w-4 h-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2 px-6 py-3 font-semibold text-base text-gray-700 dark:text-gray-200">
              <BookOpen className="w-4 h-4" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2 px-6 py-3 font-semibold text-base text-gray-700 dark:text-gray-200">
              <Heart className="w-4 h-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Videos Tab */}
          <TabsContent value="videos">
            {selectedVideo ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center" style={{width: '100vw', height: '100vh'}}>
                <div className="absolute inset-0 w-full h-full backdrop-blur-lg bg-white/40 dark:bg-black/40" style={{zIndex: 1}}></div>
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                  <div className="mx-auto w-full max-w-3xl rounded-2xl shadow-2xl bg-white/90 dark:bg-gray-900/90 p-8 flex flex-col items-center" style={{backdropFilter: 'blur(12px)'}}>
                    <Button onClick={() => setSelectedVideo(null)} className="absolute top-6 right-8 bg-white/80 text-orange-700 rounded-full shadow-lg px-4 py-2 font-bold" style={{zIndex: 10}}>✕</Button>
                    <h2 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-black'}`}>{selectedVideo.title}</h2>
                    <div className="w-full mb-6 flex items-center justify-center bg-black/10 rounded-xl overflow-hidden" style={{aspectRatio: '16/9', maxHeight: '70vh'}}>
                      <iframe
                        width="100%"
                        height="100%"
                        src={selectedVideo.embedCode}
                        title={selectedVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full rounded-xl shadow-lg"
                        style={{background: 'transparent', aspectRatio: '16/9'}}
                      ></iframe>
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                      <p className={`text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{selectedVideo.description}</p>
                      <div className="flex items-center gap-4">
                        <Badge>{selectedVideo.category}</Badge>
                        <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>{selectedVideo.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.videos.map((video) => (
                  <Card key={video.id} className="mindease-card hover:transform hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => setSelectedVideo(video)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2" style={{minHeight: '2.5em', display: 'block', whiteSpace: 'pre-line', color: theme === 'dark' ? '#000000' : undefined }}>
                            {(() => {
                              const lines = video.title.split('\n');
                              if (lines.length >= 2) {
                                return lines.slice(0, 2).join('\n');
                              } else {
                                return lines.concat(Array(2 - lines.length).fill('')).join('\n');
                              }
                            })()}
                          </CardTitle>
                          <CardDescription className="mt-2 line-clamp-3" style={{minHeight: '4em', display: 'block', whiteSpace: 'pre-line'}}>
                            {(() => {
                              const lines = video.description.split('\n');
                              if (lines.length >= 3) {
                                return lines.slice(0, 3).join('\n');
                              } else {
                                return lines.concat(Array(3 - lines.length).fill('')).join('\n');
                              }
                            })()}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="ml-2">{video.language}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <img
                          src={`https://img.youtube.com/vi/${video.embedCode.split('/embed/')[1]}/hqdefault.jpg`}
                          alt={video.title}
                          className="object-cover w-full h-full rounded-lg"
                          style={{maxHeight: '120px'}}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge>{video.category}</Badge>
                        <span className="text-sm text-gray-500">{video.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles">
            {selectedArticle ? (
              <div className="max-w-4xl mx-auto">
                <Button 
                  onClick={() => setSelectedArticle(null)}
                  className="mb-6"
                  variant="outline"
                >
                  ← Back to Articles
                </Button>
                <Card className="mindease-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl" style={{color: theme === 'dark' ? '#000000' : undefined}}>{selectedArticle.title}</CardTitle>
                        <CardDescription className="mt-2">{selectedArticle.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{selectedArticle.language}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <Badge>{selectedArticle.category}</Badge>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedArticle.readTime}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="prose prose-lg max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                    />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredContent.articles.map((article) => (
                  <Card 
                    key={article.id} 
                    className="mindease-card hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl line-clamp-2" style={{color: theme === 'dark' ? '#000000' : undefined}}>{article.title}</CardTitle>
                          <CardDescription className="mt-2 line-clamp-3">{article.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="ml-2">{article.language}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge>{article.category}</Badge>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides">
            {selectedGuide ? (
              <div className="max-w-4xl mx-auto">
                <Button 
                  onClick={() => setSelectedGuide(null)}
                  className="mb-6"
                  variant="outline"
                >
                  ← Back to Guides
                </Button>
                <Card className="mindease-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {selectedGuide.icon}
                      <div>
                        <CardTitle className="text-2xl" style={{color: theme === 'dark' ? '#000000' : undefined}}>{selectedGuide.title}</CardTitle>
                        <CardDescription className="mt-2">{selectedGuide.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <Badge>{selectedGuide.category}</Badge>
                      <Badge variant="outline">{selectedGuide.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-4">Step-by-Step Instructions:</h3>
                    <ol className="space-y-3">
                      {selectedGuide.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.guides.map((guide) => (
                  <Card 
                    key={guide.id} 
                    className="mindease-card hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedGuide(guide)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        {guide.icon}
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2" style={{color: theme === 'dark' ? '#000000' : undefined}}>{guide.title}</CardTitle>
                          <CardDescription className="mt-2 line-clamp-2">{guide.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge>{guide.category}</Badge>
                        <Badge variant="outline">{guide.difficulty}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((section, index) => (
                <Card key={index} className="mindease-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}