import { useCallback, useEffect, useState } from 'react';
import { getRandomMemeTemplate } from './service/services';

import './App.css';

function App() {
  const [meme, setMeme] = useState({
    id: 0,
    name: '',
    url: '',
    width: 0,
    height: 0,
  });
  const [config, setConfig] = useState({
    position: 'top',
    text: '',
  });
  const randomizeMeme = useCallback(() => {
    setMeme(getRandomMemeTemplate());
  }, [setMeme]);
  const handleConfigChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setConfig({ ...config, [name]: value });
  };

  const downloadCurrentMeme = () => {
    const canv = document.getElementById('meme-canvas');

    var image = canv
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    window.location.href = image;
  };
  useEffect(() => {
    randomizeMeme();
  }, [randomizeMeme]);

  useEffect(() => {
    const canv = document.getElementById('meme-canvas');
    // if (!canv) return;
    const ctx = canv.getContext('2d');
    ctx.clearRect(0, 0, canv.width, canv.height);
    const img = document.getElementById('meme-img');

    // if (!img) return;
    const paintCanvas = () => {
      let imageOffsetY = 80;
      let textOffsetY = 5;

      if (config.position === 'bottom') {
        imageOffsetY = 0;
        textOffsetY = Math.min(meme.height) + 20;
      }
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canv.width, canv.height);
      ctx.fillStyle = 'black';

      ctx.drawImage(img, 0, imageOffsetY);
      ctx.font = '40px arial';
      ctx.fillText(config.text, 5, textOffsetY + 30, canv.width - 10);
    };
    img.onload = paintCanvas;
    paintCanvas();
  }, [config, meme]);

  return (
    <div className="App">
      <div className="App-header">
        <h5>Meme Generator</h5>
        <div>
          <label>
            Position :
            <select name="position" onChange={handleConfigChange}>
              <option value={'top'}>Top</option>
              <option value={'bottom'}>Bottom</option>
            </select>
          </label>

          <label>
            <input
              name="text"
              type="text"
              onChange={handleConfigChange}
              placeholder="Enter Text"
            />
          </label>

          <button className="download-btn" onClick={downloadCurrentMeme}>
            Download Meme
          </button>
        </div>
      </div>
      <div className="memeContainer">
        <h4 className="title">{meme.name}</h4>
        <img
          id="meme-img"
          className="meme image"
          src={meme.url}
          alt="meme"
          crossOrigin="anonymous"
        />
        <canvas
          key={meme.id}
          id="meme-canvas"
          className="meme"
          width={meme.width}
          height={meme.height + 60}
        >
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>
    </div>
  );
}

export default App;
