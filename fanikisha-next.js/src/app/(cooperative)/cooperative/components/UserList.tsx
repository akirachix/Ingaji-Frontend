// app/components/UserList.tsx
import React from 'react';
import Link from 'next/link';

interface User {
    id: number;
    name: string;
}

const UserList: React.FC<{ users: User[] }> = ({ users }) => {
    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link href={`/components/${user.id}`}>View User {user.id}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
