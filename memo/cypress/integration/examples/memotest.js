///  <reference types="Cypress"/>


const NUMERO_CUADROS = 10

context('Memotest', () =>{
  before(() => {
    cy.visit('http://localhost:8080/index.html');
  });

  it('se asegura que haya tarjetas', () => {
    cy.get("#empezar").click();
    cy.get(".flip-card").should("have.length", NUMERO_CUADROS)


  });

  it('se asegura que los animales en las tarjetas sean random', () => {
   cy.get(".flip-card").then((animales) => {
   let secuenciaAnimales = []
   animales.each((i, animal) => { secuenciaAnimales.push(animal) });

    cy.get("#reset").click();
    cy.get("#empezar").click();

    let secuenciaAnimales2 = []
    cy.get(".flip-card").then((animalesNuevos) => {
       animalesNuevos.each((i, animalNuevo) => { secuenciaAnimales2.push(animalNuevo) })
       }); 
       cy.wrap(secuenciaAnimales).should('not.deep.equal', secuenciaAnimales2);
     }); 

    });

  describe("Resuelve el juego", () => {
    let mapaDePares, listaDePares;
    it("Elige una combinación erronea", () => {
      cy.get("#empezar").click();
      cy.get(".flip-card-inner").then((cartas) => {
        mapaDePares = obtenerParesDeCartas(cartas);
        
        listaDePares = Object.values(mapaDePares);
        
        listaDePares[0][0].click();
        cy.wait(2000)
        listaDePares[1][0].click();
        cy.get(".flip-card").find(".flip-card-inner").should("have.length", NUMERO_CUADROS);
        });
      });

    it("Finaliza el juego", () => {
    listaDePares.forEach((par) => {
      par[0].click();
      par[1].click();
    });
    cy.get(".flip-card").find(".oculto").should("have.length", 10)
    cy.get("#victoria").should("have.text", "GANASTE, FELICITACIONES!")
    }); 
  });
     
      
});

function obtenerParesDeCartas(cartas) {
  const pares = {};
  cartas.each((i, carta) => {
    const imagenCarta = cartas.find(`#imagen${i+1}`).attr('src')
    if (pares[imagenCarta]) {
      pares[imagenCarta].push(carta);
    } else {
       pares[imagenCarta] = [carta];
    }
  });
  
  return pares;
}
    
