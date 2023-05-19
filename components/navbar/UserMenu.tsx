"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useRentModal from "@/hooks/useRentModal";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/types";

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();

	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		return rentModal.onOpen();
	}, [currentUser, loginModal, rentModal]);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={onRent}
					className="
				hidden
				md:block
				text-sm
				font-semibold
				py-3
				px-4
				rounded-full
				hover:bg-neutral-100
				transition
				cursor-pointer
				"
				>
					Hotels your home
				</div>
				<div
					onClick={toggleOpen}
					className="
						p-4
						md:py-2
						md:px-3
						border-[1px]
						border-neutral-200
						flex
						flex-row
						items-center
						gap-3
						rounded-full
						cursor-pointer
						hover:shadow-md
						transition
					"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>

			{isOpen && (
				<div
					className="
						absolute
						rounded-xl
						shadow-md
						w-[40vw]
						md:w-3/4
						bg-white
						overflow-hidden
						right-0
						top-15
						text-sm
						mt-2
					"
				>
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem onClick={() => {}} label="My Trips" />
								<MenuItem
									onClick={() => {}}
									label="My Favorites"
								/>
								<MenuItem
									onClick={() => {}}
									label="My Reservations"
								/>
								<MenuItem
									onClick={() => {}}
									label="My Properties"
								/>
								<MenuItem
									onClick={() => rentModal.onOpen()}
									label="Hotels my home"
								/>
								<hr />
								<MenuItem
									onClick={() => {
										signOut();
										toast.success("Logged Out");
									}}
									label="Logout"
								/>
							</>
						) : (
							<>
								<MenuItem
									onClick={loginModal.onOpen}
									label="Login"
								/>
								<MenuItem
									onClick={registerModal.onOpen}
									label="Sign up"
								/>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
