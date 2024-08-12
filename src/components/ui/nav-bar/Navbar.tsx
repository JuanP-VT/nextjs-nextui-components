import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";

import NextLink from "next/link";

import { ThemeSwitch } from "@/components/ui/ThemeSwitch";
import { OnSiteIconSolid } from "@/app/icons/_components";
import HamburguerButton from "./HamburguerButton";
import { FaBars } from "react-icons/fa6";


export const Navbar = () => {


	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<HamburguerButton > <FaBars /> </HamburguerButton>
					
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<p className="font-bold text-inherit">Title App</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent
				className="basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="flex gap-2">
					<ThemeSwitch />
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar >
	);
};
