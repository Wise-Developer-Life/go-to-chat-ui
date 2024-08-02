import {Avatar, Button, Tooltip} from "antd";
import {EditOutlined} from "@ant-design/icons";
import React, {useRef} from "react";


interface UserProfilePictureProps {
    profilePic: string;
    onEdit?: (fileMeta: File) => void;
}


const UserProfilePicture: React.FC<UserProfilePictureProps> = ({profilePic, onEdit}: UserProfilePictureProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editable = onEdit !== undefined;
    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && onEdit) {
            onEdit(file);
        }
    };

    return (
        <div className="profile-pic-container" style={{position: 'relative', marginBottom: '20px'}}>
            <Avatar
                src={profilePic}
                size={100}
                style={{border: '2px solid #1890ff'}}
            />

            {editable && (
                <>
                    <Tooltip title="Edit Profile Picture">
                        <Button
                            icon={<EditOutlined/>}
                            style={{position: 'absolute', bottom: '0px', right: '0px'}}
                            onClick={handleEditClick}
                        />
                    </Tooltip>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                </>
            )}
        </div>
    );
};

export default UserProfilePicture;
