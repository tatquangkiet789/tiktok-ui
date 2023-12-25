import { useEffect, useRef } from 'react';

type IntersectionObserverHook = {
    onChange: () => void;
    isUnobserve: boolean;
};

const useIntersectionObserver = ({ onChange, isUnobserve }: IntersectionObserverHook) => {
    const elementRef = useRef<HTMLDivElement>();
    const element = elementRef.current;
    const intersectionObserver = new IntersectionObserver(
        (entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                onChange();
            }
        },
        { threshold: 1 },
    );
    const observerRef = useRef(intersectionObserver);

    useEffect(() => {
        if (!element) return;

        const currentObserver = observerRef.current;
        currentObserver.observe(element);

        if (isUnobserve) {
            currentObserver.unobserve(element);
        }

        return () => {
            currentObserver.unobserve(element);
        };
    }, [isUnobserve, element]);

    return { elementRef };
};

export default useIntersectionObserver;
