import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./styles/reset.css"
import "./styles/styles.css"

import App from "./App"

// Remplace le window.fetch pour répondre à la fausse API
const originalFetch = window.fetch
window.fetch = async (url, options) => {
  // Remplace uniquemnet pour les requêtes à example-api.com
  if (
    options?.method === "POST" &&
    url.toString().includes("example-api.com")
  ) {
    // Simule un temps de traitement de 2 secondes
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // Récupère le nom dans le corps de la requête
    const name = JSON.parse(options?.body?.toString() || "")?.name
    // 💡 Décommente la ligne ci-dessous pour simuler une erreur avec la requête !
    // throw new Error("Une erreur est survenue")
    // Retourne une fausse réponse pour cette requête
    return new Response(
      JSON.stringify({
        message: `Welcome, ${name} !`,
      })
    )
  }

  // Sinon, utilise le fetch original
  return originalFetch(url, options)
}

const rootElement = document.getElementById("root")
const root = createRoot(rootElement!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
