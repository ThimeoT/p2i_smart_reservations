import { useRouteError } from "react-router";
import PageTitle from "../../shared/components/typography/PageTitle";


export default function RouteErrorPage(){
  const error =  useRouteError() as Error;
  return (
    <>
      <PageTitle title="Une erreur est survenue"/>
      <p>{error.message}</p>
    </>
  )
}