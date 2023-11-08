import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

/**
 * @function mockContactApi - Retourne une promesse qui se résout avec succés après 900ms.
 * Permet de simuler une récupération de données depuis un serveur. 
 */
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 900); })


/**
 * @function Form - Créer un formulaire. 
 * @param({onSuccess, onError}) - fonctions appelés en cas de succès ou d'erreur  
 */
const Form = ({ onSuccess, onError }) => {

  /**
    * @variable sending - Variable d'état initié à fasle. 
    * Permet de suivre si le formulaire est en cours d'envoie. 
    */
  const [sending, setSending] = useState(false);

  /**
    * @variable sendContact - Reçoit pour valeur le résultat de l'appel à la fonction useCallback. 
    * Lorsque l'on appelle sendContact la fonction useCallback sera executé. 
    * 
    * @fonction useCallback - 2 arguments (onSuccess, onError)
    */
  const sendContact = useCallback(
    // fonction fléché anonyme et asynchrome
    async (evt) => {
      evt.preventDefault();
      // Formulaire en cours d'envoie
      setSending(true);
      // We try to call mockContactApi. 
      // Gère les erreurs potentielles
      try {
        await mockContactApi();
        onSuccess();
        setSending(false);  
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    // Liste de dépendance : détermine quand la fonction doit être réexécutée
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact} data-testid="form-empty">
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" required/>
          <Field placeholder="" label="Prénom" required/>
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" type={FIELD_TYPES.EMAIL} required />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending} >
            {sending ? "En cours" : "Envoyer" }
            
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            required    
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
