import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import type { AuthResponse } from '@/types';

const schema = z
  .object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: ({ email, password }: FormValues) => authApi.register(email, password),
    onSuccess: res => {
      const data: AuthResponse = res.data;
      setAuth(data.user, data.token);
      toast('Account created! Welcome to BudgetHobby 🎉', 'success');
      navigate('/onboarding');
    },
    onError: (err: { response?: { data?: { error?: string } } }) => {
      const msg = err?.response?.data?.error || 'Registration failed';
      setError('root', { message: msg });
      toast(msg, 'error');
    },
  });

  return (
    <form onSubmit={handleSubmit(data => mutation.mutate(data))} className="space-y-4">
      <Input
        id="email"
        type="email"
        label="Email address"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        id="confirmPassword"
        type="password"
        label="Confirm password"
        placeholder="Repeat your password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      {errors.root && (
        <div className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errors.root.message}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating account...' : 'Create Account'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
