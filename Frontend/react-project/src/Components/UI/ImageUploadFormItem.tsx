import React, { useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined, CloseCircleFilled } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { RcFile } from "antd/es/upload";

const { Dragger } = Upload;

type ImageUploadFormItemProps = {
    name: string;
    onFileSelect: (file: File | null) => void;
};

const ImageUploadFormItem: React.FC<ImageUploadFormItemProps> = ({
                                                                     name,
                                                                     onFileSelect
                                                                 }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const props: UploadProps = {
        name: "file",
        multiple: false,
        maxCount: 1,
        beforeUpload: (file: RcFile) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
                message.error("Можна лише зображення!");
                return Upload.LIST_IGNORE;
            }

            setPreviewUrl(URL.createObjectURL(file));
            onFileSelect(file);
            return false;
        },
        showUploadList: false,
    };

    return (
        <div className="mb-4">
            {!previewUrl ? (
                <Dragger {...props} name={name} accept="image/*">
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined style={{fontSize: 30, color: 'yellow'}}/>
                    </p>
                    <p className="dark:text-white">
                        Натисніть або перетягніть фото сюди
                    </p>
                    <p className="dark:text-white ">Тільки зображення (1 файл)</p>
                </Dragger>
            ) : (
                <div
                    className="relative w-48 h-48 mx-auto border border-dashed border-gray-300 rounded-lg overflow-hidden shadow-md">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full text-gray-800 hover:text-amber-300"
                        onClick={() => setPreviewUrl(null)}
                    >
                        <CloseCircleFilled className="text-xl"/>
                    </button>
                </div>
            )}
        </div>
);
};

export default ImageUploadFormItem;