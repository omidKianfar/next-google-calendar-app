import { useMemo } from "react";
import { EventDetailProps, EventEditProps, FormValues } from "../type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventSchema } from "../schema";
import InputField from "@/components/atom/form/controllers/input-field";
import TextareaController from "@/components/atom/form/controllers/textarea-field";
import TimeInputField from "@/components/atom/form/controllers/time-input-field";

const EventEdit = ({
  event,
  onEdit,
  setIsEditing,
}: EventDetailProps & EventEditProps) => {
  const initialStartTime = useMemo(() => {
    if (!event?.start?.dateTime) return "";

    const date = new Date(event.start.dateTime);

    return date.toISOString().substring(11, 16);
  }, [event]);

  const initialEndTime = useMemo(() => {
    if (!event?.end?.dateTime) return "";

    const date = new Date(event.end.dateTime);

    return date.toISOString().substring(11, 16);
  }, [event]);

  const defaultValues: FormValues = useMemo(
    () => ({
      summary: event?.summary ?? "",
      description: event?.description ?? "",
      startTime: initialStartTime,
      endTime: initialEndTime,
    }),
    [event, initialStartTime, initialEndTime]
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
    if (!event || !event.start?.dateTime) return;

    const dateStr = event.start.dateTime.split("T")[0];

    const updatedEvent = {
      summary: values.summary,
      description: values.description,
      start: {
        dateTime: new Date(`${dateStr}T${values.startTime}:00`).toISOString(),
      },
      end: {
        dateTime: new Date(`${dateStr}T${values.endTime}:00`).toISOString(),
      },
    };

    onEdit?.(event.id ?? "", updatedEvent);
    setIsEditing(false);
  };

  return (
    <div className="p-4 pr-0 bg-white rounded-xl w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Event</h2>

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
          name="endTime"
          label="End Time"
          errors={errors}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventEdit;
