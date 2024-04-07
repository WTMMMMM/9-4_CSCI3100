import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';


function EditInfo({data}:any) {

    const navigate = useNavigate();

    const [edit_info, setedit_info] = useState( data || {
        username: '',
        email: '',
        adress: '',
        profile_image_link: '',
    });

    useEffect(() => {
        setedit_info(edit_info || {
            username: '',
            email: '',
            adress: '',
            profile_image_link: '',
        });
      }, [edit_info]);

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setedit_info({ ...edit_info, [name]: value });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
          const response = await fetch(`api`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(edit_info)
          });
    
          const data = await response.json(); 
          if (data.message === 'success') {
            alert('Edit successfully');
            navigate(-1);
          } else {
            alert('Fail to edit');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <form onSubmit={handleSubmit} >
                <div>
                    <label>username:</label>
                    <input type="text" name="username" value={edit_info.username || ''}onChange={handleChange}/>
                </div>

                <div>
                    <label>email:</label>
                    <input type="email" name="email" value={edit_info.email || ''}onChange={handleChange}/>
                </div>

                <div>
                    <label>adress:</label>
                    <input type="text" name="adress" value={edit_info.adress || ''}onChange={handleChange}/>
                </div>

                <div>
                    <label>profile_image_link:</label>
                    <input type="text" name="profile_image_link" value={edit_info.profile_image_link || ''}onChange={handleChange}/>
                </div>
                <button type="submit">Edit Profile</button>
            </form>
        </div>

    )
}

export default EditInfo