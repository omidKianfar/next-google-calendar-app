"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarEventInput, CreateEventProps } from "./type";
import * as Yup from "yup";
import { useMemo } from "react";

const CreateEvent = ({ selectedDate, onCreate, onClose }: CreateEventProps) => {
  const defaultValues = useMemo(
    () => ({
      summary: "",
      description: "",
      startTime: "",
      endTime: "",
    }),
    []
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(AddEventSchema),
    defaultValues,
  });

  const { errors } = formState;

  const onSubmit = (values: any) => {
    const start = new Date(`${selectedDate}T${values.startTime}:00`);
    const end = new Date(`${selectedDate}T${values.endTime}:00`);
    const event: CalendarEventInput = {
      summary: values.summary,
      description: values.description,
      start: {
        dateTime: start.toISOString(),
      },
      end: {
        dateTime: end.toISOString(),
      },
    };

    onCreate(event);
    onClose();
  };

  return (
    <div className="p-4 bg-white rounded-xl w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Create Event</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("summary")}
            type="text"
            placeholder="Title"
            className="w-full border p-2 rounded-lg"
          />
          {errors.summary && (
            <p className="text-red-500 text-sm">{errors.summary.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("description")}
            placeholder="Description"
            rows={3}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Start Time</label>
          <input
            {...register("startTime")}
            type="time"
            className="w-full border p-2 rounded-lg"
          />
          {errors.startTime && (
            <p className="text-red-500 text-sm">{errors.startTime.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-700">End Time</label>
          <input
            {...register("endTime")}
            type="time"
            className="w-full border p-2 rounded-lg"
          />
          {errors.endTime && (
            <p className="text-red-500 text-sm">{errors.endTime.message}</p>
          )}
        </div>

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

const AddEventSchema = Yup.object().shape({
  summary: Yup.string().required("Enter event title"),
  description: Yup.string().optional(),
  startTime: Yup.string().required("Select start time"),
  endTime: Yup.string()
    .required("Select end time")
    .test("is-greater", "End time must be after start time", function (value) {
      const { startTime } = this.parent;
      return startTime && value ? value > startTime : false;
    }),
});
