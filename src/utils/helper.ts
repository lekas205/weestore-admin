import { useToast } from 'vue-toast-notification'
import { type AnyZodObject, ZodEffects, ZodDiscriminatedUnion } from 'zod'
import { type Ref } from 'vue'
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3"
import { CustomFormData, ToastPayload } from '@/types'

const toast = useToast();

export function openToastNotification({ message, duration, variant, position }: ToastPayload) {
  return toast.open({
    message,
    duration: duration ?? 3500,
    type: variant ?? 'success',
    position: position ?? 'top-right'
  });
}

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
  schema: AnyZodObject | ZodEffects<AnyZodObject> | ZodDiscriminatedUnion<string, AnyZodObject[]>,
  field?: string
): Promise<T| null> {
  const data: any = {};
  for (const key in formData.value) {
    data[key] = formData.value[key].value;
  }

  const validationResult = await schema.safeParseAsync(data);

  if (!validationResult.success) {
    const issues = validationResult.error.issues;

    if (field) {
      const errorObj = issues.find(e => e.path.includes(field));

      if (errorObj) {
        formData.value[field].errorMessage = errorObj.message;
      } else {
        formData.value[field].errorMessage = null
      }
    }
    else {
      for (const key in formData.value) {
        const hasIssue = issues.find(item => item.path[0] == key)
        if (hasIssue) {
          formData.value[key].errorMessage = hasIssue.message;
        }
        else {
          formData.value[key].errorMessage = null;
        }
      }
    }
  }
  else if (field) {
    formData.value[field].errorMessage = null;
  }
  else {
    return validationResult.data as any;
  }

  return null;
}

export async function handleFileUpload(files: File[]): Promise<string[] | null> {
  const uploadPayloads: PutObjectCommandInput[] = [];
  const urls: string[] = [];
  files.forEach(file => {
    const timestampprefix = new Date().getTime();
    const Key = `morebuy/${timestampprefix}_${file.name}`;
    uploadPayloads.push({
      Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
      Key,
      Body: file,
      ContentType: file.type,
    })
  });

  try {
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
    openToastNotification({
      message: 'Error uploading Image(s)',
    });
    return null;
  }

  return urls;
}
