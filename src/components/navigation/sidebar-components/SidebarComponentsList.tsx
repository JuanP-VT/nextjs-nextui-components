'use client';
import useDebounce from '@/hooks/useDebounce';
import { removeAccents } from '@/utils/strings.utils';
import { Input } from '@nextui-org/input'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox'
import clsx from 'clsx'
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

type SidebarOption = {
  section: string;
  description: string;
  items: {
    key: string
    label: string
    path: string
  }[]
}

export const SidebarComponentsList = () => {

  const componentSections: SidebarOption[] = useMemo(() => ([
    {
      section: 'Data display',
      description: 'Avatar, Chip, Badge, etc.',
      items: [
        {
          key: "avatar",
          label: "Avatar",
          path: '/data-display/avatar'
        },
        {
          key: "icons",
          label: "Icons",
          path: '/data-display/icons'
        }
      ]
    },
    {
      section: 'Feedback',
      description: 'Alerts, Snackbars, etc.',
      items: [
        {
          key: "alerts",
          label: "Alerts",
          path: '/feedback/alerts'
        },
      ]
    },
    {
      section: 'Inputs',
      description: 'Inputs, Toggles, etc.',
      items: [
        {
          key: "switch",
          label: "Switch",
          path: '/inputs/switch'
        }
      ]
    },
    {
      section: 'Navigation',
      description: 'Drawer, Bottom Navigation, etc.',
      items: [
        // {
        //   key: "drawer",
        //   label: "Drawer",
        //   path: '/navigation/drawer'
        // }
        {
          key: "drawer",
          label: "Drawer",
          path: '/navigation'
        }
      ]
    },
  ]), []);


  const [sidebarItems, setSidebarItems] = useState(componentSections);
  const [inputSearch, setInputSearch] = useState("")
  const debounceValue = useDebounce(inputSearch, 500);
  const pathname = usePathname();

  const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => setInputSearch(e.target.value)

  const handleSearch = useCallback(() => {

    const term = debounceValue;

    if (!term || !term.trim())
      setSidebarItems([...componentSections]);

    const result = componentSections.map(section => {
      const itemsFiltered = section.items.filter(item => removeAccents(item.label).toLowerCase().includes(removeAccents(term).toLowerCase()));
      return itemsFiltered.length > 0 ? { ...section, items: itemsFiltered } : null;
    }).filter(section => section != null) as SidebarOption[]

    setSidebarItems(result)
  }, [debounceValue, componentSections])

  const isActive = (url: string) => {
    return url === pathname
  }

  useEffect(() => {
    handleSearch()
  }, [handleSearch, debounceValue])


  return (
    <>
      <Input
        startContent={<FaMagnifyingGlass color="grey" size={20} />}
        placeholder="Buscar..."
        value={inputSearch}
        onChange={handleChangeInputSearch}
      />

      <Listbox
        items={sidebarItems}
        aria-label="Sidebar items"
        onAction={(key) => console.log(key)}
        emptyContent="Sin resultados"
      >
        {({ items, section }) => (
          <ListboxSection key={section} title={section} items={items} classNames={{ group: "flex flex-col gap-1" }}>
            {
              (item) => <ListboxItem
                key={item.key}
                href={item.path}
                classNames={{
                  base: clsx(
                    "px-2 transition-colors", {
                    "border-0 bg-green-600/20 text-green-700 data-[hover=true]:bg-green-600/30 data-[hover=true]:text-green-700 dark:text-green-600 border-0 transition-colors": isActive(item.path)
                  }),
                  title: clsx({
                    "font-semibold": isActive(item.path)
                  })
                }}
              >
                {item.label}
              </ListboxItem>
            }

          </ListboxSection>
        )}
      </Listbox>
    </>
  )
}
