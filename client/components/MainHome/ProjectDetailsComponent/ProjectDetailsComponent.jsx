import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Modal from 'react-modal';
import './ProjectDetailsComponent.css'
import { Link } from 'react-router-dom';
// import fileIcon from '../../../src/assets/icons8-file-48.png';
// import folderIcon from '../../../src/assets/icons8-folder-48.png';

import fileIcon from '../../../src/assets/icons8-file.svg';
import folderIcon from '../../../src/assets/icons8-folder.svg';

// function FileOrFolder(props) {
//   const { item, onFileClick, onFolderClick } = props;

//   if (item.type === 'file') {
//     return (
//       <div>
//         <a
//           href="#"
//           onClick={() => onFileClick(item)}
//         >
//           {item.name}
//         </a>
//       </div>
//     );
//   } else if (item.type === 'dir') {
//     return (
//       <div>
//         <span onClick={() => onFolderClick(item)}>{item.name}</span>
//       </div>
//     );
//   }

//   return null;
// }

export default function ProjectDetailsComponent() {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState("");
  const [currentPath, setCurrentPath] = useState([]);
  const [contents, setContents] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiUrl, setApiUrl] = useState(""); // New apiUrl state

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState('');

  const loggedInUserId = sessionStorage.getItem("id");
  const isOwnerLoggedIn = loggedInUserId === projectDetails.developerUserId;

  const openImageModal = (imageSrc) => {
    setExpandedImage(imageSrc);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

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

    const config = {
      headers: {
        // Exclude the Authorization header for this specific request
        Authorization: null,
      },
    };

    axios
      .get(apiUrl + path, config)
      .then((response) => {
        setContents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching GitHub repository contents:', error);
      });
  };

  const handleFileClick = (file) => {

    const config = {
      headers: {
        // Exclude the Authorization header for this specific request
        Authorization: null,
      },
    };

    axios.get(file.url, config)
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

  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  async function handleContinueRequest(
    projectName,
    projectId,
    developerUserId
  ) {
    const requesterUserName = sessionStorage.getItem("username");
    const requesterUserId = sessionStorage.getItem("id");

    try {
      await axios
        .post("http://localhost:5000/auth/request", {
          requesterUserName,
          projectName,
          developerUserId,
          projectId,
          requesterUserId,
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("Request sent succesfully");
            alert("Request sent");
          }
        })
        .catch((e) => {
          alert("Request could not be sent!");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  function FileOrFolder(props) {
    const { item, onFileClick, onFolderClick } = props;

    if (item.type === 'file') {
      return (
        <div className='github-file'>
          <img src={fileIcon} alt="" className='github-code-icon' />
          <a
            href="#"
            onClick={() => onFileClick(item)}
            className='github-file-or-folder'
          >
            {item.name}
          </a>
        </div>
      );
    } else if (item.type === 'dir') {
      return (
        <div className='github-folder' >
          <img src={folderIcon} alt="" className='github-code-icon' onClick={() => onFolderClick(item)} />
          <span onClick={() => onFolderClick(item)} className='github-file-or-folder'>{item.name}</span>
        </div>
      );
    }

    return null;
  }

  return (
    <div className='workspace project-details-page'>

      <div className="project-details-header">
        <div className="project-details-header-left">

          <div className="project-details-left-one">
            <img src={`http://localhost:5000/assets/` + projectDetails.developerProfilePicture} alt="" />
          </div>


          <div className="project-details-header-left-two">
            <h2>{projectDetails.projectName}</h2>
            <h3>{`@` + projectDetails.developerUserName}</h3>
          </div>
        </div>

        <div className="project-details-header-right">
          <h3>{formatDate(projectDetails.createdAt)}</h3>
        </div>
      </div>


      <h3>{projectDetails.projectDescription}</h3>

      <h3>{`Project type : ` + projectDetails.projectStatus}</h3>

      <h3>Project Notes</h3>
      <p className='project-details-project-notes'>{projectDetails.projectNotes}</p>

      <h3>Tech Stack Used : </h3>
      <div className="footer-l">
        <p className="foter">{projectDetails.technologiesUsedOne}</p>
        <p className="foter">{projectDetails.technologiesUsedTwo}</p>
        <p className="foter">{projectDetails.technologiesUsedThree}</p>
      </div>



      <h3>Browse Code</h3>
      <div>
        <p>
          Current Path: {currentPath.join('/')}
        </p>
        <button onClick={goBack} className='github-back-button'>Go Back</button>
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

      <h3>Project Images : </h3>

      <div className="project-images">
        {/* {projectDetails.projectImageOne && (
          <img src={`http://localhost:5000/assets/` + projectDetails.projectImageOne} alt="" className='project-image' />
        )} */}
        {projectDetails.projectImageOne && (
          <img
            src={`http://localhost:5000/assets/` + projectDetails.projectImageOne}
            alt=""
            className='project-image'
            onClick={() => openImageModal(`http://localhost:5000/assets/` + projectDetails.projectImageOne)}
          />
        )}
        {projectDetails.projectImageTwo && (
          <img src={`http://localhost:5000/assets/` + projectDetails.projectImageTwo} alt="" className='project-image' 
            onClick={() => openImageModal(`http://localhost:5000/assets/` + projectDetails.projectImageTwo)}
          />
        )}
        {projectDetails.projectImageThree && (
          <img src={`http://localhost:5000/assets/` + projectDetails.projectImageThree} alt="" className='project-image'
          onClick={() => openImageModal(`http://localhost:5000/assets/` + projectDetails.projectImageThree)} />
        )}
        {!projectDetails.projectImageOne && !projectDetails.projectImageTwo && !projectDetails.projectImageThree && (
          <p>No images available for this project</p>
        )}
      </div>
      <Modal
        isOpen={isImageModalOpen}
        onRequestClose={closeImageModal}
        contentLabel="Expanded Image"
      >
        <img
          src={expandedImage}
          alt="Expanded Project Image"
          className="expanded-image"
        />
        <button className='closeImgModal' onClick={closeImageModal}>Close</button>
      </Modal>


      <h3>{`Owner : ` + projectDetails.developerFirstName + " " + projectDetails.developerLastName}</h3>

      {!isOwnerLoggedIn && (
        <Link to={`/chat/${projectDetails.developerUserId}`}><button className="footer-r-button">Contact Developer</button></Link>
        
      )}

      {!isOwnerLoggedIn && (
        <button className="footer-r-button" onClick={() => handleContinueRequest(projectDetails.projectName, projectDetails._id, projectDetails.developerUserId)}>
          Request to continue
        </button>
      )}
    </div>
  );
}


{/* <div className='workspace'>
  <h1>Hello</h1>
  <h1>{projectDetails.projectName}</h1>
  <p>{projectDetails.projectNotes}</p>

  <img src={`http://localhost:5000/assets/` + projectDetails.projectImageOne} alt="" className='project-image' />
  <img src={`http://localhost:5000/assets/` + projectDetails.projectImageTwo} alt="" className='project-image' />
  <img src={`http://localhost:5000/assets/` + projectDetails.projectImageThree} alt="" className='project-image' />

  {projectDetails.projectImageOne && (
    <img src={`http://localhost:5000/assets/` + projectDetails.projectImageOne} alt="" className='project-image' />
  )}
  {projectDetails.projectImageTwo && (
    <img src={`http://localhost:5000/assets/` + projectDetails.projectImageTwo} alt="" className='project-image' />
  )}
  {projectDetails.projectImageThree && (
    <img src={`http://localhost:5000/assets/` + projectDetails.projectImageThree} alt="" className='project-image' />
  )}
  {!projectDetails.projectImageOne && !projectDetails.projectImageTwo && !projectDetails.projectImageThree && (
    <p>No images available for this project</p>
  )}

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
</div> */}