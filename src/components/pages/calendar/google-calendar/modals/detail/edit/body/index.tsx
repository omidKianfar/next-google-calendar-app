import InputField from "@/components/atom/form/controllers/input-field";
import TextareaController from "@/components/atom/form/controllers/textarea-field";
import TimeInputField from "@/components/atom/form/controllers/time-input-field";
import { useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { EventSchema } from "../../../../schema";
import dayjs from "dayjs";
import { CalendarEvent, EventProps, FormValues } from "../../../../type";

const EditBody = ({
  event,
  setIsEditing,
  setEventId,
  setNewEvent,
  setSureModal,
}: Pick<
  EventProps,
  "event" | "setEventId" | "setIsEditing" | "setNewEvent" | "setSureModal"
>) => {
  const initialStartTime = useMemo(() => {
    if (!event?.start.dateTime) return "";
    return dayjs(event.start.dateTime).format("hh:mm");
  }, [event]);

  const initialEndTime = useMemo(() => {
    if (!event?.end.dateTime) return "";
    return dayjs(event.end.dateTime).format("hh:mm");
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
    if (!event || !event.start) return;

    const dateStr = event?.start?.dateTime
      ? event?.start?.dateTime.split("T")[0]
      : undefined;

    const start = dayjs(`${dateStr} ${values.startTime}`, "hh:mm a");
    const end = dayjs(`${dateStr} ${values.endTime}`, "hh:mm a");

    const updatedEvent: CalendarEvent = {
      summary: values.summary,
      description: values.description,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
    };

    setEventId?.(event.id ?? "");
    setNewEvent?.(updatedEvent);
    setSureModal?.(true);
  };

  return (
    <div className="bg-white rounded-xl w-full">
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

        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="mr-4 px-8 py-2 bg-orange-500 text-white 
            cursor-pointer rounded-md border-2 hover:bg-transparent
            hover:border-orange-500 hover:text-orange-500"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-2 bg-blue-500 text-white cursor-pointer
            rounded-md border-2 hover:bg-transparent hover:border-blue-500
            hover:text-blue-500"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBody;
