'use client';

import { User } from '@/sql/definitions';
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AssigneeSelect = () => {
   const [users, setUsers] = useState<User[]>([]);

   useEffect(() => {
    const fetchUsers = async () => {
       const {data} = await axios.get<User[]>('/api/users');
       setUsers(data);
    }

    fetchUsers();
   }, [])

  return (
    <Select.Root>
        {/* @ts-ignore */}
        <Select.Trigger placeholder='Assign...'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                {users.map(user => 
                    <Select.Item key={user.id} value={String(user.id)}>{user.name}</Select.Item>
                )}
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect