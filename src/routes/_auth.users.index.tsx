import { Button } from '@components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostByUserId } from '@services/hooks/postsByUser';
import { FilterSchema, FilterType } from '@services/types/Filters';
import { createFileRoute, Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

const USERS: { id: string; name: string }[] = [
  { id: '1', name: 'Allberson' },
  { id: '2', name: 'Caio' },
  { id: '3', name: 'David' },
  { id: '4', name: 'George' },
  { id: '5', name: 'Jeni' },
  { id: '6', name: 'Jesus' },
  { id: '7', name: 'Juca' },
  { id: '8', name: 'Lahra' },
  { id: '9', name: 'Leo' },
  { id: '10', name: 'Alecrim' },
  { id: '11', name: 'Matheus' },
  { id: '12', name: 'Natan' },
  { id: '13', name: 'Paulo' },
  { id: '14', name: 'Pedro' },
  { id: '15', name: 'Renato' },
  { id: '16', name: 'Vitor' },
];

export const Route = createFileRoute('/_auth/users/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: ({ context: { queryClient }, deps: filters }) => queryClient.ensureQueryData(PostByUserId(filters)),
  validateSearch: FilterSchema,
  component: UsersComponent,
  errorComponent: () => <div className="flex items-center justify-center">Error component</div>,
  pendingComponent: () => <div className="flex items-center justify-center">...loading</div>,
});

function UsersComponent() {
  const posts = Route.useLoaderData();
  const filters = useSearch({
    from: '/_auth/users/',
  });
  const form = useForm<FilterType>({
    resolver: zodResolver(FilterSchema),
    defaultValues: filters,
  });

  function NavigateComponent({ user }: { user: string }) {
    return (
      <Link to="/users/$id" params={{ id: user }}>
        Ir para user: {user}
      </Link>
    );
  }
  const navigate = useNavigate();

  function onSubmit(data: FilterType) {
    console.log('data: ', data);
    navigate({
      to: '/users',
      search: {
        userId: data.userId,
      },
    });
  }
  function ResetFilter() {
    form.setValue('userId', ''), navigate({ to: '/users' });
  }
  return (
    <div className="m-4 flex gap-4 p-6">
      <div className="flex flex-col">
        <div>Hello /_auth/users!</div>
        {USERS.map((user) => (
          <NavigateComponent key={user.id} user={user.name} />
        ))}
      </div>
      <div className="flex flex-col">
        <div className="m-3 flex flex-col items-center gap-4">
          <div>Posts do usuário!</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-2/3 flex-col space-y-6">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-center">Usuário</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        form.setValue('userId', value);
                        navigate({ to: '/users', search: { userId: value } });
                      }}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um usuário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {USERS.map((user) => (
                          <SelectItem value={user.id} key={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Você consegue ver os posts do usuário que você selecionar através do filtro gerenciado pela URL.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {filters.userId ? (
                <Button variant="destructive" onClick={ResetFilter} type="button">
                  Reset Filter
                </Button>
              ) : null}
            </form>
          </Form>
        </div>
        <div>
          {posts.type === 'success' ? (
            posts.data.length ? (
              posts.data.map((post) => (
                <div key={post.id} className="my-2 flex flex-col gap-2 rounded border p-2">
                  <div className='border-b-2'>Post número: {post.id}</div>

                  <div>{post.title}</div>
                  <div>{post.body}</div>
                </div>
              ))
            ) : (
              <div>Não existem items vinculados a essa pessoa</div>
            )
          ) : (
            <div className="flex flex-col gap-2">
              <div>{posts.data.title}</div>
              <div>{posts.data.body}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
