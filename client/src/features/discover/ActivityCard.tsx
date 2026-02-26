import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';
import type { Activity, Favorite } from '@/types';

interface ActivityCardProps {
  activity: Activity;
  favorites?: Favorite[];
  onToggleFavorite: (activityId: string, favoriteId?: string) => void;
  isLoading?: boolean;
}

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-emerald-50 text-emerald-700',
  Intermediate: 'bg-amber-50 text-amber-700',
  Advanced: 'bg-red-50 text-red-700',
};

export default function ActivityCard({
  activity,
  favorites = [],
  onToggleFavorite,
  isLoading,
}: ActivityCardProps) {
  const favorite = favorites.find(f => f.activityId === activity.id);
  const isFav = !!favorite;

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(activity.id, favorite?.id);
  };

  return (
    <Link to={`/activities/${activity.id}`}>
      <div className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={activity.image}
            alt={activity.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={e => {
              (e.target as HTMLImageElement).src = `https://placehold.co/800x400/e2e8f0/94a3b8?text=${encodeURIComponent(activity.name)}`;
            }}
          />
          {/* Favorite button */}
          <button
            onClick={handleFav}
            disabled={isLoading}
            className={cn(
              'absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200',
              isFav
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-white/90 text-muted-foreground hover:text-red-500 hover:bg-white shadow-sm'
            )}
          >
            <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
          </button>
          {/* Category badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="category" className="shadow-sm">{activity.category}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-base leading-tight">{activity.name}</h3>
            <span
              className={cn(
                'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium',
                difficultyColors[activity.difficulty] || 'bg-muted text-muted-foreground'
              )}
            >
              {activity.difficulty}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{activity.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-primary">
              {activity.price === 0 ? 'Free' : `$${activity.price}/mo`}
            </span>
            <span className="text-xs text-muted-foreground">View details →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
