// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react';
import { Profile } from '../components/Profile.js';

function EditProfile() {
  const [val, setVal] = useState([])

  function handlePhotoChange(i, e) {
    const newProfile = val.slice();
    newProfile[i].photo = e.target.value;
    setVal(newProfile);
  }
  function handleNameChange(i, e) {
    const newProfile = val.slice();
    newProfile[i].profile_name = e.target.value;
    setVal(newProfile);
  }
  function handleBioChange(i, e) {
    const newProfile = val.slice();
    newProfile[i].bio = e.target.value;
    setVal(newProfile);
  }
  function onClickSave() {
    fetch('/save_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(val),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  //   function handleDelete(i) {
  //     setVal([...val.slice(0, i), ...val.slice(i+1)]);
  //   }

  const profile = val.map(
    (profile, i) => <Profile
      photo={profile.photo}
      profile_name={profile.profile_name}
      bio={profile.bio}

      // onDelete={() => handleDelete(i)}
      onPhoto={(e) => handlePhotoChange(i, e)}
      onName={(e) => handleNameChange(i, e)}
      onBio={(e) => handleBioChange(i, e)}

    />);

  useEffect(() => {
    fetch('/get_profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setVal(data);
      });
  }, []);



  console.log("WE PROFILING")
  console.log(val);
  return (
    <div className="App">
      <h1>Edit Profile:</h1>
      {profile}
      <button onClick={onClickSave}>Save Profile</button>
    </div>
  );
}

export default EditProfile;
