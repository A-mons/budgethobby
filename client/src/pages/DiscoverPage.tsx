import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useActivities } from '@/hooks/useActivities';
import { useFavorites, useToggleFavorite } from '@/hooks/useFavorites';
import ActivityCard from '@/features/discover/ActivityCard';
import Spinner from '@/components/ui/Spinner';
import { CATEGORIES } from '@/types';
import { cn } from '@/utils/cn';

export default function DiscoverPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<string>('');

  const { data: activities, isLoading, error } = useActivities();
  const { data: favorites } = useFavorites();
  const { addMutation, removeMutation } = useToggleFavorite();

  const handleToggleFavorite = (activityId: string, favoriteId?: string) => {
    if (favoriteId) {
      removeMutation.mutate(favoriteId);
    } else {
      addMutation.mutate(activityId);
    }
  };

  const filtered = useMemo(() => {
    if (!activities) return [];
    return activities.filter(a => {
      const matchSearch =
        !search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase()) ||
        a.category.toLowerCase().includes(search.toLowerCase());

      const matchCategory = !activeCategory || a.category === activeCategory;

      const matchPrice = !maxPrice || a.price <= Number(maxPrice);

      return matchSearch && matchCategory && matchPrice;
    });
  }, [activities, search, activeCategory, maxPrice]);

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Discover Activities</h1>
        <p className="text-muted-foreground">
          {activities?.length ?? 0} activities to explore
        </p>
      </div>

      {/* Search + filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium border transition-colors',
              !activeCategory
                ? 'bg-primary text-white border-primary'
                : 'border-border hover:border-primary/50 hover:bg-accent'
            )}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium border transition-colors',
                activeCategory === cat
                  ? 'bg-primary text-white border-primary'
                  : 'border-border hover:border-primary/50 hover:bg-accent'
              )}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Max:</span>
            <select
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Any price</option>
              <option value="0">Free only</option>
              <option value="25">Under $25</option>
              <option value="50">Under $50</option>
              <option value="100">Under $100</option>
              <option value="200">Under $200</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Spinner size="lg" />
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-destructive/10 px-6 py-4 text-destructive text-center">
          Failed to load activities. Please try again.
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-4xl mb-4">🔍</p>
          <h3 className="text-xl font-semibold mb-2">No activities found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              isLoading={addMutation.isPending || removeMutation.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}

