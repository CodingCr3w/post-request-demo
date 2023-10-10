import React from "react"

import useSignUpForm, {
  ACTIVITY_AREAS,
  COMMUNICATION_PREFERENCE,
} from "./hooks/useSignUpForm"
// 💡 Importer le hook useQuery

// Le type de la réponse attendue pour l'appel API à faire au moment
// du submit
type SignUpResponse = {
  message: string
}

function App() {
  const { state, update, validate } = useSignUpForm()
  const {
    name,
    email,
    password,
    activityArea,
    communicationPreference,
    hasAcceptedCgu,
    errors,
  } = state

  // 💡 Utiliser useQUery avec l'url "https://example-api.com/signup"
  //    pour récupérer execute, isLoading, et error

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const isValid = validate()
    if (isValid) {
      // 💡 Remplacer cet `alert` par un appel à `execute`
      // 💡 Envoyer les infos de l'utilisateur en tant que `data` dans les options
      // 💡 Utiliser le callback onSuccess pour afficher le message de la réponse dans un `alert()`
      alert("Form OK !")
    }
  }

  const nameId = React.useId()
  const emailId = React.useId()
  const passwordId = React.useId()
  const activityAreaId = React.useId()
  const hasAcceptedCguId = React.useId()

  return (
    <form
      aria-label="Formulaire d'inscription"
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <label htmlFor={nameId}>Nom et prénom</label>
        <input
          required
          id={nameId}
          value={name}
          placeholder="Jean Dupont"
          onChange={(event) => {
            update({ name: event.target.value })
          }}
          aria-invalid={!!errors.name}
        />
        {!!errors.name && <div className="form-error">{errors.name}</div>}
      </div>
      <div>
        <label htmlFor={emailId}>Adresse mail</label>
        <input
          required
          id={emailId}
          type="email"
          value={email}
          placeholder="jean.dupont@gmail.com"
          onChange={(event) => {
            update({ email: event.target.value })
          }}
          aria-invalid={!!errors.email}
        />
        {!!errors.email && <div className="form-error">{errors.email}</div>}
      </div>
      <div>
        <label htmlFor={passwordId}>Mot de passe</label>
        <input
          required
          id={passwordId}
          type="password"
          value={password}
          placeholder="Votre mot de passe sécurisé"
          onChange={(event) => {
            update({ password: event.target.value })
          }}
          aria-invalid={!!errors.password}
        />
        {!!errors.password && (
          <div className="form-error">{errors.password}</div>
        )}
      </div>
      <div>
        <label htmlFor={activityAreaId}>Secteur d'activité</label>
        <select
          id={activityAreaId}
          value={activityArea}
          onChange={(event) => update({ activityArea: event.target.value })}
        >
          {ACTIVITY_AREAS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <fieldset>
        <legend>Vous préférez être contactés par :</legend>
        {COMMUNICATION_PREFERENCE.map(({ value, label }) => (
          <div key={value}>
            <input
              type="radio"
              name="communication-preference"
              id={value}
              value={value}
              checked={communicationPreference === value}
              onChange={(event) =>
                update({ communicationPreference: event.target.value })
              }
            />
            <label htmlFor={value}>{label}</label>
          </div>
        ))}
      </fieldset>
      <div>
        <input
          required
          type="checkbox"
          id={hasAcceptedCguId}
          checked={hasAcceptedCgu}
          onChange={(event) => update({ hasAcceptedCgu: event.target.checked })}
          aria-invalid={!!errors.hasAcceptedCgu}
        />
        <label htmlFor={hasAcceptedCguId}>
          J'accepte les <a href="#">Condition Générales d'Utilisation</a>
        </label>
        {!!errors.hasAcceptedCgu && (
          <div className="form-error">{errors.hasAcceptedCgu}</div>
        )}
      </div>
      {/* 💡 Si isLoading est à true, alors ce bouton doit être disabled ! */}
      <button type="submit">Je m'enregistre</button>
      {/* 💡 Si une erreur est présente, l'afficher dans une */}
      {/*    div avec la classe "form-error" */}
    </form>
  )
}

export default App
