import * as React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { LoginSchema, LoginType } from '@services/types/Login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@services/hooks/auth';
import { getRandomNumberWithDecimals } from '@services/utils/utils';
import { useRouter } from '@tanstack/react-router';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { toast } from 'sonner';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const auth = useAuth();
  const router = useRouter();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit((values) => {
    if (values.username !== import.meta.env.VITE_USER_USERNAME && values.password !== import.meta.env.VITE_USER_CODE) {
      toast.error('Você mentiu pra mim cara :(', {
        description: 'Aumenta o limite do seu cartão de crédito ai só pra garantir',
      });
      return;
    }
    auth.login(values, 'skajdksjakdj').then(() => router.invalidate());
    toast.success(`Compra de R$ ${getRandomNumberWithDecimals()} aprovada com sucesso!`, {
      description: `Por favor ${values.username}, não verifique com seu banco :)`,
    });
  });

  return (
    <div className={'grid gap-6'} {...props}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diz seu nome ai amigo</FormLabel>
                    <FormControl>
                      <Input placeholder="Põe ele aqui" {...field} />
                    </FormControl>
                    <FormDescription>Só pra testar um negócinho aqui rapidinho</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Senha" type="password" {...field} />
                    </FormControl>
                    <FormDescription>#Confia</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Acessar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
