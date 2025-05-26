import { useEffect, useState } from 'react'
import './style.css'

interface Tool {
  id: number
  name: string;
  repoUrl: string;
  rewriteName: string;
}

export default function Explore() {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/')
      .then((response) => response.json())
      .then((data) => setTools(data))
      .catch((reason) => alert(reason));
  }, []);

  return (
    <div id="explore-root">
      <div id="noise"></div>
      <main>
        {tools.map((tool) => (
          <div className="card" key={tool.id}>
            <div className="card-header">
              <h2 className="tool-name">{tool.rewriteName}</h2>
            </div>
            <div className="card-body">
              <p className="tool-repo">Repository: <a href={tool.repoUrl} target="_blank">GitHub Repository</a></p>
              <p className="tool-rewrite">Replaced: {tool.name}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
