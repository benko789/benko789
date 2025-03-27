import Image from "next/image";

export default function Home() {
  // This is a workaround to get the base path for the images with Template Literals
  var basePath = process.env.NODE_ENV === 'production' ? '/benko789' : '';
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Scrolling Banner */}
      <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap">
        <div className="animate-scroll inline-block">
          <span className="mx-4">Welcome to my portfolio • Full Stack Developer • UI/UX Designer • Problem Solver • Welcome to my portfolio • Full Stack Developer • UI/UX Designer • Problem Solver •</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-2">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl">
          <div className="text-left space-y-0 w-full max-w-[25rem]">
            <h1 className="text-[12rem] font-mono font-bold leading-[0.8] pl-1.5">BEN</h1>
            <h1 className="text-[17.25rem] font-mono font-bold leading-[0.8]">KO</h1>
          </div>
          <div className="text-left space-y-2 ml-3 w-full max-w-[23.5rem]">
            {/* Vertical List of Numbers and Descriptions */}
            <div className="flex items-start">
              <span className="text-8xl font-mono font-bold mr-4">3</span>
              <p className="text-2xl pt-1 text-pretty">Projects Completed fdsafsfsdfsdasdasa<br></br>
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-8xl font-mono font-bold mr-4">5</span>
              <p className="text-2xl pt-1 text-pretty">Happy Clients fdsasdasad dsafdsa asd sad</p>
            </div>
            <div className="flex items-start">
              <span className="text-8xl font-mono font-bold mr-4">7</span>
              <p className="text-2xl pt-1 text-pretty">Years of Experience fdsasds fdwsa sd asd</p>
            </div>

            {/* Horizontal List of Contact Buttons */}
            <div className="flex gap-4 mt-8">
              <a
                href="mailto:your-email@example.com"
                className="px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/your-profile"
                className="px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/your-profile"
                className="px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        <p>© 2024 Ben Ko. All rights reserved.</p>
      </footer>
    </div>
  );
}
