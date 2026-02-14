import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { useFavorites, useToggleFavorite } from '@/hooks/useFavorites';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';

export default function FavoritesPage() {
  const { data: favorites, isLoading } = useFavorites();
  const { removeMutation } = useToggleFavorite();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
        <p className="text-muted-foreground">
          {favorites?.length ?? 0} saved {favorites?.length === 1 ? 'activity' : 'activities'}
        </p>
      </div>

      {(!favorites || favorites.length === 0) && (
        <div className="py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted mx-auto mb-6">
            <Heart size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-8">
            Start exploring and save activities you'd like to try.
          </p>
          <Link to="/discover">
            <Button size="lg">Discover activities</Button>
          </Link>
        </div>
      )}

      {favorites && favorites.length > 0 && (
        <div className="space-y-4">
          {favorites.map(fav => (
            <div
              key={fav.id}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary/30 transition-colors"
            >
              {/* Image */}
              <Link to={`/activities/${fav.activityId}`} className="shrink-0">
                <div className="h-16 w-16 rounded-xl overflow-hidden bg-muted">
                  <img
                    src={fav.activity.image}
                    alt={fav.activity.name}
                    className="w-full h-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/64x64/e2e8f0/94a3b8?text=${encodeURIComponent(fav.activity.name[0])}`;
                    }}
                  />
                </div>
              </Link>

              {/* Info */}
              <Link to={`/activities/${fav.activityId}`} className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{fav.activity.name}</h3>
                  <Badge variant="category" className="shrink-0">{fav.activity.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1 mb-1">
                  {fav.activity.description}
                </p>
                <span className="text-sm font-semibold text-primary">
                  {fav.activity.price === 0 ? 'Free' : `$${fav.activity.price}/mo`}
                </span>
              </Link>

              {/* Remove */}
              <button
                onClick={() => removeMutation.mutate(fav.id)}
                disabled={removeMutation.isPending}
                className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

