import { useToast } from "vue-toast-notification";
import { type AnyZodObject, ZodEffects, ZodDiscriminatedUnion } from "zod";
import { type Ref } from "vue";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { CustomFormData, ToastPayload } from "@/types";

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
