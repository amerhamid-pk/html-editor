'use client';

import { useState } from 'react';

export default function Home() {
  const [htmlContent, setHtmlContent] = useState('');
  const [previewWidth, setPreviewWidth] = useState('100%');
  const [selectedBreakpoint, setSelectedBreakpoint] = useState('2xl');
  const [activeTab, setActiveTab] = useState('HTML');

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
