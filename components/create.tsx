import React, { useState } from 'react';

interface Props {
  trayData: TrayType;
}

const Create: React.FC<Props> = ({ trayData }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    if(selectedTag === tag){
        setSelectedTag(null);
        console.log(`Selected tag: ${null}`);
        return;
    }else{
    setSelectedTag(tag);     
    }
    
    console.log(`Selected tag: ${tag}`);
  };

  return (
    <div className="container">
      <div className="component-top">
        <div className="flower">
          <img src="/assets/seemore/flower.svg" alt="flower" width={56} height={56} />
          {trayData.selectedTray}
        </div>
        <div className="information">
          <h1 className="name">Name</h1>
          <input type="text" className="enter-name" placeholder="Enter your name" />
        </div>     
      </div>
      <h1 className="tag-header">Tag</h1>
      <div className="tag">
        <button 
          type='button' 
          className={`it ${selectedTag === 'IT' ? 'active' : ''}`} 
          onClick={() => handleTagClick('IT')}
        >
          <h1>IT</h1>
        </button>
        <button 
          type='button' 
          className={`cs ${selectedTag === 'CS' ? 'active' : ''}`} 
          onClick={() => handleTagClick('CS')}
        >
          <h1>CS</h1>
        </button>
        <button 
          type='button' 
          className={`dsi ${selectedTag === 'DSI' ? 'active' : ''}`} 
          onClick={() => handleTagClick('DSI')}
        >
          <h1>DSI</h1>
        </button>
      </div>

      <div className="component-middle">
        <textarea className="message" placeholder="Write your message here" />
      </div>
      <div className="component-bottom">
        <button className="btn" type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Create;
