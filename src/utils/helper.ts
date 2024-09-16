import { useToast } from "vue-toast-notification";
import { type AnyZodObject, ZodEffects, ZodDiscriminatedUnion } from "zod";
import { type Ref } from "vue";

import dayjs from "dayjs";
import en from "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { CustomFormData, ToastPayload } from "@/types";

dayjs.locale({
  ...en,
});

/**
 * Define Plugins and Extend
 */
dayjs.extend(relativeTime);

const toast = useToast();

export function openToastNotification({
  message,
  duration,
  variant,
  position,
}: ToastPayload) {
  return toast.open({
    message,
    duration: duration ?? 3500,
    type: variant ?? "success",
    position: position ?? "top-right",
  });
}

export const formatDate = (date) => {
  let d = new Date(date);
  return d.toLocaleString(["en-Us"], {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

// const convertDateToISOFormat = (date: Date) => {
//   const d = new Date(date).toISOString();
//   return d.split("T")[0];
// };

// const getRangeDate = (numWeeks: number) => {
//   const date = new Date();
//   date.setDate(date.getDate() - numWeeks * 7)
// };
const formatDate2 = (date: string | dayjs.Dayjs, format?: string): string => {
  if (!date) {
    return "-";
  }
  switch (format) {
    case "d-m-y":
      return dayjs(date).format("DD-MM-YYYY");
    case "y-m-d":
      return dayjs(date).format("YYYY-MM-DD");
    case "do m, y":
      return dayjs(date).format("DD MMM, YYYY");
    case "m do, y":
      return dayjs(date).format("MMM DD, YYYY");
    case "dd, mm do y":
      return dayjs(date).format("ddd, MMM DD, YYYY");
    case "ddd do, m, y":
      return dayjs(date).format("ddd DD, MMM, YYYY");
    case "dddd do, m, y":
      return dayjs(date).format("ddd DD, MMM, YYYY");
    case "dddd ddd, m, y":
      return dayjs(date).format("dddd DD, MMM, YYYY");
    case "do m":
      return dayjs(date).format("DD MMM");
    case "m do":
      return dayjs(date).format("MMMM DD");
    case "dd, m":
      return dayjs(date).format("ddd, MMMM DD");
    case "m y":
      return dayjs(date).format("MMM YYYY");
    case "d":
      return dayjs(date).format("D");
    case "D":
      return dayjs(date).format("ddd");
    case "object":
      return `${dayjs(date)}`;
    default:
      return dayjs(date).format("DD MMM, YYYY");
  }
};

const getPastDate = ({
  date,
  unit,
  num,
  format,
}: {
  date: string | dayjs.Dayjs;
  unit: string;
  num: number;
  format: string;
}) => {
  return formatDate2(
    dayjs(date ?? undefined).subtract(num, unit as dayjs.ManipulateType),
    format
  );
};

export const getDateRange = (range: string) => {
  const format = "y-m-d";
  switch (range) {
    case "today":
      return formatDate2(dayjs(), format);
      break;
    case "last3":
      return getPastDate({
        date: dayjs(),
        unit: "day",
        num: 3,
        format: "y-m-d",
      });

    case "lastweek":
      return getPastDate({
        date: dayjs(),
        unit: "day",
        num: 7,
        format: "y-m-d",
      });

    case "lasttwoweek":
      return getPastDate({
        date: dayjs(),
        unit: "day",
        num: 14,
        format: "y-m-d",
      });

    case "last30":
      return getPastDate({
        date: dayjs(),
        unit: "day",
        num: 30,
        format: "y-m-d",
      });
  }
};

export const formatTime = (date) => {
  let d = new Date(date);
  return d.toLocaleTimeString(["en-Us"], {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatText = (text: string) => {
  return text
    ? text.trim().charAt(0).toUpperCase() + text.trim().substr(1).toLowerCase()
    : "-";
};

export const capitalizeFirstLeters = (text: string) => {
  if (!text) {
    return "";
  }
  const splitedText = text.split(" ");
  return splitedText.map((x: string) => formatText(x)).join(" ");
};

export function formatAsMoney(amount: number, currency = true): string {
  try {
    const formattedAmount = new Intl.NumberFormat().format(amount);
    return currency ? `₦${formattedAmount}` : formattedAmount;
  } catch (error) {
    return currency ? `0.00` : `0`;
  }
}

export async function formValidator<T = any>(
  formData: Ref<CustomFormData>,
  schema:
    | AnyZodObject
    | ZodEffects<AnyZodObject>
    | ZodDiscriminatedUnion<string, AnyZodObject[]>,
  field?: string
): Promise<T | null> {
  const data: any = {};
  for (const key in formData.value) {
    data[key] = formData.value[key].value;
  }

  const validationResult = await schema.safeParseAsync(data);

  if (!validationResult.success) {
    const issues = validationResult.error.issues;
    // console.log(issues)

    if (field) {
      const errorObj = issues.find((e) => e.path.includes(field));

      if (errorObj) {
        formData.value[field].errorMessage = errorObj.message;
      } else {
        formData.value[field].errorMessage = null;
      }
    } else {
      for (const key in formData.value) {
        const hasIssue = issues.find((item) => item.path[0] == key);
        if (hasIssue) {
          formData.value[key].errorMessage = hasIssue.message;
        } else {
          formData.value[key].errorMessage = null;
        }
      }
    }
  } else if (field) {
    formData.value[field].errorMessage = null;
  } else {
    return validationResult.data as any;
  }

  return null;
}

export async function handleFileUpload(
  files: File[]
): Promise<string[] | null> {
  const urls: string[] = [];

  try {
    const uploadPayloads: PutObjectCommandInput[] = [];
    files.forEach((file) => {
      const timestampprefix = new Date().getTime();
      const Key = `morebuy/${timestampprefix}_${file.name
        .split(" ")
        .join("_")}`;
      uploadPayloads.push({
        Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
        Key,
        Body: file,
        ContentType: file.type,
      });
    });

    const bucket = new S3Client({
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_S3_SECRET_ACCESS_KEY,
      },
      region: import.meta.env.VITE_AWS_S3_REGION,
    });

    for (const payload of uploadPayloads) {
      const command = new PutObjectCommand(payload);
      try {
        await bucket.send(command);
        urls.push(`https://fajo-bc.s3.amazonaws.com/${payload.Key}`);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }

  return urls;
}
