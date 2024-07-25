import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/users/$id')({
  component: UserComponent,
});

function UserComponent() {
  const { id } = Route.useParams();
  return (
    <div className="m-4 flex flex-col gap-4 p-5">
      <div>Hello /_auth/users/{id}!</div>
      <Link to="/users">Voltar para listagem de usuários</Link>
    </div>
  );
}
