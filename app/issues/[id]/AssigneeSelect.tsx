'use client';

import { Issue, User } from '@/sql/definitions';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/app/components';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000, // 60sec
        retry: 3
    });

    if(isLoading) return <Skeleton />

    if(error) return null;


  return (
    <Select.Root 
        defaultValue={issue.assigninedToUserId !== null ? String(issue.assigninedToUserId) : ""}
        onValueChange={(userId) => {
        axios.patch('/api/issues/' + issue.id, 
         // we have to send title and description otherwise db will throw error cause these fields cant be null
        {title:issue.title, description:issue.description, assigninedToUserId: userId || null 
        });
    }}>
        {/* @ts-ignore */}
        <Select.Trigger placeholder='Assign...'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value="">Unassigned</Select.Item>
                {users?.map(user => 
                    <Select.Item key={user.id} value={String(user.id)}>{user.name}</Select.Item>
                )}
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect