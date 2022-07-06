import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'About Us',
    icon: <IoIcons.IoIosPaper />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    subNav: [
      {
        title: 'Overview',
        path: 'overview',
        // icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'News',
        path: 'news',
        // icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Cleaning Protocols',
        path: 'guided-tour'
        // icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Weather',
        path: 'weather'
        // icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Creadit Card',
        path: 'credit-card'
        // icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Parking',
        path: 'parking-page'
        // icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Rooms',
    path: '/rooms',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Gallery',
    // path: '/gallery',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'pictures',
        path: 'pictures'
        // icon: <IoIcons.IoIosPaper />
      },
      {
        title: '3d Virtual Tours',
        path: 'virtual-tours'
        // icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Specials',
    path: '/special',
    icon: <IoIcons.IoMdPeople />
  },

  {
    title: 'Destination',
    icon: <IoIcons.IoIosPaper />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,

    subNav: [
      {
        title: 'Attractions',
        path: 'attractions',
        // icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Things To Do',
        path: 'things-to-do',
        // icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Guided Tours',
        path: 'guided-tour'
        // icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Weather',
        path: 'weather'
        // icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Events',
        path: 'events'
        // icon: <IoIcons.IoIosPaper />
      }
    ]
  },

  {
    title: 'Contact Us',
    path: '/contact',
    icon: <IoIcons.IoMdPeople />
  },

  {
    title: 'Reservation',
    path: '/reservations',
    icon: <FaIcons.FaEnvelopeOpenText />

    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    //   {
    //     title: 'Message 1',
    //     path: '/messages/message1',
    //     icon: <IoIcons.IoIosPaper />
    //   },
    //   {
    //     title: 'Message 2',
    //     path: '/messages/message2',
    //     icon: <IoIcons.IoIosPaper />
    //   }
    // ]
  }
]
