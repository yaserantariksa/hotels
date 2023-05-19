"use client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
	src?: string | null;
}

const defaultAvatar = "/images/avatar.jpg";

const Avatar: React.FC<AvatarProps> = ({ src }) => {
	return (
		<Image
			className="rounded-full object-cover"
			height="30"
			width="30"
			src={src ? src : defaultAvatar}
			alt="avatar"
		/>
	);
};

export default Avatar;
