// describe("Create Event Modal", () => {
//   beforeEach(() => {
//     cy.visit("/");
//   });

//   it("Renders form fields", () => {
//     cy.get("button").contains("Create").click();

//     cy.get("input[name='summary']").should("exist");
//     cy.get("textarea[name='description']").should("exist");
//     cy.get("input[name='startTime']").should("exist");
//     cy.get("input[name='endTime']").should("exist");
//     cy.get("button").contains("Next").should("exist");
//   });

//   it("Submits form correctly", () => {
//     cy.get("button").contains("Create").click();

//     cy.get("input[name='summary']").type("Test Event");
//     cy.get("textarea[name='description']").type("This is a test");
//     cy.get("input[name='startTime']").type("10:00");
//     cy.get("input[name='endTime']").type("11:00");

//     cy.get("button").contains("Next").click();

//     cy.contains("Create Event").should("exist");
//   });
// });
