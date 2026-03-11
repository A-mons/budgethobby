import { Link } from 'react-router-dom';
import { Compass, DollarSign, Heart, Zap, Users, BookOpen, Leaf, Music, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const features = [
  { icon: DollarSign, title: 'Budget-Aware', desc: 'Set your monthly budget and discover hobbies that fit perfectly.' },
  { icon: Heart, title: 'Curated Favorites', desc: 'Save activities you love and build your personal hobby collection.' },
  { icon: Compass, title: 'Smart Discovery', desc: 'Filter by category, difficulty, and price to find your perfect match.' },
  { icon: Zap, title: 'Instant Setup', desc: 'Personalized onboarding in 3 quick steps — be discovering in minutes.' },
];

const hobbies = [
  { name: 'Running', cost: 'Free', category: 'Sport', emoji: '🏃' },
  { name: 'Drawing', cost: '$15/mo', category: 'Creative', emoji: '✏️' },
  { name: 'Yoga', cost: '$50/mo', category: 'Sport', emoji: '🧘' },
  { name: 'Photography', cost: '$80/mo', category: 'Creative', emoji: '📷' },
  { name: 'Cooking', cost: '$60/mo', category: 'Creative', emoji: '🍳' },
  { name: 'Gardening', cost: '$30/mo', category: 'Nature', emoji: '🌱' },
];

const steps = [
  { n: '01', title: 'Set Your Budget', desc: 'Tell us how much you want to spend monthly.' },
  { n: '02', title: 'Pick Interests', desc: 'Choose categories that spark your curiosity.' },
  { n: '03', title: 'Start Exploring', desc: 'Browse personalized activity recommendations.' },
];

const categoryIcons = [
  { icon: Users, label: 'Social' },
  { icon: BookOpen, label: 'Learning' },
  { icon: Leaf, label: 'Nature' },
  { icon: Music, label: 'Creative' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
              <Compass size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg">BudgetHobby</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <Badge variant="category" className="mb-6 inline-flex">
          ✨ Find your next favorite hobby
        </Badge>
        <h1 className="mx-auto max-w-3xl text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
          Discover hobbies that{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            match your budget
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          BudgetHobby helps you explore hundreds of activities tailored to your monthly budget and
          interests. No more guesswork — just fun.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link to="/register">
            <Button size="xl">
              Start Exploring <ChevronRight size={18} />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="xl">
              Sign in
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Free to use · No credit card required</p>
      </section>

      {/* Hobby chips */}
      <section className="border-y border-border bg-muted/30 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {hobbies.map(h => (
              <div
                key={h.name}
                className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-sm"
              >
                <span className="text-xl">{h.emoji}</span>
                <div>
                  <p className="text-sm font-semibold">{h.name}</p>
                  <p className="text-xs text-muted-foreground">{h.cost}</p>
                </div>
                <Badge variant="category" className="ml-1">{h.category}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Everything you need to find your hobby</h2>
          <p className="mt-4 text-muted-foreground">Built for curious minds on any budget.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Icon size={22} className="text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/30 border-y border-border py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">How it works</h2>
            <p className="mt-4 text-muted-foreground">Three steps to your next adventure.</p>
          </div>
          <div className="mx-auto max-w-3xl space-y-6">
            {steps.map(({ n, title, desc }) => (
              <div
                key={n}
                className="flex items-start gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white font-bold">
                  {n}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{title}</h3>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold md:text-4xl mb-4">Explore by category</h2>
        <p className="text-muted-foreground mb-12">From outdoor adventures to creative pursuits.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {categoryIcons.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 w-28 shadow-sm hover:border-primary/50 hover:bg-accent transition-all cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Icon size={20} className="text-primary" />
              </div>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24 text-center">
        <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-primary to-secondary p-12 text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to find your next hobby?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Join thousands of people discovering new passions every day.
          </p>
          <Link to="/register">
            <Button size="xl" className="bg-white text-primary hover:bg-white/90">
              Start Exploring — It's Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 BudgetHobby · Made with ❤️ for curious minds
        </div>
      </footer>
    </div>
  );
}
