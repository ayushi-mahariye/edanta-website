import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, ChevronLeft, Code, Zap, Shield, Users, Globe, 
  ArrowRight, CheckCircle, Star, Mail, Phone, MapPin, 
  Facebook, Twitter, Linkedin, Instagram, Briefcase,
  Cloud, Lock, Heart, BarChart3, Clock, TrendingUp, DollarSign, Send, MessageCircle, X as XIcon
} from 'lucide-react';

function Chatbot({ isChatbotOpen, setIsChatbotOpen, chatMessages, setChatMessages, userInput, setUserInput }) {
  const quickQuestions = [
    "What is Edanta?",
    "Tell me about your services",
    "How can you help my business?"
  ];

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    // Add user message
    const newUserMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      text: message
    };
    setChatMessages([...chatMessages, newUserMessage]);
    setUserInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = {
        "what is edanta?": "Edanta Technologies is a leading software development company specializing in AI, Machine Learning, Web Development, Mobile Apps, and Custom Software Solutions. We help businesses transform digitally.",
        "tell me about your services": "We offer: AI & ML Solutions, Computer Vision Intelligence, IoT & Custom Software, Mobile App Development, Web & Backend Development, and Enterprise Solutions. Each tailored to your unique business needs.",
        "how can you help my business?": "We can help you by automating processes, building intelligent systems, developing mobile & web applications, analyzing data for insights, and implementing enterprise solutions. Let's discuss your specific needs!",
      };

      const lowerMessage = message.toLowerCase();
      let response = "Thanks for your question! For more specific information, please contact our sales team or visit our services page.";

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerMessage.includes(key)) {
          response = value;
          break;
        }
      }

      const newBotMessage = {
        id: chatMessages.length + 2,
        type: 'bot',
        text: response
      };
      setChatMessages((prev) => [...prev, newBotMessage]);
    }, 800);
  };

  return (
    <>
      <style>{`
        @keyframes chatbot-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
        .chatbot-pulse-animation {
          animation: chatbot-pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Chat Button - With pulse animation */}
      {!isChatbotOpen && (
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="chatbot-pulse-animation fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-2xl transition-shadow"
        >
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </button>
      )}

      {/* Chat Modal - Responsive sizing */}
      {isChatbotOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-8 sm:right-8 z-50 w-full sm:w-96 h-[100vh] sm:h-auto sm:max-h-[600px] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-blue-500 shadow-lg">
                <svg viewBox="0 0 100 100" className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="4">
                  {/* Main e shape */}
                  <line x1="25" y1="40" x2="25" y2="60" strokeLinecap="round" />
                  <line x1="25" y1="40" x2="50" y2="40" strokeLinecap="round" />
                  <line x1="25" y1="50" x2="48" y2="50" strokeLinecap="round" />
                  <line x1="25" y1="60" x2="50" y2="60" strokeLinecap="round" />
                  {/* Two dots */}
                  <circle cx="60" cy="42" r="3" fill="currentColor" />
                  <circle cx="60" cy="58" r="3" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg">Edanta AI Assistant</h3>
                <p className="text-xs text-blue-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatbotOpen(false)}
              className="hover:bg-purple-700 p-2 rounded-full transition"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs px-4 py-2 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions or Input */}
          {chatMessages.length === 1 && (
            <div className="p-4 border-t border-gray-200 space-y-2 bg-white">
              <p className="text-xs text-gray-500 font-semibold mb-3">Quick questions:</p>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="w-full text-left px-3 py-2 text-sm border border-purple-200 rounded-lg text-gray-700 hover:bg-purple-50 hover:border-purple-400 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input - Always visible */}
          <div className="p-4 border-t border-gray-200 flex gap-2 bg-white">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(userInput)}
              placeholder="Ask me about..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-sm transition"
            />
            <button
              onClick={() => handleSendMessage(userInput)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  const [contactSubject, setContactSubject] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(0);
  const [selectedJob, setSelectedJob] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Welcome! I'm Edanta AI Assistant. I'm here to help you learn about our intelligent solutions and how we can transform your business operations."
    }
  ]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1) || 'home';
    
    // Extract subject if present (format: contact?subject=Something)
    if (hash.startsWith('contact')) {
      const urlParams = hash.includes('?') ? new URLSearchParams(hash.split('?')[1]) : null;
      const subject = urlParams ? urlParams.get('subject') : '';
      setContactSubject(subject || '');
      setCurrentPage('contact');
    }
    // Handle service detail pages
    else if (hash.startsWith('service-')) {
      const serviceIdx = parseInt(hash.split('-')[1]);
      setSelectedService(serviceIdx);
      setCurrentPage('service-detail');
    }
    // Handle industry detail pages
    else if (hash.startsWith('industry-')) {
      const industryIdx = parseInt(hash.split('-')[1]);
      setSelectedIndustry(industryIdx);
      setCurrentPage('industry-detail');
    }
    // Handle blog detail pages
    else if (hash.startsWith('blog-')) {
      const blogIdx = parseInt(hash.split('-')[1]);
      setSelectedBlog(blogIdx);
      setCurrentPage('blog-detail');
    }
    // Handle job application pages
    else if (hash.startsWith('apply-')) {
      const jobIdx = parseInt(hash.split('-')[1]);
      setSelectedJob(jobIdx);
      setCurrentPage('job-application');
    }
    else {
      setContactSubject('');
      setCurrentPage(hash);
    }
    
    window.scrollTo(0, 0);
  };
  
  handleHashChange();
  window.addEventListener('hashchange', handleHashChange);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('hashchange', handleHashChange);
  };
}, []);


  const navigate = (page) => {
    window.location.hash = page;
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        scrolled={scrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        navigate={navigate}
        currentPage={currentPage}
      />
      
      <div className="pt-20">
  {currentPage === 'home' && <HomePage navigate={navigate} />}
  {currentPage === 'about' && <AboutPage navigate={navigate} />}
  {currentPage === 'services' && <ServicesPage navigate={navigate} selectedService={selectedService} setSelectedService={setSelectedService} />}
  {currentPage === 'service-detail' && <ServiceDetailPage selectedService={selectedService} navigate={navigate} />}
  {currentPage === 'industries' && <IndustriesPage selectedIndustry={selectedIndustry} setSelectedIndustry={setSelectedIndustry} />}
  {currentPage === 'industry-detail' && <IndustryDetailPage selectedIndustry={selectedIndustry} navigate={navigate} />}
  {currentPage === 'blog' && <BlogPage navigate={navigate} />}
  {currentPage === 'blog-detail' && <BlogDetailPage selectedBlog={selectedBlog} navigate={navigate} />}
  {currentPage === 'careers' && <CareersPage navigate={navigate} />}
  {currentPage === 'job-application' && <JobApplicationPage selectedJob={selectedJob} navigate={navigate} />}
  {currentPage === 'contact' && <ContactPage contactSubject={contactSubject} />}
</div>
      
      <Footer navigate={navigate} />
      
      {/* Chatbot */}
      <Chatbot 
        isChatbotOpen={isChatbotOpen}
        setIsChatbotOpen={setIsChatbotOpen}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        userInput={userInput}
        setUserInput={setUserInput}
      />
    </div>
  );
}


function Navbar({ scrolled, isMenuOpen, setIsMenuOpen, navigate, currentPage }) {
  const [serviceDropdown, setServiceDropdown] = useState(false);
  const [industryDropdown, setIndustryDropdown] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  const services = [
    { name: 'AI & ML Solutions', idx: 0 },
    { name: 'Computer Vision Intelligence', idx: 1 },
    { name: 'IoT & Custom Software', idx: 2 },
    { name: 'Mobile App Development', idx: 3 },
    { name: 'Web & Backend', idx: 4 },
    { name: 'Enterprise Solutions', idx: 5 }
  ];

  const industries = [
    { name: 'Aerospace & Defence', idx: 0 },
    { name: 'Industrial Manufacturing', idx: 1 },
    { name: 'Energy & Utilities', idx: 2 },
    { name: 'Petrochemical', idx: 3 },
    { name: 'Oil & Gas', idx: 4 },
    { name: 'Healthcare', idx: 5 },
    { name: 'Fitness', idx: 6 },
    { name: 'E-commerce', idx: 7 },
    { name: 'Construction', idx: 8 },
    { name: 'Telecom', idx: 9 }
  ];

  const handleServiceClick = (idx) => {
    setServiceDropdown(false);
    setIsMenuOpen(false);
    setMobileServicesOpen(false);
    window.location.hash = `service-${idx}`;
  };

  const handleIndustryClick = (idx) => {
    setIndustryDropdown(false);
    setIsMenuOpen(false);
    setMobileIndustriesOpen(false);
    window.location.hash = `industry-${idx}`;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button onClick={() => navigate('home')} className="flex items-center space-x-2 flex-shrink-0">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto sm:h-14 md:h-16 lg:h-20 object-contain" loading="eager" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <button
              onClick={() => navigate('home')}
              className={`transition-colors font-medium ${currentPage === 'home' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('about')}
              className={`transition-colors font-medium ${currentPage === 'about' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              About
            </button>

            {/* Services Dropdown - Desktop */}
            <div 
              className="relative group"
              onMouseEnter={() => setServiceDropdown(true)}
              onMouseLeave={() => setServiceDropdown(false)}
            >
              <button
                className={`transition-colors font-medium ${currentPage === 'services' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
              >
                Services
              </button>
              {serviceDropdown && (
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-6xl bg-white rounded-xl shadow-2xl border border-gray-200 py-8 px-8 z-50"
                  onMouseEnter={() => setServiceDropdown(true)}
                  onMouseLeave={() => setServiceDropdown(false)}
                >
                  <div className="grid grid-cols-3 gap-8">
                    {[
                      { name: 'AI & ML Solutions', desc: 'Artificial Intelligence, GenAI, NLP, Data Analytics, and custom LLM development for enterprises.', bgColor: 'bg-green-50', icon: <Code className="w-10 h-10" /> },
                      { name: 'Computer Vision Intelligence', desc: 'Advanced image recognition, object detection, video analytics, and visual intelligence solutions for enterprise applications.', bgColor: 'bg-blue-50', icon: <Cloud className="w-10 h-10" /> },
                      { name: 'IoT & Custom Software', desc: 'Smart connected systems and custom enterprise applications tailored to your business needs.', bgColor: 'bg-orange-50', icon: <Globe className="w-10 h-10" /> },
                      { name: 'Mobile App Development', desc: 'Cross-platform mobile applications for iOS and Android with seamless user experiences.', bgColor: 'bg-pink-50', icon: <Briefcase className="w-10 h-10" /> },
                      { name: 'Web & Backend', desc: 'Robust web platforms, backend systems, and APIs for modern businesses.', bgColor: 'bg-purple-50', icon: <Zap className="w-10 h-10" /> },
                      { name: 'Enterprise Solutions', desc: 'End-to-end enterprise solutions with ERP, CRM, and business intelligence integration.', bgColor: 'bg-orange-50', icon: <Shield className="w-10 h-10" /> }
                    ].map((service, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleServiceClick(idx)}
                        className={`${service.bgColor} p-6 rounded-lg hover:shadow-lg transition-all duration-200 text-left`}
                      >
                        <div className="text-gray-700 mb-4">{service.icon}</div>
                        <p className="text-base font-bold text-gray-900 mb-3">{service.name}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{service.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Industries Dropdown - Desktop */}
            <div 
              className="relative group"
              onMouseEnter={() => setIndustryDropdown(true)}
              onMouseLeave={() => setIndustryDropdown(false)}
            >
              <button
                className={`transition-colors font-medium ${currentPage === 'industries' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
              >
                Industries
              </button>
              {industryDropdown && (
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-6xl bg-white rounded-xl shadow-2xl border border-gray-200 py-8 px-8 z-50"
                  onMouseEnter={() => setIndustryDropdown(true)}
                  onMouseLeave={() => setIndustryDropdown(false)}
                >
                  <div className="grid grid-cols-5 gap-6">
                    {industries.map((industry, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleIndustryClick(idx)}
                        className="p-4 rounded-lg bg-gray-50 hover:bg-purple-50 hover:shadow-md transition-all duration-200 text-left border border-gray-100 hover:border-purple-200"
                      >
                        <p className="text-sm font-bold text-gray-900 mb-2">{industry.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('blog')}
              className={`transition-colors font-medium ${currentPage === 'blog' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Blog
            </button>
            <button
              onClick={() => navigate('careers')}
              className={`transition-colors font-medium ${currentPage === 'careers' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Careers
            </button>
            <button
              onClick={() => navigate('contact')}
              className={`transition-colors font-medium ${currentPage === 'contact' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Contact
            </button>

            <button
              onClick={() => navigate('contact')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:opacity-90 transition-all text-white font-semibold shadow-lg text-sm sm:text-base whitespace-nowrap"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t max-h-[80vh] overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button
              onClick={() => { navigate('home'); setIsMenuOpen(false); }}
              className="block w-full text-left py-3 text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => { navigate('about'); setIsMenuOpen(false); }}
              className="block w-full text-left py-3 text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              About
            </button>

            {/* Mobile Services Dropdown */}
            <div className="border-b border-gray-200 pb-2">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Services
                <ChevronRight className={`w-5 h-5 transition-transform ${mobileServicesOpen ? 'rotate-90' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {services.map((service, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleServiceClick(idx)}
                      className="block w-full text-left py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Industries Dropdown */}
            <div className="border-b border-gray-200 pb-2">
              <button
                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Industries
                <ChevronRight className={`w-5 h-5 transition-transform ${mobileIndustriesOpen ? 'rotate-90' : ''}`} />
              </button>
              {mobileIndustriesOpen && (
                <div className="pl-4 space-y-2 mt-2 max-h-64 overflow-y-auto">
                  {industries.map((industry, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleIndustryClick(idx)}
                      className="block w-full text-left py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {industry.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => { navigate('blog'); setIsMenuOpen(false); }}
              className="block w-full text-left py-3 text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Blog
            </button>
            <button
              onClick={() => { navigate('careers'); setIsMenuOpen(false); }}
              className="block w-full text-left py-3 text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Careers
            </button>
            <button
              onClick={() => { navigate('contact'); setIsMenuOpen(false); }}
              className="block w-full text-left py-3 text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Contact
            </button>

            {/* Mobile Get Started Button */}
            <button
              onClick={() => { navigate('contact'); setIsMenuOpen(false); }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-full hover:opacity-90 transition-all text-white font-semibold shadow-lg mt-4"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
function HomePage({ navigate }) {

  return (
    <>
      <section className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400 via-blue-500 to-purple-600 opacity-70 animate-pulse"></div>
        
        <div className="absolute inset-0 bg-white/85" style={{clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)'}}></div>
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900">
              Technology Solutions
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent mt-2">
                to Grow Your Business
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-medium">
              From AI analytics to custom software development, we deliver cutting-edge solutions that drive innovation and success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('contact')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all flex items-center gap-2 w-full sm:w-auto justify-center text-white shadow-xl"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('services')}
                className="border-2 border-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-all w-full sm:w-auto text-center text-purple-600"
              >
                Explore Services
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { value: "10+", label: "Real Projects" },
              { value: "Founder-Led", label: "Development" },
              { value: "Direct", label: "Communication" },
              { value: "On-Time", label: "Project Delivery" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-white/90 backdrop-blur-md rounded-xl border border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm md:text-base font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-900">Our Core Services</h2>
            <p className="text-gray-600 text-lg">
              Explore our comprehensive technology solutions for your business growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Code className="w-12 h-12" />, title: "AI & ML Solutions", desc: "Artificial Intelligence, GenAI, NLP, Data Analytics, and custom LLM development for enterprises.", bgColor: "bg-green-50" },
              { icon: <Cloud className="w-12 h-12" />, title: "Computer Vision Intelligence", desc: "Advanced image recognition, object detection, video analytics, and visual intelligence solutions for enterprise applications.", bgColor: "bg-blue-50" },
              { icon: <Globe className="w-12 h-12" />, title: "IoT & Custom Software", desc: "Smart connected systems and custom enterprise applications tailored to your business needs.", bgColor: "bg-orange-50" },
              { icon: <Briefcase className="w-12 h-12" />, title: "Mobile App Development", desc: "Cross-platform mobile applications for iOS and Android with seamless user experiences.", bgColor: "bg-pink-50" },
              { icon: <Zap className="w-12 h-12" />, title: "Web & Backend", desc: "Robust web platforms, backend systems, and APIs for modern businesses.", bgColor: "bg-purple-50" },
              { icon: <Shield className="w-12 h-12" />, title: "Enterprise Solutions", desc: "End-to-end enterprise solutions with ERP, CRM, and business intelligence integration.", bgColor: "bg-orange-50" }
            ].map((service, idx) => (
              <div key={idx} className={`p-8 ${service.bgColor} rounded-lg transition-all duration-300 hover:shadow-lg`}>
                <div className="text-gray-700 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('services')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-full hover:opacity-90 transition-all inline-flex items-center gap-2 text-white font-semibold shadow-lg"
            >
              View All Services <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage({ navigate }) {
  const [currentTeamMember, setCurrentTeamMember] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const sliderImages = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80',
    'https://media.istockphoto.com/id/1185216974/photo/businessman-giving-presentation.jpg?s=612x612&w=0&k=20&c=kGvSb3GQmiXo2vHyeEZK1KSF4nekrRtcjq9ia3Vym68='
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };
  
  const testimonials = [
    { name: "Vikram Patel", role: "CEO, FinTech Solutions", content: "Edanta's AI solution reduced our loan processing time from 5 days to 2 hours. Their team understood our requirements perfectly and delivered beyond expectations.", rating: 5 },
    { name: "Aisha Khan", role: "Co-founder, HealthTech Startup", content: "As a startup with limited budget, Edanta's flexible engagement model was perfect. They helped us build an AI-powered patient management system in 3 months. Best decision for our early stage!", rating: 5 },
    { name: "Deepak Singh", role: "Founder, MarketingAI", content: "Delivered our ML-based customer segmentation tool ahead of schedule. Their agile approach and constant communication made collaboration seamless. Scaled from 0 to 5000 users in 2 months!", rating: 5 }
  ];

  const teamMembers = [
    { name: 'Lokesh Kumar', role: 'CEO & Founder', image: '/ceo.png' },
    { name: 'Sangeeta Singh', role: 'CTO', image: '/cto.png' },
    { name: 'Aryan Mehta', role: 'VP Engineering', image: '/ve.png' },
    { name: 'Neha Patel', role: 'VP Sales', image: '/vs.png' }
  ];

  const nextTeamMember = () => {
    setCurrentTeamMember((prev) => (prev + 1) % teamMembers.length);
  };

  const prevTeamMember = () => {
    setCurrentTeamMember((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  useEffect(() => {
    const autoPlayTimer = setInterval(() => {
      setCurrentTeamMember((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(autoPlayTimer);
  }, [teamMembers.length]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900">About Us</h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Passionate experts helping businesses thrive in the digital age
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
            <p className="text-gray-600 text-lg mb-6">
              Founded in 2024, we've grown to become a leading technology solutions provider with fastest delivering innovative digital solutions across industries.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              Our team of experts specializes in cutting-edge technologies including AI, machine learning, computer vision, and data analytics, helping businesses transform their operations and achieve their goals.
            </p>
            <div className="space-y-4">
              {["Customer-centric approach", "Agile methodology", "24/7 dedicated support", "Secure & scalable solutions"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              {/* Carousel Container */}
              <div className="relative h-96 md:h-[500px] bg-gray-900 overflow-hidden">
                {/* Images with slide animation */}
                {sliderImages.map((image, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      idx === currentSlide 
                        ? 'translate-x-0 opacity-100 z-20' 
                        : 'translate-x-full opacity-0 z-10'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Slide ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
                >
                  <ChevronRight className="w-6 h-6 transform rotate-180 text-purple-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
                >
                  <ChevronRight className="w-6 h-6 text-purple-600" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                  {sliderImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === currentSlide
                          ? 'bg-purple-600 w-8'
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: 'Our Mission',
              icon: <Zap className="w-12 h-12" />,
              content: 'To deliver innovative technology solutions that empower businesses to achieve their digital transformation goals and drive sustainable growth.'
            },
            {
              title: 'Our Vision',
              icon: <Globe className="w-12 h-12" />,
              content: 'To be the most trusted technology partner, recognized globally for delivering cutting-edge solutions that create meaningful impact.'
            },
            {
              title: 'Core Values',
              icon: <Heart className="w-12 h-12" />,
              content: 'Innovation, Integrity, Customer-Focus, Excellence, and Collaboration drive everything we do in serving our clients.'
            }
          ].map((item, idx) => (
            <div key={idx} className="group p-8 bg-white rounded-xl border border-purple-200 hover:border-purple-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-purple-600 mb-4 group-hover:text-blue-600 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>

        {/* Our Team Section - Carousel */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Meet Our Leadership Team</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">Experienced professionals dedicated to driving innovation</p>
          </div>
          
          <div className="max-w-2xl mx-auto px-4">
            {/* Team Member Display */}
            <div className="flex flex-col items-center text-center py-4">
              <div className="mb-4 relative h-40 w-40">
                <img
                  src={teamMembers[currentTeamMember].image}
                  alt={teamMembers[currentTeamMember].name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-purple-200 shadow-lg transition-all duration-700"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{teamMembers[currentTeamMember].name}</h3>
              <p className="text-lg text-purple-600 font-semibold">{teamMembers[currentTeamMember].role}</p>
            </div>
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Our Technology Stack</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Leveraging the best technologies to build tomorrow's solutions</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: 'Artificial Intelligence', icon: <Code className="w-10 h-10" /> },
              { name: 'Machine Learning', icon: <Zap className="w-10 h-10" /> },
              { name: 'Computer Vision', icon: <Globe className="w-10 h-10" /> },
              { name: 'Data Analytics', icon: <BarChart3 className="w-10 h-10" /> },
              { name: 'Cloud Computing', icon: <Cloud className="w-10 h-10" /> }
            ].map((tech, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 hover:border-purple-500 text-center group transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                <div className="text-purple-600 mb-3 group-hover:text-blue-600 transition-colors flex justify-center">
                  {tech.icon}
                </div>
                <p className="font-semibold text-gray-900 text-sm">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Why Choose Us</h2>
            <p className="text-gray-600 text-lg">What sets us apart from the competition</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Expert Team', desc: 'Experienced professionals with deep expertise in cutting-edge technologies', icon: <Users className="w-8 h-8" /> },
              { title: 'Proven Track Record', desc: '15+ years delivering successful projects to 200+ satisfied clients', icon: <CheckCircle className="w-8 h-8" /> },
              { title: '24/7 Support', desc: 'Dedicated support team available round-the-clock for your needs', icon: <Clock className="w-8 h-8" /> },
              { title: 'Innovation Driven', desc: 'Constantly innovating to stay ahead of industry trends', icon: <Zap className="w-8 h-8" /> },
              { title: 'Scalable Solutions', desc: 'Solutions that grow with your business needs', icon: <TrendingUp className="w-8 h-8" /> },
              { title: 'Cost Effective', desc: 'Competitive pricing without compromising on quality', icon: <DollarSign className="w-8 h-8" /> }
            ].map((item, idx) => (
              <div key={idx} className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-purple-200 hover:border-purple-500">
                <div className="text-purple-600 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">What Our Clients Say</h2>
          
          <div className="max-w-6xl mx-auto px-4">
            {/* Testimonial Carousel - 3 Cards Layout */}
            <div className="relative flex items-center justify-center">
              {/* Left Arrow */}
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-0 z-10 p-3 text-purple-600 hover:text-white hover:bg-purple-600 rounded-full transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Cards Container */}
              <div className="w-full px-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[0, 1, 2].map((offset) => {
                    const index = (currentTestimonial + offset) % testimonials.length;
                    const testimonial = testimonials[index];
                    
                    return (
                      <div
                        key={index}
                        className="p-8 bg-white rounded-xl border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105"
                      >
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-6 italic text-base leading-relaxed">"{testimonial.content}"</p>
                        <div className="border-t border-purple-200 pt-6">
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.role}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-0 z-10 p-3 text-purple-600 hover:text-white hover:bg-purple-600 rounded-full transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Auto-play Timer */}
              {useEffect(() => {
                const autoPlayTimer = setInterval(() => {
                  setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
                }, 5000);
                return () => clearInterval(autoPlayTimer);
              }, [testimonials.length]), null}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 sm:p-12 border border-purple-200">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Ready to Start Your Project?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with innovative technology solutions.
            </p>
            <button
              onClick={() => navigate('contact')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all text-white shadow-lg"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesPage({ navigate }) {
  const services = [
    {
      idx: 0,
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Web Engineering",
      description: "Architecting high-performance, SEO-optimized digital ecosystems. We specialize in ultra-fast, accessible web applications that scale.",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
      features: ["Next.js 15 & React Server Components", "Performance First (100 Lighthouse)", "Headless Commerce (Shopify/Payload)", "Edge Computing & Vercel"],
      techStack: ["TypeScript", "TailwindCSS", "PostgreSQL", "Redis"],
      stats: "99.9% Core Web Vital Score",
      color: "from-blue-600 to-cyan-500"
    },
    {
      idx: 1,
      icon: <Briefcase className="w-8 h-8" />,
      title: "Mobile App Development",
      description: "Native-quality cross-platform applications. We deliver seamless UX with hardware-level performance integration.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      features: ["React Native & Expo Router", "Flutter Enterprise Apps", "Offline-First Sync Engine", "Swift/Kotlin Bridges"],
      techStack: ["Firebase", "GraphQL", "Bluetooth LE", "Stripe SDK"],
      stats: "4.8+ Avg App Store Rating",
      color: "from-purple-600 to-pink-500"
    },
    {
      idx: 2,
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud & DevOps Architecture",
      description: "Infrastructure as Code (IaC) solutions designed for zero-downtime and automated scaling in multi-cloud environments.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      features: ["Kubernetes (EKS/GKE) Orchestration", "Terraform & Pulumi IaC", "CI/CD Pipeline Automation", "Serverless Microservices"],
      techStack: ["AWS", "Docker", "GitHub Actions", "Terraform"],
      stats: "Zero-Downtime Deployment",
      color: "from-indigo-600 to-blue-500"
    },
    {
      idx: 3,
      icon: <Zap className="w-8 h-8" />,
      title: "Computer Vision & Robotics",
      description: "AI that sees and understands. From industrial defect detection to real-time spatial analysis and facial recognition.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      features: ["YOLOv10 Real-time Detection", "Medical Image Segmentation", "Autonomous Navigation Systems", "Edge AI Implementation"],
      techStack: ["Python", "PyTorch", "OpenCV", "TensorRT"],
      stats: "99.2% Detection Accuracy",
      color: "from-orange-500 to-red-600"
    },
    {
      idx: 4,
      icon: <Lock className="w-8 h-8" />,
      title: "Cybersecurity & Pentesting",
      description: "Fortifying your digital assets against evolving threats through proactive defense and ethical hacking methodologies.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      features: ["SOC2 & HIPAA Compliance", "Vulnerability Assessment", "Zero Trust Architecture", "Encrypted Data Pipelines"],
      techStack: ["Kali Linux", "Burp Suite", "Wireshark", "Auth0"],
      stats: "24/7 Threat Mitigation",
      color: "from-slate-700 to-slate-900"
    },
    {
      idx: 5,
      icon: <Shield className="w-8 h-8" />,
      title: "Generative AI & LLMs",
      description: "Custom Large Language Models and RAG (Retrieval-Augmented Generation) systems tailored to your proprietary data.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      features: ["Custom GPT/LLama Fine-tuning", "RAG Pipeline Development", "Agentic AI Workflows", "Vector Database Integration"],
      techStack: ["LangChain", "Pinecone", "OpenAI API", "HuggingFace"],
      stats: "70% Faster Data Analysis",
      color: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafafa] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-24">
          <h2 className="text-sm font-bold text-purple-600 uppercase tracking-[0.3em] mb-4">Enterprise Capabilities</h2>
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-gray-900 tracking-tight">
            Our Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Specializations</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
            We operate at the intersection of robust engineering and innovative design, solving complex 
            problems with modern tech stacks.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
          {services.map((service) => (
            <div key={service.idx} className="group relative">
              <div className="relative z-10 bg-white rounded-[2.5rem] h-full flex flex-col shadow-2xl shadow-gray-200/40 border border-gray-100 overflow-hidden hover:border-purple-200 transition-colors duration-500">
                
                {/* Image & Badge */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                     <span className="text-white font-bold text-sm bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30">
                        {service.stats}
                     </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 pt-10 flex-1 flex flex-col">
                  <div className={`absolute top-56 left-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-2xl z-20 border-4 border-white`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-black mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-8 flex-1">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs font-bold text-gray-600">
                        <div className="mt-0.5"><CheckCircle className="w-4 h-4 text-emerald-500" /></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-[10px] font-black uppercase text-gray-500 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(`service-${service.idx}`)}
                    className="flex items-center justify-between w-full p-4 bg-gray-50 text-gray-900 rounded-2xl font-bold hover:bg-gray-900 hover:text-white transition-all duration-300 group/btn"
                  >
                    Deep Dive
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Image Placement for Visualization */}
        <div className="mb-24">
            
        </div>

        {/* Enhanced Process Section */}
        <div className="bg-white rounded-[4rem] p-12 lg:p-20 shadow-xl border border-gray-100">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-gray-900">How We Execute</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { step: "01", title: "Discovery", desc: "Technical feasibility and deep requirements gathering." },
                { step: "02", title: "Prototype", desc: "Rapid UI/UX prototyping and architecture planning." },
                { step: "03", title: "Develop", desc: "Agile sprints with weekly builds and QA cycles." },
                { step: "04", title: "Scale", desc: "Cloud deployment and post-launch performance tuning." }
              ].map((item, i) => (
                <div key={i} className="relative">
                  <span className="text-7xl font-black text-gray-50 absolute -top-10 -left-4 z-0">{item.step}</span>
                  <div className="relative z-10">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}


function IndustriesPage() {
  const industries = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Healthcare",
      description: "Digital solutions for healthcare providers, hospitals, and medical practices.",
      solutions: ["Patient Management Systems", "Telemedicine Platforms", "Medical Data Analytics", "HIPAA Compliant Solutions"]
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Finance & Banking",
      description: "Secure and scalable solutions for financial institutions.",
      solutions: ["Banking Apps", "Payment Gateways", "Financial Analytics", "Fraud Detection Systems"]
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "E-Commerce & Retail",
      description: "Comprehensive e-commerce platforms and retail solutions.",
      solutions: ["Online Stores", "Inventory Management", "Customer Analytics", "Mobile Shopping Apps"]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Education",
      description: "E-learning platforms and educational technology solutions.",
      solutions: ["Learning Management Systems", "Virtual Classrooms", "Student Analytics", "Educational Apps"]
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Manufacturing",
      description: "Industry 4.0 solutions for modern manufacturing.",
      solutions: ["Production Monitoring", "Quality Control Systems", "Supply Chain Management", "Predictive Maintenance"]
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Technology & Startups",
      description: "Innovative solutions for tech companies and startups.",
      solutions: ["MVP Development", "Scalable Architecture", "Cloud Infrastructure", "API Development"]
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900">Industries We Serve</h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Delivering specialized solutions across multiple industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-xl border border-purple-200 hover:border-purple-400 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <div className="text-purple-600 mb-4">
                {industry.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">{industry.title}</h3>
              <p className="text-gray-600 mb-6">{industry.description}</p>
              <ul className="space-y-2">
                {industry.solutions.map((solution, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPage({ navigate }) {
  const blogPosts = [
    {
      title: "The Future of AI in Business",
      excerpt: "Discover how artificial intelligence is transforming modern business operations and decision-making.",
      date: "Nov 15, 2024",
      category: "AI & ML",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    },
    {
      title: "Building Scalable Web Applications",
      excerpt: "Best practices for developing web applications that grow seamlessly with your business needs.",
      date: "Nov 10, 2024",
      category: "Development",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
    },
    {
      title: "Data Analytics: Unlocking Business Insights",
      excerpt: "Learn how data analytics can drive better decision-making and improve business outcomes.",
      date: "Nov 5, 2024",
      category: "Analytics",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
      title: "Computer Vision Applications in 2024",
      excerpt: "Exploring the latest applications of computer vision technology across various industries.",
      date: "Oct 28, 2024",
      category: "AI & ML",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=800&q=80"
    },
    {
      title: "Power BI Tips for Better Dashboards",
      excerpt: "Essential tips and tricks for creating impactful Power BI dashboards and reports.",
      date: "Oct 20, 2024",
      category: "Analytics",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
      title: "Mobile App Development Trends",
      excerpt: "Stay ahead with the latest trends and technologies in mobile application development.",
      date: "Oct 15, 2024",
      category: "Development",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900">Our Blog</h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
            Insights, trends, and best practices in technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <article
              key={idx}
              onClick={() => navigate(`blog-${idx}`)}
              className="bg-white rounded-xl overflow-hidden border border-purple-200 hover:border-purple-400 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-purple-600 hover:text-blue-600 font-semibold flex items-center gap-2">
                  Read More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 

function BlogDetailPage({ selectedBlog, navigate }) {
  const blogPostsData = [
    {
      title: "The Future of AI in Business",
      excerpt: "Discover how artificial intelligence is transforming modern business operations and decision-making.",
      date: "Nov 15, 2024",
      updatedDate: "2 days ago",
      category: "AI & ML",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
      author: {
        name: "Dr. Sarah Chen",
        role: "Chief AI Strategist",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
      },
      content: {
        intro: "In today's fast-paced business world, artificial intelligence has moved from science fiction to business reality. Companies across all industries are leveraging AI to automate processes, gain insights, and create competitive advantages that were impossible just a few years ago.",
        sections: [
          {
            heading: "The AI Revolution in Enterprise",
            content: "Artificial Intelligence is no longer a futuristic concept—it's here, transforming how businesses operate at every level. From customer service chatbots to predictive analytics, AI is reshaping the corporate landscape in profound ways.\n\nCompanies that embrace AI are seeing remarkable returns: automated processes that once took hours now complete in seconds, customer insights that used to require teams of analysts are generated instantly, and decision-making that relied on gut feeling is now backed by data-driven intelligence.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
            caption: "AI-powered systems are revolutionizing business operations across industries"
          },
          {
            heading: "Key AI Applications Driving Business Value",
            content: "Let's explore the most impactful AI applications transforming businesses today:",
            list: [
              "**Intelligent Customer Service**: AI chatbots and virtual assistants handle 24/7 customer inquiries, resolving 70-80% of queries automatically while providing instant, personalized responses.",
              "**Predictive Analytics**: Machine learning models forecast demand, identify trends, and predict customer behavior with unprecedented accuracy, enabling proactive business strategies.",
              "**Process Automation**: Robotic Process Automation (RPA) combined with AI handles repetitive tasks, from data entry to invoice processing, freeing employees for strategic work.",
              "**Fraud Detection**: AI systems monitor millions of transactions in real-time, identifying suspicious patterns and preventing fraud before it impacts your business.",
              "**Personalization at Scale**: Recommendation engines analyze customer behavior to deliver personalized product suggestions, content, and experiences to millions of users simultaneously."
            ]
          },
          {
            heading: "Real-World Success Stories",
            content: "The impact of AI isn't theoretical—companies are achieving measurable results:",
            quote: "After implementing AI-powered predictive maintenance, we reduced equipment downtime by 50% and maintenance costs by 40%. The ROI was evident within the first six months.",
            quoteAuthor: "Manufacturing Executive, Fortune 500 Company"
          },
          {
            heading: "Implementing AI in Your Organization",
            content: "Successfully integrating AI requires a strategic approach:",
            list: [
              "**Start with Clear Objectives**: Identify specific business problems AI can solve rather than implementing technology for its own sake.",
              "**Ensure Data Quality**: AI is only as good as the data it's trained on. Invest in data infrastructure and governance.",
              "**Begin with Pilot Projects**: Test AI solutions on smaller scale projects before enterprise-wide deployment.",
              "**Invest in Talent**: Build teams that combine domain expertise with technical AI/ML skills.",
              "**Focus on Change Management**: Prepare your organization for AI adoption through training and cultural shift."
            ]
          },
          {
            heading: "The Road Ahead",
            content: "As AI technology continues to evolve, businesses that embrace it strategically will thrive. The key is not to wait for perfection but to start experimenting, learning, and scaling what works.\n\nThe future of business isn't about replacing humans with AI—it's about augmenting human capabilities, enabling teams to focus on creative, strategic work while AI handles repetitive tasks and provides data-driven insights.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
            caption: "The future of work combines human creativity with AI-powered insights"
          }
        ],
        conclusion: "Artificial Intelligence is transforming business at an unprecedented pace. Organizations that strategically implement AI solutions—starting with clear objectives, ensuring quality data, and focusing on measurable outcomes—are seeing dramatic improvements in efficiency, customer satisfaction, and competitive advantage. The question is no longer whether to adopt AI, but how quickly you can integrate it to stay ahead."
      }
    },
    {
      title: "Building Scalable Web Applications",
      excerpt: "Best practices for developing web applications that grow seamlessly with your business needs.",
      date: "Nov 10, 2024",
      updatedDate: "1 week ago",
      category: "Development",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
      author: {
        name: "Michael Rodriguez",
        role: "Senior Software Architect",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
      },
      content: {
        intro: "Building web applications that can handle growth from hundreds to millions of users requires careful architectural decisions from day one. Learn the principles and patterns that enable true scalability.",
        sections: [
          {
            heading: "The Scalability Challenge",
            content: "Every successful application faces the same challenge: handling exponential growth without compromising performance. What works for 100 users often breaks down at 10,000, and completely fails at 1 million.\n\nScalability isn't just about handling more traffic—it's about maintaining fast response times, ensuring reliability, and controlling costs as your user base grows.",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
            caption: "Modern web applications must scale to handle millions of concurrent users"
          },
          {
            heading: "Architecture Principles for Scale",
            content: "Building scalable applications starts with the right architectural foundation:",
            list: [
              "**Microservices Architecture**: Break monolithic applications into independent services that can scale independently based on demand.",
              "**Stateless Design**: Design services to be stateless, storing session data in distributed caches or databases rather than in-memory.",
              "**Database Optimization**: Implement read replicas, sharding, and caching strategies to handle database load at scale.",
              "**Asynchronous Processing**: Move long-running tasks to background job queues to keep API responses fast.",
              "**API-First Design**: Build APIs that can serve web, mobile, and future platforms without duplication."
            ]
          },
          {
            heading: "Performance Optimization Strategies",
            content: "Performance at scale requires optimization at every layer:",
            list: [
              "**Content Delivery Networks (CDN)**: Serve static assets from edge locations close to users worldwide.",
              "**Redis Caching**: Cache frequently accessed data to reduce database load by 80-90%.",
              "**Load Balancing**: Distribute traffic across multiple servers for reliability and performance.",
              "**Database Indexing**: Proper indexes can improve query performance from seconds to milliseconds.",
              "**Code Optimization**: Profile and optimize hot paths in your code that handle the most requests."
            ],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            caption: "Performance monitoring dashboards help identify bottlenecks before they impact users"
          },
          {
            heading: "Infrastructure as Code",
            content: "Modern scalable applications treat infrastructure as code, enabling automated deployment and scaling:",
            quote: "Infrastructure as Code transformed our deployment process. What used to take days now happens in minutes, and we can scale automatically based on demand.",
            quoteAuthor: "DevOps Engineer, Tech Startup"
          },
          {
            heading: "Cost-Effective Scaling",
            content: "Scalability doesn't have to break the bank. Smart architectural decisions can dramatically reduce costs:\n\n- Auto-scaling: Scale resources up during peak hours and down during off-peak to optimize cloud costs.\n- Serverless Functions: Pay only for actual compute time rather than running servers 24/7.\n- Database Optimization: Optimize queries and indexes before throwing hardware at the problem.\n- CDN Usage: Reduce bandwidth costs by serving static content from CDNs.\n- Monitoring & Alerting: Catch performance issues early before they require expensive emergency fixes."
          }
        ],
        conclusion: "Building scalable web applications is part art, part science. By following proven architectural patterns, optimizing performance at every layer, and leveraging modern cloud infrastructure, you can build applications that grow seamlessly from startup to enterprise scale while controlling costs and maintaining exceptional user experiences."
      }
    },
    {
      title: "Data Analytics: Unlocking Business Insights",
      excerpt: "Learn how data analytics can drive better decision-making and improve business outcomes.",
      date: "Nov 5, 2024",
      updatedDate: "2 weeks ago",
      category: "Analytics",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      author: {
        name: "Emily Thompson",
        role: "Data Science Lead",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop"
      },
      content: {
        intro: "In the age of big data, companies that leverage analytics effectively gain significant competitive advantages. Data analytics transforms raw numbers into actionable insights that drive strategic decisions and improve business outcomes.",
        sections: [
          {
            heading: "The Data-Driven Organization",
            content: "Data-driven companies make decisions based on evidence rather than intuition. They collect, analyze, and act on data systematically, leading to better outcomes across all business functions.\n\nThe benefits are clear: reduced costs, improved customer satisfaction, faster time to market, and competitive differentiation. But becoming data-driven requires more than just collecting data—it requires culture, processes, and technology working in harmony.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            caption: "Modern analytics platforms enable real-time business intelligence"
          },
          {
            heading: "Types of Analytics That Drive Value",
            content: "Different types of analytics serve different business needs:",
            list: [
              "**Descriptive Analytics**: What happened? Dashboards and reports showing historical performance and KPIs.",
              "**Diagnostic Analytics**: Why did it happen? Root cause analysis and detailed investigation of trends.",
              "**Predictive Analytics**: What will happen? Machine learning models forecasting future outcomes.",
              "**Prescriptive Analytics**: What should we do? AI recommendations for optimal actions based on data.",
              "**Real-Time Analytics**: What's happening now? Live dashboards showing current state for immediate action."
            ]
          },
          {
            heading: "Building a Data Analytics Strategy",
            content: "Successful analytics initiatives follow a strategic approach:",
            list: [
              "**Define Clear Objectives**: Start with business questions you need answered, not with technology.",
              "**Ensure Data Quality**: Garbage in, garbage out. Invest in data governance and quality processes.",
              "**Choose the Right Tools**: Select analytics platforms that match your team's skills and business needs.",
              "**Foster Data Literacy**: Train employees across the organization to understand and use data.",
              "**Start Small, Scale Fast**: Begin with high-impact use cases and expand as you prove value."
            ],
            quote: "Data analytics helped us reduce customer churn by 35% by identifying at-risk customers early and taking proactive retention actions.",
            quoteAuthor: "VP of Customer Success, SaaS Company"
          },
          {
            heading: "Common Analytics Use Cases",
            content: "Organizations are applying analytics across diverse business functions:",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            caption: "Interactive dashboards make complex data accessible to non-technical users"
          },
          {
            heading: "Overcoming Analytics Challenges",
            content: "While the benefits of analytics are clear, organizations face common challenges:\n\n- Data Silos: Break down departmental barriers by implementing unified data platforms.\n- Skills Gap: Invest in training or partner with analytics experts to build capabilities.\n- Tool Overload: Consolidate analytics tools to reduce complexity and improve adoption.\n- Change Resistance: Demonstrate quick wins to build momentum and secure buy-in.\n- Data Privacy: Implement robust governance ensuring compliance with regulations like GDPR."
          }
        ],
        conclusion: "Data analytics is no longer optional for competitive businesses—it's essential. Organizations that invest in analytics infrastructure, develop data literacy across teams, and apply insights systematically to business decisions consistently outperform their competitors. The key is starting with clear business objectives and scaling what works."
      }
    },
    {
      title: "Computer Vision Applications in 2024",
      excerpt: "Exploring the latest applications of computer vision technology across various industries.",
      date: "Oct 28, 2024",
      updatedDate: "3 weeks ago",
      category: "AI & ML",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=1200&q=80",
      author: {
        name: "Dr. James Park",
        role: "Computer Vision Researcher",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
      },
      content: {
        intro: "Computer vision—the technology enabling machines to interpret visual information—is experiencing explosive growth. From autonomous vehicles to medical diagnostics, computer vision is transforming industries by automating visual tasks that once required human expertise.",
        sections: [
          {
            heading: "Computer Vision: A Brief Overview",
            content: "Computer vision enables machines to extract meaning from digital images and videos. Using deep learning and neural networks, modern computer vision systems can identify objects, detect faces, read text, and understand scenes with human-level accuracy—or better.\n\nThe technology has matured rapidly thanks to advances in deep learning, increased computing power, and availability of massive training datasets. What required PhD-level expertise five years ago can now be implemented by software engineers using pre-trained models and cloud APIs.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
            caption: "Modern computer vision systems can detect and classify objects in real-time"
          },
          {
            heading: "Manufacturing & Quality Control",
            content: "Computer vision is revolutionizing quality control in manufacturing:",
            list: [
              "**Defect Detection**: Automated visual inspection identifies defects with 99%+ accuracy, far exceeding human inspection.",
              "**Assembly Verification**: Cameras verify correct component placement and assembly steps in real-time.",
              "**Predictive Maintenance**: Visual monitoring of equipment detects wear and tear before failures occur.",
              "**Safety Compliance**: Systems ensure workers wear required safety equipment and detect unsafe conditions."
            ],
            quote: "Computer vision reduced our defect rate by 60% and inspection time by 80%. The ROI was achieved in under 6 months.",
            quoteAuthor: "Quality Director, Electronics Manufacturer"
          },
          {
            heading: "Healthcare & Medical Imaging",
            content: "Computer vision is enhancing medical diagnostics and patient care:",
            list: [
              "**Medical Image Analysis**: AI assists radiologists in detecting tumors, fractures, and anomalies in X-rays, CT scans, and MRIs.",
              "**Pathology Screening**: Automated analysis of tissue samples speeds up cancer diagnosis.",
              "**Surgical Assistance**: Real-time computer vision guides surgeons during minimally invasive procedures.",
              "**Patient Monitoring**: Video analysis tracks patient movement and detects falls in hospitals and care facilities."
            ],
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
            caption: "AI-powered medical imaging assists doctors in early disease detection"
          },
          {
            heading: "Retail & Customer Experience",
            content: "Retailers are deploying computer vision to enhance operations and customer experience:",
            list: [
              "**Cashierless Stores**: Amazon Go-style stores use computer vision to eliminate checkout lines entirely.",
              "**Inventory Management**: Shelf cameras detect out-of-stock items and misplaced products automatically.",
              "**Customer Analytics**: Video analysis provides insights into store traffic patterns and customer behavior.",
              "**Virtual Try-On**: AR applications use computer vision to let customers virtually try products."
            ]
          },
          {
            heading: "Security & Surveillance",
            content: "Computer vision is making security systems more intelligent and proactive:",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
            caption: "Intelligent surveillance systems detect suspicious behavior patterns in real-time"
          },
          {
            heading: "The Future of Computer Vision",
            content: "Looking ahead, computer vision will become even more powerful and accessible:\n\n- Edge AI: Running computer vision models on-device for faster processing and privacy.\n- 3D Vision: Moving beyond 2D images to understand depth and spatial relationships.\n- Multimodal AI: Combining vision with audio and text for richer understanding.\n- Federated Learning: Training models across distributed devices while preserving privacy.\n- Explainable AI: Making computer vision decisions transparent and interpretable."
          }
        ],
        conclusion: "Computer vision is no longer experimental—it's a proven technology delivering value across industries. Organizations that identify relevant use cases and implement computer vision strategically gain significant operational efficiencies, quality improvements, and competitive advantages. The technology continues to advance rapidly, making now the perfect time to explore its applications for your business."
      }
    },
    {
      title: "Power BI Tips for Better Dashboards",
      excerpt: "Essential tips and tricks for creating impactful Power BI dashboards and reports.",
      date: "Oct 20, 2024",
      updatedDate: "1 month ago",
      category: "Analytics",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      author: {
        name: "Lisa Anderson",
        role: "Business Intelligence Consultant",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop"
      },
      content: {
        intro: "Power BI is a powerful business intelligence tool, but creating truly effective dashboards requires more than just technical skills. These tips will help you design dashboards that drive action and deliver value.",
        sections: [
          {
            heading: "Design for Your Audience",
            content: "The most important rule: know your audience. Executives need high-level KPIs they can scan in seconds. Analysts need detailed data they can drill into. Operations teams need real-time actionable metrics.\n\nBefore building any dashboard, ask: Who will use this? What decisions will they make? What questions do they need answered? Design every element with these answers in mind.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            caption: "Effective dashboards are designed with the end user in mind"
          },
          {
            heading: "Follow Visual Best Practices",
            content: "Good dashboard design follows proven visual principles:",
            list: [
              "**Less is More**: Remove unnecessary elements. Every chart should serve a purpose.",
              "**Consistent Colors**: Use a consistent color scheme. Reserve bright colors for highlighting important data.",
              "**Clear Hierarchies**: Most important metrics at the top, supporting details below.",
              "**Appropriate Charts**: Bar charts for comparisons, line charts for trends, tables for precision.",
              "**White Space**: Don't cram too much into one screen. White space improves readability."
            ]
          },
          {
            heading: "Optimize Performance",
            content: "Slow dashboards don't get used. Optimize performance from the start:",
            list: [
              "**Import vs DirectQuery**: Use Import mode when possible for better performance.",
              "**Efficient DAX**: Write optimized DAX formulas that calculate quickly.",
              "**Aggregate Data**: Pre-aggregate data at the source when dealing with large datasets.",
              "**Reduce Visuals**: Each visual adds load time. Use only what's necessary.",
              "**Incremental Refresh**: Set up incremental refresh for large datasets."
            ],
            quote: "After optimizing our dashboards, load times dropped from 30 seconds to under 3 seconds. User adoption increased dramatically.",
            quoteAuthor: "BI Manager, Financial Services"
          },
          {
            heading: "Enable Self-Service Analytics",
            content: "Great dashboards empower users to find answers themselves:",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            caption: "Interactive filters enable users to explore data on their own"
          },
          {
            heading: "Advanced Tips for Power Users",
            content: "Take your Power BI skills to the next level with these advanced techniques:\n\n- Field Parameters: Create dynamic visuals that users can reconfigure themselves.\n- Bookmarks: Build guided stories through your data with bookmark navigation.\n- Custom Tooltips: Provide context with rich tooltip pages on hover.\n- Mobile Layouts: Design dedicated layouts optimized for mobile viewing.\n- Row-Level Security: Implement security so users see only relevant data.\n- Query Folding: Ensure your transformations push work to the database."
          }
        ],
        conclusion: "Creating effective Power BI dashboards is both an art and a science. By understanding your audience, following design best practices, optimizing performance, and leveraging advanced features, you can build dashboards that drive real business value. Remember: the goal isn't to display data—it's to drive action."
      }
    },
    {
      title: "Mobile App Development Trends",
      excerpt: "Stay ahead with the latest trends and technologies in mobile application development.",
      date: "Oct 15, 2024",
      updatedDate: "1 month ago",
      category: "Development",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
      author: {
        name: "Alex Kumar",
        role: "Mobile Development Lead",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
      },
      content: {
        intro: "Mobile app development continues to evolve rapidly. Stay competitive by understanding the latest trends, technologies, and best practices shaping the industry in 2024 and beyond.",
        sections: [
          {
            heading: "The Rise of Cross-Platform Development",
            content: "Cross-platform frameworks have matured significantly, enabling developers to build high-quality apps for iOS and Android from a single codebase. React Native and Flutter lead the pack, offering native-like performance and extensive ecosystem support.\n\nThe benefits are compelling: faster development, lower costs, and easier maintenance. However, success requires understanding each framework's strengths and choosing the right one for your use case.",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
            caption: "Modern cross-platform frameworks enable building for iOS and Android simultaneously"
          },
          {
            heading: "AI and Machine Learning Integration",
            content: "AI is no longer just for tech giants—mobile apps are embedding intelligence throughout:",
            list: [
              "**Personalization**: Apps adapt content and features based on user behavior and preferences.",
              "**Smart Assistants**: Voice and chat interfaces powered by NLP understand natural language.",
              "**Computer Vision**: Apps recognize objects, faces, and text in images and videos.",
              "**Predictive Features**: ML models anticipate user needs and provide proactive suggestions.",
              "**On-Device AI**: TensorFlow Lite and Core ML enable AI to run locally for privacy and speed."
            ]
          },
          {
            heading: "5G and Enhanced Connectivity",
            content: "5G networks are unlocking new mobile app capabilities:",
            list: [
              "**Real-Time Experiences**: Ultra-low latency enables instant multiplayer gaming and AR/VR.",
              "**High-Quality Streaming**: 4K and 8K video streaming without buffering.",
              "**IoT Integration**: Apps control smart home and industrial IoT devices seamlessly.",
              "**Cloud Gaming**: Stream console-quality games directly to mobile devices.",
              "**Enhanced AR**: More realistic augmented reality with instant 3D object rendering."
            ],
            quote: "5G changed everything for our AR navigation app. The improved latency made our real-time overlays finally feel natural and responsive.",
            quoteAuthor: "CEO, Navigation Tech Startup"
          },
          {
            heading: "Privacy and Security Focus",
            content: "Users and platforms are demanding stronger privacy and security:",
            image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
            caption: "Privacy-first design is now a requirement, not an option"
          },
          {
            heading: "Super Apps and Mini Programs",
            content: "The super app trend, popularized in Asia, is spreading globally. Super apps integrate multiple services—messaging, payments, shopping, transportation—into single platforms.\n\nMini programs (lightweight apps within apps) let businesses reach users without requiring full app downloads. This trend is particularly strong in e-commerce and service industries."
          },
          {
            heading: "Emerging Technologies to Watch",
            content: "Keep an eye on these technologies shaping mobile's future:\n\n- Foldable Devices: Apps must adapt to flexible screens and multiple form factors.\n- Wearables Integration: Closer integration with smartwatches and health devices.\n- Blockchain & Web3: Decentralized apps and cryptocurrency wallets going mainstream.\n- Edge Computing: Processing data closer to users for faster responses.\n- Voice Interfaces: Voice-first interactions becoming standard across apps."
          }
        ],
        conclusion: "Mobile app development in 2024 is characterized by cross-platform frameworks, AI integration, enhanced connectivity, and strict privacy requirements. Staying competitive requires embracing these trends while maintaining focus on fundamentals: great UX, solid performance, and genuine value for users. The future is mobile, and it's more exciting than ever."
      }
    }
  ];

  const post = blogPostsData[selectedBlog];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Blog post not found</h2>
          <button 
            onClick={() => navigate('blog')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <button 
            onClick={() => navigate('blog')}
            className="mb-8 text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-2"
          >
            ← Back to Blog
          </button>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8">
            <img 
              src={post.author.image} 
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold text-gray-900">{post.author.name}</h4>
              <p className="text-sm text-gray-600">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 pb-8 border-b border-gray-200">
            <span>{post.date}</span>
            <span>•</span>
            <span>Updated {post.updatedDate}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 mb-12">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Intro */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            {post.content.intro}
          </p>
        </div>

        {/* Sections */}
        {post.content.sections.map((section, idx) => (
          <div key={idx} className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {section.heading}
            </h2>

            {section.content && (
              <div className="prose prose-lg max-w-none mb-6">
                {section.content.split('\n\n').map((para, pIdx) => (
                  <p key={pIdx} className="text-gray-700 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {section.list && (
              <div className="space-y-4 mb-6">
                {section.list.map((item, lIdx) => (
                  <div key={lIdx} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-purple-600 flex-shrink-0 mt-2"></div>
                    <p className="text-gray-700 leading-relaxed">
                      {item.split('**').map((part, i) => 
                        i % 2 === 0 ? part : <strong key={i} className="font-bold text-gray-900">{part}</strong>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {section.quote && (
              <div className="my-8 border-l-4 border-purple-600 bg-purple-50 p-6 rounded-r-lg">
                <blockquote className="text-lg italic text-gray-700 mb-3">
                  "{section.quote}"
                </blockquote>
                {section.quoteAuthor && (
                  <p className="text-sm font-semibold text-gray-900">
                    — {section.quoteAuthor}
                  </p>
                )}
              </div>
            )}

            {section.image && (
              <div className="my-8">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={section.image} 
                    alt={section.caption || section.heading}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {section.caption && (
                  <p className="text-sm text-gray-600 italic mt-3 text-center">
                    {section.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Conclusion */}
        {post.content.conclusion && (
          <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>
        )}

        {/* Author CTA */}
        <div className="mt-16 p-8 bg-white border border-gray-200 rounded-2xl">
          <div className="flex items-center gap-6 mb-6">
            <img 
              src={post.author.image} 
              alt={post.author.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-1">{post.author.name}</h4>
              <p className="text-gray-600">{post.author.role}</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('contact')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all text-white"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </article>
  );
}

function CareersPage({ navigate }) {
  const openings = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "5-8 years",
      urgent: true,
      description: "Join our engineering team to build innovative web applications using React, Node.js, and cloud technologies.",
      responsibilities: [
        "Lead development of scalable web applications using modern frameworks",
        "Architect cloud-native solutions on AWS/Azure",
        "Mentor junior developers and conduct code reviews",
        "Collaborate with product teams to define technical requirements"
      ],
      requirements: [
        "5+ years experience with React, Node.js, and TypeScript",
        "Strong understanding of microservices architecture",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Excellent problem-solving and communication skills"
      ]
    },
    {
      title: "AI/ML Engineer",
      department: "Data Science",
      location: "Remote",
      type: "Full-time",
      experience: "3-6 years",
      urgent: false,
      description: "Work on cutting-edge AI and machine learning projects, developing computer vision and NLP solutions.",
      responsibilities: [
        "Develop and deploy machine learning models for production",
        "Build computer vision systems for object detection and classification",
        "Implement NLP solutions for text analysis and generation",
        "Optimize model performance and accuracy"
      ],
      requirements: [
        "Strong Python programming and ML framework experience (TensorFlow/PyTorch)",
        "Experience with computer vision or NLP projects",
        "Understanding of ML operations and model deployment",
        "Published research or contributions to open-source ML projects preferred"
      ]
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Hybrid",
      type: "Full-time",
      experience: "3-5 years",
      urgent: false,
      description: "Create beautiful, intuitive user experiences for web and mobile applications.",
      responsibilities: [
        "Design user-centered interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create wireframes, prototypes, and high-fidelity mockups",
        "Collaborate with developers to ensure design implementation"
      ],
      requirements: [
        "3+ years of UI/UX design experience",
        "Proficiency in Figma, Sketch, or Adobe XD",
        "Strong portfolio demonstrating user-centered design",
        "Understanding of responsive design and accessibility standards"
      ]
    },
    {
      title: "Data Analyst",
      department: "Analytics",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "2-4 years",
      urgent: true,
      description: "Transform complex data into actionable insights using Power BI, SQL, and advanced analytics tools.",
      responsibilities: [
        "Create interactive dashboards and reports using Power BI",
        "Analyze business data to identify trends and opportunities",
        "Develop SQL queries for data extraction and analysis",
        "Present insights to stakeholders and recommend actions"
      ],
      requirements: [
        "Strong SQL and Power BI skills",
        "Experience with statistical analysis and data visualization",
        "Excellent analytical and problem-solving abilities",
        "Strong communication skills to present findings"
      ]
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      experience: "4-7 years",
      urgent: false,
      description: "Build and maintain scalable infrastructure using cloud platforms, CI/CD pipelines, and modern DevOps practices.",
      responsibilities: [
        "Design and manage cloud infrastructure (AWS/Azure/GCP)",
        "Implement CI/CD pipelines for automated deployments",
        "Monitor system performance and ensure high availability",
        "Automate infrastructure provisioning using IaC tools"
      ],
      requirements: [
        "Strong experience with Docker, Kubernetes, and container orchestration",
        "Proficiency in Terraform, CloudFormation, or similar IaC tools",
        "Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)",
        "Strong scripting skills (Python, Bash, or PowerShell)"
      ]
    },
    {
      title: "Mobile Developer",
      department: "Engineering",
      location: "Hybrid",
      type: "Full-time",
      experience: "3-6 years",
      urgent: false,
      description: "Develop native and cross-platform mobile applications for iOS and Android using React Native or Flutter.",
      responsibilities: [
        "Build high-quality mobile applications for iOS and Android",
        "Implement responsive UI/UX designs for mobile platforms",
        "Integrate with backend APIs and third-party services",
        "Optimize app performance and handle debugging"
      ],
      requirements: [
        "3+ years of mobile development experience",
        "Proficiency in React Native or Flutter",
        "Experience with native iOS (Swift) or Android (Kotlin) preferred",
        "Understanding of mobile app deployment and app store guidelines"
      ]
    }
  ];

  const benefits = [
    { 
      icon: <Shield className="w-8 h-8" />, 
      title: "Health Insurance", 
      desc: "Comprehensive medical, dental, and vision coverage for you and your family",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop"
    },
    { 
      icon: <Globe className="w-8 h-8" />, 
      title: "Remote Work", 
      desc: "Work from anywhere with flexible schedules and hybrid options",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop"
    },
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: "Learning Budget", 
      desc: "Unlimited learning budget for courses, certifications, and conferences",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop"
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: "Team Events", 
      desc: "Regular team building, offsites, and celebration events",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Life Balance",
      desc: "Flexible hours, mental health support, and generous paid time off",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Top Compensation",
      desc: "Industry-leading salaries, performance bonuses, and equity options",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Modern Tools",
      desc: "Latest MacBooks, software licenses, and state-of-the-art development tools",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      desc: "Fast-track promotions, leadership opportunities, and clear career paths",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    }
  ];

  const stats = [
    { value: "10+", label: "Real Projects" },
    { value: "Founder-Led", label: "Development" },
    { value: "4.8/5", label: "Employee Satisfaction" },
    { value: "On-Time", label: "Project Delivery" }
  ];

  return (
    <section className="bg-gradient-to-b from-white to-purple-50">
      {/* Hero Section */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-gray-900">
              Where Talent Meets <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Transformation</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At Edanta Technologies, we don't just implement technology – we architect the future. Join our elite team of innovators shaping AI, cloud excellence, and digital solutions for global enterprises.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-lg border border-purple-200">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">Why Edanta Technologies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build your career at the innovation frontier with industry-leading benefits and opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="group bg-white rounded-xl border border-purple-200 overflow-hidden hover:border-purple-400 shadow-md hover:shadow-xl transition-all">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-purple-600 mb-3">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Life at Edanta */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">Life at Edanta Technologies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what it's like to be part of a team that values innovation, collaboration, and growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Impactful Work",
                desc: "Drive digital transformation for global enterprises using cutting-edge AI, cloud, and Industry 4.0 solutions",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
              },
              {
                title: "Innovation Culture",
                desc: "Work on bleeding-edge technologies with freedom to experiment and innovate",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
              },
              {
                title: "Global Collaboration",
                desc: "Collaborate with diverse teams worldwide on international projects that matter",
                image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop"
              }
            ].map((item, idx) => (
              <div key={idx} className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Openings */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">Current Openings</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Shape the future with purpose-driven roles at Edanta Technologies
            </p>
          </div>

          <div className="space-y-6">
            {openings.map((job, idx) => (
              <div
                key={idx}
                className="p-8 bg-white rounded-2xl border border-purple-200 hover:border-purple-400 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                      {job.urgent && (
                        <span className="text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                          URGENT
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full font-medium">
                        {job.department}
                      </span>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="text-sm text-gray-600">{job.type}</span>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.experience}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Key Responsibilities:</h4>
                        <ul className="space-y-2">
                          {job.responsibilities.slice(0, 3).map((resp, rIdx) => (
                            <li key={rIdx} className="text-sm text-gray-600 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.slice(0, 3).map((req, rIdx) => (
                            <li key={rIdx} className="text-sm text-gray-600 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`apply-${idx}`)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-full hover:opacity-90 transition-all text-white font-bold whitespace-nowrap shadow-lg text-lg self-start lg:self-center"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Don't See the Right Role?</h2>
          <p className="text-xl mb-8 opacity-95">
            We're always looking for exceptional talent. Send us your resume and let's explore opportunities together.
          </p>
          <button 
            onClick={() => navigate('contact')}
            className="bg-white text-gray-900 px-10 py-5 rounded-full font-bold hover:bg-gray-100 transition-all text-lg shadow-xl"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}

function JobApplicationPage({ selectedJob, navigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    currentCompany: '',
    linkedin: '',
    portfolio: '',
    resume: null,
    coverLetter: ''
  });
  const [sending, setSending] = useState(false);

  const jobsData = [
    { title: "Senior Full Stack Developer", department: "Engineering", location: "Remote / Hybrid", type: "Full-time", experience: "5-8 years" },
    { title: "AI/ML Engineer", department: "Data Science", location: "Remote", type: "Full-time", experience: "3-6 years" },
    { title: "UI/UX Designer", department: "Design", location: "Hybrid", type: "Full-time", experience: "3-5 years" },
    { title: "Data Analyst", department: "Analytics", location: "Remote / Hybrid", type: "Full-time", experience: "2-4 years" },
    { title: "DevOps Engineer", department: "Infrastructure", location: "Remote", type: "Full-time", experience: "4-7 years" },
    { title: "Mobile Developer", department: "Engineering", location: "Hybrid", type: "Full-time", experience: "3-6 years" }
  ];

  const job = jobsData[selectedJob];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.resume) {
      alert('Please fill in all required fields (Name, Email, Phone, and Resume)');
      return;
    }

    setSending(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', '30fd44a6-e13c-4336-8247-7d6aebca5587'); // Replace with your key
      formDataToSend.append('subject', `Job Application: ${job.title} - ${formData.fullName}`);
      formDataToSend.append('from_name', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', job.title);
      formDataToSend.append('location', formData.location || 'Not provided');
      formDataToSend.append('experience', formData.experience || 'Not provided');
      formDataToSend.append('current_company', formData.currentCompany || 'Not provided');
      formDataToSend.append('linkedin', formData.linkedin || 'Not provided');
      formDataToSend.append('portfolio', formData.portfolio || 'Not provided');
      formDataToSend.append('cover_letter', formData.coverLetter || 'Not provided');
      formDataToSend.append('attachment', formData.resume);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        alert(`Thank you for applying to the ${job.title} position! We'll review your application and get back to you soon.`);
        navigate('careers');
      } else {
        throw new Error('Application submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Sorry, there was an error submitting your application. Please try again or email your resume to connect@edantatechnologies.com');
    } finally {
      setSending(false);
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Job not found</h2>
          <button 
            onClick={() => navigate('careers')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('careers')}
          className="mb-8 text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-2"
        >
          ← Back to Careers
        </button>

        <div className="bg-white rounded-2xl p-8 mb-8 border border-purple-200 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{job.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="text-sm text-purple-600 bg-purple-100 px-4 py-2 rounded-full font-semibold">
              {job.department}
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
            <span className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
              {job.type}
            </span>
            <span className="text-sm text-gray-700 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              {job.experience}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-purple-200 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Apply for this Position</h2>
          <p className="text-gray-600 mb-8">
            Fill out the form below and we'll get back to you within 2-3 business days.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="John Doe"
                  required
                  disabled={sending}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="john@example.com"
                  required
                  disabled={sending}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="+91 98765 43210"
                  required
                  disabled={sending}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="Mumbai, India"
                  disabled={sending}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="5 years"
                  disabled={sending}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Company
                </label>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="Tech Corp Inc."
                  disabled={sending}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="https://linkedin.com/in/yourprofile"
                  disabled={sending}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Portfolio / GitHub
                </label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="https://github.com/yourusername"
                  disabled={sending}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Resume / CV *
              </label>
              <input
                type="file"
                name="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
                required
                disabled={sending}
              />
              <p className="text-xs text-gray-500 mt-2">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Letter / Why do you want to join us?
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                disabled={sending}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={sending}
                className={`flex-1 bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-lg text-lg font-bold transition-all text-white shadow-lg flex items-center justify-center gap-2 ${
                  sending ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                }`}
              >
                {sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('careers')}
                disabled={sending}
                className="px-8 py-4 border-2 border-gray-300 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all text-gray-700 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center mt-4">
              By submitting this application, you agree to our Privacy Policy and Terms of Service.
              </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactPage({ contactSubject = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  // Update subject when contactSubject prop changes
  useEffect(() => {
    if (contactSubject) {
      setFormData(prev => ({ ...prev, subject: contactSubject }));
    }
  }, [contactSubject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields (Name, Email, and Message)');
      return;
    }

    setSending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Replace with your actual key
          subject: `Contact Form: ${formData.subject || 'New Inquiry'}`,
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          company: formData.company || 'Not provided',
          inquiry_subject: formData.subject || 'General Inquiry',
          message: formData.message
        })
      });

      const result = await response.json();

      if (result.success) {
        alert('Thank you for your message! We will get back to you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Sorry, there was an error sending your message. Please try again or email us directly at connect@edantatechnologies.com');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-gradient-to-b from-white to-purple-50">
      {/* Hero Section */}
      <div className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://www.link-labs.com/hubfs/Shutterstock_1931473889.webp)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-cyan-900/90"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
            Let's Build Something Amazing Together
          </h1>
          <p className="text-xl sm:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Transform your vision into reality with our expert team. We guide your digital journey with modern, scalable solutions.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Info and Map */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-purple-200 shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Email</h3>
                      <a href="mailto:connect@edantatechnologies.com" className="text-purple-600 hover:text-blue-600 font-medium block break-all text-sm sm:text-base">
                        connect@edantatechnologies.com
                      </a>
                      <a href="mailto:support@edantatechnologies.com" className="text-gray-600 hover:text-purple-600 block break-all text-sm">
                        support@edantatechnologies.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Phone</h3>
                      <a href="tel:+918178306011" className="text-purple-600 hover:text-blue-600 font-medium text-lg block">
                        +91 8178306011
                      </a>
                      <p className="text-gray-600 text-sm">Mon-Fri, 9AM-6PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Office</h3>
                      <p className="text-gray-700 font-medium">Suncity Sector 54</p>
                      <p className="text-gray-600">Gurugram, Haryana, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: <Facebook className="w-5 h-5" />, label: "Facebook", link: "#" },
                      { icon: <Twitter className="w-5 h-5" />, label: "Twitter", link: "#" },
                      { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", link: "#" },
                      { icon: <Instagram className="w-5 h-5" />, label: "Instagram", link: "#" }
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-purple-100 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-purple-600 hover:text-white rounded-xl flex items-center justify-center transition-all transform hover:scale-110 shadow-md"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-2xl border border-purple-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.7179486728987!2d77.08667431508076!3d28.450714082485845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18f3b1e1e7a1%3A0x3e0e0e0e0e0e0e0e!2sSuncity%2C%20Sector%2054%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Edanta Technologies Office Location"
                ></iframe>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-purple-200 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-purple-600" />
                  Business Hours
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Monday - Friday</span>
                    <span className="text-purple-600 font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Saturday</span>
                    <span className="text-purple-600 font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Sunday</span>
                    <span className="text-red-600 font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-purple-200 shadow-xl">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Have a project in mind? Fill out the form and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="John Doe"
                    required
                    disabled={sending}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="john@example.com"
                    required
                    disabled={sending}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="+91 98765 43210"
                    disabled={sending}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="Your Company"
                    disabled={sending}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="How can we help you?"
                    disabled={sending}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                    placeholder="Tell us about your project or inquiry..."
                    required
                    disabled={sending}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-lg text-lg font-bold transition-all text-white shadow-lg flex items-center justify-center gap-2 ${
                    sending ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Why Partner Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Partner With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver exceptional results through expertise, innovation, and dedication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Zap className="w-8 h-8" />, title: "Fast Response", desc: "24-hour response time for all inquiries" },
              { icon: <Users className="w-8 h-8" />, title: "Expert Team", desc: "Experienced professionals across all technologies" },
              { icon: <Shield className="w-8 h-8" />, title: "Proven Track Record", desc: "10+ successful projects delivered" },
              { icon: <Heart className="w-8 h-8" />, title: "Client Focused", desc: "Your success is our priority" }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8 bg-white rounded-2xl border border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="text-purple-600 flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "What services do you offer?", a: "We offer AI & ML Solutions, Computer Vision, IoT & Custom Software, Mobile App Development, Web Development, and Enterprise Solutions tailored to your business needs." },
              { q: "How long does a typical project take?", a: "Project timelines vary based on complexity. Simple projects take 4-8 weeks, while complex enterprise solutions may take 3-6 months. We provide detailed timelines during consultation." },
              { q: "Do you work with startups?", a: "Absolutely! We work with businesses of all sizes, from startups to Fortune 500 companies. We offer flexible engagement models to fit your budget and timeline." },
              { q: "What is your development process?", a: "We follow an agile methodology with regular sprints, weekly demos, and continuous client collaboration. You'll have full visibility into progress throughout the project." },
              { q: "Do you provide post-launch support?", a: "Yes! We offer comprehensive maintenance and support packages to ensure your solution continues to perform optimally after launch." }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-xl border border-purple-200 p-6 shadow-md hover:shadow-lg transition-all">
                <summary className="font-bold text-gray-900 cursor-pointer flex items-center justify-between text-lg">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-purple-600 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



function Footer({ navigate }) {
  const footerLinks = {
    Company: [
      { name: 'About Us', page: 'about' },
      { name: 'Careers', page: 'careers' },
      { name: 'Blog', page: 'blog' }
    ],
    Services: [
      { name: 'Website Development', page: 'services' },
      { name: 'Mobile Apps', page: 'services' },
      { name: 'AI & ML', page: 'services' },
      { name: 'Data Analytics', page: 'services' }
    ],
    Industries: [
      { name: 'Healthcare', page: 'industries' },
      { name: 'Finance', page: 'industries' },
      { name: 'E-Commerce', page: 'industries' },
      { name: 'Education', page: 'industries' }
    ],
    Support: [
      { name: 'Contact Us', page: 'contact' },
      { name: 'Privacy Policy', page: 'contact' },
      { name: 'Terms of Service', page: 'contact' }
    ]
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <button onClick={() => navigate('home')} className="flex items-center mb-6 hover:opacity-80 transition-opacity flex-shrink-0">
              <img src="/logo2.png" alt="Logo" className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 object-contain" loading="eager" />
            </button>
            <p className="text-gray-300 mb-8 leading-relaxed max-w-md">
              Transforming businesses through innovative technology solutions. From AI to custom software, we deliver excellence and drive growth.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
                { icon: <Instagram className="w-5 h-5" />, label: "Instagram" }
              ].map((social, idx) => (
                <button
                  key={idx}
                  className="w-11 h-11 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              {footerLinks.Services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Section */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Industries</h3>
            <ul className="space-y-3">
              {footerLinks.Industries.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              {footerLinks.Support.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-10">
          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm">
              © 2024 Edanta Technologies. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built with passion and cutting-edge technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ServiceDetailPage({ selectedService, navigate }) {
  const servicesData = [
    {
      icon: <Code className="w-12 h-12" />,
      title: "AI & ML Solutions",
      description: "Advanced AI, GenAI, NLP, and custom LLM development for enterprises.",
      fullDescription: "Transform your business with cutting-edge AI solutions. We build intelligent systems that automate processes, unlock insights, and drive innovation.",
      details: {
        overview: "Comprehensive AI and machine learning solutions powered by the latest technologies. We develop custom AI agents, chatbots, LLM-based systems, and intelligent automation for enterprises. From GenAI applications to production-grade ML systems, we deliver solutions that solve real business problems and deliver measurable ROI.",
        keyBenefits: [
          "Automate complex business processes",
          "Unlock predictive insights from data",
          "Build intelligent conversational AI",
          "Personalize customer experiences at scale",
          "Reduce operational costs significantly",
          "Gain competitive advantage with AI"
        ],
        technologies: [
          "OpenAI, Anthropic, Meta LLMs",
          "LangChain for AI applications",
          "Vector databases (Pinecone, Weaviate)",
          "TensorFlow and PyTorch",
          "RAG (Retrieval-Augmented Generation)",
          "Fine-tuned custom models"
        ],
        features: [
          {
            title: "AI Agent Workflows",
            description: "Build autonomous intelligent systems that can perform multi-step tasks, make decisions, and interact with business processes without human intervention. Our agents automate complex workflows, handle approvals, orchestrate services, and improve continuously through learning.",
            useCases: "Automate multi-step business processes like loan approvals, order management, and customer onboarding. Reduce processing time by 70%+ and minimize human errors.",
            image: "https://www.ema.co/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fq7d1vb20%2Fproduction%2Fb71593145b4a96d616e25aacf170b12145818d24-1600x909.jpg&w=3840&q=75"
          },
          {
            title: "Intelligent Chatbots",
            description: "Deploy conversational AI for 24/7 customer engagement across multiple channels. Our chatbots understand context, handle complex queries, and seamlessly escalate to human agents when needed. Reduce support costs while improving customer satisfaction.",
            useCases: "Deploy for customer service, FAQs, technical support, and sales assistance. Resolve 50-80% of customer queries automatically with intelligent responses.",
            image: "https://d1y41eupgbwbb2.cloudfront.net/images/blog/cost-to-build-an-ai-chatbot.webp"
          },
          {
            title: "LLM Applications",
            description: "Harness cutting-edge Large Language Models like GPT-4, Claude, and custom fine-tuned models. We integrate them securely into your applications for content generation, code analysis, data transformation, and intelligent decision support.",
            useCases: "Generate marketing content, analyze documents, create code, summarize reports, and build custom language model applications tailored to your domain.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
          },
          {
            title: "Natural Language Processing",
            description: "Advanced text understanding and analysis capabilities. Extract insights from unstructured data, classify documents, extract entities, identify topics, and understand complex linguistic patterns in your business content.",
            useCases: "Process customer feedback, categorize support tickets, extract key information from emails, analyze regulatory documents, and build search systems that understand intent.",
            image: "https://www.qualitapps.com/wp-content/uploads/2023/12/nlp.png"
          },
          {
            title: "Sentiment Analysis",
            description: "Monitor customer emotions and satisfaction across emails, reviews, social media, and surveys. Get real-time insights into customer sentiment, identify pain points, and track brand perception with advanced sentiment tracking.",
            useCases: "Monitor customer satisfaction in real-time, identify at-risk customers, track brand sentiment on social media, analyze product reviews, and improve customer experience based on feedback.",
            image: "https://pixelplex.io/wp-content/uploads/2023/12/customer-sentiment-analysis-main.jpg"
          },
          {
            title: "Intelligent Document Processing",
            description: "Automate extraction and processing of invoices, forms, contracts, and reports with high accuracy. Extract structured data from unstructured documents, validate information, and route documents to appropriate workflows for automation.",
            useCases: "Process invoices automatically, extract data from forms, analyze contracts, read handwritten documents, and create structured data from PDFs. Reduce manual data entry by 90%.",
            image: "/unnamed.jpg"
          },
          {
            title: "Personalized Recommendations",
            description: "Deliver intelligent product and content recommendations based on user behavior, preferences, and patterns. Increase engagement, conversion rates, and customer lifetime value with AI-powered suggestions.",
            useCases: "Recommend products to customers, suggest content based on viewing history, personalize email campaigns, recommend next-best-action for sales teams, and improve cross-sell/upsell.",
            image: "https://www.algolia.com/files/live/sites/algolia-assets/files/blogs/bannerimages/personalized-recommendations.webp"
          },
          {
            title: "Predictive Analytics & Forecasting",
            description: "Forecast future trends, demand patterns, customer churn, and business outcomes using machine learning. Use historical data to make proactive decisions and stay ahead of market changes with predictive models.",
            useCases: "Predict customer churn to enable retention campaigns, forecast demand for inventory optimization, predict sales trends, identify high-value customers, and anticipate equipment failures.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
          },
          {
            title: "Intelligent Process Automation",
            description: "Combine RPA with AI for end-to-end workflow automation. Handle complex decision-making, process unstructured data, reduce manual work, and improve accuracy in repetitive business operations.",
            useCases: "Automate data entry workflows, coordinate between multiple systems, handle exceptions intelligently, reduce manual intervention in business processes, and scale operations without adding headcount.",
            image: "/unnamed (2).jpg"
          },
          {
            title: "Fraud Detection & Anomaly Detection",
            description: "Identify suspicious patterns and anomalies in real-time using machine learning. Detect fraudulent transactions, unusual behaviors, and security threats before they impact your business.",
            useCases: "Detect fraudulent transactions in payment systems, identify unusual account activities, spot anomalies in sensor data, detect insider threats, and prevent financial crimes.",
            image: "/unnamed (1).jpg"
          }
        ],
       
        process: [
          "Requirements Analysis - Define AI objectives",
          "Data Assessment - Evaluate available data",
          "Technology Selection - Choose appropriate models",
          "Model Development - Train and fine-tune",
          "Integration - Connect to business systems",
          "Testing & Validation - Ensure accuracy",
          "Deployment - Launch to production",
          "Monitoring - Track performance and accuracy",
          "Optimization - Continuous improvement",
          "Support & Evolution - Ongoing enhancements"
        ],
        implementations: [
          "Customer Service AI - Intelligent support systems",
          "Business Intelligence - AI-powered analytics",
          "Sales Automation - AI-driven lead scoring",
          "HR Systems - Candidate screening with AI",
          "Supply Chain - Demand forecasting",
          "Healthcare - AI diagnostics and analysis"
        ]
      }
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: "Computer Vision Intelligence",
      description: "Advanced image recognition, object detection, and visual analytics solutions.",
      fullDescription: "Transform visual data into actionable insights. We deliver cutting-edge computer vision solutions powered by advanced AI and deep learning.",
      details: {
        overview: "Comprehensive computer vision services for modern enterprises. We leverage deep learning, neural networks, and advanced algorithms to process visual data, extract meaningful insights, and automate visual intelligence tasks. From image recognition to real-time video analytics, we empower your business with intelligent visual processing capabilities.",
        keyBenefits: [
          "Process millions of images and hours of video daily",
          "Real-time object detection and classification",
          "Reduce manual visual inspection costs by 70-80%",
          "Detect defects with 99%+ accuracy",
          "Extract actionable insights from visual data",
          "Scalable solutions for enterprise-grade deployments"
        ],
        technologies: [
          "TensorFlow and PyTorch",
          "YOLO and OpenCV",
          "Deep learning models (CNN, LSTM, Transformers)",
          "Real-time video processing",
          "GPU acceleration (CUDA, cuDNN)",
          "Computer Vision APIs (AWS Rekognition, Azure Vision)"
        ],
        features: [
          {
            title: "Object Detection & Recognition",
            description: "Detect, classify, and locate objects in images and video streams with high precision. Real-time processing of multiple object types simultaneously with bounding box accuracy.",
            useCases: "Manufacturing quality control, retail inventory management, security surveillance, autonomous vehicles, medical imaging analysis, and agricultural crop monitoring.",
            image: "https://docs.openvino.ai/2023.3/_images/person-detection-0200.png"
          },
          {
            title: "Facial Recognition & Biometrics",
            description: "Advanced facial recognition with anti-spoofing capabilities, emotion detection, and age estimation. Multi-face detection and tracking in crowded scenes with real-time performance.",
            useCases: "Access control and security, employee attendance tracking, customer behavior analysis in retail, personalized customer experiences, and fraud detection.",
            image: "https://cdn.dribbble.com/userupload/36849825/file/original-c050b7db675af62fad9caae26b03f4d4.png?resize=1600x1200"
          },
          {
            title: "Defect Detection & Quality Control",
            description: "Automated visual inspection for manufacturing and production. Detect defects, anomalies, and quality issues at microsecond precision, reducing human inspection time by 80%.",
            useCases: "Electronics manufacturing, pharmaceutical inspection, food production quality control, textile defect detection, and automotive component verification.",
            image: "https://softengi.com/wp-content/uploads/2021/11/defect-detection.png"
          },
          {
            title: "Video Analytics & Tracking",
            description: "Real-time analysis of video streams with object tracking, motion detection, and behavior analysis. Process multiple video feeds simultaneously with automatic alerting for anomalies.",
            useCases: "Security surveillance with intrusion detection, traffic monitoring and congestion analysis, crowd behavior analysis, fall detection in healthcare, and retail customer flow tracking.",
            image: "https://globussoft.com/wp-content/uploads/2026/01/video-analytics.webp"
          },
          {
            title: "Document & Text Recognition",
            description: "Extract text and data from documents, forms, and receipts with high accuracy. Support for multiple languages, handwriting recognition, and structured data extraction from unstructured documents.",
            useCases: "Invoice processing and automation, passport and ID verification, document classification, medical records digitization, and form data extraction.",
            image: "/unnamed (3).jpg"
          },
          {
            title: "Medical Image Analysis",
            description: "AI-powered analysis of medical images including X-rays, CT scans, MRIs, and ultrasounds. Disease detection, tumor segmentation, and diagnostic support for radiologists.",
            useCases: "Early disease detection, cancer screening, cardiac imaging analysis, lung disease detection, and clinical decision support systems.",
            image: "https://cdn-images-1.medium.com/max/670/1*Q3Lby1Un7SBDEHYzxtsOEw.png"
          },
          {
            title: "Intrusion Detection System",
            description: "AI-powered security systems that detect unauthorized access, suspicious behavior, and security threats in real-time. Multi-camera coordination for comprehensive facility monitoring with instant alerts.",
            useCases: "Bank and ATM security monitoring, retail store theft prevention, warehouse perimeter protection, office building access control, airport and critical infrastructure security.",
            image: "https://intelgic.com/static/img/how-instrusion-detection-used-vision-Aeye.jpg"
          },
          {
            title: "Crowd & Behavior Analysis",
            description: "Analyze crowd dynamics, detect abnormal behavior patterns, and monitor public spaces for safety. Real-time crowd density estimation, abnormal activity detection, and predictive alert systems.",
            useCases: "Event management and crowd control, subway and transit stations monitoring, shopping mall footfall analysis, public safety during protests and gatherings, anomaly behavior detection.",
            image: "https://innefu.com/wp-content/uploads/2025/09/AI-driven-crowd-behaviour-analysis-1024x683.webp"
          },
          {
            title: "Vehicle Number Plate Detection",
            description: "Automatic detection, recognition, and extraction of vehicle license plates from images and video streams. Real-time vehicle identification with support for multiple plate formats across countries.",
            useCases: "Traffic enforcement and toll collection, parking lot management and access control, vehicle theft recovery and fleet tracking, border security and checkpoints, smart city traffic monitoring.",
            image: "https://b2633864.smushcdn.com/2633864/wp-content/uploads/2020/09/opencv_anpr_example.jpg?lossy=2&strip=1&webp=1"
          },
          {
            title: "Workplace Safety & PPE Detection",
            description: "Real-time detection of personal protective equipment (helmets, vests, goggles) and safety violations on job sites. Automated alerts for unsafe practices and compliance monitoring.",
            useCases: "Construction site safety monitoring, manufacturing plant compliance, mining operation safety, warehouse worker protection, industrial safety audits and reporting.",
            image: "https://visionfacts.ai/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fda689q0fx%2Fimage%2Fupload%2Fv1739958122%2FEffective_workplace_safety_and_compliance_31726eb2b6_b0af46a311.webp&w=828&q=75"
          },
          
        ],
        process: [
          "Problem Analysis - Understand your visual intelligence requirements",
          "Dataset Preparation - Collect and annotate training data",
          "Model Selection - Choose appropriate algorithms and architectures",
          "Model Training - Train and validate models on your data",
          "Performance Optimization - Optimize for accuracy and speed",
          "Integration - Deploy into production systems",
          "Real-time Testing - Validate performance in live environment",
          "Continuous Improvement - Monitor and enhance model accuracy",
          "Monitoring & Alerting - Set up alerts for edge cases",
          "Ongoing Support - 24/7 monitoring and model updates"
        ],
        implementations: [
          "Manufacturing Defect Detection - Automated quality control",
          "Video Security Surveillance - Intrusion and threat detection",
          "Medical Image Analysis - Diagnostic support systems",
          "Retail Analytics - Customer behavior and inventory tracking",
          "Document Processing - Automated data extraction",
          "Autonomous Systems - Navigation and obstacle detection"
        ]
      }
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "IoT & Custom Software",
      description: "Smart connected systems and enterprise applications.",
      fullDescription: "Build intelligent connected systems. Custom software engineered for your unique business needs.",
      details: {
        overview: "Enterprise-grade custom software and IoT solutions tailored to your specific business challenges. We develop scalable systems that integrate seamlessly with your operations while providing flexibility for future growth. From real-time IoT dashboards to custom business applications, we build solutions that solve real problems.",
        keyBenefits: [
          "Tailored solutions for unique business challenges",
          "Enterprise scalability supporting millions of devices",
          "Seamless integration with existing systems",
          "Cost reduction through process automation",
          "Competitive advantage through custom technology",
          "Future-proof architecture ready for growth"
        ],
        technologies: [
          "Java, Python, Go, C#",
          "Node.js and TypeScript",
          "Microservices architecture",
          "IoT platforms (Azure IoT, AWS IoT)",
          "Real-time databases (Firebase, Firestore)",
          "Event-driven architecture with Kafka"
        ],
        features: [
          {
            title: "Custom Software Architecture",
            description: "Tailor-built software systems designed specifically for your business needs. Modular, scalable architecture that adapts as your business grows without requiring complete rewrites.",
            useCases: "Build specialized business applications, custom CRM systems, proprietary management tools, and industry-specific solutions that off-the-shelf software can't provide.",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80"
          },
          {
            title: "IoT Device Integration",
            description: "Connect and manage thousands of IoT devices collecting real-time data. From sensors to industrial equipment, we build systems that reliably collect, transmit, and process data at scale.",
            useCases: "Monitor manufacturing equipment in real-time, track environmental conditions, manage fleet vehicles with GPS, monitor patient vitals in healthcare, and collect sensor data from smart buildings.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
          },
          {
            title: "Real-time Data Processing",
            description: "Stream data from IoT devices with millisecond latency. Real-time analytics, alerts, and decision making based on live data from thousands of sources simultaneously.",
            useCases: "Monitor critical infrastructure 24/7, detect anomalies instantly and trigger alerts, make split-second decisions based on live data, stream data to dashboards for executives.",
            image: "https://images.unsplash.com/photo-1460925895917-aaf4b7c9c869?w=600&q=80"
          },
          {
            title: "Microservices Architecture",
            description: "Build loosely-coupled services that scale independently. Each microservice handles a specific business capability and communicates through APIs, enabling rapid development and deployment.",
            useCases: "Scale different parts of your application independently, deploy updates to one service without affecting others, use different technologies for different services, enable parallel development teams.",
            image: "https://images.unsplash.com/photo-1515330872995-48d1ec38ab2d?w=600&q=80"
          },
          {
            title: "Legacy System Integration",
            description: "Connect modern applications to legacy systems through APIs and data bridges. Modernize without costly rewrites, gradually migrate to new architecture while maintaining business continuity.",
            useCases: "Integrate new cloud applications with 20-year-old mainframes, migrate data gradually between systems, expose legacy functionality through modern APIs, enable data sharing between systems.",
            image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&q=80"
          },
          {
            title: "Event-Driven Architecture",
            description: "Build responsive systems where components communicate through events. Decouple services, enable real-time reactions, and build complex workflows without tight coupling.",
            useCases: "Trigger notifications when orders arrive, process inventory updates across systems, coordinate multi-step business processes, enable real-time collaboration features.",
            image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80"
          },
          {
            title: "Mobile & Desktop Clients",
            description: "Companion applications for your backend systems. Desktop tools for operations, mobile apps for field teams, all connected to your central systems with offline capabilities.",
            useCases: "Service technician apps with offline access to customer data, desktop dashboards for monitoring, mobile apps for employees, cross-platform applications.",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80"
          },
          {
            title: "Data Analytics Platform",
            description: "Extract insights from your operational data. Custom analytics dashboards, reports, and ML models that reveal patterns and opportunities in your data.",
            useCases: "Analyze production efficiency patterns, forecast demand based on historical data, identify cost reduction opportunities, discover customer behavior patterns, predict equipment failures.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
          },
          {
            title: "Security & Compliance",
            description: "Enterprise security built into your systems from day one. Encryption, authentication, authorization, audit trails, and compliance with industry standards.",
            useCases: "Meet HIPAA for healthcare data, comply with GDPR for EU customers, implement SOC2 requirements, secure financial transactions, track all system changes.",
            image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&q=80"
          },
          {
            title: "Scalable Infrastructure",
            description: "Systems that grow with your business from hundreds to millions of users. Cloud-native design, auto-scaling, and load balancing ensure consistent performance under any load.",
            useCases: "Support viral growth without service interruptions, handle seasonal traffic spikes, scale globally to reach new markets, manage rapid customer growth.",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80"
          }
        ],
        process: [
          "Business Analysis - Understand requirements deeply",
          "Technical Design - Create architecture blueprints",
          "Prototyping - Build proof of concept",
          "Development - Build with agile methodology",
          "Testing & QA - Comprehensive quality assurance",
          "Deployment - Production launch planning",
          "Monitoring - Real-time system health tracking",
          "Maintenance - Continuous support and updates"
        ],
        implementations: [
          "Enterprise Resource Planning (ERP)",
          "Customer Relationship Management (CRM)",
          "IoT Data Collection Platforms",
          "Real-time Analytics Dashboards",
          "Business Process Automation",
          "Industry-specific Applications"
        ]
      }
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      fullDescription: "Create engaging mobile applications that reach millions of users. Our team develops both native and cross-platform apps with exceptional user experiences.",
      details: {
        overview: "We develop high-performance mobile applications using React Native, Flutter, and native technologies. Whether you need iOS, Android, or both - we deliver world-class apps. Our mobile-first approach ensures optimal performance on every device with smooth animations, intuitive navigation, and offline capabilities that keep users engaged.",
        keyBenefits: [
          "Reach millions of mobile users globally",
          "Native-like performance with cross-platform development",
          "Offline functionality keeping users productive",
          "Push notifications driving user engagement",
          "Seamless integration with device features",
          "4.8+ average App Store rating and featured placements"
        ],
        technologies: [
          "React Native for cross-platform development",
          "Flutter for high-performance apps",
          "Swift for native iOS development",
          "Kotlin for native Android development",
          "Firebase for real-time data and analytics",
          "AWS AppSync for GraphQL APIs"
        ],
        features: [
          {
            title: "Native Performance",
            description: "Blazing-fast app experience compiled directly to native code. No compromises on performance, smooth 60fps animations, and instant response times that users expect.",
            useCases: "Gaming apps with complex graphics, real-time trading applications, high-frequency data streaming apps, and performance-critical enterprise applications.",
            image: "https://www.cnet.com/a/img/resize/4156e9900af62cdd9bb445b9daa70e5e7acda4f6/hub/2010/12/13/6db737ad-cc2e-11e2-9a4a-0291187b029a/android-apps_1.jpg?auto=webp&width=1200"
          },
          {
            title: "iOS & Android Development",
            description: "Native development using Swift and Kotlin for maximum performance, or cross-platform with React Native and Flutter for faster development. Choose based on your requirements.",
            useCases: "Build for both iOS and Android with code sharing, develop platform-specific features, leverage native capabilities, and optimize for each platform's unique features.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpM5fLPEfl_AcRcmzdF548Rd_6M9EpiD5HVw&s"
          },
          {
            title: "App Store Optimization",
            description: "Maximize downloads and ratings through strategic keyword optimization, compelling app store listings, and conversion-optimized screenshots and descriptions.",
            useCases: "Rank for high-value keywords, improve app store visibility, increase organic downloads by 300%+, maintain 4.8+ star ratings, and get featured by app stores.",
            image: "https://images.unsplash.com/photo-1516321318423-f06f70504ab0?w=600&q=80"
          },
          {
            title: "Push Notifications",
            description: "Real-time push notifications keeping users engaged and informed. Segmented messaging, rich notifications, and behavior-triggered alerts drive engagement.",
            useCases: "Send personalized promotions, notify users of important events, remind about incomplete actions, enable real-time collaboration, and drive app re-engagement.",
            image: "https://images.unsplash.com/photo-1579748769340-b1a15e65b289?w=600&q=80"
          },
          {
            title: "Offline Mode",
            description: "Full functionality without internet connection. Data syncs automatically when online, ensuring users can work productively anywhere, anytime.",
            useCases: "Field apps for technicians without connectivity, read emails and documents offline, continue editing without network, and sync data when reconnected.",
            image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&q=80"
          },
          {
            title: "Analytics Integration",
            description: "Track user behavior, retention, conversion funnels, and engagement metrics. Firebase Analytics, Mixpanel, or custom solutions provide actionable insights.",
            useCases: "Understand how users interact with your app, identify drop-off points in funnels, measure feature adoption, track A/B test results, and make data-driven decisions.",
            image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80"
          },
          {
            title: "Biometric Authentication",
            description: "Face ID and fingerprint authentication for frictionless security. Multi-factor authentication combining biometrics with passwords or OTP for enterprise security.",
            useCases: "Enable secure login without remembering passwords, implement enterprise access control, comply with payment processing security, and improve user experience.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80"
          },
          {
            title: "Payment Integration",
            description: "In-app purchases, subscriptions, and payment processing. Integrate with Stripe, Apple Pay, Google Pay for seamless transactions and recurring billing.",
            useCases: "Monetize your app with in-app purchases, implement subscription models, process secure credit card payments, enable digital wallets, and increase revenue.",
            image: "https://images.unsplash.com/photo-1563013544-824ae1bf4de8?w=600&q=80"
          },
          {
            title: "Device Features Integration",
            description: "Leverage camera, GPS, contacts, calendar, microphone, and other device capabilities. Seamless access to device hardware for rich user experiences.",
            useCases: "Photo/video capture apps, navigation and location tracking, contact management, video calling, audio recording, and AR experiences.",
            image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80"
          },
          {
            title: "Real-time Sync",
            description: "Live data synchronization across devices and users. Changes on one device instantly appear on others, enabling real-time collaboration.",
            useCases: "Team chat and messaging apps, collaborative document editing, live multiplayer games, synchronized dashboards, and shared project management.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
          }
        ],
        process: [
          "Market Research - Analyze competitors and opportunities",
          "Requirements Definition - Detailed feature specifications",
          "UI/UX Design - Create intuitive mobile interfaces",
          "Native Development - Build for iOS and/or Android",
          "API Development - Robust backend services",
          "Testing & QA - Comprehensive device and scenario testing",
          "Beta Release - Testing with real users",
          "App Store Submission - Navigate approval processes",
          "Launch Campaign - Coordinated release and marketing",
          "Ongoing Optimization - Updates, features, and support"
        ],
        implementations: [
          "Consumer Apps - Lifestyle, social, entertainment",
          "Enterprise Apps - Internal tools and productivity",
          "E-commerce Apps - Mobile shopping experiences",
          "Healthcare Apps - Patient management and telemedicine",
          "Financial Apps - Banking and investment platforms",
          "SaaS Mobile Clients - Companion apps for web platforms"
        ]
      }
    },
    {
      icon: <Code className="w-12 h-12" />,
      title: "Web & Backend",
      description: "Robust web platforms, backend systems, and APIs for modern businesses.",
      fullDescription: "Build powerful web platforms and scalable backend systems. We deliver web solutions that drive conversions and engagement.",
      details: {
        overview: "Our web and backend development services combine stunning design with robust functionality. We use the latest technologies including React, Vue.js, and Next.js for frontend, paired with Node.js, Python, and Java backends to create modern web experiences that perform exceptionally. From corporate websites to complex web applications, we deliver solutions that engage users and drive business results.",
        keyBenefits: [
          "Increased online visibility and search engine rankings",
          "Higher conversion rates with optimized user experience",
          "Mobile-first approach ensuring 100% responsiveness",
          "Faster loading times improving user satisfaction",
          "Seamless integration with existing business systems",
          "Built-in security and compliance standards"
        ],
        technologies: [
          "React, Vue.js, Next.js, Svelte for frontend",
          "Node.js, Python, Java for backend",
          "PostgreSQL, MongoDB, Redis for databases",
          "AWS, Azure, Google Cloud for hosting",
          "REST APIs and GraphQL",
          "Docker and Kubernetes for deployment"
        ],
        features: [
          {
            title: "Responsive Web Design",
            description: "Perfect on all devices from mobile phones to large desktop screens. Mobile-first design approach ensuring optimal experience on every screen size and resolution.",
            useCases: "Reach users on all devices, improve mobile conversion rates, reduce bounce rates, and provide consistent experience across devices.",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80"
          },
          {
            title: "SEO Optimization",
            description: "Built-in technical SEO from day one. Optimized meta tags, structured data, fast page load times, and SEO-friendly URLs that search engines love.",
            useCases: "Rank for competitive keywords, increase organic traffic, improve visibility in Google search results, and attract qualified leads from search engines.",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80"
          },
          {
            title: "Lightning-Fast Performance",
            description: "Pages load in under 2 seconds with image optimization, code splitting, and CDN delivery. Fast sites rank higher and convert better.",
            useCases: "Improve user experience, rank higher in search results, reduce bounce rates, and increase conversion rates by 5-15% per second of speed improvement.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
          },
          {
            title: "API Development",
            description: "RESTful and GraphQL APIs that power your applications and integrations. Well-documented, versioned APIs with authentication and rate limiting.",
            useCases: "Enable mobile apps to connect to backend, integrate with third-party services, provide data to partners, and build ecosystem of connected applications.",
            image: "https://images.unsplash.com/photo-1516321318423-f06f70504ab0?w=600&q=80"
          },
          {
            title: "Real-time Features",
            description: "WebSocket support for live updates, real-time notifications, and collaborative features. Updates instantly without page refresh.",
            useCases: "Build chat and messaging applications, enable live collaboration, stream real-time data to dashboards, and notify users instantly of important events.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
          },
          {
            title: "Security",
            description: "Enterprise-grade security with SSL encryption, OWASP compliance, DDoS protection, and secure authentication. Your data and users are protected.",
            useCases: "Comply with security standards, protect user data, implement secure authentication, and pass security audits for regulatory compliance.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80"
          },
          {
            title: "Analytics & Monitoring",
            description: "Track user behavior, page views, conversions, and errors. Real-time monitoring ensures immediate alerting to performance issues or outages.",
            useCases: "Understand user behavior, optimize conversion funnels, detect and fix errors immediately, track business metrics, and make data-driven improvements.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
          },
          {
            title: "Accessibility",
            description: "WCAG 2.1 compliance ensuring your site is usable by everyone including people with disabilities. Screen reader compatible, keyboard navigable.",
            useCases: "Reach broader audience including users with disabilities, comply with accessibility laws (ADA, WCAG), and improve overall user experience.",
            image: "https://images.unsplash.com/photo-1516321318423-f06f70504ab0?w=600&q=80"
          },
          {
            title: "Content Management",
            description: "Headless CMS integration like Contentful, Strapi, or WordPress. Non-technical team members can update content without touching code.",
            useCases: "Empower marketing team to manage content, update pages without developer involvement, maintain consistent branding, and publish frequently.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
          },
          {
            title: "E-commerce Functionality",
            description: "Complete e-commerce platform with product catalog, shopping cart, checkout, payments, and inventory management. Shopify or Headless integration.",
            useCases: "Launch online store, accept payments securely, manage inventory, process orders, enable customer reviews, and scale to millions of products.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80"
          }
        ],
        process: [
          "Discovery & Strategy - Define goals and requirements",
          "UI/UX Design - Create beautiful design mockups",
          "Frontend Development - Build responsive interfaces",
          "Backend Development - Create robust APIs and services",
          "Integration - Connect external services and APIs",
          "Testing & QA - Comprehensive quality assurance",
          "Performance Optimization - Speed and efficiency tuning",
          "Launch & Monitoring - Deploy to production with monitoring",
          "Support & Maintenance - Ongoing updates and improvements"
        ],
        implementations: [
          "Corporate Websites - Branding and information",
          "E-commerce Platforms - Online stores and marketplaces",
          "SaaS Platforms - Subscription-based services",
          "Progressive Web Apps - App-like web experiences",
          "Content Portals - News sites and media platforms",
          "Real-time Applications - Chat, collaboration, monitoring"
        ]
      }
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Enterprise Solutions",
      description: "End-to-end enterprise solutions with ERP, CRM, and business intelligence.",
      fullDescription: "Transform your enterprise with comprehensive integrated solutions. We deliver ERP, CRM, and BI systems tailored to your organization.",
      details: {
        overview: "Enterprise-grade integrated solutions combining ERP, CRM, and BI platforms. We implement and customize industry-leading systems while also building custom solutions for unique requirements. Our approach ensures smooth implementation, user adoption, and long-term success. From on-premises to cloud deployments, we design solutions that scale with your business.",
        keyBenefits: [
          "Streamline operations across all departments",
          "Improve customer relationships and boost sales",
          "Gain real-time business visibility and insights",
          "Reduce operational costs and inefficiencies",
          "Enable data-driven decision making",
          "Scale seamlessly with growing business"
        ],
        technologies: [
          "SAP, Oracle, Microsoft Dynamics",
          "Salesforce for CRM",
          "Power BI and Tableau for analytics",
          "Integrations with custom applications",
          "Cloud deployment options",
          "API-based integrations"
        ],
        features: [
          {
            title: "Financial Management",
            description: "Complete financial management including general ledger, accounts payable/receivable, asset management, and financial reporting. Multi-currency, multi-entity support.",
            useCases: "Automate invoice processing, manage cash flow, produce financial reports, consolidate multi-entity finances, and ensure audit compliance.",
            image: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=600&q=80"
          },
          {
            title: "Supply Chain Optimization",
            description: "End-to-end supply chain management including procurement, inventory management, warehousing, and logistics. Optimize inventory levels and reduce costs.",
            useCases: "Reduce inventory carrying costs, improve on-time delivery, minimize stockouts, optimize warehouse operations, and track shipments in real-time.",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"
          },
          {
            title: "Human Resources Management",
            description: "Complete HR platform for employee management, payroll, benefits, performance management, and workforce analytics. Self-service employee portal.",
            useCases: "Automate payroll processing, manage employee records, track performance and development, plan workforce, and ensure compliance with labor laws.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
          },
          {
            title: "Customer Relationship Management",
            description: "360-degree customer view including sales pipeline, customer service, marketing automation, and support ticketing. Salesforce integration available.",
            useCases: "Track sales opportunities, manage customer interactions, automate marketing campaigns, provide superior customer service, and increase customer lifetime value.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
          },
          {
            title: "Sales Force Automation",
            description: "Enable sales teams with mobile access to customer data, pipeline management, quote generation, and forecasting tools. Increase sales productivity.",
            useCases: "Increase sales by 20-30% through better pipeline management, access customer data on-the-go, generate quotes in minutes, and forecast revenue accurately.",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80"
          },
          {
            title: "Inventory Management",
            description: "Real-time inventory tracking across multiple locations. Automated reordering, barcode scanning, warehouse management, and inventory optimization.",
            useCases: "Reduce inventory costs, prevent stockouts, track products from warehouse to customer, implement just-in-time inventory, and manage returns.",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"
          },
          {
            title: "Business Analytics & Dashboards",
            description: "Real-time dashboards and analytics powered by Power BI, Tableau, or custom solutions. Self-service analytics for business users.",
            useCases: "Track KPIs in real-time, create executive dashboards, identify trends and patterns, make data-driven decisions, and prove ROI of projects.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
          },
          {
            title: "Quality Management",
            description: "Quality assurance systems for manufacturing and service industries. Track quality metrics, manage compliance, and drive continuous improvement.",
            useCases: "Monitor product quality, track quality metrics, manage defects and returns, ensure compliance with standards, and improve processes continuously.",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80"
          },
          {
            title: "Compliance & Risk Management",
            description: "Built-in compliance controls, audit trails, and risk management. SOC2, ISO, HIPAA, and regulatory compliance support.",
            useCases: "Meet regulatory requirements, maintain audit trails, manage compliance risks, pass external audits, and demonstrate governance.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80"
          },
          {
            title: "Mobile & Collaboration",
            description: "Mobile access to enterprise systems for remote and field workers. Real-time collaboration and communication across teams.",
            useCases: "Enable remote work, provide field workers with mobile access, enable team collaboration, access data from anywhere, and improve productivity.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
          }
        ],
        process: [
          "Current State Assessment - Audit existing systems",
          "Requirements Gathering - Define business requirements",
          "System Selection - Choose right platforms",
          "Design - Configure and customize solutions",
          "Data Migration - Transfer existing data securely",
          "Integration - Connect all business systems",
          "User Training - Comprehensive staff education",
          "Testing & QA - Validate all functionality",
          "Go-live Support - Manage production launch",
          "Ongoing Support - 24/7 managed services"
        ],
        implementations: [
          "ERP Systems - Complete business management",
          "CRM Platforms - Customer management",
          "Business Intelligence - Analytics platforms",
          "Supply Chain - Logistics management",
          "HR Systems - Employee management",
          "Financial Systems - Accounting and planning"
        ]
      }
    }
  ];

  const service = servicesData[selectedService];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => window.location.hash = 'services'}
          className="mb-8 text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-2"
        >
          ← Back to Services
        </button>

        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            {service.title}
          </h1>
          <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
            {service.fullDescription}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => window.location.hash = 'contact'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-all text-white"
            >
              Get Started
            </button>
            <button
  onClick={() => navigate(`contact?subject=Schedule Consultation - ${service.title}`)}
  className="border-2 border-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-purple-50 transition-all text-purple-600"
>
  Schedule Consultation
</button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Overview</h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              {service.details.overview}
            </p>

            <h2 className="text-3xl font-bold mb-6 text-gray-900">AI Solutions & Use Cases</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {service.details.features.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden border border-purple-200 hover:shadow-2xl transition-all transform hover:scale-105">
                  <div className="h-56 overflow-hidden bg-gray-200">
                    {typeof feature === 'string' ? (
                      <div className="w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{feature.split(' - ')[0]}</span>
                      </div>
                    ) : (
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {typeof feature === 'string' ? feature.split(' - ')[0] : feature.title}
                    </h3>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-purple-600 uppercase mb-2">Solution Overview</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {typeof feature === 'string' ? feature.split(' - ')[1] : feature.description}
                      </p>
                    </div>
                    {feature.useCases && (
                      <div>
                        <h4 className="text-sm font-semibold text-blue-600 uppercase mb-2">Real-World Use Cases</h4>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {feature.useCases}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {service.details.useCases && (
              <>
                <h2 className="text-3xl font-bold mb-8 text-gray-900 mt-12">Real-World Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {service.details.useCases.map((useCase, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 hover:shadow-lg transition-all">
                      <div className="flex gap-3 mb-3">
                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          {idx + 1}
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {useCase.split(' - ')[0]}
                        </h3>
                      </div>
                      <p className="text-gray-700 ml-9">
                        {useCase.split(' - ')[1]}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

function IndustryDetailPage({ selectedIndustry, navigate }) {
  const industriesData = [
    {
      title: "Aerospace & Defence",
      heroImage: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&h=600&fit=crop",
      icon: "https://images.unsplash.com/photo-1633966887768-c6d0f5d75dc7?w=400&h=400&fit=crop",
      fullDescription: "Leverage AI and real-time data visualization to enhance mission-critical decision-making, improve aircraft maintenance, and optimize defense operations with cutting-edge aerospace technology solutions.",
      gradient: "from-blue-600 via-indigo-600 to-purple-700",
      details: {
        overview: "Our aerospace and defense solutions combine advanced AI, IoT sensors, and real-time analytics to modernize aircraft maintenance, enhance mission planning, and improve operational efficiency. From predictive maintenance systems to secure communication platforms, we enable defense organizations to maintain operational readiness while reducing costs and improving safety standards across all aviation and defense operations.",
        overviewImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&h=500&fit=crop",
        challenges: [
          "Managing complex aircraft maintenance schedules and ensuring airworthiness compliance",
          "Processing and analyzing massive volumes of mission-critical sensor data in real-time",
          "Securing sensitive defense communications and protecting against cyber threats",
          "Optimizing supply chain logistics for critical spare parts and components",
          "Integrating legacy defense systems with modern digital technologies",
          "Ensuring regulatory compliance across multiple international aviation standards"
        ],
        solutions: [
          { name: "Predictive Maintenance Systems", desc: "AI-powered analytics for aircraft component monitoring, failure prediction, and optimized maintenance scheduling to reduce downtime", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop" },
          { name: "Mission Planning & Simulation", desc: "Advanced 3D visualization and scenario modeling platforms for tactical planning and training operations", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop" },
          { name: "Real-Time Data Analytics", desc: "Edge computing solutions for instant processing of flight data, sensor telemetry, and mission intelligence", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
          { name: "Secure Communication Networks", desc: "Encrypted, resilient communication systems for command and control operations with multi-level security", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop" },
          { name: "Supply Chain Optimization", desc: "AI-driven inventory management and logistics planning for critical aerospace components and parts", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop" },
          { name: "Digital Twin Technology", desc: "Virtual replicas of aircraft and defense systems for testing, optimization, and lifecycle management", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop" },
          { name: "Autonomous Systems Integration", desc: "Platforms for UAV fleet management, autonomous navigation, and coordinated drone operations", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop" },
          { name: "Cybersecurity & Threat Detection", desc: "Advanced threat intelligence and intrusion detection systems protecting critical defense infrastructure", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop" }
        ],
        benefits: [
          "60% reduction in unscheduled aircraft maintenance through predictive analytics",
          "Enhanced mission success rates with real-time data-driven decision support",
          "Compliance with DO-178C, MIL-STD-882E, and international aviation safety standards",
          "40% improvement in spare parts inventory optimization and supply chain efficiency",
          "99.99% system availability for mission-critical defense communications",
          "Seamless integration with existing defense command and control systems"
        ],
        successMetrics: [
          "Aircraft availability increased by 45% through predictive maintenance",
          "Mission planning time reduced by 55% with AI-powered simulation",
          "Maintenance costs decreased by 35% through optimized scheduling",
          "Zero security breaches in defense communication systems"
        ]
      }
    },
    {
      title: "Industrial Manufacturing",
      heroImage: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=600&fit=crop",
      icon: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop",
      fullDescription: "Predict machine downtime, maximize production efficiency, and transform your manufacturing operations with Industry 4.0 solutions including IoT, digital twins, and AI-powered quality control.",
      gradient: "from-gray-600 via-slate-600 to-zinc-700",
      details: {
        overview: "Enterprise manufacturing solutions architected for Industry 4.0 transformation. We help manufacturers modernize production lines, implement smart factory technologies, and deploy predictive maintenance systems while optimizing overall equipment effectiveness (OEE) and reducing operational costs through digital transformation initiatives.",
        overviewImage: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&h=500&fit=crop",
        challenges: [
          "Preventing unexpected equipment failures and costly production downtime",
          "Maintaining consistent product quality across multiple production lines",
          "Integrating disparate manufacturing systems and legacy machinery",
          "Optimizing production scheduling and resource allocation in real-time",
          "Managing complex supply chains and ensuring just-in-time inventory",
          "Meeting sustainability goals while maintaining production targets"
        ],
        solutions: [
          { name: "Predictive Maintenance Platform", desc: "IoT sensor networks and ML algorithms for equipment health monitoring, failure prediction, and maintenance optimization", image: "https://images.unsplash.com/photo-1581092918484-8313e1f7e8d6?w=400&h=300&fit=crop" },
          { name: "Manufacturing Execution System (MES)", desc: "Real-time production tracking, quality management, and shop floor control for operational excellence", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop" },
          { name: "Digital Twin Factory", desc: "Virtual factory replicas for production optimization, what-if analysis, and process simulation before implementation", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop" },
          { name: "AI Quality Inspection", desc: "Computer vision systems for automated defect detection, dimensional accuracy, and quality compliance verification", image: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e8?w=400&h=300&fit=crop" },
          { name: "Production Planning & Scheduling", desc: "Advanced algorithms for capacity optimization, demand forecasting, and dynamic production scheduling", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop" },
          { name: "Industrial IoT Platform", desc: "Connected machinery dashboard with real-time monitoring, analytics, and remote control capabilities", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" },
          { name: "Energy Management System", desc: "Smart energy monitoring and optimization to reduce consumption and carbon footprint", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop" },
          { name: "Supply Chain Integration", desc: "End-to-end visibility connecting suppliers, production, and distribution for seamless operations", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop" }
        ],
        benefits: [
          "65% reduction in unplanned downtime through predictive maintenance",
          "40% improvement in Overall Equipment Effectiveness (OEE)",
          "Real-time visibility into production metrics and operational performance",
          "50% faster defect detection with AI-powered quality inspection",
          "30% reduction in energy costs through smart monitoring and optimization",
          "Compliance with ISO 9001, Six Sigma, and lean manufacturing standards"
        ],
        successMetrics: [
          "Production uptime increased from 75% to 96%",
          "Defect rates reduced by 70% with automated quality control",
          "Equipment maintenance costs decreased by 45%",
          "Production throughput improved by 38%"
        ]
      }
    },
    {
      title: "Energy & Utilities",
      heroImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop",
      icon: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=400&h=400&fit=crop",
      fullDescription: "Empower customers to optimize energy consumption, modernize grid infrastructure, and accelerate the transition to renewable energy with smart grid solutions and real-time analytics.",
      gradient: "from-yellow-500 via-orange-500 to-red-600",
      details: {
        overview: "Next-generation energy management solutions designed for the modern power grid. We enable utilities to deploy smart metering, integrate renewable energy sources, optimize grid performance, and provide customers with real-time consumption insights while maintaining reliable, cost-effective power delivery across distribution networks.",
        overviewImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
        challenges: [
          "Managing intermittent renewable energy sources and grid stability",
          "Detecting and preventing power outages across vast distribution networks",
          "Modernizing aging grid infrastructure with limited capital budgets",
          "Providing customers with actionable energy consumption insights",
          "Balancing supply and demand in real-time across the grid",
          "Meeting regulatory requirements for renewable energy integration"
        ],
        solutions: [
          { name: "Smart Grid Management", desc: "Advanced distribution management systems (ADMS) for real-time grid monitoring, fault detection, and automated restoration", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
          { name: "Smart Metering & AMI", desc: "Advanced metering infrastructure with two-way communication for real-time consumption data and remote meter operations", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
          { name: "Renewable Energy Integration", desc: "Forecasting and management platforms for solar, wind, and battery storage integration with grid operations", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop" },
          { name: "Demand Response Platform", desc: "Customer engagement tools for peak load management, time-of-use pricing, and energy conservation programs", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
          { name: "Outage Management System", desc: "AI-powered outage detection, crew dispatch optimization, and customer notification systems", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop" },
          { name: "Energy Analytics Dashboard", desc: "Customer-facing portals providing real-time usage data, cost projections, and personalized energy-saving recommendations", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
          { name: "Asset Performance Management", desc: "Predictive maintenance for transformers, substations, and transmission infrastructure", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop" },
          { name: "Grid Cybersecurity", desc: "Multi-layered security protecting critical energy infrastructure from cyber threats", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop" }
        ],
        benefits: [
          "50% reduction in average outage duration through automated fault detection",
          "35% improvement in renewable energy integration and grid stability",
          "Real-time customer engagement with personalized energy insights",
          "40% faster outage response with AI-powered dispatch optimization",
          "Compliance with NERC CIP, ISO 50001, and regional energy regulations",
          "25% reduction in transmission and distribution losses"
        ],
        successMetrics: [
          "Customer satisfaction scores improved by 42%",
          "Grid reliability (SAIDI) improved by 48%",
          "Renewable energy capacity increased by 60%",
          "Operational costs reduced by 32%"
        ]
      }
    },
    {
      title: "Petrochemical",
      heroImage: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop",
      icon: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop",
      fullDescription: "Preserve real-time safety and chemical inventory control with advanced process monitoring, predictive analytics, and compliance management systems for petrochemical operations.",
      gradient: "from-purple-600 via-pink-600 to-rose-600",
      details: {
        overview: "Mission-critical petrochemical solutions engineered for safety, compliance, and operational excellence. We help refineries and chemical plants implement real-time process monitoring, predictive maintenance, and advanced safety systems while ensuring compliance with environmental regulations and optimizing production yields across complex chemical processes.",
        overviewImage: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop",
        challenges: [
          "Ensuring worker safety in hazardous chemical processing environments",
          "Maintaining precise inventory control for thousands of chemical compounds",
          "Preventing equipment failures that could cause environmental incidents",
          "Complying with strict environmental and safety regulations (EPA, OSHA, PSM)",
          "Optimizing complex chemical processes for maximum yield and quality",
          "Managing emergency response procedures and incident reporting"
        ],
        solutions: [
          { name: "Process Safety Management", desc: "Comprehensive PSM platforms for hazard analysis, incident tracking, safety instrumented systems (SIS), and compliance documentation", image: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e8?w=400&h=300&fit=crop" },
          { name: "Real-Time Inventory Control", desc: "RFID and IoT-enabled tracking systems for chemical storage, movement, and automated reordering with regulatory compliance", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop" },
          { name: "Advanced Process Control (APC)", desc: "Model predictive control for process optimization, quality consistency, and yield maximization", image: "https://images.unsplash.com/photo-1581092918484-8313e1f7e8d6?w=400&h=300&fit=crop" },
          { name: "Leak Detection & Monitoring", desc: "IoT sensor networks for continuous monitoring of pipelines, tanks, and valves with instant alert systems", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" },
          { name: "Predictive Maintenance", desc: "Vibration analysis, thermal imaging, and ML algorithms predicting equipment failures in corrosive environments", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop" },
          { name: "Environmental Compliance", desc: "Emissions monitoring, wastewater tracking, and automated regulatory reporting systems", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop" },
          { name: "Emergency Response System", desc: "Integrated alarm management, evacuation planning, and incident command systems", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop" },
          { name: "Digital Process Twin", desc: "Virtual plant models for process optimization, scenario testing, and operator training", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop" }
        ],
        benefits: [
          "Zero safety incidents through proactive monitoring and predictive alerts",
          "99.9% inventory accuracy with real-time chemical tracking systems",
          "Compliance with EPA Clean Air Act, OSHA PSM, and ISO 45001 standards",
          "30% reduction in unplanned shutdowns through predictive maintenance",
          "15% improvement in process yield through advanced control systems",
          "Instant emergency response with automated alert and evacuation systems"
        ],
        successMetrics: [
          "Safety incident rate reduced by 85%",
          "Environmental compliance violations eliminated",
          "Process efficiency improved by 28%",
          "Emergency response time reduced by 60%"
        ]
      }
    },
    {
      title: "Oil & Gas",
      heroImage: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?w=1200&h=600&fit=crop",
      icon: "https://images.unsplash.com/photo-1545529468-42764ef8c85f?w=400&h=400&fit=crop",
      fullDescription: "Deploy AI for instant, remote pipeline monitoring to ensure safety and efficiency across upstream, midstream, and downstream oil and gas operations with real-time analytics.",
      gradient: "from-amber-600 via-orange-600 to-red-700",
      details: {
        overview: "Comprehensive oil and gas technology solutions spanning exploration, production, transportation, and refining. We enable energy companies to deploy remote monitoring systems, optimize drilling operations, ensure pipeline integrity, and improve safety across global operations while reducing environmental impact and operational costs.",
        overviewImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop",
        challenges: [
          "Monitoring vast pipeline networks across remote and challenging terrains",
          "Detecting and preventing pipeline leaks to avoid environmental disasters",
          "Optimizing drilling operations and maximizing well productivity",
          "Managing complex logistics across upstream, midstream, and downstream",
          "Ensuring worker safety in remote and hazardous drilling locations",
          "Meeting stringent environmental regulations and sustainability goals"
        ],
        solutions: [
          { name: "Pipeline Integrity Management", desc: "AI-powered leak detection, corrosion monitoring, and predictive maintenance for thousands of miles of pipeline infrastructure", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop" },
          { name: "Remote Operations Center", desc: "Centralized monitoring dashboards for real-time visibility into drilling rigs, production platforms, and pipeline operations", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
          { name: "Drilling Optimization", desc: "ML algorithms for drill bit performance, formation analysis, and automated drilling parameter adjustment", image: "https://images.unsplash.com/photo-1581092918484-8313e1f7e8d6?w=400&h=300&fit=crop" },
          { name: "Production Optimization", desc: "Reservoir modeling, artificial lift optimization, and real-time production allocation systems", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop" },
          { name: "Asset Performance Management", desc: "Predictive maintenance for pumps, compressors, and rotating equipment with condition-based monitoring", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop" },
          { name: "HSE Management System", desc: "Health, safety, and environmental compliance platform with incident tracking and risk assessment", image: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e8?w=400&h=300&fit=crop" },
          { name: "Supply Chain & Logistics", desc: "Crude oil tracking, inventory management, and transportation optimization across global operations", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop" },
          { name: "Methane Emission Monitoring", desc: "Satellite and sensor-based systems for detecting and quantifying methane leaks", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop" }
        ],
        benefits: [
          "95% accuracy in pipeline leak detection with AI-powered monitoring",
          "Remote operations reducing need for personnel in hazardous locations",
          "40% faster incident response with real-time alert systems",
          "Compliance with API, ISO 14001, and regional environmental standards",
          "25% improvement in drilling efficiency through optimization algorithms",
          "60% reduction in methane emissions through proactive monitoring"
        ],
        successMetrics: [
          "Pipeline incidents reduced by 78%",
          "Drilling costs decreased by 32%",
          "Production uptime improved by 44%",
          "Environmental violations eliminated"
        ]
      }
    },
    {
      title: "Healthcare",
      heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
      icon: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop",
      fullDescription: "Transform healthcare delivery with digital twins, IoMT (Internet of Medical Things), and AI-powered diagnostics for personalized treatment and improved patient care outcomes.",
      gradient: "from-cyan-500 via-blue-500 to-purple-600",
      details: {
        overview: "Our healthcare technology solutions combine advanced clinical systems with strict regulatory compliance to modernize care delivery. From AI-powered diagnostics to integrated EHR platforms, we enable healthcare organizations to provide exceptional patient care while optimizing operational efficiency and maintaining the highest security standards with HIPAA-compliant infrastructure.",
        overviewImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=500&fit=crop",
        challenges: [
          "Securing sensitive patient data while ensuring HIPAA/HITECH compliance",
          "Integrating disparate legacy systems and fragmented EHR platforms",
          "Reducing physician burnout caused by administrative documentation",
          "Enabling seamless care coordination across multiple providers",
          "Implementing telehealth capabilities for remote patient access",
          "Extracting actionable insights from vast amounts of clinical data"
        ],
        solutions: [
          { name: "Electronic Health Records (EHR)", desc: "Comprehensive patient record systems with clinical decision support, e-prescribing, lab integration, and care coordination workflows", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop" },
          { name: "Telemedicine & Virtual Care", desc: "HIPAA-compliant video consultation platforms with digital prescriptions, remote monitoring, and asynchronous messaging", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop" },
          { name: "Clinical Analytics & Population Health", desc: "AI-driven insights for treatment optimization, readmission prevention, and value-based care performance tracking", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
          { name: "IoMT & Remote Monitoring", desc: "Connected medical devices and wearables for chronic disease management with real-time patient data streaming", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop" },
          { name: "Medical Imaging AI", desc: "Computer vision for radiology analysis, disease detection, and diagnostic accuracy improvement", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop" },
          { name: "Patient Digital Twin", desc: "Personalized health models for treatment simulation, outcome prediction, and precision medicine", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop" },
          { name: "Patient Engagement Portals", desc: "Mobile-first platforms for health tracking, medication adherence, appointment management, and secure messaging", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop" },
          { name: "Revenue Cycle Management", desc: "Automated billing, claims processing, denial management, and financial analytics to maximize reimbursement", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop" }
        ],
        benefits: [
          "Improved patient outcomes through evidence-based clinical decision support",
          "40-50% reduction in administrative burden and documentation time",
          "Enhanced patient satisfaction with convenient digital access to care",
          "HIPAA-compliant infrastructure with end-to-end encryption and audit trails",
          "99.99% system uptime ensuring continuous access to critical patient data",
          "Seamless interoperability with existing hospital information systems"
        ],
        successMetrics: [
          "Patient satisfaction (HCAHPS) scores increased by 35%",
          "Clinical documentation time reduced by 45%",
          "Patient no-show rates decreased by 30%",
          "Emergency department wait times improved by 25%"
        ]
      }
    },
    {
      title: "Fitness",
      heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop",
      icon: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
      fullDescription: "Smart wearables and AI-driven fitness tracking for better health outcomes, personalized workout plans, and comprehensive wellness monitoring with real-time biometric analysis.",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      details: {
        overview: "Next-generation fitness and wellness technology combining wearable sensors, AI coaching, and behavioral science. We help fitness businesses and health enthusiasts leverage connected devices, personalized training algorithms, and community engagement platforms to achieve fitness goals, improve health metrics, and maintain long-term wellness habits.",
        overviewImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop",
        challenges: [
          "Keeping users motivated and engaged with fitness routines long-term",
          "Providing personalized workout plans that adapt to individual progress",
          "Accurately tracking diverse exercise activities and biometric data",
          "Integrating data from multiple wearable devices and fitness apps",
          "Delivering actionable insights from complex health and fitness data",
          "Ensuring data privacy and security for sensitive health information"
        ],
        solutions: [
          { name: "AI Personal Trainer", desc: "Machine learning algorithms creating adaptive workout plans based on goals, progress, fitness level, and available equipment", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop" },
          { name: "Wearable Device Integration", desc: "Unified platform connecting smartwatches, heart rate monitors, fitness trackers, and other IoT health devices", image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&h=300&fit=crop" },
          { name: "Real-Time Biometric Monitoring", desc: "Heart rate variability, VO2 max estimation, recovery tracking, and fatigue monitoring during workouts", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
          { name: "Nutrition & Meal Planning", desc: "AI-powered dietary recommendations, calorie tracking, macro optimization, and meal prep guidance", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop" },
          { name: "Virtual Fitness Classes", desc: "Live and on-demand workout streaming with real-time performance tracking and instructor feedback", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop" },
          { name: "Gamification & Challenges", desc: "Achievement systems, leaderboards, social challenges, and rewards to maintain user engagement", image: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=400&h=300&fit=crop" },
          { name: "Sleep & Recovery Analytics", desc: "Sleep quality tracking, recovery score calculations, and rest day recommendations", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop" },
          { name: "Fitness Community Platform", desc: "Social features for workout sharing, progress celebration, and peer motivation", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop" }
        ],
        benefits: [
          "68% improvement in user workout consistency through AI-powered motivation",
          "Personalized training plans adapting in real-time to user performance",
          "Comprehensive health insights from integrated wearable and app data",
          "40% faster fitness goal achievement with data-driven optimization",
          "Privacy-first architecture with encrypted health data and GDPR compliance",
          "Seamless integration with Apple Health, Google Fit, and major fitness platforms"
        ],
        successMetrics: [
          "User retention improved by 55% through gamification",
          "Average workout frequency increased by 72%",
          "Fitness goal completion rate reached 64%",
          "Community engagement up 89% with social features"
        ]
      }
    },
    {
      title: "E-commerce",
      heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
      icon: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=400&fit=crop",
      fullDescription: "Personalized shopping experiences and intelligent inventory management powered by AI recommendations, real-time analytics, and omnichannel customer engagement platforms.",
      gradient: "from-pink-500 via-rose-500 to-red-600",
      details: {
        overview: "Enterprise e-commerce solutions architected for conversion optimization and customer retention. We help online retailers deploy AI-powered personalization, implement intelligent search, optimize supply chains, and create seamless omnichannel experiences that drive revenue growth while reducing cart abandonment and improving customer lifetime value.",
        overviewImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
        challenges: [
          "Reducing cart abandonment and improving conversion rates",
          "Providing personalized product recommendations at scale",
          "Managing inventory across multiple warehouses and sales channels",
          "Delivering fast, cost-effective shipping and fulfillment",
          "Protecting customer data and preventing payment fraud",
          "Creating consistent experiences across web, mobile, and physical stores"
        ],
        solutions: [
          { name: "AI Product Recommendations", desc: "Machine learning algorithms for personalized product suggestions based on browsing behavior, purchase history, and customer preferences", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
          { name: "Intelligent Search & Discovery", desc: "Natural language processing for semantic search, visual search, and auto-complete with typo tolerance", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
          { name: "Dynamic Pricing Engine", desc: "Real-time price optimization based on demand, competition, inventory levels, and customer segments", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
          { name: "Inventory Management System", desc: "Multi-warehouse tracking, demand forecasting, automated reordering, and stockout prevention", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop" },
          { name: "Omnichannel Order Management", desc: "Unified commerce platform connecting online, mobile, and in-store sales with flexible fulfillment options", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop" },
          { name: "Customer Data Platform (CDP)", desc: "360-degree customer profiles unifying data from all touchpoints for personalized marketing", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
          { name: "Fraud Detection & Prevention", desc: "AI-powered transaction monitoring, risk scoring, and automated fraud blocking", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop" },
          { name: "Conversion Rate Optimization", desc: "A/B testing, heatmap analysis, and personalized checkout flows to reduce cart abandonment", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" }
        ],
        benefits: [
          "45% increase in conversion rates through AI-powered personalization",
          "60% reduction in cart abandonment with optimized checkout flows",
          "Real-time inventory visibility across all sales channels",
          "35% improvement in customer lifetime value through personalized engagement",
          "PCI-DSS compliant payment processing with 99.9% fraud detection accuracy",
          "Seamless integration with Shopify, WooCommerce, Magento, and custom platforms"
        ],
        successMetrics: [
          "Average order value increased by 38%",
          "Customer retention improved by 52%",
          "Inventory carrying costs reduced by 28%",
          "Fraudulent transactions blocked 99.9% accurately"
        ]
      }
    },
    {
      title: "Construction",
      heroImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop",
      icon: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop",
      fullDescription: "Digital project management and IoT for safer, more efficient construction sites with real-time progress tracking, equipment monitoring, and workforce safety solutions.",
      gradient: "from-orange-600 via-amber-600 to-yellow-600",
      details: {
        overview: "Comprehensive construction technology solutions modernizing project delivery from design through completion. We enable construction firms to deploy BIM (Building Information Modeling), implement IoT safety systems, optimize resource allocation, and improve project collaboration while reducing delays, cost overruns, and safety incidents across jobsites.",
        overviewImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop",
        challenges: [
          "Preventing workplace injuries and ensuring construction site safety",
          "Managing complex project timelines and coordinating multiple contractors",
          "Tracking equipment utilization and preventing theft or unauthorized use",
          "Controlling project costs and preventing budget overruns",
          "Ensuring quality compliance and meeting building code requirements",
          "Coordinating design changes and maintaining accurate as-built documentation"
        ],
        solutions: [
          { name: "Digital Project Management", desc: "Cloud-based platforms for scheduling, task management, document control, and real-time collaboration across teams", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop" },
          { name: "BIM & 3D Modeling", desc: "Building Information Modeling for clash detection, quantity takeoffs, and 4D/5D project visualization", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop" },
          { name: "IoT Safety Monitoring", desc: "Wearable sensors, environmental monitors, and geo-fencing for worker safety and hazard detection", image: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e8?w=400&h=300&fit=crop" },
          { name: "Equipment Tracking & Telematics", desc: "GPS tracking, usage monitoring, maintenance scheduling, and theft prevention for construction equipment", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" },
          { name: "Drone Site Surveying", desc: "Aerial photography, progress monitoring, volumetric calculations, and site inspection automation", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop" },
          { name: "Quality & Compliance Management", desc: "Digital checklists, inspection workflows, defect tracking, and regulatory compliance documentation", image: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e8?w=400&h=300&fit=crop" },
          { name: "Resource Optimization", desc: "AI-driven scheduling for labor, materials, and equipment to minimize idle time and maximize productivity", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
          { name: "Mobile Field Apps", desc: "Offline-capable mobile tools for daily reports, time tracking, photo documentation, and issue logging", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop" }
        ],
        benefits: [
          "72% reduction in safety incidents through proactive IoT monitoring",
          "40% improvement in project delivery timeline through digital coordination",
          "Real-time project visibility for all stakeholders via cloud dashboards",
          "35% reduction in equipment theft and 50% better utilization tracking",
          "Compliance with OSHA, ISO 45001, and local building code requirements",
          "30% cost savings through optimized resource allocation and waste reduction"
        ],
        successMetrics: [
          "Safety incident rate reduced by 72%",
          "Project completion time improved by 28%",
          "Budget overruns decreased by 42%",
          "Equipment utilization increased by 55%"
        ]
      }
    },
    {
      title: "Telecom",
      heroImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=600&fit=crop",
      icon: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&h=400&fit=crop",
      fullDescription: "AI-powered network optimization and customer experience solutions with real-time performance monitoring, predictive maintenance, and intelligent service delivery platforms.",
      gradient: "from-indigo-600 via-blue-600 to-cyan-600",
      details: {
        overview: "Next-generation telecommunications solutions enabling CSPs (Communication Service Providers) to optimize network performance, reduce churn, and deliver superior customer experiences. From AI-powered network operations to personalized service offerings, we help telecom operators modernize infrastructure, improve service quality, and drive revenue growth in competitive markets.",
        overviewImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
        challenges: [
          "Managing network congestion and ensuring quality of service (QoS)",
          "Reducing customer churn in highly competitive telecom markets",
          "Detecting and resolving network outages before customer impact",
          "Optimizing spectrum allocation and network capacity planning",
          "Personalizing service offerings and pricing for diverse customer segments",
          "Migrating from legacy infrastructure to 5G and cloud-native networks"
        ],
        solutions: [
          { name: "AI Network Optimization", desc: "Machine learning for traffic prediction, load balancing, spectrum management, and automatic network parameter tuning", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
          { name: "Predictive Network Maintenance", desc: "IoT sensor data and ML algorithms predicting equipment failures, tower issues, and fiber optic degradation", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop" },
          { name: "Customer Churn Prediction", desc: "Behavioral analytics identifying at-risk customers with personalized retention offers and proactive support", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
          { name: "Self-Optimizing Networks (SON)", desc: "Automated network configuration, optimization, and healing reducing manual interventions", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" },
          { name: "5G Network Slicing", desc: "Dynamic resource allocation creating virtual networks for different service types (eMBB, URLLC, mMTC)", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop" },
          { name: "BSS/OSS Modernization", desc: "Cloud-native business and operational support systems for agile service delivery and billing", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop" },
          { name: "Customer Experience Analytics", desc: "Real-time monitoring of customer journey, service quality metrics, and sentiment analysis", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
          { name: "IoT Connectivity Platform", desc: "Massive IoT device management, connectivity provisioning, and monetization for enterprise customers", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop" }
        ],
        benefits: [
          "50% reduction in network outages through predictive maintenance",
          "35% improvement in customer retention with AI-powered churn prevention",
          "Real-time network performance visibility across all infrastructure",
          "40% faster service deployment with cloud-native BSS/OSS systems",
          "Compliance with 3GPP, ETSI, ITU-T standards and regional telecom regulations",
          "30% reduction in operational costs through network automation"
        ],
        successMetrics: [
          "Network availability improved to 99.99%",
          "Customer churn reduced by 38%",
          "Average network latency decreased by 45%",
          "New service time-to-market reduced by 60%"
        ]
      }
    }
  ];

  // FIX: Use array index instead of find() by title
  const industry = industriesData[selectedIndustry];

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Industry not found</h2>
          <button 
            onClick={() => navigate('industries')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Industries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${industry.heroImage})` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${industry.gradient} opacity-90`}></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-white">
            <div className="flex items-center gap-6 mb-6">
              <img 
                src={industry.icon} 
                alt={industry.title}
                className="w-24 h-24 rounded-2xl shadow-2xl object-cover"
              />
              <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg">{industry.title}</h1>
            </div>
            <p className="text-xl md:text-2xl max-w-4xl leading-relaxed drop-shadow-md">
              {industry.fullDescription}
            </p>
            <button 
              onClick={() => navigate('industries')}
              className="mt-8 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              ← Back to All Industries
            </button>
          </div>
        </div>
      </div>

      {/* Overview Section with Image */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {industry.details.overview}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={industry.details.overviewImage} 
                alt={`${industry.title} Overview`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">Industry Challenges We Address</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {industry.details.challenges.map((challenge, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xl">!</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">{challenge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section with Images */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">Our Solutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {industry.details.solutions.map((solution, idx) => (
              <div key={idx} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={solution.image} 
                    alt={solution.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{solution.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{solution.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">Key Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.details.benefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">Proven Results</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industry.details.successMetrics.map((metric, idx) => (
              <div key={idx} className={`p-8 rounded-xl bg-gradient-to-br ${industry.gradient} text-white shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2`}>
                <p className="text-lg font-semibold leading-relaxed text-center">{metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`relative py-24 px-6 overflow-hidden`}>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${industry.heroImage})` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${industry.gradient} opacity-95`}></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Ready to Transform Your {industry.title} Operations?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-95 drop-shadow-md">
            Let's discuss how our solutions can address your specific challenges and drive measurable results.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <button 
  onClick={() => navigate(`contact?subject=Schedule Consultation - ${industry.title}`)}
  className="px-10 py-5 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
>
  Schedule a Consultation
</button>
            <button className="px-10 py-5 bg-transparent border-3 border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-900 transition-all text-lg shadow-xl">
              Download Case Study
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}