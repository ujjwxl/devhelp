import React from 'react'

const AddProjectComponent = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5000/project/add', {
            projectName,
            projectDescription,
            projectGithub,
            projectPercent,
          });
    
          console.log('Project added successfully:', response.data);
          alert("project added successfully")
          // Optionally, you can reset the form fields here
        } catch (error) {
          console.error('Error adding project:', error);
        }
      };


    return (
        <div className='workspace'>
            <form action="POST" onSubmit={handleSubmit}>
                <input type="text" placeholder="Add a project name" className="add-project" onChange={(e) => setProjectName(e.target.value)} /> <br/>
                <input type="text" placeholder="Add project description" className="add-project" onChange={(e) => setProjectDescription(e.target.value)} /> <br/>
                <input type="text" placeholder="Add github link" className="add-project" onChange={(e) => setProjectGithub(e.target.value)} /> <br/>
                <input type="text" placeholder="Add project completion percent" className="add-project" onChange={(e) => setProjectPercent(e.target.value)} /> <br/>
                <button type='submit'>Add project</button>
            </form>
        </div>
    )
}

export default AddProjectComponent
