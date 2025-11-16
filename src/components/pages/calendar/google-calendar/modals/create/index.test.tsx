import { render, screen, fireEvent } from "@testing-library/react";
import CreateEventModal from "./index";

const Wrapper = () => {
  const mockOnCreate = jest.fn();
  const mockOnClose = jest.fn();
  const selectedDate = "2025-11-15";

  return (
    <CreateEventModal
      selectedDate={selectedDate}
      onCreate={mockOnCreate}
      onClose={mockOnClose}
    />
  );
};

describe("CreateEventModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields", () => {
    render(<Wrapper />);

    const textInput = screen.getByLabelText(/Title/i) as HTMLInputElement;

    const teaxtarea = screen.getByLabelText(/Description/i) as HTMLInputElement;

    const timeInputStart = screen.getByLabelText(
      /Start Time/i
    ) as HTMLInputElement;

    const timeInputEnd = screen.getByLabelText(/End Time/i) as HTMLInputElement;

    const button = screen.getByRole("button", { name: /Next/i });

    expect(textInput).toBeInTheDocument();
    expect(teaxtarea).toBeInTheDocument();
    expect(timeInputStart).toBeInTheDocument();
    expect(timeInputEnd).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("submitting form shows SureCreateModal", async () => {
    render(<Wrapper />);

    const textInput = screen.getByLabelText(/Title/i) as HTMLInputElement;

    const teaxtarea = screen.getByLabelText(/Description/i) as HTMLInputElement;

    const timeInputStart = screen.getByLabelText(
      /Start Time/i
    ) as HTMLInputElement;

    const timeInputEnd = screen.getByLabelText(/End Time/i) as HTMLInputElement;

    const button = screen.getByRole("button", { name: /Next/i }) as HTMLButtonElement;

    const ModalTitle = await screen.findByText(/Create Event/i);

    expect(ModalTitle).toBeInTheDocument();

    fireEvent.change(textInput, {
      target: { value: "Test Event" },
    });

    fireEvent.change(teaxtarea, {
      target: { value: "This is a test" },
    });

    fireEvent.change(timeInputStart, {
      target: { value: "10:00" },
    });

    fireEvent.change(timeInputEnd, {
      target: { value: "11:00" },
    });

    fireEvent.click(button);
  });
});
