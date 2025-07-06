import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form";

export const createFileFromUrl = async (
    url: string,
): Promise<File | null> => {
    try {
        // Fetch file dari URL
        const response = await fetch(url);
        const blob = await response.blob();
        const link = new URL(url);
        const fileName = link.pathname.split('/').pop() || "downloaded-file";
        const newFile = new File([blob], fileName, { type: blob.type });
        return newFile;
    } catch (error) {
        console.error('Error fetching file:', error);
        return null;
    }
};
