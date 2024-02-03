'use client';

import { User } from '@/sql/definitions';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/app/components';

const AssigneeSelect = () => {
    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000, // 60sec
        retry: 3
    });

    if(isLoading) return <Skeleton />

    if(error) return null;


  return (
    <Select.Root>
        {/* @ts-ignore */}
        <Select.Trigger placeholder='Assign...'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                {users?.map(user => 
                    <Select.Item key={user.id} value={String(user.id)}>{user.name}</Select.Item>
                )}
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect