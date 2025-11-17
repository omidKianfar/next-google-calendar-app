import InputField from "@/components/atom/form/controllers/input-field";
import TimeInputField from "@/components/atom/form/controllers/time-input-field";
import { useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { EventSchema } from "../../../../schema";
import dayjs from "dayjs";
import { CalendarEvent, EventProps, FormValues } from "../../../../type";
import TextareaFiled from "@/components/atom/form/controllers/textarea-field";

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
    return dayjs(event.start.dateTime).format("HH:mm");
  }, [event]);

  const initialEndTime = useMemo(() => {
    if (!event?.end.dateTime) return "";
    return dayjs(event.end.dateTime).format("HH:mm");
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

  const methods = useForm<FormValues>({
    resolver: yupResolver(EventSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: FormValues) => {
    if (!event || !event.start) return;

    const dateStr = event?.start?.dateTime
      ? event?.start?.dateTime.split("T")[0]
      : undefined;

    const start = dayjs(`${dateStr} ${values.startTime}`, "HH:mm A");
    const end = dayjs(`${dateStr} ${values.endTime}`, "HH:mm A");

    const updatedEvent: CalendarEvent = {
      summary: values.summary,
      description: values.description,
      start: { dateTime: start!.toISOString() ?? "" },
      end: { dateTime: end!.toISOString() ?? "" },
    };

    setEventId?.(event.id ?? "");
    setNewEvent?.(updatedEvent);
    setSureModal?.(true);
  };

  return (
    <div className="bg-white rounded-xl w-full">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            name="summary"
            label="Title"
            placeholder="Enter your title"
          />

          <TextareaFiled
            name="description"
            label="Description"
            placeholder="Enter your description"
            rows={3}
          />

          <TimeInputField name="startTime" label="Start Time" />

          <TimeInputField name="endTime" label="End Time" />

          <div className="flex justify-end mt-8">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="mr-4 px-8 py-2 bg-orange-500 text-white 
            cursor-pointer rounded-md border-2 hover:bg-transparent
            hover:border-orange-500 hover:text-orange-500"
            >
              Back
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
      </FormProvider>
    </div>
  );
};

export default EditBody;
