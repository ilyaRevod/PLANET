import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const API_BASE = import.meta.env.VITE_API_URL;

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('رمز ها باهم برابر نیستن');
      setIsLoading(false);
      return;
    }

    try {
      const loginResponse = await fetch('https://planet-wt7r.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: formData.studentId,
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include'
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setError(loginData.message || 'مشکل در ورود! رمز و ایمیل خود را بررسی کنید');
        setIsLoading(false);
        return;
      }

      const scheduleResponse = await fetch('https://planet-wt7r.onrender.com/api/get-classes', {
        credentials: 'include'
      });

      const scheduleData = await scheduleResponse.json();

      if (!scheduleResponse.ok) {
        setError(scheduleData.error || 'مشکل در دریافت اطلاعات کلاس‌ها');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('classesData', JSON.stringify(scheduleData));
      navigate('/schedule');

    } catch (err) {
      setError('مشکل در برقراری ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 font-vazir text-right">
      <div className="max-w-md w-full space-y-8 p-8 rounded-lg">
        <div>
          <h2 className="mt-6 mb-9 text-center text-xl font-extrabold text-foreground">
            وارد حساب خود شوید
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-muted-foreground">
                شماره دانشجویی
              </label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-input bg-background text-foreground focus:outline-none focus:ring-primary focus:border-ring sm:text-sm mt-2 text-right"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                ایمیل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-input bg-background text-foreground focus:outline-none focus:ring-primary focus:border-ring sm:text-sm mt-2 text-right"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                رمز ورود
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="رمز ورود به پنل دانشجویی"
                className="appearance-none rounded-md w-full px-3 py-2 border border-input bg-background text-foreground placeholder:opacity-60 placeholder:text-sm focus:outline-none focus:ring-primary focus:border-ring sm:text-sm mt-2 text-right"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground">
                تکرار رمز
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-input bg-background text-foreground focus:outline-none focus:ring-primary focus:border-ring sm:text-sm mt-2 text-right"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-[#776BB2] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-8"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>لطفا صبور باشید</span>
                </>
              ) : (
                'ورود'
              )}
            </button>
          </div>

          {error && (
            <div className="text-destructive text-center text-sm">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};
