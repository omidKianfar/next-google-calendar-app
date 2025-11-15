import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TimeInputField from "./time-input-field";
import { fireEvent, render, screen } from "@testing-library/react";

const Wrapper = ({ withError = false }) => {
  const methods = useForm({
    defaultValues: { time: "10:30" },
  });

  useEffect(() => {
    if (withError) {
      methods.setError("time", {
        type: "manual",
        message: "Invalid time",
      });
    }
  }, [withError, methods]);

  return (
    <FormProvider {...methods}>
      <TimeInputField name="time" label="Time" />
    </FormProvider>
  );
};

describe("TimeInput Component", () => {
  test("Render time input and label correctly", () => {
    render(<Wrapper />);

    const timeInput = screen.getByLabelText("Time") as HTMLInputElement;

    expect(timeInput).toBeInTheDocument();
  });

  test("Shows default value", () => {
    render(<Wrapper />);

    const timeInput = screen.getByLabelText("Time") as HTMLInputElement;

    expect(timeInput.value).toBe("10:30");
  });

  test("Allows user to change time", () => {
    render(<Wrapper />);

    const timeInput = screen.getByLabelText("Time") as HTMLInputElement;

    fireEvent.change(timeInput, {
      target: {
        value: "12:45",
      },
    });

    expect(timeInput.value).toBe("12:45");
  });

  test("Show error", () => {
    render(<Wrapper withError />);

    const timeInput = screen.getByText("Invalid time") as HTMLInputElement;

    expect(timeInput).toBeInTheDocument();
  });
});
