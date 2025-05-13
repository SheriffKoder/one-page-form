/////////////////////////////////////////////////////////////////////////////
// app/page.tsx
// 
// SIGN IN PAGE
//
// This file implements the main sign-in page for the application.
// It follows these steps:
// 1. Renders a fixed header image at the top
// 2. Displays a centered company logo
// 3. Shows the sign-in form in the main content area
// 4. Presents footer information and company logo
/////////////////////////////////////////////////////////////////////////////

import { ThemeButtons } from "@/components/ui/ThemeToggler_Button";
import Image from "next/image";
import React from "react";

import { footer_content, header_image, header_image_circle } from "@/data/config";
import { SigninForm } from "@/components/Form/signin-form";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white relative overflow-x-hidden">

      {/* /////////////////////////////////////////////////////////////////////////////
      // STEP 1: Header Image
      // Displays a full-width background image at the top of the page
      ///////////////////////////////////////////////////////////////////////////// */}
      
      <div className="fixed top-0 left-0 w-full h-[35vh] flex flex-col items-center justify-center z-[0]">
        <Image src={header_image.src} alt={header_image.alt} fill className="object-cover" />
      </div>

      <div className="relative w-full min-h-screen pt-[15vh] md:pt-[15vh]">
        
        {/* /////////////////////////////////////////////////////////////////////////////
        // STEP 2: Company Logo
        // Renders a circular company logo centered at the top of the page
        ///////////////////////////////////////////////////////////////////////////// */}
        
        <div className={`absolute
          rounded-full
          shadow-sm overflow-hidden
          top-[50px] md:top-[60px]`}
          style={{
            left: `50%`,
            transform: `translateX(-50%)`,
            height: `${header_image_circle.size}rem`,
            width: `${header_image_circle.size}rem`,
          }}> 
          <Image src={header_image_circle.src} alt={header_image_circle.alt} fill className="object-cover" />
        </div>

        {/* /////////////////////////////////////////////////////////////////////////////
        // STEP 3: Main Content
        // Contains the sign-in form and related heading elements
        ///////////////////////////////////////////////////////////////////////////// */}
        
        <main className="w-full bg-background flex flex-col items-center pb-20 rounded-t-xl px-2 md:px-0">
          {/* Title Section with heading and subtext */}
          <header className="w-full max-w-xl lg:max-w-4xl flex flex-col items-center md:items-start 
          justify-center mt-[100px] md:mt-[100px] mb-[20px] md:mb-[40px] gap-2 text-foreground">
            <h1 className="heading1 text-foreground">
              Sign In
            </h1>
            <p className="paragraph1 text-foreground/50">
              Sign in to your account
            </p>
          </header>

          {/* Sign In Form Component - Handles user authentication */}
          <SigninForm />
        </main>

        {/* /////////////////////////////////////////////////////////////////////////////
        // STEP 4: Footer
        // Displays company information and logo at the bottom of the page
        ///////////////////////////////////////////////////////////////////////////// */}
        
        <footer className="w-full bg-background flex flex-col items-center py-10">
          {/* Company information displayed as a horizontal list with separators */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
            {footer_content.text.map((item: any, index: number) => (
              <React.Fragment key={item.title}>
                <span className="paragraph3 text-foreground/70 hover:text-foreground transition-colors">
                  {item.title} : {item.description}
                </span>
                {index < footer_content.text.length - 1 && (
                  <span className="text-foreground/30">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Company logo in the footer */}
          <div className="w-24 h-auto">
            <Image 
              src={footer_content.logo.src} 
              alt={footer_content.logo.alt} 
              width={96} 
              height={96} 
              className="object-contain" 
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
