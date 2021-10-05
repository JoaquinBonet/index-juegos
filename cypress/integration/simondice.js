/// <reference types="cypress"/>


const NUMERO_CUADROS = 6;
let secuenciaCuadros = []

context('SimonDic', () => {
    before(() => {
        cy.visit('http://localhost:8080/simonDic/index.html')
    })

    it('se asegura que comienza el juego', () => {
        cy.clock()
        cy.get("#empezar").click()
        cy.tick(1000)
        cy.get(".cuadro").should(("have.length"), NUMERO_CUADROS);
        cy.get("#ronda").should(("have.text"), "Ronda # 1");
        cy.get('.cuadro[style*="opacity: 1"]').should("have.css", "opacity", "1")
        secuenciaCuadros.push(cy.get('.cuadro[style*="opacity: 1"]'));
        cy.get("#simon").should("have.text", "Atención!")
        cy.clock()
        cy.tick(1000)

    });

    it('pierde el juego', () => {
        cy.get("#cuadro-1").click()
        secuenciaCuadros.push(cy.get("#cuadro-1"))
        if (secuenciaCuadros[0] === secuenciaCuadros[1]) {
            cy.get("#cuadro-1").click()
            cy.get("#cuadro-2").click()
        }
        cy.get("#derrota").should("have.text", "Perdiste!")


    })

    it('reinicia el juego y lo gana', () => {
        //secuenciaCuadros = []
        cy.get("#reset").click()
        cy.get("#tablero").should("have.class", "oculto")
        cy.get("#empezar").click()
        cy.clock()
        cy.tick(1000)
        let cuad = cy.get('.cuadro[style*="opacity: 1"]');
        console.log(document.querySelector("#cuadro-1"))
        cuad.should("have.css", "opacity", "1")
        secuenciaCuadros.push(cuad)
        cy.tick(1000);
        secuenciaCuadros[0].click()
        

        /*let genArr = Array.from({ length: NUMERO_CUADROS }, (v, k) => k + 1)
        cy.wrap(genArr).each((i) => {
            let cuad = cy.get('.cuadro[style*="opacity: 1"]');
            cy.get('.cuadro[style*="opacity: 1"]').should("have.css", "opacity", "1")
            secuenciaCuadros.push(cuad)
            cy.tick(2000);
            cy.get(".tocado").click();
            cy.tick(2000);
        })
        */






    })

 

});






