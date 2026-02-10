import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, Heart, Settings, Moon, Sun, LogOut, Save } from 'lucide-react';
import { userApi } from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';
import { CATEGORIES, type Category } from '@/types';
import { cn } from '@/utils/cn';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const { data: favorites } = useFavorites();
  const queryClient = useQueryClient();

  const { data: preferences, isLoading: prefLoading } = useQuery({
    queryKey: ['preferences'],
    queryFn: () => userApi.getPreferences().then(r => r.data),
  });

  const [budget, setBudget] = useState<number | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[] | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const currentBudget = budget ?? preferences?.budget ?? 150;
  const currentCategories = (selectedCategories ?? preferences?.categories ?? []) as Category[];

  const updateMutation = useMutation({
    mutationFn: () => userApi.updatePreferences(currentBudget, currentCategories),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferences'] });
      setIsEditing(false);
      setBudget(null);
      setSelectedCategories(null);
    },
  });

  const toggleCategory = (cat: Category) => {
    const current = currentCategories;
    setSelectedCategories(
      current.includes(cat) ? current.filter(c => c !== cat) : [...current, cat]
    );
  };

  const CATEGORY_ICONS: Record<Category, string> = {
    Sport: '🏃', Creative: '🎨', Culture: '🎭', Nature: '🌿', Social: '👥', Learning: '📚',
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* User info */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <User size={24} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold text-lg">{user?.email}</p>
            <p className="text-sm text-muted-foreground">
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Heart size={16} className="text-muted-foreground" />
            <span className="font-semibold">{favorites?.length ?? 0}</span>
            <span className="text-muted-foreground text-sm">saved</span>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-primary" />
            <h2 className="font-semibold text-lg">Preferences</h2>
          </div>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setBudget(null);
                  setSelectedCategories(null);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => updateMutation.mutate()}
                disabled={updateMutation.isPending || currentCategories.length < 1}
              >
                <Save size={14} />
                {updateMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </div>

        {prefLoading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Budget */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Monthly budget:{' '}
                <span className="text-primary font-bold">
                  {currentBudget === 0 ? 'Free' : `$${currentBudget}/mo`}
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={500}
                step={10}
                value={currentBudget}
                disabled={!isEditing}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary disabled:[&::-webkit-slider-thumb]:bg-muted-foreground"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium mb-3">Interests</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => isEditing && toggleCategory(cat)}
                    disabled={!isEditing}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium border transition-colors',
                      currentCategories.includes(cat)
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'border-border text-muted-foreground',
                      isEditing && !currentCategories.includes(cat) && 'hover:border-primary/50 hover:text-foreground cursor-pointer',
                      !isEditing && 'cursor-default'
                    )}
                  >
                    <span>{CATEGORY_ICONS[cat]}</span>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Settings</h2>
        <div className="space-y-4">
          {/* Dark mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDark ? <Moon size={18} className="text-primary" /> : <Sun size={18} className="text-amber-500" />}
              <div>
                <p className="font-medium text-sm">Dark mode</p>
                <p className="text-xs text-muted-foreground">Switch between light and dark theme</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={cn(
                'relative h-6 w-11 rounded-full transition-colors',
                isDark ? 'bg-primary' : 'bg-muted'
              )}
            >
              <span
                className={cn(
                  'absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform',
                  isDark ? 'translate-x-5' : 'translate-x-1'
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl border border-destructive/30 bg-card p-6">
        <h2 className="font-semibold text-lg mb-4 text-destructive">Account</h2>
        <Button variant="outline" onClick={logout} className="border-destructive/50 text-destructive hover:bg-destructive/10">
          <LogOut size={16} />
          Sign out
        </Button>
      </div>
    </div>
  );
}

