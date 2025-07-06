import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { errorHandler } from "_services/errorHandler";
import { Params, StudentParams } from "_interfaces/class.interface";
import { useCreateContentLibraryMutation, useGetContentLibraryQuery, useUpdateContentLibraryMutation } from "_services/modules/content-library";
import { ContentLibraryFormI, ContentLibraryPayloadI } from "_interfaces/content-library.interfaces";
import { uploadFile } from "_services/modules/file";
import { useAppDispatch } from "store";
import { useAppSelector } from "store";

const useContentLibrary = (searchParams: Params, handler?: () => void) => {
    const { data, refetch, isLoading: loadingGetData, isFetching } = useGetContentLibraryQuery(searchParams);
    const [create, createState] = useCreateContentLibraryMutation();
    const [update, updateState] = useUpdateContentLibraryMutation();
    const { navigation } = useAppSelector(state => state.contentLibrary);

    const isLoading = createState.isLoading || updateState.isLoading || loadingGetData || isFetching;

    const validFileExtensions = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    const maxFileSize = 2 * 1024 * 1024;

    const schema = yup.object().shape({
        name: yup.string().when("type", { is: "folder", then: yup.string().required("Nama folder wajib diisi") }),
        type: yup.string(),
        file_url: yup
            .mixed<File>()
            .nullable()
            .test(
                "fileType",
                "Format file tidak valid, hanya mendukung jpeg, jpg, png dan pdf",
                (value) => !value || (value && validFileExtensions.includes(value.type))
            ).test(
                "fileSize",
                "Ukuran file terlalu besar, maksimal 2MB",
                (value) => !value || (value && value.size <= maxFileSize)
            ).when("type", { is: "file", then: yup.mixed<File>().required("File is required") }),
    });

    const {
        handleSubmit,
        formState: { errors },
        register,
        watch,
        reset,
        control,
        setValue,
        setError,
        clearErrors,
    } = useForm<ContentLibraryFormI>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: {
            file_url: undefined,
            parent: '00000000-0000-0000-0000-000000000000',
            type: 'folder',
        }
    });

    const onSubmitCreate = async (data: ContentLibraryFormI) => {
        let dataContent: ContentLibraryPayloadI = {
            name: data.name,
            file_url: '',
            type: data.type,
            parent: data.parent,
            owner: data.owner
        };

        const fileUpload = data.file_url ? uploadFile('', data.file_url).then(fileName => {
            dataContent.file_url = fileName
            const splittedName = fileName.split('/');
            dataContent.name = splittedName[splittedName.length - 1];
        }) : Promise.resolve();

        try {
            await fileUpload;
            if (navigation.length > 0) {
                await create({ ...dataContent, parent: navigation[navigation.length - 1]?.id, type: 'file' }).unwrap();
                refetch();
                handler && handler();
            } else {
                const res = await create({ ...dataContent, type: 'file' }).unwrap();
                refetch();
                handler && handler();
            }
        } catch (error) {
            errorHandler(error);
        }
    }

    const handleFileChange = (key: string, file: File | null) => {
        const name = key as 'file_url';
        if (!file) {
            setError(name, { type: "manual", message: "File wajib diunggah" });
        } else if (file.size > maxFileSize) {
            setError(name, { type: "manual", message: "Ukuran file terlalu besar, maksimal 2MB" });
        } else if (!validFileExtensions.includes(file.type)) {
            setError(name, { type: "manual", message: "Format file tidak valid" });
        } else {
            clearErrors(name); // Clear any existing errors once the file is valid
        }
        setValue(name, file!);
    };

    const _CreateFolder = async (data: ContentLibraryFormI) => {
        try {
            if (navigation.length > 0) {
                await create({ ...data, parent: navigation[navigation.length - 1]?.id, type: 'folder', file_url: '' }).unwrap();
                refetch();
            }
            const res = await create({ ...data, file_url: '', type: 'folder' }).unwrap();
            refetch();
            handler && handler();
        } catch (error) {
            errorHandler(error);
        }
    }

    const handleCreate = handleSubmit(_CreateFolder);
    const handleCreateFile = handleSubmit(onSubmitCreate);

    return { data, refetch, errors, register, watch, reset, control, onSubmitCreate, handleCreate, isLoading, setValue, handleCreateFile, handleFileChange };
};

export default useContentLibrary;
