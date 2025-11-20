'use client';

import { useEffect } from 'react';

interface LoaderProps {
    onFinish: () => void;
}

export default function Loader({ onFinish }: LoaderProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="loader">
            <div className="cell d-0"></div>
            <div className="cell d-1"></div>
            <div className="cell d-2"></div>
            <div className="cell d-1"></div>
            <div className="cell d-2"></div>
            <div className="cell d-2"></div>
            <div className="cell d-3"></div>
            <div className="cell d-3"></div>
            <div className="cell d-4"></div>
        </div>
    );
}
