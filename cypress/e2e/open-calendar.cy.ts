// cypress/e2e/googleCalendar.cy.ts

describe("Google Calendar Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("User signs in and sees the calendar", () => {
    cy.get("button").contains("Sign in with Google").click();

    cy.window().then((win) => {
      win.localStorage.setItem("accessToken", "fake_token");
    });

    cy.contains("Google Calendar").should("exist");

    // cy.get(".event-item").should("exist");
  });

  //   it("Can create a new event", () => {
  //     // باز کردن calendar modal
  //     cy.get("button").contains("Google Calendar").click();

  //     // Mock توکن
  //     cy.window().then((win) => {
  //       win.localStorage.setItem("accessToken", "fake_token");
  //     });

  //     // انتظار برای modal ایجاد event
  //     cy.get("button").contains("Create Event").click();

  //     // پر کردن فرم
  //     cy.get("input[name='summary']").type("Test Event");
  //     cy.get("textarea[name='description']").type("This is a test");
  //     cy.get("input[name='startTime']").type("10:00");
  //     cy.get("input[name='endTime']").type("11:00");

  //     // ارسال فرم
  //     cy.get("button").contains("Next").click();

  //     // انتظار برای نمایش modal تایید
  //     cy.contains("Confirm Event").should("exist");

  //     // تایید ایجاد event
  //     cy.get("button").contains("Confirm").click();

  //     // چک کردن اینکه event در لیست نمایش داده شد
  //     cy.get(".event-item").contains("Test Event").should("exist");
  //   });
});
