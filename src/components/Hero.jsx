import React from 'react'

export default function Hero() {
  const buttons = [
    {
      buttonName: 'All',
      icon: (<svg data-testid="IconCarFilled16" fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" color="text_03"><path d="m12.89 6.46-.11-1.79a2.333 2.333 0 0 0-2.33-2.19h-4.9c-1.23 0-2.26.96-2.33 2.19l-.11 1.79c-.58.2-.99.74-.99 1.38v2.7c0 .63.41 1.17.97 1.37v.69c0 .51.41.92.92.92h1.12c.51 0 .92-.41.92-.92v-.59h3.9v.59c0 .51.41.92.92.92h1.12c.51 0 .92-.41.92-.92v-.69c.56-.21.97-.74.97-1.37v-2.7c0-.64-.42-1.18-.99-1.38M4.22 4.73c.04-.7.63-1.25 1.33-1.25h4.91c.7 0 1.29.55 1.33 1.25l.1 1.64H4.12zm.88 5.61a1.14 1.14 0 1 1-.001-2.279A1.14 1.14 0 0 1 5.1 10.34m5.8 0a1.14 1.14 0 1 1-.001-2.279 1.14 1.14 0 0 1 .001 2.279" fill="#121214"></path></svg>)
    },
    {
      buttonName: 'Airports',
      icon: (<svg data-testid="IconAirplaneFilled16" fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" color="text_01"><path d="M13.62 6.64H11.3L8.03 2.87a.5.5 0 0 0-.38-.17h-1.5a.5.5 0 0 0-.43.26.52.52 0 0 0 0 .51L7.7 6.65H3.83L2.55 5.19a.49.49 0 0 0-.38-.17H1.5a.5.5 0 0 0-.42.23.51.51 0 0 0-.03.48l1.58 3.36c.08.17.26.29.45.29H7.7l-1.98 3.2a.5.5 0 0 0-.01.51.5.5 0 0 0 .44.26h1.49a.5.5 0 0 0 .38-.17l3.29-3.79h2.3a1.37 1.37 0 0 0 0-2.74v-.01Z" fill="#121214"></path></svg>)
    },
    {
      buttonName: 'Monthly',
      icon: (<svg data-testid="IconCalendarFilled16" fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" color="text_01"><path d="M13.17 2.54h-.68V1.45c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1.09H9.78V1.45c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1.09H7.07V1.45c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1.08H4.36V1.45c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1.08h-.49c-.43 0-.83.17-1.13.47s-.47.7-.47 1.13v8.95c0 .88.72 1.6 1.6 1.6h6.12a.5.5 0 0 0 .35-.14l5.29-5.29a.5.5 0 0 0 .15-.35V4.14c0-.88-.72-1.6-1.6-1.6zM2.27 13.08V6.24h11.5v2.45H9.7c-.51 0-.93.42-.93.93v4.07h-5.9c-.33 0-.6-.27-.6-.6zm7.5-3.39h2.99l-2.99 2.99z" fill="#121214"></path></svg>)
    },
    {
      buttonName: 'Nearby',
      icon: (<svg data-testid="IconLocationFilled16" fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" color="text_01"><path d="M8 1.5a4.55 4.55 0 0 0-4.5 4.68c0 3.56 3.48 7.35 4.18 8.07.08.09.2.14.32.14a.5.5 0 0 0 .33-.14c.17-.18 4.17-4.53 4.17-8.06A4.54 4.54 0 0 0 8 1.51zm0 6.51a2.02 2.02 0 1 1 0-4.05A2.02 2.02 0 0 1 8 8Z" fill="#121214"></path></svg>)
    },
    {
      buttonName: 'Delivered',
      icon: (<svg data-testid="IconSendFilled16" fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" color="text_01"><path d="M14.07 7.25 2.62 1.55c-.78-.39-1.42.01-1.42.88l.75 3.8.06.32 1.37.24 5.18.91c.75.13.75.35 0 .48l-.55.1-6 1.06-.06.3-.75 3.79c0 .87.64 1.27 1.42.88l11.45-5.7c.38-.19.57-.43.59-.68-.02-.25-.21-.49-.59-.68" fill="#121214"></path></svg>)
    },
    {
      buttonName: 'Cities',
      icon: (<svg data-testid="IconCityCenterFilled16" fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" color="text_01"><path d="M5.57 7.23H1.65a.25.25 0 0 0-.25.25v6.8c0 .14.11.25.25.25h3.92c.14 0 .25-.11.25-.25v-6.8a.25.25 0 0 0-.25-.25m8.69-2.34h-2.91a.25.25 0 0 0-.25.25v9.14c0 .14.11.25.25.25h2.91c.14 0 .25-.11.25-.25V5.14a.25.25 0 0 0-.25-.25M7.7 1.5a.26.26 0 0 0-.2-.1c-.05 0-.16.04-.2.1L5.49 3.96s-.05.09-.05.15v1.33c0 .14.11.25.25.25h.99a.7.7 0 0 1 .69.69v7.9c0 .14.11.25.25.25h1.69c.14 0 .25-.11.25-.25V4.18a.3.3 0 0 0-.05-.15L7.71 1.5z" fill="#121214"></path></svg>)
    },
  ]

  return (
    <>
        {/* hero */}
        <div className='px-14 py-6'>
          <div className='w-full max-w-[1184px] mx-auto'>
          {/* hero image */}
            <div className='w-full h-[312px] relative'>
              <picture>
                <img 
                  alt="Skip the rental car counter" 
                  src="https://turo.com/_next/static/images/7a4aa6568584bb8235de575684908460.webp"
                  className='w-full h-full object-cover'/>
                {/* <div>
                  <h1 class="">Skip the rental car counter</h1>
                  <h2 class="">Rent just about any car, just about anywhere</h2>
                </div> */}
              </picture>
            </div>

            <div>
              <nav className='flex justify-center items-center gap-6 my-8'>
                  {
                    buttons.map((button, index) => (
                      <button
                        key={index} 
                        type='button' 
                        className='flex items-center justify-center gap-1 w-17 hover:bg-gray-100 p-2 rounded-lg cursor-pointer'
                      >
                      {button.icon}
                      <span
                        className='font-semibold'
                      >
                      {button.buttonName}
                      </span>
                      </button>
                    ))
                  }
              </nav>
            </div>
          </div>
        </div>
    </>
  )
}