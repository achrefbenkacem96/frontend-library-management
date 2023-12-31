// Members.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Adjust the path based on your project structure
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Members = () => {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    // Fetch all members from the server
    axios.get('http://localhost:3000/members')
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.error('Error fetching members:', error.message);
      });
  }, []);

  const handleAddMember = async () => {
    // Make a request to add a new member
    const newMember = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:3000/members', newMember);
      console.log('Member added successfully:', response.data);
      // Update the UI with the new member
      setMembers([...members, response.data.member]);
      // Clear the form fields
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Member addition failed:', error.message);
    }
  };

  const handleUpdateMember = async () => {
    if (!selectedMember) {
      return;
    }

    // Make a request to update the selected member
    const updatedMember = {
      name: name || selectedMember.name,
      email: email || selectedMember.email,
      password: password || selectedMember.password,
    };

    try {
      const response = await axios.put(`http://localhost:3000/members/${selectedMember._id}`, updatedMember);
      console.log('Member updated successfully:', response.data);
      // Update the UI with the updated member
      setMembers(members.map(member => (member._id === selectedMember._id ? response.data.member : member)));
      // Clear the form fields and reset the selected member
      setName('');
      setEmail('');
      setPassword('');
      setSelectedMember(null);
    } catch (error) {
      console.error('Member update failed:', error.message);
    }
  };

  const handleDeleteMember = async (memberId) => {
    // Make a request to delete the selected member
    try {
      const response = await axios.delete(`http://localhost:3000/members/${memberId}`);
      console.log('Member deleted successfully:', response.data);
      // Update the UI by removing the deleted member
      setMembers(members.filter(member => member._id !== memberId));
    } catch (error) {
      console.error('Member deletion failed:', error.message);
    }
  };

  const handleEditMember = (member) => {
    // Set the form fields based on the selected member
    setName(member.name);
    setEmail(member.email);
    setPassword(member.password);
    setSelectedMember(member);
  };

  return (
    <div>
      <div className="container mt-4">
        <h2>All Members</h2>
        <ul className="list-group">
          {members.map(member => (
            <li key={member._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{member.name}</strong> ({member.email})
              </div>
              <div>
                <button className="btn btn-warning mx-2" onClick={() => handleEditMember(member)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteMember(member._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <hr />
        <h2>Add/Update Member</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          <button type="button" className="btn btn-primary" onClick={selectedMember ? handleUpdateMember : handleAddMember}>
            {selectedMember ? 'Update Member' : 'Add Member'}
          </button>
          <button type="button" className="btn btn-secondary mx-2" onClick={() => {
            setName('');
            setEmail('');
            setPassword('');
            setSelectedMember(null);
          }}>
            Clear Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default Members;
