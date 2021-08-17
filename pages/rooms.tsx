import React from 'react';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

const Rooms = (props) => {
  return (
    <div className="rooms">
      <Header />
      <div>
        <h1>All convertations</h1>
        <Button>
          <span>Create room</span>
        </Button>
      </div>
    </div>
  )
}

export default Rooms;