import { Api } from "_services/api";
import { errorHandler } from "_services/errorHandler";

export const fileApi = Api.injectEndpoints({
  endpoints: (build) => ({
    upload: build.mutation<{ path: string }, File>({
      query(image) {
        let bodyFormData = new FormData();
        bodyFormData.append("file", image);
        bodyFormData.append("type", "OTHER_URL");

        return {
          url: "https",
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          method: "POST",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useUploadMutation } = fileApi;

export const uploadFile = async (token: string, image: File) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("file", image);
    bodyFormData.append("type", "OTHER_URL");
    const response = await fetch(
      `https://storage.quadrakaryasantosa.com/media`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        body: bodyFormData,
      }
    );
    const data = await response.json();
    return data.data.filename;
  } catch (error) {
    errorHandler(error);
  }
};

export const uploadFileLocal = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:3003/school/announcement-upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Gagal mengupload file");
    }

    const data = await response.json();
    console.log("Upload result:", data);
    return data.url; // backend akan return URL lokal file
  } catch (error) {
    errorHandler(error);
    throw error;
  }
};


export const uploadQuizQuestions = async (token: string, file: File) => {
  const bodyFormData = new FormData();
  bodyFormData.append("file", file);
  return await fetch(
    `${process.env.REACT_APP_REST_HOST}/quiz/v1/questions/upload`,
    {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      body: bodyFormData,
    }
  );
};
