import { z } from "zod";
import { JobTypes, locationTypes } from "./JobTypes";

const requiredString = z.string().min(1, "Required");
const numericrequiredString = requiredString.regex(/^\d+$/, "Must be a number");
const companyLogoSchame = z
  .custom()
  .refine((file) => {
    !file || (file instanceof File && file.type.startsWith("image/"));
  }, "Must be an image file")
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 4;
  }, "File must be less than 4mb");

const applicationSchame = z
  .object({
    applicationEmail: z.string().max(100).email().or(z.literal("")),
    applicationUrl: z.string().max(100).url().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationemail"],
  });

const locationSchame = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type"
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    { message: "Location is required for on-site jobs", path: ["location"] }
  );

export const createJobSchame = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => JobTypes.includes(value),
      "Invalid Job Type"
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchame,
    description: z.string().max(5000),
    salary: numericrequiredString.max(
      9,
      "Number can't be longer than 9 digits"
    ),
  })
  .and(applicationSchame)
  .and(locationSchame);

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

module.exports = {
  createJobSchame,
  jobFilterSchema,
  JobfilterValues,
};
