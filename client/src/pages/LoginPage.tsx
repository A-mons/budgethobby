import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import LoginForm from '@/features/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary items-center justify-center p-12">
        <div className="text-white max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <Compass size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold">BudgetHobby</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Your hobbies, your budget, your way.
          </h2>
          <p className="text-white/80 text-lg">
            Discover hundreds of activities tailored to what you love and what you can afford.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
              <Compass size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg">BudgetHobby</span>
          </Link>

          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to continue discovering hobbies.</p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
