import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import RegisterForm from '@/features/auth/RegisterForm';

export default function RegisterPage() {
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
            Find hobbies that fit your life.
          </h2>
          <p className="text-white/80 text-lg">
            Create a free account and start exploring hundreds of activities matched to your budget and interests.
          </p>
          <div className="mt-8 space-y-3">
            {['✓ Free to use', '✓ Budget-aware recommendations', '✓ Save unlimited favorites'].map(t => (
              <p key={t} className="text-white/90 font-medium">{t}</p>
            ))}
          </div>
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

          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Start discovering hobbies for free.</p>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
