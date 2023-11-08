import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";


import "./_slider.scss";

/**
 * Composant Slider 
 */
function Slider(){

  /**
   * @useData hook pour accéder aux données dans DataContext
   */
  const { data } = useData();

  /**
   * @variable index - variable d'état ayant pour valeur initial 0 
   * @function setIndex - met à jour l'état de la variable. 
   */
   const [index, setIndex] = useState(0);


  /**
   * @variable byDateDesc - Trie les évenements par date décroissante
   * data?.focus : si data est null ou indefined byDateDesc = undefined
   * 
   * .sort((evtA, evtB) = méthode de trie suivant la date 
   * 
   * new Date(evtA.date) < new Date(evtB.date) ? -1 : 1 = Compare les 2 events,
   * en convertissant les propriétés .date au JavaScript Date
   * Si evtA.date est avant = return -1 sinon 1 pour l'ordre d'affichage
   */
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  /**
   * @function nextCard - Appelle la fonction setTimeout()
   * 
   * Change la valeur de la variable d'état index après 5s
   * byDateDesc is equal to 3 since 3 object in .focus but need to be -1 to stop at the right time.
   */
  const nextCard = () => {
    setTimeout(() => {
      if (byDateDesc && byDateDesc.length > 0) {
        setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
      }
    }, 5000);
  };
   

  /**
   * @useEffect = hook 
   * Appelle la fonction nextCard dés que la page charge.
   */
  useEffect(() => {
    nextCard();
  });
   
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((focus, idx) => {
        const isDisplayed = index === idx;
         return (
          <div
            key={focus.title}
            className={`SlideCard SlideCard--${isDisplayed ? "display" : "hide"}`}
          >
            <img src={focus.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{focus.title}</h3>
                <p>{focus.description}</p>
                <div>{getMonth(new Date(focus.date))}</div>
              </div>
            </div>
          </div>
         );
      })}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((focus, radioIdx) => (
            <input
              key={focus.date}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default Slider;
 