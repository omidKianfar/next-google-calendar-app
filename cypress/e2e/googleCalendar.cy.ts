// cypress/e2e/googleCalendar.cy.ts

describe("Google Calendar Flow", () => {
  beforeEach(() => {
    // همه intercept ها قبل از visit
    cy.intercept("GET", "**/calendar/v3/users/me/calendarList*").as("getCalendarList");
    cy.intercept("GET", "**/calendars/*/events*").as("getEvents");
    cy.intercept("POST", "**/calendars/*/events*").as("createEvent");

    // visit با token ست شده در localStorage
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("accessToken", "fake_token");
      },
    });

    // صبر برای درخواست ها
    cy.wait("@getCalendarList", { timeout: 10000 });
    cy.wait("@getEvents", { timeout: 10000 });
  });

  it("User sees the calendar after sign-in", () => {
    cy.contains("Google Calendar").should("exist");
  });

  it("Can open CreateEvent modal and fill the form", () => {
    cy.get("button").contains("Google Calendar").click();

    cy.get("button").contains("Create Event").click();

    cy.get("input[name='summary']").type("Test Event");
    cy.get("textarea[name='description']").type("This is a test");
    cy.get("input[name='startTime']").type("10:00");
    cy.get("input[name='endTime']").type("11:00");

    cy.get("button").contains("Next").click();

    cy.contains("Confirm Event").should("exist");

    cy.get("button").contains("Confirm").click();

    // صبر برای POST request
    cy.wait("@createEvent", { timeout: 10000 });

    // چک کردن اینکه event تو لیست ظاهر شده
    cy.get(".event-item").contains("Test Event").should("exist");
  });
});
