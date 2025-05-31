// app/components/Portal.tsx
import { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    wrapperId?: string; // Optional ID for a specific wrapper
}

const Portal: React.FC<PortalProps> = ({ children, wrapperId = 'modal-root' }) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;

        // If the wrapper element doesn't exist, create it
        if (!element) {
            element = document.createElement('div');
            element.setAttribute('id', wrapperId);
            document.body.appendChild(element);
            systemCreated = true;
        }
        setWrapperElement(element);

        return () => {
            // Cleanup if the element was created by this component
            if (systemCreated && element && document.body.contains(element)) {
                document.body.removeChild(element);
            }
        };
    }, [wrapperId]);

    // Return null on the client side until the wrapperElement is available
    // and always on the server side (SSR)
    if (wrapperElement === null) {
        return null;
    }

    return createPortal(children, wrapperElement);
};

export default Portal;