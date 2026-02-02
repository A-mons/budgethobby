import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, DollarSign, Zap, Package } from 'lucide-react';
import { useActivity } from '@/hooks/useActivities';
import { useFavorites, useToggleFavorite } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';
import { cn } from '@/utils/cn';

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-emerald-50 text-emerald-700',
  Intermediate: 'bg-amber-50 text-amber-700',
  Advanced: 'bg-red-50 text-red-700',
};

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: activity, isLoading, error } = useActivity(id!);
  const { data: favorites } = useFavorites();
  const { addMutation, removeMutation } = useToggleFavorite();

  const favorite = favorites?.find(f => f.activityId === id);
  const isFav = !!favorite;

  const handleToggle = () => {
    if (isFav && favorite) {
      removeMutation.mutate(favorite.id);
    } else if (id) {
      addMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="py-24 text-center">
        <p className="text-4xl mb-4">😕</p>
        <h3 className="text-xl font-semibold mb-4">Activity not found</h3>
        <Button onClick={() => navigate('/discover')}>Back to Discover</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Hero image */}
      <div className="relative rounded-2xl overflow-hidden h-72 mb-8 bg-muted">
        <img
          src={activity.image}
          alt={activity.name}
          className="w-full h-full object-cover"
          onError={e => {
            (e.target as HTMLImageElement).src = `https://placehold.co/800x400/e2e8f0/94a3b8?text=${encodeURIComponent(activity.name)}`;
          }}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="category">{activity.category}</Badge>
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-xs font-medium',
              difficultyColors[activity.difficulty] || 'bg-muted text-muted-foreground'
            )}
          >
            {activity.difficulty}
          </span>
        </div>
      </div>

      {/* Title + action */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">{activity.name}</h1>
        <Button
          onClick={handleToggle}
          disabled={addMutation.isPending || removeMutation.isPending}
          variant={isFav ? 'destructive' : 'default'}
          className="shrink-0"
        >
          <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
          {isFav ? 'Saved' : 'Save'}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <DollarSign size={16} /> Monthly cost
          </div>
          <p className="text-2xl font-bold text-primary">
            {activity.price === 0 ? 'Free' : `$${activity.price}/mo`}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Zap size={16} /> Difficulty
          </div>
          <p className="text-2xl font-bold">{activity.difficulty}</p>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        <h2 className="font-semibold text-lg mb-3">About this activity</h2>
        <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
      </div>

      {/* Equipment */}
      {activity.equipment && activity.equipment.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Package size={18} className="text-primary" />
            <h2 className="font-semibold text-lg">Recommended equipment</h2>
          </div>
          <ul className="space-y-2">
            {activity.equipment.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <Button
        size="xl"
        className="w-full"
        onClick={handleToggle}
        disabled={addMutation.isPending || removeMutation.isPending}
        variant={isFav ? 'outline' : 'default'}
      >
        <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
        {isFav ? 'Remove from favorites' : 'Add to favorites'}
      </Button>
    </div>
  );
}
