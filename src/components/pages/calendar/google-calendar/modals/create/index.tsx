"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarEvent, CreateEventProps, FormValues } from "../../type";
import { useMemo, useState } from "react";
import TimeInputField from "@/components/atom/form/controllers/time-input-field";
import { EventSchema } from "../../schema";
import InputField from "@/components/atom/form/controllers/input-field";
import SureCreateModal from "./modal";
import TextareaFiled from "@/components/atom/form/controllers/textarea-field";

const CreateEventModal = ({
  selectedDate,
  onCreate,
  onClose,
}: CreateEventProps) => {
  const [sureModal, setSureModal] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<CalendarEvent | null>(null);

  const defaultValues: FormValues = useMemo(
    () => ({
      summary: "",
      description: "",
      startTime: "",
      endTime: "",
    }),
    []
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(EventSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: FormValues) => {
    const start = new Date(`${selectedDate}T${values.startTime}:00`);
    const end = new Date(`${selectedDate}T${values.endTime}:00`);

    const event: CalendarEvent = {
      summary: values.summary,
      description: values.description,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
    };
    setNewEvent(event);
    setSureModal(true);
  };

  const sureHandler = () => {
    if (newEvent) {
      onCreate(newEvent);
      setNewEvent(null);
      onClose();
    }
  };

  return (
    <div className="p-4   ">
      <h2 className="text-lg font-semibold mb-4 text-orange-400">
        Create Event
      </h2>

      {!sureModal ? (
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

            <div className="flex justify-end mt-8 ">
              <button
                type="submit"
                className=" px-8 py-2 bg-blue-500 text-white cursor-pointer 
              rounded-md border-2 hover:bg-transparent hover:border-blue-500
              hover:text-blue-500 "
              >
                Next
              </button>
            </div>
          </form>
        </FormProvider>
      ) : (
        <SureCreateModal
          sureHandler={sureHandler}
          setSureModal={setSureModal}
          newEvent={newEvent}
        />
      )}
    </div>
  );
};

export default CreateEventModal;
