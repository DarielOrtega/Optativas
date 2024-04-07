'use client'

import { useEffect, useState } from 'react';

export default function AdminRequestsPage() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {

        fetch('/api/enrollment-requests')
            .then(res => res.json())
            .then(data => setRequests(data));
    }, []);

    const handleUpdateStatus = (requestId, newStatus) => {
        fetch(`/api/enrollment-requests`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el estado de la solicitud');
                }
                return response.json();
            })
            .then(updatedRequest => {
                console.log('Solicitud actualizada:', updatedRequest);
                // Actualizar la lista de solicitudes después de actualizar una
                setRequests(requests.map(request => request.id === requestId ? updatedRequest : request));
            })
            .catch(error => {
                console.error('Error:', error);
                // Manejar el error, por ejemplo, mostrando un mensaje al usuario
            });
    };

    return (
        <div>
            <h1>Solicitudes de inscripción</h1>
            <ul>
                {requests.map(request => (
                    <li key={request.id}>
                        {request.user.username} solicita inscribirse en {request.subject.nombre}
                        <button onClick={() => handleUpdateStatus(request.id, 'ACCEPTED')}>Aceptar</button>
                        <button onClick={() => handleUpdateStatus(request.id, 'REJECTED')}>Rechazar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}