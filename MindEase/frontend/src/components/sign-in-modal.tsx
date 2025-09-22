import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { UserCheck, GraduationCap, Heart, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/language-context";
import { useAuth } from "../contexts/auth-context";
import { CustomModal } from "./custom-modal";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [userType, setUserType] = useState<'student' | 'counsellor' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const { t } = useLanguage();
  const { login } = useAuth();

  const resetModal = () => {
    setUserType(null);
    setShowPassword(false);
    setFormData({ usernameOrEmail: '', password: '' });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleSignIn = async () => {
  if (!formData.usernameOrEmail || !formData.password) {
    alert("Enter username/email and password");
    return;
  }

  try {
    const payload = {
      email: formData.usernameOrEmail,
      password: formData.password
    };

    const res = await fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("✅ Login successful", data);
      
      // **ASLI FIX YAHAN HAI**
      // Check if the returned user role matches the selected role
      if (data.user.role !== userType) {
        alert(`You are a ${data.user.role} and cannot sign in as a ${userType}.`);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      const backendUser = {
        id: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        college: data.user.college,
        gender: data.user.gender,
        dob: data.user.dob,
        language: data.user.language
      };

      if (!backendUser) {
        alert("Login failed: No user returned from server");
        console.error("No user object returned:", data);
        return;
      }

      // Normalize role spelling so frontend always uses 'counsellor'
      const normalizedRole =
      backendUser.role === 'counsellor' ? 'counsellor' : backendUser.role;

      login({
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.name || backendUser.id,
        username: backendUser.name?.split(' ')[0]?.toLowerCase() || 'user',
        firstName: backendUser.name?.split(' ')[0] || '',
        lastName: backendUser.name?.split(' ')[1] || '',
        userType: normalizedRole as 'student' | 'counsellor',
        college: backendUser.college,
        gender: backendUser.gender,
        dob: backendUser.dob,
        language: backendUser.language
      });


      handleClose();
    } else {
      console.error("Login failed:", data.message);
      alert(data.message || "Login failed. Check credentials.");
    }
  } catch (err) {
    console.error("Something went wrong", err);
    alert("Something went wrong. Try again later.");
  }
};

  return (
    <CustomModal isOpen={isOpen} onClose={handleClose}>
      {!userType ? (
        <>
          <div className="text-center pb-6">
            <h2 className="text-3xl mb-2 text-gray-900 font-bold">
              {t('auth.signIn.title') || 'Sign In'}
            </h2>
            <p className="text-sm text-gray-600">
              {t('auth.signIn.subtitle') || 'Choose your account type'}
            </p>
          </div>

          <div className="grid gap-6">
            <Card 
              className="cursor-pointer border-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl group border-blue-200 hover:border-blue-400"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.08) 50%, rgba(191, 219, 254, 0.05) 100%)'
              }}
              onClick={() => setUserType('student')}
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
                  {t('auth.student.description') || 'Access your mental health companion'}
                </p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer border-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl group border-orange-200 hover:border-orange-400"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.05) 0%, rgba(253, 186, 116, 0.08) 50%, rgba(254, 215, 170, 0.05) 100%)'
              }}
              onClick={() => setUserType('counsellor')}
            >
              <CardContent className="px-4 py-3 text-center">
                <div className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                     style={{ background: 'var(--mindease-gradient-warm)' }}>
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base mb-1 text-gray-900 font-semibold">
                  {t('auth.counsellor') || 'Counsellor'} <span className="text-yellow-500">✧</span>
                </h3>
                <p className="text-xs text-gray-600 leading-tight">
                  {t('auth.counsellor.description') || 'Access your counselling dashboard'}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center pt-6">
            <p className="text-xs text-gray-600">
              Don't have an account?{' '}
              <button 
                className="underline hover:no-underline font-medium text-blue-600 hover:text-blue-800"
                onClick={handleClose}
              >
                Sign up here ✩
              </button>
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUserType(null)}
                className="mr-4 rounded-xl hover:bg-gray-100 text-gray-600"
              >
                ← Back
              </Button>
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center"
                   style={{ 
                     background: userType === 'student' ? 'var(--mindease-gradient-primary)' : 'var(--mindease-gradient-warm)' 
                   }}>
                {userType === 'student' ? (
                  <GraduationCap className="h-8 w-8 text-white" />
                ) : (
                  <Heart className="h-8 w-8 text-white" />
                )}
              </div>
            </div>
            <h2 className="text-2xl mb-2 text-gray-900 font-bold">
              {userType === 'student' ? 'Student Sign In' : 'Counsellor Sign In'}
            </h2>
            <p className="text-sm text-gray-600">
              {userType === 'student' 
                ? 'Access your confidential mental health companion'
                : 'Access your counselling dashboard'
              }
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="usernameOrEmail" className="text-sm font-medium text-gray-900">
                {t('auth.username') || 'Username'} or {t('auth.email') || 'Email'}
              </Label>
              <Input
                id="usernameOrEmail"
                type="text"
                placeholder={userType === 'student' ? 'username or your.email@college.edu' : 'username or your.email@domain.com'}
                className="rounded-xl border-2 h-12 bg-white border-gray-300 text-gray-900"
                value={formData.usernameOrEmail}
                onChange={(e) => setFormData({ ...formData, usernameOrEmail: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                {t('auth.password') || 'Password'}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="rounded-xl border-2 h-12 pr-12 bg-white border-gray-300 text-gray-900"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            </div>

            <div className="flex items-center justify-between text-sm">
              <a 
                href="#forgot-password" 
                className="hover:underline font-medium text-blue-600 hover:text-blue-800"
              >
                {t('auth.forgotPassword') || 'Forgot password'} ✩
              </a>
            </div>

            <Button 
              className="w-full rounded-xl text-white shadow-lg hover:shadow-2xl transition-all duration-300 h-12 text-lg hover:scale-105"
              onClick={handleSignIn}
              disabled={!formData.usernameOrEmail || !formData.password}
              style={{ 
                background: userType === 'student' 
                  ? 'var(--mindease-gradient-primary)' 
                  : 'var(--mindease-gradient-warm)'
              }}
            >
              {t('header.signIn') || 'Sign In'} ✧
            </Button>

            {userType === 'student' && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <UserCheck className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    {t('auth.anonymousAvailable') || 'Anonymous mode available'} ✦
                  </span>
                </div>
                <p className="text-xs text-blue-700">
                  You can also use MindEase without creating an account
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </CustomModal>
  );
}