import Image from "next/image";
import { ThemeToggle } from "../components/ThemeToggle";

export default function Home() {
  // This is a workaround to get the base path for the images with Template Literals
  var basePath = process.env.NODE_ENV === 'production' ? '/benko789' : '';
  
  const bannerText = "Welcome to my portfolio • Full Stack Developer • UI/UX Designer • Problem Solver •";
  const repeatCount = 4; // Increased repeat count to ensure coverage of wider screens
  
  const generateBannerSpans = () => {
    // Create two sets of spans to ensure smooth infinite loop
    const divs = Array(repeatCount).fill(null).map((_, index) => (
      <div key={index} className="animate-scroll inline-block">
        <span className="mx-4">{bannerText}</span>
      </div>
    ));
    
    return (
      <>
        {divs}
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ThemeToggle />
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-top md:justify-center">
        {/* Scrolling Banner */}
        <div className="w-full bg-black dark:bg-white text-white dark:text-black py-2 scroll-container mb-6 inline-flex flex-nowrap max-w-3xl">
          {generateBannerSpans()}
        </div>

        {/* Content Container */}
        <div className="w-full max-w-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <div className="text-center md:text-left space-y-0 w-full max-w-[25rem]">
              <h1 className="text-[11rem] md:text-[12rem] font-mono font-bold leading-[0.8] pl-1.5">BEN</h1>
              <h1 className="text-[15.8rem] md:text-[17.25rem] font-mono font-bold leading-[0.8]">KO</h1>
            </div>
            <div className="text-left md:space-y-2 ml-7 md:ml-3 w-full max-w-[23.5rem]">
              {/* Vertical List of Numbers and Descriptions */}
              {[
                { number: 3, description: "Projects Completed" },
                { number: 5, description: "Happy Clients" },
                { number: 7, description: "Years of Experience" }
              ].map((highlight, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-8xl font-mono font-bold">{highlight.number}</span>
                  <p className="text-2xl pl-2 md:pl-1 pt-1 text-pretty">{highlight.description}</p>
                </div>
              ))}

              {/* Horizontal List of Contact Buttons */}
              <div className="flex flex-row gap-4 mt-2 md:mt-5 md:mb-5">
                <a
                  href="mailto:benkokaiser@hotmail.com"
                  className="px-4 py-2 border border-black dark:border-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/ko-ben"
                  className="px-4 py-2 border border-black dark:border-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/benko789"
                  className="px-4 py-2 border border-black dark:border-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <ThemeToggle /> */}
      {/* Footer */}
      {/* <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        <p>© 2024 Ben Ko. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
