import { render, screen, fireEvent, act } from "@testing-library/react";
import EditBody from "./index";

const mockEvent = {
  id: "1",
  summary: "Test Event",
  description: "Test Description",
  start: { dateTime: "2025-11-15T10:00:00Z" },
  end: { dateTime: "2025-11-15T11:00:00Z" },
};

describe("EditBody", () => {
  let setIsEditing: jest.Mock;
  let setEventId: jest.Mock;
  let setNewEvent: jest.Mock;
  let setSureModal: jest.Mock;

  beforeEach(() => {
    setIsEditing = jest.fn();
    setEventId = jest.fn();
    setNewEvent = jest.fn();
    setSureModal = jest.fn();

    render(
      <EditBody
        event={mockEvent}
        setIsEditing={setIsEditing}
        setEventId={setEventId}
        setNewEvent={setNewEvent}
        setSureModal={setSureModal}
      />
    );
  });

  test("renders form fields and buttons", () => {
    const textInput = screen.getByLabelText(/Title/i) as HTMLInputElement;

    const teaxtarea = screen.getByLabelText(/Description/i) as HTMLInputElement;

    const timeInputStart = screen.getByLabelText(
      /Start Time/i
    ) as HTMLInputElement;

    const timeInputEnd = screen.getByLabelText(/End Time/i) as HTMLInputElement;

    const backbutton = screen.getByRole("button", {
      name: /Back/i,
    }) as HTMLButtonElement;

    const nextbutton = screen.getByRole("button", {
      name: /Next/i,
    }) as HTMLButtonElement;

    expect(textInput).toBeInTheDocument();
    expect(teaxtarea).toBeInTheDocument();
    expect(timeInputStart).toBeInTheDocument();
    expect(timeInputEnd).toBeInTheDocument();
    expect(backbutton).toBeInTheDocument();
    expect(nextbutton).toBeInTheDocument();
  });

  test("submits form correctly", async () => {
    const textInput = screen.getByLabelText(/Title/i) as HTMLInputElement;

    const teaxtarea = screen.getByLabelText(/Description/i) as HTMLInputElement;

    const timeInputStart = screen.getByLabelText(
      /Start Time/i
    ) as HTMLInputElement;

    const timeInputEnd = screen.getByLabelText(/End Time/i) as HTMLInputElement;

    const nextbutton = screen.getByRole("button", {
      name: /Next/i,
    }) as HTMLButtonElement;

    await act(async () => {
      fireEvent.change(textInput, {
        target: { value: "Updated Event" },
      });
      fireEvent.change(teaxtarea, {
        target: { value: "Updated Description" },
      });
      fireEvent.change(timeInputStart, {
        target: { value: "12:00" },
      });
      fireEvent.change(timeInputEnd, {
        target: { value: "13:00" },
      });

      fireEvent.click(nextbutton);
    });

    expect(setNewEvent).toHaveBeenCalled();
    
    expect(setSureModal).toHaveBeenCalledWith(true);
  });
});
