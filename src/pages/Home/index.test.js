import { fireEvent, render, screen, waitFor, } from "@testing-library/react";
import Home from "./index";


describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
      
    });
  });
});

// Test de vérification de l'affichage du contenu de la page. 

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    const eventsList = screen.getByTestId("events-list");
    expect(eventsList).toBeInTheDocument();
  })

  it("a list a people is displayed", () => {
    render(<Home />);
    const peopleList = screen.getByTestId("people-list");
    expect(peopleList).toBeInTheDocument();
  })

  it("a footer is displayed", () => {
    render(<Home />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  })

  it("an event card, with the last event, is displayed", () => {
    render(<Home />);
    const lastEvent = screen.getByTestId("last-event");
    expect(lastEvent).toBeInTheDocument();
  })
});

// Test de vérification des liens menus.


describe("When a user select a link in the menu", () => {
  it("can navigate to 'Nos Services' section", async ()=>{
    render(<Home />);
    const servicesSection = screen.getByTestId("link-nos-services");
    expect(servicesSection).toBeInTheDocument();

    fireEvent.click(servicesSection);
    const servicesTitle = screen.getByTestId("section-nos-services");
    
    expect(servicesTitle).toBeVisible();   
  })

  it("can navigate to 'Nos réalisations' section", ()=>{
    render(<Home />);
    const nosrealisations = screen.getByTestId("link-nos-realisations");
    expect(nosrealisations).toBeInTheDocument();
    
    fireEvent.click(nosrealisations);
    const realisationTitle = screen.getByTestId("section-nos-realisations");
    expect(realisationTitle).toBeVisible();
    
  })
 
  it("can navigate to 'Notre équipe' section", ()=>{
    render(<Home />);
    const notreEquipe = screen.getByTestId("link-notre-equipe");
    expect(notreEquipe).toBeInTheDocument();

    fireEvent.click(notreEquipe);
    const equipeTitle = screen.getByTestId("section-notre-equipe");
    expect(equipeTitle).toBeVisible();
  })

  it("can navigate to 'Contact' section", ()=>{
    render(<Home />);
    waitFor(()=>{
      const contact = screen.getByTestId("link-contact");
      expect(contact).toBeInTheDocument();

      fireEvent.click(contact);
      const contactTitle= screen.getByTestId("section-contact");
      expect(contactTitle).toBeVisible();
    })
  })
})
