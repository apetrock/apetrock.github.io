import React, { useState, ChangeEvent } from 'react';

import ThreeRayMarch, { default_transfer } from "./three_ray_march";
import ThreeTextureDiffusion from "./three_rd";
import BezierSpiral from './BezierSpiral';
import OffscreenTextInput from './offscreen_text_input';
//import SocialIcon from './socials';
import "./App.css";

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
    <div className='CollapsibleTextInputPanel'>
      <button className='CollapsibleTextInputBtn' onClick={toggleMinimize}>
        {isMinimized ? '▶' : '▼'}
      </button>
      {isMinimized && <span className='red'>&lt;---If you really want to modify the glsl...</span>}
      {!isMinimized && (
        <textarea className='CollapsibleTextInput'
          value={inputValue}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

function ThreeTextureDiffusionWrapper() {
  return (
    <div className="app-container">
      <ThreeTextureDiffusion className="Three" />
    </div>
  );
}


interface MarchWrapperProps {
  className?: string;
  inputText: string;
  inputCanvas1?: HTMLCanvasElement | null;
  uniqueKey: string;
}
const ThreeRayMarchWrapper: React.FC<MarchWrapperProps> = ({
  className, inputText, inputCanvas1, uniqueKey
}) => {
  return (
    <div className="logo">
      <ThreeRayMarch className="Three" inputText={inputText} inputCanvas1={inputCanvas1} uniqueKey={uniqueKey} />
    </div>
  );
};

function App() {
  const [data, setData] = useState('');
  const [canvas1, setCanvas1] = useState(null);
  const [uniqueKey, setUniqueKey] = useState('');
  return (
    <div>
      <ThreeRayMarch className="logo" inputText={data} inputCanvas1={canvas1} uniqueKey={uniqueKey} />
      <div className='parent-div'>
        <div>
          <OffscreenTextInput onCanvas={setCanvas1} onText={setUniqueKey} initialText={"OnSequitur"} />
          <CollapsibleTextInput onInputChange={setData} initialText={default_transfer()} />
        </div>
        <BezierSpiral />
        <div className='red blurb'>
          <p>
            This is the online portfolio for John Delaney. There's not much here,
            but perhaps that will change. Eventually I'll blog about Darboux Cyclides and
            least squared quadrics, cylinders and all kinds of exciting geometry stuff, but for now, there's a shader up there.
          </p>
          <p>
            email: "a dot pet dot rock at gmail dot com"
          </p>
        </div>
      </div>
      {/*
      <div className='footer'>
        <SocialIcon url="https://github.com/apetrock/libgaudi" icon="github.svg" />
        <SocialIcon url="https://genart.social/@Onsequitur" icon="masto.svg" />
        <SocialIcon url="https://www.linkedin.com/in/john-delaney-9295073/" icon="linkedin.svg" />
      </div>
      */}
    </div>
  );
}

export default App;