import { useRouteError } from "react-router";


export default function RouteErrorPage(){
  const error =  useRouteError() as Error;
  return (
    <>
      <h1>Une erreur est survenue</h1>
      <p>{error.message}</p>
    </>
  )
}