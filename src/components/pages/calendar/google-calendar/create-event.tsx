"use client";
import { useState } from "react";
import { CreateEventProps } from "./type";

const CreateEvent = ({ selectedDate, onCreate, onClose }: CreateEventProps) => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const start = new Date(selectedDate ?? "");
    const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 hour

    const newEvent = {
      summary,
      description,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
    };

    onCreate(newEvent);
    onClose();
  };

  return (
    <div className="p-4 bg-white rounded-xl  w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Create Event</h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          rows={4}
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
