import React from "react"

import { client, ClientOptions } from "../api/client"

// On réutilise les options du client pour définir celles d'execute
// et on ajoute le callback `onSuccess`
type ExecuteOptions<T> = ClientOptions & {
  onSuccess?: (data: T) => void
}

export default function useQuery<T = object>(
  url: string,
  shouldFetchOnRender: boolean = false
) {
  const [data, setData] = React.useState<T | null>(null)
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  // Initialisation de l'identifiant de requête courante
  const currentRequestRef = React.useRef(0)

  // Callback pour déclencher le fetch sur commande
  const execute = React.useCallback(
    // On passe le générique T au type des options afin que `data` soit typé de la même manière
    ({ onSuccess, ...options }: ExecuteOptions<T> = {}) => {
      // Met à jour la ref pour garder l'identifiant de la requête en cours
      currentRequestRef.current++
      const thisRequestNumber = currentRequestRef.current

      // Initialise les states de chargement et d'erreur
      setIsLoading(true)
      setError(null)

      // Déclenche le fetch
      client(url, options)
        .then((data) => {
          if (currentRequestRef.current === thisRequestNumber) {
            setData(data)
            setIsLoading(false)
            // Appelle onSuccess si il existe, avec data
            onSuccess?.(data)
          }
        })
        .catch((error) => {
          if (currentRequestRef.current === thisRequestNumber) {
            setError(error.message)
            setIsLoading(false)
          }
        })
    },
    [url]
  )

  // Déclenche le fetch automatiquement si besoin
  React.useEffect(() => {
    if (shouldFetchOnRender) {
      execute()
    }
  }, [execute, shouldFetchOnRender])

  return { execute, data, isLoading, error }
}
