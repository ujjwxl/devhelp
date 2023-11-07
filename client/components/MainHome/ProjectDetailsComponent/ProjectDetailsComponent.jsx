import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './ProjectDetailsComponent.css'

function FileOrFolder(props) {
  const { item, onFileClick, onFolderClick } = props;

  if (item.type === 'file') {
    return (
      <div>
        <a
          href="#"
          onClick={() => onFileClick(item)}
        >
          {item.name}
        </a>
      </div>
    );
  } else if (item.type === 'dir') {
    return (
      <div>
        <span onClick={() => onFolderClick(item)}>{item.name}</span>
      </div>
    );
  }

  return null;
}

export default function ProjectDetailsComponent() {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState("");
  const [currentPath, setCurrentPath] = useState([]);
  const [contents, setContents] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiUrl, setApiUrl] = useState(""); // New apiUrl state

  useEffect(() => {
    axios.get(`http://localhost:5000/project/get/${projectId}`)
      .then((response) => {
        setProjectDetails(response.data);

        const newApiUrl = `https://api.github.com/repos/${response.data.developerUserName}/${response.data.projectGithubLink}/contents`;
        setApiUrl(newApiUrl);

        fetchContents(newApiUrl);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [projectId]);

  const fetchContents = (path = '') => {
    axios
      .get(apiUrl + path)
      .then((response) => {
        setContents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching GitHub repository contents:', error);
      });
  };

  const handleFileClick = (file) => {
    axios.get(file.url)
      .then((response) => {
        const decodedContent = atob(response.data.content);
        file.content = decodedContent;
        setSelectedFile(file);
      })
      .catch((error) => {
        console.error('Error fetching file content:', error);
      });
  };

  const handleFolderClick = (folder) => {
    const newPath = currentPath.concat(folder.name);
    setCurrentPath(newPath);
    fetchContents(newPath.join('/'));
    setSelectedFile(null);
  };

  const goBack = () => {
    if (currentPath.length > 0) {
      const newPath = currentPath.slice(0, -1);
      setCurrentPath(newPath);
      fetchContents(newPath.join('/'));
      setSelectedFile(null);
    }
  };

  return (
    <div className='workspace'>
      <h1>Hello</h1>
      <h1>{projectDetails.projectName}</h1>
      <p>{projectDetails.projectNotes}</p>

      <img src={`http://localhost:5000/assets/` + projectDetails.projectImageOne} alt=""  className='project-image'/>
      <img src={`http://localhost:5000/assets/` + projectDetails.projectImageTwo} alt="" className='project-image'/>
      <img src={`http://localhost:5000/assets/` + projectDetails.projectImageThree} alt="" className='project-image'/>

      <h1>GitHub Repository Contents</h1>
      <div>
        <p>
          Current Path: {currentPath.join('/')}
        </p>
        <button onClick={goBack}>Go Back</button>
        {contents.map((item) => (
          <FileOrFolder
            key={item.name}
            item={item}
            onFileClick={handleFileClick}
            onFolderClick={handleFolderClick}
          />
        ))}
      </div>
      {selectedFile && (
        <div>
          <h2>File: {selectedFile.name}</h2>
          <SyntaxHighlighter language="" style={docco}>
            {selectedFile.content}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
