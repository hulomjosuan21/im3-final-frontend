"use client";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./theme-toggle";
import Link from "next/link";

const Navbar = () => {
    return (
        <section className="border-b py-2 px-4 fixed top-0 w-full bg-background z-50">
            <div className="">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center justify-between gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2"
                        >
                            <span className="text-md font-semibold tracking-tighter">
                                Predict
                            </span>
                        </Link>

                        <NavigationMenu className="hidden lg:block">
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        href="#"
                                        className="font-medium px-4 py-2 hover:underline"
                                    >
                                        About
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="hidden items-center gap-4 lg:flex">
                        <ModeToggle />
                    </div>

                    <Sheet>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="outline" size="icon">
                                <MenuIcon className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="max-h-screen overflow-auto">
                            <SheetHeader>
                                <SheetTitle>
                                    <a
                                        href="#"
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-lg font-semibold tracking-tighter">
                                            Predict
                                        </span>
                                    </a>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col p-4 gap-6">
                                <Link href="/" className="font-medium">
                                    About
                                </Link>
                                <div className="mt-6 flex flex-col gap-4">
                                    <ModeToggle />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </section>
    );
};

export { Navbar };
