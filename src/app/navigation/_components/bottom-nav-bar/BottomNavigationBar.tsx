'use client';

import clsx from 'clsx'
import React, { Children, cloneElement, ReactElement, useEffect, useState } from 'react'
import { FaDashcube, FaHouse } from 'react-icons/fa6'
import { BsHouse, BsFillHouseFill } from "react-icons/bs";
import { Navbar } from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { MdHome } from 'react-icons/md';

type Props = {
  value: string | number,
  onChange: (value: string | number) => void,
  iconSize?: number,
  children: ReactElement | ReactElement[]
}

export const BottomNavigationBar = ({ value, onChange, iconSize = 24, children }: Props) => {

  const isArray = Array.isArray(children);

  const [index, setIndex] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [prevScrollPosition, setPrevScrollPosition] = useState(0)

  const items = [
    {
      index: 0,
      text: "Cotización",
      icon: <BsHouse size={24} />,
      selectedIcon: <BsFillHouseFill size={24} />,
    },
    {
      index: 1,
      text: "Cotización",
      icon: <BsHouse size={24} />,
      selectedIcon: <BsFillHouseFill size={24} />,
    },
    {
      index: 2,
      text: "Cotización",
      icon: <BsHouse size={24} />,
      selectedIcon: <BsFillHouseFill size={24} />,
    },
    {
      index: 3,
      text: "Cotización",
      icon: <BsHouse size={24} />,
      selectedIcon: <BsFillHouseFill size={24} />,
    },
    {
      index: 4,
      text: "Cotización",
      icon: <BsHouse size={24} />,
      selectedIcon: <BsFillHouseFill size={24} />,
    },

  ]


  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll >= 100) {
      setPrevScrollPosition(currentScroll);
      setHidden(true);
    } else if (prevScrollPosition < currentScroll) {
      setPrevScrollPosition(currentScroll);
      setHidden(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log("removed")
    };
  }, []);

  return (
    <nav
      className={clsx(
        // "fixed bottom-0 right-0",
        "w-full py-1 flex justify-evenly box-border bg-default-100 overflow-auto no-scrollbar transition-all duration-500",
        {
          "translate-y-60 ": hidden
        }
      )}>
      {
        isArray
          ? <>{children}</>
          : Children.map(children, (child) => cloneElement(child, { iconSize, value }))

      }


    </nav >
  )
}
