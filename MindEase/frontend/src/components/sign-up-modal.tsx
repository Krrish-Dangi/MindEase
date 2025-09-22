import { GraduationCap, Heart, Eye, EyeOff, ShieldCheck, UserCheck } from "lucide-react";
import { useState } from "react";

// Inline components to resolve import errors
const Button = ({ children, onClick, disabled, className, variant, size, type, ...props }) => (
  <button onClick={onClick} disabled={disabled} className={`p-2 rounded-lg transition-colors ${className}`} {...props}>
    {children}
  </button>
);

const Input = ({ id, value, onChange, placeholder, type = 'text', className, ...props }) => (
  <input
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Label = ({ htmlFor, children, className, ...props }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-900 mb-1 ${className}`} {...props}>
    {children}
  </label>
);

const Card = ({ className, children, onClick, style }) => (
  <div onClick={onClick} style={style} className={`p-4 rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-2 ${className}`}>
    {children}
  </div>
);

const Select = ({ onValueChange, children, value }) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        if (onValueChange) onValueChange(e.target.value);
      }}
      className="rounded-xl border-2 h-11 bg-white border-gray-300 text-gray-900 w-full p-2"
    >
      {children}
    </select>
  );
};

const SelectTrigger = ({ children, placeholder }) => (
  <option disabled value="">{placeholder}</option>
);

const SelectContent = ({ children }) => <>{children}</>;

const SelectItem = ({ value, children, className }) => (
  <option value={value} className={className}>{children}</option>
);

const SelectValue = ({ placeholder }) => <>{placeholder}</>;

const Checkbox = ({ id, checked, onCheckedChange, className, ...props }) => (
  <input
    id={id}
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className={`form-checkbox h-4 w-4 text-blue-600 rounded ${className}`}
    {...props}
  />
);

const CustomModal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className={`relative bg-white p-8 rounded-2xl shadow-xl transform transition-all sm:my-8 sm:w-full sm:max-w-md ${className}`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

// Mock `useLanguage` hook and `t` function
const useLanguage = () => {
  const t = (key) => {
    const translations = {
      'auth.signUp.title': 'Sign Up',
      'auth.signUp.subtitle': 'Choose your account type',
      'auth.student': 'Student',
      'auth.counsellor': 'counsellor',
      'auth.firstName': 'First Name',
      'auth.lastName': 'Last Name',
      'auth.email': 'Email',
      'auth.college': 'College',
      'auth.year': 'Year',
      'auth.license': 'License',
      'auth.specialization': 'Specialization',
      'auth.terms': 'I agree to the Terms of Service and Privacy Policy',
      'auth.createAccount': 'Create Account',
      'auth.privacyProtected': 'Privacy Protected',
      'auth.anonymousOption': 'Continue Anonymously'
    };
    return translations[key] || key;
  };
  return { t };
};

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [userType, setUserType] = useState<'student' | 'counsellor' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { t } = useLanguage();
  
  // New: Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",     // student | counsellor
    college: "",
    year: "",
    license: "",
    specialization: "",
    gender: "",       // new
    dob: ""           // new
  });


  // New: Error state and validation
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData(prevData => ({ ...prevData, userType: type }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.firstName.trim()) tempErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) tempErrors.lastName = "Last name is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.dob) tempErrors.dob = "Date of Birth is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      console.error("Form validation failed.");
      return;
    }

    if (!agreeToTerms) {
      console.error("Please agree to the Terms of Service.");
      return;
    }

    try {
      // backend expects these exact fields
      const payload = userType === "student"
  ? {
      role: "student",
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      password: formData.password,
      college: formData.college,
      gender: formData.gender,
      dob: formData.dob,
      language: "en"
    }
  : {
      role: "counsellor",
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      password: formData.password,
      license: formData.license,
      specialization: formData.specialization,
      experience: 0,
      language: "en"
    }


    console.log("Signup payload:", payload);


      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Registered:", data);
        handleClose();
      } else {
        console.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Something went wrong", err);
    }
  };


  const resetModal = () => {
    setUserType(null);
    setShowPassword(false);
    setAgreeToTerms(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "",
      college: "",
      year: "",
      license: "",
      specialization: "",
      gender: "",
      dob: ""
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={handleClose} className="max-h-[90vh] overflow-y-auto">
      {!userType ? (
        <>
          <div className="text-center pb-6">
            <h2 className="text-3xl mb-2 text-gray-900 font-bold">
              {t('auth.signUp.title') || 'Sign Up'}
            </h2>
            <p className="text-sm text-gray-600">
              {t('auth.signUp.subtitle') || 'Choose your account type'}
            </p>
          </div>

          <div className="grid gap-6">
            <Card
              className="cursor-pointer border-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl group border-blue-200 hover:border-blue-400"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.08) 50%, rgba(191, 219, 254, 0.05) 100%)'
              }}
              onClick={() => handleUserTypeChange('student')}
            >
              <CardContent className="px-4 py-3 text-center">
                <div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.8) 0%, rgba(59, 130, 246, 0.9) 50%, rgba(37, 99, 235, 0.8) 100%)' }}>
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base mb-1 text-gray-900 font-semibold">
                  {t('auth.student') || 'Student'} <span className="text-yellow-500">✦</span>
                </h3>
                <p className="text-xs text-gray-600 leading-tight">
                  Get instant AI support, connect with peers, and book counselling sessions
                </p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer border-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl group border-orange-200 hover:border-orange-400"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.05) 0%, rgba(253, 186, 116, 0.08) 50%, rgba(254, 215, 170, 0.05) 100%)'
              }}
              onClick={() => handleUserTypeChange('counsellor')}
            >
              <CardContent className="px-4 py-3 text-center">
                <div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'var(--mindease-gradient-warm)' }}>
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base mb-1 text-gray-900 font-semibold">
                  {t('auth.counsellor') || 'counsellor'} <span className="text-yellow-500">✧</span>
                </h3>
                <p className="text-xs text-gray-600 leading-tight">
                  Join our network to support students and manage your practice
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center pt-6">
            <p className="text-xs text-gray-600">
              Already have an account?{' '}
              <button
                className="underline hover:no-underline font-medium text-blue-600 hover:text-blue-800"
                onClick={handleClose}
              >
                Sign in here ✩
              </button>
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="text-center pb-8">
            <div className="flex items-center justify-center mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUserTypeChange(null)}
                className="mr-4 rounded-xl hover:bg-gray-100 text-gray-600"
              >
                ← Back
              </Button>
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center"
                style={{
                  background: userType === 'student' ? 'linear-gradient(135deg, rgba(147, 197, 253, 0.8) 0%, rgba(59, 130, 246, 0.9) 50%, rgba(37, 99, 235, 0.8) 100%)' : 'var(--mindease-gradient-warm)'
                }}>
                {userType === 'student' ? (
                  <GraduationCap className="h-8 w-8 text-white" />
                ) : (
                  <Heart className="h-8 w-8 text-white" />
                )}
              </div>
            </div>
            <h2 className="text-2xl mb-3 text-gray-900 font-bold">
              {userType === 'student' ? 'Student Registration' : 'counsellor Registration'} ✦
            </h2>
            <p className="text-sm text-gray-600">
              {userType === 'student'
                ? 'Create your confidential account (optional - you can use MindEase anonymously)'
                : 'Join our verified counsellor network'
              }
            </p>
          </div>

          <div className="space-y-5">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-900">
                  {t('auth.firstName') || 'First Name'}
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="rounded-xl border-2 h-11 bg-white border-gray-300 text-gray-900"
                />
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-900">
                  {t('auth.lastName') || 'Last Name'}
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="rounded-xl border-2 h-11 bg-white border-gray-300 text-gray-900"
                />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                {t('auth.email') || 'Email'}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={userType === 'student' ? 'your.email@college.edu' : 'your.email@domain.com'}
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-xl border-2 h-11 bg-white border-gray-300 text-gray-900"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                Create Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="rounded-xl border-2 h-11 pr-12 bg-white border-gray-300 text-gray-900"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-4 hover:bg-transparent rounded-xl text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-900">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="rounded-xl border-2 h-11 bg-white border-gray-300 text-gray-900"
              />
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* Gender & Date of Birth */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium text-gray-900">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger className="rounded-xl border-2 h-11 bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300">
                    <SelectItem value="" className="text-gray-900">Select Gender</SelectItem>
                    <SelectItem value="male" className="text-gray-900">Male</SelectItem>
                    <SelectItem value="female" className="text-gray-900">Female</SelectItem>
                    <SelectItem value="non-binary" className="text-gray-900">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say" className="text-gray-900">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm font-medium text-gray-900">Date of Birth</Label>
                <Input id="dob" type="date" value={formData.dob} onChange={handleInputChange} className="rounded-xl border-2 h-11 bg-white border-gray-300 text-gray-900" />
                {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
              </div>
            </div>

            {/* Additional fields based on user type */}
            {userType === 'student' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="college" className="text-sm font-medium text-gray-900">
                    {t('auth.college') || 'College'}
                  </Label>
                  <Input
                    id="college"
                    name="college"
                    placeholder="Your college name"
                    value={formData.college}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 h-11 bg-white border-gray-300 text-gray-900"
                  />
                  {errors.college && <p className="text-xs text-red-500">{errors.college}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-sm font-medium text-gray-900">
                    {t('auth.year') || 'Year'}
                  </Label>
                  <Select value={formData.year} onValueChange={(value) => handleSelectChange('year', value)}>
                    <SelectTrigger className="rounded-xl border-2 h-11 bg-white border-gray-300 text-gray-900">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300">
                      <SelectItem value="1st" className="text-gray-900">1st Year</SelectItem>
                      <SelectItem value="2nd" className="text-gray-900">2nd Year</SelectItem>
                      <SelectItem value="3rd" className="text-gray-900">3rd Year</SelectItem>
                      <SelectItem value="4th" className="text-gray-900">4th Year</SelectItem>
                      <SelectItem value="masters" className="text-gray-900">Master's</SelectItem>
                      <SelectItem value="phd" className="text-gray-900">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.year && <p className="text-xs text-red-500">{errors.year}</p>}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="license" className="text-sm font-medium text-gray-900">
                    {t('auth.license') || 'License'}
                  </Label>
                  <Input
                    id="license"
                    name="license"
                    placeholder="Your professional license number"
                    value={formData.license}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 h-11 bg-white border-gray-300 text-gray-900"
                  />
                  {errors.license && <p className="text-xs text-red-500">{errors.license}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization" className="text-sm font-medium text-gray-900">
                    {t('auth.specialization') || 'Specialization'}
                  </Label>
                  <Select value={formData.specialization} onValueChange={(value) => handleSelectChange('specialization', value)}>
                    <SelectTrigger className="rounded-xl border-2 h-11 bg-white border-gray-300 text-gray-900">
                      <SelectValue placeholder="Select your specialization" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300">
                      <SelectItem value="clinical" className="text-gray-900">Clinical Psychology</SelectItem>
                      <SelectItem value="counseling" className="text-gray-900">Counseling Psychology</SelectItem>
                      <SelectItem value="student-affairs" className="text-gray-900">Student Affairs</SelectItem>
                      <SelectItem value="psychiatry" className="text-gray-900">Psychiatry</SelectItem>
                      <SelectItem value="social-work" className="text-gray-900">Social Work</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.specialization && <p className="text-xs text-red-500">{errors.specialization}</p>}
                </div>
              </>
            )}

            {/* Terms and Privacy */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-xs leading-relaxed text-gray-700">
                {t('auth.terms') || 'I agree to the Terms of Service and Privacy Policy'}
              </Label>
            </div>

            <Button
              onClick={handleSignUp}
              className="w-full rounded-xl text-white shadow-lg hover:shadow-2xl transition-all duration-300 h-12 text-lg hover:scale-105"
              disabled={
                !agreeToTerms || 
                !formData.email || 
                !formData.password || 
                (userType === "counsellor" && !formData.specialization) // <-- add this
              }
              style={{
                background: userType === 'student'
                  ? 'linear-gradient(135deg, rgba(147, 197, 253, 0.8) 0%, rgba(59, 130, 246, 0.9) 50%, rgba(37, 99, 235, 0.8) 100%)'
                  : 'var(--mindease-gradient-warm)'
              }}
            >
              {t('auth.createAccount') || 'Create Account'} ✧
            </Button>


            {/* Privacy assurance for students */}
            {userType === 'student' && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <div className="flex items-center space-x-3 mb-3">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    {t('auth.privacyProtected') || 'Privacy Protected'} ✦
                  </span>
                </div>
                <ul className="text-xs space-y-1 text-blue-800">
                  <li>✧ Your data is encrypted and confidential</li>
                  <li>✧ You can delete your account anytime</li>
                  <li>✧ Anonymous usage option always available</li>
                </ul>
              </div>
            )}

            {/* Anonymous option for students */}
            {userType === 'student' && (
              <div className="text-center pt-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs rounded-xl hover:bg-gray-100 text-gray-600"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  {t('auth.anonymousOption') || 'Continue Anonymously'} ✩
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </CustomModal>
  );
}
