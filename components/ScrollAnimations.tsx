'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ScrollAnimations({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const elements = ref.current.querySelectorAll('[data-animate]')
    
    elements.forEach((element: Element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          // Use a named ease to satisfy GSAP's TypeScript types
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
    }
  }, [])

  return <div ref={ref}>{children}</div>
}




