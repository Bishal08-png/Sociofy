import React, { useEffect, useState } from 'react'
import './FollowersCard.css';
import UserFollow from '../UserFollow/UserFollow';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../api/UserRequest';




const FollowersCard = () => {

  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);


  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    }
    fetchPersons();
  }, [])



  return (
    <div className='FollowersCard'>
      <h3>People you may know...</h3>

      {persons
        .filter((person) => person._id !== user._id)
        .map((person) => (
          <UserFollow person={person} key={person._id} />
        ))}

    </div>
  )
}

export default FollowersCard
