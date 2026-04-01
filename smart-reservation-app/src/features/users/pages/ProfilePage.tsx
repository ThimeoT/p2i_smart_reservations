import { useCurrentUser } from "../hooks/useCurrentUser"

export default function ProfilePage(){
  const { currentUser, loading, error } = useCurrentUser()

  if (loading) return <p>Chargement...</p>
  if (error)   return <p>Erreur</p>
  if (!currentUser) return null

  return(
    <>
    <h1>Profil</h1>
    <p>{currentUser.nom} {currentUser.prenom}</p>
    <p>{currentUser.mail}</p>

    </>
  )
}