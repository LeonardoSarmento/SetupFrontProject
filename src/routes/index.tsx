import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function ListComponent({ title, description, link }: { title: string; description: string; link?: string }) {
  return (
    <Link to={link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Link>
  );
}

function IndexComponent() {
  return (
    <div className="flex top-20 relative items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Hello from Leonardo Sarmento!</CardTitle>
          <CardDescription>
            Uma configuração inicial utilizando algumas bibliotecas que acredito importante para um funcionamento bom e
            tranquilo de uma aplicação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ListComponent title="Framework" description="Vite.js com Typescript" link="https://vitejs.dev/guide/" />
          <ListComponent
            title="Roteamento"
            description="Tanstack Router"
            link="https://tanstack.com/router/latest/docs/framework/react/quick-start"
          />
          <ListComponent
            title="Gerenciamento de estados"
            description="Tanstack Query"
            link="https://tanstack.com/query/latest/docs/framework/react/quick-start"
          />
          <ListComponent
            title="Formulário"
            description="React Hook Form"
            link="https://www.react-hook-form.com/get-started/"
          />
          <ListComponent title="Validação" description="Zod" link="https://zod.dev/?id=basic-usage" />
          <ListComponent title="Componentes" description="Shadcn/ui" link="https://ui.shadcn.com/docs/installation" />
          <ListComponent title="Toast" description="Sonner" link="https://sonner.emilkowal.ski/" />
          <ListComponent title="Requisição HTTP" description="Axios" link="https://axios-http.com/docs/intro" />
          <ListComponent
            title="DevTools"
            description="Tanstack Router e Query"
            link="https://tanstack.com/query/latest/docs/framework/react/devtools"
          />
        </CardContent>
        <CardFooter className='justify-center'>
          <CardDescription>Espero que você tenha um ótimo desenvolvimento</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
