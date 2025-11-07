"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarEventInput, CreateEventProps, FormValues } from "../type";
import { useMemo } from "react";
import TimeInputField from "@/components/atom/form/controllers/time-input-field";
import { EventSchema } from "../schema";
import InputField from "@/components/atom/form/controllers/input-field";
import TextareaController from "@/components/atom/form/controllers/textarea-field";

const CreateEvent = ({ selectedDate, onCreate, onClose }: CreateEventProps) => {
  const defaultValues: FormValues = useMemo(
    () => ({
      summary: "",
      description: "",
      startTime: "",
      endTime: "",
    }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(EventSchema),
    defaultValues,
  });

  const onSubmit = (values: FormValues) => {
    const start = new Date(`${selectedDate}T${values.startTime}:00`);
    const end = new Date(`${selectedDate}T${values.endTime}:00`);

    const event: CalendarEventInput = {
      summary: values.summary,
      description: values.description,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
    };

    onCreate(event);
    onClose();
  };

  return (
    <div className="p-4 pr-0 bg-white rounded-xl w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Create Event</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          control={control}
          name="summary"
          label="Title"
          placeholder="Event title"
          errors={errors}
        />

        <TextareaController
          control={control}
          name="description"
          label="Description"
          placeholder="Event description"
          rows={3}
          errors={errors}
        />

        <TimeInputField
          control={control}
          name="startTime"
          label="Start Time"
          errors={errors}
        />

        <TimeInputField
          control={control}
          errors={errors}
          name="endTime"
          label="End Time"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
