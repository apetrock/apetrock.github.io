import React, { useState, ChangeEvent } from 'react';

import ThreeRayMarch, { default_transfer } from "./three_ray_march";
import ThreeTextureDiffusion from "./three_rd";
import BezierSpiral from './BezierSpiral';
import OffscreenTextInput from './offscreen_text_input';
import SocialIcon from './SocialIcon';
import MarkdownRenderer from './MarkdownRenderer';
import LaTeXRenderer from './LaTeXRenderer';
// import "./App.css"; // We will remove this
import useSections from './useSections';

interface TextInputProps {
  onInputChange: (value: string) => void;
  initialText: string;
}

const CollapsibleTextInput: React.FC<TextInputProps> = ({ onInputChange, initialText }) => {
  const [inputValue, setInputValue] = useState<string>(initialText);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    onInputChange(event.target.value);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className='flex items-start'> {/* Formerly CollapsibleTextInputPanel */}
      <button type="button" className='border-none bg-black text-red-500 p-1' onClick={toggleMinimize}> {/* Formerly CollapsibleTextInputBtn */}
        {isMinimized ? '▶' : '▼'}
      </button>
      {isMinimized && <span className='text-red-500'>&lt;---If you really want to modify the glsl...</span>} {/* Formerly red */}
      {!isMinimized && (
        <textarea className='w-[95%] h-[200px] text-base border border-neutral-700 outline-none bg-transparent text-red-500 text-left p-1' /* Formerly CollapsibleTextInput */
          value={inputValue}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};


function App() {
  const [data, setData] = useState('');
  const [canvas1, setCanvas1] = useState(null);
  const [uniqueKey, setUniqueKey] = useState('');
  
  const sections = [
    {
      id: 'blurb',
      label: 'about',
      component: (
        <div className='text-red-500 text-left'> {/* Formerly red blurb */}
          <p className="mb-4">
            This is the online portfolio for John Delaney. There's not much here,
            but perhaps that will change. Eventually I'll blog about Darboux Cyclides and
            least squared quadrics, cylinders and all kinds of exciting geometry stuff, but for now, there's a shader up there.
          </p>
          <p>
            email: "a dot pet dot rock at gmail dot com"
          </p>
        </div>
      ),
    },
    {
      id: 'spiral',
      label: 'Bezier Spiral',
      component: <BezierSpiral />,
    },
    {
      id: 'markdown',
      label: 'Markdown & LaTeX',
      component: (
        <div className="text-left">
          <MarkdownRenderer>
{`# Simple Markdown Demo

This is a **bold** statement and this is *italic text*.

## Features
- Headers (# ## ###)
- **Bold** and *italic* text
- [Links to GitHub](https://github.com/apetrock/libgaudi)
- Inline \`code\` formatting

## Perfect for blogging about geometry!`}
          </MarkdownRenderer>
          
          <div className="mt-6">
            <h3 className="text-xl font-bold text-red-500 mb-3">LaTeX Math Examples:</h3>
            
            <LaTeXRenderer>
              {"E = mc^2"}
            </LaTeXRenderer>
            
            <LaTeXRenderer>
              {"x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"}
            </LaTeXRenderer>
            
            <LaTeXRenderer>
              {"\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}"}
            </LaTeXRenderer>
            
            <p className="text-red-500 mt-4">
              Now you can easily mix markdown content with LaTeX math using two simple components!
            </p>
          </div>
        </div>
      ),
    },
  ];

  const { buttons, sectionsContent } = useSections(sections, 'blurb');

  return (
    <div className="bg-black min-h-screen text-white"> {/* Removed test class */}
      <div className="flex justify-center items-center h-48 px-4"> {/* Changed p-2 to px-4 to reduce vertical padding */}
        <div className="w-full mx-4 h-full flex justify-center items-center"> {/* Removed max-width constraint and added horizontal margin */}
          <ThreeRayMarch className="w-full h-full" inputText={data} inputCanvas1={canvas1} uniqueKey={uniqueKey} />
        </div>
      </div>

      <div className="p-4">
        <OffscreenTextInput onCanvas={setCanvas1} onText={setUniqueKey} initialText={"OnSequitur"} />
        <CollapsibleTextInput onInputChange={setData} initialText={default_transfer()} />
      </div>
      
      {/* Add the section navigation buttons */}
      <div className="flex justify-center my-6">
        {buttons}
      </div>
      
      <div className='mx-10 md:mx-[300px] my-4 flex justify-center'>{sectionsContent}</div> {/* Changed activeComponent to sectionsContent */}
      <div className='fixed bottom-0 ml-10 p-2'> {/* Formerly footer */}
        <SocialIcon url="https://github.com/apetrock/libgaudi" icon="github.svg" />
        <SocialIcon url="https://genart.social/@Onsequitur" icon="masto.svg" />
        <SocialIcon url="https://www.linkedin.com/in/john-delaney-9295073/" icon="linkedin.svg" />
      </div>
    </div>
  );
}

export default App;