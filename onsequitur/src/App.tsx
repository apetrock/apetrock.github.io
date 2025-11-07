import React, { useState, ChangeEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import ThreeRayMarch, { default_transfer } from "./three_ray_march";
import ThreeTextureDiffusion from "./three_rd";
import BezierSpiralDrawer from './BezierSpiralDrawer';
import { BezierSpiralDoc } from './BezierSpiralDoc';
import AudioBufferGenerator from './AudioBufferGenerator';
import KarplusStrongGenerator from './KarplusStrongGenerator';

import OffscreenTextInput from './offscreen_text_input';
import SocialIcon from './SocialIcon';
import MarkdownRenderer from './MarkdownRenderer';
import LaTeXRenderer from './LaTeXRenderer';
import NotFound from './NotFound';
// import "./App.css"; // We will remove this

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

// Navigation component
const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'about' },
    { path: '/spiral', label: 'Bezier Spiral' },
    { path: '/audio', label: 'Audio' },
    { path: '/karplus', label: 'Karplus-Strong' },
  ];

  return (
    <div className="flex justify-center my-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`text-sm mx-1 text-red-600 hover:underline focus:outline-none transition-colors ${
            location.pathname === item.path ? 'font-bold' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

// Main content component
const MainContent: React.FC = () => {
  const [data, setData] = useState('');
  const [canvas1, setCanvas1] = useState(null);
  const [uniqueKey, setUniqueKey] = useState('');

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="flex justify-center items-center h-48 px-4">
        <div className="w-full mx-4 h-full flex justify-center items-center">
          <ThreeRayMarch className="w-full h-full" inputText={data} inputCanvas1={canvas1} uniqueKey={uniqueKey} />
        </div>
      </div>
      <div className="mx-10 md:mx-[300px] my-4">
        <OffscreenTextInput onCanvas={setCanvas1} onText={setUniqueKey} initialText={"OnSequitur"} />
        <CollapsibleTextInput onInputChange={setData} initialText={default_transfer()} />
      </div>
      
      <Navigation />
      
      <div className='mx-10 md:mx-[300px] my-4 flex justify-center'>
        <Routes>
          <Route path="/" element={
            <div className='text-red-500 text-left'>
              <p className="mb-4">
                This is the online portfolio for John Delaney. There's not much here,
                but perhaps that will change. Eventually I'll blog about Darboux Cyclides and
                least squared quadrics, cylinders and all kinds of exciting geometry stuff, but for now, there's a shader up there.
              </p>
              <p>
                email: "a dot pet dot rock at gmail dot com"
              </p>
            </div>
          } />
          <Route path="/spiral" element={<BezierSpiralDoc />} />
          <Route path="/audio" element={<AudioBufferGenerator />} />
          <Route path="/karplus" element={<KarplusStrongGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
      <div className='fixed bottom-0 ml-10 p-2'>
        <SocialIcon url="https://github.com/apetrock/libgaudi" icon="github.svg" />
        <SocialIcon url="https://genart.social/@Onsequitur" icon="masto.svg" />
        <SocialIcon url="https://www.linkedin.com/in/john-delaney-9295073/" icon="linkedin.svg" />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;