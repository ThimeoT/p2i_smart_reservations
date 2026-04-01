import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { getUserByIdApi } from "../api/user.api";
import type { User } from "../types/user.types";

export function useCurrentUser(){
  const {user} = useAuth()
  const [currentUser, setCurrentUser] = useState< User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(()=>{
    if(!user?.id) return

    setLoading(true)
    getUserByIdApi(user.id)
    .then(setCurrentUser)
    .catch(setError)
    .finally(()=>setLoading(false))
  }, [user?.id])

  return {currentUser, loading, error}
}