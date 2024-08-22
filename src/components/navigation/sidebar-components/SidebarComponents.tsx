'use client';
import { Drawer, ThemeSwitch } from '@/components'
import { OnSiteIconSolid } from '@/components/icons';
import { DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from '@/components/navigation/drawer/Drawer'
import { useComponentsStore, useUIStore } from '@/store'
import { Button } from '@nextui-org/button'
import { User } from '@nextui-org/user';
import React from 'react'
import { FaChevronLeft, FaMagnifyingGlass } from 'react-icons/fa6'
import { SidebarComponentsList } from './SidebarComponentsList';



export const SidebarComponents = () => {

  const isOpen = useUIStore.use.isSideMenuOpen();
  const toggleSidebar = useUIStore.use.toggleSidebar();

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      closeButton={<FaChevronLeft size={16} />}
      hideCloseButton={false}
      onOpenChange={(isOpen) => toggleSidebar()}
      className="w-full sm:w-80"
      classNames={{ body: "px-4 w-full sm:w-80", closeButton: "top-3 right-3" }}
    >
      <DrawerContent className="pt-10">
        {
          (onClose) => <>
            <DrawerBody>
              <SidebarComponentsList />
            </DrawerBody>
            <DrawerFooter>
              <ThemeSwitch />
              <Button color="danger" onPress={onClose}>Cerrar</Button>
            </DrawerFooter>

          </>
        }
      </DrawerContent>
    </Drawer>
  )
}
