import { useRouteError } from 'react-router';
import TitrePage from '../../shared/components/typography/TitrePage';

export default function RouteErrorPage() {
  const error = useRouteError() as Error;
  return (
    <>
      <TitrePage titre="Une erreur est survenue" />
      <p>{error.message}</p>
    </>
  );
}
