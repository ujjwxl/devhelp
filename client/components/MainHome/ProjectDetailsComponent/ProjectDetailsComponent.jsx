import { useEffect, React,useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';


export default function ProjectDetailsComponent() {
    const {projectId}= useParams();
    const [projectDetails, setProjectDetails] = useState("");
  
  
    useEffect(() => {
      axios.get(`http://localhost:5000/project/get/${projectId}`)
        .then((response) => {
          setProjectDetails(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }, [projectId]);
  return (
    <div className='workspace'>
        <h1>Hello</h1>
        <h1>{projectDetails.projectName}</h1>
        <p>{projectDetails.projectNotes}</p>
    </div>
  )
}
