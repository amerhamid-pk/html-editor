'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [htmlContent, setHtmlContent] = useState('');
  const [previewWidth, setPreviewWidth] = useState('100%');
  const [selectedBreakpoint, setSelectedBreakpoint] = useState('2xl');
  const [activeTab, setActiveTab] = useState('HTML');

  // Dummy HTML to be injected on initial load
  const dummyHtml = `
    <!-- Navbar -->
    <div class="bg-blue-600 text-white py-4 px-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">My Website</h1>
      <nav class="hidden md:flex space-x-4">
        <a href="#" class="hover:underline">Home</a>
        <a href="#" class="hover:underline">About</a>
        <a href="#" class="hover:underline">Services</a>
        <a href="#" class="hover:underline">Contact</a>
      </nav>
    </div>

    <!-- Hero Section -->
    <div class="relative bg-gray-200 text-center py-20 md:py-40">
      <h2 class="text-4xl md:text-6xl font-bold mb-4">Welcome to My Website</h2>
      <p class="text-lg md:text-2xl max-w-lg mx-auto">
        Discover the best services and products tailored just for you.
      </p>
      <button class="mt-8 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Learn More
      </button>
    </div>

    <!-- Responsive Grid Section -->
    <div class="py-12 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">Feature 1</h3>
        <p class="text-gray-700">This is a description of the first feature, responsive at various breakpoints.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">Feature 2</h3>
        <p class="text-gray-700">This is a description of the second feature, responsive at various breakpoints.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">Feature 3</h3>
        <p class="text-gray-700">This is a description of the third feature, responsive at various breakpoints.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">Feature 4</h3>
        <p class="text-gray-700">This is a description of the fourth feature, responsive at various breakpoints.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">Feature 5</h3>
        <p class="text-gray-700">This is a description of the fifth feature, responsive at various breakpoints.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">Feature 6</h3>
        <p class="text-gray-700">This is a description of the sixth feature, responsive at various breakpoints.</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-gray-800 text-white py-6 text-center">
      <p>&copy; 2023 My Website. All rights reserved.</p>
    </div>
  `;

  useEffect(() => {
    // Set the initial content when the component mounts
    setHtmlContent(dummyHtml);
  }, []);

  const handleInputChange = (event) => {
    setHtmlContent(event.target.value);
  };

  const handleBreakpointChange = (breakpoint) => {
    setSelectedBreakpoint(breakpoint);

    switch (breakpoint) {
      case 'sm':
        setPreviewWidth('41.67%'); // 640px / 1536px
        break;
      case 'md':
        setPreviewWidth('50%');    // 768px / 1536px
        break;
      case 'lg':
        setPreviewWidth('66.67%'); // 1024px / 1536px
        break;
      case 'xl':
        setPreviewWidth('83.33%'); // 1280px / 1536px
        break;
      case '2xl':
        setPreviewWidth('100%');   // 1536px / 1536px
        break;
      default:
        setPreviewWidth('100%');
    }
  };

  const previewContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Live Preview</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  return (
    <div className="h-screen flex flex-col">
      {/* Tabs for HTML and Preview with breakpoint options on the right */}
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2 ">
        <div className="space-x-4">
          <button
            onClick={() => setActiveTab('HTML')}
            className={`px-4 py-2 font-semibold rounded ${activeTab === 'HTML' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
          >
            HTML
          </button>
          <button
            onClick={() => setActiveTab('Preview')}
            className={`px-4 py-2 font-semibold rounded ${activeTab === 'Preview' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
          >
            Preview
          </button>
        </div>
        {activeTab === 'Preview' && (
          <div className="flex space-x-2">
            {['sm', 'md', 'lg', 'xl', '2xl'].map((bp) => (
              <button
                key={bp}
                className={`px-4 py-2 rounded ${selectedBreakpoint === bp ? 'bg-blue-500 text-white' : 'border text-gray-700'}`}
                onClick={() => handleBreakpointChange(bp)}
              >
                {bp}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* HTML Editor Tab */}
      {activeTab === 'HTML' && (
        <div className="flex-1 overflow-hidden">
          <textarea
            className="w-full  h-full border focus:outline-none overflow-y-scroll resize-none"
            value={htmlContent}
            onChange={handleInputChange}
            placeholder="Type your HTML here..."
          />
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'Preview' && (
        <div className="flex-1 flex justify-center items-center  ">
          <iframe
            className="overflow-y-scroll overflow-x-auto border"
            srcDoc={previewContent}
            style={{
              width: previewWidth,
              height: '100%',
            }}
            sandbox="allow-scripts"
          />
        </div>
      )}
    </div>
  );
}
