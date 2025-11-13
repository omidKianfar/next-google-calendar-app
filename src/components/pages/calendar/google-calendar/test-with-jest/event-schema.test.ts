import { EventSchema } from "../schema";

describe("EventSchema", () => {
  test("should pass with valid data", async () => {
    const validData = {
      summary: "Metting",
      description: "Team Meeting",
      startTime: "10:00",
      endTime: "11:00",
    };

    await expect(EventSchema.validate(validData)).resolves.toEqual(validData);
  });

  test("Should fail when summary is missing", async () => {
    const invalidateData = {
      summary: "",
      description: "Team Meeting",
      startTime: "10:00",
      endTime: "11:00",
    };

    await expect(EventSchema.validate(invalidateData)).rejects.toThrow(
      "Enter summery"
    );
  });

  test("Should fail when description is missing", async () => {
    const invalidateData = {
      summery: "Meeting",
      description: "",
      startTime: "10:00",
      endTime: "11:00",
    };
    await expect(EventSchema.validate(invalidateData)).rejects.toThrow(
      "Enter description"
    );
  });

  // test("should fail when start time is missing", async () => {
  //   const invalidateData = {
  //     summery: "Meeting",
  //     description: "Team Meeting",
  //     startTime: "",
  //     endTYime: "11:00",
  //   };

  //   await expect(EventSchema.validate(invalidateData)).rejects.toThrow(
  //     "Select start time"
  //   );
  // });

  test("should fail when end time is missing", async () => {
    const invalidateData = {
      summery: "Meeting",
      description: "Team Meeting",
      startTime: "10:00",
      endTYime: "",
    };

    await expect(EventSchema.validate(invalidateData)).rejects.toThrow(
      "Select end time"
    );
  });

  test("should fail when endTime is before startTime", async () => {
    const invalidData = {
      summary: "Meeting",
      description: "Team meeting",
      startTime: "11:00",
      endTime: "10:00",
    };
    await expect(EventSchema.validate(invalidData)).rejects.toThrow(
      "End time must be after start time"
    );
  });
});
