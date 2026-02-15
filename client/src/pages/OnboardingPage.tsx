import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Compass, ChevronRight, ChevronLeft } from 'lucide-react';
import { userApi } from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { CATEGORIES, type Category } from '@/types';
import { cn } from '@/utils/cn';

const CATEGORY_ICONS: Record<Category, string> = {
  Sport: '🏃',
  Creative: '🎨',
  Culture: '🎭',
  Nature: '🌿',
  Social: '👥',
  Learning: '📚',
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setOnboardingComplete } = useAuthStore();
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState(150);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const mutation = useMutation({
    mutationFn: () => userApi.updatePreferences(budget, selectedCategories),
    onSuccess: () => {
      setOnboardingComplete();
      navigate('/discover');
    },
  });

  const toggleCategory = (cat: Category) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Compass size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl">BudgetHobby</span>
          </div>
          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === step ? 'w-8 bg-primary' : i < step ? 'w-2 bg-primary/40' : 'w-2 bg-muted'
                )}
              />
            ))}
          </div>
        </div>

        {/* Step 0 — Welcome */}
        {step === 0 && (
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">👋</div>
            <h1 className="text-3xl font-bold mb-4">Welcome to BudgetHobby!</h1>
            <p className="text-muted-foreground text-lg mb-10 max-w-sm mx-auto">
              Let's personalize your experience. We'll ask you two quick questions to help find your
              perfect hobbies.
            </p>
            <Button size="xl" onClick={() => setStep(1)}>
              Let's get started <ChevronRight size={18} />
            </Button>
          </div>
        )}

        {/* Step 1 — Budget */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">💰</div>
              <h2 className="text-2xl font-bold mb-2">What's your monthly hobby budget?</h2>
              <p className="text-muted-foreground">
                We'll show you activities that fit within your budget.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 mb-8">
              <div className="text-center mb-6">
                <span className="text-5xl font-extrabold text-primary">${budget}</span>
                <span className="text-muted-foreground text-lg">/month</span>
              </div>

              <input
                type="range"
                min={0}
                max={500}
                step={10}
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>$0</span>
                <span>$500+</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {[0, 50, 100, 150, 200, 300].map(v => (
                  <button
                    key={v}
                    onClick={() => setBudget(v)}
                    className={cn(
                      'rounded-xl py-2 text-sm font-medium border transition-colors',
                      budget === v
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    {v === 0 ? 'Free' : `$${v}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={() => setStep(0)} className="flex-1">
                <ChevronLeft size={18} /> Back
              </Button>
              <Button size="lg" onClick={() => setStep(2)} className="flex-1">
                Next <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 — Categories */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-2">What are you interested in?</h2>
              <p className="text-muted-foreground">
                Pick at least 3 categories. You can always change this later.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl border p-4 text-left transition-all',
                    selectedCategories.includes(cat)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/30 hover:bg-accent'
                  )}
                >
                  <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                  <span className="font-medium">{cat}</span>
                  {selectedCategories.includes(cat) && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </button>
              ))}
            </div>

            {selectedCategories.length > 0 && selectedCategories.length < 3 && (
              <p className="text-sm text-amber-600 text-center mb-4">
                Select at least {3 - selectedCategories.length} more
              </p>
            )}

            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">
                <ChevronLeft size={18} /> Back
              </Button>
              <Button
                size="lg"
                onClick={() => mutation.mutate()}
                disabled={selectedCategories.length < 3 || mutation.isPending}
                className="flex-1"
              >
                {mutation.isPending ? 'Saving...' : 'Start Exploring'}
                {!mutation.isPending && <ChevronRight size={18} />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

