import React from "react"

import { isValidEmail } from "../helpers/forms"

export const ACTIVITY_AREAS = [
  { value: "it", label: "Informatique" },
  { value: "finance", label: "Finance" },
  { value: "marketing", label: "Marketing" },
  { value: "healthcare", label: "Santé" },
  { value: "construction", label: "Construction" },
  { value: "legal", label: "Juridique" },
  { value: "education", label: "Éducation" },
  { value: "art_design", label: "Art et Design" },
  { value: "personal_care", label: "Service à la personne" },
  { value: "commerce", label: "Commerce" },
  { value: "others", label: "Autres" },
]

export const COMMUNICATION_PREFERENCE = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Téléphone" },
]

const MIN_PASSWORD_LENGTH = 12

type FormState = {
  name: string
  email: string
  password: string
  activityArea: string
  communicationPreference: string
  hasAcceptedCgu: boolean
  errors: {
    name?: string
    email?: string
    password?: string
    hasAcceptedCgu?: string
  }
}

export default function useSignUpForm() {
  const [state, setState] = React.useState<FormState>({
    name: "",
    email: "",
    password: "",
    activityArea: ACTIVITY_AREAS[0].value,
    communicationPreference: COMMUNICATION_PREFERENCE[0].value,
    hasAcceptedCgu: false,
    errors: {},
  })
  const { name, email, password, hasAcceptedCgu } = state

  function update(newState: Partial<FormState>) {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }))
  }

  function setErrors(newErrors: Partial<FormState["errors"]>) {
    setState((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        ...newErrors,
      },
    }))
  }

  function validate() {
    // Réinitialise l'erreur d'une éventuelle soumission précédente
    update({ errors: {} })
    // Si il manque l'un de ces champs, affiche une erreur appropriée
    if (!name) {
      setErrors({ name: "Veuillez renseigner votre nom" })
      return false
    }
    if (!email || !isValidEmail(email)) {
      setErrors({ email: "Veuillez renseigner une adresse mail valide" })
      return false
    }
    if (!password) {
      setErrors({ password: "Veuillez renseigner un mot de passe" })
      return false
    }
    // Mot de passe trop court
    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrors({
        password: `Le mot de passe doit contenir au minimum ${MIN_PASSWORD_LENGTH} caractères`,
      })
      return false
    }
    if (!hasAcceptedCgu) {
      setErrors({
        hasAcceptedCgu: "Vous devez accepter les CGU pour vous inscrire",
      })
      return false
    }
    return true
  }

  return {
    state,
    update,
    setErrors,
    validate,
  }
}
