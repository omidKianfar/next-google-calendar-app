import * as Yup from "yup";

export const EventSchema = Yup.object({
  summary: Yup.string().required("Enter summery"),
  description: Yup.string().required("Enter description"),
  startTime: Yup.string().required("Select start time"),
  endTime: Yup.string()
    .required("Select end time")
    .test("is-after", "End time must be after start time", function (value) {
      const { startTime } = this.parent;
      return startTime && value ? value > startTime : false;
    }),
});
