import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./_events.scss";



function EventList() {

  /**
   * @variable PER_PAGE - détermine le nombre d'évent visible par page
   */
  const PER_PAGE = 9;

  /**
   * @useData hook pour accéder aux données dans DataContext
   */
  const { data, error } = useData();

  /**
   * @variable type - variable d'état ayant pour valeur initial "undefined"
   * @function setType - met à jour l'état de la variable. 
   */
  const [type, setType] = useState();

  /**
   * @variable currentPage - variable d'état ayant pour valeur initial "1"
   * @function setCurrentPage - met à jour l'état de la variable. 
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * @variable filteredEvents - Filtre les événements en fonction de la valeur type.  
   * Si data est null ou undefined alors un tableau vide est utilisé. 
   */
  const filteredEvents = (data?.events || []).filter((event) => {
    // Si !type est falsy ( type est initier dans un useState avec aucune valeur)
    if (!type) {
      // Inclu tout les évenements 
      return true;
    }
      // Inclue les évenements catégorisé par la propriété type
      return event.type === type; 
    }
  );
  
  /**
   * @variable sortedEvents  - Trie le tableau FilteredEvents selon la date. 
   * 
   * Créer une copie du tableau avec ... 
   * méthode .sort en comparaison avec 2 éléments
   * Du plus récent au plus ancien. 
   */
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (a.date > b.date) {
      return -1;
    }
    return 0; 
  });
  
  /**
   * @variable typeList - Génere une liste de type d'évenement unique
   */
  const typeList = Array.from(new Set(data?.events.map((event) => event.type)));

  /**
  * @function changeType - Met à jour la variable d'état type
  * @param {string|null} evtType 
  */
  const changeType = (evtType) => {
    // Met à jour la variable type. 
    setType(evtType);
    // Initialise la page à 1 
    setCurrentPage(1); 
  };

  /**
  * @variable pageNumber - Calcule le nombre de page necessaire
  */
  const pageNumber = Math.ceil(sortedEvents.length / PER_PAGE);

  /**
  * @variable startIndex - Calcule l'indice de départ des événements 
  */
   const startIndex = (currentPage - 1) * PER_PAGE;

  /**
   * @variable endIndex - indique l'index de fin exclusif
   */
  const endIndex = Math.min(startIndex + PER_PAGE, sortedEvents.length);

  /**
  * @variable eventsToDisplay - Détermine les éléments à afficher
  * startIndex est inclusive 
  * endIndex est exclusive 
  */
  const eventsToDisplay = sortedEvents.slice(startIndex, endIndex);
  
  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={changeType}
            includeDefaultOption
          />
          <div id="events" className="ListContainer">
            {eventsToDisplay.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n}
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
}
export default EventList;
